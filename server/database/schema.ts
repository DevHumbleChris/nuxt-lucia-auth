import { relations } from "drizzle-orm";
import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    password: text("hashed_password"),
    googleId: text("google_id").unique(),
    githubId: text("github_id").unique(),
    isEmailVerified: boolean("is_email_verified").notNull().default(false),
  },
  (table) => ({
    index: [table.email, table.githubId, table.googleId],
  })
);

export const emailVerificationTable = pgTable(
  "email_verification",
  {
    id: text("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => userTable.id),
    code: text("code").notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (table) => ({
    index: [table.userId, table.code],
  })
);

export const sessionTable = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (table) => ({
    index: [table.userId],
  })
);
