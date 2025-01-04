// app/(dashboards)/dashboard/components/TestResultsChart.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState, useEffect } from "react"

interface TestResult {
  date: string
  score: number
  testTitle?: string
}

export function TestResultsChart() {
  const [data, setData] = useState<TestResult[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTestResults() {
      try {
        const response = await fetch('/api/dashboard/results')
        if (!response.ok) throw new Error('Failed to fetch test results')
        const data = await response.json()
        setData(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error fetching results')
        console.error('Error fetching test results:', error)
      }
    }

    fetchTestResults()
  }, [])

  if (error) return <div>Error loading chart: {error}</div>
  if (!data.length) return <div>No test results available</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number) => [`${value}%`, 'Score']}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#2563eb"
                strokeWidth={2}
                dot={{
                  stroke: '#2563eb',
                  strokeWidth: 2,
                  r: 4,
                  fill: '#fff'
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}