import z from "zod";
import { zodValidationAddCourtStatus, zodValidationCourtName, zodValidationCourtType, zodValidationLocation, zodValidationStaffIsActive } from "./variable";
import { zodValidationFiles, zodValidationFilter, zodValidationQuery } from "../variables";

export const zodValidationAddCourtInfo = z.object({
    courtType: zodValidationCourtType,
    courtName: zodValidationCourtName,
    location: zodValidationLocation,
    status: zodValidationAddCourtStatus,
});

export const zodValidationAddCourtInfoAndImage = zodValidationAddCourtInfo.extend({
    files: zodValidationFiles
});

export const zodValidationSearchQueryCourt = zodValidationFilter.extend({
    query: zodValidationQuery,
    isActive: zodValidationStaffIsActive
})

export type ZodValidationSearchQueryCourt = z.infer<typeof zodValidationSearchQueryCourt>;
export type ZodValidationAddCourtInfo = z.infer<typeof zodValidationAddCourtInfo>;
export type ZodValidationAddCourtInfoAndImage = z.infer<typeof zodValidationAddCourtInfoAndImage>;
