import {
    pgTable,
    uuid,
    text,
    timestamp,
    index,
    numeric,
} from "drizzle-orm/pg-core";
import { users } from "@/server/modules/user/entities";
import { bookings } from "../../bookings/entities";

// ==================== 11. Check Outs ====================
export const checkOuts = pgTable("check_outs", {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingId: uuid("booking_id").notNull().references(() => bookings.id, { onDelete: "cascade" }),
    staffId: uuid("staff_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    customerId: uuid("customer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    checkOutTime: timestamp("checkout_time", { withTimezone: true }).defaultNow().notNull(),
    actualEndTime: timestamp("actual_end_time", { withTimezone: true }).defaultNow().notNull(),
    extraHours: numeric("extra_hours", { precision: 5, scale: 2 }).default("0.00"),
    extraCharge: numeric("extra_charge", { precision: 10, scale: 2 }).default("0.00"),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("check_outs_booking_id_idx").on(table.bookingId),
    index("check_outs_staff_id_idx").on(table.staffId),
    index("check_outs_customer_id_idx").on(table.customerId),
]);
