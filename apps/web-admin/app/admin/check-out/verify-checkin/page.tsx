"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Badge } from "@workspace/ui/components/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Search, Clock, User, LogOut } from "lucide-react";
import Link from "next/link";

const activeCheckIns = [
    {
        id: "CI-20260513-8921",
        bookingId: "BK-20260513-7842",
        customerName: "ທ. ສຸລິວົງ ສຸກສີ",
        customerPhone: "020 5555 1234",
        courtName: "ເດີ່ນ A-01 (5v5)",
        checkInTime: "18:45",
        scheduledEnd: "20:00",
        duration: "1 ຊົ່ວໂມງ",
        status: "CheckedIn",
    },
    {
        id: "CI-20260513-8922",
        bookingId: "BK-20260513-7845",
        customerName: "ທ. ບຸນຄຳ ສີສຸວັນ",
        customerPhone: "020 7777 8899",
        courtName: "ເດີ່ນ B-03 (7v7)",
        checkInTime: "17:30",
        scheduledEnd: "19:30",
        duration: "2 ຊົ່ວໂມງ",
        status: "CheckedIn",
    },
];

export default function VerifyCheckInPage() {
    const [search, setSearch] = useState("");
    const [courtFilter, setCourtFilter] = useState("All");

    const filteredCheckIns = activeCheckIns.filter((item) => {
        const matchesSearch =
            item.customerName.toLowerCase().includes(search.toLowerCase()) ||
            item.bookingId.toLowerCase().includes(search.toLowerCase()) ||
            item.courtName.toLowerCase().includes(search.toLowerCase());

        const matchesCourt = courtFilter === "All" || item.courtName.includes(courtFilter);

        return matchesSearch && matchesCourt;
    });

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold">ກວດສອບຂໍ້ມູນແຈ້ງເຂົ້າ</h2>
                <p className="text-muted-foreground">ເລືອກການແຈ້ງເຂົ້າທີ່ຕ້ອງການແຈ້ງອອກ</p>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>ຄົ້ນຫາການແຈ້ງເຂົ້າ</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="ຄົ້ນຫາດ້ວຍຊື່ລູກຄ້າ, Booking ID, ຫຼື ເດີ່ນ..."
                                    className="pl-10"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <Select value={courtFilter} onValueChange={setCourtFilter}>
                            <SelectTrigger className="w-46">
                                <SelectValue placeholder="ເລືອກເດີ່ນ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">ເດີ່ນທັງໝົດ</SelectItem>
                                <SelectItem value="A-01">ເດີ່ນ A-01</SelectItem>
                                <SelectItem value="B-03">ເດີ່ນ B-03</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Active Check-ins Table */}
            <Card>
                <CardHeader>
                    <CardTitle>ການແຈ້ງເຂົ້າທີ່ກຳລັງດຳເນີນ ( {filteredCheckIns.length} )</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Check-in ID</TableHead>
                                <TableHead>Booking ID</TableHead>
                                <TableHead>ລູກຄ້າ</TableHead>
                                <TableHead>ເດີ່ນ</TableHead>
                                <TableHead>ແຈ້ງເຂົ້າ</TableHead>
                                <TableHead>ສິ້ນສຸດຕາມກຳນົດ</TableHead>
                                <TableHead>ສະຖານະ</TableHead>
                                <TableHead className="text-right">ຄຳສັ່ງ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCheckIns.map((item) => (
                                <TableRow key={item.id} className="hover:bg-muted/50">
                                    <TableCell className="font-mono text-sm">{item.id}</TableCell>
                                    <TableCell className="font-mono text-sm">{item.bookingId}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p>{item.customerName}</p>
                                                <p className="text-xs text-muted-foreground">{item.customerPhone}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{item.courtName}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-green-600">
                                            <Clock className="h-4 w-4" />
                                            {item.checkInTime}
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.scheduledEnd}</TableCell>
                                    <TableCell>
                                        <Badge variant="default">ກຳລັງໃຊ້ງານ</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/admin/check-out/close-court?bookingId=${item.bookingId}`}>
                                            <Button>
                                                <LogOut className="mr-2 h-4 w-4" />
                                                ແຈ້ງອອກ
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {filteredCheckIns.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                                        ບໍ່ພົບການແຈ້ງເຂົ້າທີ່ກຳລັງດຳເນີນ
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}