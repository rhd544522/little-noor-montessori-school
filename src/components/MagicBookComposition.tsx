import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, BookOpen, Moon, Compass } from 'lucide-react';

export const MagicBookComposition: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative w-full max-w-lg lg:max-w-xl mx-auto flex items-center justify-center select-none py-6 sm:py-8">
      
      {/* 1. Gentle Golden Light Beam behind the book */}
      <motion.div
        animate={
          prefersReduced
            ? { opacity: 0.35, scale: 1 }
            : {
                opacity: [0.25, 0.45, 0.25],
                scale: [0.98, 1.05, 0.98],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 -m-8 sm:-m-14 rounded-full bg-[radial-gradient(circle,rgba(199,167,90,0.38)_0%,rgba(100,125,155,0.18)_45%,transparent_70%)] blur-2xl pointer-events-none -z-10"
      />

      {/* 2. Soft Glowing Crescent Accent (Motif: Crescent -> Guidance) */}
      <motion.div
        animate={
          prefersReduced
            ? { opacity: 0.7 }
            : {
                opacity: [0.55, 0.9, 0.55],
                scale: [1, 1.04, 1],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-6 sm:-top-8 right-6 sm:right-12 z-20"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#C7A75A]/40 shadow-luxury-sm">
          <Moon className="w-3.5 h-3.5 text-[#C7A75A] fill-[#C7A75A]/20" />
          <span className="text-[11px] font-serif-luxury font-bold tracking-wide text-[#263B52]">
            CRESCENT → GUIDANCE
          </span>
        </div>
      </motion.div>

      {/* 3. Floating Star Accent (Motif: Stars -> Dreams) */}
      <motion.div
        animate={
          prefersReduced
            ? { opacity: 0.75 }
            : {
                opacity: [0.6, 1, 0.6],
                y: [0, -4, 0],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-3 sm:-top-4 -left-2 sm:left-4 z-20"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#C7A75A]/40 shadow-luxury-sm">
          <span className="text-xs text-[#C7A75A]">✦</span>
          <span className="text-[11px] font-serif-luxury font-bold tracking-wide text-[#263B52]">
            STARS → DREAMS
          </span>
        </div>
      </motion.div>

      {/* 4. Floating Leaf Accent (Motif: Leaves -> Growth) */}
      <motion.div
        animate={
          prefersReduced
            ? { opacity: 0.75 }
            : {
                opacity: [0.65, 0.95, 0.65],
                y: [0, 4, 0],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 1,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-4 sm:-bottom-5 left-4 sm:left-8 z-20"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#87966C]/50 shadow-luxury-sm">
          <span className="text-xs text-[#87966C]">🌿</span>
          <span className="text-[11px] font-serif-luxury font-bold tracking-wide text-[#263B52]">
            LEAVES → GROWTH
          </span>
        </div>
      </motion.div>

      {/* 5. Pages Knowledge Accent (Motif: Pages -> Knowledge) */}
      <motion.div
        animate={
          prefersReduced
            ? { opacity: 0.75 }
            : {
                opacity: [0.65, 0.95, 0.65],
                y: [0, -3, 0],
              }
        }
        transition={{
          duration: 6.5,
          repeat: Infinity,
          delay: 1.5,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-4 sm:-bottom-5 right-4 sm:right-8 z-20"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#647D9B]/50 shadow-luxury-sm">
          <BookOpen className="w-3.5 h-3.5 text-[#647D9B]" />
          <span className="text-[11px] font-serif-luxury font-bold tracking-wide text-[#263B52]">
            PAGES → KNOWLEDGE
          </span>
        </div>
      </motion.div>

      {/* 6. The Artistic Open Book Structure */}
      <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] bg-[#FFFBF4] rounded-[28px] p-4 sm:p-6 border-2 border-[#C7A75A]/45 shadow-book-glow overflow-hidden flex items-center justify-center">
        
        {/* Book cover spine depth & parchment gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF8] via-[#FAF4EA] to-[#F1E7D5] opacity-95" />
        
        {/* Central Book Spine Divider & subtle golden book ribbon */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-stone-300/25 via-[#C7A75A]/20 to-stone-300/25 pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#C7A75A]/40" />
        
        {/* Gilded Edge accents */}
        <div className="absolute top-2 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#C7A75A]/50 to-transparent" />
        <div className="absolute bottom-2 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#C7A75A]/50 to-transparent" />

        {/* Left Page: Storybook Prose & Calligraphy Lines */}
        <div className="relative z-10 w-1/2 pr-3 sm:pr-6 pl-1 sm:pl-3 flex flex-col justify-between h-full py-2">
          <div className="space-y-1 sm:space-y-2">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-serif-luxury uppercase tracking-widest text-[#C7A75A]">
              <span>Chapter I</span>
              <span>•</span>
              <span>The Journey</span>
            </div>
            <h4 className="font-serif-luxury text-base sm:text-xl font-bold text-[#263B52] leading-tight">
              “Every little mind has a world waiting to be discovered.”
            </h4>
            <p className="text-[11px] sm:text-xs text-[#5E5045] font-light leading-relaxed hidden sm:block">
              In our prepared sanctuary, hands unlock thought, curiosity becomes lifelong discipline, and joyful light guides every step.
            </p>
          </div>

          {/* Left page botanical corner filigree */}
          <div className="flex items-center gap-2 text-[10px] text-[#87966C] font-serif-luxury">
            <span>🌿 Montessori Foundation</span>
          </div>
        </div>

        {/* Right Page: The Official Little Noor Emblem Showcase */}
        <div className="relative z-10 w-1/2 pl-3 sm:pl-6 pr-1 sm:pr-3 flex flex-col items-center justify-center text-center">
          {/* Circular halo glow */}
          <div className="relative">
            <div className="absolute inset-0 -m-4 rounded-full bg-[radial-gradient(circle,rgba(199,167,90,0.4)_0%,transparent_70%)] blur-md" />
            
            {/* The Official Brand Logo */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-white p-2 border-2 border-[#C7A75A]/60 shadow-luxury-md flex items-center justify-center overflow-hidden">
              <img
                src="/little-noor-logo.svg"
                alt="Official Little Noor Montessori School Emblem"
                className="w-full h-full object-contain select-none"
                loading="eager"
              />
            </div>
          </div>

          <div className="mt-2 text-center">
            <span className="font-serif-luxury text-xs sm:text-sm font-bold text-[#263B52] block">
              Little Noor Montessori School
            </span>
            <span className="text-[10px] text-[#647D9B] font-medium block">
              Bhuj, Kutch
            </span>
          </div>
        </div>

        {/* Subtle page corner curled shadows */}
        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#C7A75A]/10 rounded-full blur-lg" />
        <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-[#C7A75A]/10 rounded-full blur-lg" />
      </div>

    </div>
  );
};
