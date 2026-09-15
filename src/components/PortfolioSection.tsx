import React, { useState } from 'react';
import { PortfolioItem, ServiceCategory } from '../types';
import { PORTFOLIO_ITEMS } from '../data/polyverseData';
import { SectionDarkDivider } from './SectionDarkDivider';
import { ScrollReveal } from './ScrollReveal';
import {
  Palette,
  Code,
  CreditCard,
  Layers,
  X,
  ExternalLink,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Portfolio Header */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D85A30] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Galerie de Réalisations
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A2A4D]">
            Notre Portfolio Polyverse
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Découvrez nos réalisations classées par domaine : design visuel & sérigraphie textile, développement web & campagnes marketing, et solutions financières & logistiques.
          </p>

          {/* Notice for organized photos insertion */}
          <div className="bg-[#FAF9F6] border border-[#E8E5DC] p-3 rounded-xl max-w-xl mx-auto text-xs text-slate-700 flex items-center justify-center space-x-2">
            <Tag className="w-4 h-4 text-[#185FA5] shrink-0" />
            <span>Galerie prête à recevoir vos photos réelles classées une par une par catégorie.</span>
          </div>
        </div>
      </ScrollReveal>

      <SectionDarkDivider label="Filtres & Projets Réalisés" />

      {/* Category Filter Tabs */}
      <ScrollReveal delay={0.1}>
        <div className="flex justify-center">
          <div className="bg-[#F1EFE8] p-1.5 rounded-xl border border-slate-200 flex flex-wrap gap-1">
            <button
              onClick={() => setActiveFilter('all')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#0A2A4D] text-white shadow-xs'
                  : 'text-slate-700 hover:text-[#0A2A4D]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Tous ({PORTFOLIO_ITEMS.length})</span>
            </button>

            <button
              onClick={() => setActiveFilter('design')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeFilter === 'design'
                  ? 'bg-[#185FA5] text-white shadow-xs'
                  : 'text-slate-700 hover:text-[#185FA5]'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Design & Sérigraphie</span>
            </button>

            <button
              onClick={() => setActiveFilter('tech')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeFilter === 'tech'
                  ? 'bg-[#0A2A4D] text-white shadow-xs'
                  : 'text-slate-700 hover:text-[#0A2A4D]'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Tech & Marketing</span>
            </button>

            <button
              onClick={() => setActiveFilter('finance')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeFilter === 'finance'
                  ? 'bg-[#D85A30] text-white shadow-xs'
                  : 'text-slate-700 hover:text-[#D85A30]'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Finance & Investissement</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Grid of Portfolio Items */}
      <ScrollReveal delay={0.15}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedProject(item)}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0A2A4D]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {item.category === 'design'
                    ? 'Design & Sérigraphie'
                    : item.category === 'tech'
                    ? 'Tech & Marketing'
                    : 'Finance'}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-[#0A2A4D] group-hover:text-[#185FA5] transition line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-xs font-semibold text-[#D85A30]">
                  Client : {item.client}
                </p>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-2">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[#F1EFE8] text-[10px] font-medium text-slate-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md text-[11px] truncate max-w-[200px]">
                {item.results}
              </span>

              <span className="text-[#185FA5] font-bold flex items-center space-x-1 group-hover:underline">
                <span>Aperçu</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
      </ScrollReveal>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
            {/* Modal Header Image */}
            <div className="relative h-64 sm:h-72 bg-slate-900 shrink-0">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-90"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full transition"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-[#D85A30] text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2 inline-block">
                  {selectedProject.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold">{selectedProject.title}</h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600 border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-1.5">
                  <Tag className="w-4 h-4 text-[#185FA5]" />
                  <span>Client : {selectedProject.client}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-[#D85A30]" />
                  <span>Date : {selectedProject.date}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-sm text-[#0A2A4D]">Description de la Réalisation :</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {selectedProject.results && (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-1">
                  <h4 className="font-bold text-xs text-emerald-900 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Résultats & Impact Obtenus :</span>
                  </h4>
                  <p className="text-xs text-emerald-800 font-medium">
                    {selectedProject.results}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-800">Technologies & Tags :</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#F1EFE8] text-xs font-semibold text-[#0A2A4D]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-3 justify-between items-center">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition"
              >
                Fermer
              </button>

              <button
                onClick={() => {
                  setSelectedProject(null);
                  onOpenQuoteModal();
                }}
                className="px-5 py-2 rounded-lg bg-[#D85A30] hover:bg-[#c24e27] text-white text-xs font-bold transition"
              >
                Commander un projet similaire
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
