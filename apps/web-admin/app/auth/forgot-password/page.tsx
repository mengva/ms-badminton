'use client'

import Link from "next/link";
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Form, FormItem, FormField, FormLabel, FormControl, FormMessage } from "@workspace/ui/components/form";
import { useForm } from "react-hook-form";
import { Input } from "@workspace/ui/components/input";
import z from "zod";
import trpc from "@/app/trpc/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ServerResponseDto } from "@/admin/packages/types/constants";
import { zodValidationEmail } from "@/admin/packages/validations";
import { Badge } from "@workspace/ui/components/badge";
import MSBadmintionLogo from "../../../public/images/MS.badmintion_logo1.png";
import Image from "next/image";

const zodValidateForgotPassword = z.object({
    email: zodValidationEmail,
});

type ZodValidateForgotPassword = z.infer<typeof zodValidateForgotPassword>;

function ForgotPasswordPage() {
    const router = useRouter();

    const form = useForm<ZodValidateForgotPassword>({
        resolver: zodResolver(zodValidateForgotPassword),
        defaultValues: { email: "" },
    });

    const sendCodeResetPasswordMutation = trpc.app.user.auth.sendCodeResetPassword.useMutation({
        onSuccess: (data: ServerResponseDto) => {
            if (data && data.success) {
                toast.success(data.message);
                return router.push('/auth/reset-password');
            }
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    function onSubmit(values: ZodValidateForgotPassword) {
        sendCodeResetPasswordMutation.mutate({ email: values.email });
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="w-full max-w-md mx-auto">
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle className="flex justify-center items-center">
                            <Image src={MSBadmintionLogo} alt="Logo" width={100} height={100} />
                        </CardTitle>
                        <CardTitle className="text-center text-2xl!">ລືມລະຫັດຜ່ານ</CardTitle>
                        <CardDescription className="text-center mb-4">
                            ໃສ່ອີເມວຂອງທ່ານເພື່ອຮັບລິ້ງສຳລັບຕັ້ງລະຫັດຜ່ານໃໝ່.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ອີເມວ</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="you@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" size={"lg"}
                                    disabled={sendCodeResetPasswordMutation.isPending}
                                    className="w-full cursor-pointer" variant="default">
                                    {
                                        (sendCodeResetPasswordMutation.isPending ? "ກຳລັງສົ່ງ OTP..." : "ສົ່ງ OTP")
                                    }
                                </Button>
                            </form>
                        </Form>
                        <div className="mt-4 w-full flex justify-between items-center">
                            <Link href="/auth/signin">
                                <Badge variant="default">ກັບຄືນການເຂົ້າສູ່ລະບົບ?</Badge>
                            </Link>
                            <Link href="/auth/signin-otp">
                                <Badge variant="outline">ກັບຄືນການເຂົ້າສູ່ລະບົບດ້ວຍ OTP?</Badge>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ForgotPasswordPage
