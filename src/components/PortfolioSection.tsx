import React, { useState } from 'react';
import { PortfolioItem, ServiceCategory } from '../types';
import { PORTFOLIO_ITEMS } from '../data/polyverseData';
import designBrandingImg from '../assets/images/design_branding_studio_1794539555040.jpg';
import {
  Palette,
  Code,
  CreditCard,
  Layers,
  X,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Tag,
} from 'lucide-react';

interface PortfolioSectionProps {
  initialProjectId?: string;
  onOpenQuoteModal: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  initialProjectId,
  onOpenQuoteModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<ServiceCategory | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(() => {
    if (initialProjectId) {
      return PORTFOLIO_ITEMS.find((p) => p.id === initialProjectId) || null;
    }
    return null;
  });

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="bg-white text-[#141414]">
      {/* Page Editorial Hero */}
      <section className="relative bg-[#08101C] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={designBrandingImg}
            alt="Portfolio Polyverse"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08101C]/95 via-[#0A2A4D]/85 to-[#08101C]/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E87048] block">
              Galerie de Réalisations
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-[60px] font-bold uppercase leading-[1.0] text-white"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Notre Portfolio & Projets Livrés
            </h1>
            <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl">
              Découvrez nos réalisations concrètes classées par domaine : identité visuelle et sérigraphie, développement web, finance et organisation d’événements.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar & Projects Grid */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Clean Segmented Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
              Filtrer par département ({filteredItems.length} projets)
            </span>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`flex items-center space-x-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[#141414] text-white border-[#141414]'
                    : 'bg-white text-stone-700 border-stone-300 hover:border-[#141414]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Tous ({PORTFOLIO_ITEMS.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('design')}
                className={`flex items-center space-x-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                  activeFilter === 'design'
                    ? 'bg-[#185FA5] text-white border-[#185FA5]'
                    : 'bg-white text-stone-700 border-stone-300 hover:border-[#185FA5]'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Design & Sérigraphie</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('tech')}
                className={`flex items-center space-x-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                  activeFilter === 'tech'
                    ? 'bg-[#0A2A4D] text-white border-[#0A2A4D]'
                    : 'bg-white text-stone-700 border-stone-300 hover:border-[#0A2A4D]'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Tech & Médias</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('finance')}
                className={`flex items-center space-x-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                  activeFilter === 'finance'
                    ? 'bg-[#D85A30] text-white border-[#D85A30]'
                    : 'bg-white text-stone-700 border-stone-300 hover:border-[#D85A30]'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Finance & Events</span>
              </button>
            </div>
          </div>

          {/* 3-Column Editorial Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedProject(item)}
                className="group border-b border-stone-200 pb-6 cursor-pointer flex flex-col justify-between"
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

                  {/* Clean Unboxed Metadata */}
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
                    className="text-2xl font-bold uppercase text-[#141414] group-hover:text-[#185FA5] transition-colors leading-tight mb-2"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0A2A4D] group-hover:text-[#D85A30] transition-colors">
                  <span className="truncate max-w-[230px]">{item.results}</span>
                  <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-300 max-h-[90vh] flex flex-col">
            <div className="relative h-64 sm:h-72 bg-[#08101C] shrink-0">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white p-2 transition cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#E87048] block mb-1">
                  {selectedProject.category}
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-bold uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {selectedProject.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="flex flex-wrap gap-6 text-xs font-bold uppercase tracking-wider text-stone-600 border-b border-stone-200 pb-4">
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-[#185FA5]" />
                  <span>Client : {selectedProject.client}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#D85A30]" />
                  <span>Date : {selectedProject.date}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3
                  className="text-lg font-bold uppercase text-[#141414]"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Description de la Réalisation
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {selectedProject.results && (
                <div className="bg-[#F4F3EF] border border-stone-200 p-4 space-y-1">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-800 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Résultats & Impact Obtenus</span>
                  </h4>
                  <p className="text-sm text-[#141414] font-medium">
                    {selectedProject.results}
                  </p>
                </div>
              )}

              <div className="text-xs font-semibold text-stone-500">
                Mots-clés : {selectedProject.tags.join(' · ')}
              </div>
            </div>

            <div className="p-5 bg-[#F4F3EF] border-t border-stone-200 flex flex-wrap gap-3 justify-between items-center">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                Fermer
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedProject(null);
                  onOpenQuoteModal();
                }}
                className="px-6 py-2.5 bg-[#D85A30] hover:bg-[#b84722] text-white text-sm font-bold uppercase tracking-wider transition cursor-pointer"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Commander un Projet Similaire
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
