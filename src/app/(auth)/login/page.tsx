import React from 'react'
import { FormLogin } from './_login'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ButtonLoginWithGoogle } from './_button_login'
import { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    return {
        title: "Login",
    }
}

const PageLogin = () => {
    return (
        <>
            <div className="w-full max-w-sm space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome back</CardTitle>
                        <CardDescription>Login with your Email or Google account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <ButtonLoginWithGoogle />
                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                        <React.Suspense fallback={"loading.."}>
                            <FormLogin />
                        </React.Suspense>
                    </CardContent>
                </Card>
                <div className="text-center text-sm mt-5">
                    <span className="mr-2">
                        do-not-have-an-account
                    </span>
                    <Link href="/register" className="underline underline-offset-4">
                        register
                    </Link>
                </div>
            </div>
        </>
    )
}

export default PageLogin