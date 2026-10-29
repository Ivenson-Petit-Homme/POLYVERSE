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
  Sparkles,
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
  badge?: string;
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
    setIsAuthModalOpen,
    setAuthModalMode,
    setIsAdminModalOpen,
    setIsAccountModalOpen,
  } = useAuth();

  // Navigation Groups with Sub-menus
  const navGroups: NavGroup[] = [
    {
      id: 'services',
      label: 'Services & Solutions',
      items: [
        {
          id: 'services',
          label: 'Tous nos 5 Piliers de Services',
          description: 'Design, Technologie, Finance, Streaming et Event Planning',
          icon: Layers,
        },
        {
          id: 'order-service',
          label: 'Achat Sans Carte & Shipping',
          description: 'Taux officiel 140 HTG • Amazon, Shein, eBay • Adresse Miami',
          badge: 'Taux 140',
          icon: PackageCheck,
        },
        {
          id: 'order-service',
          label: 'Streaming & Abonnements',
          description: 'Netflix, Amazon Prime & HBO Max payables en MonCash/Natcash',
          badge: 'Nouveau',
          icon: Sparkles,
        },
        {
          id: 'shop',
          label: 'Boutique Officielle Polyverse',
          description: 'T-shirts signature, polos brodés, accessoires et goodies',
          badge: 'Promo',
          icon: ShoppingBag,
        },
      ],
    },
    {
      id: 'projets',
      label: 'Projets & Affiliation',
      items: [
        {
          id: 'affiliation',
          label: 'Affiliation (Gagner avec Polyverse)',
          description: 'Ambassadeur, Partenaire, Investisseur, Promoteur avec code promo',
          badge: 'Gagner $',
          icon: Handshake,
        },
        {
          id: 'portfolio',
          label: 'Portfolio & Modèles Prêts',
          description: 'Découvrez nos réalisations concrètes et projets prêts à déployer',
          icon: FolderKanban,
        },
        {
          id: 'donate',
          label: 'Dons & Soutien aux Talents',
          description: 'Participez à nos initiatives d’impact pour la jeunesse et les talents',
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
          description: 'Vision fondatrice, mission, valeurs et engagement d’excellence',
          icon: Building2,
        },
        {
          id: 'contact',
          label: 'Contact & Localisation',
          description: 'Bureau au Campus Caracol, Haïti & assistance par e-mail et téléphone',
          icon: PhoneCall,
        },
      ],
    },
  ];

  // Close dropdown on click outside
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs transition-all">
      {/* Top micro bar */}
      <div className="bg-[#0A2A4D] text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 text-gray-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium tracking-wide">
                Polyverse — FINANCE ET INVESTISSEMENT • Pont vers la Réalisation
              </span>
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
              <span>WhatsApp : {POLYVERSE_INFO.whatsappDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation container with ample height for bigger logo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-22">
          {/* Bigger Logo Display */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center focus:outline-hidden group text-left shrink-0 mr-4 cursor-pointer"
            aria-label="Polyverse Accueil"
          >
            <PolyverseLogo variant="full" size="md" className="transition-transform group-hover:scale-[1.02]" />
          </button>

          {/* Desktop Compact Sub-Menu Navigation */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center space-x-1">
            {/* Direct Home Link */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'home'
                  ? 'text-[#185FA5] bg-blue-50/90 shadow-2xs font-extrabold'
                  : 'text-slate-700 hover:text-[#185FA5] hover:bg-slate-50'
              }`}
            >
              Accueil
            </button>

            {/* Sub-menu Dropdown Groups */}
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
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                      active
                        ? 'text-[#185FA5] bg-blue-50/90 shadow-2xs font-extrabold'
                        : isOpen
                        ? 'text-[#185FA5] bg-slate-100'
                        : 'text-slate-700 hover:text-[#185FA5] hover:bg-slate-50'
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#185FA5]' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {/* Dropdown Content */}
                  {isOpen && (
                    <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3.5 pb-2 mb-1 border-b border-slate-100">
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                          {group.label}
                        </span>
                      </div>

                      <div className="space-y-1 px-1.5">
                        {group.items.map((item) => {
                          const isItemActive = activeTab === item.id;
                          const ItemIcon = item.icon;

                          return (
                            <button
                              key={item.id}
                              onClick={() => handleNavClick(item.id)}
                              className={`w-full text-left p-2.5 rounded-xl transition flex items-start space-x-3 group/item cursor-pointer ${
                                isItemActive
                                  ? 'bg-blue-50/80 text-[#185FA5]'
                                  : 'hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <div
                                className={`p-2 rounded-lg shrink-0 mt-0.5 transition ${
                                  isItemActive
                                    ? 'bg-[#185FA5] text-white shadow-xs'
                                    : 'bg-slate-100 text-slate-600 group-hover/item:bg-blue-100 group-hover/item:text-[#185FA5]'
                                }`}
                              >
                                <ItemIcon className="w-4 h-4" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <span
                                    className={`text-xs font-bold truncate ${
                                      isItemActive ? 'text-[#185FA5]' : 'text-slate-800'
                                    }`}
                                  >
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span
                                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold uppercase shrink-0 ${
                                        item.badge === 'Nouveau'
                                          ? 'bg-blue-100 text-[#185FA5]'
                                          : 'bg-orange-100 text-[#D85A30]'
                                      }`}
                                    >
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2.5">
            {/* User Account / Admin Status Button */}
            {isAdmin ? (
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(true)}
                className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-full bg-[#0A2A4D] hover:bg-[#185FA5] text-amber-300 border border-amber-400/40 text-xs font-black shadow-xs transition cursor-pointer"
                title="Ouvrir le panneau d'administration"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Tableau de Bord Admin</span>
              </button>
            ) : currentUser ? (
              <button
                type="button"
                onClick={() => setIsAccountModalOpen(true)}
                className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-full bg-blue-50 hover:bg-blue-100 text-[#185FA5] border border-blue-200 text-xs font-bold transition cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Mon Compte ({currentUser.name.split(' ')[0]})</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-full border border-slate-300 hover:border-[#185FA5] text-slate-700 hover:text-[#185FA5] hover:bg-blue-50/50 text-xs font-bold transition cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Connexion / Admin</span>
              </button>
            )}

            <button
              onClick={onOpenQuoteModal}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-[#0A2A4D] hover:bg-[#185FA5] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Devis Gratuit</span>
            </button>
          </div>

          {/* Mobile menu and action buttons */}
          <div className="flex items-center space-x-1.5 md:hidden">
            {isAdmin ? (
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(true)}
                className="p-2 rounded-xl bg-[#0A2A4D] text-amber-300 border border-amber-400/40 text-xs font-bold min-h-[42px] min-w-[42px] flex items-center justify-center cursor-pointer"
                title="Panneau Admin"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
            ) : currentUser ? (
              <button
                type="button"
                onClick={() => setIsAccountModalOpen(true)}
                className="p-2 rounded-xl bg-blue-50 text-[#185FA5] border border-blue-200 text-xs font-bold min-h-[42px] min-w-[42px] flex items-center justify-center cursor-pointer"
                title="Mon Compte"
              >
                <User className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-2.5 py-1.5 rounded-xl border border-slate-300 text-slate-700 text-[11px] font-bold min-h-[40px] flex items-center space-x-1 cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Connexion</span>
              </button>
            )}

            <button
              onClick={onOpenQuoteModal}
              className="px-3 py-2 rounded-xl bg-[#0A2A4D] text-white text-xs font-bold flex items-center space-x-1 min-h-[42px] cursor-pointer active:scale-95"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Devis</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition min-w-[42px] min-h-[42px] flex items-center justify-center cursor-pointer active:scale-95"
              aria-label="Menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown with Accordion Sub-Menus */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          {/* Direct Home Button */}
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full px-4 py-3 rounded-xl text-left text-sm font-bold transition flex items-center justify-between ${
              activeTab === 'home'
                ? 'bg-blue-50 text-[#185FA5]'
                : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            <span>Accueil</span>
            <Sparkles className="w-4 h-4 text-slate-400" />
          </button>

          {/* Submenu Accordion Groups */}
          {navGroups.map((group) => {
            const isExpanded = mobileExpandedGroup === group.id;
            const active = isGroupActive(group);

            return (
              <div key={group.id} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileExpandedGroup(isExpanded ? null : group.id)}
                  className={`w-full px-4 py-3 text-left text-sm font-bold flex items-center justify-between transition ${
                    active ? 'bg-blue-50/70 text-[#185FA5]' : 'bg-slate-50/80 text-slate-800'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{group.label}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-[#185FA5]"></span>}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-[#185FA5]' : 'text-slate-400'
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="p-2 space-y-1 bg-white border-t border-slate-100">
                    {group.items.map((item) => {
                      const isItemActive = activeTab === item.id;
                      const ItemIcon = item.icon;

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full text-left p-3 rounded-lg transition flex items-center justify-between ${
                            isItemActive
                              ? 'bg-blue-50 text-[#185FA5] font-bold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <ItemIcon className="w-4 h-4 text-slate-500" />
                            <span className="text-xs font-semibold">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span
                              className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
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
                )}
              </div>
            );
          })}

          {/* Mobile Admin / Account Actions */}
          <div className="pt-3 border-t border-gray-100 flex flex-col space-y-2">
            {isAdmin ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminModalOpen(true);
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-[#0A2A4D] text-amber-300 font-bold text-xs"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Panneau Administrateur Polyverse</span>
              </button>
            ) : currentUser ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAccountModalOpen(true);
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-blue-50 text-[#185FA5] font-bold text-xs border border-blue-200"
              >
                <User className="w-4 h-4" />
                <span>{currentUser.name} (Mon Compte & Commandes)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-[#185FA5] text-white font-bold text-xs"
              >
                <User className="w-4 h-4" />
                <span>Connexion ou Créer un Compte</span>
              </button>
            )}

            <a
              href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20je%20souhaite%20un%20devis`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs"
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
