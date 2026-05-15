import z from "zod";
import { zodValidationEmail, zodValidationFullName, zodValidationPassword, zodValidationPhoneNumber } from "../variables";
import { zodValidationSalary } from "./variable";

export const zodValidationAddStaff = z.object({
    fullName: zodValidationFullName,
    email: zodValidationEmail,
    phoneNumber: zodValidationPhoneNumber,
    password: zodValidationPassword,
    salary: zodValidationSalary,
    position: z.enum(["Manager", "Staff"], {
        errorMap: () => ({ message: "Position must be either 'Manager' or 'Staff'" })
    }),
});

export type ZodValidationAddStaff = z.infer<typeof zodValidationAddStaff>;