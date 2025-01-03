//app/(test-taking)/tests/components/TestList.tsx

"use client"

import { useState, useEffect } from "react"
import { getPublicTests } from "@/lib/tests"
import { TestCard } from "./TestCard"
import { TestsPagination } from "./TestsPagination"
import type { Test } from "@/types/tests/test"
import { TestCardSkeleton } from "./TestCardSkeleton"
import { TestsPageHeader } from "./TestsPageHeader"

export function TestList() {
  const [tests, setTests] = useState<Test[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [totalTests, setTotalTests] = useState(0)

  async function fetchTests() {
    try {
      setIsLoading(true)
      setError(null)
      // Add searchQuery to the parameters
      const data = await getPublicTests({ 
        page: currentPage.toString(),
        search: searchQuery 
      })
      setTests(data.tests)
      setTotalPages(data.totalPages)
      setTotalTests(data.totalTests) // Set total tests count
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tests')
    } finally {
      setIsLoading(false)
    }
  }

  // Update useEffect dependencies to include searchQuery
  useEffect(() => {
    void fetchTests()
  }, [currentPage, searchQuery]) // Add searchQuery as dependency

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
    // Implement search logic here
  }

  const listClassName = view === "grid" 
    ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    : "space-y-4"

  if (isLoading) {
    return (
      <div className={listClassName}>
        {Array.from({ length: 8 }).map((_, i) => (
          <TestCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-6">
      <TestsPageHeader
        totalTests={totalTests}
        onSearch={handleSearch}
        view={view}
        onViewChange={setView}
      />

      <div className={listClassName}>
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <TestCardSkeleton key={i} />
          ))
        ) : (
          tests.map((test) => (
            <TestCard 
              key={test.id} 
              test={test}
              viewType={view}
            />
          ))
        )}
      </div>

      <TestsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}