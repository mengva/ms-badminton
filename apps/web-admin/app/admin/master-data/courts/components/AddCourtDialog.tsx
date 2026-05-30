"use client";

import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { AlertCircle, Loader2, Upload, X } from 'lucide-react';
import { zodValidationAddCourtInfoAndImage, ZodValidationAddCourtInfoAndImage } from '@/admin/packages/validations/master-data';
import { FileDto, ServerResponseDto } from '@/admin/packages/types';
import { trpc } from '@/app/trpc';
import toast from 'react-hot-toast';

interface AddCourtDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refresh: () => void;
}

export function AddCourtDialog({ open, setOpen, refresh }: AddCourtDialogProps) {

    const inputFile = useRef<HTMLInputElement>(null);
    const [showConfirmClose, setShowConfirmClose] = useState(false);

    const courtTypes = [
        { id: "2", typeName: "Indoor Hard", hourlyRate: 150000 },
        { id: "3", typeName: "Outdoor Clay", hourlyRate: 120000 },
        { id: "4", typeName: "Grass Court", hourlyRate: 200000 },
        // ຕໍ່ມາເອົາຈາກ API ກໍໄດ້
    ];

    const form = useForm<ZodValidationAddCourtInfoAndImage>({
        resolver: zodResolver(zodValidationAddCourtInfoAndImage),
        defaultValues: {
            courtName: "",
            courtType: "",
            location: "",
            status: "Available",
            files: [],
        },
    });

    const formValueKeys = ["courtType", "courtName", "location"] as const;

    const hasUnsavedChanges = () => {
        return formValueKeys.some(key => {
            const value = form.getValues(key);
            return value;
        });
    };

    const confirmClose = () => {
        form.reset({
            courtName: "",
            courtType: "",
            location: "",
            status: "Available",
            files: [],
        })
        setShowConfirmClose(false);
        setOpen(false);
    };

    const handleClose = () => {
        const hasUnsaved = hasUnsavedChanges();
        if (hasUnsaved) {
            setShowConfirmClose(true);
        } else {
            confirmClose();
        }
    };

    const cancelClose = () => {
        setShowConfirmClose(false); // DO NOT reset form — keep editing
    };

    const removeImage = (index: number) => {
        const currentFiles = form.getValues("files").filter((_, i) => i !== index);
        form.setValue("files", currentFiles);
    };

    const getTypeListQuery = trpc.app.user.admin.master_data.courtType.getTypeList.useQuery();

    const createCourtAndImageMutation = trpc.app.user.admin.master_data.court.createNewCourtInfoAndImage.useMutation({
        onSuccess: (data: ServerResponseDto) => {
            if (data && data.success) {
                toast.success(data.message);
                confirmClose();
                refresh();
            }
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const createCourtMutation = trpc.app.user.admin.master_data.court.createNewCourtInfo.useMutation({
        onSuccess: (data: ServerResponseDto) => {
            if (data && data.success) {
                toast.success(data.message);
                confirmClose();
                refresh();
            }
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const isLoading = Boolean(createCourtAndImageMutation.isLoading || createCourtAndImageMutation.isLoading);

    function onSubmit(values: ZodValidationAddCourtInfoAndImage) {
        const {files, ...value} = values;

        if(files.length){
            createCourtAndImageMutation.mutate(values);
            return;
        }

        createCourtMutation.mutate(value);

    }

    return <>
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
            <DialogTrigger asChild>
                <Button variant={"default"} onClick={() => setOpen(true)} >+ ເພີ່ມເດິ່ນ</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[520px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">ເພີ່ມເດິ່ນໃໝ່</DialogTitle>
                    <DialogDescription>
                        ປ້ອນຂໍ້ມູນເດິ່ນໃໝ່ເພື່ອເພີ່ມເຂົ້າລະບົບ
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-4">

                            {/* ປະເພດເດິ່ນ */}

                            <FormField
                                control={form.control}
                                name="courtType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ປະເພດເດິ່ນ <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder="ເລືອກປະເພດເດິ່ນ" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {courtTypes.map((type) => (
                                                        <SelectItem key={type.id} value={type.typeName}>
                                                            {type.typeName} — {type.hourlyRate.toLocaleString()} ກີບ/ຊົ່ວໂມງ
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* ຊື່ເດິ່ນ */}
                            <FormField
                                control={form.control}
                                name="courtName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ຊື່ເດິ່ນ <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="ເດິ່ນ A1, VIP Court..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* ສະຖານທີ່ */}
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ສະຖານທີ່ <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="ບ້ານ..., ເມືອງ..., ນະຄອນຫຼວງວຽງຈັນ"
                                                rows={3}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* ສະຖານະ */}
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ສະຖານະເບື້ອງຕົ້ນ</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Available">ເຄື່ອນໄຫວ (Available)</SelectItem>
                                                    <SelectItem value="Maintenance">ບຳລຸງຮັກສາ (Maintenance)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* ອັບໂຫຼດຮູບ */}

                            <FormField
                                control={form.control}
                                name="files"
                                render={({ field: { onChange, value } }) => (
                                    <FormItem>
                                        <FormLabel>ອັບໂຫຼດຮູບພາບເດິ່ນ <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <div className="border-2 border-dashed relative border-gray-300 rounded-lg p-6 text-center hover:bg-gray-100 dark:hover:bg-slate-800/15">
                                                <Upload className="mx-auto h-10 w-10 text-gray-400" />
                                                <p className="mt-2 text-sm text-gray-600">ຄລິກເພື່ອເລືອກຮູບພາບ</p>
                                                <Input
                                                    ref={inputFile}
                                                    type="file"
                                                    accept="image/jpeg, image/png, image/jpg, image/webp"
                                                    multiple
                                                    className="hidden"
                                                    id="file-upload"
                                                    onChange={async (e) => {
                                                        const files = Array.from(e.target.files || []);
                                                        if (!files.length) return;
                                                        const converted = await Promise.all(
                                                            files.map((file) =>
                                                                new Promise<FileDto>(
                                                                    (resolve, reject) => {
                                                                        const reader = new FileReader();
                                                                        reader.onload = (e) =>
                                                                            resolve({
                                                                                fileData: e.target?.result as string, // base64
                                                                                fileName: file.name,
                                                                                fileType: file.type,
                                                                                size: file.size,
                                                                            });
                                                                        reader.onerror = reject;
                                                                        reader.readAsDataURL(file);
                                                                    }
                                                                )
                                                            )
                                                        );
                                                        onChange(converted);
                                                        form.trigger("files");
                                                    }}
                                                />
                                                <label
                                                    htmlFor="file-upload"
                                                    className="cursor-pointer mt-3 inline-block px-4 py-2 rounded-md text-sm"
                                                >
                                                    ເລືອກຮູບພາບ
                                                </label>
                                                {/* Preview Images */}
                                                {form.getValues("files").length > 0 && (
                                                    <div className='z-10'>
                                                        <p className="text-sm font-medium mb-2">ຮູບພາບທີ່ເລືອກ ({form.getValues("files").length})</p>
                                                        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
                                                            {form.getValues("files").map((file, index) => (
                                                                <div key={index} className="relative group">
                                                                    <img
                                                                        src={file.fileData}
                                                                        alt={`preview ${index}`}
                                                                        className="w-full h-28 object-cover rounded-md border"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeImage(index)}
                                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                                                    >
                                                                        <X size={16} />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                        {value?.length > 0 && (
                                            <p className="text-xs text-gray-600 mt-1">
                                                ເລືອກ {value.length} ຮູບ
                                            </p>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" disabled={isLoading} className='w-full'>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            ເພີ່ມເດິ່ນ
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

        {/* Confirmation Dialog when trying to close with unsaved changes */}
        <Dialog open={showConfirmClose} onOpenChange={setShowConfirmClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                        <div className='text-2xl font-bold'>ຍົກເລີກການປ່ຽນແປງບໍ?</div>
                    </DialogTitle>
                    <DialogDescription>
                        ທ່ານມີການປ່ຽນແປງທີ່ຍັງບໍ່ໄດ້ບັນທຶກໄວ້. ຖ້າທ່ານປິດກ່ອງໂຕ້ຕອບນີ້, ການປ່ຽນແປງຂອງທ່ານຈະສູນຫາຍໄປ.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                    <Button variant="secondary" onClick={cancelClose} className='cursor-pointer'>
                        ສີນຕໍ່ການດຳເນີນງານ
                    </Button>
                    <Button variant="destructive" onClick={confirmClose} className='cursor-pointer'>
                        ອອກຈາກແບບຟອມນີ້
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}