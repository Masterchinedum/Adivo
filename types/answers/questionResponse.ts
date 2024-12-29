// types/answers/questionResponse.ts
export interface QuestionResponse {
  id: string
  testAttemptId: string
  questionId: string
  selectedOptionId: string
  pointsEarned: number
  maxPoints: number
  createdAt: Date
  updatedAt: Date
}