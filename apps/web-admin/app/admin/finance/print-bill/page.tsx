// // app/admin/finance/print-bill/page.tsx
// "use client";

// import { useState } from "react";
// import { Search, Printer, RotateCw } from "lucide-react";
// import { format } from "date-fns";

// import { Button } from "@workspace/ui/components/button";
// import { Input } from "@workspace/ui/components/input";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle
// } from "@workspace/ui/components/card";
// import { Badge } from "@workspace/ui/components/badge";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@workspace/ui/components/table";
// import { cn } from "@workspace/ui/lib/utils";

// export default function PrintBillPage() {
//     const [searchTerm, setSearchTerm] = useState("");

//     const bills = [
//         {
//             id: "1",
//             billNo: "INV-20250514-001",
//             customerName: "ທ. ສົມສັກ ວິລະສັກ",
//             bookingId: "BK-20250514-001",
//             date: new Date("2025-05-14"),
//             totalAmount: 400000,
//             paidAmount: 400000,
//             status: "Paid",
//         },
//         {
//             id: "2",
//             billNo: "INV-20250514-002",
//             customerName: "ນ. ອີນທະວົງ ບຸນມະນີ",
//             bookingId: "BK-20250514-002",
//             date: new Date("2025-05-14"),
//             totalAmount: 300000,
//             paidAmount: 300000,
//             status: "Paid",
//         },
//     ];

//     const filteredBills = bills.filter((bill) =>
//         bill.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         bill.customerName.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handlePrint = (billNo: string) => {
//         alert(`ກຳລັງພິມໃບບິນ: ${billNo}`);
//         // In real app, open print dialog or generate PDF
//     };

//     return (
//         <div className="space-y-6">
//             <div>
//                 <h1 className="text-3xl font-bold">ພິມໃບບິນ</h1>
//                 <p className="text-muted-foreground">ຄົ້ນຫາ ແລະ ພິມໃບບິນ / ໃບຮັບເງິນ</p>
//             </div>

//             <Card>
//                 <CardHeader>
//                     <CardTitle>ລາຍການໃບບິນ</CardTitle>
//                     <CardDescription>ເລືອກໃບບິນທີ່ຕ້ອງການພິມ</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="flex flex-col sm:flex-row gap-3">

//                         <div className="relative sm:w-80">
//                             <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
//                             <Input
//                                 placeholder="ຄົ້ນຫາໃບບິນ ຫຼື ຊື່ລູກຄ້າ..."
//                                 className="pl-10"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                         </div>
//                         {/* Actions */}
//                         <Button className="cursor-pointer">
//                             <RotateCw className={cn("mr-2 h-4 w-4")} />
//                             ໂຫຼດຂໍ້ມູນຄືນໃໝ່
//                         </Button>
//                     </div>
//                 </CardContent>
//             </Card>

//             <Card>
//                 <CardContent>
//                     <div className="rounded-md border">
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                      <TableHead>ລໍາດັບ</TableHead>
//                                     <TableHead>ເລກທີ່ບິນ</TableHead>
//                                     <TableHead>ລະຫັດການຈອງ</TableHead>
//                                     <TableHead>ລູກຄ້າ</TableHead>
//                                     <TableHead>ວັນທີ</TableHead>
//                                     <TableHead className="text-right">ລວມທັງໝົດ</TableHead>
//                                     <TableHead className="text-right">ຊຳລະແລ້ວ</TableHead>
//                                     <TableHead>ສະຖານະ</TableHead>
//                                     <TableHead className="text-center">ພິມ</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {filteredBills.map((bill, index) => (
//                                     <TableRow key={index}>
//                                         <TableCell className="font-mono text-sm">{ (index + 1).toString().padStart(4, "0") }</TableCell>
//                                         <TableCell className="font-medium">{bill.billNo}</TableCell>
//                                         <TableCell>{bill.bookingId}</TableCell>
//                                         <TableCell>{bill.customerName}</TableCell>
//                                         <TableCell>{format(bill.date, "dd/MM/yyyy")}</TableCell>
//                                         <TableCell className="text-right font-semibold">
//                                             {bill.totalAmount.toLocaleString()} ຂ
//                                         </TableCell>
//                                         <TableCell className="text-right text-green-600">
//                                             {bill.paidAmount.toLocaleString()} ຂ
//                                         </TableCell>
//                                         <TableCell>
//                                             <Badge
//                                                 variant={bill.status === "Paid" ? "default" : "warning"}
//                                             >
//                                                 {bill.status === "Paid" ? "ຊຳລະສຳເລັດ" : "ຊຳລະບາງສ່ວນ"}
//                                             </Badge>
//                                         </TableCell>
//                                         <TableCell className="text-center">
//                                             <Button onClick={() => handlePrint(bill.billNo)}>
//                                                 <Printer className="mr-2 h-4 w-4" />
//                                                 ພິມໃບບິນ
//                                             </Button>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

