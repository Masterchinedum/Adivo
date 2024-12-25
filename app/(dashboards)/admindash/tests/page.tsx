// app/(dashboard)/admin/tests/page.tsx
import { Heading } from "@/components/ui/heading"
import { TestClient } from "./_components/client"

const TestsPage = () => {
  return (
    <div className="flex-1 p-8 pt-6">
      <Heading
        title="Tests Management"
        description="Create and manage tests for your courses"
      />
      <TestClient />
    </div>
  )
}

export default TestsPage