// app/admin/finance/field-payment/page.tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
    Plus,
    Search,
    CreditCard,
    Printer
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

interface FieldPayment {
    id: string;
    transactionId: string;
    customerName: string;
    courtName: string;
    usageDate: Date;
    startTime: string;
    endTime: string;
    hours: number;
    ratePerHour: number;
    totalAmount: number;
    paymentMethod: string;
    paymentStatus: "Paid" | "Pending" | "Failed";
    notes?: string;
}

export default function FieldPaymentPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<FieldPayment | null>(null);

    // Mock Data
    const [payments, setPayments] = useState<FieldPayment[]>([
        {
            id: "1",
            transactionId: "FP-20250514-001",
            customerName: "ທ. ສົມບູນ ພັນທະສິນ",
            courtName: "ເດີ່ນ A1",
            usageDate: new Date("2025-05-14"),
            startTime: "15:30",
            endTime: "17:30",
            hours: 2,
            ratePerHour: 150000,
            totalAmount: 300000,
            paymentMethod: "Cash",
            paymentStatus: "Paid",
            notes: "ລູກຄ້າປົກກະຕິ",
        },
        {
            id: "2",
            transactionId: "FP-20250514-002",
            customerName: "ນ. ອະນຸສອນ ສີສຸວັນ",
            courtName: "ເດີ່ນ B3",
            usageDate: new Date("2025-05-14"),
            startTime: "18:00",
            endTime: "20:00",
            hours: 2,
            ratePerHour: 200000,
            totalAmount: 400000,
            paymentMethod: "QR Code",
            paymentStatus: "Paid",
        },
        {
            id: "3",
            transactionId: "FP-20250514-003",
            customerName: "Walk-in Customer",
            courtName: "ເດີ່ນ A2",
            usageDate: new Date("2025-05-14"),
            startTime: "10:00",
            endTime: "11:30",
            hours: 1.5,
            ratePerHour: 180000,
            totalAmount: 270000,
            paymentMethod: "Cash",
            paymentStatus: "Paid",
        },
    ]);

    const filteredPayments = payments.filter((p) => {
        const matchesSearch =
            p.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.courtName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || p.paymentStatus === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const openPaymentModal = (payment: FieldPayment) => {
        setSelectedPayment(payment);
        setIsPaymentModalOpen(true);
    };

    const handleRecordPayment = () => {
        alert("ບັນທຶກການຊຳລະຄ່າເດີ່ນສຳເລັດ!");
        setIsPaymentModalOpen(false);
    };

    const getStatusBadge = (status: string) => {
        if (status === "Paid") return <Badge className="bg-green-500">ຊຳລະແລ້ວ</Badge>;
        if (status === "Pending") return <Badge variant="destructive">ຄ້າງຊຳລະ</Badge>;
        return <Badge variant="outline">{status}</Badge>;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">ຊຳລະຄ່າເດີ່ນ</h1>
                    <p className="text-muted-foreground">ບັນທຶກການຊຳລະຄ່າໃຊ້ເດີ່ນ (Walk-in / ຊຳລະທັນທີ)</p>
                </div>
                <Button onClick={() => alert("ເປີດຟອມບັນທຶກການໃຊ້ເດີ່ນໃໝ່")}>
                    <Plus className="mr-2 h-4 w-4" />
                    ບັນທຶກການໃຊ້ເດີ່ນໃໝ່
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>ປະຫວັດການຊຳລະຄ່າເດີ່ນ</CardTitle>
                    <CardDescription>ຈັດການການຊຳລະເງິນສຳລັບການໃຊ້ເດີ່ນ</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Search & Filter */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="ຄົ້ນຫາ Transaction ID, ຊື່ລູກຄ້າ, ເດີ່ນ..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full md:w-52">
                                <SelectValue placeholder="ສະຖານະ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">ທັງໝົດ</SelectItem>
                                <SelectItem value="Paid">ຊຳລະແລ້ວ</SelectItem>
                                <SelectItem value="Pending">ຄ້າງຊຳລະ</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Transaction ID</TableHead>
                                    <TableHead>ລູກຄ້າ</TableHead>
                                    <TableHead>ເດີ່ນ</TableHead>
                                    <TableHead>ວັນທີ / ເວລາ</TableHead>
                                    <TableHead className="text-center">ຈຳນວນເວລາ</TableHead>
                                    <TableHead className="text-right">ລາຄາຕໍ່ຊົ່ວໂມງ</TableHead>
                                    <TableHead className="text-right">ລວມທັງໝົດ</TableHead>
                                    <TableHead>ວິທີຊຳລະ</TableHead>
                                    <TableHead>ສະຖານະ</TableHead>
                                    <TableHead className="text-center">ຈັດການ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPayments.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell className="font-medium">{payment.transactionId}</TableCell>
                                        <TableCell>{payment.customerName}</TableCell>
                                        <TableCell>{payment.courtName}</TableCell>
                                        <TableCell>
                                            {format(payment.usageDate, "dd/MM/yyyy")}<br />
                                            <span className="text-sm text-muted-foreground">
                                                {payment.startTime} - {payment.endTime}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center font-medium">{payment.hours} ຊມ.</TableCell>
                                        <TableCell className="text-right">
                                            {payment.ratePerHour.toLocaleString()} ຂ
                                        </TableCell>
                                        <TableCell className="text-right font-semibold">
                                            {payment.totalAmount.toLocaleString()} ຂ
                                        </TableCell>
                                        <TableCell>{payment.paymentMethod}</TableCell>
                                        <TableCell>{getStatusBadge(payment.paymentStatus)}</TableCell>
                                        <TableCell className="text-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openPaymentModal(payment)}
                                            >
                                                <CreditCard className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => alert(`ກຳລັງພິມໃບບິນ ${payment.transactionId}`)}
                                            >
                                                <Printer className="h-4 w-4" />
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
                        <DialogTitle>ບັນທຶກການຊຳລະຄ່າເດີ່ນ</DialogTitle>
                        <DialogDescription>
                            {selectedPayment?.transactionId} — {selectedPayment?.courtName}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-muted-foreground">ລູກຄ້າ</p>
                                <p className="font-medium">{selectedPayment?.customerName}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">ລວມທັງໝົດ</p>
                                <p className="font-semibold text-lg">
                                    {selectedPayment?.totalAmount.toLocaleString()} ຂ
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>ວິທີການຊຳລະ</Label>
                            <Select defaultValue={selectedPayment?.paymentMethod}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Cash">ເງິນສົດ</SelectItem>
                                    <SelectItem value="QR Code">QR Code</SelectItem>
                                    <SelectItem value="Bank Transfer">ໂອນທະນາຄານ</SelectItem>
                                    <SelectItem value="Card">ບັດເຄຣດິດ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>ໝາຍເຫດ</Label>
                            <Textarea placeholder="ຂໍ້ມູນເພີ່ມເຕີມ..." />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
                            ຍົກເລີກ
                        </Button>
                        <Button onClick={handleRecordPayment}>
                            ຢືນຢັນການຊຳລະ
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}