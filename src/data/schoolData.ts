import { FacilityItem, GalleryItem, ProgramItem, TestimonialItem, FaqItem } from '../types';

export const SCHOOL_INFO = {
  name: 'Little Noor Montessori School, Bhuj',
  shortName: 'Little Noor Montessori',
  tagline: 'Montessori learning that nurtures curiosity, confidence, and joyful growth.',
  bannerNotice: 'Classes Play group to Sr kg',
  phone: '+91 99789 12364',
  email: 'littlenoormontessorischool@gmail.com',
  instagram: 'https://www.instagram.com/littlenoor_montessori_bhuj?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==',
  instagramHandle: '@littlenoor_montessori_bhuj',
  address: 'Little Noor Montessori school, Bhuj',
  timings: 'Nursery & Sr. Kg: Mon–Sat (9:00 AM – 11:30 AM) | Playhouse: Mon–Fri (9:00 AM – 11:00 AM, Saturday Holiday)',
  playhouseTiming: '9:00 AM – 11:00 AM (Monday to Friday)',
  playhouseSchedule: 'Monday to Friday (Saturday & Sunday Holiday)',
  playhouseHolidayNotice: 'For Playhouse students, Saturday is also a holiday.',
  otherClassesTiming: '9:00 AM – 11:30 AM (Monday to Saturday)',
  otherClassesSchedule: 'Monday to Saturday (Sunday Holiday)',
  city: 'Bhuj, Kutch, Gujarat',
  philosophySummary:
    'At Little Noor, we follow the timeless philosophy of Dr. Maria Montessori—treating every child as an innate explorer. Within our thoughtfully prepared environments, young minds discover independence, build deep concentration, and cultivate a lifelong love for learning through hands-on tactile discovery.',
};

export const MONTESSORI_VALUES = [
  {
    id: 'val-1',
    title: 'Respect for the Child',
    subtitle: 'Child-Centered Autonomy',
    description:
      'We honor every child’s natural developmental rhythm. Guides gently step back to let children make meaningful choices, fostering authentic inner confidence and dignity.',
    icon: 'HeartHandshake',
    accent: '#E07A86',
  },
  {
    id: 'val-2',
    title: 'Hands-On Tactile Learning',
    subtitle: 'Sensory-Rich Materials',
    description:
      'Abstract concepts transform into tangible reality through authentic Montessori apparatus—from sensorial geometry solids to sand-paper letters and counting beads.',
    icon: 'Blocks',
    accent: '#C5A059',
  },
  {
    id: 'val-3',
    title: 'Fostering Natural Curiosity & Independence',
    subtitle: 'Prepared Child Environments',
    description:
      'Low shelves, accessible workstations, and freedom of purposeful movement empower little learners to pour, clean, explore, and master practical life skills with joy.',
    icon: 'Sparkles',
    accent: '#D4AF37',
  },
];

export const PROGRAMS: ProgramItem[] = [
  {
    id: 'play-group',
    title: 'Play House (Play Group)',
    ageRange: 'age 2–3',
    tagline: 'Gentle first steps into the prepared environment',
    description:
      'A warm, serene haven designed for toddlers beginning their social and sensory journey away from home. Focused on tactile comfort, routine, and speech emergence.',
    timing: '9:00 AM – 11:00 AM',
    days: 'Monday – Friday',
    holidayNote: 'Saturday is also a holiday (Sat & Sun off)',
    accentColor: '#E07A86',
    badgeBg: 'bg-[#FDF2F4] text-[#B84E5D] border-[#F8D2D8]',
    bulletPoints: [
      'Learning through play & sensorial discovery trays',
      'Hands-on tactile activities with natural wooden toys',
      'Gentle language immersion, nursery rhymes & conversational circles',
      'Foundational social skills, sharing & loving separation routines',
      'Practical life exercises: pouring, spooning, self-dressing confidence',
    ],
  },
  {
    id: 'nursery',
    title: 'Nursery',
    ageRange: 'age 3–4',
    tagline: 'Igniting cognitive curiosity and vocabulary expansion',
    description:
      'Children refine their motor coordination and linguistic capabilities through self-directed Montessori cycles, engaging their innate desire for order and exploration.',
    timing: '9:00 AM – 11:30 AM',
    days: 'Monday – Saturday',
    holidayNote: 'Sunday Holiday',
    accentColor: '#C5A059',
    badgeBg: 'bg-[#FAF5EC] text-[#916F2E] border-[#E8D5B5]',
    bulletPoints: [
      'Hands-on tactile exploration with Montessori sensorial apparatus',
      'Phonics recognition, sandpaper alphabet tracing & expressive storytelling',
      'Early numeracy concepts: golden bead introductions & quantity matching',
      'Collaborative social skills, grace & courtesy daily rituals',
      'Artistic expression with natural clay, botanical pressing & water colors',
    ],
  },
  {
    id: 'sr-kg',
    title: 'Sr. Kg',
    ageRange: 'age 4–5',
    tagline: 'Mastery, early literacy & confident school readiness',
    description:
      'Our senior kindergarten program bridges Montessori independence with comprehensive academic readiness, analytical thinking, and joyful peer collaboration.',
    timing: '9:00 AM – 11:30 AM',
    days: 'Monday – Saturday',
    holidayNote: 'Sunday Holiday',
    accentColor: '#B38F46',
    badgeBg: 'bg-[#F7F3E9] text-[#785E28] border-[#DEC79E]',
    bulletPoints: [
      'Advanced hands-on activities: decimal system, addition & skip counting',
      'Language mastery: three-letter word building, cursive tracing & early reading',
      'Scientific discovery: botany exploration, world culture & puzzle maps',
      'Refined social skills, empathy, problem-solving & leadership roles',
      'Seamless school readiness for primary education with self-reliance',
    ],
  },
];

