// app/tests/components/TestList.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { TestCard } from "./TestCard"
import { TestSearch } from "./TestSearch"
import { Button } from "@/components/ui/button"

interface Test {
  id: string
  title: string
  description: string | null
  totalQuestions: number
  categories: Array<{ name: string }>
}

export function TestList() {
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchTests = useCallback(async () => {
    try {
      setLoading(true)
      const query = new URLSearchParams({
        page: page.toString(),
        search: searchQuery,
      })

      const response = await fetch(`/api/tests?${query}`)
      if (!response.ok) throw new Error("Failed to fetch tests")

      const data = await response.json()
      setTests(data.tests)
      setTotalPages(data.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading tests")
    } finally {
      setLoading(false)
    }
  }, [page, searchQuery])

  useEffect(() => {
    void fetchTests()
  }, [fetchTests])

  const handleSearch = () => {
    setPage(1)
    void fetchTests()
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Available Tests</h1>
        <TestSearch
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
        />
      </div>

      {loading ? (
        <div className="text-center">Loading tests...</div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>

          {tests.length === 0 && (
            <div className="text-center text-muted-foreground">
              No tests found.
            </div>
          )}

          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPage(p => p - 1)}
              disabled={page <= 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage(p => p + 1)}
              disabled={page >= totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  )
}