// app/(dashboards)/admindash/tests/components/TestsTableColumns.tsx

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import type { Test } from "@/types/tests/test"

export const testsTableColumns: ColumnDef<Test>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      // Safely retrieve the title as a string
      const title = row.getValue("title") as string
      return <span>{title}</span>
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      // Safely retrieve the description as a string or empty if undefined
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
      // Retrieve createdAt which is a Date in the Test interface
      const dateValue = row.getValue("createdAt") as Date
      return <span>{dateValue.toLocaleDateString()}</span>
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