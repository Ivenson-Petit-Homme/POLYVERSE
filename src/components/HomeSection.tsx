import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationTab, ServiceCategory } from '../types';
import { PORTFOLIO_ITEMS, TARGET_AUDIENCES, POLYVERSE_INFO } from '../data/polyverseData';
import { TestimonialsSection } from './TestimonialsSection';
import { ScrollReveal } from './ScrollReveal';
import { SectionDarkDivider } from './SectionDarkDivider';
import polyverseServicesBanner from '../assets/images/polyverse_hero_banner_1789375953738.jpg';
import officialLogoImg from '../assets/images/polyverse_official_logo_1789375972137.jpg';
import {
  Palette,
  Code,
  CreditCard,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building2,
  GraduationCap,
  Rocket,
  TrendingUp,
  MessageCircle,
  Calculator,
  ChevronDown,
  Check,
  Star,
  ShoppingBag,
  Package,
  Truck,
  Laptop,
  Zap,
  Clock,
  ThumbsUp,
  Shield,
  HelpCircle,
} from 'lucide-react';

interface HomeSectionProps {
  setActiveTab: (tab: NavigationTab) => void;
  setSelectedCategory: (cat: ServiceCategory) => void;
  onOpenQuoteModal: () => void;
  onSelectPortfolioProject: (id: string) => void;
}

type HeroTabKey = 'design' | 'tech' | 'shipping' | 'shop';

