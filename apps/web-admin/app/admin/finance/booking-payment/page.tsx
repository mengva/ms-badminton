// app/admin/finance/booking-payment/page.tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
    Plus,
    Search,
    CreditCard
} from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@workspace/ui/components/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@workspace/ui/components/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";

interface BookingPayment {
    id: string;
    bookingId: string;
    customerName: string;
    courtName: string;
    bookingDate: Date;
    startTime: string;
    endTime: string;
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    status: "Pending" | "PartiallyPaid" | "Paid" | "Cancelled";
    paymentStatus: "Paid" | "Pending" | "Failed";
}

export default function BookingPaymentPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<BookingPayment | null>(null);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [notes, setNotes] = useState("");

    // Mock Data
    const [payments, setPayments] = useState<BookingPayment[]>([
        {
            id: "1",
            bookingId: "BK-20250514-001",
            customerName: "ທ. ສົມສັກ ວິລະສັກ",
            courtName: "ເດີ່ນ A1",
            bookingDate: new Date("2025-05-15"),
            startTime: "14:00",
            endTime: "16:00",
            totalAmount: 400000,
            paidAmount: 100000,
            remainingAmount: 300000,
            status: "PartiallyPaid",
            paymentStatus: "Pending",
        },
        {
            id: "2",
            bookingId: "BK-20250514-002",
            customerName: "ນ. ອີນທະວົງ ບຸນມະນີ",
            courtName: "ເດີ່ນ B2",
            bookingDate: new Date("2025-05-16"),
            startTime: "09:00",
            endTime: "11:00",
            totalAmount: 300000,
            paidAmount: 300000,
            remainingAmount: 0,
            status: "Paid",
            paymentStatus: "Paid",
        },
        {
            id: "3",
            bookingId: "BK-20250514-003",
            customerName: "ທ. ວິໄລ ສຸກສະຫວັນ",
            courtName: "ເດີ່ນ A3",
            bookingDate: new Date("2025-05-14"),
            startTime: "17:00",
            endTime: "19:00",
            totalAmount: 450000,
            paidAmount: 0,
            remainingAmount: 450000,
            status: "Pending",
            paymentStatus: "Pending",
        },
    ]);

    const filteredPayments = payments.filter((payment) => {
        const matchesSearch =
            payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.customerName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || payment.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const openPaymentModal = (booking: BookingPayment) => {
        setSelectedBooking(booking);
        setPaymentAmount(booking.remainingAmount.toString());
        setNotes("");
        setIsPaymentModalOpen(true);
    };

    const handleProcessPayment = () => {
        if (!selectedBooking) return;

        // Mock payment processing
        const newPayments = payments.map(p => {
            if (p.id === selectedBooking.id) {
                const paid = parseFloat(paymentAmount) || 0;
                return {
                    ...p,
                    paidAmount: p.paidAmount + paid,
                    remainingAmount: Math.max(0, p.remainingAmount - paid),
                    status: p.remainingAmount - paid <= 0 ? "Paid" : "PartiallyPaid",
                    paymentStatus: "Paid"
                };
            }
            return p;
        });

        setPayments(newPayments);
        setIsPaymentModalOpen(false);

        // You would normally call your API here
        alert("ຊຳລະເງິນສຳເລັດ!");
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Paid":
                return <Badge className="bg-green-500">ຊຳລະສຳເລັດ</Badge>;
            case "PartiallyPaid":
                return <Badge variant="secondary">ຊຳລະບາງສ່ວນ</Badge>;
            case "Pending":
                return <Badge variant="destructive">ຄ້າງຊຳລະ</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">ຊຳລະການຈອງເດີ່ນ</h1>
                    <p className="text-muted-foreground">ຈັດການການຊຳລະເງິນສຳລັບການຈອງເດີ່ນ</p>
                </div>
                <Button onClick={() => alert("ເປີດຟອມສ້າງການຈ່າຍໃໝ່")}>
                    <Plus className="mr-2 h-4 w-4" />
                    ບັນທຶກການຊຳລະໃໝ່
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>ລາຍການການຈອງທີ່ລໍຖ້າຊຳລະ</CardTitle>
                    <CardDescription>
                        ຄົ້ນຫາ ແລະ ຈັດການການຊຳລະເງິນ
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="ຄົ້ນຫາດ້ວຍ Booking ID ຫຼື ຊື່ລູກຄ້າ..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full md:w-60">
                                <SelectValue placeholder="ສະຖານະ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">ທັງໝົດ</SelectItem>
                                <SelectItem value="Pending">ຄ້າງຊຳລະ</SelectItem>
                                <SelectItem value="PartiallyPaid">ຊຳລະບາງສ່ວນ</SelectItem>
                                <SelectItem value="Paid">ຊຳລະສຳເລັດ</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Data Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Booking ID</TableHead>
                                    <TableHead>ລູກຄ້າ</TableHead>
                                    <TableHead>ເດີ່ນ</TableHead>
                                    <TableHead>ວັນທີ</TableHead>
                                    <TableHead className="text-right">ລວມທັງໝົດ</TableHead>
                                    <TableHead className="text-right">ຊຳລະແລ້ວ</TableHead>
                                    <TableHead className="text-right">ຄ້າງຊຳລະ</TableHead>
                                    <TableHead>ສະຖານະ</TableHead>
                                    <TableHead className="text-center">ຈັດການ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPayments.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell className="font-medium">{payment.bookingId}</TableCell>
                                        <TableCell>{payment.customerName}</TableCell>
                                        <TableCell>{payment.courtName}</TableCell>
                                        <TableCell>
                                            {format(payment.bookingDate, "dd/MM/yyyy")} <br />
                                            <span className="text-sm text-muted-foreground">
                                                {payment.startTime} - {payment.endTime}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            {payment.totalAmount.toLocaleString()} ຂ
                                        </TableCell>
                                        <TableCell className="text-right text-green-600">
                                            {payment.paidAmount.toLocaleString()} ຂ
                                        </TableCell>
                                        <TableCell className="text-right font-medium text-orange-600">
                                            {payment.remainingAmount.toLocaleString()} ຂ
                                        </TableCell>
                                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openPaymentModal(payment)}
                                                disabled={payment.status === "Paid"}
                                            >
                                                <CreditCard className="mr-2 h-4 w-4" />
                                                ຊຳລະ
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Payment Modal */}
            <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>ບັນທຶກການຊຳລະເງິນ</DialogTitle>
                        <DialogDescription>
                            {selectedBooking && `${selectedBooking.bookingId} - ${selectedBooking.customerName}`}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>ຈຳນວນເງິນທັງໝົດ</Label>
                                <p className="text-lg font-semibold">
                                    {selectedBooking?.totalAmount.toLocaleString()} ຂ
                                </p>
                            </div>
                            <div>
                                <Label>ຍັງຄ້າງຊຳລະ</Label>
                                <p className="text-lg font-semibold text-orange-600">
                                    {selectedBooking?.remainingAmount.toLocaleString()} ຂ
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount">ຈຳນວນເງິນທີ່ຊຳລະ</Label>
                            <Input
                                id="amount"
                                type="number"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>ຮູບແບບການຊຳລະ</Label>
                            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Cash">ເງິນສົດ</SelectItem>
                                    <SelectItem value="Bank Transfer">ໂອນທະນາຄານ</SelectItem>
                                    <SelectItem value="QR Code">QR Code</SelectItem>
                                    <SelectItem value="Card">ບັດເຄຣດິດ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">ໝາຍເຫດ</Label>
                            <Textarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="ໝາຍເຫດເພີ່ມເຕີມ..."
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
                            ຍົກເລີກ
                        </Button>
                        <Button onClick={handleProcessPayment}>
                            ຢືນຢັນການຊຳລະ
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}