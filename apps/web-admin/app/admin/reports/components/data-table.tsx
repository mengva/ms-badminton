'use client';

import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    SortingState,
    ColumnFiltersState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@workspace/ui/components/table";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    RotateCw,
    Search,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { statusOptions } from "@/utils";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey?: string;
    placeholder?: string;
    titleSearch: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    placeholder = "ຊອກຫາ...",
    titleSearch
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = React.useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: "includesString",
        state: {
            sorting,
            columnFilters,
            globalFilter,
        },
    });

    console.log(table.getHeaderGroups())

    return (
        <div className="space-y-4">
            {/* Search Input */}
            {
                searchKey && (
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="mb-2">{titleSearch}</CardTitle>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative w-full sm:w-80">
                                    <Search className="absolute left-2 top-2 size-4 text-muted-foreground" />
                                    <Input placeholder={placeholder}
                                        className="pl-10"
                                        value={globalFilter ?? ""}
                                        onChange={(event) => setGlobalFilter(event.target.value)}
                                    />
                                </div>
                                {/* <Select>
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
                                </Select> */}
                                {/* Actions */}
                                <Button className="cursor-pointer">
                                    <RotateCw className={cn("mr-2 h-4 w-4")} />
                                    ໂຫຼດຂໍ້ມູນຄືນໃໝ່
                                </Button>
                            </div>
                        </CardHeader>
                    </Card>
                )
            }

            {/* Table */}
            <Card>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            ບໍ່ພົບຂໍ້ມູນ
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}