"use client"
import React from 'react'

import { forgotPasswordSchema, forgotPasswordType } from '@/validators/auth.validator';
import { useRouter, useSearchParams } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, LoaderIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ActionForgotPassword } from './_action';

export const FormForgotPassword = () => {
    const router = useRouter();
    const params = useSearchParams();
    const email = params.get("email");
    const [isPending, startTransition] = React.useTransition();

    const form = useForm<forgotPasswordType>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: email || "",
        },
    });

    const onSubmit = async (values: forgotPasswordType) => {
        startTransition(() => {
            ActionForgotPassword(values)
                .then((data) => {
                    toast.success(data?.message)
                    if (data.redirect) {
                        router.replace(`/check-email?type=forgot&email=${form.getValues().email}`)
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

                <Button
                    type="submit"
                    className="w-full text-[15px] h-[40px] font-semibold"
                    disabled={isPending || !form.formState.isValid}
                    variant="destructive"
                >
                    {(isPending || form.formState.isSubmitting) ?
                        <LoaderIcon className="animate-spin" /> :
                        <>
                            <span>Send reset instructions</span>
                            <ArrowRightIcon />
                        </>
                    }
                </Button>
            </form>
        </Form>
    )
}

