import { useState } from "react"
import { Trash2, ChevronDown, ChevronUp, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { QuestionTypeEnum } from "@/types/test"

interface CategoryItemProps {
  category: {
    id: string
    title: string
    description?: string
    questions: Array<{
      id: string
      text: string
      type: QuestionTypeEnum
    }>
  }
  onUpdate: (data: Partial<CategoryItemProps['category']>) => void
  onRemove: () => void
}

export const CategoryItem = ({
  category,
  onUpdate,
  onRemove
}: CategoryItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          <Input
            placeholder="Category title"
            value={category.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="flex-1"
          />
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {isExpanded && (
          <div className="space-y-4 pl-8">
            <Textarea
              placeholder="Category description (optional)"
              value={category.description || ""}
              onChange={(e) => onUpdate({ description: e.target.value })}
              rows={3}
            />
          </div>
        )}
      </div>
    </Card>
  )
}