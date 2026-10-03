import { createClient, SupabaseClient } from '@supabase/supabase-js';

function cleanCredential(val: string | undefined | null): string {
  if (!val) return '';
  return String(val).trim().replace(/^["']|["']$/g, '');
}

function cleanUrl(url: string | undefined | null): string {
  let cleaned = cleanCredential(url);
  if (!cleaned) return '';
  cleaned = cleaned.replace(/\/+$/, '');
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    if (/^[a-z0-9_-]{10,40}$/i.test(cleaned)) {
      cleaned = `https://${cleaned}.supabase.co`;
    }
  }
  return cleaned;
}

export function isPlaceholder(val: string | undefined | null): boolean {
  if (!val) return true;
  const s = String(val).trim();
  return (
    /xxxxxxxxxxxx|placeholder|your-project|example\.com/i.test(s) ||
    s === 'sb_publishable_...' ||
    s.startsWith('sb_publishable_...')
  );
}

export function getClientSupabaseCredentials(): { url: string; key: string; isConfigured: boolean } {
  // 1. Read from Vite client-side environment variables
  let envUrl = '';
  let envKey = '';

  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      envUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
      envKey =
        (import.meta as any).env.VITE_SUPABASE_ANON_KEY ||
        (import.meta as any).env.VITE_SUPABASE_PUBLISHABLE_KEY ||
        '';
    }
  } catch {}

  // 2. Fallback to localStorage or window globals if configured via UI
  let localUrl = '';
  let localKey = '';
  if (typeof window !== 'undefined') {
    try {
      localUrl = (window as any).__VITE_SUPABASE_URL || localStorage.getItem('ln_supabase_url') || '';
      localKey = (window as any).__VITE_SUPABASE_ANON_KEY || localStorage.getItem('ln_supabase_anon_key') || '';
    } catch {}
  }

  const rawUrl = envUrl && !isPlaceholder(envUrl) ? envUrl : localUrl;
  const rawKey = envKey && !isPlaceholder(envKey) ? envKey : localKey;

  const url = cleanUrl(rawUrl);
  const key = cleanCredential(rawKey);

  const isConfigured = Boolean(
    url &&
    key &&
    url.startsWith('https://') &&
    !isPlaceholder(url) &&
    !isPlaceholder(key)
  );

  return { url, key, isConfigured };
}

let cachedClient: SupabaseClient | null = null;
let lastUrl = '';
let lastKey = '';

export function getBrowserSupabaseClient(): SupabaseClient | null {
  const { url, key, isConfigured } = getClientSupabaseCredentials();
  if (!isConfigured) return null;

  if (cachedClient && lastUrl === url && lastKey === key) {
    return cachedClient;
  }

  lastUrl = url;
  lastKey = key;
  cachedClient = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return cachedClient;
}

/**
 * Fetches all submissions from Supabase tables (enrollments, enquiries, complaints, and parent_enquiries)
 * using the authenticated admin user's JWT session.
 */
