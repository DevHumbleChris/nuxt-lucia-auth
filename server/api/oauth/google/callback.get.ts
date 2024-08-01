import { google } from "./../../../utils/auth";
import { GoogleTokens, OAuth2RequestError, generateCodeVerifier } from "arctic";
import { generateId } from "lucia";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;
  const storedState = getCookie(event, "google_oauth_state") ?? null;
  const codeVerifier = getCookie(event, "code_verifier") ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    throw createError({
      status: 400,
    });
  }

  try {
    const tokens: GoogleTokens = await google.validateAuthorizationCode(
      code,
      codeVerifier as string
    );

    const googleUserResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );

    const googleUser: GoogleUser = await googleUserResponse.json();

    // check if email is already used
    const isEmailIsUsed = await useDrizzle().query.userTable.findFirst({
      where: eq(tables.userTable.email, googleUser.email),
    });

    if (isEmailIsUsed) {
      await useDrizzle().update(tables.userTable).set({
        isEmailVerified: googleUser.verified_email,
        name: googleUser.name,
        profilePictureUrl: googleUser.picture,
      });

      const oauthId = generateId(15);

      await useDrizzle().insert(tables.oauthAccountTable).values({
        id: oauthId,
        userId: isEmailIsUsed.id,
        provider: "google",
        providerUserId: googleUser.sub,
        accessToken: tokens.accessToken,
        expiresAt: tokens.accessTokenExpiresAt,
        refreshToken: tokens.refreshToken,
      });

      const session = await lucia.createSession(isEmailIsUsed.id, {});
      appendHeader(
        event,
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize()
      );
      return sendRedirect(event, "/dashboard");
    }

    const existingUser = await useDrizzle().query.userTable.findFirst({
      where: eq(tables.userTable.email, googleUser.email),
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      appendHeader(
        event,
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize()
      );
      return sendRedirect(event, "/dashboard");
    }

    const userId = generateId(15);

    await useDrizzle()
      .insert(tables.userTable)
      .values({
        email: googleUser.email,
        id: userId,
        isEmailVerified: googleUser.verified_email,
        name: googleUser.name,
        profilePictureUrl: googleUser.picture,
      })
      .onConflictDoUpdate({
        target: tables.userTable.email,
        set: { email: googleUser.email, id: userId },
      });

    const oauthId = generateId(15);
    await useDrizzle().insert(tables.oauthAccountTable).values({
      id: oauthId,
      userId,
      provider: "google",
      providerUserId: googleUser.sub,
      accessToken: tokens.accessToken,
      expiresAt: tokens.accessTokenExpiresAt,
      refreshToken: tokens.refreshToken,
    });

    const session = await lucia.createSession(userId, {});
    appendHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );
    return sendRedirect(event, "/dashboard");
  } catch (e) {
    if (
      e instanceof OAuth2RequestError &&
      e.message === "bad_verification_code"
    ) {
      // invalid code
      throw createError({
        status: 400,
      });
    }
    throw createError({
      status: 500,
    });
  }
});

interface GoogleUser {
  sub: string;
  name: string;
  email: string;
  picture: string;
  given_name: string;
  locale: string;
  verified_email: boolean;
}
