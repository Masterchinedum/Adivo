// app/(test-taking)/tests/[testId]/attempt/[attemptId]/results/_components/CategoryScores.tsx

import { CategoryScore } from "@/types/tests/test-attempt"

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
                {/* {score.category.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {score.category.description}
                  </p>
                )} */}
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">
                  {(score.actualScore / score.maxScale * 100).toFixed(1)}%
                </span>
              </div>
            </div>
{/* 
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-2 rounded bg-secondary/20">
                <span className="text-muted-foreground">Raw Score</span>
                <p className="font-medium mt-1">
                  {score.rawScore} / {score.maxRawScore}
                </p>
              </div>
              <div className="p-2 rounded bg-secondary/20">
                <span className="text-muted-foreground">Scaled Score</span>
                <p className="font-medium mt-1">
                  {score.actualScore} / {score.maxScale}
                </p>
              </div>
            </div> */}

            <div className="relative pt-2">
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-500 ease-in-out"
                  style={{ 
                    width: `${(score.actualScore / score.maxScale * 100)}%`
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}