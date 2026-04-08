import { courtOwners, users } from "@/server/db";
import { relations } from "drizzle-orm";

export const ownerRelations = relations(courtOwners, ({ one }) => ({
    user: one(users, {
        fields: [courtOwners.userId],
        references: [users.id],
    }),
}));