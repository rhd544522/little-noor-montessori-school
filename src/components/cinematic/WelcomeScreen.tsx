import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Botanical3DLeaves } from './Botanical3DLeaves';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const shouldReduce = useReducedMotion();
  const { isDark } = useTheme();

  // Prevent background scrolling while welcome screen is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // ----------------------------------------------------
  // Animation timeline stages:
  // 0: Background appears smoothly (0.0s)
  // 1: Logo appears first with soft reveal and scale-in (0.4s)
  // 2: School name fades in ("Little Noor Montessori School") (1.3s)
  // 3: Tagline appears ("Where little minds begin to grow.") (2.2s)
  // 4: Continue button reveals + creator credit (3.0s)
  // 5: Leaves & atmospheric particles gently move in full harmony (3.6s)
  // ----------------------------------------------------
  const [animStage, setAnimStage] = useState<number>(shouldReduce ? 5 : 0);
  
  // ----------------------------------------------------
  // Exit choreography sequence:
  // 0: Idle display
  // 1: Clicked! Continue button disappears, light moves toward logo, tagline fades (0ms)
  // 2: School name dissolves, logo scales 1 -> 1.08, organic mask expands from behind logo (240ms)
  // 3: Mask fully covers viewport, doorway opens into homepage (820ms)
  // ----------------------------------------------------
  const [exitStage, setExitStage] = useState<number>(0);

  // Magnetic button state & physics
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });
  const isHoveringButton = useRef(false);

  // Smooth pointer parallax offsets (GPU friendly, zero jitter)
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({
    bg: { x: 0, y: 0 },
    deco: { x: 0, y: 0 },
    logo: { x: 0, y: 0 },
    text: { x: 0, y: 0 },
    norm: { x: 0, y: 0 },
  });

  const animFrameRef = useRef<number | null>(null);

  // Master entrance timeline orchestration (Logo first -> School name -> Tagline -> Continue)
  useEffect(() => {
    if (shouldReduce) {
      setAnimStage(5);
      return;
    }

    // Sequence:
    // 0.0s: Background appears smoothly
    const t1 = setTimeout(() => setAnimStage(1), 400);  // 1: Logo appears first (soft scale-in, warm light bloom)
    const t2 = setTimeout(() => setAnimStage(2), 1300); // 2: "Little Noor Montessori School" fades in
    const t3 = setTimeout(() => setAnimStage(3), 2200); // 3: Tagline appears ("Where little minds begin to grow.")
    const t4 = setTimeout(() => setAnimStage(4), 3000); // 4: Continue button reveals + creator credit
    const t5 = setTimeout(() => setAnimStage(5), 3600); // 5: Leaves & particles flow in full calm harmony

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [shouldReduce]);

  // Smooth Pointer Parallax & Magnetic Attraction loop
  useEffect(() => {
    if (shouldReduce) return;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseTarget.current = {
        x: (e.clientX / innerWidth - 0.5) * 2,
        y: (e.clientY / innerHeight - 0.5) * 2,
      };

      // Magnetic attraction for Continue button (Desktop only)
      if (buttonRef.current && animStage >= 4 && exitStage === 0) {
        const rect = buttonRef.current.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        const distX = e.clientX - btnCenterX;
        const distY = e.clientY - btnCenterY;
        const distance = Math.hypot(distX, distY);

        // Magnetic influence threshold: 120px
        if (distance < 120) {
          isHoveringButton.current = true;
          setButtonOffset({
            x: distX * 0.2,
            y: distY * 0.2,
          });
        } else if (isHoveringButton.current) {
          isHoveringButton.current = false;
          setButtonOffset({ x: 0, y: 0 });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth physical lerp loop
    const loop = () => {
      const lerpFactor = 0.055;
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * lerpFactor;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * lerpFactor;

      const mx = mouseCurrent.current.x;
      const my = mouseCurrent.current.y;

      setParallax({
        bg: { x: mx * 3.0, y: my * 2.5 },         // Background: 2-4px
        deco: { x: mx * 5.5, y: my * 4.5 },       // Decorative layer: 4-7px
        logo: { x: mx * 1.5, y: my * 1.2 },       // Logo: 1-2px max
        text: { x: mx * 0.8, y: my * 0.6 },       // Text: 1px max
        norm: { x: mx, y: my },                    // Normalized pointer coordinates for 3D leaves
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [animStage, exitStage, shouldReduce]);

  // ----------------------------------------------------
  // Scene 9: Signature Continue Transition
  // "THE LOGO IS OPENING THE DOOR TO THE SCHOOL"
  // ----------------------------------------------------
  const handleContinue = () => {
    if (exitStage > 0) return;

    try {
      sessionStorage.setItem('little_noor_welcome_completed', 'true');
    } catch {
      // Storage access protected or restricted
    }

    if (shouldReduce) {
      onComplete();
      return;
    }

    // Step 1: Continue button gently disappears, light moves toward logo, tagline fades
    setExitStage(1);

    // Step 2: School name dissolves, logo scales 1 -> 1.08, organic mask expands
    setTimeout(() => {
      setExitStage(2);
    }, 240);

    // Step 3: Doorway completes opening into the homepage
    setTimeout(() => {
      onComplete();
    }, 850);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleContinue();
    }
  };

  // Words for editorial staggered reveal
  const titleWords = ['Little', 'Noor', 'Montessori', 'School'];

  return (
    <AnimatePresence>
      {exitStage < 3 && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to Little Noor Montessori School"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: 'blur(10px)',
            scale: 1.02,
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden select-none p-4 sm:p-6 bg-[#FAF8F1]"
          style={{
            // Organic expanding aperture mask centered at the school logo
            clipPath:
              exitStage === 2
                ? 'circle(160% at 50% 44%)'
                : exitStage === 1
                ? 'circle(100% at 50% 44%)'
                : 'circle(100% at 50% 50%)',
            transition:
              exitStage === 2
                ? 'clip-path 0.78s cubic-bezier(0.16, 1, 0.3, 1)'
                : 'none',
          }}
        >
          {/* ----------------------------------------------------
              SCENE 1 & 2: WARM ATMOSPHERIC LIGHTING & GRADIENTS
              "Sunlight entering a calm Montessori classroom"
              ---------------------------------------------------- */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform"
            style={{
              transform: `translate3d(${parallax.bg.x}px, ${parallax.bg.y}px, 0)`,
            }}
            aria-hidden="true"
          >
            {/* Center atmospheric sunlight bloom */}
            <motion.div
              initial={{ opacity: 0.15, scale: 0.7 }}
              animate={
                exitStage >= 1
                  ? {
                      opacity: 0.95,
                      scale: 1.3,
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    }
                  : animStage >= 1
                  ? {
                      opacity: 0.85,
                      scale: 1,
                      transition: { duration: 1.8, ease: 'easeOut' },
                    }
                  : { opacity: 0.25, scale: 0.8 }
              }
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[140px] pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(156, 175, 136, 0.28) 0%, rgba(226, 232, 224, 0.45) 45%, rgba(250, 248, 241, 0) 75%)',
              }}
            />

            {/* Slow breathing atmospheric warmth */}
            <div
              className="absolute -top-36 -right-36 w-[420px] h-[420px] rounded-full blur-3xl animate-ambient-drift-1 pointer-events-none bg-[#E2E8E0]/50"
            />
            <div
              className="absolute -bottom-36 -left-36 w-[420px] h-[420px] rounded-full blur-3xl animate-ambient-drift-2 pointer-events-none bg-[#9CAF88]/20"
            />
          </div>

          {/* ----------------------------------------------------
              STEP 2: SUBTLE ATMOSPHERIC PARTICLES
              Gently floating particles in the atmosphere
              ---------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: animStage >= 1 && exitStage === 0 ? (isDark ? 0.65 : 0.5) : 0,
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 pointer-events-none overflow-hidden z-[2]"
            aria-hidden="true"
          >
            {[
              { id: 1, left: '12%', top: '24%', size: 3.5, dur: '6.5s', del: '0s' },
              { id: 2, left: '26%', top: '72%', size: 2.5, dur: '7.2s', del: '1.2s' },
              { id: 3, left: '44%', top: '16%', size: 4.0, dur: '8.0s', del: '0.4s' },
              { id: 4, left: '60%', top: '80%', size: 3.0, dur: '6.8s', del: '1.8s' },
              { id: 5, left: '76%', top: '28%', size: 3.5, dur: '7.5s', del: '0.8s' },
              { id: 6, left: '86%', top: '65%', size: 2.5, dur: '8.4s', del: '2.1s' },
              { id: 7, left: '8%',  top: '52%', size: 3.0, dur: '7.1s', del: '1.4s' },
              { id: 8, left: '22%', top: '36%', size: 4.0, dur: '6.6s', del: '0.6s' },
              { id: 9, left: '34%', top: '86%', size: 2.5, dur: '7.9s', del: '2.4s' },
              { id: 10, left: '50%', top: '58%', size: 3.5, dur: '7.0s', del: '1.0s' },
              { id: 11, left: '66%', top: '20%', size: 4.0, dur: '8.2s', del: '0.2s' },
              { id: 12, left: '80%', top: '48%', size: 3.0, dur: '7.3s', del: '1.5s' },
              { id: 13, left: '18%', top: '82%', size: 2.5, dur: '8.1s', del: '1.9s' },
              { id: 14, left: '72%', top: '70%', size: 3.5, dur: '6.3s', del: '0.7s' },
              { id: 15, left: '90%', top: '26%', size: 2.5, dur: '7.7s', del: '1.3s' },
            ].map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full pointer-events-none animate-pulse"
                style={{
                  left: p.left,
                  top: p.top,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: isDark ? 'rgba(180, 205, 165, 0.75)' : 'rgba(125, 152, 108, 0.65)',
                  boxShadow: isDark
                    ? '0 0 8px rgba(180, 205, 165, 0.6)'
                    : '0 0 6px rgba(125, 152, 108, 0.5)',
                  animationDuration: p.dur,
                  animationDelay: p.del,
                }}
              />
            ))}
          </motion.div>

          {/* ----------------------------------------------------
              STEP 3: PREMIUM 3D BOTANICAL LEAVES
              Realistic botanical leaves with depth, shadows, rotation & parallax
              ---------------------------------------------------- */}
          {animStage >= 2 && (
            <Botanical3DLeaves
              isExiting={exitStage > 0}
              mouseParallax={parallax.norm}
              countScale={1.0}
            />
          )}

          {/* ----------------------------------------------------
              SCENE 7: BACKGROUND DEPTH & BOTANICAL LINES
              ---------------------------------------------------- */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform"
            style={{
              transform: `translate3d(${parallax.deco.x}px, ${parallax.deco.y}px, 0)`,
            }}
            aria-hidden="true"
          >
            {/* Elegant botanical watermark circle */}
            <motion.svg
              initial={{ opacity: 0, scale: 0.88 }}
              animate={
                animStage >= 4 && exitStage === 0
                  ? { opacity: isDark ? 0.08 : 0.055, scale: 1 }
                  : { opacity: 0 }
              }
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="absolute bottom-8 right-8 sm:bottom-16 sm:right-20 w-56 h-56 sm:w-72 sm:h-72 text-current pointer-events-none animate-slow-rotate"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            >
              <circle cx="50" cy="50" r="46" strokeDasharray="3 4" />
              <path d="M50 4 C68 24 76 42 50 96 C24 42 32 24 50 4 Z" />
              <path d="M4 50 C24 68 42 76 96 50 C42 24 24 32 4 50 Z" />
            </motion.svg>

            {/* Top-left subtle organic Montessori branch contour */}
            <motion.svg
              initial={{ opacity: 0 }}
              animate={
                animStage >= 4 && exitStage === 0
                  ? { opacity: isDark ? 0.07 : 0.045 }
                  : { opacity: 0 }
              }
              transition={{ duration: 1.4, delay: 0.2 }}
              className="absolute top-10 left-8 sm:top-16 sm:left-20 w-44 h-44 text-[#9CAF88] pointer-events-none"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            >
              <path d="M10 80 Q 50 10 90 80" />
              <circle cx="50" cy="45" r="9" fill="currentColor" fillOpacity="0.08" />
            </motion.svg>
          </div>

          {/* ----------------------------------------------------
              MAIN CINEMATIC COMPOSITION
              ---------------------------------------------------- */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto w-full px-4">
            
            {/* --------------------------------------------------
                SCENE 3 & 4: LOGO REVEAL & 3D LIGHT BLOOM
                - Blur 18px -> 0
                - Scale 0.82 -> 1
                - Opacity 0 -> 1
                - Vertical displacement 14px -> 0
                - Subtle light pulse upon settling
                - 1-2px pointer parallax
                -------------------------------------------------- */}
            <div
              className="relative mb-6 sm:mb-8 flex items-center justify-center will-change-transform"
              style={{
                transform: `translate3d(${parallax.logo.x}px, ${parallax.logo.y}px, 0)`,
              }}
            >
              {/* Subtle warm light bloom emerging behind the logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={
                  exitStage >= 2
                    ? { opacity: 0.95, scale: 1.6 }
                    : animStage >= 1
                    ? {
                        opacity: [0, 0.8, 0.45],
                        scale: [0.75, 1.3, 1.15],
                      }
                    : { opacity: 0, scale: 0.7 }
                }
                transition={
                  exitStage >= 2
                    ? { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                    : { duration: 1.6, ease: [0.16, 1, 0.3, 1] }
                }
                className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-[#9CAF88]/35 via-[#FAF8F1] to-[#E2E8E0]/45 blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* The Existing Little Noor Montessori Logo */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.82,
                  filter: 'blur(18px)',
                  y: 14,
                }}
                animate={
                  exitStage >= 2
                    ? {
                        opacity: 1,
                        scale: 1.08, // Subtle scale from 1 -> 1.08 during signature exit
                        filter: 'blur(0px)',
                        y: 0,
                      }
                    : animStage >= 1
                    ? {
                        opacity: 1,
                        scale: 1,
                        filter: 'blur(0px)',
                        y: 0,
                      }
                    : {
                        opacity: 0,
                        scale: 0.82,
                        filter: 'blur(18px)',
                        y: 14,
                      }
                }
                transition={{
                  duration: exitStage >= 2 ? 0.75 : 1.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-2.5 shadow-botanical-md border border-[#9CAF88]/40 flex items-center justify-center overflow-hidden"
              >
                <img
                  src="/little-noor-logo.svg"
                  alt="Little Noor Montessori School Logo"
                  className="w-full h-full object-contain"
                  loading="eager"
                  fetchPriority="high"
                />
              </motion.div>
            </div>

            {/* --------------------------------------------------
                SCENE 5: SCHOOL NAME REVEAL
                - "Little Noor Montessori School"
                - Primary color: #1E3A2B (Deep Forest Green)
                - Text shadow: 0 2px 8px rgba(0,0,0,0.08)
                -------------------------------------------------- */}
            <div
              className="space-y-2 mb-3 will-change-transform"
              style={{
                transform: `translate3d(${parallax.text.x}px, ${parallax.text.y}px, 0)`,
              }}
            >
              <h1
                className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-tight flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1"
                style={{
                  color: '#1E3A2B',
                  textShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                {titleWords.map((word, idx) => (
                  <span key={word} className="inline-block overflow-hidden pb-1">
                    <motion.span
                      initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                      animate={
                        exitStage >= 2
                          ? { opacity: 0, y: -12, filter: 'blur(6px)' }
                          : animStage >= 2
                          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                          : { opacity: 0, y: 20, filter: 'blur(6px)' }
                      }
                      transition={{
                        duration: 0.75,
                        delay: exitStage >= 2 ? 0 : 0.09 * idx,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="inline-block"
                      style={{
                        color: '#1E3A2B',
                        textShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              {/* Location Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={
                  exitStage >= 2
                    ? { opacity: 0, y: -8, filter: 'blur(4px)' }
                    : animStage >= 2
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 12, filter: 'blur(4px)' }
                }
                transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p
                  className="text-[11px] sm:text-xs uppercase tracking-[0.28em] font-bold font-sans"
                  style={{ color: '#48604D' }}
                >
                  BHuj, KUTCH • PREPARED ENVIRONMENT
                </p>
              </motion.div>
            </div>

            {/* --------------------------------------------------
                SCENE 6: TAGLINE REVEAL
                - "Where little minds begin to grow."
                - Warm muted gold/brown: #8A6A3A
                -------------------------------------------------- */}
            <motion.p
              initial={{
                opacity: 0,
                y: 15,
                filter: 'blur(6px)',
                letterSpacing: '0.04em',
              }}
              animate={
                exitStage >= 1
                  ? { opacity: 0, y: -8, filter: 'blur(4px)' }
                  : animStage >= 3
                  ? {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      letterSpacing: '0em',
                    }
                  : { opacity: 0, y: 15, filter: 'blur(6px)' }
              }
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif italic text-base sm:text-lg lg:text-xl max-w-sm mx-auto mb-8 sm:mb-9 font-semibold leading-relaxed"
              style={{ color: '#8A6A3A' }}
            >
              "Where little minds begin to grow."
            </motion.p>

            {/* --------------------------------------------------
                SCENE 7: CONTINUE BUTTON
                - Background: #063522
                - Text: #F8F4EA
                - Arrow: #C8A45D
                - Border: #C8A45D
                -------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              animate={
                exitStage >= 1
                  ? { opacity: 0, y: -10, scale: 0.92 }
                  : animStage >= 4
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 18, scale: 0.94 }
              }
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transform: `translate3d(${buttonOffset.x}px, ${buttonOffset.y}px, 0)`,
                transition: 'transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <button
                ref={buttonRef}
                type="button"
                onClick={handleContinue}
                onKeyDown={handleKeyDown}
                autoFocus
                disabled={animStage < 4 || exitStage > 0}
                data-cursor="enter"
                aria-label="Continue to Little Noor Montessori School website"
                style={{
                  backgroundColor: '#063522',
                  borderColor: '#C8A45D',
                  color: '#F8F4EA',
                }}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full border-2 transition-all duration-300 shadow-botanical-lg hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#C8A45D] cursor-pointer overflow-hidden"
              >
                {/* Subtle animated highlight traveling across button */}
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                <span
                  className="relative z-10 font-bold tracking-[0.24em] uppercase text-xs sm:text-sm flex items-center gap-2.5"
                  style={{ color: '#F8F4EA' }}
                >
                  <span>CONTINUE</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 shrink-0 inline-block"
                    style={{ color: '#C8A45D' }}
                    aria-hidden="true"
                  />
                </span>
              </button>
            </motion.div>

            {/* --------------------------------------------------
                SCENE 8: CREATOR CREDIT
                - "MADE BY" -> #48604D
                - "REHAN DAMANI" -> #B08A3E
                - Divider lines: #B08A3E
                -------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={
                exitStage >= 1
                  ? { opacity: 0, y: -6 }
                  : animStage >= 4
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex items-center justify-center gap-2.5"
            >
              <span className="w-5 sm:w-7 h-[1px]" style={{ backgroundColor: '#B08A3E', opacity: 0.7 }} aria-hidden="true" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] select-none inline-flex items-center gap-1.5">
                <span style={{ color: '#48604D' }}>MADE BY</span>
                <span style={{ color: '#B08A3E' }}>REHAN DAMANI</span>
              </p>
              <span className="w-5 sm:w-7 h-[1px]" style={{ backgroundColor: '#B08A3E', opacity: 0.7 }} aria-hidden="true" />
            </motion.div>

            {/* --------------------------------------------------
                KEYBOARD INSTRUCTION
                - "Press Enter to begin" -> #48604D
                - Key: #063522 bg, #C8A45D border, #F8F4EA text
                -------------------------------------------------- */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={animStage >= 4 && exitStage === 0 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-3 text-xs font-sans tracking-wide font-medium"
              style={{ color: '#48604D' }}
            >
              Press{' '}
              <kbd
                className="px-2 py-0.5 rounded border text-[11px] font-bold shadow-xs inline-block"
                style={{
                  backgroundColor: '#063522',
                  borderColor: '#C8A45D',
                  color: '#F8F4EA',
                }}
              >
                Enter ↵
              </kbd>{' '}
              to begin
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
