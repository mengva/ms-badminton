'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

export type Booking = {
    id: string;
    bookingDate: string;
    customerName: string;
    courtName: string;
    startTime: string;
    endTime: string;
    totalHours: number;
    totalAmount: number;
    status: "Pending" | "Confirmed" | "Cancelled" | "CheckedIn" | "Completed";
    staffName: string;
};

export const columns: ColumnDef<Booking>[] = [
    {
        accessorKey: "id",
        header: "ລໍາດັບ",
    },
    {
        accessorKey: "bookingDate",
        header: "ວັນທີຈອງ",
        cell: ({ row }) => {
            const date = new Date(row.getValue("bookingDate"));
            return date.toLocaleDateString("lo-LA");
        },
    },
    {
        accessorKey: "customerName",
        header: "ລູກຄ້າ",
    },
    {
        accessorKey: "courtName",
        header: "ເດີ່ນ",
    },
    {
        accessorKey: "startTime",
        header: "ເວລາ",
        cell: ({ row }) => {
            const start = row.getValue("startTime");
            const end = row.original.endTime;
            return `${start} - ${end}`;
        },
    },
    {
        accessorKey: "totalHours",
        header: "ຈຳນວນຊົ່ວໂມງ",
        cell: ({ row }) => `${row.getValue("totalHours")} ຊົ່ວໂມງ`,
    },
    {
        accessorKey: "totalAmount",
        header: "ຈຳນວນເງິນ",
        cell: ({ row }) => {
            const amount = Number(row.getValue("totalAmount"));
            return (
                <div className="font-medium text-right">
                    {amount.toLocaleString()} ກີບ
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "ສະຖານະ",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;

            const statusConfig: Record<string, { label: string; variant: string }> = {
                Pending: { label: "ລໍຖ້າ", variant: "secondary" },
                Confirmed: { label: "ຢືນຢັນ", variant: "default" },
                Cancelled: { label: "ຍົກເລີກ", variant: "destructive" },
                CheckedIn: { label: "ແຈ້ງເຂົ້າ", variant: "default" },
                Completed: { label: "ສຳເລັດ", variant: "default" },
            };

            const config = statusConfig[status] || { label: status, variant: "secondary" };

            return <Badge variant={config.variant as any}>{config.label}</Badge>;
        },
    },
    {
        accessorKey: "staffName",
        header: "ພະນັກງານຈັດການ",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>ການດຳເນີນການ</DropdownMenuLabel>
                        <DropdownMenuItem>ເບິ່ງລາຍລະອຽດ</DropdownMenuItem>
                        <DropdownMenuItem>ພິມໃບບິນ</DropdownMenuItem>
                        <DropdownMenuItem>ແກ້ໄຂການຈອງ</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">ຍົກເລີກການຈອງ</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];