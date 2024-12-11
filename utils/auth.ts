import { createClient } from '@/utils/supabase/client';
import { SignInCredentials, SignUpCredentials, AuthError } from '@/types/auth';

const supabase = createClient();

export async function signInWithEmail({ email, password }: SignInCredentials) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return { user: data.user, session: data.session, error: null };
  } catch (error) {
    return { user: null, session: null, error: error as AuthError };
  }
}

export async function signUpWithEmail({ email, password, full_name }: SignUpCredentials) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
        },
      },
    });

    if (error) {
      throw error;
    }

    return { user: data.user, session: data.session, error: null };
  } catch (error) {
    return { user: null, session: null, error: error as AuthError };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    return { error: null };
  } catch (error) {
    return { error: error as AuthError };
  }
}