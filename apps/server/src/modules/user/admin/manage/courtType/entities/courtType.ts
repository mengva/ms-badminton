import {
    pgTable,
    uuid,
    varchar,
    text,
    timestamp,
    index,
    numeric,
} from "drizzle-orm/pg-core";

// ==================== 7. Court Types ====================
export const courtTypes = pgTable("court_types", {
    id: uuid("id").defaultRandom().primaryKey(),
    typeName: varchar("type_name", { length: 50 }).notNull().unique(),
    description: text("description"),
    hourlyRate: numeric("hourly_rate", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("court_types_name_idx").on(table.typeName),
]);