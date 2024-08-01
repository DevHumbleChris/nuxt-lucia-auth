ALTER TABLE "magic_link" ADD COLUMN "expires_at" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "magic_link" DROP COLUMN IF EXISTS "access_token";