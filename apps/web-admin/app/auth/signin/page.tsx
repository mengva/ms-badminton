"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import trpc from "@/app/trpc/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { ZodValidationSignIn, zodValidationSignIn } from "@/admin/packages/validations";
import { ServerResponseDto } from "@/admin/packages/types";
import { Badge } from "@workspace/ui/components/badge";
import MSBadmintionLogo from "../../../public/images/MS.badmintion_logo1.png";
import Image from "next/image";

export default function SignInPage() {
    const router = useRouter();

    const form = useForm<ZodValidationSignIn>({
        resolver: zodResolver(zodValidationSignIn),
        defaultValues: {
            email: "msBadminton@gmail.com",
            password: "msBadminton09@&.com",
        },
    });

    const signInMutation = trpc.app.user.auth.signIn.useMutation({
        onSuccess: (data: ServerResponseDto) => {
            if (data?.success) {
                toast.success(data.message);
                router.push("/admin/dashboard");
            }
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    function onSubmit(values: ZodValidationSignIn) {
        signInMutation.mutate(values);
    }

    return (
        <div className="flex min-h-screen items-center justify-center w-full">
            <div className="w-full max-w-md mx-auto">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="flex justify-center items-center">
                            <Image src={MSBadmintionLogo} alt="Logo" width={100} height={100} />
                        </CardTitle>
                        <CardTitle className="text-center text-2xl">
                            ເຂົ້າສູ່ລະບົບ
                        </CardTitle>
                        <CardDescription className="text-center">
                            ໃສ່ອີເມວ ແລະ ລະຫັດຜ່ານຂອງທ່ານເພື່ອເຂົ້າສູ່ລະບົບບັນຊີຂອງທ່ານ.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ອີເມວ</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="you@example.com"
                                                    disabled={signInMutation.isPending}
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
                                            <FormLabel>ລະຫັດຜ່ານ</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••"
                                                    disabled={signInMutation.isPending}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full cursor-pointer"
                                    disabled={signInMutation.isPending}
                                >
                                    {signInMutation.isPending
                                        ? "ກຳລັງເຂົ້າສູ່ລະບົບ..."
                                        : "ເຂົ້າສູ່ລະບົບ"}
                                </Button>
                            </form>
                        </Form>

                        <div className="mt-4 flex items-center justify-between text-sm">
                            <Link
                                href="/auth/forgot-password"
                            >
                                <Badge variant="destructive">ລືມລະຫັດຜ່ານ?</Badge>
                            </Link>

                            <Link
                                href="/auth/signin-otp"
                            >
                                <Badge variant="secondary">ເຂົ້າສູ່ລະບົບດ້ວຍ OTP?</Badge>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}