import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  trend?: string
  loading?: boolean
  error?: boolean
}

export function StatsCard({
  title,
  value,
  description,
  trend,
  loading = false,
  error = false
}: StatsCardProps) {
  if (loading) {
    return <StatsCardSkeleton />
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-sm text-red-500">Failed to load data</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">{value}</h2>
          {trend && <span className="text-sm text-muted-foreground">{trend}</span>}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

function StatsCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-16 mt-2" />
        <Skeleton className="h-4 w-32 mt-2" />
      </CardContent>
    </Card>
  )
}