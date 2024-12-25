// app/(dashboards)/admindash/tests/components/TestsTableToolbar.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { TestsTableFilters } from "./TestsTableFilters"

interface TestsTableToolbarProps {
  // For “Create New Test” action
  onCreateNewTest: () => void

  // Pass through filter props
  searchValue: string
  onSearchChange: (value: string) => void
  publishedValue: "all" | "true" | "false"
  onPublishedChange: (value: "all" | "true" | "false") => void
  sortValue: "asc" | "desc"
  onSortChange: (value: "asc" | "desc") => void
  onApplyFilters: () => void

  // Row selection for advanced usage (optional)
  selectedRowCount?: number
  onDeleteSelected?: () => void
}

/**
 * Renders a top section containing:
 *   - Create New Test button
 *   - Search and filter components
 *   - Optional selected rows actions (e.g. bulk delete)
 */
export function TestsTableToolbar({
  onCreateNewTest,
  searchValue,
  onSearchChange,
  publishedValue,
  onPublishedChange,
  sortValue,
  onSortChange,
  onApplyFilters,
  selectedRowCount,
  onDeleteSelected,
}: TestsTableToolbarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Left side: Create new test button or other CTAs */}
      <Button variant="default" onClick={onCreateNewTest}>
        Create New Test
      </Button>

      {/* Filters */}
      <TestsTableFilters
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        publishedValue={publishedValue}
        onPublishedChange={onPublishedChange}
        sortValue={sortValue}
        onSortChange={onSortChange}
        onApplyFilters={onApplyFilters}
      />

      {/* Optional selected rows actions */}
      {selectedRowCount && selectedRowCount > 0 && onDeleteSelected && (
        <div className="flex items-center gap-2">
          <p className="text-sm">
            {selectedRowCount} test{selectedRowCount > 1 ? "s" : ""} selected
          </p>
          <Button variant="destructive" onClick={onDeleteSelected}>
            Delete Selected
          </Button>
        </div>
      )}
    </div>
  )
}