'use client'

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Button } from '@workspace/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/form';
import Link from 'next/link';
import trpc from '@/app/trpc/client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Clock } from 'lucide-react';
import { ServerResponseDto } from '@/admin/packages/types/constants';
import { ZodValidationSignInOTP } from '@/admin/packages/validations/auth';
import { zodValidationEmail, zodValidationOTPCodeSignIn } from '@/admin/packages/validations';
import Image from 'next/image';
import MSBadmintionLogo from "../../../public/images/MS.badmintion_logo1.png";
import { Badge } from '@workspace/ui/components/badge';

// msBadminton@gmail.com

export default function SignInWithCodeFormPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const codeExprired = 60;
  const [timeLeft, setTimeLeft] = useState(codeExprired); // 1 minutes
  const [isExpired, setIsExpired] = useState(false);

  const emailForm = useForm<{ email: string }>({
    resolver: zodResolver(z.object({ email: zodValidationEmail })),
    defaultValues: { email: "" },
  });

  const codeForm = useForm<{ code: string }>({
    resolver: zodResolver(z.object({ code: zodValidationOTPCodeSignIn })),
    defaultValues: { code: "" },
  });

  const sendCodeSignInOTPMutation = trpc.app.user.auth.sendCodeSignInOTP.useMutation({
    onSuccess: (data: ServerResponseDto) => {
      if (data && data.success) {
        emailForm.setValue("email", email);
        setStep("otp");
        setTimeLeft(codeExprired);
        setIsExpired(false);
        toast.success(data.message);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const signInOTPMutation = trpc.app.user.auth.signInOTP.useMutation({
    onSuccess: (data: ServerResponseDto) => {
      if (data && data.success) {
        toast.success(data.message);
        return router.push("/admin/dashboard");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const resendCodeMutation = trpc.app.user.auth.resendCodeSignInOTP.useMutation({
    onSuccess: (data: ServerResponseDto) => {
      if (data && data.success) {
        setTimeLeft(codeExprired);
        setStep("otp");
        setIsExpired(false);
        toast.success(data.message);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const sendOTP = (values: { email: string }) => {
    if (values && values.email) {
      sendCodeSignInOTPMutation.mutate({ email: values.email });
      setEmail(values.email);
    } else toast.error("Request failed, Please try again later");
  };

  const signInOTP = (values: ZodValidationSignInOTP) => {
    signInOTPMutation.mutate({ code: values.code });
  };

  useEffect(() => {
    if (step !== 'otp') return;

    if (timeLeft === 0) {
      setStep("email");
      setIsExpired(true);
      toast.error('OTP has expired. Please request a new one.');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, step]);

  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='w-full max-w-md mx-auto'>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex justify-center items-center">
              <Image src={MSBadmintionLogo} alt="Logo" width={100} height={100} />
            </CardTitle>
            <CardTitle className='text-2xl! text-center'>ເຂົ້າສູ່ລະບົບດ້ວຍ OTP</CardTitle>
            <CardDescription className='text-center'>ໃສ່ອີເມວຂອງທ່ານເພື່ອຮັບລະຫັດຜ່ານ.</CardDescription>
          </CardHeader>
          <CardContent>
            {step === "email" ? (
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(sendOTP)} className="space-y-4">
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ອີເມວ</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full cursor-pointer" disabled={sendCodeSignInOTPMutation.isPending}>
                    {sendCodeSignInOTPMutation.isPending ? "ກຳລັງສົ່ງ OTP..." : "ສົ່ງ OTP"}
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...codeForm}>
                <form onSubmit={codeForm.handleSubmit(signInOTP)} className="space-y-4">
                  <FormField
                    control={codeForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ໃສ່ລະຫັດ OTP</FormLabel>
                        <FormControl>
                          <Input placeholder="12345678" maxLength={8} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {
                    !isExpired && (
                      <div className={`rounded-lg p-3 text-center ${isExpired
                        ? 'bg-red-50 dark:bg-slate-900 border border-red-200 dark:border-red-700'
                        : timeLeft <= 10
                          ? 'bg-orange-50 dark:bg-slate-900 border border-orange-200 dark:border-orange-700'
                          : 'bg-blue-50 dark:bg-slate-900 border border-blue-200 dark:border-green-700'
                        }`}>
                        <div className="flex items-center justify-center gap-2">
                          <Clock className={`h-4 w-4 ${isExpired
                            ? 'text-red-600'
                            : timeLeft <= 10
                              ? 'text-orange-600'
                              : 'text-green-600'
                            }`} />
                          <p className={`text-sm font-medium ${isExpired
                            ? 'text-red-700'
                            : timeLeft <= 10
                              ? 'text-orange-700'
                              : 'text-green-700'
                            }`}>
                            {isExpired
                              ? 'OTP ໝົດອາຍຸແລ້ວ'
                              : `OTP ໝົດອາຍຸແລ້ວໃນ ${timeLeft}s`}
                          </p>
                        </div>
                      </div>
                    )
                  }
                  <div className="flex gap-2">
                    {
                      step !== "otp" &&
                      <Button type="button" variant="outline" onClick={() => setStep("email")} className="flex-1 cursor-pointer">
                        ກັບ
                      </Button>
                    }
                    <Button type="submit" className="flex-1 cursor-pointer" disabled={signInOTPMutation.isPending || isExpired}>
                      {signInOTPMutation.isPending ? "ກຳລັງກວດສອບ..." : "ກວດສອບ"}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            <div className="mt-4 flex justify-between items-center text-sm">
              <Badge variant="destructive" className='cursor-pointer' aria-disabled={resendCodeMutation.isPending} onClick={() => resendCodeMutation.isPending ? null : resendCodeMutation.mutate()}>
                {
                  !resendCodeMutation.isPending ?
                    "ສົ່ງລະຫັດຄືນໃໝ່?" : "ກຳລັງສົ່ງລະຫັດຄືນໃໝ່..."
                }
              </Badge>
              <Link href="/auth/signin">
                <Badge variant="default">ກັບໄປເຂົ້າສູ່ລະບົບ?</Badge>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}