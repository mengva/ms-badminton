import z from "zod";
import { forbiddenHtmlRegex, forbiddenLinkRegex } from "../variables";

// variables const

const zodValidationTypeName = z.string()
    .nonempty("Type name is required")
    .refine(
        (val) => !forbiddenHtmlRegex.test(val),
        { message: "Type Name contain HTML tags or script characters (<, >)." }
    )
    .refine(
        (val) => !forbiddenLinkRegex.test(val),
        { message: "Type Name contain links (http://, https://, www.)." }
    )

const zodValidationDescription = z.string()
    .nonempty("Description is required")
    .refine(
        (val) => !forbiddenHtmlRegex.test(val),
        { message: "Description contain HTML tags or script characters (<, >)." }
    )
    .refine(
        (val) => !forbiddenLinkRegex.test(val),
        { message: "Description contain links (http://, https://, www.)." }
    )

const zodValidationHourlyRate = z.string()
    .nonempty("Hourly rate is required")
    .regex(/^\d+$/, "Hourly rate must contain numbers only (0-9)")
    .refine(
        (val) => !forbiddenHtmlRegex.test(val),
        { message: "Hourly rate cannot contain HTML tags or script characters (<, >)." }
    )
    .refine(
        (val) => !forbiddenLinkRegex.test(val),
        { message: "Hourly rate cannot contain links (http://, https://, www.)." }
    )

// variable zod object
export const zodValidationAddCourtTypeInfo = z.object({
    typeName: zodValidationTypeName,
    description: zodValidationDescription,
    hourlyRate: zodValidationHourlyRate
});

export type ZodValidationAddCourtTypeInfo = z.infer<typeof zodValidationAddCourtTypeInfo>;