export async function fetchAuthenticatedSubmissions(): Promise<any[]> {
  const client = getBrowserSupabaseClient();
  if (!client) return [];

  const results: any[] = [];
  const seenIds = new Set<string>();

  // 1. Fetch from enrollments
  try {
    let { data, error } = await client.from('enrollments').select('*').order('created_at', { ascending: false });
    if (error) {
      const fb = await client.from('enrollments').select('*');
      data = fb.data;
      error = fb.error;
    }
    if (data && data.length > 0) {
      data.forEach((r: any) => {
        const id = String(r.id);
        if (!seenIds.has(id)) {
          seenIds.add(id);
          results.push({
            id,
            parentName: r.parent_name || 'Anonymous',
            phone: r.phone || '',
            email: r.email || undefined,
            type: 'enrollment',
            program: r.program || 'Montessori Primary',
            childName: r.child_name || '',
            childAge: r.child_age || '',
            childDetails: r.child_name ? `${r.child_name}${r.child_age ? ` (Age: ${r.child_age})` : ''} — Program: ${r.program || 'Montessori'}` : (r.message || 'Enrollment Application'),
            message: r.message || '',
            date: 'Academic Year 2025–26',
            preferredSlot: r.program || 'Montessori Primary',
            submittedAt: r.created_at ? new Date(r.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST' : 'Recently',
            status: r.status || 'new',
            notes: r.message || '',
            table: 'enrollments',
            rawCreatedAt: r.created_at,
          });
        }
      });
    } else if (error) {
      console.info('[SUPABASE CLIENT] enrollments note:', error.message);
    }
  } catch {}

  // 2. Fetch from enquiries
  try {
    let { data, error } = await client.from('enquiries').select('*').order('created_at', { ascending: false });
    if (error) {
      const fb = await client.from('enquiries').select('*');
      data = fb.data;
      error = fb.error;
    }
    if (data && data.length > 0) {
      data.forEach((r: any) => {
        const id = String(r.id);
        if (!seenIds.has(id)) {
          seenIds.add(id);
          const isTour = r.form_type === 'campus_tour';
          results.push({
            id,
            parentName: r.parent_name || 'Anonymous',
            phone: r.phone || '',
            email: r.email || undefined,
            type: isTour ? 'tour' : 'enquiry',
            program: r.child_age ? `Age Group: ${r.child_age}` : 'General Campus Enquiry',
            childName: r.child_name || '',
            childAge: r.child_age || '',
            childDetails: r.child_name ? `${r.child_name}${r.child_age ? ` (Age: ${r.child_age})` : ''}` : (r.message || 'Campus Tour Visit'),
            message: r.message || '',
            date: r.tour_date || 'Campus Visit',
            preferredSlot: r.tour_slot || 'Morning Slot',
            submittedAt: r.created_at ? new Date(r.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST' : 'Recently',
            status: r.status || 'new',
            notes: r.message || '',
            table: 'enquiries',
            rawCreatedAt: r.created_at,
          });
        }
      });
    } else if (error) {
      console.info('[SUPABASE CLIENT] enquiries note:', error.message);
    }
  } catch {}

  // 3. Fetch from complaints
  try {
    let { data, error } = await client.from('complaints').select('*').order('created_at', { ascending: false });
    if (error) {
      const fb = await client.from('complaints').select('*');
      data = fb.data;
      error = fb.error;
    }
    if (data && data.length > 0) {
      data.forEach((r: any) => {
        const id = String(r.id);
        if (!seenIds.has(id)) {
          seenIds.add(id);
          results.push({
            id,
            parentName: r.parent_name || 'Anonymous',
            phone: r.phone || '',
            email: r.email || undefined,
            type: 'complaint',
            program: r.subject || 'School Feedback',
            childName: r.child_name || '',
            childAge: '',
            childDetails: r.child_name ? `Child: ${r.child_name} — Subject: ${r.subject || 'Feedback'}` : (r.subject || 'Parent Feedback'),
            message: r.message || '',
            date: 'Feedback Submission',
            preferredSlot: r.subject || 'Management Attention',
            submittedAt: r.created_at ? new Date(r.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST' : 'Recently',
            status: r.status || 'pending',
            notes: r.message || '',
            table: 'complaints',
            rawCreatedAt: r.created_at,
          });
        }
      });
    } else if (error) {
      console.info('[SUPABASE CLIENT] complaints note:', error.message);
    }
  } catch {}

  // 4. Fetch from parent_enquiries (unified fallback table)
  try {
    let { data, error } = await client.from('parent_enquiries').select('*').order('submitted_at', { ascending: false });
    if (error) {
      const fb = await client.from('parent_enquiries').select('*');
      data = fb.data;
      error = fb.error;
    }
    if (data && data.length > 0) {
      data.forEach((r: any) => {
        const id = String(r.id);
        if (!seenIds.has(id)) {
          seenIds.add(id);
          const fType = String(r.form_type || '').toLowerCase();
          const cleanType = fType === 'enrollment' ? 'enrollment' : fType === 'complaint' ? 'complaint' : fType === 'campus_tour' ? 'tour' : 'enquiry';
          const reqType = r.request_type || (
            cleanType === 'enrollment' ? 'Enrollment' : cleanType === 'complaint' ? 'Complaint' : 'Enquiry'
          );
          const timestamp = r.submitted_at || r.created_at;
          results.push({
            id,
            parentName: r.parent_name || 'Anonymous',
            phone: r.phone || '',
            email: r.email || undefined,
            type: cleanType,
            requestType: reqType,
            formType: r.form_type || cleanType,
            program: r.child_age ? `Age Group: ${r.child_age}` : 'Campus Visit',
            childName: r.child_name || '',
            childAge: r.child_age || '',
            childDetails: r.child_name ? `${r.child_name}${r.child_age ? ` (${r.child_age})` : ''}` : (r.message || 'Parent Enquiry'),
            message: r.message || '',
            date: r.tour_date || 'To be scheduled',
            preferredSlot: r.tour_slot || 'Morning observation',
            submittedAt: timestamp ? new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST' : 'Recently',
            status: r.status || 'new',
            notes: r.message || '',
            table: 'parent_enquiries',
            rawCreatedAt: timestamp,
          });
        }
      });
    } else if (error) {
      console.info('[SUPABASE CLIENT] parent_enquiries note:', error.message);
    }
  } catch {}

  // 5. Always sync with /api/submissions endpoint with authenticated Bearer token
  try {
    const { data: sessionData } = await client.auth.getSession();
    const token = sessionData?.session?.access_token;
    const headers: Record<string, string> = {
      'x-admin-passcode': 'littlenoormontessorischool',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const resp = await fetch('/api/submissions', { headers });
    if (resp.ok) {
      const body = await resp.json();
      if (body.success && Array.isArray(body.submissions)) {
        body.submissions.forEach((s: any) => {
          const id = String(s.id || Math.random());
          if (!seenIds.has(id)) {
            seenIds.add(id);
            results.push({
              id,
              parentName: s.parentName || 'Anonymous',
              phone: s.phone || '',
              email: s.email || undefined,
              type: s.type || 'enquiry',
              program: s.preferredSlot || 'Montessori',
              childName: s.childDetails?.split(',')[0] || '',
              childAge: '',
              childDetails: s.childDetails || 'Submission',
              message: s.notes || s.childDetails || '',
              date: s.date || 'Campus Visit',
              preferredSlot: s.preferredSlot || 'Morning',
              submittedAt: s.submittedAt || 'Recently',
              status: s.status || 'new',
              notes: s.notes || '',
              table: s.table || 'parent_enquiries',
            });
          }
        });
      }
    }
  } catch (err: any) {
    console.info('[SUPABASE CLIENT] /api/submissions sync note:', err?.message);
  }

  // Sort newest first by date
  results.sort((a, b) => {
    const timeA = a.rawCreatedAt ? new Date(a.rawCreatedAt).getTime() : 0;
    const timeB = b.rawCreatedAt ? new Date(b.rawCreatedAt).getTime() : 0;
    return timeB - timeA;
  });

  return results;
}

export interface EnrollmentInsertInput {
  parent_name: string;
  phone: string;
  email?: string | null;
  child_name?: string | null;
  child_age?: string | null;
  program?: string | null;
  message?: string | null;
  status?: 'new' | 'contacted' | 'enrolled' | 'archived';
}

export interface EnquiryInsertInput {
  parent_name: string;
  phone: string;
  email?: string | null;
  child_name?: string | null;
  child_age?: string | null;
  tour_date?: string | null;
  tour_slot?: string | null;
  form_type?: string;
  message?: string | null;
  status?: 'new' | 'contacted' | 'scheduled' | 'completed' | 'archived';
}

export interface ComplaintInsertInput {
  parent_name: string;
  phone: string;
  email?: string | null;
  child_name?: string | null;
  subject?: string | null;
  message: string;
  status?: 'pending' | 'under_review' | 'resolved' | 'closed';
}

// Track tables missing from the database schema cache to avoid repetitive errors
const missingTables = new Set<string>();

/**
 * Universal insertion helper for browser client.
 * Inserts directly into Supabase without requesting a SELECT,
 * which ensures it succeeds under INSERT-only RLS policies.
 */
export async function insertClientRecord(
  table: 'enrollments' | 'enquiries' | 'complaints' | 'parent_enquiries',
  record: Record<string, any>
): Promise<{ success: boolean; table: string }> {
  const client = getBrowserSupabaseClient();
  if (!client) {
    const creds = getClientSupabaseCredentials();
    if (!creds.url) {
      throw new Error('Supabase URL is not configured. Please ensure VITE_SUPABASE_URL is set.');
    }
    if (!creds.key) {
      throw new Error('Supabase Anon Key is not configured. Please ensure VITE_SUPABASE_ANON_KEY is set.');
    }
    throw new Error('Supabase credentials could not be initialized.');
  }

  // Target table is parent_enquiries
  const targetTable = 'parent_enquiries';

  // Sanitize record to guarantee valid PostgreSQL datatypes
  const cleanedRecord: Record<string, any> = { ...record };
  if (cleanedRecord.tour_date) {
    const dStr = String(cleanedRecord.tour_date).trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dStr)) {
      cleanedRecord.tour_date = null;
    }
  }
  
  // Attempt insert with all columns
  let { error } = await client.from(targetTable).insert([cleanedRecord]);

  // If column does not exist yet in schema cache (PGRST204), retry without it
  if (error && error.code === 'PGRST204') {
    if (error.message?.includes('subject')) {
      delete cleanedRecord.subject;
      const retryRes = await client.from(targetTable).insert([cleanedRecord]);
      error = retryRes.error;
    }
    if (error && error.code === 'PGRST204' && error.message?.includes('request_type')) {
      console.info(`ℹ️ [SUPABASE] 'request_type' column not yet in schema cache. Retrying without 'request_type'...`);
      delete cleanedRecord.request_type;
      const retryRes = await client.from(targetTable).insert([cleanedRecord]);
      error = retryRes.error;
    }
  }

  if (error) {
    console.error(`❌ [SUPABASE] Insert into "${targetTable}" failed:`, error);

    // Explicitly identify browser network / CORS / adblocker failure
    if (error.message?.includes('Failed to fetch') || (error as any).name === 'TypeError') {
      const fetchError = new Error('Direct browser connection to Supabase failed (TypeError: Failed to fetch).');
      (fetchError as any).isFetchError = true;
      (fetchError as any).code = 'FETCH_FAILED';
      throw fetchError;
    }

    if (error.code === '42501' || error.message?.toLowerCase().includes('violates row-level security')) {
      throw new Error(`Row Level Security (RLS) policy on table "${targetTable}" prevented the submission: ${error.message}. Please run the RLS policy SQL in your Supabase SQL Editor.`);
    }
    if (error.code === '23502') {
      throw new Error(`A required field was missing while inserting into table "${targetTable}": ${error.message}`);
    }

    throw new Error(`Supabase Error (${error.code || 'INSERT'}): ${error.message}`);
  }

  return { success: true, table: targetTable };
}
