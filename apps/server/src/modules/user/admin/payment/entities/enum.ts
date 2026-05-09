import { pgEnum } from "drizzle-orm/pg-core";

// ==================== Enums ====================
export const paymentTypeEnum = pgEnum("payment_type", ["Deposit", "Full", "Remaining", "Refund"]);
export const paymentMethodEnum = pgEnum("payment_method", ["Cash", "Bank Transfer", "QR Code", "Card"]);
export const paymentStatusEnum = pgEnum("payment_status", ["Paid", "Pending", "Failed"]);
export const invoiceStatusEnum = pgEnum("invoice_status", ["Unpaid", "PartiallyPaid", "Paid", "Cancelled"]);