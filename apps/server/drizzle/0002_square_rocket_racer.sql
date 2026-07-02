ALTER TYPE "public"."court_status" ADD VALUE 'Booked';--> statement-breakpoint
ALTER TYPE "public"."invoice_status" ADD VALUE 'FullPaid' BEFORE 'Paid';--> statement-breakpoint
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_booking_id_unique";--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "players" varchar DEFAULT '0' NOT NULL;