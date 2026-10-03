import React, { useEffect, useRef, useMemo } from 'react';
import { Realistic3DLeaf, LeafType } from './Realistic3DLeaf';

export interface LeafInstance {
  id: number;
  type: LeafType;
  depthLayer: 'background' | 'midground' | 'foreground';
  baseX: number; // percentage 0-100
  baseY: number; // percentage 0-100
  size: number; // px
  baseRotation: number; // deg
  rotationSpeed: number; // deg/s
  driftRadiusX: number; // px amplitude
  driftRadiusY: number; // px amplitude
  frequencyX: number; // rad/s
  frequencyY: number; // rad/s
  frequencyTilt: number; // rad/s
  phase: number;
  parallaxFactor: number;
  maxTiltX: number;
  maxTiltY: number;
  lightIntensity: number;
  blur: number;
}

interface Botanical3DLeavesProps {
  isExiting?: boolean;
  mouseParallax?: { x: number; y: number }; // normalized -1 to +1
  className?: string;
  countScale?: number; // 1.0 for entrance, 0.5 for subtle in-page
}

export const Botanical3DLeaves: React.FC<Botanical3DLeavesProps> = ({
  isExiting = false,
  mouseParallax = { x: 0, y: 0 },
  className = '',
  countScale = 1.0,
}) => {
  const isMobileRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Check mobile on mount
  useEffect(() => {
    isMobileRef.current =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Pre-configured leaf placement designed specifically to FRAME the viewport
  // and guarantee zero occlusion of central titles, logos, and buttons!
  const leafConfigs = useMemo<LeafInstance[]>(() => {
    const raw: LeafInstance[] = [
      // ----------------------------------------------------
      // BACKGROUND LAYER (Deep, soft blurred, gentle drift)
      // ----------------------------------------------------
      {
        id: 1,
        type: 'olive',
        depthLayer: 'background',
        baseX: 14,
        baseY: 18,
        size: 42,
        baseRotation: -28,
        rotationSpeed: 1.2,
        driftRadiusX: 18,
        driftRadiusY: 14,
        frequencyX: 0.6,
        frequencyY: 0.7,
        frequencyTilt: 0.5,
        phase: 0.2,
        parallaxFactor: 0.02,
        maxTiltX: 12,
        maxTiltY: 15,
        lightIntensity: 0.7,
        blur: 4.5,
      },
      {
        id: 2,
        type: 'laurel',
        depthLayer: 'background',
        baseX: 84,
        baseY: 22,
        size: 46,
        baseRotation: 35,
        rotationSpeed: -1.0,
        driftRadiusX: 20,
        driftRadiusY: 16,
        frequencyX: 0.55,
        frequencyY: 0.65,
        frequencyTilt: 0.45,
        phase: 1.4,
        parallaxFactor: 0.025,
        maxTiltX: 10,
        maxTiltY: 14,
        lightIntensity: 0.65,
        blur: 4.0,
      },
      {
        id: 3,
        type: 'ficus',
        depthLayer: 'background',
        baseX: 20,
        baseY: 76,
        size: 48,
        baseRotation: 42,
        rotationSpeed: 0.8,
        driftRadiusX: 22,
        driftRadiusY: 18,
        frequencyX: 0.7,
        frequencyY: 0.6,
        frequencyTilt: 0.5,
        phase: 2.5,
        parallaxFactor: 0.025,
        maxTiltX: 14,
        maxTiltY: 12,
        lightIntensity: 0.7,
        blur: 4.0,
      },
      {
        id: 4,
        type: 'olive',
        depthLayer: 'background',
        baseX: 80,
        baseY: 78,
        size: 40,
        baseRotation: -40,
        rotationSpeed: -0.9,
        driftRadiusX: 16,
        driftRadiusY: 20,
        frequencyX: 0.65,
        frequencyY: 0.75,
        frequencyTilt: 0.55,
        phase: 3.1,
        parallaxFactor: 0.02,
        maxTiltX: 12,
        maxTiltY: 16,
        lightIntensity: 0.65,
        blur: 4.5,
      },

      // ----------------------------------------------------
      // MIDGROUND LAYER (Soft blur, realistic botanical color)
      // ----------------------------------------------------
      {
        id: 5,
        type: 'ficus',
        depthLayer: 'midground',
        baseX: 10,
        baseY: 42,
        size: 68,
        baseRotation: -14,
        rotationSpeed: 1.4,
        driftRadiusX: 24,
        driftRadiusY: 22,
        frequencyX: 0.8,
        frequencyY: 0.7,
        frequencyTilt: 0.7,
        phase: 0.8,
        parallaxFactor: 0.05,
        maxTiltX: 20,
        maxTiltY: 22,
        lightIntensity: 0.85,
        blur: 1.2,
      },
      {
        id: 6,
        type: 'laurel',
        depthLayer: 'midground',
        baseX: 88,
        baseY: 48,
        size: 72,
        baseRotation: 22,
        rotationSpeed: -1.3,
        driftRadiusX: 26,
        driftRadiusY: 20,
        frequencyX: 0.75,
        frequencyY: 0.85,
        frequencyTilt: 0.6,
        phase: 1.9,
        parallaxFactor: 0.055,
        maxTiltX: 18,
        maxTiltY: 24,
        lightIntensity: 0.9,
        blur: 1.0,
      },
      {
        id: 7,
        type: 'olive',
        depthLayer: 'midground',
        baseX: 30,
        baseY: 12,
        size: 62,
        baseRotation: 55,
        rotationSpeed: 1.1,
        driftRadiusX: 20,
        driftRadiusY: 24,
        frequencyX: 0.7,
        frequencyY: 0.8,
        frequencyTilt: 0.65,
        phase: 2.2,
        parallaxFactor: 0.045,
        maxTiltX: 22,
        maxTiltY: 18,
        lightIntensity: 0.88,
        blur: 1.4,
      },
      {
        id: 8,
        type: 'ficus',
        depthLayer: 'midground',
        baseX: 72,
        baseY: 14,
        size: 64,
        baseRotation: -50,
        rotationSpeed: -1.2,
        driftRadiusX: 22,
        driftRadiusY: 22,
        frequencyX: 0.85,
        frequencyY: 0.65,
        frequencyTilt: 0.7,
        phase: 3.7,
        parallaxFactor: 0.048,
        maxTiltX: 19,
        maxTiltY: 20,
        lightIntensity: 0.86,
        blur: 1.2,
      },

      // ----------------------------------------------------
      // FOREGROUND LAYER (Sharp, specular sheen, realistic 3D tilt)
      // Placed intentionally in corner zones to frame reading area
      // ----------------------------------------------------
      {
        id: 9,
        type: 'laurel',
        depthLayer: 'foreground',
        baseX: 6,
        baseY: 82,
        size: 96,
        baseRotation: 28,
        rotationSpeed: 1.5,
        driftRadiusX: 30,
        driftRadiusY: 28,
        frequencyX: 0.9,
        frequencyY: 0.8,
        frequencyTilt: 0.8,
        phase: 0.5,
        parallaxFactor: 0.1,
        maxTiltX: 26,
        maxTiltY: 30,
        lightIntensity: 1.0,
        blur: 0,
      },
      {
        id: 10,
        type: 'ficus',
        depthLayer: 'foreground',
        baseX: 92,
        baseY: 76,
        size: 104,
        baseRotation: -32,
        rotationSpeed: -1.4,
        driftRadiusX: 28,
        driftRadiusY: 32,
        frequencyX: 0.8,
        frequencyY: 0.95,
        frequencyTilt: 0.85,
        phase: 1.8,
        parallaxFactor: 0.11,
        maxTiltX: 28,
        maxTiltY: 32,
        lightIntensity: 1.0,
        blur: 0,
      },
      {
        id: 11,
        type: 'olive',
        depthLayer: 'foreground',
        baseX: 5,
        baseY: 10,
        size: 88,
        baseRotation: -62,
        rotationSpeed: 1.2,
        driftRadiusX: 25,
        driftRadiusY: 25,
        frequencyX: 0.85,
        frequencyY: 0.75,
        frequencyTilt: 0.75,
        phase: 2.7,
        parallaxFactor: 0.09,
        maxTiltX: 24,
        maxTiltY: 28,
        lightIntensity: 0.98,
        blur: 0,
      },
      {
        id: 12,
        type: 'laurel',
        depthLayer: 'foreground',
        baseX: 94,
        baseY: 8,
        size: 92,
        baseRotation: 60,
        rotationSpeed: -1.1,
        driftRadiusX: 26,
        driftRadiusY: 24,
        frequencyX: 0.9,
        frequencyY: 0.85,
        frequencyTilt: 0.8,
        phase: 3.4,
        parallaxFactor: 0.095,
        maxTiltX: 25,
        maxTiltY: 28,
        lightIntensity: 1.0,
        blur: 0,
      },
    ];

    // Filter count on mobile or when countScale < 1
    if (countScale < 0.7) {
      return [raw[0], raw[4], raw[8], raw[9]];
    }
    return raw;
  }, [countScale]);

  // Direct DOM transforms for 60/120fps physical smoothness
  const leafRefs = useRef<{ [id: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    let startTime = performance.now();
    let isRunning = true;

    const render = (time: number) => {
      if (!isRunning) return;
      const elapsed = (time - startTime) / 1000; // in seconds

      leafConfigs.forEach((leaf) => {
        const el = leafRefs.current[leaf.id];
        if (!el) return;

        // Entrance animation calculations
        const enterDelay =
          leaf.depthLayer === 'background'
            ? 0.1 + (leaf.id % 4) * 0.08
            : leaf.depthLayer === 'midground'
            ? 0.35 + (leaf.id % 4) * 0.1
            : 0.7 + (leaf.id % 4) * 0.12;

        const enterDuration = 1.4;
        const enterProgress = Math.min(1, Math.max(0, (elapsed - enterDelay) / enterDuration));
        const ease = 1 - Math.pow(1 - enterProgress, 3);
        const enterOpacity = ease;
        const enterOffsetY = (1 - ease) * 24;
        const enterScale = 0.8 + 0.2 * ease;

        // Layer-dependent natural breeze speed (background slowest, foreground responsive)
        const speedMultiplier =
          leaf.depthLayer === 'background' ? 0.36 : leaf.depthLayer === 'midground' ? 0.5 : 0.68;
        const t = elapsed * speedMultiplier + leaf.phase;

        // Natural drifting with calm harmonic motion (no bounce)
        const driftX = Math.sin(t * leaf.frequencyX) * leaf.driftRadiusX + Math.cos(t * 0.35) * 5;
        const driftY =
          Math.cos(t * leaf.frequencyY) * leaf.driftRadiusY + Math.sin(t * 0.28) * 4 + enterOffsetY;

        // Tiny rotation & occasional gentle sway (resembling a gentle natural breeze)
        const gentleSway = Math.sin(t * 0.38) * 4.5 + Math.cos(t * 0.16) * 2.5;
        const currentRot = leaf.baseRotation + gentleSway;

        // Dynamic 3D tilt responding to calm botanical air currents
        const tiltX = Math.sin(t * leaf.frequencyTilt * 0.7) * (leaf.maxTiltX * 0.75);
        const tiltY = Math.cos(t * leaf.frequencyTilt * 0.6) * (leaf.maxTiltY * 0.75);

        // 3D Mouse Parallax offset (foreground moves more than midground, midground more than background)
        const pX = mouseParallax.x * leaf.parallaxFactor * 110;
        const pY = mouseParallax.y * leaf.parallaxFactor * 90;

        // Exit wind gust transformation
        let exitTransform = '';
        let exitOpacity = enterOpacity;

        if (isExiting) {
          const exitSpeed = leaf.depthLayer === 'foreground' ? 1.5 : leaf.depthLayer === 'midground' ? 1.1 : 0.85;
          const gustDirX = leaf.baseX > 50 ? 110 * exitSpeed : -110 * exitSpeed;
          const gustDirY = -120 * exitSpeed;
          const exitScale = leaf.depthLayer === 'foreground' ? 1.3 : 0.85;
          exitTransform = ` translate3d(${gustDirX}px, ${gustDirY}px, 50px) scale(${exitScale}) rotate(${currentRot + 25}deg)`;
          exitOpacity = 0;
        }

        const totalX = driftX + pX;
        const totalY = driftY + pY;

        if (isExiting) {
          el.style.transform = `translate3d(${totalX}px, ${totalY}px, 0px)${exitTransform} rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
          el.style.opacity = `${exitOpacity}`;
          el.style.transition = 'transform 0.82s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s ease-out';
        } else {
          el.style.transform = `translate3d(${totalX}px, ${totalY}px, 0px) scale(${enterScale}) rotate(${currentRot}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
          el.style.opacity = `${enterOpacity}`;
          el.style.transition = 'none';
        }
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [leafConfigs, mouseParallax, isExiting]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
      aria-hidden="true"
    >
      {leafConfigs.map((leaf) => {
        const isBlurry = leaf.blur > 2.0;

        return (
          <div
            key={leaf.id}
            ref={(node) => {
              leafRefs.current[leaf.id] = node;
            }}
            className="absolute will-change-transform"
            style={{
              left: `${leaf.baseX}%`,
              top: `${leaf.baseY}%`,
              marginLeft: `-${leaf.size / 2}px`,
              marginTop: `-${(leaf.size * 1.55) / 2}px`,
              zIndex:
                leaf.depthLayer === 'foreground' ? 25 : leaf.depthLayer === 'midground' ? 12 : 5,
              opacity: 0,
            }}
          >
            <Realistic3DLeaf
              type={leaf.type}
              size={leaf.size}
              isBlurry={isBlurry}
              lightIntensity={leaf.lightIntensity}
            />
          </div>
        );
      })}
    </div>
  );
};
