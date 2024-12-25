// app/(dashboards)/admindash/tests/[id]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { TestFormHeader } from "../components/TestFormHeader"
import { TestEditForm } from "./components/TestEditForm"
import { TestDeleteAlert } from "./components/TestDeleteAlert"
import { TestStatusToggle } from "./components/TestStatusToggle"
import type { Test } from "@/types/tests/test"

interface TestEditPageProps {
  params: {
    id: string
  }
}

export default function TestEditPage({ params }: TestEditPageProps) {
  const [test, setTest] = useState<Test | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTest() {
      try {
        const response = await fetch(`/api/admin/tests/${params.id}`)
        if (!response.ok) {
          if (response.status === 404) {
            notFound()
          }
          throw new Error("Failed to fetch test")
        }

        const data = await response.json()
        setTest(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchTest()
  }, [params.id])

  if (loading) {
    return (
      <div className="container py-8">
        <p className="text-center">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-8">
        <p className="text-center text-red-500">Error: {error}</p>
      </div>
    )
  }

  if (!test) {
    return notFound()
  }

  return (
    <div className="container space-y-8 py-8">
      <TestFormHeader
        title="Edit Test"
        description={`Edit details for test "${test.title}"`}
      />

      <div className="mx-auto max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <TestStatusToggle
            testId={test.id}
            isPublished={test.isPublished}
          />
          <TestDeleteAlert
            testId={test.id}
            testTitle={test.title}
          />
        </div>

        <TestEditForm test={test} />
      </div>
    </div>
  )
}