"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Separator } from "@workspace/ui/components/separator";
import { Printer, Download, ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import ImageLoGo from "../../../../public/images/MS.badmintion_logo1.png"

export default function PrintBillPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const bookingId = searchParams.get("bookingId");

    // Mock data - Replace with real API data later
    const billData = {
        billId: "INV-20260513-7842",
        bookingId: bookingId || "BK-20260513-7842",
        checkInId: "CI-20260513-8921",
        customerName: "ທ. ສຸລິວົງ ສຸກສີ",
        customerPhone: "020 5555 1234",
        courtName: "ເດີ່ນ A-01 (5v5)",
        date: "13 ພຶດສະພາ 2026",
        checkInTime: "18:45",
        actualEndTime: "20:30",
        scheduledDuration: "1 ຊົ່ວໂມງ",
        actualDuration: "1 ຊົ່ວໂມງ 45 ນາທີ",
        hourlyRate: 150000,
        baseAmount: 150000,
        extraHours: 0.75,
        extraCharge: 112500,
        totalAmount: 262500,
        paidAmount: 150000, // Deposit or previous payment
        remainingAmount: 112500,
        staffName: "ທ້າວ ອານຸສອນ",
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-6 print:hidden">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    ກັບຄືນ
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" />
                        ພິມໃບບິນ
                    </Button>
                    <Button onClick={() => alert("ກຳລັງດາວໂຫຼດ PDF...")}>
                        <Download className="mr-2 h-4 w-4" />
                        ດາວໂຫຼດ PDF
                    </Button>
                </div>
            </div>

            {/* Bill / Invoice */}
            <Card className="shadow-2xl border-2 print:shadow-none print:border" id="bill">
                <CardHeader className="text-center border-b pb-6">
                    <div className="flex justify-center">
                        <Image src={ImageLoGo} width={100} height={100} alt="logo"/>
                    </div>
                    <div className="text-2xl font-bold mb-1">ໃບບິນ / ໃບຮັບເງິນ</div>
                    <p className="text-muted-foreground">Invoice / Receipt</p>

                    <Badge variant="outline" className="mt-4 text-base px-6 py-1.5">
                        {billData.billId}
                    </Badge>
                </CardHeader>

                <CardContent className="p-8 space-y-8">
                    {/* Customer Info */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-muted-foreground">ຊື່ລູກຄ້າ</p>
                            <p className="font-semibold text-lg">{billData.customerName}</p>
                            <p>{billData.customerPhone}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">ວັນທີ</p>
                            <p className="font-medium">{billData.date}</p>
                        </div>
                    </div>

                    <Separator />

                    {/* Court Usage Details */}
                    <div>
                        <h3 className="font-semibold mb-4">ລາຍລະອຽດການໃຊ້ເດີ່ນ</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ເດີ່ນ</span>
                                <span className="font-medium">{billData.courtName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ແຈ້ງເຂົ້າ</span>
                                <span>{billData.checkInTime} ນ.</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ສິ້ນສຸດຈິງ</span>
                                <span className="font-medium text-red-600">{billData.actualEndTime} ນ.</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ເວລາຈິງ</span>
                                <span>{billData.actualDuration}</span>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Pricing Breakdown */}
                    <div className="space-y-4">
                        <div className="flex justify-between text-lg">
                            <span>ຄ່າເດີ່ນຕາມກຳນົດ ({billData.scheduledDuration})</span>
                            <span>{billData.baseAmount.toLocaleString()} ກີບ</span>
                        </div>

                        {billData.extraHours > 0 && (
                            <div className="flex justify-between text-lg text-orange-600">
                                <span>ຄ່າເວລາເພີ່ມ ({billData.extraHours} ຊົ່ວໂມງ)</span>
                                <span>{billData.extraCharge.toLocaleString()} ກີບ</span>
                            </div>
                        )}

                        <Separator />

                        <div className="flex justify-between text-2xl font-bold pt-2">
                            <span>ລວມທັງໝົດ</span>
                            <span>{billData.totalAmount.toLocaleString()} ກີບ</span>
                        </div>

                        <div className="flex justify-between text-lg">
                            <span className="text-muted-foreground">ຈ່າຍມາແລ້ວ</span>
                            <span>{billData.paidAmount.toLocaleString()} ກີບ</span>
                        </div>

                        <div className="flex justify-between text-xl font-semibold text-green-600 bg-green-50 p-4 rounded-lg">
                            <span>ຍັງຕ້ອງຈ່າຍ</span>
                            <span>{billData.remainingAmount.toLocaleString()} ກີບ</span>
                        </div>
                    </div>

                    <Separator />

                    {/* Footer */}
                    <div className="text-center text-sm text-muted-foreground space-y-2">
                        <p>ພະນັກງານ: {billData.staffName}</p>
                        <p>ຂອບໃຈທີ່ໃຊ້ບໍລິການ • ຍິນດີຕ້ອນຮັບຄັ້ງຕໍ່ໄປ</p>
                        <p className="text-xs mt-4">ໃບບິນນີ້ເປັນຫຼັກຖານທາງການ</p>
                    </div>
                </CardContent>
            </Card>

            {/* Print Note */}
            <div className="text-center mt-6 text-xs text-muted-foreground print:hidden">
                ກົດ <span className="font-medium">Ctrl + P</span> ເພື່ອພິມໃບບິນ
            </div>
        </div>
    );
}