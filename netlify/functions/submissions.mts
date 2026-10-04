import { createClient } from '@supabase/supabase-js';

/**
 * Netlify Function serving /api/submissions in production (mirrors the Express route in server.ts).
 *
 * Uses ONLY the public Supabase URL + anon/publishable key, so all access is governed by the
 * Row Level Security policies on public.parent_enquiries. No service-role key is used or required.
 */

const SCHOOL_WHATSAPP_NUMBER = process.env.SCHOOL_WHATSAPP_NUMBER || '919978912364';
const TABLE = 'parent_enquiries';

function clean(val: string | undefined | null): string {
  if (!val) return '';
  return String(val).trim().replace(/^["']|["']$/g, '');
}

function getSupabase(userToken?: string) {
  const url = clean(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL).replace(/\/+$/, '');
  const key = clean(
    process.env.VITE_SUPABASE_ANON_KEY ||
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.SUPABASE_PUBLISHABLE_KEY
  );
  if (!url.startsWith('https://') || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: userToken ? { headers: { Authorization: `Bearer ${userToken}` } } : undefined,
  });
}

function sanitizeText(str: any): string {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim();
}

function getFormattedISTDate(): string {
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

function bearerToken(req: Request): string {
  return (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();
}

function fail(status: number, error: string) {
  return Response.json({ success: false, error }, { status });
}

async function handlePost(req: Request): Promise<Response> {
  const body: Record<string, any> = await req.json().catch(() => ({}));

  // Honeypot spam trap: pretend success without saving
  if (typeof body._hp === 'string' && body._hp.trim().length > 0) {
    return Response.json({ success: true, message: 'Request received' });
  }

  const parentName = sanitizeText(body.parent_name || body.parentName);
  const phone = sanitizeText(body.phone || body.mobileNumber);
  const email = sanitizeText(body.email);
  const rawDate = sanitizeText(body.tour_date || body.date) || 'To be scheduled';
  const slot = sanitizeText(body.tour_slot || body.preferredSlot || body.timeSlot);
  const childName = sanitizeText(body.child_name || body.childName);
  const childAge = sanitizeText(body.child_age || body.childAge || body.ageGroup);
  const program = sanitizeText(body.program);
  const notes = sanitizeText(body.notes);
  const message = sanitizeText(body.message);

  if (!parentName || parentName.length < 2) return fail(400, "Parent's full name is required.");
  if (!phone || phone.replace(/\D/g, '').length < 8) return fail(400, 'A valid WhatsApp / phone number is required.');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail(400, 'Please enter a valid email address.');

  const resolvedType = String(body.type || body.form_type || 'tour').toLowerCase();
  const requestType: 'Enrollment' | 'Enquiry' | 'Complaint' =
    body.request_type === 'Enrollment' || resolvedType === 'enrollment'
      ? 'Enrollment'
      : body.request_type === 'Complaint' || resolvedType === 'complaint'
      ? 'Complaint'
      : 'Enquiry';

  const messageParts: string[] = [];
  if (program) messageParts.push(`Program: ${program}`);
  if (notes && !notes.includes(message || '___none___')) messageParts.push(notes);
  if (message) messageParts.push(message);
  const validTourDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDate) ? rawDate : null;
  if (!validTourDate && rawDate !== 'To be scheduled') messageParts.push(`Requested Date: ${rawDate}`);
  const combinedMessage = messageParts.length > 0 ? messageParts.join(' — ') : null;

  const record: Record<string, any> = {
    form_type: requestType === 'Enrollment' ? 'enrollment' : requestType === 'Complaint' ? 'complaint' : 'campus_tour',
    request_type: requestType,
    parent_name: parentName,
    phone,
    email: email || null,
    child_name: childName || null,
    child_age: childAge || null,
    tour_date: validTourDate,
    tour_slot: slot || null,
    message: combinedMessage,
    status: requestType === 'Complaint' ? 'pending' : 'new',
  };

  const supabase = getSupabase();
  if (!supabase) {
    return fail(500, 'Supabase is not configured on the server. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  let { error } = await supabase.from(TABLE).insert([record]);
  // Older schemas may not have the request_type column yet
  if (error && error.code === 'PGRST204' && error.message?.includes('request_type')) {
    delete record.request_type;
    ({ error } = await supabase.from(TABLE).insert([record]));
  }
  if (error) {
    console.error('Supabase insert failed:', error.code, error.message);
    return fail(500, `Supabase Error (${error.code || 'INSERT'}): ${error.message}`);
  }

  const submittedAt = getFormattedISTDate();
  let childDetails = message || notes || '';
  if (childName) {
    const agePart = childAge ? `, Age: ${childAge}` : '';
    childDetails = `${childName}${agePart}${childDetails ? ` — ${childDetails}` : ''}`;
  }

  const whatsappMessage = `🏫 LITTLE NOOR MONTESSORI SCHOOL\n${
    requestType === 'Enrollment'
      ? '🌱 NEW ENROLLMENT APPLICATION'
      : requestType === 'Complaint'
      ? '📋 NEW FEEDBACK / COMPLAINT'
      : '📚 NEW CAMPUS TOUR / ENQUIRY'
  }\n\nParent Name: ${parentName}\nPhone: ${phone}\n${body.date ? `Date: ${body.date}\n` : ''}${slot ? `Slot: ${slot}\n` : ''}Details: ${childDetails || 'Submitted via website'}\nTimestamp: ${submittedAt}`;
  const whatsappUrl = `https://wa.me/${SCHOOL_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return Response.json(
    {
      success: true,
      tableUsed: TABLE,
      submission: {
        id: '',
        parentName,
        phone,
        email: email || undefined,
        type: requestType === 'Enrollment' ? 'enrollment' : requestType === 'Complaint' ? 'complaint' : 'tour',
        requestType,
        formType: record.form_type,
        date: body.date || 'To be scheduled',
        preferredSlot: slot || 'Morning observation',
        childDetails: childDetails || 'Website submission',
        submittedAt,
        whatsappStatus: 'pending',
        emailStatus: 'pending',
        status: 'new',
        notes: message || '',
      },
      supabaseRecord: record,
      whatsappUrl,
      whatsappMessage,
    },
    { status: 201 }
  );
}

async function handleGet(req: Request): Promise<Response> {
  const supabase = getSupabase(bearerToken(req) || undefined);
  if (!supabase) return Response.json({ success: true, source: 'supabase', total: 0, submissions: [] });

  let { data, error } = await supabase.from(TABLE).select('*').order('created_at', { ascending: false });
  if (error) {
    ({ data, error } = await supabase.from(TABLE).select('*'));
  }
  if (error) return fail(500, error.message);

  const submissions = (data || []).map((pe: any, idx: number) => {
    const fType = String(pe.form_type || '').toLowerCase();
    const type = fType === 'enrollment' ? 'enrollment' : fType === 'complaint' ? 'complaint' : fType === 'enquiry' ? 'enquiry' : 'tour';
    return {
      id: pe.id ? String(pe.id) : `PE-${idx + 1}`,
      parentName: pe.parent_name || 'Anonymous',
      phone: pe.phone || '',
      email: pe.email || '',
      type,
      requestType: pe.request_type || (type === 'enrollment' ? 'Enrollment' : type === 'complaint' ? 'Complaint' : 'Enquiry'),
      formType: pe.form_type || 'campus_tour',
      date: pe.tour_date || '',
      preferredSlot: pe.tour_slot || '',
      childDetails:
        [pe.child_name, pe.child_age ? `Age: ${pe.child_age}` : null, pe.message].filter(Boolean).join(' — ') ||
        'Campus observation request',
      submittedAt: pe.created_at
        ? new Date(pe.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
        : getFormattedISTDate(),
      status: pe.status || 'new',
      notes: pe.message || '',
      table: TABLE,
    };
  });

  return Response.json({ success: true, source: 'supabase', total: submissions.length, submissions });
}

async function handlePatch(req: Request, id: string): Promise<Response> {
  const token = bearerToken(req);
  if (!token) return fail(401, 'Admin sign-in is required to update submissions.');
  const supabase = getSupabase(token);
  if (!supabase) return fail(500, 'Supabase is not configured on the server.');

  const body: Record<string, any> = await req.json().catch(() => ({}));
  const updates: Record<string, any> = {};
  if (body.status) updates.status = sanitizeText(body.status);
  if (!Object.keys(updates).length) return fail(400, 'Nothing to update.');

  const { error } = await supabase.from(TABLE).update(updates).eq('id', id);
  if (error) return fail(500, error.message);
  return Response.json({ success: true });
}

export default async (req: Request, context: { params?: Record<string, string> }) => {
  try {
    const id = context?.params?.id;
    if (req.method === 'POST' && !id) return await handlePost(req);
    if (req.method === 'GET' && !id) return await handleGet(req);
    if (req.method === 'PATCH' && id) return await handlePatch(req, id);
    return fail(405, 'Method not allowed');
  } catch (err: any) {
    console.error('Submission function error:', err?.message);
    return fail(500, err?.message || 'An error occurred while processing your request. Please try again.');
  }
};

export const config = {
  path: ['/api/submissions', '/api/submissions/:id'],
};
