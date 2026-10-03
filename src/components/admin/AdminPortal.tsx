import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  RefreshCw,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Clock,
  Download,
  AlertCircle,
  Eye,
  LogOut,
  Key,
  FileSpreadsheet,
  FileText,
  ChevronDown,
  User,
  GraduationCap,
  Baby,
  Sparkles,
  ArrowLeft,
  X,
  CheckCircle2,
  ChevronRight,
  Database,
} from 'lucide-react';
import { SubmissionRecord } from '../../types';
import { getBrowserSupabaseClient, fetchAuthenticatedSubmissions } from '../../lib/supabase';
import { AdminLogin } from './AdminLogin';
import { ChangePasswordModal } from './ChangePasswordModal';
import { StaffMediaHub } from './StaffMediaHub';
import { exportToExcel, exportToPdf } from '../../utils/exportUtils';
import { formatParentWhatsAppLink } from '../../utils/whatsappUtils';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

interface AdminPortalProps {
  onBackToWebsite?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToWebsite }) => {
  // Session & Auth state
  const [session, setSession] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Portal Main Section ('media' = Media Upload & Management, 'admissions' = Parent Enquiries)
  const [portalSection, setPortalSection] = useState<'media' | 'admissions'>('media');

  // Submissions state
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Filter & Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'enrollment' | 'enquiry' | 'complaint'>('all');

  // Detail Modal
  const [selectedRecord, setSelectedRecord] = useState<SubmissionRecord | null>(null);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

  // 1. Listen to Supabase Auth state
  useEffect(() => {
    const supabase = getBrowserSupabaseClient();
    if (!supabase) {
      setIsAuthLoading(false);
      return;
    }

    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session: activeSession } }) => {
      setSession(activeSession);
      setIsAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setIsAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 2. Fetch submissions only when authenticated
  const loadSubmissions = async () => {
    setIsFetching(true);
    setFetchError(null);
    try {
      const data = await fetchAuthenticatedSubmissions();
      setSubmissions(data);
    } catch (err: any) {
      console.warn('Submissions load notice:', err?.message);
      setFetchError(err.message || 'Failed to fetch submissions from Supabase.');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (session) {
      loadSubmissions();
    }
  }, [session]);

  // 3. Logout action - fully terminates Supabase session, purges storage & redirects to login
  const handleLogout = async () => {
    setIsAuthLoading(true);
    const supabase = getBrowserSupabaseClient();
    if (supabase) {
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.warn('Supabase signOut notice:', err);
      }
    }

    // Clear all storage auth markers
    try {
      sessionStorage.removeItem('ln_admin_bypass');
      sessionStorage.removeItem('ln_admin_auth');
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('sb-') || key.startsWith('ln_')) {
          localStorage.removeItem(key);
        }
      });
    } catch {}

    setSession(null);
    setSubmissions([]);
    setIsAuthLoading(false);

    // Update URL if user navigated to /admin
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/admin/login');
    }
  };

  // 4. Update status in Supabase
  const handleStatusChange = async (record: SubmissionRecord, newStatus: string) => {
    const supabase = getBrowserSupabaseClient();
    if (!supabase) return;

    const targetTable = 'parent_enquiries';

    // Optimistically update local state
    setSubmissions((prev) =>
      prev.map((s) => (s.id === record.id ? { ...s, status: newStatus as any } : s))
    );

    try {
      await supabase.from(targetTable).update({ status: newStatus }).eq('id', record.id);
    } catch (e) {
      console.warn('Could not update status in parent_enquiries:', e);
    }
  };

  // 5. Counts for filter tabs based on requestType ('Enrollment', 'Enquiry', 'Complaint')
  const counts = useMemo(() => {
    let enrollmentCount = 0;
    let enquiryCount = 0;
    let complaintCount = 0;

    submissions.forEach((s) => {
      const reqType = s.requestType || (
        s.type === 'enrollment' ? 'Enrollment' : s.type === 'complaint' ? 'Complaint' : 'Enquiry'
      );
      if (reqType === 'Enrollment') enrollmentCount++;
      else if (reqType === 'Complaint') complaintCount++;
      else enquiryCount++; // Enquiries & Campus Tours
    });

    return {
      all: submissions.length,
      enrollment: enrollmentCount,
      enquiry: enquiryCount,
      complaint: complaintCount,
    };
  }, [submissions]);

  // 6. Filtered and searched records (newest first)
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const reqType = sub.requestType || (
        sub.type === 'enrollment' ? 'Enrollment' : sub.type === 'complaint' ? 'Complaint' : 'Enquiry'
      );

      // Tab filter
      if (activeTab === 'enrollment' && reqType !== 'Enrollment') return false;
      if (activeTab === 'complaint' && reqType !== 'Complaint') return false;
      if (activeTab === 'enquiry' && reqType !== 'Enquiry') return false;

      // Search filter: parent name, phone number, child name, message, or requestType
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesParent = sub.parentName?.toLowerCase().includes(query);
        const matchesPhone = sub.phone?.toLowerCase().includes(query);
        const matchesChild = sub.childName?.toLowerCase().includes(query);
        const matchesDetails = sub.childDetails?.toLowerCase().includes(query);
        const matchesMsg = sub.message?.toLowerCase().includes(query);
        const matchesProg = sub.program?.toLowerCase().includes(query);
        const matchesType = reqType.toLowerCase().includes(query);

        return (
          matchesParent ||
          matchesPhone ||
          matchesChild ||
          matchesDetails ||
          matchesMsg ||
          matchesProg ||
          matchesType
        );
      }

      return true;
    });
  }, [submissions, activeTab, searchTerm]);

  // Render Loading spinner during session verification
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F1] flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-[#1E3A2B] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-[#1E3A2B] uppercase tracking-widest">
            Verifying Admin Session...
          </p>
        </div>
      </div>
    );
  }

  // If NOT authenticated, render the dedicated Admin Login Page
  if (!session) {
    return (
      <AdminLogin
        onSuccess={() => {
          const supabase = getBrowserSupabaseClient();
          if (supabase) {
            supabase.auth.getSession().then(({ data: { session: activeSession } }) => {
              if (activeSession) {
                setSession(activeSession);
              }
            });
          }
          if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
            window.history.pushState({}, '', '/admin');
          }
        }}
        onBackToWebsite={() => {
          if (onBackToWebsite) {
            onBackToWebsite();
          } else if (typeof window !== 'undefined') {
            window.history.pushState({}, '', '/');
            window.location.href = '/';
          }
        }}
      />
    );
  }

  const adminEmail = session.user?.email || 'Administrator';

  return (
    <div className="min-h-screen bg-[#FAF8F1] text-[#1E3A2B] font-sans flex flex-col selection:bg-[#E2E8E0] selection:text-[#1E3A2B]">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#9CAF88]/25 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-[#9CAF88]/40 p-1 flex items-center justify-center shrink-0 shadow-xs">
              <img
                src="/little-noor-logo.svg"
                alt="Little Noor Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#1E3A2B] leading-none">
                  Little Noor Montessori
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#1E3A2B] text-[10px] font-bold text-[#FAF8F1] tracking-wider uppercase">
                  Staff Portal
                </span>
              </div>
              <p className="text-[11px] text-[#1E3A2B]/60 font-medium mt-0.5">
                Staff Media Hub & Admissions Management · Bhuj, Gujarat
              </p>
            </div>
          </div>

          {/* Action Header Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* Refresh Button */}
            <button
              type="button"
              onClick={loadSubmissions}
              disabled={isFetching}
              title="Refresh submissions from Supabase"
              className="px-3 py-2 rounded-xl bg-[#FAF8F1] hover:bg-[#E2E8E0] text-[#1E3A2B] text-xs font-bold border border-[#9CAF88]/30 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-[#9CAF88]' : ''}`} />
              <span className="hidden sm:inline">{isFetching ? 'Refreshing...' : 'Refresh'}</span>
            </button>

            {/* Download Backup Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
                className="px-3.5 py-2 rounded-xl bg-[#1E3A2B] hover:bg-[#254936] text-[#FAF8F1] text-xs font-bold shadow-botanical-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span>Download Backup</span>
                <ChevronDown className="w-3 h-3 text-[#FAF8F1]/60" />
              </button>

              {isExportDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsExportDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-2xl shadow-botanical-lg border border-[#9CAF88]/30 py-2 z-50 animate-in fade-in zoom-in-95">
                    <button
                      type="button"
                      onClick={() => {
                        exportToExcel(filteredSubmissions, activeTab);
                        setIsExportDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-xs font-semibold text-stone-700 hover:bg-[#FAF8F1] hover:text-[#1E3A2B] flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                      <span>Export to Excel (.xlsx)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        exportToPdf(filteredSubmissions, activeTab);
                        setIsExportDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-xs font-semibold text-stone-700 hover:bg-[#FAF8F1] hover:text-[#1E3A2B] flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-rose-600" />
                      <span>Export to PDF (.pdf)</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Change Password */}
            <button
              type="button"
              onClick={() => setIsChangePasswordOpen(true)}
              title="Change administrator password"
              className="px-3 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold border border-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Key className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span className="hidden sm:inline">Change Password</span>
            </button>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>

            {/* Return to website */}
            <button
              type="button"
              onClick={() => {
                if (onBackToWebsite) {
                  onBackToWebsite();
                } else if (typeof window !== 'undefined') {
                  window.history.pushState({}, '', '/');
                  window.location.href = '/';
                }
              }}
              title="View Public School Website"
              className="px-3 py-2 rounded-xl bg-[#FAF8F1] hover:bg-[#E2E8E0] text-[#1E3A2B] text-xs font-semibold border border-[#9CAF88]/20 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden md:inline">View Website</span>
            </button>
          </div>
        </div>
      </header>

      {/* Staff Portal Section Navigation Switcher */}
      <div className="bg-[#FAF8F1] border-b border-[#9CAF88]/25 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPortalSection('media')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                portalSection === 'media'
                  ? 'bg-[#1E3A2B] text-[#FAF8F1] shadow-botanical-xs'
                  : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200'
              }`}
            >
              <UploadCloud className="w-4 h-4 text-[#C8A96B]" />
              <span>Media & Website Updates</span>
            </button>

            <button
              type="button"
              onClick={() => setPortalSection('admissions')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                portalSection === 'admissions'
                  ? 'bg-[#1E3A2B] text-[#FAF8F1] shadow-botanical-xs'
                  : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200'
              }`}
            >
              <FileText className="w-4 h-4 text-[#9CAF88]" />
              <span>Parent Enquiries</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  portalSection === 'admissions'
                    ? 'bg-white/20 text-white'
                    : 'bg-stone-100 text-stone-600'
                }`}
              >
                {counts.all}
              </span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-500 font-sans">
            <User className="w-3.5 h-3.5 text-stone-400" />
            <span>
              Staff: <strong className="text-stone-700">{adminEmail}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {portalSection === 'media' ? (
          <StaffMediaHub
            onMediaChanged={() => {
              // Dispatched whenever media is added, published, or deleted
            }}
            onViewOnWebsite={() => {
              if (onBackToWebsite) {
                onBackToWebsite();
              } else if (typeof window !== 'undefined') {
                window.location.href = '/';
              }
            }}
          />
        ) : (
          <>
            {/* Error notification if fetching fails */}
            {fetchError && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold">Error loading database records</p>
              <p className="mt-0.5">{fetchError}</p>
            </div>
            <button
              type="button"
              onClick={loadSubmissions}
              className="px-2.5 py-1 rounded-lg bg-rose-200 hover:bg-rose-300 font-bold text-[11px] transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Filter Tabs & Real-Time Search Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-botanical-sm border border-[#9CAF88]/20 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Filter Tabs with Counts */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'all'
                    ? 'bg-[#1E3A2B] text-[#FAF8F1] shadow-xs'
                    : 'bg-[#FAF8F1] text-[#1E3A2B]/70 hover:text-[#1E3A2B] hover:bg-[#E2E8E0]'
                }`}
              >
                <span>All Submissions</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeTab === 'all'
                      ? 'bg-white/20 text-[#FAF8F1]'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {counts.all}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('enrollment')}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'enrollment'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-[#FAF8F1] text-[#1E3A2B]/70 hover:text-[#1E3A2B] hover:bg-[#E2E8E0]'
                }`}
              >
                <span>Enrollment</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeTab === 'enrollment'
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {counts.enrollment}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('enquiry')}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'enquiry'
                    ? 'bg-blue-800 text-white shadow-xs'
                    : 'bg-[#FAF8F1] text-[#1E3A2B]/70 hover:text-[#1E3A2B] hover:bg-[#E2E8E0]'
                }`}
              >
                <span>Enquiry</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeTab === 'enquiry'
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {counts.enquiry}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('complaint')}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'complaint'
                    ? 'bg-rose-800 text-white shadow-xs'
                    : 'bg-[#FAF8F1] text-[#1E3A2B]/70 hover:text-[#1E3A2B] hover:bg-[#E2E8E0]'
                }`}
              >
                <span>Complaint</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeTab === 'complaint'
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {counts.complaint}
                </span>
              </button>
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full lg:w-80">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search parent, phone, child..."
                className="w-full pl-10 pr-9 py-2.5 text-xs text-[#1E3A2B] bg-[#FAF8F1] border border-[#9CAF88]/40 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A2B]"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Submissions List / Grid */}
        {filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#9CAF88]/20 shadow-botanical-xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F1] border border-[#9CAF88]/30 flex items-center justify-center mx-auto text-stone-400">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury font-bold text-base text-[#1E3A2B]">
              No submissions match your query
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {searchTerm
                ? `No submissions found matching "${searchTerm}". Try searching another keyword.`
                : 'There are currently no submissions recorded in this category.'}
            </p>
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 rounded-xl bg-[#FAF8F1] hover:bg-[#E2E8E0] text-xs font-bold text-[#1E3A2B] border border-[#9CAF88]/30 transition-colors cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-[#1E3A2B]/60 px-1 font-medium">
              <span>
                Showing {filteredSubmissions.length} of {submissions.length} submissions (Newest first)
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-800 font-semibold">
                <Database className="w-3 h-3 text-emerald-700" />
                <span>Supabase Live Sync</span>
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredSubmissions.map((sub, idx) => {
                const reqType = sub.requestType || (
                  sub.type === 'enrollment' ? 'Enrollment' : sub.type === 'complaint' ? 'Complaint' : 'Enquiry'
                );
                const isEnrollment = reqType === 'Enrollment';
                const isComplaint = reqType === 'Complaint';
                const isTour = reqType === 'Enquiry' && (sub.formType === 'campus_tour' || sub.type === 'tour');

                // WhatsApp link calculation with dynamic thank-you message
                const { url: waUrl, hasValidPhone } = formatParentWhatsAppLink(
                  sub.phone,
                  sub.type
                );

                return (
                  <div
                    key={sub.id || `sub-${idx}`}
                    className="bg-white rounded-3xl p-5 sm:p-6 shadow-botanical-xs border border-[#9CAF88]/20 hover:border-[#9CAF88]/50 transition-all hover:shadow-botanical-md"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      {/* Left: Parent, Child, & Contact Details */}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Type Badge */}
                          {isEnrollment ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                              <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Enrollment</span>
                            </span>
                          ) : isComplaint ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5 text-rose-700" />
                              <span>Complaint</span>
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-blue-700" />
                              <span>{isTour ? 'Campus Tour' : 'Enquiry'}</span>
                            </span>
                          )}

                          <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-[#1E3A2B]">
                            {sub.parentName}
                          </h3>

                          {/* Date & Time Submitted */}
                          <span className="text-[11px] text-stone-500 font-sans flex items-center gap-1 ml-auto md:ml-0">
                            <Clock className="w-3 h-3 text-stone-400" />
                            <span>{sub.submittedAt || 'Recent'}</span>
                          </span>
                        </div>

                        {/* Contact details row */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 font-sans">
                          {/* Phone */}
                          <a
                            href={`tel:${sub.phone.replace(/\s+/g, '')}`}
                            className="inline-flex items-center gap-1 text-[#1E3A2B] font-semibold hover:text-[#9CAF88] transition-colors"
                          >
                            <Phone className="w-3 h-3 text-stone-400" />
                            <span>{sub.phone}</span>
                          </a>

                          {/* Email (if provided) */}
                          {sub.email && (
                            <a
                              href={`mailto:${sub.email}`}
                              className="inline-flex items-center gap-1 text-stone-600 hover:text-[#1E3A2B] transition-colors"
                            >
                              <Mail className="w-3 h-3 text-stone-400" />
                              <span>{sub.email}</span>
                            </a>
                          )}
                        </div>

                        {/* Child & Program Information */}
                        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-2xl bg-[#FAF8F1]/70 border border-[#9CAF88]/15 space-y-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                              Program of Interest
                            </span>
                            <span className="font-semibold text-[#1E3A2B]">
                              {sub.program || (isEnrollment ? sub.preferredSlot : 'Early Childhood Program')}
                            </span>
                          </div>

                          <div className="p-2.5 rounded-2xl bg-[#FAF8F1]/70 border border-[#9CAF88]/15 space-y-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                              Child Name & Age
                            </span>
                            <span className="font-semibold text-[#1E3A2B]">
                              {sub.childName
                                ? `${sub.childName}${sub.childAge ? ` (Age: ${sub.childAge})` : ''}`
                                : sub.childDetails || 'Not specified'}
                            </span>
                          </div>
                        </div>

                        {/* Message Preview */}
                        {(sub.message || sub.childDetails) && (
                          <div className="pt-1">
                            <p className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-2xl border border-stone-200/60 leading-relaxed italic">
                              "{sub.message || sub.childDetails}"
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Right: Quick Action Controls */}
                      <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
                        {/* Status selector */}
                        <select
                          value={sub.status || 'new'}
                          onChange={(e) => handleStatusChange(sub, e.target.value)}
                          className="px-2.5 py-1.5 text-xs font-bold rounded-xl border border-stone-200 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#1E3A2B] cursor-pointer"
                        >
                          <option value="new">Status: New</option>
                          <option value="contacted">Status: Contacted</option>
                          <option value="enrolled">Status: Enrolled</option>
                          <option value="scheduled">Status: Scheduled</option>
                          <option value="resolved">Status: Resolved</option>
                          <option value="archived">Status: Archived</option>
                        </select>

                        {/* WhatsApp Quick-Contact Button */}
                        {hasValidPhone ? (
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all transform active:scale-95 cursor-pointer"
                            title="Chat with parent on WhatsApp with pre-filled thank-you message"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            <span>WhatsApp Parent</span>
                          </a>
                        ) : (
                          <span className="text-[11px] text-stone-400 italic">
                            No contact number
                          </span>
                        )}

                        {/* View full details button */}
                        <button
                          type="button"
                          onClick={() => setSelectedRecord(sub)}
                          className="px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-[11px] font-semibold text-stone-700 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3 h-3 text-stone-500" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
          </>
        )}
      </main>

      {/* Record View Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-botanical-xl border border-[#9CAF88]/30 max-w-lg w-full overflow-hidden">
            <div className="bg-[#1E3A2B] text-[#FAF8F1] px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8A96B] block">
                  Submission Details
                </span>
                <h3 className="font-serif-luxury font-bold text-base sm:text-lg">
                  {selectedRecord.parentName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F1] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-sans max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-[#FAF8F1] border border-[#9CAF88]/20">
                  <span className="text-stone-400 font-bold uppercase text-[10px] block">Request Type</span>
                  <span className="font-bold text-[#1E3A2B] text-sm">
                    {selectedRecord.requestType || selectedRecord.type.toUpperCase()}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-[#FAF8F1] border border-[#9CAF88]/20">
                  <span className="text-stone-400 font-bold uppercase text-[10px] block">Date Submitted</span>
                  <span className="font-bold text-[#1E3A2B]">
                    {selectedRecord.submittedAt || 'Recent'}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div>
                  <span className="text-stone-400 font-bold uppercase text-[10px] block">Parent Contact</span>
                  <p className="font-bold text-[#1E3A2B] text-sm">{selectedRecord.parentName}</p>
                  <p className="text-stone-700">Phone: {selectedRecord.phone}</p>
                  {selectedRecord.email && <p className="text-stone-700">Email: {selectedRecord.email}</p>}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div>
                  <span className="text-stone-400 font-bold uppercase text-[10px] block">Child & Program</span>
                  <p className="text-stone-800 font-semibold">
                    Child: {selectedRecord.childName || 'Not specified'} {selectedRecord.childAge ? `(Age ${selectedRecord.childAge})` : ''}
                  </p>
                  <p className="text-stone-800">
                    Program: {selectedRecord.program || selectedRecord.preferredSlot || 'Early Childhood'}
                  </p>
                  {selectedRecord.date && selectedRecord.date !== 'To be scheduled' && (
                    <p className="text-stone-600">Preferred Visit: {selectedRecord.date} ({selectedRecord.preferredSlot})</p>
                  )}
                </div>
              </div>

              <div>
                <span className="text-stone-400 font-bold uppercase text-[10px] block mb-1">Parent Message / Note</span>
                <div className="p-3 rounded-2xl bg-[#FAF8F1] border border-[#9CAF88]/20 text-stone-800 leading-relaxed italic">
                  {selectedRecord.message || selectedRecord.childDetails || 'No message provided.'}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                {formatParentWhatsAppLink(selectedRecord.phone, selectedRecord.type).hasValidPhone && (
                  <a
                    href={formatParentWhatsAppLink(selectedRecord.phone, selectedRecord.type).url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Parent</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedRecord(null)}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        userEmail={adminEmail}
      />
    </div>
  );
};
