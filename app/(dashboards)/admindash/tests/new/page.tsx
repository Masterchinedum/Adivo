// app/(dashboards)/admindash/tests/new/page.tsx

"use client"

import { useRouter } from "next/navigation"
import { TestHeader } from "../components/TestHeader"
import { TestForm } from "../components/TestForm"
import { CreateTestInput } from "@/types/tests/test"

export default function NewTestPage() {
  const router = useRouter()

  const handleSubmit = async (data: CreateTestInput) => {
    try {
      const response = await fetch('/api/admin/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create test')
      }

      router.push('/admindash/tests')
      router.refresh()
    } catch (error) {
      console.error('Error creating test:', error)
      // Handle error (show toast notification, etc.)
    }
  }

  return (
    <div className="flex flex-col gap-8 p-8">
      <TestHeader
        title="Create New Test"
        description="Add a new test to your collection."
        showAddButton={false}
      />
      <div className="mx-auto w-full max-w-2xl">
        <TestForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}