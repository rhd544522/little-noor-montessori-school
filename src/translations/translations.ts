export type LanguageCode = 'en' | 'gu' | 'hi';

export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    philosophy: string;
    programs: string;
    safety: string;
    activities: string;
    gallery: string;
    faq: string;
    contact: string;
    bookVisit: string;
    callSchool: string;
    language: string;
    admissionsOpen: string;
    hours: string;
    subtitle: string;
    tagline: string;
    taglineWords: [string, string, string];
    menu: string;
  };
  hero: {
    badge: string;
    headlinePart1: string;
    headlinePart2: string;
    description: string;
    admissionsNotice: string;
    locationBadge: string;
    ratioBadge: string;
    timingBadge: string;
    ctaExplore: string;
    ctaVisit: string;
    quoteBadge: string;
    quoteText: string;
    quoteAuthor: string;
    staffBadgeTag: string;
    staffBadgeText: string;
  };
  about: {
    badge: string;
    title: string;
    description: string;
    cardTag: string;
    cardTitle: string;
    cardDesc: string;
    educatorName: string;
    educatorRole: string;
    imageLocation: string;
    imageCaption: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar4Title: string;
    pillar4Desc: string;
  };
  philosophy: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
    card4Title: string;
    card4Desc: string;
    quote: string;
  };
  programs: {
    badge: string;
    title: string;
    description: string;
    mostEnrolled: string;
    keyMilestones: string;
    inquireBtn: string;
    tourBtn: string;
    playhouse: {
      name: string;
      age: string;
      timing: string;
      ratio: string;
      desc: string;
      outcomes: string[];
    };
    nursery: {
      name: string;
      age: string;
      timing: string;
      ratio: string;
      desc: string;
      outcomes: string[];
    };
    srKg: {
      name: string;
      age: string;
      timing: string;
      ratio: string;
      desc: string;
      outcomes: string[];
    };
  };
  whyUs: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
  };
  activities: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
  };
  safety: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
    bookTourPrompt: string;
    scheduleBtn: string;
  };
  testimonials: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
  };
  gallery: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
  };
  faq: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
    searchPlaceholder: string;
    noResultsTitle: string;
    noResultsDesc: string;
    callSchool: string;
    haveQuestionTitle: string;
    haveQuestionDesc: string;
    bookVisitBtn: string;
    categories: {
      all: string;
      admissions: string;
      routines: string;
      safety: string;
      policies: string;
    };
    items: {
      q1: string;
      a1: string;
      p1: string[];
      q2: string;
      a2: string;
      p2: string[];
      q3: string;
      a3: string;
      p3: string[];
      q4: string;
      a4: string;
      p4: string[];
      q5: string;
      a5: string;
      p5: string[];
      q6: string;
      a6: string;
      p6: string[];
    };
  };
  contact: {
    badge: string;
    title: string;
    description: string;
    cardTitle: string;
    directPhone: string;
    callHours: string;
    campusLocation: string;
    locationNote: string;
    morningSessions: string;
    instagramStories: string;
    bookCampusTour: string;
    formTitle: string;
    formSubtitle: string;
    parentNameLabel: string;
    parentNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    childNameLabel: string;
    childNamePlaceholder: string;
    programLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
    sendAnotherBtn: string;
  };
  footer: {
    invitationBadge: string;
    quotePart1: string;
    quotePart2: string;
    invitationDesc: string;
    bookVisit: string;
    callUs: string;
    brandDesc: string;
    exploreTitle: string;
    hoursTitle: string;
    addressTitle: string;
    playhouseLabel: string;
    playhouseDays: string;
    nurseryLabel: string;
    nurseryDays: string;
    allRightsReserved: string;
    classInfo: string;
  };
  modal: {
    title: string;
    subtitle: string;
    dateLabel: string;
    timeLabel: string;
    parentName: string;
    childName: string;
    phone: string;
    submitBtn: string;
    closeBtn: string;
  };
  newsletter: {
    badge: string;
    title: string;
    subtitle: string;
    placeholder: string;
    subscribe: string;
    subscribing: string;
    errorEmpty: string;
    errorInvalid: string;
    successTitle: string;
    successDesc: string;
    registerAnother: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationSchema> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      philosophy: 'Montessori Method',
      programs: 'Programs',
      safety: 'Safety',
      activities: 'Activities',
      gallery: 'Gallery',
      faq: 'FAQ',
      contact: 'Contact',
      bookVisit: 'Book a Visit',
      callSchool: 'Call School',
      language: 'Language',
      admissionsOpen: 'Admissions Open 2025–26',
      hours: '9:00 AM – 11:30 AM',
      subtitle: 'MONTESSORI SCHOOL · BHUJ',
      tagline: 'Learn • Grow • Shine',
      taglineWords: ['Learn', 'Grow', 'Shine'],
      menu: 'Menu',
    },
    hero: {
      badge: 'Learn • Explore • Grow',
      headlinePart1: 'Where Natural Curiosity',
      headlinePart2: 'Grows Into Lifelong Joy.',
      description:
        'Welcome to Little Noor Montessori School in Bhuj. Here, children between 2 and 6 years learn through joyful touch, peaceful discovery, and authentic Montessori materials in thoughtfully prepared spaces.',
      admissionsNotice:
        'Playhouse: 9:00 AM – 11:00 AM · Nursery & Sr. Kg: 9:00 AM – 11:30 AM',
      locationBadge: 'Bhuj, Kutch, Gujarat',
      ratioBadge: '1:8 Intimate Guide Ratio',
      timingBadge: 'Morning Hours (9:00–11:30 AM)',
      ctaExplore: 'Explore Our School',
      ctaVisit: 'Book a Visit',
      quoteBadge: 'Prepared Natural Environment',
      quoteText: '“Help me to do it by myself.”',
      quoteAuthor: '— Dr. Maria Montessori',
      staffBadgeTag: 'Loving Care',
      staffBadgeText: '100% Female Guides & Attendants in Bhuj',
    },
    about: {
      badge: 'About Little Noor',
      title: 'Rooted in Respect for the Child’s Natural Journey.',
      description:
        'Little Noor is Bhuj’s authentic Montessori preschool environment. We honor the innate curiosity of children ages 2 to 6, cultivating confidence, self-discipline, and gentle joy through tactile learning.',
      cardTag: 'Little Noor Montessori School · Bhuj',
      cardTitle: 'Nurturing the light within every young mind.',
      cardDesc:
        'At Little Noor, we treat every child as an innate explorer. Within thoughtfully prepared environments, young minds discover independence, build deep concentration, and cultivate a lifelong love for learning through hands-on tactile discovery.',
      educatorName: 'Maria Montessori',
      educatorRole: 'Foundational Educational Pioneer',
      imageLocation: 'Bhuj, Kutch',
      imageCaption: 'Calm natural lighting, tactile wooden apparatus, and joyful exploration.',
      pillar1Title: '1:8 Teacher-Child Ratio',
      pillar1Desc:
        'Intimate attention ensures every child feels understood, safe, and nurtured by loving female guides.',
      pillar2Title: 'Child-Sized Prepared Rooms',
      pillar2Desc:
        'Furniture, wash stations, and shelves sized to child height to foster real daily independence.',
      pillar3Title: 'Joyful Self-Directed Pace',
      pillar3Desc:
        'Children select their learning apparatus freely, building deep concentration without artificial hurry.',
      pillar4Title: 'Grace & Courtesy Foundation',
      pillar4Desc:
        'Gentle everyday practice of gratitude, sharing snacks, respectful tidying, and peer empathy.',
    },
    philosophy: {
      badge: 'The Montessori Method',
      title: 'Education as an Aid to Life,',
      titleAccent: 'Not an Academic Race.',
      description:
        'Dr. Maria Montessori discovered that children possess an extraordinary absorbent mind. When surrounded by purposeful tools in a tranquil environment, learning becomes instinctive and joyful.',
      card1Title: 'Self-Directed Discovery',
      card1Desc:
        'Children choose work that aligns with their sensitive periods of growth, fostering authentic concentration and genuine pride in accomplishment.',
      card2Title: 'Hands-On Tactile Learning',
      card2Desc:
        'Abstract concepts in language, mathematics, and geography are first touched and felt through scientifically designed beechwood apparatus.',
      card3Title: 'Multi-Age Community',
      card3Desc:
        'Younger children learn by observing older peers, while older students reinforce mastery through gentle mentoring and empathy.',
      card4Title: 'Practical Life Mastery',
      card4Desc:
        'Daily pouring, spooning, polishing, and buttoning build fine-motor articulation, spatial order, and genuine self-reliance.',
      quote:
        '“The goal of early childhood education should be to activate the child’s own natural desire to learn.”',
    },
    programs: {
      badge: 'Classroom Levels & Batches',
      title: 'Curriculum Designed for Three Developmental Planes.',
      description:
        'From first steps away from home to confident kindergarten leadership, each classroom level offers developmentally aligned Montessori apparatus and warm personal mentorship.',
      mostEnrolled: 'Most Enrolled',
      keyMilestones: 'Key Growth Milestones:',
      inquireBtn: 'Inquire for Admission',
      tourBtn: 'Book a Campus Tour',
      playhouse: {
        name: 'Playhouse (Play Group)',
        age: '2.0 to 3.0 Years',
        timing: '9:00 AM – 11:00 AM',
        ratio: '1:6 to 1:8 Guide Ratio',
        desc: 'A gentle introduction to school life. Toddlers build language, sensory perception, and emotional confidence through tactile play in warm surroundings.',
        outcomes: [
          'Separation ease & emotional security',
          'Tactile sensorial & gross-motor exploration',
          'Practical life skills: pouring, hand-washing & tidying',
          'Speech emergence & vocabulary expansion',
        ],
      },
      nursery: {
        name: 'Nursery',
        age: '3.0 to 4.5 Years',
        timing: '9:00 AM – 11:30 AM',
        ratio: '1:8 Guide Ratio',
        desc: 'Foundational Montessori sensorial training, phonetic pre-reading with sandpaper letters, early numeracy, and creative art in prepared environments.',
        outcomes: [
          'Tactile sandpaper letters & phonetic sound awareness',
          'Sensorial dimensions: Pink Tower & Broad Stairs',
          'Grace and courtesy in social peer interactions',
          'Deep sustained focus through self-chosen apparatus',
        ],
      },
      srKg: {
        name: 'Senior KG',
        age: '4.5 to 6.0 Years',
        timing: '9:00 AM – 11:30 AM',
        ratio: '1:8 Guide Ratio',
        desc: 'Advanced language, moveable alphabet composition, mathematical decimal system, scientific living botany, and thoughtful primary school transition.',
        outcomes: [
          'Reading emergence with moveable alphabet',
          'Mathematical decimal understanding with golden beads',
          'Botany, geography puzzle maps & cultural inquiry',
          'Exceptional school readiness & personal responsibility',
        ],
      },
    },
    whyUs: {
      badge: 'Why Little Noor',
      title: 'A Loving Sanctuary in Bhuj,',
      titleAccent: 'Crafted for Early Wonder.',
      description:
        'Every detail of Little Noor is designed around the emotional, physical, and intellectual needs of early childhood.',
    },
    activities: {
      badge: 'Activities & Exploration',
      title: 'Six Tactile Pathways of',
      titleAccent: 'Curiosity, Craft & Discovery.',
      description:
        'Learning at Little Noor goes far beyond textbooks. Children explore real sensory and artistic materials designed for real little hands.',
    },
    safety: {
      badge: 'Safety & Security Standards',
      title: 'A Nurturing Sanctuary Where',
      titleAccent: 'Child Safety Comes First.',
      description:
        'Parents entrust us with their greatest treasure. We maintain the highest standards of physical hygiene, round-the-clock CCTV, and 100% female staff.',
      bookTourPrompt: 'Want to inspect our security protocols in person?',
      scheduleBtn: 'Book a Safety Walkthrough',
    },
    testimonials: {
      badge: 'Parent Reflections',
      title: 'Treasured Words from',
      titleAccent: 'Our Bhuj Parent Family.',
      description:
        'Discover how Little Noor has nurtured independence, calm focus, and joyful expression in our children.',
    },
    gallery: {
      badge: 'Visual Journey',
      title: 'Glimpses of Discovery,',
      titleAccent: 'Peace & Joyful Work.',
      description:
        'Step inside our bright, serene classrooms where every shelf is an invitation to explore.',
    },
    faq: {
      badge: 'Frequently Asked Questions',
      title: 'Clear Answers for',
      titleAccent: 'Thoughtful Parents.',
      description:
        'Everything you need to know regarding admissions, our unhurried Montessori rhythm, child security, and morning routines at Little Noor in Bhuj.',
      searchPlaceholder: 'Search timings, admission, safety...',
      noResultsTitle: 'No questions found matching your search.',
      noResultsDesc: 'Please reach out to our admission counselors directly.',
      callSchool: 'Call School',
      haveQuestionTitle: 'Have a specific question about your child?',
      haveQuestionDesc: 'Our guides are always available to help parents navigate early childhood education.',
      bookVisitBtn: 'Book a Visit',
      categories: {
        all: 'All Queries',
        admissions: 'Admissions',
        routines: 'Routines & Timings',
        safety: 'Safety & Staff',
        policies: 'Montessori Method',
      },
      items: {
        q1: 'What is the admission procedure and age eligibility for 2025–26?',
        a1: 'We welcome children across three environments: Playhouse (ages 2 to 3 years), Nursery (ages 3 to 4 years), and Sr. Kg (ages 4 to 6 years). Little Noor follows an unhurried, gentle admission philosophy. There are strictly no entrance tests, stressful interviews, or academic assessments for young children.',
        p1: [
          'Playhouse: 2–3 years (Gentle transition & sensory discovery)',
          'Nursery: 3–4 years (Language emergence & sensorial apparatus)',
          'Sr. Kg: 4–6 years (Montessori mathematics, reading & leadership)',
          'Strictly no entrance test or exam pressure for children',
        ],
        q2: 'What documents are required to complete the enrollment process?',
        a2: 'To complete admission, parents provide the child’s birth certificate, Aadhaar card copy, recent passport-sized photographs, and the completed school application form.',
        p2: [
          'Child’s official Birth Certificate',
          'Aadhaar Card copy of the child',
          '3 passport size photographs of the child',
          'Completed school admission form',
        ],
        q3: 'What are the school timings and days of operation in Bhuj?',
        a3: 'Playhouse runs Monday to Friday from 9:00 AM to 11:00 AM (Saturday & Sunday Holiday). Nursery and Sr. Kg run Monday to Saturday from 9:00 AM to 11:30 AM (Sunday Holiday). Observation visits are scheduled between 9:00 AM and 11:30 AM on working days.',
        p3: [
          'Playhouse: 9:00 AM – 11:00 AM (Mon to Fri; Saturday Holiday)',
          'Nursery: 9:00 AM – 11:30 AM (Mon to Sat)',
          'Sr. Kg: 9:00 AM – 11:30 AM (Mon to Sat)',
          'Observation visits: 9:00 AM – 11:30 AM',
        ],
        q4: 'What safety measures and female staff support are provided?',
        a4: 'We maintain 100% female teaching and caretaking staff, 24/7 CCTV surveillance across all indoor and outdoor areas, rounded child-safe wooden furniture, and strict parent ID authorization pick-up passes.',
        p4: [
          '100% female guides & loving attendants',
          'Full CCTV monitoring in all learning areas',
          'Rounded, non-toxic wooden child furniture',
          'Mandatory parent pickup pass required',
        ],
        q5: 'How does Montessori learning differ from traditional pre-schools?',
        a5: 'Instead of rote memorization or forced desk seating, children learn through authentic Montessori wooden apparatus, developing tactile perception, self-chosen focus, hand-eye coordination, and joyful problem solving at their own natural speed.',
        p5: [
          'Hands-on tactile wooden apparatus instead of screens or rote work',
          'Self-directed learning choices guided by certified educators',
          'Focus on practical life skills, independence, and social grace',
          'Unhurried development respecting each child’s rhythm',
        ],
        q6: 'Can parents visit and observe the classroom before enrolling?',
        a6: 'Yes! We warmly invite parents to schedule an in-person walkthrough during morning sessions (9:00 AM – 11:30 AM) to experience the calm learning atmosphere firsthand.',
        p6: [
          'Guided campus tours during working morning hours',
          'Meet our certified female guides in person',
          'Observe genuine Montessori environments and materials',
          'Book online or call +91 99789 12364 directly',
        ],
      },
    },
    contact: {
      badge: 'Connect & Admissions',
      title: 'We Welcome Your Family to Little Noor.',
      description:
        'Schedule a peaceful classroom observation or get in touch with our admissions coordinator for the 2025–26 academic batch in Bhuj.',
      cardTitle: 'School Coordinates',
      directPhone: 'Direct Telephone',
      callHours: 'Call between 8:30 AM and 1:00 PM',
      campusLocation: 'Campus Location',
      locationNote: 'Peaceful, green residential enclave',
      morningSessions: 'Morning Sessions',
      instagramStories: 'Instagram Stories',
      bookCampusTour: 'Book a Campus Tour',
      formTitle: 'Send an Admission Inquiry',
      formSubtitle: 'Leave your details below and our team will get back to you within 24 hours.',
      parentNameLabel: 'Parent’s Full Name *',
      parentNamePlaceholder: 'e.g. Fatima / Rajesh Shah',
      phoneLabel: 'Contact Number (WhatsApp) *',
      phonePlaceholder: '+91 99789 12364',
      childNameLabel: 'Child’s Name',
      childNamePlaceholder: 'e.g. Noor / Aarav',
      programLabel: 'Program of Interest',
      messageLabel: 'Message or Questions',
      messagePlaceholder:
        'Share any questions about routines, previous school experience, or observation visits...',
      submitBtn: 'Submit Inquiry',
      successTitle: 'Thank You, Inquiry Received!',
      successDesc:
        'We have received your admission inquiry. Our coordinator will contact you shortly.',
      sendAnotherBtn: 'Send Another Inquiry',
    },
    footer: {
      invitationBadge: 'Begin The Journey',
      quotePart1: '“Every Child Carries Within Them a',
      quotePart2: 'Universe Waiting to Unfold.”',
      invitationDesc:
        'Give your child the gift of a tranquil, child-centered start. Come see how Little Noor honors their curiosity and natural joy in Bhuj.',
      bookVisit: 'Book a Visit',
      callUs: 'Call School',
      brandDesc:
        'Authentic Montessori early childhood learning rooted in respect for the child, prepared natural spaces, and tactile exploration in Bhuj.',
      exploreTitle: 'Explore Our Campus',
      hoursTitle: 'School Hours',
      addressTitle: 'Campus Address',
      playhouseLabel: 'Playhouse',
      playhouseDays: 'Mon – Fri (Sat/Sun Off)',
      nurseryLabel: 'Nursery & Sr. Kg',
      nurseryDays: 'Mon – Sat (Sunday Off)',
      allRightsReserved: 'All rights reserved.',
      classInfo: 'Montessori Education for Early Childhood · Play group to Sr. Kg',
    },
    modal: {
      title: 'Book a Campus Tour',
      subtitle: 'Experience our calm Montessori environment in Bhuj firsthand.',
      dateLabel: 'Preferred Tour Date',
      timeLabel: 'Preferred Morning Slot (9:00 – 11:30 AM)',
      parentName: 'Parent’s Full Name',
      childName: 'Child’s Name & Age',
      phone: 'WhatsApp / Phone Number',
      submitBtn: 'Confirm Visit Appointment',
      closeBtn: 'Close',
    },
    newsletter: {
      badge: 'Gentle Monthly Letters',
      title: 'Join Our Parenting Newsletter',
      subtitle: 'Receive monthly thoughts on child autonomy, practical life at home, and sensitive periods from our Little Noor guides in Bhuj.',
      placeholder: 'Enter your email address...',
      subscribe: 'Subscribe',
      subscribing: 'Subscribing...',
      errorEmpty: 'Please enter your email address.',
      errorInvalid: 'Please enter a valid email address (e.g., name@domain.com).',
      successTitle: 'Welcome to the Circle',
      successDesc: 'We’ve welcomed {email} to our monthly letters. No spam—only thoughtful child development insights.',
      registerAnother: 'Register another email address',
    },
  },

  gu: {
    nav: {
      home: 'હોમ',
      about: 'શાળા વિશે',
      philosophy: 'મોન્ટેસરી પદ્ધતિ',
      programs: 'પ્રોગ્રામ્સ',
      safety: 'સુરક્ષા',
      activities: 'પ્રવૃત્તિઓ',
      gallery: 'ગેલેરી',
      faq: 'પ્રશ્નોત્તરી (FAQ)',
      contact: 'સંપર્ક',
      bookVisit: 'મુલાકાત બુક કરો',
      callSchool: 'શાળાને કોલ કરો',
      language: 'ભાષા',
      admissionsOpen: 'પ્રવેશ શરૂ છે ૨૦૨૫–૨૬',
      hours: 'સવારે ૯:૦૦ થી ૧૧:૩૦',
      subtitle: 'મોન્ટેસરી સ્કૂલ · ભુજ',
      tagline: 'શીખો • ખીલો • ચમકો',
      taglineWords: ['શીખો', 'ખીલો', 'ચમકો'],
      menu: 'મેનુ',
    },
    hero: {
      badge: 'શીખો • અન્વેષણ કરો • આગળ વધો',
      headlinePart1: 'જ્યાં બાળકની કુદરતી જિજ્ઞાસા',
      headlinePart2: 'આજીવન આનંદ અને જ્ઞાન બને છે.',
      description:
        'ભુજમાં Little Noor Montessori School માં આપનું હાર્દિક સ્વાગત છે. અહીં ૨ થી ૬ વર્ષના બાળકો કુદરતી વાતાવરણમાં, પ્રેમપૂર્વક અને સ્પર્શ આધારિત મોન્ટેસરી સાધનો દ્વારા આનંદથી શીખે છે.',
      admissionsNotice:
        'પ્લેહાઉસ: સવારે ૯:૦૦ થી ૧૧:૦૦ · નર્સરી અને સિનિયર કેજી: સવારે ૯:૦૦ થી ૧૧:૩૦',
      locationBadge: 'ભુજ, કચ્છ, ગુજરાત',
      ratioBadge: '૧:૮ શિક્ષિકા-બાળક ગુણોત્તર',
      timingBadge: 'સવારનો સમય (૯:૦૦ થી ૧૧:૩૦)',
      ctaExplore: 'અમારી શાળા જાણો',
      ctaVisit: 'મુલાકાત બુક કરો',
      quoteBadge: 'કુદરતી સજ્જ વાતાવરણ',
      quoteText: '“મને મારી જાતે શીખવામાં મદદ કરો.”',
      quoteAuthor: '— ડૉ. મારિયા મોન્ટેસરી',
      staffBadgeTag: 'પ્રેમાળ સંભાળ',
      staffBadgeText: 'ભુજમાં ૧૦૦% મહિલા શિક્ષિકાઓ અને સ્ટાફ',
    },
    about: {
      badge: 'Little Noor વિશે',
      title: 'બાળકના સહજ વિકાસ અને આત્મવિશ્વાસનો આદર.',
      description:
        'Little Noor એ ભુજની પ્રમાણિક મોન્ટેસરી પૂર્વ-પ્રાથમિક શાળા છે. અમે ૨ થી ૬ વર્ષના બાળકોની જિજ્ઞાસાનું સન્માન કરીએ છીએ અને પ્રવૃત્તિઓ દ્વારા તેમનો સર્વાંગી વિકાસ સાધીએ છીએ.',
      cardTag: 'Little Noor Montessori School · ભુજ',
      cardTitle: 'દરેક બાળકની અંદર રહેલી ક્ષમતાને ખીલવવી.',
      cardDesc:
        'Little Noor માં અમે દરેક બાળકને એક સહજ સંશોધક ગણીએ છીએ. શાંત અને વિચારપૂર્વક તૈયાર કરેલા વર્ગખંડોમાં, બાળકો પોતાની ગતિએ સ્વાવલંબન અને ઊંડી એકાગ્રતા કેળવે છે.',
      educatorName: 'મારિયા મોન્ટેસરી',
      educatorRole: 'મૂળભૂત શિક્ષણ પદ્ધતિના પ્રણેતા',
      imageLocation: 'ભુજ, કચ્છ',
      imageCaption: 'કુદરતી પ્રકાશ, લાકડાના સુંદર મોન્ટેસરી સાધનો અને આનંદમય શિક્ષણ.',
      pillar1Title: '૧:૮ શિક્ષિકા-બાળક ગુણોત્તર',
      pillar1Desc:
        'ઓછા વિદ્યાર્થીઓએ દરેક બાળક પર વ્યક્તિગત પ્રેમ અને યોગ્ય માર્ગદર્શન મળી રહે છે.',
      pillar2Title: 'બાળકના કદ અનુસાર સજ્જ રૂમ',
      pillar2Desc:
        'બાળકોની ઊંચાઈ મુજબનું ફર્નિચર અને સાધનો, જેથી બાળક સંપૂર્ણપણે આત્મનિર્ભર બને.',
      pillar3Title: 'પોતાની સહજ ગતિએ શિક્ષણ',
      pillar3Desc:
        'કોઈપણ પ્રકારના દબાણ વિના, બાળક પોતાની પસંદગીના સાધનો સાથે ઊંડાણપૂર્વક અભ્યાસ કરે છે.',
      pillar4Title: 'શિષ્ટાચાર અને સ્નેહના સંસ્કાર',
      pillar4Desc:
        'રોજિંદા જીવનમાં આભાર માનવો, નાસ્તો વહેંચવો અને સહપાઠીઓ પ્રત્યે સહાનુભૂતિ શીખવવામાં આવે છે.',
    },
    philosophy: {
      badge: 'મોન્ટેસરી પદ્ધતિ',
      title: 'જીવન ઘડતરનું સાચું શિક્ષણ,',
      titleAccent: 'કોઈ ગોખણપટ્ટી કે સ્પર્ધા નહીં.',
      description:
        'ડૉ. મારિયા મોન્ટેસરીએ શોધ્યું કે નાના બાળકોનું મન અતિ ગ્રહણશીલ હોય છે. જ્યારે તેમને યોગ્ય સાધનો અને શાંત વાતાવરણ મળે, ત્યારે શીખવું સહજ આનંદ બની જાય છે.',
      card1Title: 'સ્વ-પ્રેરિત શિક્ષણ',
      card1Desc:
        'બાળક પોતાની રુચિ મુજબના સાધનો પસંદ કરે છે, જેથી તેનામાં સ્વાભાવિક એકાગ્રતા અને આત્મવિશ્વાસ વધે છે.',
      card2Title: 'સ્પર્શ અને અનુભવ આધારિત જ્ઞાન',
      card2Desc:
        'ભાષા, ગણિત અને ભૂગોળ જેવા વિષયો પુસ્તકીય ગોખણપટ્ટીને બદલે લાકડાના વિશિષ્ટ સાધનોને સ્પર્શીને સમજાય છે.',
      card3Title: 'મિશ્ર વયજૂથનું વાતાવરણ',
      card3Desc:
        'નાના બાળકો મોટા ભાઈ-બહેનોને જોઈને શીખે છે અને મોટા બાળકો નાનાઓને સ્નેહથી માર્ગદર્શન આપે છે.',
      card4Title: 'વ્યવહારુ જીવન કૌશલ્ય',
      card4Desc:
        'પાણી રેડવું, સાફસફાઈ, કપડાંની ગડી અને બટન બંધ કરવા જેવી પ્રવૃત્તિઓથી આંગળીઓ અને મગજનો સમન્વય બને છે.',
      quote:
        '“પ્રારંભિક શિક્ષણનું ધ્યેય બાળકની અંદર રહેલી શીખવાની કુદરતી ઇચ્છાને જાગ્રત કરવાનું છે.”',
    },
    programs: {
      badge: 'વર્ગો અને સમયપત્રક',
      title: 'બાળકના વિકાસના તબક્કા મુજબ તૈયાર કરેલો અભ્યાસક્રમ.',
      description:
        'ઘરથી શાળા સુધીના પ્રથમ ડગલાંથી માંડીને પ્રાથમિક શાળાની તૈયારી સુધી, દરેક વર્ગમાં સ્નેહાળ શિક્ષિકાઓની દેખરેખ રહે છે.',
      mostEnrolled: 'સૌથી લોકપ્રિય વર્ગ',
      keyMilestones: 'મુખ્ય વિકાસના સીમાચિહ્નો:',
      inquireBtn: 'પ્રવેશ માટે પૂછપરછ કરો',
      tourBtn: 'શાળા મુલાકાત બુક કરો',
      playhouse: {
        name: 'પ્લેહાઉસ (Play Group)',
        age: '૨.૦ થી ૩.૦ વર્ષ',
        timing: 'સવારે ૯:૦૦ થી ૧૧:૦૦',
        ratio: '૧:૬ થી ૧:૮ ગુણોત્તર',
        desc: 'શાળા જીવનની મમતાભરી શરૂઆત. બાળકો પ્રેમાળ વાતાવરણમાં ભાષા, ઇન્દ્રિયો અને લાગણીઓનો વિકાસ કરે છે.',
        outcomes: [
          'ઘરથી અલગ થવાનો ડર દૂર થઈ સુરક્ષાનો અનુભવ',
          'ઇન્દ્રિયો અને સ્નાયુઓનો સંતુલિત વિકાસ',
          'રોજિંદી ટેવો: હાથ ધોવા, વસ્તુઓ યોગ્ય જગ્યાએ મૂકવી',
          'સ્પષ્ટ બોલવાની શરૂઆત અને નવા શબ્દોનો ભંડાર',
        ],
      },
      nursery: {
        name: 'નર્સરી (Nursery)',
        age: '૩.૦ થી ૪.૫ વર્ષ',
        timing: 'સવારે ૯:૦૦ થી ૧૧:૩૦',
        ratio: '૧:૮ ગુણોત્તર',
        desc: 'મોન્ટેસરી સાધનો, સેન્ડપેપર અક્ષરો દ્વારા ધ્વનિ સમજ, પ્રારંભિક ગણિત અને કલાત્મક સર્જનશીલતા.',
        outcomes: [
          'સેન્ડપેપર અક્ષરો વડે અવાજ અને વર્ણમાળાની ઓળખ',
          'ઇન્દ્રિય સાધનો: પિંક ટાવર અને બ્રોડ સ્ટેર્સ',
          'મિત્રો સાથે વાતચીત અને શિષ્ટાચારના સંસ્કાર',
          'મનપસંદ સાધનો સાથે લાંબો સમય એકાગ્રતાથી કામ કરવું',
        ],
      },
      srKg: {
        name: 'સિનિયર કેજી (Senior KG)',
        age: '૪.૫ થી ૬.૦ વર્ષ',
        timing: 'સવારે ૯:૦૦ થી ૧૧:૩૦',
        ratio: '૧:૮ ગુણોત્તર',
        desc: 'વાંચન-લેખન, ગોલ્ડન બીડ્સ દ્વારા ગણિતની દશાંશ પદ્ધતિ, વનસ્પતિશાસ્ત્ર અને પ્રાથમિક શાળા માટે સંપૂર્ણ તૈયારી.',
        outcomes: [
          'મૂવેબલ આલ્ફાબેટ દ્વારા શબ્દ બનાવટ અને વાંચન',
          'ગોલ્ડન બીડ્સ દ્વારા એકમ, દશક, સો અને હજારની સ્પષ્ટ સમજ',
          'વનસ્પતિ, પઝલ મેપ્સ અને સામાન્ય જ્ઞાનની જિજ્ઞાસા',
          'આગળના પ્રાથમિક શિક્ષણ માટે સંપૂર્ણ આત્મવિશ્વાસ',
        ],
      },
    },
    whyUs: {
      badge: 'શા માટે Little Noor',
      title: 'ભુજમાં બાળકો માટે એક સ્નેહાળ શાળા,',
      titleAccent: 'જ્યાં બાળપણ સચવાય છે.',
      description:
        'Little Noor ની પ્રત્યેક વ્યવસ્થા નાના બાળકની શારીરિક, માનસિક અને લાગણીમય જરૂરિયાતોને ધ્યાનમાં રાખીને બનાવવામાં આવી છે.',
    },
    activities: {
      badge: 'પ્રવૃત્તિઓ અને સર્જન',
      title: 'જિજ્ઞાસા અને સર્જનાત્મકતાના',
      titleAccent: 'છ પ્રાયોગિક માર્ગો.',
      description:
        'Little Noor માં શિક્ષણ માત્ર ચોપડીઓ પૂરતું નથી. બાળકો પોતાના હાથથી વાસ્તવિક સાધનો વડે પ્રયોગ કરીને શીખે છે.',
    },
    safety: {
      badge: 'સુરક્ષા અને સ્ટાફના માપદંડ',
      title: 'એક સુરક્ષિત અને નિર્ભય વાતાવરણ,',
      titleAccent: 'જ્યાં બાળકની સુરક્ષા સર્વોપરી છે.',
      description:
        'વાલીઓ તેમના વહાલસોયા સંતાનો અમને સોંપે છે. અમે સંપૂર્ણ સ્વચ્છતા, ૨૪ કલાક CCTV અને ૧૦૦% મહિલા સ્ટાફની સુરક્ષા પૂરી પાડીએ છીએ.',
      bookTourPrompt: 'શાળાની સુરક્ષા વ્યવસ્થા રૂબરૂ જોવા માંગો છો?',
      scheduleBtn: 'સુરક્ષા નિરીક્ષણ બુક કરો',
    },
    testimonials: {
      badge: 'વાલીઓના અભિપ્રાય',
      title: 'અમારા ભુજના વાલીઓ તરફથી',
      titleAccent: 'હૃદયસ્પર્શી અનુભવો.',
      description:
        'જાણો કે Little Noor એ તેમના બાળકોમાં સ્વાવલંબન, એકાગ્રતા અને સહજ આનંદ કેવી રીતે કેળવ્યો.',
    },
    gallery: {
      badge: 'શાળાની ઝાંખી',
      title: 'અન્વેષણ, શાંતિ અને',
      titleAccent: 'આનંદમય ક્ષણોની તસવીરો.',
      description:
        'અમારા અજવાળાવાળા અને શાંત વર્ગખંડો જુઓ જ્યાં દરેક ખૂણો બાળકને શીખવા માટે પ્રેરિત કરે છે.',
    },
    faq: {
      badge: 'અવારનવાર પૂછાતા પ્રશ્નો (FAQ)',
      title: 'વાલીઓના સામાન્ય પ્રશ્નોના',
      titleAccent: 'સ્પષ્ટ અને સચોટ જવાબો.',
      description:
        'પ્રવેશ પ્રક્રિયા, મોન્ટેસરી શિક્ષણ પદ્ધતિ, બાળ સુરક્ષા અને સમયપત્રક વિશેની સંપૂર્ણ માહિતી.',
      searchPlaceholder: 'સમય, પ્રવેશ, સુરક્ષા વિશે શોધો...',
      noResultsTitle: 'આ શબ્દ સંબંધિત કોઈ પ્રશ્ન મળ્યો નથી.',
      noResultsDesc: 'કૃપા કરીને અમારા પ્રવેશ સંયોજકનો સીધો સંપર્ક કરો.',
      callSchool: 'શાળાને કોલ કરો',
      haveQuestionTitle: 'તમારા બાળક વિશે કોઈ ચોક્કસ પ્રશ્ન છે?',
      haveQuestionDesc: 'અમારી અનુભવી શિક્ષિકાઓ વાલીઓને માર્ગદર્શન આપવા હંમેશાં હાજર છે.',
      bookVisitBtn: 'મુલાકાત બુક કરો',
      categories: {
        all: 'બધા પ્રશ્નો',
        admissions: 'પ્રવેશ પ્રક્રિયા',
        routines: 'સમય અને નિયમો',
        safety: 'સુરક્ષા અને સ્ટાફ',
        policies: 'મોન્ટેસરી પદ્ધતિ',
      },
      items: {
        q1: 'વર્ષ ૨૦૨૫–૨૬ માટે પ્રવેશ પ્રક્રિયા અને વય મર્યાદા શું છે?',
        a1: 'અમારી શાળામાં ત્રણ વર્ગો છે: પ્લેહાઉસ (૨ થી ૩ વર્ષ), નર્સરી (૩ થી ૪ વર્ષ), અને સિનિયર કેજી (૪ થી ૬ વર્ષ). Little Noor માં કોઈ કસોટી કે ઇન્ટરવ્યુ લેવામાં આવતો નથી. પ્રવેશ સરળ અને તણાવમુક્ત છે.',
        p1: [
          'પ્લેહાઉસ: ૨ થી ૩ વર્ષ (સહજ શરૂઆત અને સંવેદનાત્મક વિકાસ)',
          'નર્સરી: ૩ થી ૪ વર્ષ (ભાષા અને મોન્ટેસરી સાધનોની ઓળખ)',
          'સિનિયર કેજી: ૪ થી ૬ વર્ષ (ગણિત, વાંચન અને શાળા તૈયારી)',
          'બાળકો માટે કોઈ પણ પ્રકારની પરીક્ષા કે ઇન્ટરવ્યુ નથી',
        ],
        q2: 'પ્રવેશ માટે કયા કયા દસ્તાવેજોની જરૂર પડે છે?',
        a2: 'પ્રવેશ પ્રક્રિયા પૂર્ણ કરવા માટે બાળકનું જન્મનું પ્રમાણપત્ર (Birth Certificate), આધાર કાર્ડની નકલ, ૩ પાસપોર્ટ સાઇઝના ફોટોગ્રાફ્સ અને ભરેલું પ્રવેશ ફોર્મ જરૂરી છે.',
        p2: [
          'બાળકનું અધિકૃત જન્મ પ્રમાણપત્ર',
          'બાળકના આધાર કાર્ડની નકલ',
          'બાળકના ૩ પાસપોર્ટ સાઈઝના ફોટા',
          'શાળાનું ભરેલું પ્રવેશ ફોર્મ',
        ],
        q3: 'ભુજમાં શાળાનો સમય અને દિવસો કયા કયા છે?',
        a3: 'પ્લેહાઉસ સોમવારથી શુક્રવાર સવારે ૯:૦૦ થી ૧૧:૦૦ ચાલે છે (શનિ-રવિ રજા). નર્સરી અને સિનિયર કેજી સોમવારથી શનિવાર સવારે ૯:૦૦ થી ૧૧:૩૦ ચાલે છે (રવિવાર રજા). વાલીઓ સવારે ૯:૦૦ થી ૧૧:૩૦ દરમિયાન મુલાકાત લઈ શકે છે.',
        p3: [
          'પ્લેહાઉસ: સવારે ૯:૦૦ થી ૧૧:૦૦ (સોમથી શુક્ર; શનિવાર રજા)',
          'નર્સરી: સવારે ૯:૦૦ થી ૧૧:૩૦ (સોમથી શનિ)',
          'સિનિયર કેજી: સવારે ૯:૦૦ થી ૧૧:૩૦ (સોમથી શનિ)',
          'રૂબરૂ મુલાકાતનો સમય: સવારે ૯:૦૦ થી ૧૧:૩૦',
        ],
        q4: 'બાળકોની સુરક્ષા માટે કયાં પગલાં લેવામાં આવે છે?',
        a4: 'અમારી પાસે ૧૦૦% મહિલા શિક્ષિકાઓ અને કેરટેકર સ્ટાફ છે. સમગ્ર શાળામાં ૨૪ કલાક CCTV કેમેરા, ગોળાકાર ખૂણાવાળું બાળ-સુરક્ષિત લાકડાનું ફર્નિચર અને વાલી ઓળખ કાર્ડ સિસ્ટમ છે.',
        p4: [
          '૧૦૦% મહિલા શિક્ષિકાઓ અને પ્રેમાળ સહાયકો',
          'તમામ રૂમ અને ગ્રાઉન્ડમાં CCTV કેમેરા',
          'બાળકોને વાગે નહીં તેવું સુરક્ષિત લાકડાનું ફર્નિચર',
          'બાળકને લેવા માટે વાલી ઓળખ પાસ ફરજિયાત',
        ],
        q5: 'મોન્ટેસરી શિક્ષણ સામાન્ય શાળાઓથી કેવી રીતે અલગ છે?',
        a5: 'ગોખણપટ્ટી કે એક જ જગ્યાએ બેસાડી રાખવાને બદલે, બાળકો વૈજ્ઞાનિક રીતે બનાવેલા લાકડાના સાધનોને અડીને, જાતે અનુભવીને પોતાની ગતિએ શીખે છે.',
        p5: [
          'મોબાઇલ સ્ક્રીન કે ગોખણપટ્ટી વગર વાસ્તવિક સાધનો વડે શિક્ષણ',
          'શિક્ષિકાના માર્ગદર્શન હેઠળ પોતાની પસંદગીનું કાર્ય',
          'રોજિંદા જીવનની આત્મનિર્ભરતા અને શિષ્ટાચાર પર ભાર',
          'બાળકની કુદરતી ગતિનું સન્માન',
        ],
        q6: 'શું પ્રવેશ લેતાં પહેલાં વાલીઓ શાળાની મુલાકાત લઈ શકે છે?',
        a6: 'હા! અમે વાલીઓને સવારના સત્રમાં (૯:૦૦ થી ૧૧:૩૦) રૂબરૂ પધારીને શાંત વર્ગખંડો અને બાળકોની પ્રવૃત્તિઓ નિહાળવા ભાવભર્યું આમંત્રણ આપીએ છીએ.',
        p6: [
          'શાળા ચાલુ હોય તે દરમિયાન વર્ગખંડ નિરીક્ષણ',
          'અમારી પ્રમાણિત મહિલા શિક્ષિકાઓને રૂબરૂ મળો',
          'વાસ્તવિક મોન્ટેસરી વાતાવરણનો અનુભવ કરો',
          'ઓનલાઇન બુક કરો અથવા +91 99789 12364 પર કોલ કરો',
        ],
      },
    },
    contact: {
      badge: 'સંપર્ક અને પ્રવેશ',
      title: 'અમે આપના પરિવારનું Little Noor માં સ્વાગત કરીએ છીએ.',
      description:
        'ભુજમાં ૨૦૨૫–૨૬ સત્ર માટે વર્ગખંડ નિરીક્ષણ બુક કરો અથવા પ્રવેશ સંયોજક સાથે વાતચીત કરો.',
      cardTitle: 'શાળા સરનામું અને સંપર્ક',
      directPhone: 'ફોન નંબર',
      callHours: 'સવારે ૮:૩૦ થી બપોરે ૧:૦૦ દરમિયાન કોલ કરો',
      campusLocation: 'શાળાનું સરનામું',
      locationNote: 'શાંત, હરિયાળો રહેણાંક વિસ્તાર',
      morningSessions: 'શાળાનો સવારનો સમય',
      instagramStories: 'ઇન્સ્ટાગ્રામ પેજ',
      bookCampusTour: 'શાળા મુલાકાત બુક કરો',
      formTitle: 'પ્રવેશ માટે પૂછપરછ મોકલો',
      formSubtitle: 'નીચે આપની વિગતો ભરો, અમારી ટીમ ૨૪ કલાકમાં આપનો સંપર્ક કરશે.',
      parentNameLabel: 'વાલીનું પૂરું નામ *',
      parentNamePlaceholder: 'દા.ત. ફાતિમા / રાજેશ શાહ',
      phoneLabel: 'મોબાઇલ નંબર (WhatsApp) *',
      phonePlaceholder: '+91 99789 12364',
      childNameLabel: 'બાળકનું નામ',
      childNamePlaceholder: 'દા.ત. નૂર / આરવ',
      programLabel: 'રસ ધરાવતો વર્ગ',
      messageLabel: 'પ્રશ્ન કે સંદેશ',
      messagePlaceholder: 'સમય, બાળકની અગાઉની શાળા અથવા અન્ય કોઈ પ્રશ્ન હોય તો જણાવો...',
      submitBtn: 'પૂછપરછ મોકલો',
      successTitle: 'ધન્યવાદ, આપની પૂછપરછ મળી ગઈ છે!',
      successDesc: 'અમે આપની વિગત નોંધી લીધી છે. અમારા સંયોજક ટૂંક સમયમાં આપનો સંપર્ક કરશે.',
      sendAnotherBtn: 'બીજી પૂછપરછ મોકલો',
    },
    footer: {
      invitationBadge: 'શિક્ષણની સુંદર શરૂઆત',
      quotePart1: '“દરેક બાળકની અંદર એક સંપૂર્ણ વિશ્વ સમાયેલું છે,',
      quotePart2: 'જે ખીલવાની રાહ જુએ છે.”',
      invitationDesc:
        'આપના બાળકને શાંત અને પ્રેમાળ શરૂઆતની ભેટ આપો. ભુજમાં Little Noor ની મુલાકાત લઈને અનુભવો.',
      bookVisit: 'મુલાકાત બુક કરો',
      callUs: 'શાળાને કોલ કરો',
      brandDesc:
        'બાળકના કુદરતી વિકાસ, શાંત વાતાવરણ અને સ્પર્શ આધારિત શિક્ષણને સમર્પિત મોન્ટેસરી શાળા, ભુજ.',
      exploreTitle: 'શાળા નેવિગેશન',
      hoursTitle: 'શાળાનો સમય',
      addressTitle: 'શાળાનું સરનામું',
      playhouseLabel: 'પ્લેહાઉસ',
      playhouseDays: 'સોમ – શુક્ર (શનિ/રવિ રજા)',
      nurseryLabel: 'નર્સરી અને સિનિયર કેજી',
      nurseryDays: 'સોમ – શનિ (રવિવાર રજા)',
      allRightsReserved: 'સર્વાધિકાર સુરક્ષિત.',
      classInfo: 'પૂર્વ-પ્રાથમિક મોન્ટેસરી શિક્ષણ · પ્લે ગ્રુપ થી સિનિયર કેજી',
    },
    modal: {
      title: 'શાળા મુલાકાત બુક કરો',
      subtitle: 'ભુજમાં અમારા શાંત મોન્ટેસરી વાતાવરણનો રૂબરૂ અનુભવ કરો.',
      dateLabel: 'પસંદગીની તારીખ',
      timeLabel: 'સવારનો સમય (૯:૦૦ થી ૧૧:૩૦)',
      parentName: 'વાલીનું પૂરું નામ',
      childName: 'બાળકનું નામ અને ઉંમર',
      phone: 'WhatsApp / ફોન નંબર',
      submitBtn: 'મુલાકાત સમય કન્ફર્મ કરો',
      closeBtn: 'બંધ કરો',
    },
    newsletter: {
      badge: 'માસિક સ્નેહપત્રો',
      title: 'વાલી ન્યૂઝલેટરમાં જોડાવો',
      subtitle: 'બાળકના સ્વાવલંબન, ઘરના વ્યવહારુ સંસ્કારો અને પ્રારંભિક વિકાસ વિશે ભુજના અમારા માર્ગદર્શકો તરફથી માસિક લેખો મેળવો.',
      placeholder: 'તમારું ઈમેલ સરનામું લખો...',
      subscribe: 'સબ્સ્ક્રાઇબ કરો',
      subscribing: 'જોડાઈ રહ્યા છીએ...',
      errorEmpty: 'કૃપા કરીને તમારું ઈમેલ સરનામું દાખલ કરો.',
      errorInvalid: 'કૃપા કરીને માન્ય ઈમેલ સરનામું લખો (જેમ કે name@domain.com).',
      successTitle: 'Little Noor પરિવારમાં સ્વાગત છે',
      successDesc: 'અમે {email} ને અમારા માસિક પત્રોની યાદીમાં આવકારીએ છીએ. કોઈ અનિચ્છનીય મેઇલ નહીં—માત્ર બાળ વિકાસનું ચિંતન.',
      registerAnother: 'બીજું ઈમેલ નોંધાવો',
    },
  },

  hi: {
    nav: {
      home: 'होम',
      about: 'स्कूल के बारे में',
      philosophy: 'मोंटेसरी पद्धति',
      programs: 'प्रोग्राम',
      safety: 'सुरक्षा',
      activities: 'गतिविधियां',
      gallery: 'गैलरी',
      faq: 'अक्सर पूछे जाने वाले सवाल',
      contact: 'संपर्क',
      bookVisit: 'मुलाकात बुक करें',
      callSchool: 'स्कूल को कॉल करें',
      language: 'भाषा',
      admissionsOpen: 'प्रवेश शुरू है २०२५–२६',
      hours: 'सुबह ९:०० से ११:३०',
      subtitle: 'मोंटेसरी स्कूल · भुज',
      tagline: 'सीखें • बढ़ें • चमकें',
      taglineWords: ['सीखें', 'बढ़ें', 'चमकें'],
      menu: 'मेनू',
    },
    hero: {
      badge: 'सीखें • अन्वेषण करें • आगे बढ़ें',
      headlinePart1: 'जहां बच्चे की सहज जिज्ञासा',
      headlinePart2: 'आजीवन आनंद और ज्ञान बनती है।',
      description:
        'भुज में Little Noor Montessori School में आपका हार्दिक स्वागत है। यहाँ २ से ६ वर्ष के बच्चे शांत वातावरण, प्रेमपूर्वक और स्पर्श-आधारित मोंटेसरी साधनों के माध्यम से आनंद से सीखते हैं।',
      admissionsNotice:
        'प्लेहाउस: सुबह ९:૦૦ से ११:૦૦ · नर्सरी और सीनियर केजी: सुबह ९:૦૦ से ११:३૦',
      locationBadge: 'भुज, कच्छ, गुजरात',
      ratioBadge: '१:८ शिक्षिका-बच्चा अनुपात',
      timingBadge: 'सुबह का समय (९:૦૦ से ११:३૦)',
      ctaExplore: 'हमारा स्कूल देखें',
      ctaVisit: 'मुलाकात बुक करें',
      quoteBadge: 'प्राकृतिक तैयार वातावरण',
      quoteText: '“मुझे खुद से सीखने में मदद करें।”',
      quoteAuthor: '— डॉ. मारिया मोंटेसरी',
      staffBadgeTag: 'स्नेहपूर्ण देखभाल',
      staffBadgeText: 'भुज में १००% महिला शिक्षिकाएं और स्टाफ',
    },
    about: {
      badge: 'Little Noor के बारे में',
      title: 'बच्चे की स्वाभाविक यात्रा और आत्मविश्वास का सम्मान।',
      description:
        'Little Noor भुज का प्रामाणिक मोंटेसरी पूर्व-प्राथमिक विद्यालय है। हम २ से ६ वर्ष के बच्चों की स्वाभाविक जिज्ञासा का आदर करते हैं और गतिविधियों के जरिए उनका समग्र विकास करते हैं।',
      cardTag: 'Little Noor Montessori School · भुज',
      cardTitle: 'हर नन्हे मस्तिष्क में छिपे प्रकाश को संवारना।',
      cardDesc:
        'Little Noor में हम हर बच्चे को एक जन्मजात अन्वेषक मानते हैं। शांत और सुव्यवस्थित कमरों में, बच्चे अपनी गति से स्वावलंबन और गहरी एकाग्रता विकसित करते हैं।',
      educatorName: 'मारिया मोंटेसरी',
      educatorRole: 'बुनियादी शिक्षा पद्धति की जनक',
      imageLocation: 'भुज, कच्छ',
      imageCaption: 'प्राकृतिक प्रकाश, सुंदर लकड़ी के मोंटेसरी उपकरण और आनंदमय शिक्षा।',
      pillar1Title: '१:८ शिक्षिका-बच्चा अनुपात',
      pillar1Desc:
        'सीमित छात्र संख्या से प्रत्येक बच्चे पर व्यक्तिगत ध्यान और स्नेहपूर्ण मार्गदर्शन सुनिश्चित होता है।',
      pillar2Title: 'बच्चों के कद के अनुकूल कमरे',
      pillar2Desc:
        'बच्चों की ऊंचाई के अनुसार फर्नीचर और उपकरण, जिससे बच्चा पूरी तरह आत्मनिर्भर बनता है।',
      pillar3Title: 'अपनी सहज गति से सीखना',
      pillar3Desc:
        'बिना किसी दबाव या जल्दबाजी के, बच्चा अपनी पसंद के साधनों से गहरी एकाग्रता के साथ सीखता है।',
      pillar4Title: 'सदाचार और शिष्टाचार की नींव',
      pillar4Desc:
        'रोजमर्रा के जीवन में धन्यवाद कहना, नाश्ता बांटना और साथियों के प्रति सहानुभूति सिखाई जाती है।',
    },
    philosophy: {
      badge: 'मोंटेसरी पद्धति',
      title: 'जीवन निर्माण की सच्ची शिक्षा,',
      titleAccent: 'कोई रटंत या तनावपूर्ण दौड़ नहीं।',
      description:
        'डॉ. मारिया मोंटेसरी ने पाया कि छोटे बच्चों का मस्तिष्क अत्यंत ग्रहणशील होता है। जब उन्हें सही साधन और शांत वातावरण मिलता है, तो सीखना स्वाभाविक आनंद बन जाता है।',
      card1Title: 'स्व-प्रेरित अन्वेषण',
      card1Desc:
        'बच्चा अपनी रुचि के अनुसार उपकरण चुनता है, जिससे उसमें स्वाभाविक एकाग्रता और आत्मविश्वास बढ़ता है।',
      card2Title: 'स्पर्श और अनुभव आधारित ज्ञान',
      card2Desc:
        'भाषा, गणित और भूगोल जैसे विषय किताबी रटने के बजाय लकड़ी के वैज्ञानिक उपकरणों को छूकर समझे जाते हैं।',
      card3Title: 'मिश्रित आयु वर्ग का समुदाय',
      card3Desc:
        'छोटे बच्चे बड़े साथियों को देखकर सीखते हैं और बड़े बच्चे छोटों को स्नेह से मार्गदर्शन देते हैं।',
      card4Title: 'व्यावहारिक जीवन कौशल',
      card4Desc:
        'पानी डालना, सफाई करना, कपड़े मोड़ना और बटन लगाना जैसी गतिविधियों से हाथ और मस्तिष्क का तालमेल बनता है।',
      quote:
        '“प्रारंभिक शिक्षा का उद्देश्य बच्चे के भीतर सीखने की स्वाभाविक इच्छा को जगाना होना चाहिए।”',
    },
    programs: {
      badge: 'कक्षाएं और समय सारिणी',
      title: 'बच्चे के विकास के चरणों के अनुसार तैयार पाठ्यक्रम।',
      description:
        'घर से पहले कदम से लेकर प्राथमिक स्कूल की तैयारी तक, प्रत्येक कक्षा में स्नेही महिला शिक्षिकाओं का मार्गदर्शन रहता है।',
      mostEnrolled: 'सर्वाधिक नामांकित',
      keyMilestones: 'प्रमुख विकास के पड़ाव:',
      inquireBtn: 'प्रवेश के लिए पूछताछ करें',
      tourBtn: 'स्कूल का दौरा बुक करें',
      playhouse: {
        name: 'प्लेहाउस (Play Group)',
        age: '२.० से ३.० वर्ष',
        timing: 'सुबह ९:०० से ११:००',
        ratio: '१:६ से १:८ अनुपात',
        desc: 'स्कूल जीवन की एक कोमल शुरुआत। बच्चे प्यार भरे माहौल में भाषा, इंद्रियों और भावनाओं का विकास करते हैं।',
        outcomes: [
          'घर से अलग होने का डर दूर होकर सुरक्षा की भावना',
          'इंद्रियों और मांसपेशियों का संतुलित विकास',
          'दैनिक जीवन की आदतें: हाथ धोना, चीजें व्यवस्थित रखना',
          'स्पष्ट बोलना और नए शब्दों का ज्ञान',
        ],
      },
      nursery: {
        name: 'नर्सरी (Nursery)',
        age: '३.૦ से ४.५ वर्ष',
        timing: 'सुबह ९:૦૦ से ११:३૦',
        ratio: '१:८ अनुपात',
        desc: 'मोंटेसरी संवेदी प्रशिक्षण, सैंडपेपर अक्षरों से ध्वनि पहचान, प्रारंभिक गणित और कलात्मक रचनात्मकता।',
        outcomes: [
          'सैंडपेपर अक्षरों द्वारा ध्वनि और वर्णमाला की पहचान',
          'संवेदी उपकरण: पिंक टॉवर और ब्रॉड स्टेयर्स',
          'मित्रों के साथ संवाद और शिष्टाचार के संस्कार',
          'मनपसंद उपकरणों के साथ लंबे समय तक एकाग्रता',
        ],
      },
      srKg: {
        name: 'सीनियर केजी (Senior KG)',
        age: '४.५ से ६.૦ वर्ष',
        timing: 'सुबह ९:૦૦ से ११:३૦',
        ratio: '१:८ अनुपात',
        desc: 'उन्नत भाषा, मूवेबल वर्णमाला से शब्द निर्माण, गोल्डन बीड्स से दशमलव गणित और प्राथमिक स्कूल के लिए आत्मविश्वास।',
        outcomes: [
          'मूवेबल वर्णमाला द्वारा शब्द निर्माण और पठन की शुरुआत',
          'गोल्डन बीड्स से इकाई, दहाई, सैकड़ा और हजार की समझ',
          'वनस्पति, पहेली नक्शे और सामान्य ज्ञान की रुचि',
          'आगे की प्राथमिक शिक्षा के लिए पूर्ण तत्परता',
        ],
      },
    },
    whyUs: {
      badge: 'Little Noor ही क्यों',
      title: 'भुज में नन्हे बच्चों का एक स्नेही स्कूल,',
      titleAccent: 'जहाँ बचपन संवरता है।',
      description:
        'Little Noor की हर व्यवस्था बच्चे की शारीरिक, मानसिक और भावनात्मक जरूरतों को ध्यान में रखकर तैयार की गई है।',
    },
    activities: {
      badge: 'गतिविधियां और अन्वेषण',
      title: 'जिज्ञासा और रचनात्मकता के',
      titleAccent: 'छह व्यावहारिक रास्ते।',
      description:
        'Little Noor में शिक्षा केवल किताबों तक सीमित नहीं है। बच्चे अपने हाथों से वास्तविक उपकरणों द्वारा प्रयोग करके सीखते हैं।',
    },
    safety: {
      badge: 'सुरक्षा और स्टाफ मानक',
      title: 'एक सुरक्षित और निर्भय वातावरण,',
      titleAccent: 'जहाँ बच्चे की सुरक्षा सर्वोपरि है।',
      description:
        'माता-पिता अपने सबसे अनमोल बच्चों को हमें सौंपते हैं। हम पूर्ण स्वच्छता, २४ घंटे CCTV और १००% महिला स्टाफ की सुरक्षा प्रदान करते हैं।',
      bookTourPrompt: 'क्या आप स्कूल की सुरक्षा व्यवस्था व्यक्तिगत रूप से देखना चाहते हैं?',
      scheduleBtn: 'सुरक्षा वॉकथ्रू बुक करें',
    },
    testimonials: {
      badge: 'अभिभावकों के विचार',
      title: 'हमारे भुज के अभिभावक परिवार के',
      titleAccent: 'हृदयस्पर्शी अनुभव।',
      description:
        'जानिए कि Little Noor ने उनके बच्चों में आत्मनिर्भरता, शांत एकाग्रता और सहज आनंद कैसे संवारा।',
    },
    gallery: {
      badge: 'स्कूल की झलकियां',
      title: 'अन्वेषण, शांति और',
      titleAccent: 'आनंदमय पलों की तस्वीरें।',
      description:
        'हमारे शांत और रोशनी से भरे कमरों को देखें जहाँ हर कोना बच्चे को सीखने के लिए प्रेरित करता है।',
    },
    faq: {
      badge: 'अक्सर पूछे जाने वाले सवाल (FAQ)',
      title: 'अभिभावकों के सामान्य प्रश्नों के',
      titleAccent: 'स्पष्ट और सटीक उत्तर।',
      description:
        'प्रवेश प्रक्रिया, मोंटेसरी शिक्षा पद्धति, बाल सुरक्षा और समय सारणी के बारे में संपूर्ण जानकारी।',
      searchPlaceholder: 'समय, प्रवेश, सुरक्षा के बारे में खोजें...',
      noResultsTitle: 'इस खोज से संबंधित कोई प्रश्न नहीं मिला।',
      noResultsDesc: 'कृपया हमारे प्रवेश समन्वयक से सीधे संपर्क करें।',
      callSchool: 'स्कूल को कॉल करें',
      haveQuestionTitle: 'क्या आपके बच्चे के संबंध में कोई विशेष प्रश्न है?',
      haveQuestionDesc: 'हमारी अनुभवी शिक्षिकाएं अभिभावकों को मार्गदर्शन देने के लिए हमेशा तत्पर हैं।',
      bookVisitBtn: 'मुलाकात बुक करें',
      categories: {
        all: 'सभी प्रश्न',
        admissions: 'प्रवेश प्रक्रिया',
        routines: 'समय व नियम',
        safety: 'सुरक्षा व स्टाफ',
        policies: 'मोंटेसरी पद्धति',
      },
      items: {
        q1: 'वर्ष २०२५–२६ के लिए प्रवेश प्रक्रिया और आयु सीमा क्या है?',
        a1: 'हमारे स्कूल में तीन कक्षाएं हैं: प्लेहाउस (२ से ३ वर्ष), नर्सरी (३ से ४ वर्ष), और सीनियर केजी (४ से ६ वर्ष)। Little Noor में कोई प्रवेश परीक्षा या साक्षात्कार नहीं लिया जाता। प्रवेश सरल और तनावमुक्त है।',
        p1: [
          'प्लेहाउस: २ से ३ वर्ष (सहज शुरुआत और संवेदी विकास)',
          'नर्सरी: ३ से ४ वर्ष (भाषा और मोंटेसरी उपकरणों की पहचान)',
          'सीनियर केजी: ४ से ६ वर्ष (गणित, पठन और स्कूल तैयारी)',
          'बच्चों के लिए किसी भी प्रकार की परीक्षा या इंटरव्यू नहीं',
        ],
        q2: 'प्रवेश के लिए किन दस्तावेजों की आवश्यकता होती है?',
        a2: 'प्रवेश प्रक्रिया पूर्ण करने के लिए बच्चे का जन्म प्रमाण पत्र (Birth Certificate), आधार कार्ड की प्रति, ३ पासपोर्ट साइज फोटो और भरा हुआ प्रवेश फॉर्म आवश्यक है।',
        p2: [
          'बच्चे का आधिकारिक जन्म प्रमाण पत्र',
          'बच्चे के आधार कार्ड की प्रति',
          'बच्चे की ३ पासपोर्ट साइज फोटो',
          'स्कूल का भरा हुआ प्रवेश फॉर्म',
        ],
        q3: 'भुज में स्कूल का समय और दिन कौन-से हैं?',
        a3: 'प्लेहाउस सोमवार से शुक्रवार सुबह ९:०० से ११:०० तक चलता है (शनिवार व रविवार अवकाश)। नर्सरी और सीनियर केजी सोमवार से शनिवार सुबह ९:०० से ११:३० तक चलते हैं (रविवार अवकाश)। अभिभावक सुबह ९:०० से ११:३० के बीच मुलाकात कर सकते हैं।',
        p3: [
          'प्लेहाउस: सुबह ९:०० से ११:०० (सोमवार से शुक्रवार; शनिवार अवकाश)',
          'नर्सरी: सुबह ९:०० से ११:३० (सोमवार से शनिवार)',
          'सीनियर केजी: सुबह ९:०० से ११:३० (सोमवार से शनिवार)',
          'व्यक्तिगत मुलाकात: सुबह ९:०० से ११:३०',
        ],
        q4: 'बच्चों की सुरक्षा के लिए क्या व्यवस्थाएं की गई हैं?',
        a4: 'हमारे पास १००% महिला शिक्षिकाएं और केयरटेकर स्टाफ हैं। पूरे स्कूल में २४ घंटे CCTV निगरानी, गोल किनारों वाला सुरक्षित लकड़ी का फर्नीचर और अभिभावक पहचान पास प्रणाली है।',
        p4: [
          '१००% महिला शिक्षिकाएं और स्नेही सहायिकाएं',
          'सभी कमरों और खेल क्षेत्र में CCTV कैमरे',
          'बच्चों को चोट न पहुंचे ऐसा सुरक्षित लकड़ी का फर्नीचर',
          'बच्चे को लेने के लिए अभिभावक पास अनिवार्य',
        ],
        q5: 'मोंटेसरी शिक्षा पारंपरिक स्कूलों से कैसे भिन्न है?',
        a5: 'किताबी रटने या एक ही जगह बैठाए रखने के बजाय, बच्चे वैज्ञानिक रूप से तैयार लकड़ी के उपकरणों को छूकर, स्वयं अनुभव करके अपनी गति से सीखते हैं।',
        p5: [
          'स्क्रीन या रटने के बिना वास्तविक उपकरणों से सीखना',
          'शिक्षिका के मार्गदर्शन में अपनी पसंद का कार्य करना',
          'दैनिक जीवन की आत्मनिर्भरता और सदाचार पर जोर',
          'बच्चे की स्वाभाविक गति का सम्मान',
        ],
        q6: 'क्या प्रवेश लेने से पहले अभिभावक स्कूल देखने आ सकते हैं?',
        a6: 'हाँ! हम अभिभावकों को सुबह के समय (९:०० से ११:३०) व्यक्तिगत रूप से पधारकर शांत कक्षाओं और बच्चों की गतिविधियों को देखने के लिए सादर आमंत्रित करते हैं।',
        p6: [
          'स्कूल चालू रहने के दौरान कक्षा का अवलोकन',
          'हमारी प्रमाणित महिला शिक्षिकाओं से व्यक्तिगत मिलें',
          'वास्तविक मोंटेसरी वातावरण का अनुभव करें',
          'ऑनलाइन बुक करें या +91 99789 12364 पर कॉल करें',
        ],
      },
    },
    contact: {
      badge: 'संपर्क और प्रवेश',
      title: 'हम आपके परिवार का Little Noor में स्वागत करते हैं।',
      description:
        'भुज में २०२५–२६ सत्र के लिए कक्षा अवलोकन बुक करें या प्रवेश समन्वयक से बातचीत करें।',
      cardTitle: 'स्कूल का पता और संपर्क',
      directPhone: 'फोन नंबर',
      callHours: 'सुबह ८:३० से दोपहर १:०० के बीच कॉल करें',
      campusLocation: 'स्कूल का पता',
      locationNote: 'शांत, हरा-भरा आवासीय परिसर',
      morningSessions: 'सुबह का समय',
      instagramStories: 'इंस्टाग्राम पेज',
      bookCampusTour: 'स्कूल का दौरा बुक करें',
      formTitle: 'प्रवेश के लिए पूछताछ भेजें',
      formSubtitle: 'नीचे अपना विवरण दर्ज करें, हमारी टीम २४ घंटे के भीतर आपसे संपर्क करेगी।',
      parentNameLabel: 'अभिभावक का पूरा नाम *',
      parentNamePlaceholder: 'उदा. फातिमा / राजेश शाह',
      phoneLabel: 'मोबाइल नंबर (WhatsApp) *',
      phonePlaceholder: '+91 99789 12364',
      childNameLabel: 'बच्चे का नाम',
      childNamePlaceholder: 'उदा. नूर / आरव',
      programLabel: 'इच्छुक कक्षा',
      messageLabel: 'संदेश या प्रश्न',
      messagePlaceholder: 'समय, बच्चे के पूर्व अनुभव या अन्य किसी प्रश्न के बारे में बताएं...',
      submitBtn: 'पूछताछ भेजें',
      successTitle: 'धन्यवाद, आपकी पूछताछ प्राप्त हो गई है!',
      successDesc: 'हमने आपका विवरण नोट कर लिया है। हमारे समन्वयक शीघ्र ही आपसे संपर्क करेंगे।',
      sendAnotherBtn: 'दूसरी पूछताछ भेजें',
    },
    footer: {
      invitationBadge: 'शिक्षा की सुंदर शुरुआत',
      quotePart1: '“हर बच्चे के भीतर एक संपूर्ण ब्रह्मांड है,',
      quotePart2: 'जो खिलने की प्रतीक्षा कर रहा है।”',
      invitationDesc:
        'अपने बच्चे को एक शांत, स्नेही और सकारात्मक शुरुआत का उपहार दें। भुज में Little Noor आकर प्रत्यक्ष अनुभव करें।',
      bookVisit: 'मुलाकात बुक करें',
      callUs: 'स्कूल को कॉल करें',
      brandDesc:
        'बच्चे के स्वाभाविक विकास, शांत परिवेश और व्यावहारिक अनुभव को समर्पित मोंटेसरी स्कूल, भुज।',
      exploreTitle: 'स्कूल नेविगेशन',
      hoursTitle: 'स्कूल का समय',
      addressTitle: 'स्कूल का पता',
      playhouseLabel: 'प्लेहाउस',
      playhouseDays: 'सोम – शुक्र (शनि/रवि अवकाश)',
      nurseryLabel: 'नर्सरी व सीनियर केजी',
      nurseryDays: 'सोम – शनि (रविवार अवकाश)',
      allRightsReserved: 'सर्वाधिकार सुरक्षित।',
      classInfo: 'पूर्व-प्राथमिक मोंटेसरी शिक्षा · प्ले ग्रुप से सीनियर केजी',
    },
    modal: {
      title: 'स्कूल का दौरा बुक करें',
      subtitle: 'भुज में हमारे शांत मोंटेसरी वातावरण का प्रत्यक्ष अनुभव करें।',
      dateLabel: 'पसंदीदा तारीख',
      timeLabel: 'सुबह का समय (९:०० से ११:३०)',
      parentName: 'अभिभावक का पूरा नाम',
      childName: 'बच्चे का नाम और उम्र',
      phone: 'WhatsApp / फोन नंबर',
      submitBtn: 'मुलाकात का समय तय करें',
      closeBtn: 'बंद करें',
    },
    newsletter: {
      badge: 'मासिक स्नेहमयी पत्र',
      title: 'अभिभावक न्यूज़लेटर से जुड़ें',
      subtitle: 'बच्चे के स्वावलंबन, घर पर व्यावहारिक जीवन और संवेदनशील अवधियों पर भुज के हमारे शिक्षकों के विचार प्राप्त करें।',
      placeholder: 'अपना ईमेल पता लिखें...',
      subscribe: 'सदस्यता लें',
      subscribing: 'जुड़ रहे हैं...',
      errorEmpty: 'कृपया अपना ईमेल पता दर्ज करें।',
      errorInvalid: 'कृपया वैध ईमेल पता लिखें (जैसे name@domain.com)।',
      successTitle: 'Little Noor परिवार में स्वागत है',
      successDesc: 'हमने {email} को हमारे मासिक पत्रों की सूची में जोड़ लिया है। कोई स्पैम नहीं—केवल सार्थक बाल विकास मार्गदर्शन।',
      registerAnother: 'दूसरा ईमेल पंजीकृत करें',
    },
  },
};
