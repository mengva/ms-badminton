import { staffs, users } from "@/server/db";
import { relations } from "drizzle-orm";

export const staffsRelations = relations(staffs, ({ one }) => ({
    user: one(users, {
        fields: [staffs.userId],
        references: [users.id],
    }),
}));