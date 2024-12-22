// app/(dashboards)/admindash/tests/[testId]/_components/category-item.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Pencil, ChevronDown, ChevronRight, Trash2, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { CategoryType } from "@/types/test"
import { QuestionList } from "./question-list"
import { toast } from "react-hot-toast"

interface CategoryItemProps {
  testId: string
  category: CategoryType
  onUpdate: (category: CategoryType) => void
  onDelete: (id: string) => void
}

export const CategoryItem = ({ testId, category, onUpdate, onDelete }: CategoryItemProps) => {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [title, setTitle] = useState(category.title)
  const [description, setDescription] = useState(category.description || "")

  const handleUpdate = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admindash/tests/${testId}/categories/${category.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
      })

      if (!response.ok) throw new Error("Failed to update category")

      const updatedCategory = await response.json()
      onUpdate(updatedCategory)
      setIsEditing(false)
      toast.success("Category updated")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Failed to update category")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admindash/tests/${testId}/categories/${category.id}`, {
        method: "DELETE"
      })

      if (!response.ok) throw new Error("Failed to delete category")

      onDelete(category.id)
      toast.success("Category deleted")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete category")
    } finally {
      setIsLoading(false)
      setShowDeleteAlert(false)
    }
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-x-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1"
          disabled={isLoading}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {isEditing ? (
          <div className="flex-1 space-y-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Category title"
              disabled={isLoading}
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Category description"
              disabled={isLoading}
            />
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
          <>
            <div className="flex-1">
              <h4 className="font-semibold">{category.title}</h4>
              {category.description && (
                <p className="text-sm text-muted-foreground">{category.description}</p>
              )}
            </div>
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
          </>
        )}
      </div>

      {isExpanded && (
        <div className="mt-4 pl-6">
          <QuestionList 
            testId={testId}
            categoryId={category.id}
            questions={category.questions}
          />
        </div>
      )}

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this category and all its questions.
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