import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * DynamicLight creates a warm, refined, Montessori-inspired radial light source
 * that follows the pointer across the entire viewport.
 * Uses requestAnimationFrame with smooth lerp interpolation for an organic physical feel.
 */
export const DynamicLight: React.FC = () => {
  const { isDark } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const lightRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -500, y: -500 });
  const currentPos = useRef({ x: -500, y: -500 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop fine pointer devices without reduced motion
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasPointer || prefersReduced) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onPointerMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      // Also update CSS custom properties on documentElement for cards to react
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // Smooth render loop with organic spring/lerp
    const loop = () => {
      const lerpFactor = 0.12;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

      if (lightRef.current) {
        lightRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[35] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Soft warm Montessori ambient illumination cone */}
      <div
        ref={lightRef}
        className={`fixed top-0 left-0 w-[700px] h-[700px] -ml-[350px] -mt-[350px] rounded-full pointer-events-none will-change-transform transition-opacity duration-700 ${
          isDark ? 'mix-blend-screen opacity-70' : 'mix-blend-soft-light opacity-100'
        }`}
        style={{
          background: isDark
            ? 'radial-gradient(circle 350px at center, rgba(167, 190, 152, 0.2) 0%, rgba(30, 58, 43, 0.12) 45%, transparent 75%)'
            : 'radial-gradient(circle 350px at center, rgba(250, 248, 241, 0.45) 0%, rgba(156, 175, 136, 0.16) 40%, rgba(226, 232, 224, 0.08) 60%, transparent 80%)',
        }}
      />
    </div>
  );
};
