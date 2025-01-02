// types/tests/test-attempt-question.ts

export interface TestAttemptQuestion {
  id: string
  testAttemptId: string
  questionId: string
  question: {
    id: string
    title: string
    categoryId: string | null
    category?: {  // Change this to accept null
      id: string
      name: string
    } | null     // Add null as possible type
    options: {
      id: string
      text: string
      point: number
    }[]
  }
  selectedOptionId: string | null
  isAnswered: boolean
  createdAt: Date
  updatedAt: Date
}

export interface SubmitAnswerResponse {
  success: boolean
  pointsEarned?: number
  maxPoints?: number
  error?: string
}

export interface TestAttemptQuestionsResponse {
  questions: TestAttemptQuestion[]
  totalQuestions: number
  answeredQuestions: number
}

export interface TestAttemptQuestionError {
  message: string
  errors?: Record<string, string[]>
}