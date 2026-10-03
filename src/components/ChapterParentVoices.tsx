import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, Quote, Heart } from 'lucide-react';

interface StoryQuote {
  id: string;
  quote: string;
  author: string;
  childInfo: string;
  stageBadge: string;
  bgTilt: string;
}

export const ChapterParentVoices: React.FC = () => {
  const prefersReduced = useReducedMotion();

  const voices: StoryQuote[] = [
    {
      id: 'v1',
      quote:
        'Seeing our shy three-year-old return home each afternoon talking about cylinders, leaf shapes, and pouring water by himself has been magical. Little Noor gave him not just early phonics, but a gentle inner confidence.',
      author: 'Parent of a Nursery Student',
      childInfo: 'Joined Play Group at Age 2 · Bhuj',
      stageBadge: 'Language & Calm Independence',
      bgTilt: 'sm:-rotate-1',
    },
    {
      id: 'v2',
      quote:
        'The guides at Little Noor treat every child with extraordinary respect. There is no rushing, no comparisons, and no harsh scolding. Our daughter learned to read phonetically before age five purely because she loved the process.',
      author: 'Parent of a Sr. Kg Student',
      childInfo: 'Graduating to Primary School · Bhuj',
      stageBadge: 'Joyful Reading & Mentorship',
      bgTilt: 'sm:rotate-1',
    },
    {
      id: 'v3',
      quote:
        'We were hesitant about preschool transitions, but Little Noor’s gradual settling and 1:8 ratio made all anxiety vanish within the first week. It feels like an extension of a calm, loving, intellectually rich home.',
      author: 'Parent of a Play Group Student',
      childInfo: 'First-time School Family · Bhuj',
      stageBadge: 'Gentle Gradual Settling',
      bgTilt: 'sm:-rotate-1',
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#F8F4EA] relative overflow-hidden border-t border-[#C7A75A]/20">
      
      {/* Soft celestial background accents */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[400px] bg-[#C7A75A]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Chapter 06 Header */}
        <div className="flex flex-col items-center justify-center text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#C7A75A]/40 shadow-luxury-xs text-xs font-semibold text-[#263B52] mb-3">
            <span className="text-[#C7A75A]">✦</span>
            <span className="font-serif-luxury tracking-widest uppercase">PAGE 06 · CHAPTER 06</span>
            <span className="text-[#C7A75A]">✦</span>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#647D9B] font-semibold font-sans-luxury">
            PARENT VOICES
          </span>
          <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263B52] tracking-tight max-w-2xl">
            Chapters Written Together.
          </h2>
          <p className="mt-3 text-base text-[#5E5045] font-light max-w-xl font-sans-luxury">
            Real experiences from families whose children began their learning adventure at Little Noor.
          </p>
        </div>

        {/* Floating Storybook Cards (Pages Floating in Space) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {voices.map((voice, idx) => (
            <motion.div
              key={voice.id}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className={`flex flex-col justify-between rounded-[28px] p-8 bg-white/95 backdrop-blur-md border-2 border-[#C7A75A]/35 shadow-luxury-md hover:shadow-luxury-lg transition-all duration-300 transform ${voice.bgTilt} hover:rotate-0 hover:-translate-y-1 relative`}
            >
              {/* Parchment aesthetic top gilded line */}
              <div className="absolute top-3 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#C7A75A]/40 to-transparent" />

              <div>
                {/* Large Distinctive Quotation Mark */}
                <div className="font-serif-luxury text-6xl text-[#C7A75A]/40 leading-none select-none -mt-2 -mb-2">
                  “
                </div>

                <p className="font-serif-luxury text-lg text-[#263B52] font-normal leading-relaxed italic relative z-10">
                  {voice.quote}
                </p>
              </div>

              {/* Author Attribution */}
              <div className="mt-6 pt-6 border-t border-[#C7A75A]/20">
                <div className="flex items-center gap-2 text-xs font-serif-luxury text-[#87966C] font-semibold mb-1">
                  <span>✦</span>
                  <span>{voice.stageBadge}</span>
                </div>
                <div className="font-serif-luxury text-base font-bold text-[#263B52]">
                  {voice.author}
                </div>
                <div className="text-xs text-[#5E5045] font-light">
                  {voice.childInfo}
                </div>
              </div>

              {/* Corner decorative motif */}
              <div className="absolute bottom-3 right-4 text-xs text-[#C7A75A]/40">
                🌿
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