'use client';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { Printer } from 'lucide-react';
import { useRef } from 'react';
import ImageLoGo from "../../../../public/images/MS.badmintion_logo1.png"
import Image from 'next/image';
import { Badge } from '@workspace/ui/components/badge';

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
    status: "ລໍຖ້າ" | "ຢືນຢັນແລ້ວ" | "ຍົກເລີກ" | "ເຊັກອິນ" | "ສຳເລັດແລ້ວ";
    typeName: string;
    paymentTime?: Date;
    paymentMethod: "Cash" | "Bank Transfer" | "QR Code" | "Card";
    paymentStatus: "ຈ່າຍແລ້ວ" | "ລໍຖ້າດຳເນີນການ" | "ລົ້ມເຫຼວ";
    paymentType: "ມັດຈຳ" | "ເຕັມ" | "ຄົງເຫຼືອ" | "ຄືນເງິນ"
}

interface CourtPayment {
    id: string;
    transactionId: string;
    customerName: string;
    courtName: string;
    usageDate: Date;
    startTime: string;
    endTime: string;
    hours: number;
    ratePerHour: number;
    paymentTime?: Date;
    paymentMethod: "Cash" | "Bank Transfer" | "QR Code" | "Card";
    paymentStatus: "ຈ່າຍແລ້ວ" | "ລໍຖ້າດຳເນີນການ" | "ລົ້ມເຫຼວ";
    paymentType: "ມັດຈຳ" | "ເຕັມ" | "ຄົງເຫຼືອ" | "ຄືນເງິນ"
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    notes?: string;
    typeName: string;
}


const bookingPayment: BookingPayment = {
    id: "3",
    bookingId: "BK-20250514-003",
    customerName: "ທ. ວິໄລ ສຸກສະຫວັນ",
    courtName: "ເດີ່ນ A3",
    bookingDate: new Date("2025-05-10"),
    startTime: "17:00",
    endTime: "19:00",
    totalAmount: 450000,
    paidAmount: 150000,
    remainingAmount: 0,
    status: "ຢືນຢັນແລ້ວ",
    paymentStatus: "ຈ່າຍແລ້ວ",
    typeName: "2v2 ຄູ່",
    paymentTime: new Date("2025-05-10T16:00:20.752Z"),
    paymentMethod: "Bank Transfer",
    paymentType: "ມັດຈຳ"
};

const courtPayment: CourtPayment = {
    id: "1",
    transactionId: "FP-20250514-001",
    customerName: "ທ. ວິໄລ ສຸກສະຫວັນ",
    courtName: "ເດີ່ນ A3",
    usageDate: new Date("2025-05-14"),
    startTime: "17:00",
    endTime: "19:00",
    hours: 2,
    ratePerHour: 150000,
    paymentMethod: "QR Code",
    totalAmount: 450000,
    paidAmount: 300000,
    remainingAmount: 0,
    paymentStatus: "ຈ່າຍແລ້ວ",
    paymentType: "ຄົງເຫຼືອ",
    typeName: "2v2 ຄູ່",
    paymentTime: new Date("2025-05-14T16:30:50.752Z"),
};

