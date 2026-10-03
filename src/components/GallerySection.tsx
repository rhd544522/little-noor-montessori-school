import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Eye,
  X,
  Compass,
  Maximize2,
  Minimize2,
  RotateCw,
  Sparkles,
  Info,
  CheckCircle2,
  Calendar,
  Layers,
  Camera,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Leaf,
  ShieldCheck,
  BookOpen,
  Trees,
} from 'lucide-react';
import { GALLERY_ITEMS, SCHOOL_INFO } from '../data/schoolData';
import { VIRTUAL_TOUR_LOCATIONS } from '../data/virtualTourData';
import { GalleryItem, VirtualTourLocation, TourViewpoint, TourHotspot, SchoolMediaItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { fetchPublishedMedia } from '../services/mediaService';
import { SchoolVideoCard } from './SchoolVideoCard';

interface GallerySectionProps {
  onOpenScheduleModal?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenScheduleModal }) => {
  const { t, currentLanguage } = useLanguage();
  // Mode: 'tour' (Virtual 360/Multi-view) or 'gallery' (Photo Grid)
  const [activeTab, setActiveTab] = useState<'tour' | 'gallery'>('tour');

  // Virtual Tour State
  const [activeLocationIndex, setActiveLocationIndex] = useState<number>(0);
  const [activeViewpointIndex, setActiveViewpointIndex] = useState<number>(0);
  const [activeHotspot, setActiveHotspot] = useState<TourHotspot | null>(null);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [panOffset, setPanOffset] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Drag pan refs
  const tourContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const currentOffsetRef = useRef<number>(0);

  // Dynamic Live Published Media from Supabase (Staff Portal)
  const [publishedMedia, setPublishedMedia] = useState<SchoolMediaItem[]>([]);
  const [isLoadingMedia, setIsLoadingMedia] = useState<boolean>(true);

  // Traditional Gallery State
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Fetch dynamic published media on mount and on page visibility change
  useEffect(() => {
    let isMounted = true;
    const loadPublished = async () => {
      try {
        const items = await fetchPublishedMedia();
        if (isMounted) {
          setPublishedMedia(items);
          setIsLoadingMedia(false);
        }
      } catch {
        if (isMounted) setIsLoadingMedia(false);
      }
    };

    loadPublished();

    const handleFocus = () => {
      loadPublished();
    };
    window.addEventListener('focus', handleFocus);
    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const currentLocation: VirtualTourLocation = VIRTUAL_TOUR_LOCATIONS[activeLocationIndex];
  const currentViewpoint: TourViewpoint =
    currentLocation.viewpoints[activeViewpointIndex] || currentLocation.viewpoints[0];

  const publishedPhotos = React.useMemo(() => {
    return publishedMedia.filter((m) => m.media_type === 'photo');
  }, [publishedMedia]);

  const publishedVideos = React.useMemo(() => {
    return publishedMedia.filter((m) => m.media_type === 'video');
  }, [publishedMedia]);

  const mappedPublishedPhotos: GalleryItem[] = React.useMemo(() => {
    return publishedPhotos.map((m) => ({
      id: `pub-${m.id}`,
      title: m.title,
      category: (
        m.category === 'Activities'
          ? 'Activities'
          : m.category === 'Classroom'
          ? 'Classroom'
          : m.category === 'Events' || m.category === 'Celebrations'
          ? 'Outdoor Play'
          : 'Learning Corner'
      ) as any,
      caption: m.title,
      imageUrl: m.file_url,
      description: m.description || `Campus moment published under ${m.category}.`,
    }));
  }, [publishedPhotos]);

  const combinedGalleryItems = React.useMemo(() => {
    return [...mappedPublishedPhotos, ...GALLERY_ITEMS];
  }, [mappedPublishedPhotos]);

  const galleryCategories = React.useMemo(() => {
    const cats = ['All'];
    if (publishedVideos.length > 0) {
      cats.push('Videos');
    }
    cats.push('Classroom', 'Tactile Materials', 'Garden & Nature', 'Practical Life');
    if (publishedPhotos.some((p) => p.category === 'Events' || p.category === 'Celebrations')) {
      cats.push('Events & Celebrations');
    }
    return cats;
  }, [publishedVideos, publishedPhotos]);

  const getMappedCategory = (cat: string) => {
    if (cat === 'Activities') return 'Tactile Materials';
    if (cat === 'Learning Corner') return 'Practical Life';
    if (cat === 'Outdoor Play') return 'Garden & Nature';
    return cat;
  };

  const filteredGalleryItems = React.useMemo(() => {
    if (selectedGalleryCategory === 'Videos') return [];
    if (selectedGalleryCategory === 'All') return combinedGalleryItems;
    if (selectedGalleryCategory === 'Events & Celebrations') {
      return combinedGalleryItems.filter((item) => {
        const pub = publishedPhotos.find((p) => `pub-${p.id}` === item.id);
        return pub && (pub.category === 'Events' || pub.category === 'Celebrations');
      });
    }
    return combinedGalleryItems.filter((item) => {
      return getMappedCategory(item.category) === selectedGalleryCategory;
    });
  }, [selectedGalleryCategory, combinedGalleryItems, publishedPhotos]);

  // Handle auto-rotate pan simulation
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setPanOffset((prev) => {
        const next = prev - 0.5;
        // wrap around between -15% and +15%
        if (next < -18) return 18;
        return next;
      });
    }, 45);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Reset pan offset and hotspot when location or viewpoint changes
  useEffect(() => {
    setPanOffset(0);
    currentOffsetRef.current = 0;
    setActiveHotspot(null);
  }, [activeLocationIndex, activeViewpointIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxItem) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxItem(null);
      } else if (e.key === 'ArrowRight') {
        const currentIdx = filteredGalleryItems.findIndex((i) => i.id === lightboxItem.id);
        if (currentIdx < filteredGalleryItems.length - 1) {
          setLightboxItem(filteredGalleryItems[currentIdx + 1]);
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIdx = filteredGalleryItems.findIndex((i) => i.id === lightboxItem.id);
        if (currentIdx > 0) {
          setLightboxItem(filteredGalleryItems[currentIdx - 1]);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxItem, filteredGalleryItems]);

  // Touch and Mouse Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    currentOffsetRef.current = panOffset;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    // scale delta
    const newOffset = Math.max(-25, Math.min(25, currentOffsetRef.current + deltaX * 0.05));
    setPanOffset(newOffset);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    currentOffsetRef.current = panOffset;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      startXRef.current = e.touches[0].clientX;
      currentOffsetRef.current = panOffset;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    const newOffset = Math.max(-25, Math.min(25, currentOffsetRef.current + deltaX * 0.06));
    setPanOffset(newOffset);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    currentOffsetRef.current = panOffset;
  };

  const toggleFullscreen = () => {
    if (!tourContainerRef.current) return;
    if (!document.fullscreenElement) {
      tourContainerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const getHotspotCategoryIcon = (category: string) => {
    switch (category) {
      case 'Material':
        return Sparkles;
      case 'Environment':
        return BookOpen;
      case 'Nature':
        return Leaf;
      case 'Safety':
      default:
        return ShieldCheck;
    }
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#FAF8F1] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 -right-24 w-96 h-96 bg-[#E2E8E0]/50 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -left-20 w-80 h-80 bg-[#9CAF88]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E8E0] text-[#1E3A2B] text-xs font-semibold tracking-wider uppercase mb-4 border border-[#9CAF88]/30">
            <Compass className="w-3.5 h-3.5 text-[#1E3A2B]" />
            <span>{t.gallery.badge}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A2B] tracking-tight leading-tight">
            {t.gallery.title} <br className="hidden sm:inline" />
            <span className="text-[#9CAF88] italic font-normal">{t.gallery.titleAccent}</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#1E3A2B]/80 leading-relaxed font-sans max-w-2xl mx-auto">
            {t.gallery.description}
          </p>
        </div>

        {/* Mode Switcher Tabs: 360° Virtual Tour vs Traditional Gallery */}
        <div className="flex items-center justify-center mb-10">
          <div className="p-1.5 rounded-full bg-[#E2E8E0] border border-[#9CAF88]/40 shadow-botanical-xs flex items-center gap-1">
            <button
              type="button"
              id="view-tab-virtual-tour"
              onClick={() => setActiveTab('tour')}
              className={`px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'tour'
                  ? 'bg-[#1E3A2B] text-white shadow-botanical-xs'
                  : 'text-[#1E3A2B]/80 hover:text-[#1E3A2B]'
              }`}
            >
              <Compass className="w-4 h-4 text-[#9CAF88]" />
              <span>
                {currentLanguage === 'gu'
                  ? '૩૬૦° વર્ચ્યુઅલ ટૂર'
                  : currentLanguage === 'hi'
                  ? '३६०° वर्चुअल टूर'
                  : '360° Virtual Tour'}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#9CAF88] text-[#1E3A2B] hidden sm:inline">
                {currentLanguage === 'gu' ? 'ઇન્ટરેક્ટિવ' : currentLanguage === 'hi' ? 'इंटरैक्टिव' : 'Interactive'}
              </span>
            </button>

            <button
              type="button"
              id="view-tab-photo-gallery"
              onClick={() => setActiveTab('gallery')}
              className={`px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-[#1E3A2B] text-white shadow-botanical-xs'
                  : 'text-[#1E3A2B]/80 hover:text-[#1E3A2B]'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>
                {currentLanguage === 'gu'
                  ? 'ફોટો ગેલેરી'
                  : currentLanguage === 'hi'
                  ? 'फोटो गैलरी'
                  : 'Photo Gallery'}
              </span>
            </button>
          </div>
        </div>

        {/* -------------------------------------------------------------
            MODE 1: VIRTUAL TOUR 360 / MULTI-VIEW CAROUSEL
        ------------------------------------------------------------- */}
        {activeTab === 'tour' && (
          <div className="space-y-8">
            
            {/* Campus Room Carousel Selector Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {VIRTUAL_TOUR_LOCATIONS.map((loc, idx) => {
                const isSelected = activeLocationIndex === idx;
                return (
                  <button
                    key={loc.id}
                    id={`tour-loc-btn-${loc.id}`}
                    type="button"
                    onClick={() => {
                      setActiveLocationIndex(idx);
                      setActiveViewpointIndex(0);
                    }}
                    className={`text-left p-3.5 sm:p-4 rounded-organic border transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-growth-forest shadow-botanical-md ring-2 ring-growth-forest/20'
                        : 'bg-white/80 hover:bg-white border-growth-sage/35 shadow-botanical-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-growth-sage">
                          Room 0{idx + 1}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-pill bg-growth-mint text-growth-forest">
                          {loc.viewpoints.length} Views
                        </span>
                      </div>
                      <h4 className="font-display text-sm sm:text-base font-bold text-growth-forest leading-snug line-clamp-1">
                        {loc.name}
                      </h4>
                      <p className="text-[11px] text-growth-forest/70 font-sans mt-0.5 line-clamp-1">
                        {loc.tag}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-growth-forest/10 flex items-center justify-between text-[11px] font-medium text-growth-forest/75">
                      <span>{loc.ageBadge}</span>
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-growth-forest' : 'bg-growth-sage/40'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Virtual Stage */}
            <div
              ref={tourContainerRef}
              id="virtual-tour-viewport-container"
              className="relative rounded-3xl overflow-hidden bg-[#1E3A2B] border-2 border-growth-sage/40 shadow-botanical-lg group select-none"
            >
              {/* Top Viewpoint Bar & Compass Indicator */}
              <div className="absolute top-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
                
                {/* Location & Active Angle Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold pointer-events-auto shadow-md">
                  <Compass className="w-4 h-4 text-growth-sage animate-spin-slow" />
                  <span className="text-white font-bold">{currentLocation.name}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-growth-sage font-medium">{currentViewpoint.angleTag}</span>
                </div>

                {/* Perspective View Angle Selector Pills */}
                <div className="flex items-center gap-1.5 pointer-events-auto bg-black/60 backdrop-blur-md p-1 rounded-pill border border-white/20">
                  {currentLocation.viewpoints.map((vp, vIdx) => (
                    <button
                      key={vp.id}
                      type="button"
                      id={`vp-btn-${vp.id}`}
                      onClick={() => setActiveViewpointIndex(vIdx)}
                      className={`px-3 py-1 rounded-pill text-[11px] font-semibold transition-all ${
                        activeViewpointIndex === vIdx
                          ? 'bg-growth-sage text-growth-forest shadow-xs'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {vp.label}
                    </button>
                  ))}
                </div>

              </div>

              {/* Viewport Canvas (Draggable / Panable) */}
              <div
                className="relative aspect-16/10 sm:aspect-16/9 md:aspect-21/10 overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Panoramic Image with Simulated Pan Movement */}
                <div
                  className="w-full h-full transition-transform duration-100 ease-out"
                  style={{
                    transform: `translateX(${panOffset}%) scale(${zoomLevel})`,
                  }}
                >
                  <img
                    src={currentViewpoint.imageUrl}
                    alt={currentViewpoint.label}
                    className="w-[125%] h-full max-w-none object-cover pointer-events-none -ml-[12.5%]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Soft Vignette Overlay for Photographic Depth */}
                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/40 pointer-events-none" />

                {/* Hotspot Pins Overlay */}
                {showHotspots && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-transform duration-100 ease-out"
                    style={{
                      transform: `translateX(${panOffset}%) scale(${zoomLevel})`,
                    }}
                  >
                    {currentViewpoint.hotspots.map((spot) => {
                      const Icon = getHotspotCategoryIcon(spot.category);
                      const isHotspotActive = activeHotspot?.id === spot.id;

                      return (
                        <div
                          key={spot.id}
                          className="absolute pointer-events-auto"
                          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        >
                          {/* Pulsing Beacon Button */}
                          <button
                            type="button"
                            id={`hotspot-${spot.id}`}
                            onClick={() =>
                              setActiveHotspot(isHotspotActive ? null : spot)
                            }
                            aria-label={`Inspect ${spot.title}`}
                            className="relative -translate-x-1/2 -translate-y-1/2 group/pin focus:outline-none"
                          >
                            <span className="absolute -inset-2.5 rounded-full bg-growth-sage/40 animate-ping opacity-75" />
                            <div
                              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg transition-transform duration-300 ${
                                isHotspotActive
                                  ? 'bg-growth-forest scale-110 ring-4 ring-growth-sage'
                                  : 'bg-growth-sage/95 hover:bg-growth-forest hover:scale-105'
                              }`}
                            >
                              <Icon className="w-4 h-4 text-white" />
                            </div>

                            {/* Mini Label badge on hover */}
                            <span className="absolute left-1/2 -translate-x-1/2 top-10 whitespace-nowrap px-2.5 py-1 rounded-pill bg-black/85 backdrop-blur-xs text-[10px] font-bold text-white shadow-md opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none z-20">
                              {spot.title}
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Active Hotspot Inspector Card / Floating Modal */}
                <AnimatePresence>
                  {activeHotspot && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-16 sm:bottom-20 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 p-4 sm:p-5 rounded-2xl bg-[#FAF8F1]/95 backdrop-blur-md border border-growth-sage/60 shadow-2xl text-growth-forest"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="growth-badge text-[10px] py-0.5">
                            {activeHotspot.category} Highlight
                          </span>
                          <span className="text-[11px] font-semibold text-growth-sage">
                            • Montessori Feature
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveHotspot(null)}
                          className="w-7 h-7 rounded-full bg-white/90 text-growth-forest hover:bg-growth-mint flex items-center justify-center transition-colors"
                          aria-label="Close feature details"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="font-display text-base font-bold text-growth-forest mb-1.5">
                        {activeHotspot.title}
                      </h4>
                      <p className="text-xs text-growth-forest/85 leading-relaxed font-sans">
                        {activeHotspot.description}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-growth-forest/10 flex items-center justify-between text-[11px] text-growth-forest/70">
                        <span>Prepared Environment Standard</span>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveHotspot(null);
                            if (onOpenScheduleModal) onOpenScheduleModal();
                          }}
                          className="text-growth-forest font-bold underline decoration-growth-sage hover:text-[#2B4E3C]"
                        >
                          See this in person →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Left Drag Prompt */}
                <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-pill bg-black/50 backdrop-blur-xs text-white/80 text-[11px] pointer-events-none">
                  <Compass className="w-3.5 h-3.5 text-growth-sage" />
                  <span>Click & Drag or Swipe to Pan Room</span>
                </div>

                {/* Bottom Controls Ribbon: Pan, Zoom, Hotspots Toggle, Auto-Rotate */}
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/65 backdrop-blur-md p-1.5 rounded-pill border border-white/20 text-white">
                  
                  {/* Left Pan */}
                  <button
                    type="button"
                    onClick={() => setPanOffset((prev) => Math.min(25, prev + 5))}
                    className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                    aria-label="Pan Left"
                    title="Pan Left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Right Pan */}
                  <button
                    type="button"
                    onClick={() => setPanOffset((prev) => Math.max(-25, prev - 5))}
                    className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                    aria-label="Pan Right"
                    title="Pan Right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="w-px h-4 bg-white/25" />

                  {/* Auto-Rotate 360 Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsAutoRotating((prev) => !prev)}
                    className={`px-3 py-1 rounded-pill text-[11px] font-semibold flex items-center gap-1.5 transition-all ${
                      isAutoRotating
                        ? 'bg-growth-sage text-growth-forest'
                        : 'hover:bg-white/20 text-white'
                    }`}
                    title="Toggle continuous 360 room rotation"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">360° Rotate</span>
                  </button>

                  {/* Hotspots Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowHotspots((prev) => !prev)}
                    className={`px-2.5 py-1 rounded-pill text-[11px] font-semibold flex items-center gap-1 transition-all ${
                      showHotspots
                        ? 'bg-white/20 text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                    title="Toggle Montessori guide pins"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-growth-sage" />
                    <span className="hidden md:inline">Hotspots</span>
                  </button>

                  {/* Zoom Controls */}
                  <button
                    type="button"
                    onClick={() => setZoomLevel((prev) => Math.min(1.4, prev + 0.1))}
                    className="w-8 h-8 rounded-full hover:bg-white/20 hidden sm:flex items-center justify-center text-white"
                    title="Zoom in"
                    aria-label="Zoom in"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setZoomLevel((prev) => Math.max(1, prev - 0.1))}
                    className="w-8 h-8 rounded-full hover:bg-white/20 hidden sm:flex items-center justify-center text-white"
                    title="Zoom out"
                    aria-label="Zoom out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white"
                    title="Toggle fullscreen"
                    aria-label="Toggle fullscreen"
                  >
                    {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Viewpoint Description Strip */}
              <div className="p-4 sm:p-5 bg-[#1E3A2B] border-t border-growth-sage/25 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-bold text-growth-sage">
                      Current Perspective: {currentViewpoint.label}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/85 max-w-3xl font-sans">
                    {currentViewpoint.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-white/70">
                    {activeViewpointIndex + 1} of {currentLocation.viewpoints.length} angles
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveViewpointIndex((prev) =>
                          prev === 0 ? currentLocation.viewpoints.length - 1 : prev - 1
                        )
                      }
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      aria-label="Previous view angle"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveViewpointIndex((prev) =>
                          (prev + 1) % currentLocation.viewpoints.length
                        )
                      }
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      aria-label="Next view angle"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Deep-Dive & In-Person Walkthrough Card */}
            <div className="growth-card flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-3 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-growth-forest">
                  <Leaf className="w-4 h-4 text-growth-forest" />
                  <span>Pedagogical Architecture · {currentLocation.ageBadge}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-growth-forest">
                  {currentLocation.name}
                </h3>
                <p className="text-xs sm:text-sm text-growth-forest/80 leading-relaxed font-sans max-w-2xl">
                  {currentLocation.summary}
                </p>

                {/* Key Room Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  {currentLocation.highlights.map((hl) => (
                    <div key={hl} className="flex items-start gap-2 text-left">
                      <CheckCircle2 className="w-3.5 h-3.5 text-growth-forest shrink-0 mt-0.5" />
                      <span className="text-xs text-growth-forest/90 font-medium leading-snug">
                        {hl}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button: Book Live Observation for this exact room */}
              <div className="shrink-0 w-full sm:w-auto flex flex-col sm:flex-row lg:flex-col gap-2.5">
                <button
                  type="button"
                  onClick={onOpenScheduleModal}
                  id="tour-book-walkthrough-btn"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-pill bg-growth-forest hover:bg-[#2B4E3C] text-white text-xs sm:text-sm font-semibold transition-all shadow-botanical-xs flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-growth-sage" />
                  <span>Book In-Person Tour of This Room</span>
                </button>

                <p className="text-[11px] text-growth-forest/70 text-center font-medium">
                  Morning observation visits: 9:00 AM – 11:30 AM
                </p>
              </div>
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            MODE 2: TRADITIONAL LIVING MOMENTS PHOTO GALLERY
        ------------------------------------------------------------- */}
        {activeTab === 'gallery' && (
          <div>
            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedGalleryCategory(cat)}
                  type="button"
                  className={`px-4 sm:px-5 py-2 rounded-pill text-xs font-semibold transition-all duration-300 ${
                    selectedGalleryCategory === cat
                      ? 'bg-growth-forest text-white shadow-botanical-xs'
                      : 'bg-[#E2E8E0]/70 hover:bg-[#E2E8E0] text-growth-forest/80 border border-growth-sage/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Published Video Highlights (when 'Videos' or 'All' is selected) */}
            {publishedVideos.length > 0 && (selectedGalleryCategory === 'All' || selectedGalleryCategory === 'Videos') && (
              <div className="mb-12">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E2E8E0] text-[#1E3A2B] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
                    <span>Campus Video Moments</span>
                  </div>
                  <div className="h-[1px] flex-1 bg-growth-sage/20" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {publishedVideos.map((video) => (
                    <SchoolVideoCard key={video.id} media={video} />
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Photos Grid (shown when not exclusively viewing Videos) */}
            {selectedGalleryCategory !== 'Videos' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredGalleryItems.map((item, index) => {
                  const isLivePublished = item.id.startsWith('pub-');

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.05 }}
                      onClick={() => setLightboxItem(item)}
                      data-cursor="view"
                      className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-growth-sage/35 shadow-botanical-xs hover:shadow-botanical-md transition-all duration-300 relative"
                    >
                      <div className="relative aspect-4/3 overflow-hidden bg-[#FAF8F1]">
                        <img
                          src={item.imageUrl}
                          alt={item.caption}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-growth-forest/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                          <div className="text-white space-y-1">
                            <span className="text-[11px] font-semibold text-growth-sage uppercase tracking-wider block">
                              {getMappedCategory(item.category)}
                            </span>
                            <p className="font-display text-base font-bold text-[#FAF8F1] leading-snug">
                              {item.caption}
                            </p>
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-pill bg-white/90 backdrop-blur-xs text-[11px] font-medium text-growth-forest border border-growth-sage/30 shadow-2xs flex items-center gap-1">
                          {isLivePublished && <Sparkles className="w-3 h-3 text-[#C8A96B]" />}
                          <span>{getMappedCategory(item.category)}</span>
                        </div>
                      </div>

                      <div className="p-4 bg-[#FAF8F1] border-t border-growth-sage/20 flex items-center justify-between">
                        <p className="text-xs font-medium text-growth-forest truncate mr-2">
                          {item.caption}
                        </p>
                        <div className="w-7 h-7 rounded-full bg-growth-mint flex items-center justify-center text-growth-forest group-hover:bg-growth-forest group-hover:text-white transition-colors shrink-0">
                          <Eye className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Cinematic Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setLightboxItem(null)}
          >
            {/* Top Bar with Close & Category */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wider uppercase">
                {getMappedCategory(lightboxItem.category)} • Little Noor Gallery
              </span>

              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md flex items-center justify-center transition-all cursor-pointer pointer-events-auto shadow-md"
                aria-label="Close image viewer (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Center Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl w-full max-h-[88vh] bg-[#FAF8F1] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev / Next Floating Arrows */}
              {(() => {
                const currentIdx = filteredGalleryItems.findIndex((i) => i.id === lightboxItem.id);
                const hasPrev = currentIdx > 0;
                const hasNext = currentIdx < filteredGalleryItems.length - 1;

                return (
                  <>
                    {hasPrev && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxItem(filteredGalleryItems[currentIdx - 1]);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg"
                        aria-label="Previous photograph"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                    )}
                    {hasNext && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxItem(filteredGalleryItems[currentIdx + 1]);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg"
                        aria-label="Next photograph"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    )}
                  </>
                );
              })()}

              <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={lightboxItem.imageUrl}
                  alt={lightboxItem.caption}
                  className="max-h-[68vh] w-auto max-w-full object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom Caption Bar */}
              <div className="p-5 sm:p-6 bg-[#FAF8F1] border-t border-growth-sage/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-growth-sage block">
                    {getMappedCategory(lightboxItem.category)} • Prepared Environment
                  </span>
                  <p className="font-serif-luxury text-xl font-bold text-growth-forest mt-0.5">
                    {lightboxItem.caption}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-growth-forest/60 font-medium hidden md:inline">
                    Use ← → keys or swipe
                  </span>
                  {onOpenScheduleModal && (
                    <button
                      type="button"
                      onClick={() => {
                        setLightboxItem(null);
                        onOpenScheduleModal();
                      }}
                      className="px-6 py-2.5 rounded-full bg-growth-forest hover:bg-[#2B4E3C] text-white text-xs font-bold transition-all shadow-botanical-xs cursor-pointer"
                    >
                      Schedule Campus Visit
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
