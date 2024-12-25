// types/tests/test.ts

import { User } from '@/types'

export interface Test {
  id: string
  title: string
  description?: string
  createdAt: Date
  updatedAt: Date
  isPublished: boolean
  createdBy: string
  user?: User // Reference to the admin who created the test
}

// For creating a new test
export interface CreateTestInput {
  title: string
  description?: string
  isPublished?: boolean
}

// For updating an existing test
export interface UpdateTestInput extends Partial<CreateTestInput> {
  id: string
}

// For API responses
export interface TestsResponse {
  tests: Test[]
  totalTests: number
  currentPage: number
  totalPages: number
}

// For API error responses
export interface TestError {
  message: string
  errors?: Record<string, string[]>
}

export { User }
