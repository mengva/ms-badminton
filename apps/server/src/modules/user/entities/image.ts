
import { boolean, index, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { imageTypeEnum } from "./enum";
import { users } from "./user";
import { courts } from "../../../modules/user/admin/manage/court/entities";

// ==================== 3. User Images ====================
export const images = pgTable("images", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    courtId: uuid("court_id").references(() => courts.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    imageKey: text("image_key").notNull(),
    width: integer("width"),
    height: integer("height"),
    size: integer("size"),
    type: imageTypeEnum("type").default("Profile").notNull(),
    isPrimary: boolean("is_primary").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("images_type_idx").on(table.type),
    index("images_user_id_idx").on(table.userId),
    index("images_is_primary_idx").on(table.isPrimary),
]);