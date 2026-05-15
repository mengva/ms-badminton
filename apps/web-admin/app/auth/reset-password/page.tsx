"use client"

import { ServerResponseDto } from "@/admin/packages/types/constants";
import { ZodValidationClientResetPassword, zodValidationClientResetPassword } from "@/admin/packages/validations";
import trpc from "@/app/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import MSBadmintionLogo from "../../../public/images/MS.badmintion_logo1.png";
import { Badge } from "@workspace/ui/components/badge";

export default function ResetPasswordFormPage() {
    const router = useRouter();
    const form = useForm<ZodValidationClientResetPassword>({
        resolver: zodResolver(zodValidationClientResetPassword),
        defaultValues: {
            code: "",
            password: "",
            confirmPassword: ""
        },
    });

    const resetPasswordMutation = trpc.app.user.auth.resetPassword.useMutation({
        onSuccess: (data: ServerResponseDto) => {
            if (data && data.success) {
                toast.success(data.message);
                return router.push('/auth/signin');
            }
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const resendCodeMutation = trpc.app.user.auth.resendCode.useMutation({
        onSuccess: (data: ServerResponseDto) => {
            if (data && data.success) {
                toast.success(data.message);
            }
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    function onSubmit(values: ZodValidationClientResetPassword) {
        resetPasswordMutation.mutate({
            code: values.code,
            password: values.password
        });
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="w-full max-w-md mx-auto">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="flex justify-center items-center">
                            <Image src={MSBadmintionLogo} alt="Logo" width={100} height={100} />
                        </CardTitle>
                        <CardTitle className="text-center text-2xl!">ປ່ຽນລະຫັດຜ່ານ</CardTitle>
                        <CardDescription className="text-center">
                            ກະລຸນາໃສ່ລະຫັດຜ່ານໃໝ່ຂອງທ່ານຂ້າງລຸ່ມນີ້ເພື່ອປ່ຽນລະຫັດຜ່ານບັນຊີຂອງທ່ານ.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ລະຫັດ OTP</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="xxxxxx" {...field} maxLength={6} />
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
                                            <FormLabel>ລະຫັດຜ່ານໃໝ່</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ຢືນຢັນລະຫັດຜ່ານ</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" size={"lg"} className="w-full cursor-pointer" disabled={resetPasswordMutation.isPending}>
                                    {
                                        resetPasswordMutation.isPending ? "ກຳລັງໄປປ່ຽນລະຫັດຜ່ານ..." : "ປ່ຽນລະຫັດຜ່ານ"
                                    }
                                </Button>
                            </form>
                        </Form>
                        <div className="mt-4 text-center flex justify-between items-center">
                            <Badge variant={"destructive"} className="cursor-pointer" onClick={() => resendCodeMutation.mutate()}>
                                {
                                    resendCodeMutation.isPending ? "ກຳລັງສົ່ງ..." : "ສົ່ງລະຫັດຄືນໃໝ່"
                                }
                            </Badge>
                            <Link href="/auth/signin">
                                <Badge variant="secondary">ກັບຄືນການເຂົ້າສູ່ລະບົບ?</Badge>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}