// app/(dashboards)/admindash/tests/new/page.tsx
import { Metadata } from "next"
import { TestCreateForm } from "../components/TestCreateForm"
import { TestFormHeader } from "../components/TestFormHeader"

export const metadata: Metadata = {
  title: "Create Test",
  description: "Create a new test for your users.",
}

export default function NewTestPage() {
  return (
    <div className="container space-y-8 py-8">
      <TestFormHeader
        title="Create Test"
        description="Add a new test to your collection."
      />
      <div className="mx-auto max-w-2xl">
        <TestCreateForm />
      </div>
    </div>
  )
}