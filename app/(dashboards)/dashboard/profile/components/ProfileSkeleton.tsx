//app/(dashboards)/dashboard/profile/components/ProfileSkeleton.tsx

"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-6 pb-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </div>
        <Skeleton className="h-[1px] w-full" />
      </div>

      {/* Form Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-[140px] mb-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Date of Birth field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Gender field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-[80px]" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-[120px]" />
              <Skeleton className="h-6 w-[120px]" />
            </div>
          </div>

          {/* Relationship Status field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-[140px]" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Country field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Bio field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-[60px]" />
            <Skeleton className="h-[120px] w-full" />
          </div>

          {/* Button */}
          <Skeleton className="h-10 w-[120px]" />
        </CardContent>
      </Card>
    </div>
  )
}