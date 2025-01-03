//app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/LoadingState.tsx

import { Skeleton } from "@/components/ui/skeleton"

export function LoadingState() {
  return (
    <div className="grid grid-cols-[300px_1fr] h-screen">
      <div className="border-r p-4">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      </div>
      <main className="p-6">
        <Skeleton className="h-8 w-full mb-6" />
        <Skeleton className="h-[300px] w-full" />
      </main>
    </div>
  )
}