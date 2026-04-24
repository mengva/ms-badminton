import { relations } from "drizzle-orm";
import { userCredentials, images, users } from "./user";
import { courtOwners, customers, staffs } from "@/server/db";

export const usersRelations = relations(users, ({ one, many }) => ({
    credentials: one(userCredentials, {
        fields: [users.id],
        references: [userCredentials.userId],
    }),
    images: many(images),
    staff: one(staffs, {
        fields: [users.id],
        references: [staffs.userId],
    }),
    owner: one(courtOwners, {
        fields: [users.id],
        references: [courtOwners.userId],
    }),
    customer: one(customers, {
        fields: [users.id],
        references: [customers.userId],
    }),
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