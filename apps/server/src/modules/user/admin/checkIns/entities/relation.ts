import { relations } from "drizzle-orm";
import { checkIns } from "./checkIn";
import { bookings } from "../../bookings/entities";
import { users } from "../../../entities";

// FIX #8: Added this fields/references in checkInsRelations
export const checkInsRelations = relations(checkIns, ({ one }) => ({
    booking: one(bookings, {
        fields: [checkIns.bookingId],
        references: [bookings.id],
    }),
    staff: one(users, {
        fields: [checkIns.staffId],
        references: [users.id],
    }),
    customer: one(users, {
        fields: [checkIns.customerId],
        references: [users.id],
    }),
}));