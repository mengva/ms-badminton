// schema.ts
import {
    pgTable,
    uuid,
    varchar,
    text,
    numeric,
    timestamp,
    pgEnum,
    time,
    date,
    index,
    boolean,
    integer
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ==================== Enums ====================
export const courtStatusEnum = pgEnum("court_status", ["Available", "Maintenance", "Occupied", "Booked"]);
export const userRoleEnum = pgEnum("user_role", ["Staff", "Owner", "Customer"]);
export const membershipTypeEnum = pgEnum("membership_type", ["Regular", "Member", "VIP"]);
export const bookingStatusEnum = pgEnum("booking_status", ["Pending", "Confirmed", "Cancelled", "CheckedIn", "Completed"]);
export const paymentTypeEnum = pgEnum("payment_type", ["Deposit", "Full", "Remaining", "Refund"]);
export const paymentMethodEnum = pgEnum("payment_method", ["Cash", "Bank Transfer", "QR Code", "Card"]);
export const imageTypeEnum = pgEnum("image_type", ["profile", "cover", "court", "other"]);
export const paymentStatusEnum = pgEnum("payment_status", ["Paid", "Pending", "Failed"]);
export const invoiceStatusEnum = pgEnum("invoice_status", ["Unpaid", "PartiallyPaid", "FullPaid", "Paid", "Cancelled"]);

// ==================== 1. Users (Base Table) ====================
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    fullName: varchar("full_name", { length: 150 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 20 }).unique(),
    email: varchar("email", { length: 100 }).unique(),
    role: userRoleEnum("role").notNull().default("Customer"),
    isActive: boolean("is_active").default(true).notNull(),
    userAgent: varchar("user_agent", { length: 255 }).notNull(),
    ipAddress: varchar("ip_address", { length: 50 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("users_phone_idx").on(table.phoneNumber),
    index("users_email_idx").on(table.email),
    index("users_role_idx").on(table.role),
]);

// ==================== 2. User Credentials ====================
export const userCredentials = pgTable("user_credentials", {
    userId: uuid("user_id").primaryKey().notNull().unique().references(() => users.id, { onDelete: "cascade" }),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
});

// ==================== 3. User Images ====================
export const images = pgTable("images", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    courtId: uuid("court_id").references(() => courts.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    imageKey: text("image_key").notNull(),
    width: integer("width").notNull(),
    height: integer("height").notNull(),
    size: integer("size").notNull(),
    type: imageTypeEnum("type").default("profile").notNull(),
    isPrimary: boolean("is_primary").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("images_user_id_idx").on(table.userId),
    index("images_court_id_idx").on(table.courtId),
    index("images_type_idx").on(table.type),
    index("images_is_primary_idx").on(table.isPrimary),
]);

// ==================== 4. Court Owners Extension ====================
// FIX #2
export const courtOwners = pgTable("court_owners", {
    userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
    companyName: varchar("company_name", { length: 150 }),
    address: text("address").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("court_owners_company_idx").on(table.companyName),
]);

// ==================== 5. Staff Extension ====================
// FIX #3
export const staffs = pgTable("staffs", {
    userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
    salary: numeric("salary", { precision: 10, scale: 2 }),
    position: varchar("position", { length: 100 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
});

// ==================== 6. Customers Extension ====================
// FIX #4
export const customers = pgTable("customers", {
    userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
    membershipType: membershipTypeEnum("membership_type").default("Regular"),
    dateOfBirth: date("date_of_birth"),
    address: text("address"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("customers_membership_idx").on(table.membershipType),
]);

// ==================== 7. Court Types ====================
export const courtTypes = pgTable("court_types", {
    id: uuid("id").defaultRandom().primaryKey(),
    typeName: varchar("type_name", { length: 50 }).notNull().unique(),
    description: text("description"),
    isActive: boolean("is_active").default(true).notNull(),
    hourlyRate: numeric("hourly_rate", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("court_types_name_idx").on(table.typeName),
]);

// ==================== 8. Courts ====================
export const courts = pgTable("courts", {
    id: uuid("id").defaultRandom().primaryKey(),
    ownerId: uuid("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    typeId: uuid("type_id").notNull().references(() => courtTypes.id, { onDelete: "cascade" }),
    courtName: varchar("court_name", { length: 100 }).notNull(),
    location: text("location"),
    isActive: boolean("is_active").default(true).notNull(),
    status: courtStatusEnum("status").default("Available"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("courts_owner_id_idx").on(table.ownerId),
    index("courts_type_id_idx").on(table.typeId),
    index("courts_status_idx").on(table.status),
    index("courts_name_idx").on(table.courtName),
]);

// ==================== 9. Bookings ====================
export const bookings = pgTable("bookings", {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingCode: varchar("booking_code", { length: 30 }).notNull().unique(),
    customerId: uuid("customer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    cancelledById: uuid("cancelled_by_id").references(() => users.id, { onDelete: "cascade" }),
    courtId: uuid("court_id").notNull().references(() => courts.id, { onDelete: "cascade" }),
    staffId: uuid("staff_id").references(() => users.id, { onDelete: "cascade" }),
    bookingDate: timestamp("booking_date", { withTimezone: true }).defaultNow().notNull(),
    startTime: time("start_time").notNull(),
    endTime: time("end_time").notNull(),
    totalHours: numeric("total_hours", { precision: 5, scale: 2 }).notNull().default("0.00"),
    depositAmount: numeric("deposit_amount", { precision: 10, scale: 2 }).notNull().default("0.00"),
    totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull().default("0.00"),
    status: bookingStatusEnum("status").default("Pending"),
    players: varchar("players").notNull().default("0"),
    cancelReason: text("cancel_reason"),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("bookings_customer_id_idx").on(table.customerId),
    index("bookings_court_id_idx").on(table.courtId),
    index("bookings_staff_id_idx").on(table.staffId),
    index("bookings_cancelled_by_id_idx").on(table.cancelledById),
    index("bookings_date_idx").on(table.bookingDate),
    index("bookings_status_idx").on(table.status),
]);

// ==================== 10. Check Ins ====================
export const checkIns = pgTable("check_ins", {
    id: uuid("id").defaultRandom().primaryKey(),
    checkInCode: varchar("check_in_code", { length: 30 }).notNull().unique(),
    bookingId: uuid("booking_id").notNull().references(() => bookings.id, { onDelete: "cascade" }),
    staffId: uuid("staff_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    customerId: uuid("customer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    checkinTime: timestamp("checkin_time", { withTimezone: true }).defaultNow().notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("check_ins_booking_id_idx").on(table.bookingId),
    index("check_ins_staff_id_idx").on(table.staffId),
    index("check_ins_customer_id_idx").on(table.customerId),
]);

// ==================== 11. Check Outs ====================
export const checkOuts = pgTable("check_outs", {
    id: uuid("id").defaultRandom().primaryKey(),
    checkOutCode: varchar("check_out_code", { length: 30 }).notNull().unique(),
    bookingId: uuid("booking_id").notNull().references(() => bookings.id, { onDelete: "cascade" }),
    staffId: uuid("staff_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    customerId: uuid("customer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    checkOutTime: timestamp("checkout_time", { withTimezone: true }).defaultNow().notNull(),
    actualEndTime: timestamp("actual_end_time", { withTimezone: true }).defaultNow().notNull(),
    extraHours: numeric("extra_hours", { precision: 5, scale: 2 }),
    extraCharge: numeric("extra_charge", { precision: 10, scale: 2 }),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("check_outs_booking_id_idx").on(table.bookingId),
    index("check_outs_staff_id_idx").on(table.staffId),
    index("check_outs_customer_id_idx").on(table.customerId),
]);

// ==================== 12. Payments ====================
export const payments = pgTable("payments", {
    id: uuid("id").defaultRandom().primaryKey(),
    paymentCode: varchar("payment_code", { length: 30 }).notNull().unique(),
    bookingId: uuid("booking_id").notNull().references(() => bookings.id, { onDelete: "cascade" }),
    customerId: uuid("customer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    staffId: uuid("staff_id").references(() => users.id, { onDelete: "cascade" }),
    invoiceId: uuid("invoice_id").references(() => invoices.id, { onDelete: "cascade" }),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    paymentType: paymentTypeEnum("payment_type").notNull(),
    paymentMethod: paymentMethodEnum("payment_method").notNull(),
    paymentStatus: paymentStatusEnum("payment_status").default("Paid"),
    paymentDate: timestamp("payment_date", { withTimezone: true }).defaultNow().notNull(),
    notes: text("notes"),
    referenceNumber: varchar("reference_number", { length: 100 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("payments_booking_id_idx").on(table.bookingId),
    index("payments_customer_id_idx").on(table.customerId),
    index("payments_staff_id_idx").on(table.staffId),
    index("payments_date_idx").on(table.paymentDate),
]);

// ==================== 13. Invoices ====================
export const invoices = pgTable("invoices", {
    id: uuid("id").defaultRandom().primaryKey(),
    invoiceCode: varchar("invoice_code", { length: 30 }).notNull().unique(),
    bookingId: uuid("booking_id").notNull().references(() => bookings.id, { onDelete: "cascade" }),
    customerId: uuid("customer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    issuedById: uuid("issued_by_id").references(() => users.id, { onDelete: "cascade" }),
    subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
    discount: numeric("discount", { precision: 10, scale: 2 }).default("0.00"),
    tax: numeric("tax", { precision: 10, scale: 2 }).default("0.00"),
    totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
    paidAmount: numeric("paid_amount", { precision: 10, scale: 2 }).default("0.00"),
    balance: numeric("balance", { precision: 10, scale: 2 }).default("0.00"),
    status: invoiceStatusEnum("status").default("Unpaid"),
    issueDate: timestamp("issue_date", { withTimezone: true }).defaultNow().notNull(),
    dueDate: timestamp("due_date", { withTimezone: true }),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("invoices_booking_id_idx").on(table.bookingId),
    index("invoices_customer_id_idx").on(table.customerId),
    index("invoices_issued_by_id_idx").on(table.issuedById),
    index("invoices_status_idx").on(table.status),
    index("invoices_issue_date_idx").on(table.issueDate),
]);

// ====================== RELATIONS ======================

export const usersRelations = relations(users, ({ one, many }) => ({
    credentials: one(userCredentials, {
        fields: [users.id],
        references: [userCredentials.userId],
    }),
    images: many(images),
    courtOwner: one(courtOwners, {
        fields: [users.id],
        references: [courtOwners.userId],
    }),
    staff: one(staffs, {
        fields: [users.id],
        references: [staffs.userId],
    }),
    customer: one(customers, {
        fields: [users.id],
        references: [customers.userId],
    }),
    courts: many(courts),
    checkInAsStaffs: many(checkIns),
    checkOutAsStaffs: many(checkOuts),
    checkInAsCustomers: many(checkIns),
    checkOutAsCustomers: many(checkOuts),
    paymentsAsStaffs: many(payments),
    paymentsAsCustomers: many(payments),
    bookingsAsCustomers: many(bookings),
    bookingsAsStaffs: many(bookings),
    invoicesByStaffs: many(invoices),
    invoicesByCustomers: many(invoices),
}));

export const userCredentialsRelations = relations(userCredentials, ({ one }) => ({
    user: one(users, {
        fields: [userCredentials.userId],
        references: [users.id],
    }),
}));

// FIX #6: Added this imagesRelations
export const imagesRelations = relations(images, ({ one }) => ({
    user: one(users, {
        fields: [images.userId],
        references: [users.id],
    }),
    court: one(courts, {
        fields: [images.courtId],
        references: [courts.id],
    }),
}));

export const courtOwnersRelations = relations(courtOwners, ({ one }) => ({
    user: one(users, {
        fields: [courtOwners.userId],
        references: [users.id],
    }),
}));

export const staffRelations = relations(staffs, ({ one }) => ({
    user: one(users, {
        fields: [staffs.userId],
        references: [users.id],
    }),
}));

export const customersRelations = relations(customers, ({ one }) => ({
    user: one(users, {
        fields: [customers.userId],
        references: [users.id],
    }),
}));

// FIX #7: Tshem `one` import
export const courtTypesRelations = relations(courtTypes, ({ many }) => ({
    courts: many(courts),
}));

export const courtsRelations = relations(courts, ({ one, many }) => ({
    owner: one(users, {
        fields: [courts.ownerId],
        references: [users.id],
    }),
    images: many(images),
    courtType: one(courtTypes, {
        fields: [courts.typeId],
        references: [courtTypes.id],
    }),
    bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
    customer: one(users, {
        fields: [bookings.customerId],
        references: [users.id],
    }),
    court: one(courts, {
        fields: [bookings.courtId],
        references: [courts.id],
    }),
    staff: one(users, {
        fields: [bookings.staffId],
        references: [users.id],
    }),
    checkIn: one(checkIns, {
        fields: [bookings.id],
        references: [checkIns.bookingId],
    }),
    checkOut: one(checkOuts, {
        fields: [bookings.id],
        references: [checkOuts.bookingId],
    }),
    payments: many(payments),
    invoices: many(invoices),
}));

// FIX #8: Added this fields/references in checkInsRelations
export const checkInsRelations = relations(checkIns, ({ one }) => ({
    booking: one(bookings, {
        fields: [checkIns.bookingId],
        references: [bookings.id],
    }),
    staff: one(users, {
        fields: [checkIns.staffId],
        references: [users.id],
    }),
    customer: one(users, {
        fields: [checkIns.customerId],
        references: [users.id],
    }),
}));

// FIX #9: Added this fields/references in checkOutsRelations
export const checkOutsRelations = relations(checkOuts, ({ one }) => ({
    booking: one(bookings, {
        fields: [checkOuts.bookingId],
        references: [bookings.id],
    }),
    staff: one(users, {
        fields: [checkOuts.staffId],
        references: [users.id],
    }),
    customer: one(users, {
        fields: [checkOuts.customerId],
        references: [users.id],
    }),
}));

// FIX #10: Added this fields/references in paymentsRelations
export const paymentsRelations = relations(payments, ({ one }) => ({
    booking: one(bookings, {
        fields: [payments.bookingId],
        references: [bookings.id],
    }),
    customer: one(users, {
        fields: [payments.customerId],
        references: [users.id],
    }),
    staff: one(users, {
        fields: [payments.staffId],
        references: [users.id],
    }),
    invoice: one(invoices, {
        fields: [payments.invoiceId],
        references: [invoices.id],
    }),
}));

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
    booking: one(bookings, {
        fields: [invoices.bookingId],
        references: [bookings.id],
    }),
    customer: one(users, {
        fields: [invoices.customerId],
        references: [users.id],
    }),
    issuedBy: one(users, {
        fields: [invoices.issuedById],
        references: [users.id],
    }),
    payments: many(payments),
}));