import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS } from '../data/polyverseData';
import { Testimonial, ServiceCategory } from '../types';
import { SectionDarkDivider } from './SectionDarkDivider';
import { ScrollReveal } from './ScrollReveal';
import testimonialsClientsBg from '../assets/images/testimonials_clients_bg_1789429555798.jpg';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MessageSquarePlus,
  X,
  Send,
  Sparkles,
  Pause,
  Play,
} from 'lucide-react';

interface TestimonialsSectionProps {
  onOpenQuoteModal?: () => void;
  className?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenQuoteModal,
  className = '',
}) => {
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Testimonial Form State
  const [newFeedback, setNewFeedback] = useState({
    name: '',
    role: '',
    company: '',
    category: 'design' as ServiceCategory,
    rating: 5,
    content: '',
  });
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Ref for horizontal scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter list
  const filteredTestimonials = testimonialsList.filter((item) =>
    selectedCategory === 'all' ? true : item.category === selectedCategory
  );

  // Auto-scroll loop
  useEffect(() => {
    if (!isAutoplay) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (!container) return;
      // Scroll by 340px (card width + gap)
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScrollLeft - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 340, behavior: 'smooth' });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoplay, filteredTestimonials]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScrollLeft - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 340, behavior: 'smooth' });
      }
    }
  };

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    const createdItem: Testimonial = {
      id: `custom-${Date.now()}`,
      name: newFeedback.name,
      role: newFeedback.role || 'Client Polyverse',
      company: newFeedback.company || 'Entreprise / Particulier',
      category: newFeedback.category,
      rating: newFeedback.rating,
      content: newFeedback.content,
      date: 'Récemment',
      verified: true,
    };

    setTestimonialsList([createdItem, ...testimonialsList]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsModalOpen(false);
      setNewFeedback({
        name: '',
        role: '',
        company: '',
        category: 'design',
        rating: 5,
        content: '',
      });
    }, 2000);
  };

  const getCategoryBadge = (cat: ServiceCategory) => {
    switch (cat) {
      case 'design':
        return {
          label: 'Design & Sérigraphie',
          bg: 'bg-blue-50 text-[#185FA5] border-blue-200',
        };
      case 'tech':
        return {
          label: 'Tech & Marketing',
          bg: 'bg-slate-100 text-[#0A2A4D] border-slate-300',
        };
      case 'finance':
        return {
          label: 'Finance & Investissement',
          bg: 'bg-orange-50 text-[#D85A30] border-orange-200',
        };
    }
  };

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${className}`}>
      {/* Header & Social Proof Stats with Client Background */}
      <ScrollReveal>
        <div className="relative overflow-hidden bg-[#0A2A4D] text-white rounded-3xl p-8 sm:p-10 shadow-2xl mb-10 border border-slate-700/80">
          {/* High-visibility background image */}
          <div className="absolute inset-0 z-0">
            <img
              src={testimonialsClientsBg}
              alt="Clients Satisfaction Polyverse"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-105 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06152B]/95 via-[#0A2A4D]/85 to-[#06152B]/90" />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-blue-100 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#D85A30]" />
                <span>Avis & Retours Expérience Clients</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Ce que disent nos clients de Polyverse
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                Découvrez les retours authentiques d’étudiants, entrepreneurs et chefs d’entreprise ayant fait confiance à notre équipe en Design, Tech et Finance.
              </p>
            </div>

            {/* Social Proof Stats Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 shrink-0 border-t lg:border-t-0 lg:border-l border-white/15 pt-6 lg:pt-0 lg:pl-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-1 text-amber-400 font-extrabold text-2xl">
                  <span>5.0</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 font-medium mt-1">Note Moyenne</p>
              </div>

              <div className="text-center lg:text-left">
                <p className="text-2xl font-extrabold text-white">100%</p>
                <p className="text-[11px] text-slate-300 font-medium mt-1">Satisfaction Client</p>
              </div>

              <div className="text-center lg:text-left col-span-2 sm:col-span-1">
                <p className="text-2xl font-extrabold text-emerald-400">50+</p>
                <p className="text-[11px] text-slate-300 font-medium mt-1">Projets Livrés</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <SectionDarkDivider label="Retours d'Expériences par Domaine" />

      {/* Controls Bar: Filters & Navigation Controls */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          {/* Pillar Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#0A2A4D] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tous ({testimonialsList.length})
            </button>
            <button
              onClick={() => setSelectedCategory('design')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                selectedCategory === 'design'
                  ? 'bg-[#185FA5] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Design & Sérigraphie
            </button>
            <button
              onClick={() => setSelectedCategory('tech')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                selectedCategory === 'tech'
                  ? 'bg-[#0A2A4D] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tech & Marketing
            </button>
            <button
              onClick={() => setSelectedCategory('finance')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                selectedCategory === 'finance'
                  ? 'bg-[#D85A30] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Finance & Investissement
            </button>
          </div>

          {/* Carousel Auto-scroll Controls & Action */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className="p-1.5 rounded-lg text-slate-600 hover:bg-white transition flex items-center space-x-1 cursor-pointer"
                title={isAutoplay ? 'Mettre en pause le défilement automatique' : 'Démarrer le défilement automatique'}
              >
                {isAutoplay ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px] font-medium text-slate-700 hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-slate-700" />
                    <span className="text-[11px] font-medium text-slate-700 hidden sm:inline">Auto</span>
                  </>
                )}
              </button>

              <div className="h-4 w-px bg-slate-300"></div>

              <button
                onClick={handleScrollLeft}
                className="p-1.5 rounded-lg hover:bg-white text-slate-700 transition cursor-pointer"
                aria-label="Faire défiler vers la gauche"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleScrollRight}
                className="p-1.5 rounded-lg hover:bg-white text-slate-700 transition cursor-pointer"
                aria-label="Faire défiler vers la droite"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center space-x-1.5 active:scale-95 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Donner mon avis</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* HORIZONTAL AUTO-SCROLLING CAROUSEL TRACK */}
      <ScrollReveal delay={0.15}>
      {filteredTestimonials.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
          <Quote className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-[#0A2A4D]">
            Aucun témoignage trouvé dans cette catégorie
          </h3>
          <p className="text-xs text-slate-500">
            Soyez le premier à ajouter votre retour d'expérience sur nos services !
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="mt-2 text-xs font-bold text-[#185FA5] underline cursor-pointer"
          >
            Afficher tous les témoignages
          </button>
        </div>
      ) : (
        <div className="relative group">
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsAutoplay(false)}
            onMouseLeave={() => setIsAutoplay(true)}
            className="flex space-x-6 overflow-x-auto scrollbar-none py-4 px-2 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredTestimonials.map((item) => {
              const badge = getCategoryBadge(item.category);
              return (
                <div
                  key={item.id}
                  className="min-w-[300px] sm:min-w-[340px] max-w-[340px] bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between shrink-0 group/card hover:-translate-y-1"
                >
                  <div>
                    {/* Header: Rating & Pillar Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-4 h-4 ${
                              idx < item.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-slate-200 text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg}`}
                      >
                        {badge.label}
                      </span>
                    </div>

                    {/* Feedback Content */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6 line-clamp-4">
                      "{item.content}"
                    </p>
                  </div>

                  {/* Footer: Client Info */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A2A4D] to-[#185FA5] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#0A2A4D] flex items-center space-x-1">
                          <span className="truncate max-w-[130px]">{item.name}</span>
                          {item.verified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" title="Avis Vérifié" />
                          )}
                        </h4>
                        <p className="text-[10px] text-slate-500 font-medium line-clamp-1">
                          {item.role} • <span className="text-[#D85A30] font-semibold">{item.company}</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0">{item.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      </ScrollReveal>

      {/* SUBMIT TESTIMONIAL MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              aria-label="Fermer la fenêtre"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#185FA5] flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Polyverse Feedback</span>
              </span>
              <h3 className="text-xl font-extrabold text-[#0A2A4D]">
                Partagez Votre Expérience Client
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Votre avis nous aide à maintenir l'excellence de nos services en Design, Tech et Finance.
              </p>
            </div>

            {submittedSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-base">Merci pour votre avis !</h4>
                <p className="text-xs text-emerald-700">
                  Votre témoignage a été ajouté avec succès à la liste client de Polyverse.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddTestimonial} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Votre Nom Complet <span className="text-[#D85A30]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={newFeedback.name}
                      onChange={(e) => setNewFeedback({ ...newFeedback, name: e.target.value })}
                      placeholder="Ex: Jean Marc"
                      className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#185FA5]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Votre Rôle / Fonction
                    </label>
                    <input
                      type="text"
                      value={newFeedback.role}
                      onChange={(e) => setNewFeedback({ ...newFeedback, role: e.target.value })}
                      placeholder="Ex: Fondateur / Étudiant"
                      className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#185FA5]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Nom de l'Entreprise / Organisation
                    </label>
                    <input
                      type="text"
                      value={newFeedback.company}
                      onChange={(e) => setNewFeedback({ ...newFeedback, company: e.target.value })}
                      placeholder="Ex: Bistro Créole / Particulier"
                      className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#185FA5]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Pilier Concerné <span className="text-[#D85A30]">*</span>
                    </label>
                    <select
                      value={newFeedback.category}
                      onChange={(e) =>
                        setNewFeedback({
                          ...newFeedback,
                          category: e.target.value as ServiceCategory,
                        })
                      }
                      className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#185FA5] bg-white"
                    >
                      <option value="design">Design & Sérigraphie</option>
                      <option value="tech">Tech & Marketing digital</option>
                      <option value="finance">Finance & Investissement</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Votre Note globale
                  </label>
                  <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
                        className="p-1 hover:scale-110 transition"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newFeedback.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-slate-200 text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2">
                      {newFeedback.rating} / 5 étoiles
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Votre Message / Témoignage <span className="text-[#D85A30]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newFeedback.content}
                    onChange={(e) => setNewFeedback({ ...newFeedback, content: e.target.value })}
                    placeholder="Racontez votre expérience avec Polyverse..."
                    className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#185FA5] resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg bg-[#185FA5] hover:bg-[#0A2A4D] text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Publier mon témoignage</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
