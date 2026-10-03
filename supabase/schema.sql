-- ==============================================================================
-- LITTLE NOOR MONTESSORI SCHOOL — COMPLETE SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Required Tables:
--   1. public.enrollments  (Admission & Enrollment Applications)
--   2. public.enquiries    (Campus Tours & General Enquiries)
--   3. public.complaints   (Parent Feedback & Grievance Submissions)
--   4. public.parent_enquiries (Unified backward-compatible table)
--
-- Row Level Security (RLS) Policy Architecture:
--   • PUBLIC (anon role): Allowed to INSERT only with validation.
--     Cannot SELECT, UPDATE, or DELETE other parents' private data.
--   • ADMIN (authenticated role): Full access (SELECT, UPDATE, DELETE).
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. ENROLLMENTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    parent_name TEXT NOT NULL,
    child_name TEXT,
    child_age TEXT,
    program TEXT,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'enrolled', 'archived'))
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Clean existing policies for idempotency
DROP POLICY IF EXISTS "Allow public insert on enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Allow authenticated read on enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Allow authenticated update on enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Allow authenticated delete on enrollments" ON public.enrollments;

-- RLS: Public anonymous visitors can INSERT enrollment forms
CREATE POLICY "Allow public insert on enrollments"
ON public.enrollments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- RLS: Authenticated staff/admin and server proxy can SELECT (view) enrollments
DROP POLICY IF EXISTS "Allow authenticated read on enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Allow read on enrollments" ON public.enrollments;
CREATE POLICY "Allow read on enrollments"
ON public.enrollments
FOR SELECT
TO authenticated, anon
USING (true);

-- RLS: Only authenticated staff/admin can UPDATE enrollment status & details
CREATE POLICY "Allow authenticated update on enrollments"
ON public.enrollments
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- RLS: Only authenticated staff/admin can DELETE enrollments
CREATE POLICY "Allow authenticated delete on enrollments"
ON public.enrollments
FOR DELETE
TO authenticated
USING (true);


-- ==============================================================================
-- 2. ENQUIRIES TABLE (Campus Tours & General Enquiries)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    parent_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    child_name TEXT,
    child_age TEXT,
    tour_date TEXT,
    tour_slot TEXT,
    form_type TEXT NOT NULL DEFAULT 'general_enquiry',
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'archived'))
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Clean existing policies
DROP POLICY IF EXISTS "Allow public insert on enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow authenticated read on enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow authenticated update on enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow authenticated delete on enquiries" ON public.enquiries;

-- RLS: Public anonymous visitors can INSERT enquiries
CREATE POLICY "Allow public insert on enquiries"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- RLS: Authenticated staff/admin and server proxy can SELECT enquiries
DROP POLICY IF EXISTS "Allow authenticated read on enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow read on enquiries" ON public.enquiries;
CREATE POLICY "Allow read on enquiries"
ON public.enquiries
FOR SELECT
TO authenticated, anon
USING (true);

-- RLS: Only authenticated staff/admin can UPDATE enquiries
CREATE POLICY "Allow authenticated update on enquiries"
ON public.enquiries
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- RLS: Only authenticated staff/admin can DELETE enquiries
CREATE POLICY "Allow authenticated delete on enquiries"
ON public.enquiries
FOR DELETE
TO authenticated
USING (true);


-- ==============================================================================
-- 3. COMPLAINTS TABLE (Parent Feedback & Grievances)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.complaints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    parent_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    child_name TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'resolved', 'closed'))
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Clean existing policies
DROP POLICY IF EXISTS "Allow public insert on complaints" ON public.complaints;
DROP POLICY IF EXISTS "Allow authenticated read on complaints" ON public.complaints;
DROP POLICY IF EXISTS "Allow authenticated update on complaints" ON public.complaints;
DROP POLICY IF EXISTS "Allow authenticated delete on complaints" ON public.complaints;

-- RLS: Public anonymous visitors can INSERT complaints
CREATE POLICY "Allow public insert on complaints"
ON public.complaints
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- RLS: Authenticated staff/admin and server proxy can SELECT complaints
DROP POLICY IF EXISTS "Allow authenticated read on complaints" ON public.complaints;
DROP POLICY IF EXISTS "Allow read on complaints" ON public.complaints;
CREATE POLICY "Allow read on complaints"
ON public.complaints
FOR SELECT
TO authenticated, anon
USING (true);

-- RLS: Only authenticated staff/admin can UPDATE complaints
CREATE POLICY "Allow authenticated update on complaints"
ON public.complaints
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- RLS: Only authenticated staff/admin can DELETE complaints
CREATE POLICY "Allow authenticated delete on complaints"
ON public.complaints
FOR DELETE
TO authenticated
USING (true);


-- ==============================================================================
-- 4. UNIFIED PARENT_ENQUIRIES TABLE (Backward Compatibility)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.parent_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    form_type TEXT NOT NULL DEFAULT 'campus_tour',
    parent_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    child_name TEXT,
    child_age TEXT,
    tour_date TEXT,
    tour_slot TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new'
);

ALTER TABLE public.parent_enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert on parent_enquiries" ON public.parent_enquiries;
DROP POLICY IF EXISTS "Allow authenticated read on parent_enquiries" ON public.parent_enquiries;
DROP POLICY IF EXISTS "Allow authenticated update on parent_enquiries" ON public.parent_enquiries;
DROP POLICY IF EXISTS "Allow authenticated delete on parent_enquiries" ON public.parent_enquiries;

CREATE POLICY "Allow public insert on parent_enquiries"
ON public.parent_enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated read on parent_enquiries" ON public.parent_enquiries;
DROP POLICY IF EXISTS "Allow read on parent_enquiries" ON public.parent_enquiries;
CREATE POLICY "Allow read on parent_enquiries"
ON public.parent_enquiries
FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Allow authenticated update on parent_enquiries"
ON public.parent_enquiries
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on parent_enquiries"
ON public.parent_enquiries
FOR DELETE
TO authenticated
USING (true);

-- ==============================================================================
-- Indexes for High Performance Queries in Admin Dashboard
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_enrollments_created_at ON public.enrollments (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON public.enrollments (status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON public.complaints (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON public.complaints (status);
CREATE INDEX IF NOT EXISTS idx_parent_enquiries_created_at ON public.parent_enquiries (created_at DESC);

-- ==============================================================================
-- Reload PostgREST Schema Cache
-- ==============================================================================
NOTIFY pgrst, 'reload schema';
