import React from 'react';
import { motion } from 'motion/react';
import { Clock, Sun, BookOpen, Coffee, Sprout, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DailyExperienceSection: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const dailyData = {
    en: {
      badge: 'A Peaceful Morning in Bhuj',
      title: 'A Typical Morning at',
      titleAccent: 'Little Noor',
      subtitle: 'From gentle arrivals to self-chosen Montessori work cycles, every morning unfolds in purposeful calm.',
      steps: [
        {
          time: '9:00 AM',
          badge: 'Gentle Arrival',
          period: 'Peaceful Welcome & Shoe Changing',
          description: 'Children are warmly greeted by name at the campus gate, hang their own bags, and slip into indoor shoes independently.',
          icon: Sun,
        },
        {
          time: '9:15 – 10:30 AM',
          badge: 'Core Focus',
          period: 'Uninterrupted Montessori Work Cycle',
          description: 'A quiet, deep period of concentration where each child chooses their sensorial tray, practical life work, or language cards.',
          icon: BookOpen,
        },
        {
          time: '10:30 – 10:50 AM',
          badge: 'Social Grace',
          period: 'Grace, Courtesy & Healthy Snack',
          description: 'Children pour water from small pitchers, share fruit, practice “please” and “thank you”, and wipe their tables with pride.',
          icon: Coffee,
        },
        {
          time: '10:50 – 11:30 AM',
          badge: 'Joyful Community',
          period: 'Circle Gathering, Stories & Garden Play',
          description: 'Rhymes, Gujarati and Hindi storytelling, botany observation in the courtyard, and joyful movement before dismissal.',
          icon: Sprout,
        },
      ],
      reminderTag: 'Daily Timings',
      reminderPlayhouse: 'Playhouse: 9:00 AM – 11:00 AM (Mon–Fri)',
      reminderOther: 'Nursery & Sr. Kg: 9:00 AM – 11:30 AM (Mon–Sat)',
    },
    gu: {
      badge: 'ભુજમાં શાંત પ્રભાત',
      title: 'Little Noor માં એક',
      titleAccent: 'આનંદમય સવાર',
      subtitle: 'સ્નેહાળ સ્વાગતથી લઈને પોતાની પસંદગીના મોન્ટેસરી સાધનો સાથે શીખવા સુધી, દરેક સવાર શાંતિ અને શિસ્ત સાથે શરૂ થાય છે.',
      steps: [
        {
          time: '૯:૦૦ AM',
          badge: 'સ્નેહાળ આગમન',
          period: 'શાંત સ્વાગત અને આત્મનિર્ભર તૈયારી',
          description: 'શાળાના પ્રવેશદ્વારે દરેક બાળકનું હસતા મુખે સ્વાગત થાય છે. બાળક જાતે દફ્તર મૂકીને પોતાની ચંપલ બદલી વર્ગખંડમાં પ્રવેશે છે.',
          icon: Sun,
        },
        {
          time: '૯:૧૫ – ૧૦:૩૦ AM',
          badge: 'મુખ્ય સત્ર',
          period: 'અવિરત મોન્ટેસરી અભ્યાસ ચક્ર',
          description: 'શાંત વાતાવરણમાં બાળક પોતાની પસંદગી મુજબ લાકડાના સાધનો, ગણિતના મોતી અથવા ભાષા કાર્ડ સાથે ઊંડી એકાગ્રતાથી શીખે છે.',
          icon: BookOpen,
        },
        {
          time: '૧૦:૩૦ – ૧૦:૫૦ AM',
          badge: 'સંસ્કાર અને શિષ્ટાચાર',
          period: 'શિષ્ટાચાર અને પૌષ્ટિક નાસ્તાનો સમય',
          description: 'બાળકો નાની કીટલીમાંથી જાતે પાણી રેડે છે, સાથે નાસ્તો વહેંચે છે, આભાર કહે છે અને નાસ્તા પછી પોતાનું ટેબલ સાફ કરે છે.',
          icon: Coffee,
        },
        {
          time: '૧૦:૫૦ – ૧૧:૩૦ AM',
          badge: 'સામૂહિક આનંદ',
          period: 'વર્તુળ સભા, વાર્તાઓ અને બગીચાની રમત',
          description: 'બાળગીતો, ગુજરાતી વાર્તાઓ, આંગણામાં પ્રકૃતિ નિરીક્ષણ અને શારીરિક કસરત સાથે દિવસનો આનંદદાયક અંત.',
          icon: Sprout,
        },
      ],
      reminderTag: 'શાળા સમય',
      reminderPlayhouse: 'પ્લેહાઉસ: સવારે ૯:૦૦ થી ૧૧:૦૦ (સોમ–શુક્ર)',
      reminderOther: 'નર્સરી અને સિનિયર કેજી: સવારે ૯:૦૦ થી ૧૧:૩૦ (સોમ–શનિ)',
    },
    hi: {
      badge: 'भुज में शांत प्रभात',
      title: 'Little Noor में एक',
      titleAccent: 'सुखद प्रभात',
      subtitle: 'स्नेहपूर्ण स्वागत से लेकर आत्म-प्रेरित मोंटेसरी गतिविधियों तक, हर सुबह एकाग्रता और आनंद से भरी होती है।',
      steps: [
        {
          time: '९:०० AM',
          badge: 'स्नेहिल आगमन',
          period: 'शांतिपूर्ण स्वागत और आत्मनिर्भर तैयारी',
          description: 'स्कूल के मुख्य द्वार पर हर बच्चे का आत्मीय स्वागत होता है। बच्चे स्वयं अपने बैग रखकर इनडोर जूते पहनते हैं।',
          icon: Sun,
        },
        {
          time: '९:१५ – १०:३० AM',
          badge: 'मुख्य सत्र',
          period: 'अबाध मोंटेसरी कार्य चक्र',
          description: 'शांत वातावरण में बच्चा अपनी पसंद के लकड़ी के साधनों, व्यावहारिक जीवन या वर्णमाला के उपकरणों से लगन से सीखता है।',
          icon: BookOpen,
        },
        {
          time: '१०:३० – १०:५० AM',
          badge: 'शिष्टाचार व संस्कार',
          period: 'सदाचार और पौष्टिक अल्पाहार का समय',
          description: 'बच्चे छोटे जग से स्वयं पानी डालते हैं, मिल-बांटकर नाश्ता करते हैं और सफाई की आदतें सीखते हैं।',
          icon: Coffee,
        },
        {
          time: '१०:५० – ११:३० AM',
          badge: 'सामूहिक आनंद',
          period: 'सर्कल सभा, बालगीत और खुले आंगन में खेल',
          description: 'बाल कविताएं, कहानियां, प्रकृति का अवलोकन और खेलकूद के साथ सत्र का समापन होता है।',
          icon: Sprout,
        },
      ],
      reminderTag: 'स्कूल का समय',
      reminderPlayhouse: 'प्लेहाउस: सुबह ९:०० से ११:०० (सोम–शुक्र)',
      reminderOther: 'नर्सरी व सीनियर केजी: सुबह ९:०० से ११:३० (सोम–शनि)',
    },
  };

  const activeData = dailyData[currentLanguage] || dailyData.en;

  return (
    <section id="experience" className="py-20 sm:py-28 bg-[#FAF8F1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E8E0] text-[#1E3A2B] text-xs font-semibold tracking-wider uppercase mb-4 border border-[#9CAF88]/30">
            <Clock className="w-3.5 h-3.5 text-[#1E3A2B]" />
            <span>{activeData.badge}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A2B] tracking-tight leading-tight">
            {activeData.title} <br className="hidden sm:inline" />
            <span className="text-[#9CAF88] italic font-normal">{activeData.titleAccent}</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#1E3A2B]/75 leading-relaxed font-sans max-w-2xl mx-auto">
            {activeData.subtitle}
          </p>
        </motion.div>

        {/* Vertical Stepper Timeline with Warm Mint Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {activeData.steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.period}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-6 sm:p-7 rounded-3xl bg-[#E2E8E0] border border-[#9CAF88]/35 shadow-botanical-xs hover:shadow-botanical-sm transition-all flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7"
              >
                {/* Time Badge */}
                <div className="w-full sm:w-48 shrink-0 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8F1] border border-[#9CAF88]/40 flex items-center justify-center text-[#1E3A2B] shadow-2xs">
                    <Icon className="w-5 h-5 text-[#1E3A2B]" />
                  </div>
                  <div>
                    <span className="font-serif-luxury text-base sm:text-lg font-bold text-[#1E3A2B] block leading-tight">
                      {step.time}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#9CAF88] block">
                      {step.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-serif-luxury text-xl font-bold text-[#1E3A2B] mb-1">
                    {step.period}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1E3A2B]/75 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Schedule Summary Notice Pill */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-full bg-white/80 border border-[#9CAF88]/40 text-xs text-[#1E3A2B] shadow-botanical-xs">
            <span className="font-bold text-[#1E3A2B]">{activeData.reminderTag}:</span>
            <span>{activeData.reminderPlayhouse}</span>
            <span className="text-[#9CAF88]">•</span>
            <span>{activeData.reminderOther}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
