// app/(dashboards)/admindash/tests/[id]/page.tsx
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { TestFormHeader } from "../components/TestFormHeader"
import { TestEditForm } from "./components/TestEditForm"
import { TestStatusBar } from "./components/TestStatusBar"
import { TestDeleteDialog } from "./components/TestDeleteDialog"

interface TestEditPageProps {
  params: {
    id: string
  }
}

export default async function TestEditPage({ params }: TestEditPageProps) {
  const test = await prisma.test.findUnique({
    where: { id: params.id }
  })

  if (!test) {
    notFound()
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