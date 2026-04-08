import { customers, users } from "@/server/db";
import { relations } from "drizzle-orm";

export const customerRelations = relations(customers, ({ one }) => ({
    user: one(users, {
        fields: [customers.userId],
        references: [users.id],
    }),
}));