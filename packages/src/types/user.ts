// ====================== DTOs ======================

export interface UserDto {
    id: string;
    fullName: string;
    phoneNumber?: string;
    email?: string;
    role: "Staff" | "Owner" | "Customer";
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Profile extensions
export interface StaffProfileDto {
    salary?: number;
    position?: string;
}

export interface CustomerProfileDto {
    membershipType: "Regular" | "Member" | "VIP";
    dateOfBirth?: string;
    address?: string;
}

export interface CourtOwnerProfileDto {
    companyName?: string;
    address: string;
}

// Combined User with Profile
export interface StaffDto extends UserDto {
    staff: StaffProfileDto;
}

export interface CustomerDto extends UserDto {
    customer: CustomerProfileDto;
}

export interface CourtOwnerDto extends UserDto {
    courtOwner: CourtOwnerProfileDto;
}

// ====================== Other Entities ======================

export interface ImageDto {
    id: string;
    url: string;
    imageKey: string;
    width: number;
    height: number;
    size: number;
    type: "profile" | "cover" | "court" | "other";
    isPrimary: boolean;
    createdAt: Date;
}

export interface CourtTypeDto {
    id: string;
    typeName: string;
    description?: string;
    hourlyRate: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CourtDto {
    id: string;
    courtName: string;
    location?: string;
    status: "Available" | "Maintenance" | "Occupied";
    ownerId: string;
    typeId: string;
    createdAt: Date;
    updatedAt: Date;
    // Optional relations
    courtType?: CourtTypeDto;
    images?: ImageDto[];
}

export interface BookingDto {
    id: string;
    customerId: string;
    courtId: string;
    staffId?: string;
    bookingDate: Date;
    startTime: string;
    endTime: string;
    totalHours: number;
    depositAmount: number;
    totalAmount: number;
    status: "Pending" | "Confirmed" | "Cancelled" | "CheckedIn" | "Completed";
    cancelReason?: string;
    cancelledAt?: Date;
    cancelledById?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CheckInDto {
    id: string;
    bookingId: string;
    staffId: string;
    customerId: string;
    checkinTime: Date;
    notes?: string;
    createdAt: Date;
}

export interface CheckOutDto {
    id: string;
    bookingId: string;
    staffId: string;
    customerId: string;
    checkOutTime: Date;
    actualEndTime: Date;
    extraHours?: number;
    extraCharge?: number;
    notes?: string;
    createdAt: Date;
}

export interface PaymentDto {
    id: string;
    bookingId: string;
    customerId: string;
    staffId?: string;
    invoiceId?: string;
    amount: number;
    paymentType: "Deposit" | "Full" | "Remaining" | "Refund";
    paymentMethod: "Cash" | "Bank Transfer" | "QR Code" | "Card";
    paymentStatus: "Paid" | "Pending" | "Failed";
    paymentDate: Date;
    referenceNumber?: string;
    notes?: string;
}

export interface InvoiceDto {
    id: string;
    invoiceCode: string;
    bookingId: string;
    customerId: string;
    issuedById?: string;
    subtotal: number;
    discount: number;
    tax: number;
    totalAmount: number;
    paidAmount: number;
    balance: number;
    status: "Unpaid" | "PartiallyPaid" | "Paid" | "Cancelled";
    issueDate: Date;
    dueDate?: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}