import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronRight, Check, Heart } from 'lucide-react';

interface GrowthStage {
  id: string;
  stageName: string;
  metaphor: string;
  ageRef: string;
  title: string;
  quote: string;
  description: string;
  milestones: string[];
  themeColor: string;
  accentBg: string;
}

export const ChapterGrowth: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(1); // Default to Sprout / Learning

  const stages: GrowthStage[] = [
    {
      id: 'seed',
      stageName: 'Seed',
      metaphor: 'Curiosity',
      ageRef: 'Toddlerhood (Age 2)',
      title: 'The Dormant Spark of Wonder',
      quote: '“The child is endowed with an unknown power, which can guide us to a radiant future.”',
      description:
        'Like a seed nestled in rich soil, every toddler arrives with innate potential and curiosity. Before structured lessons, the child absorbs language, textures, and sensory rhythms from their prepared environment.',
      milestones: [
        'Sensory exploration of natural wood and fabrics',
        'Gentle separation and emotional trust in guides',
        'First purposeful hand-eye coordination exercises',
        'Awakening of concentration through solitary focus',
      ],
      themeColor: '#5E5045',
      accentBg: '#F3EFE9',
    },
    {
      id: 'sprout',
      stageName: 'Sprout',
      metaphor: 'Learning',
      ageRef: 'Play Group to Nursery (Age 2.5–3.5)',
      title: 'First Leaves Reaching for the Light',
      quote: '“What the hand does the mind remembers.”',
      description:
        'The tender green shoot emerges. The child learns not through rote repetition, but by grasping sandpaper letters, stacking cylinder blocks, and counting tangible golden beads with their own hands.',
      milestones: [
        'Tactile phonics recognition with sandpaper letters',
        'Spatial order with the iconic Montessori pink tower',
        'Daily practical self-care (water pouring, buttoning)',
        'Respectful social interactions in shared workspaces',
      ],
      themeColor: '#87966C', // Sage
      accentBg: '#F3F6EE',
    },
    {
      id: 'plant',
      stageName: 'Plant',
      metaphor: 'Confidence',
      ageRef: 'Nursery to Jr. Kg (Age 3.5–4.5)',
      title: 'Deep Roots and Sturdy Stems',
      quote: '“The greatest sign of success for a teacher is to be able to say, ‘The children are now working as if I did not exist.’”',
      description:
        'With solid foundational roots, the child develops unshakeable self-regulation and focus. They choose their own works, complete multi-step tasks without adult intervention, and correct their own errors with poise.',
      milestones: [
        'Independent selection of daily learning apparatus',
        'Self-correction using built-in physical feedback',
        'Mathematical decimal operations using unit beads',
        'Expressive conversational vocabulary and storytelling',
      ],
      themeColor: '#647D9B', // Educational Blue
      accentBg: '#EFF4FA',
    },
    {
      id: 'flower',
      stageName: 'Flower',
      metaphor: 'Growth',
      ageRef: 'Sr. Kg (Age 4.5–6)',
      title: 'Full Bloom of Knowledge & Joy',
      quote: '“Joy, feeling one’s own value, being appreciated and loved by others, feeling useful and capable of production are all factors of enormous value for the human soul.”',
      description:
        'The blooming blossom: A confident, kind, and articulate young scholar. Ready for formal primary school education anywhere in the world, carrying lifelong empathy, curiosity, and love for discovery.',
      milestones: [
        'Fluent phonetic reading and creative sentence crafting',
        'Complex addition & subtraction with the stamp game',
        'Peer mentoring and leadership in the mixed-age room',
        'Joyful emotional resilience and school readiness',
      ],
      themeColor: '#C7A75A', // Gold
      accentBg: '#FFF9ED',
    },
  ];

  const currentStage = stages[activeStageIndex];

  return (
    <section id="growth" className="py-20 lg:py-28 bg-[#F8F4EA] relative overflow-hidden border-t border-[#C7A75A]/20">
      
      {/* Ambient botanical background lighting */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#87966C]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#C7A75A]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Chapter 03 Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#C7A75A]/40 shadow-luxury-xs text-xs font-semibold text-[#263B52] mb-3">
            <span className="text-[#C7A75A]">✦</span>
            <span className="font-serif-luxury tracking-widest uppercase">PAGE 03 · CHAPTER 03</span>
            <span className="text-[#C7A75A]">✦</span>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#87966C] font-semibold font-sans-luxury">
            GROWTH
          </span>
          <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263B52] tracking-tight max-w-2xl">
            From Seed to Blossom.
          </h2>
          <p className="mt-3 text-base text-[#5E5045] font-light max-w-xl font-sans-luxury">
            Watch how Montessori education mirrors nature’s natural unfolding:
            Seed (Curiosity) → Sprout (Learning) → Plant (Confidence) → Flower (Growth).
          </p>
        </div>

        {/* Botanical Timeline Stepper / Slider */}
        <div className="relative max-w-4xl mx-auto mb-12">
          
          {/* Connector Vine Line */}
          <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-[#5E5045]/40 via-[#87966C]/50 to-[#C7A75A]/50 -translate-y-1/2 z-0 hidden sm:block rounded-full" />

          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
            {stages.map((stage, idx) => {
              const isSelected = activeStageIndex === idx;
              const isCompleted = idx <= activeStageIndex;

              return (
                <button
                  key={stage.id}
                  id={`growth-stage-btn-${stage.id}`}
                  type="button"
                  onClick={() => setActiveStageIndex(idx)}
                  className={`flex flex-col items-center text-center p-4 rounded-[22px] transition-all duration-300 border-2 focus:outline-none ${
                    isSelected
                      ? 'bg-white shadow-luxury-md border-[#C7A75A] scale-105'
                      : 'bg-white/80 hover:bg-white border-[#C7A75A]/25 shadow-luxury-xs'
                  }`}
                >
                  {/* Botanical Visual Icon Indicator */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-xl mb-2 transition-all ${
                      isSelected
                        ? 'bg-[#F8F4EA] border-2 border-[#C7A75A] shadow-luxury-xs scale-110'
                        : isCompleted
                        ? 'bg-[#F4F6EE] border border-[#87966C]/50'
                        : 'bg-stone-50 border border-stone-200 opacity-60'
                    }`}
                  >
                    {idx === 0 && '🌰'}
                    {idx === 1 && '🌱'}
                    {idx === 2 && '🌿'}
                    {idx === 3 && '🌸'}
                  </div>

                  <span className="font-serif-luxury text-base font-bold text-[#263B52]">
                    {stage.stageName}
                  </span>

                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${
                      isSelected
                        ? 'bg-[#C7A75A]/15 text-[#8F6F22]'
                        : 'text-[#647D9B]'
                    }`}
                  >
                    {stage.metaphor}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-[28px] p-6 sm:p-10 border-2 border-[#C7A75A]/40 shadow-luxury-lg max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Botanical Illustration & Quote */}
              <div className="lg:col-span-5 text-center p-6 rounded-[22px] bg-[#F8F4EA] border border-[#C7A75A]/30">
                <div className="w-24 h-24 mx-auto rounded-full bg-white border-2 border-[#C7A75A]/40 flex items-center justify-center text-5xl shadow-luxury-sm mb-4">
                  {activeStageIndex === 0 && '🌰'}
                  {activeStageIndex === 1 && '🌱'}
                  {activeStageIndex === 2 && '🌿'}
                  {activeStageIndex === 3 && '🌸'}
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#C7A75A]/30 text-xs font-semibold text-[#263B52] mb-3">
                  <span>Stage 0{activeStageIndex + 1}</span>
                  <span>•</span>
                  <span className="text-[#C7A75A]">{currentStage.metaphor}</span>
                </div>

                <h3 className="font-serif-luxury text-2xl font-bold text-[#263B52]">
                  {currentStage.stageName}: {currentStage.title}
                </h3>

                <p className="mt-3 text-xs italic text-[#5E5045] leading-relaxed border-t border-[#C7A75A]/20 pt-3">
                  {currentStage.quote}
                </p>
                <span className="text-[11px] font-sans-luxury text-[#87966C] font-semibold block mt-1">
                  — Dr. Maria Montessori
                </span>
              </div>

              {/* Right Column: Pedagogical Context & Developmental Milestones */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-[#647D9B]">
                    {currentStage.ageRef}
                  </span>
                  <p className="mt-2 text-sm sm:text-base text-[#5E5045] font-light leading-relaxed">
                    {currentStage.description}
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#263B52] mb-2.5">
                    Stage Developmental Milestones:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentStage.milestones.map((ms, mIdx) => (
                      <div
                        key={mIdx}
                        className="flex items-start gap-2 bg-[#F8F4EA]/70 p-3 rounded-xl border border-[#C7A75A]/20 text-xs text-[#263B52]"
                      >
                        <Check className="w-3.5 h-3.5 text-[#87966C] shrink-0 mt-0.5" />
                        <span>{ms}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>Botanical metaphor for Little Noor pupils</span>
                  <div className="flex items-center gap-1">
                    {stages.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => setActiveStageIndex(dotIdx)}
                        aria-label={`Go to stage ${dotIdx + 1}`}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          dotIdx === activeStageIndex
                            ? 'w-6 bg-[#C7A75A]'
                            : 'bg-stone-300 hover:bg-stone-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
