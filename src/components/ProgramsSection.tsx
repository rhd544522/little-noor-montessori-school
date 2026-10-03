import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Clock, Sparkles, ArrowRight, Check, Calendar, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TiltCard3D } from './cinematic/TiltCard3D';
import { MagneticButton } from './cinematic/MagneticButton';
import { WordReveal } from './cinematic/WordReveal';

interface ProgramsSectionProps {
  onSelectProgram?: (programName: string) => void;
  onOpenScheduleModal: () => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  onSelectProgram,
  onOpenScheduleModal,
}) => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const handleInquire = (programName: string) => {
    if (onSelectProgram) {
      onSelectProgram(programName);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const programList = [
    {
      id: 'playhouse',
      ...t.programs.playhouse,
      popular: false,
    },
    {
      id: 'nursery',
      ...t.programs.nursery,
      popular: true,
    },
    {
      id: 'srKg',
      ...t.programs.srKg,
      popular: false,
    },
  ];

  return (
    <section id="programs" className="py-20 sm:py-28 bg-[#FAF8F1] relative overflow-hidden">
      {/* Background Soft Ambient Diffusion */}
      <div className="absolute top-1/2 -left-28 w-96 h-96 bg-[#E2E8E0]/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 -right-28 w-96 h-96 bg-[#9CAF88]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E8E0] text-[#1E3A2B] text-xs font-bold tracking-wider uppercase mb-4 border border-[#9CAF88]/30">
            <Leaf className="w-3.5 h-3.5 text-[#1E3A2B]" />
            <span>{t.programs.badge}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A2B] tracking-tight leading-tight">
            <WordReveal text={t.programs.title} />
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#1E3A2B]/80 leading-relaxed font-sans max-w-2xl mx-auto">
            {t.programs.description}
          </p>
        </div>

        {/* 3D Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch perspective-[1000px]">
          {programList.map((program, idx) => (
            <motion.div
              key={program.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: idx * 0.12 }}
              className="flex"
            >
              <TiltCard3D
                maxTilt={4}
                glare={true}
                className={`w-full rounded-[28px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative border ${
                  program.popular
                    ? 'bg-white border-[#1E3A2B] shadow-botanical-lg ring-2 ring-[#9CAF88]/50'
                    : 'bg-white/95 border-[#9CAF88]/35 shadow-botanical-sm hover:shadow-botanical-md'
                }`}
              >
                {/* Most Enrolled Highlight Badge */}
                {program.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#1E3A2B] text-[#FAF8F1] text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 z-20">
                    <Sparkles className="w-3 h-3 text-[#9CAF88]" />
                    <span>{t.programs.mostEnrolled}</span>
                  </div>
                )}

                <div>
                  {/* Age & Ratio header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9CAF88]">
                      {program.age}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E2E8E0] text-[#1E3A2B]">
                      {program.ratio}
                    </span>
                  </div>

                  {/* Program Title */}
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E3A2B] mb-2 tracking-tight">
                    {program.name}
                  </h3>

                  {/* Program Timing */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1E3A2B]/80 mb-4 pb-4 border-b border-[#9CAF88]/20">
                    <Clock className="w-4 h-4 text-[#9CAF88]" />
                    <span>{program.timing}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#1E3A2B]/80 leading-relaxed font-sans mb-6">
                    {program.desc}
                  </p>

                  {/* Outcomes Checklist */}
                  <div className="space-y-2.5 mb-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#1E3A2B]">
                      {t.programs.keyMilestones}:
                    </p>
                    {program.outcomes.map((outcome, oIdx) => (
                      <div key={oIdx} className="flex items-start gap-2.5 text-xs text-[#1E3A2B]/90 font-medium">
                        <Check className="w-4 h-4 text-[#9CAF88] shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Magnetic CTAs */}
                <div className="space-y-3 pt-5 border-t border-[#9CAF88]/20">
                  <MagneticButton
                    variant="primary"
                    onClick={() => handleInquire(program.name)}
                    className="w-full py-3 text-xs sm:text-sm"
                    dataCursor="pointer"
                  >
                    <span>{t.programs.inquireBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#9CAF88]" />
                  </MagneticButton>

                  <MagneticButton
                    variant="outline"
                    onClick={onOpenScheduleModal}
                    className="w-full py-2.5 text-xs font-bold"
                    dataCursor="pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#9CAF88]" />
                    <span>{t.programs.tourBtn}</span>
                  </MagneticButton>
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
