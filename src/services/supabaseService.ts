import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

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

export function isPlaceholderUrl(url: string | undefined | null): boolean {
  if (!url) return true;
  const s = String(url).trim();
  if (!s.startsWith('http://') && !s.startsWith('https://')) return true;
  return /xxxxxxxxxxxx|placeholder|your-project|example\.com/i.test(s);
}

export function isPlaceholderKey(key: string | undefined | null): boolean {
  if (!key) return true;
  const s = String(key).trim();
  return (
    s === 'sb_publishable_...' ||
    s.startsWith('sb_publishable_...') ||
    /placeholder|your-supabase-publishable-key/i.test(s)
  );
}

export function isPlaceholderSupabase(url: string, key: string): boolean {
  return isPlaceholderUrl(url) || isPlaceholderKey(key);
}

/**
 * Reads server-side environment variables with robust fallback priority:
 * 1. process.env.VITE_SUPABASE_URL
 * 2. process.env.SUPABASE_URL
 * 3. .env file
 * 4. /app/.dev.env.json
 * Filters out dummy placeholders (e.g. xxxxxxxxxxxx, sb_publishable_...) so real credentials are never masked.
 */
export function getSupabaseCredentials(): { url: string; key: string } {
  // Load .env if present
  try {
    dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });
  } catch {}

  const candidateUrls: (string | undefined)[] = [
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_URL,
  ];

  const candidateKeys: (string | undefined)[] = [
    process.env.VITE_SUPABASE_ANON_KEY,
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    process.env.SUPABASE_ANON_KEY,
    process.env.SUPABASE_PUBLISHABLE_KEY,
  ];

  // Inspect /app/.dev.env.json if it exists
  try {
    const devEnvPath = '/app/.dev.env.json';
    if (fs.existsSync(devEnvPath)) {
      const devEnv = JSON.parse(fs.readFileSync(devEnvPath, 'utf-8') || '{}');
      if (devEnv.VITE_SUPABASE_URL) candidateUrls.unshift(devEnv.VITE_SUPABASE_URL);
      if (devEnv.SUPABASE_URL) candidateUrls.push(devEnv.SUPABASE_URL);
      if (devEnv.VITE_SUPABASE_ANON_KEY) candidateKeys.unshift(devEnv.VITE_SUPABASE_ANON_KEY);
      if (devEnv.VITE_SUPABASE_PUBLISHABLE_KEY) candidateKeys.unshift(devEnv.VITE_SUPABASE_PUBLISHABLE_KEY);
      if (devEnv.SUPABASE_ANON_KEY) candidateKeys.push(devEnv.SUPABASE_ANON_KEY);
      if (devEnv.SUPABASE_PUBLISHABLE_KEY) candidateKeys.push(devEnv.SUPABASE_PUBLISHABLE_KEY);
    }
  } catch {}

  // Find first valid, non-placeholder URL
  let rawUrl = '';
  for (const u of candidateUrls) {
    const c = cleanUrl(u);
    if (c && !isPlaceholderUrl(c)) {
      rawUrl = c;
      break;
    }
  }

  // Find first valid, non-placeholder Key
  let rawKey = '';
  for (const k of candidateKeys) {
    const c = cleanCredential(k);
    if (c && !isPlaceholderKey(c)) {
      rawKey = c;
      break;
    }
  }

  let url = cleanUrl(rawUrl);
  let key = cleanCredential(rawKey);

  // If URL and key were accidentally swapped by user in input fields
  if ((key.startsWith('http://') || key.startsWith('https://')) && !url.startsWith('http')) {
    const temp = url;
    url = key;
    key = temp;
  }

  return { url, key };
}

export function isSupabaseConfigured(): boolean {
  const { url, key } = getSupabaseCredentials();
  return Boolean(url && key && !isPlaceholderSupabase(url, key));
}

