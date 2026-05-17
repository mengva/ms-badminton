import { ServerResponseDto } from '@/admin/packages/types';
import { ZodValidationAddNewStaff, zodValidationAddNewStaff } from '@/admin/packages/validations/master-data';
import { trpc } from '@/app/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@workspace/ui/components/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/form';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


interface AddStaffDialogDto {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const positionOptions = [
    { label: "ຜູ້ບໍລິຫານ", value: "Manager" },
    { label: "ພະນັກງານ", value: "Staff" },
];

const salaryOptions = [
    { label: "1000000 ກີບ/ເດືອນ", value: "1000000" },
    { label: "2000000 ກີບ/ເດືອນ", value: "2000000" },
    { label: "3000000 ກີບ/ເດືອນ", value: "3000000" },
    { label: "4000000 ກີບ/ເດືອນ", value: "4000000" },
    { label: "5000000 ກີບ/ເດືອນ", value: "5000000" },
];

function AddStaffDialogComponent({
    open, setOpen
}: AddStaffDialogDto) {

    const router = useRouter();

    const [showConfirmClose, setShowConfirmClose] = useState(false);
    const form = useForm<ZodValidationAddNewStaff>({
        resolver: zodResolver(zodValidationAddNewStaff),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            password: "",
            salary: "",
            position: "" as any,
        },
    });

    const formValueKeys = ["fullName", "email", "password", "phoneNumber"] as const;

    const hasUnsavedChanges = () => {
        return formValueKeys.some(key => {
            const value = form.getValues(key);
            return value;
        });
    };

    const confirmClose = () => {
        form.reset({
            fullName: "",
            email: "",
            phoneNumber: "",
            password: "",
            salary: "",
            position: "" as any,
        })
        setShowConfirmClose(false);
        setOpen(false);
    };

    const handleClose = () => {
        const hasUnsaved = hasUnsavedChanges();
        if (hasUnsaved) {
            setShowConfirmClose(true);
        } else {
            setOpen(false);
        }
    };

    const cancelClose = () => {
        setShowConfirmClose(false); // DO NOT reset form — keep editing
    };

    const addNewStaffMutation = trpc.app.user.admin.master_data.staff.addNewStaff.useMutation({
        onSuccess: (data: ServerResponseDto) => {
            toast.success(data.message);
            setOpen(false);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const onSubmit = (values: ZodValidationAddNewStaff) => {
        addNewStaffMutation.mutate(values);
    }

    return <>
        {/* === Add Staff Dialog === */}
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
            <DialogTrigger asChild>
                <div>
                    <Button type='button' variant="default" onClick={() => setOpen(true)} className="cursor-pointer">
                        + ເພີ່ມພະນັກງານ
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className='text-2xl font-bold'>ເພີ່ມພະນັກງານໃໝ່</DialogTitle>
                    <DialogDescription>
                        {
                            false ? 'ກະລຸນາຕື່ມຂໍ້ມູນຂ້າງລຸ່ມນີ້ເພື່ອແກ້ໄຂບັນຊີຜູ້ໃຊ້.' : 'ກະລຸນາຕື່ມຂໍ້ມູນຂ້າງລຸ່ມນີ້ເພື່ອເພີ່ມບັນຊີຜູ້ໃຊ້ໃໝ່.'
                        }
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ຊື່-ນາມສະກຸນ <span className="text-red-500">*</span></FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder="ຊື່-ນາມສະກຸນ"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ອີເມວ <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="you@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ເບີໂທລະສັບ <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="ເບີໂທລະສັບ"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ລະຫັດຜ່ານ <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="••••••"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div>
                            <Label htmlFor="salary" className='mb-2'>ເງິນເດືອນ</Label>
                            <Select
                                onValueChange={(value) => form.setValue("salary", value as any)}
                                defaultValue={form.getValues("salary")?.toString()}
                            >
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="ເລືອກເງິນເດືອນ" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        salaryOptions.map((salaryOption, index) => (
                                            <SelectItem key={index} value={salaryOption.value}>
                                                {salaryOption.label}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="position" className='mb-2'>ຕຳແໜ່ງ</Label>
                            <Select
                                onValueChange={(value) => form.setValue("position", value as any)}
                                defaultValue={form.getValues("position")?.toString()}
                            >
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="ເລືອກຕຳແໜ່ງ" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        positionOptions.map((positionOption, index) => (
                                            <SelectItem key={index} value={positionOption.value}>
                                                {positionOption.label}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Button type="submit" className="w-full cursor-pointer" variant="default">
                                {
                                    addNewStaffMutation.isPending ? "ກຳລັງເຮັດວຽກຢູ່..." : "ເພີ່ມພະນັກງານ"
                                }
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >

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

export default AddStaffDialogComponent;

