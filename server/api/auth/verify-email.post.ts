import { isWithinExpirationDate } from "oslo";

export default defineEventHandler(async (event) => {
  try {
    const { code, userId } = await readBody(event);

    if (typeof userId !== "string") {
      throw createError({
        statusMessage: "userId required!",
        statusCode: 400,
      });
    }

    if (typeof code !== "string" || code.length !== 8) {
      throw createError({
        statusMessage: "Invalid Code!",
        statusCode: 400,
      });
    }

    const emailVerificationRequest =
      await useDrizzle().query.emailVerificationTable.findFirst({
        where: (table) => eq(table.userId, userId) && eq(table.code, code),
      });

    if (!emailVerificationRequest) {
      throw createError({
        statusMessage: "Invalid verification code!",
        statusCode: 498,
      });
    }

    if (!isWithinExpirationDate(emailVerificationRequest.expiresAt)) {
      throw createError({
        statusMessage: "Verification code expired!",
        statusCode: 498,
      });
    }

    await useDrizzle()
      .delete(tables.emailVerificationTable)
      .where(eq(tables.emailVerificationTable.userId, userId));

    await useDrizzle()
      .update(tables.userTable)
      .set({
        isEmailVerified: true,
      })
      .where(eq(tables.userTable.id, userId));

    return {
      message: "Email Verified Successfully!",
    };
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: 400,
    });
  }
});
