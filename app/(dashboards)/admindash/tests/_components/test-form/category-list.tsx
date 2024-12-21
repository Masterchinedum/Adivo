"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryItem } from "./category-item"
import { QuestionTypeEnum } from "@/types/test"

interface Category {
  id: string
  title: string
  description?: string
  questions: Array<{
    id: string
    text: string
    type: QuestionTypeEnum
  }>
}

interface CategoryListProps {
  categories: Category[]
  onChange: (categories: Category[]) => void
}

export const CategoryList = ({ categories, onChange }: CategoryListProps) => {
  const addCategory = () => {
    const newCategory: Category = {
      id: `temp-${Date.now()}`,
      title: "",
      description: "",
      questions: []
    }
    onChange([...categories, newCategory])
  }

  const updateCategory = (id: string, data: Partial<Category>) => {
    onChange(
      categories.map(cat => 
        cat.id === id ? { ...cat, ...data } : cat
      )
    )
  }

  const removeCategory = (id: string) => {
    onChange(categories.filter(cat => cat.id !== id))
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
        {categories.map((category) => (
          <CategoryItem 
            key={category.id}
            category={category}
            onUpdate={(data) => updateCategory(category.id, data)}
            onRemove={() => removeCategory(category.id)}
          />
        ))}
      </div>
    </div>
  )
}