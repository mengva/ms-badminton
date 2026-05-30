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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog";

import { Edit, Eye, MoreHorizontal, RotateCw, Search, Trash2 } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { Badge } from '@workspace/ui/components/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { AddCourtDialog } from './components/AddCourtDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Spinner } from '@workspace/ui/components/spinner';
import { PaginationFilterDto, ServerResponseDto } from '@/admin/packages/types';
import { trpc } from '@/app/trpc';
import { PaginationComponent } from '@/components/pagination';
import { StatusOptionDto, statusOptions } from '@/utils/constants';
import LoadingBodyBodyItemInfoComponent from '@/components/loadingTableBodyItem';
import GlobalHelper from '@/admin/packages/utils/globalHelper';
import toast from 'react-hot-toast';

// types/dto/court.dto.ts

export interface CourtDto {
    id: string;
    courtName: string;
    location: string;
    isActive: boolean;
    status: "Available" | "Maintenance" | "Occupied" | "Booked";           // e.g. "ACTIVE", "MAINTENANCE", etc.
    createdAt: Date;
    updatedAt: Date;
    typeName: string;
    description: string;
    hourlyRate: number;
    ownerFullName: string;
    ownerRole: "Staff" | "Owner" | "Customer";
}

// ==================== DEMO DATA ====================
export const demoCourts: CourtDto[] = [
    {
        id: "C001",
        courtName: "ເດີ່ນ A",
        location: "ຊັ້ນ 1, ສະໜາມ MS.Badminton",
        isActive: true,
        status: "Available",
        createdAt: new Date("2025-12-01"),
        updatedAt: new Date("2026-05-22"),
        typeName: "Badminton",
        description: "ສະໜາມມາດຕະຖານ, ພື້ນຢາງ, ແສງໄຟ LED",
        hourlyRate: 35,
        ownerFullName: "ທ່ານ ສົມສັກ ວົງສະຫວັນ",
        ownerRole: "Owner",
    },
    {
        id: "C002",
        courtName: "ເດີ່ນ B",
        location: "ຊັ້ນ 1, ສະໜາມ MS.Badminton",
        isActive: true,
        status: "Occupied",
        createdAt: new Date("2025-12-01"),
        updatedAt: new Date("2026-05-22"),
        typeName: "Badminton",
        description: "ສະໜາມ VIP, ມີພື້ນ PU ຄຸນນະພາບສູງ",
        hourlyRate: 45,
        ownerFullName: "ທ່ານ ສົມສັກ ວົງສະຫວັນ",
        ownerRole: "Owner",
    },
    {
        id: "C003",
        courtName: "ເດີ່ນ C",
        location: "ຊັ້ນ 2, ສະໜາມ MS.Badminton",
        isActive: true,
        status: "Booked",           // ຖ້າເຈົ້າເພີ່ມ Booked ແລ້ວ
        createdAt: new Date("2025-12-05"),
        updatedAt: new Date("2026-05-21"),
        typeName: "Badminton",
        description: "ສະໜາມປົກກະຕິ",
        hourlyRate: 30,
        ownerFullName: "ທ່ານ ສົມສັກ ວົງສະຫວັນ",
        ownerRole: "Staff",
    },
    {
        id: "C004",
        courtName: "ເດີ່ນ D",
        location: "ຊັ້ນ 2, ສະໜາມ MS.Badminton",
        isActive: true,
        status: "Maintenance",
        createdAt: new Date("2025-12-10"),
        updatedAt: new Date("2026-05-22"),
        typeName: "Badminton",
        description: "ກຳລັງບຳລຸງຮັກສາພື້ນແລະເສົາ",
        hourlyRate: 35,
        ownerFullName: "ທ່ານ ສົມສັກ ວົງສະຫວັນ",
        ownerRole: "Staff",
    },
];

type StatusDto = "Active" | "InActive";

function CourtPage() {
    const [openAddCourtDialog, setOpenAddCourtDialog] = React.useState(false);
    const [courts, setCourts] = useState<CourtDto[]>(demoCourts);
    const [searchQuery, setSearchQuery] = useState("");
    const [statuses, setStatuses] = useState("Active" as StatusDto);
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

    const searchQueryMutation = trpc.app.user.admin.master_data.court.searchQuery.useMutation({
        onSuccess: (data: ServerResponseDto) => {
            if (data && data.success) {
                const result = data?.data;
                const searchQueryPagination = result?.pagination;
                const searchQueryData = result?.data;
                if (searchQueryData && searchQueryPagination) {
                    setCourts([...searchQueryData]);
                    setPaginationFilter(searchQueryPagination);
                }
            }
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const handleSearchQuery = () => {
        searchQueryMutation.mutate({
            ...filter,
            query: searchQuery.trim() ?? "",
            isActive: statuses
        })
    }

    // useEffect(() => {
    //     if (response) {
    //         const result = response?.data;
    //         const courtInfos: CourtDto[] = result?.data ?? []; // the array
    //         const pagination: PaginationFilterDto = result?.pagination; // pagination info
    //         setCourts(courtInfos);
    //         setPaginationFilter(pagination);
    //     }
    // }, [response]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl! font-bold">ການຄຸ້ມຄອງເດິ່ນ</h1>
                    <p className="text-muted-foreground">ຈັດການເດິ່ນ ແລະ ສະຖານະຕ່າງໆ</p>
                </div>
                <AddCourtDialog open={openAddCourtDialog} setOpen={setOpenAddCourtDialog} refresh={refetch}/>
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
                                onChange={e => setSearchQuery(e.target.value.trim())}
                                onInput={e => {
                                    const value = (e.target as HTMLInputElement).value.toLowerCase()
                                    if (!value) {
                                        refetch();
                                        return;
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSearchQuery();
                                }}
                            />
                        </div>

                        <Select value={statuses} onValueChange={(s: StatusOptionDto['value']) => {
                            setStatuses(s);
                            searchQueryMutation.mutate({
                                ...filter,
                                query: searchQuery.trim() ?? "",
                                isActive: s
                            });
                        }}>
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
                            <Button onClick={() => {
                                refetch();
                                setSearchQuery("");
                                setStatuses("Active");
                            }} disabled={isRefetching} className="cursor-pointer">
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
                                    <TableHead>ລໍາດັບ</TableHead>
                                    <TableHead>ຊື່ເຈົ້າຂອງເດິ່ນ</TableHead>
                                    <TableHead>ຊື່ເດິ່ນ</TableHead>
                                    <TableHead>ສະຖານທີ່</TableHead>
                                    <TableHead>ສະຖານະ</TableHead>
                                    <TableHead>ວັນທີສ້າງ</TableHead>
                                    <TableHead className='flex justify-end items-center'>ຈັດການ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    (isLoading || isRefetching) ?
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
                                                    <Badge variant={
                                                        court.status === "Available" ? "default" : court.status === "Booked" ? "warning" : court.status === "Occupied" ? "info" : "destructive"
                                                    }>{court.status}
                                                    </Badge>
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
                                                ບໍ່ມີຂໍ້ມູນ
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
