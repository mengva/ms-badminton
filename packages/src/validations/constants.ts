import z from "zod";
import { zodValidationStatus, zodValidationUuid } from "./variables";

export const zodValidationGlobalStatus = z.object({
    status: zodValidationStatus,
    staffId: zodValidationUuid,
});

export type ZodValidationGlobalStatus = z.infer<typeof zodValidationGlobalStatus>;
