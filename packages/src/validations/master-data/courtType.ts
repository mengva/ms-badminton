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

const zodValidationHourtyRate = z.string()
    .nonempty("hourly Rate is required")
    .refine(
        (val) => !forbiddenHtmlRegex.test(val),
        { message: "hourly Rate contain HTML tags or script characters (<, >)." }
    )
    .refine(
        (val) => !forbiddenLinkRegex.test(val),
        { message: "hourly Rate contain links (http://, https://, www.)." }
    )

// variable zod object
export const zodValidationAddCourtTypeInfo = z.object({
    typeName: zodValidationTypeName,
    description: zodValidationDescription,
    hourlyRate: zodValidationHourtyRate
});

export type ZodValidationAddCourtTypeInfo = z.infer<typeof zodValidationAddCourtTypeInfo>;
