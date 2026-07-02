import {
    pgTable,
    uuid,
    text,
    timestamp,
    index,
    varchar,
} from "drizzle-orm/pg-core";
import { users } from "@/server/modules/user/entities";
import { bookings } from "../../bookings/entities";

// ==================== 10. Check Ins ====================
export const checkIns = pgTable("check_ins", {
    id: uuid("id").defaultRandom().primaryKey(),
    checkInCode: varchar("check_in_code", { length: 30 }).notNull().unique(),
    bookingId: uuid("booking_id").notNull().references(() => bookings.id, { onDelete: "cascade" }),
    staffId: uuid("staff_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    customerId: uuid("customer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    checkinTime: timestamp("checkin_time", { withTimezone: true }).defaultNow().notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("check_ins_booking_id_idx").on(table.bookingId),
    index("check_ins_staff_id_idx").on(table.staffId),
    index("check_ins_customer_id_idx").on(table.customerId),
]);
