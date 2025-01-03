// app/(test-taking)/tests/components/RecentlyTakenTests.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { TestAttempt } from "@/types/tests/test-attempt"

interface RecentlyTakenTestsProps {
  attempts: TestAttempt[]
}

export function RecentlyTakenTests({ attempts }: RecentlyTakenTestsProps) {
  if (!attempts.length) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recent Results</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {attempts.map((attempt) => (
          <div key={attempt.id} className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{attempt.test.title}</h4>
              <p className="text-sm text-muted-foreground">
                Completed {new Date(attempt.completedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={attempt.percentageScore >= 70 ? "success" : "secondary"}>
                {Math.round(attempt.percentageScore)}%
              </Badge>
              <Link 
                href={`/tests/${attempt.test.id}/attempt/${attempt.id}/results`}
                className="text-sm underline"
              >
                View Results
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}