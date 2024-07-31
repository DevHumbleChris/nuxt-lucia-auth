import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { lucia } from "../../utils/auth";
import { isValidEmail } from "~/server/utils/validation";
import { sendEmail } from "~/server/utils/email";
import { emailVerificationTemplate } from "~/server/utils/email/templates/email-verification";
import { createDate, TimeSpan } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    throw createError({
      message: "Invalid Email",
      statusCode: 400,
    });
  }

  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    throw createError({
      message: "Invalid Password Length",
      statusCode: 400,
    });
  }

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  try {
    // Check if user exists
    const user = await useDrizzle().query.userTable.findFirst({
      where: eq(tables.userTable.email, email),
    });

    if (user) {
      throw createError({
        message: "Username already used",
        statusCode: 400,
      });
    }

    await useDrizzle().insert(tables.userTable).values({
      id: userId,
      email,
      password: hashedPassword,
    });

    // generate a random 8 digit code
    const code = generateRandomString(8, alphabet("0-9")); // 8 digit code

    await useDrizzle()
      .insert(tables.emailVerificationTable)
      .values({
        code,
        userId,
        id: generateId(15),
        expiresAt: createDate(new TimeSpan(10, "m")), // 10 minutes
      });

    const htmlTemplate = emailVerificationTemplate(code);

    await sendEmail({
      html: htmlTemplate,
      to: email,
      subject: "Verify your email address!",
    });

    const session = await lucia.createSession(userId, {});

    appendHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );

    return {
      message:
        "We've sent a verification email to your inbox. Please verify your email.",
    };
  } catch (error: any) {
    throw createError({
      message: error.message,
      statusCode: 400,
    });
  }
});
