import { lucia } from "../../utils/auth";
import { isValidEmail } from "~/server/utils/validation";
import { Argon2id } from "oslo/password";

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event);

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      throw createError({
        message: "Invalid Email",
        statusCode: 400,
      });
    }

    if (
      typeof password !== "string" ||
      password.length < 8 ||
      password.length > 255
    ) {
      throw createError({
        message: "Invalid Password Length",
        statusCode: 400,
      });
    }

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

    const validPassword = await new Argon2id().verify(
      user.password as string,
      password
    );

    if (!validPassword) {
      throw createError({
        message: "Password incorrect!",
        statusCode: 400,
      });
    }

    const session = await lucia.createSession(user?.id, {});

    appendHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );

    return {
      message: "Signin successfull!",
    };
  } catch (error: any) {
    throw createError({
      message: error.message,
      statusCode: 400,
    });
  }
});
