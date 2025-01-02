// app/(test-taking)/tests/[testId]/attempt/[attemptId]/results/_components/ResultsSummary.tsx

interface ResultsSummaryProps {
  totalScore: number
  maxScore: number
  percentageScore: number
}

export function ResultsSummary({ totalScore, maxScore, percentageScore }: ResultsSummaryProps) {
  return (
    <div className="p-6 border rounded-lg bg-card">
      <h2 className="text-xl font-bold mb-4">Overall Results</h2>
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary">
            {percentageScore.toFixed(1)}%
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Overall Score
          </p>
        </div>
        <div className="text-center text-muted-foreground">
          Total Points: {totalScore.toFixed(1)} / {maxScore}
        </div>
      </div>
    </div>
  )
}