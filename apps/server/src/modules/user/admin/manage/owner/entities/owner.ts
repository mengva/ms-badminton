import { users } from "@/server/modules/user/entities";
import { index, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const courtOwners = pgTable("court_owners", {
    userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
    companyName: varchar("company_name", { length: 150 }),
    address: text("address"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("court_owners_company_idx").on(table.companyName),
]);