import { ZodValidationCreateCourtOwner, zodValidationCreateCourtOwner } from '@/admin/packages/validations/master-data';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@workspace/ui/components/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/form';
import { Input } from '@workspace/ui/components/input';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface CreateCourtOwnerDialogDto {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateCourtOwnerDialogComponent({
    open, setOpen
}: CreateCourtOwnerDialogDto) {

    const router = useRouter();

    const [showConfirmClose, setShowConfirmClose] = useState(false);
    const form = useForm<ZodValidationCreateCourtOwner>({
        resolver: zodResolver(zodValidationCreateCourtOwner),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            password: "",
            companyName: "",
            address: ""
        },
    });

    const formValueKeys = ["fullName", "email", "password", "phoneNumber", "address"] as const;

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
            companyName: "",
            address: ""
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


    const onSubmit = (values: ZodValidationCreateCourtOwner) => {

    }

    return <>
        {/* === Add Staff Dialog === */}
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
            <DialogTrigger asChild>
                <div>
                    <Button type='button' variant="default" onClick={() => setOpen(true)} className="cursor-pointer">
                        + ເພີ່ມເຈົ້າຂອງເດິ່ນໃໝ່
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className='text-2xl font-bold'>ເພີ່ມເຈົ້າຂອງເດິ່ນໃໝ່</DialogTitle>
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

                        <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ຊື່ບໍລິສັດ</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="ຊື່ບໍລິສັດ"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ທີ່ຢູ່ <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="ທີ່ຢູ່"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full cursor-pointer" variant="default">
                            ເພີ່ມເຈົ້າຂອງເດິ່ນ
                        </Button>
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

export default CreateCourtOwnerDialogComponent;

