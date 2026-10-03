import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, CheckCircle2, Phone, Calendar, User, PhoneCall, Baby, MessageSquare, ArrowRight, AlertCircle } from 'lucide-react';
import { AdmissionFormData, AgeGroup } from '../types';
import { ADMISSION_STEPS, SCHOOL_INFO } from '../data/schoolData';
import { submitForm } from '../services/submissionService';

interface AdmissionsSectionProps {
  preselectedAgeGroup?: AgeGroup | null;
  onOpenScheduleModal: () => void;
}

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({
  preselectedAgeGroup,
  onOpenScheduleModal,
}) => {
  const [formData, setFormData] = useState<AdmissionFormData>({
    parentName: '',
    mobileNumber: '',
    childName: '',
    ageGroup: preselectedAgeGroup || 'Play Group',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<AdmissionFormData | null>(null);
  const [referenceId, setReferenceId] = useState('');

  // Update if preselected changes from outside
  React.useEffect(() => {
    if (preselectedAgeGroup) {
      setFormData((prev) => ({ ...prev, ageGroup: preselectedAgeGroup }));
    }
  }, [preselectedAgeGroup]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormError(null);

    try {
      const response = await submitForm({
        parentName: formData.parentName,
        phone: formData.mobileNumber,
        childName: formData.childName,
        childAge: formData.ageGroup,
        message: formData.message,
        notes: `Admissions Application: Age Group ${formData.ageGroup}`,
        type: 'enrollment',
        form_type: 'enrollment',
        request_type: 'Enrollment',
      });
      setIsSubmitted(true);
      setSubmittedData({ ...formData });
      setReferenceId(response.submission.id);
    } catch (err: any) {
      console.error('Admissions submission error:', err);
      setFormError(err.message || 'We could not complete your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormError(null);
    setFormData({
      parentName: '',
      mobileNumber: '',
      childName: '',
      ageGroup: 'Play Group',
      message: '',
    });
  };

  return (
    <section id="admissions" className="py-20 lg:py-28 relative bg-[#FAF2E8]/40 border-t border-[#F3E5D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF1E6] border border-[#DFCBB2] text-[#8C6929] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Join Our Learning Community</span>
          </div>
          
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2E2420] tracking-tight">
            Admissions & Enquiry
          </h2>
          
          {/* Short Intro */}
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans-luxury font-light">
            We welcome families in Bhuj seeking a warm, authentic Montessori education for their children. Fill out our simple enquiry form below, and our admissions coordinator will reach out promptly to schedule a guided classroom observation.
          </p>
        </div>

        {/* 3 Steps Visual Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-14">
          {ADMISSION_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-white/80 backdrop-blur-xs rounded-[20px] p-6 border border-[#EADBCC] shadow-xs flex items-start gap-4"
            >
              <div className="font-serif-luxury text-2xl font-bold text-[#C5A059] bg-[#FAF3E8] w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 border border-[#EADBCC]">
                {step.step}
              </div>
              <div>
                <h3 className="font-serif-luxury text-lg font-bold text-[#2E2420] mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[20px] p-8 sm:p-12 border border-[#EADBCC] shadow-luxury-lg relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="border-b border-stone-100 pb-4 mb-6">
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2E2420]">
                      Child Admission Enquiry Form
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 mt-1">
                      Classes Play Group to Sr. Kg • Bhuj Campus
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Field 1: Parent/Guardian Name */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="parentName" className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                        Parent/Guardian Name <span className="text-[#E07A86]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                          <User className="w-4 h-4 text-[#C5A059]" />
                        </div>
                        <input
                          type="text"
                          id="parentName"
                          name="parentName"
                          required
                          value={formData.parentName}
                          onChange={handleChange}
                          placeholder="e.g. Fatima Merchant"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DECDBB] focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 bg-[#FFFDFB] text-sm text-stone-800 placeholder-stone-400 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Field 2: Mobile Number */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="mobileNumber" className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                        Mobile Number <span className="text-[#E07A86]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                          <PhoneCall className="w-4 h-4 text-[#C5A059]" />
                        </div>
                        <input
                          type="tel"
                          id="mobileNumber"
                          name="mobileNumber"
                          required
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DECDBB] focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 bg-[#FFFDFB] text-sm text-stone-800 placeholder-stone-400 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Field 3: Child’s Name */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="childName" className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                        Child’s Name <span className="text-[#E07A86]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                          <Baby className="w-4 h-4 text-[#E07A86]" />
                        </div>
                        <input
                          type="text"
                          id="childName"
                          name="childName"
                          required
                          value={formData.childName}
                          onChange={handleChange}
                          placeholder="e.g. Zayaan Merchant"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DECDBB] focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 bg-[#FFFDFB] text-sm text-stone-800 placeholder-stone-400 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Field 4: Age Group (Play Group / Nursery / Sr. Kg) */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="ageGroup" className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                        Age Group <span className="text-[#E07A86]">*</span>
                      </label>
                      <select
                        id="ageGroup"
                        name="ageGroup"
                        required
                        value={formData.ageGroup}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-[#DECDBB] focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 bg-[#FFFDFB] text-sm text-stone-800 outline-none transition-all"
                      >
                        <option value="Play Group">Play Group (age 2–3)</option>
                        <option value="Nursery">Nursery (age 3–4)</option>
                        <option value="Sr. Kg">Sr. Kg (age 4–5)</option>
                      </select>
                    </div>
                  </div>

                  {/* Field 5: Message */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Message / Any questions or preferred observation date
                    </label>
                    <div className="relative">
                      <div className="absolute top-3.5 left-3.5 pointer-events-none text-stone-400">
                        <MessageSquare className="w-4 h-4 text-[#C5A059]" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us a little about your child’s interests or any questions about Montessori in Bhuj..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DECDBB] focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 bg-[#FFFDFB] text-sm text-stone-800 placeholder-stone-400 outline-none transition-all resize-none"
                      />
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

                  {/* Form submit button: ‘Submit Enquiry’ */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      id="admissions-submit-btn"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-gradient-to-r from-[#C5A059] via-[#BE964C] to-[#AF873B] hover:from-[#B5914B] hover:to-[#9E7730] text-white font-semibold text-base shadow-luxury-md hover:shadow-luxury-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Enquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-center text-stone-500">
                    We respect your privacy. Or reach us directly at{' '}
                    <a href={`tel:${SCHOOL_INFO.phone}`} className="text-[#C5A059] font-bold underline">
                      {SCHOOL_INFO.phone}
                    </a>
                  </p>
                </motion.form>
              ) : (
                /* Friendly success message placeholder */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-6 space-y-6"
                >
                  <div className="w-16 h-16 bg-[#F3FAF0] border-2 border-[#869E66] rounded-full flex items-center justify-center mx-auto text-[#5B793B] shadow-sm">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7E9A5E] bg-[#F1F8EC] px-3 py-1 rounded-full border border-[#D5E6CA]">
                      Enquiry Successfully Received
                    </span>
                    <h3 className="font-serif-luxury text-3xl font-bold text-[#2E2420]">
                      Thank You, {submittedData?.parentName || 'Parent'}!
                    </h3>
                    <p className="text-stone-600 text-sm max-w-lg mx-auto leading-relaxed">
                      We are delighted by your interest in <strong>Little Noor Montessori School, Bhuj</strong> for <strong>{submittedData?.childName}</strong> ({submittedData?.ageGroup}).
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#FAF4ED] rounded-[16px] p-5 border border-[#EADBCC] max-w-md mx-auto text-left space-y-2 text-xs sm:text-sm">
                    {referenceId ? (
                      <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                        <span className="text-stone-500">Supabase Record ID:</span>
                        <span className="font-mono font-bold text-[#8C6929]">{referenceId}</span>
                      </div>
                    ) : null}
                    <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                      <span className="text-stone-500">Program Selected:</span>
                      <span className="font-semibold text-stone-800">{submittedData?.ageGroup}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                      <span className="text-stone-500">Contact Number:</span>
                      <span className="font-semibold text-stone-800">{submittedData?.mobileNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">School Hours:</span>
                      <span className="font-semibold text-[#8C6929]">{SCHOOL_INFO.timings}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 max-w-md mx-auto">
                    Our admissions team will call you within 24 hours to arrange an observation tour in our prepared Montessori environment.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={onOpenScheduleModal}
                      type="button"
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#C5A059] hover:bg-[#B38F46] text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Book Specific Tour Slot
                    </button>
                    <button
                      onClick={handleReset}
                      type="button"
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white border border-[#DFCBB2] hover:bg-[#FAF4ED] text-stone-700 text-xs sm:text-sm font-medium"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
};
