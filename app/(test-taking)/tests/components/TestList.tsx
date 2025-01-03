"use client"

import { useCallback, useEffect, useState } from "react"
import { TestsPageHeader } from "./TestsPageHeader"
import { TestCard } from "./TestCard"
import { TestCardSkeleton } from "./TestCardSkeleton"
import { TestsPagination } from "./TestsPagination"
import { getPublicTests } from "@/lib/tests"
import type { Test } from "@/types/tests/test"

export function TestList() {
  const [tests, setTests] = useState<Test[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalTests, setTotalTests] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")

  const fetchTests = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await getPublicTests({ 
        page: currentPage.toString(),
        search: searchQuery 
      })
      setTests(data.tests)
      setTotalPages(data.totalPages)
      setTotalTests(data.totalTests)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tests')
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, searchQuery]) // Only depend on values needed for the API call

  useEffect(() => {
    void fetchTests()
  }, [fetchTests]) // fetchTests now has stable dependencies

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [])

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