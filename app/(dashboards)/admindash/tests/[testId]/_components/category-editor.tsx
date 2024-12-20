// app/(dashboards)/admindash/tests/[testId]/_components/category-editor.tsx
"use client"

import { useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryItem } from "./category-item"

interface CategoryEditorProps {
  testId: string
}

export const CategoryEditor = ({ testId }: CategoryEditorProps) => {
  const [categories, setCategories] = useState<string[]>([])

  const addCategory = () => {
    setCategories(prev => [...prev, `category-${prev.length}`])
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {categories.map((categoryId) => (
          <CategoryItem
            key={categoryId}
            testId={testId}
            categoryId={categoryId}
          />
        ))}
      </div>
      <Button
        onClick={addCategory}
        variant="outline"
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Category
      </Button>
    </div>
  )
}