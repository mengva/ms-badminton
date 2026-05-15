"use client"

import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import { Button } from "@workspace/ui/components/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@workspace/ui/components/table";
import { Edit, Eye, MoreHorizontal, RotateCw, Search } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { Badge } from '@workspace/ui/components/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import AddStaffDialogComponent from './components/addStaffDialog';

const statusOptions = [
    { label: "ເຄື່ອນໄຫວ", value: "active" },
    { label: "ບໍ່ເຄື່ອນໄຫວ", value: "inActive" }
]

function StaffPage() {
    const [openAddStaffDialog, setOpenAddStaffDialog] = React.useState(false);
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl! font-bold">ການຄຸ້ມຄອງຜູ້ໃຊ້</h1>
                    <p className="text-muted-foreground">ຈັດການຜູ້ໃຊ້ ແລະ ສະຖານະຕ່າງໆ</p>
                </div>
                <div>
                    <AddStaffDialogComponent setOpen={setOpenAddStaffDialog} open={openAddStaffDialog} />
                </div>
            </div>

            {/* === Filters Card === */}
            <Card>
                <CardHeader>
                    <CardTitle>ຕົວກອງ</CardTitle>
                    <CardDescription>ປັບປຸງລາຍຊື່ຜູ້ໃຊ້ຂອງທ່ານ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        {/* Search */}
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-2 top-2 size-4 text-muted-foreground" />

                            <Input
                                placeholder="ຄົ້ນຫາພະນັກງານ..."
                                className="pl-10"
                            />
                        </div>

                        <Select>
                            <SelectTrigger className='w-full sm:w-40'>
                                <SelectValue placeholder="ສະຖານະ" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    statusOptions.map((positionOption, index) => (
                                        <SelectItem key={index} value={positionOption.value}>
                                            {positionOption.label}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <Button className="cursor-pointer">
                                <RotateCw className={cn("mr-2 h-4 w-4")} />
                                ໂຫຼດຂໍ້ມູນຄືນໃໝ່
                            </Button>
                        </div>
                    </div>

                </CardContent>
            </Card>

            {/* === Users Table === */}
            <Card>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ລະຫັດ</TableHead>
                                    <TableHead>ຊື່ ເເລະ ນາມສະກູນ</TableHead>
                                    <TableHead>ຕຳແໜ່ງ</TableHead>
                                    <TableHead>ສະຖານະ</TableHead>
                                    <TableHead>ເບີໂທລະສັບ</TableHead>
                                    <TableHead>ວັນທີສ້າງ</TableHead>
                                    <TableHead className='flex justify-end items-center'>ຕົວເລືອກຕ່າງໆ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[1, 2, 3, 4, 5].map((user) => (
                                    <TableRow key={user}>
                                        <TableCell>{user}</TableCell>
                                        <TableCell>ເຊົ້າ</TableCell>
                                        <TableCell>
                                            <Badge variant={"default"}>ພະນັກງານ</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={"default"}>ເຄື່ອນໄຫວ</Badge>
                                        </TableCell>
                                        <TableCell>089-123-4567</TableCell>
                                        <TableCell>2026/12/31</TableCell>
                                        <TableCell className='flex justify-end'>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    {/* DETAIL */}
                                                    <DropdownMenuItem
                                                        className="text-blue-500 hover:text-blue-600! cursor-pointer"
                                                    >
                                                        <Eye className="mr-2 h-4 w-4 text-blue-600" />
                                                        ລາຍລະອຽດ
                                                    </DropdownMenuItem>

                                                    {/* EDIT */}
                                                    <DropdownMenuItem
                                                        className="text-green-500 hover:text-green-600! cursor-pointer"
                                                    >
                                                        <Edit className="mr-2 h-4 w-4 text-green-500" />
                                                        ແກ້ໄຂສະຖານະ
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default StaffPage
