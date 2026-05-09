import { users } from "@/server/modules/user/entities";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const staffs = pgTable("staffs", {
    userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
    salary: varchar("salary", { length: 50 }).notNull(),
    position: varchar("position", { length: 100 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
});