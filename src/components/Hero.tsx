import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Calendar, ArrowDown, Leaf, Sparkles, MapPin, Heart, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LivingBackground } from './cinematic/LivingBackground';
import { MagneticButton } from './cinematic/MagneticButton';
import { WordReveal } from './cinematic/WordReveal';

interface HeroProps {
  onOpenScheduleModal: () => void;
  onExplorePrograms?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenScheduleModal, onExplorePrograms }) => {
  const prefersReduced = useReducedMotion();
  const easeCurve = [0.22, 1, 0.36, 1] as const;
  const { t } = useLanguage();

  // Mouse-responsive 3D world with smooth physics interpolation
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const [offsets, setOffsets] = useState({
    bg: { x: 0, y: 0 },
    dec1: { x: 0, y: 0 },
    dec2: { x: 0, y: 0 },
    text: { x: 0, y: 0 },
    image: { x: 0, y: 0 },
    badge: { x: 0, y: 0 },
    cta: { x: 0, y: 0 },
  });

  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReduced) return;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalized between -1 and 1
      targetMouse.current = {
        x: (e.clientX / innerWidth - 0.5) * 2,
        y: (e.clientY / innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth physical interpolation loop
    const loop = () => {
      const factor = 0.08; // smooth physical damping
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * factor;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * factor;

      const mx = currentMouse.current.x;
      const my = currentMouse.current.y;

      setOffsets({
        bg: { x: mx * 3, y: my * 2.5 },
        dec1: { x: mx * 9, y: my * 8 },
        dec2: { x: mx * -8, y: my * -7 },
        text: { x: mx * 3.5, y: my * 3 },
        image: { x: mx * 11, y: my * 9 },
        badge: { x: mx * 16, y: my * 13 },
        cta: { x: mx * 5, y: my * 4 },
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [prefersReduced]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden pt-8 sm:pt-14 pb-16 sm:pb-24 bg-[#FAF8F1]">
      {/* ----------------------------------------------------
          Step 1: Cinematic Light Curtain Reveal
          Washes across the hero on initial mount
          ---------------------------------------------------- */}
      {!prefersReduced && (
        <motion.div
          initial={{ opacity: 1, scaleY: 1 }}
          animate={{ opacity: 0, scaleY: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-b from-[#FAF8F1] via-[#FAF8F1]/95 to-transparent z-40 pointer-events-none origin-top"
          aria-hidden="true"
        />
      )}

      {/* Living Atmospheric Background */}
      <div
        style={{
          transform: `translate3d(${offsets.bg.x}px, ${offsets.bg.y}px, 0)`,
        }}
        className="absolute inset-0 will-change-transform"
      >
        <LivingBackground />
      </div>

      {/* Floating Botanical Vector 1 (Independent Depth Plane) */}
      <div
        className="absolute top-20 left-6 sm:left-24 pointer-events-none select-none z-10 will-change-transform"
        style={{
          transform: `translate3d(${offsets.dec1.x}px, ${offsets.dec1.y}px, 0)`,
        }}
        aria-hidden="true"
      >
        <svg
          className="w-14 h-14 sm:w-20 sm:h-20 text-[#9CAF88]/25 animate-float-leaf"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      </div>

      {/* Floating Botanical Vector 2 (Counter-depth Plane) */}
      <div
        className="absolute top-1/2 right-4 sm:right-16 pointer-events-none select-none z-10 will-change-transform"
        style={{
          transform: `translate3d(${offsets.dec2.x}px, ${offsets.dec2.y}px, 0)`,
        }}
        aria-hidden="true"
      >
        <svg
          className="w-16 h-16 sm:w-24 sm:h-24 text-[#1E3A2B]/10 animate-float-leaf"
          style={{ animationDelay: '2s' }}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M12 52C22 50 36 42 42 22C32 20 18 28 12 52Z" />
          <path d="M12 52C26 38 42 22 52 12" />
          <path d="M26 38C32 34 38 32 44 32" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Top Mini Admissions Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeCurve }}
          className="mb-8 flex items-center justify-center"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#E2E8E0]/90 border border-[#9CAF88]/40 shadow-botanical-xs text-xs text-[#1E3A2B] backdrop-blur-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A2B] animate-pulse" />
            <span className="font-bold text-[#1E3A2B]">{t.nav.admissionsOpen}:</span>
            <span className="text-[#1E3A2B]/85 hidden sm:inline">{t.hero.admissionsNotice}</span>
            <span className="text-[#1E3A2B]/85 sm:hidden">Playhouse to Sr. Kg</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Physical Space Narrative */}
          <div
            className="lg:col-span-7 space-y-6 sm:space-y-8 text-left p-2 sm:p-4 will-change-transform"
            style={{
              transform: `translate3d(${offsets.text.x}px, ${offsets.text.y}px, 0)`,
            }}
          >
            {/* Organic Badge: “Learn • Explore • Grow” */}
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: easeCurve }}
              className="inline-flex items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E2E8E0] border border-[#9CAF88]/40 shadow-botanical-xs text-[#1E3A2B] text-xs font-bold tracking-wider uppercase font-sans">
                <Leaf className="w-3.5 h-3.5 text-[#1E3A2B]" />
                <span>{t.hero.badge}</span>
              </div>
            </motion.div>

            {/* Editorial Headline with Word-Staggered Mask Reveal */}
            <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1E3A2B] tracking-tight leading-[1.15]">
              <WordReveal text={t.hero.headlinePart1} delay={0.45} /> <br className="hidden sm:inline" />
              <span className="text-[#9CAF88] italic font-normal">{t.hero.headlinePart2}</span>
            </h1>

            {/* Welcoming Montessori Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.6, ease: easeCurve }}
              className="space-y-3"
            >
              <p className="text-base sm:text-lg lg:text-xl text-[#1E3A2B]/85 font-sans font-normal leading-relaxed">
                {t.hero.description}
              </p>
            </motion.div>

            {/* Micro Highlights Pill Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.72, ease: easeCurve }}
              className="flex flex-wrap items-center gap-2.5 pt-1 text-xs text-[#1E3A2B]"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 border border-[#9CAF88]/40 shadow-botanical-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#9CAF88]" />
                {t.hero.locationBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 border border-[#9CAF88]/40 shadow-botanical-xs font-semibold">
                <Heart className="w-3.5 h-3.5 text-[#9CAF88]" />
                {t.hero.ratioBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 border border-[#9CAF88]/40 shadow-botanical-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#9CAF88]" />
                {t.hero.timingBadge}
              </span>
            </motion.div>

            {/* Magnetic CTA Buttons Emerge Last */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: easeCurve }}
              style={{
                transform: `translate3d(${offsets.cta.x}px, ${offsets.cta.y}px, 0)`,
              }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3"
            >
              <MagneticButton
                variant="primary"
                id="hero-explore-school-btn"
                onClick={() => (onExplorePrograms ? onExplorePrograms() : scrollToSection('about'))}
                className="px-8 py-4 text-sm sm:text-base font-bold shadow-botanical-md hover:shadow-botanical-lg"
                dataCursor="open"
              >
                <span>{t.hero.ctaExplore}</span>
                <ArrowDown className="w-4 h-4 text-[#9CAF88]" />
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                id="hero-book-visit-btn"
                onClick={onOpenScheduleModal}
                className="px-8 py-4 text-sm sm:text-base font-bold shadow-botanical-xs hover:shadow-botanical-sm"
                dataCursor="pointer"
              >
                <Calendar className="w-4 h-4 text-[#1E3A2B]" />
                <span>{t.hero.ctaVisit}</span>
              </MagneticButton>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Layered Physical Image Depth */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
              animate={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.45, ease: easeCurve }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Image Frame with deeper parallax offset */}
              <div
                className="relative rounded-[32px] overflow-hidden shadow-botanical-lg border-2 border-[#9CAF88]/40 bg-white will-change-transform"
                style={{
                  transform: `translate3d(${offsets.image.x}px, ${offsets.image.y}px, 0)`,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1000&q=80"
                  alt="Child working with natural wooden Montessori cylinder blocks at Little Noor"
                  className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />
                
                {/* Overlay Quote Badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A2B]/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-left text-white space-y-1 pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold mb-1">
                      <Sparkles className="w-3 h-3 text-[#9CAF88]" />
                      <span>{t.hero.quoteBadge}</span>
                    </div>
                    <p className="font-serif-luxury text-base sm:text-lg font-bold text-[#FAF8F1] leading-snug">
                      {t.hero.quoteText}
                    </p>
                    <p className="text-xs text-[#FAF8F1]/80 font-sans">
                      {t.hero.quoteAuthor}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Accent Card on Highest Depth Plane */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                style={{
                  transform: `translate3d(${offsets.badge.x}px, ${offsets.badge.y}px, 0)`,
                }}
                className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#9CAF88]/40 shadow-botanical-md max-w-[220px] text-left hidden sm:block z-30 will-change-transform"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#9CAF88]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2B]">
                    {t.hero.staffBadgeTag}
                  </span>
                </div>
                <p className="text-xs font-bold text-[#1E3A2B] leading-snug">
                  {t.hero.staffBadgeText}
                </p>
              </motion.div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
