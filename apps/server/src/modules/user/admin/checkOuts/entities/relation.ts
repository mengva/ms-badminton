import { relations } from "drizzle-orm";
import { checkOuts } from "./checkOut";
import { bookings } from "../../bookings/entities";
import { users } from "../../../entities";

// FIX #9: Added this fields/references in checkOutsRelations
export const checkOutsRelations = relations(checkOuts, ({ one }) => ({
    booking: one(bookings, {
        fields: [checkOuts.bookingId],
        references: [bookings.id],
    }),
    staff: one(users, {
        fields: [checkOuts.staffId],
        references: [users.id],
    }),
    customer: one(users, {
        fields: [checkOuts.customerId],
        references: [users.id],
    }),
}));
