import { Skeleton } from "@/components/ui/skeleton"

export function StatsCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground">
      <div className="p-6 flex flex-col space-y-2">
        <Skeleton className="h-4 w-24" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  )
}