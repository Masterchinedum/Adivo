// app/(test-taking)/tests/[testId]/attempt/[attemptId]/results/_components/ResultsSummary.tsx

interface ResultsSummaryProps {
    totalScore: number
    maxScore: number
    percentageScore: number
  }
  
  export function ResultsSummary({ totalScore, maxScore, percentageScore }: ResultsSummaryProps) {
    return (
      <div className="p-4 border rounded-lg">
        <h2 className="text-xl font-bold">Test Summary</h2>
        <p>Total Score: {totalScore} / {maxScore}</p>
        <p>Percentage: {percentageScore.toFixed(2)}%</p>
      </div>
    )
  }