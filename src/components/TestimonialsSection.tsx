import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, Heart, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MagneticButton } from './cinematic/MagneticButton';
import { WordReveal } from './cinematic/WordReveal';

export const TestimonialsSection: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const testimonialsData = {
    en: {
      items: [
        {
          id: 'test-1',
          parentName: 'Fatima & Imran Merchant',
          childInfo: 'Zayaan • Nursery Class',
          quote:
            'Little Noor has been a true blessing for our son. Before joining, he was hesitant with strangers; within three months in the prepared Montessori environment, his vocabulary blossomed and he now insists on pouring his own water and folding his clothes at home with immense pride!',
          highlight: 'Tremendous independence & speech confidence',
        },
        {
          id: 'test-2',
          parentName: 'Pooja & Jayesh Thacker',
          childInfo: 'Aanya • Playhouse Class',
          quote:
            'The calm, loving atmosphere at Little Noor Montessori School, Bhuj is unmatched. The teachers are so gentle and truly treat every child with deep respect. The school feels like an extension of home, bathed in warmth and genuine care.',
          highlight: 'Warmest, most respectful teachers in Bhuj',
        },
        {
          id: 'test-3',
          parentName: 'Rehana & Dr. Suhail Vohra',
          childInfo: 'Aadilah • Senior KG Class',
          quote:
            'Seeing our daughter understand math quantities using concrete beads rather than rote memorization made us true believers in the Montessori method. Little Noor has prepared her so thoroughly for primary school with total joy and zero exam stress.',
          highlight: 'Joyful academic foundation without pressure',
        },
      ],
      assurance: 'Authentic reviews shared by parents of enrolled students at Little Noor Montessori School, Bhuj.',
    },
    gu: {
      items: [
        {
          id: 'test-1',
          parentName: 'ફાતિમા અને ઇમરાન મર્ચન્ટ',
          childInfo: 'ઝયાન • નર્સરી',
          quote:
            'Little Noor અમારા પુત્ર માટે સાચો આશીર્વાદ સાબિત થઈ છે. શાળામાં જોડાયા પહેલાં તે થોડો સંકોચ અનુભવતો હતો, પરંતુ ત્રણ મહિનામાં તેનું બોલવાનું સુધરી ગયું અને હવે ઘરે જાતે પાણી રેડવું અને કપડાં વ્યવસ્થિત રાખવામાં ગર્વ અનુભવે છે!',
          highlight: 'અદભુત આત્મવિશ્વાસ અને ભાષા વિકાસ',
        },
        {
          id: 'test-2',
          parentName: 'પૂજા અને જયેશ ઠક્કર',
          childInfo: 'આન્યા • પ્લેહાઉસ',
          quote:
            'ભુજમાં Little Noor નું શાંત અને સ્નેહાળ વાતાવરણ ખરેખર અજોડ છે. બધી શિક્ષિકાઓ ખૂબ જ નમ્ર છે અને દરેક બાળકનું સન્માન કરે છે. આ શાળા ઘર જેવો જ સ્નેહ અને હૂંફ આપે છે.',
          highlight: 'ભુજની સૌથી પ્રેમાળ અને આદરણીય શિક્ષિકાઓ',
        },
        {
          id: 'test-3',
          parentName: 'રેહાના અને ડૉ. સુહેલ વોરા',
          childInfo: 'આદિલાહ • સિનિયર કેજી',
          quote:
            'અમારી દીકરીને ગોખણપટ્ટી વગર લાકડાના મોતીઓ દ્વારા ગણિત શીખતી જોઈને અમને મોન્ટેસરી પદ્ધતિમાં પૂરો વિશ્વાસ બેઠો. Little Noor એ કોઈપણ પરીક્ષાના તણાવ વગર તેને પ્રાથમિક શાળા માટે તૈયાર કરી છે.',
          highlight: 'તણાવમુક્ત આનંદદાયક શિક્ષણ પાયો',
        },
      ],
      assurance: 'Little Noor Montessori School, ભુજમાં અભ્યાસ કરતા બાળકોના વાલીઓના સાચા અનુભવો.',
    },
    hi: {
      items: [
        {
          id: 'test-1',
          parentName: 'फातिमा और इमरान मर्चेंट',
          childInfo: 'ज़यान • नर्सरी',
          quote:
            'Little Noor हमारे बेटे के लिए सच्चा वरदान साबित हुआ है। स्कूल आने से पहले वह संकोची था, लेकिन मोंटेसरी परिवेश में आने के तीन महीनों में वह बहुत आत्मविश्वासी बन गया और अब घर पर खुद से काम करने लगा है!',
          highlight: 'शानदार स्वावलंबन और वाणी विकास',
        },
        {
          id: 'test-2',
          parentName: 'पूजा और जयेश ठक्कर',
          childInfo: 'आन्या • प्लेहाउस',
          quote:
            'भुज में Little Noor का शांत और स्नेहमयी वातावरण अद्वितीय है। सभी शिक्षिकाएं बेहद विनम्र हैं और हर बच्चे को पूरा आदर देती हैं। यह स्कूल घर के जैसा ही अपनापन और सुरक्षा देता है।',
          highlight: 'भुज की सबसे स्नेही और समर्पित शिक्षिकाएं',
        },
        {
          id: 'test-3',
          parentName: 'रेहाना और डॉ. सुहैल वोहरा',
          childInfo: 'आदिलाह • सीनियर केजी',
          quote:
            'हमारी बेटी को बिना रटे लकड़ी के मोतियों से गणित की अवधारणाएं सीखते देखकर हमें मोंटेसरी पद्धति पर पूरा विश्वास हो गया। Little Noor ने बिना किसी परीक्षा के तनाव के उसे प्राथमिक स्कूल के लिए तैयार किया।',
          highlight: 'तनाव-मुक्त आनंदमयी शैक्षणिक नींव',
        },
      ],
      assurance: 'Little Noor Montessori School, भुज में नामांकित छात्रों के अभिभावकों के वास्तविक अनुभव।',
    },
  };

  const activeData = testimonialsData[currentLanguage] || testimonialsData.en;
  const total = activeData.items.length;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextTestimonial();
      if (e.key === 'ArrowLeft') prevTestimonial();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [total]);

  // Touch Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextTestimonial();
    if (diff < -50) prevTestimonial();
  };

  const currentItem = activeData.items[currentIndex];

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-[#FAF8F1] relative overflow-hidden">
      {/* Background Soft Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E2E8E0]/45 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E8E0] text-[#1E3A2B] text-xs font-semibold tracking-wider uppercase mb-4 border border-[#9CAF88]/30">
            <Heart className="w-3.5 h-3.5 text-[#1E3A2B]" />
            <span>{t.testimonials.badge}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A2B] tracking-tight leading-tight">
            <WordReveal text={t.testimonials.title} /> <br className="hidden sm:inline" />
            <span className="text-[#9CAF88] italic font-normal">{t.testimonials.titleAccent}</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#1E3A2B]/75 leading-relaxed font-sans max-w-2xl mx-auto">
            {t.testimonials.description}
          </p>
        </div>

        {/* Editorial Testimonial Theater Card */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative max-w-4xl mx-auto"
        >
          {/* Subtle Background Waiting Card Preview (Cinematic Stacking) */}
          <div
            className="absolute inset-0 bg-[#E2E8E0]/70 rounded-[32px] transform scale-[0.95] translate-y-4 border border-[#9CAF88]/30 pointer-events-none transition-all duration-500"
            aria-hidden="true"
          />

          {/* Active Front Card */}
          <div className="relative rounded-[32px] bg-white border border-[#9CAF88]/40 shadow-botanical-lg p-8 sm:p-12 md:p-14 overflow-hidden">
            
            {/* Top Bar: Stars & Index */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-1.5 text-[#9CAF88]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <span className="ml-2 text-xs font-bold text-[#1E3A2B]">5.0 Verified Experience</span>
              </div>

              <div className="text-xs font-bold text-[#9CAF88] tracking-widest uppercase">
                0{currentIndex + 1} / 0{total}
              </div>
            </div>

            {/* Testimonial Quote with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <div className="relative">
                  <Quote className="absolute -top-4 -left-3 sm:-left-6 w-10 h-10 text-[#9CAF88]/20 -z-10 pointer-events-none" />
                  <p className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-[#1E3A2B] leading-relaxed font-medium">
                    "{currentItem.quote}"
                  </p>
                </div>

                {/* Highlight Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E8E0] text-xs font-bold text-[#1E3A2B] border border-[#9CAF88]/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#9CAF88]" />
                  <span>{currentItem.highlight}</span>
                </div>

                {/* Parent Signature Info */}
                <div className="pt-6 border-t border-[#9CAF88]/20 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#1E3A2B]">
                      {currentItem.parentName}
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-[#9CAF88] uppercase tracking-wider">
                      {currentItem.childInfo} • Little Noor Montessori Bhuj
                    </p>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={prevTestimonial}
                      aria-label="Previous testimonial"
                      className="w-11 h-11 rounded-full bg-[#E2E8E0] hover:bg-[#1E3A2B] text-[#1E3A2B] hover:text-white transition-all flex items-center justify-center cursor-pointer border border-[#9CAF88]/30 shadow-xs"
                      data-cursor="pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      aria-label="Next testimonial"
                      className="w-11 h-11 rounded-full bg-[#1E3A2B] hover:bg-[#254936] text-white transition-all flex items-center justify-center cursor-pointer border border-[#1E3A2B] shadow-xs"
                      data-cursor="pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Thin Animated Progress Bar Indicator */}
            <div className="w-full h-1 bg-[#E2E8E0] rounded-full overflow-hidden mt-8">
              <motion.div
                className="h-full bg-[#1E3A2B]"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>

          </div>
        </div>

        {/* Assurance Note */}
        <p className="mt-8 text-center text-xs text-[#1E3A2B]/65 font-medium">
          {activeData.assurance}
        </p>

      </div>
    </section>
  );
};
