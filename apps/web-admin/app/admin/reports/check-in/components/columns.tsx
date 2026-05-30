'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@workspace/ui/components/button";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

export type CheckIn = {
    id: string;
    bookingId: string;
    customerName: string;
    courtName: string;
    checkinTime: string;
    staffName: string;
    notes?: string;
};

export const columns: ColumnDef<CheckIn>[] = [
    {
        accessorKey: "id",
        header: "ລໍາດັບ",
    },
    { accessorKey: "bookingId", header: "ເລກການຈອງ" },
    { accessorKey: "customerName", header: "ລູກຄ້າ" },
    { accessorKey: "courtName", header: "ເດີ່ນ" },
    {
        accessorKey: "checkinTime",
        header: "ເວລາແຈ້ງເຂົ້າ",
        cell: ({ row }) => new Date(row.getValue("checkinTime")).toLocaleString("lo-LA"),
    },
    { accessorKey: "staffName", header: "ພະນັກງານ" },
    {
        accessorKey: "notes",
        header: "ໝາຍເຫດ",
        cell: ({ row }) => row.getValue("notes") || "-",
    },
    {
        id: "actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>ການດຳເນີນການ</DropdownMenuLabel>
                    <DropdownMenuItem>ເບິ່ງລາຍລະອຽດການຈອງ</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];