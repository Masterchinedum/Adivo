// app/(dashboards)/admindash/tests/page.tsx

import { Suspense } from "react"
import { TestHeader } from "./components/TestHeader"
import { TestsTable } from "./components/TestsTable"
import { TestsTableSkeleton } from "./components/TestsTableSkeleton"
import { TestFilters } from "./components/TestFilters"
import prisma from "@/lib/prisma"

async function getTests() {
  const tests = await prisma.test.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
  return tests
}

export default async function TestsPage() {
  const tests = await getTests()

  return (
    <div className="flex flex-col gap-8 p-8">
      <TestHeader
        title="Tests"
        description="Manage your tests and assessments here."
      />
      <TestFilters />
      <Suspense fallback={<TestsTableSkeleton />}>
        <TestsTable data={tests} />
      </Suspense>
    </div>
  )
}