import { Button } from '@/components/ui/button'
import { ArrowRightIcon, MailCheckIcon } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    return {
        title: "Check email",
    }
}

const PageCheckEmail = async ({ searchParams }: PageProps) => {
    const { type, email } = await searchParams

    if (!['register', 'forgot'].includes(type as string) || !email) notFound()

    const textSend = {
        register: "we-just-sent-a-verification-link-to",
        forgot: "we-just-sent-a-password-reset-link-to"
    }

    return (
        <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
            <div className="size-[48px]">
                <MailCheckIcon size="48px" className="animate-bounce" />
            </div>
            <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
                check-your-email
            </h2>
            <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
                {textSend[type as keyof typeof textSend]} {email}.
            </p>
            <Link href={`/login?email=${email}`}>
                <Button className="h-[40px]">
                    Back to login
                    <ArrowRightIcon />
                </Button>
            </Link>
        </div>
    )
}

export default PageCheckEmail