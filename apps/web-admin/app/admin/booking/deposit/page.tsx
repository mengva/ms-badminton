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
    depositAmount: number;
    totalAmount: number;
    status: "Pending" | "Confirmed" | "Completed";
    paymentType: "Deposit" | "Full"
};

type ChangeBookingStatus = "Pending" | "Confirmed";

// ==================== MOCK DATA ====================
const initialBookings: Booking[] = [
    {
        id: "BK-20260513-8921",
        customer: "ຈອນ ໂດ",
        court: "ເດີ່ນ A",
        bookingDate: "2026-05-12",
        startTime: "08:00",
        endTime: "10:00",
        totalHours: 2,
        depositAmount: 100000,
        totalAmount: 200000,
        status: "Confirmed",
        paymentType: "Deposit"
    },
    {
        id: "BK-20260513-8922",
        customer: "ອາເລັກ",
        court: "ເດີ່ນ B",
        bookingDate: "2026-05-12",
        startTime: "13:00",
        endTime: "15:00",
        totalHours: 2,
        depositAmount: 150000,
        totalAmount: 300000,
        status: "Confirmed",
        paymentType: "Deposit"
    },
    {
        id: "BK-20260513-8923",
        customer: "ເດວິດ",
        court: "ເດີ່ນ C",
        bookingDate: "2026-05-13",
        startTime: "18:00",
        endTime: "20:00",
        totalHours: 2,
        depositAmount: 75000,
        totalAmount: 200000,
        status: "Confirmed",
        paymentType: "Deposit"
    },
];

export default function AdminCancelledBookingPage() {
    const [bookings, setBookings] = useState<Booking[]>(initialBookings);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [newStatus, setNewStatus] = useState<ChangeBookingStatus>("Pending");

    // Open Edit Dialog
    const handleEditClick = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsEditDialogOpen(true);
    };

    // Save Status Change
    const handleSaveStatus = () => {
        if (!selectedBooking) return;

        setBookings((prev) =>
            prev.map((b) =>
                b.id === selectedBooking.id ? { ...b, status: newStatus } : b
            ).filter(b => b.status === "Confirmed")
        );

        setIsEditDialogOpen(false);
        setSelectedBooking(null);

        // Optional: Show success message
        alert(`Updated status to ${newStatus}`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        ຄ່າມັດຈຳການຈອງທັງໝົດ
                    </h1>
                    <p className="text-muted-foreground">
                       ຄ່າມັດຈຳການຈອງສະໜາມ MS.Badminton ທັງໝົດ.
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
                        <CardTitle>ລາຍຊື່ການຈອງ ເເລະ ຄ່າມັດຈຳ</CardTitle>
                        <CardDescription>
                            ເບິ່ງ ແລະ ຈັດການບັນທຶກການຈອງ ເເລະ ຄ່າມັດຈຳທັງໝົດ.
                        </CardDescription>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-2 top-2 size-4 text-muted-foreground" />
                            <Input placeholder="ຄົ້ນຫາການຈອງ ເເລະ ຄ່າມັດຈຳ..." className="pl-10" />
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
                    <div className="rounded-xl border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ລໍາດັບ</TableHead>
                                    <TableHead>ລະຫັດການຈອງ</TableHead>
                                    <TableHead>ລູກຄ້າ</TableHead>
                                    <TableHead>ເດີ່ນ</TableHead>
                                    <TableHead>ວັນທີ</TableHead>
                                    <TableHead>ເວລາ</TableHead>
                                    <TableHead>ຊົ່ວໂມງ</TableHead>
                                    <TableHead>ຈຳນວນເງິນມັດຈຳເດີ່ນ</TableHead>
                                    <TableHead>ຄ່າເດີ່ນທັງໝົດ</TableHead>
                                    {/* <TableHead>ປະເພດການຈ່າຍເງິນ</TableHead> */}
                                    <TableHead>ສະຖານະການຈອງ</TableHead>
                                    <TableHead className="text-right">ຈັດການ</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {bookings.map((booking, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{(index + 1).toString().padStart(4, "0")}</TableCell>
                                        <TableCell className="font-medium">{booking.id}</TableCell>
                                        <TableCell>{booking.customer}</TableCell>
                                        <TableCell>{booking.court}</TableCell>
                                        <TableCell>{booking.bookingDate}</TableCell>
                                        <TableCell>
                                            {booking.startTime} - {booking.endTime}
                                        </TableCell>
                                        <TableCell>{booking.totalHours}</TableCell>
                                        <TableCell>{booking.depositAmount}ກີບ</TableCell>
                                        <TableCell>{booking.totalAmount}ກີບ</TableCell>
                                        {/* <TableCell>
                                            <Badge
                                                variant={booking.paymentType === "Full" ? "default" : "info"}
                                            >
                                                {booking.paymentType === "Full" ? "ເຕັມ" : "ມັດຈຳ"}
                                            </Badge>
                                        </TableCell> */}
                                        <TableCell>
                                            <Badge
                                                variant={"info"}
                                            >
                                                {booking.status === "Confirmed" && "ຢືນຢັນແລ້ວ"}
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
                                                        ເບິ່ງລາຍລະອຽດ
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
                </CardContent>
            </Card>

            {/* ==================== EDIT STATUS DIALOG ==================== */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>ແກ້ໄຂສະຖານະການຈອງ ເເລະ ຄ່າມັດຈຳ</DialogTitle>
                        <DialogDescription>
                            ປ່ຽນສະຖານະຂອງການຈອງ ເເລະ ຄ່າມັດຈຳ <strong>{selectedBooking?.id}</strong>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <label className="text-sm font-medium mb-2 block">
                            ສະຖານະການຈອງ ເເລະ ຄ່າມັດຈຳ
                        </label>
                        <Select value={newStatus} onValueChange={(value: ChangeBookingStatus) => setNewStatus(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pending">ລໍຖ້າການອະນຸມັດ</SelectItem>
                                <SelectItem value="Confirmed">ຢືນຢັນແລ້ວ</SelectItem>
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