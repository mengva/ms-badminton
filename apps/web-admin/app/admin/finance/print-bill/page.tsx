// app/admin/finance/print-bill/page.tsx
"use client";

import { useState } from "react";
import { Search, Printer, RotateCw } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@workspace/ui/components/table";
import { cn } from "@workspace/ui/lib/utils";

export default function PrintBillPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const bills = [
        {
            id: "1",
            billNo: "INV-20250514-001",
            customerName: "ທ. ສົມສັກ ວິລະສັກ",
            bookingId: "BK-20250514-001",
            date: new Date("2025-05-14"),
            totalAmount: 400000,
            paidAmount: 400000,
            status: "Paid",
        },
        {
            id: "2",
            billNo: "INV-20250514-002",
            customerName: "ນ. ອີນທະວົງ ບຸນມະນີ",
            bookingId: "BK-20250514-002",
            date: new Date("2025-05-14"),
            totalAmount: 300000,
            paidAmount: 300000,
            status: "Paid",
        },
    ];

    const filteredBills = bills.filter((bill) =>
        bill.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePrint = (billNo: string) => {
        alert(`ກຳລັງພິມໃບບິນ: ${billNo}`);
        // In real app, open print dialog or generate PDF
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">ພິມໃບບິນ</h1>
                <p className="text-muted-foreground">ຄົ້ນຫາ ແລະ ພິມໃບບິນ / ໃບຮັບເງິນ</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>ລາຍການໃບບິນ</CardTitle>
                    <CardDescription>ເລືອກໃບບິນທີ່ຕ້ອງການພິມ</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-3">

                        <div className="relative sm:w-80">
                            <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="ຄົ້ນຫາໃບບິນ ຫຼື ຊື່ລູກຄ້າ..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
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
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                     <TableHead>ລໍາດັບ</TableHead>
                                    <TableHead>ເລກທີ່ບິນ</TableHead>
                                    <TableHead>ລະຫັດການຈອງ</TableHead>
                                    <TableHead>ລູກຄ້າ</TableHead>
                                    <TableHead>ວັນທີ</TableHead>
                                    <TableHead className="text-right">ລວມທັງໝົດ</TableHead>
                                    <TableHead className="text-right">ຊຳລະແລ້ວ</TableHead>
                                    <TableHead>ສະຖານະ</TableHead>
                                    <TableHead className="text-center">ພິມ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredBills.map((bill, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-mono text-sm">{ (index + 1).toString().padStart(4, "0") }</TableCell>
                                        <TableCell className="font-medium">{bill.billNo}</TableCell>
                                        <TableCell>{bill.bookingId}</TableCell>
                                        <TableCell>{bill.customerName}</TableCell>
                                        <TableCell>{format(bill.date, "dd/MM/yyyy")}</TableCell>
                                        <TableCell className="text-right font-semibold">
                                            {bill.totalAmount.toLocaleString()} ຂ
                                        </TableCell>
                                        <TableCell className="text-right text-green-600">
                                            {bill.paidAmount.toLocaleString()} ຂ
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={bill.status === "Paid" ? "default" : "warning"}
                                            >
                                                {bill.status === "Paid" ? "ຊຳລະສຳເລັດ" : "ຊຳລະບາງສ່ວນ"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button onClick={() => handlePrint(bill.billNo)}>
                                                <Printer className="mr-2 h-4 w-4" />
                                                ພິມໃບບິນ
                                            </Button>
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