ALTER TABLE "payments" ADD COLUMN "payment_code" varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "booking_code" varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE "check_ins" ADD COLUMN "check_in_code" varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE "check_outs" ADD COLUMN "check_out_code" varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_payment_code_unique" UNIQUE("payment_code");--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_booking_code_unique" UNIQUE("booking_code");--> statement-breakpoint
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_check_in_code_unique" UNIQUE("check_in_code");--> statement-breakpoint
ALTER TABLE "check_outs" ADD CONSTRAINT "check_outs_check_out_code_unique" UNIQUE("check_out_code");