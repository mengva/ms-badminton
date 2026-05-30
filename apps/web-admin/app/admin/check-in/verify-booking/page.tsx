"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Separator } from "@workspace/ui/components/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@workspace/ui/components/table";

import {
    FiSearch,
    FiUser,
    FiPhone,
    FiClock,
    FiCalendar,
    FiCheckCircle,
    FiPrinter
} from "react-icons/fi";
import { useRouter } from "next/navigation";

type Booking = {
    id: number;
    bookingCode: string;
    customerName: string;
    phone: string;
    court: string;
    date: string;
    time: string;
    players: string;
    status: "Pending" | "Confirmed" | "Completed";
    paymentStatus: "Paid"
};

const demoBooking: Booking[] = [
    {
        id: 1,
        bookingCode: "BK-20260513-8921",
        customerName: "ຈອນ ໂດ",
        phone: "020 9999 8888",
        court: "ເດີ່ນ A",
        date: "13/05/2026",
        time: "18:00 - 20:00",
        players: "4",
        status: "Confirmed",
        paymentStatus: "Paid",
    },
    {
        id: 2,
        bookingCode: "BK-20260513-8922",
        customerName: "ອາເລັກ",
        phone: "020 9999 8888",
        court: "ເດີ່ນ B",
        date: "13/05/2026",
        time: "18:00 - 20:00",
        players: "5",
        status: "Confirmed",
        paymentStatus: "Paid",
    },
    {
        id: 3,
        bookingCode: "BK-20260513-8923",
        customerName: "ເດວິດ",
        phone: "020 9999 8888",
        court: "ເດີ່ນ C",
        date: "13/05/2026",
        time: "18:00 - 20:00",
        players: "2",
        status: "Confirmed",
        paymentStatus: "Paid",
    }
];

export default function VerifyBookingPage() {
    const [bookingCode, setBookingCode] = useState("");
    const [bookings, setBookings] = useState<Booking[] | null>(demoBooking);
    const router = useRouter();

    const handleVerifyBooking = () => {
        // Demo verify
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        ກວດສອບຂໍ້ມູນການຈອງ
                    </h1>

                    <p className="text-muted-foreground">
                        ຄົ້ນຫາ ແລະ ກວດສອບຂໍ້ມູນການຈອງຂອງລູກຄ້າ
                    </p>
                </div>
            </div>

            {/* Search Card */}
            <Card>
                <CardHeader>
                    <CardTitle>ຄົ້ນຫາການຈອງ</CardTitle>

                    <CardDescription>
                        ປ້ອນ booking code ຫຼື ເບີໂທລູກຄ້າ
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <Input
                            placeholder="ປ້ອນ Booking Code..."
                            value={bookingCode}
                            onChange={(e) =>
                                setBookingCode(e.target.value)
                            }
                        />

                        <Button
                            onClick={handleVerifyBooking}
                        >
                            <FiSearch className="mr-2" />
                            ກວດສອບ
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Booking Result */}
            {bookings?.length && (
                bookings.map((booking, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <FiCheckCircle className="text-green-600" />
                                    ພົບຂໍ້ມູນການຈອງ
                                </CardTitle>

                                <CardDescription>
                                    ລາຍລະອຽດການຈອງຂອງລູກຄ້າ
                                </CardDescription>
                            </div>

                            <Badge className="rounded-xl" variant={"info"}>
                                {booking.status === "Confirmed" && "ຢືນຢັນແລ້ວ"}
                            </Badge>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Customer Info */}
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                <div className="rounded-2xl border p-4">
                                    <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                                        <FiUser />
                                        <span>ລູກຄ້າ</span>
                                    </div>

                                    <p className="font-semibold">
                                        {booking.customerName}
                                    </p>
                                </div>

                                <div className="rounded-2xl border p-4">
                                    <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                                        <FiPhone />
                                        <span>ເບີໂທ</span>
                                    </div>

                                    <p className="font-semibold">
                                        {booking.phone}
                                    </p>
                                </div>

                                <div className="rounded-2xl border p-4">
                                    <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                                        <FiCalendar />
                                        <span>ວັນທີ</span>
                                    </div>

                                    <p className="font-semibold">
                                        {booking.date}
                                    </p>
                                </div>

                                <div className="rounded-2xl border p-4">
                                    <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                                        <FiClock />
                                        <span>ເວລາ</span>
                                    </div>

                                    <p className="font-semibold">
                                        {booking.time}
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            {/* Booking Detail Table */}
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            ລະຫັດການຈອງ
                                        </TableHead>

                                        <TableHead>
                                         ເດີ່ນ
                                        </TableHead>

                                        <TableHead>
                                            ຜູ້ຫຼິ້ນ
                                        </TableHead>

                                        <TableHead>
                                          ການຈ່າຍເງິນ
                                        </TableHead>

                                        <TableHead>
                                            ສະຖານະ
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            {booking.bookingCode}
                                        </TableCell>

                                        <TableCell>
                                            {booking.court}
                                        </TableCell>

                                        <TableCell>
                                            {booking.players} ຄົນ
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                variant="default"
                                                className="rounded-xl"
                                            >
                                                {booking.paymentStatus === "Paid" && "ຈ່າຍແລ້ວ"}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Badge className="rounded-xl" variant={"info"}>
                                                {booking.status === "Confirmed" && "ຢືນຢັນແລ້ວ"}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            {/* Actions */}
                            <div className="flex flex-col gap-3 md:flex-row">
                                <Button className="rounded-md">
                                   ຢືນຢັນການເຊັກອິນ
                                </Button>
{/* 
                                <Button
                                    variant="outline"
                                    className="rounded-xl"
                                >
                                    <FiPrinter/>
                                   ພິມໃບຢືນຢັນການເເຈ້ງເຂົ້າ
                                </Button> */}
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
}