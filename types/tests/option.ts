// types/tests/option.ts

export interface Option {
    id: string
    text: string
    point: number
    questionId: string
    createdAt: Date
    updatedAt: Date
}

export interface CreateOptionPayload {
    text: string
    point: number 
    questionId: string
}

export interface UpdateOptionPayload {
    text: string
    point?: number
}