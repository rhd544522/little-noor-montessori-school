import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Sparkles, Trees, BookOpen, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { FACILITIES } from '../data/schoolData';
import { MagneticButton } from './cinematic/MagneticButton';
import { WordReveal } from './cinematic/WordReveal';

interface FacilitiesSectionProps {
  onOpenScheduleModal?: () => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ onOpenScheduleModal }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFacility = FACILITIES[activeIndex] || FACILITIES[0];

  const getFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-5 h-5 text-[#9CAF88]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#9CAF88]" />;
      case 'Trees':
        return <Trees className="w-5 h-5 text-[#9CAF88]" />;
      case 'BookOpen':
      default:
        return <BookOpen className="w-5 h-5 text-[#9CAF88]" />;
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setActiveIndex((prev) => (prev + 1) % FACILITIES.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setActiveIndex((prev) => (prev - 1 + FACILITIES.length) % FACILITIES.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="facilities" className="py-20 lg:py-28 bg-[#FAF8F1] relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#E2E8E0]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#9CAF88]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E8E0] text-[#1E3A2B] text-xs font-bold tracking-wider uppercase mb-4 border border-[#9CAF88]/30">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E3A2B]" />
            <span>Interactive Campus Architecture</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A2B] tracking-tight leading-tight">
            <WordReveal text="Environments Prepared for Independence" />
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#1E3A2B]/80 leading-relaxed font-sans">
            Every square foot at Little Noor Montessori School, Bhuj is deliberately arranged to offer calm, beauty, order, and sensory exploration. Select any zone to explore.
          </p>
        </div>

        {/* Interactive Storytelling Theater */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: Timeline Rail / Facility Selector */}
          <div className="lg:col-span-4 space-y-3">
            {FACILITIES.map((facility, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={facility.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-pointer flex items-center gap-4 relative overflow-hidden border ${
                    isActive
                      ? 'bg-white border-[#1E3A2B] shadow-botanical-md ring-2 ring-[#9CAF88]/40 translate-x-1'
                      : 'bg-white/70 hover:bg-white border-[#9CAF88]/30 hover:border-[#9CAF88]/60 shadow-xs'
                  }`}
                  data-cursor="pointer"
                >
                  {/* Left Active Indicator Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="facility-active-bar"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#1E3A2B]"
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#9CAF88]/30 bg-[#E2E8E0]">
                    <img
                      src={facility.imageUrl}
                      alt={facility.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-[#9CAF88] uppercase tracking-wider">
                        Zone 0{idx + 1}
                      </span>
                    </div>
                    <h3
                      className={`text-sm sm:text-base font-bold truncate transition-colors ${
                        isActive ? 'text-[#1E3A2B]' : 'text-[#1E3A2B]/75'
                      }`}
                    >
                      {facility.title}
                    </h3>
                  </div>

                  {/* Arrow Indicator */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isActive ? 'bg-[#1E3A2B] text-white rotate-0' : 'text-[#9CAF88] -rotate-45'
                    }`}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Active Facility Showcase with Expanding Imagery */}
          <div className="lg:col-span-8">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-[#9CAF88]/40 shadow-botanical-lg min-h-[460px] sm:min-h-[500px] flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFacility.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col h-full"
                >
                  {/* Photo Portal View */}
                  <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#E2E8E0]">
                    <img
                      src={activeFacility.imageUrl}
                      alt={activeFacility.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Floating Zone Pill */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-[#1E3A2B] shadow-xs">
                      {getFacilityIcon(activeFacility.iconName)}
                      <span>Montessori Prepared Space</span>
                    </div>

                    {/* Overlay Title */}
                    <div className="absolute bottom-4 left-5 right-5 text-white">
                      <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF8F1]">
                        {activeFacility.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <p className="text-sm sm:text-base text-[#1E3A2B]/85 leading-relaxed font-sans">
                      {activeFacility.description}
                    </p>

                    {/* Feature Highlights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#9CAF88]/25">
                      {activeFacility.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1E3A2B]/90 font-medium"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#E2E8E0] text-[#1E3A2B] flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-[#1E3A2B]" />
                          </span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA strip */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#9CAF88]/20">
                      <div className="text-xs text-[#9CAF88] font-bold uppercase tracking-wider">
                        Bhuj Campus • Physical Observation Available
                      </div>
                      {onOpenScheduleModal && (
                        <MagneticButton
                          onClick={onOpenScheduleModal}
                          variant="primary"
                          className="px-5 py-2.5 text-xs font-bold"
                        >
                          <span>Schedule Classroom Visit</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </MagneticButton>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
