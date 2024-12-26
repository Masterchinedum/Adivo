// types/tests/question.ts
import { Option } from './option'

export interface Question {
    id: string
    title: string
    testId: string
    options?: Option[]
    createdAt: Date
    updatedAt: Date
}

export interface CreateQuestionPayload {
    title: string
    testId: string
    options?: Array<{
        text: string
    }>
}

export interface UpdateQuestionPayload {
    title?: string
    options?: Array<{
        id?: string
        text: string
    }>
}