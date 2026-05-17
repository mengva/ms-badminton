"use client"

import React, { useEffect, useState } from 'react'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import { Edit, Eye, MoreHorizontal, RotateCw, Search, Trash2 } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { Badge } from '@workspace/ui/components/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { PaginationFilterDto } from '@/admin/packages/types';
import { trpc } from '@/app/trpc';
import { Spinner } from '@workspace/ui/components/spinner';
import { PaginationComponent } from '@/components/pagination';
import { statusOptions } from '@/utils/constants';
import LoadingBodyBodyItemInfoComponent from '@/components/loadingTableBodyItem';
import GlobalHelper from '@/admin/packages/utils/globalHelper';

export interface CourtTypeDto {
    id: string;
    courtName: string;
    location: string;
    isActive: boolean;
    status: "Available" | "Maintenance" | "Occupied";                    // e.g. "ACTIVE", "INACTIVE", "MAINTENANCE"
    createdAt: Date;
    updatedAt: Date;
    typeName: string;
    description: string;
    hourlyRate: number;
    ownerFullName: string;
    ownerRole: "Staff" | "Owner" | "Customer";
}

function CourtTypePage() {
    const [courtTypes, setCourtTypes] = useState<CourtTypeDto[]>([]);
    const [filter, setFilter] = useState({
        page: 1,
        limit: 20
    });
    const [paginationFilter, setPaginationFilter] = useState({
        total: 20,
        page: 1,
        totalPage: 1,
        limit: 20,
    } as PaginationFilterDto);

    const {
        data: response,
        isLoading,
        refetch,
        isRefetching,
    } = trpc.app.user.admin.master_data.courtType.list.useQuery(filter, {
        refetchOnWindowFocus: false,
        keepPreviousData: true, // smooth page transition
    });

    useEffect(() => {
        if (response) {
            const result = response?.data;
            const courtTypeInfos: CourtTypeDto[] = result?.data ?? []; // the array
            const pagination: PaginationFilterDto = result?.pagination; // pagination info
            setCourtTypes(courtTypeInfos);
            setPaginationFilter(pagination);
        }
    }, [response]);
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
                            <Button onClick={refetch} disabled={isRefetching} className="cursor-pointer">
                                {
                                    isRefetching ?
                                        <>
                                            <Spinner />
                                            ກຳລັງໂຫຼດຂໍ້ມູນຄືນໃໝ່
                                        </> :
                                        <>
                                            <RotateCw className={cn("mr-2 h-4 w-4")} />
                                            ໂຫຼດຂໍ້ມູນຄືນໃໝ່
                                        </>
                                }
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
                                {
                                    isLoading ?
                                        <TableRow>
                                            <TableCell colSpan={7}>
                                                <LoadingBodyBodyItemInfoComponent />
                                            </TableCell>
                                        </TableRow>
                                        : courtTypes.length ? courtTypes.map((court, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {(index + 1).toString().padStart(4, "0")}
                                                </TableCell>
                                                <TableCell>{court.typeName}</TableCell>
                                                <TableCell>
                                                    <Badge variant={"default"}>ເຄື່ອນໄຫວ</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        court.description
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={"secondary"}>
                                                        {court.hourlyRate}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>2
                                                    {GlobalHelper.formatDate(court.createdAt)}
                                                </TableCell>
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
                                        )) :
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center text-muted-foreground">
                                                    ບໍ່ພົບເຈົ້າຂອງເດິ່ນ
                                                </TableCell>
                                            </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </div>
                    {
                        courtTypes.length > 0 && paginationFilter.totalPage > 1 && <PaginationComponent data={courtTypes} filter={filter} setFilter={setFilter} pagination={paginationFilter} handleFetchData={refetch} />
                    }
                </CardContent>
            </Card>
        </div>
    )
}

export default CourtTypePage
