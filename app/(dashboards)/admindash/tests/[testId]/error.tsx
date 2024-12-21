"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        <AlertTriangle className="h-10 w-10 text-destructive" />
        <h2 className="text-xl font-semibold">Something went wrong!</h2>
        <div className="flex items-center gap-2">
          <Button onClick={reset} variant="outline">
            Try again
          </Button>
          <Button asChild variant="ghost">
            <Link href="/admindash/tests">
              Go back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}