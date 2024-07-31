import { isValidEmail } from "~/server/utils/validation";
import { sendEmail } from "~/server/utils/email";
import { emailVerificationTemplate } from "~/server/utils/email/templates/email-verification";
import { alphabet, generateRandomString } from "oslo/crypto";
import { createDate, TimeSpan } from "oslo";

export default defineEventHandler(async (event) => {
  try {
    const { email } = await readBody(event);
    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      throw createError({
        message: "Invalid email!",
        statusCode: 400,
      });
    }

    // check if user exists on db
    const user = await useDrizzle().query.userTable.findFirst({
      where: (table) => eq(table.email, email),
    });

    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid User!",
      });
    }

    if (user.isEmailVerified) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email is verified, try signin!",
      });
    }

    // generate a random 8 digit code
    const code = generateRandomString(8, alphabet("0-9")); // 8 digit code

    await useDrizzle()
      .update(tables.emailVerificationTable)
      .set({
        code: code,
        expiresAt: createDate(new TimeSpan(10, "m")), // 10 minutes
      });

    const htmlTemplate = emailVerificationTemplate(code);

    await sendEmail({
      html: htmlTemplate,
      to: email,
      subject: "Verify your email address!",
    });

    return {
      message:
        "We've sent a verification email to your inbox. Please verify your email.",
    };
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }
});
