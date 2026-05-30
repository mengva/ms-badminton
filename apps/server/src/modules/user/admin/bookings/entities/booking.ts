import { users } from "@/server/modules/user/entities";
import {
    pgTable,
    uuid,
    text,
    timestamp,
    index,
    time,
    numeric,
    varchar,
} from "drizzle-orm/pg-core";
import { bookingStatusEnum } from "./enum";
import { courts } from "../../manage/court/entities";

// ==================== 9. Bookings ====================
export const bookings = pgTable("bookings", {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingCode: varchar("booking_code", { length: 30 }).notNull().unique(),
    customerId: uuid("customer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    cancelledById: uuid("cancelled_by_id").references(() => users.id, { onDelete: "cascade" }),
    courtId: uuid("court_id").notNull().references(() => courts.id, { onDelete: "cascade" }),
    staffId: uuid("staff_id").references(() => users.id, { onDelete: "cascade" }),
    bookingDate: timestamp("booking_date", { withTimezone: true }).defaultNow().notNull(),
    startTime: time("start_time").notNull(),
    endTime: time("end_time").notNull(),
    totalHours: numeric("total_hours", { precision: 5, scale: 2 }).notNull().default("0.00"),
    depositAmount: numeric("deposit_amount", { precision: 10, scale: 2 }).notNull().default("0.00"),
    totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull().default("0.00"),
    status: bookingStatusEnum("status").default("Pending"),
    cancelReason: text("cancel_reason"),
    players: varchar("players").notNull().default("0"),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("bookings_customer_id_idx").on(table.customerId),
    index("bookings_court_id_idx").on(table.courtId),
    index("bookings_staff_id_idx").on(table.staffId),
    index("bookings_cancelled_by_id_idx").on(table.cancelledById),
    index("bookings_date_idx").on(table.bookingDate),
    index("bookings_status_idx").on(table.status),
]);
