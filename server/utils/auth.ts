import { Lucia } from "lucia";
import adapter from "./adapter";
import { GitHub, Google } from "arctic";

const config = useRuntimeConfig();

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // IMPORTANT!
    attributes: {
      // set to `true` when using HTTPS
      secure: import.meta.dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      id: attributes.id,
      isEmailVerified: attributes.isEmailVerified,
      profilePictureUrl: attributes.profilePictureUrl,
      name: attributes.name,
    };
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, "password">;
  }
}

interface DatabaseUser {
  email: string;
  id: string;
  isEmailVerified: string;
  profilePictureUrl: string;
  name: string;
}

export const github = new GitHub(
  config.public.githubClientId,
  config.public.githubClientSecret
);

export const google = new Google(
  config.public.googleClientId,
  config.public.googleClientSecret,
  config.public.googleRedirectURI
);
