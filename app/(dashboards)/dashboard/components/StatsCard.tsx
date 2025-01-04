import { StatsCardSkeleton } from "./StatsCardSkeleton"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  trend?: string
  loading?: boolean
}

export function StatsCard({
  title,
  value,
  description,
  trend,
  loading = false
}: StatsCardProps) {
  if (loading) {
    return <StatsCardSkeleton />
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground">
      <div className="p-6 flex flex-col space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">{value}</h2>
          {trend && <span className="text-sm text-muted-foreground">{trend}</span>}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}