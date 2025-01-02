// app/(test-taking)/tests/[testId]/attempt/[attemptId]/results/_components/CategoryScores.tsx

import type { CategoryScore } from "@/types/tests/test-attempt"

interface CategoryScoresProps {
  categoryScores: CategoryScore[]
}

export function CategoryScores({ categoryScores }: CategoryScoresProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Category Breakdown</h2>
      <div className="space-y-4">
        {categoryScores.map((score) => (
          <div key={score.categoryId} className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{score.category.name}</h3>
              <span className="text-sm text-muted-foreground">
                {(score.actualScore / score.maxScale * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Raw Score: {score.rawScore} / {score.maxRawScore}</span>
              <span>Scaled Score: {score.actualScore} / {score.maxScale}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}