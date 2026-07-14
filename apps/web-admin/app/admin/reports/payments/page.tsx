"use client"

import { DataTable } from "../components/data-table";
import ReportHeader from "../components/ReportHeader";
import { columns } from "./components/columns";

export const demoPayments = [
    {
        id: "0001",
        bookingId: "b1",
        customerName: "ນ. ມະນີວັນ ສີສຸລິຍາ",
        amount: 300000,
        paymentType: "Full",
        paymentMethod: "QR Code",
        paymentStatus: "Paid",
        paymentDate: "2026-05-14 10:30",
        staffName: "ນ. ສີສຸລິຍາ",
        referenceNumber: "PAY-20260514001",
    },
    {
        id: "0002",
        bookingId: "b2",
        customerName: "ທ. ສົມສັກ ບຸນບັງ",
        amount: 120000,
        paymentType: "Deposit",
        paymentMethod: "Cash",
        paymentStatus: "Paid",
        paymentDate: "2026-05-15 08:30",
        staffName: "ນ. ສີສຸລິຍາ",
        referenceNumber: "PAY-20260515001",
    },
];

export default function PaymentReportPage() {
    const totalAmount = demoPayments.reduce((sum, p) => sum + p.amount, 0);

    const handleExport = async () => {
        await new Promise(r => setTimeout(r, 1000));
        alert("ສ່ງອອກລາຍງານການຊຳລະເງິນສຳເລັດ!");
    };

    return (
        <div className="space-y-6">
            <ReportHeader
                title="ລາຍງານການຊຳລະເງິນ"
                onExport={handleExport}
            />

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground">ຈຳນວນການຊຳລະທັງໝົດ</p>
                    <p className="text-4xl font-bold mt-2">{demoPayments.length}</p>
                </div>
                <div className="bg-card border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground">ລາຍຮັບທັງໝົດ</p>
                    <p className="text-4xl font-bold mt-2 text-green-600">
                        {totalAmount.toLocaleString()} ກີບ
                    </p>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={demoPayments}
                searchKey="customerName"
                placeholder="ຄົ້ນຫາາຊື່ລູກຄ້າ ຫຼື ເລກການຈອງ..."
                titleSearch="ຄົ້ນຫາການຊຳລະ"
            />
        </div>
    );
}