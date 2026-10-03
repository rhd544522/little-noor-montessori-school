import React, { useState, useRef, useEffect } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'custom';
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  dataCursor?: string;
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  id,
  type = 'button',
  disabled = false,
  dataCursor = 'pointer',
  ariaLabel,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [radialPos, setRadialPos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouch || disabled || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.3; // subtle magnetic pull
    const deltaY = (e.clientY - centerY) * 0.3;

    setOffset({ x: deltaX, y: deltaY });

    const innerX = ((e.clientX - rect.left) / rect.width) * 100;
    const innerY = ((e.clientY - rect.top) / rect.height) * 100;

    setRadialPos({ x: innerX, y: innerY, opacity: 0.35 });
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    setOffset({ x: 0, y: 0 });
    setRadialPos((prev) => ({ ...prev, opacity: 0 }));
  };

  let baseStyle = '';
  if (variant === 'primary') {
    baseStyle =
      'bg-[#1E3A2B] text-white hover:bg-[#254936] shadow-botanical-md hover:shadow-botanical-lg border border-[#1E3A2B]';
  } else if (variant === 'secondary') {
    baseStyle =
      'bg-white text-[#1E3A2B] hover:bg-[#FAF8F1] border-2 border-[#9CAF88] shadow-botanical-xs hover:shadow-botanical-sm';
  } else if (variant === 'outline') {
    baseStyle =
      'bg-transparent text-[#1E3A2B] hover:bg-[#E2E8E0] border border-[#9CAF88]/50 shadow-xs';
  }

  return (
    <button
      ref={buttonRef}
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={dataCursor}
      aria-label={ariaLabel}
      className={`relative overflow-hidden font-bold rounded-full transition-transform duration-200 ease-out will-change-transform active:scale-[0.98] cursor-pointer inline-flex items-center justify-center gap-2 select-none ${baseStyle} ${className}`}
      style={{
        transform: isTouch ? undefined : `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition:
          offset.x === 0 && offset.y === 0
            ? 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s ease'
            : 'transform 0.08s ease-out, box-shadow 0.2s ease',
      }}
    >
      {/* Animated Inner Radial Highlight following cursor */}
      {!isTouch && (
        <span
          className="absolute inset-0 pointer-events-none rounded-full transition-opacity duration-300"
          style={{
            opacity: radialPos.opacity,
            background: `radial-gradient(circle 80px at ${radialPos.x}% ${radialPos.y}%, rgba(255, 255, 255, 0.4), transparent 80%)`,
          }}
        />
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
        {children}
      </span>
    </button>
  );
};
