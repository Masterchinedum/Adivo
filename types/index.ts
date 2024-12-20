//types/index.ts

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  clerkUserId: string;
  createdAt: Date;
  updatedAt: Date;
}