export const FACILITIES: FacilityItem[] = [
  {
    id: 'fac-1',
    title: 'Bright classrooms',
    description:
      'Sun-drenched, air-purified rooms designed with calm pastel tones, child-scaled wooden furniture, and uncluttered low shelves that invite uninterrupted focus.',
    features: ['Natural daylight & soft warm ambient lighting', 'Child-height ergonomic wooden furniture', 'Dedicated peaceful reading & quiet corners'],
    iconName: 'Sun',
    imageUrl:
      'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'fac-2',
    title: 'Play-based learning spaces',
    description:
      'Specially designed indoor discovery zones where children explore texture, kinetic balance, constructive puzzles, and role-playing corners with loving supervision.',
    features: ['Non-toxic sensory play tables & kinetic materials', 'Loose-parts building & architectural block zones', 'Music, rhythm & expressive drama arena'],
    iconName: 'Sparkles',
    imageUrl:
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'fac-3',
    title: 'Outdoor learning area',
    description:
      'A secure garden sanctuary featuring a child-friendly sensory walkway, organic herb planter boxes, sand play, and soft-turf gross motor balance tracks.',
    features: ['Sensory herb & flower gardening patches', 'Safe natural timber balance beams & stepping stones', 'Shaded sandbox for collaborative physical play'],
    iconName: 'Trees',
    imageUrl:
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'fac-4',
    title: 'Learning resources & activities',
    description:
      'Complete authentic Montessori didactic apparatus—including cylinder blocks, pink tower, brown stair, spindle boxes, and language nomenclature cards.',
    features: ['Certified authentic wooden Montessori apparatus', 'Rich multilingual library & illustrated story collections', 'Practical life stations with real scaled utensils'],
    iconName: 'BookOpen',
    imageUrl:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=900&auto=format&fit=crop',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Classroom',
    category: 'Classroom',
    caption: 'Bright, orderly Montessori prepared environment with child-sized shelves.',
    imageUrl:
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=900&auto=format&fit=crop',
    description: 'Children freely choose their work mats and focus deeply in natural sunlit rooms.',
  },
  {
    id: 'gal-2',
    title: 'Activities',
    category: 'Activities',
    caption: 'Sensory cylinder blocks & tactile dimension discovery in motion.',
    imageUrl:
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=900&auto=format&fit=crop',
    description: 'Fine-motor grasp development through self-correcting wooden apparatus.',
  },
  {
    id: 'gal-3',
    title: 'Learning Corner',
    category: 'Learning Corner',
    caption: 'Language and early phonics corner with sandpaper letters and sound pouches.',
    imageUrl:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=900&auto=format&fit=crop',
    description: 'Tactile tracing develops muscle memory for graceful cursive writing.',
  },
  {
    id: 'gal-4',
    title: 'Outdoor Play',
    category: 'Outdoor Play',
    caption: 'Joyful gross-motor movement and nature exploration in our green courtyard.',
    imageUrl:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=900&auto=format&fit=crop',
    description: 'Sunlight, fresh breeze, and collaborative games build physical agility.',
  },
  {
    id: 'gal-5',
    title: 'Classroom Work Cycle',
    category: 'Classroom',
    caption: 'Deep concentration during individual morning work cycles.',
    imageUrl:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=900&auto=format&fit=crop',
    description: 'Guides gently observe while children achieve flow states with chosen materials.',
  },
  {
    id: 'gal-6',
    title: 'Creative Art & Clay',
    category: 'Activities',
    caption: 'Tactile expression using natural non-toxic clay, botanical dyes, and paints.',
    imageUrl:
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=900&auto=format&fit=crop',
    description: 'Self-expression guided by beauty, process-over-product mindfulness.',
  },
  {
    id: 'gal-7',
    title: 'Early Numeracy Lab',
    category: 'Learning Corner',
    caption: 'Golden beads and quantity spindles bringing math to physical touch.',
    imageUrl:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=900&auto=format&fit=crop',
    description: 'Concrete mathematical comprehension precedes abstract paper arithmetic.',
  },
  {
    id: 'gal-8',
    title: 'Garden & Sensory Play',
    category: 'Outdoor Play',
    caption: 'Tending to small garden planters and observing insect life cycles.',
    imageUrl:
      'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=900&auto=format&fit=crop',
    description: 'Fostering ecological mindfulness and reverence for living things in Bhuj.',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    parentName: 'Fatima & Imran Merchant',
    role: 'Parent of a Student',
    childInfo: 'Zayaan • Nursery',
    quote:
      'Little Noor has been a true blessing for our son. Before joining, he was hesitant with strangers; within three months in the prepared Montessori environment, his vocabulary blossomed and he now insists on pouring his own water and folding his clothes at home with pride!',
    rating: 5,
    highlight: 'Tremendous independence & speech confidence',
  },
  {
    id: 'test-2',
    parentName: 'Pooja & Jayesh Thacker',
    role: 'Parent of a Student',
    childInfo: 'Aanya • Play Group',
    quote:
      'The calm, loving atmosphere at Little Noor Montessori School, Bhuj is unmatched. The teachers are so gentle and truly treat every child with deep respect. The school feels like an extension of home, bathed in warmth and genuine care.',
    rating: 5,
    highlight: 'Warmest, most respectful teachers in Bhuj',
  },
  {
    id: 'test-3',
    parentName: 'Rehana & Dr. Suhail Vohra',
    role: 'Parent of a Student',
    childInfo: 'Aadilah • Sr. Kg',
    quote:
      'Seeing our daughter understand math quantities using concrete beads rather than rote memorization made us true believers in the Montessori method. Little Noor has prepared her so thoroughly for primary school with total joy and zero exam stress.',
    rating: 5,
    highlight: 'Joyful academic foundation without pressure',
  },
];

