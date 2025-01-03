// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/QuestionPicker.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

interface Question {
  id: string
  categoryId: string
  number: number
  isAnswered: boolean
}

interface Category {
  id: string
  name: string
  questions: Question[]
}

interface QuestionPickerProps {
  categories: Category[]
  currentQuestionId: string
  onQuestionSelect: (questionId: string) => void
}

export function QuestionPicker({
  categories,
  currentQuestionId,
  onQuestionSelect,
}: QuestionPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const QuestionGrid = React.memo(function QuestionGrid({ className }: { className?: string }) {
    return (
      <div className={cn("space-y-6", className)}>
        {categories.map((category) => (
          <div key={category.id}>
            <h3 className="font-medium mb-3">{category.name}</h3>
            <div className="grid grid-cols-5 gap-2">
              {category.questions.map((question) => (
                <button
                  key={question.id}
                  onClick={() => {
                    onQuestionSelect(question.id)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "h-10 text-sm border rounded-md transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    question.isAnswered && "bg-primary/10 border-primary/20",
                    currentQuestionId === question.id && "ring-2 ring-primary",
                  )}
                >
                  {question.number}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  })

  return (
    <>
      {/* Mobile View */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed bottom-20 right-4 z-50 rounded-full shadow-lg"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle>Questions</SheetTitle>
          </SheetHeader>
          <QuestionGrid className="mt-6 pb-20" />
        </SheetContent>
      </Sheet>

      {/* Desktop View */}
      <div className="hidden md:block w-[300px] h-[calc(100vh-4rem)] overflow-y-auto border-r bg-white p-6">
        <QuestionGrid />
      </div>
    </>
  )
}