import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Phone, MapPin, Clock, Instagram, Calendar, Send, Leaf, Mail, MessageCircle, Check, Loader2, AlertCircle, MessageSquareQuote, GraduationCap, HelpCircle } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { useLanguage } from '../context/LanguageContext';
import { submitForm, SubmissionResponse } from '../services/submissionService';

interface ContactSectionProps {
  onOpenScheduleModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenScheduleModal }) => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [inquiryType, setInquiryType] = useState<'enrollment' | 'enquiry' | 'complaint'>('enrollment');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '3',
    program: 'Nursery (Ages 3–4.5)',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!formData.parentName || !formData.phone) return;

    setIsSubmitting(true);
    setFormError(null);

    try {
      const response = await submitForm({
        parentName: formData.parentName,
        phone: formData.phone,
        email: formData.email,
        childName: formData.childName,
        childAge: formData.childAge,
        notes: inquiryType === 'enrollment' 
          ? `Program: ${formData.program}. ${formData.message}` 
          : `${inquiryType.toUpperCase()}: ${formData.message}`,
        message: formData.message,
        type: inquiryType,
        form_type: inquiryType === 'enquiry' ? 'general_enquiry' : inquiryType,
        request_type: inquiryType === 'enrollment' ? 'Enrollment' : inquiryType === 'complaint' ? 'Complaint' : 'Enquiry',
        _hp: honeypot,
      });
      setSubmissionResult(response);
    } catch (err: any) {
      console.error('Submission failed:', err);
      setFormError(err.message || 'We could not complete your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setFormError(null);
    setFormData({
      parentName: '',
      childName: '',
      childAge: '3',
      program: 'Nursery (Ages 3–4.5)',
      phone: '',
      email: '',
      message: '',
    });
    setHoneypot('');
    const homeEl = document.getElementById('home');
    if (homeEl) {
      homeEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#E2E8E0]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E8E0] text-[#1E3A2B] text-xs font-bold tracking-wider uppercase mb-4 border border-[#9CAF88]/40">
            <Leaf className="w-3.5 h-3.5 text-[#1E3A2B]" />
            <span>{t.contact.badge}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A2B] tracking-tight leading-tight">
            {t.contact.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#1E3A2B]/80 leading-relaxed font-sans max-w-2xl mx-auto">
            {t.contact.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: School Contact & Location Details */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            
            {/* Quick Contact Card */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-[#9CAF88]/35 shadow-botanical-sm space-y-6">
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1E3A2B]">
                {t.contact.cardTitle}
              </h3>

              <div className="space-y-5">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#E2E8E0] text-[#1E3A2B] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-[#9CAF88] block">
                      {t.contact.directPhone}
                    </span>
                    <a
                      href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`}
                      className="text-base sm:text-lg font-bold text-[#1E3A2B] hover:text-[#9CAF88] transition-colors"
                    >
                      {SCHOOL_INFO.phone}
                    </a>
                    <p className="text-xs text-[#1E3A2B]/60 mt-0.5">{t.contact.callHours}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#E2E8E0] text-[#1E3A2B] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-[#9CAF88] block">
                      {t.contact.campusLocation}
                    </span>
                    <p className="text-sm font-semibold text-[#1E3A2B] leading-snug">
                      {SCHOOL_INFO.address}, Bhuj, Kutch, Gujarat 370001
                    </p>
                    <p className="text-xs text-[#1E3A2B]/60 mt-0.5">{t.contact.locationNote}</p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#E2E8E0] text-[#1E3A2B] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-[#9CAF88] block">
                      {t.contact.morningSessions}
                    </span>
                    <p className="text-sm font-semibold text-[#1E3A2B]">
                      Playhouse: 9:00 AM – 11:00 AM
                    </p>
                    <p className="text-sm font-semibold text-[#1E3A2B]">
                      Nursery & Sr. Kg: 9:00 AM – 11:30 AM
                    </p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#E2E8E0] text-[#1E3A2B] flex items-center justify-center shrink-0 mt-0.5">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-[#9CAF88] block">
                      {t.contact.instagramStories}
                    </span>
                    <a
                      href={SCHOOL_INFO.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#1E3A2B] hover:text-[#9CAF88] transition-colors"
                    >
                      {SCHOOL_INFO.instagramHandle}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#E2E8E0] text-[#1E3A2B] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-[#9CAF88] block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${SCHOOL_INFO.email}`}
                      className="text-sm font-bold text-[#1E3A2B] hover:text-[#9CAF88] transition-colors break-all"
                    >
                      {SCHOOL_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Book a Tour Button in Card */}
              <div className="pt-4 border-t border-[#9CAF88]/20">
                <button
                  type="button"
                  onClick={onOpenScheduleModal}
                  className="w-full py-3.5 rounded-full bg-[#1E3A2B] hover:bg-[#2B4E3C] text-white font-bold text-sm shadow-botanical-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#9CAF88]" />
                  <span>{t.contact.bookCampusTour}</span>
                </button>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Admission Inquiry Form with Final "Wow" Moment Signature Interaction */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: -4 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:col-span-7 relative"
          >
            {/* Signature "Begin Your Journey" Soft Organic Light Spread */}
            <div
              className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-[#9CAF88]/25 via-[#E2E8E0]/40 to-[#9CAF88]/20 rounded-[36px] blur-2xl pointer-events-none -z-10 animate-gentle-pulse"
              aria-hidden="true"
            />

            <div className="bg-white p-7 sm:p-10 rounded-3xl border border-[#9CAF88]/40 shadow-botanical-lg relative overflow-hidden">
              
              {/* Subtle Watermark School Logo in Background */}
              <div
                className="absolute -right-12 -bottom-12 w-64 h-64 sm:w-80 sm:h-80 pointer-events-none select-none opacity-[0.05] z-0"
                aria-hidden="true"
              >
                <img
                  src="/little-noor-logo.svg"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#9CAF88] animate-pulse" />
                  <span className="text-[11px] font-bold text-[#9CAF88] uppercase tracking-widest">
                    Your Child's Journey Starts Here
                  </span>
                </div>

                {/* Subtle Animated Connecting Thread Line */}
                <div className="w-36 h-[1.5px] bg-[#9CAF88]/25 mb-4 overflow-hidden relative rounded-full">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full bg-gradient-to-r from-[#9CAF88] via-[#1E3A2B] to-[#9CAF88] origin-left"
                  />
                </div>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E3A2B] mb-2 tracking-tight">
                  {t.contact.formTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#1E3A2B]/75 mb-6 font-sans">
                  {t.contact.formSubtitle}
                </p>

              {submissionResult ? (
                <div className="py-8 px-4 text-center space-y-4 bg-[#E2E8E0]/40 rounded-2xl border border-[#9CAF88]/30">
                  <div className="w-14 h-14 rounded-full bg-[#E2E8E0] border border-[#9CAF88] flex items-center justify-center mx-auto text-[#1E3A2B] shadow-inner">
                    <Check className="w-7 h-7 text-[#1E3A2B] stroke-[2.5]" />
                  </div>

                  <div>
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#9CAF88] mb-1">
                      ✓ REQUEST RECEIVED
                    </span>
                    <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1E3A2B] leading-snug">
                      Thank you for contacting<br />Little Noor Montessori School.
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-[#1E3A2B]/80 max-w-sm mx-auto leading-relaxed">
                      Our team will contact you shortly to confirm your visit.
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="p-3.5 rounded-2xl bg-white/90 border border-[#9CAF88]/30 text-xs text-[#1E3A2B] text-left space-y-2 max-w-sm mx-auto">
                    {submissionResult.submission.id ? (
                      <div className="flex justify-between items-center pb-2 border-b border-[#9CAF88]/20 text-[11px]">
                        <span className="text-[#1E3A2B]/70">Supabase Record ID:</span>
                        <span className="font-mono font-bold text-[#1E3A2B]">{submissionResult.submission.id}</span>
                      </div>
                    ) : null}
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-[#1E3A2B]/70 block">Parent</span>
                        <strong>{submissionResult.submission.parentName}</strong>
                      </div>
                      <div>
                        <span className="text-[#1E3A2B]/70 block">Contact</span>
                        <strong>{submissionResult.submission.phone}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Verified Information */}
                  <div className="p-3 rounded-2xl bg-white/80 border border-[#9CAF88]/30 text-left max-w-sm mx-auto">
                    <p className="text-[11px] text-[#1E3A2B] leading-relaxed">
                      Your enquiry has been securely recorded. School administration will reach out directly to <strong>{submissionResult.submission.phone}</strong>.
                    </p>
                  </div>

                  {submissionResult.whatsappUrl && (
                    <div>
                      <a
                        href={submissionResult.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#1E3A2B] text-xs font-semibold transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Open Copy in WhatsApp</span>
                      </a>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-full bg-[#1E3A2B] text-white text-xs font-bold hover:bg-[#2B4E3C] transition-colors cursor-pointer"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {/* Honeypot field */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="_hp"
                      tabIndex={-1}
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      autoComplete="off"
                    />
                  </div>

                  {/* Form Type Tabs: Enrollment, General Enquiry, Feedback/Complaint */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E3A2B] mb-2 uppercase tracking-wider">
                      Request Type
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#FAF8F1] rounded-2xl border border-[#9CAF88]/30">
                      <button
                        type="button"
                        onClick={() => {
                          setInquiryType('enrollment');
                          setFormError(null);
                        }}
                        className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          inquiryType === 'enrollment'
                            ? 'bg-[#1E3A2B] text-white shadow-sm'
                            : 'text-[#1E3A2B]/70 hover:text-[#1E3A2B] hover:bg-white/60'
                        }`}
                      >
                        <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Enrollment</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setInquiryType('enquiry');
                          setFormError(null);
                        }}
                        className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          inquiryType === 'enquiry'
                            ? 'bg-[#1E3A2B] text-white shadow-sm'
                            : 'text-[#1E3A2B]/70 hover:text-[#1E3A2B] hover:bg-white/60'
                        }`}
                      >
                        <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Enquiry</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setInquiryType('complaint');
                          setFormError(null);
                        }}
                        className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          inquiryType === 'complaint'
                            ? 'bg-[#1E3A2B] text-white shadow-sm'
                            : 'text-[#1E3A2B]/70 hover:text-[#1E3A2B] hover:bg-white/60'
                        }`}
                      >
                        <MessageSquareQuote className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Complaint</span>
                      </button>
                    </div>
                  </div>

                  {/* Error Notification Banner */}
                  {formError && (
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <strong className="font-semibold block">Submission Error</strong>
                        <span>{formError}</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1E3A2B] mb-1.5 uppercase tracking-wider">
                        {t.contact.parentNameLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder={t.contact.parentNamePlaceholder}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#9CAF88]/40 bg-[#FAF8F1] text-sm text-[#1E3A2B] focus:outline-none focus:ring-2 focus:ring-[#9CAF88]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1E3A2B] mb-1.5 uppercase tracking-wider">
                        {t.contact.phoneLabel} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t.contact.phonePlaceholder}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#9CAF88]/40 bg-[#FAF8F1] text-sm text-[#1E3A2B] focus:outline-none focus:ring-2 focus:ring-[#9CAF88]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1E3A2B] mb-1.5 uppercase tracking-wider">
                        Email Address <span className="text-[10px] lowercase text-[#1E3A2B]/60">(optional)</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. parent@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#9CAF88]/40 bg-[#FAF8F1] text-sm text-[#1E3A2B] focus:outline-none focus:ring-2 focus:ring-[#9CAF88]"
                      />
                    </div>

                    {inquiryType === 'enrollment' ? (
                      <div>
                        <label className="block text-xs font-bold text-[#1E3A2B] mb-1.5 uppercase tracking-wider">
                          {t.contact.programLabel} *
                        </label>
                        <select
                          value={formData.program}
                          onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#9CAF88]/40 bg-[#FAF8F1] text-sm text-[#1E3A2B] focus:outline-none focus:ring-2 focus:ring-[#9CAF88]"
                        >
                          <option value="Playhouse (Ages 2–3)">Playhouse (Ages 2–3)</option>
                          <option value="Nursery (Ages 3–4.5)">Nursery (Ages 3–4.5)</option>
                          <option value="Senior KG (Ages 4.5–6)">Senior KG (Ages 4.5–6)</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-bold text-[#1E3A2B] mb-1.5 uppercase tracking-wider">
                          Subject / Topic
                        </label>
                        <input
                          type="text"
                          value={formData.program}
                          onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                          placeholder={inquiryType === 'complaint' ? 'e.g. Facilities, Transport, Billing' : 'e.g. Curriculum, Timings'}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#9CAF88]/40 bg-[#FAF8F1] text-sm text-[#1E3A2B] focus:outline-none focus:ring-2 focus:ring-[#9CAF88]"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1E3A2B] mb-1.5 uppercase tracking-wider">
                        {t.contact.childNameLabel} <span className="text-[10px] lowercase text-[#1E3A2B]/60">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.childName}
                        onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                        placeholder={t.contact.childNamePlaceholder}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#9CAF88]/40 bg-[#FAF8F1] text-sm text-[#1E3A2B] focus:outline-none focus:ring-2 focus:ring-[#9CAF88]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1E3A2B] mb-1.5 uppercase tracking-wider">
                        Child Age <span className="text-[10px] lowercase text-[#1E3A2B]/60">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.childAge}
                        onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                        placeholder="e.g. 3 years"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#9CAF88]/40 bg-[#FAF8F1] text-sm text-[#1E3A2B] focus:outline-none focus:ring-2 focus:ring-[#9CAF88]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E3A2B] mb-1.5 uppercase tracking-wider">
                      {inquiryType === 'complaint'
                        ? 'Complaint or Feedback Details *'
                        : inquiryType === 'enquiry'
                        ? 'Your Enquiry / Question *'
                        : t.contact.messageLabel}
                    </label>
                    <textarea
                      rows={2}
                      required={inquiryType === 'complaint' || inquiryType === 'enquiry'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        inquiryType === 'complaint'
                          ? 'Please describe your concern in detail so school management can resolve it...'
                          : inquiryType === 'enquiry'
                          ? 'Ask any question about curriculum, fees, timings, or admissions...'
                          : t.contact.messagePlaceholder
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#9CAF88]/40 bg-[#FAF8F1] text-sm text-[#1E3A2B] focus:outline-none focus:ring-2 focus:ring-[#9CAF88]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-cursor="open"
                    className="w-full py-4 rounded-full bg-[#1E3A2B] hover:bg-[#254936] disabled:bg-[#1E3A2B]/60 text-white font-bold text-sm sm:text-base shadow-botanical-md hover:shadow-botanical-lg flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#9CAF88]" />
                        <span>Recording Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#9CAF88]" />
                        <span>
                          {inquiryType === 'complaint'
                            ? 'Submit Complaint'
                            : inquiryType === 'enquiry'
                            ? 'Submit Enquiry'
                            : 'Begin Your Child’s Journey • Submit Application'}
                        </span>
                      </>
                    )}
                  </button>
                </form>
              )}
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
