"use client"

import React, { useContext, useEffect, useState } from 'react'
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

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog";

import { Edit, MoreHorizontal, RotateCw, Search } from 'lucide-react';
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
import { UserRoleContext } from '@/components/admin-layout';

interface UserDto {
    id: string;
    fullName: string | null;
    email: string;
    phoneNumber: string | null;
    role: "Staff" | "Owner" | "Customer";                    // e.g. "CUSTOMER", "OWNER", "STAFF"
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    membershipType: "Regular" | "Member" | "VIP";
    dateOfBirth: Date | null;
    address: string | null;
}

type StatusDto = "Active" | "InActive";

function CustomerPage() {
    const useUserContext = useContext(UserRoleContext);
    const [users, setUsers] = useState<UserDto[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [statuses, setStatuses] = useState("Active" as StatusDto);
    const [newStatus, setNewStatus] = useState<StatusDto>("Active");
    const [userId, setUserId] = useState<string>("");
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
    } = trpc.app.user.admin.master_data.customer.list.useQuery(filter, {
        refetchOnWindowFocus: false,
        keepPreviousData: true, // smooth page transition
    });

    const changeStatusMutation = trpc.app.user.admin.master_data.customer.updatedCustomerStatus.useMutation({
        onSuccess: (data: ServerResponseDto) => {
            if (data && data.success) {
                if (newStatus === "InActive" && statuses === "Active") {
                    setUsers(prevUsers => {
                        return prevUsers.filter(user => user.id !== userId);
                    });
                } else if (newStatus === "Active" && statuses === "InActive") {
                    setUsers(prevUsers => {
                        return prevUsers.filter(user => user.id !== userId);
                    });
                }
                setUserId("");
                setIsEditDialogOpen(false);
                toast.success(data.message);
            }
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const isLoadingChangeStatus = Boolean(changeStatusMutation.isLoading);

    const searchQueryMutation = trpc.app.user.admin.master_data.customer.searchQuery.useMutation({
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

    const handleSaveStatus = async () => {
        if (newStatus && userId) {
            changeStatusMutation.mutate({
                status: newStatus,
                staffId: userId
            });
        }
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
    return <>

        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl! font-bold">ການຄຸ້ມຄອງລູກຄ້າ</h1>
                    <p className="text-muted-foreground">ຈັດການລູກຄ້າ ແລະ ສະຖານະຕ່າງໆ</p>
                </div>
            </div>

            {/* === Filters Card === */}
            <Card>
                <CardHeader>
                    <CardTitle>ຕົວກອງ</CardTitle>
                    <CardDescription>ປັບປຸງລາຍຊື່ລູກຄ້າຂອງທ່ານ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        {/* Search */}
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-2 top-2 size-4 text-muted-foreground" />

                            <Input
                                placeholder="ຄົ້ນຫາລູກຄ້າ..."
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

            {/* === Customers Table === */}
            <Card>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ລໍາດັບ</TableHead>
                                    <TableHead>ຊື່ ເເລະ ນາມສະກູນ</TableHead>
                                    {/* <TableHead>ວັນເດືອນປີເກີດ</TableHead> */}
                                    <TableHead>ສະຖານະ</TableHead>
                                    <TableHead>ປະເພດສະມາຊິກ</TableHead>
                                    <TableHead>ເບີໂທລະສັບ</TableHead>
                                    <TableHead>ວັນທີສ້າງ</TableHead>
                                    <TableHead className='flex justify-end items-center'>ຈັດການ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    (isLoading || isRefetching) ?
                                        <TableRow>
                                            <TableCell colSpan={8}>
                                                <LoadingBodyBodyItemInfoComponent />
                                            </TableCell>
                                        </TableRow>
                                        : users.length ? users.map((user, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{(index + 1).toString().padStart(4, "0")}</TableCell>
                                                <TableCell>{user.fullName}</TableCell>
                                                {/* <TableCell>{user.dateOfBirth ? GlobalHelper.formatDate(user.dateOfBirth) : ''}</TableCell> */}
                                                <TableCell>
                                                    <Badge variant={
                                                        user.isActive === true ? "default" : "destructive"
                                                    }>
                                                        {user.isActive === true ? "ເຄື່ອນໄຫວ" : "ບໍ່ເຄື່ອນໄຫວ"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={
                                                        user.membershipType === "VIP" ? "default" : user.membershipType === "Member" ? "info" : "secondary"
                                                    }>
                                                        {user.membershipType}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {user.phoneNumber}
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        GlobalHelper.formatDate(user.createdAt

                                                        )}
                                                </TableCell>
                                                <TableCell className='flex justify-end'>
                                                    <Button variant="secondary" onClick={() => {
                                                        setIsEditDialogOpen(true);
                                                        setUserId(user.id);
                                                    }}>
                                                        <Edit className="h-4 w-4" />
                                                        {/* ແກ້ໄຂສະຖານະ */}
                                                    </Button>
                                                    {/* <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>

                                                        <DropdownMenuContent align="end">
                                                            {
                                                                useUserContext?.userRole === "Owner" &&
                                                                <DropdownMenuItem onClick={() => {
                                                                    setIsEditDialogOpen(true);
                                                                    setUserId(user.id);
                                                                }}
                                                                    className="text-green-500 hover:text-green-600! cursor-pointer"
                                                                >
                                                                    <Edit className="mr-2 h-4 w-4 text-green-500" />
                                                                    ແກ້ໄຂສະຖານະ
                                                                </DropdownMenuItem>
                                                            }
                                                        </DropdownMenuContent>
                                                    </DropdownMenu> */}
                                                </TableCell>
                                            </TableRow>
                                        )) : <TableRow>
                                            <TableCell colSpan={8} className="text-center text-muted-foreground">
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

        {/* ==================== EDIT STATUS DIALOG ==================== */}
        <Dialog open={isEditDialogOpen} onOpenChange={value => {
            if (!value) {
                setUserId("");
                setStatuses("Active");
            }
            setIsEditDialogOpen(value);
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>ແກ້ໄຂສະຖານະລູກຄ້າ</DialogTitle>
                    <DialogDescription>
                        ປ່ຽນສະຖານະຂອງລູກຄ້າ
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <label className="text-sm font-medium mb-2 block">
                        ສະຖານະລູກຄ້າ
                    </label>
                    <Select value={newStatus} onValueChange={(value: StatusDto) => setNewStatus(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Active">ເຄື່ອນໄຫວ</SelectItem>
                            <SelectItem value="InActive">ບໍ່ເຄື່ອນໄຫວ</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => {
                        setIsEditDialogOpen(false);
                        setUserId("");
                        setStatuses("Active");
                    }}>
                        ຍົກເລີກ
                    </Button>
                    <Button disabled={isLoadingChangeStatus} onClick={handleSaveStatus}>
                        {
                            isLoadingChangeStatus ? "ກຳລັງເຮັດວຽກຢູ່..." : "ບັນທຶກການປ່ຽນແປງ"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}

export default CustomerPage
