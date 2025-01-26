import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormForgotPassword } from './_forgot_password'
import { Metadata } from 'next'

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return {
      title: "Reset password",
  }
}

const PageForgotPassword = () => {
  return (

    <div className="w-full max-w-sm space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>Enter email address associated with your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <React.Suspense fallback={"loading.."}>
            <FormForgotPassword />
          </React.Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

export default PageForgotPassword