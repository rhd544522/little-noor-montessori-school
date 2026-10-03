# Little Noor Montessori School — Supabase Database Integration

This project connects directly to your **Supabase PostgreSQL Database** to store and manage parent submissions:
- **Enrollment Applications** (`public.enrollments`)
- **Campus Tours & Enquiries** (`public.enquiries`)
- **Parent Feedback & Grievances** (`public.complaints`)
- **Unified Enquiries Table** (`public.parent_enquiries`)

---

## 1. Disabling / Removing Database Webhooks (If Created)

If you previously set up Database Webhooks in your Supabase Dashboard pointing to the edge functions (`send-enquiry-email` or `handle-parent-enquiry`):

1. Go to **Supabase Dashboard** -> Select your project -> **Database** (left sidebar) -> **Webhooks**.
2. Select any webhooks created for `enrollments`, `enquiries`, `complaints`, or `parent_enquiries`.
3. Click **Delete Webhook** or toggle them **Off / Disabled**.

If you added triggers via SQL, you can run this clean-up script in the **SQL Editor**:
```sql
-- Remove any leftover webhook triggers
DROP TRIGGER IF EXISTS on_enrollment_inserted ON public.enrollments;
DROP TRIGGER IF EXISTS on_enquiry_inserted ON public.enquiries;
DROP TRIGGER IF EXISTS on_complaint_inserted ON public.complaints;
DROP TRIGGER IF EXISTS on_parent_enquiry_inserted ON public.parent_enquiries;
```

---

## 2. Database Schema & RLS Policies

See `supabase/schema.sql` for the full idempotent schema and Row Level Security policies.

- **Public Anonymous Visitors**: Can `INSERT` new submissions directly with instant validation.
- **School Staff (Admin Portal)**: Can `SELECT`, `UPDATE` statuses (`new`, `confirmed`, `completed`), and manage notes securely.
