import React, { useState, useRef, useEffect } from 'react';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // default 4 degrees
  glare?: boolean;
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  className = '',
  maxTilt = 4,
  glare = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) * 2 - 1; // -1 to 1
    const normalizedY = (y / rect.height) * 2 - 1; // -1 to 1

    const rotX = -normalizedY * maxTilt;
    const rotY = normalizedX * maxTilt;

    setTransform(`perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transform-gpu transition-all duration-300 ${className}`}
      style={{
        transform: isTouchDevice ? undefined : transform,
        transformStyle: 'preserve-3d',
        transition: isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.2s ease-out'
          : 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease-out',
      }}
    >
      {/* Dynamic Specular Sheen / Light Reflection */}
      {glare && !isTouchDevice && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-30 transition-opacity duration-300 overflow-hidden"
          style={{
            opacity: glarePosition.opacity,
            background: `radial-gradient(circle 320px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.85) 0%, rgba(156, 175, 136, 0.25) 45%, transparent 70%)`,
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10 w-full h-full" style={{ transform: isTouchDevice ? undefined : 'translateZ(12px)' }}>
        {children}
      </div>
    </div>
  );
};
