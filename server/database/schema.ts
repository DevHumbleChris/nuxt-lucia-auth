import { relations } from "drizzle-orm";
import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    password: text("hashed_password"),
    isEmailVerified: boolean("is_email_verified").notNull().default(false),
  },
  (table) => ({
    index: [table.email],
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

export const passwordResetTable = pgTable(
  "password_reset",
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

export const oauthAccountTable = pgTable("oauth_account", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id),
  provider: text("provider").notNull(),
  providerUserId: text("provider_user_id").notNull(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

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
