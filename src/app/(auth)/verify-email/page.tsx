import React from 'react'
import Verify from './_verify'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return {
    title: "Check email",
  }
}

const PageVerifyEmail = async ({ searchParams }: PageProps) => {
  const { code } = await searchParams

  if (!code) notFound()

  const verificationCode = Array.isArray(code) ? code[0] : code
  return <Verify code={verificationCode} />
}

export default PageVerifyEmail