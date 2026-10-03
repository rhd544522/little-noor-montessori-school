import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Calendar,
  Instagram,
  Phone,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onOpenScheduleModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenScheduleModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Detect active section based on scroll
      const sections = ['#home', '#about', '#philosophy', '#programs', '#safety', '#activities', '#gallery', '#faq', '#contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.querySelector(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full bg-[#FAF8F1] relative z-40">
      {/* --------------------------------------------------
          TOP UTILITY STRIP (School Hours, Phone Link & Language Selector)
          -------------------------------------------------- */}
      <div className="border-b border-[#9CAF88]/20 bg-[#FAF8F1]/95 text-[#1E3A2B]/85 text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9CAF88]" />
            <span className="font-semibold text-[#1E3A2B]">{t.nav.admissionsOpen}</span>
            <span className="text-[#9CAF88] hidden sm:inline">•</span>
            <span className="hidden sm:inline text-[#1E3A2B]/70">Playhouse, Nursery & Sr. Kg in Bhuj</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            {/* Desktop Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher variant="desktop" />
            </div>

            {/* Desktop Dark Mode Theme Toggle in utility bar */}
            <div className="hidden sm:block">
              <ThemeToggle variant="compact" />
            </div>

            <span className="hidden lg:inline-flex items-center gap-1.5 text-[#1E3A2B]/75">
              <Clock className="w-3.5 h-3.5 text-[#9CAF88]" />
              <span>{t.nav.hours}</span>
            </span>

            <a
              href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 font-bold text-[#1E3A2B] hover:text-[#9CAF88] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#9CAF88]" />
              <span className="tracking-wide">{SCHOOL_INFO.phone}</span>
            </a>
          </div>

        </div>
      </div>

      {/* --------------------------------------------------
          ROW 1: TOP BRANDING SECTION
          Spacious, perfectly centered horizontally, with subtle botanical accents
          -------------------------------------------------- */}
      <div className="relative py-6 sm:py-9 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        
        {/* Subtle Organic Left Botanical Accent */}
        <div
          className="absolute left-3 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2 pointer-events-none select-none text-[#9CAF88]/30 hidden sm:block"
          aria-hidden="true"
        >
          <motion.div
            animate={{
              y: [0, -6, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 stroke-current fill-none stroke-[1.2]"
              viewBox="0 0 64 64"
            >
              <path d="M12 52C22 50 36 42 42 22C32 20 18 28 12 52Z" />
              <path d="M12 52C26 38 42 22 52 12" />
              <path d="M26 38C32 34 38 32 44 32" />
              <path d="M20 44C24 40 28 38 34 38" />
            </svg>
          </motion.div>
        </div>

        {/* Subtle Organic Right Botanical Accent */}
        <div
          className="absolute right-3 sm:right-12 lg:right-24 top-1/2 -translate-y-1/2 pointer-events-none select-none text-[#9CAF88]/30 hidden sm:block"
          aria-hidden="true"
        >
          <motion.div
            animate={{
              y: [0, 6, 0],
              rotate: [0, -2, 0],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 stroke-current fill-none stroke-[1.2] -scale-x-100"
              viewBox="0 0 64 64"
            >
              <path d="M12 52C22 50 36 42 42 22C32 20 18 28 12 52Z" />
              <path d="M12 52C26 38 42 22 52 12" />
              <path d="M26 38C32 34 38 32 44 32" />
              <path d="M20 44C24 40 28 38 34 38" />
            </svg>
          </motion.div>
        </div>

        {/* Centered Identity Block */}
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center relative z-10">
          
          {/* 1. School Logo (Above the School Name) */}
          <motion.a
            href="#home"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="group block mb-3 focus:outline-none"
            title="Little Noor Montessori School, Bhuj"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-[#9CAF88]/40 p-1 flex items-center justify-center shadow-botanical-sm group-hover:border-[#1E3A2B] group-hover:scale-105 transition-all duration-300 overflow-hidden mx-auto">
              <img
                src="/little-noor-logo.svg"
                alt="Little Noor Montessori School Logo"
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
          </motion.a>

          {/* 2. School Name (Editorial Serif, Deep Forest Green #1E3A2B) */}
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A2B] tracking-tight leading-tight"
          >
            <a href="#home" className="hover:opacity-95 transition-opacity">
              Little Noor
            </a>
          </motion.h1>

          {/* 3. Subtitle (Muted Sage Green #9CAF88) */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.25em] text-[#9CAF88] uppercase mt-1.5"
          >
            {t.nav.subtitle}
          </motion.p>

          {/* 4. Small Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-2 mt-2 text-xs sm:text-sm text-[#1E3A2B]/75 font-serif italic"
          >
            <span>{t.nav.taglineWords[0]}</span>
            <span className="text-[#9CAF88] text-[9px]">•</span>
            <span>{t.nav.taglineWords[1]}</span>
            <span className="text-[#9CAF88] text-[9px]">•</span>
            <span>{t.nav.taglineWords[2]}</span>
          </motion.div>

        </div>
      </div>

      {/* --------------------------------------------------
          ROW 2: NAVIGATION BAR (Transforms to Floating Glass Surface on Scroll)
          -------------------------------------------------- */}
      <nav
        aria-label="Main Navigation"
        className={`w-full transition-all duration-500 z-40 ${
          isScrolled
            ? 'fixed top-3.5 inset-x-0 px-3 sm:px-6 pointer-events-none'
            : 'relative bg-[#FAF8F1] border-t border-b border-[#9CAF88]/20 py-2.5 sm:py-3'
        }`}
      >
        <div
          className={`transition-all duration-500 pointer-events-auto ${
            isScrolled
              ? 'max-w-6xl mx-auto rounded-full bg-white/85 backdrop-blur-md border border-[#9CAF88]/40 shadow-botanical-md py-2 px-4 sm:px-6'
              : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
          }`}
        >
          {/* Desktop & Tablet Navigation Row */}
          <div className="flex items-center justify-between gap-4">
            
            {/* Scrolled State Brand Hint (Left Side) */}
            <div className="w-12 lg:w-28 shrink-0">
              <AnimatePresence>
                {isScrolled && (
                  <motion.a
                    href="#home"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="hidden lg:flex items-center gap-2 text-left group"
                    title="Back to top"
                  >
                    <div className="w-7 h-7 rounded-full bg-white border border-[#9CAF88]/40 p-0.5 overflow-hidden shadow-xs">
                      <img
                        src="/little-noor-logo.svg"
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-serif-luxury text-sm font-bold text-[#1E3A2B] leading-none group-hover:text-[#9CAF88] transition-colors">
                      Little Noor
                    </span>
                  </motion.a>
                )}
              </AnimatePresence>
            </div>

            {/* Centered Navigation Menu Items with Gliding Active/Hover Pill Indicator */}
            <div className="hidden md:flex items-center justify-center gap-1 lg:gap-1.5 flex-1 relative">
              {navLinks.map((link) => {
                const isCurrent = (hoveredNav ? hoveredNav === link.href : activeSection === link.href);

                return (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    onMouseEnter={() => setHoveredNav(link.href)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className="group relative px-2.5 lg:px-3.5 py-1.5 rounded-full text-xs lg:text-[13px] font-semibold text-[#1E3A2B] hover:text-[#12261B] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer font-sans whitespace-nowrap active:scale-95"
                  >
                    {isCurrent && (
                      <motion.div
                        layoutId="navbar-gliding-pill"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        className="absolute inset-0 rounded-full bg-[#E2E8E0] -z-10 shadow-xs border border-[#9CAF88]/30"
                      />
                    )}
                    <span className="relative z-10 transition-colors duration-300">{link.name}</span>
                    {/* Subtle elegant hover underline */}
                    <span className="absolute bottom-1 left-3 right-3 h-[1.5px] bg-[#9CAF88] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                  </button>
                );
              })}
            </div>

            {/* Right Side: Theme Toggle + Instagram Icon + Book a Visit Button */}
            <div className="hidden md:flex items-center justify-end gap-2 lg:gap-2.5 shrink-0">
              {/* Dark Mode Theme Toggle */}
              <ThemeToggle variant="icon" />

              {/* Instagram Icon */}
              <a
                href={SCHOOL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title={`Instagram: ${SCHOOL_INFO.instagramHandle}`}
                className="w-9 h-9 rounded-full bg-white hover:bg-[#E2E8E0] border border-[#9CAF88]/40 text-[#1E3A2B] flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-2xs cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-[#1E3A2B]" />
              </a>

              {/* Book a Visit Button */}
              <button
                type="button"
                onClick={onOpenScheduleModal}
                id="header-book-visit-btn"
                className="px-4 lg:px-5 py-2 rounded-full bg-[#1E3A2B] hover:bg-[#254936] text-white font-bold text-xs lg:text-sm shadow-botanical-xs hover:shadow-botanical-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#9CAF88] shrink-0" />
                <span className="whitespace-nowrap">{t.nav.bookVisit}</span>
              </button>
            </div>

            {/* Mobile Header Bar (Row 2 on Mobile) */}
            <div className="flex md:hidden items-center justify-between w-full">
              {/* Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#9CAF88]/40 text-[#1E3A2B] text-xs font-bold shadow-2xs active:scale-95 transition-transform cursor-pointer"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-4 h-4 text-[#1E3A2B]" />
                <span>{t.nav.menu}</span>
              </button>

              {/* Mobile Right Side: Theme Toggle + Instagram + Book a Visit */}
              <div className="flex items-center gap-1.5">
                <ThemeToggle variant="compact" />

                <a
                  href={SCHOOL_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white border border-[#9CAF88]/40 text-[#1E3A2B] flex items-center justify-center shadow-2xs"
                  title="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={onOpenScheduleModal}
                  className="px-3 py-1.5 rounded-full bg-[#1E3A2B] text-white font-bold text-xs shadow-2xs active:scale-95 transition-transform flex items-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#9CAF88]" />
                  <span>{t.nav.bookVisit}</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </nav>

      {/* --------------------------------------------------
          MOBILE NAVIGATION DRAWER
          -------------------------------------------------- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-[#FAF8F1] z-50 shadow-2xl flex flex-col justify-between border-r border-[#9CAF88]/30 md:hidden"
            >
              <div className="p-6 overflow-y-auto">
                {/* Header in Drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-[#9CAF88]/20 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#9CAF88]/40 p-0.5 overflow-hidden">
                      <img
                        src="/little-noor-logo.svg"
                        alt="Little Noor"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="font-serif-luxury text-base font-bold text-[#1E3A2B] block leading-none">
                        Little Noor
                      </span>
                      <span className="text-[10px] text-[#9CAF88] uppercase tracking-wider font-bold">
                        Montessori · Bhuj
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-white border border-[#9CAF88]/40 flex items-center justify-center text-[#1E3A2B] hover:bg-[#E2E8E0] cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Language Switcher Block */}
                <div className="mb-3">
                  <LanguageSwitcher variant="mobile" />
                </div>

                {/* Mobile Dark Mode Theme Toggle */}
                <div className="mb-4">
                  <ThemeToggle variant="labeled" />
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      type="button"
                      onClick={() => handleNavClick(link.href)}
                      className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-[#1E3A2B] hover:bg-[#E2E8E0] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#9CAF88]" />
                    </button>
                  ))}
                </nav>
              </div>

              {/* Bottom Actions in Drawer */}
              <div className="p-6 border-t border-[#9CAF88]/20 bg-[#FAF8F1]/60 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenScheduleModal();
                  }}
                  className="w-full py-3 rounded-full bg-[#9CAF88] hover:bg-[#8AA076] text-[#1E3A2B] font-bold text-sm shadow-botanical-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.nav.bookVisit}</span>
                </button>

                <a
                  href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`}
                  className="w-full py-2.5 rounded-full bg-white border border-[#9CAF88]/40 text-[#1E3A2B] font-bold text-xs flex items-center justify-center gap-2 shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#9CAF88]" />
                  <span>{SCHOOL_INFO.phone}</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
