import { relations } from "drizzle-orm";
import { invoices } from "./invoices";
import { users } from "../../../entities";
import { payments } from "../../payment/entities";
import { bookings } from "../../bookings/entities";

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