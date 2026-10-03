import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, Heart, Compass, Pause, Play, Bell, Calendar, ChevronRight, ExternalLink } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface ChapterBeginningProps {
  onOpenScheduleModal?: () => void;
}

interface NoticeItem {
  id: string;
  tag: string;
  category: 'admissions' | 'event' | 'holiday' | 'timing' | 'social';
  text: string;
  actionText?: string;
  actionHref?: string;
  isExternal?: boolean;
}

const NOTICES: NoticeItem[] = [
  {
    id: 'notice-admissions',
    tag: 'Admissions 2026–27',
    category: 'admissions',
    text: 'Enrollments open for Play Group, Nursery & Sr. Kg · 1:8 Guide-to-Child ratio in Bhuj',
    actionText: 'Apply',
    actionHref: '#admissions',
  },
  {
    id: 'notice-tour',
    tag: 'Observation Tour',
    category: 'event',
    text: 'Classroom Observation Tours open Mon–Sat (9:30 AM – 11:30 AM) · Prior appointment required',
    actionText: 'Schedule Visit',
    actionHref: '#admissions',
  },
  {
    id: 'notice-holidays',
    tag: 'Holiday Notice',
    category: 'holiday',
    text: 'Campus closed on 2nd & 4th Saturdays and Public Holidays · Regular morning cycles resume Monday',
    actionText: 'Calendar',
    actionHref: '#contact',
  },
  {
    id: 'notice-timings',
    tag: 'Daily Timings',
    category: 'timing',
    text: 'Class Timings: Playhouse: 9:00 AM – 11:00 AM | Nursery: 9:00 AM – 11:30 AM | Sr. Kg: 9:00 AM – 11:30 AM (Mon–Sat)',
    actionText: 'Details',
    actionHref: '#contact',
  },
  {
    id: 'notice-instagram',
    tag: 'Campus Stories',
    category: 'social',
    text: 'Watch daily Montessori apparatus discoveries on Instagram @littlenoor_montessori_bhuj',
    actionText: 'View Stories',
    actionHref: SCHOOL_INFO.instagram || 'https://www.instagram.com/littlenoor_montessori_bhuj',
    isExternal: true,
  },
];

