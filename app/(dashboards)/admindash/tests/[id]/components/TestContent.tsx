// app/(dashboards)/admindash/tests/[id]/components/TestContent.tsx
"use client"

import { TestEditForm } from "./TestEditForm"
import { TestDeleteAlert } from "./TestDeleteAlert"
import { TestStatusToggle } from "./TestStatusToggle"
import type { Test } from "@/types/tests/test"

interface TestContentProps {
  test: Test
}

export function TestContent({ test }: TestContentProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <TestStatusToggle
          testId={test.id}
          isPublished={test.isPublished}
        />
        <TestDeleteAlert
          testId={test.id}
          testTitle={test.title}
        />
      </div>

      <TestEditForm test={test} />
    </>
  )
}