import { relations } from "drizzle-orm";
import { customers } from "./customer";
import { users } from "@/server/modules/user/entities";

export const customerRelations = relations(customers, ({ one }) => ({
    user: one(users, {
        fields: [customers.userId],
        references: [users.id],
    }),
}));