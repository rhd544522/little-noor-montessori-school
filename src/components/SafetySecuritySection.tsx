import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  HeartPulse,
  Sparkles,
  Eye,
  CheckCircle2,
  Calendar,
  Phone,
  DoorClosed,
  Leaf,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { useLanguage } from '../context/LanguageContext';

interface SafetySecuritySectionProps {
  onOpenScheduleModal: () => void;
}

export const SafetySecuritySection: React.FC<SafetySecuritySectionProps> = ({
  onOpenScheduleModal,
}) => {
  const { t, currentLanguage } = useLanguage();

  const safetyData = {
    en: {
      metrics: [
        '100% Female Guides & Staff',
        '24/7 CCTV Campus Monitoring',
        'Authorized Parent Pickup Pass',
        'Child-Safe Rounded Furniture',
      ],
      pillars: [
        {
          id: 'visitor',
          tag: 'Access Control',
          title: 'Secure Campus Entry Protocol',
          description: 'Our campus gates remain secured during school hours with continuous visitor verification.',
          details: [
            'All visitor log records documented',
            'Single entry-point with gatekeeper',
            'Zero unauthorized campus roaming',
          ],
          icon: Lock,
        },
        {
          id: 'pickup',
          tag: 'Parent Identity',
          title: 'Authorized Pickup Pass System',
          description: 'Children are released exclusively to parents or designated guardians carrying school ID passes.',
          details: [
            'Physical ID verification at dismissal',
            'Emergency contact phone check',
            'Strict zero-handover without consent',
          ],
          icon: UserCheck,
        },
        {
          id: 'environment',
          tag: 'Prepared Space',
          title: 'Child-Safe Architecture',
          description: 'Every table, chair, and shelf is ergonomically scaled and softened for toddler safety.',
          details: [
            'Rounded non-toxic beechwood edges',
            'Covered electrical outlets & low plugs',
            'Anti-slip mats and gentle steps',
          ],
          icon: ShieldCheck,
        },
        {
          id: 'female-staff',
          tag: 'Loving Care',
          title: '100% Female Caregiving Team',
          description: 'Trained, background-verified female teachers and caretakers foster maternal warmth and comfort.',
          details: [
            'Dignified, gentle assistance with washrooms',
            'Attentive soothing for separation moments',
            'Consistent presence throughout all hours',
          ],
          icon: HeartPulse,
        },
        {
          id: 'hygiene',
          tag: 'Wellness & Cleanliness',
          title: 'Daily Sanitization Routine',
          description: 'Wooden Montessori apparatus, wash basins, and eating surfaces are cleaned daily.',
          details: [
            'Eco-friendly child-safe cleaning agents',
            'Handwashing rituals before & after meals',
            'Filtered RO drinking water stations',
          ],
          icon: Sparkles,
        },
        {
          id: 'cctv',
          tag: 'Surveillance',
          title: 'Continuous CCTV Oversight',
          description: 'Indoor learning environments and courtyard zones are under watchful video observation.',
          details: [
            'High-definition indoor & outdoor cameras',
            'Administered leadership oversight',
            'Secure storage of surveillance records',
          ],
          icon: Eye,
        },
      ],
      enforcedNotice: 'Protocol strictly enforced daily in Bhuj',
      auditBadge: 'Safety First',
      auditTitle: 'Inspect Our Safety Protocols In Person',
      auditDesc: 'Parents are warmly invited to inspect our campus security, sanitization, and child-safe fixtures during morning walkthroughs.',
      scheduleBtn: 'Book a Safety Walkthrough',
      callDesk: 'Call School Desk',
    },
    gu: {
      metrics: [
        '૧૦૦% મહિલા શિક્ષિકાઓ અને સ્ટાફ',
        '૨૪/૭ સીસીટીવી કેમેરા દેખરેખ',
        'વાલી ઓળખ કાર્ડ આધારિત પિક-અપ',
        'બાળકો માટે સુરક્ષિત લાકડાનું ફર્નિચર',
      ],
      pillars: [
        {
          id: 'visitor',
          tag: 'પ્રવેશ નિયંત્રણ',
          title: 'સુરક્ષિત શાળા પ્રવેશ નિયમો',
          description: 'શાળાના સમય દરમિયાન મુખ્ય દ્વાર હંમેશાં બંધ અને સુરક્ષિત રહે છે, અનધિકૃત વ્યક્તિઓનો પ્રવેશ નિષેધ છે.',
          details: [
            'મુલાકાતીઓની સંપૂર્ણ નોંધણી',
            'સુરક્ષા ગાર્ડ સાથે એક જ પ્રવેશ દ્વાર',
            'પરવાનગી વિના કેમ્પસમાં પ્રવેશ નહીં',
          ],
          icon: Lock,
        },
        {
          id: 'pickup',
          tag: 'વાલી ઓળખ',
          title: 'ઓળખ કાર્ડ આધારિત પિક-અપ નિયમ',
          description: 'બાળકોને ફક્ત સ્કૂલ આઈડી કાર્ડ ધરાવતા માતા-પિતા કે અધિકૃત વાલીને જ સોંપવામાં આવે છે.',
          details: [
            'છૂટતી વખતે આઈડી કાર્ડની ચકાસણી',
            'ઇમરજન્સી સંપર્ક નંબરની ખરાઈ',
            'વાલીની સંમતિ વગર કોઈને બાળક સોંપાતું નથી',
          ],
          icon: UserCheck,
        },
        {
          id: 'environment',
          tag: 'સજ્જ વર્ગખંડ',
          title: 'બાળકોને અનુકૂળ સુરક્ષિત બાંધકામ',
          description: 'દરેક ટેબલ, ખુરશી અને છાજલી નાના બાળકોની ઊંચાઈ અને સલામતીને ધ્યાનમાં રાખીને બનાવવામાં આવી છે.',
          details: [
            'ગોળ ખૂણાવાળું કુદરતી લાકડાનું ફર્નિચર',
            'સુરક્ષિત ઢંકાયેલા ઇલેક્ટ્રિક પ્લગ',
            'લપસી ન પડાય તેવા એન્ટિ-સ્લિપ મેટ્સ',
          ],
          icon: ShieldCheck,
        },
        {
          id: 'female-staff',
          tag: 'માતૃત્વસભર કાળજી',
          title: '૧૦૦% મહિલા શિક્ષિકાઓ અને સ્ટાફ',
          description: 'તાલીમબદ્ધ મહિલા શિક્ષિકાઓ અને સંભાળ રાખનાર સહાયકો બાળકને માતૃત્વનો સ્નેહ અને હૂંફ આપે છે.',
          details: [
            'વોશરૂમ અને સ્વચ્છતામાં સન્માનજનક સહાય',
            'ઘર યાદ આવતાં બાળકને સ્નેહથી સાચવવું',
            'સતત દરેક ક્ષણે બાળકની પડખે હાજરી',
          ],
          icon: HeartPulse,
        },
        {
          id: 'hygiene',
          tag: 'આરોગ્ય અને સ્વચ્છતા',
          title: 'રોજિંદી સંપૂર્ણ સેનિટાઈઝેશન',
          description: 'લાકડાના મોન્ટેસરી સાધનો, વોશ બેસિન અને નાસ્તાની જગ્યાઓ રોજેરોજ સ્વચ્છ કરવામાં આવે છે.',
          details: [
            'બાળકો માટે સલામત નેચરલ ક્લીનર્સ',
            'નાસ્તા પહેલાં અને પછી હાથ ધોવાની ટેવ',
            'શુદ્ધ RO ફિલ્ટર પીવાનું પાણી',
          ],
          icon: Sparkles,
        },
        {
          id: 'cctv',
          tag: 'કેમેરા દેખરેખ',
          title: 'સતત સીસીટીવી નિરીક્ષણ',
          description: 'વર્ગખંડો અને આંગણું હંમેશાં સીસીટીવી કેમેરાની કડક દેખરેખ હેઠળ રહે છે.',
          details: [
            'ઇન્ડોર અને આઉટડોર HD કેમેરા',
            'મેનેજમેન્ટ દ્વારા સતત મોનિટરિંગ',
            'રેકોર્ડિંગની સલામત જાળવણી',
          ],
          icon: Eye,
        },
      ],
      enforcedNotice: 'ભુજ કેમ્પસમાં દરરોજ કડક અમલ',
      auditBadge: 'સલામતી સર્વોપરી',
      auditTitle: 'શાળાની સુરક્ષા વ્યવસ્થા રૂબરૂ જુઓ',
      auditDesc: 'વાલીઓ સવારના સમયે આવીને અમારી સુરક્ષા વ્યવસ્થા, સ્વચ્છતા અને સુરક્ષિત વર્ગખંડો જાતે નિહાળી શકે છે.',
      scheduleBtn: 'સુરક્ષા મુલાકાત બુક કરો',
      callDesk: 'શાળા કાર્યાલયને કોલ કરો',
    },
    hi: {
      metrics: [
        '१००% महिला शिक्षिकाएं व स्टाफ',
        '२४/७ सीसीटीवी कैमरा निगरानी',
        'अभिभावक पहचान पास से पिक-अप',
        'बच्चों के अनुकूल सुरक्षित फर्नीचर',
      ],
      pillars: [
        {
          id: 'visitor',
          tag: 'प्रवेश नियंत्रण',
          title: 'सुरक्षित स्कूल प्रवेश व्यवस्था',
          description: 'स्कूल समय में मुख्य द्वार हमेशा बंद रहता है और अनाधिकृत व्यक्तियों का प्रवेश पूर्णतः वर्जित है।',
          details: [
            'आगंतुकों का पूरा रजिस्टर रिकॉर्ड',
            'सुरक्षा गार्ड युक्त एकल प्रवेश द्वार',
            'बिना अनुमति परिसर में आवाजाही नहीं',
          ],
          icon: Lock,
        },
        {
          id: 'pickup',
          tag: 'अभिभावक पहचान',
          title: 'पहचान पास आधारित पिक-अप प्रणाली',
          description: 'बच्चे केवल स्कूल आईडी पास धारक माता-पिता या अधिकृत अभिभावक को ही सौंपे जाते हैं।',
          details: [
            'छुट्टी के समय पहचान पत्र की जांच',
            'आपातकालीन संपर्क नंबर की पुष्टि',
            'बिना पूर्व सहमति किसी अन्य को सौंपना वर्जित',
          ],
          icon: UserCheck,
        },
        {
          id: 'environment',
          tag: 'सुसज्जित कक्षा',
          title: 'बच्चों के अनुकूल सुरक्षित वास्तुकला',
          description: 'हर मेज, कुर्सी और शेल्फ छोटे बच्चों की ऊंचाई और सुरक्षा को ध्यान में रखकर तैयार किए गए हैं।',
          details: [
            'गोल किनारों वाला विष-मुक्त लकड़ी का फर्नीचर',
            'सुरक्षित ढके हुए बिजली के बोर्ड व प्लग',
            'फिसलन-रोधी मैट और सुरक्षित सीढ़ियां',
          ],
          icon: ShieldCheck,
        },
        {
          id: 'female-staff',
          tag: 'मातृत्वपूर्ण देखभाल',
          title: '१००% महिला शिक्षिकाएं व सहयोगी दल',
          description: 'प्रशिक्षित महिला शिक्षिकाएं बच्चों को मां जैसा स्नेह, आत्मीयता और सुरक्षा का वातावरण देती हैं।',
          details: [
            'शौचालय व स्वच्छता में गरिमापूर्ण मदद',
            'शुरुआती दिनों में बच्चों को प्यार से संभालना',
            'हर पल बच्चों के साथ उपस्थिति',
          ],
          icon: HeartPulse,
        },
        {
          id: 'hygiene',
          tag: 'स्वास्थ्य व स्वच्छता',
          title: 'दैनिक गहन स्वच्छता नियम',
          description: 'लकड़ी के मोंटेसरी उपकरण, वॉश बेसिन और खाने की जगहें प्रतिदिन स्वच्छ की जाती हैं।',
          details: [
            'बच्चों के अनुकूल प्राकृतिक सफाई उत्पाद',
            'नाश्ते से पहले और बाद में हाथ धोने की आदत',
            'शुद्ध RO फिल्टर पेयजल सुविधा',
          ],
          icon: Sparkles,
        },
        {
          id: 'cctv',
          tag: 'कैमरा निगरानी',
          title: 'निरंतर सीसीटीवी निगरानी',
          description: 'कक्षाएं और खेल परिसर सदैव सीसीटीवी कैमरों की सतर्क निगरानी में रहते हैं।',
          details: [
            'इंडोर व आउटडोर एचडी कैमरे',
            'प्रबंधन द्वारा नियमित मॉनिटरिंग',
            'सुरक्षित डिजिटल रिकॉर्डिंग',
          ],
          icon: Eye,
        },
      ],
      enforcedNotice: 'भुज परिसर में प्रतिदिन कड़ाई से लागू',
      auditBadge: 'सुरक्षा सर्वोपरि',
      auditTitle: 'स्कूल की सुरक्षा व्यवस्था स्वयं आकर देखें',
      auditDesc: 'अभिभावकों का स्वागत है कि वे सुबह आकर स्कूल की सुरक्षा, स्वच्छता और बच्चों के अनुकूल व्यवस्था का प्रत्यक्ष निरीक्षण करें।',
      scheduleBtn: 'सुरक्षा वॉकथ्रू बुक करें',
      callDesk: 'स्कूल कार्यालय को कॉल करें',
    },
  };

  const activeData = safetyData[currentLanguage] || safetyData.en;
  const badgeIcons = [FileCheck, Eye, DoorClosed, AlertCircle];

  return (
    <section id="safety" className="py-20 sm:py-28 bg-[#FAF8F1] relative overflow-hidden">
      <div
        className="absolute top-1/4 -left-20 w-80 h-80 bg-[#E2E8E0]/60 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -right-20 w-96 h-96 bg-[#9CAF88]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E8E0] text-[#1E3A2B] text-xs font-semibold tracking-wider uppercase mb-4 border border-[#9CAF88]/30">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E3A2B]" />
            <span>{t.safety.badge}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A2B] tracking-tight leading-tight">
            {t.safety.title} <br className="hidden sm:inline" />
            <span className="text-[#9CAF88] italic font-normal">{t.safety.titleAccent}</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#1E3A2B]/75 leading-relaxed font-sans max-w-2xl mx-auto">
            {t.safety.description}
          </p>
        </div>

        {/* Reassurance Metric Badges Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {activeData.metrics.map((label, idx) => {
            const Icon = badgeIcons[idx % badgeIcons.length];
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-3.5 sm:p-4 rounded-2xl bg-white/90 border border-[#9CAF88]/35 shadow-botanical-xs flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-[#E2E8E0] border border-[#9CAF88]/40 flex items-center justify-center text-[#1E3A2B] shrink-0">
                  <Icon className="w-4 h-4 text-[#1E3A2B]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#1E3A2B] leading-tight">
                  {label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* 6 Safety Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {activeData.pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                id={`safety-card-${pillar.id}`}
                className="p-8 rounded-3xl bg-[#FAF8F1] border border-[#9CAF88]/35 shadow-botanical-xs hover:shadow-botanical-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-[#9CAF88]/40 flex items-center justify-center text-[#1E3A2B] shadow-2xs">
                      <Icon className="w-6 h-6 text-[#1E3A2B]" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#9CAF88] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E2E8E0]/70">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-xl font-bold text-[#1E3A2B] mb-2.5 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1E3A2B]/80 leading-relaxed font-sans mb-5">
                    {pillar.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-[#1E3A2B]/10 mb-6">
                    {pillar.details.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#9CAF88] shrink-0 mt-0.5" />
                        <span className="text-xs text-[#1E3A2B]/85 font-medium leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1E3A2B]/10 flex items-center gap-2 text-[11px] text-[#1E3A2B]/70 font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A2B]" />
                  <span>{activeData.enforcedNotice}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Safety Inspection Invitation Banner */}
        <div className="mt-14 sm:mt-18 p-8 sm:p-10 rounded-3xl bg-[#1E3A2B] text-white shadow-botanical-lg flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#9CAF88] text-xs font-semibold border border-[#9CAF88]/30">
              <Leaf className="w-3.5 h-3.5" />
              <span>{activeData.auditBadge}</span>
            </div>
            <h4 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white leading-tight">
              {activeData.auditTitle}
            </h4>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl font-sans leading-relaxed">
              {activeData.auditDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenScheduleModal}
              id="safety-book-walkthrough-btn"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#9CAF88] hover:bg-[#8AA076] text-[#1E3A2B] hover:text-white text-xs sm:text-sm font-bold transition-all shadow-botanical-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{activeData.scheduleBtn}</span>
            </button>

            <a
              href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`}
              id="safety-call-desk-btn"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-[#9CAF88]/40 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#9CAF88]" />
              <span>{activeData.callDesk}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
