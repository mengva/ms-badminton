'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@workspace/ui/components/badge";

export type Payment = {
    id: string;
    bookingId: string;
    customerName: string;
    amount: number;
    paymentType: string;
    paymentMethod: string;
    paymentStatus: string;
    paymentDate: string;
    referenceNumber?: string;
};

export const columns: ColumnDef<Payment>[] = [
    { accessorKey: "bookingId", header: "ເລກການຈອງ" },
    { accessorKey: "customerName", header: "ລູກຄ້າ" },
    {
        accessorKey: "amount",
        header: "ຈຳນວນເງິນ",
        cell: ({ row }) => (
            <div className="font-semibold">
                {Number(row.getValue("amount")).toLocaleString()} ກີບ
            </div>
        ),
    },
    { accessorKey: "paymentType", header: "ປະເພດການຊຳລະ" },
    {
        accessorKey: "paymentMethod",
        header: "ວິທີຊຳລະ",
    },
    {
        accessorKey: "paymentStatus",
        header: "ສະຖານະ",
        cell: ({ row }) => {
            const status = row.getValue("paymentStatus") as string;
            return (
                <Badge variant={status === "Paid" ? "default" : "destructive"}>
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "paymentDate",
        header: "ວັນທີຊຳລະ",
    },
    { accessorKey: "referenceNumber", header: "ເລກອ້າງອິງ" },
];