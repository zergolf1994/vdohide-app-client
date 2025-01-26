"use client"
import React from 'react'

import { loginSchema, loginSchemaType } from '@/validators/auth.validator';
import { useRouter, useSearchParams } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, LoaderIcon } from 'lucide-react';
import { PasswordInput } from '@/components/ui/input-password';
import { toast } from 'sonner';
import { ActionLogin } from './_action';
import Link from 'next/link';

export const FormLogin = () => {
    const router = useRouter();
    const params = useSearchParams();
    const email = params.get("email");
    const [isPending, startTransition] = React.useTransition();

    const form = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: email || "",
            password: "",
        },
    });

    const onSubmit = async (values: loginSchemaType) => {
        startTransition(() => {
            ActionLogin(values)
                .then((data) => {
                    window.location.reload();
                })
                .catch((e) => {
                    toast.error(e?.message)
                })

        })
        // toast(JSON.stringify(values, null, 2))
    }

    return (
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
                            <div className="flex items-center">
                                <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                    password
                                </FormLabel>

                                <Link
                                    className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
                                    href={`/forgot-password${form.getValues().email ? `?email=${form.getValues().email}` : ""}`}
                                >
                                    forgot-your-password
                                </Link>
                            </div>
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
                            <span>sign-in</span>
                            <ArrowRightIcon />
                        </>
                    }
                </Button>
            </form>
        </Form>
    )
}

