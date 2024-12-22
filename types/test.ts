// types/test.ts

export type TestType = {
  id: string;
  title: string;
  description?: string;
  questions: QuestionType[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryType = {
  id: string;
  title: string;
  description?: string;
  parentId?: string;
  children?: CategoryType[];
  questions: QuestionType[];
  createdAt: Date;
  updatedAt: Date;
};

export type QuestionType = {
  id?: string;
  text: string;
  type: QuestionTypeEnum;
  options?: QuestionOption[];
  order: number;
  testId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export enum QuestionTypeEnum {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  CHECKBOX = 'CHECKBOX',
  SCALE = 'SCALE',
  TEXT = 'TEXT'
}

export type QuestionOption = {
  id: string;
  text: string;
  value: string | number;
};

// For form handling
export type CreateTestInput = {
  title: string;
  description?: string;
  questions: Omit<QuestionType, 'id' | 'testId' | 'createdAt' | 'updatedAt'>[];
};

export type UpdateTestInput = Partial<CreateTestInput> & {
  isPublished?: boolean;
};