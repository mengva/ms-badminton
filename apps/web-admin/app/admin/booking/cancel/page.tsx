"use client";

import { useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@workspace/ui/components/card";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@workspace/ui/components/table";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

import {
    Plus,
    Search,
    MoreHorizontal,
    Eye,
    Pencil,
    Trash2,
    CalendarCheck2,
    RotateCw,
} from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";

// ==================== TYPES ====================
type Booking = {
    id: string;
    customer: string;
    court: string;
    bookingDate: string;
    startTime: string;
    endTime: string;
    totalHours: number;
    totalAmount: number;
    status: "Pending" | "Confirmed" | "Cancelled";
};

// ==================== MOCK DATA ====================
const initialBookings: Booking[] = [
    {
        id: "BK-001",
        customer: "John Doe",
        court: "Court A",
        bookingDate: "2026-05-12",
        startTime: "08:00",
        endTime: "10:00",
        totalHours: 2,
        totalAmount: 20,
        status: "Cancelled",
    },
    {
        id: "BK-002",
        customer: "Alex",
        court: "Court B",
        bookingDate: "2026-05-12",
        startTime: "13:00",
        endTime: "15:00",
        totalHours: 2,
        totalAmount: 30,
        status: "Cancelled",
    },
    {
        id: "BK-003",
        customer: "David",
        court: "Court C",
        bookingDate: "2026-05-13",
        startTime: "18:00",
        endTime: "20:00",
        totalHours: 2,
        totalAmount: 40,
        status: "Cancelled",
    },
];

export default function AdminCancelledBookingPage() {
    const [bookings, setBookings] = useState<Booking[]>(initialBookings);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [newStatus, setNewStatus] = useState<Booking["status"]>("Pending");

    // Open Edit Dialog
    const handleEditClick = (booking: Booking) => {
        setSelectedBooking(booking);
        setNewStatus(booking.status);
        setIsEditDialogOpen(true);
    };

    // Save Status Change
    const handleSaveStatus = () => {
        if (!selectedBooking) return;

        setBookings((prev) =>
            prev.map((b) =>
                b.id === selectedBooking.id ? { ...b, status: newStatus } : b
            )
        );

        setIsEditDialogOpen(false);
        setSelectedBooking(null);

        // Optional: Show success message
        alert(`Updated status to ${newStatus}`);
    };

    return (
        <div className="w-full min-h-screen">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        ການຈອງທີ່ຖືກຍົກເລີກທັງໝົດ
                    </h1>
                    <p className="text-muted-foreground">
                        ການຈອງສະໜາມ MS.Badminton ທີ່ຖືກຍົກເລີກ.
                    </p>
                </div>
            </div>

            {/* Statistics Cards */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">ການຈອງທັງໝົດ</p>
                            <h2 className="text-3xl font-bold mt-2">120</h2>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <CalendarCheck2 className="size-6 text-primary" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">ຍົກເລີກການຈອງມື້ນີ້</p>
                        <h2 className="text-3xl font-bold mt-2">18</h2>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">ລາຍຮັບທັງໝົດ</p>
                        <h2 className="text-3xl font-bold mt-2">$4,850</h2>
                    </CardContent>
                </Card>
            </div> */}

            <Card className="mb-6">
                <CardHeader>
                    <div className="mb-2">
                        <CardTitle>ລາຍຊື່ການຈອງ</CardTitle>
                        <CardDescription>
                            ເບິ່ງ ແລະ ຈັດການບັນທຶກການຈອງທັງໝົດ.
                        </CardDescription>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-2 top-2 size-4 text-muted-foreground" />
                            <Input placeholder="ຄົ້ນຫາການຈອງ..." className="pl-10" />
                        </div>
                        <div>
                            <Button className="cursor-pointer">
                                <RotateCw className={cn("mr-2 h-4 w-4")} />
                                ໂຫຼດຂໍ້ມູນຄືນໃໝ່
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Main Table Card */}
            <Card>

                <CardContent>
                    <div className="rounded-lg border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Booking ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Court</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {bookings.map((booking) => (
                                    <TableRow key={booking.id}>
                                        <TableCell className="font-medium">{booking.id}</TableCell>
                                        <TableCell>{booking.customer}</TableCell>
                                        <TableCell>{booking.court}</TableCell>
                                        <TableCell>{booking.bookingDate}</TableCell>
                                        <TableCell>
                                            {booking.startTime} - {booking.endTime}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={"destructive"}
                                            >
                                                {booking.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Eye className="mr-2 size-4" />
                                                        ເບິ່ງ
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onClick={() => handleEditClick(booking)}
                                                    >
                                                        <Pencil className="mr-2 size-4" />
                                                        ແກ້ໄຂສະຖານະ
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-muted-foreground">
                            Showing 1 to {bookings.length} of {bookings.length} bookings
                        </p>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">Previous</Button>
                            <Button size="sm">1</Button>
                            <Button variant="outline" size="sm">Next</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ==================== EDIT STATUS DIALOG ==================== */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>ແກ້ໄຂສະຖານະການຈອງ</DialogTitle>
                        <DialogDescription>
                            ປ່ຽນສະຖານະຂອງການຈອງ <strong>{selectedBooking?.id}</strong>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <label className="text-sm font-medium mb-2 block">
                            ສະຖານະການຈອງ
                        </label>
                        <Select value={newStatus} onValueChange={(value: any) => setNewStatus(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Confirmed">Confirmed</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            ຍົກເລີກ
                        </Button>
                        <Button onClick={handleSaveStatus}>
                            ບັນທຶກການປ່ຽນແປງ
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}