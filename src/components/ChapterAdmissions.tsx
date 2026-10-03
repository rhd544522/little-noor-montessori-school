import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, User, Heart, ArrowRight, Lock, Check, Mail, MessageCircle, Loader2 } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { submitForm, SubmissionResponse } from '../services/submissionService';

export const ChapterAdmissions: React.FC = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    mobileNumber: '',
    email: '',
    childName: '',
    ageGroup: 'Nursery (Ages 3–4)',
    message: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const rawDigits = formData.mobileNumber.replace(/\D/g, '');
    if (rawDigits.length < 10) {
      setFormError('Please provide a valid 10-digit mobile number.');
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    try {
      const response = await submitForm({
        parentName: formData.parentName,
        phone: formData.mobileNumber,
        email: formData.email,
        childName: formData.childName,
        childAge: formData.ageGroup,
        message: formData.message,
        notes: `Selected Program: ${formData.ageGroup}. ${formData.message}`,
        type: 'enrollment',
        form_type: 'enrollment',
        request_type: 'Enrollment',
        _hp: honeypot,
      });

      setSubmissionResult(response);
    } catch (err: any) {
      console.error('Enrollment submission error:', err);
      setFormError(err.message || 'Submission could not be completed right now. Please call +91 99789 12364.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setFormError(null);
    setFormData({
      parentName: '',
      mobileNumber: '',
      email: '',
      childName: '',
      ageGroup: 'Nursery (Ages 3–4)',
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
    <section id="admissions" className="py-20 bg-[#FAF8F1] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-[#9CAF88]/35 shadow-botanical-md">
          {submissionResult ? (
            /* Beautiful Success Confirmation Screen */
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-6 space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-[#E2E8E0] border border-[#9CAF88] flex items-center justify-center mx-auto text-[#1E3A2B]">
                <Check className="w-8 h-8 text-[#1E3A2B] stroke-[2.5]" />
              </div>

              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#9CAF88] mb-1">
                  ✓ REQUEST RECEIVED
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E3A2B] leading-tight">
                  Thank you for contacting<br />Little Noor Montessori School.
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#1E3A2B]/80 max-w-sm mx-auto leading-relaxed">
                  Our team will contact you shortly to confirm your visit.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-[#E2E8E0]/60 border border-[#9CAF88]/30 text-xs text-[#1E3A2B] text-left space-y-2 max-w-md mx-auto">
                {submissionResult.submission.id ? (
                  <div className="flex justify-between items-center pb-2 border-b border-[#9CAF88]/20 text-[11px]">
                    <span className="text-[#1E3A2B]/70">Supabase Record ID:</span>
                    <span className="font-mono font-bold text-[#1E3A2B]">{submissionResult.submission.id}</span>
                  </div>
                ) : null}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-[11px] text-[#1E3A2B]/70 block">Parent Name</span>
                    <strong className="text-xs">{submissionResult.submission.parentName}</strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#1E3A2B]/70 block">Contact</span>
                    <strong className="text-xs">{submissionResult.submission.phone}</strong>
                  </div>
                </div>
                <div className="pt-1 border-t border-[#9CAF88]/20">
                  <span className="text-[11px] text-[#1E3A2B]/70 block">Program & Child Details</span>
                  <strong className="text-xs">{submissionResult.submission.childDetails}</strong>
                </div>
              </div>

              {/* Verified Admissions Information */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#9CAF88]/30 text-left max-w-md mx-auto">
                <p className="text-xs text-[#1E3A2B] leading-relaxed">
                  Your enrollment application has been recorded in the admissions database. Our admissions coordinator will reach out to you directly at <strong>{submissionResult.submission.phone}</strong> to guide you through the next steps.
                </p>
              </div>

              {submissionResult.whatsappUrl && (
                <div>
                  <a
                    href={submissionResult.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#1E3A2B] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Direct Chat with Admissions (+91 99789 12364)</span>
                  </a>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-3 rounded-full bg-[#1E3A2B] hover:bg-[#2B4E3C] text-white font-bold text-xs sm:text-sm shadow-botanical-sm transition-all cursor-pointer"
                >
                  Back to Home
                </button>
              </div>
            </motion.div>
          ) : (
            /* Enrollment Form */
            <div>
              <div className="text-center mb-6">
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E3A2B]">
                  Enrollment & Admissions Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-[#1E3A2B]/75 mt-1">
                  Begin your child's Montessori journey at Little Noor in Bhuj.
                </p>
              </div>

              {formError && (
                <div className="mb-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Honeypot */}
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

                {/* Parent / Guardian Name */}
                <div>
                  <label htmlFor="admissions-parent-name" className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B] mb-1.5">
                    Parent / Guardian Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="admissions-parent-name"
                      type="text"
                      required
                      placeholder="e.g. Fatima / Rajesh Patel"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#9CAF88]/40 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#9CAF88]/20 text-xs sm:text-sm outline-none bg-white font-medium text-[#1E3A2B]"
                    />
                  </div>
                </div>

                {/* Mobile Number & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="admissions-mobile" className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B] mb-1.5">
                      WhatsApp / Phone *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="admissions-mobile"
                        type="tel"
                        required
                        placeholder="e.g. 9978912364 (10 digits)"
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#9CAF88]/40 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#9CAF88]/20 text-xs sm:text-sm outline-none bg-white font-medium text-[#1E3A2B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="admissions-email" className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B] mb-1.5">
                      Email Address <span className="text-[10px] lowercase text-[#1E3A2B]/60">(optional)</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="admissions-email"
                        type="email"
                        placeholder="e.g. parent@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#9CAF88]/40 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#9CAF88]/20 text-xs sm:text-sm outline-none bg-white font-medium text-[#1E3A2B]"
                      />
                    </div>
                  </div>
                </div>

                {/* Child's Name & Age Group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="admissions-child-name" className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B] mb-1.5">
                      Child’s Name *
                    </label>
                    <div className="relative">
                      <Heart className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="admissions-child-name"
                        type="text"
                        required
                        placeholder="e.g. Aayan Patel"
                        value={formData.childName}
                        onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#9CAF88]/40 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#9CAF88]/20 text-xs sm:text-sm outline-none bg-white font-medium text-[#1E3A2B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="admissions-age-group" className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B] mb-1.5">
                      Age Group / Class *
                    </label>
                    <select
                      id="admissions-age-group"
                      value={formData.ageGroup}
                      onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#9CAF88]/40 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#9CAF88]/20 text-xs sm:text-sm outline-none bg-white font-medium text-[#1E3A2B]"
                    >
                      <option value="Playhouse (Play Group, Ages 2–3)">Playhouse / Play Group (Ages 2–3) · 9:00 AM – 11:00 AM</option>
                      <option value="Nursery (Ages 3–4)">Nursery (Ages 3–4) · 9:00 AM – 11:30 AM</option>
                      <option value="Sr. Kg (Ages 4–5)">Sr. Kg (Ages 4–5) · 9:00 AM – 11:30 AM</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="admissions-message" className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B] mb-1.5">
                    Message or Queries (Optional)
                  </label>
                  <textarea
                    id="admissions-message"
                    rows={2}
                    placeholder="Tell us about your child's personality, previous schooling, or questions you have..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#9CAF88]/40 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#9CAF88]/20 text-xs sm:text-sm outline-none bg-white font-medium text-[#1E3A2B]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    id="admissions-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#1E3A2B] hover:bg-[#2B4E3C] disabled:bg-[#1E3A2B]/60 text-white font-bold text-sm shadow-botanical-sm hover:shadow-botanical-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#9CAF88]" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Enrollment Enquiry</span>
                        <ArrowRight className="w-4 h-4 text-[#9CAF88]" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <span className="text-[11px] text-[#1E3A2B]/70 inline-flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#9CAF88]" />
                    Direct admissions helpline: {SCHOOL_INFO.phone} · Bhuj, Gujarat
                  </span>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