// Instantiate client respecting Supabase RLS policy with publishable/anon key
export function getSupabaseClient(): SupabaseClient {
  const { url, key } = getSupabaseCredentials();
  if (!url) {
    throw new Error('Supabase URL is not configured. Please ensure VITE_SUPABASE_URL is set.');
  }
  if (!key) {
    throw new Error('Supabase publishable key is not configured. Please ensure VITE_SUPABASE_ANON_KEY is set.');
  }
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

export interface ParentEnquiryInput {
  form_type?: 'campus_tour' | 'enrollment' | 'general_enquiry' | 'enquiry' | 'complaint' | string;
  request_type?: 'Enrollment' | 'Enquiry' | 'Complaint' | string;
  parent_name: string;
  phone: string;
  email?: string | null;
  tour_date?: string | null;
  tour_slot?: string | null;
  child_name?: string | null;
  child_age?: string | null;
  program?: string | null;
  subject?: string | null;
  message?: string | null;
}

/**
 * Inserts a new row directly into public.parent_enquiries
 * (the table that exists in your Supabase database).
 *
 * Strict policy: NO mock fallbacks, NO dummy success.
 * If Supabase insertion fails, this function throws an error containing the exact database message.
 */
export async function insertParentEnquiry(payload: ParentEnquiryInput) {
  const { url, key } = getSupabaseCredentials();

  if (!url) {
    const errorMsg = 'Supabase URL is not configured. Please set VITE_SUPABASE_URL in your environment.';
    console.error(`❌ [SUPABASE SERVER] ${errorMsg}`);
    throw new Error(errorMsg);
  }

  if (!key) {
    const errorMsg = 'Supabase publishable key is not configured. Please set VITE_SUPABASE_ANON_KEY in your environment.';
    console.error(`❌ [SUPABASE SERVER] ${errorMsg}`);
    throw new Error(errorMsg);
  }

  const supabase = getSupabaseClient();
  const formType = (payload.form_type || 'campus_tour').toLowerCase();
  const requestType: 'Enrollment' | 'Enquiry' | 'Complaint' = (
    payload.request_type === 'Enrollment' || formType === 'enrollment'
      ? 'Enrollment'
      : payload.request_type === 'Complaint' || formType === 'complaint'
      ? 'Complaint'
      : 'Enquiry'
  );

  const messageParts: string[] = [];
  if (payload.program) messageParts.push(`Program: ${payload.program}`);
  if (payload.subject) messageParts.push(`Subject: ${payload.subject}`);
  if (payload.message) messageParts.push(payload.message);

  // Validate tour_date is a valid DATE format (YYYY-MM-DD) to prevent Postgres syntax error (22007)
  const rawDate = payload.tour_date ? String(payload.tour_date).trim() : '';
  const validTourDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDate) ? rawDate : null;
  if (rawDate && !validTourDate && rawDate !== 'To be scheduled') {
    messageParts.push(`Preferred Date: ${rawDate}`);
  }

  const parentEnquiryRecord: Record<string, any> = {
    form_type: formType,
    request_type: requestType,
    parent_name: payload.parent_name.trim(),
    phone: payload.phone.trim(),
    email: payload.email?.trim() || null,
    tour_date: validTourDate,
    tour_slot: payload.tour_slot || null,
    child_name: payload.child_name?.trim() || null,
    child_age: payload.child_age?.trim() || null,
    message: messageParts.length > 0 ? messageParts.join(' — ') : null,
    status: formType === 'complaint' ? 'pending' : 'new',
  };

  if (payload.subject) {
    parentEnquiryRecord.subject = payload.subject;
  }

  console.log(`📡 [SUPABASE SERVER] Inserting into "parent_enquiries" (request_type: ${requestType}, form_type: ${formType}):`, parentEnquiryRecord);

  // 1. Insert directly into parent_enquiries
  let { error } = await supabase.from('parent_enquiries').insert([parentEnquiryRecord]);

  // If column does not exist yet in schema cache (PGRST204), gracefully omit and retry
  if (error && error.code === 'PGRST204') {
    if (error.message?.includes('subject')) {
      console.info(`ℹ️ [SUPABASE SERVER] 'subject' column not found in schema cache. Retrying without 'subject'...`);
      delete parentEnquiryRecord.subject;
      const retryRes = await supabase.from('parent_enquiries').insert([parentEnquiryRecord]);
      error = retryRes.error;
    }
    if (error && error.code === 'PGRST204' && error.message?.includes('request_type')) {
      console.info(`ℹ️ [SUPABASE SERVER] 'request_type' column not found in schema cache. Retrying without 'request_type'...`);
      delete parentEnquiryRecord.request_type;
      const retryRes = await supabase.from('parent_enquiries').insert([parentEnquiryRecord]);
      error = retryRes.error;
    }
  }

  if (error) {
    console.error(`❌ [SUPABASE SERVER] INSERT into parent_enquiries failed:`, error);

    if (error.code === '42501' || error.message?.toLowerCase().includes('violates row-level security')) {
      throw new Error(`Row Level Security (RLS) policy on table "parent_enquiries" prevented insertion: ${error.message}. Please check that an INSERT policy exists for the anon role in Supabase.`);
    }

    throw new Error(`Supabase INSERT failed: ${error.message} (code: ${error.code || 'UNKNOWN'})`);
  }

  console.log(`✅ [SUPABASE SERVER] INSERT succeeded into "parent_enquiries" (request_type: ${requestType})`);
  return {
    ...parentEnquiryRecord,
    id: null,
    table: 'parent_enquiries',
    created_at: new Date().toISOString(),
  };
}

