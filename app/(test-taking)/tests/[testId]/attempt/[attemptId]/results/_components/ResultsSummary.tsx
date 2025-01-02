// app/(test-taking)/tests/[testId]/attempt/[attemptId]/results/_components/ResultsSummary.tsx

interface ResultsSummaryProps {
  totalScore: number
  maxScore: number
  percentageScore: number
}

export function ResultsSummary({ totalScore, maxScore, percentageScore }: ResultsSummaryProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Test Results Summary</h2>
      <div className="mt-4 space-y-2">
        <p className="text-4xl font-bold text-primary">
          {percentageScore.toFixed(1)}%
        </p>
        <p className="text-muted-foreground">
          Score: {totalScore.toFixed(1)} / {maxScore}
        </p>
      </div>
    </div>
  )
}