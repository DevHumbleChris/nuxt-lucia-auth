import { Lucia } from "lucia";
import adapter from "./adapter";

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
}
