'use client';

import { ColumnDef } from "@tanstack/react-table";

export type CheckOut = {
    id: string;
    bookingId: string;
    customerName: string;
    courtName: string;
    checkoutTime: string;
    actualEndTime: string;
    extraHours?: number;
    extraCharge?: number;
    staffName: string;
};

export const columns: ColumnDef<CheckOut>[] = [
    { accessorKey: "bookingId", header: "ເລກການຈອງ" },
    { accessorKey: "customerName", header: "ລູກຄ້າ" },
    { accessorKey: "courtName", header: "ເດີ່ນ" },
    {
        accessorKey: "checkoutTime",
        header: "ເວລາແຈ້ງອອກ",
    },
    {
        accessorKey: "extraHours",
        header: "ເວລາເພີ່ມ",
        cell: ({ row }) => row.original.extraHours ? `${row.original.extraHours} ຊມ.` : "-",
    },
    {
        accessorKey: "extraCharge",
        header: "ຄ່າປັບໄຫວ",
        cell: ({ row }) => {
            const charge = row.original.extraCharge || 0;
            return charge > 0 ? (
                <span className="text-red-600">+{charge.toLocaleString()} ກີບ</span>
            ) : "-";
        },
    },
    { accessorKey: "staffName", header: "ພະນັກງານ" },
];