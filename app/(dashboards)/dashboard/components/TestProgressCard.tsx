"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface TestProgress {
  testId: string
  testTitle: string
  progress: number
  startedAt: string
}

export function TestProgressCard() {
  const [inProgress, setInProgress] = useState<TestProgress[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchInProgressTests() {
      try {
        const response = await fetch('/api/dashboard/tests/in-progress')
        if (!response.ok) throw new Error('Failed to fetch in-progress tests')
        const data = await response.json()
        setInProgress(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error fetching tests')
        console.error('Error fetching in-progress tests:', error)
      }
    }

    fetchInProgressTests()
  }, [])

  if (error) return <div>Error loading progress: {error}</div>
  if (!inProgress.length) return <div>No tests in progress</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>In Progress Tests</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {inProgress.map((test) => (
          <div key={test.testId} className="space-y-2">
            <div className="flex justify-between">
              <span>{test.testTitle}</span>
              <span>{test.progress}%</span>
            </div>
            <Progress value={test.progress} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}