export const ChapterBeginning: React.FC<ChapterBeginningProps> = ({ onOpenScheduleModal }) => {
  const prefersReduced = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [activeNoticeIndex, setActiveNoticeIndex] = useState(0);
  const easeCurve = [0.21, 0.47, 0.32, 0.98] as const;

  const handleNoticeClick = (item: NoticeItem, e: React.MouseEvent) => {
    if (item.category === 'event' && onOpenScheduleModal) {
      e.preventDefault();
      onOpenScheduleModal();
      return;
    }
    if (item.actionHref?.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(item.actionHref);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getTagBadgeClass = (category: NoticeItem['category']) => {
    switch (category) {
      case 'admissions':
        return 'bg-[#C7A75A]/20 text-[#7A5A1C] border-[#C7A75A]/50';
      case 'event':
        return 'bg-[#87966C]/20 text-[#475731] border-[#87966C]/40';
      case 'holiday':
        return 'bg-[#263B52]/10 text-[#263B52] border-[#263B52]/30';
      case 'timing':
        return 'bg-[#B45309]/15 text-[#92400E] border-[#F59E0B]/40';
      case 'social':
        return 'bg-pink-100 text-pink-800 border-pink-300';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-300';
    }
  };

  return (
    <section id="our-story" className="pb-20 lg:pb-28 bg-[#F8F4EA] relative overflow-hidden border-t border-[#C7A75A]/25">
      
      {/* ──────── TOP ELEGANT MARQUEE ANNOUNCEMENT TICKER ──────── */}
      <div
        className="w-full bg-gradient-to-r from-[#FAF6EE] via-[#FFFDF8] to-[#FAF6EE] border-b border-[#C7A75A]/30 shadow-luxury-xs relative z-20"
        aria-label="School Announcements & Notices"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Left Pinned Bulletin Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#263B52] text-white shadow-2xs shrink-0 select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C7A75A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C7A75A]"></span>
              </span>
              <span className="font-serif-luxury text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#F1DCB0]">
                Notices
              </span>
            </div>

            {/* Marquee Body */}
            {prefersReduced ? (
              /* Reduced motion accessible static reader with switcher */
              <div className="flex-1 flex items-center justify-between overflow-hidden py-0.5">
                <div className="flex items-center gap-2 truncate">
                  <span
                    className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border shrink-0 ${getTagBadgeClass(
                      NOTICES[activeNoticeIndex].category
                    )}`}
                  >
                    {NOTICES[activeNoticeIndex].tag}
                  </span>
                  <a
                    href={NOTICES[activeNoticeIndex].actionHref || '#contact'}
                    onClick={(e) => handleNoticeClick(NOTICES[activeNoticeIndex], e)}
                    className="text-xs text-[#263B52] hover:text-[#C7A75A] transition-colors truncate"
                  >
                    {NOTICES[activeNoticeIndex].text}
                  </a>
                </div>
                <div className="flex items-center gap-1 pl-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveNoticeIndex((prev) => (prev === 0 ? NOTICES.length - 1 : prev - 1))
                    }
                    className="px-2 py-0.5 text-[11px] text-[#263B52] rounded border border-[#C7A75A]/40 bg-white"
                    title="Previous announcement"
                  >
                    ‹
                  </button>
                  <span className="text-[10px] text-stone-500 font-mono">
                    {activeNoticeIndex + 1}/{NOTICES.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveNoticeIndex((prev) => (prev === NOTICES.length - 1 ? 0 : prev + 1))
                    }
                    className="px-2 py-0.5 text-[11px] text-[#263B52] rounded border border-[#C7A75A]/40 bg-white"
                    title="Next announcement"
                  >
                    ›
                  </button>
                </div>
              </div>
            ) : (
              /* Continuous Animated Marquee Track */
              <div
                className="relative flex-1 overflow-hidden h-7 sm:h-8 flex items-center"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Edge fade gradient masks */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-12 bg-gradient-to-r from-[#FAF6EE] to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-12 bg-gradient-to-l from-[#FAF6EE] to-transparent z-10" />

                {/* Flowing Marquee Items */}
                <div
                  className={`animate-marquee ${
                    isPaused ? 'animate-marquee-paused' : ''
                  } items-center`}
                >
                  {[...NOTICES, ...NOTICES].map((notice, idx) => (
                    <div
                      key={`${notice.id}-${idx}`}
                      className="inline-flex items-center gap-2.5 mx-4 sm:mx-6 shrink-0"
                    >
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border ${getTagBadgeClass(
                          notice.category
                        )}`}
                      >
                        {notice.tag}
                      </span>
                      <a
                        href={notice.actionHref || '#contact'}
                        onClick={(e) => handleNoticeClick(notice, e)}
                        target={notice.isExternal ? '_blank' : undefined}
                        rel={notice.isExternal ? 'noopener noreferrer' : undefined}
                        className="text-xs text-[#263B52] hover:text-[#C7A75A] font-medium transition-colors flex items-center gap-1 group/item"
                      >
                        <span>{notice.text}</span>
                        {notice.actionText && (
                          <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#C7A75A] group-hover/item:underline ml-1">
                            <span>{notice.actionText}</span>
                            {notice.isExternal ? (
                              <ExternalLink className="w-2.5 h-2.5" />
                            ) : (
                              <ChevronRight className="w-3 h-3" />
                            )}
                          </span>
                        )}
                      </a>
                      <span className="text-[#C7A75A]/60 text-xs ml-2 select-none">✦</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accessible Pause / Resume Toggle Button */}
            {!prefersReduced && (
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="w-6 h-6 rounded-full bg-white/90 border border-[#C7A75A]/40 hover:border-[#C7A75A] text-[#263B52] hover:text-[#C7A75A] flex items-center justify-center transition-colors shadow-2xs shrink-0"
                title={isPaused ? 'Resume ticker' : 'Pause ticker'}
                aria-label={isPaused ? 'Resume announcement ticker' : 'Pause announcement ticker'}
              >
                {isPaused ? <Play className="w-2.5 h-2.5 fill-current" /> : <Pause className="w-2.5 h-2.5 fill-current" />}
              </button>
            )}

          </div>
        </div>
      </div>

      {/* Subtle ambient light accents */}
      <div className="absolute top-12 right-10 w-96 h-96 bg-[#87966C]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#C7A75A]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="pt-16 lg:pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Chapter Header Banner */}
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#C7A75A]/40 shadow-luxury-xs text-xs font-semibold text-[#263B52] mb-3">
            <span className="text-[#C7A75A]">✦</span>
            <span className="font-serif-luxury tracking-widest uppercase">PAGE 01 · CHAPTER 01</span>
            <span className="text-[#C7A75A]">✦</span>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#647D9B] font-medium font-sans-luxury">
            THE BEGINNING
          </span>
          <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263B52] tracking-tight max-w-2xl">
            Every Journey Begins With Wonder.
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#C7A75A] to-[#87966C] mt-4 rounded-full" />
        </div>

        {/* Editorial Layout: Large Photograph on one side, Narrative on the other */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Large Editorial Photograph */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -20 }}
            whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: easeCurve }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Picture frame with gilded border and story corner flourishes */}
              <div className="relative rounded-[28px] overflow-hidden bg-white p-3 border-2 border-[#C7A75A]/40 shadow-luxury-lg">
                <div className="relative rounded-[20px] overflow-hidden aspect-[4/3] sm:aspect-[14/11]">
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop"
                    alt="Child deeply focused on Montessori sensorial cylinders at Little Noor"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#263B52]/70 via-transparent to-transparent" />
                  
                  {/* Photo Caption */}
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <span className="text-[11px] font-serif-luxury uppercase tracking-wider text-[#F1DCB0] bg-[#263B52]/60 px-2.5 py-1 rounded-md backdrop-blur-xs inline-block">
                      The Wonder of Discovery
                    </span>
                    <p className="font-serif-luxury text-lg text-white font-medium mt-1.5 leading-snug">
                      “The child who concentrates is immensely happy.”
                    </p>
                  </div>
                </div>
              </div>

              {/* Storybook Annotation Floater */}
              <div className="absolute -bottom-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md rounded-[20px] p-4 border border-[#C7A75A]/40 shadow-luxury-md max-w-[210px] hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#F8F4EA] border border-[#C7A75A]/40 flex items-center justify-center text-[#C7A75A] shrink-0 font-serif-luxury text-sm">
                    Noor
                  </div>
                  <div>
                    <div className="text-[11px] text-[#647D9B] font-medium">Inner Light</div>
                    <div className="font-serif-luxury text-sm font-bold text-[#263B52]">Self-Paced Growth</div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right: Narrative Storytelling Text */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 20 }}
            whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: easeCurve }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="space-y-4">
              <p className="font-serif-luxury text-xl sm:text-2xl text-[#263B52] leading-relaxed font-semibold">
                Little Noor Montessori School, Bhuj provides a nurturing environment where children are encouraged to explore, discover, communicate, and grow with confidence.
              </p>

              <p className="text-base sm:text-lg text-[#5E5045] font-light leading-relaxed">
                Founded with deep reverence for Dr. Maria Montessori's discoveries, our school in Bhuj is not a classroom of desks and lectures, but a living children's house. Here, young minds interact with tactile wooden apparatus, self-correcting puzzles, and natural botanical elements at their own harmonious rhythm.
              </p>
            </div>

            {/* Three Tiny Interactive Symbols: ✦ Curiosity, 🌿 Growth, ◌ Independence */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              
              {/* Symbol 1: ✦ Curiosity */}
              <div className="bg-white/90 rounded-[18px] p-4 border border-[#C7A75A]/30 shadow-luxury-xs hover:border-[#C7A75A] transition-all group">
                <div className="w-9 h-9 rounded-full bg-[#FFF9ED] border border-[#C7A75A]/40 flex items-center justify-center text-[#C7A75A] mb-2.5 text-base group-hover:scale-110 transition-transform">
                  ✦
                </div>
                <h4 className="font-serif-luxury text-base font-bold text-[#263B52]">
                  Curiosity
                </h4>
                <p className="text-xs text-[#5E5045] mt-1 leading-relaxed font-light">
                  Sparks that ignite lifelong questions and joyous exploration.
                </p>
              </div>

              {/* Symbol 2: 🌿 Growth */}
              <div className="bg-white/90 rounded-[18px] p-4 border border-[#87966C]/30 shadow-luxury-xs hover:border-[#87966C] transition-all group">
                <div className="w-9 h-9 rounded-full bg-[#F3F6EE] border border-[#87966C]/40 flex items-center justify-center text-[#87966C] mb-2.5 text-base group-hover:scale-110 transition-transform">
                  🌿
                </div>
                <h4 className="font-serif-luxury text-base font-bold text-[#263B52]">
                  Growth
                </h4>
                <p className="text-xs text-[#5E5045] mt-1 leading-relaxed font-light">
                  Natural blooming of physical, linguistic, and motor abilities.
                </p>
              </div>

              {/* Symbol 3: ◌ Independence */}
              <div className="bg-white/90 rounded-[18px] p-4 border border-[#647D9B]/30 shadow-luxury-xs hover:border-[#647D9B] transition-all group">
                <div className="w-9 h-9 rounded-full bg-[#EFF4FA] border border-[#647D9B]/40 flex items-center justify-center text-[#647D9B] mb-2.5 text-base group-hover:scale-110 transition-transform">
                  ◌
                </div>
                <h4 className="font-serif-luxury text-base font-bold text-[#263B52]">
                  Independence
                </h4>
                <p className="text-xs text-[#5E5045] mt-1 leading-relaxed font-light">
                  “Help me to do it by myself” fostering quiet inner self-worth.
                </p>
              </div>

            </div>

            {/* School Guide Ratio note */}
            <div className="pt-4 border-t border-[#C7A75A]/20 flex items-center gap-3 text-xs text-[#5E5045]">
              <span className="w-2 h-2 rounded-full bg-[#87966C]" />
              <span>Observation-based guidance</span>
              <span className="text-stone-300">•</span>
              <span>1:8 Guide-to-Child Ratio</span>
              <span className="text-stone-300">•</span>
              <span>Bhuj, Kutch</span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

