import React, { useState, useEffect } from 'react';
import { Phone, Calendar, ArrowUp } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { useLanguage } from '../context/LanguageContext';

interface FloatingActionsProps {
  onOpenScheduleModal: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenScheduleModal }) => {
  const { t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 select-none pointer-events-none">
      
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          type="button"
          aria-label="Scroll to top"
          className="pointer-events-auto w-10 h-10 rounded-full bg-[#062B1B] hover:bg-[#1E3A2B] backdrop-blur-md border border-[#9CAF88]/40 hover:border-[#C8A45D] text-[#F5F0E6] shadow-botanical-sm hover:shadow-botanical-md flex items-center justify-center transition-all cursor-pointer group"
        >
          <ArrowUp className="w-4 h-4 text-[#F5F0E6] group-hover:text-[#C8A45D] transition-colors" />
        </button>
      )}

      {/* Action Cluster: Call & Book a Visit */}
      <div className="pointer-events-auto flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full p-1.5 border border-[#9CAF88]/40 shadow-botanical-md">
        
        {/* Call Link */}
        <a
          href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`}
          aria-label={t.nav.callSchool}
          title={`Call ${SCHOOL_INFO.phone}`}
          className="w-9 h-9 rounded-full bg-[#E2E8E0] hover:bg-[#FAF8F1] text-[#1E3A2B] hover:text-[#062B1B] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
        >
          <Phone className="w-4 h-4 text-[#1E3A2B]" />
        </a>

        {/* Book Visit Button */}
        <button
          onClick={onOpenScheduleModal}
          id="floating-book-visit-btn"
          type="button"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1E3A2B] hover:bg-[#2B4E3C] text-[#F8F4EA] text-xs sm:text-sm font-bold shadow-botanical-xs active:scale-95 transition-all cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-[#C8A45D]" />
          <span>{t.nav.bookVisit}</span>
        </button>

      </div>

    </div>
  );
};
