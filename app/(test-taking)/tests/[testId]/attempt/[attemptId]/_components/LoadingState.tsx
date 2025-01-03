// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/LoadingState.tsx
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white border-b">
        <div className="container max-w-7xl mx-auto py-4 px-4">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
          <div className="grid gap-2 mt-4">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-full" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container max-w-7xl mx-auto p-6">
        {/* Category Tabs Skeleton */}
        <div className="flex gap-2 overflow-x-auto pb-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={`cat-${i}`} className="h-12 w-32 flex-shrink-0" />
          ))}
        </div>

        {/* Questions Skeleton */}
        <div className="mt-6 space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`q-${i}`} className="bg-white rounded-lg border p-6 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, j) => (
                  <Skeleton key={`opt-${i}-${j}`} className="h-12 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="container max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  )
}