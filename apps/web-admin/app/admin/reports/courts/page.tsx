"use client"

import { DataTable } from "../components/data-table";
import ReportHeader from "../components/ReportHeader";
import { columns } from "./components/columns";

export const demoCourts = [
    {
        id: "0001",
        courtName: "ເດີ່ນ A1",
        typeName: "Futsal",
        hourlyRate: 150000,
        status: "Available",
        location: "ບ້ານ ສີມູງ, ວຽງຈັນ",
        ownerName: "ບໍລິສັດ ສະຫວັນເດີ່ນ",
    },
    {
        id: "0002",
        courtName: "ເດີ່ນ B2",
        typeName: "Basketball",
        hourlyRate: 120000,
        status: "Occupied",
        location: "ບ້ານ ສີມູງ, ວຽງຈັນ",
        ownerName: "ບໍລິສັດ ສະຫວັນເດີ່ນ",
    },
    {
        id: "0003",
        courtName: "ເດີ່ນ C3",
        typeName: "Badminton",
        hourlyRate: 80000,
        status: "Maintenance",
        location: "ບ້ານ ວັດຕະການ",
        ownerName: "ບໍລິສັດ ສະຫວັນເດີ່ນ",
    },
];

export default function CourtReportPage() {
    const handleExport = () => {
        alert("ກຳລັງສ່ງອອກລາຍງານເດີ່ນເປັນ Excel...");
    };

    // Summary Statistics
    const totalCourts = demoCourts.length;
    const available = demoCourts.filter(c => c.status === "Available").length;
    const occupied = demoCourts.filter(c => c.status === "Occupied").length;
    const maintenance = demoCourts.filter(c => c.status === "Maintenance").length;

    return (
        <div className="space-y-6">
            <ReportHeader
                title="ລາຍງານຂໍ້ມູນເດີ່ນ"
                onExport={handleExport}
            />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground">ເດີ່ນທັງໝົດ</p>
                    <p className="text-4xl font-bold mt-2">{totalCourts}</p>
                </div>
                <div className="bg-card border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground text-green-600">ຫວ່າງ</p>
                    <p className="text-4xl font-bold mt-2 text-green-600">{available}</p>
                </div>
                <div className="bg-card border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground text-red-600">ກຳລັງໃຊ້</p>
                    <p className="text-4xl font-bold mt-2 text-red-600">{occupied}</p>
                </div>
                <div className="bg-card border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground">ບຳລຸງຮັກສາ</p>
                    <p className="text-4xl font-bold mt-2">{maintenance}</p>
                </div>
            </div>

            {/* Main Table */}
            <DataTable
                columns={columns}
                data={demoCourts}
                searchKey="courtName"
                placeholder="ຄົ້ນຫາຊື່ເດີ່ນ ຫຼື ປະເພດ..."
                titleSearch="ຄົ້ນຫາຂໍ້ມູນເດີ່ນ"
            />
        </div>
    );
}