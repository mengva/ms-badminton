import z from "zod";
import { zodValidationEmail, zodValidationFilter, zodValidationFullName, zodValidationPassword, zodValidationPhoneNumber, zodValidationQuery } from "../variables";
import { zodValidationAddress, zodValidationCompanyName, zodValidationStaffIsActive } from "./variable";

export const zodValidationAddCourtOwner = z.object({
    fullName: zodValidationFullName,
    email: zodValidationEmail,
    phoneNumber: zodValidationPhoneNumber,
    password: zodValidationPassword,
    companyName: zodValidationCompanyName,
    address: zodValidationAddress
});

export const zodValidationSearchQueryCourtOwner = zodValidationFilter.extend({
    query: zodValidationQuery,
    isActive: zodValidationStaffIsActive
})

export type ZodValidationSearchQueryCourtOwner = z.infer<typeof zodValidationSearchQueryCourtOwner>;
export type ZodValidationAddCourtOwner = z.infer<typeof zodValidationAddCourtOwner>;