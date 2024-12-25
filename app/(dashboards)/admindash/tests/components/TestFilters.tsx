// app/(dashboards)/admindash/tests/components/TestFilters.tsx
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function TestFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") || "")

  const createQueryString = (params: Record<string, string | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        current.delete(key)
      } else {
        current.set(key, value)
      }
    })

    return current.toString()
  }

  const onSearch = () => {
    const query = createQueryString({
      search: search || null,
      page: "1",
    })
    router.push(`/admindash/tests?${query}`)
  }

  const onStatusChange = (value: string) => {
    const query = createQueryString({
      isPublished: value,
      page: "1",
    })
    router.push(`/admindash/tests?${query}`)
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search tests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[250px]"
        />
        <Button onClick={onSearch}>Search</Button>
      </div>
      <Select
        onValueChange={onStatusChange}
        defaultValue={searchParams.get("isPublished") || ""}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All</SelectItem>
          <SelectItem value="true">Published</SelectItem>
          <SelectItem value="false">Draft</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}