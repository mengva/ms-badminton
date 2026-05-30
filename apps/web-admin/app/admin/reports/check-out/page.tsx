"use client"

import { DataTable } from "../components/data-table";
import ReportHeader from "../components/ReportHeader";
import { columns } from "./components/columns";

export const demoCheckOuts = [
    {
        id: "0001",
        bookingId: "b1",
        customerName: "ນ. ມະນີວັນ ສີສຸລິຍາ",
        courtName: "ເດີ່ນ A1",
        checkoutTime: "2026-05-14 18:05",
        actualEndTime: "2026-05-14 18:10",
        extraHours: 0.17,
        extraCharge: 25000,
        staffName: "ອະນຸສອນ ສີສະຫວັດ",
    },
];

export default function CheckOutReportPage() {
    const handleExport = async () => {
        await new Promise(r => setTimeout(r, 800));
        alert("ສ່ງອອກລາຍງານແຈ້ງອອກສຳເລັດ!");
    };

    return (
        <div className="space-y-6">
            <ReportHeader
                title="ລາຍງານແຈ້ງອອກ"
                onExport={handleExport}
            />

            <DataTable
                columns={columns}
                data={demoCheckOuts}
                searchKey="customerName"
                placeholder="ຄົ້ນຫາຊື່ລູກຄ້າ..."
                titleSearch="ຄົ້ນຫາການແຈ້ງອອກ"
            />
        </div>
    );
}