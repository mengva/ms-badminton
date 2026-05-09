import { relations } from "drizzle-orm";
import { users } from "./user";
import { userCredentials } from "./userCredential";
import { images } from "./image";
import { courtOwners } from "../admin/manage/owner/entities";
import { staffs } from "../admin/manage/staff/entities";
import { customers } from "../admin/manage/customer/entities";
import { bookings, checkIns, checkOuts, courts } from "../admin/manage/court/entities";
import { invoices, payments } from "../admin/payment/entities";

export const usersRelations = relations(users, ({ one, many }) => ({
    credentials: one(userCredentials, {
        fields: [users.id],
        references: [userCredentials.userId],
    }),
    images: many(images),
    courtOwner: one(courtOwners, {
        fields: [users.id],
        references: [courtOwners.userId],
    }),
    staff: one(staffs, {
        fields: [users.id],
        references: [staffs.userId],
    }),
    customer: one(customers, {
        fields: [users.id],
        references: [customers.userId],
    }),
    courts: many(courts),
    checkInAsStaffs: many(checkIns),
    checkOutAsStaffs: many(checkOuts),
    checkInAsCustomers: many(checkIns),
    checkOutAsCustomers: many(checkOuts),
    paymentsAsStaffs: many(payments),
    paymentsAsCustomers: many(payments),
    bookingsAsCustomers: many(bookings),
    bookingsAsStaffs: many(bookings),
    invoicesByStaffs: many(invoices),
    invoicesByCustomers: many(invoices),
}));


export const userCredentialsRelations = relations(userCredentials, ({ one }) => ({
    user: one(users, {
        fields: [userCredentials.userId],
        references: [users.id],
    }),
}));

export const imagesRelations = relations(images, ({ one }) => ({
    user: one(users, {
        fields: [images.userId],
        references: [users.id],
    }),
}));