import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS } from '../data/polyverseData';
import { Testimonial, ServiceCategory } from '../types';
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
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ${className}`}>
      {/* Header & Social Proof Stats with Client Background */}
      <ScrollReveal>
        <div className="relative overflow-hidden bg-[#0A2A4D] text-white p-8 sm:p-10 mb-8 border border-stone-800">
          {/* High-visibility background image */}
          <div className="absolute inset-0 z-0">
            <img
              src={testimonialsClientsBg}
              alt="Clients Satisfaction Polyverse"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08101C]/95 via-[#0A2A4D]/85 to-[#08101C]/90" />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#E87048] block">
                Avis & Retours Expérience Clients
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold uppercase tracking-tight"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Ce Que Disent Nos Clients de Polyverse
              </h2>
              <p className="text-stone-200 text-sm leading-relaxed">
                Découvrez les retours authentiques d’étudiants, entrepreneurs et chefs d’entreprise ayant fait confiance à notre équipe en Design, Tech et Finance.
              </p>
            </div>

            {/* Social Proof Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 shrink-0 border-t lg:border-t-0 lg:border-l border-white/20 pt-6 lg:pt-0 lg:pl-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-1 text-amber-400 font-bold text-2xl font-tabular">
                  <span>5.0</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-stone-300 font-medium mt-1">Note Moyenne</p>
              </div>

              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-white font-tabular">100%</p>
                <p className="text-xs text-stone-300 font-medium mt-1">Satisfaction Client</p>
              </div>

              <div className="text-center lg:text-left col-span-2 sm:col-span-1">
                <p className="text-2xl font-bold text-emerald-400 font-tabular">50+</p>
                <p className="text-xs text-stone-300 font-medium mt-1">Projets Livrés</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Controls Bar: Filters & Navigation Controls */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-[#F4F3EF] p-4 border border-stone-200">
          {/* Pillar Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#0A2A4D] text-white'
                  : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
              }`}
            >
              Tous ({testimonialsList.length})
            </button>
            <button
              onClick={() => setSelectedCategory('design')}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                selectedCategory === 'design'
                  ? 'bg-[#0A2A4D] text-white'
                  : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
              }`}
            >
              Design &amp; Sérigraphie
            </button>
            <button
              onClick={() => setSelectedCategory('tech')}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                selectedCategory === 'tech'
                  ? 'bg-[#0A2A4D] text-white'
                  : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
              }`}
            >
              Tech &amp; Marketing
            </button>
            <button
              onClick={() => setSelectedCategory('finance')}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                selectedCategory === 'finance'
                  ? 'bg-[#D85A30] text-white'
                  : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
              }`}
            >
              Finance &amp; Shipping
            </button>
          </div>

          {/* Carousel Auto-scroll Controls & Action */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="flex items-center space-x-1 bg-white p-1 border border-stone-300">
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className="p-1.5 text-stone-700 hover:bg-[#F4F3EF] transition-colors flex items-center space-x-1 cursor-pointer"
                title={isAutoplay ? 'Mettre en pause le défilement automatique' : 'Démarrer le défilement automatique'}
              >
                {isAutoplay ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="text-[11px] font-bold uppercase hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-stone-700" />
                    <span className="text-[11px] font-bold uppercase hidden sm:inline">Auto</span>
                  </>
                )}
              </button>

              <div className="h-4 w-px bg-stone-300"></div>

              <button
                onClick={handleScrollLeft}
                className="p-1.5 hover:bg-[#F4F3EF] text-stone-700 transition-colors cursor-pointer"
                aria-label="Faire défiler vers la gauche"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleScrollRight}
                className="p-1.5 hover:bg-[#F4F3EF] text-stone-700 transition-colors cursor-pointer"
                aria-label="Faire défiler vers la droite"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 bg-[#D85A30] hover:bg-[#b84722] text-white font-bold uppercase tracking-wider text-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Donner Mon Avis</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* HORIZONTAL AUTO-SCROLLING CAROUSEL TRACK */}
      <ScrollReveal delay={0.15}>
        {filteredTestimonials.length === 0 ? (
          <div className="bg-[#F4F3EF] p-12 text-center border border-stone-200 space-y-3">
            <Quote className="w-10 h-10 text-stone-400 mx-auto" />
            <h3
              className="text-lg font-bold uppercase text-[#141414]"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Aucun témoignage dans cette catégorie
            </h3>
            <p className="text-xs text-stone-600">
              Soyez le premier à partager votre retour d’expérience sur nos services.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-2 text-xs font-bold uppercase tracking-wider text-[#D85A30] underline cursor-pointer"
            >
              Afficher tous les témoignages
            </button>
          </div>
        ) : (
          <div className="relative group">
            <div
              ref={scrollContainerRef}
              onMouseEnter={() => setIsAutoplay(false)}
              onMouseLeave={() => setIsAutoplay(true)}
              className="flex space-x-5 overflow-x-auto scrollbar-none py-2 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredTestimonials.map((item) => {
                const badge = getCategoryBadge(item.category);
                return (
                  <div
                    key={item.id}
                    className="min-w-[300px] sm:min-w-[350px] max-w-[350px] bg-white p-6 border border-stone-200 hover:border-[#0A2A4D] transition-colors flex flex-col justify-between shrink-0"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-3.5 h-3.5 ${
                                idx < item.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'fill-stone-200 text-stone-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D85A30]">
                          {badge.label}
                        </span>
                      </div>

                      <p className="text-sm text-stone-700 leading-relaxed mb-6 line-clamp-4">
                        « {item.content} »
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-[#0A2A4D] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#141414] flex items-center space-x-1">
                            <span className="truncate max-w-[140px]">{item.name}</span>
                            {item.verified && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" title="Avis Vérifié" />
                            )}
                          </h4>
                          <p className="text-[11px] text-stone-500 font-medium line-clamp-1">
                            {item.role} · <span className="text-[#D85A30] font-semibold">{item.company}</span>
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-stone-400 font-medium shrink-0">{item.date}</span>
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
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-300 max-w-lg w-full shadow-2xl overflow-hidden relative">
            <div className="bg-[#0A2A4D] text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E87048] block">
                  Retours Clients Polyverse
                </span>
                <h3
                  className="text-xl font-bold uppercase mt-0.5"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Partagez Votre Expérience
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Fermer la fenêtre"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {submittedSuccess ? (
                <div className="bg-emerald-50 border border-emerald-300 p-6 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                  <h4
                    className="font-bold uppercase text-emerald-900 text-lg"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Merci pour votre avis
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Votre témoignage a bien été publié dans la section clients Polyverse.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddTestimonial} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                        Nom Complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={newFeedback.name}
                        onChange={(e) => setNewFeedback({ ...newFeedback, name: e.target.value })}
                        placeholder="Ex : Jean Marc"
                        className="w-full text-xs p-3 border border-stone-300 focus:border-[#0A2A4D] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                        Fonction / Statut
                      </label>
                      <input
                        type="text"
                        value={newFeedback.role}
                        onChange={(e) => setNewFeedback({ ...newFeedback, role: e.target.value })}
                        placeholder="Ex : Fondateur / Étudiant"
                        className="w-full text-xs p-3 border border-stone-300 focus:border-[#0A2A4D] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                        Entreprise / Organisation
                      </label>
                      <input
                        type="text"
                        value={newFeedback.company}
                        onChange={(e) => setNewFeedback({ ...newFeedback, company: e.target.value })}
                        placeholder="Ex : Bistro Créole / Particulier"
                        className="w-full text-xs p-3 border border-stone-300 focus:border-[#0A2A4D] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                        Département Concerné *
                      </label>
                      <select
                        value={newFeedback.category}
                        onChange={(e) =>
                          setNewFeedback({
                            ...newFeedback,
                            category: e.target.value as ServiceCategory,
                          })
                        }
                        className="w-full text-xs p-3 border border-stone-300 focus:border-[#0A2A4D] outline-none bg-white"
                      >
                        <option value="design">Design &amp; Impression</option>
                        <option value="tech">Tech &amp; Marketing Digital</option>
                        <option value="finance">Finance &amp; Shipping</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                      Note Globale
                    </label>
                    <div className="flex items-center space-x-2 bg-[#F4F3EF] p-2.5 border border-stone-300">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= newFeedback.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-stone-300 text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold font-tabular text-stone-700 ml-2">
                        {newFeedback.rating} / 5
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                      Votre Témoignage *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={newFeedback.content}
                      onChange={(e) => setNewFeedback({ ...newFeedback, content: e.target.value })}
                      placeholder="Décrivez votre expérience avec Polyverse..."
                      className="w-full text-xs p-3 border border-stone-300 focus:border-[#0A2A4D] outline-none resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-[#D85A30] hover:bg-[#b84722] text-white font-bold uppercase tracking-wider text-sm transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    <Send className="w-4 h-4" />
                    <span>Publier Mon Témoignage</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
