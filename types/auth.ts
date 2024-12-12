export interface AuthUser {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
    user_metadata: {
      full_name?: string;
      avatar_url?: string;
    };
  }
  
  export interface SignInCredentials {
    email: string;
    password: string;
  }
  
  export interface SignUpCredentials extends SignInCredentials {
    full_name: string;
  }
  
  export interface AuthError {
    message: string;
  }

export type UserRole = 'ADMIN' | 'EDITOR' | 'USER';

export interface UserProfile {
  id: string;
  role: UserRole;
  email: string;
  full_name?: string;
  permissions?: string[];
}