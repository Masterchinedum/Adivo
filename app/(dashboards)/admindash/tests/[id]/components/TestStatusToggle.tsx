// app/(dashboards)/admindash/tests/[id]/components/TestStatusToggle.tsx
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface TestStatusToggleProps {
  testId: string
  isPublished: boolean
}

export function TestStatusToggle({ testId, isPublished }: TestStatusToggleProps) {
  const router = useRouter()
  const [isPending, setIsPending] = React.useState<boolean>(false)
  const [status, setStatus] = React.useState<boolean>(isPublished)

  async function onToggle() {
    setIsPending(true)
    try {
      const response = await fetch(`/api/admin/tests/${testId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: testId,
          isPublished: !status,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update test status")
      }

      setStatus(!status)
      toast.success(`Test ${!status ? "published" : "unpublished"} successfully`)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="test-status"
        checked={status}
        onCheckedChange={onToggle}
        disabled={isPending}
      />
      <Label htmlFor="test-status">
        {isPending ? "Updating..." : status ? "Published" : "Draft"}
      </Label>
    </div>
  )
}