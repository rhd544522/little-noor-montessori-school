import { SubmissionRecord } from '../types';
import {
  getClientSupabaseCredentials,
  insertClientRecord,
} from '../lib/supabase';

export interface SubmissionPayload {
  parentName: string;
  phone: string;
  email?: string;
  date?: string;
  preferredSlot?: string;
  timeSlot?: string;
  childName?: string;
  childAge?: string;
  program?: string;
  notes?: string;
  message?: string;
  type?: 'tour' | 'enrollment' | 'enquiry' | 'complaint';
  form_type?: 'campus_tour' | 'enrollment' | 'enquiry' | 'complaint' | string;
  request_type?: 'Enrollment' | 'Enquiry' | 'Complaint' | string;
  _hp?: string;
}

export interface SubmissionResponse {
  success: boolean;
  submission: SubmissionRecord;
  supabaseRecord?: any;
  whatsappUrl: string;
  whatsappMessage?: string;
  tableUsed?: string;
  error?: string;
}

const SCHOOL_WHATSAPP_NUMBER = '919978912364';

function formatISTDate(): string {
  try {
    return (
      new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(new Date()) + ' IST'
    );
  } catch {
    return new Date().toLocaleString() + ' IST';
  }
}

/**
 * Submits form data directly to Supabase using client credentials (VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY)
 * and falls back to /api/submissions server endpoint if client-side credentials are not set.
 *
 * Enforces strict honesty:
 *  - Only returns success after a confirmed, successful INSERT into Supabase.
 *  - If Supabase fails, throws the real error message for the UI to display.
 */
