import { relations } from "drizzle-orm";
import { payments } from "./payment";
import { users } from "../../../entities";
import { invoices } from "../../invoices/entities";
import { bookings } from "../../bookings/entities";

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