import { users } from "@/server/modules/user/entities";
import {
    pgTable,
    uuid,
    varchar,
    text,
    timestamp,
    index,
    boolean,
} from "drizzle-orm/pg-core";
import { courtTypes } from "../../courtType/entities";
import { courtStatusEnum } from "./enum";

// ==================== 8. Courts ====================
export const courts = pgTable("courts", {
    id: uuid("id").defaultRandom().primaryKey(),
    ownerId: uuid("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    typeId: uuid("type_id").notNull().references(() => courtTypes.id, { onDelete: "cascade" }),
    courtName: varchar("court_name", { length: 100 }).notNull(),
    location: text("location"),
    isActive: boolean("is_active").default(true).notNull(),
    status: courtStatusEnum("status").default("Available"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("courts_owner_id_idx").on(table.ownerId),
    index("courts_type_id_idx").on(table.typeId),
    index("courts_status_idx").on(table.status),
    index("courts_name_idx").on(table.courtName),
]);
