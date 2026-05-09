import { relations } from "drizzle-orm";
import { payments } from "./payment";
import { bookings } from "../../manage/court/entities";
import { users } from "../../../entities";
import { invoices } from "./invoices";

// FIX #10: Added this fields/references in paymentsRelations
export const paymentsRelations = relations(payments, ({ one }) => ({
    booking: one(bookings, {
        fields: [payments.bookingId],
        references: [bookings.id],
    }),
    customer: one(users, {
        fields: [payments.customerId],
        references: [users.id],
    }),
    staff: one(users, {
        fields: [payments.staffId],
        references: [users.id],
    }),
    invoice: one(invoices, {
        fields: [payments.invoiceId],
        references: [invoices.id],
    }),
}));

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
    booking: one(bookings, {
        fields: [invoices.bookingId],
        references: [bookings.id],
    }),
    customer: one(users, {
        fields: [invoices.customerId],
        references: [users.id],
    }),
    issuedBy: one(users, {
        fields: [invoices.issuedById],
        references: [users.id],
    }),
    payments: many(payments),
}));