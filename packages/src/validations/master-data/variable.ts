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