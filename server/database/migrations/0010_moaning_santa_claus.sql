CREATE TABLE IF NOT EXISTS "cron_jobs" (
	"id" text NOT NULL,
	"create_at" timestamp with time zone DEFAULT now()
);
