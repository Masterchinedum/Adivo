//app/(dashboards)/admindash/tests/components/TestsTableFilters.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Types for your filter state
interface TestsTableFiltersProps {
  searchValue: string
  onSearchChange: (value: string) => void

  // 'all' can represent no filtering on published status
  publishedValue: "all" | "true" | "false"
  onPublishedChange: (value: "all" | "true" | "false") => void

  sortValue: "asc" | "desc"
  onSortChange: (value: "asc" | "desc") => void

  onApplyFilters: () => void
}

/**
 * Renders search input, a published filter, and a sort selector.
 * Calls onApplyFilters when the user wants to confirm all filter changes.
 */
export function TestsTableFilters({
  searchValue,
  onSearchChange,
  publishedValue,
  onPublishedChange,
  sortValue,
  onSortChange,
  onApplyFilters,
}: TestsTableFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Search input */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium" htmlFor="search">
          Search
        </label>
        <Input
          id="search"
          type="text"
          placeholder="Search tests by title"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Published filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium" htmlFor="published">
          Published
        </label>
        <Select
          value={publishedValue}
          onValueChange={(value: "all" | "true" | "false") => onPublishedChange(value)}
        >
          <SelectTrigger className="w-[120px]" id="published">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Published</SelectItem>
            <SelectItem value="false">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort selector */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium" htmlFor="sort">
          Sort
        </label>
        <Select
          value={sortValue}
          onValueChange={(value: "asc" | "desc") => onSortChange(value)}
        >
          <SelectTrigger className="w-[100px]" id="sort">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Apply filters button */}
      <Button variant="default" onClick={onApplyFilters}>
        Apply
      </Button>
    </div>
  )
}