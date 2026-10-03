import React from 'react';

export type LeafType = 'ficus' | 'olive' | 'laurel';

interface Realistic3DLeafProps {
  type?: LeafType;
  size?: number; // base pixel width
  className?: string;
  style?: React.CSSProperties;
  rotation?: number; // 2D rotation angle
  tiltX?: number; // 3D tilt X (pitch)
  tiltY?: number; // 3D tilt Y (yaw)
  lightIntensity?: number; // 0 to 1
  isBlurry?: boolean;
}

export const Realistic3DLeaf: React.FC<Realistic3DLeafProps> = ({
  type = 'ficus',
  size = 64,
  className = '',
  style = {},
  rotation = 0,
  tiltX = 0,
  tiltY = 0,
  lightIntensity = 0.85,
  isBlurry = false,
}) => {
  // Unique gradient ID prefix for this instance
  const id = React.useId().replace(/:/g, '');

  return (
    <div
      className={`inline-block select-none pointer-events-none will-change-transform ${className}`}
      style={{
        width: `${size}px`,
        height: `${size * 1.55}px`,
        transformStyle: 'preserve-3d',
        transform: `rotate(${rotation}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        filter: isBlurry
          ? 'blur(4px) drop-shadow(0 6px 12px rgba(10,24,16,0.25))'
          : 'drop-shadow(0 14px 22px rgba(10,24,16,0.32)) drop-shadow(0 3px 6px rgba(10,24,16,0.2))',
        ...style,
      }}
      aria-hidden="true"
    >
      {type === 'ficus' && (
        <svg
          viewBox="0 0 100 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Left lit blade gradient */}
            <linearGradient id={`grad-left-${id}`} x1="15%" y1="10%" x2="50%" y2="90%">
              <stop offset="0%" stopColor="#8EAD77" stopOpacity={lightIntensity} />
              <stop offset="35%" stopColor="#5E8350" />
              <stop offset="75%" stopColor="#2D5438" />
              <stop offset="100%" stopColor="#1B3A24" />
            </linearGradient>

            {/* Right shaded blade gradient */}
            <linearGradient id={`grad-right-${id}`} x1="85%" y1="15%" x2="50%" y2="85%">
              <stop offset="0%" stopColor="#6C8F5B" />
              <stop offset="40%" stopColor="#385F40" />
              <stop offset="80%" stopColor="#1C3C26" />
              <stop offset="100%" stopColor="#102618" />
            </linearGradient>

            {/* Stem & Central rachis gradient */}
            <linearGradient id={`stem-${id}`} x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#D4C18E" />
              <stop offset="40%" stopColor="#A3B884" />
              <stop offset="80%" stopColor="#4A7045" />
              <stop offset="100%" stopColor="#25432B" />
            </linearGradient>

            {/* Specular sheen curve */}
            <linearGradient id={`sheen-${id}`} x1="30%" y1="20%" x2="60%" y2="70%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.15" />
              <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Left half blade with natural 3D curve */}
          <path
            d="M50 8 C40 25 18 55 18 90 C18 120 34 140 50 148 C50 100 50 40 50 8 Z"
            fill={`url(#grad-left-${id})`}
          />

          {/* Right half blade with depth shade */}
          <path
            d="M50 8 C60 25 82 55 82 90 C82 120 66 140 50 148 C50 100 50 40 50 8 Z"
            fill={`url(#grad-right-${id})`}
          />

          {/* Specular curvature highlight on left blade */}
          <path
            d="M48 16 C38 34 26 62 26 90 C26 108 34 125 45 135 C38 115 36 85 42 55 C45 40 47 25 48 16 Z"
            fill={`url(#sheen-${id})`}
          />

          {/* Lateral veins (left) */}
          <g stroke="#9CAF88" strokeWidth="0.8" strokeOpacity="0.38" strokeLinecap="round">
            <path d="M50 35 Q38 45 28 50" />
            <path d="M50 55 Q36 68 23 75" />
            <path d="M50 78 Q34 90 22 100" />
            <path d="M50 100 Q36 112 26 122" />
            <path d="M50 122 Q42 130 35 136" />
          </g>

          {/* Lateral veins (right) */}
          <g stroke="#749B68" strokeWidth="0.8" strokeOpacity="0.32" strokeLinecap="round">
            <path d="M50 35 Q62 45 72 50" />
            <path d="M50 55 Q64 68 77 75" />
            <path d="M50 78 Q66 90 78 100" />
            <path d="M50 100 Q64 112 74 122" />
            <path d="M50 122 Q58 130 65 136" />
          </g>

          {/* Central Stem & Midrib with slight organic bend */}
          <path
            d="M50 6 Q50.5 45 50 90 Q49.5 125 50 156"
            stroke={`url(#stem-${id})`}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}

      {type === 'olive' && (
        <svg
          viewBox="0 0 100 170"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id={`olive-left-${id}`} x1="20%" y1="10%" x2="50%" y2="90%">
              <stop offset="0%" stopColor="#A8C488" stopOpacity={lightIntensity} />
              <stop offset="40%" stopColor="#7B9D5F" />
              <stop offset="80%" stopColor="#3F683D" />
              <stop offset="100%" stopColor="#1E3E26" />
            </linearGradient>

            <linearGradient id={`olive-right-${id}`} x1="80%" y1="20%" x2="50%" y2="85%">
              <stop offset="0%" stopColor="#87A868" />
              <stop offset="50%" stopColor="#4A7544" />
              <stop offset="100%" stopColor="#16331D" />
            </linearGradient>

            <linearGradient id={`olive-sheen-${id}`} x1="30%" y1="10%" x2="50%" y2="80%">
              <stop offset="0%" stopColor="#FFFEEA" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#FFFEEA" stopOpacity="0.1" />
              <stop offset="80%" stopColor="#FFFEEA" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Graceful slender olive blade (Left) */}
          <path
            d="M50 5 C38 35 24 75 25 110 C26 135 38 152 50 158 C50 110 50 50 50 5 Z"
            fill={`url(#olive-left-${id})`}
          />

          {/* Graceful slender olive blade (Right) */}
          <path
            d="M50 5 C62 35 76 75 75 110 C74 135 62 152 50 158 C50 110 50 50 50 5 Z"
            fill={`url(#olive-right-${id})`}
          />

          {/* Silvery sheen along leaf margin (characteristic of olive / salvia) */}
          <path
            d="M49 12 C40 38 32 72 33 105 C34 122 41 138 48 148 C41 130 38 100 41 68 C43 45 47 25 49 12 Z"
            fill={`url(#olive-sheen-${id})`}
          />

          {/* Slender lateral veins */}
          <g stroke="#C5DBA8" strokeWidth="0.65" strokeOpacity="0.32" strokeLinecap="round">
            <path d="M50 30 Q40 40 32 45" />
            <path d="M50 50 Q38 62 28 68" />
            <path d="M50 75 Q36 88 27 96" />
            <path d="M50 102 Q37 116 30 126" />
            <path d="M50 128 Q42 138 38 145" />

            <path d="M50 30 Q60 40 68 45" />
            <path d="M50 50 Q62 62 72 68" />
            <path d="M50 75 Q64 88 73 96" />
            <path d="M50 102 Q63 116 70 126" />
            <path d="M50 128 Q58 138 62 145" />
          </g>

          {/* Delicate stem extending slightly beyond blade */}
          <path
            d="M50 5 Q50.3 50 50 100 Q49.7 135 50 166"
            stroke="#C8A96B"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      )}

      {type === 'laurel' && (
        <svg
          viewBox="0 0 110 165"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id={`laurel-left-${id}`} x1="15%" y1="15%" x2="55%" y2="85%">
              <stop offset="0%" stopColor="#BFD69B" stopOpacity={lightIntensity} />
              <stop offset="45%" stopColor="#729759" />
              <stop offset="85%" stopColor="#2E5334" />
              <stop offset="100%" stopColor="#1A3420" />
            </linearGradient>

            <linearGradient id={`laurel-right-${id}`} x1="85%" y1="20%" x2="45%" y2="85%">
              <stop offset="0%" stopColor="#96BA75" />
              <stop offset="50%" stopColor="#446E40" />
              <stop offset="100%" stopColor="#132B19" />
            </linearGradient>

            <linearGradient id={`laurel-edge-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DDECC5" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#9CAF88" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1E3A2B" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Broad, vibrant laurel leaf (Left) */}
          <path
            d="M55 7 C40 28 20 60 20 95 C20 125 38 144 55 152 C55 105 55 45 55 7 Z"
            fill={`url(#laurel-left-${id})`}
          />

          {/* Broad, vibrant laurel leaf (Right) */}
          <path
            d="M55 7 C70 28 90 60 90 95 C90 125 72 144 55 152 C55 105 55 45 55 7 Z"
            fill={`url(#laurel-right-${id})`}
          />

          {/* Highlighted sunlit outer perimeter */}
          <path
            d="M55 8 C42 28 23 60 23 94 C23 118 36 136 50 146"
            stroke={`url(#laurel-edge-${id})`}
            strokeWidth="1.2"
            fill="none"
          />

          {/* Veins */}
          <g stroke="#E0EDCB" strokeWidth="0.75" strokeOpacity="0.4" strokeLinecap="round">
            <path d="M55 36 Q42 46 32 52" />
            <path d="M55 58 Q38 72 26 80" />
            <path d="M55 82 Q36 96 26 107" />
            <path d="M55 106 Q40 120 32 130" />

            <path d="M55 36 Q68 46 78 52" />
            <path d="M55 58 Q72 72 84 80" />
            <path d="M55 82 Q74 96 84 107" />
            <path d="M55 106 Q70 120 78 130" />
          </g>

          {/* Central Stem */}
          <path
            d="M55 5 Q55.4 50 55 95 Q54.6 130 55 162"
            stroke="#D6C495"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
};
