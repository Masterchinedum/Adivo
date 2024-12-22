// app/(dashboards)/admindash/tests/[testId]/_components/test-actions.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" // Add this import
import { MoreHorizontal, Settings, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

interface TestActionsProps {
  testId: string
  isPublished: boolean
}

export const TestActions = ({ testId, isPublished }: TestActionsProps) => {
  const router = useRouter() // Add this line
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = async () => {
    try {
      setIsLoading(true)
      await fetch(`/api/admindash/tests/${testId}`, {
        method: "DELETE"
      })
      router.push("/admindash/tests")
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      setShowDeleteAlert(false)
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {}}
      >
        <Eye className="h-4 w-4 mr-2" />
        Preview
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => {}}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowDeleteAlert(true)}
            className="text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this test
              and remove all its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={isLoading}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}