// app/(test-taking)/tests/[testId]/attempt/[attemptId]/results/_components/QuestionReview.tsx

import type { QuestionResponse } from "@/types/tests/test-attempt"

interface QuestionReviewProps {
  responses: QuestionResponse[]
}

export function QuestionReview({ responses }: QuestionReviewProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Question Review</h2>
      <ul className="space-y-4">
        {responses.map((response) => (
          <li key={response.questionId} className="border p-4 rounded-lg">
            <h3 className="font-semibold">{response.question.title}</h3>
            <p>Selected Option: {response.selectedOption.text}</p>
            <p>Points Earned: {response.pointsEarned} / {response.maxPoints}</p>
            <p>Correct: {response.isCorrect ? "Yes" : "No"}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}