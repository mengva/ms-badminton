'use client'

import Link from "next/link";
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Form, FormItem, FormField, FormLabel, FormControl, FormMessage } from "@workspace/ui/components/form";
import { useForm } from "react-hook-form";
import { Input } from "@workspace/ui/components/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import React, { useEffect } from "react";
import z from "zod";
import trpc from "@/app/trpc/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ServerResponseDto } from "@/admin/packages/types/constants";
import { zodValidationEmail, zodValidationPhoneNumber } from "@/admin/packages/validations";
import { Badge } from "@workspace/ui/components/badge";
import MSBadmintionLogo from "../../../public/images/MS.badmintion_logo1.png";
import Image from "next/image";


type VerifiedEmailDto = "EMAIL" | "PHONE_NUMBER";

const zodValidateForgotPasswordForm = z.object({
    email: zodValidationEmail,
    phoneNumber: zodValidationPhoneNumber
});

type ZodValidateForgotPasswordForm = z.infer<typeof zodValidateForgotPasswordForm>;

function ForgotPasswordPage() {
    const [verifiedEmail, setVerifiedEmail] = React.useState("EMAIL" as VerifiedEmailDto);
    const router = useRouter();

    const form = useForm<ZodValidateForgotPasswordForm>({
        resolver: zodResolver(zodValidateForgotPasswordForm),
        defaultValues: { email: "", phoneNumber: "" },
    });

    const verifiedEmailMutation = trpc.app.user.auth.sendCodeResetPassword.useMutation({
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

    function onSubmit(values: ZodValidateForgotPasswordForm) {
        if (verifiedEmail === "EMAIL") {
            verifiedEmailMutation.mutate({ email: values.email });
            return;
        }
    }

    useEffect(() => {
        if (verifiedEmail === "EMAIL") {
            form.setValue("email", "");
            form.setValue("phoneNumber", "+8562012345678");
        } else {
            form.setValue("phoneNumber", "");
            form.setValue("email", "you@example.com");
        }
    }, [verifiedEmail]);

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
                            ໃສ່ອີເມວ ຫຼື ເບີໂທລະສັບຂອງທ່ານເພື່ອຮັບລິ້ງສຳລັບຕັ້ງລະຫັດຜ່ານໃໝ່.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <Tabs defaultValue="email">
                                    <TabsList className="w-full mb-2">
                                        <TabsTrigger onClick={() => setVerifiedEmail("EMAIL")} className="cursor-pointer" value="email">ອີເມວ</TabsTrigger>
                                        <TabsTrigger onClick={() => setVerifiedEmail("PHONE_NUMBER")} className="cursor-pointer" value="phoneNumber">ເບີໂທລະສັບ</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="email">
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
                                    </TabsContent>
                                    <TabsContent value="phoneNumber">
                                        <FormField
                                            control={form.control}
                                            name="phoneNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>ເບີໂທລະສັບ</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+8562012345678" {...field} minLength={8} maxLength={14} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </TabsContent>
                                </Tabs>
                                <Button type="submit" size={"lg"} className="w-full mt-4 cursor-pointer" variant="default">
                                    {
                                        verifiedEmail === "EMAIL" ?
                                            (verifiedEmailMutation.isPending ? "ກຳລັງສົ່ງ OTP..." : "ສົ່ງ OTP") : "ສົ່ງ OTP"
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
