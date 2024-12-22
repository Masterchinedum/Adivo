// app/(dashboards)/admindash/tests/page.tsx

import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import TestList from "./components/test-list"

export const metadata: Metadata = {
  title: "Test Management",
  description: "Manage assessment tests",
}

export default async function TestsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tests</h1>
          <p className="text-muted-foreground">
            Manage and create assessment tests
          </p>
        </div>

        <Link href="/admindash/tests/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Test
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border bg-card">
          <TestList />
        </div>
      </div>
    </div>
  )
}