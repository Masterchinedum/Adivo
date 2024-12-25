// app/(dashboards)/admindash/tests/components/TestsHeader.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface TestsHeaderProps {
  title: string
  description: string

  // Optionally show a 'Create New Test' button
  showCreateButton?: boolean
  createButtonHref?: string

  // Optionally show overall stats
  totalTests?: number
  pageDescription?: string
}

/**
 * Renders a page header with a title, description, optional create button, and optional stats.
 */
export function TestsHeader({
  title,
  description,
  showCreateButton = false,
  createButtonHref = "/admindash/tests/new",
  totalTests,
  pageDescription,
}: TestsHeaderProps) {
  return (
    <header className="space-y-4 border-b pb-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="font-heading text-3xl">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
          {pageDescription && (
            <p className="text-xs text-muted-foreground">{pageDescription}</p>
          )}
        </div>
        {showCreateButton && (
          <Button asChild>
            <Link href={createButtonHref}>
              Create New Test
            </Link>
          </Button>
        )}
      </div>
      {typeof totalTests === "number" && (
        <div className="text-sm text-muted-foreground">
          Total Tests: {totalTests}
        </div>
      )}
    </header>
  )
}