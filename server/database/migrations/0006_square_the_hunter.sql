CREATE TABLE IF NOT EXISTS "magic_link" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"code" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "is_email_verified" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "magic_link" ADD CONSTRAINT "magic_link_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
