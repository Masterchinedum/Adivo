// app/(dashboards)/admindash/tests/new/page.tsx

import { Metadata } from "next"
import TestForm from "../components/test-form"

export const metadata: Metadata = {
  title: "Create New Test",
  description: "Create a new assessment test",
}

export default function NewTestPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Test</h1>
        <p className="text-muted-foreground">
          Add a new assessment test with questions and options.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="p-6 border rounded-lg bg-card">
          <TestForm />
        </div>
      </div>
    </div>
  )
}