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

export type Staff = {
    id: string;
    fullName: string;
    phoneNumber: string;
    position: string;
    salary: number;
    isActive: boolean;
    createdAt: string;
};

export const columns: ColumnDef<Staff>[] = [
    {
        accessorKey: "id",
        header: "ລໍາດັບ",
    },
    {
        accessorKey: "fullName",
        header: "ຊື່ເຕັມ",
    },
    {
        accessorKey: "phoneNumber",
        header: "ເບີໂທລະສັບ",
    },
    {
        accessorKey: "position",
        header: "ຕຳແໜ່ງ",
    },
    {
        accessorKey: "salary",
        header: "ເງິນເດືອນ",
        cell: ({ row }) => {
            const salary = Number(row.getValue("salary"));
            return (
                <div className="font-medium">
                    {salary.toLocaleString()} ກີບ
                </div>
            );
        },
    },
    {
        accessorKey: "isActive",
        header: "ສະຖານະ",
        cell: ({ row }) => {
            const isActive = row.getValue("isActive") as boolean;
            return (
                <Badge variant={isActive ? "default" : "destructive"}>
                    {isActive ? "ເຮັດວຽກ" : "ຢຸດເຮັດວຽກ"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "ວັນທີສະໝັກ",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"));
            return date.toLocaleDateString("lo-LA");
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const staff = row.original;
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
                        <DropdownMenuItem>ແກ້ໄຂຂໍ້ມູນ</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            ປິດການນຳໃຊ້
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];