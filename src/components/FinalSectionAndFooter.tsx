import React from 'react';
import { Calendar, Phone, Instagram, MapPin, Leaf, Mail, ShieldCheck } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { NewsletterSignup } from './NewsletterSignup';
import { useLanguage } from '../context/LanguageContext';

interface FinalSectionAndFooterProps {
  onOpenScheduleModal: () => void;
  onOpenAdminModal?: () => void;
  onReplayEntrance?: () => void;
}

export const FinalSectionAndFooter: React.FC<FinalSectionAndFooterProps> = ({
  onOpenScheduleModal,
  onOpenAdminModal,
  onReplayEntrance,
}) => {
  const { t } = useLanguage();

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.philosophy, href: '#philosophy' },
    { name: t.nav.programs, href: '#programs' },
    { name: t.nav.safety, href: '#safety' },
    { name: t.nav.activities, href: '#activities' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.faq, href: '#faq' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#1E3A2B] text-[#FAF8F1]">
      
      {/* Emotional Invitation Section */}
      <section className="relative pt-20 sm:pt-28 pb-16 text-center px-4 sm:px-6 lg:px-8 border-b border-[#9CAF88]/20">
        
        {/* Ambient Botanical Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(156,175,136,0.18)_0%,rgba(30,58,43,0.1)_60%,transparent_70%)] blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 space-y-7">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#9CAF88]/40 text-xs font-bold text-[#9CAF88]">
            <Leaf className="w-3.5 h-3.5 text-[#9CAF88]" />
            <span className="tracking-widest uppercase">{t.footer.invitationBadge}</span>
          </div>

          {/* Heading */}
          <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FAF8F1] tracking-tight leading-tight">
            {t.footer.quotePart1} <br className="hidden sm:inline" />
            <span className="text-[#9CAF88] italic font-normal">{t.footer.quotePart2}</span>
          </h2>

          <p className="text-base sm:text-lg text-[#FAF8F1]/80 max-w-2xl mx-auto leading-relaxed font-sans">
            {t.footer.invitationDesc}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenScheduleModal}
              id="footer-schedule-visit-btn"
              type="button"
              className="px-8 py-3.5 rounded-full bg-[#9CAF88] hover:bg-[#8AA076] text-[#1E3A2B] hover:text-white font-bold text-sm sm:text-base shadow-botanical-md hover:shadow-botanical-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.footer.bookVisit}</span>
            </button>

            <a
              href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`}
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F1] font-bold text-sm sm:text-base border border-[#9CAF88]/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#9CAF88]" />
              <span>{SCHOOL_INFO.phone}</span>
            </a>
          </div>

          {/* Newsletter Signup Component Integrated */}
          <div className="pt-8">
            <NewsletterSignup />
          </div>

        </div>
      </section>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 pb-28 sm:pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white p-1 border border-[#9CAF88]/40 flex items-center justify-center shrink-0 shadow-xs">
                <img
                  src="/little-noor-logo.svg"
                  alt="Little Noor Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif-luxury text-xl font-bold leading-none block" style={{ color: '#F5F0E6' }}>
                  Little Noor
                </span>
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold block mt-1" style={{ color: '#C8D2C3' }}>
                  MONTESSORI SCHOOL • BHUJ
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed font-sans max-w-sm pt-2" style={{ color: '#D8D0C2' }}>
              Authentic Montessori early childhood learning rooted in respect for the child, prepared natural spaces, and tactile exploration in Bhuj.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={SCHOOL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-[#9CAF88]/30 hover:border-[#C8A45D]/60 flex items-center justify-center transition-all duration-300 group"
                style={{ color: '#D8D0C2' }}
                title="Follow on Instagram"
                aria-label="Follow Little Noor on Instagram"
              >
                <Instagram className="w-4 h-4 transition-colors group-hover:text-[#C8A45D]" style={{ color: '#D8D0C2' }} />
              </a>
              <a
                href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-[#9CAF88]/30 hover:border-[#C8A45D]/60 flex items-center justify-center transition-all duration-300 group"
                style={{ color: '#D8D0C2' }}
                title="Call School"
                aria-label="Call Little Noor Montessori School"
              >
                <Phone className="w-4 h-4 transition-colors group-hover:text-[#C8A45D]" style={{ color: '#D8D0C2' }} />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-luxury font-bold uppercase tracking-wider text-xs sm:text-sm" style={{ color: '#F5F0E6' }}>
              {t.footer.exploreTitle || 'Explore Our Campus'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors inline-block py-0.5 hover:text-[#C8A45D]"
                    style={{ color: '#D8D0C2' }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Operating Hours & Days */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif-luxury font-bold uppercase tracking-wider text-xs sm:text-sm" style={{ color: '#F5F0E6' }}>
              {t.footer.hoursTitle || 'School Hours'}
            </h4>
            <div className="space-y-3 text-xs font-sans">
              <div>
                <p className="font-bold" style={{ color: '#D8D0C2' }}>{t.footer.playhouseLabel}</p>
                <p className="mt-0.5 font-medium" style={{ color: '#F0E8DA' }}>9:00 AM – 11:00 AM</p>
                <p className="text-[11px] mt-0.5" style={{ color: '#AEB9AD' }}>{t.footer.playhouseDays}</p>
              </div>
              <div className="pt-2.5 border-t border-[#9CAF88]/20">
                <p className="font-bold" style={{ color: '#D8D0C2' }}>{t.footer.nurseryLabel}</p>
                <p className="mt-0.5 font-medium" style={{ color: '#F0E8DA' }}>9:00 AM – 11:30 AM</p>
                <p className="text-[11px] mt-0.5" style={{ color: '#AEB9AD' }}>{t.footer.nurseryDays}</p>
              </div>
            </div>
          </div>

          {/* Location & Address */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-luxury font-bold uppercase tracking-wider text-xs sm:text-sm" style={{ color: '#F5F0E6' }}>
              {t.footer.addressTitle || 'Campus Address'}
            </h4>
            <div className="space-y-3.5 text-xs font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#C8A45D' }} />
                <span className="leading-relaxed" style={{ color: '#D8D0C2' }}>
                  {SCHOOL_INFO.address}, Bhuj, Kutch, Gujarat 370001
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0" style={{ color: '#C8A45D' }} />
                <a
                  href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`}
                  className="hover:text-[#C8A45D] transition-colors font-bold"
                  style={{ color: '#F0E8DA' }}
                >
                  {SCHOOL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0" style={{ color: '#C8A45D' }} />
                <a
                  href={`mailto:${SCHOOL_INFO.email}`}
                  className="hover:text-[#C8A45D] transition-colors font-semibold break-all"
                  style={{ color: '#F0E8DA' }}
                >
                  {SCHOOL_INFO.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#9CAF88]/20 flex flex-col lg:flex-row items-center justify-between gap-5 text-xs font-sans">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p style={{ color: '#AEB9AD' }}>
              © 2026 Little Noor Montessori School, Bhuj. All rights reserved.
            </p>
            <span className="hidden sm:inline" style={{ color: '#AEB9AD', opacity: 0.5 }}>•</span>
            <p className="text-[11px]" style={{ color: '#AEB9AD' }}>
              {t.footer.classInfo || 'Montessori Education for Early Childhood · Play group to Sr. Kg'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {onReplayEntrance && (
              <button
                type="button"
                onClick={onReplayEntrance}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C8A45D]/40 transition-colors cursor-pointer text-[11px] font-medium"
                style={{ color: '#C8D2C3' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C8A45D')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#C8D2C3')}
                title="Replay cinematic 3D nature entrance"
              >
                <span>Replay 3D Entrance</span>
              </button>
            )}
            {onOpenAdminModal && (
              <button
                type="button"
                onClick={onOpenAdminModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C8A45D]/40 transition-colors cursor-pointer text-[11px] font-medium"
                style={{ color: '#C8D2C3' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C8A45D')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#C8D2C3')}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8A45D]" />
                <span>Staff Portal</span>
              </button>
            )}
          </div>
        </div>

        {/* Creator Signature Credit */}
        <div className="mt-8 pt-6 border-t border-[#9CAF88]/15 flex items-center justify-center">
          <div
            className="inline-flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#FAF8F1] border border-[#C8A96B]/40 shadow-xs hover:border-[#C8A96B] hover:shadow-sm transition-all duration-300 group cursor-default"
            aria-label="Website creator credit: Made by Rehan Damani"
          >
            <span className="font-sans text-[11px] sm:text-[13px] font-semibold tracking-[2.2px] text-[#1E3A2B] uppercase inline-flex items-center select-none">
              <span>MADE BY</span>
              <span
                className="text-[#C8A96B] mx-2 text-sm sm:text-base font-bold leading-none select-none transition-transform duration-300 group-hover:scale-125"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="relative">
                REHAN DAMANI
                <span className="hidden sm:block absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#1E3A2B]/60 transition-all duration-300 ease-out group-hover:w-full" />
              </span>
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
};
