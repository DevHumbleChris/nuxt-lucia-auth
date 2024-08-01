ALTER TABLE "magic_link" ADD COLUMN "access_token" text NOT NULL;--> statement-breakpoint
ALTER TABLE "magic_link" DROP COLUMN IF EXISTS "expires_at";