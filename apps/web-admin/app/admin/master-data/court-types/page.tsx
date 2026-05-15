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
import { Button } from "@workspace/ui/components/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@workspace/ui/components/table";
import { Edit, Eye, MoreHorizontal, RotateCw, Search, Trash2 } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { Badge } from '@workspace/ui/components/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';

function CourtTypePage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl! font-bold">ການຄຸ້ມຄອງປະເພດເດິ່ນ</h1>
                    <p className="text-muted-foreground">ຈັດການປະເພດເດິ່ນ ແລະ ສະຖານະຕ່າງໆ</p>
                </div>
                <div>
                    <Button type='button' variant="default" className="cursor-pointer">
                        + ເພີ່ມປະເພດເດິ່ນ
                    </Button>
                </div>
            </div>

            {/* === Filters Card === */}
            <Card>
                <CardHeader>
                    <CardTitle>ຕົວກອງ</CardTitle>
                    <CardDescription>ປັບປຸງລາຍຊື່ເດິ່ນຂອງທ່ານ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        {/* Search */}
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-2 top-2 size-4 text-muted-foreground" />

                            <Input
                                placeholder="ຄົ້ນຫາປະເພດເດິ່ນ..."
                                className="pl-10"
                            />
                        </div>
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

            {/* === Court Types Table === */}
            <Card>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ລະຫັດ</TableHead>
                                    <TableHead>ຊື່ປະເພດ</TableHead>
                                    <TableHead>ສະຖານະ</TableHead>
                                    <TableHead>ລາຍລະອຽດ</TableHead>
                                    <TableHead>ອັດຕາຕໍ່ຊົ່ວໂມງ</TableHead>
                                    <TableHead>ວັນທີສ້າງ</TableHead>
                                    <TableHead className='flex justify-end items-center'>ຕົວເລືອກຕ່າງໆ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[1, 2, 3, 4, 5].map((court) => (
                                    <TableRow key={court}>
                                        <TableCell>{court}</TableCell>
                                        <TableCell>ປະເພດເດິ່ນ {court}</TableCell>
                                        <TableCell>
                                            <Badge variant={"default"}>ເຄື່ອນໄຫວ</Badge>
                                        </TableCell>
                                        <TableCell>
                                            ລາຍລະອຽດເດິ່ນ {court}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={"secondary"}>50000ກີບ/ຊົ່ວໂມງ</Badge>
                                        </TableCell>
                                        <TableCell>2026/12/31</TableCell>
                                        <TableCell className='flex justify-end'>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    {/* DELETE */}
                                                    <DropdownMenuItem
                                                        className="text-red-500 hover:text-red-600! cursor-pointer"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                                                        ລຶບ
                                                    </DropdownMenuItem>

                                                    {/* EDIT */}
                                                    <DropdownMenuItem
                                                        className="text-green-500 hover:text-green-600! cursor-pointer"
                                                    >
                                                        <Edit className="mr-2 h-4 w-4 text-green-500" />
                                                        ແກ້ໄຂ
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-sky-500 hover:text-sky-600! cursor-pointer"
                                                    >
                                                        <Eye className="mr-2 h-4 w-4 text-sky-500" />
                                                        ລາຍລະອຽດ
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

export default CourtTypePage
