import z from "zod";
import { zodValidationSearchQueryStaff } from "./staffs";

export const zodValidationSearchQueryCustomer = zodValidationSearchQueryStaff;

export type ZodValidationSearchQueryCustomer = z.infer<typeof zodValidationSearchQueryCustomer>;
