"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { Separator } from "@workspace/ui/components/separator";
import { Clock, User, Calendar, Save, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CloseCourtPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const bookingId = searchParams.get("bookingId");

    const [formData, setFormData] = useState({
        actualEndTime: "",
        extraHours: "",
        extraCharge: "",
        notes: "",
    });

    // Mock data (replace with API fetch later)
    const checkInInfo = {
        checkInId: "CI-20260513-8921",
        bookingId: bookingId || "BK-20260513-7842",
        customerName: "ທ. ສຸລິວົງ ສຸກສີ",
        customerPhone: "020 5555 1234",
        courtName: "ເດີ່ນ A-01 (5v5)",
        checkInTime: "18:45",
        scheduledEndTime: "20:00",
        hourlyRate: 150000,
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const calculateExtraCharge = () => {
        const extraH = parseFloat(formData.extraHours) || 0;
        return (extraH * checkInInfo.hourlyRate).toLocaleString();
    };

    const handleCheckOut = () => {
        if (!formData.actualEndTime) {
            toast.error("ກະລຸນາປ້ອນເວລາຈິງທີ່ສິ້ນສຸດ");
            return;
        }

        toast.success(`ແຈ້ງອອກສຳເລັດ! Booking ${checkInInfo.bookingId} ຖືກປິດເດີ່ນແລ້ວ`);

        // Redirect to print bill after success
        setTimeout(() => {
            router.push(`/admin/check-out/print-bill?bookingId=${checkInInfo.bookingId}`);
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    ກັບຄືນ
                </Button>
                <div>
                    <h2 className="text-3xl font-bold">ປິດເດີ່ນ / ແຈ້ງອອກ</h2>
                    <p className="text-muted-foreground">ບັນທຶກການໃຊ້ເດີ່ນສຳເລັດ</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left: Check-in Information */}
                <div className="lg:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>ຂໍ້ມູນການແຈ້ງເຂົ້າ</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Check-in ID</span>
                                <span className="font-mono font-medium">{checkInInfo.checkInId}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Booking ID</span>
                                <span className="font-mono">{checkInInfo.bookingId}</span>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">{checkInInfo.customerName}</p>
                                        <p className="text-sm text-muted-foreground">{checkInInfo.customerPhone}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">{checkInInfo.courtName}</p>
                                        <p className="text-sm text-muted-foreground">
                                            ແຈ້ງເຂົ້າ: {checkInInfo.checkInTime} ນ.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-muted p-4 rounded-lg">
                                <p className="text-sm text-muted-foreground">ເວລາຕາມກຳນົດ</p>
                                <p className="text-xl font-semibold">{checkInInfo.scheduledEndTime} ນ.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Check-out Form */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>ບັນທຶກການແຈ້ງອອກ</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <Label className="mb-2">ເວລາຈິງທີ່ສິ້ນສຸດ <span className="text-red-500">*</span></Label>
                                <Input
                                    type="datetime-local"
                                    value={formData.actualEndTime}
                                    onChange={(e) => handleInputChange("actualEndTime", e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="mb-2">ເວລາເພີ່ມ (ຊົ່ວໂມງ)</Label>
                                    <Input
                                        type="number"
                                        step="0.5"
                                        placeholder="0.0"
                                        value={formData.extraHours}
                                        onChange={(e) => handleInputChange("extraHours", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label className="mb-2">ຄ່າບໍລິການເພີ່ມ</Label>
                                    <Input
                                        value={calculateExtraCharge() + " ກີບ"}
                                        disabled
                                        className="bg-muted"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label className="mb-2">ບັນທຶກ / ຂໍ້ມູນເພີ່ມເຕີມ</Label>
                                <Textarea
                                    placeholder="ລູກຄ້າຂະຫຍາຍເວລາ 30 ນາທີ, ບໍ່ມີບັນຫາ..."
                                    value={formData.notes}
                                    onChange={(e) => handleInputChange("notes", e.target.value)}
                                    rows={4}
                                />
                            </div>

                            <Separator />

                            <Button
                                onClick={handleCheckOut}
                                size="lg"
                                className="w-full text-lg py-7"
                            >
                                <Save className="mr-2 h-5 w-5" />
                                ຢືນຢັນການແຈ້ງອອກ ແລະ ປິດເດີ່ນ
                            </Button>

                            <p className="text-center text-xs text-muted-foreground">
                                ຫຼັງຈາກກົດປຸ່ມນີ້ ລະບົບຈະປິດເດີ່ນໂອຕົ້ມ
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}