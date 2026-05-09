
import { boolean, index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { userRoleEnum } from "./enum";

// ==================== 1. Users (Base Table) ====================
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    fullName: varchar("full_name", { length: 150 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 20 }).unique(),
    email: varchar("email", { length: 100 }).unique(),
    role: userRoleEnum("role").notNull().default("Customer"),
    isActive: boolean("is_active").default(true).notNull(),
    userAgent: varchar("user_agent", { length: 255 }),
    ipAddress: varchar("ip_address", { length: 50 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("users_phone_idx").on(table.phoneNumber),
    index("users_email_idx").on(table.email),
    index("users_role_idx").on(table.role),
]);
