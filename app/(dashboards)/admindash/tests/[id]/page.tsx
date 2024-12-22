// app/(dashboards)/admindash/tests/[id]/page.tsx

import { Metadata } from "next"
import TestForm from "../components/test-form"

export const metadata: Metadata = {
  title: "Edit Test",
  description: "Modify an existing assessment test",
}

async function getTest(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/tests/${id}`, {
    cache: 'no-store'
  })
  if (!response.ok) throw new Error('Failed to fetch test')
  return response.json()
}

export default async function EditTestPage({ params }: { params: { id: string } }) {
  const test = await getTest(params.id)

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Test</h1>
        <p className="text-muted-foreground">
          Modify test details, questions, and options.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="p-6 border rounded-lg bg-card">
          <TestForm test={test} />
        </div>
      </div>
    </div>
  )
}