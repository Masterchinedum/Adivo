// app/(dashboards)/admindash/tests/_components/test-form/category-item.tsx
"use client"

import { useState } from "react"
import { GripVertical, ChevronDown, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { QuestionList } from "./question-list"

interface CategoryItemProps {
  id: string
}

export const CategoryItem = ({ id }: CategoryItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card>
      <div 
        className="flex items-center p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <GripVertical className="h-5 w-5 text-slate-400 mr-4" />
        <div className="flex-1">Category Name</div>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
      </div>
      
      {isExpanded && (
        <CardContent className="p-4 space-y-4">
          <div className="space-y-4">
            <Input placeholder="Category Title" />
            <Textarea placeholder="Category Description" />
          </div>
          <QuestionList categoryId={id} />
        </CardContent>
      )}
    </Card>
  )
}