// app/(dashboards)/admindash/tests/_components/test-form/category-list.tsx
"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryItem } from "./category-item"

export const CategoryList = () => {
  const [categories, setCategories] = useState<string[]>([])

  const addCategory = () => {
    setCategories(prev => [...prev, `category-${prev.length}`])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Categories</h3>
        <Button 
          onClick={addCategory} 
          variant="outline" 
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="space-y-4">
        {categories.map((id) => (
          <CategoryItem key={id} id={id} />
        ))}
      </div>
    </div>
  )
}