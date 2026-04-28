ALTER TABLE "images" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "type" SET DEFAULT 'Profile'::text;--> statement-breakpoint
DROP TYPE "public"."image_type_enum";--> statement-breakpoint
CREATE TYPE "public"."image_type_enum" AS ENUM('Profile', 'Cover', 'Court', 'Other');--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "type" SET DEFAULT 'Profile'::"public"."image_type_enum";--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "type" SET DATA TYPE "public"."image_type_enum" USING "type"::"public"."image_type_enum";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'Customer'::text;--> statement-breakpoint
DROP TYPE "public"."user_role_enum";--> statement-breakpoint
CREATE TYPE "public"."user_role_enum" AS ENUM('Staff', 'Customer', 'Owner');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'Customer'::"public"."user_role_enum";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."user_role_enum" USING "role"::"public"."user_role_enum";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'images'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "images" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "images" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
CREATE INDEX "images_user_id_idx" ON "images" USING btree ("user_id");