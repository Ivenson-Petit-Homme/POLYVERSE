import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { NavigationTab, ServiceCategory } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ContactSection } from './components/ContactSection';
import { DonateSection } from './components/DonateSection';
import { AffiliationSection } from './components/AffiliationSection';
import { OrderServiceSection } from './components/OrderServiceSection';
import { BoutiqueSection } from './components/BoutiqueSection';
import { AuthSection } from './components/AuthSection';
import { UserAccountSection } from './components/UserAccountSection';
import { AdminDashboardSection } from './components/AdminDashboardSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { QuoteModal } from './components/QuoteModal';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { UserAccountModal } from './components/UserAccountModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('design');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedPortfolioProjectId, setSelectedPortfolioProjectId] = useState<string | undefined>(undefined);

  // Scroll Progress Bar Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleSelectPortfolioProject = (projectId: string) => {
    setSelectedPortfolioProjectId(projectId);
    setActiveTab('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hideGlobalTestimonials =
    activeTab === 'home' || activeTab === 'auth' || activeTab === 'account' || activeTab === 'admin';

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-white text-[#141414] selection:bg-[#D85A30] selection:text-white relative">
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#D85A30] z-50 origin-left"
          style={{ scaleX }}
        />

        {/* Top Header Navigation */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenQuoteModal={() => setQuoteModalOpen(true)}
        />

        {/* Main Page View Switcher */}
        <main className="grow">
          {activeTab === 'home' && (
            <HomeSection
              setActiveTab={setActiveTab}
              setSelectedCategory={setSelectedCategory}
              onOpenQuoteModal={() => setQuoteModalOpen(true)}
              onSelectPortfolioProject={handleSelectPortfolioProject}
            />
          )}

          {activeTab === 'about' && (
            <AboutSection onOpenQuoteModal={() => setQuoteModalOpen(true)} />
          )}

          {activeTab === 'services' && (
            <ServicesSection
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onOpenQuoteModal={() => setQuoteModalOpen(true)}
            />
          )}

          {activeTab === 'portfolio' && (
            <PortfolioSection
              initialProjectId={selectedPortfolioProjectId}
              onOpenQuoteModal={() => setQuoteModalOpen(true)}
            />
          )}

          {activeTab === 'order-service' && (
            <OrderServiceSection onOpenQuoteModal={() => setQuoteModalOpen(true)} />
          )}

          {activeTab === 'shop' && (
            <BoutiqueSection onOpenQuoteModal={() => setQuoteModalOpen(true)} />
          )}

          {activeTab === 'donate' && (
            <DonateSection onOpenQuoteModal={() => setQuoteModalOpen(true)} />
          )}

          {(activeTab === 'affiliation' || activeTab === 'partnership') && (
            <AffiliationSection onOpenQuoteModal={() => setQuoteModalOpen(true)} />
          )}

          {activeTab === 'contact' && <ContactSection />}

          {activeTab === 'auth' && <AuthSection setActiveTab={setActiveTab} />}

          {activeTab === 'account' && <UserAccountSection setActiveTab={setActiveTab} />}

          {activeTab === 'admin' && <AdminDashboardSection setActiveTab={setActiveTab} />}

          {/* Global Horizontal Auto-scrolling Testimonials Section */}
          {!hideGlobalTestimonials && (
            <TestimonialsSection onOpenQuoteModal={() => setQuoteModalOpen(true)} />
          )}
        </main>

        {/* Footer */}
        <Footer
          setActiveTab={setActiveTab}
          onOpenQuoteModal={() => setQuoteModalOpen(true)}
        />

        {/* Global Quick Quote Modal */}
        <QuoteModal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
        />

        {/* Customer & Admin Authentication Modal */}
        <AuthModal />

        {/* Admin Management Dashboard */}
        <AdminDashboardModal />

        {/* Customer Profile & Orders History Modal */}
        <UserAccountModal />
      </div>
    </AuthProvider>
  );
}


