"use client"

import { Card, CardContent } from "@workspace/ui/components/card";
import { DataTable } from "../components/data-table";
import ReportHeader from "../components/ReportHeader";
import { columns } from "./components/columns";

// app/admin/reports/demo-data.ts
export const demoStaffs = [
    {
        id: "0001",
        fullName: "ທ. ອະນຸສອນ ສີສະຫວັດ",
        phoneNumber: "020 5555 1234",
        position: "ຜູ້ຈັດການເດີ່ນ",
        salary: 8500000,
        isActive: true,
        createdAt: "2025-01-15",
    },
    {
        id: "0002",
        fullName: "ນ. ສຸລິຍາ ບຸນມະນີ",
        phoneNumber: "020 9876 5432",
        position: "ເຈົ້າໜ້າທີ່ບັນຊີ",
        salary: 6500000,
        isActive: true,
        createdAt: "2025-02-01",
    },
    {
        id: "0003",
        fullName: "ທ. ວິລະພອນ ສຸກສະຫວັນ",
        phoneNumber: "020 1122 3344",
        position: "ພະນັກງານບໍລິການ",
        salary: 4500000,
        isActive: false,
        createdAt: "2024-12-10",
    },
];

export default function StaffReportPage() {
    const handleExport = () => {
        alert("ກຳລັງສ່ງອອກລາຍງານພະນັກງານເປັນ Excel...");
        // ສາມາດເພີ່ມ logic export จริงด้วย exceljs ຫຼື papaparse ຕໍ່ມາ
    };

    return (
        <div className="space-y-6">
            <ReportHeader
                title="ລາຍງານຂໍ້ມູນພະນັກງານ"
                onExport={handleExport}
            />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground">ພະນັກງານທັງໝົດ</p>
                    <p className="text-4xl font-bold mt-2">{demoStaffs.length}</p>
                </div>
                <div className="bg-card border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground">ກຳລັງເຮັດວຽກ</p>
                    <p className="text-4xl font-bold mt-2 text-green-600">
                        {demoStaffs.filter((s) => s.isActive).length}
                    </p>
                </div>
                <div className="bg-card border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground">ຢຸດເຮັດວຽກ</p>
                    <p className="text-4xl font-bold mt-2 text-red-600">
                        {demoStaffs.filter((s) => !s.isActive).length}
                    </p>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={demoStaffs}
                searchKey="fullName"
                placeholder="ຄົ້ນຫາຊື່ພະນັກງານ ຫຼື ເບີໂທ..."
                titleSearch="ຄົ້ນຫາຂໍ້ມູນພະນັກງານ"
            />
        </div>
    );
}