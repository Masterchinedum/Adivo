//app/(test-taking)/tests/components/TestList.tsx

"use client"

import { useState, useEffect } from "react"
import { getPublicTests } from "@/lib/tests"
import { TestCard } from "./TestCard"
import { TestsPagination } from "./TestsPagination"
import type { Test } from "@/types/tests/test"

export function TestList() {
  const [tests, setTests] = useState<Test[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTests() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getPublicTests({ page: currentPage.toString() })
        setTests(data.tests)
        setTotalPages(data.totalPages)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tests')
      } finally {
        setIsLoading(false)
      }
    }

    void fetchTests()
  }, [currentPage])

  if (isLoading) return <div>Loading tests...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>
      <TestsPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}