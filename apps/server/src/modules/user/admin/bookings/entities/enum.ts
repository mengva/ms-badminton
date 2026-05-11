import { pgEnum } from "drizzle-orm/pg-core";

export const bookingStatusEnum = pgEnum("booking_status", ["Pending", "Confirmed", "Cancelled", "CheckedIn", "Completed"]);