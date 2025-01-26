import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FormSetupPassword } from './_reset_password'

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return {
    title: "Set up a new password",
  }
}

const PageSetupPassword = async ({ searchParams }: PageProps) => {

  const { code } = await searchParams
  if (!code) notFound()

  return (
    <div className="w-full max-w-sm space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Set up a new password</CardTitle>
          <CardDescription>Your password must be different from your previous one.</CardDescription>
        </CardHeader>
        <CardContent>
          <React.Suspense fallback={"loading.."}>
            <FormSetupPassword code={code as string} />
          </React.Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

export default PageSetupPassword