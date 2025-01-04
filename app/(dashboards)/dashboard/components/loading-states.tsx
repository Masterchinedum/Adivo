// app/(dashboards)/dashboard/components/loading-states.tsx

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function StatsCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-[100px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-[60px] mb-1" />
        <Skeleton className="h-4 w-[120px]" />
      </CardContent>
    </Card>
  )
}

export function TestProgressSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-[140px]" />
      </CardHeader>
      <CardContent className="space-y-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[160px]" />
              </div>
              <Skeleton className="h-8 w-[80px]" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function RecentActivitySkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-[140px]" />
      </CardHeader>
      <CardContent className="space-y-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="space-y-1">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[160px]" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function TestResultsChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-[140px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  )
}

export function NewTestsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-[140px]" />
      </CardHeader>
      <CardContent className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <Skeleton className="h-4 w-[200px] mb-2" />
                <Skeleton className="h-3 w-[300px]" />
              </div>
              <Skeleton className="h-8 w-[100px]" />
            </div>
            <div className="flex gap-2">
              {[...Array(2)].map((_, j) => (
                <Skeleton key={j} className="h-5 w-[80px]" />
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}