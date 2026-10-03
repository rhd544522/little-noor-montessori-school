import React, { useEffect, useRef, useState } from 'react';

interface ScrollCameraProps {
  children: React.ReactNode;
}

export const ScrollCamera: React.FC<ScrollCameraProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const velocity = useRef(0);
  const smoothedVelocity = useRef(0);
  const animFrameId = useRef<number | null>(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (prefersReduced || isTouch) {
      setDisabled(true);
      return;
    }

    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      // Clamp velocity to prevent any disorientation
      velocity.current = Math.max(-28, Math.min(28, delta));
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Physics settle loop
    const loop = () => {
      // Lerp velocity toward 0
      velocity.current *= 0.88;
      smoothedVelocity.current += (velocity.current - smoothedVelocity.current) * 0.15;

      if (containerRef.current) {
        // Camera simulation: subtle scale shift (max 0.996) and microscopic tilt (max 0.25deg)
        const tilt = smoothedVelocity.current * 0.012;
        const scale = 1 - Math.min(0.006, Math.abs(smoothedVelocity.current) * 0.0003);

        containerRef.current.style.transform = `scale3d(${scale}, ${scale}, 1) rotate(${tilt}deg)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div
      ref={containerRef}
      className="w-full will-change-transform transition-transform duration-100 ease-out origin-center"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};
