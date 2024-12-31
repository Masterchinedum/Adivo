// types/tests/category.ts
import { Question } from './question'
export interface Category {
    id: string
    name: string
    description?: string
    scale: number
    testId: string
    createdAt: Date
    updatedAt: Date
    questions?: Question[]  // Optional array of questions in this category
    _count?: {
        questions: number
    }
}

export interface CreateCategoryPayload {
    name: string
    description?: string
    scale: number
    testId: string
}

export interface UpdateCategoryPayload {
    name?: string
    description?: string
    scale?: number
}

export interface CategoryError {
    message: string
    errors?: Record<string, string[]>
}