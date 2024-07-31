import { lucia } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  try {
    if (!event.context.session) {
      throw createError({
        statusCode: 403,
      });
    }
    await lucia.invalidateSession(event.context.session.id);
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
