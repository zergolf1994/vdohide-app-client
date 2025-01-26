"use client"
import React from 'react'

import { registerSchema, registerSchemaType } from '@/validators/auth.validator';
import { useRouter, useSearchParams } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, LoaderIcon } from 'lucide-react';
import { PasswordInput } from '@/components/ui/input-password';
import { toast } from 'sonner';
import { PasswordStrength } from '@/components/shared/password-strength.shared';
import { ActionRegister } from './_action';

export const FormRegister = () => {
    const router = useRouter();
    const params = useSearchParams();
    const email = params.get("email");
    const [isPending, startTransition] = React.useTransition();

    const form = useForm<registerSchemaType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: email || "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: registerSchemaType) => {
        startTransition(() => {
            ActionRegister(values)
                .then((data) => {
                    if (data.request_verify) {
                        router.replace(`/check-email?type=register&email=${values?.email}`);
                    } else {
                        router.replace(`/login?email=${values?.email}`);
                    }
                    toast.success(data.message)
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm">
                                name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="youname"
                                    {...field}
                                    disabled={form.formState.isSubmitting}
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
                            <FormLabel className="text-sm">
                                email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="you@email.com"
                                    {...field}
                                    disabled={form.formState.isSubmitting}
                                    required
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
                            <FormLabel className="text-sm">
                                password
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
                    disabled={isPending || !form.formState.isValid}
                >
                    {(isPending || form.formState.isSubmitting) ?
                        <LoaderIcon className="animate-spin" /> :
                        <>
                            <span>sign-up</span>
                            <ArrowRightIcon />
                        </>
                    }
                </Button>
            </form>
        </Form>
    )
}

