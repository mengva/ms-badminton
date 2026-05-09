// schema.ts
import {
    pgTable,
    uuid,
    varchar,
    text,
    numeric,
    timestamp,
    index,
} from "drizzle-orm/pg-core";
import { bookings } from "../../manage/court/entities";
import { users } from "../../../entities";
import { invoices } from "./invoices";
import { paymentMethodEnum, paymentStatusEnum, paymentTypeEnum } from "./enum";

// ==================== 12. Payments ====================
export const payments = pgTable("payments", {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingId: uuid("booking_id").notNull().references(() => bookings.id, { onDelete: "cascade" }),
    customerId: uuid("customer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    staffId: uuid("staff_id").references(() => users.id, { onDelete: "cascade" }),
    invoiceId: uuid("invoice_id").references(() => invoices.id, { onDelete: "cascade" }),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    paymentType: paymentTypeEnum("payment_type").notNull(),
    paymentMethod: paymentMethodEnum("payment_method").notNull(),
    paymentStatus: paymentStatusEnum("payment_status").default("Paid"),
    paymentDate: timestamp("payment_date", { withTimezone: true }).defaultNow().notNull(),
    notes: text("notes"),
    referenceNumber: varchar("reference_number", { length: 100 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("payments_booking_id_idx").on(table.bookingId),
    index("payments_customer_id_idx").on(table.customerId),
    index("payments_staff_id_idx").on(table.staffId),
    index("payments_date_idx").on(table.paymentDate),
]);