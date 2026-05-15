"use client";

import React, { useState } from 'react';
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
import { Label } from "@workspace/ui/components/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea";
import { Loader2 } from 'lucide-react';

interface AddCourtDialogProps {
    onSuccess?: () => void;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddCourtDialog({ onSuccess, open, setOpen }: AddCourtDialogProps) {
    const [isLoading, setIsLoading] = useState(false);

    // ຖ້າມີ court types ຈາກ API
    const courtTypes = [
        { id: "1", typeName: "Indoor Hard", hourlyRate: 150000 },
        { id: "2", typeName: "Outdoor Clay", hourlyRate: 120000 },
        { id: "3", typeName: "Grass Court", hourlyRate: 200000 },
        // ... ດຶງມາຈາກ API ຕົວຈິງ
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // TODO: ເອີ້ນ API ສ້າງເດິ່ນ
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

        setIsLoading(false);
        setOpen(false);
        onSuccess?.();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type='button' variant="default" className="cursor-pointer">
                    + ເພີ່ມເດິ່ນ
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className='text-2xl font-bold'>ເພີ່ມເດິ່ນໃໝ່</DialogTitle>
                    <DialogDescription>
                        ປ້ອນຂໍ້ມູນເດິ່ນໃໝ່ເພື່ອເພີ່ມເຂົ້າລະບົບ
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4">

                        {/* Court Type */}
                        <div className="space-y-2">
                            <Label htmlFor="typeId">ປະເພດເດິ່ນ <span className="text-red-500">*</span></Label>
                            <Select required>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="ເລືອກປະເພດເດິ່ນ" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courtTypes.map((type) => (
                                        <SelectItem key={type.id} value={type.id}>
                                            {type.typeName} — {type.hourlyRate.toLocaleString()} ກີບ/ຊົ່ວໂມງ
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Court Name */}
                        <div className="space-y-2">
                            <Label htmlFor="courtName">ຊື່ເດິ່ນ <span className="text-red-500">*</span></Label>
                            <Input
                                id="courtName"
                                placeholder="ເດິ່ນ A1, Court 01, VIP Court..."
                                required
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <Label htmlFor="location">ສະຖານທີ່ <span className="text-red-500">*</span></Label>
                            <Textarea
                                id="location"
                                placeholder="000 ABC Street, ບ້ານ..., ເມືອງ..., ນະຄອນຫຼວງວຽງຈັນ"
                                rows={3}
                            />
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <Label htmlFor="status">ສະຖານະເບື້ອງຕົ້ນ</Label>
                            <Select defaultValue="Available">
                                <SelectTrigger className='w-full'>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Available">ເຄື່ອນໄຫວ (Available)</SelectItem>
                                    <SelectItem value="Maintenance">ບຳລຸງຮັກສາ (Maintenance)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isLoading}
                        >
                            ຍົກເລີກ
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            ເພີ່ມເດິ່ນ
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}