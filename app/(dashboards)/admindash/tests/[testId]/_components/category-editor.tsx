// app/(dashboards)/admindash/tests/[testId]/_components/category-editor.tsx
"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryItem } from "./category-item"
import { CategoryType } from "@/types/test"

interface CategoryEditorProps {
  testId: string
  initialCategories: CategoryType[]
}

export const CategoryEditor = ({ testId, initialCategories }: CategoryEditorProps) => {
  const [categories, setCategories] = useState<CategoryType[]>(initialCategories)

  const addCategory = async () => {
    try {
      const response = await fetch(`/api/admindash/tests/${testId}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "New Category",
          description: ""
        })
      })

      if (!response.ok) throw new Error("Failed to create category")
      
      const newCategory = await response.json()
      setCategories([...categories, newCategory])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Categories</h3>
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
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            testId={testId}
            category={category}
            onUpdate={(updatedCategory) => {
              setCategories(categories.map(cat => 
                cat.id === updatedCategory.id ? updatedCategory : cat
              ))
            }}
            onDelete={(deletedId) => {
              setCategories(categories.filter(cat => cat.id !== deletedId))
            }}
          />
        ))}
      </div>
    </div>
  )
}