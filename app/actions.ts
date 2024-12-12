"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { rateLimit } from '@/lib/rate-limit';
import { signInSchema, signUpSchema, resetPasswordSchema } from '@/lib/validations/auth';
import { type AuthResponse } from '@supabase/supabase-js';
import { createAuditLog } from '@/lib/audit';

// Define type-safe response structure
interface AuthActionResponse {
  success: boolean;
  message: string;
  redirectTo?: string;
  error?: string;
}

// Rate limit configuration
const RATE_LIMIT_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW = '300 s'; // 5 minutes

export async function signUpAction(formData: FormData): Promise<AuthActionResponse> {
  try {
    // Rate limiting
    const identifier = formData.get("email")?.toString() || '';
    const { success } = await rateLimit(`signup_${identifier}`, RATE_LIMIT_ATTEMPTS, RATE_LIMIT_WINDOW);
    if (!success) {
      return {
        success: false,
        message: "Too many attempts. Please try again later.",
        error: "RATE_LIMIT_EXCEEDED"
      };
    }

    // Validate input
    const values = Object.fromEntries(formData);
    const validatedFields = signUpSchema.parse(values);
    
    const supabase = await createClient();
    const origin = headers().get("origin");

    // Create user with default role
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email: validatedFields.email,
      password: validatedFields.password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          role: 'user', // Default role
          full_name: validatedFields.full_name || '',
        }
      }
    });

    if (signUpError) throw signUpError;

    // Create user profile in profiles table with default role
    if (user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          role: 'user',
          email: validatedFields.email,
          full_name: validatedFields.full_name || '',
        });

      if (profileError) throw profileError;
    }

    // Create audit log
    await createAuditLog({
      action: 'SIGNUP',
      userId: user?.id,
      details: 'User registration successful'
    });

    return {
      success: true,
      message: "Please check your email to confirm your account.",
      redirectTo: "/sign-in"
    };

  } catch (error) {
    console.error('SignUp error:', error);
    return {
      success: false,
      message: "Registration failed. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

export async function signInAction(formData: FormData): Promise<AuthActionResponse> {
  try {
    // Rate limiting
    const identifier = formData.get("email")?.toString() || '';
    const { success } = await rateLimit(`signin_${identifier}`, RATE_LIMIT_ATTEMPTS, RATE_LIMIT_WINDOW);
    if (!success) {
      return {
        success: false,
        message: "Too many attempts. Please try again later.",
        error: "RATE_LIMIT_EXCEEDED"
      };
    }

    const values = Object.fromEntries(formData);
    const validatedFields = signInSchema.parse(values);
    
    const supabase = await createClient();
    
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email: validatedFields.email,
      password: validatedFields.password,
    });

    if (error) throw error;

    // Get user's role and permissions
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, permissions')
      .eq('id', user?.id)
      .single();

    // Create audit log
    await createAuditLog({
      action: 'SIGNIN',
      userId: user?.id,
      details: 'User login successful'
    });

    return {
      success: true,
      message: "Login successful",
      redirectTo: profile?.role === 'admin' ? '/admin/dashboard' : '/dashboard'
    };

  } catch (error) {
    console.error('SignIn error:', error);
    return {
      success: false,
      message: "Invalid credentials",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

export async function forgotPasswordAction(formData: FormData): Promise<AuthActionResponse> {
  try {
    const email = formData.get("email")?.toString();
    if (!email) {
      return {
        success: false,
        message: "Email is required",
        error: "INVALID_INPUT"
      };
    }

    const supabase = await createClient();
    const origin = headers().get("origin");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
    });

    if (error) throw error;

    // Create audit log
    await createAuditLog({
      action: 'PASSWORD_RESET_REQUEST',
      details: `Password reset requested for ${email}`
    });

    return {
      success: true,
      message: "Password reset instructions sent to your email",
    };

  } catch (error) {
    console.error('Password reset request error:', error);
    return {
      success: false,
      message: "Could not process password reset",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

export async function resetPasswordAction(formData: FormData): Promise<AuthActionResponse> {
  try {
    const values = Object.fromEntries(formData);
    const validatedFields = resetPasswordSchema.parse(values);
    
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.updateUser({
      password: validatedFields.password
    });

    if (error) throw error;

    // Create audit log
    await createAuditLog({
      action: 'PASSWORD_RESET_COMPLETE',
      userId: user?.id,
      details: 'Password reset successful'
    });

    return {
      success: true,
      message: "Password updated successfully",
      redirectTo: "/sign-in"
    };

  } catch (error) {
    console.error('Password reset error:', error);
    return {
      success: false,
      message: "Password update failed",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

export async function signOutAction(): Promise<AuthActionResponse> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Create audit log
    await createAuditLog({
      action: 'SIGNOUT',
      userId: user?.id,
      details: 'User signed out'
    });

    return {
      success: true,
      message: "Signed out successfully",
      redirectTo: "/sign-in"
    };

  } catch (error) {
    console.error('SignOut error:', error);
    return {
      success: false,
      message: "Sign out failed",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}