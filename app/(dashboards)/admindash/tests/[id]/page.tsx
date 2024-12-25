import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import { TestFormHeader } from "../components/TestFormHeader"
import { TestEditForm } from "./components/TestEditForm"
import { TestStatusBar } from "./components/TestStatusBar"
import { TestDeleteDialog } from "./components/TestDeleteDialog"
import type { Test } from '@/types/tests/test'

interface TestEditPageProps {
  params: {
    id: string
  }
}

export default async function TestEditPage({ params }: TestEditPageProps) {
  const { userId } = await auth()
  if (!userId) {
    notFound()
  }

  const testData = await prisma.test.findUnique({
    where: { id: params.id },
    include: { user: true }
  })

  if (!testData) {
    notFound()
  }

  // Transform the Prisma data to match the Test interface
  const test: Test = {
    id: testData.id,
    title: testData.title,
    description: testData.description ?? undefined,
    createdAt: testData.createdAt,
    updatedAt: testData.updatedAt,
    isPublished: testData.isPublished,
    createdBy: testData.createdBy,
    user: testData.user ? {
      id: testData.user.id,
      email: testData.user.email,
      firstName: testData.user.firstName ?? "",
      lastName: testData.user.lastName ?? "",
      imageUrl: testData.user.imageUrl ?? "",
      clerkUserId: testData.user.clerkUserId,
      createdAt: testData.user.createdAt,
      updatedAt: testData.user.updatedAt
    } : undefined
  }

  return (
    <div className="container space-y-8 py-8">
      <TestFormHeader
        title="Edit Test"
        description="Update test details and manage settings."
      />
      <TestStatusBar test={test} />
      <div className="mx-auto max-w-2xl">
        <TestEditForm test={test} />
      </div>
      <div className="mx-auto max-w-2xl">
        <TestDeleteDialog id={test.id} title={test.title} />
      </div>
    </div>
  )
}