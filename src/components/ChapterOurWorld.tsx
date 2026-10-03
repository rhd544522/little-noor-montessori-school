import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, Compass, Eye, Shield, Sun, BookOpen } from 'lucide-react';

interface WorldArea {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  image: string;
  description: string;
  highlights: string[];
  sensoryAtmosphere: string;
}

export const ChapterOurWorld: React.FC = () => {
  const [activeAreaId, setActiveAreaId] = useState<string>('classroom');

  const areas: WorldArea[] = [
    {
      id: 'classroom',
      name: 'Classroom',
      subtitle: 'Prepared Tactile Sanctuary',
      tag: 'Independent Exploration',
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200&auto=format&fit=crop',
      description:
        'A light-drenched environment where every shelf, wooden tray, and workstation sits at the exact height of the child. Beautifully organized with certified wooden Montessori materials, allowing learners to select, concentrate on, and return tasks autonomously.',
      highlights: [
        'Open low wooden shelving with self-correcting apparatus',
        'Abundant natural sunlight and calm botanical accents',
        'Distinct quiet work-mats for focused concentration',
        '100% child-scaled ergonomic chairs and tables',
      ],
      sensoryAtmosphere: 'Quiet hum of purposeful concentration, soft wooden clicks, warm ambient light.',
    },
    {
      id: 'corner',
      name: 'Learning Corner',
      subtitle: 'Language Nook & Golden Beads',
      tag: 'Phonics & Mathematics',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop',
      description:
        'A peaceful alcove dedicated to rich storytelling, phonetic sandpaper cards, and concrete mathematics. Here children physically hold thousands, hundreds, tens, and units of golden beads, understanding mathematical reality through touch.',
      highlights: [
        'Sandpaper alphabet cards & moveable alphabet box',
        'Montessori Golden Bead apparatus for decimal understanding',
        'Cozy floor cushions for peaceful picture-book reading',
        'Cultural globes and tactile continent puzzle maps',
      ],
      sensoryAtmosphere: 'Gentle whispers of storybook discovery, tactile sandpaper textures, and mathematical joy.',
    },
    {
      id: 'outdoor',
      name: 'Outdoor Play',
      subtitle: 'Sensory Garden & Nature Paths',
      tag: 'Gross Motor & Fresh Air',
      image: 'https://images.unsplash.com/photo-1596464716127-f2a829822391?q=80&w=1200&auto=format&fit=crop',
      description:
        'A secure open-air courtyard where children dig their fingers into fertile gardening soil, balance across rounded wooden logs, and observe fluttering butterflies. Dr. Montessori believed nature is the child’s greatest sensory guide.',
      highlights: [
        'Child-tended sensory herb and flower planter boxes',
        'Natural wood balance beams and gross-motor climbing apparatus',
        'Shaded sand-and-water exploratory station',
        'CCTV-monitored, secure enclosed play perimeter',
      ],
      sensoryAtmosphere: 'Fresh morning breeze, aromatic soil, cheerful giggles, and chirping birds.',
    },
    {
      id: 'activity',
      name: 'Activity Space',
      subtitle: 'Practical Life & Creative Atelier',
      tag: 'Coordination & Artistry',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop',
      description:
        'Where daily life skills become celebrated arts. Toddlers learn to pour liquids without spilling, wash tables with gentle sponges, fold linens, and mix non-toxic organic tempera paints to express their boundless creativity.',
      highlights: [
        'Water-pouring, grain-spooning, and button-frame stations',
        'Organic easel painting, clay sculpting, and collage work',
        'Rhythmic musical instruments and movement chimes',
        'Deep foundation for fine-motor pen grip and patience',
      ],
      sensoryAtmosphere: 'Splashes of bright paint, rhythmic wooden chimes, and the pride of self-accomplishment.',
    },
  ];

  const currentArea = areas.find((a) => a.id === activeAreaId) || areas[0];

  return (
    <section id="explore" className="py-20 lg:py-28 bg-[#F8F4EA] relative overflow-hidden border-t border-[#C7A75A]/20">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#C7A75A]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Chapter 04 Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#C7A75A]/40 shadow-luxury-xs text-xs font-semibold text-[#263B52] mb-3">
            <span className="text-[#C7A75A]">✦</span>
            <span className="font-serif-luxury tracking-widest uppercase">PAGE 04 · CHAPTER 04</span>
            <span className="text-[#C7A75A]">✦</span>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#647D9B] font-semibold font-sans-luxury">
            OUR WORLD
          </span>
          <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263B52] tracking-tight max-w-2xl">
            Step Inside Little Noor World.
          </h2>
          <p className="mt-3 text-base text-[#5E5045] font-light max-w-xl font-sans-luxury">
            A miniature world designed not from adult height, but directly from the perspective of a two to five year old.
          </p>
        </div>

        {/* 4 Interactive Area Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-4xl mx-auto">
          {areas.map((area) => {
            const isSelected = activeAreaId === area.id;

            return (
              <button
                key={area.id}
                id={`world-area-btn-${area.id}`}
                type="button"
                onClick={() => setActiveAreaId(area.id)}
                onMouseEnter={() => setActiveAreaId(area.id)}
                className={`py-3.5 px-4 rounded-[20px] transition-all duration-300 text-center border-2 focus:outline-none ${
                  isSelected
                    ? 'bg-white shadow-luxury-md border-[#C7A75A] scale-105'
                    : 'bg-white/80 hover:bg-white border-[#C7A75A]/25 shadow-luxury-xs'
                }`}
              >
                <div className="font-serif-luxury text-base sm:text-lg font-bold text-[#263B52]">
                  {area.name}
                </div>
                <div className="text-[11px] font-sans-luxury text-[#87966C] font-semibold truncate mt-0.5">
                  {area.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Area Large Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentArea.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-[28px] overflow-hidden border-2 border-[#C7A75A]/40 shadow-luxury-lg max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Side: Editorial Photograph */}
              <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[420px]">
                <img
                  src={currentArea.image}
                  alt={`${currentArea.name} at Little Noor Montessori School, Bhuj`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#263B52]/70 via-transparent to-transparent" />
                
                {/* Visual badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C7A75A]/40 text-xs font-bold font-serif-luxury text-[#263B52] shadow-luxury-xs flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#C7A75A]" />
                  <span>{currentArea.subtitle}</span>
                </div>

                {/* Atmosphere Quote on bottom of image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] uppercase tracking-wider text-[#C7A75A] font-semibold">
                    Atmosphere & Soundscape
                  </span>
                  <p className="text-xs sm:text-sm font-serif-luxury italic text-stone-100 mt-0.5">
                    “{currentArea.sensoryAtmosphere}”
                  </p>
                </div>
              </div>

              {/* Right Side: Narrative and Tactile Elements */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between text-left space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#87966C]">
                    <span>Little Noor Space</span>
                    <span>•</span>
                    <span>Bhuj, Kutch</span>
                  </div>

                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#263B52] mt-1">
                    {currentArea.name}
                  </h3>

                  <p className="mt-3 text-sm text-[#5E5045] font-light leading-relaxed">
                    {currentArea.description}
                  </p>
                </div>

                {/* Montessori Environmental Design Checklist */}
                <div className="space-y-2 border-t border-[#C7A75A]/20 pt-4">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#263B52]">
                    Prepared Environment Design:
                  </h4>
                  <ul className="space-y-2 text-xs text-[#5E5045]">
                    {currentArea.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-[#C7A75A] font-bold">✦</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <div className="p-3 rounded-xl bg-[#F8F4EA] border border-[#C7A75A]/30 flex items-center gap-3">
                    <Sun className="w-5 h-5 text-[#C7A75A] shrink-0" />
                    <span className="text-xs text-[#263B52] font-medium">
                      Tour this room during your morning observation visit in Bhuj.
                    </span>
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
