import {
    pgTable,
    uuid,
    text,
    timestamp,
    date,
    index,
} from "drizzle-orm/pg-core";
import { membershipTypeEnum } from "./enum";
import { users } from "@/server/modules/user/entities";

export const customers = pgTable("customers", {
    userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
    membershipType: membershipTypeEnum("membership_type").default("Regular"),
    dateOfBirth: date("date_of_birth"),
    address: text("address"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("customers_membership_idx").on(table.membershipType),
]);