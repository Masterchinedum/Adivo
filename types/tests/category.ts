// types/tests/category.ts
import { Question } from './question'
export interface Category {
    id: string
    name: string
    description?: string
    testId: string
    createdAt: Date
    updatedAt: Date
    questions?: Question[]  // Optional array of questions in this category
}

export interface CreateCategoryPayload {
    name: string
    description?: string
    testId: string
}

export interface UpdateCategoryPayload {
    name?: string
    description?: string
}

// For API error responses
export interface CategoryError {
    message: string
    errors?: Record<string, string[]>
}