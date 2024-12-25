// app/(dashboards)/admindash/tests/components/TestHeader.tsx

import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

interface TestHeaderProps {
  title: string
  description?: string
  showAddButton?: boolean
}

export function TestHeader({
  title,
  description,
  showAddButton = true,
}: TestHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {showAddButton && (
        <Link href="/admindash/tests/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Test
          </Button>
        </Link>
      )}
    </div>
  )
}