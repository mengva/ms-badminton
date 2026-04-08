CREATE TYPE "public"."image_type_enum" AS ENUM('profile', 'cover', 'court', 'other');--> statement-breakpoint
CREATE TYPE "public"."user_role_enum" AS ENUM('staff', 'customer', 'owner');--> statement-breakpoint
CREATE TYPE "public"."membership_type" AS ENUM('Regular', 'Member', 'VIP');--> statement-breakpoint
CREATE TABLE "user_credentials" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_credentials_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "user_images" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"image_key" text NOT NULL,
	"width" integer,
	"height" integer,
	"size" integer,
	"type" "image_type_enum" DEFAULT 'profile' NOT NULL,
	"is_primary" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(150) NOT NULL,
	"phone_number" varchar(20),
	"email" varchar(100),
	"role" "user_role_enum" DEFAULT 'customer' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"user_agent" varchar(255),
	"ip_address" varchar(50),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "staffs" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"position" varchar(100),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"membership_type" "membership_type" DEFAULT 'Regular',
	"date_of_birth" date,
	"address" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "court_owners" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"company_name" varchar(150),
	"address" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_credentials" ADD CONSTRAINT "user_credentials_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_images" ADD CONSTRAINT "user_images_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staffs" ADD CONSTRAINT "staffs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "court_owners" ADD CONSTRAINT "court_owners_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_images_type_idx" ON "user_images" USING btree ("type");--> statement-breakpoint
CREATE INDEX "user_images_is_primary_idx" ON "user_images" USING btree ("is_primary");--> statement-breakpoint
CREATE INDEX "users_phone_idx" ON "users" USING btree ("phone_number");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_role_idx" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "customers_membership_idx" ON "customers" USING btree ("membership_type");--> statement-breakpoint
CREATE INDEX "court_owners_company_idx" ON "court_owners" USING btree ("company_name");