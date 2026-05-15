"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table";
import { Search, Plus, Edit, Power } from "lucide-react";
import toast from "react-hot-toast";

const courts = [
    {
        id: "1",
        courtName: "ເດີ່ນ A-01",
        type: "5v5 ມາດຕະຖານ",
        hourlyRate: 150000,
        status: "Available",
        location: "ຊັ້ນ 1, ຕຶກ A",
    },
    {
        id: "2",
        courtName: "ເດີ່ນ A-02",
        type: "7v7 ໃຫຍ່",
        hourlyRate: 250000,
        status: "Occupied",
        location: "ຊັ້ນ 1, ຕຶກ A",
    },
    {
        id: "3",
        courtName: "ເດີ່ນ B-01",
        type: "5v5 ມາດຕະຖານ",
        hourlyRate: 140000,
        status: "Maintenance",
        location: "ຊັ້ນ 2, ຕຶກ B",
    },
];

export default function OpenCourtPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");

    const handleStatusChange = (courtId: string, newStatus: string) => {
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
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    ເພີ່ມເດີ່ນໃໝ່
                </Button>
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
                            <div className="relative flex-1">
                                <Search className="absolute left-2 top-2 size-4 text-muted-foreground" />
                                <Input placeholder="ຊື່ເດີ່ນ..." className="pl-10" />
                            </div>

                        <div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-46">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">ສະຖານະທັງໝົດ</SelectItem>
                                    <SelectItem value="Available">ເປີດໃຊ້ງານ</SelectItem>
                                    <SelectItem value="Occupied">ກຳລັງໃຊ້ງານ</SelectItem>
                                    <SelectItem value="Maintenance">ບຳລຸງຮັກສາ</SelectItem>
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
                                <TableHead>ຊື່ເດີ່ນ</TableHead>
                                <TableHead>ປະເພດ</TableHead>
                                <TableHead>ລາຄາ/ຊົ່ວໂມງ</TableHead>
                                <TableHead>ສະຖານທີ່</TableHead>
                                <TableHead>ສະຖານະ</TableHead>
                                <TableHead className="text-center">ປ່ຽນສະຖານະ</TableHead>
                                <TableHead className="text-right">ຄຳສັ່ງ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCourts.map((court) => (
                                <TableRow key={court.id}>
                                    <TableCell className="font-medium">{court.courtName}</TableCell>
                                    <TableCell>{court.type}</TableCell>
                                    <TableCell>{court.hourlyRate.toLocaleString()} ກີບ</TableCell>
                                    <TableCell className="text-muted-foreground">{court.location}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                court.status === "Available"
                                                    ? "default"
                                                    : court.status === "Occupied"
                                                        ? "destructive"
                                                        : "secondary"
                                            }
                                        >
                                            {court.status === "Available" && "ເປີດໃຊ້ງານ"}
                                            {court.status === "Occupied" && "ກຳລັງໃຊ້ງານ"}
                                            {court.status === "Maintenance" && "ບຳລຸງຮັກສາ"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleStatusChange(court.id, "Available")}
                                                disabled={court.status === "Available"}
                                            >
                                                <Power className="mr-1 h-4 w-4" />
                                                ເປີດເດີ່ນ
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleStatusChange(court.id, "Maintenance")}
                                            >
                                                ບຳລຸງ
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}