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
import { trpc } from '@/app/trpc';
import { PaginationFilterDto, ServerResponseDto, UserRoleDto } from '@/admin/packages/types';
import GlobalHelper from '@/admin/packages/utils/globalHelper';
import { Spinner } from '@workspace/ui/components/spinner';
import { PaginationComponent } from '@/components/pagination';
import LoadingBodyBodyItemInfoComponent from '@/components/loadingTableBodyItem';
import toast from 'react-hot-toast';
import { StatusOptionDto, statusOptions } from '@/utils/constants';
import { UserRoleContext } from '@/components/admin-layout';

interface UserDto {
    id: string;
    fullName: string;
    phoneNumber?: string;
    email?: string;
    role: "Staff" | "Owner" | "Customer";
    position: "Manager" | "Staff"
    isActive: boolean;
    salary: string;
    createdAt: Date;
    updatedAt: Date;
}

type StatusDto = "Active" | "InActive";

function StaffPage() {
    const useUserContext = useContext(UserRoleContext);
    const [openAddStaffDialog, setOpenAddStaffDialog] = React.useState(false);
    const [users, setUsers] = useState<UserDto[]>([]);
    const [userId, setUserId] = useState<string>("");
    // const [userRole, setUserRole] = useState("" as UserRoleDto);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [newStatus, setNewStatus] = useState<StatusDto>("Active");
    const [searchQuery, setSearchQuery] = useState("");
    const [statuses, setStatuses] = useState("Active" as StatusDto);
    const isOwner = useUserContext?.userRole === "Owner";
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
    } = trpc.app.user.admin.master_data.staff.list.useQuery(filter, {
        refetchOnWindowFocus: false,
        keepPreviousData: true, // smooth page transition
    });

    const searchQueryMutation = trpc.app.user.admin.master_data.staff.searchQuery.useMutation({
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

    const changeStatusMutation = trpc.app.user.admin.master_data.staff.updatedStaffStatus.useMutation({
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
            console.log(error.message);
            toast.error(error.message);
        }
    });

    const isLoadingChangeStatus = Boolean(changeStatusMutation.isLoading);

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
            useUserContext?.setUserRole(result?.userRole)
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
                    <h1 className="text-3xl! font-bold">ການຄຸ້ມຄອງຜູ້ໃຊ້</h1>
                    <p className="text-muted-foreground">ຈັດການຜູ້ໃຊ້ ແລະ ສະຖານະຕ່າງໆ</p>
                </div>
                <div>
                    <AddStaffDialogComponent setOpen={setOpenAddStaffDialog} open={openAddStaffDialog} refresh={refetch} />
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
                                value={searchQuery}
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

            {/* === Users Table === */}
            <Card>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ລໍາດັບ</TableHead>
                                    <TableHead>ຊື່ ເເລະ ນາມສະກູນ</TableHead>
                                    <TableHead>ຕຳແໜ່ງ</TableHead>
                                    <TableHead>ສະຖານະ</TableHead>
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
                                                <TableCell>{user.fullName}</TableCell>
                                                <TableCell>
                                                    <Badge variant={
                                                        user.position === "Manager" ? "default" : "info"
                                                    }>
                                                        {user.position === "Manager" ? "ຜູ້ຈັດການ" : "ພະນັກງານທົ່ວໄປ"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={
                                                        user.isActive === true ? "default" : "destructive"
                                                    }>
                                                        {user.isActive === true ? "ເຄື່ອນໄຫວ" : "ບໍ່ເຄື່ອນໄຫວ"}
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
                                                            {/* DETAIL */}
                                                            <DropdownMenuItem
                                                                className="text-blue-500 hover:text-blue-600! cursor-pointer"
                                                            >
                                                                <Eye className="mr-2 h-4 w-4 text-blue-600" />
                                                                ລາຍລະອຽດ
                                                            </DropdownMenuItem>

                                                            {/* EDIT */}
                                                            {
                                                                isOwner &&
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
                        <DialogTitle>ແກ້ໄຂສະຖານະພະນັກງານ</DialogTitle>
                        <DialogDescription>
                            ປ່ຽນສະຖານະຂອງພະນັກງານ
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <label className="text-sm font-medium mb-2 block">
                            ສະຖານະພະນັກງານ
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

        </div>
    )
}

export default StaffPage
