"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { TestsHeader } from "./components/TestsHeader"
import { TestsTableToolbar } from "./components/TestsTableToolbar"
import { TestsDataTable } from "./components/TestsDataTable"
import type { Test } from "@/types/tests/test"

export default function TestsPage() {
  // Router to navigate or refresh page if needed
  const router = useRouter()

  // State for data, loading, and error
  const [tests, setTests] = React.useState<Test[]>([])
  const [totalTests, setTotalTests] = React.useState<number>(0)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)

  // Table filter & sort states
  const [searchValue, setSearchValue] = React.useState<string>("")
  const [publishedValue, setPublishedValue] = React.useState<"all" | "true" | "false">("all")
  const [sortValue, setSortValue] = React.useState<"asc" | "desc">("desc")

  // Memoized fetch function to prevent unnecessary re-renders
  const fetchTests = React.useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Build query parameters
      const query = new URLSearchParams({
        search: searchValue || "",
        sort: sortValue,
      })
      if (publishedValue !== "all") {
        query.set("isPublished", publishedValue)
      }

      const response = await fetch(`/api/admin/tests?${query.toString()}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch tests. Status: ${response.status}`)
      }

      const data = await response.json()
      // Expecting shape: { tests: Test[], totalTests: number, currentPage: number, totalPages: number }
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
  }, [searchValue, publishedValue, sortValue])

  // Fetch tests on initial load and whenever filters change:
  React.useEffect(() => {
    void fetchTests()
  }, [fetchTests])

  // Handlers for your toolbar
  function handleCreateNewTest() {
    // Navigate to the new test form, or open a modal, etc.
    router.push("/admindash/tests/new")
  }

  function handleApplyFilters() {
    // If you want to fetch again on an explicit "Apply" click
    void fetchTests()
  }

  // Example bulk-delete handler (if using row selection)
  function handleDeleteSelected() {
    // In a real scenario, gather selected IDs and make a DELETE request
    // ...
    alert("Delete selected tests (not implemented)")
  }

  return (
    <div className="p-4 space-y-6">
      {/* Page header with optional stats */}
      <TestsHeader
        title="Tests"
        description="Manage your tests from this dashboard."
        showCreateButton={false} // We're showing a button in the toolbar instead
        totalTests={totalTests}
      />

      {/* Toolbar for Create + Filters + Bulk Actions */}
      <TestsTableToolbar
        onCreateNewTest={handleCreateNewTest}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        publishedValue={publishedValue}
        onPublishedChange={setPublishedValue}
        sortValue={sortValue}
        onSortChange={setSortValue}
        onApplyFilters={handleApplyFilters}
        // Include these if you're using row selection:
        selectedRowCount={0}
        onDeleteSelected={handleDeleteSelected}
      />

      {/* Show loading/error states */}
      {loading && <p>Loading tests...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Table of tests */}
      <TestsDataTable data={tests} />
    </div>
  )
}