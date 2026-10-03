/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PhilosophySection } from './components/PhilosophySection';
import { ProgramsSection } from './components/ProgramsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { DailyExperienceSection } from './components/DailyExperienceSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { SafetySecuritySection } from './components/SafetySecuritySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GallerySection } from './components/GallerySection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { FinalSectionAndFooter } from './components/FinalSectionAndFooter';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { AdminPortal } from './components/admin/AdminPortal';
import { FloatingActions } from './components/FloatingActions';
import { CustomCursor } from './components/cinematic/CustomCursor';
import { WelcomeScreen } from './components/cinematic/WelcomeScreen';
import { DynamicLight } from './components/cinematic/DynamicLight';
import { ScrollCamera } from './components/cinematic/ScrollCamera';
import { OrganicSectionDivider } from './components/cinematic/OrganicSectionDivider';

export default function App() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname;
    const hash = window.location.hash;
    return (
      path.startsWith('/staff') ||
      path.startsWith('/admin') ||
      hash === '#staff' ||
      hash === '#admin'
    );
  });
  const [selectedProgram, setSelectedProgram] = useState<string>('Nursery');
  const [showWelcome, setShowWelcome] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return !sessionStorage.getItem('little_noor_welcome_completed');
    } catch {
      return true;
    }
  });

  React.useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const isStaffOrAdmin =
        path.startsWith('/staff') ||
        path.startsWith('/admin') ||
        hash === '#staff' ||
        hash === '#admin';
      setIsAdminRoute(isStaffOrAdmin);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleOpenScheduleModal = () => {
    setIsScheduleModalOpen(true);
  };

  const handleCloseScheduleModal = () => {
    setIsScheduleModalOpen(false);
  };

  const handleOpenAdminPortal = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/staff');
    }
    setIsAdminRoute(true);
  };

  const handleBackToWebsite = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/');
    }
    setIsAdminRoute(false);
  };

  const handleReplayEntrance = () => {
    try {
      sessionStorage.removeItem('little_noor_welcome_completed');
    } catch {
      // Storage access protected
    }
    setShowWelcome(true);
  };

  const handleSelectProgram = (programName: string) => {
    setSelectedProgram(programName);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isAdminRoute) {
    return (
      <ThemeProvider>
        <LanguageProvider>
          <AdminPortal onBackToWebsite={handleBackToWebsite} />
        </LanguageProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-[#FAF8F1] font-sans text-[#1E3A2B] selection:bg-[#E2E8E0] selection:text-[#1E3A2B] relative overflow-x-hidden transition-colors duration-300">
          {/* Desktop-only Morphing Custom Cursor */}
          <CustomCursor />

        {/* Global Dynamic Light System following Cursor */}
        <DynamicLight />

        {/* Full-Screen Welcome / Entry Experience */}
        {showWelcome && (
          <WelcomeScreen onComplete={() => setShowWelcome(false)} />
        )}

        {/* Dynamic Glass Morphing Navbar */}
        <Navbar onOpenScheduleModal={handleOpenScheduleModal} />

        {/* Main Continuous Visual Journey with Scroll Camera Simulation */}
        <ScrollCamera>
          <main className="flex-1 relative">
            {/* Hero Section with Living Background & 3D Depth */}
            <Hero
              onOpenScheduleModal={handleOpenScheduleModal}
              onExplorePrograms={() => {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <OrganicSectionDivider variant="paper-curve-bottom" />

            {/* 1. About Our Montessori */}
            <AboutSection />

            {/* 2. Our Learning Philosophy */}
            <PhilosophySection />

            <OrganicSectionDivider variant="cream-to-mint" />

            {/* 3. Programs & Classes with 3D Tilt Cards */}
            <ProgramsSection
              onSelectProgram={handleSelectProgram}
              onOpenScheduleModal={handleOpenScheduleModal}
            />

            {/* 4. Why Choose Us */}
            <WhyChooseUsSection />

            {/* 5. Daily Montessori Experience */}
            <DailyExperienceSection />

            {/* 6. Activities & Exploration */}
            <ActivitiesSection />

            <OrganicSectionDivider variant="paper-curve-bottom" />

            {/* 7. Interactive Campus Facilities Storytelling Sequence */}
            <FacilitiesSection onOpenScheduleModal={handleOpenScheduleModal} />

            {/* 8. Safety & Security */}
            <SafetySecuritySection onOpenScheduleModal={handleOpenScheduleModal} />

            {/* 9. Testimonial Cinema */}
            <TestimonialsSection />

            <OrganicSectionDivider variant="cream-to-mint" />

            {/* 10. School Gallery & Virtual Tour with Cinematic Lightbox */}
            <GallerySection onOpenScheduleModal={handleOpenScheduleModal} />

            {/* 11. FAQ Section */}
            <FAQSection onOpenScheduleModal={handleOpenScheduleModal} />

            {/* 12. Contact & Admissions with Final "Wow" Moment Signature Interaction */}
            <ContactSection onOpenScheduleModal={handleOpenScheduleModal} />
          </main>
        </ScrollCamera>

        {/* Final Invitation & Footer */}
        <FinalSectionAndFooter
          onOpenScheduleModal={handleOpenScheduleModal}
          onOpenAdminModal={handleOpenAdminPortal}
          onReplayEntrance={handleReplayEntrance}
        />

        {/* Campus Visit Booking Modal */}
        <ScheduleVisitModal isOpen={isScheduleModalOpen} onClose={handleCloseScheduleModal} />

        {/* Floating Action Buttons (Scroll to Top & Book a Visit) */}
        <FloatingActions onOpenScheduleModal={handleOpenScheduleModal} />
      </div>
    </LanguageProvider>
  </ThemeProvider>
  );
}
