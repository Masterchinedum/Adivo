// app/(dashboards)/admindash/tests/page.tsx
"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { TestsHeader } from "./components/TestsHeader"
import { TestsTableToolbar } from "./components/TestsTableToolbar"
import { TestsDataTable } from "./components/TestsDataTable"
import type { Test } from "@/types/tests/test"

export default function TestsPage() {
  const router = useRouter()
  const [tests, setTests] = React.useState<Test[]>([])
  const [totalTests, setTotalTests] = React.useState<number>(0)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [itemsPerPage] = React.useState<number>(10)

  // Filter states
  const [searchValue, setSearchValue] = React.useState<string>("")
  const [publishedValue, setPublishedValue] = React.useState<"all" | "true" | "false">("all")
  const [sortValue, setSortValue] = React.useState<"asc" | "desc">("desc")

  const fetchTests = React.useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Build query parameters with pagination
      const query = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchValue || "",
        sort: sortValue,
      })
      
      // Only add isPublished if it's not "all"
      if (publishedValue !== "all") {
        query.set("isPublished", publishedValue)
      }

      const response = await fetch(`/api/admin/tests?${query.toString()}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch tests. Status: ${response.status}`)
      }

      const data = await response.json()
      setTests(data.tests ?? [])
      setTotalTests(data.totalTests ?? 0)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unexpected error occurred.")
      }
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage, searchValue, publishedValue, sortValue])

  React.useEffect(() => {
    void fetchTests()
  }, [fetchTests])

  function handleCreateNewTest() {
    router.push("/admindash/tests/new")
  }

  function handleApplyFilters() {
    setCurrentPage(1) // Reset to first page when filters change
    void fetchTests()
  }

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  return (
    <div className="p-4 space-y-6">
      <TestsHeader
        title="Tests"
        description="Manage your tests from this dashboard."
        showCreateButton={false}
        totalTests={totalTests}
      />

      <TestsTableToolbar
        onCreateNewTest={handleCreateNewTest}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        publishedValue={publishedValue}
        onPublishedChange={setPublishedValue}
        sortValue={sortValue}
        onSortChange={setSortValue}
        onApplyFilters={handleApplyFilters}
        selectedRowCount={0}
      />

      {loading && <p>Loading tests...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <TestsDataTable 
        data={tests}
        currentPage={currentPage}
        totalPages={Math.ceil(totalTests / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  )
}