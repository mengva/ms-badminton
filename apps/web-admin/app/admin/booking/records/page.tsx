import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { CalendarCheck2, Eye, FileText, Link, MoreHorizontal, RotateCw, Search } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@workspace/ui/components/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { cn } from "@workspace/ui/lib/utils";
import { Badge } from "@workspace/ui/components/badge";

// ===================== Demo Booking Records =====================
// export const bookingRecords = [
//     {
//         id: "BK-20260512-001",
//         customerName: "John Doe",
//         customerPhone: "020 9999 1111",
//         courtName: "Court A",
//         bookingDate: "2026-05-12",
//         startTime: "08:00",
//         endTime: "10:00",
//         totalHours: 2,
//         depositAmount: 50000,
//         totalAmount: 120000,
//         remainingAmount: 70000,
//         status: "Pending",
//         paymentStatus: "Partial",
//         createdBy: "Admin",
//         createdAt: "2026-05-11 09:30 AM",
//     },
//     {
//         id: "BK-20260512-002",
//         customerName: "Jane Smith",
//         customerPhone: "020 2222 3333",
//         courtName: "Court B",
//         bookingDate: "2026-05-12",
//         startTime: "13:00",
//         endTime: "15:00",
//         totalHours: 2,
//         depositAmount: 80000,
//         totalAmount: 150000,
//         remainingAmount: 70000,
//         status: "Confirmed",
//         paymentStatus: "Partial",
//         createdBy: "Staff A",
//         createdAt: "2026-05-11 10:15 AM",
//     },
//     {
//         id: "BK-20260512-003",
//         customerName: "Michael Lee",
//         customerPhone: "020 7777 8888",
//         courtName: "Court C",
//         bookingDate: "2026-05-13",
//         startTime: "18:00",
//         endTime: "21:00",
//         totalHours: 3,
//         depositAmount: 100000,
//         totalAmount: 240000,
//         remainingAmount: 140000,
//         status: "Checked-In",
//         paymentStatus: "Partial",
//         createdBy: "Admin",
//         createdAt: "2026-05-11 11:00 AM",
//     },
//     {
//         id: "BK-20260512-004",
//         customerName: "Sarah Johnson",
//         customerPhone: "020 4444 5555",
//         courtName: "VIP Court",
//         bookingDate: "2026-05-14",
//         startTime: "09:00",
//         endTime: "11:00",
//         totalHours: 2,
//         depositAmount: 120000,
//         totalAmount: 200000,
//         remainingAmount: 80000,
//         status: "Pending",
//         paymentStatus: "Partial",
//         createdBy: "Staff B",
//         createdAt: "2026-05-11 01:45 PM",
//     },
//     {
//         id: "BK-20260512-005",
//         customerName: "David Kim",
//         customerPhone: "020 6666 1234",
//         courtName: "Court A",
//         bookingDate: "2026-05-15",
//         startTime: "16:00",
//         endTime: "18:00",
//         totalHours: 2,
//         depositAmount: 60000,
//         totalAmount: 120000,
//         remainingAmount: 60000,
//         status: "Confirmed",
//         paymentStatus: "Partial",
//         createdBy: "Admin",
//         createdAt: "2026-05-11 03:20 PM",
//     },
//     {
//         id: "BK-20260512-006",
//         customerName: "Emily Brown",
//         customerPhone: "020 8888 9999",
//         courtName: "Court D",
//         bookingDate: "2026-05-16",
//         startTime: "07:00",
//         endTime: "09:00",
//         totalHours: 2,
//         depositAmount: 50000,
//         totalAmount: 100000,
//         remainingAmount: 50000,
//         status: "Cancelled",
//         paymentStatus: "Refunded",
//         createdBy: "Staff C",
//         createdAt: "2026-05-11 04:00 PM",
//     },
//     {
//         id: "BK-20260512-007",
//         customerName: "Chris Evans",
//         customerPhone: "020 1212 3434",
//         courtName: "Court B",
//         bookingDate: "2026-05-17",
//         startTime: "19:00",
//         endTime: "22:00",
//         totalHours: 3,
//         depositAmount: 150000,
//         totalAmount: 300000,
//         remainingAmount: 150000,
//         status: "Pending",
//         paymentStatus: "Partial",
//         createdBy: "Admin",
//         createdAt: "2026-05-11 05:10 PM",
//     },
//     {
//         id: "BK-20260512-008",
//         customerName: "Lisa White",
//         customerPhone: "020 5656 7878",
//         courtName: "VIP Court",
//         bookingDate: "2026-05-18",
//         startTime: "10:00",
//         endTime: "12:00",
//         totalHours: 2,
//         depositAmount: 200000,
//         totalAmount: 350000,
//         remainingAmount: 150000,
//         status: "Checked-Out",
//         paymentStatus: "Paid",
//         createdBy: "Staff A",
//         createdAt: "2026-05-11 06:00 PM",
//     },
// ];

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

