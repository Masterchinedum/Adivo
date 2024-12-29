// app/tests/components/TestSearch.tsx
"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface TestSearchProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

export function TestSearch({ value, onChange, onSearch }: TestSearchProps) {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Search tests..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <Button onClick={onSearch} type="submit" size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
}