import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Check, MessageCircle, MapPin, Leaf, Loader2, Clock, User, Phone, Sparkles } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { useLanguage } from '../context/LanguageContext';
import { submitForm, SubmissionResponse } from '../services/submissionService';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  // Frictionless state containing only the 5 essential fields
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    date: '',
    timeSlot: '9:30 AM – 10:30 AM (Morning observation)',
    childName: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedName = formData.parentName.trim();
    const trimmedPhone = formData.phone.trim();
    const rawDigits = trimmedPhone.replace(/\D/g, '');

    // Validation: Parent's Full Name is required
    if (!trimmedName || trimmedName.length < 2) {
      setFormError("Please enter the parent's full name.");
      return;
    }

    // Validation: WhatsApp / Phone Number is required (at least 10 digits)
    if (rawDigits.length < 10) {
      setFormError('Please enter a valid 10-digit WhatsApp or mobile number.');
      return;
    }

    // Validation: Preferred Visit Date is required
    if (!formData.date) {
      setFormError('Please select your preferred visit date.');
      return;
    }

    // Validation: Preferred Morning Slot is required
    if (!formData.timeSlot) {
      setFormError('Please select a preferred morning slot.');
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    try {
      // Generate enquiry using only the fields that exist in this simplified form
      const response = await submitForm({
        parentName: trimmedName,
        phone: trimmedPhone,
        date: formData.date,
        preferredSlot: formData.timeSlot,
        timeSlot: formData.timeSlot,
        childName: formData.childName.trim() || undefined,
        type: 'tour',
        form_type: 'campus_tour',
        request_type: 'Enquiry',
        notes: formData.childName.trim() ? `Child: ${formData.childName.trim()}` : '',
        _hp: honeypot,
      });

      setSubmissionResult(response);
    } catch (err: any) {
      console.error('Visit appointment booking failed:', err);
      setFormError(err.message || 'We could not schedule your visit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmissionResult(null);
    setFormError(null);
    setFormData({
      parentName: '',
      phone: '',
      date: '',
      timeSlot: '9:30 AM – 10:30 AM (Morning observation)',
      childName: '',
    });
    setHoneypot('');
    onClose();
  };

  // Default minimum date to today
  const todayDateString = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1E3A2B]/75 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md bg-[#FAF8F1] rounded-3xl p-5 sm:p-7 shadow-2xl border border-[#9CAF88]/40 my-6 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={handleResetAndClose}
            type="button"
            className="absolute top-4 right-4 p-2 rounded-full text-[#1E3A2B]/60 hover:text-[#1E3A2B] hover:bg-[#E2E8E0] transition-colors focus:outline-none cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!submissionResult ? (
            <div>
              {/* Header */}
              <div className="mb-5 pr-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2E8E0] border border-[#9CAF88]/40 text-[#1E3A2B] text-xs font-bold uppercase tracking-wider mb-2">
                  <Leaf className="w-3.5 h-3.5 text-[#1E3A2B]" />
                  <span>Campus Visit</span>
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E3A2B] tracking-tight">
                  Book a School Visit
                </h3>
                <p className="text-xs sm:text-sm text-[#1E3A2B]/75 mt-1 leading-relaxed">
                  Experience our prepared Montessori classrooms in Bhuj. Quick, simple scheduling.
                </p>
              </div>

              {formError && (
                <div className="mb-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                  {formError}
                </div>
              )}

              {/* Minimal & Frictionless Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Honeypot field for bot protection */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="visit_hp_field">Do not fill this</label>
                  <input
                    type="text"
                    id="visit_hp_field"
                    name="_hp"
                    tabIndex={-1}
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                {/* 1. Parent's Full Name * */}
                <div>
                  <label className="block text-xs font-bold text-[#1E3A2B] uppercase tracking-wider mb-1">
                    Parent's Full Name <span className="text-[#9CAF88]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="e.g. Fatima Shah / Rajesh Patel"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#9CAF88]/40 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#9CAF88]/25 text-xs sm:text-sm outline-none bg-white font-medium text-[#1E3A2B] transition-all shadow-xs"
                    />
                    <User className="w-4 h-4 text-[#9CAF88] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 2. WhatsApp / Phone Number * */}
                <div>
                  <label className="block text-xs font-bold text-[#1E3A2B] uppercase tracking-wider mb-1">
                    WhatsApp / Phone Number <span className="text-[#9CAF88]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9978912364 (10 digits)"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#9CAF88]/40 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#9CAF88]/25 text-xs sm:text-sm outline-none bg-white font-medium text-[#1E3A2B] transition-all shadow-xs"
                    />
                    <Phone className="w-4 h-4 text-[#9CAF88] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Preferred Visit Date * & 4. Preferred Morning Slot * */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1E3A2B] uppercase tracking-wider mb-1">
                      Preferred Date <span className="text-[#9CAF88]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        min={todayDateString}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-[#9CAF88]/40 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#9CAF88]/25 text-xs sm:text-sm outline-none bg-white font-medium text-[#1E3A2B] transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E3A2B] uppercase tracking-wider mb-1">
                      Morning Slot <span className="text-[#9CAF88]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-2xl border border-[#9CAF88]/40 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#9CAF88]/25 text-xs outline-none bg-white font-medium text-[#1E3A2B] transition-all shadow-xs"
                      >
                        <option value="9:30 AM – 10:30 AM (Morning observation)">
                          9:30 AM – 10:30 AM
                        </option>
                        <option value="10:30 AM – 11:30 AM (Observation & guide interaction)">
                          10:30 AM – 11:30 AM
                        </option>
                        <option value="11:30 AM – 12:00 PM (After-class campus tour)">
                          11:30 AM – 12:00 PM
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 5. Child's Name (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-[#1E3A2B] uppercase tracking-wider mb-1">
                    Child's Name <span className="text-[10px] font-normal lowercase text-[#1E3A2B]/60">(optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.childName}
                      onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                      placeholder="e.g. Zain"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#9CAF88]/40 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#9CAF88]/25 text-xs sm:text-sm outline-none bg-white font-medium text-[#1E3A2B] transition-all shadow-xs"
                    />
                    <Sparkles className="w-4 h-4 text-[#9CAF88] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#1E3A2B] hover:bg-[#254936] disabled:bg-[#1E3A2B]/60 text-white font-bold text-sm shadow-botanical-md hover:shadow-botanical-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#9CAF88]" />
                        <span>Confirming Appointment...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 text-[#9CAF88]" />
                        <span>Confirm Visit Appointment</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Campus Address Hint */}
              <div className="mt-4 pt-3 border-t border-[#9CAF88]/20 flex items-center gap-2 text-[11px] text-[#1E3A2B]/60">
                <MapPin className="w-3.5 h-3.5 text-[#9CAF88] shrink-0" />
                <span>{SCHOOL_INFO.address}, {SCHOOL_INFO.city}</span>
              </div>
            </div>
          ) : (
            /* Clean Confirmation Screen */
            <div className="text-center py-3 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#E2E8E0] border border-[#9CAF88] flex items-center justify-center mx-auto text-[#1E3A2B] shadow-inner">
                <Check className="w-7 h-7 text-[#1E3A2B] stroke-[2.5]" />
              </div>

              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#9CAF88] mb-1">
                  ✓ APPOINTMENT SCHEDULED
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#1E3A2B] leading-tight">
                  We look forward to welcoming you!
                </h3>
                <p className="mt-1.5 text-xs text-[#1E3A2B]/80 max-w-xs mx-auto leading-relaxed">
                  Our admissions coordinator will contact you to confirm your classroom observation slot.
                </p>
              </div>

              {/* Summary Card with only existing fields */}
              <div className="p-3.5 rounded-2xl bg-[#E2E8E0]/60 border border-[#9CAF88]/30 text-xs text-[#1E3A2B] text-left space-y-2 max-w-sm mx-auto">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#9CAF88] block">Parent Name</span>
                    <strong className="text-xs truncate block">{submissionResult.submission.parentName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#9CAF88] block">Phone</span>
                    <strong className="text-xs block">{submissionResult.submission.phone}</strong>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#9CAF88]/20">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#9CAF88] block">Visit Date</span>
                    <strong className="text-xs block">{submissionResult.submission.date}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#9CAF88] block">Slot</span>
                    <strong className="text-xs block">{submissionResult.submission.preferredSlot}</strong>
                  </div>
                </div>
                {formData.childName && (
                  <div className="pt-2 border-t border-[#9CAF88]/20">
                    <span className="text-[10px] uppercase font-bold text-[#9CAF88] block">Child's Name</span>
                    <strong className="text-xs block">{formData.childName}</strong>
                  </div>
                )}
              </div>

              {/* Direct WhatsApp Chat Link */}
              {submissionResult.whatsappUrl && (
                <div>
                  <a
                    href={submissionResult.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#1E3A2B] text-xs font-bold transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Chat on WhatsApp (+91 99789 12364)</span>
                  </a>
                </div>
              )}

              {/* Back to Home Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-7 py-2.5 rounded-full bg-[#1E3A2B] hover:bg-[#254936] text-white font-bold text-xs shadow-botanical-xs transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
