import React from 'react';

interface OrganicSectionDividerProps {
  variant?: 'cream-to-mint' | 'mint-to-cream' | 'paper-curve-top' | 'paper-curve-bottom';
  className?: string;
}

export const OrganicSectionDivider: React.FC<OrganicSectionDividerProps> = ({
  variant = 'paper-curve-bottom',
  className = '',
}) => {
  if (variant === 'paper-curve-bottom') {
    return (
      <div
        className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 md:h-16 text-[#FAF8F1] preserve-3d"
        >
          <path
            d="M0,0 C360,55 1080,55 1440,0 L1440,74 L0,74 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'cream-to-mint') {
    return (
      <div
        className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 md:h-16 text-[#E2E8E0]/40 preserve-3d"
        >
          <path
            d="M0,45 C280,10 720,70 1440,25 L1440,68 L0,68 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-8 sm:h-12 md:h-14 text-[#FAF8F1] preserve-3d"
      >
        <path
          d="M0,60 C420,15 1020,15 1440,60 L1440,0 L0,0 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};