export const HomeSection: React.FC<HomeSectionProps> = ({
  setActiveTab,
  setSelectedCategory,
  onOpenQuoteModal,
  onSelectPortfolioProject,
}) => {
  const [activeHeroTab, setActiveHeroTab] = useState<HeroTabKey>('design');
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'design' | 'tech' | 'finance'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeServiceIdx, setActiveServiceIdx] = useState<number>(0);

  const ROTATING_SERVICES = [
    {
      title: 'vos Sérigraphies & Textiles',
      subtitle: 'Impression nette 1 à 4 couleurs, cotons peignés premium et emballage sur-mesure pour votre marque.',
      badge: 'Atelier Textile & Goodies',
      color: 'from-cyan-300 via-sky-200 to-blue-400',
      tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
    },
    {
      title: 'vos Sites Web & E-commerce',
      subtitle: 'Sites responsives ultra-rapides, scoring Google 98/100 et campagnes Meta Ads génératrices de ventes.',
      badge: 'Tech & Marketing Digital',
      color: 'from-emerald-300 via-teal-200 to-cyan-300',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    },
    {
      title: 'vos Achats Amazon & Shein',
      subtitle: 'Achetez sans carte bancaire internationale et réglez facilement en Gourdes par MonCash ou Natcash.',
      badge: 'Achat Sans Carte & Shipping',
      color: 'from-amber-300 via-orange-300 to-[#D85A30]',
      tagColor: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
    },
    {
      title: 'vos Idées en Résultats Concrets',
      subtitle: 'Accompagnement tout-en-un de la conception graphique initiale jusqu’à la livraison finale entre vos mains.',
      badge: 'Solutions Clés en Main',
      color: 'from-amber-200 via-yellow-100 to-emerald-300',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    },
  ];

  // Auto-rotate hero texts every 3.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveServiceIdx((prev) => (prev + 1) % ROTATING_SERVICES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handlePillarClick = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setActiveTab('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getAudienceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#185FA5]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-[#185FA5]" />;
      case 'Rocket':
        return <Rocket className="w-6 h-6 text-[#D85A30]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#0A2A4D]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#185FA5]" />;
    }
  };

  const filteredPortfolio =
    portfolioFilter === 'all'
      ? PORTFOLIO_ITEMS.slice(0, 6)
      : PORTFOLIO_ITEMS.filter((item) => item.category === portfolioFilter).slice(0, 6);

  const FAQS = [
    {
      q: 'Ai-je besoin d’une carte de crédit pour commander sur Amazon ou Shein ?',
      a: 'Non ! Grâce à notre service exclusif d’Achat Sans Carte, il vous suffit de nous transmettre les liens ou photos des articles souhaités. Nous calculons le montant en Gourdes (HTG) ou en Dollars (USD), vous effectuez votre paiement facilement par MonCash, Natcash ou virement bancaire, et notre équipe effectue la commande immédiatement.',
    },
    {
      q: 'Comment s’effectue la livraison des colis entre les États-Unis et Haïti ?',
      a: 'Nous disposons de notre propre adresse de transit sécurisée en Floride (Miami). Dès réception de votre marchandise, celle-ci est préparée pour l’expédition aérienne ou maritime. Vos colis arrivent en Haïti en 5 à 7 jours ouvrés, disponibles en retrait ou livrés directement à votre porte.',
    },
    {
      q: 'Quels sont les délais pour la sérigraphie textile ou la création d’un site web ?',
      a: 'Pour la sérigraphie (t-shirts personnalisés, uniformes, casquettes), le délai moyen est de 3 à 5 jours selon le volume. Pour un site web vitrine ou e-commerce, nous livrons une première version fonctionnelle en 7 à 14 jours, incluant design responsive, SEO et sécurité renforcée.',
    },
    {
      q: 'Comment puis-je générer des revenus avec la Boutique et le Programme d’Affiliation ?',
      a: 'Tout créateur de contenu, étudiant ou entrepreneur peut rejoindre gratuitement notre programme d’ambassadeurs. Vous obtenez un code promo personnalisé (ex: POLYVIP). Lorsque votre communauté utilise votre code, elle bénéficie de 10% de réduction immédiate et vous touchez entre 10% et 15% de commission versée directement par MonCash ou virement.',
    },
    {
      q: 'Le devis et l’étude de faisabilité sont-ils gratuits et sans engagement ?',
      a: 'Oui, 100% gratuits et sans aucun engagement ! Utilisez notre calculateur de devis interactif en ligne ou contactez-nous directement sur WhatsApp pour échanger en direct avec les co-fondateurs de Polyverse.',
    },
  ];

  return (
    <div className="font-['Montserrat',sans-serif] text-[#192338] bg-white">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO SECTION (CLEAR VIBRANT BACKGROUND & PROMINENT SERVICES)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#06152B] pt-14 pb-20 lg:pt-24 lg:pb-32 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 overflow-hidden text-white">
        {/* Animated Background Container - Crystal Clear Visibility */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Ken Burns gentle animated zoom on official services banner */}
          <motion.div
            animate={{
              scale: [1.0, 1.06, 1.0],
              x: [0, -14, 0],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={polyverseServicesBanner}
              alt="Polyverse Services: Sérigraphie, Tech Web & Achat sans carte"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90 filter contrast-110 saturate-110 brightness-95"
            />
          </motion.div>

          {/* Targeted gradient protection so image remains 100% visible while text is crystal readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#06152B]/75 via-[#0A2A4D]/45 to-[#06152B]/90" />

          {/* Floating Vibrant Orb 1: Polyverse Blue */}
          <motion.div
            animate={{
              x: [-35, 35, -35],
              y: [-25, 25, -25],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-32 left-1/5 w-[480px] h-[480px] bg-blue-500/20 rounded-full blur-3xl"
          />

          {/* Floating Vibrant Orb 2: Polyverse Coral */}
          <motion.div
            animate={{
              x: [30, -30, 30],
              y: [20, -30, 20],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-16 right-1/5 w-[420px] h-[420px] bg-orange-500/20 rounded-full blur-3xl"
          />

          {/* Floating Sparks / Micro Light Particles */}
          {[
            { left: '15%', top: '25%', duration: 7, delay: 0 },
            { left: '80%', top: '35%', duration: 9, delay: 1 },
            { left: '30%', top: '70%', duration: 8, delay: 2 },
            { left: '65%', top: '65%', duration: 10, delay: 0.5 },
            { left: '45%', top: '20%', duration: 7.5, delay: 1.5 },
          ].map((p, idx) => (
            <motion.div
              key={idx}
              animate={{
                y: [-15, 15, -15],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
              style={{ left: p.left, top: p.top }}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-tr from-cyan-400 to-[#D85A30] blur-[0.5px]"
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Top Pill / Eyebrow with official logo and animated live sync */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#06152B]/85 border border-slate-700/80 shadow-lg text-xs font-semibold text-slate-200 backdrop-blur-md"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-amber-400/90 shadow-2xs bg-[#06152B]">
                <img
                  src={officialLogoImg}
                  alt="Polyverse Logo Officiel"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D85A30] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D85A30]"></span>
              </span>
              <span>Polyverse • Idée | Stratégie | Finance</span>
              <span className="text-slate-600">|</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeServiceIdx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="text-cyan-300 font-bold"
                >
                  {ROTATING_SERVICES[activeServiceIdx].badge}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Main Animated Title & Dynamic Rotating Subtitle */}
          <div className="text-center max-w-4xl mx-auto mt-6 space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-lg"
            >
              <span>Créez et développez </span>
              <br className="hidden sm:inline" />
              <span className="relative inline-block min-h-[1.25em] min-w-[280px] sm:min-w-[480px] align-top overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeServiceIdx}
                    initial={{ y: 35, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -35, opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className={`inline-block font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${ROTATING_SERVICES[activeServiceIdx].color} drop-shadow-sm`}
                  >
                    {ROTATING_SERVICES[activeServiceIdx].title}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              <span>avec </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-[#D85A30] underline decoration-[#D85A30]/50 underline-offset-8">
                Polyverse
              </span>
            </motion.h1>

            {/* Dynamic Animated Subtitle synced with current service */}
            <div className="min-h-[64px] sm:min-h-[52px] flex items-center justify-center max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeServiceIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal text-center drop-shadow-md"
                >
                  {ROTATING_SERVICES[activeServiceIdx].subtitle}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Pill Action Buttons with hover glow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-3 pt-3"
            >
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="px-8 py-4 rounded-full bg-[#185FA5] hover:bg-[#1f73c5] text-white font-bold text-sm shadow-xl shadow-blue-950/60 hover:-translate-y-0.5 transition-all duration-200 active:scale-95 flex items-center space-x-2 cursor-pointer group border border-blue-400/30"
              >
                <Calculator className="w-4 h-4 group-hover:rotate-12 transition-transform text-cyan-300" />
                <span>Commencer Gratuitement</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('order-service');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-4 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/30 backdrop-blur-md shadow-lg hover:border-cyan-300 hover:-translate-y-0.5 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Package className="w-4 h-4 text-orange-400" />
                <span>Achat Sans Carte & Shipping</span>
              </button>

              <a
                href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20je%20souhaite%20lancer%20un%20projet`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-xl shadow-emerald-950/50 hover:-translate-y-0.5 transition-all flex items-center space-x-2 border border-emerald-400/30"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Direct</span>
              </a>
            </motion.div>

            {/* Trust Under-Notes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-300"
            >
              <span className="flex items-center space-x-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Sans engagement</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center space-x-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Paiement MonCash & Natcash</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center space-x-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-white font-bold">4.9/5</span>
                <span className="text-slate-300">(150+ avis vérifiés)</span>
              </span>
            </motion.div>
          </div>

          {/* Webnode Interactive Browser Frame & Preview Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl bg-white shadow-2xl border border-slate-200/90 overflow-hidden">
              {/* Webnode Mockup Window Header */}
              <div className="bg-[#F8F9FA] border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
                  <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                    https://polyverse.pro/hub
                  </span>
                </div>

                {/* Tab Switcher Pills */}
                <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setActiveHeroTab('design')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      activeHeroTab === 'design'
                        ? 'bg-[#185FA5] text-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Sérigraphie
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveHeroTab('tech')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      activeHeroTab === 'tech'
                        ? 'bg-[#0A2A4D] text-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tech & Web
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveHeroTab('shipping')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      activeHeroTab === 'shipping'
                        ? 'bg-[#D85A30] text-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Achat & Shipping
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveHeroTab('shop')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      activeHeroTab === 'shop'
                        ? 'bg-purple-700 text-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Boutique
                  </button>
                </div>
              </div>

              {/* Inner Canvas */}
              <div className="relative min-h-[380px] bg-slate-50/70 p-6 sm:p-10 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                  <img
                    src={polyverseServicesBanner}
                    alt="Polyverse Sèvis"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <AnimatePresence mode="wait">
                  {activeHeroTab === 'design' && (
                    <motion.div
                      key="design"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                    >
                      <div className="space-y-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-[#185FA5]">
                          Atelier Sérigraphie & Textile
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#192338]">
                          Impression Textile Précise & Packaging
                        </h3>
                        <p className="text-sm text-[#4B5874] leading-relaxed">
                          T-shirts, maillots, casquettes, sacs et goodies pour votre marque ou entreprise avec encre écologique haute résistance au lavage.
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#185FA5]" />
                            <span>1 à 4 couleurs nettes</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#185FA5]" />
                            <span>Livraison rapide 3-5j</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#185FA5]" />
                            <span>100% Coton peigné</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#185FA5]" />
                            <span>Tarifs dégressifs gros</span>
                          </div>
                        </div>
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => handlePillarClick('design')}
                            className="px-6 py-2.5 rounded-full bg-[#185FA5] text-white text-xs font-bold hover:bg-[#0A2A4D] transition flex items-center space-x-2"
                          >
                            <span>Voir le catalogue Sérigraphie</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                          <img
                            src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
                            alt="Impression textile"
                            referrerPolicy="no-referrer"
                            className="w-full h-64 object-cover"
                          />
                        </div>
                        <motion.div
                          animate={{ y: [-4, 4, -4] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg border border-slate-100 flex items-center space-x-3"
                        >
                          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                            <Check className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#192338]">Qualité Sérigraphie</p>
                            <p className="text-[10px] text-slate-500 font-medium">+10,000 pièces imprimées</p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {activeHeroTab === 'tech' && (
                    <motion.div
                      key="tech"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                    >
                      <div className="space-y-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200 text-[#0A2A4D]">
                          Développement Web & Meta Ads
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#192338]">
                          Des Plateformes Web Rapides & Sécurisées
                        </h3>
                        <p className="text-sm text-[#4B5874] leading-relaxed">
                          Création de sites vitrines élégants, boutiques e-commerce prêtes à vendre, et optimisation du référencement Google pour attirer des clients réguliers.
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Score vitesse Google 98/100</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>100% Adapté Mobile / Tablette</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Campagnes Meta Ads ciblées</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Sécurité SSL & Sauvegardes</span>
                          </div>
                        </div>
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => handlePillarClick('tech')}
                            className="px-6 py-2.5 rounded-full bg-[#0A2A4D] text-white text-xs font-bold hover:bg-[#185FA5] transition flex items-center space-x-2"
                          >
                            <span>Découvrir nos solutions Tech</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                          <img
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                            alt="Tech et Web"
                            referrerPolicy="no-referrer"
                            className="w-full h-64 object-cover"
                          />
                        </div>
                        <motion.div
                          animate={{ y: [-4, 4, -4] }}
                          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute -top-3 -right-3 bg-white rounded-xl p-3 shadow-lg border border-slate-100 flex items-center space-x-2"
                        >
                          <Zap className="w-5 h-5 text-amber-500" />
                          <div>
                            <p className="text-xs font-bold text-[#192338]">Temps de chargement</p>
                            <p className="text-[10px] text-emerald-600 font-bold">0.6s • Ultra Rapide</p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {activeHeroTab === 'shipping' && (
                    <motion.div
                      key="shipping"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                    >
                      <div className="space-y-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-[#D85A30]">
                          Achat Sans Carte & Shipping USA - Haïti
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#192338]">
                          Achetez sur Amazon ou Shein sans carte bancaire
                        </h3>
                        <p className="text-sm text-[#4B5874] leading-relaxed">
                          Collez votre lien, nous achetons pour vous aux USA, nous réceptionnons votre colis dans notre entrepôt à Miami et nous l’acheminons directement en Haïti.
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#D85A30]" />
                            <span>Paiement MonCash & Natcash</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#D85A30]" />
                            <span>Colis garanti & assuré</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#D85A30]" />
                            <span>Expédition 5-7 jours</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#D85A30]" />
                            <span>Tarif transparent en Gourdes</span>
                          </div>
                        </div>
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('order-service');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-6 py-2.5 rounded-full bg-[#D85A30] text-white text-xs font-bold hover:bg-[#c24e27] transition flex items-center space-x-2"
                          >
                            <span>Remplir une commande sans carte</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                          <img
                            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                            alt="Logistique et Colis"
                            referrerPolicy="no-referrer"
                            className="w-full h-64 object-cover"
                          />
                        </div>
                        <motion.div
                          animate={{ y: [-4, 4, -4] }}
                          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute -bottom-3 -right-3 bg-white rounded-xl p-3 shadow-lg border border-slate-100 flex items-center space-x-3"
                        >
                          <div className="p-2 rounded-lg bg-orange-100 text-[#D85A30]">
                            <Truck className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#192338]">Suivi Miami ➔ Haïti</p>
                            <p className="text-[10px] text-emerald-600 font-bold">Arrivée estimée : 5-7 jours</p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {activeHeroTab === 'shop' && (
                    <motion.div
                      key="shop"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                    >
                      <div className="space-y-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
                          Boutique Officielle & Programme Affilié
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#192338]">
                          Collection Polyverse & Revenus d'Affiliation
                        </h3>
                        <p className="text-sm text-[#4B5874] leading-relaxed">
                          Achetez nos articles exclusifs ou générez des revenus en partageant votre propre code promo personnalisé (10% à 15% de commission par vente).
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-purple-600" />
                            <span>T-shirts & Hoodies premium</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-purple-600" />
                            <span>10% de rabais avec code promo</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-purple-600" />
                            <span>Paiement commissions par MonCash</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-purple-600" />
                            <span>Inscriptions affiliés ouvertes</span>
                          </div>
                        </div>
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('shop');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-6 py-2.5 rounded-full bg-purple-700 text-white text-xs font-bold hover:bg-purple-800 transition flex items-center space-x-2"
                          >
                            <span>Visiter la Boutique & Devenir Affilié</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                          <img
                            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
                            alt="Boutique et merchandising"
                            referrerPolicy="no-referrer"
                            className="w-full h-64 object-cover"
                          />
                        </div>
                        <motion.div
                          animate={{ y: [-4, 4, -4] }}
                          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute -top-3 -left-3 bg-white rounded-xl p-3 shadow-lg border border-slate-100 flex items-center space-x-2"
                        >
                          <ShoppingBag className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="text-xs font-bold text-[#192338]">Code Partenaire</p>
                            <p className="text-[10px] text-purple-600 font-bold">15% de commission direct</p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dark Separator 1 */}
      <SectionDarkDivider label="Écosystème & Partenariats Intégrés" />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: LOGOS & SOCIAL PROOF STRIP (WEBNODE PURE WHITE BG #FFFFFF)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#4B5874] mb-6">
            Plateformes & Partenaires intégrés à nos opérations quotidiennes
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="font-extrabold text-slate-800 tracking-tight text-xl">amazon</span>
            <span className="font-extrabold text-slate-800 tracking-tight text-xl">SHEIN</span>
            <span className="font-extrabold text-[#D85A30] tracking-tight text-xl">MonCash</span>
            <span className="font-extrabold text-[#185FA5] tracking-tight text-xl">Natcash</span>
            <span className="font-extrabold text-slate-800 tracking-tight text-xl">ebay</span>
            <span className="font-extrabold text-slate-800 tracking-tight text-xl">AliExpress</span>
            <span className="font-extrabold text-[#0A2A4D] tracking-tight text-xl">Meta Ads</span>
            <span className="font-extrabold text-amber-600 tracking-tight text-xl">DHL</span>
          </div>
        </div>
      </section>

      {/* Dark Separator 2 */}
      <SectionDarkDivider label="Modèles & Réalisations Prêtes" />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: TEMPLATES & SERVICES SHOWCASE (WEBNODE PALE BG #F4F6F9)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#F4F6F9] py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto space-y-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#185FA5] block">
                  Modèles & Réalisations
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#192338] tracking-tight">
                  Des solutions sur-mesure prêtes pour vous
                </h2>
                <p className="text-sm text-[#4B5874] max-w-xl">
                  Parcourez nos réalisations concrètes et choisissez le service parfaitement adapté à vos objectifs.
                </p>
              </div>

              {/* Webnode Filter Pills */}
              <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setPortfolioFilter('all')}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                    portfolioFilter === 'all'
                      ? 'bg-[#0A2A4D] text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Tous les projets
                </button>
                <button
                  type="button"
                  onClick={() => setPortfolioFilter('design')}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                    portfolioFilter === 'design'
                      ? 'bg-[#185FA5] text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Sérigraphie
                </button>
                <button
                  type="button"
                  onClick={() => setPortfolioFilter('tech')}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                    portfolioFilter === 'tech'
                      ? 'bg-[#0A2A4D] text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Web & Tech
                </button>
                <button
                  type="button"
                  onClick={() => setPortfolioFilter('finance')}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                    portfolioFilter === 'finance'
                      ? 'bg-[#D85A30] text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Finance & Shipping
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Grid of Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolio.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 0.08}>
                <div
                  onClick={() => {
                    setActiveTab('portfolio');
                    onSelectPortfolioProject(item.id);
                  }}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#0A2A4D]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                        {item.category === 'design'
                          ? 'Design'
                          : item.category === 'tech'
                          ? 'Tech'
                          : 'Finance'}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-base text-[#192338] group-hover:text-[#185FA5] transition line-clamp-1 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#D85A30] mb-2">{item.client}</p>
                      <p className="text-xs text-[#4B5874] line-clamp-2 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                      {item.results || item.date}
                    </span>
                    <span className="text-[#185FA5] font-bold flex items-center space-x-1 group-hover:translate-x-1 transition">
                      <span>Explorer</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => {
                setActiveTab('portfolio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-3 rounded-full bg-white hover:bg-slate-100 text-[#192338] font-bold text-xs border border-slate-300 shadow-2xs transition"
            >
              Voir tout le Portfolio Polyverse →
            </button>
          </div>
        </div>
      </section>

      {/* Dark Separator 3 */}
      <SectionDarkDivider label="Méthodologie & Déploiement en 3 Étapes" />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: 3 ÉTAPES FACILES (WEBNODE PURE WHITE BG #FFFFFF)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#185FA5]">
                Processus Simple & Transparent
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#192338] tracking-tight">
                Créer avec Polyverse est un jeu d'enfant
              </h2>
              <p className="text-[#4B5874] text-sm sm:text-base font-normal">
                3 étapes claires de l'idée initiale jusqu'à la livraison finale entre vos mains.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <ScrollReveal delay={0.1}>
              <div className="bg-[#F8F9FA] rounded-2xl p-8 border border-slate-200 shadow-2xs hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#185FA5] flex items-center justify-center font-extrabold text-xl mb-6 group-hover:bg-[#185FA5] group-hover:text-white transition">
                    01
                  </div>
                  <h3 className="text-xl font-bold text-[#192338] mb-3">Exprimez votre besoin</h3>
                  <p className="text-sm text-[#4B5874] leading-relaxed mb-4 font-normal">
                    Choisissez votre service (Sérigraphie textile, Site internet vitrine, ou Achat Amazon/Shein). Remplissez le formulaire en ligne en 2 minutes ou écrivez-nous sur WhatsApp.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-[#185FA5]">
                  <span>2 minutes requises</span>
                  <Clock className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal delay={0.2}>
              <div className="bg-[#F8F9FA] rounded-2xl p-8 border border-slate-200 shadow-2xs hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#D85A30] flex items-center justify-center font-extrabold text-xl mb-6 group-hover:bg-[#D85A30] group-hover:text-white transition">
                    02
                  </div>
                  <h3 className="text-xl font-bold text-[#192338] mb-3">Validation & Exécution</h3>
                  <p className="text-sm text-[#4B5874] leading-relaxed mb-4 font-normal">
                    Nous validons vos maquettes graphiques, codons votre plateforme ou effectuons vos achats immédiatement aux USA. Vous réglez simplement par MonCash ou Natcash.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-[#D85A30]">
                  <span>Suivi transparent en direct</span>
                  <ThumbsUp className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal delay={0.3}>
              <div className="bg-[#F8F9FA] rounded-2xl p-8 border border-slate-200 shadow-2xs hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-xl mb-6 group-hover:bg-emerald-600 group-hover:text-white transition">
                    03
                  </div>
                  <h3 className="text-xl font-bold text-[#192338] mb-3">Réception & Succès</h3>
                  <p className="text-sm text-[#4B5874] leading-relaxed mb-4 font-normal">
                    Récupérez vos textiles sérigraphiés, lancez votre site web devant vos clients ou recevez vos colis directement en Haïti en 5 à 7 jours ouvrables.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-emerald-700">
                  <span>Livraison garantie</span>
                  <Truck className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Dark Separator 4 */}
      <SectionDarkDivider label="Pôles d'Excellence & Métiers Polyverse" />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: ALTERNATING 2-COLUMN FEATURES (WEBNODE SIGNATURE)
         ───────────────────────────────────────────────────────────── */}
      <div className="space-y-0">
        {/* Block 1: Sérigraphie (White Background) */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#185FA5] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 inline-block">
                    Atelier Sérigraphie & Packaging
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-[#192338] leading-tight tracking-tight">
                    Une identité visuelle marquante pour habiller votre projet
                  </h2>
                  <p className="text-[#4B5874] text-sm sm:text-base leading-relaxed font-normal">
                    Que vous soyez une entreprise cherchant des uniformes élégants, un artiste lançant une collection de streetwear, ou un organisateur d'événements, notre atelier de sérigraphie garantit un rendu professionnel impeccable.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="p-1 rounded-full bg-blue-100 text-[#185FA5] mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium">
                        Impression sur t-shirts, polos, hoodies, casquettes et goodies écologiques.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-1 rounded-full bg-blue-100 text-[#185FA5] mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium">
                        Création complète de logos et chartes graphiques vectorielles sur-mesure.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-1 rounded-full bg-blue-100 text-[#185FA5] mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium">
                        Délais express et contrôle qualité rigoureux avant chaque livraison.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => handlePillarClick('design')}
                      className="px-7 py-3 rounded-full bg-[#185FA5] hover:bg-[#0A2A4D] text-white text-xs font-bold transition flex items-center space-x-2"
                    >
                      <span>Explorer les options Sérigraphie</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={onOpenQuoteModal}
                      className="text-xs font-bold text-slate-700 hover:text-[#D85A30] underline underline-offset-4 transition"
                    >
                      Calculer un devis
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80"
                      alt="Sérigraphie Polyverse"
                      referrerPolicy="no-referrer"
                      className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 max-w-xs">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#185FA5]">
                        <Palette className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#192338]">100% Maquettes Validées</p>
                        <p className="text-[11px] text-slate-500 font-medium">Validation gratuite avant tirage</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Dark Separator between Features Block 1 and 2 */}
        <SectionDarkDivider label="Ingénierie Web & Accélération Digitale" />

        {/* Block 2: Tech & Marketing (Pale Background #F4F6F9) */}
        <section className="bg-[#F4F6F9] py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative order-2 lg:order-1">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80"
                      alt="Tech et Web"
                      referrerPolicy="no-referrer"
                      className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="absolute -top-5 -left-5 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 max-w-xs">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Laptop className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#192338]">Sites Haute Performance</p>
                        <p className="text-[11px] text-emerald-600 font-bold">SEO & Mobile-Ready</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 order-1 lg:order-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0A2A4D] bg-slate-200/70 px-3.5 py-1 rounded-full border border-slate-300 inline-block">
                    Développement Web & Marketing
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-[#192338] leading-tight tracking-tight">
                    Propulsez votre visibilité avec des outils digitaux modernes
                  </h2>
                  <p className="text-[#4B5874] text-sm sm:text-base leading-relaxed font-normal">
                    Un site web lent ou mal structuré fait fuir vos prospects. Nous concevons des sites responsives ultra-rapides et déployons des campagnes Meta Ads géolocalisées pour convertir vos visiteurs en acheteurs réguliers.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="p-1 rounded-full bg-slate-200 text-[#0A2A4D] mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium">
                        Développement web sur-mesure (React, Tailwind, WordPress, Shopify).
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-1 rounded-full bg-slate-200 text-[#0A2A4D] mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium">
                        Gestion professionnelle de publicités Facebook & Instagram Ads.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-1 rounded-full bg-slate-200 text-[#0A2A4D] mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium">
                        Cartes virtuelles Visa/Mastercard pour vos paiements de campagnes publicitaires.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => handlePillarClick('tech')}
                      className="px-7 py-3 rounded-full bg-[#0A2A4D] hover:bg-[#185FA5] text-white text-xs font-bold transition flex items-center space-x-2"
                    >
                      <span>Découvrir les services Tech</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={onOpenQuoteModal}
                      className="text-xs font-bold text-slate-700 hover:text-[#D85A30] underline underline-offset-4 transition"
                    >
                      Obtenir un devis web
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Dark Separator between Features Block 2 and 3 */}
        <SectionDarkDivider label="Logistique Internationale & Achats USA" />

        {/* Block 3: Achat Sans Carte (White Background) */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D85A30] bg-orange-50 px-3.5 py-1 rounded-full border border-orange-100 inline-block">
                    Finance & Logistique Internationale
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-[#192338] leading-tight tracking-tight">
                    Accédez à tous les magasins du monde sans carte bancaire
                  </h2>
                  <p className="text-[#4B5874] text-sm sm:text-base leading-relaxed font-normal">
                    Ne soyez plus bloqué par l’absence de carte internationale. Commandez vêtements, électronique ou matériel professionnel sur Amazon, Shein ou AliExpress et réglez simplement par MonCash ou Natcash.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="p-1 rounded-full bg-orange-100 text-[#D85A30] mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium">
                        Achat sécurisé immédiat avec notre carte bancaire aux USA.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-1 rounded-full bg-orange-100 text-[#D85A30] mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium">
                        Réception en entrepôt à Miami et réexpédition sécurisée vers Haïti.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-1 rounded-full bg-orange-100 text-[#D85A30] mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium">
                        Paiement 100% en Gourdes (MonCash / Natcash) au taux transparent du jour.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('order-service');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-7 py-3 rounded-full bg-[#D85A30] hover:bg-[#c24e27] text-white text-xs font-bold transition flex items-center space-x-2"
                    >
                      <span>Lancer une commande sans carte</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80"
                      alt="Logistique Achat sans carte"
                      referrerPolicy="no-referrer"
                      className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 max-w-xs">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#D85A30]">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#192338]">100% MonCash & Natcash</p>
                        <p className="text-[11px] text-slate-500 font-medium">Zéro frais cachés</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>

      {/* Dark Separator 5 */}
      <SectionDarkDivider label="Profils & Secteurs Accompagnés" />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: POUR QUI TRAVAILLONS-NOUS (WEBNODE PALE BG #F4F6F9)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#F4F6F9] py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#185FA5]">
                Pour Qui Travaillons-nous ?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#192338] tracking-tight">
                À Qui S’adresse Polyverse ?
              </h2>
              <p className="text-[#4B5874] text-sm font-normal">
                Que vous soyez une entreprise établie, un étudiant ou un créateur, nous avons la réponse adaptée à votre besoin.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TARGET_AUDIENCES.map((audience, idx) => (
              <ScrollReveal key={audience.id} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                      {getAudienceIcon(audience.icon)}
                    </div>
                    <h3 className="font-bold text-base text-[#192338] mb-2">{audience.title}</h3>
                    <p className="text-xs text-[#4B5874] leading-relaxed mb-4 font-normal">{audience.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-100">
                    {audience.suitableServices.map((srv, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-700"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Separator 6 */}
      <SectionDarkDivider label="Avis Vérifiés & Témoignages Clients" />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: TÉMOIGNAGES & AVIS CLIENTS (WEBNODE PURE WHITE BG #FFFFFF)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 border-b border-slate-200/80">
        <ScrollReveal>
          <TestimonialsSection onOpenQuoteModal={onOpenQuoteModal} />
        </ScrollReveal>
      </section>

      {/* Dark Separator 7 */}
      <SectionDarkDivider label="Transparence & Questions Fréquentes" />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: FOIRE AUX QUESTIONS / FAQ (WEBNODE PALE BG #F4F6F9)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#F4F6F9] py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D85A30]">
                Questions Fréquentes
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#192338] tracking-tight">
                Tout ce que vous devez savoir
              </h2>
              <p className="text-[#4B5874] text-sm font-normal">
                Réponses claires à vos questions sur nos services, délais et paiements.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <ScrollReveal key={index} delay={index * 0.05}>
                  <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-[#192338] hover:text-[#185FA5] transition cursor-pointer"
                    >
                      <span className="pr-4">{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 ${
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
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-5 pb-5 text-xs sm:text-sm text-[#4B5874] leading-relaxed border-t border-slate-100 pt-3 font-normal">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dark Separator 8 */}
      <SectionDarkDivider label="Lancement de Projet & Devis en Direct" />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: PRE-FOOTER FINAL CTA BANNER (WEBNODE SIGNATURE NAVY #0A2A4D)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden bg-[#0A2A4D] p-8 sm:p-14 text-white shadow-2xl border border-slate-700/80">
              {/* High-visibility background image with dark gradient */}
              <div className="absolute inset-0 z-0">
                <img
                  src={polyverseServicesBanner}
                  alt="Polyverse Services Banner"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-110 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#06152B]/95 via-[#0A2A4D]/85 to-[#06152B]/95" />
              </div>

              <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
                <div className="inline-flex items-center space-x-2 bg-white/15 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-100 backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Commencez dès aujourd'hui sans frais initiaux</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  Prêt à créer votre propre projet ?
                </h2>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto font-normal">
                  Discutez directement avec nos deux associés fondateurs pour obtenir un devis personnalisé, une assistance technique ou passer une commande sans carte de crédit.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={onOpenQuoteModal}
                    className="px-8 py-4 rounded-full bg-[#D85A30] hover:bg-[#c24e27] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center space-x-2 cursor-pointer"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Calculer Mon Devis Gratuit</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>

                  <a
                    href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20je%20souhaite%20lancer%20un%20projet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all flex items-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Direct</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
