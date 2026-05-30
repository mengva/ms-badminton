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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import { Edit, MoreHorizontal, RotateCw, Search, Trash2 } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { Badge } from '@workspace/ui/components/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { PaginationFilterDto, ServerResponseDto } from '@/admin/packages/types';
import { trpc } from '@/app/trpc';
import { Spinner } from '@workspace/ui/components/spinner';
import LoadingBodyBodyItemInfoComponent from '@/components/loadingTableBodyItem';
import GlobalHelper from '@/admin/packages/utils/globalHelper';
import { PaginationComponent } from '@/components/pagination';
import { StatusOptionDto, statusOptions } from '@/utils/constants';
import toast from 'react-hot-toast';
import CreateCourtOwnerDialogComponent from './components/CreateCourtOwnerDialogComponent';

export interface UserDto {
    id: string;
    fullName: string | null;
    email: string;
    phoneNumber: string | null;
    role: "Staff" | "Owner" | "Customer";
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    companyName: string | null;
    address: string | null;
}

type StatusDto = "Active" | "InActive";

function CourtOwnerPage() {
    const [openCreateCourtOwnerDialog, setOpenCreateCourtOwnerDialog] = React.useState(false);
    const [users, setUsers] = useState<UserDto[]>([]);
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
    } = trpc.app.user.admin.master_data.owner.list.useQuery(filter, {
        refetchOnWindowFocus: false,
        keepPreviousData: true, // smooth page transition
    });

    const searchQueryMutation = trpc.app.user.admin.master_data.courtType.searchQuery.useMutation({
        onSuccess: (data: ServerResponseDto) => {
            if (data && data.success) {
                const result = data?.data;
                const searchQueryPagination = result?.pagination;
                const searchQueryData = result?.data;
                if (searchQueryData && searchQueryPagination) {
                    setUsers([...searchQueryData]);
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

    useEffect(() => {
        if (response) {
            const result = response?.data;
            const userInfos: UserDto[] = result?.data ?? []; // the array
            const pagination: PaginationFilterDto = result?.pagination; // pagination info
            setUsers(userInfos);
            setPaginationFilter(pagination);
        }
    }, [response]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl! font-bold">ການຄຸ້ມຄອງເຈົ້າຂອງເດິ່ນ</h1>
                    <p className="text-muted-foreground">ຈັດການເຈົ້າຂອງເດິ່ນ ແລະ ສະຖານະຕ່າງໆ</p>
                </div>
                <div>
                    <CreateCourtOwnerDialogComponent setOpen={setOpenCreateCourtOwnerDialog} open={openCreateCourtOwnerDialog} />
                </div>
            </div>

            {/* === Filters Card === */}
            <Card>
                <CardHeader>
                    <CardTitle>ຕົວກອງ</CardTitle>
                    <CardDescription>ປັບປຸງລາຍຊື່ເຈົ້າຂອງເດິ່ນຂອງທ່ານ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        {/* Search */}
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-2 top-2 size-4 text-muted-foreground" />

                            <Input
                                placeholder="ຄົ້ນຫາເຈົ້າຂອງເດິ່ນ..."
                                className="pl-10"
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

            {/* === Court Owners Table === */}
            <Card>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ລໍາດັບ</TableHead>
                                    <TableHead>ຊື່ ເເລະ ນາມສະກູນ</TableHead>
                                    <TableHead>ສະຖານະ</TableHead>
                                    <TableHead>ບົດບາດ</TableHead>
                                    <TableHead>ເບີໂທລະສັບ</TableHead>
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
                                        : users.length ? users.map((user, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {(index + 1).toString().padStart(4, "0")}
                                                </TableCell>
                                                <TableCell>
                                                    {user.fullName}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={
                                                        user.isActive === true ? "default" : "destructive"
                                                    }>
                                                        {user.isActive === true ? "ເຄື່ອນໄຫວ" : "ບໍ່ເຄື່ອນໄຫວ"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={"default"}>
                                                        {user.role === "Owner" && "ເຈົ້າຂອງເດິ່ນ"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{user.phoneNumber}</TableCell>
                                                <TableCell>{GlobalHelper.formatDate(user.createdAt)}</TableCell>
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
                                                                className="text-green-500 hover:text-green-600! cursor-pointer"
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4 text-green-600" />
                                                                ລາຍລະອຽດ
                                                            </DropdownMenuItem>

                                                            {/* EDIT */}
                                                            <DropdownMenuItem
                                                                className="text-sky-500 hover:text-sky-600! cursor-pointer"
                                                            >
                                                                <Edit className="mr-2 h-4 w-4 text-sky-500" />
                                                                ແກ້ໄຂ
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
                        users.length > 0 && paginationFilter.totalPage > 1 && <PaginationComponent data={users} filter={filter} setFilter={setFilter} pagination={paginationFilter} handleFetchData={refetch} />
                    }
                </CardContent>
            </Card>
        </div>
    )
}

export default CourtOwnerPage
