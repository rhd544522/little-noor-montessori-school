import React, { useEffect, useState, useRef } from 'react';

interface LivingBackgroundProps {
  intensity?: 'subtle' | 'medium';
  className?: string;
}

export const LivingBackground: React.FC<LivingBackgroundProps> = ({
  className = '',
}) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Deepest Base Layer: Warm cream to sage gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F1] via-[#FAF8F1]/95 to-[#FAF8F1]" />

      {/* Layer 1: Background Subtle Parallax (2-4px movement) */}
      <div
        className="absolute inset-0 will-change-transform transition-transform duration-1000 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 4}px, ${mouseOffset.y * 3}px, 0)`,
        }}
      >
        {/* Soft Organic Warm Sage Light Bubble 1 */}
        <div
          className="absolute -top-[15%] -left-[10%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full bg-[#E2E8E0]/60 blur-[90px] animate-ambient-drift-1"
        />

        {/* Soft Amber / Cream Light Bubble 2 */}
        <div
          className="absolute top-[20%] -right-[15%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-[#9CAF88]/15 blur-[110px] animate-ambient-drift-2"
        />

        {/* Bottom Sage Diffusion */}
        <div
          className="absolute -bottom-[20%] left-[20%] w-[55vw] h-[40vw] max-w-[750px] rounded-full bg-[#E2E8E0]/50 blur-[100px] animate-ambient-drift-3"
        />
      </div>

      {/* Layer 2: Midground Ambient Shapes (4-8px movement) */}
      <div
        className="absolute inset-0 will-change-transform transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 7}px, ${mouseOffset.y * 6}px, 0)`,
        }}
      >
        {/* Floating subtle botanical ring */}
        <svg
          className="absolute top-1/4 left-[8%] w-64 h-64 text-[#9CAF88]/15 animate-slow-rotate"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <circle cx="100" cy="100" r="78" strokeDasharray="6 8" />
          <path d="M100 22 C130 50, 160 80, 178 100 C150 130, 120 160, 100 178 C70 150, 40 120, 22 100 C50 70, 80 40, 100 22 Z" />
        </svg>

        {/* Organic soft contour line */}
        <svg
          className="absolute bottom-12 right-[10%] w-96 h-96 text-[#1E3A2B]/8 animate-gentle-pulse"
          viewBox="0 0 300 300"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M30 150 Q 80 80, 160 120 T 280 150 Q 220 230, 140 200 T 30 150" />
        </svg>
      </div>

      {/* Layer 3: Subtle Light Grain Texture for Depth */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #1E3A2B 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};
