import { lucia } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  try {
    if (!event.context.user?.id) {
      throw createError({
        statusCode: 403,
      });
    }

    await lucia.invalidateSession(event.context.user?.id);
    appendHeader(
      event,
      "Set-Cookie",
      lucia.createBlankSessionCookie().serialize()
    );

    return {
      message: "Successfully signed out!",
    };
  } catch (error: any) {
    throw createError({
      message: error.message,
      statusCode: 400,
    });
  }
});
