// app/(dashboards)/admindash/tests/[testId]/_components/error-state.tsx
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export const ErrorState = ({ 
  message = "Something went wrong", 
  onRetry 
}: ErrorStateProps) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <p className="text-sm text-muted-foreground">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm">
            Try again
          </Button>
        )}
      </div>
    </div>
  )
}