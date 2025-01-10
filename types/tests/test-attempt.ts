// types/tests/test-attempt.ts

import { Test } from "./test"
import { Question } from "./question"
import { Option } from "./option"
import { Category } from "./category"

export type TestStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED'

export interface QuestionResponse {
  id: string
  testAttemptId: string
  questionId: string
  selectedOptionId: string
  pointsEarned: number
  maxPoints: number
  question: Question
  selectedOption: Option
  createdAt: Date
  updatedAt: Date
}

export interface CategoryScore {
  id: string
  testAttemptId: string
  categoryId: string
  actualScore: number
  maxScale: number
  rawScore: number
  maxRawScore: number
  scaledScore: number
  category: Category
  createdAt: Date
  updatedAt: Date
}

export interface TestAttempt {
  id: string
  userId: string
  testId: string
  startedAt: Date
  completedAt: Date | null
  status: TestStatus
  totalScore: number | null
  percentageScore: number | null
  test?: Test
  responses?: QuestionResponse[]
  categoryScores?: CategoryScore[]
  createdAt?: Date
  updatedAt?: Date
}

export interface TestAttemptResult {
  test?: {
    name: string
  }
  totalScore: number
  maxScore: number
  percentageScore: number
  categoryScores: CategoryScore[]
  responses: QuestionResponse[]
}

export interface TestAttemptResponse {
  testAttempt: TestAttempt
}

export interface TestAttemptsResponse {
  testAttempts: TestAttempt[]
  totalAttempts: number
  currentPage: number
  totalPages: number
}

export interface TestAttemptError {
  message: string
  errors?: Record<string, string[]>
}

export interface CreateTestAttemptInput {
  testId: string
}

export interface TestAttemptApiResponse {
  testAttempt: {
    id: string
    testId: string
    userId: string
    startedAt: Date
    status: TestStatus
  }
}

export interface CategoryCompletion {
  categoryId: string
  rawScore: number
  maxRawScore: number
  scaledScore: number
  maxScale: number
}

export interface TestCompletion {
  testAttemptId: string
  categoryScores: CategoryCompletion[]
  totalScore: number
  percentageScore: number
}

export interface TestCompletionResponse {
  success: boolean
  result?: {
    testAttemptId: string
    totalScore: number
    percentageScore: number
    categoryScores: CategoryCompletion[]
  }
  error?: string
}