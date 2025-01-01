//app/(test-taking)/tests/[testId]/page.tsx

import { Metadata } from "next"
import { notFound } from "next/navigation"
import { TestDetails } from "./components/TestDetails"
import { getPublicTest } from "@/lib/tests"

export const metadata: Metadata = {
  title: "Test Details",
  description: "View test details and start assessment"
}

interface PageProps {
  params: Promise<{
    testId: string
  }>
}

export default async function TestPage({ params }: PageProps) {
  // Await the params first
  const resolvedParams = await params

  if (!resolvedParams?.testId) {
    notFound()
  }

  try {
    const response = await getPublicTest(resolvedParams.testId)
    
    if (!response?.test) {
      notFound()
    }

    return (
      <div className="container py-8 space-y-8">
        <TestDetails test={response.test} attempts={response.attempts} />
      </div>
    )
  } catch (error) {
    console.error('Error fetching test:', error)
    notFound()
  }
}