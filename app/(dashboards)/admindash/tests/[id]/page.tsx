// app/(dashboards)/admindash/tests/[id]/page.tsx
import { Suspense } from "react"
import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { TestFormHeader } from "../components/TestFormHeader"
import { TestContent } from "./components/TestContent"
import type { Test } from "@/types/tests/test"

interface TestEditPageProps {
  params: {
    id: string
  }
}

async function getTest(id: string): Promise<Test | null> {
  try {
    const test = await prisma.test.findUnique({
      where: { id }
    })

    if (!test) {
      return null
    }

    // Transform the Prisma response to match the Test type
    // by converting null to undefined for the description
    return {
      ...test,
      description: test.description || undefined,
      user: undefined // Add this if the user field is optional in your Test type
    } as Test
  } catch (error) {
    console.error("Failed to fetch test:", error)
    throw new Error("Failed to fetch test")
  }
}

export default async function TestEditPage({ params }: TestEditPageProps) {
  const test = await getTest(params.id)

  if (!test) {
    notFound()
  }

  return (
    <div className="container space-y-8 py-8">
      <TestFormHeader
        title="Edit Test"
        description={`Edit details for test "${test.title}"`}
      />

      <div className="mx-auto max-w-2xl space-y-8">
        <Suspense fallback={<div>Loading test content...</div>}>
          <TestContent test={test} />
        </Suspense>
      </div>
    </div>
  )
}