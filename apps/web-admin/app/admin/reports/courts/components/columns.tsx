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

export type Court = {
    id: string;
    courtName: string;
    typeName: string;
    hourlyRate: number;
    status: "Available" | "Occupied" | "Maintenance";
    location: string;
    ownerName: string;
};

export const columns: ColumnDef<Court>[] = [
    {
        accessorKey: "id",
        header: "ລໍາດັບ",
    },
    {
        accessorKey: "courtName",
        header: "ຊື່ເດີ່ນ",
    },
    {
        accessorKey: "typeName",
        header: "ປະເພດ",
    },
    {
        accessorKey: "hourlyRate",
        header: "ລາຄາຕໍ່ຊົ່ວໂມງ",
        cell: ({ row }) => {
            const rate = Number(row.getValue("hourlyRate"));
            return (
                <div className="font-medium">
                    {rate.toLocaleString()} ກີບ
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "ສະຖານະ",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;

            let variant = "default";
            let label = status;

            if (status === "Available") {
                variant = "default";
                label = "ຫວ່າງ";
            } else if (status === "Occupied") {
                variant = "info";
                label = "ກຳລັງໃຊ້";
            } else if (status === "Maintenance") {
                variant = "destructive";
                label = "ບຳລຸງຮັກສາ";
            }

            return <Badge variant={variant as any}>{label}</Badge>;
        },
    },
    {
        accessorKey: "location",
        header: "ສະຖານທີ່",
    },
    {
        accessorKey: "ownerName",
        header: "ເຈົ້າຂອງ",
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
                        <DropdownMenuItem>ແກ້ໄຂເດີ່ນ</DropdownMenuItem>
                        <DropdownMenuItem>ເບິ່ງປະຫວັດການຈອງ</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];