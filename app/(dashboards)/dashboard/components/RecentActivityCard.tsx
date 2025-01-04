// app/(dashboards)/dashboard/components/RecentActivityCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Activity {
  id: string
  type: 'completed' | 'started'
  testName: string
  timestamp: string
  score?: number
}

interface RecentActivityCardProps {
  activities: Activity[]
}

export function RecentActivityCard({ activities }: RecentActivityCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.testName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.type === 'completed' ? 'Completed' : 'Started'} - {activity.timestamp}
                  {activity.score && ` - Score: ${activity.score}%`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}