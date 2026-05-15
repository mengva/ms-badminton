"use client"

import { DataTable } from "../components/data-table";
import ReportHeader from "../components/ReportHeader";
import { columns } from "./components/columns";

export const demoBookings = [
    {
        id: "b1",
        bookingDate: "2026-05-14",
        customerName: "ນ. ມະນີວັນ ສີສຸລິຍາ",
        courtName: "ເດີ່ນ A1",
        startTime: "16:00",
        endTime: "18:00",
        totalHours: 2,
        totalAmount: 300000,
        status: "Confirmed",
        staffName: "ອະນຸສອນ ສີສະຫວັດ",
    },
    {
        id: "b2",
        bookingDate: "2026-05-15",
        customerName: "ທ. ສົມສັກ ບຸນບັງ",
        courtName: "ເດີ່ນ B2",
        startTime: "09:00",
        endTime: "11:00",
        totalHours: 2,
        totalAmount: 240000,
        status: "CheckedIn",
        staffName: "ສຸລິຍາ ບຸນມະນີ",
    },
];

export default function BookingReportPage() {
    const handleExport = async () => {
        // Simulate export
        await new Promise(resolve => setTimeout(resolve, 1200));
        alert("ສ່ງອອກລາຍງານການຈອງເດີ່ນເປັນ Excel ສຳເລັດ!");
    };

    // Summary Statistics
    const totalBookings = demoBookings.length;
    const confirmed = demoBookings.filter(b => b.status === "Confirmed").length;
    const checkedIn = demoBookings.filter(b => b.status === "CheckedIn").length;
    const completed = demoBookings.filter(b => b.status === "Completed").length;
    const cancelled = demoBookings.filter(b => b.status === "Cancelled").length;

    const totalRevenue = demoBookings.reduce((sum, b) => sum + b.totalAmount, 0);

    return (
        <div className="space-y-6">
            <ReportHeader
                title="ລາຍງານການຈອງເດີ່ນ"
                onExport={handleExport}
            />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="bg-card border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground">ການຈອງທັງໝົດ</p>
                    <p className="text-4xl font-bold mt-2">{totalBookings}</p>
                </div>

                <div className="bg-card border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground">ຢືນຢັນ</p>
                    <p className="text-4xl font-bold mt-2 text-blue-600">{confirmed}</p>
                </div>

                <div className="bg-card border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground">ແຈ້ງເຂົ້າ</p>
                    <p className="text-4xl font-bold mt-2 text-green-600">{checkedIn}</p>
                </div>

                <div className="bg-card border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground">ສຳເລັດ</p>
                    <p className="text-4xl font-bold mt-2">{completed}</p>
                </div>

                <div className="bg-card border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground text-red-600">ຍົກເລີກ</p>
                    <p className="text-4xl font-bold mt-2 text-red-600">{cancelled}</p>
                </div>

                <div className="bg-card border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground">ລາຍຮັບທັງໝົດ</p>
                    <p className="text-4xl font-bold mt-2 text-green-600">
                        {totalRevenue.toLocaleString()} ກີບ
                    </p>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={demoBookings}
                searchKey="customerName"
                placeholder="ຄົ້ນຫາຊື່ລູກຄ້າ ຫຼື ເດີ່ນ..."
                titleSearch="ຄົ້ນຫາການຈອງເດີ່ນ"
            />
        </div>
    );
}