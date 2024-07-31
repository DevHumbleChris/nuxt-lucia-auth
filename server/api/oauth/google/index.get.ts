import { google } from "./../../../utils/auth";
import { generateCodeVerifier, generateState } from "arctic";

export default defineEventHandler(async (event) => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });

  setCookie(event, "google_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  // store code verifier as cookie
  setCookie(event, "code_verifier", codeVerifier, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10, // 10 min
    sameSite: "lax",
  });

  return sendRedirect(event, url.toString());
});
