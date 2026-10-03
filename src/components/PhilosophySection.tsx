import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Leaf, Sparkles, Heart, Compass, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PhilosophySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const pillars = [
    {
      id: 'self-directed',
      title: t.philosophy.card1Title,
      description: t.philosophy.card1Desc,
      icon: Compass,
    },
    {
      id: 'tactile',
      title: t.philosophy.card2Title,
      description: t.philosophy.card2Desc,
      icon: Sparkles,
    },
    {
      id: 'community',
      title: t.philosophy.card3Title,
      description: t.philosophy.card3Desc,
      icon: Heart,
    },
    {
      id: 'practical-life',
      title: t.philosophy.card4Title,
      description: t.philosophy.card4Desc,
      icon: Leaf,
    },
  ];

  return (
    <section id="philosophy" className="py-20 sm:py-28 bg-[#E2E8E0]/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-14 sm:mb-18"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E8E0] text-[#1E3A2B] text-xs font-semibold tracking-wider uppercase mb-4 border border-[#9CAF88]/40">
            <Leaf className="w-3.5 h-3.5 text-[#1E3A2B]" />
            <span>{t.philosophy.badge}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A2B] tracking-tight leading-tight">
            {t.philosophy.title} <br className="hidden sm:inline" />
            <span className="text-[#9CAF88] italic font-normal">{t.philosophy.titleAccent}</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#1E3A2B]/75 leading-relaxed font-sans max-w-2xl mx-auto">
            {t.philosophy.description}
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = activeTab === idx;
            return (
              <motion.div
                key={pillar.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
                whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                onClick={() => setActiveTab(idx)}
                className={`p-7 rounded-3xl cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'bg-[#FAF8F1] border-[#1E3A2B] shadow-botanical-md ring-1 ring-[#1E3A2B]'
                    : 'bg-white/90 hover:bg-[#FAF8F1] border-[#9CAF88]/30 shadow-botanical-xs'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E2E8E0] border border-[#9CAF88]/40 flex items-center justify-center text-[#1E3A2B] mb-5">
                  <Icon className="w-6 h-6 text-[#1E3A2B]" />
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#1E3A2B] mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#1E3A2B]/75 leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Montessori Quote Card */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl bg-[#1E3A2B] text-[#FAF8F1] text-center shadow-botanical-lg relative"
        >
          <Quote className="w-8 h-8 text-[#9CAF88]/40 mx-auto mb-3" />
          <p className="font-serif-luxury text-xl sm:text-2xl italic leading-relaxed text-[#FAF8F1]">
            {t.philosophy.quote}
          </p>
          <p className="mt-3 text-xs uppercase tracking-widest text-[#9CAF88] font-bold">
            — Dr. Maria Montessori
          </p>
        </motion.div>

      </div>
    </section>
  );
};