export async function submitForm(payload: SubmissionPayload): Promise<SubmissionResponse> {
  const resolvedType = (payload.type || payload.form_type || 'tour').toLowerCase();
  
  // Explicitly set request_type to 'Enrollment', 'Enquiry', or 'Complaint'
  const requestType: 'Enrollment' | 'Enquiry' | 'Complaint' = (
    payload.request_type === 'Enrollment' || resolvedType === 'enrollment'
      ? 'Enrollment'
      : payload.request_type === 'Complaint' || resolvedType === 'complaint'
      ? 'Complaint'
      : 'Enquiry'
  );

  const clientCreds = getClientSupabaseCredentials();

  // Combine message & program notes
  const messageParts: string[] = [];
  if (payload.program) messageParts.push(`Program: ${payload.program}`);
  if (payload.notes && !payload.notes.includes(payload.message || '___none___')) {
    messageParts.push(payload.notes);
  }
  if (payload.message) messageParts.push(payload.message);
  const combinedMessage = messageParts.length > 0 ? messageParts.join(' — ') : null;

  // Validate tour_date is a valid DATE format (YYYY-MM-DD) to prevent Postgres syntax error (22007)
  const rawDate = payload.date ? String(payload.date).trim() : '';
  const validTourDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDate) ? rawDate : null;
  if (rawDate && !validTourDate && rawDate !== 'To be scheduled') {
    messageParts.push(`Requested Date: ${rawDate}`);
  }

  // Map to the parent_enquiries table columns
  const recordToInsert: Record<string, any> = {
    form_type: requestType === 'Enrollment' ? 'enrollment' : requestType === 'Complaint' ? 'complaint' : 'campus_tour',
    request_type: requestType, // 'Enrollment' | 'Enquiry' | 'Complaint'
    parent_name: payload.parentName.trim(),
    phone: payload.phone.trim(),
    email: payload.email?.trim() || null,
    child_name: payload.childName?.trim() || null,
    child_age: payload.childAge?.trim() || null,
    tour_date: validTourDate,
    tour_slot: payload.preferredSlot || payload.timeSlot || null,
    message: combinedMessage,
    status: requestType === 'Complaint' ? 'pending' : 'new',
  };

  let clientInsertSuccess = false;
  let insertRes: any = null;

  // 1. Attempt direct browser-to-Supabase insertion when credentials are present in Vite bundle
  if (clientCreds.isConfigured) {
    try {
      insertRes = await insertClientRecord('parent_enquiries', recordToInsert);
      clientInsertSuccess = true;
    } catch {
      // Seamlessly fall back to server-side endpoint
    }
  }

  // Build standard return data for successful direct insert
  if (clientInsertSuccess) {
    const submissionTimestamp = formatISTDate();
    let childDetails = payload.message || payload.notes || '';
    if (payload.childName) {
      const agePart = payload.childAge ? `, Age: ${payload.childAge}` : '';
      childDetails = `${payload.childName}${agePart}${childDetails ? ` — ${childDetails}` : ''}`;
    }

    const whatsappMessage = `🏫 LITTLE NOOR MONTESSORI SCHOOL\n${
      requestType === 'Enrollment'
        ? '🌱 NEW ENROLLMENT APPLICATION'
        : requestType === 'Complaint'
        ? '📋 NEW FEEDBACK / COMPLAINT'
        : '📚 NEW CAMPUS TOUR / ENQUIRY'
    }\n\nParent Name: ${payload.parentName}\nPhone: ${payload.phone}\n${payload.date ? `Date: ${payload.date}\n` : ''}${payload.preferredSlot || payload.timeSlot ? `Slot: ${payload.preferredSlot || payload.timeSlot}\n` : ''}Details: ${childDetails || 'Submitted via website'}\nTimestamp: ${submissionTimestamp}`;

    const whatsappUrl = `https://wa.me/${SCHOOL_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    // Non-blocking notification ping
    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, request_type: requestType }),
    }).catch(() => {});

    return {
      success: true,
      tableUsed: insertRes?.table || 'parent_enquiries',
      submission: {
        id: '',
        parentName: payload.parentName,
        phone: payload.phone,
        email: payload.email,
        type: requestType === 'Enrollment' ? 'enrollment' : requestType === 'Complaint' ? 'complaint' : 'tour',
        requestType: requestType,
        formType: recordToInsert.form_type,
        date: payload.date || 'To be scheduled',
        preferredSlot: payload.preferredSlot || payload.timeSlot || 'Morning observation',
        childDetails: childDetails || 'Website submission',
        submittedAt: submissionTimestamp,
        whatsappStatus: 'pending',
        emailStatus: 'pending',
        status: 'new',
        notes: payload.message || '',
      },
      supabaseRecord: recordToInsert,
      whatsappUrl,
      whatsappMessage,
    };
  }

  // 2. Server-Side Supabase Insertion (always acts as robust primary bridge / reliable proxy)
  try {
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...payload, request_type: requestType }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.success) {
      const rawError = data.error || `Submission failed with status ${res.status}`;
      console.error('❌ Supabase submission error:', rawError);

      if (rawError.toLowerCase().includes('violates row-level security') || rawError.includes('42501')) {
        throw new Error('Supabase Row Level Security policy blocked this submission. Please verify that the anon INSERT policy is active in your Supabase SQL Editor.');
      }
      if (rawError.includes('23502') || rawError.toLowerCase().includes('null value in column')) {
        throw new Error('A required enquiry field was missing or empty.');
      }
      throw new Error(rawError);
    }

    return data;
  } catch (netErr: any) {
    console.error('❌ Network or server error during submission:', netErr);
    if (netErr.message?.includes('Row Level Security') || netErr.message?.includes('required enquiry field')) {
      throw netErr;
    }
    throw new Error(
      netErr.message || 'Unable to connect to the enquiry service. Please check your internet connection and try again.'
    );
  }
}

/**
 * Fetch enquiries from Supabase via server
 */
export async function fetchSubmissions(passcode: string = 'noor2025'): Promise<SubmissionRecord[]> {
  try {
    const res = await fetch(`/api/submissions?passcode=${encodeURIComponent(passcode)}`);
    if (res.ok) {
      const data = await res.json();
      return data.submissions || [];
    }
  } catch (err) {
    console.error('Error fetching submissions from server:', err);
  }
  return [];
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionRecord['status'],
  notes?: string
): Promise<boolean> {
  try {
    const res = await fetch(`/api/submissions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes }),
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to update submission status:', err);
    return false;
  }
}
