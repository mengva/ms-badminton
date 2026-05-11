import { relations } from "drizzle-orm";
import { courts } from "./court";
import { images, users } from "@/server/modules/user/entities";
import { courtTypes } from "../../courtType/entities";
import { bookings } from "../../../bookings/entities";

export const courtsRelations = relations(courts, ({ one, many }) => ({
    owner: one(users, {
        fields: [courts.ownerId],
        references: [users.id],
    }),
    images: many(images),
    courtType: one(courtTypes, {
        fields: [courts.typeId],
        references: [courtTypes.id],
    }),
    bookings: many(bookings),
}));