export default function PrintBillPage() {
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        window.print();
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('la-LA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('lo-LA', {
            style: 'currency',
            currency: 'LAK',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const string: string = "1325639982";

    function onReversedStr(str: string) {

        const reversed = str.split('').reverse();
        let n = 3;

        return [...reversed.map((v, i) => {
            return i === n ? (n += 3, v + ".") : v;
        })].reverse().join('') as string;

    }

    console.log("value is: ", onReversedStr(string) + " KIP");

    return (
        <div className="min-h-screen">
            <div className="max-w-3xl mx-auto px-4">
                {/* Print Button */}
                <div className="flex justify-end mb-4 print:hidden">
                    <Button onClick={handlePrint} className="flex items-center gap-2">
                        <Printer className="w-4 h-4" />
                        ພິມບິນ
                    </Button>
                </div>

                {/* Printable Area */}
                <Card ref={printRef} className="print:shadow-none print:border-none">
                    <CardHeader className="text-center border-b pb-6">
                        <div className="flex justify-center">
                            <Image src={ImageLoGo} width={100} height={100} alt="logo" />
                        </div>
                        <CardTitle className="text-2xl font-bold">ບິນລວມຍອດຊຳລະເງິນ / INVOICE</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">ເດີ່ນບານກິລາ - ສະໜາມກິລາ</p>
                        <p className="text-xs text-gray-500">ໂທລະສັບ: 020 5555 1234 | ວັນທີ: {new Date().toLocaleDateString('la-LA')}</p>
                    </CardHeader>

                    <CardContent className="p-8 space-y-8">
                        {/* Customer Info */}
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">ລູກຄ້າ / Customer</p>
                                <p className="font-semibold text-lg">{bookingPayment.customerName}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500 mb-1">ເລກບິນ / Bill No.</p>
                                <p className="font-mono font-medium">{bookingPayment.bookingId}</p>
                            </div>
                        </div>

                        <Separator />

                        {/* Booking Details */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg">ລາຍການຈອງ ເເລະ ການຈ່າຍເງິນ</h3>
                                <Badge variant={bookingPayment.status === "ລໍຖ້າ" ? "warning" : "info"} className="text-sm">
                                    {bookingPayment.status}
                                </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-y-3 text-sm">
                                <div>ເດີ່ນ ເເລະ ປະເພດເດີ່ນ:</div>
                                <div className="text-right font-medium">{bookingPayment.courtName} ເເລະ ປະເພດເດີ່ນ {bookingPayment.typeName}</div>

                                <div>ວັນທີຈອງ:</div>
                                <div className="text-right">{formatDate(bookingPayment.bookingDate)}</div>

                                <div className='flex justify-between gap-4 col-span-2'>
                                    <div className='flex items-center gap-2 justify-start'>
                                        <div>ຄ່າຈອງ ຫຼື ຄ່າມັດຈຳ:</div>
                                        <div className='flex justify-end text-lg font-semibold text-green-600'>
                                            <span className="font-semibold">{bookingPayment.paidAmount} ກິບ</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2 justify-start'>
                                        <div>ເວລາຈ່າຍເງິນ:</div>
                                        <div className="text-right">
                                            {/* {bookingPayment.paymentTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} */}
                                            {bookingPayment.paymentTime ? new Date(bookingPayment.paymentTime).toLocaleString('la-LA') : '-'}
                                        </div>
                                    </div>
                                </div>

                                <div className='flex justify-between gap-4 col-span-2'>
                                    <div className='flex items-center gap-2 justify-start'>
                                        <div>ສະຖານະການຈ່າຍເງິນ:</div>
                                        <div className={`flex justify-end text-lg font-semibold ${bookingPayment.paymentStatus === "ຈ່າຍແລ້ວ" ? "text-green-600" : bookingPayment.paymentStatus === "ລໍຖ້າດຳເນີນການ" ? "text-yellow-600" : "text-red-600"}`}>
                                            <span className="font-semibold">{bookingPayment.paymentStatus}</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2 justify-start'>
                                        <div>ປະເພດການຈ່າຍເງິນ:</div>
                                        <div className={`flex justify-end text-lg font-semibold ${bookingPayment.paymentType === "ມັດຈຳ" ? "text-orange-600" : bookingPayment.paymentType === "ເຕັມ" ? "text-green-600" : "text-red-600"}`}>
                                            <span className="font-semibold">{bookingPayment.paymentType}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Court Usage Payment */}
                        <div>
                            <h3 className="font-semibold mb-3 text-lg">ລາຍການໃຊ້ເດີ່ນ ເເລະ ການຈ່າຍເງິນ</h3>
                            <div className="grid grid-cols-2 gap-y-3 text-sm">

                                <div>ເດີ່ນ ເເລະ ປະເພດເດີ່ນ:</div>
                                <div className="text-right font-medium">{courtPayment.courtName} ເເລະ ປະເພດເດີ່ນ {courtPayment.typeName}</div>

                                <div>ວັນທີຫຼີ້ນ ເເລະ ເວລາຫຼີ້ນ:</div>
                                <div className="text-right">{formatDate(courtPayment.usageDate)}, {courtPayment.startTime} - {courtPayment.endTime} PM ({courtPayment.hours} ຊົ່ວໂມງ)</div>

                                <div className='text-orange-600'>ອັດຕາລາຄາ/ຊົ່ວໂມງ:</div>
                                <div className="text-right text-orange-600">{courtPayment.ratePerHour} ກິບ</div>

                                <div className='flex justify-between gap-4 col-span-2'>
                                    <div className='flex items-center gap-2 justify-start'>
                                        <div>ລວມຄ່າເດິ່ນຍັງເຫຼືອທັງໝົດ: </div>
                                        <div className='flex justify-end text-lg font-semibold text-green-600'>
                                            <span className="font-semibold">{courtPayment.paidAmount} ກິບ</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2 justify-start'>
                                        <div>ເວລາຈ່າຍເງິນ:</div>
                                        <div className="text-right">
                                            {/* {courtPayment.paymentTime?.toLocaleTimeString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })} */}
                                            {new Date(courtPayment.paymentTime || new Date()).toLocaleString('la-LA')}
                                        </div>
                                    </div>
                                </div>

                                <div className='flex justify-between gap-4 col-span-2'>
                                    <div className='flex items-center gap-2 justify-start'>
                                        <div>ສະຖານະການຈ່າຍເງິນ:</div>
                                        <div className={`flex justify-end text-lg font-semibold ${courtPayment.paymentStatus === "ຈ່າຍແລ້ວ" ? "text-green-600" : courtPayment.paymentStatus === "ລໍຖ້າດຳເນີນການ" ? "text-yellow-600" : "text-red-600"}`}>
                                            <span className="font-semibold">{courtPayment.paymentStatus}</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2 justify-start'>
                                        <div>ປະເພດການຈ່າຍເງິນ:</div>
                                        <div className={`flex justify-end text-lg font-semibold ${courtPayment.paymentType === "ມັດຈຳ" ? "text-orange-600" : courtPayment.paymentType === "ຄົງເຫຼືອ" ? "text-sky-600" : "text-red-600"}`}>
                                            <span className="font-semibold">{courtPayment.paymentType}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* <div>ວິທີການຊໍາລະ:</div>
                                <div className='flex justify-end text-lg font-semibold'>
                                    <span className="font-semibold">{courtPayment.paymentMethod}</span>
                                </div> */}
                            </div>
                        </div>

                        <Separator />

                        {/* Payment Summary */}
                        <div className="dark:bg-gray-800/50 bg-gray-500/10 p-6 rounded-lg space-y-4">
                            <div className="flex justify-between text-lg">
                                <span>ຄ່າຈອງ ຫຼື ຄ່າມັດຈຳ (Booking):
                                    {/* <Badge variant={"default"} className='ml-2'>ຈ່າຍເເລ້ວ</Badge> */}
                                </span>
                                <span className="font-semibold">{bookingPayment.paidAmount} ກິບ</span>
                            </div>

                            <div className="flex justify-between text-lg">
                                <span>ລວມເດິ່ນຕ້ອງ (Court Usage):
                                    {/* <Badge variant={"default"} className='ml-2'>ຈ່າຍເເລ້ວ</Badge> */}
                                </span>
                                <span className="font-semibold">{courtPayment.paidAmount} ກິບ</span>
                            </div>

                            <Separator />

                            <div className="flex justify-between text-xl font-bold">
                                <span>ລວມຄ່າເດິ່ນທັງໝົດ:</span>
                                <span>{(bookingPayment.paidAmount + courtPayment.paidAmount)} ກິບ</span>
                            </div>

                            <div className="flex justify-between text-xl text-green-600">
                                <span className="font-semibold">ຈ່າຍແລ້ວ:</span>
                                <span className="font-semibold">
                                    {(bookingPayment.paidAmount + courtPayment.paidAmount)} ກິບ
                                </span>
                            </div>

                            {
                                (courtPayment.remainingAmount) > 0 && (
                                    <div className="flex justify-between text-red-600 font-semibold">
                                        <span>ຍັງຄ້າງ:</span>
                                        <span>{(courtPayment.remainingAmount)} ກິບ </span>
                                    </div>)
                            }
                        </div>

                        {/* Notes */}
                        {courtPayment.notes && (
                            <div className="text-sm italic text-gray-600 border-l-4 border-gray-300 pl-4">
                                ບັນທຶກ: {courtPayment.notes}
                            </div>
                        )}

                        <div className="text-center text-xs text-gray-500 mt-10 pt-6 border-t">
                            ຂອບໃຈທີ່ໃຊ້ບໍລິການ • Thank you for your business
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}