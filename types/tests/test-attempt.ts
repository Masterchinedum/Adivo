//types/tests/test-attempt.ts

import { Test } from "./test"
import { Question } from "./question"
import { Option } from "./option"
import { Category } from "./category"


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
  totalScore: number
  percentageScore: number
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED'
  test: Test
  responses: QuestionResponse[]
  categoryScores: CategoryScore[]
  createdAt: Date
  updatedAt: Date
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
    id: string;
    testId: string;
    userId: string;
    startedAt: Date;
    status: TestStatus;
  }
}

export interface TestAttemptCreateInput {
  testId: string;
  userId: string;
  status: TestStatus;
  startedAt: Date;
  totalScore: number;
  percentageScore: number;
}