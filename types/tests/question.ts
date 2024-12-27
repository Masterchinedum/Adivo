// types/tests/question.ts
import { Option } from './option'
import { Category } from './category'

export interface Question {
    id: string
    title: string
    testId: string
    categoryId?: string      // New field
    category?: Category      // New field
    options?: Option[]
    createdAt: Date
    updatedAt: Date
}

export interface CreateQuestionPayload {
    title: string
    testId: string
    categoryId?: string      // New field
    options?: Array<{
        text: string
    }>
}

export interface UpdateQuestionPayload {
    title?: string
    categoryId?: string      // New field
    options?: Array<{
        id?: string
        text: string
    }>
}