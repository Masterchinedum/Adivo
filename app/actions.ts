"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { rateLimit } from '@/lib/rate-limit';
import { signInSchema, signUpSchema } from '@/lib/validations/auth';
import { createAuditLog } from '@/lib/audit';
import { UserRole } from '@/types/auth';
import { z } from 'zod';

interface AuthResponse {
  success: boolean;
  message: string;
  redirectTo?: string;
}

const DEFAULT_ROLE: UserRole = 'USER';

async function getOriginHeader(): Promise<string> {
  const headersList = await headers();
  return headersList.get("origin") || "";
}

export async function signUpAction(formData: FormData): Promise<AuthResponse> {
  try {
    // Rate limiting
    const ip = (await headers()).get("x-forwarded-for") || "anonymous";
    await rateLimit(ip);

    // Validate form data
    const values = Object.fromEntries(formData);
    const validatedFields = signUpSchema.parse(values);
    
    const supabase = await createClient();
    const origin = await getOriginHeader() || "";

    // Create user with default role
    const { data: { user }, error } = await supabase.auth.signUp({
      email: validatedFields.email,
      password: validatedFields.password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          role: DEFAULT_ROLE,
          full_name: validatedFields.full_name || "",
        }
      }
    });

    if (error) throw error;

    // Create user profile in profiles table with role
    if (user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            role: DEFAULT_ROLE,
            email: validatedFields.email,
            full_name: validatedFields.full_name || "",
          }
        ]);

      if (profileError) throw profileError;
    }

    // Audit log
    await createAuditLog({
      action: 'SIGN_UP',
      userId: user?.id || 'anonymous',
      details: `New user registration: ${validatedFields.email}`
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
      message: error instanceof z.ZodError 
        ? "Invalid input data" 
        : "Registration failed. Please try again.",
    };
  }
}

export async function signInAction(formData: FormData): Promise<AuthResponse> {
  try {
    // Rate limiting
    const ip = (await headers()).get("x-forwarded-for") || "anonymous";
    await rateLimit(ip);

    const values = Object.fromEntries(formData);
    const validatedFields = signInSchema.parse(values);
    
    const supabase = await createClient();
    
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email: validatedFields.email,
      password: validatedFields.password,
    });

    if (error) throw error;

    // Fetch user's role and permissions
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, permissions')
      .eq('id', user?.id)
      .single();

    // Audit log
    await createAuditLog({
      action: 'SIGN_IN',
      userId: user?.id || 'anonymous',
      details: `User login: ${validatedFields.email}`
    });

    return {
      success: true,
      message: "Successfully signed in",
      redirectTo: profile?.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'
    };
  } catch (error) {
    console.error('SignIn error:', error);
    return {
      success: false,
      message: "Invalid credentials",
    };
  }
}

export async function resetPasswordAction(formData: FormData): Promise<AuthResponse> {
  try {
    const supabase = await createClient();
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match"
      };
    }

    const { data: { user }, error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) throw error;

    // Audit log
    await createAuditLog({
      action: 'PASSWORD_RESET',
      userId: user?.id || 'anonymous',
      details: 'Password reset completed'
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
      message: "Password update failed"
    };
  }
}

export async function signOutAction(): Promise<void> {
  const supabase = await createClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    await supabase.auth.signOut();
    
    // Audit log
    await createAuditLog({
      action: 'SIGN_OUT',
      userId: user?.id || 'anonymous',
      details: 'User signed out'
    });
    
    redirect('/sign-in');
  } catch (error) {
    console.error('SignOut error:', error);
    redirect('/sign-in');
  }
}