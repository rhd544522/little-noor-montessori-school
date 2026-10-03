import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  ChevronDown,
  GraduationCap,
  Clock,
  Phone,
  Search,
  CheckCircle2,
  Leaf,
  ShieldCheck,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { useLanguage } from '../context/LanguageContext';

interface FAQSectionProps {
  onOpenScheduleModal?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenScheduleModal }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true,
  });

  const categories = [
    { id: 'All', label: t.faq.categories.all },
    { id: 'Admissions', label: t.faq.categories.admissions },
    { id: 'Daily Routines', label: t.faq.categories.routines },
    { id: 'Safety', label: t.faq.categories.safety },
    { id: 'Montessori Method', label: t.faq.categories.policies },
  ];

  const faqList = [
    {
      id: 'faq-1',
      category: 'Montessori Method',
      question: t.faq.items.q1,
      answer: t.faq.items.a1,
      pointers: t.faq.items.p1,
      icon: Leaf,
    },
    {
      id: 'faq-2',
      category: 'Daily Routines',
      question: t.faq.items.q2,
      answer: t.faq.items.a2,
      pointers: t.faq.items.p2,
      icon: Clock,
    },
    {
      id: 'faq-3',
      category: 'Admissions',
      question: t.faq.items.q3,
      answer: t.faq.items.a3,
      pointers: t.faq.items.p3,
      icon: GraduationCap,
    },
    {
      id: 'faq-4',
      category: 'Admissions',
      question: t.faq.items.q4,
      answer: t.faq.items.a4,
      pointers: t.faq.items.p4,
      icon: GraduationCap,
    },
    {
      id: 'faq-5',
      category: 'Safety',
      question: t.faq.items.q5,
      answer: t.faq.items.a5,
      pointers: t.faq.items.p5,
      icon: ShieldCheck,
    },
    {
      id: 'faq-6',
      category: 'Daily Routines',
      question: t.faq.items.q6,
      answer: t.faq.items.a6,
      pointers: t.faq.items.p6,
      icon: Clock,
    },
  ];

  const filteredFaqs = faqList.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#FAF8F1] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E8E0] text-[#1E3A2B] text-xs font-semibold tracking-wider uppercase mb-4 border border-[#9CAF88]/30">
            <HelpCircle className="w-3.5 h-3.5 text-[#1E3A2B]" />
            <span>{t.faq.badge}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A2B] tracking-tight leading-tight">
            {t.faq.title} <br className="hidden sm:inline" />
            <span className="text-[#9CAF88] italic font-normal">{t.faq.titleAccent}</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#1E3A2B]/75 leading-relaxed font-sans max-w-2xl mx-auto">
            {t.faq.description}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-[#9CAF88] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.faq.searchPlaceholder}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#9CAF88]/40 text-[#1E3A2B] placeholder-[#1E3A2B]/45 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#9CAF88]/50 shadow-botanical-xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              type="button"
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1E3A2B] text-white shadow-botanical-xs'
                  : 'bg-white text-[#1E3A2B]/80 hover:bg-[#E2E8E0] border border-[#9CAF88]/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-[#9CAF88]/30 p-8">
              <HelpCircle className="w-10 h-10 text-[#9CAF88] mx-auto mb-3" />
              <p className="text-base font-bold text-[#1E3A2B]">{t.faq.noResultsTitle}</p>
              <p className="text-sm text-[#1E3A2B]/70 mt-1">{t.faq.noResultsDesc}</p>
              <a
                href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1E3A2B] text-white text-xs font-bold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t.faq.callSchool} {SCHOOL_INFO.phone}</span>
              </a>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              const Icon = faq.icon;

              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-[#9CAF88]/30 bg-white overflow-hidden transition-all shadow-botanical-xs hover:border-[#9CAF88]/60"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <div className="w-9 h-9 rounded-xl bg-[#E2E8E0] border border-[#9CAF88]/40 flex items-center justify-center text-[#1E3A2B] shrink-0">
                        <Icon className="w-4 h-4 text-[#1E3A2B]" />
                      </div>
                      <span className="font-serif-luxury text-base sm:text-lg font-bold text-[#1E3A2B]">
                        {faq.question}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full bg-[#E2E8E0] flex items-center justify-center text-[#1E3A2B] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#1E3A2B] text-white' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-6 pt-0 border-t border-[#9CAF88]/15 text-left">
                          <p className="text-sm sm:text-base text-[#1E3A2B]/85 font-sans leading-relaxed pt-4">
                            {faq.answer}
                          </p>

                          {faq.pointers && faq.pointers.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-[#9CAF88]/15 grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {faq.pointers.map((pointer, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs text-[#1E3A2B]/90 font-medium">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#9CAF88] shrink-0 mt-0.5" />
                                  <span>{pointer}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Direct Contact Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#E2E8E0]/60 border border-[#9CAF88]/40 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#1E3A2B]">
              {t.faq.haveQuestionTitle}
            </h4>
            <p className="text-xs sm:text-sm text-[#1E3A2B]/75 mt-1 font-sans">
              {t.faq.haveQuestionDesc}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#E2E8E0] text-[#1E3A2B] font-bold text-xs border border-[#9CAF88]/40 flex items-center gap-1.5 shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#9CAF88]" />
              <span>{SCHOOL_INFO.phone}</span>
            </a>

            {onOpenScheduleModal && (
              <button
                type="button"
                onClick={onOpenScheduleModal}
                className="px-5 py-2.5 rounded-full bg-[#1E3A2B] hover:bg-[#2B4E3C] text-white font-bold text-xs shadow-botanical-xs cursor-pointer"
              >
                {t.faq.bookVisitBtn}
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
