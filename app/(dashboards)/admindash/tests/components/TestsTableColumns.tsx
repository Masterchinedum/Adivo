// app/(dashboards)/admindash/tests/components/TestsTableColumns.tsx

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import type { Test } from "@/types/tests/test"

export const testsTableColumns: ColumnDef<Test>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string
      return <span>{title}</span>
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const desc = (row.getValue("description") as string) || ""
      const truncated = desc.length > 50 ? `${desc.slice(0, 50)}...` : desc
      return <span>{truncated}</span>
    },
  },
  {
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ row }) => {
      const published = row.getValue("isPublished") as boolean
      return published ? (
        <Badge variant="default">Published</Badge>
      ) : (
        <Badge variant="secondary">Draft</Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      // Parse the date string to a Date object
      const dateStr = row.getValue("createdAt") as string
      const dateValue = new Date(dateStr)
      
      // Format the date, with error handling
      try {
        return <span>{dateValue.toLocaleDateString()}</span>
      } catch (error) {
        console.error("Error formatting date:", error)
        return <span>Invalid date</span>
      }
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const testId = row.original.id
      return (
        <div className="flex gap-2">
          <a className="underline text-sm" href={`/admindash/tests/${testId}`}>
            Edit
          </a>
          {/* Add other actions (Delete, View, etc.) here if needed */}
        </div>
      )
    },
  },
]