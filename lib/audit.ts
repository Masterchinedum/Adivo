import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

type AuditAction = 'SIGN_IN' | 'SIGN_UP' | 'SIGN_OUT' | 'PASSWORD_RESET';

interface AuditLogParams {
  action: AuditAction;
  userId: string;
  details: string;
}

export async function createAuditLog({ action, userId, details }: AuditLogParams) {
  try {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || 'unknown';
    const ipAddress = headersList.get('x-forwarded-for') || 'unknown';
    
    const supabase = await createClient();
    
    const { error } = await supabase.from('audit_logs').insert({
      action,
      user_id: userId,
      details,
      user_agent: userAgent,
      ip_address: ipAddress,
      created_at: new Date().toISOString()
    });

    if (error) {
      console.error('Audit log error:', error);
    }
  } catch (error) {
    // Log the error but don't throw it to prevent disrupting the main flow
    console.error('Failed to create audit log:', error);
  }
}