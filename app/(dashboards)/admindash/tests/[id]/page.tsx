// app/(dashboards)/admindash/tests/[id]/page.tsx
import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { TestHeader } from "../components/TestHeader"
import { EditTestForm } from "./EditTestForm"

interface TestEditPageProps {
  params: {
    id: string
  }
}

async function getTest(id: string) {
  const test = await prisma.test.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true, // Include the user to get createdBy information
    }
  })

  if (!test) {
    notFound()
  }

  return test
}

export default async function TestEditPage({ params }: TestEditPageProps) {
  const test = await getTest(params.id)

  return (
    <div className="flex flex-col gap-8 p-8">
      <TestHeader
        title={`Edit Test: ${test.title}`}
        description="Update test details."
        showAddButton={false}
      />
      <div className="mx-auto w-full max-w-2xl">
        <EditTestForm test={test} />
      </div>
    </div>
  )
}