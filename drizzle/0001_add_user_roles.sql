CREATE TYPE "user_role" AS ENUM ('user', 'moderator', 'administrator', 'super_administrator');
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "user_role" DEFAULT 'user' NOT NULL;
