// app/(dashboards)/admindash/tests/[id]/EditTestForm.tsx
"use client"

import { useRouter } from "next/navigation"
import { TestForm } from "../components/TestForm"
import { Test, CreateTestInput } from "@/types/tests/test"

interface EditTestFormProps {
  test: Test
}

export function EditTestForm({ test }: EditTestFormProps) {
  const router = useRouter()

  const handleSubmit = async (data: CreateTestInput) => {
    try {
      const response = await fetch(`/api/admin/tests/${test.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update test')
      }

      router.push('/admindash/tests')
      router.refresh()
    } catch (error) {
      console.error('Error updating test:', error)
      // Handle error (show toast notification, etc.)
    }
  }

  return <TestForm onSubmit={handleSubmit} initialData={test} />
}