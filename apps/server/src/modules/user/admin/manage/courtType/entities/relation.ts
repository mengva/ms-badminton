import { relations } from "drizzle-orm";
import { courtTypes } from "./courtType";
import { courts } from "../../court/entities";

export const courtTypesRelations = relations(courtTypes, ({ many }) => ({
    courts: many(courts),
}));