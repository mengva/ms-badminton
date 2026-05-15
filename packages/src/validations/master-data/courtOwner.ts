import z from "zod";
import { zodValidationEmail, zodValidationFullName, zodValidationPassword, zodValidationPhoneNumber } from "../variables";
import { zodValidationAddress, zodValidationCompanyName } from "./variable";

export const zodValidationAddCourtOwner = z.object({
    fullName: zodValidationFullName,
    email: zodValidationEmail,
    phoneNumber: zodValidationPhoneNumber,
    password: zodValidationPassword,
    companyName: zodValidationCompanyName,
    address: zodValidationAddress
});

export type ZodValidationAddCourtOwner = z.infer<typeof zodValidationAddCourtOwner>;