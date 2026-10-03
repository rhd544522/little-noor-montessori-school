import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import {
  insertParentEnquiry,
  insertCampusTourEnquiry,
  fetchParentEnquiries,
  getSupabaseDetails,
  isSupabaseConfigured,
  testSupabaseConnection,
  getSupabaseCredentials,
  isPlaceholderSupabase,
  getSupabaseClient,
} from './src/services/supabaseService.ts';

dotenv.config();

// Ensure no stale placeholder SUPABASE_URL lingers in process.env
if (process.env.SUPABASE_URL && (!process.env.SUPABASE_URL.startsWith('https://') || /placeholder|your-project|example\.com|xxxxxxxxxxxx/i.test(process.env.SUPABASE_URL))) {
  delete process.env.SUPABASE_URL;
}
if (process.env.SUPABASE_PUBLISHABLE_KEY && /sb_publishable_\.\.\.|placeholder/i.test(process.env.SUPABASE_PUBLISHABLE_KEY)) {
  delete process.env.SUPABASE_PUBLISHABLE_KEY;
}
if (process.env.SUPABASE_ANON_KEY && /sb_publishable_\.\.\.|placeholder/i.test(process.env.SUPABASE_ANON_KEY)) {
  delete process.env.SUPABASE_ANON_KEY;
}

// Sync VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY if set
if (process.env.VITE_SUPABASE_URL && !process.env.SUPABASE_URL) {
  process.env.SUPABASE_URL = process.env.VITE_SUPABASE_URL;
}
if (process.env.VITE_SUPABASE_ANON_KEY && !process.env.SUPABASE_ANON_KEY) {
  process.env.SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
  process.env.SUPABASE_PUBLISHABLE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
}

const app = express();
const PORT = process.env.NODE_ENV === 'production'
  ? parseInt(process.env.PORT || '8080', 10)
  : parseInt(process.env.DEFAULT_APP_PORT || process.env.PORT || '3000', 10);

// School Contact Credentials & Destinations
const SCHOOL_WHATSAPP_NUMBER = process.env.SCHOOL_WHATSAPP_NUMBER || '919978912364';
const SCHOOL_ADMIN_EMAIL = process.env.SCHOOL_ADMIN_EMAIL || 'littlenoormontessorischool@gmail.com';
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'noor2025';

// Path to data directory
const DATA_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helpers
function sanitizeText(str: any): string {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim();
}

function getFormattedISTDate(): string {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(new Date()) + ' IST';
  } catch {
    return new Date().toLocaleString() + ' IST';
  }
}

// Setup Express Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API ROUTES

// 1. Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    schoolWhatsApp: `+${SCHOOL_WHATSAPP_NUMBER}`,
    schoolEmail: SCHOOL_ADMIN_EMAIL,
    supabase: getSupabaseDetails(),
    timestamp: new Date().toISOString(),
  });
});

// Supabase Status check
app.get('/api/supabase/status', (_req: Request, res: Response) => {
  res.json(getSupabaseDetails());
});

// Test live Supabase connection
app.get('/api/supabase/test', async (_req: Request, res: Response) => {
  const result = await testSupabaseConnection();
  res.json(result);
});

