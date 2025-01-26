import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormRegister } from './_register'
import { Metadata } from 'next'

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
            </div>
        </>
    )
}

export default PageRegister