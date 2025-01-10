// app/(test-taking)/tests/[testId]/attempt/[attemptId]/results/_components/CategoryScores.tsx

import { CategoryScore } from "@/types/tests/test-attempt"
import { Progress } from "@/components/ui/progress"

interface CategoryScoresProps {
  categoryScores: CategoryScore[]
}

export function CategoryScores({ categoryScores }: CategoryScoresProps) {
  return (
    <div className="p-6 border rounded-lg bg-card">
      <h2 className="text-xl font-bold mb-6">Category Breakdown</h2>
      <div className="grid gap-6">
        {categoryScores.map((score) => (
          <div 
            key={score.categoryId} 
            className="p-4 space-y-4 rounded-lg border bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{score.category.name}</h3>
                {score.category.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {score.category.description}
                  </p>
                )}
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">
                  {(score.actualScore / score.maxScale * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <Progress 
              value={(score.actualScore / score.maxScale * 100)} 
              className="h-2"
            />
          </div>
        ))}
      </div>
    </div>
  )
}