"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table";
import { Search, Plus, Edit, Power, RotateCw } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@workspace/ui/lib/utils";

interface BookingDto {
    id: string;
    bookingCode: string;
    customerName: string;
    courtName: string;
    type: string;
    hourlyRate: number;
    status: "Booked" | "Occupied";
    bookingStatus: "CheckedIn",
    location: string;
}

const demoCourts: BookingDto[] = [
    {
        id: "1",
        bookingCode: "BK-20260513-8921",
        customerName: "ຈອນ ໂດ",
        courtName: "ເດີ່ນ A-01",
        type: "5v5 ມາດຕະຖານ",
        hourlyRate: 150000,
        status: "Booked",
        location: "ຊັ້ນ 1, ຕຶກ A",
        bookingStatus: "CheckedIn"
    },
    {
        id: "2",
        bookingCode: "BK-20260513-8922",
        customerName: "ອາເລັກ",
        courtName: "ເດີ່ນ A-02",
        type: "7v7 ໃຫຍ່",
        hourlyRate: 250000,
        status: "Booked",
        location: "ຊັ້ນ 1, ຕຶກ A",
        bookingStatus: "CheckedIn"
    },
    {
        id: "3",
        bookingCode: "BK-20260513-8923",
        customerName: "ເດວິດ",
        courtName: "ເດີ່ນ B-03",
        type: "5v5 ມາດຕະຖານ",
        hourlyRate: 140000,
        status: "Occupied",
        location: "ຊັ້ນ 2, ຕຶກ B",
        bookingStatus: "CheckedIn"
    },
];

export default function OpenCourtPage() {
    const [courts, setCourts] = useState<BookingDto[]>(demoCourts);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Booked");
    const [typeFilter, setTypeFilter] = useState("All");

    const handleStatusChange = (courtId: string, newStatus: BookingDto['status']) => {
        setCourts(prev => {
            return prev.map(c => c.id === courtId ? { ...c, status: newStatus} : c)
        })
        toast.success(`ເດີ່ນ #${courtId} ປ່ຽນສະຖານະເປັນ ${newStatus}`);
        // Call your API here to update court status
    };

    const filteredCourts = courts.filter((court) => {
        const matchesSearch = court.courtName.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "All" || court.status === statusFilter;
        const matchesType = typeFilter === "All" || court.type.includes(typeFilter);
        return matchesSearch && matchesStatus && matchesType;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">ເປີດເດີ່ນ</h2>
                    <p className="text-muted-foreground">ຈັດການສະຖານະເດີ່ນ ແລະ ເປີດໃຊ້ງານ</p>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">ກັ່ນຕອງ</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4">
                        {/* <div className="flex-1 min-w-[280px]"> */}
                        {/* <div className="relative">
                                <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="ຊື່ເດີ່ນ..."
                                    className="pl-10"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />

                            </div> */}
                        {/* </div> */}
                        <div className="relative sm:w-80">
                            <Search className="absolute left-2 top-2 size-4 text-muted-foreground" />
                            <Input placeholder="ຊື່ເດີ່ນ..." className="pl-10" />
                        </div>

                        <div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-46">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Booked">ພ້ອມໃຊ້ງານ</SelectItem>
                                    <SelectItem value="Occupied">ກຳລັງໃຊ້ງານ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger className="w-46">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">ປະເພດເດີ່ນທັງໝົດ</SelectItem>
                                    <SelectItem value="5v5">5v5 ມາດຕະຖານ</SelectItem>
                                    <SelectItem value="7v7">7v7 ໃຫຍ່</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Actions */}
                        <Button className="cursor-pointer">
                            <RotateCw className={cn("mr-2 h-4 w-4")} />
                            ໂຫຼດຂໍ້ມູນຄືນໃໝ່
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Courts Table */}
            <Card>
                <CardHeader>
                    <CardTitle>ລາຍການເດີ່ນ ({filteredCourts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ລໍາດັບ</TableHead>
                                <TableHead>ລະຫັດການຈອງ</TableHead>
                                <TableHead>ລູກຄ້າ</TableHead>
                                <TableHead>ຊື່ເດີ່ນ</TableHead>
                                <TableHead>ປະເພດ</TableHead>
                                <TableHead>ລາຄາ/ຊົ່ວໂມງ</TableHead>
                                <TableHead>ສະຖານທີ່</TableHead>
                                <TableHead>ສະຖານະເດິ່ນ</TableHead>
                                <TableHead>ສະຖານະການຈອງ</TableHead>
                                <TableHead className="text-center">ປ່ຽນສະຖານະ</TableHead>
                                {/* <TableHead className="text-right">ຄຳສັ່ງ</TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCourts.map((court, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{( index + 1 ).toString().padStart(4, "0")}</TableCell>
                                    <TableCell className="font-medium">{court.bookingCode}</TableCell>
                                    <TableCell className="font-medium">{court.customerName}</TableCell>
                                    <TableCell className="font-medium">{court.courtName}</TableCell>
                                    <TableCell>{court.type}</TableCell>
                                    <TableCell>{court.hourlyRate.toLocaleString()} ກີບ</TableCell>
                                    <TableCell className="text-muted-foreground">{court.location}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                court.status === "Booked"
                                                    ? "secondary"
                                                    : court.status === "Occupied"
                                                        ? "default"
                                                        : "destructive"
                                            }
                                        >
                                            {court.status === "Booked" && "ພ້ອມໃຊ້ງານ"}
                                            {court.status === "Occupied" && "ກຳລັງໃຊ້ງານ"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                court.bookingStatus === "CheckedIn"
                                                    ? "info"
                                                    : "secondary"
                                            }
                                        >
                                            {court.bookingStatus === "CheckedIn" && "ເຊັກອິນແລ້ວ"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleStatusChange(court.id, "Occupied")}
                                                disabled={court.status === "Occupied"}
                                            >
                                                <Power className="mr-1 h-4 w-4" />
                                                ເປີດເດີ່ນ
                                            </Button>
                                            {/* <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleStatusChange(court.id, "Maintenance")}
                                            >
                                                ບຳລຸງ
                                            </Button> */}
                                        </div>
                                    </TableCell>
                                    {/* <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}