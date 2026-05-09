import { relations } from "drizzle-orm";
import { staffs } from "./staff";
import { users } from "@/server/modules/user/entities";

export const staffsRelations = relations(staffs, ({ one }) => ({
    user: one(users, {
        fields: [staffs.userId],
        references: [users.id],
    }),
}));