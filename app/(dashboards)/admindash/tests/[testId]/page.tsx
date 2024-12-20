// app/(dashboards)/admindash/tests/[testId]/page.tsx
import { TestActions } from "./_components/test-actions"
import { TestEditor } from "./_components/test-editor"

interface TestPageProps {
  params: {
    testId: string;
  }
}

const TestPage = async ({ params }: TestPageProps) => {
  // TODO: Fetch test data
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Edit Test</h1>
        <TestActions testId={params.testId} />
      </div>
      <TestEditor testId={params.testId} />
    </div>
  )
}

export default TestPage