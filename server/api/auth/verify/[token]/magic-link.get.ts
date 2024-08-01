import jwt from "jsonwebtoken";
import { isWithinExpirationDate } from "oslo";

export default defineEventHandler(async (event) => {
  try {
    const token = getRouterParam(event, "token") as string;

    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const magicLinkRequest = await useDrizzle().query.magicLinkTable.findFirst({
      where: (table) => eq(table.userId, userId),
    });

    if (!magicLinkRequest) {
      throw createError({
        statusMessage: "Invalid verification code!",
        statusCode: 498,
      });
    }

    if (!isWithinExpirationDate(magicLinkRequest?.expiresAt!)) {
      throw createError({
        statusMessage: "Invalid verification token",
        statusCode: 498,
      });
    }

    await useDrizzle()
      .delete(tables.magicLinkTable)
      .where(eq(tables.magicLinkTable.userId, userId));

    const session = await lucia.createSession(userId, {});

    appendHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );

    return {
      message: "Authentic Token",
    };
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }
});
