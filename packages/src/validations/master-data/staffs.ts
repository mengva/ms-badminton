import z from "zod";
import { zodValidationEmail, zodValidationFilter, zodValidationFullName, zodValidationPassword, zodValidationPhoneNumber, zodValidationQuery, zodValidationUuid } from "../variables";
import { zodValidationPosition, zodValidationSalary, zodValidationStaffIsActive } from "./variable";

export const zodValidationAddNewStaff = z.object({
    fullName: zodValidationFullName,
    email: zodValidationEmail,
    phoneNumber: zodValidationPhoneNumber,
    password: zodValidationPassword,
    salary: zodValidationSalary,
    position: zodValidationPosition,
});

export const zodValidationEditMyStaffInfo = z.object({
    fullName: zodValidationFullName,
    email: zodValidationEmail,
    phoneNumber: zodValidationPhoneNumber,
});

export const zodValidationSearchQueryStaff = zodValidationFilter.extend({
    query: zodValidationQuery,
    isActive: zodValidationStaffIsActive
})

export type ZodValidationAddNewStaff = z.infer<typeof zodValidationAddNewStaff>;
export type ZodValidationEditMyStaffInfo = z.infer<typeof zodValidationEditMyStaffInfo>;
export type ZodValidationSearchQueryStaff = z.infer<typeof zodValidationSearchQueryStaff>;