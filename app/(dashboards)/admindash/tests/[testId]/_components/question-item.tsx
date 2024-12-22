// app/(dashboards)/admindash/tests/[testId]/_components/question-item.tsx
"use client"

import { useState } from "react"
import { Pencil, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { QuestionType, QuestionTypeEnum } from "@/types/test"
import { toast } from "react-hot-toast"

interface QuestionItemProps {
  testId: string
  question: QuestionType
  onUpdate: (question: QuestionType) => void
  onDelete: (id: string) => void
}

export const QuestionItem = ({ testId, question, onUpdate, onDelete }: QuestionItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [text, setText] = useState(question.text)
  const [type, setType] = useState(question.type)

  const handleUpdate = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admindash/tests/${testId}/questions/${question.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, type })
      })

      if (!response.ok) throw new Error("Failed to update question")

      const updatedQuestion = await response.json()
      onUpdate(updatedQuestion)
      setIsEditing(false)
      toast.success("Question updated")
    } catch (error) {
      console.error(error)
      toast.error("Failed to update question")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admindash/tests/${testId}/questions/${question.id}`, {
        method: "DELETE"
      })

      if (!response.ok) throw new Error("Failed to delete question")

      onDelete(question.id)
      toast.success("Question deleted")
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete question")
    } finally {
      setIsLoading(false)
      setShowDeleteAlert(false)
    }
  }

  return (
    <Card className="p-4">
      {isEditing ? (
        <div className="space-y-4">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Question text"
            disabled={isLoading}
          />
          <Select
            value={type}
            onValueChange={(value: QuestionTypeEnum) => setType(value)}
            disabled={isLoading}
          >
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
          <div className="flex items-center gap-x-2">
            <Button 
              onClick={handleUpdate}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Save
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              variant="ghost"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{question.text}</p>
            <p className="text-sm text-muted-foreground">Type: {question.type}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <Button
              onClick={() => setIsEditing(true)}
              variant="ghost"
              size="sm"
              disabled={isLoading}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setShowDeleteAlert(true)}
              variant="ghost"
              size="sm"
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      )}

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this question.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}