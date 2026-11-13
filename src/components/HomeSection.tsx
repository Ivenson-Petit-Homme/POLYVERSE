import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationTab, ServiceCategory } from '../types';
import {
  PORTFOLIO_ITEMS,
  TARGET_AUDIENCES,
  POLYVERSE_INFO,
  PILLARS,
  PARTNER_ENTERPRISES,
  POLYVERSE_EXCHANGE_RATE,
  POLYVERSE_SHIPPING_ADDRESS,
} from '../data/polyverseData';
import { TestimonialsSection } from './TestimonialsSection';
import polyverseServicesBanner from '../assets/images/polyverse_hero_banner_1789375953738.jpg';
import serigraphieAtelierImg from '../assets/images/serigraphie_atelier_1791841814507.jpg';
import webTechStudioImg from '../assets/images/web_tech_studio_1791841815443.jpg';
import shippingColisImg from '../assets/images/shipping_colis_haiti_1791841814328.jpg';
import shippingLogisticsBg from '../assets/images/shipping_logistics_bg_1789429529421.jpg';
import evenementGalaImg from '../assets/images/evenement_gala_prestige_1791841816024.jpg';
import streamingHubImg from '../assets/images/streaming_entertainment_hub_1794539554356.jpg';
import {
  ArrowRight,
  ChevronDown,
  MessageCircle,
  Calculator,
  Package,
  Building2,
  GraduationCap,
  Rocket,
  TrendingUp,
} from 'lucide-react';

