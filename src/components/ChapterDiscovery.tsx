import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, BookOpen, Clock, Heart } from 'lucide-react';

interface ChapterDiscoveryProps {
  onSelectProgram: (programName: string) => void;
}

interface LearningPath {
  id: string;
  name: string;
  age: string;
  badge: string;
  headline: string;
  themeColor: string;
  accentBg: string;
  borderColor: string;
  tagline: string;
  description: string;
  features: string[];
  timing: string;
  image: string;
  illustrationKey: 'play' | 'nursery' | 'srkg';
}

export const ChapterDiscovery: React.FC<ChapterDiscoveryProps> = ({ onSelectProgram }) => {
  const [activePathId, setActivePathId] = useState<string>('nursery');
  const prefersReduced = useReducedMotion();

  const paths: LearningPath[] = [
    {
      id: 'playgroup',
      name: 'Playhouse (Play Group)',
      age: '02–03',
      badge: 'First Steps of Exploration',
      headline: 'Learning through play',
      themeColor: '#87966C', // Sage
      accentBg: '#F4F6EE',
      borderColor: '#87966C',
      tagline: 'Sensory awareness, gentle gradual settling, and tactile wonder',
      description:
        'A warm sanctuary specifically designed for toddlers embarking on their first preschool journey away from home. Children engage with natural wooden toys, sensorial textures, language cards, and water-pouring exercises that gently build motor confidence.',
      features: [
        'Sensorial tactile cylinders and texture baskets',
        'Gentle 9:00 AM – 11:00 AM settling schedule',
        'Practical life: pouring, spooning, buttoning',
        '1:8 individualized guide care and emotional warmth',
      ],
      timing: '9:00 AM – 11:00 AM (Mon–Sat)',
      image: 'https://images.unsplash.com/photo-1596464716127-f2a829822391?q=80&w=1000&auto=format&fit=crop',
      illustrationKey: 'play',
    },
    {
      id: 'nursery',
      name: 'Nursery',
      age: '03–04',
      badge: 'Awakening of Language & Order',
      headline: 'Language + early numeracy',
      themeColor: '#C7A75A', // Gold
      accentBg: '#FFF9ED',
      borderColor: '#C7A75A',
      tagline: 'Phonetic sandpaper letters, golden beads, and creative social harmony',
      description:
        'As the child enters their prime sensitive period for language and mathematical order, our Nursery environment introduces Dr. Maria Montessori’s celebrated sandpaper letters, sensorial pink towers, and number rods.',
      features: [
        'Sandpaper letters and multi-sensory phonetic games',
        'Montessori number rods and decimal counting beads',
        'Botanical leaf identification and nature classification',
        'Focused morning Montessori work cycle (9:00 – 11:30 AM)',
      ],
      timing: '9:00 AM – 11:30 AM (Mon–Sat)',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop',
      illustrationKey: 'nursery',
    },
    {
      id: 'srkg',
      name: 'Sr. Kg',
      age: '04–05',
      badge: 'Confident Independence',
      headline: 'Literacy + school readiness',
      themeColor: '#263B52', // Midnight Blue
      accentBg: '#EFF4FA',
      borderColor: '#647D9B',
      tagline: 'Fluent phonetic reading, decimal operations, and leadership',
      description:
        'The culminating chapter of the early childhood cycle. Senior kindergarteners emerge as collaborative leaders, mentoring younger peers while mastering fluent phonetic reading, creative sentence writing, and concrete math calculations.',
      features: [
        'Moveable alphabet and expressive creative writing',
        'Golden bead decimal bank game (units to thousands)',
        'Geography puzzle maps and cultural storytelling',
        'Seamless confidence for CBSE, ICSE, and IB schools',
      ],
      timing: '9:00 AM – 11:30 AM (Mon–Sat)',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop',
      illustrationKey: 'srkg',
    },
  ];

  const currentPath = paths.find((p) => p.id === activePathId) || paths[1];

  return (
    <section id="programs" className="py-20 lg:py-28 bg-[#F8F4EA] relative overflow-hidden border-t border-[#C7A75A]/20">
      
      {/* Background radial glow matching current active path color */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl pointer-events-none -z-10 transition-all duration-700 opacity-25"
        style={{ backgroundColor: currentPath.themeColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Chapter Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#C7A75A]/40 shadow-luxury-xs text-xs font-semibold text-[#263B52] mb-3">
            <span className="text-[#C7A75A]">✦</span>
            <span className="font-serif-luxury tracking-widest uppercase">PAGE 02 · CHAPTER 02</span>
            <span className="text-[#C7A75A]">✦</span>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#647D9B] font-medium font-sans-luxury">
            DISCOVERY
          </span>
          <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263B52] tracking-tight max-w-2xl">
            Learning Is an Adventure.
          </h2>
          <p className="mt-3 text-base text-[#5E5045] font-light max-w-xl font-sans-luxury">
            Three interconnected learning paths where curiosity transforms into foundational mastery.
          </p>
        </div>

        {/* The Three Large Interactive Learning Paths with Animated Connecting Lines */}
        <div className="relative mb-12">
          
          {/* Animated connecting line behind the three paths on desktop */}
          <div className="hidden md:block absolute top-1/2 left-16 right-16 h-1 bg-gradient-to-r from-[#87966C]/40 via-[#C7A75A]/50 to-[#647D9B]/40 -translate-y-1/2 z-0 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {paths.map((path, idx) => {
              const isActive = activePathId === path.id;

              return (
                <button
                  key={path.id}
                  id={`path-btn-${path.id}`}
                  type="button"
                  onClick={() => setActivePathId(path.id)}
                  onMouseEnter={() => setActivePathId(path.id)}
                  className={`text-left rounded-[24px] p-6 transition-all duration-300 relative border-2 focus:outline-none ${
                    isActive
                      ? 'bg-white shadow-luxury-lg scale-[1.02] border-[#C7A75A]'
                      : 'bg-white/80 hover:bg-white border-[#C7A75A]/25 shadow-luxury-xs hover:border-[#C7A75A]/60'
                  }`}
                >
                  {/* Top: Program Number & Age */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-serif-luxury text-sm font-bold text-[#C7A75A]">
                      0{idx + 1} · PATH
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold font-serif-luxury bg-[#F8F4EA] text-[#263B52] border border-[#C7A75A]/30">
                      Age {path.age}
                    </span>
                  </div>

                  {/* Title & Core Philosophy */}
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#263B52] leading-tight">
                    {path.name}
                  </h3>
                  
                  <div className="mt-1 text-xs font-semibold text-[#87966C]">
                    {path.headline}
                  </div>

                  <p className="mt-2.5 text-xs text-[#5E5045] font-light leading-relaxed line-clamp-2">
                    {path.tagline}
                  </p>

                  {/* Indicator Arrow */}
                  <div className="mt-4 pt-3 border-t border-[#C7A75A]/20 flex items-center justify-between text-xs font-semibold">
                    <span className={isActive ? 'text-[#C7A75A]' : 'text-stone-400'}>
                      {isActive ? 'Currently Exploring' : 'Explore Path'}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? 'text-[#C7A75A] translate-x-1' : 'text-stone-300'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Path Showcase: Interactive Story Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
            className="bg-white rounded-[28px] p-6 sm:p-10 border-2 border-[#C7A75A]/40 shadow-luxury-md"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Visual Story Image with custom illuminated badge */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-[20px] overflow-hidden aspect-[16/11] border border-[#C7A75A]/30 shadow-luxury-sm">
                  <img
                    src={currentPath.image}
                    alt={`${currentPath.name} learning environment at Little Noor Montessori School, Bhuj`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#263B52]/65 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#C7A75A]/40 text-xs font-bold font-serif-luxury text-[#263B52]">
                    Age Group {currentPath.age}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-sans-luxury uppercase tracking-wider text-[#C7A75A] font-semibold">
                      {currentPath.badge}
                    </span>
                    <p className="font-serif-luxury text-lg font-medium text-white leading-snug mt-0.5">
                      {currentPath.headline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Path Details & Action */}
              <div className="lg:col-span-6 space-y-5 text-left">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C7A75A]">
                    <span>Montessori Journey</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-[#647D9B]" />
                    <span className="text-[#647D9B]">{currentPath.timing}</span>
                  </div>
                  
                  <h3 className="font-serif-luxury text-3xl font-bold text-[#263B52] mt-1">
                    {currentPath.name} Environment
                  </h3>
                  
                  <p className="mt-2 text-sm sm:text-base text-[#5E5045] font-light leading-relaxed">
                    {currentPath.description}
                  </p>
                </div>

                {/* Key Developmental Highlights */}
                <div className="space-y-2 pt-1">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#263B52]">
                    Curriculum Pillars & Materials:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentPath.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2 text-xs text-[#263B52] bg-[#F8F4EA]/80 p-2.5 rounded-xl border border-[#C7A75A]/20"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#87966C] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct CTA */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectProgram(currentPath.name)}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C7A75A] to-[#A88438] text-white font-semibold text-sm shadow-luxury-sm hover:shadow-luxury-md transition-all flex items-center gap-2"
                  >
                    <span>Enquire for {currentPath.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <span className="text-xs text-[#647D9B]">
                    ✦ Limited 1:8 Guide-to-Child seats in Bhuj
                  </span>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
