import React from 'react'
import { FormLogin } from './_login'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ButtonLoginWithGoogle } from './_button_login'

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
            </div>
        </>
    )
}

export default PageLogin