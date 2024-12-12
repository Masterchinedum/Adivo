import { createClient } from "@/utils/supabase/server";

interface AuditLogEntry {
  action: string;
  userId?: string;
  details: string;
  metadata?: Record<string, any>;
}

export async function createAuditLog(entry: AuditLogEntry) {
  const supabase = await createClient();
  
  return await supabase
    .from('audit_logs')
    .insert({
      action: entry.action,
      user_id: entry.userId,
      details: entry.details,
      metadata: entry.metadata,
      ip_address: headers().get('x-forwarded-for') || 'unknown',
      user_agent: headers().get('user-agent') || 'unknown'
    });
}