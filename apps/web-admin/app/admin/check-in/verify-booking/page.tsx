// // app/admin/check-in/verify-booking/page.tsx
// import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
// import { Input } from "@workspace/ui/components/input";
// import { Button } from "@workspace/ui/components/button";
// import { Badge } from "@workspace/ui/components/badge";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table";
// import { Search, User, Calendar, Clock } from "lucide-react";

// export default function VerifyBookingPage() {
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-3xl font-bold">ກວດສອບຂໍ້ມູນການຈອງ</h2>
//       </div>

//       {/* Search Bar */}
//       <Card>
//         <CardHeader>
//           <CardTitle>ຄົ້ນຫາການຈອງ</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex gap-3">
//             <div className="flex-1">
//               <Input placeholder="ປ້ອນລະຫັດການຈອງ / ເບີໂທ / ຊື່ລູກຄ້າ" className="text-lg" />
//             </div>
//             <Button size="lg">
//               <Search className="mr-2" /> ຄົ້ນຫາ
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Booking Result */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             ຜົນການຄົ້ນຫາ
//             <Badge variant="secondary">PENDING CHECK-IN</Badge>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Booking ID</TableHead>
//                 <TableHead>ລູກຄ້າ</TableHead>
//                 <TableHead>ເດີ່ນ</TableHead>
//                 <TableHead>ວັນທີ</TableHead>
//                 <TableHead>ເວລາ</TableHead>
//                 <TableHead>ສະຖານະ</TableHead>
//                 <TableHead></TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               <TableRow>
//                 <TableCell className="font-mono">BK-20260513-7842</TableCell>
//                 <TableCell>
//                   <div className="flex items-center gap-2">
//                     <User className="w-4 h-4" />
//                     ທ. ສຸລິວົງ ສຸກສີ
//                   </div>
//                 </TableCell>
//                 <TableCell>ເດີ່ນ A-01 (5v5)</TableCell>
//                 <TableCell>13/05/2026</TableCell>
//                 <TableCell>19:00 - 20:00</TableCell>
//                 <TableCell>
//                   <Badge variant="outline" className="text-green-600">ພ້ອມແລ້ວ</Badge>
//                 </TableCell>
//                 <TableCell>
//                   <Button>ແຈ້ງເຂົ້າ</Button>
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


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
} from "react-icons/fi";

const demoBooking = {
    bookingCode: "BK-2026-0001",
    customerName: "Meng",
    phone: "020 9999 8888",
    court: "Court A",
    date: "13/05/2026",
    time: "18:00 - 20:00",
    players: 4,
    status: "Confirmed",
    paymentStatus: "Paid",
};

export default function VerifyBookingPage() {
    const [bookingCode, setBookingCode] = useState("");
    const [booking, setBooking] = useState<any | null>(null);

    const handleVerifyBooking = () => {
        // Demo verify
        if (bookingCode.trim() !== "") {
            setBooking(demoBooking);
        }
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
            {booking && (
                <Card>
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

                        <Badge className="rounded-xl" variant={"default"}>
                            {booking.status}
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
                                        Booking Code
                                    </TableHead>

                                    <TableHead>
                                        Court
                                    </TableHead>

                                    <TableHead>
                                        Players
                                    </TableHead>

                                    <TableHead>
                                        Payment
                                    </TableHead>

                                    <TableHead>
                                        Status
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
                                        {booking.players} Players
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className="rounded-xl"
                                        >
                                            {booking.paymentStatus}
                                        </Badge>
                                    </TableCell>

                                    <TableCell>
                                        <Badge className="rounded-xl" variant={"default"}>
                                            {booking.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 md:flex-row">
                            <Button className="rounded-xl">
                                Confirm Check-In
                            </Button>

                            <Button
                                variant="outline"
                                className="rounded-xl"
                            >
                                Print Booking
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}