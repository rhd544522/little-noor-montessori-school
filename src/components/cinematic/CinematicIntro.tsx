import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface CinematicIntroProps {
  onComplete?: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const shouldReduce = useReducedMotion();
  const [stage, setStage] = useState<number>(0);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    // If reduced motion is requested or already shown in this session, skip
    const alreadyShown = sessionStorage.getItem('little_noor_intro_seen');
    if (shouldReduce || alreadyShown) {
      setDismissed(true);
      if (onComplete) onComplete();
      return;
    }

    // Choreographed 8-step timeline (swift and refined - total ~1.9s)
    const timers = [
      setTimeout(() => setStage(1), 100),  // Step 1: Warm background
      setTimeout(() => setStage(2), 250),  // Step 2: Light gradient sweep
      setTimeout(() => setStage(3), 450),  // Step 3 & 4: Logo emerges from soft blur (opacity 0->1, scale 0.92->1)
      setTimeout(() => setStage(5), 750),  // Step 5: School name reveals
      setTimeout(() => setStage(6), 1050), // Step 6: Thin elegant line draws underneath
      setTimeout(() => setStage(7), 1350), // Step 7: Hero veil dissolves
      setTimeout(() => {
        setDismissed(true);
        sessionStorage.setItem('little_noor_intro_seen', 'true');
        if (onComplete) onComplete();
      }, 1900),
    ];

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [shouldReduce, onComplete]);

  const handleSkip = () => {
    setDismissed(true);
    sessionStorage.setItem('little_noor_intro_seen', 'true');
    if (onComplete) onComplete();
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
          onClick={handleSkip}
          className="fixed inset-0 z-[99990] flex flex-col items-center justify-center bg-[#FAF8F1] overflow-hidden select-none cursor-pointer"
        >
          {/* Step 2: Subtle Light Gradient Sweep Across Screen */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
              stage >= 2 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(226, 232, 224, 0.7) 0%, rgba(250, 248, 241, 0.4) 60%, transparent 100%)',
            }}
          />

          {/* Center Identity Stage */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md">
            
            {/* Steps 3 & 4: Logo emerges from soft blur, opacity 0->1, scale 0.92->1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
              animate={
                stage >= 3
                  ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
                  : { opacity: 0, scale: 0.92, filter: 'blur(8px)' }
              }
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-2 border-2 border-[#9CAF88]/50 shadow-botanical-md mb-5 overflow-hidden flex items-center justify-center"
            >
              <img
                src="/little-noor-logo.svg"
                alt="Little Noor Montessori"
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Step 5: School Name Staggered Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={stage >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-1"
            >
              <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1E3A2B] tracking-tight">
                Little Noor
              </h1>
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#9CAF88] font-bold">
                Montessori School • Bhuj
              </p>
            </motion.div>

            {/* Step 6: Thin elegant line draws underneath */}
            <div className="w-32 h-[1.5px] bg-[#9CAF88]/30 my-4 overflow-hidden relative rounded-full">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={stage >= 6 ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full bg-[#1E3A2B] origin-left"
              />
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={stage >= 6 ? { opacity: 0.8 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs text-[#1E3A2B]/75 font-serif italic"
            >
              A Nurturing Prepared Environment
            </motion.p>
          </div>

          {/* Discreet Skip Prompt */}
          <div className="absolute bottom-6 text-[11px] text-[#1E3A2B]/50 tracking-wider uppercase font-medium">
            Click anywhere to enter
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
