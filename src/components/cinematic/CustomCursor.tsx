import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

type CursorMode = 'default' | 'pointer' | 'view' | 'open' | 'explore' | 'enter';

export const CustomCursor: React.FC = () => {
  const { isDark } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Check if device has fine pointer and prefers-reduced-motion is false
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasPointer || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const customMode = cursorTarget.getAttribute('data-cursor') as CursorMode;
        if (customMode) {
          setMode(customMode);
          return;
        }
      }

      // Check standard interactive elements
      if (target.closest('button, a, input, select, textarea, [role="button"]')) {
        setMode('pointer');
      } else {
        setMode('default');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth render loop with lerp
    const loop = () => {
      const lerp = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (!enabled) return null;

  // Determine ring size and styling based on mode
  let ringStyle = isDark
    ? 'w-8 h-8 border border-[#FAF8F1]/45 bg-transparent'
    : 'w-8 h-8 border border-[#1E3A2B]/40 bg-transparent';
  let labelText = '';

  if (mode === 'pointer') {
    ringStyle = isDark
      ? 'w-12 h-12 border border-[#9CAF88] bg-[#9CAF88]/25 backdrop-blur-[2px]'
      : 'w-12 h-12 border border-[#9CAF88] bg-[#9CAF88]/15 backdrop-blur-[2px]';
  } else if (mode === 'view') {
    ringStyle = isDark
      ? 'w-16 h-16 bg-[#254633] text-[#FAF8F1] shadow-lg border border-[#9CAF88]'
      : 'w-16 h-16 bg-[#1E3A2B] text-[#FAF8F1] shadow-lg border border-[#9CAF88]/50';
    labelText = 'VIEW';
  } else if (mode === 'open') {
    ringStyle = isDark
      ? 'w-16 h-16 bg-[#254633] text-[#FAF8F1] shadow-lg border border-[#9CAF88]'
      : 'w-16 h-16 bg-[#1E3A2B] text-[#FAF8F1] shadow-lg border border-[#9CAF88]/50';
    labelText = 'OPEN';
  } else if (mode === 'explore') {
    ringStyle = isDark
      ? 'w-20 h-20 bg-[#254633] text-[#FAF8F1] shadow-lg border border-[#9CAF88]'
      : 'w-20 h-20 bg-[#1E3A2B] text-[#FAF8F1] shadow-lg border border-[#9CAF88]/50';
    labelText = 'EXPLORE';
  } else if (mode === 'enter') {
    ringStyle = isDark
      ? 'w-16 h-16 bg-[#254633] text-[#FAF8F1] shadow-lg border border-[#9CAF88]'
      : 'w-16 h-16 bg-[#1E3A2B] text-[#FAF8F1] shadow-lg border border-[#9CAF88]/50';
    labelText = 'ENTER';
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Center sharp dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full pointer-events-none transition-transform duration-75 will-change-transform ${
          isDark ? 'bg-[#FAF8F1]' : 'bg-[#1E3A2B]'
        }`}
      />

      {/* Outer morphing ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none flex items-center justify-center font-bold text-[10px] tracking-widest transition-all duration-200 ease-out will-change-transform ${ringStyle}`}
        style={{
          transformOrigin: 'center center',
          margin: 0,
        }}
      >
        {labelText && <span className="select-none animate-fadeIn">{labelText}</span>}
      </div>
    </div>
  );
};