export const ADMISSION_STEPS = [
  {
    step: '01',
    title: 'Admissions Enquiry',
    desc: 'Fill our simple online form or call +91 99789 12364 to register your interest.',
  },
  {
    step: '02',
    title: 'Campus Tour & Observation',
    desc: 'Visit Little Noor in Bhuj between 9:00 AM – 11:30 AM to observe our peaceful learning environment.',
  },
  {
    step: '03',
    title: 'Welcoming Your Child',
    desc: 'Complete simple documentation and commence our gentle gradual-settling orientation.',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Montessori Method',
    question: 'What is the Montessori method?',
    answer:
      'Developed by Dr. Maria Montessori, the Montessori method is a child-centered educational approach based on scientific observation of children from birth to adulthood. Rather than passive rote memorization or one-size-fits-all instruction, children learn through self-directed activity, hands-on exploration with specially crafted tactile materials, and collaborative play. Trained Montessori guides lovingly prepare the classroom environment, allowing each child to follow their natural curiosity at their own developmental pace.',
  },
  {
    id: 'faq-2',
    category: 'Daily Routines',
    question: 'What are the school timings and weekly schedules?',
    answer:
      'Timings are structured gently by age group: Playhouse operates Monday through Friday from 9:00 AM to 11:00 AM (for Playhouse students, Saturday is also a holiday, along with Sunday). For Nursery and Sr. Kg, school runs Monday through Saturday from 9:00 AM to 11:30 AM (Sunday holiday). Campus observation visits are welcomed during morning work cycles.',
  },
  {
    id: 'faq-3',
    category: 'Admissions & Visits',
    question: 'How do I schedule a campus visit?',
    answer:
      'You can easily schedule a personalized campus tour by clicking the "Schedule a Visit" button anywhere on this website, calling our admissions office at +91 99789 12364, or messaging us on WhatsApp. During your visit, you and your child can explore our peaceful prepared classrooms, meet our certified guides, and observe the children engaged in their joyful morning work cycles.',
  },
  {
    id: 'faq-4',
    category: 'General',
    question: 'What age groups are accepted at Little Noor Montessori School, Bhuj?',
    answer:
      'We welcome children from ages 2 to 6 across three foundational programs: Play Group (ages 2 to 3), Nursery (ages 3 to 4), and Sr. Kg (ages 4 to 6). Each environment is specifically curated with age-appropriate tactile materials that align with sensitive periods for language, movement, sensorial refinement, and social harmony.',
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'What is the teacher-to-child ratio?',
    answer:
      'We maintain an intimate 1:8 guide-to-child ratio. This ensures every child receives individualized attention, daily progress observation, and gentle emotional support, allowing guides to introduce new Montessori apparatus when each child demonstrates readiness.',
  },
  {
    id: 'faq-6',
    category: 'Daily Routines',
    question: 'How does the gentle gradual settling process work for new children?',
    answer:
      'We recognize that beginning preschool is a momentous milestone. Our gentle settling process begins with comfortable 45-to-60 minute sessions where parents are invited to stay nearby. Over the first one to two weeks, as positive attachment and trust with the classroom guide naturally flourish, session durations are gradually expanded until the child happily transitions to the complete morning session.',
  },
  {
    id: 'faq-7',
    category: 'Montessori Method',
    question: 'How does Little Noor prepare children for primary school?',
    answer:
      'Montessori education naturally fosters deep phonetic literacy, mental arithmetic and decimal understanding through concrete golden beads, bilingual vocabulary, emotional self-regulation, and peer collaboration. Little Noor graduates transition seamlessly into standard ICSE, CBSE, and international primary school environments with strong confidence, curiosity, and independent study habits.',
  },
];
