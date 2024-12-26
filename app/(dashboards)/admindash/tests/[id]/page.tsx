// app/(dashboards)/admindash/tests/[id]/page.tsx
import { Suspense } from "react"
import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { TestFormHeader } from "../components/TestFormHeader"
import { TestContent } from "./components/TestContent"
import type { Test } from "@/types/tests/test"

// Interface for the page props
interface PageProps {
  params: Promise<{
    id: string
  }>
}

// Fetch test data function
async function getTest(testId: string): Promise<Test | null> {
  try {
    const test = await prisma.test.findUnique({
      where: { id: testId },
      include: {
        user: true
      }
    })

    if (!test) {
      return null
    }

    return {
      id: test.id,
      title: test.title,
      description: test.description ?? undefined,
      createdAt: test.createdAt,
      updatedAt: test.updatedAt,
      isPublished: test.isPublished,
      createdBy: test.createdBy,
      user: undefined
    }
  } catch (error) {
    console.error("Failed to fetch test:", error)
    throw new Error("Failed to fetch test")
  }
}

// Loading component
function LoadingState() {
  return <div>Loading test content...</div>
}

// Main page component
export default async function TestPage({ params }: PageProps) {
  // Await the params first
  const resolvedParams = await params
  
  // Early return if no ID is provided
  if (!resolvedParams?.id) {
    notFound()
  }

  // Fetch the test data using the resolved ID
  const test = await getTest(resolvedParams.id)

  // Handle non-existent test
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
        <Suspense fallback={<LoadingState />}>
          <TestContent test={test} />
        </Suspense>
      </div>
    </div>
  )
}