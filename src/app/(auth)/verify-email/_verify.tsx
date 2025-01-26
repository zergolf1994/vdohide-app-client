"use client"

import React from 'react'
import { ArrowRightIcon, CircleCheckBigIcon, Loader2Icon, TriangleAlertIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { verifyEmail } from '@/queries/user.querirs'

const Verify = ({ code }: { code: string }) => {
    const [state, setState] = React.useState('loading')

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await verifyEmail(code)
                setState(resp.status)
            } catch (error) {
                setState("error")
            }
        };

        fetchData();
    }, [code])


    if (state === "loading") {
        return (
            <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
                <div className="size-[48px]">
                    <Loader2Icon size="48px" className="animate-spin" />
                </div>
                <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
                    Account confirmation
                </h2>
                <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
                    Confirming...
                </p>
            </div>
        )
    }
    if (state === "error") {
        return (
            <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
                <div className="size-[48px]">
                    <TriangleAlertIcon size="48px" className="text-red-500" />
                </div>
                <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
                    Error
                </h2>
                <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
                    Confirmation token not found
                </p>
            </div>
        )
    }

    if (state === "success") {
        return (
            <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
                <div className="size-[48px]">
                    <CircleCheckBigIcon size="48px" className="text-blue-500" />
                </div>
                <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
                    Success
                </h2>
                <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
                    Account confirmed successfully
                </p>
                <Link href={`/login`}>
                    <Button className="rounded-xl">
                        Back to login
                        <ArrowRightIcon />
                    </Button>
                </Link>
            </div>
        )
    }

    return null
}

export default Verify