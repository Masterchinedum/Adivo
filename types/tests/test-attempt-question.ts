// types/tests/test-attempt-question.ts

export interface TestAttemptQuestion {
  id: string
  testAttemptId: string
  questionId: string
  question: {
    id: string
    title: string
    categoryId: string | null
    category?: {  // Add category information
      id: string
      name: string
    }
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

export interface TestAttemptQuestionsResponse {
  questions: TestAttemptQuestion[]
  totalQuestions: number
  answeredQuestions: number
}

export interface TestAttemptQuestionError {
  message: string
  errors?: Record<string, string[]>
}