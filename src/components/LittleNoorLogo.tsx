import React from 'react';

interface LittleNoorLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const LittleNoorLogo: React.FC<LittleNoorLogoProps> = ({
  className = 'w-10 h-10',
  size,
  showText = false,
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`} style={style}>
      <img
        src="/little-noor-logo.svg"
        alt="Little Noor Montessori School Logo"
        className="w-full h-full object-contain select-none"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
