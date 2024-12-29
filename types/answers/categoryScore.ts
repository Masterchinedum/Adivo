// types/answers/categoryScore.ts
export interface CategoryScore {
  id: string
  testAttemptId: string
  categoryId: string
  actualScore: number
  maxScale: number
  rawScore: number
  maxRawScore: number
  createdAt: Date
  updatedAt: Date
}