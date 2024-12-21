// app/(dashboards)/admindash/tests/_components/tests-header.tsx
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export const TestsHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold">Tests</h1>
        <p className="text-sm text-muted-foreground">
          Create and manage your relationship assessment tests
        </p>
      </div>
      <Button asChild>
        <Link href="/admindash/tests/create">
          <Plus className="h-4 w-4 mr-2" />
          Create Test
        </Link>
      </Button>
    </div>
  )
}