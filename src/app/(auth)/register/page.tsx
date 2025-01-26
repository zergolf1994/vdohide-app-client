import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormRegister } from './_register'
import { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    return {
        title: "Register",
    }
}

const PageRegister = () => {
    return (
        <>
            <div className="w-full max-w-sm space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>create-an-account</CardTitle>
                        <CardDescription>sign-up-to-get-started</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <React.Suspense fallback={"loading.."}>
                            <FormRegister />
                        </React.Suspense>
                    </CardContent>
                </Card>
                <div className="text-center text-sm mt-5">
                    <span className="mr-2">
                        already-have-an-account
                    </span>
                    <Link href="/login" className="underline underline-offset-4">
                        sign-in
                    </Link>
                </div>
            </div>
        </>
    )
}

export default PageRegister