"use client"

import { DataTable } from "../components/data-table";
import ReportHeader from "../components/ReportHeader";
import { columns } from "./components/columns";

export const demoCheckIns = [
    {
        id: "ci1",
        bookingId: "b1",
        customerName: "ນ. ມະນີວັນ ສີສຸລິຍາ",
        courtName: "ເດີ່ນ A1",
        checkinTime: "2026-05-14 15:55",
        staffName: "ອະນຸສອນ ສີສະຫວັດ",
        notes: "ມາຕາມເວລາ",
    },
    {
        id: "ci2",
        bookingId: "b2",
        customerName: "ທ. ສົມສັກ ບຸນບັງ",
        courtName: "ເດີ່ນ B2",
        checkinTime: "2026-05-15 08:50",
        staffName: "ສຸລິຍາ ບຸນມະນີ",
        notes: "",
    },
];

export default function CheckInReportPage() {
    const handleExport = async () => {
        await new Promise(r => setTimeout(r, 800));
        alert("ສ່ງອອກລາຍງານແຈ້ງເຂົ້າສຳເລັດ!");
    };

    return (
        <div className="space-y-6">
            <ReportHeader
                title="ລາຍງານແຈ້ງເຂົ້າ"
                onExport={handleExport}
            />

            <DataTable
                columns={columns}
                data={demoCheckIns}
                searchKey="customerName"
                placeholder="ຄົ້ນຫາຊື່ລູກຄ້າ..."
                titleSearch="ຄົ້ນຫາການແຈ້ງເຂົ້າ"
            />
        </div>
    );
}