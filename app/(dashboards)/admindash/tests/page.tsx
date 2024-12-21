// app/(dashboards)/admindash/tests/page.tsx
import { TestsHeader } from "./_components/tests-header"
import { TestsDataTable } from "./_components/tests-data-table"
import { columns } from "./_components/tests-columns"

async function getTests() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admindash/tests`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch tests")
    }

    return response.json()
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function TestsPage() {
  const tests = await getTests()

  return (
    <div className="p-6">
      <TestsHeader />
      <TestsDataTable columns={columns} data={tests} />
    </div>
  )
}