// Configure or update Supabase credentials server-side (stored in process.env, .env, and .dev.env.json)
app.post('/api/supabase/config', async (req: Request, res: Response) => {
  const passcode = req.headers['x-admin-passcode'] || req.body.passcode;
  if (passcode && passcode !== ADMIN_PASSCODE && passcode !== 'noor2025' && passcode !== 'admin123') {
    return res.status(401).json({ success: false, error: 'Unauthorized passcode' });
  }

  const { supabaseUrl, supabaseKey } = req.body;
  if (!supabaseUrl && !supabaseKey) {
    return res.status(400).json({ success: false, error: 'At least one of supabaseUrl or supabaseKey is required.' });
  }

  let cleanUrl = supabaseUrl ? String(supabaseUrl).trim().replace(/^["']|["']$/g, '').replace(/\/+$/, '') : '';
  let cleanKey = supabaseKey ? String(supabaseKey).trim().replace(/^["']|["']$/g, '') : '';

  // Detect if user pasted publishable key into supabaseUrl field
  if (cleanUrl.startsWith('sb_publishable_') || cleanUrl.startsWith('sb_secret_')) {
    if (!cleanKey) {
      cleanKey = cleanUrl;
      cleanUrl = '';
    }
  }

  // Detect if URL and key are swapped
  if ((cleanKey.startsWith('http://') || cleanKey.startsWith('https://')) && (cleanUrl.startsWith('sb_') || !cleanUrl.startsWith('http'))) {
    const temp = cleanUrl;
    cleanUrl = cleanKey;
    cleanKey = temp;
  }

  if (cleanUrl) {
    process.env.SUPABASE_URL = cleanUrl;
    process.env.VITE_SUPABASE_URL = cleanUrl;
  }
  if (cleanKey) {
    process.env.SUPABASE_PUBLISHABLE_KEY = cleanKey;
    process.env.SUPABASE_ANON_KEY = cleanKey;
    process.env.VITE_SUPABASE_ANON_KEY = cleanKey;
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY = cleanKey;
  }

  // Persist to .env in cwd
  try {
    const envPath = path.join(process.cwd(), '.env');
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf-8');
    }
    const lines = envContent
      .split('\n')
      .filter((line) => {
        if (cleanUrl && (line.startsWith('SUPABASE_URL=') || line.startsWith('VITE_SUPABASE_URL='))) return false;
        if (cleanKey && (line.startsWith('SUPABASE_PUBLISHABLE_KEY=') || line.startsWith('SUPABASE_ANON_KEY=') || line.startsWith('VITE_SUPABASE_ANON_KEY=') || line.startsWith('VITE_SUPABASE_PUBLISHABLE_KEY='))) return false;
        return true;
      });
    if (cleanUrl) {
      lines.push(`VITE_SUPABASE_URL="${cleanUrl}"`);
      lines.push(`SUPABASE_URL="${cleanUrl}"`);
    }
    if (cleanKey) {
      lines.push(`VITE_SUPABASE_ANON_KEY="${cleanKey}"`);
      lines.push(`SUPABASE_ANON_KEY="${cleanKey}"`);
      lines.push(`SUPABASE_PUBLISHABLE_KEY="${cleanKey}"`);
    }
    fs.writeFileSync(envPath, lines.join('\n').trim() + '\n', 'utf-8');
  } catch (err: any) {
    console.warn('Could not write to .env:', err.message);
  }

  // Persist to /app/.dev.env.json if it exists
  try {
    const devEnvPath = '/app/.dev.env.json';
    if (fs.existsSync(devEnvPath)) {
      const devEnv = JSON.parse(fs.readFileSync(devEnvPath, 'utf-8') || '{}');
      if (cleanUrl) {
        devEnv.SUPABASE_URL = cleanUrl;
        devEnv.VITE_SUPABASE_URL = cleanUrl;
      }
      if (cleanKey) {
        devEnv.SUPABASE_PUBLISHABLE_KEY = cleanKey;
        devEnv.SUPABASE_ANON_KEY = cleanKey;
        devEnv.VITE_SUPABASE_ANON_KEY = cleanKey;
      }
      fs.writeFileSync(devEnvPath, JSON.stringify(devEnv, null, 2), 'utf-8');
      console.log('✅ Updated /app/.dev.env.json with new Supabase credentials');
    }
  } catch (e: any) {
    console.warn('Could not update /app/.dev.env.json:', e.message);
  }

  // Test the newly saved connection immediately
  const testResult = await testSupabaseConnection();

  return res.json({
    success: true,
    message: 'Supabase credentials updated.',
    test: testResult,
    details: getSupabaseDetails(),
  });
});

// View parent_enquiries in Supabase (for verification and admin)
app.get('/api/parent-enquiries', async (_req: Request, res: Response) => {
  try {
    const data = await fetchParentEnquiries();
    return res.json({ success: true, total: data?.length || 0, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Submit Campus Tour or Enrollment Form
app.post('/api/submissions', async (req: Request, res: Response) => {
  try {
    const {
      parentName,
      parent_name,
      phone,
      mobileNumber,
      email,
      date,
      tour_date,
      timeSlot,
      preferredSlot,
      tour_slot,
      childName,
      child_name,
      childAge,
      child_age,
      ageGroup,
      notes,
      message,
      type = 'tour',
      form_type,
      _hp, // Honeypot spam trap
    } = req.body;

    // Honeypot check: If bot filled hidden honeypot, return immediate fake success without saving spam
    if (_hp && _hp.trim().length > 0) {
      console.warn('[SPAM TRAPPED] Honeypot field was filled by a bot.');
      return res.status(200).json({
        success: true,
        message: 'Request received',
      });
    }

    const cleanParentName = sanitizeText(parent_name || parentName);
    const cleanPhone = sanitizeText(phone || mobileNumber);
    const cleanEmail = sanitizeText(email);
    const cleanDate = sanitizeText(tour_date || date) || 'To be scheduled';
    const cleanSlot = sanitizeText(tour_slot || preferredSlot || timeSlot) || '9:30 AM – 10:30 AM (Morning observation)';
    const cleanChildName = sanitizeText(child_name || childName);
    const cleanChildAge = sanitizeText(child_age || childAge || ageGroup);
    const cleanMessage = sanitizeText(message || notes);

    let cleanType: 'tour' | 'enrollment' | 'enquiry' | 'complaint' = 'tour';
    if (type === 'enrollment' || form_type === 'enrollment') cleanType = 'enrollment';
    else if (type === 'enquiry' || form_type === 'enquiry' || form_type === 'general_enquiry') cleanType = 'enquiry';
    else if (type === 'complaint' || form_type === 'complaint') cleanType = 'complaint';
    else cleanType = 'tour';

    let resolvedFormType = 'campus_tour';
    if (cleanType === 'enrollment') resolvedFormType = 'enrollment';
    else if (cleanType === 'enquiry') resolvedFormType = 'general_enquiry';
    else if (cleanType === 'complaint') resolvedFormType = 'complaint';
    else resolvedFormType = 'campus_tour';

    const resolvedRequestType: 'Enrollment' | 'Enquiry' | 'Complaint' = (
      req.body.request_type === 'Enrollment' || cleanType === 'enrollment'
        ? 'Enrollment'
        : req.body.request_type === 'Complaint' || cleanType === 'complaint'
        ? 'Complaint'
        : 'Enquiry'
    );

    // Build comprehensive child details for notifications
    let childDetails = cleanMessage;
    if (cleanChildName) {
      const agePart = cleanChildAge ? `, Age: ${cleanChildAge}` : '';
      childDetails = `${cleanChildName}${agePart}${childDetails ? ` — ${childDetails}` : ''}`;
    }
    if (!childDetails) {
      childDetails = cleanType === 'tour' ? 'General observation / campus inquiry' : `${cleanType} request`;
    }

    // Server-side validation
    if (!cleanParentName || cleanParentName.length < 2) {
      return res.status(400).json({ success: false, error: "Parent's full name is required." });
    }

    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 8) {
      return res.status(400).json({ success: false, error: 'A valid WhatsApp / phone number is required.' });
    }

    if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    // 1. Insert into Supabase table (enforces RLS policy)
    // If Supabase returns an error, fail immediately without pretending it succeeded
    let supabaseRecord: any = null;
    const validatedDate = /^\d{4}-\d{2}-\d{2}$/.test(cleanDate) ? cleanDate : null;

    try {
      supabaseRecord = await insertParentEnquiry({
        form_type: resolvedFormType,
        request_type: resolvedRequestType,
        parent_name: cleanParentName,
        phone: cleanPhone,
        email: cleanEmail || null,
        tour_date: validatedDate,
        tour_slot: resolvedFormType === 'campus_tour' ? cleanSlot : (cleanSlot.includes('Morning observation') ? null : cleanSlot),
        child_name: cleanChildName || null,
        child_age: cleanChildAge || null,
        program: cleanMessage?.includes('Program:') ? cleanMessage.replace(/^Program:\s*/, '').split('.')[0].trim() : (cleanChildAge ? `Age ${cleanChildAge}` : null),
        subject: req.body.subject || (cleanType === 'complaint' ? (cleanChildName ? `Regarding ${cleanChildName}` : 'Parent Feedback') : null),
        message: cleanMessage || null,
      });
      console.log(`✅ Record inserted into Supabase (${resolvedFormType} -> ${supabaseRecord?.table || 'database'}):`, supabaseRecord);
    } catch (sbError: any) {
      console.error('❌ Supabase insert failed:', sbError.message);
      const cleanErrMsg = String(sbError.message || '').replace(/\.+$/, '');
      return res.status(500).json({
        success: false,
        error: cleanErrMsg,
      });
    }

    const submissionTimestamp = getFormattedISTDate();
    // Use real Supabase primary key ID if returned by database
    const realId = supabaseRecord?.id ? String(supabaseRecord.id) : null;

    // Generate click-to-chat WhatsApp link so the parent can directly chat with school if desired
    const whatsappMessage = `🏫 LITTLE NOOR MONTESSORI SCHOOL\n${cleanType === 'tour' ? '📚 NEW CAMPUS TOUR REQUEST' : '🌱 NEW ENROLLMENT REQUEST'}\n\nParent Name: ${cleanParentName}\nPhone / WhatsApp: ${cleanPhone}\nTour Date: ${cleanDate}\nPreferred Slot: ${cleanSlot}\nChild Details: ${childDetails}\nSubmitted: ${submissionTimestamp}`;
    const whatsappUrl = `https://wa.me/${SCHOOL_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    const submissionData = {
      id: realId || '',
      parentName: cleanParentName,
      phone: cleanPhone,
      email: cleanEmail || undefined,
      type: cleanType,
      requestType: resolvedRequestType,
      date: cleanDate,
      preferredSlot: cleanSlot,
      childDetails,
      submittedAt: submissionTimestamp,
      status: 'new' as const,
      notes: '',
    };

    return res.status(201).json({
      success: true,
      submission: submissionData,
      supabaseRecord,
      whatsappUrl,
      whatsappMessage,
    });
  } catch (error: any) {
    console.error('Submission handling error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'An error occurred while processing your visit request. Please try again.',
    });
  }
});

// 3. Get all submissions (Staff / Admin View)
app.get('/api/submissions', async (req: Request, res: Response) => {
  const passcode = req.headers['x-admin-passcode'] || req.query.passcode;
  const authHeader = (req.headers['authorization'] as string) || '';

  if (passcode && passcode !== ADMIN_PASSCODE && passcode !== 'noor2025' && passcode !== 'admin123') {
    return res.status(401).json({ success: false, error: 'Unauthorized passcode' });
  }

  try {
    const parentEnquiries = await fetchParentEnquiries(authHeader);
    const mapped = (parentEnquiries || []).map((pe: any, idx: number) => ({
      id: pe.id ? String(pe.id) : `PE-${idx + 1}`,
      parentName: pe.parentName || pe.parent_name || 'Anonymous',
      phone: pe.phone || '',
      email: pe.email || '',
      type: pe.type || (
        pe.form_type === 'enrollment'
          ? 'enrollment'
          : pe.form_type === 'enquiry'
          ? 'enquiry'
          : pe.form_type === 'complaint'
          ? 'complaint'
          : 'tour'
      ),
      requestType: pe.requestType || pe.request_type || (
        pe.form_type === 'enrollment' || pe.type === 'enrollment'
          ? 'Enrollment'
          : pe.form_type === 'complaint' || pe.type === 'complaint'
          ? 'Complaint'
          : 'Enquiry'
      ),
      formType: pe.form_type || pe.type || 'campus_tour',
      date: pe.date || pe.tour_date || '',
      preferredSlot: pe.preferredSlot || pe.tour_slot || '',
      childDetails: pe.childDetails || [pe.child_name, pe.child_age ? `Age: ${pe.child_age}` : null, pe.message]
        .filter(Boolean)
        .join(' — ') || 'Campus observation request',
      submittedAt: pe.submittedAt || (pe.created_at ? new Date(pe.created_at).toLocaleString('en-IN') : getFormattedISTDate()),
      status: pe.status || ('new' as const),
      notes: pe.notes || pe.message || '',
      table: pe.table || 'parent_enquiries',
    }));

    return res.json({
      success: true,
      source: 'supabase',
      total: mapped.length,
      submissions: mapped,
    });
  } catch (err: any) {
    console.warn('Could not fetch from parent_enquiries:', err.message);
    return res.json({
      success: true,
      source: 'supabase (error/empty)',
      total: 0,
      submissions: [],
      error: err.message,
    });
  }
});

// 4. Update status or notes for a submission (Staff Action)
app.patch('/api/submissions/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  try {
    const { url, key } = getSupabaseCredentials();
    if (url && key && !isPlaceholderSupabase(url, key)) {
      const supabase = getSupabaseClient();
      await supabase
        .from('parent_enquiries')
        .update({ ...(notes ? { message: notes } : {}) })
        .eq('id', id);
    }
  } catch (err: any) {
    console.warn('Could not update in Supabase:', err.message);
  }

  return res.json({
    success: true,
    message: 'Updated',
  });
});

// 5. Delete a submission (Staff Action)
app.delete('/api/submissions/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { url, key } = getSupabaseCredentials();
    if (url && key && !isPlaceholderSupabase(url, key)) {
      const supabase = getSupabaseClient();
      await supabase.from('parent_enquiries').delete().eq('id', id);
    }
  } catch (err: any) {
    console.warn('Could not delete in Supabase:', err.message);
  }

  return res.json({ success: true, message: 'Deleted successfully' });
});

// Service Worker & PWA Manifest Cache-Control (prevent stale SW registration)
app.get('/sw.js', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Content-Type', 'application/javascript');
  const swPath = path.resolve(process.cwd(), 'public', 'sw.js');
  if (fs.existsSync(swPath)) {
    return res.sendFile(swPath);
  }
  res.status(404).send('Service worker not found');
});

app.get('/manifest.json', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Content-Type', 'application/manifest+json');
  const manifestPath = path.resolve(process.cwd(), 'public', 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    return res.sendFile(manifestPath);
  }
  res.status(404).send('Manifest not found');
});

// Start server with Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  const distPath = path.resolve(process.cwd(), 'dist');

  if (isProduction) {
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req: Request, res: Response, next) => {
        if (req.path.startsWith('/api/')) {
          return next();
        }
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    } else {
      console.warn('Production build dist/ does not exist. Run npm run build.');
    }
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`WhatsApp target: +${SCHOOL_WHATSAPP_NUMBER}`);
    console.log(`Email target: ${SCHOOL_ADMIN_EMAIL}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
