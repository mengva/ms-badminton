import { relations } from "drizzle-orm";
import { bookings } from "./booking";
import { users } from "../../../entities";
import { courts } from "../../manage/court/entities";
import { payments } from "../../payment/entities";
import { invoices } from "../../invoices/entities";
import { checkIns } from "../../checkIns/entities";
import { checkOuts } from "../../checkOuts/entities";

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
    customer: one(users, {
        fields: [bookings.customerId],
        references: [users.id],
    }),
    court: one(courts, {
        fields: [bookings.courtId],
        references: [courts.id],
    }),
    staff: one(users, {
        fields: [bookings.staffId],
        references: [users.id],
    }),
    checkIn: one(checkIns, {
        fields: [bookings.id],
        references: [checkIns.bookingId],
    }),
    checkOut: one(checkOuts, {
        fields: [bookings.id],
        references: [checkOuts.bookingId],
    }),
    payments: many(payments),
    invoices: many(invoices),
}));