// =====================================================
// 3. BOOKING RECORDS PAGE
// FILE: app/admin/booking/records/page.tsx
// =====================================================

const bookingRecords: Booking[] = [
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

export default function BookingRecordsPage() {

    return (
        <div className="space-y-6">
            {/* Header */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">
                        ບັນທຶກການຈອງ
                    </h1>

                    <p className="text-muted-foreground">
                        ເບິ່ງບັນທຶກການຈອງຂອງລູກຄ້າທັງໝົດ.
                    </p>
                </div>
            </div>

            {/* Statistics */}

            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">
                            ການຈອງທັງໝົດ
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            120
                        </h2>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">
                            ການຈອງສຳເລັດແລ້ວ
                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-green-600">
                            95
                        </h2>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">
                            ການຈອງຍົກເລີກແລ້ວ
                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-red-600">
                            12
                        </h2>
                    </CardContent>
                </Card>
            </div> */}

            {/* Table */}

            <Card>
                <CardHeader>
                    <div className="mb-2">
                        <CardTitle>
                            ລາຍຊື່ບັນທຶກການຈອງ
                        </CardTitle>

                        <CardDescription>
                            ຈັດການບັນທຶກການຈອງ ແລະ ສະຖານະ.
                        </CardDescription>
                    </div>

                    {/* Search */}

                    <div className="flex gap-2 mb-2">
                        <div className="relative sm:w-80">
                            <Search className="absolute left-2 top-2 size-4 text-muted-foreground" />

                            <Input
                                placeholder="ຄົ້ນຫາບັນທຶກການຈອງ..."
                                className="pl-10"
                            />
                        </div>
                        {/* Actions */}
                        <div>
                            <Button className="cursor-pointer">
                                <RotateCw className={cn("mr-2 h-4 w-4")} />
                                ໂຫຼດຂໍ້ມູນຄືນໃໝ່
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Card>
                <CardContent>
                    <div className="rounded-xl border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ລໍາດັບ</TableHead>
                                    <TableHead>
                                        ລະຫັດການຈອງ
                                    </TableHead>

                                    <TableHead>
                                        ລູກຄ້າ
                                    </TableHead>

                                    <TableHead>
                                        ເດີ່ນ
                                    </TableHead>

                                    <TableHead>
                                        ວັນທີ
                                    </TableHead>

                                    <TableHead>
                                        ເວລາ
                                    </TableHead>

                                    <TableHead>
                                        ຊົ່ວໂມງ
                                        </TableHead>

                                    <TableHead>
                                        ຈຳນວນເງິນມັດຈຳເດີ່ນ
                                    </TableHead>
                                    <TableHead>
                                        ຄ່າເດີ່ນທັງໝົດ
                                    </TableHead>

                                    <TableHead>
                                        ສະຖານະ
                                    </TableHead>

                                    <TableHead className="text-right">
                                        ຕົວເລືອກ
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {bookingRecords.map(
                                    (booking, index) => (
                                        <TableRow
                                            key={index}
                                        >
                                            <TableCell>{(index + 1).toString().padStart(4, "0")}</TableCell>
                                            <TableCell className="font-medium">
                                                {booking.id}
                                            </TableCell>

                                            <TableCell>
                                                {
                                                    booking.customer
                                                }
                                            </TableCell>

                                            <TableCell>
                                                {booking.court}
                                            </TableCell>

                                            <TableCell>
                                                {
                                                    booking.bookingDate
                                                }
                                            </TableCell>

                                            <TableCell>
                                                {`${booking.startTime} - ${booking.endTime}`}
                                            </TableCell>

                                            <TableCell>
                                                {booking.totalHours}
                                            </TableCell>

                                            <TableCell>
                                                {booking.depositAmount}ກີບ
                                            </TableCell>

                                            <TableCell>
                                                {booking.totalAmount}ກີບ
                                            </TableCell>

                                            <TableCell>
                                                <Badge
                                                    variant={"info"}
                                                >
                                                    {booking.status === "Confirmed" && "ຢືນຢັນແລ້ວ"}
                                                </Badge>
                                            </TableCell>

                                            <TableCell className="text-right">
                                                <Button variant={"secondary"}>
                                                    <Eye className="mr-2 size-4" />
                                                            ເບິ່ງລາຍລະອຽດ
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}