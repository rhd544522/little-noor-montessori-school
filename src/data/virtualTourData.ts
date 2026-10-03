import { VirtualTourLocation } from '../types';

export const VIRTUAL_TOUR_LOCATIONS: VirtualTourLocation[] = [
  {
    id: 'nursery-environment',
    name: 'Nursery Prepared Environment',
    tag: 'Sensorial & Language Core',
    ageBadge: 'Ages 3 – 4 Years',
    summary:
      'A sunlit sanctuary where natural light streams across child-height beechwood shelves holding authentic Maria Montessori sensorial cylinders, binomial cubes, and language trays.',
    highlights: [
      'Low, uncluttered open wooden shelves arranged left-to-right by developmental difficulty',
      'Dedicated individual work rug parking station promoting spatial respect',
      'Child-sized cleaning station for sweeping crumbs, dusting leaves, and setting lunch',
    ],
    viewpoints: [
      {
        id: 'nursery-panoramic',
        label: 'Wide Classroom Panorama',
        angleTag: '360° Wide Center Angle',
        imageUrl:
          'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1600&q=80',
        description:
          'Pan across the tranquil main floor where students freely select activities from open wooden cubbies and settle on individual woven mats.',
        hotspots: [
          {
            id: 'h-cylinders',
            x: 28,
            y: 52,
            title: 'Montessori Cylinder Blocks',
            description:
              'Refines visual discrimination of dimension, preparing the child’s three-finger pincer grip for future pencil control.',
            category: 'Material',
          },
          {
            id: 'h-low-shelves',
            x: 62,
            y: 44,
            title: 'Accessible Child-Height Shelves',
            description:
              'Materials are kept within natural eye-level reach so children can make self-directed choices without requesting adult assistance.',
            category: 'Environment',
          },
          {
            id: 'h-rug-station',
            x: 80,
            y: 68,
            title: 'Individual Work Rug Zone',
            description:
              'Each rug establishes personal boundaries. Classmates learn grace and courtesy by carefully stepping around, never walking across another child’s work.',
            category: 'Safety',
          },
        ],
      },
      {
        id: 'nursery-practical-life',
        label: 'Practical Life Workstation',
        angleTag: 'Focus: Eye-Level Desk View',
        imageUrl:
          'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1600&q=80',
        description:
          'Close-up view of the Practical Life corner featuring miniature glass carafes, natural wood tongs, and child-safe handwashing basins.',
        hotspots: [
          {
            id: 'h-pouring',
            x: 35,
            y: 48,
            title: 'Water Pouring & Transfer Trays',
            description:
              'Children practice pouring colored water between small glass jugs, building coordination and self-correction without fear of mess.',
            category: 'Material',
          },
          {
            id: 'h-washbasin',
            x: 72,
            y: 58,
            title: 'Child-Level Hygiene Basin',
            description:
              'Running water fixtures adjusted to 55cm height encourage autonomous hand sanitizing before snacks and after clay work.',
            category: 'Safety',
          },
        ],
      },
      {
        id: 'nursery-reading-nook',
        label: 'Bilingual Cozy Reading Corner',
        angleTag: 'Window Alcove Perspective',
        imageUrl:
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80',
        description:
          'A gentle reading alcove with forward-facing botanical and cultural picture books in English, Gujarati, and Hindi.',
        hotspots: [
          {
            id: 'h-sandpaper-letters',
            x: 45,
            y: 45,
            title: 'Sandpaper Letter Cards',
            description:
              'Children trace textured alphabetic strokes with fingertips while verbalizing phonetic sounds, linking muscle memory to literacy.',
            category: 'Material',
          },
          {
            id: 'h-soft-cushions',
            x: 70,
            y: 72,
            title: 'Calm Reflection & Story Lounge',
            description:
              'Organic cotton floor cushions where children can curl up with an illustrated book or rest when feeling fatigued.',
            category: 'Environment',
          },
        ],
      },
    ],
  },
  {
    id: 'toddler-playhouse',
    name: 'Toddler Playhouse Sanctuary',
    tag: 'Gentle Transition & Motor Skills',
    ageBadge: 'Ages 2 – 3 Years',
    summary:
      'Warmly prepared for the sensitive period of gross motor development and sensory exploration. Soft floor mats, sturdy wooden pulling rails, and low mirrored walls foster early self-awareness.',
    highlights: [
      'Low wooden handrails supporting toddlers as they practice stable upright balance',
      'Object permanence boxes, wooden stacking rings, and tactile texture sensory baskets',
      'Soothing natural ivory wall tones with zero over-stimulating fluorescent clutter',
    ],
    viewpoints: [
      {
        id: 'playhouse-center',
        label: 'Toddler Floor Work Area',
        angleTag: 'Child Perspective Angle',
        imageUrl:
          'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=80',
        description:
          'Designed around the toddler’s natural urge to sit on comfortable wooden floors while discovering cause and effect with solid timber objects.',
        hotspots: [
          {
            id: 'h-permanence',
            x: 32,
            y: 60,
            title: 'Object Permanence Box',
            description:
              'Dropping a wooden ball through the hole and watching it roll out confirms that objects continue to exist even when hidden.',
            category: 'Material',
          },
          {
            id: 'h-pulling-bar',
            x: 75,
            y: 40,
            title: 'Low Safety Pull-Up Bar',
            description:
              'Sturdy smooth birch bar mounted alongside acrylic mirrors assists toddlers in pulling up to stand independently.',
            category: 'Safety',
          },
        ],
      },
      {
        id: 'playhouse-sensory',
        label: 'Sensory Texture Corner',
        angleTag: 'Tactile Table View',
        imageUrl:
          'https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=1600&q=80',
        description:
          'Natural wicker baskets filled with smooth river pebbles, coconut fiber brushes, and untreated silk scarves.',
        hotspots: [
          {
            id: 'h-treasure-basket',
            x: 40,
            y: 54,
            title: 'Natural Treasure Baskets',
            description:
              'Real-world natural items of varied temperatures and textures stimulate developing sensory pathways without plastic.',
            category: 'Nature',
          },
        ],
      },
    ],
  },
  {
    id: 'srkg-mathematics',
    name: 'Sr. Kg Advanced Math & Leadership Lab',
    tag: 'Abstract Thinking & Peer Collaboration',
    ageBadge: 'Ages 4 – 6 Years',
    summary:
      'Where 4-to-6 year-olds naturally grasp place values in decimal systems using tactile Golden Bead cubes, compose three-digit sums, and write phonetically on chalk slates.',
    highlights: [
      'Authentic Golden Beads material representing units, tens, hundreds, and thousands cubes',
      'Large Moveable Alphabet boxes enabling spontaneous story-writing before pencil fluency',
      'Collaborative conference tables where older children mentor younger peers',
    ],
    viewpoints: [
      {
        id: 'srkg-golden-beads',
        label: 'Decimal Math Workstation',
        angleTag: 'Overhead Material Focus',
        imageUrl:
          'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1600&q=80',
        description:
          'Witness how children physically lift the heavy 1,000-cube to comprehend mass and mathematical volume simultaneously.',
        hotspots: [
          {
            id: 'h-golden-cube',
            x: 35,
            y: 45,
            title: 'Golden Bead Thousand Cube',
            description:
              'Children feel the tangible weight of one thousand units, turning an abstract numerical concept into concrete physical reality.',
            category: 'Material',
          },
          {
            id: 'h-moveable-alphabet',
            x: 68,
            y: 50,
            title: 'Large Moveable Alphabet (LMA)',
            description:
              'Enables early readers to construct complex sentences on rugs before fine-motor finger muscles develop pencil endurance.',
            category: 'Material',
          },
        ],
      },
      {
        id: 'srkg-botany-science',
        label: 'Botany & Cultural Science Shelves',
        angleTag: 'Botanical Cabinet Angle',
        imageUrl:
          'https://images.unsplash.com/photo-1584697964190-705b893683f1?auto=format&fit=crop&w=1600&q=80',
        description:
          'Wooden jigsaw puzzle maps of continents, botanical leaf shape cabinets, and seed germination observation jars.',
        hotspots: [
          {
            id: 'h-puzzle-maps',
            x: 48,
            y: 42,
            title: 'Montessori Wooden Puzzle Maps',
            description:
              'Children remove tactile continents with wooden knobs, developing geographic curiosity and spatial orientation.',
            category: 'Environment',
          },
        ],
      },
    ],
  },
  {
    id: 'outdoor-garden',
    name: 'Sensory Botanical Garden & Courtyard',
    tag: 'Nature Stewardship & Earth Connection',
    ageBadge: 'All Age Groups',
    summary:
      'A serene outdoor living classroom shaded by indigenous neem and bougainvillea trees. Children sow seeds, water organic mint and tulsi plants, and study garden pollinators.',
    highlights: [
      'Raised organic planter beds with child-height brass watering cans and wooden trowels',
      'Shaded natural clay and sensory sand play table with clean beach sand',
      'Natural herb garden featuring mint, tulsi, coriander, and jasmine flowers',
    ],
    viewpoints: [
      {
        id: 'garden-raised-beds',
        label: 'Organic Planter Beds & Planting Station',
        angleTag: 'Sunlit Courtyard Panorama',
        imageUrl:
          'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?auto=format&fit=crop&w=1600&q=80',
        description:
          'Children take morning turns watering seedlings and observing daily growth, internalizing botanical science through direct stewardship.',
        hotspots: [
          {
            id: 'h-watering-cans',
            x: 30,
            y: 58,
            title: 'Child-Proportioned Watering Cans',
            description:
              'Balanced lightweight cans let toddlers carry water carefully across the gravel path without spilling.',
            category: 'Nature',
          },
          {
            id: 'h-raised-beds',
            x: 65,
            y: 46,
            title: 'Sensory Herb Planters',
            description:
              'Fresh mint, lemongrass, and tulsi leaves children can gently crush between fingers to explore aroma and botany.',
            category: 'Nature',
          },
        ],
      },
      {
        id: 'garden-movement-grass',
        label: 'Gross Motor & Sand Courtyard',
        angleTag: 'Shaded Play Canopy View',
        imageUrl:
          'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1600&q=80',
        description:
          'Soft grass expanse with log stepping stones, balance beams, and shaded clay workstations for collaborative outdoor construction.',
        hotspots: [
          {
            id: 'h-balance-beam',
            x: 42,
            y: 62,
            title: 'Low Wooden Balance Logs',
            description:
              'Encourages postural coordination, vestibular balance, and physical confidence in a safe, mulch-padded setting.',
            category: 'Safety',
          },
          {
            id: 'h-sand-table',
            x: 78,
            y: 52,
            title: 'Shaded Natural Sand Pit',
            description:
              'Children build landscape contours, measure volume with wooden scoops, and enjoy tactile relaxation.',
            category: 'Environment',
          },
        ],
      },
    ],
  },
];
