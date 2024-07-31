import { generateId } from "lucia";
import { isValidEmail } from "~/server/utils/validation";
import { sendEmail } from "~/server/utils/email";
import { createDate, TimeSpan } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";
import { resetPasswordCodeRequest } from "~/server/utils/email/templates/reset-password-code";

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    throw createError({
      message: "Invalid Email",
      statusCode: 400,
    });
  }

  try {
    // Check if user exists
    const user = await useDrizzle().query.userTable.findFirst({
      where: eq(tables.userTable.email, email),
    });

    if (!user) {
      throw createError({
        message: `${email} does't exists!`,
        statusCode: 400,
      });
    }

    // generate a random 8 digit code
    const code = generateRandomString(8, alphabet("0-9")); // 8 digit code

    await useDrizzle()
      .insert(tables.passwordResetTable)
      .values({
        code,
        userId: user?.id,
        id: generateId(15),
        expiresAt: createDate(new TimeSpan(10, "m")), // 10 minutes
      });

    const htmlTemplate = resetPasswordCodeRequest(code);

    await sendEmail({
      html: htmlTemplate,
      to: email,
      subject: "Reset your password!",
    });

    return {
      message:
        "We've sent a reset password code to your inbox. Please use the code to reset your password.",
    };
  } catch (error: any) {
    throw createError({
      message: error.message,
      statusCode: 400,
    });
  }
});
