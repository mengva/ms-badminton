import { relations } from "drizzle-orm";
import { courts } from "./court";
import { images, users } from "@/server/modules/user/entities";
import { courtTypes } from "../../courtType/entities";
import { invoices, payments } from "../../../payment/entities";
import { bookings } from "./booking";
import { checkIns } from "./checkIn";
import { checkOuts } from "./checkOut";

export const courtsRelations = relations(courts, ({ one, many }) => ({
    owner: one(users, {
        fields: [courts.ownerId],
        references: [users.id],
    }),
    images: many(images),
    courtType: one(courtTypes, {
        fields: [courts.typeId],
        references: [courtTypes.id],
    }),
    bookings: many(bookings),
}));

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
