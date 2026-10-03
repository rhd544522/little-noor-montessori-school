import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Camera, X, Maximize2 } from 'lucide-react';

interface MomentPhoto {
  id: string;
  title: string;
  category: string;
  spanClass: string;
  aspectClass: string;
  image: string;
  caption: string;
}

export const ChapterMoments: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<MomentPhoto | null>(null);

  const moments: MomentPhoto[] = [
    {
      id: 'm1',
      title: 'Little Discoveries',
      category: 'Sensorial Exploration',
      spanClass: 'lg:col-span-7',
      aspectClass: 'aspect-[16/10]',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop',
      caption: 'The spontaneous joy of solving a tactile geometry puzzle through quiet self-correction.',
    },
    {
      id: 'm2',
      title: 'Creative Hands',
      category: 'Fine Motor Art',
      spanClass: 'lg:col-span-5',
      aspectClass: 'aspect-[4/3]',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop',
      caption: 'Painting with freedom, testing pigments, and expressing inner worlds on child-sized easels.',
    },
    {
      id: 'm3',
      title: 'Story Time',
      category: 'Language Awakening',
      spanClass: 'lg:col-span-4',
      aspectClass: 'aspect-[4/3]',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop',
      caption: 'Gathering around the picture book corner to listen to gentle folk tales and phonetic sounds.',
    },
    {
      id: 'm4',
      title: 'Outdoor Adventures',
      category: 'Nature & Movement',
      spanClass: 'lg:col-span-8',
      aspectClass: 'aspect-[16/9]',
      image: 'https://images.unsplash.com/photo-1596464716127-f2a829822391?q=80&w=1200&auto=format&fit=crop',
      caption: 'Balancing on wooden beams and tending green sprouts under open skies in Bhuj.',
    },
    {
      id: 'm5',
      title: 'Learning Together',
      category: 'Social Grace',
      spanClass: 'lg:col-span-6',
      aspectClass: 'aspect-[14/10]',
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1000&auto=format&fit=crop',
      caption: 'Mixed-age collaboration where an older child gently guides a peer with wooden counting rods.',
    },
    {
      id: 'm6',
      title: 'Quiet Moments',
      category: 'Deep Concentration',
      spanClass: 'lg:col-span-6',
      aspectClass: 'aspect-[14/10]',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop',
      caption: 'Unbroken concentration during a morning work cycle, where peace and intellect meet.',
    },
  ];

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#F8F4EA] relative overflow-hidden border-t border-[#C7A75A]/20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Chapter 05 Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#C7A75A]/40 shadow-luxury-xs text-xs font-semibold text-[#263B52] mb-3">
            <span className="text-[#C7A75A]">✦</span>
            <span className="font-serif-luxury tracking-widest uppercase">PAGE 05 · CHAPTER 05</span>
            <span className="text-[#C7A75A]">✦</span>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#647D9B] font-semibold font-sans-luxury">
            MOMENTS
          </span>
          <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263B52] tracking-tight max-w-2xl">
            Unscripted Joys of Childhood.
          </h2>
          <p className="mt-3 text-base text-[#5E5045] font-light max-w-xl font-sans-luxury">
            Snapshots of hands at work, minds in discovery, and hearts finding joyful independence.
          </p>
        </div>

        {/* Asymmetric Editorial Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {moments.map((item, idx) => (
            <div
              key={item.id}
              className={`${item.spanClass} group relative rounded-[26px] overflow-hidden bg-white p-2.5 sm:p-3 border border-[#C7A75A]/35 shadow-luxury-sm hover:shadow-luxury-lg transition-all duration-500`}
            >
              <div
                className={`relative rounded-[18px] overflow-hidden ${item.aspectClass} cursor-pointer bg-stone-100`}
                onClick={() => setSelectedPhoto(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#263B52]/75 via-[#263B52]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Floating expand icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#263B52] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Caption card on bottom of photo */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-sans-luxury uppercase tracking-wider text-[#C7A75A] font-semibold block">
                    {item.category}
                  </span>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white leading-snug">
                    “{item.title}”
                  </h3>
                  <p className="text-xs text-stone-200 mt-1 font-light line-clamp-1 group-hover:line-clamp-none transition-all">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#263B52]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative bg-white rounded-[28px] overflow-hidden max-w-3xl w-full border-2 border-[#C7A75A] shadow-2xl p-3 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#263B52] hover:bg-[#C7A75A] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-[20px] overflow-hidden aspect-[16/10]">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 sm:p-5 text-left">
              <span className="text-xs font-semibold uppercase text-[#C7A75A]">
                {selectedPhoto.category}
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#263B52] mt-0.5">
                “{selectedPhoto.title}”
              </h3>
              <p className="text-sm text-[#5E5045] font-light mt-1">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
