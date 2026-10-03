import React from 'react';
import { Phone, Mail, MapPin, Sparkles, Clock, Instagram } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

export const Footer: React.FC = () => {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Montessori Method', href: '#philosophy' },
    { name: 'Programs', href: '#programs' },
    { name: 'Safety', href: '#safety' },
    { name: 'Activities', href: '#activities' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E3A2B] text-[#FAF8F1] pt-16 pb-12 border-t-2 border-[#9CAF88]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#9CAF88]/20">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white border border-[#9CAF88]/40 p-1 flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
                <img
                  src="/little-noor-logo.svg"
                  alt="Little Noor Montessori School Logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="font-serif-luxury text-2xl font-bold tracking-tight" style={{ color: '#F5F0E6' }}>
                  Little Noor
                </h3>
                <span className="text-xs uppercase tracking-[0.2em] font-bold block mt-1" style={{ color: '#C8D2C3' }}>
                  MONTESSORI SCHOOL • BHUJ
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed font-sans" style={{ color: '#D8D0C2' }}>
              Authentic Montessori early childhood learning rooted in respect for the child, prepared natural spaces, and tactile exploration in Bhuj.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={SCHOOL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-[#9CAF88]/30 hover:border-[#C8A45D]/60 flex items-center justify-center transition-all group"
                style={{ color: '#D8D0C2' }}
                title="Instagram"
              >
                <Instagram className="w-4 h-4 transition-colors group-hover:text-[#C8A45D]" style={{ color: '#D8D0C2' }} />
              </a>
              <a
                href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-[#9CAF88]/30 hover:border-[#C8A45D]/60 flex items-center justify-center transition-all group"
                style={{ color: '#D8D0C2' }}
                title="Call Us"
              >
                <Phone className="w-4 h-4 transition-colors group-hover:text-[#C8A45D]" style={{ color: '#D8D0C2' }} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif-luxury text-lg font-bold border-b border-[#9CAF88]/30 pb-2 inline-block" style={{ color: '#F5F0E6' }}>
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-sans">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    type="button"
                    onClick={() => handleLinkClick(link.href)}
                    className="hover:text-[#C8A45D] transition-colors cursor-pointer text-left"
                    style={{ color: '#D8D0C2' }}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Programs & Schedule */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif-luxury text-lg font-bold border-b border-[#9CAF88]/30 pb-2 inline-block" style={{ color: '#F5F0E6' }}>
              Classes & Timings
            </h4>
            <div className="space-y-3 text-xs font-sans">
              <div>
                <p className="font-bold" style={{ color: '#D8D0C2' }}>Playhouse</p>
                <p className="mt-0.5" style={{ color: '#F0E8DA' }}>9:00 AM – 11:00 AM</p>
                <p className="text-[11px] mt-0.5" style={{ color: '#AEB9AD' }}>Monday to Friday (Saturday & Sunday Holiday)</p>
              </div>
              <div className="pt-2 border-t border-[#9CAF88]/20">
                <p className="font-bold" style={{ color: '#D8D0C2' }}>Nursery & Sr. Kg</p>
                <p className="mt-0.5" style={{ color: '#F0E8DA' }}>9:00 AM – 11:30 AM</p>
                <p className="text-[11px] mt-0.5" style={{ color: '#AEB9AD' }}>Monday to Saturday (Sunday Holiday)</p>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Campus */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif-luxury text-lg font-bold border-b border-[#9CAF88]/30 pb-2 inline-block" style={{ color: '#F5F0E6' }}>
              Admissions
            </h4>
            <div className="space-y-3 text-xs font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#C8A45D' }} />
                <span style={{ color: '#D8D0C2' }}>{SCHOOL_INFO.address}, Bhuj, Kutch, Gujarat 370001</span>
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

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans" style={{ color: '#AEB9AD' }}>
          <p>© 2026 Little Noor Montessori School, Bhuj. All rights reserved.</p>
          <p>Montessori Education for Early Childhood · Play group to Sr. Kg</p>
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
