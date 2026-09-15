import React, { useState } from 'react';
import { PolyverseLogo } from './PolyverseLogo';
import { NavigationTab } from '../types';
import { POLYVERSE_INFO } from '../data/polyverseData';
import { Menu, X, PhoneCall, Calculator, MessageCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenQuoteModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuoteModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string; badge?: string }[] = [
    { id: 'home', label: 'Accueil' },
    { id: 'services', label: 'Services' },
    { id: 'order-service', label: 'Achat & Shipping', badge: 'Nouveau' },
    { id: 'shop', label: 'Boutique', badge: 'Promo' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'donate', label: 'Dons' },
    { id: 'partnership', label: 'Partenariat' },
    { id: 'about', label: 'À propos' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs transition-all">
      {/* Top micro bar for quick contact and official slogan */}
      <div className="bg-[#0A2A4D] text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 text-gray-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium">Polyverse — Connecter vos idées à des résultats concrets</span>
            </span>
            <a
              href={`mailto:${POLYVERSE_INFO.contactEmail}`}
              className="text-gray-300 hover:text-white transition"
            >
              {POLYVERSE_INFO.contactEmail}
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20je%20souhaite%20des%20informations`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 font-medium transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {POLYVERSE_INFO.whatsappDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo - plase a kote non an avèk slogan ofisyèl */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center focus:outline-hidden group text-left shrink-0 mr-4"
            aria-label="Polyverse Accueil"
          >
            <PolyverseLogo variant="full" size="md" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center space-x-1 relative ${
                    isActive
                      ? 'text-[#185FA5] bg-blue-50/80 font-bold shadow-xs'
                      : 'text-slate-700 hover:text-[#185FA5] hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                        item.badge === 'Nouveau'
                          ? 'bg-blue-100 text-[#185FA5]'
                          : 'bg-orange-100 text-[#D85A30]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Medium Screen (md to lg) abbreviated nav */}
          <nav className="hidden md:flex lg:hidden items-center space-x-1">
            {[
              { id: 'home' as NavigationTab, label: 'Accueil' },
              { id: 'services' as NavigationTab, label: 'Services' },
              { id: 'order-service' as NavigationTab, label: 'Achat & Shipping' },
              { id: 'shop' as NavigationTab, label: 'Boutique' },
              { id: 'portfolio' as NavigationTab, label: 'Portfolio' },
              { id: 'contact' as NavigationTab, label: 'Contact' },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'text-[#185FA5] bg-blue-50 font-bold'
                      : 'text-slate-700 hover:text-[#185FA5]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={onOpenQuoteModal}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#0A2A4D] hover:bg-[#185FA5] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Devis Gratuit</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={onOpenQuoteModal}
              className="px-3.5 py-2 rounded-full bg-[#0A2A4D] text-white text-xs font-bold flex items-center space-x-1 min-h-[44px] cursor-pointer active:scale-95"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Devis</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer active:scale-95"
              aria-label="Menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-3 rounded-lg text-left text-base font-semibold transition flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-50 text-[#185FA5]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        item.badge === 'Nouveau'
                          ? 'bg-blue-100 text-[#185FA5]'
                          : 'bg-orange-100 text-[#D85A30]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
            <a
              href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20je%20souhaite%20un%20devis`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-emerald-600 text-white font-semibold text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
