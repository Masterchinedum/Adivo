// types/tests/category.ts
import { Question } from './question'
export interface Category {
    id: string
    name: string
    description: string // Make this required but possibly empty
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
    description: string // Changed from optional to required
    scale: number
    testId: string
}

export interface UpdateCategoryPayload {
    name?: string
    description?: string // Keep this optional for updates
    scale?: number
}

export interface CategoryError {
    message: string
    errors?: Record<string, string[]>
}