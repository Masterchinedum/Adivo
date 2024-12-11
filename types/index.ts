export type Role = 'user' | 'editor' | 'admin'

export interface UserProfile {
  id: string
  email: string
  role: Role
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: UserProfile
        Insert: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserProfile, 'id'>>
      }
      // Add other table definitions as needed
    }
  }
}