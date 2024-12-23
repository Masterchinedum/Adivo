"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Pencil, Trash2, CheckCircle, XCircle } from "lucide-react"
import { TestType } from "@/types/test"

export default function TestList() {
  const router = useRouter()
  const [tests, setTests] = useState<TestType[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    fetchTests()
  }, [])

  // Fetch tests
  const fetchTests = async () => {
    try {
      const response = await fetch('/api/admin/tests')
      const data = await response.json()
      setTests(data)
    } catch (error) {
      console.error('Error fetching tests:', error)
      setError('Failed to load tests')
    } finally {
      setLoading(false)
    }
  }

  // Handle test deletion
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/tests/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete test')
      
      await fetchTests() // Refresh the list
      setDeleteId(null)
    } catch (err) {
      setErrorMessage('Failed to delete test')
    }
  }

  // Handle test publish/unpublish
  const handlePublishToggle = async (id: string, currentState: boolean) => {
    try {
      const response = await fetch(`/api/admin/tests/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isPublished: !currentState,
        }),
      })

      if (!response.ok) throw new Error('Failed to update test')
      
      await fetchTests() // Refresh the list
    } catch (error) {
      setError('Failed to update test status')
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Questions</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tests.map((test) => (
            <TableRow key={test.id}>
              <TableCell className="font-medium">{test.title}</TableCell>
              <TableCell>
                <Badge variant={test.isPublished ? "default" : "secondary"}>
                  {test.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell>{test.questions?.length || 0} questions</TableCell>
              <TableCell>{new Date(test.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push(`/admindash/tests/${test.id}`)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handlePublishToggle(test.id, test.isPublished)}
                >
                  {test.isPublished ? 
                    <XCircle className="h-4 w-4" /> :
                    <CheckCircle className="h-4 w-4" />
                  }
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteId(test.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {tests.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No tests found. Create your first test to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the test
              and all its questions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

function setError(arg0: string) {
  throw new Error("Function not implemented.")
}
