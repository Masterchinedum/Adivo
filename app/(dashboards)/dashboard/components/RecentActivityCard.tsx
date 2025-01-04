"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface Activity {
  id: string
  testTitle: string
  status: string
  completedAt?: string
  score?: number
}

export function RecentActivityCard() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchActivity() {
      try {
        const response = await fetch('/api/dashboard/activity')
        if (!response.ok) throw new Error('Failed to fetch recent activity')
        const data = await response.json()
        setActivities(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error fetching activity')
        console.error('Error fetching recent activity:', error)
      }
    }

    fetchActivity()
  }, [])

  if (error) return <div>Error loading activity: {error}</div>
  if (!activities.length) return <div>No recent activity</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{activity.testTitle}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.status === 'COMPLETED' 
                    ? `Completed with ${activity.score}%`
                    : 'In Progress'}
                </p>
              </div>
              {activity.completedAt && (
                <time className="text-sm text-muted-foreground">
                  {new Date(activity.completedAt).toLocaleDateString()}
                </time>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}