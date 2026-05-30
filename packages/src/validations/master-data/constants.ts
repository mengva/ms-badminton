import z from "zod";
import { zodValidationUuid } from "../variables";

export const zodValitionUserId = z.object({
    userId: zodValidationUuid
});

export type ZodValitionUserId = z.infer<typeof zodValitionUserId>;