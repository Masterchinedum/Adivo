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