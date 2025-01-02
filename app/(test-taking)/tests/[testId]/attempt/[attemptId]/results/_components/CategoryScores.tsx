// app/(test-taking)/tests/[testId]/attempt/[attemptId]/results/_components/CategoryScores.tsx

import { CategoryScore } from "@/types/tests/test-attempt"

interface CategoryScoresProps {
  categoryScores: CategoryScore[]
}

export function CategoryScores({ categoryScores }: CategoryScoresProps) {
  return (
    <div className="p-6 border rounded-lg bg-card">
      <h2 className="text-xl font-bold mb-4">Category Breakdown</h2>
      <div className="space-y-4">
        {categoryScores.map((score) => (
          <div key={score.categoryId} className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{score.category.name}</h3>
              <span className="text-sm">
                {(score.actualScore / score.maxScale * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Raw Score: {score.rawScore} / {score.maxRawScore}</span>
              <span>Scaled Score: {score.actualScore} / {score.maxScale}</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all"
                style={{ 
                  width: `${(score.actualScore / score.maxScale * 100)}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}