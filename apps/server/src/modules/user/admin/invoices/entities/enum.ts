import { pgEnum } from "drizzle-orm/pg-core";

export const invoiceStatusEnum = pgEnum("invoice_status", ["Unpaid", "PartiallyPaid", "FullPaid", "Paid", "Cancelled"]);