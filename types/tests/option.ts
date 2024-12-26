// types/tests/option.ts

export interface Option {
    id: string
    text: string
    questionId: string
    createdAt: Date
    updatedAt: Date
}

export interface CreateOptionPayload {
    text: string
    questionId: string
}

export interface UpdateOptionPayload {
    text: string
}