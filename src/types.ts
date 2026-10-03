export type AgeGroup = 'Play Group' | 'Nursery' | 'Sr. Kg';

export interface ProgramItem {
  id: string;
  title: string;
  ageRange: string;
  tagline: string;
  description: string;
  bulletPoints: string[];
  timing: string;
  days?: string;
  holidayNote?: string;
  accentColor: string;
  badgeBg: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  iconName: 'Sun' | 'Sparkles' | 'Trees' | 'BookOpen';
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Classroom' | 'Activities' | 'Learning Corner' | 'Outdoor Play';
  caption: string;
  imageUrl: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  parentName: string;
  role: string;
  childInfo: string;
  quote: string;
  rating: number;
  highlight: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Montessori Method' | 'Admissions & Visits' | 'Daily Routines' | 'General';
}

export interface AdmissionFormData {
  parentName: string;
  mobileNumber: string;
  email?: string;
  childName: string;
  ageGroup: AgeGroup;
  message: string;
}

export interface VisitFormData {
  parentName: string;
  phone: string;
  email?: string;
  date: string;
  timeSlot: string;
  childName?: string;
  childAge?: string;
  message?: string;
  notes: string;
}

export interface SubmissionRecord {
  id: string;
  parentName: string;
  phone: string;
  email?: string;
  type: 'tour' | 'enrollment' | 'enquiry' | 'complaint';
  requestType?: 'Enrollment' | 'Enquiry' | 'Complaint' | string;
  formType?: string;
  date: string;
  preferredSlot: string;
  childDetails: string;
  submittedAt: string;
  whatsappStatus?: 'sent' | 'queued' | 'pending';
  emailStatus?: 'sent' | 'queued' | 'pending';
  status: 'new' | 'contacted' | 'confirmed' | 'completed' | 'enrolled' | 'scheduled' | 'resolved' | 'archived' | 'cancelled';
  notes?: string;
  program?: string;
  childName?: string;
  childAge?: string;
  message?: string;
  table?: string;
  rawCreatedAt?: string;
}

export interface TourHotspot {
  id: string;
  x: number; // percentage from left 0-100
  y: number; // percentage from top 0-100
  title: string;
  description: string;
  category: 'Material' | 'Environment' | 'Safety' | 'Nature';
}

export interface TourViewpoint {
  id: string;
  label: string;
  angleTag: string;
  imageUrl: string;
  description: string;
  hotspots: TourHotspot[];
}

export interface VirtualTourLocation {
  id: string;
  name: string;
  tag: string;
  ageBadge: string;
  summary: string;
  highlights: string[];
  viewpoints: TourViewpoint[];
}

export type MediaCategory =
  | 'Classroom'
  | 'Activities'
  | 'Events'
  | 'Celebrations'
  | 'School Life'
  | 'Other';

export type MediaType = 'photo' | 'video';

export type MediaStatus = 'published' | 'draft';

export interface SchoolMediaItem {
  id: string;
  title: string;
  description?: string | null;
  media_type: MediaType;
  category: MediaCategory;
  file_url: string;
  thumbnail_url?: string | null;
  status: MediaStatus;
  created_at?: string;
  updated_at?: string;
}