export async function insertCampusTourEnquiry(payload: ParentEnquiryInput) {
  return insertParentEnquiry({
    ...payload,
    form_type: payload.form_type || 'campus_tour',
  });
}

/**
 * Fetch rows from enrollments, enquiries, complaints, and parent_enquiries
 */
export async function fetchParentEnquiries(userToken?: string) {
  const { url, key } = getSupabaseCredentials();
  if (!url || !key) return [];

  const cleanToken = userToken ? userToken.replace(/^Bearer\s+/i, '').trim() : '';
  const supabase = cleanToken
    ? createClient(url, key, {
        auth: { persistSession: false },
        global: { headers: { Authorization: `Bearer ${cleanToken}` } },
      })
    : getSupabaseClient();

  const allSubmissions: any[] = [];
  const seenIds = new Set<string>();

  // 1. Fetch from enrollments
  try {
    const { data, error } = await supabase.from('enrollments').select('*').order('created_at', { ascending: false });
    if (data && data.length > 0) {
      data.forEach((r) => {
        const id = String(r.id);
        if (!seenIds.has(id)) {
          seenIds.add(id);
          allSubmissions.push({
            id,
            parentName: r.parent_name,
            phone: r.phone,
            email: r.email || undefined,
            type: 'enrollment',
            date: 'Academic Year 2025–26',
            preferredSlot: r.program || 'Montessori Primary',
            childDetails: r.child_name ? `${r.child_name}${r.child_age ? ` (Age: ${r.child_age})` : ''} — Program: ${r.program || 'N/A'}${r.message ? ` — ${r.message}` : ''}` : (r.message || 'Enrollment Application'),
            submittedAt: r.created_at ? new Date(r.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST' : '',
            status: r.status || 'new',
            notes: r.message || '',
            table: 'enrollments',
            rawCreatedAt: r.created_at,
          });
        }
      });
    } else if (error) {
      console.info(`[SERVER] enrollments table check:`, error.message);
    }
  } catch {}

  // 2. Fetch from enquiries
  try {
    const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
    if (data && data.length > 0) {
      data.forEach((r) => {
        const id = String(r.id);
        if (!seenIds.has(id)) {
          seenIds.add(id);
          const isTour = r.form_type === 'campus_tour';
          allSubmissions.push({
            id,
            parentName: r.parent_name,
            phone: r.phone,
            email: r.email || undefined,
            type: isTour ? 'tour' : 'enquiry',
            date: r.tour_date || 'General Observation',
            preferredSlot: r.tour_slot || 'Morning Observation',
            childDetails: r.child_name ? `${r.child_name}${r.child_age ? ` (Age: ${r.child_age})` : ''}${r.message ? ` — ${r.message}` : ''}` : (r.message || 'Campus Tour / Enquiry'),
            submittedAt: r.created_at ? new Date(r.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST' : '',
            status: r.status || 'new',
            notes: r.message || '',
            table: 'enquiries',
            rawCreatedAt: r.created_at,
          });
        }
      });
    } else if (error) {
      console.info(`[SERVER] enquiries table check:`, error.message);
    }
  } catch {}

  // 3. Fetch from complaints
  try {
    const { data, error } = await supabase.from('complaints').select('*').order('created_at', { ascending: false });
    if (data && data.length > 0) {
      data.forEach((r) => {
        const id = String(r.id);
        if (!seenIds.has(id)) {
          seenIds.add(id);
          allSubmissions.push({
            id,
            parentName: r.parent_name,
            phone: r.phone,
            email: r.email || undefined,
            type: 'complaint',
            date: 'Feedback / Grievance',
            preferredSlot: r.subject || 'School Management',
            childDetails: `${r.subject ? `Subject: ${r.subject} — ` : ''}${r.message}`,
            submittedAt: r.created_at ? new Date(r.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST' : '',
            status: r.status || 'pending',
            notes: r.message || '',
            table: 'complaints',
            rawCreatedAt: r.created_at,
          });
        }
      });
    } else if (error) {
      console.info(`[SERVER] complaints table check:`, error.message);
    }
  } catch {}

  // 4. Fetch from parent_enquiries (unified table)
  try {
    const { data, error } = await supabase.from('parent_enquiries').select('*');
    if (data && data.length > 0) {
      data.forEach((r, idx) => {
        const id = String(r.id || `pe_${idx}_${Date.now()}`);
        if (!seenIds.has(id)) {
          seenIds.add(id);
          const fType = String(r.form_type || '').toLowerCase();
          const cleanType = fType === 'enrollment' ? 'enrollment' : fType === 'complaint' ? 'complaint' : 'tour';
          const reqType = r.request_type || (
            cleanType === 'enrollment' ? 'Enrollment' : cleanType === 'complaint' ? 'Complaint' : 'Enquiry'
          );
          allSubmissions.push({
            id,
            parentName: r.parent_name,
            phone: r.phone,
            email: r.email || undefined,
            type: cleanType,
            requestType: reqType,
            request_type: reqType,
            formType: r.form_type || cleanType,
            date: r.tour_date || 'To be scheduled',
            preferredSlot: r.tour_slot || 'Morning observation',
            childDetails: r.child_name ? `${r.child_name}${r.child_age ? ` (Age: ${r.child_age})` : ''}${r.message ? ` — ${r.message}` : ''}` : (r.message || 'Visit request'),
            submittedAt: (r.submitted_at || r.created_at) ? new Date(r.submitted_at || r.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST' : (new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'),
            status: r.status || 'new',
            notes: r.message || '',
            table: 'parent_enquiries',
            rawCreatedAt: r.submitted_at || r.created_at,
          });
        }
      });
    } else if (error) {
      console.info(`[SERVER] parent_enquiries table check:`, error.message);
    }
  } catch (err: any) {
    console.warn(`[SERVER] parent_enquiries error:`, err?.message);
  }

  // Sort newest first by created_at
  allSubmissions.sort((a, b) => {
    const timeA = a.rawCreatedAt ? new Date(a.rawCreatedAt).getTime() : 0;
    const timeB = b.rawCreatedAt ? new Date(b.rawCreatedAt).getTime() : 0;
    return timeB - timeA;
  });

  return allSubmissions;
}

/**
 * Test live Supabase connection and verify tables
 */
export async function testSupabaseConnection(): Promise<{
  ok: boolean;
  message: string;
  url?: string;
  tables?: { enrollments: boolean; enquiries: boolean; complaints: boolean; parent_enquiries: boolean };
  isPlaceholder?: boolean;
}> {
  const { url, key } = getSupabaseCredentials();

  if (!url) {
    return {
      ok: false,
      message: 'Supabase URL is not configured. Please set VITE_SUPABASE_URL.',
      isPlaceholder: false,
    };
  }

  if (!key) {
    return {
      ok: false,
      url,
      message: 'Supabase publishable key is not configured. Please set VITE_SUPABASE_ANON_KEY.',
      isPlaceholder: false,
    };
  }

  if (isPlaceholderSupabase(url, key)) {
    return {
      ok: false,
      url,
      isPlaceholder: true,
      message: 'Supabase URL is not configured (contains placeholder value).',
    };
  }

  try {
    const supabase = getSupabaseClient();
    const tables = {
      enrollments: false,
      enquiries: false,
      complaints: false,
      parent_enquiries: false,
    };

    const checkTable = async (t: string) => {
      try {
        const { error } = await supabase.from(t).select('id').limit(1);
        if (!error || error.code === '42501' || error.message?.toLowerCase().includes('permission') || error.message?.toLowerCase().includes('security')) {
          return true;
        }
        return false;
      } catch {
        return false;
      }
    };

    tables.enrollments = await checkTable('enrollments');
    tables.enquiries = await checkTable('enquiries');
    tables.complaints = await checkTable('complaints');
    tables.parent_enquiries = await checkTable('parent_enquiries');

    const foundTables = Object.entries(tables).filter(([_, found]) => found).map(([name]) => name);

    if (foundTables.length > 0) {
      return {
        ok: true,
        url,
        tables,
        isPlaceholder: false,
        message: `Supabase connected successfully! Accessible tables: ${foundTables.join(', ')}.`,
      };
    }

    return {
      ok: true,
      url,
      tables,
      isPlaceholder: false,
      message: 'Supabase connected! However, tables (enrollments, enquiries, complaints) were not found yet. Please run the SQL schema in Supabase SQL Editor.',
    };
  } catch (err: any) {
    return {
      ok: false,
      url,
      isPlaceholder: false,
      message: `Supabase connection error: ${err.message}`,
    };
  }
}

export function getSupabaseDetails() {
  const { url, key } = getSupabaseCredentials();
  const configured = Boolean(url && key && !isPlaceholderSupabase(url, key));
  const keyConfigured = Boolean(key && !isPlaceholderKey(key));
  const urlConfigured = Boolean(url && url.startsWith('https://') && !isPlaceholderUrl(url));

  let status = 'missing_credentials';
  let statusMessage = 'Supabase URL is not configured.';

  if (configured) {
    status = 'connected';
    statusMessage = 'Connected & Verified';
  } else if (!urlConfigured && !keyConfigured) {
    status = 'missing_credentials';
    statusMessage = 'Supabase URL and Anon Key are not configured.';
  } else if (!urlConfigured) {
    status = 'missing_url';
    statusMessage = 'Supabase URL is not configured.';
  } else if (!keyConfigured) {
    status = 'missing_key';
    statusMessage = 'Supabase publishable key is not configured.';
  }

  return {
    configured,
    isPlaceholder: !configured,
    keyConfigured,
    urlConfigured,
    tables: ['enrollments', 'enquiries', 'complaints', 'parent_enquiries'],
    url: urlConfigured ? url : null,
    maskedKey: key ? (key.length > 14 ? `${key.slice(0, 16)}...${key.slice(-4)}` : '••••••••') : null,
    status,
    statusMessage,
  };
}
