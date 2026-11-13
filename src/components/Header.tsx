import React, { useState, useRef, useEffect } from 'react';
import { PolyverseLogo } from './PolyverseLogo';
import { NavigationTab } from '../types';
import { POLYVERSE_INFO } from '../data/polyverseData';
import { useAuth } from '../context/AuthContext';
import {
  Menu,
  X,
  Calculator,
  MessageCircle,
  User,
  ShieldCheck,
  ChevronDown,
  Layers,
  ShoppingBag,
  PackageCheck,
  FolderKanban,
  Handshake,
  HeartHandshake,
  Building2,
  PhoneCall,
  PlayCircle,
  ArrowRight,
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenQuoteModal: () => void;
}

interface SubMenuItem {
  id: NavigationTab;
  label: string;
  description: string;
  tag?: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  id: string;
  label: string;
  items: SubMenuItem[];
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuoteModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>('services');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    currentUser,
    isAdmin,
    setAuthModalMode,
  } = useAuth();

  const navGroups: NavGroup[] = [
    {
      id: 'services',
      label: 'Services',
      items: [
        {
          id: 'services',
          label: 'Nos 5 Piliers de Services',
          description: 'Design, Technologie, Finance, Streaming et Event Planning',
          icon: Layers,
        },
        {
          id: 'order-service',
          label: 'Achat Sans Carte & Shipping',
          description: 'Taux officiel 140 HTG · Amazon, Shein, eBay · Adresse Miami',
          tag: 'Taux 140 HTG',
          icon: PackageCheck,
        },
        {
          id: 'order-service',
          label: 'Streaming & Abonnements',
          description: 'Netflix, Amazon Prime & HBO Max payables par MonCash ou Natcash',
          tag: 'Activation rapide',
          icon: PlayCircle,
        },
        {
          id: 'shop',
          label: 'Boutique Officielle Polyverse',
          description: 'T-shirts signature, hoodies, accessoires et packs pro',
          icon: ShoppingBag,
        },
      ],
    },
    {
      id: 'projets',
      label: 'Affiliation & Projets',
      items: [
        {
          id: 'affiliation',
          label: 'Affiliation — Gagner avec Polyverse',
          description: 'Ambassadeur, Partenaire, Investisseur et Promoteur avec code promo',
          tag: 'Programme Revenus',
          icon: Handshake,
        },
        {
          id: 'portfolio',
          label: 'Portfolio & Réalisations',
          description: 'Découvrez nos réalisations concrètes et projets déployés',
          icon: FolderKanban,
        },
        {
          id: 'donate',
          label: 'Dons & Soutien aux Talents',
          description: 'Soutenez nos initiatives pour la jeunesse et l’entrepreneuriat',
          icon: HeartHandshake,
        },
      ],
    },
    {
      id: 'entreprise',
      label: "L'Entreprise",
      items: [
        {
          id: 'about',
          label: 'À Propos de Polyverse',
          description: 'Vision fondatrice, mission, valeurs et partenaires officiels',
          icon: Building2,
        },
        {
          id: 'contact',
          label: 'Contact & Localisation',
          description: 'Bureau au Campus Caracol, Haïti · Assistance WhatsApp & E-mail',
          icon: PhoneCall,
        },
      ],
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isGroupActive = (group: NavGroup) => {
    return group.items.some((item) => item.id === activeTab);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 transition-colors">
      {/* Main single-row editorial header (WWF.fr clean 3-zone structure) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4 lg:gap-8">
          {/* Zone 1: Official Polyverse Brand Logo */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center focus:outline-hidden group text-left shrink-0 cursor-pointer"
            aria-label="Polyverse Accueil"
          >
            <PolyverseLogo variant="full" size="md" className="transition-transform group-hover:scale-[1.01]" />
          </button>

          {/* Zone 2: Clean Editorial Single-Line Navigation */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center space-x-6 xl:space-x-7">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`py-2 text-sm font-bold uppercase tracking-wide whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'border-[#D85A30] text-[#0A2A4D]'
                  : 'border-transparent text-stone-700 hover:text-[#185FA5] hover:border-[#185FA5]'
              }`}
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: '15px' }}
            >
              Accueil
            </button>

            {navGroups.map((group) => {
              const active = isGroupActive(group);
              const isOpen = openDropdown === group.id;

              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(group.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(isOpen ? null : group.id)}
                    className={`py-2 text-sm font-bold uppercase tracking-wide whitespace-nowrap shrink-0 flex items-center space-x-1 border-b-2 transition-colors cursor-pointer ${
                      active
                        ? 'border-[#D85A30] text-[#0A2A4D]'
                        : isOpen
                        ? 'border-[#185FA5] text-[#185FA5]'
                        : 'border-transparent text-stone-700 hover:text-[#185FA5]'
                    }`}
                    style={{ fontFamily: "'Oswald', sans-serif", fontSize: '15px' }}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-[#D85A30]' : 'text-stone-400'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="absolute top-full left-0 pt-1 w-80 z-50">
                      <div className="bg-white border border-stone-200 shadow-xl py-2">
                        <div className="px-4 py-2 border-b border-stone-100">
                          <span className="text-[11px] uppercase tracking-widest font-bold text-stone-400">
                            {group.label}
                          </span>
                        </div>

                        <div className="divide-y divide-stone-100">
                          {group.items.map((item, idx) => {
                            const isItemActive = activeTab === item.id && idx === 0;
                            const ItemIcon = item.icon;

                            return (
                              <button
                                key={`${group.id}-${idx}`}
                                type="button"
                                onClick={() => handleNavClick(item.id)}
                                className={`w-full text-left px-4 py-3 transition flex items-start space-x-3 group/item cursor-pointer ${
                                  isItemActive
                                    ? 'bg-[#F4F3EF] text-[#0A2A4D]'
                                    : 'hover:bg-[#F4F3EF] text-stone-800'
                                }`}
                              >
                                <ItemIcon className="w-4 h-4 text-[#185FA5] shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-bold text-stone-900 group-hover/item:text-[#D85A30] transition-colors truncate">
                                      {item.label}
                                    </span>
                                    {item.tag && (
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D85A30] shrink-0">
                                        {item.tag}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5 font-normal">
                                    {item.description}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              type="button"
              onClick={() => handleNavClick('shop')}
              className={`py-2 text-sm font-bold uppercase tracking-wide whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'shop'
                  ? 'border-[#D85A30] text-[#0A2A4D]'
                  : 'border-transparent text-stone-700 hover:text-[#185FA5] hover:border-[#185FA5]'
              }`}
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: '15px' }}
            >
              Boutique
            </button>
          </nav>

          {/* Zone 3: Account + WWF-Style High-Contrast Rectangular Primary CTA */}
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            {isAdmin ? (
              <button
                type="button"
                onClick={() => handleNavClick('admin')}
                className={`flex items-center space-x-1.5 px-3.5 py-2.5 border text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  activeTab === 'admin'
                    ? 'border-[#D85A30] bg-[#D85A30] text-white'
                    : 'border-[#0A2A4D] bg-[#0A2A4D] text-amber-300 hover:bg-[#185FA5]'
                }`}
                title="Ouvrir le panneau d'administration"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin</span>
              </button>
            ) : currentUser ? (
              <button
                type="button"
                onClick={() => handleNavClick('account')}
                className={`flex items-center space-x-1.5 px-3.5 py-2.5 border text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  activeTab === 'account'
                    ? 'border-[#0A2A4D] bg-[#0A2A4D] text-white'
                    : 'border-stone-300 text-stone-800 hover:border-[#0A2A4D] hover:text-[#0A2A4D]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{currentUser.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('login');
                  handleNavClick('auth');
                }}
                className={`flex items-center space-x-1.5 px-3.5 py-2.5 border text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  activeTab === 'auth'
                    ? 'border-[#0A2A4D] bg-[#0A2A4D] text-white'
                    : 'border-stone-300 hover:border-[#0A2A4D] text-stone-800 hover:text-[#0A2A4D]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Connexion</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="flex items-center space-x-2 px-5 py-2.5 bg-[#D85A30] hover:bg-[#b84722] text-white font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: '15px' }}
            >
              <span>Devis Gratuit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="px-3.5 py-2 bg-[#D85A30] text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1 min-h-[42px] cursor-pointer"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Devis</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-stone-800 hover:bg-stone-100 transition min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer border border-stone-200"
              aria-label="Menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={`w-full px-4 py-3 text-left text-sm font-bold uppercase tracking-wide border transition flex items-center justify-between ${
              activeTab === 'home'
                ? 'bg-[#F4F3EF] border-[#D85A30] text-[#0A2A4D]'
                : 'border-stone-200 text-stone-800 hover:bg-stone-50'
            }`}
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <span>Accueil</span>
            <ArrowRight className="w-4 h-4 text-stone-400" />
          </button>

          {navGroups.map((group) => {
            const isExpanded = mobileExpandedGroup === group.id;
            const active = isGroupActive(group);

            return (
              <div key={group.id} className="border border-stone-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileExpandedGroup(isExpanded ? null : group.id)}
                  className={`w-full px-4 py-3 text-left text-sm font-bold uppercase tracking-wide flex items-center justify-between transition ${
                    active ? 'bg-[#F4F3EF] text-[#0A2A4D]' : 'bg-white text-stone-800'
                  }`}
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-[#D85A30]' : 'text-stone-400'
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="divide-y divide-stone-100 bg-white border-t border-stone-200">
                    {group.items.map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <button
                          key={`${group.id}-m-${idx}`}
                          type="button"
                          onClick={() => handleNavClick(item.id)}
                          className="w-full text-left px-4 py-3 hover:bg-[#F4F3EF] text-stone-700 flex items-center justify-between transition"
                        >
                          <div className="flex items-center space-x-2.5">
                            <ItemIcon className="w-4 h-4 text-[#185FA5]" />
                            <span className="text-xs font-semibold">{item.label}</span>
                          </div>
                          {item.tag && (
                            <span className="text-[10px] font-bold uppercase text-[#D85A30]">
                              {item.tag}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-3 border-t border-stone-200 flex flex-col space-y-2">
            {isAdmin ? (
              <button
                type="button"
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#0A2A4D] text-amber-300 font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Panneau Administrateur Polyverse</span>
              </button>
            ) : currentUser ? (
              <button
                type="button"
                onClick={() => handleNavClick('account')}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#F4F3EF] text-[#0A2A4D] font-bold text-xs border border-stone-300 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>{currentUser.name} (Mon Compte)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('login');
                  handleNavClick('auth');
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#0A2A4D] text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Connexion ou Créer un Compte</span>
              </button>
            )}

            <a
              href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20je%20souhaite%20un%20devis`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Assistance WhatsApp Direct</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
