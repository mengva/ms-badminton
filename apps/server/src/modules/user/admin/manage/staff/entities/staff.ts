import { users } from "@/server/db";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const staffs = pgTable("staffs", {
    userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
    position: varchar("position", { length: 100 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
});