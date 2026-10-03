import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sprout, Users, Compass, Sun, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const highlightIcons = [Users, Sprout, Compass, Sun];

  const pillars = [
    { title: t.about.pillar1Title, description: t.about.pillar1Desc },
    { title: t.about.pillar2Title, description: t.about.pillar2Desc },
    { title: t.about.pillar3Title, description: t.about.pillar3Desc },
    { title: t.about.pillar4Title, description: t.about.pillar4Desc },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FAF8F1] relative overflow-hidden">
      {/* Decorative leaf watermarks */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E2E8E0]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E8E0] text-[#1E3A2B] text-xs font-bold tracking-wider uppercase mb-4 border border-[#9CAF88]/30">
            <Sprout className="w-3.5 h-3.5 text-[#1E3A2B]" />
            <span>{t.about.badge}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A2B] tracking-tight leading-tight">
            {t.about.title}
          </h2>

          <p className="mt-5 text-base sm:text-lg text-[#1E3A2B]/80 font-sans max-w-2xl mx-auto leading-relaxed">
            {t.about.description}
          </p>
        </motion.div>

        {/* Narrative & Image Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-20">
          
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="p-7 sm:p-10 rounded-3xl bg-[#E2E8E0] border border-[#9CAF88]/35 shadow-botanical-sm hover:shadow-botanical-md transition-shadow">
              <span className="text-xs uppercase tracking-widest font-bold text-[#1E3A2B]/70 block mb-2">
                {t.about.cardTag}
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E3A2B] leading-snug">
                {t.about.cardTitle}
              </h3>
              <p className="mt-4 text-sm sm:text-base text-[#1E3A2B]/85 leading-relaxed font-sans">
                {t.about.cardDesc}
              </p>
              <div className="mt-6 pt-6 border-t border-[#9CAF88]/30 flex items-center justify-between">
                <div>
                  <p className="font-serif-luxury font-bold text-[#1E3A2B] text-base">{t.about.educatorName}</p>
                  <p className="text-xs text-[#1E3A2B]/70 font-medium">{t.about.educatorRole}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/80 border border-[#9CAF88]/40 flex items-center justify-center text-[#1E3A2B]">
                  <HeartHandshake className="w-5 h-5 text-[#9CAF88]" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[#9CAF88]/40 shadow-botanical-md bg-white group">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80"
                alt="Montessori learning environment with natural materials at Little Noor in Bhuj"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A2B]/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="px-3 py-1 rounded-full bg-[#1E3A2B]/80 backdrop-blur-xs text-[11px] font-bold border border-white/20">
                  {t.about.imageLocation}
                </span>
                <p className="mt-2 text-sm font-semibold text-[#FAF8F1]">
                  {t.about.imageCaption}
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 4 Foundation Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = highlightIcons[idx % highlightIcons.length];
            return (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
                whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                className="p-6 rounded-3xl bg-white border border-[#9CAF88]/30 shadow-botanical-xs hover:shadow-botanical-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E2E8E0] text-[#1E3A2B] flex items-center justify-center mb-4 border border-[#9CAF88]/30">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif-luxury text-lg font-bold text-[#1E3A2B] mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#1E3A2B]/75 font-sans leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
