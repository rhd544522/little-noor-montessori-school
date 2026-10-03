import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface PortalImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  enableFake3D?: boolean;
  priority?: boolean;
}

export const PortalImage: React.FC<PortalImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  enableFake3D = true,
}) => {
  const shouldReduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || shouldReduce || !containerRef.current || !enableFake3D) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={
        shouldReduce
          ? { opacity: 0 }
          : {
              opacity: 0,
              scale: 0.96,
              clipPath: 'inset(6% 6% 6% 6% round 28px)',
            }
      }
      whileInView={
        shouldReduce
          ? { opacity: 1 }
          : {
              opacity: 1,
              scale: 1,
              clipPath: 'inset(0% 0% 0% 0% round 28px)',
            }
      }
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative overflow-hidden group select-none rounded-[28px] ${containerClassName}`}
    >
      {/* Background Ambience Layer (Parallax layer 1: 3px) */}
      <div
        className="absolute inset-0 bg-[#E2E8E0] transition-transform duration-500 ease-out will-change-transform"
        style={{
          transform: enableFake3D && !isTouch
            ? `translate3d(${mouseOffset.x * -3}px, ${mouseOffset.y * -3}px, 0)`
            : undefined,
        }}
      />

      {/* Main Photographic Subject (Parallax layer 2: 7px + subtle zoom on hover) */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.03] ${className}`}
        style={{
          transform: enableFake3D && !isTouch
            ? `scale(1.05) translate3d(${mouseOffset.x * 6}px, ${mouseOffset.y * 6}px, 0)`
            : undefined,
        }}
      />

      {/* Foreground Depth Sheen / Light Vignette (Parallax layer 3: 10px) */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          background: 'linear-gradient(180deg, rgba(30, 58, 43, 0.05) 0%, transparent 40%, rgba(30, 58, 43, 0.55) 100%)',
          transform: enableFake3D && !isTouch
            ? `translate3d(${mouseOffset.x * 10}px, ${mouseOffset.y * 10}px, 0)`
            : undefined,
        }}
      />
    </motion.div>
  );
};
