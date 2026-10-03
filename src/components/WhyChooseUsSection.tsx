import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Heart, Sun, Compass, Award, Sprout, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WhyChooseUsSection: React.FC = () => {
  const { t, currentLanguage } = useLanguage();

  const reasonsData = {
    en: [
      {
        title: 'Authentic Montessori Environment',
        description: 'Specially designed wooden materials and child-sized furniture curated to Maria Montessori’s exact specifications.',
        icon: Award,
      },
      {
        title: '1:8 Guide-to-Child Ratio',
        description: 'Individualized observation and gentle guidance ensuring no child is hurried, overlooked, or left unheard.',
        icon: Heart,
      },
      {
        title: '100% Female Guides & Staff',
        description: 'Compassionate, trained female educators and caregivers providing a secure, warm motherly atmosphere.',
        icon: Sun,
      },
      {
        title: 'Tactile Learning over Screen Time',
        description: 'Zero screens or passive watching. Children learn by touching, feeling, building, and exploring concrete materials.',
        icon: Compass,
      },
      {
        title: 'Practical Life Independence',
        description: 'Children gain genuine confidence by pouring water, peeling fruit, tying laces, and keeping their environment clean.',
        icon: Sprout,
      },
      {
        title: 'Tranquil & Safe Campus in Bhuj',
        description: 'Rounded wooden corners, 24/7 CCTV surveillance, and strict parent-identification pickup protocols.',
        icon: ShieldCheck,
      },
    ],
    gu: [
      {
        title: 'પ્રમાણિક મોન્ટેસરી વાતાવરણ',
        description: 'ડૉ. મારિયા મોન્ટેસરીના માર્ગદર્શન મુજબ ખાસ તૈયાર કરેલા લાકડાના શૈક્ષણિક સાધનો અને બાળકના કદનું ફર્નિચર.',
        icon: Award,
      },
      {
        title: '૧:૮ શિક્ષિકા-બાળક ગુણોત્તર',
        description: 'ઓછા વિદ્યાર્થીઓમાં દરેક બાળક પર વ્યક્તિગત સ્નેહ, સંભાળ અને કોઈ ઉતાવળ વગર ધીરજપૂર્વક માર્ગદર્શન.',
        icon: Heart,
      },
      {
        title: '૧૦૦% મહિલા શિક્ષિકાઓ અને સ્ટાફ',
        description: 'પ્રશિક્ષિત, પ્રેમાળ મહિલા શિક્ષિકાઓ અને સહાયકો દ્વારા માતૃત્વસભર, સુરક્ષિત અને સંસ્કારી વાતાવરણ.',
        icon: Sun,
      },
      {
        title: 'સ્ક્રીન મુક્ત, સ્પર્શ આધારિત શિક્ષણ',
        description: 'મોબાઇલ કે ટીવી સ્ક્રીન વિના, બાળકો પોતાના હાથે સાધનો સ્પર્શીને, અનુભવીને અને અન્વેષણ કરીને શીખે છે.',
        icon: Compass,
      },
      {
        title: 'વ્યવહારુ જીવનમાં આત્મનિર્ભરતા',
        description: 'પાણી રેડવું, નાસ્તો કરવો, વસ્તુઓ વ્યવસ્થિત ગોઠવવી જેવી ટેવોથી બાળક નાની વયે જ આત્મવિશ્વાસુ બને છે.',
        icon: Sprout,
      },
      {
        title: 'ભુજમાં શાંત અને સલામત કેમ્પસ',
        description: 'બાળકો માટે સુરક્ષિત લાકડાનું ફર્નિચર, ૨૪/૭ સીસીટીવી કેમેરા અને વાલી ઓળખ આધારિત કડક પિક-અપ સુરક્ષા.',
        icon: ShieldCheck,
      },
    ],
    hi: [
      {
        title: 'प्रामाणिक मोंटेसरी वातावरण',
        description: 'डॉ. मारिया मोंटेसरी के सिद्धांतों पर आधारित विशेष लकड़ी के उपकरण और बच्चों के कद का फर्नीचर।',
        icon: Award,
      },
      {
        title: '१:८ शिक्षिका-बच्चा अनुपात',
        description: 'सीमित संख्या से प्रत्येक बच्चे पर व्यक्तिगत ध्यान, जिससे हर बच्चा बिना किसी दबाव के अपनी गति से सीखे।',
        icon: Heart,
      },
      {
        title: '१००% महिला शिक्षिकाएं व स्टाफ',
        description: 'प्रशिक्षित और स्नेही महिला शिक्षिकाओं द्वारा मातृत्वपूर्ण, सुरक्षित और प्रेरणादायक परिवेश।',
        icon: Sun,
      },
      {
        title: 'स्क्रीन-मुक्त, स्पर्श आधारित शिक्षा',
        description: 'मोबाइल या स्क्रीन के बिना, बच्चे अपने हाथों से उपकरणों को छूकर, अनुभव करके और समझकर सीखते हैं।',
        icon: Compass,
      },
      {
        title: 'व्यावहारिक जीवन में आत्मनिर्भरता',
        description: 'पानी डालना, सामान व्यवस्थित रखना और खुद से काम करने की आदत से बच्चों में आत्मविश्वास जगता है।',
        icon: Sprout,
      },
      {
        title: 'भुज में शांत व सुरक्षित परिसर',
        description: 'बच्चों के अनुकूल सुरक्षित फर्नीचर, २४/७ सीसीटीवी निगरानी और अभिभावक पहचान के सख्त नियम।',
        icon: ShieldCheck,
      },
    ],
  };

  const bannerText = {
    en: {
      title: 'Experience the Little Noor Difference in Person',
      desc: 'Join us for a peaceful morning observation and witness children happily concentrated on their work.',
      cta: 'Book a Classroom Visit',
    },
    gu: {
      title: 'Little Noor ના શાંત વાતાવરણનો જાતે અનુભવ કરો',
      desc: 'સવારના સત્રમાં શાળાની મુલાકાત લો અને બાળકોને પોતાની લગનથી આનંદપૂર્વક શીખતા નિહાળો.',
      cta: 'મુલાકાત બુક કરો',
    },
    hi: {
      title: 'Little Noor के शांत परिवेश का स्वयं अनुभव करें',
      desc: 'सुबह के सत्र में स्कूल आएं और बच्चों को लगन व आनंद के साथ सीखते हुए देखें।',
      cta: 'मुलाकात बुक करें',
    },
  };

  const activeReasons = reasonsData[currentLanguage] || reasonsData.en;
  const activeBanner = bannerText[currentLanguage] || bannerText.en;

  return (
    <section id="why-us" className="py-20 sm:py-28 bg-[#E2E8E0]/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E8E0] text-[#1E3A2B] text-xs font-semibold tracking-wider uppercase mb-4 border border-[#9CAF88]/30">
            <Leaf className="w-3.5 h-3.5 text-[#1E3A2B]" />
            <span>{t.whyUs.badge}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A2B] tracking-tight leading-tight">
            {t.whyUs.title} <br className="hidden sm:inline" />
            <span className="text-[#9CAF88] italic font-normal">{t.whyUs.titleAccent}</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#1E3A2B]/75 leading-relaxed font-sans max-w-2xl mx-auto">
            {t.whyUs.description}
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeReasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-8 rounded-3xl bg-[#FAF8F1] border border-[#9CAF88]/35 shadow-botanical-xs hover:shadow-botanical-md transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E2E8E0] border border-[#9CAF88]/40 flex items-center justify-center text-[#1E3A2B] group-hover:bg-[#1E3A2B] group-hover:text-white transition-all mb-5">
                  <Icon className="w-6 h-6 text-[#1E3A2B] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#1E3A2B] mb-2.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#1E3A2B]/75 leading-relaxed font-sans">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Editorial Callout Strip */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-[#1E3A2B] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-botanical-lg">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif-luxury text-2xl font-bold text-[#FAF8F1]">
              {activeBanner.title}
            </h4>
            <p className="text-xs sm:text-sm text-[#FAF8F1]/75 max-w-xl font-sans">
              {activeBanner.desc}
            </p>
          </div>
          <a
            href="#contact"
            className="px-7 py-3 rounded-full bg-[#9CAF88] hover:bg-[#8AA076] text-[#1E3A2B] hover:text-white text-xs sm:text-sm font-bold transition-all shrink-0 shadow-botanical-xs"
          >
            {activeBanner.cta}
          </a>
        </div>

      </div>
    </section>
  );
};
