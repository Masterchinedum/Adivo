// app/(dashboards)/admindash/tests/[testId]/_components/category-item.tsx
"use client"

import { useState } from "react"
import { Pencil, GripVertical, ChevronDown, ChevronRight, Trash2, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface CategoryItemProps {
  testId: string
  categoryId: string
}

export const CategoryItem = ({ testId, categoryId }: CategoryItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [title, setTitle] = useState("Untitled Category")
  const [description, setDescription] = useState("")
  const [questions, setQuestions] = useState<string[]>([])

  const onDelete = async () => {
    try {
      // TODO: Implement delete functionality
      setShowDeleteAlert(false)
    } catch (error) {
      console.error(error)
    }
  }

  const onSave = async () => {
    try {
      // TODO: Implement save functionality
      setIsEditing(false)
    } catch (error) {
      console.error(error)
    }
  }

  const addQuestion = () => {
    setQuestions(prev => [...prev, `question-${prev.length}`])
  }

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-center gap-x-2">
          <GripVertical className="h-5 w-5 text-slate-400" />
          <div
            className="flex-1 flex items-center gap-x-2 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
            <span className="font-semibold">{title}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <Button
              onClick={() => setIsEditing(true)}
              variant="ghost"
              size="sm"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setShowDeleteAlert(true)}
              variant="ghost"
              size="sm"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <CardContent className="border-t pt-4">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Category title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Category description"
                />
              </div>
              <div className="flex items-center gap-x-2">
                <Button onClick={onSave}>
                  Save Changes
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
              
              {/* Questions Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Questions</h3>
                  <Button
                    onClick={addQuestion}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>
                {questions.map((questionId) => (
                  <QuestionItem
                    key={questionId}
                    questionId={questionId}
                    categoryId={categoryId}
                    testId={testId}
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete this category and all its questions. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

interface QuestionItemProps {
  questionId: string
  categoryId: string
  testId: string
}

const QuestionItem = ({ questionId, categoryId, testId }: QuestionItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState("Untitled Question")
  const [type, setType] = useState("multiple_choice")

  const onSave = async () => {
    try {
      // TODO: Implement save functionality
      setIsEditing(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-x-2">
          <GripVertical className="h-5 w-5 text-slate-400" />
          {isEditing ? (
            <div className="flex-1 space-y-4">
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Question text"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="multiple_choice">Multiple Choice</option>
                <option value="checkbox">Checkbox</option>
                <option value="scale">Scale</option>
                <option value="text">Text</option>
              </select>
              <div className="flex items-center gap-x-2">
                <Button onClick={onSave} size="sm">
                  Save
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1">
                <p>{text}</p>
                <p className="text-sm text-muted-foreground">Type: {type}</p>
              </div>
              <Button
                onClick={() => setIsEditing(true)}
                variant="ghost"
                size="sm"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}