import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Palette, Layers, BookOpen, Calculator, Sprout, Hand, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ActivitiesSection: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState(0);
  const { t, currentLanguage } = useLanguage();

  const activitiesData = {
    en: {
      materialsLabel: 'Core Apparatus',
      items: [
        {
          id: 'practical-life',
          tag: 'Independence',
          title: 'Practical Life Exercises',
          summary: 'Pouring water, buttoning frames, folding linens, and sweeping tables cultivate fine-motor mastery and inner dignity.',
          details: ['Develops hand-eye coordination', 'Fosters self-care & orderliness'],
          apparatus: 'Real scaled ceramic pitchers, dressing frames & sweeping trays',
          icon: Hand,
        },
        {
          id: 'sensorial',
          tag: 'Perception',
          title: 'Sensorial Development',
          summary: 'Scientific wooden materials refine visual grading, tactile discrimination, weight discernment, and auditory sensitivity.',
          details: ['Self-correcting wooden blocks', 'Visual dimension discrimination'],
          apparatus: 'Pink Tower, Brown Stairs & Knobbed Cylinder Blocks',
          icon: Layers,
        },
        {
          id: 'language',
          tag: 'Communication',
          title: 'Phonics & Early Literacy',
          summary: 'Tracing sandpaper letters connects muscular memory with phonetic sounds, paving a natural joy for reading.',
          details: ['Multilingual vocabulary enrichment', 'Tactile sandpaper letter tracing'],
          apparatus: 'Sandpaper letters, movable alphabets & phonetic story baskets',
          icon: BookOpen,
        },
        {
          id: 'mathematics',
          tag: 'Concrete Math',
          title: 'Hands-On Mathematics',
          summary: 'Children discover numerical quantity through tangible golden beads and number rods before ever writing symbols on paper.',
          details: ['Decimal system visualization', 'Concrete-to-abstract concepts'],
          apparatus: 'Golden bead decimal sets & spindle count boxes',
          icon: Calculator,
        },
        {
          id: 'botany-nature',
          tag: 'Discovery',
          title: 'Botany & Nature Courtyard',
          summary: 'Observing leaf shapes, planting seeds in planter boxes, and caring for courtyard fauna instills deep ecological reverence.',
          details: ['Courtyard herb planter gardening', 'Leaf botany puzzle cabinet'],
          apparatus: 'Botany leaf cabinets, garden trowels & magnifying viewers',
          icon: Sprout,
        },
        {
          id: 'arts-creative',
          tag: 'Expression',
          title: 'Natural Art & Clay Sculpting',
          summary: 'Unstructured tactile creation using natural clay, plant-based non-toxic pigments, and textured collage paper.',
          details: ['Process-over-product mindfulness', 'Strengthens fine pencil grasp'],
          apparatus: 'Natural terracotta clay, non-toxic water tints & easel boards',
          icon: Palette,
        },
      ],
    },
    gu: {
      materialsLabel: 'મુખ્ય સાધનો',
      items: [
        {
          id: 'practical-life',
          tag: 'સ્વાવલંબન',
          title: 'વ્યવહારુ જીવન કૌશલ્ય',
          summary: 'નાની કીટલીમાંથી પાણી રેડવું, બટન લગાવવા અને નાસ્તો વહેંચવાની પ્રવૃત્તિઓથી બાળક આત્મનિર્ભર બને છે.',
          details: ['હાથ અને આંખનું સુંદર તાલમેલ', 'સ્વચ્છતા અને સુઘડતાની ટેવ'],
          apparatus: 'બાળકના કદની કીટલીઓ, બટનિંગ ફ્રેમ અને સાફસફાઈ ટ્રે',
          icon: Hand,
        },
        {
          id: 'sensorial',
          tag: 'ઇન્દ્રિય વિકાસ',
          title: 'ઇન્દ્રિયગ્રાહી સાધનો',
          summary: 'લાકડાના વૈજ્ઞાનિક સાધનો દ્વારા કદ, વજન, આકાર અને સ્પર્શનો તફાવત બાળકના મનમાં સ્પષ્ટ થાય છે.',
          details: ['ભૂલ સુધારી આપતા લાકડાના સાધનો', 'કદ અને પરિમાણની સાચી સમજ'],
          apparatus: 'ગુલાબી ટાવર (Pink Tower), બ્રાઉન સ્ટેર્સ અને સિલિન્ડર બ્લોક્સ',
          icon: Layers,
        },
        {
          id: 'language',
          tag: 'ભાષા જ્ઞાન',
          title: 'ફોનિક્સ અને શબ્દ ઓળખ',
          summary: 'રેતીના અક્ષરો પર આંગળી ફેરવીને બાળક કુદરતી રીતે અવાજ અને અક્ષરનો સંબંધ સહજતાથી શીખે છે.',
          details: ['ગુજરાતી અને અંગ્રેજી શબ્દભંડોળ', 'સ્પર્શ આધારિત અક્ષર પરિચય'],
          apparatus: 'સેન્ડપેપર અક્ષરો, મૂવેબલ આલ્ફાબેટ અને બાળવાર્તાઓ',
          icon: BookOpen,
        },
        {
          id: 'mathematics',
          tag: 'મૂર્ત ગણિત',
          title: 'સ્પર્શ આધારિત ગણિત',
          summary: 'ગોખણપટ્ટી વગર લાકડાના સોનેરી મોતી અને લાકડીઓ દ્વારા ગણતરી અને દશાંશ પદ્ધતિ સહજતાથી સમજાય છે.',
          details: ['દશાંશ પદ્ધતિનું સાચું ચિત્રણ', 'વસ્તુઓ ગણીને સંખ્યા જ્ઞાન'],
          apparatus: 'સોનેરી મોતી સેટ અને સ્પિન્ડલ કાઉન્ટ બોક્સ',
          icon: Calculator,
        },
        {
          id: 'botany-nature',
          tag: 'પ્રકૃતિ દર્શન',
          title: 'વનસ્પતિ અને પ્રકૃતિ આંગણું',
          summary: 'પાંદડાંના આકાર જોવા, કૂંડામાં રોપા વાવવા અને આંગણાના પક્ષીઓ નિહાળવાથી પ્રકૃતિ પ્રત્યે પ્રેમ જાગે છે.',
          details: ['આંગણામાં છોડવા વાવવાની પ્રવૃત્તિ', 'પાંદડાંના આકાર ઓળખવાની પઝલ'],
          apparatus: 'બોટની લીફ કેબિનેટ, બગીચાના સાધનો અને બિલોરી કાચ',
          icon: Sprout,
        },
        {
          id: 'arts-creative',
          tag: 'સર્જનાત્મકતા',
          title: 'કુદરતી કળા અને માટીકામ',
          summary: 'કુદરતી માટી, છોડ આધારિત નિર્દોષ રંગો અને કાગળ દ્વારા બાળકની કલ્પનાશક્તિ ખીલે છે.',
          details: ['પરિણામ કરતાં શીખવાની પ્રક્રિયા પર ધ્યાન', 'આંગળીઓ અને પકડની મજબૂતી'],
          apparatus: 'નેચરલ ટેરાકોટા માટી, વોટર કલર્સ અને આર્ટ બોર્ડ',
          icon: Palette,
        },
      ],
    },
    hi: {
      materialsLabel: 'प्रमुख उपकरण',
      items: [
        {
          id: 'practical-life',
          tag: 'स्वावलंबन',
          title: 'व्यावहारिक जीवन कौशल',
          summary: 'छोटे जग से पानी डालना, बटन लगाना और मेज साफ करने जैसी गतिविधियों से बच्चों में आत्मनिर्भरता आती है।',
          details: ['हाथ और आंखों का संतुलन', 'स्वच्छता व व्यवस्था की आदतें'],
          apparatus: 'बच्चों के आकार के जग, बटनिंग फ्रेम और सफाई ट्रे',
          icon: Hand,
        },
        {
          id: 'sensorial',
          tag: 'इंद्रिय विकास',
          title: 'संवेदी मोंटेसरी सामग्री',
          summary: 'लकड़ी के वैज्ञानिक उपकरणों से आकार, वजन, रंग और स्पर्श का भेद बच्चे के मस्तिष्क में स्पष्ट होता है।',
          details: ['स्वतः त्रुटि सुधारने वाले साधन', 'आकार व विमाओं की समझ'],
          apparatus: 'पिंक टॉवर, ब्राउन स्टेयर्स और नॉब्ड सिलेंडर ब्लॉक्स',
          icon: Layers,
        },
        {
          id: 'language',
          tag: 'भाषा ज्ञान',
          title: 'ध्वनिविज्ञान व वर्णमाला',
          summary: 'सैंडपेपर अक्षरों को उंगलियों से छूकर बच्चे अक्षरों की बनावट और उनकी ध्वनि को सहजता से सीखते हैं।',
          details: ['शब्दावली में निरंतर वृद्धि', 'स्पर्श आधारित अक्षर ज्ञान'],
          apparatus: 'सैंडपेपर अक्षर, मूवेबल अल्फाबेट और बाल कथाएं',
          icon: BookOpen,
        },
        {
          id: 'mathematics',
          tag: 'व्यावहारिक गणित',
          title: 'स्पर्श आधारित प्रारंभिक गणित',
          summary: 'रटने के बजाय लकड़ी के मोतियों और स्पिंडल से बच्चे संख्याओं और दशमलव को हाथों से छूकर समझते हैं।',
          details: ['दशमलव प्रणाली का प्रत्यक्ष अनुभव', 'मूर्त से अमूर्त की ओर शिक्षा'],
          apparatus: 'गोल्डन बीड सेट और स्पिंडल काउंट बॉक्स',
          icon: Calculator,
        },
        {
          id: 'botany-nature',
          tag: 'प्रकृति दर्शन',
          title: 'वनस्पति व प्रकृति आंगन',
          summary: 'पत्तों की संरचना देखना, गमलों में पौधे लगाना और पक्षियों को निहारना बच्चों को प्रकृति से जोड़ता है।',
          details: ['आंगन में बागवानी व पौधे लगाना', 'पत्तियों के आकार की पहेलियां'],
          apparatus: 'बॉटनी लीफ कैबिनेट, गार्डनिंग टूल्स व आवर्धक लेंस',
          icon: Sprout,
        },
        {
          id: 'arts-creative',
          tag: 'सृजनशीलता',
          title: 'प्राकृतिक कला और मिट्टी शिल्प',
          summary: 'प्राकृतिक मिट्टी, पौधों से बने सुरक्षित रंगों और कागजों से बच्चे अपनी रचनात्मक अभिव्यक्ति करते हैं।',
          details: ['रचनात्मकता और एकाग्रता', 'उंगलियों की पकड़ मजबूत होना'],
          apparatus: 'प्राकृतिक टेराकोटा मिट्टी, सुरक्षित रंग और आर्ट बोर्ड',
          icon: Palette,
        },
      ],
    },
  };

  const activeData = activitiesData[currentLanguage] || activitiesData.en;

  return (
    <section id="activities" className="py-20 sm:py-28 bg-[#E2E8E0]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E8E0] text-[#1E3A2B] text-xs font-semibold tracking-wider uppercase mb-4 border border-[#9CAF88]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#1E3A2B]" />
            <span>{t.activities.badge}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A2B] tracking-tight leading-tight">
            {t.activities.title} <br className="hidden sm:inline" />
            <span className="text-[#9CAF88] italic font-normal">{t.activities.titleAccent}</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#1E3A2B]/75 leading-relaxed font-sans max-w-2xl mx-auto">
            {t.activities.description}
          </p>
        </div>

        {/* 6 Exploration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeData.items.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedActivity === idx;
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -3 }}
                onClick={() => setSelectedActivity(idx)}
                className={`p-7 rounded-3xl cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'bg-[#FAF8F1] border-[#1E3A2B] shadow-botanical-md ring-1 ring-[#1E3A2B]'
                    : 'bg-[#FAF8F1]/90 hover:bg-[#FAF8F1] border-[#9CAF88]/30 shadow-botanical-xs hover:shadow-botanical-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E2E8E0] border border-[#9CAF88]/40 flex items-center justify-center text-[#1E3A2B]">
                    <Icon className="w-6 h-6 text-[#1E3A2B]" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#9CAF88] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E2E8E0]/70">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-xl font-bold text-[#1E3A2B] mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#1E3A2B]/75 leading-relaxed font-sans mb-4">
                  {item.summary}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-[#9CAF88]/20">
                  {item.details.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs text-[#1E3A2B]/80 font-medium">
                      <span className="text-[#9CAF88] mt-0.5">•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-[#9CAF88]/15 text-[11px] text-[#1E3A2B]/60">
                  <span className="font-semibold text-[#1E3A2B]">{activeData.materialsLabel}:</span> {item.apparatus}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
