// types/answers/testAttempt.ts
import { CategoryScore } from './categoryScore'
import { QuestionResponse } from './questionResponse'

export enum TestStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED'
}

export interface TestAttempt {
  id: string
  userId: string
  testId: string
  startedAt: Date
  completedAt?: Date
  totalScore: number
  percentageScore: number
  status: TestStatus
  responses: QuestionResponse[]
  categoryScores: CategoryScore[]
  createdAt: Date
  updatedAt: Date
}