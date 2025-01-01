//app/(test-taking)/tests/[testId]/components/TestDetails.tsx

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CategoryList } from "./CategoryList"
import { StartTestButton } from "./StartTestButton"
import type { Test } from "@/types/tests/test"
import type { TestAttempt } from "@/types/tests/test-attempt"

interface TestDetailsProps {
  test: Test
  attempts?: Pick<TestAttempt, 'id' | 'startedAt' | 'completedAt' | 'status' | 'totalScore' | 'percentageScore'>[]
}

export function TestDetails({ test, attempts = [] }: TestDetailsProps) {
  const lastAttempt = attempts[0];
  const canStartNewAttempt = !lastAttempt || 
    lastAttempt.status !== 'IN_PROGRESS';

  return (
    <div className="space-y-6">
      {/* Test Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{test.title}</h1>
        {test.description && (
          <p className="text-muted-foreground">{test.description}</p>
        )}
      </div>

      {/* Categories Overview */}
      <CategoryList categories={test.categories || []} />

      {/* Test Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Test Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Total Questions: {test._count?.questions ?? 0}</p>
          <p>Categories: {test.categories?.length ?? 0}</p>
        </CardContent>
      </Card>

      {/* Previous Attempts */}
      {/* {attempts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Attempts</CardTitle>
            <CardDescription>History of your previous attempts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {attempts.map((attempt) => (
              <div key={attempt.id} className="flex justify-between items-center">
                <div>
                  <p>Started: {new Date(attempt.startedAt).toLocaleDateString()}</p>
                  <p>Status: {attempt.status}</p>
                </div>
                {attempt.status === 'COMPLETED' && (
                  <div className="text-right">
                    <p>Score: {attempt.totalScore.toFixed(1)}</p>
                    <p>{attempt.percentageScore.toFixed(1)}%</p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )} */}

      {/* Start Test Button */}
      <StartTestButton 
        testId={test.id} 
        disabled={!canStartNewAttempt} 
      />
    </div>
  );
}
