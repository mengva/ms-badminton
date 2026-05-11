import {
    pgTable,
    uuid,
    varchar,
    text,
    numeric,
    timestamp,
    index,
} from "drizzle-orm/pg-core";
import { users } from "../../../entities";
import { invoiceStatusEnum } from "./enum";
import { bookings } from "../../bookings/entities";

// ==================== 13. Invoices ====================
export const invoices = pgTable("invoices", {
    id: uuid("id").defaultRandom().primaryKey(),
    invoiceCode: varchar("invoice_code", { length: 30 }).notNull().unique(),
    bookingId: uuid("booking_id").notNull().references(() => bookings.id, { onDelete: "cascade" }),
    customerId: uuid("customer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    issuedById: uuid("issued_by_id").references(() => users.id, { onDelete: "cascade" }),
    subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
    discount: numeric("discount", { precision: 10, scale: 2 }).default("0.00"),
    tax: numeric("tax", { precision: 10, scale: 2 }).default("0.00"),
    totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
    paidAmount: numeric("paid_amount", { precision: 10, scale: 2 }).default("0.00"),
    balance: numeric("balance", { precision: 10, scale: 2 }).default("0.00"),
    status: invoiceStatusEnum("status").default("Unpaid"),
    issueDate: timestamp("issue_date", { withTimezone: true }).defaultNow().notNull(),
    dueDate: timestamp("due_date", { withTimezone: true }),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("invoices_booking_id_idx").on(table.bookingId),
    index("invoices_customer_id_idx").on(table.customerId),
    index("invoices_issued_by_id_idx").on(table.issuedById),
    index("invoices_status_idx").on(table.status),
    index("invoices_issue_date_idx").on(table.issueDate),
]);