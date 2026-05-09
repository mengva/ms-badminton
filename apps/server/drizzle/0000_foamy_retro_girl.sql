CREATE TYPE "public"."image_type_enum" AS ENUM('Profile', 'Cover', 'Court', 'Other');--> statement-breakpoint
CREATE TYPE "public"."user_role_enum" AS ENUM('Staff', 'Customer', 'Owner');--> statement-breakpoint
CREATE TYPE "public"."booking_status" AS ENUM('Pending', 'Confirmed', 'Cancelled', 'CheckedIn', 'Completed');--> statement-breakpoint
CREATE TYPE "public"."court_status" AS ENUM('Available', 'Maintenance', 'Occupied');--> statement-breakpoint
CREATE TYPE "public"."invoice_status" AS ENUM('Unpaid', 'PartiallyPaid', 'Paid', 'Cancelled');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('Cash', 'Bank Transfer', 'QR Code', 'Card');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('Paid', 'Pending', 'Failed');--> statement-breakpoint
CREATE TYPE "public"."payment_type" AS ENUM('Deposit', 'Full', 'Remaining', 'Refund');--> statement-breakpoint
CREATE TYPE "public"."membership_type" AS ENUM('Regular', 'Member', 'VIP');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(150) NOT NULL,
	"phone_number" varchar(20),
	"email" varchar(100),
	"role" "user_role_enum" DEFAULT 'Customer' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"user_agent" varchar(255),
	"ip_address" varchar(50),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"url" text NOT NULL,
	"image_key" text NOT NULL,
	"width" integer,
	"height" integer,
	"size" integer,
	"type" "image_type_enum" DEFAULT 'Profile' NOT NULL,
	"is_primary" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_credentials" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"type_id" uuid NOT NULL,
	"court_name" varchar(100) NOT NULL,
	"location" text,
	"status" "court_status" DEFAULT 'Available',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" uuid NOT NULL,
	"cancelled_by_id" uuid,
	"court_id" uuid NOT NULL,
	"staff_id" uuid,
	"booking_date" timestamp with time zone DEFAULT now() NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"total_hours" numeric(5, 2) DEFAULT '0.00' NOT NULL,
	"deposit_amount" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"total_amount" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"status" "booking_status" DEFAULT 'Pending',
	"cancel_reason" text,
	"cancelled_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "check_ins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"staff_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"checkin_time" timestamp with time zone DEFAULT now() NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "check_ins_booking_id_unique" UNIQUE("booking_id")
);
--> statement-breakpoint
CREATE TABLE "check_outs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"staff_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"checkout_time" timestamp with time zone DEFAULT now() NOT NULL,
	"actual_end_time" timestamp with time zone DEFAULT now() NOT NULL,
	"extra_hours" numeric(5, 2) DEFAULT '0.00',
	"extra_charge" numeric(10, 2) DEFAULT '0.00',
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "check_outs_booking_id_unique" UNIQUE("booking_id")
);
--> statement-breakpoint
CREATE TABLE "court_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type_name" varchar(50) NOT NULL,
	"description" text,
	"hourly_rate" numeric(10, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "court_types_type_name_unique" UNIQUE("type_name")
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"staff_id" uuid,
	"invoice_id" uuid,
	"amount" numeric(10, 2) NOT NULL,
	"payment_type" "payment_type" NOT NULL,
	"payment_method" "payment_method" NOT NULL,
	"payment_status" "payment_status" DEFAULT 'Paid',
	"payment_date" timestamp with time zone DEFAULT now() NOT NULL,
	"notes" text,
	"reference_number" varchar(100),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"invoice_code" varchar(30) NOT NULL,
	"booking_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"issued_by_id" uuid,
	"subtotal" numeric(10, 2) NOT NULL,
	"discount" numeric(10, 2) DEFAULT '0.00',
	"tax" numeric(10, 2) DEFAULT '0.00',
	"total_amount" numeric(10, 2) NOT NULL,
	"paid_amount" numeric(10, 2) DEFAULT '0.00',
	"balance" numeric(10, 2) DEFAULT '0.00',
	"status" "invoice_status" DEFAULT 'Unpaid',
	"issue_date" timestamp with time zone DEFAULT now() NOT NULL,
	"due_date" timestamp with time zone,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "invoices_invoice_code_unique" UNIQUE("invoice_code")
);
--> statement-breakpoint
CREATE TABLE "staffs" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"salary" varchar(50) NOT NULL,
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
ALTER TABLE "images" ADD CONSTRAINT "images_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_credentials" ADD CONSTRAINT "user_credentials_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courts" ADD CONSTRAINT "courts_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courts" ADD CONSTRAINT "courts_type_id_court_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."court_types"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_cancelled_by_id_users_id_fk" FOREIGN KEY ("cancelled_by_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_court_id_courts_id_fk" FOREIGN KEY ("court_id") REFERENCES "public"."courts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_staff_id_users_id_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_staff_id_users_id_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "check_outs" ADD CONSTRAINT "check_outs_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "check_outs" ADD CONSTRAINT "check_outs_staff_id_users_id_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "check_outs" ADD CONSTRAINT "check_outs_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_staff_id_users_id_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_issued_by_id_users_id_fk" FOREIGN KEY ("issued_by_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staffs" ADD CONSTRAINT "staffs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "court_owners" ADD CONSTRAINT "court_owners_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "users_phone_idx" ON "users" USING btree ("phone_number");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_role_idx" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "images_type_idx" ON "images" USING btree ("type");--> statement-breakpoint
CREATE INDEX "images_user_id_idx" ON "images" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "images_is_primary_idx" ON "images" USING btree ("is_primary");--> statement-breakpoint
CREATE INDEX "courts_owner_id_idx" ON "courts" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "courts_type_id_idx" ON "courts" USING btree ("type_id");--> statement-breakpoint
CREATE INDEX "courts_status_idx" ON "courts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "courts_name_idx" ON "courts" USING btree ("court_name");--> statement-breakpoint
CREATE INDEX "bookings_customer_id_idx" ON "bookings" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "bookings_court_id_idx" ON "bookings" USING btree ("court_id");--> statement-breakpoint
CREATE INDEX "bookings_staff_id_idx" ON "bookings" USING btree ("staff_id");--> statement-breakpoint
CREATE INDEX "bookings_cancelled_by_id_idx" ON "bookings" USING btree ("cancelled_by_id");--> statement-breakpoint
CREATE INDEX "bookings_date_idx" ON "bookings" USING btree ("booking_date");--> statement-breakpoint
CREATE INDEX "bookings_status_idx" ON "bookings" USING btree ("status");--> statement-breakpoint
CREATE INDEX "check_ins_booking_id_idx" ON "check_ins" USING btree ("booking_id");--> statement-breakpoint
CREATE INDEX "check_ins_staff_id_idx" ON "check_ins" USING btree ("staff_id");--> statement-breakpoint
CREATE INDEX "check_ins_customer_id_idx" ON "check_ins" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "check_outs_booking_id_idx" ON "check_outs" USING btree ("booking_id");--> statement-breakpoint
CREATE INDEX "check_outs_staff_id_idx" ON "check_outs" USING btree ("staff_id");--> statement-breakpoint
CREATE INDEX "check_outs_customer_id_idx" ON "check_outs" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "court_types_name_idx" ON "court_types" USING btree ("type_name");--> statement-breakpoint
CREATE INDEX "payments_booking_id_idx" ON "payments" USING btree ("booking_id");--> statement-breakpoint
CREATE INDEX "payments_customer_id_idx" ON "payments" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "payments_staff_id_idx" ON "payments" USING btree ("staff_id");--> statement-breakpoint
CREATE INDEX "payments_date_idx" ON "payments" USING btree ("payment_date");--> statement-breakpoint
CREATE INDEX "invoices_booking_id_idx" ON "invoices" USING btree ("booking_id");--> statement-breakpoint
CREATE INDEX "invoices_customer_id_idx" ON "invoices" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "invoices_issued_by_id_idx" ON "invoices" USING btree ("issued_by_id");--> statement-breakpoint
CREATE INDEX "invoices_status_idx" ON "invoices" USING btree ("status");--> statement-breakpoint
CREATE INDEX "invoices_issue_date_idx" ON "invoices" USING btree ("issue_date");--> statement-breakpoint
CREATE INDEX "customers_membership_idx" ON "customers" USING btree ("membership_type");--> statement-breakpoint
CREATE INDEX "court_owners_company_idx" ON "court_owners" USING btree ("company_name");