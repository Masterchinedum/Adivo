// types/test.ts

export type TestType = {
    questions: any;
    id: string;
    title: string;
    description?: string;
    isPublished: boolean;
    categories: CategoryType[];
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
    id: string;
    text: string;
    type: QuestionTypeEnum;
    options?: QuestionOption[];
    categoryId: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export enum QuestionTypeEnum {
    MULTIPLE_CHOICE = 'multiple_choice',
    CHECKBOX = 'checkbox',
    DROPDOWN = 'dropdown',
    SCALE = 'scale',
    TEXT = 'text'
  }
  
  export type QuestionOption = {
    id: string;
    text: string;
    value: number | string;
  };