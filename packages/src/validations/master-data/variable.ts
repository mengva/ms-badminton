import z from "zod";
import { forbiddenHtmlRegex, forbiddenLinkRegex } from "../variables";

export const zodValidationSalary = z.string()
    .regex(/^\d+$/, "Salary must contain only numbers")
    .nonempty("Salary is required")
    .refine(
        (val) => !forbiddenHtmlRegex.test(val),
        { message: "Salary cannot contain HTML tags or script characters (<, >)." }
    )
    .refine(
        (val) => !forbiddenLinkRegex.test(val),
        { message: "Salary cannot contain links (http://, https://, www.)." }
    )

export const zodValidationCompanyName = z.string()
    .refine(
        (val) => !forbiddenHtmlRegex.test(val),
        { message: "Company Name cannot contain HTML tags or script characters (<, >)." }
    )
    .refine(
        (val) => !forbiddenLinkRegex.test(val),
        { message: "Company Name cannot contain links (http://, https://, www.)." }
    ).default("")

export const zodValidationCourtType = z.string()
    .refine(
        (val) => !forbiddenHtmlRegex.test(val),
        { message: "Court type cannot contain HTML tags or script characters (<, >)." }
    )
    .refine(
        (val) => !forbiddenLinkRegex.test(val),
        { message: "Court type cannot contain links (http://, https://, www.)." }
    ).default("")

export const zodValidationCourtName = z.string()
    .refine(
        (val) => !forbiddenHtmlRegex.test(val),
        { message: "Court name cannot contain HTML tags or script characters (<, >)." }
    )
    .refine(
        (val) => !forbiddenLinkRegex.test(val),
        { message: "Court name cannot contain links (http://, https://, www.)." }
    ).default("")

export const zodValidationLocation = z.string()
    .refine(
        (val) => !forbiddenHtmlRegex.test(val),
        { message: "Location cannot contain HTML tags or script characters (<, >)." }
    )
    .refine(
        (val) => !forbiddenLinkRegex.test(val),
        { message: "Location cannot contain links (http://, https://, www.)." }
    ).default("")

export const zodValidationStaffIsActive = z.enum(["Active", "InActive"]).default("Active");

export const zodValidationAddCourtStatus = z.enum(["Available", "Maintenance"]).default("Available");


export const zodValidationAddress = z.string()
    .nonempty("Address is required")
    .refine(
        (val) => !forbiddenHtmlRegex.test(val),
        { message: "Address cannot contain HTML tags or script characters (<, >)." }
    )
    .refine(
        (val) => !forbiddenLinkRegex.test(val),
        { message: "Address cannot contain links (http://, https://, www.)." }
    )

export const zodValidationPosition = z.enum(["Manager", "Staff"], {
    errorMap: () => ({ message: "Position must be either 'Manager' or 'Staff'" })
})