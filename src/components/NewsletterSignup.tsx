import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, ArrowRight, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NewsletterSignupProps {
  className?: string;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ className = '' }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simple, standard email validation pattern
  const isValidEmail = (value: string): boolean => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setError(t.newsletter.errorEmpty);
      return;
    }

    if (!isValidEmail(trimmed)) {
      setError(t.newsletter.errorInvalid);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedEmail(trimmed);
      setIsSubmitted(true);
      setEmail('');
    }, 400);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedEmail('');
    setError(null);
  };

  return (
    <div
      id="newsletter-signup-container"
      className={`relative rounded-3xl bg-white/10 backdrop-blur-md border border-[#9CAF88]/30 p-6 sm:p-10 max-w-2xl mx-auto shadow-botanical-md text-center ${className}`}
    >
      {!isSubmitted ? (
        <>
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9CAF88]/20 border border-[#9CAF88]/40 text-[#FAF8F1] text-xs font-semibold uppercase tracking-wider mb-4">
            <Leaf className="w-3.5 h-3.5 text-[#9CAF88]" />
            <span>{t.newsletter.badge}</span>
          </div>

          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#FAF8F1] tracking-tight">
            {t.newsletter.title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-[#FAF8F1]/75 max-w-lg mx-auto font-sans leading-relaxed">
            {t.newsletter.subtitle}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto" noValidate>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CAF88] pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={t.newsletter.placeholder}
                  className={`w-full pl-11 pr-4 py-3 rounded-full bg-white/95 border text-xs sm:text-sm text-[#1E3A2B] placeholder:text-[#1E3A2B]/45 outline-none transition-all ${
                    error
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-400/30'
                      : 'border-[#9CAF88]/40 focus:border-[#FAF8F1] focus:ring-2 focus:ring-[#9CAF88]/30'
                  }`}
                  aria-label="Email address for newsletter"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-full bg-[#9CAF88] hover:bg-[#8AA076] text-[#1E3A2B] hover:text-white text-xs sm:text-sm font-bold transition-all shadow-botanical-xs flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-75 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>{t.newsletter.subscribing}</span>
                ) : (
                  <>
                    <span>{t.newsletter.subscribe}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="flex items-center justify-center gap-1.5 mt-2.5 text-xs text-rose-300 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </form>
        </>
      ) : (
        <div className="py-2 space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#9CAF88]/20 border border-[#9CAF88] flex items-center justify-center mx-auto text-[#9CAF88]">
            <CheckCircle2 className="w-6 h-6 text-[#9CAF88]" />
          </div>
          <h4 className="font-serif-luxury text-2xl font-bold text-[#FAF8F1]">
            {t.newsletter.successTitle}
          </h4>
          <p className="text-xs sm:text-sm text-[#FAF8F1]/80 max-w-md mx-auto">
            {t.newsletter.successDesc.replace('{email}', submittedEmail)}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-[#9CAF88] underline hover:text-[#FAF8F1] transition-colors mt-2 cursor-pointer"
          >
            {t.newsletter.registerAnother}
          </button>
        </div>
      )}
    </div>
  );
};
