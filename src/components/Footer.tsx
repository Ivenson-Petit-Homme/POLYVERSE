import React from 'react';
import { PolyverseLogo } from './PolyverseLogo';
import { NavigationTab } from '../types';
import { POLYVERSE_INFO } from '../data/polyverseData';
import { Mail, Phone, MapPin, ArrowUp, MessageCircle, ArrowRight } from 'lucide-react';

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
    <footer className="bg-[#111419] text-white border-t border-stone-800 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-stone-800">
          {/* Column 1: Brand & Slogan */}
          <div className="space-y-5">
            <PolyverseLogo variant="full" theme="dark" size="md" />
            <p className="text-stone-300 text-sm leading-relaxed max-w-xs">
              Polyverse connecte vos idées à des résultats concrets en réunissant design, technologie digitale et solutions financières internationales.
            </p>
            <div className="flex items-center space-x-3 pt-1">
              <a
                href={POLYVERSE_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-stone-700 hover:border-white hover:bg-white hover:text-[#111419] flex items-center justify-center transition text-xs font-bold uppercase"
                aria-label="Facebook Polyverse"
              >
                fb
              </a>
              <a
                href={POLYVERSE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-stone-700 hover:border-white hover:bg-white hover:text-[#111419] flex items-center justify-center transition text-xs font-bold uppercase"
                aria-label="Instagram Polyverse"
              >
                ig
              </a>
              <a
                href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-stone-700 hover:border-emerald-500 hover:bg-emerald-600 flex items-center justify-center transition text-stone-300 hover:text-white"
                aria-label="WhatsApp Polyverse"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h3
              className="text-lg font-bold uppercase tracking-wide text-white mb-5"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li>
                <button type="button" onClick={() => handleNav('home')} className="hover:text-white transition cursor-pointer">
                  Accueil
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('about')} className="hover:text-white transition cursor-pointer">
                  À propos & Équipe
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('services')} className="hover:text-white transition cursor-pointer">
                  Nos 5 Piliers de Services
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('order-service')} className="text-[#E87048] hover:text-white font-semibold transition cursor-pointer">
                  Achat Sans Carte & Shipping
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('shop')} className="hover:text-white transition cursor-pointer">
                  Boutique Officielle
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('portfolio')} className="hover:text-white transition cursor-pointer">
                  Portfolio & Réalisations
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('affiliation')} className="text-amber-400 hover:text-white font-semibold transition cursor-pointer">
                  Affiliation (Gagner avec Polyverse)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('donate')} className="hover:text-white transition cursor-pointer">
                  Dons & Soutien
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('contact')} className="hover:text-white transition cursor-pointer">
                  Contact & Prise de RDV
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Expertise Areas */}
          <div>
            <h3
              className="text-lg font-bold uppercase tracking-wide text-white mb-5"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Nos 5 Départements
            </h3>
            <ul className="space-y-3 text-sm text-stone-300">
              <li>01. Design & Impression sur mesure</li>
              <li>02. Tech, Sites Web & Caméras Wi-Fi</li>
              <li>03. Finance, Zelle & Shipping Miami (140 HTG)</li>
              <li>04. Streaming (Netflix, Prime Video, HBO)</li>
              <li>05. Event Planning & Location Matériel</li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#E87048] hover:text-white transition cursor-pointer"
                >
                  <span>Demander un devis gratuit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contact */}
          <div>
            <h3
              className="text-lg font-bold uppercase tracking-wide text-white mb-5"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Contact Direct
            </h3>
            <ul className="space-y-3.5 text-sm text-stone-300">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#D85A30] shrink-0 mt-1" />
                <span>{POLYVERSE_INFO.location}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <div className="flex flex-col space-y-1 text-sm">
                  <a
                    href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white text-emerald-400 font-medium transition"
                  >
                    {POLYVERSE_INFO.whatsappDisplay} (WhatsApp)
                  </a>
                  <a
                    href={`tel:${POLYVERSE_INFO.secondaryPhone}`}
                    className="hover:text-white text-stone-300 transition"
                  >
                    {POLYVERSE_INFO.secondaryPhoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${POLYVERSE_INFO.contactEmail}`} className="hover:text-white transition">
                  {POLYVERSE_INFO.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 gap-4">
          <p>© 2026 Polyverse — Finance et Investissement. Tous droits réservés.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-stone-300 hover:text-white transition border border-stone-700 hover:border-white px-4 py-2 uppercase font-bold tracking-wider cursor-pointer"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
