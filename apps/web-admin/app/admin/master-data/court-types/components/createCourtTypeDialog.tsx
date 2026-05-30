"use client";

import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@workspace/ui/components/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { zodValidationAddCourtTypeInfo, ZodValidationAddCourtTypeInfo } from '@/admin/packages/validations/master-data';

// ປ່ຽນ schema ໃຫ້ເໝາະກັບ Court Type

interface AddCourtTypeDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refresh: () => void;
}

export function AddCourtTypeDialog({ open, setOpen, refresh }: AddCourtTypeDialogProps) {

    const form = useForm<ZodValidationAddCourtTypeInfo>({
        resolver: zodResolver(zodValidationAddCourtTypeInfo),
        mode: "onChange",
        defaultValues: {
            typeName: "",
            description: "",
            hourlyRate: "",
        },
    });

    const courtTypes = [
        { id: "2", typeName: "Indoor Hard", hourlyRate: "150000" },
        { id: "3", typeName: "Outdoor Clay", hourlyRate: "120000" },
        { id: "4", typeName: "Grass Court", hourlyRate: "200000" },
        // ຕໍ່ມາເອົາຈາກ API ກໍໄດ້
    ];

    const onSubmit = async (data: ZodValidationAddCourtTypeInfo) => {
        console.log("✅ Court Type Data:", data);

    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"default"} onClick={() => setOpen(true)}>
                    + ເພີ່ມປະເພດເດິ່ນ
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">ເພີ່ມປະເພດເດິ່ນໃໝ່</DialogTitle>
                    <DialogDescription>
                        ປ້ອນຂໍ້ມູນປະເພດເດິ່ນໃໝ່ເພື່ອເພີ່ມເຂົ້າລະບົບ
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-4">

                            {/* ຊື່ປະເພດເດິ່ນ */}
                            <FormField
                                control={form.control}
                                name="typeName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ຊື່ປະເພດເດິ່ນ <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder="ເລືອກປະເພດເດິ່ນ" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {courtTypes.map((type) => (
                                                        <SelectItem key={type.id} value={type.typeName}>
                                                            {type.typeName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* <FormField
                                control={form.control}
                                name="typeName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ຊື່ປະເພດເດິ່ນ <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="ເດິ່ນບານກະບຸ້ງໃນຫ້ອງ, Futsal Court..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> */}

                            {/* ລາຄາໃຊ້ບໍລິການ (Hourly Rate) */}
                            <FormField
                                control={form.control}
                                name="hourlyRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ລາຄາຕໍ່ຊົ່ວໂມງ (ກີບ) <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="25000"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* ຄຳອະທິບາຍ */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ຄຳອະທິບາຍ</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="ອະທິບາຍລາຍລະອຽດຂອງປະເພດເດິ່ນນີ້..."
                                                rows={4}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setOpen(false);
                                    form.reset();
                                }}
                            >
                                ຍົກເລີກ
                            </Button>
                            <Button type="submit">
                                ເພີ່ມປະເພດເດິ່ນ
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}