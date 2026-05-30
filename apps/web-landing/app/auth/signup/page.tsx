"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

import trpc from "@/app/trpc/client";
import MSBadmintionLogo from "../../../public/images/MS.badmintion_logo1.png";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@workspace/ui/components/card";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@workspace/ui/components/form";

import { Badge } from "@workspace/ui/components/badge";

import {
    zodValidationSignUp,
    ZodValidationSignUp,
} from "@/landing/packages/validations";

import { ServerResponseDto } from "@/landing/packages/types";

export default function SignUpPage() {
    const router = useRouter();

    const form = useForm<ZodValidationSignUp>({
        resolver: zodResolver(zodValidationSignUp),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        },
    });

    const signUpMutation = trpc.app.user.auth.register.useMutation({
        onSuccess: (data: ServerResponseDto) => {
            if (data.success) {
                toast.success(data.message);
                return router.push("/auth/signin");
            }
        },

        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    function onSubmit(values: ZodValidationSignUp) {
        signUpMutation.mutate(values);
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-center">
                            <Image
                                src={MSBadmintionLogo}
                                alt="logo"
                                width={100}
                                height={100}
                            />
                        </CardTitle>

                        <CardTitle className="text-center text-2xl">
                            ສ້າງບັນຊີໃໝ່
                        </CardTitle>

                        <CardDescription className="text-center">
                            ກະລຸນາປ້ອນຂໍ້ມູນເພື່ອສ້າງບັນຊີ
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                {/* Full Name */}
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                ຊື່ເຕັມ
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    placeholder="John Doe"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                ອີເມວ
                                            </FormLabel>

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

                                {/* Phone */}
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                ເບີໂທ
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    placeholder="020xxxxxxxx"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Password */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                ລະຫັດຜ່ານ
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="******"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Confirm Password */}
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                ຢືນຢັນລະຫັດຜ່ານ
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="******"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="w-full"
                                    size="lg"
                                    disabled={signUpMutation.isPending}
                                >
                                    {
                                        signUpMutation.isPending
                                            ? "ກຳລັງສ້າງບັນຊີ..."
                                            : "ສ້າງບັນຊີ"
                                    }
                                </Button>
                            </form>
                        </Form>

                        <div className="flex justify-center mt-4">
                            <Link href="/auth/signin">
                                <Badge variant="secondary">
                                    ມີບັນຊີແລ້ວ? ເຂົ້າສູ່ລະບົບ
                                </Badge>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}