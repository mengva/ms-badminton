"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Separator } from "@workspace/ui/components/separator";
import { Printer, Download, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageLoGo from "../../../../public/images/MS.badmintion_logo1.png"

export default function CheckInConfirmationPage() {
    const router = useRouter();

    // Example data (you will get this from API/props later)
    const checkInData = {
        checkInId: "CI-20260513-8921",
        bookingId: "BK-20260513-7842",
        customerName: "ທ. ສຸລິວົງ ສຸກສີ",
        customerPhone: "020 5555 1234",
        courtName: "ເດີ່ນ A-01 (5v5)",
        date: "13 ພຶດສະພາ 2026",
        time: "19:00 - 20:00",
        checkInTime: "18:45",
        staffName: "ທ້າວ ອານຸສອນ",
        notes: "ລູກຄ້າມາຮອດກັບທີມ 8 ຄົນ, ຈ່າຍຄ່າມັດຈຳເຕັມຈຳນວນ",
        depositAmount: 70000,
        totalAmount: 150000,
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    ກັບຄືນ
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" />
                        ພິມ
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        ດາວໂຫຼດ PDF
                    </Button>
                </div>
            </div>

            {/* Receipt Card */}
            <Card className="shadow-xl border-2" id="receipt">
                <CardHeader className="text-center border-b pb-6">
                    <div className="flex justify-center">
                        <Image src={ImageLoGo} width={100} height={100} alt="logo"/>
                    </div>
                    {/* <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        ✅
                    </div> */}
                    <CardTitle className="text-3xl font-bold text-green-600">
                        ໃບຢືນຢັນການແຈ້ງເຂົ້າ
                    </CardTitle>
                    <p className="text-muted-foreground mt-1">Check-in Receipt</p>
                    <Badge variant="outline" className="mt-3 text-lg px-6 py-1">
                        {checkInData.checkInId}
                    </Badge>
                </CardHeader>

                <CardContent className="p-8 space-y-6">
                    {/* Customer Info */}
                    <div>
                        <h3 className="font-semibold mb-3 text-lg">ຂໍ້ມູນລູກຄ້າ</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-muted-foreground">ຊື່ລູກຄ້າ</p>
                                <p className="font-medium">{checkInData.customerName}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">ເບີໂທ</p>
                                <p>{checkInData.customerPhone}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Booking Details */}
                    <div>
                        <h3 className="font-semibold mb-3 text-lg">ຂໍ້ມູນການຈອງ</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ເດີ່ນ</span>
                                <span className="font-medium">{checkInData.courtName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ວັນທີ</span>
                                <span>{checkInData.date}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ເວລາ</span>
                                <span>{checkInData.time}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ແຈ້ງເຂົ້າເວລາ</span>
                                <span className="font-medium text-green-600">{checkInData.checkInTime} ນ.</span>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Payment & Notes */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold text-red-500">ຈ່າຍເເລ້ວ</span>
                            <span className="text-2xl font-bold text-red-500">
                                {checkInData.depositAmount.toLocaleString()} ກີບ
                            </span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold text-green-600">ຍັງເຫຼືອ</span>
                            <span className="text-2xl font-bold text-green-600">
                                {checkInData.totalAmount - checkInData.depositAmount} ກີບ
                            </span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">ຄ່າເດີ່ນທັງໝົດ</span>
                            <span className="text-2xl font-bold">
                                {checkInData.totalAmount.toLocaleString()} ກີບ
                            </span>
                        </div>
                        {checkInData.notes && (
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">ບັນທຶກ</p>
                                <p className="text-sm bg-muted p-4 rounded-lg">{checkInData.notes}</p>
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* Footer */}
                    <div className="text-center text-sm text-muted-foreground pt-4">
                        <p>ພະນັກງານ: {checkInData.staffName}</p>
                        <p className="mt-1">ຂອບໃຈທີ່ໃຊ້ບໍລິການ • ຂໍໃຫ້ມີຄວາມສຸກກັບການຫຼິ້ນ</p>
                        <p className="mt-4 text-xs">ໃບຢືນຢັນນີ້ເປັນຫຼັກຖານທາງການ</p>
                    </div>
                </CardContent>
            </Card>

            {/* Print Instructions */}
            <div className="text-center mt-6 text-sm text-muted-foreground">
                ກົດ <span className="font-medium">Ctrl + P</span> ເພື່ອພິມ ຫຼື ໃຊ້ປຸ່ມຂ້າງເທິງ
            </div>
        </div>
    );
}