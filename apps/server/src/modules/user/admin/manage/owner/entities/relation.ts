import { relations } from "drizzle-orm";
import { courtOwners } from "./owner";
import { users } from "@/server/modules/user/entities";

export const ownerRelations = relations(courtOwners, ({ one }) => ({
    user: one(users, {
        fields: [courtOwners.userId],
        references: [users.id],
    }),
}));