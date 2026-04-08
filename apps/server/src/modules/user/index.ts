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
export const courtStatusEnum = pgEnum("court_status", ["Available", "Maintenance", "Occupied"]);
export const userRoleEnum = pgEnum("user_role", ["Staff", "Owner", "Customer"]);
export const membershipTypeEnum = pgEnum("membership_type", ["Regular", "Member", "VIP"]);
export const bookingStatusEnum = pgEnum("booking_status", ["Pending", "Confirmed", "Cancelled", "CheckedIn", "Completed"]);
export const paymentTypeEnum = pgEnum("payment_type", ["Deposit", "Full", "Remaining", "Refund"]);
export const paymentMethodEnum = pgEnum("payment_method", ["Cash", "Bank Transfer", "QR Code", "Card"]);
export const imageTypeEnum = pgEnum("image_type", ["profile", "cover", "court", "other"]);
export const paymentStatusEnum = pgEnum("payment_status", ["Paid", "Pending", "Failed"]);

// ==================== 1. Users (Base Table) ====================
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    fullName: varchar("full_name", { length: 150 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 20 }).unique(),
    email: varchar("email", { length: 100 }).unique(),
    role: userRoleEnum("role").notNull().default("Customer"),
    isActive: boolean("is_active").default(true).notNull(),
    userAgent: varchar("user_agent", { length: 255 }),
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
export const userImages = pgTable("user_images", {
    userId: uuid("user_id").primaryKey().notNull().references(() => users.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    imageKey: text("image_key").notNull(),
    width: integer("width"),
    height: integer("height"),
    size: integer("size"),
    type: imageTypeEnum("type").default("profile").notNull(),
    isPrimary: boolean("is_primary").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("user_images_type_idx").on(table.type),
    index("user_images_is_primary_idx").on(table.isPrimary),
]);

// ==================== 4. Court Owners Extension ====================
// FIX #2: Tshem `id` tawm — siv userId ua primary key xwb (tsis pub muaj 2 PK)
export const courtOwners = pgTable("court_owners", {
    userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
    companyName: varchar("company_name", { length: 150 }),
    address: text("address"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("court_owners_company_idx").on(table.companyName),
]);

// ==================== 5. Staff Extension ====================
// FIX #3: Tshem `id` tawm — siv userId ua primary key xwb (tsis pub muaj 2 PK)
export const staffs = pgTable("staffs", {
    userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
    position: varchar("position", { length: 100 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
});

// ==================== 6. Customers Extension ====================
// FIX #4: Tshem `id` tawm — siv userId ua primary key xwb (tsis pub muaj 2 PK)
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
    customerId: uuid("customer_id").notNull().references(() => customers.userId, { onDelete: "cascade" }),
    cancelledBy: uuid("cancelled_by").references(() => users.id, { onDelete: "cascade" }),
    courtId: uuid("court_id").notNull().references(() => courts.id, { onDelete: "cascade" }),
    staffId: uuid("staff_id").references(() => staffs.userId, { onDelete: "cascade" }),
    bookingDate: date("booking_date").notNull(),
    startTime: time("start_time").notNull(),
    endTime: time("end_time").notNull(),
    totalHours: numeric("total_hours", { precision: 5, scale: 2 }),
    depositAmount: numeric("deposit_amount", { precision: 10, scale: 2 }).default("0.00"),
    totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
    status: bookingStatusEnum("status").default("Pending"),
    cancelReason: text("cancel_reason"),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("bookings_customer_id_idx").on(table.customerId),
    index("bookings_court_id_idx").on(table.courtId),
    index("bookings_staff_id_idx").on(table.staffId),
    index("bookings_cancelled_by_idx").on(table.cancelledBy),
    index("bookings_date_idx").on(table.bookingDate),
    index("bookings_status_idx").on(table.status),
]);

// ==================== 10. Check Ins ====================
export const checkIns = pgTable("check_ins", {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingId: uuid("booking_id").notNull().unique().references(() => bookings.id, { onDelete: "cascade" }),
    staffId: uuid("staff_id").notNull().references(() => staffs.userId, { onDelete: "cascade" }),
    checkinTime: timestamp("checkin_time", { withTimezone: true }).defaultNow().notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("check_ins_booking_id_idx").on(table.bookingId),
    index("check_ins_staff_id_idx").on(table.staffId),
]);

// ==================== 11. Check Outs ====================
export const checkOuts = pgTable("check_outs", {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingId: uuid("booking_id").notNull().unique().references(() => bookings.id, { onDelete: "cascade" }),
    staffId: uuid("staff_id").notNull().references(() => staffs.userId, { onDelete: "cascade" }),
    checkoutTime: timestamp("checkout_time", { withTimezone: true }).defaultNow().notNull(),
    actualEndTime: time("actual_end_time"),
    extraHours: numeric("extra_hours", { precision: 5, scale: 2 }).default("0.00"),
    extraCharge: numeric("extra_charge", { precision: 10, scale: 2 }).default("0.00"),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("check_outs_booking_id_idx").on(table.bookingId),
    index("check_outs_staff_id_idx").on(table.staffId),
]);

// ==================== 12. Payments ====================
export const payments = pgTable("payments", {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingId: uuid("booking_id").references(() => bookings.id, { onDelete: "cascade" }),
    customerId: uuid("customer_id").notNull().references(() => customers.userId, { onDelete: "cascade" }),
    staffId: uuid("staff_id").notNull().references(() => staffs.userId, { onDelete: "cascade" }),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    paymentType: paymentTypeEnum("payment_type").notNull(),
    paymentMethod: paymentMethodEnum("payment_method").notNull(),
    paymentDate: timestamp("payment_date", { withTimezone: true }).defaultNow(),
    notes: text("notes"),
    referenceNumber: varchar("reference_number", { length: 100 }),
    status: paymentStatusEnum("status").default("Paid"),
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
    bookingId: uuid("booking_id").unique().references(() => bookings.id, { onDelete: "cascade" }),
    customerId: uuid("customer_id").notNull().references(() => customers.userId, { onDelete: "cascade" }),
    staffId: uuid("staff_id").references(() => staffs.userId),
    totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
    paidAmount: numeric("paid_amount", { precision: 10, scale: 2 }).default("0.00"),
    invoiceDate: timestamp("invoice_date", { withTimezone: true }).defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date()),
}, (table) => [
    index("invoices_booking_id_idx").on(table.bookingId),
    index("invoices_customer_id_idx").on(table.customerId),
    index("invoices_staff_id_idx").on(table.staffId),
]);

// ====================== RELATIONS ======================
 
export const usersRelations = relations(users, ({ one, many }) => ({
    credentials: one(userCredentials, {
        fields: [users.id],
        references: [userCredentials.userId],
    }),
    images: many(userImages),
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
    courtsOwned: many(courts),
}));

export const userCredentialsRelations = relations(userCredentials, ({ one }) => ({
    user: one(users, {
        fields: [userCredentials.userId],
        references: [users.id],
    }),
}));

// FIX #6: Ntxiv userImagesRelations uas ploj lawm
export const userImagesRelations = relations(userImages, ({ one }) => ({
    user: one(users, {
        fields: [userImages.userId],
        references: [users.id],
    }),
    court: one(courts, {
        fields: [userImages.userId],
        references: [courts.ownerId],
    }),
}));

export const courtOwnersRelations = relations(courtOwners, ({ one, many }) => ({
    user: one(users, {
        fields: [courtOwners.userId],
        references: [users.id],
    }),
    courts: many(courts),
}));

export const staffRelations = relations(staffs, ({ one, many }) => ({
    user: one(users, {
        fields: [staffs.userId],
        references: [users.id],
    }),
    checkIns: many(checkIns),
    checkOuts: many(checkOuts),
    payments: many(payments),
    invoices: many(invoices),
    bookings: many(bookings),
}));

export const customersRelations = relations(customers, ({ one, many }) => ({
    user: one(users, {
        fields: [customers.userId],
        references: [users.id],
    }),
    bookings: many(bookings),
    payments: many(payments),
    invoices: many(invoices),
}));

// FIX #7: Tshem `one` import tawm — tsis siv
export const courtTypesRelations = relations(courtTypes, ({ many }) => ({
    courts: many(courts),
}));

export const courtsRelations = relations(courts, ({ one, many }) => ({
    owner: one(users, {
        fields: [courts.ownerId],
        references: [users.id],
    }),
    images: many(userImages),
    type: one(courtTypes, {
        fields: [courts.typeId],
        references: [courtTypes.id],
    }),
    bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
    customer: one(customers, {
        fields: [bookings.customerId],
        references: [customers.userId],
    }),
    court: one(courts, {
        fields: [bookings.courtId],
        references: [courts.id],
    }),
    staff: one(staffs, {
        fields: [bookings.staffId],
        references: [staffs.userId],
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
    invoice: one(invoices, {
        fields: [bookings.id],
        references: [invoices.bookingId],
    }),
}));

// FIX #8: Ntxiv fields/references rau checkInsRelations
export const checkInsRelations = relations(checkIns, ({ one }) => ({
    booking: one(bookings, {
        fields: [checkIns.bookingId],
        references: [bookings.id],
    }),
    staff: one(staffs, {
        fields: [checkIns.staffId],
        references: [staffs.userId],
    }),
}));

// FIX #9: Ntxiv fields/references rau checkOutsRelations
export const checkOutsRelations = relations(checkOuts, ({ one }) => ({
    booking: one(bookings, {
        fields: [checkOuts.bookingId],
        references: [bookings.id],
    }),
    staff: one(staffs, {
        fields: [checkOuts.staffId],
        references: [staffs.userId],
    }),
}));

// FIX #10: Ntxiv fields/references rau paymentsRelations
export const paymentsRelations = relations(payments, ({ one }) => ({
    booking: one(bookings, {
        fields: [payments.bookingId],
        references: [bookings.id],
    }),
    customer: one(customers, {
        fields: [payments.customerId],
        references: [customers.userId],
    }),
    staff: one(staffs, {
        fields: [payments.staffId],
        references: [staffs.userId],
    }),
}));

// FIX #11: Ntxiv fields/references rau invoicesRelations
export const invoicesRelations = relations(invoices, ({ one }) => ({
    booking: one(bookings, {
        fields: [invoices.bookingId],
        references: [bookings.id],
    }),
    customer: one(customers, {
        fields: [invoices.customerId],
        references: [customers.userId],
    }),
    staff: one(staffs, {
        fields: [invoices.staffId],
        references: [staffs.userId],
    }),
}));