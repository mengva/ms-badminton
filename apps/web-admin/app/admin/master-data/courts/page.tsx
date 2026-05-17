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

import { Edit, Eye, MoreHorizontal, RotateCw, Search, Trash2 } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { Badge } from '@workspace/ui/components/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { AddCourtDialog } from './components/AddCourtDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Spinner } from '@workspace/ui/components/spinner';
import { PaginationFilterDto } from '@/admin/packages/types';
import { trpc } from '@/app/trpc';
import { PaginationComponent } from '@/components/pagination';
import { statusOptions } from '@/utils/constants';
import LoadingBodyBodyItemInfoComponent from '@/components/loadingTableBodyItem';
import GlobalHelper from '@/admin/packages/utils/globalHelper';

// types/dto/court.dto.ts

export interface CourtDto {
    id: string;
    courtName: string;
    location: string;
    isActive: boolean;
    status: "Available" | "Maintenance" | "Occupied";           // e.g. "ACTIVE", "MAINTENANCE", etc.
    createdAt: Date;
    updatedAt: Date;
    typeName: string;
    description: string;
    hourlyRate: number;
    ownerFullName: string;
    ownerRole: "Staff" | "Owner" | "Customer";
}

function CourtPage() {
    const [openAddCourtDialog, setOpenAddCourtDialog] = React.useState(false);
    const [courts, setCourts] = useState<CourtDto[]>([]);
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
    } = trpc.app.user.admin.master_data.court.list.useQuery(filter, {
        refetchOnWindowFocus: false,
        keepPreviousData: true, // smooth page transition
    });

    useEffect(() => {
        if (response) {
            const result = response?.data;
            const courtInfos: CourtDto[] = result?.data ?? []; // the array
            const pagination: PaginationFilterDto = result?.pagination; // pagination info
            setCourts(courtInfos);
            setPaginationFilter(pagination);
        }
    }, [response]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl! font-bold">ການຄຸ້ມຄອງເດິ່ນ</h1>
                    <p className="text-muted-foreground">ຈັດການເດິ່ນ ແລະ ສະຖານະຕ່າງໆ</p>
                </div>
                <div>
                    <AddCourtDialog
                        open={openAddCourtDialog}
                        setOpen={setOpenAddCourtDialog}
                        onSuccess={() => {

                        }}>
                    </AddCourtDialog>
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
                                placeholder="ຄົ້ນຫາເດິ່ນ..."
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

            {/* === Courts Table === */}
            <Card>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ລະຫັດ</TableHead>
                                    <TableHead>ຊື່ເຈົ້າຂອງເດິ່ນ</TableHead>
                                    <TableHead>ຊື່ເດິ່ນ</TableHead>
                                    <TableHead>ສະຖານທີ່</TableHead>
                                    <TableHead>ສະຖານະ</TableHead>
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
                                        : courts.length ? courts.map((court, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {(index + 1).toString().padStart(4, "0")}
                                                </TableCell>
                                                <TableCell>{court.ownerFullName}</TableCell>
                                                <TableCell>
                                                    <Badge variant={"default"}>{court.courtName}</Badge>
                                                </TableCell>
                                                <TableCell>{court.location}</TableCell>
                                                <TableCell>
                                                    <Badge variant={"default"}>{court.status}</Badge>
                                                </TableCell>
                                                <TableCell>{GlobalHelper.formatDate(court.createdAt)}</TableCell>
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
                                                            {/* VIEW DETAILS */}
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
                                        )) : <TableRow>
                                            <TableCell colSpan={7} className="text-center text-muted-foreground">
                                                ບໍ່ພົບເດິ່ນ
                                            </TableCell>
                                        </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </div>
                    {
                        courts.length > 0 && paginationFilter.totalPage > 1 && <PaginationComponent data={courts} filter={filter} setFilter={setFilter} pagination={paginationFilter} handleFetchData={refetch} />
                    }
                </CardContent>
            </Card>
        </div>
    )
}

export default CourtPage
