// app/(dashboards)/admindash/tests/components/TestsTableColumns.tsx

import { ColumnDef } from "@tanstack/react-table"
import type { Test } from "@/types/tests/test"
import { Badge } from "@/components/ui/badge"

export const testsTableColumns: ColumnDef<Test>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      // Safely cast to string or handle undefined
      const titleValue = row.getValue("title") as string | undefined
      return titleValue ?? ""
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      // Safely cast to string or handle undefined
      const descriptionValue = row.getValue("description") as string | undefined
      if (!descriptionValue) {
        return ""
      }
      // Truncate if description is longer than 50 characters
      return descriptionValue.length > 50
        ? `${descriptionValue.slice(0, 50)}...`
        : descriptionValue
    },
  },
  {
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ row }) => {
      // Handle boolean for published status
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
      // createdAt can be string or Date - handle accordingly
      const rawDate = row.getValue("createdAt") as string | Date | null | undefined
      if (!rawDate) {
        return "N/A"
      }

      // Convert string into Date if necessary
      const dateObj = typeof rawDate === "string" ? new Date(rawDate) : rawDate
      return dateObj.toLocaleDateString()
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      // Access the entire row via row.original
      const testItem = row.original
      return (
        <div className="flex gap-2">
          <a 
            href={`/admindash/tests/${testItem.id}`} 
            className="underline text-sm"
          >
            Edit
          </a>
        </div>
      )
    },
  },
]