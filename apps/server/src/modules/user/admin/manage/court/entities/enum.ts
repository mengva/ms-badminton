import { pgEnum } from "drizzle-orm/pg-core";

export const courtStatusEnum = pgEnum("court_status", ["Available", "Maintenance", "Occupied"]);
export const bookingStatusEnum = pgEnum("booking_status", ["Pending", "Confirmed", "Cancelled", "CheckedIn", "Completed"]);