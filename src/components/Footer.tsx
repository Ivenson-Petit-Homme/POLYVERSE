import React from 'react';
import { PolyverseLogo } from './PolyverseLogo';
import { NavigationTab } from '../types';
import { POLYVERSE_INFO } from '../data/polyverseData';
import polyverseFooterBg from '../assets/images/polyverse_hero_banner_1789375953738.jpg';
import { Mail, Phone, MapPin, ArrowUp, MessageCircle, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavigationTab) => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenQuoteModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (tab: NavigationTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#06152B] text-white border-t-2 border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Background Image with Dark Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={polyverseFooterBg}
          alt="Polyverse Footer Backdrop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-110 opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A]/95 via-[#0A2A4D]/85 to-[#06152B]/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Slogan */}
          <div className="space-y-4">
            <PolyverseLogo variant="full" theme="dark" size="md" />
            <p className="text-slate-300 text-sm leading-relaxed mt-3">
              Polyverse connecte les idées à des résultats concrets en réunissant le design visuel, la haute technologie et les solutions financières internationales.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <a
                href={POLYVERSE_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#185FA5] flex items-center justify-center transition text-slate-300 hover:text-white"
                aria-label="Facebook Polyverse"
              >
                <span className="text-xs font-bold">fb</span>
              </a>
              <a
                href={POLYVERSE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#D85A30] flex items-center justify-center transition text-slate-300 hover:text-white"
                aria-label="Instagram Polyverse"
              >
                <span className="text-xs font-bold">ig</span>
              </a>
              <a
                href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition text-slate-300 hover:text-white"
                aria-label="WhatsApp Polyverse"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#D85A30] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition">
                  Accueil
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition">
                  À propos & Équipe
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition">
                  Nos Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('order-service')} className="hover:text-white transition text-[#D85A30] font-semibold">
                  Achat Sans Carte & Shipping
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-white transition">
                  Boutique & Merchandising
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('portfolio')} className="hover:text-white transition">
                  Portfolio & Réalisations
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('donate')} className="hover:text-white transition">
                  Dons & Soutien
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('partnership')} className="hover:text-white transition">
                  Devenir Partenaire
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition">
                  Contact & Prise de RDV
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Expertise Areas */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#185FA5] mb-4">
              Nos Piliers
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#185FA5]"></span>
                <span>Design & Sérigraphie</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A2A4D] border border-blue-400"></span>
                <span>Tech & Marketing digital</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D85A30]"></span>
                <span>Finance & Investissement</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenQuoteModal}
                  className="text-xs text-[#D85A30] hover:underline font-semibold flex items-center space-x-1"
                >
                  <span>Demander un devis sur mesure</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
              Contact Direct
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#D85A30] shrink-0 mt-0.5" />
                <span>{POLYVERSE_INFO.location}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex flex-col space-y-0.5 text-xs">
                  <a
                    href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white text-emerald-300 font-medium transition"
                  >
                    {POLYVERSE_INFO.whatsappDisplay} (WhatsApp)
                  </a>
                  <a
                    href={`tel:${POLYVERSE_INFO.secondaryPhone}`}
                    className="hover:text-white text-slate-300 transition"
                  >
                    {POLYVERSE_INFO.secondaryPhoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#185FA5] shrink-0" />
                <a href={`mailto:${POLYVERSE_INFO.contactEmail}`} className="hover:text-white transition">
                  {POLYVERSE_INFO.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p>© 2026 Polyverse. Tous droits réservés. Version site vitrine / portfolio.</p>
          <div className="mt-4 md:mt-0 flex items-center space-x-6">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-slate-300 hover:text-white transition bg-slate-800/80 px-3 py-1.5 rounded-lg"
            >
              <span>Haut de page</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
