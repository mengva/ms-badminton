// app/admin/finance/payment-records/page.tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Search, Eye, Printer, Download, RotateCw } from "lucide-react";

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
import { cn } from "@workspace/ui/lib/utils";

interface PaymentRecord {
    id: string;
    paymentId: string;
    bookingId?: string;
    customerName: string;
    amount: number;
    paymentType: "Deposit" | "Full" | "Remaining" | "Refund";
    paymentMethod: "Cash" | "Bank Transfer" | "QR Code" | "Card";
    paymentStatus: "Paid" | "Pending" | "Failed";
    paymentDate: Date;
    staffName: string;
    referenceNumber?: string;
}

export default function PaymentRecordsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const [records] = useState<PaymentRecord[]>([
        {
            id: "1",
            paymentId: "PAY-20250514-001",
            bookingId: "BK-20250514-001",
            customerName: "ທ. ສົມສັກ ວິລະສັກ",
            amount: 400000,
            paymentType: "Full",
            paymentMethod: "Cash",
            paymentStatus: "Paid",
            paymentDate: new Date("2025-05-14 14:30"),
            staffName: "ນ. ອີນທະວົງ",
            referenceNumber: "CASH-001",
        },
        {
            id: "2",
            paymentId: "PAY-20250514-002",
            bookingId: "BK-20250514-002",
            customerName: "ນ. ອີນທະວົງ ບຸນມະນີ",
            amount: 300000,
            paymentType: "Deposit",
            paymentMethod: "QR Code",
            paymentStatus: "Paid",
            paymentDate: new Date("2025-05-14 09:15"),
            staffName: "ທ. ສົມບູນ",
            referenceNumber: "QR-98765",
        },
        {
            id: "3",
            paymentId: "PAY-20250514-003",
            bookingId: "BK-20250514-003",
            customerName: "ທ. ວິໄລ ສຸກສະຫວັນ",
            amount: 150000,
            paymentType: "Remaining",
            paymentMethod: "Bank Transfer",
            paymentStatus: "Paid",
            paymentDate: new Date("2025-05-13 17:45"),
            staffName: "ນ. ອີນທະວົງ",
        },
    ]);

    const filteredRecords = records.filter((record) => {
        const matchesSearch =
            record.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (record.bookingId && record.bookingId.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesType = typeFilter === "all" || record.paymentType === typeFilter;
        const matchesStatus = statusFilter === "all" || record.paymentStatus === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">ບັນທຶກການຈ່າຍເງິນ</h1>
                <p className="text-muted-foreground">ປະຫວັດການຊຳລະເງິນທັງໝົດ</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>ລາຍການການຈ່າຍເງິນ</CardTitle>
                    <CardDescription>ຄົ້ນຫາ ແລະ ກັ່ນຕອງການຊຳລະ</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Filters */}
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 relative sm:w-80">
                                <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="ຄົ້ນຫາ Payment ID, Booking ID, ຊື່ລູກຄ້າ..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value.trim())}
                                />
                            </div>
                        </div>

                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger className="lg:w-40 w-full">
                                <SelectValue placeholder="ປະເພດການຈ່າຍ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">ປະເພດການຈ່າຍທັງໝົດ</SelectItem>
                                <SelectItem value="Deposit">ເງິນມັດຈຳ</SelectItem>
                                <SelectItem value="Full">ຊຳລະເຕັມ</SelectItem>
                                <SelectItem value="Remaining">ຊຳລະຍ້ອງ</SelectItem>
                                <SelectItem value="Refund">ຄືນເງິນ</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="lg:w-40 w-full">
                                <SelectValue placeholder="ສະຖານະ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">ການຊຳລະທັງໝົດ</SelectItem>
                                <SelectItem value="Paid">ຊຳລະແລ້ວ</SelectItem>
                                <SelectItem value="Pending">ຄ້າງຊຳລະ</SelectItem>
                            </SelectContent>
                        </Select>
                        {/* Actions */}
                        <Button className="cursor-pointer">
                            <RotateCw className={cn("mr-2 h-4 w-4")} />
                            ໂຫຼດຂໍ້ມູນຄືນໃໝ່
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ລໍາດັບ</TableHead>
                                    <TableHead>ລະຫັດການຈ່າຍເງິນ</TableHead>
                                    <TableHead>ລະຫັດການຈອງ</TableHead>
                                    <TableHead>ລູກຄ້າ</TableHead>
                                    <TableHead>ປະເພດ</TableHead>
                                    <TableHead>ວິທີຊຳລະ</TableHead>
                                    <TableHead className="text-right">ຈຳນວນເງິນ</TableHead>
                                    <TableHead>ວັນທີ</TableHead>
                                    <TableHead>ພະນັກງານ</TableHead>
                                    <TableHead>ສະຖານະ</TableHead>
                                    <TableHead className="text-right">ຕົວເລືອກ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredRecords.map((record, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-mono text-sm">{ (index + 1).toString().padStart(4, "0") }</TableCell>
                                        <TableCell className="font-medium">{record.paymentId}</TableCell>
                                        <TableCell>{record.bookingId || "-"}</TableCell>
                                        <TableCell>{record.customerName}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{record.paymentType}</Badge>
                                        </TableCell>
                                        <TableCell>{record.paymentMethod}</TableCell>
                                        <TableCell className="text-right font-semibold">
                                            {record.amount.toLocaleString()} ຂ
                                        </TableCell>
                                        <TableCell>
                                            {format(record.paymentDate, "dd/MM/yyyy HH:mm")}
                                        </TableCell>
                                        <TableCell>{record.staffName}</TableCell>
                                        <TableCell>
                                            <Badge variant={"default"}>ຊຳລະແລ້ວ</Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="secondary" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                    ເບິ່ງລາຍລະອຽດ
                                                </Button>
                                                {/* <Button variant="ghost" size="sm">
                                                    <Download className="h-4 w-4" />
                                                </Button> */}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}