// types/tests/question.ts

export interface Question {
    id: string;
    title: string;
    testId: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface CreateQuestionPayload {
    title: string;
    testId: string;
    order?: number;
  }
  
  export interface UpdateQuestionPayload {
    title?: string;
    order?: number;
  }