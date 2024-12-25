// app/(dashboard)/admin/tests/_components/client.tsx
"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { ApiList } from "@/components/ui/api-list"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { Test } from "@/types/tests/test"
import { Heading } from "@/components/ui/heading"

export const TestClient = () => {
  const router = useRouter()
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('/api/admin/tests')
        const data = await response.json()
        setTests(data.tests)
      } catch (error) {
        console.error('Error fetching tests:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTests()
  }, [])

  return (
    <>
      <div className="flex items-center justify-between">
        <Button onClick={() => router.push(`/admin/tests/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Test
        </Button>
      </div>
      <Separator className="my-4" />
      <DataTable
        columns={columns}
        data={tests}
        loading={loading}
        searchKey="title"
      />
      <Heading title="API" description="API calls for Tests" />
      <Separator className="my-4" />
      <ApiList entityName="tests" entityIdName="testId" />
    </>
  )
}