interface HomeSectionProps {
  setActiveTab: (tab: NavigationTab) => void;
  setSelectedCategory: (cat: ServiceCategory) => void;
  onOpenQuoteModal: () => void;
  onSelectPortfolioProject: (id: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  setActiveTab,
  setSelectedCategory,
  onOpenQuoteModal,
  onSelectPortfolioProject,
}) => {
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'design' | 'tech' | 'finance'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeHeadlineIdx, setActiveHeadlineIdx] = useState<number>(0);

  const ROTATING_THEMES = [
    {
      kicker: 'PÔLE 01 · DESIGN & IMPRESSION SUR MESURE',
      headline: 'DONNEZ VIE À VOS MARQUES & TEXTILES',
      lead: 'Conception de logos, flyers, bannières, sérigraphie haute précision et customisation de t-shirts, tasses, bidons, horloges et porte-clés.',
    },
    {
      kicker: 'PÔLE 02 · TECHNOLOGIE, RÉSEAUX & MÉDIAS',
      headline: 'PROPULSEZ VOTRE PRÉSENCE DIGITALE',
      lead: 'Création de sites web et portfolios modernes, gestion des réseaux sociaux, systèmes Wi-Fi, caméras de surveillance et campagnes de boost ciblées.',
    },
    {
      kicker: 'PÔLE 03 · FINANCE & SHIPPING USA ➔ HAÏTI',
      headline: 'ACHETEZ SANS CARTE AU TAUX DE 140 HTG',
      lead: 'Commandez sur Amazon, Shein ou eBay en Gourdes via MonCash/Natcash, transférez vos fonds Zelle et recevez vos colis via notre adresse à Miami.',
    },
    {
      kicker: 'PÔLES 04 & 05 · STREAMING & ÉVÉNEMENTIEL',
      headline: 'STREAMING HD & ÉVÉNEMENTS D’EXCEPTION',
      lead: 'Abonnements Netflix, Amazon Prime et HBO Max en monnaie locale, ainsi que l’organisation complète et location de matériel pour vos réceptions.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeadlineIdx((prev) => (prev + 1) % ROTATING_THEMES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePillarNavigate = (pillarId: string) => {
    if (pillarId === 'finance' || pillarId === 'streaming' || pillarId === 'events') {
      setActiveTab('order-service');
    } else {
      setSelectedCategory(pillarId as ServiceCategory);
      setActiveTab('services');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPillarImage = (pillarId: string) => {
    switch (pillarId) {
      case 'design':
        return serigraphieAtelierImg;
      case 'tech':
        return webTechStudioImg;
      case 'finance':
        return shippingColisImg;
      case 'streaming':
        return streamingHubImg;
      case 'events':
        return evenementGalaImg;
      default:
        return serigraphieAtelierImg;
    }
  };

  const getAudienceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#0A2A4D]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-[#185FA5]" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-[#D85A30]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-[#0A2A4D]" />;
      default:
        return <Building2 className="w-5 h-5 text-[#185FA5]" />;
    }
  };

  const filteredPortfolio =
    portfolioFilter === 'all'
      ? PORTFOLIO_ITEMS.slice(0, 6)
      : PORTFOLIO_ITEMS.filter((item) => item.category === portfolioFilter).slice(0, 6);

  const FAQS = [
    {
      q: 'Ai-je besoin d’une carte de crédit pour commander sur Amazon, Shein ou eBay ?',
      a: `Non. Avec le service d’Achat Sans Carte Polyverse, il vous suffit de coller le lien complet de votre panier et d’indiquer vos articles en description. Le montant total est calculé automatiquement en Dollars et en Gourdes au taux officiel de ${POLYVERSE_EXCHANGE_RATE} HTG/USD, payable par MonCash ou Natcash.`,
    },
    {
      q: 'Comment expédier un colis vers Haïti via votre adresse de Miami ?',
      a: `Indiquez la nature et le poids de votre colis sur notre plateforme, puis utilisez l’adresse officielle : ${POLYVERSE_SHIPPING_ADDRESS.fullString}. Le tarif transparent est de ${POLYVERSE_SHIPPING_ADDRESS.rate1to5lbs} HTG/lb de 1 à 5 livres, et ${POLYVERSE_SHIPPING_ADDRESS.rate6plusLbs} HTG/lb à partir de 6 livres (plus frais de livraison locale selon votre ville).`,
    },
    {
      q: 'Comment activer un abonnement Netflix, Amazon Prime ou HBO Max ?',
      a: 'Sélectionnez votre abonnement dans l’espace Commande & Services, effectuez le paiement correspondant en MonCash ou Natcash puis envoyez votre capture d’écran de transaction sur notre formulaire ou WhatsApp. Votre accès est activé dans les minutes qui suivent.',
    },
    {
      q: 'Comment fonctionne le Programme d’Affiliation Polyverse ?',
      a: 'Rendez-vous dans la rubrique Affiliation pour choisir votre statut : Ambassadeur (avec dossier et référence), Partenaire (proposition d’intérêts communs), Investisseur (sélection sur la charte d’investissement officielle) ou Promoteur (avec génération automatique d’un code de parrainage personnel après signature du contrat).',
    },
    {
      q: 'Quels sont les délais de livraison pour la sérigraphie et les sites web ?',
      a: 'Les impressions textiles et objets personnalisés sont livrés en 3 à 5 jours ouvrables selon la quantité. Un site web vitrine ou portfolio est conçu et mis en ligne en 7 à 14 jours avec optimisation mobile et intégration WhatsApp.',
    },
  ];

  const currentTheme = ROTATING_THEMES[activeHeadlineIdx];

  return (
    <div className="bg-white text-[#141414]">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO ÉDITORIAL PLEINE LARGEUR (STYLE WWF.FR)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#08101C] text-white overflow-hidden">
        {/* Background photography with clean directional editorial scrim */}
        <div className="absolute inset-0">
          <img
            src={polyverseServicesBanner}
            alt="Polyverse — Design, Technologie, Finance et Événementiel"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08101C]/95 via-[#0A2A4D]/80 to-[#08101C]/35" />
        </div>

        {/* Hero Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-3xl space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHeadlineIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E87048]">
                  {currentTheme.kicker}
                </p>

                <h1
                  className="text-4xl sm:text-6xl lg:text-[68px] font-bold uppercase tracking-tight leading-[0.98] text-white"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {currentTheme.headline}
                </h1>

                <p className="text-base sm:text-lg text-stone-200 max-w-2xl leading-relaxed font-normal">
                  {currentTheme.lead}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Primary & Secondary Editorial Actions */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="px-7 py-3.5 bg-[#D85A30] hover:bg-[#b84722] text-white font-bold uppercase tracking-wider transition-colors flex items-center space-x-2.5 cursor-pointer"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px' }}
              >
                <Calculator className="w-4 h-4" />
                <span>Lancer Mon Projet</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('order-service');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 border-2 border-white text-white hover:bg-white hover:text-[#0A2A4D] font-bold uppercase tracking-wider transition-colors flex items-center space-x-2 cursor-pointer"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px' }}
              >
                <Package className="w-4 h-4" />
                <span>Achat Sans Carte & Shipping</span>
              </button>

              <a
                href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20je%20souhaite%20lancer%20un%20projet`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 text-sm font-semibold text-emerald-300 hover:text-white transition-colors flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Direct</span>
              </a>
            </div>

            {/* Slide Indicator Bars (WWF carousel style) */}
            <div className="pt-4 flex items-center space-x-2">
              {ROTATING_THEMES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveHeadlineIdx(idx)}
                  aria-label={`Afficher le thème ${idx + 1}`}
                  className={`h-1 transition-all duration-300 cursor-pointer ${
                    activeHeadlineIdx === idx ? 'w-10 bg-[#D85A30]' : 'w-5 bg-white/35 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Anchored Quick-Access Strip (WWF Action Bar Style) */}
        <div className="relative z-10 bg-white text-[#141414] border-b border-stone-200">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
            <button
              type="button"
              onClick={() => handlePillarNavigate('design')}
              className="p-5 sm:p-6 text-left hover:bg-[#F4F3EF] transition-colors group cursor-pointer"
            >
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#185FA5] block">
                01 · Design & Impression
              </span>
              <span
                className="text-lg sm:text-xl font-bold uppercase text-[#141414] group-hover:text-[#D85A30] transition-colors flex items-center justify-between mt-1"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <span>Logos, Textile & Objets</span>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#D85A30] group-hover:translate-x-1 transition-all" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => handlePillarNavigate('tech')}
              className="p-5 sm:p-6 text-left hover:bg-[#F4F3EF] transition-colors group cursor-pointer"
            >
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#185FA5] block">
                02 · Technologie & Médias
              </span>
              <span
                className="text-lg sm:text-xl font-bold uppercase text-[#141414] group-hover:text-[#D85A30] transition-colors flex items-center justify-between mt-1"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <span>Sites Web, Wi-Fi & Caméras</span>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#D85A30] group-hover:translate-x-1 transition-all" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('order-service');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-5 sm:p-6 text-left hover:bg-[#F4F3EF] transition-colors group cursor-pointer"
            >
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#D85A30] block">
                03 · Finance & Logistique
              </span>
              <span
                className="text-lg sm:text-xl font-bold uppercase text-[#141414] group-hover:text-[#D85A30] transition-colors flex items-center justify-between mt-1"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <span>Achat Sans Carte & Shipping</span>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#D85A30] group-hover:translate-x-1 transition-all" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('affiliation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-5 sm:p-6 text-left hover:bg-[#F4F3EF] transition-colors group cursor-pointer"
            >
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#0A2A4D] block">
                04 · Opportunités Revenus
              </span>
              <span
                className="text-lg sm:text-xl font-bold uppercase text-[#141414] group-hover:text-[#D85A30] transition-colors flex items-center justify-between mt-1"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <span>Programme d’Affiliation</span>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#D85A30] group-hover:translate-x-1 transition-all" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: NOS ENTREPRISES PARTENAIRES OFFICIELLES & CHIFFRES CLÉS
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#F4F3EF] py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Official Partners Header & 4-Column Architectural Grid */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-300 pb-6">
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#D85A30] block">
                  Alliance & Confiance
                </span>
                <h2
                  className="text-3xl sm:text-4xl font-bold uppercase text-[#141414]"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Nos Entreprises Partenaires Officielles
                </h2>
              </div>
              <p className="text-sm text-stone-600 max-w-md">
                Des collaborations stratégiques durables dans la production, le conseil institutionnel, la mode et l’innovation technologique.
              </p>
            </div>

            {/* Strictly the 4 official partner enterprises: TRANSPRODUS, MAS&ALLIES, JOSTREET, HVING4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PARTNER_ENTERPRISES.map((p, pIdx) => (
                <div
                  key={pIdx}
                  className="bg-white p-6 border border-stone-200 hover:border-[#0A2A4D] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-stone-400 mb-3">
                      <span className="font-tabular">0{pIdx + 1}</span>
                      <span className="uppercase tracking-wider text-[#D85A30]">{p.tag}</span>
                    </div>
                    <h3
                      className="text-2xl sm:text-3xl font-bold uppercase text-[#0A2A4D] tracking-tight"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {p.name}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-600 font-medium mt-4 pt-3 border-t border-stone-100">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* WWF-Style Key Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-stone-300">
            <div>
              <p
                className="text-3xl sm:text-4xl font-bold text-[#0A2A4D] font-tabular"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {POLYVERSE_EXCHANGE_RATE} HTG
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mt-1">
                Taux Officiel pour 1 USD
              </p>
            </div>

            <div>
              <p
                className="text-3xl sm:text-4xl font-bold text-[#D85A30] font-tabular"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {POLYVERSE_SHIPPING_ADDRESS.rate1to5lbs} HTG / LB
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mt-1">
                Tarif Colis Miami (1 à 5 lbs)
              </p>
            </div>

            <div>
              <p
                className="text-3xl sm:text-4xl font-bold text-[#141414] font-tabular"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                5 DÉPARTEMENTS
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mt-1">
                Design, Tech, Finance, Streaming, Events
              </p>
            </div>

            <div>
              <p
                className="text-3xl sm:text-4xl font-bold text-[#185FA5] font-tabular"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                5 À 7 JOURS
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mt-1">
                Délai Express Miami ➔ Haïti
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: NOS 5 PILIERS D'ACTION (GRILLE PHOTOGRAPHIQUE WWF "NOS COMBATS")
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#185FA5] block">
                Catalogue Officiel des Services
              </span>
              <h2
                className="text-3xl sm:text-5xl font-bold uppercase text-[#141414]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Nos 5 Piliers d’Expertise
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-sm font-bold uppercase tracking-wider text-[#0A2A4D] hover:text-[#D85A30] inline-flex items-center space-x-2 cursor-pointer transition-colors"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <span>Voir tous nos services en détail</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* WWF Asymmetric Photographic Mosaic (2 Wide Cards Top + 3 Cards Bottom) */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {PILLARS.map((pillar, idx) => {
              const isLarge = idx < 2;
              const colSpan = isLarge ? 'md:col-span-3' : 'md:col-span-2';
              const heightClass = isLarge ? 'h-80 sm:h-[400px]' : 'h-72 sm:h-[340px]';

              return (
                <div
                  key={pillar.id}
                  onClick={() => handlePillarNavigate(pillar.id)}
                  className={`${colSpan} ${heightClass} relative overflow-hidden bg-stone-900 group cursor-pointer`}
                >
                  <img
                    src={getPillarImage(pillar.id)}
                    alt={pillar.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Editorial dark scrim for guaranteed WCAG legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15" />

                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E87048] mb-1.5">
                      {pillar.subtitle}
                    </span>
                    <h3
                      className="text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-200 mt-2 line-clamp-2 max-w-lg leading-relaxed">
                      {pillar.shortDesc}
                    </p>
                    <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#E87048] transition-colors">
                      <span>Commander ce service</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: FOCUS ÉDITORIAL 50/50 — ACHAT SANS CARTE & SHIPPING MIAMI
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#F4F3EF] border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch">
          {/* Left Full-Bleed Image */}
          <div className="relative min-h-[340px] lg:min-h-full overflow-hidden bg-stone-200">
            <img
              src={shippingLogisticsBg}
              alt="Logistique Internationale Miami vers Haïti"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Editorial Specifications Block */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#D85A30]">
              Focus Finance & Logistique
            </span>

            <h2
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold uppercase text-[#141414] leading-[1.03]"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Achetez Sans Carte et Recevez Vos Colis en Haïti
            </h2>

            <p className="text-base text-stone-600 leading-relaxed">
              Collez directement le lien de votre panier entier (Amazon, Shein, eBay) avec vos précisions en description : votre total en Dollars et en Gourdes est calculé instantanément au taux officiel de <strong>{POLYVERSE_EXCHANGE_RATE} HTG/USD</strong>.
            </p>

            {/* Structured Tabular Specifications */}
            <div className="border-t border-b border-stone-300 divide-y divide-stone-300 text-sm">
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="font-bold text-[#0A2A4D]">Adresse Officielle Miami</span>
                <span className="font-tabular text-stone-700 font-medium">
                  {POLYVERSE_SHIPPING_ADDRESS.fullString}
                </span>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="font-bold text-[#0A2A4D]">Colis de 1 à 5 livres</span>
                <span className="font-tabular text-[#D85A30] font-bold">
                  {POLYVERSE_SHIPPING_ADDRESS.rate1to5lbs} HTG / livre + livraison locale
                </span>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="font-bold text-[#0A2A4D]">Colis de 6 livres et plus</span>
                <span className="font-tabular text-[#D85A30] font-bold">
                  {POLYVERSE_SHIPPING_ADDRESS.rate6plusLbs} HTG / livre + livraison locale
                </span>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="font-bold text-[#0A2A4D]">Streaming & Zelle</span>
                <span className="text-stone-700">
                  Netflix, Prime, HBO Max · Échange Zelle en MonCash/Natcash
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('order-service');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 bg-[#0A2A4D] hover:bg-[#185FA5] text-white font-bold uppercase tracking-wider transition-colors inline-flex items-center space-x-2 cursor-pointer"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px' }}
              >
                <span>Calculer Ma Commande ou Mon Colis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: MOBILISATION SOMBRE — PROGRAMME D'AFFILIATION (STYLE WWF)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#0A2A4D] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E87048]">
              Programme d’Affiliation Polyverse
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold uppercase text-white leading-[1.02]"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Gagnez avec Polyverse Selon Votre Profil
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Rejoignez l’écosystème Polyverse en choisissant l’un de nos quatre statuts officiels : remplissez votre dossier, signez votre contrat numérique et débloquez vos commissions ou dividendes.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('affiliation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 bg-[#D85A30] hover:bg-[#b84722] text-white font-bold uppercase tracking-wider transition-colors inline-flex items-center space-x-2 cursor-pointer"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px' }}
              >
                <span>Accéder à l’Espace Affiliation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                num: '01',
                title: 'Ambassadeur',
                desc: 'Dossier complet (CIN, NIF, adresse, personne de référence) et contrat officiel signé.',
              },
              {
                num: '02',
                title: 'Partenaire',
                desc: 'Proposition de collaboration stratégique et valeur ajoutée mutuelle avec signature contractuelle.',
              },
              {
                num: '03',
                title: 'Investisseur',
                desc: 'Consultation de la charte d’investissement officielle (taux 140 HTG) et souscription encadrée.',
              },
              {
                num: '04',
                title: 'Promoteur',
                desc: 'Sélection des produits à promouvoir et génération automatique de votre code de référence personnel.',
              },
            ].map((track) => (
              <div
                key={track.num}
                onClick={() => {
                  setActiveTab('affiliation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-6 bg-[#071F3A] border border-white/15 hover:border-[#D85A30] transition-colors cursor-pointer group"
              >
                <span className="text-xs font-bold font-tabular text-[#E87048] block mb-2">
                  STATUT {track.num}
                </span>
                <h3
                  className="text-2xl font-bold uppercase text-white group-hover:text-[#E87048] transition-colors"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {track.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {track.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: RÉALISATIONS & PROJETS (GRILLE ÉDITORIALE WWF "ACTUALITÉS")
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#185FA5] block">
                Réalisations Récentes
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold uppercase text-[#141414]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Projets Déployés Pour Nos Clients
              </h2>
            </div>

            {/* Interactive Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Tous' },
                { id: 'design', label: 'Design' },
                { id: 'tech', label: 'Web & Tech' },
                { id: 'finance', label: 'Finance & Shipping' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPortfolioFilter(tab.id as 'all' | 'design' | 'tech' | 'finance')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                    portfolioFilter === tab.id
                      ? 'bg-[#141414] text-white border-[#141414]'
                      : 'bg-white text-stone-700 border-stone-300 hover:border-[#141414]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3-Column Editorial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item) => (
              <article
                key={item.id}
                onClick={() => {
                  setActiveTab('portfolio');
                  onSelectPortfolioProject(item.id);
                }}
                className="group cursor-pointer flex flex-col justify-between border-b border-stone-200 pb-6"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-stone-100 mb-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Unboxed Clean Editorial Metadata */}
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                    <span className="text-[#D85A30]">
                      {item.category === 'design'
                        ? 'Design'
                        : item.category === 'tech'
                        ? 'Tech & Médias'
                        : 'Finance & Events'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.client}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.date}</span>
                  </div>

                  <h3
                    className="text-xl sm:text-2xl font-bold uppercase text-[#141414] group-hover:text-[#185FA5] transition-colors leading-tight mb-2"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0A2A4D] group-hover:text-[#D85A30] transition-colors">
                  <span>{item.results || 'Projet livré'}</span>
                  <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                setActiveTab('portfolio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-3 border border-[#141414] text-[#141414] hover:bg-[#141414] hover:text-white font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Explorer Tout le Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: MÉTHODOLOGIE EN 3 ÉTAPES & PUBLICS ACCOMPAGNÉS
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#F4F3EF] py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* 3-Step Process */}
          <div className="space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#D85A30]">
                Méthodologie Simple
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold uppercase text-[#141414]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Votre Projet Livré en 3 Étapes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Exprimez Votre Besoin',
                  desc: 'Sélectionnez votre service (Design, Tech, Achat Sans Carte, Streaming ou Événement) en ligne ou directement via WhatsApp.',
                },
                {
                  step: '02',
                  title: 'Validation & Paiement Local',
                  desc: 'Nous validons votre cahier des charges ou panier au taux officiel de 140 HTG. Réglez facilement en MonCash, Natcash ou virement.',
                },
                {
                  step: '03',
                  title: 'Livraison & Résultats',
                  desc: 'Réceptionnez vos impressions personnalisées, lancez votre plateforme web ou récupérez vos colis venus de Miami en toute sécurité.',
                },
              ].map((s) => (
                <div key={s.step} className="bg-white p-8 border border-stone-200 space-y-4">
                  <span
                    className="text-4xl font-bold text-[#D85A30] font-tabular block"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {s.step}
                  </span>
                  <h3
                    className="text-2xl font-bold uppercase text-[#141414]"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audiences */}
          <div className="space-y-8 pt-8 border-t border-stone-300">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#185FA5]">
                Pour Qui Travaillons-Nous ?
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold uppercase text-[#141414]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Des Solutions Adaptées à Chaque Profil
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TARGET_AUDIENCES.map((audience) => (
                <div
                  key={audience.id}
                  className="bg-white p-6 border border-stone-200 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="mb-3">{getAudienceIcon(audience.icon)}</div>
                    <h3
                      className="text-xl font-bold uppercase text-[#141414] mb-2"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {audience.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {audience.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-stone-100 text-[11px] font-semibold text-stone-500">
                    {audience.suitableServices.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: TÉMOIGNAGES & FOIRE AUX QUESTIONS
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 border-b border-stone-200">
        <TestimonialsSection onOpenQuoteModal={onOpenQuoteModal} />
      </section>

      <section className="bg-[#F4F3EF] py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#D85A30]">
              Informations Pratiques
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold uppercase text-[#141414]"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Questions Fréquentes
            </h2>
          </div>

          <div className="bg-white border border-stone-200 divide-y divide-stone-200">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index}>
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-base text-[#141414]">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-stone-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#D85A30]' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-sm text-stone-600 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: PRE-FOOTER ACTION CALLOUT (STYLE WWF MOBILISATION)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#D85A30] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/90 block">
              Passez à l’action dès maintenant
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold uppercase text-white leading-[1.02]"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Prêt à Concrétiser Votre Projet avec Polyverse ?
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Obtenez un devis immédiat sans engagement, commandez vos articles aux USA sans carte bancaire ou rejoignez notre programme d’affiliation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="px-7 py-4 bg-[#141414] hover:bg-black text-white font-bold uppercase tracking-wider transition-colors flex items-center space-x-2 cursor-pointer"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px' }}
            >
              <Calculator className="w-4 h-4" />
              <span>Calculer Mon Devis Gratuit</span>
            </button>

            <a
              href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20je%20souhaite%20lancer%20un%20projet`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 bg-white text-[#141414] hover:bg-stone-100 font-bold uppercase tracking-wider transition-colors flex items-center space-x-2"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px' }}
            >
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
