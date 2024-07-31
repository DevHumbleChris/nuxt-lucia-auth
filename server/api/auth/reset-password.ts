import { isWithinExpirationDate } from "oslo";
import { Argon2id } from "oslo/password";

export default defineEventHandler(async (event) => {
  try {
    const { code, password, email } = await readBody(event);

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

    if (typeof code !== "string" || code.length !== 8) {
      throw createError({
        statusMessage: "Invalid Code!",
        statusCode: 400,
      });
    }

    const user = await useDrizzle().query.userTable.findFirst({
      where: (table) => eq(table.email, email),
    });

    if (!user) {
      throw createError({
        statusMessage: "Invalid User!",
        statusCode: 400,
      });
    }

    const resetPasswordRequest =
      await useDrizzle().query.passwordResetTable.findFirst({
        where: (table) =>
          sql`${table.userId} = ${user?.id}` && eq(table.code, code),
      });

    if (!resetPasswordRequest) {
      throw createError({
        statusMessage: "Invalid reset password code!",
        statusCode: 498,
      });
    }

    if (!isWithinExpirationDate(resetPasswordRequest.expiresAt)) {
      throw createError({
        statusMessage: "Password reset code expired!",
        statusCode: 498,
      });
    }

    await useDrizzle()
      .delete(tables.passwordResetTable)
      .where(sql`${tables.passwordResetTable.userId} = ${user?.id}`);

    const hashedPassword = await new Argon2id().hash(password);

    await useDrizzle()
      .update(tables.userTable)
      .set({
        password: hashedPassword,
      })
      .where(sql`${tables.userTable.id} = ${user?.id}`);

    return {
      message: "Password reset was successfully!",
    };
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: 400,
    });
  }
});
