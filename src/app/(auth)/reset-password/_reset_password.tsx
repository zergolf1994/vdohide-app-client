"use client"
import React from 'react'

import { resetPasswordSchema, resetPasswordType } from '@/validators/auth.validator';
import { useRouter, useSearchParams } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { LoaderIcon } from 'lucide-react';
import { PasswordInput } from '@/components/ui/input-password';
import { toast } from 'sonner';
import { PasswordStrength } from '@/components/shared/password-strength.shared';
import { ActionSetupPassword } from './_action';

export const FormSetupPassword = ({ code }: { code: string }) => {
    const router = useRouter();
    const params = useSearchParams();
    const [isPending, startTransition] = React.useTransition();

    const form = useForm<resetPasswordType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            verificationCode: code || "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: resetPasswordType) => {
        startTransition(() => {
            ActionSetupPassword(values)
                .then((data) => {
                    toast(data?.message)
                    if (data.redirect) {
                        router.replace(`/login`)
                    }
                })
                .catch((e) => {
                    toast.error(e?.message)
                })
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm">
                                new password
                            </FormLabel>
                            <FormControl>
                                <PasswordInput
                                    placeholder="••••••••••••"
                                    {...field}
                                    disabled={form.formState.isSubmitting}
                                    required
                                />
                            </FormControl>
                            <PasswordStrength password={field.value} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm">
                                confirmPassword
                            </FormLabel>
                            <FormControl>
                                <PasswordInput
                                    placeholder="••••••••••••"
                                    {...field}
                                    disabled={form.formState.isSubmitting}
                                    required
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full text-[15px] h-[40px] font-semibold"
                    disabled={!form.formState.isValid}
                >
                    {form.formState.isSubmitting ?
                        <LoaderIcon className="animate-spin" /> :
                        <>
                            <span>Update password</span>
                        </>
                    }
                </Button>
            </form>
        </Form>
    )
}

