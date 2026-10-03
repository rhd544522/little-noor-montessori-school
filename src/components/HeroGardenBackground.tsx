import React, { useEffect, useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface LeafData {
  id: number;
  startX: number; // percentage
  startY: number; // percentage
  size: number;
  color: string;
  duration: number;
  delay: number;
  rotateRange: [number, number];
  xDrift: number;
  yDrift: number;
  pathType: 'oval' | 'lanceolate' | 'double';
}

interface StarData {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

interface ParticleData {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const HeroGardenBackground: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop || prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from center (-1 to +1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDesktop, prefersReduced]);

  // Generate deterministic items
  const leaves: LeafData[] = useMemo(() => {
    const rawLeaves: LeafData[] = [
      { id: 1, startX: 12, startY: 18, size: 22, color: '#9FB57F', duration: 16, delay: 0, rotateRange: [-15, 20], xDrift: 24, yDrift: -20, pathType: 'oval' },
      { id: 2, startX: 28, startY: 12, size: 18, color: '#8DA6BE', duration: 19, delay: 2, rotateRange: [10, -25], xDrift: -18, yDrift: 15, pathType: 'lanceolate' },
      { id: 3, startX: 85, startY: 20, size: 24, color: '#C9A45C', duration: 15, delay: 1.5, rotateRange: [-20, 25], xDrift: -22, yDrift: 22, pathType: 'double' },
      { id: 4, startX: 92, startY: 65, size: 20, color: '#84A164', duration: 18, delay: 3, rotateRange: [5, -15], xDrift: 18, yDrift: -16, pathType: 'oval' },
      { id: 5, startX: 8, startY: 72, size: 23, color: '#8E9963', duration: 17, delay: 0.8, rotateRange: [-10, 18], xDrift: 20, yDrift: 14, pathType: 'lanceolate' },
      { id: 6, startX: 45, startY: 82, size: 19, color: '#9FB57F', duration: 20, delay: 4, rotateRange: [12, -20], xDrift: -15, yDrift: -18, pathType: 'oval' },
      { id: 7, startX: 68, startY: 15, size: 17, color: '#5077A2', duration: 14, delay: 2.5, rotateRange: [-18, 15], xDrift: 16, yDrift: 18, pathType: 'double' },
      { id: 8, startX: 78, startY: 85, size: 21, color: '#DFC496', duration: 16, delay: 1, rotateRange: [15, -12], xDrift: -20, yDrift: -22, pathType: 'oval' },
      { id: 9, startX: 20, startY: 48, size: 16, color: '#7D995C', duration: 18, delay: 3.5, rotateRange: [-8, 22], xDrift: 14, yDrift: -14, pathType: 'lanceolate' },
      { id: 10, startX: 62, startY: 68, size: 18, color: '#8DA6BE', duration: 19, delay: 1.8, rotateRange: [20, -18], xDrift: -18, yDrift: 16, pathType: 'double' },
      { id: 11, startX: 38, startY: 26, size: 20, color: '#9EA872', duration: 17, delay: 4.5, rotateRange: [-12, 16], xDrift: 15, yDrift: 20, pathType: 'oval' },
    ];
    // Reduce by ~45% on mobile
    return isDesktop ? rawLeaves : rawLeaves.slice(0, 6);
  }, [isDesktop]);

  const stars: StarData[] = useMemo(() => {
    const rawStars: StarData[] = [
      { id: 1, x: 18, y: 15, size: 13, color: '#C9A45C', duration: 5.2, delay: 0.2 },
      { id: 2, x: 32, y: 22, size: 9, color: '#5077A2', duration: 6.8, delay: 1.4 },
      { id: 3, x: 65, y: 12, size: 12, color: '#D4B36D', duration: 5.5, delay: 2.1 },
      { id: 4, x: 82, y: 18, size: 14, color: '#C9A45C', duration: 7.1, delay: 0.7 },
      { id: 5, x: 90, y: 42, size: 10, color: '#5077A2', duration: 6.0, delay: 3.2 },
      { id: 6, x: 86, y: 78, size: 13, color: '#D4B36D', duration: 5.8, delay: 1.1 },
      { id: 7, x: 70, y: 88, size: 11, color: '#C9A45C', duration: 6.4, delay: 2.5 },
      { id: 8, x: 25, y: 85, size: 12, color: '#5077A2', duration: 7.5, delay: 0.9 },
      { id: 9, x: 10, y: 60, size: 10, color: '#C9A45C', duration: 5.0, delay: 1.8 },
      { id: 10, x: 42, y: 75, size: 12, color: '#D4B36D', duration: 6.2, delay: 2.9 },
      { id: 11, x: 55, y: 20, size: 10, color: '#5077A2', duration: 5.6, delay: 0.4 },
      { id: 12, x: 74, y: 48, size: 11, color: '#C9A45C', duration: 6.9, delay: 3.5 },
      { id: 13, x: 15, y: 35, size: 9, color: '#D4B36D', duration: 7.2, delay: 2.0 },
    ];
    return isDesktop ? rawStars : rawStars.slice(0, 7);
  }, [isDesktop]);

  const particles: ParticleData[] = useMemo(() => {
    const rawParticles: ParticleData[] = [
      { id: 1, x: 22, y: 70, size: 4, duration: 9, delay: 0.5, opacity: 0.28 },
      { id: 2, x: 35, y: 85, size: 3, duration: 11, delay: 1.2, opacity: 0.22 },
      { id: 3, x: 48, y: 65, size: 5, duration: 10, delay: 2.4, opacity: 0.3 },
      { id: 4, x: 60, y: 80, size: 3.5, duration: 12, delay: 0.8, opacity: 0.25 },
      { id: 5, x: 72, y: 75, size: 4.5, duration: 9.5, delay: 3.1, opacity: 0.26 },
      { id: 6, x: 80, y: 60, size: 3, duration: 10.5, delay: 1.6, opacity: 0.2 },
      { id: 7, x: 15, y: 55, size: 4, duration: 11.5, delay: 2.8, opacity: 0.24 },
      { id: 8, x: 88, y: 70, size: 3.5, duration: 10, delay: 0.3, opacity: 0.25 },
      { id: 9, x: 52, y: 90, size: 4, duration: 12, delay: 3.6, opacity: 0.28 },
      { id: 10, x: 68, y: 50, size: 3, duration: 9, delay: 1.9, opacity: 0.22 },
      { id: 11, x: 30, y: 40, size: 4.5, duration: 11, delay: 2.1, opacity: 0.26 },
      { id: 12, x: 77, y: 35, size: 3.5, duration: 10, delay: 4.0, opacity: 0.24 },
      { id: 13, x: 42, y: 30, size: 4, duration: 12.5, delay: 1.0, opacity: 0.25 },
      { id: 14, x: 62, y: 25, size: 3, duration: 9.8, delay: 2.5, opacity: 0.2 },
      { id: 15, x: 85, y: 20, size: 4, duration: 10.8, delay: 0.7, opacity: 0.27 },
      { id: 16, x: 18, y: 25, size: 3.5, duration: 11.2, delay: 3.4, opacity: 0.23 },
      { id: 17, x: 50, y: 15, size: 4.5, duration: 10.2, delay: 1.5, opacity: 0.29 },
      { id: 18, x: 92, y: 88, size: 3, duration: 12.2, delay: 2.2, opacity: 0.21 },
    ];
    return isDesktop ? rawParticles : rawParticles.slice(0, 9);
  }, [isDesktop]);

  // Parallax shifts
  const leafShiftX = isDesktop && !prefersReduced ? mousePos.x * 5 : 0;
  const leafShiftY = isDesktop && !prefersReduced ? mousePos.y * 5 : 0;
  const starShiftX = isDesktop && !prefersReduced ? mousePos.x * 3 : 0;
  const starShiftY = isDesktop && !prefersReduced ? mousePos.y * 3 : 0;
  const glowShiftX = isDesktop && !prefersReduced ? mousePos.x * 2 : 0;
  const glowShiftY = isDesktop && !prefersReduced ? mousePos.y * 2 : 0;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none bg-[#FFF9F1]"
    >
      {/* 1. Base Subtle Radial Light Layers behind content */}
      <motion.div
        style={{
          transform: `translate(${glowShiftX}px, ${glowShiftY}px)`,
          transition: 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)',
        }}
        className="absolute inset-0"
      >
        {/* Soft champagne gold center-glow */}
        <motion.div
          animate={
            prefersReduced
              ? { opacity: 0.25, scale: 1 }
              : {
                  scale: [1, 1.05, 1],
                  opacity: [0.20, 0.35, 0.20],
                }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[650px] sm:h-[900px] rounded-full bg-[radial-gradient(circle,rgba(215,181,99,0.38)_0%,rgba(247,236,216,0.22)_40%,transparent_70%)] blur-2xl"
        />

        {/* Muted Blue soft glow accent on right/top */}
        <div className="absolute top-10 right-1/4 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(141,166,190,0.22)_0%,transparent_65%)] blur-3xl" />

        {/* Very light Sage Green soft glow accent on left/bottom */}
        <div className="absolute bottom-10 left-1/6 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(159,181,127,0.24)_0%,transparent_65%)] blur-3xl" />

        {/* Subtle warmer perimeter gradient vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(247,238,226,0.45)_100%)]" />
      </motion.div>

      {/* 2. Botanical Arc (Subtle curved line inspired by the circular logo wreath) */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] lg:w-[1100px] h-[850px] lg:h-[1100px] opacity-[0.28]"
        viewBox="0 0 1000 1000"
        fill="none"
      >
        <motion.circle
          cx="500"
          cy="500"
          r="440"
          stroke="url(#botanicalArcGrad)"
          strokeWidth="1.6"
          strokeDasharray="14 8 4 8"
          animate={
            prefersReduced
              ? { opacity: 0.6 }
              : {
                  opacity: [0.35, 0.75, 0.35],
                }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <circle cx="500" cy="500" r="410" stroke="#C9A45C" strokeWidth="0.8" strokeDasharray="6 14" opacity="0.4" />
        
        {/* Subtle tiny floral/leaf nodes along the arc */}
        <circle cx="500" cy="60" r="3.5" fill="#C9A45C" opacity="0.6" />
        <circle cx="940" cy="500" r="3.5" fill="#8DA6BE" opacity="0.6" />
        <circle cx="500" cy="940" r="3.5" fill="#9FB57F" opacity="0.6" />
        <circle cx="60" cy="500" r="3.5" fill="#C9A45C" opacity="0.6" />

        <defs>
          <linearGradient id="botanicalArcGrad" x1="0" y1="0" x2="1000" y2="1000" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C9A45C" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#9FB57F" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#8DA6BE" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C9A45C" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* 3. Floating Leaves Layer */}
      <div
        style={{
          transform: `translate(${leafShiftX}px, ${leafShiftY}px)`,
          transition: 'transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)',
        }}
        className="absolute inset-0"
      >
        {leaves.map((leaf) => {
          return (
            <motion.div
              key={leaf.id}
              className="absolute"
              style={{
                left: `${leaf.startX}%`,
                top: `${leaf.startY}%`,
                width: leaf.size,
                height: leaf.size,
              }}
              animate={
                prefersReduced
                  ? { opacity: 0.65, x: 0, y: 0, rotate: 0 }
                  : {
                      x: [0, leaf.xDrift, 0, -leaf.xDrift * 0.7, 0],
                      y: [0, leaf.yDrift, -leaf.yDrift * 0.5, leaf.yDrift * 0.8, 0],
                      rotate: [leaf.rotateRange[0], leaf.rotateRange[1], leaf.rotateRange[0]],
                      opacity: [0.45, 0.85, 0.5, 0.8, 0.45],
                    }
              }
              transition={{
                duration: leaf.duration,
                repeat: Infinity,
                delay: leaf.delay,
                ease: 'easeInOut',
              }}
            >
              <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none">
                {leaf.pathType === 'oval' && (
                  <path
                    d="M20 4 C10 12, 8 26, 20 36 C32 26, 30 12, 20 4 Z"
                    fill={leaf.color}
                    fillOpacity="0.85"
                  />
                )}
                {leaf.pathType === 'lanceolate' && (
                  <path
                    d="M20 2 C12 14, 14 30, 20 38 C26 30, 28 14, 20 2 Z"
                    fill={leaf.color}
                    fillOpacity="0.82"
                  />
                )}
                {leaf.pathType === 'double' && (
                  <g>
                    <path
                      d="M20 8 C14 16, 12 26, 20 32 C28 26, 26 16, 20 8 Z"
                      fill={leaf.color}
                      fillOpacity="0.85"
                    />
                    <path
                      d="M20 8 L20 32"
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      strokeOpacity="0.6"
                    />
                  </g>
                )}
              </svg>
            </motion.div>
          );
        })}
      </div>

      {/* 4. Little Stars Layer (Slow Twinkle) */}
      <div
        style={{
          transform: `translate(${starShiftX}px, ${starShiftY}px)`,
          transition: 'transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)',
        }}
        className="absolute inset-0"
      >
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={
              prefersReduced
                ? { opacity: 0.5, scale: 1 }
                : {
                    opacity: [0.25, 0.75, 0.25],
                    scale: [0.92, 1.08, 0.92],
                  }
            }
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
          >
            {/* 4-point star shape inspired by Montessori logo stars */}
            <svg viewBox="0 0 24 24" width="100%" height="100%">
              <path
                d="M12 0 Q12 12 24 12 Q12 12 12 24 Q12 12 0 12 Q12 12 12 0 Z"
                fill={star.color}
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* 5. Floating Light Particles (Drifting gently upwards) */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              bottom: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: '#DFC496',
            }}
            animate={
              prefersReduced
                ? { opacity: p.opacity, y: 0 }
                : {
                    y: [0, -45, -90],
                    x: [0, (p.id % 2 === 0 ? 8 : -8), 0],
                    opacity: [0, p.opacity, 0],
                  }
            }
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* 6. Subtle Crescent & Star Motif (Custom-tailored inspired by the logo's Noor crest) */}
      <motion.div
        animate={
          prefersReduced
            ? { opacity: 0.35 }
            : {
                opacity: [0.25, 0.45, 0.25],
                scale: [1, 1.03, 1],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-12 right-12 sm:right-24 w-16 h-16 opacity-30 text-[#3D757B]"
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          {/* Crescent */}
          <path d="M48 20 C42 36, 50 54, 68 58 C58 64, 40 60, 34 46 C28 32, 34 22, 48 20 Z" />
          {/* Star */}
          <polygon points="68,34 71,40 78,41 72,46 74,53 68,49 62,53 64,46 58,41 65,40" />
        </svg>
      </motion.div>

    </div>
  );
};
