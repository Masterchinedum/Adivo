// app/(dashboards)/admindash/tests/_components/test-form/question-item.tsx
"use client"

import { GripVertical, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface QuestionItemProps {
  id: string
}

export const QuestionItem = ({ id }: QuestionItemProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <GripVertical className="h-5 w-5 text-slate-400" />
          <div className="flex-1 space-y-4">
            <Input placeholder="Question text" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
                <SelectItem value="scale">Scale</SelectItem>
                <SelectItem value="text">Text</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}