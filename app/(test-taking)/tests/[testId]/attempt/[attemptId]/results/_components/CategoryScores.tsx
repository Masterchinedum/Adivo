// app/(test-taking)/tests/[testId]/attempt/[attemptId]/results/_components/CategoryScores.tsx

import type { CategoryScore } from "@/types/tests/test-attempt"

interface CategoryScoresProps {
  categoryScores: CategoryScore[]
}

export function CategoryScores({ categoryScores }: CategoryScoresProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Category Scores</h2>
      <ul className="space-y-2">
        {categoryScores.map((score) => (
          <li key={score.categoryId} className="flex justify-between">
            <span>{score.category.name}</span>
            <span>{score.rawScore} / {score.maxRawScore} ({score.scaledScore.toFixed(2)} / {score.maxScale})</span>
          </li>
        ))}
      </ul>
    </div>
  )
}