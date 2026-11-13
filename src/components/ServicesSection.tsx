import React, { useState } from 'react';
import { ServiceCategory } from '../types';
import { PILLARS, QUOTE_ITEMS, POLYVERSE_INFO } from '../data/polyverseData';
import servicesTechStudioImg from '../assets/images/services_tech_studio_1789429519582.jpg';
import {
  Palette,
  Code,
  CreditCard,
  CheckCircle2,
  Calculator,
  MessageCircle,
  Clock,
  ArrowRight,
  PlayCircle,
  CalendarDays,
} from 'lucide-react';

interface ServicesSectionProps {
  selectedCategory: ServiceCategory;
  setSelectedCategory: (cat: ServiceCategory) => void;
  onOpenQuoteModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedCategory,
  setSelectedCategory,
  onOpenQuoteModal,
}) => {
  const [selectedQuoteItems, setSelectedQuoteItems] = useState<string[]>(['q-logo', 'q-website']);
  const [customNotes, setCustomNotes] = useState('');

  const activePillar = PILLARS.find((p) => p.id === selectedCategory) || PILLARS[0];

  const toggleQuoteItem = (id: string) => {
    setSelectedQuoteItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedItemsData = QUOTE_ITEMS.filter((item) => selectedQuoteItems.includes(item.id));

  const generateWhatsAppMessage = () => {
    if (selectedItemsData.length === 0) return '';
    const itemNames = selectedItemsData.map((i) => `• ${i.name}`).join('%0A');
    const notesPart = customNotes ? `%0A%0APrécisions : ${encodeURIComponent(customNotes)}` : '';
    return `Bonjour%20Polyverse%2C%20je%20souhaite%20un%20devis%20pour%20les%20services%20suivants%20%3A%0A${itemNames}${notesPart}`;
  };

  return (
    <div className="bg-white text-[#141414]">
      {/* Page Editorial Hero */}
      <section className="relative bg-[#08101C] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={servicesTechStudioImg}
            alt="Catalogue des 5 Piliers Polyverse"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08101C]/95 via-[#0A2A4D]/85 to-[#08101C]/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E87048] block">
              Catalogue Officiel · 5 Départements
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-[60px] font-bold uppercase leading-[1.0] text-white"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Nos 5 Piliers d’Expertise Polyverse
            </h1>
            <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl">
              Explorez nos solutions complètes en Design & Impression, Technologie & Médias, Finance & Shipping, Streaming et Event Planning.
            </p>
          </div>
        </div>

        {/* Bottom 5-Pillar Architectural Navigation Bar */}
        <div className="relative z-10 bg-[#F4F3EF] border-t border-b border-stone-200 text-[#141414]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
            {PILLARS.map((pillar) => {
              const isActive = selectedCategory === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setSelectedCategory(pillar.id as ServiceCategory)}
                  className={`p-4 sm:p-5 text-left transition-colors cursor-pointer flex items-center space-x-3 ${
                    isActive
                      ? 'bg-[#0A2A4D] text-white'
                      : 'bg-white hover:bg-[#F4F3EF] text-[#141414]'
                  }`}
                >
                  {pillar.id === 'design' && <Palette className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#E87048]' : 'text-[#185FA5]'}`} />}
                  {pillar.id === 'tech' && <Code className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#E87048]' : 'text-[#0A2A4D]'}`} />}
                  {pillar.id === 'finance' && <CreditCard className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#E87048]' : 'text-[#D85A30]'}`} />}
                  {pillar.id === 'streaming' && <PlayCircle className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#E87048]' : 'text-red-600'}`} />}
                  {pillar.id === 'events' && <CalendarDays className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#E87048]' : 'text-purple-700'}`} />}
                  <span
                    className="text-sm sm:text-base font-bold uppercase tracking-wide truncate"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {pillar.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Pillar Detailed Editorial Band */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="border-b border-stone-200 pb-6 space-y-2">
              <span className="text-xs font-bold text-[#D85A30] uppercase tracking-[0.16em] block">
                {activePillar.subtitle}
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold uppercase text-[#141414]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {activePillar.title}
              </h2>
              <p className="text-base font-medium text-[#185FA5] italic pt-1">
                « {activePillar.tagline} »
              </p>
            </div>

            <p className="text-base text-stone-700 leading-relaxed">
              {activePillar.fullDesc}
            </p>

            {/* Features Grid */}
            <div className="space-y-4 pt-2">
              <h3
                className="text-xl font-bold uppercase text-[#141414]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Prestations Incluses dans ce Département
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activePillar.features.map((feature, i) => (
                  <div key={i} className="flex items-start space-x-3 bg-[#F4F3EF] p-4 border border-stone-200 text-sm text-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-[#D85A30] shrink-0 mt-1" />
                    <span className="font-medium leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Concrete Examples */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <h3
                className="text-lg font-bold uppercase text-[#0A2A4D]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Exemples de Réalisations & Cas d’Usage
              </h3>
              <ul className="space-y-2">
                {activePillar.examples.map((ex, i) => (
                  <li key={i} className="flex items-start space-x-2.5 text-sm text-stone-600">
                    <ArrowRight className="w-4 h-4 text-[#D85A30] shrink-0 mt-0.5" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Quick Action Box */}
          <div className="lg:col-span-4 bg-[#F4F3EF] p-8 border border-stone-200 space-y-6">
            <h3
              className="text-2xl font-bold uppercase text-[#141414] border-b border-stone-300 pb-3"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Commander ce Service
            </h3>

            <p className="text-sm text-stone-600 leading-relaxed">
              Demandez un tarif précis ou discutez directement avec l’associé responsable pour la prise en charge immédiate de votre commande.
            </p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="w-full py-3.5 px-5 bg-[#D85A30] hover:bg-[#b84722] text-white font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: '15px' }}
              >
                <Calculator className="w-4 h-4" />
                <span>Demander un Devis Rapide</span>
              </button>

              <a
                href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20je%20suis%20interesse%20par%20le%20service%20${encodeURIComponent(activePillar.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 bg-[#0A2A4D] hover:bg-[#185FA5] text-white font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: '15px' }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuter sur WhatsApp</span>
              </a>
            </div>

            <div className="pt-4 border-t border-stone-300 text-xs text-stone-600 space-y-1.5 font-medium">
              <p>· Réponse garantie en moins de 24h</p>
              <p>· Tarifs transparents adaptés au projet</p>
              <p>· Suivi continu de la commande</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quote Estimator Band (Dark Navy Contrast) */}
      <section className="bg-[#0A2A4D] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="max-w-3xl space-y-2 border-b border-white/15 pb-6">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E87048] block">
              Outil d’Estimation Rapide
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold uppercase text-white"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Simulateur & Modèle de Devis
            </h2>
            <p className="text-stone-300 text-sm sm:text-base">
              Cochez les services souhaités pour générer une demande de devis structurée et l’envoyer directement sur WhatsApp ou par e-mail.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {QUOTE_ITEMS.map((item) => {
                const isSelected = selectedQuoteItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleQuoteItem(item.id)}
                    className={`p-5 border transition-colors cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white text-[#141414] border-[#D85A30]'
                        : 'bg-[#071F3A] text-white border-white/15 hover:border-white/40'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest ${
                            isSelected ? 'text-[#D85A30]' : 'text-[#E87048]'
                          }`}
                        >
                          {item.category}
                        </span>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="h-4 w-4 accent-[#D85A30]"
                        />
                      </div>
                      <h3
                        className="text-lg font-bold uppercase"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        {item.name}
                      </h3>
                      <p className={`text-xs line-clamp-2 ${isSelected ? 'text-stone-600' : 'text-stone-300'}`}>
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-stone-200/20 flex items-center justify-between text-xs font-semibold">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-[#D85A30]" />
                        <span>{item.estimatedDays}</span>
                      </span>
                      <span className={isSelected ? 'text-[#185FA5]' : 'text-sky-300'}>
                        {item.basePriceText}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-5 bg-white text-[#141414] p-7 border border-stone-200 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3
                  className="text-2xl font-bold uppercase border-b border-stone-200 pb-3 text-[#141414]"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Résumé ({selectedItemsData.length} service{selectedItemsData.length > 1 ? 's' : ''})
                </h3>

                {selectedItemsData.length === 0 ? (
                  <p className="text-sm text-stone-500 py-4 text-center">
                    Sélectionnez au moins un service à gauche pour préparer votre estimation.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {selectedItemsData.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs p-3 bg-[#F4F3EF] border border-stone-200">
                        <span className="font-bold text-[#141414]">{item.name}</span>
                        <span className="text-[11px] text-[#D85A30] font-bold shrink-0 ml-2">{item.estimatedDays}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    Précisions supplémentaires (optionnel)
                  </label>
                  <textarea
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Ex: Quantité de t-shirts, nom de domaine souhaité, budget approximatif..."
                    className="w-full text-sm p-3 border border-stone-300 focus:outline-hidden focus:border-[#0A2A4D] h-24 resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={
                    selectedItemsData.length > 0
                      ? `https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=${generateWhatsAppMessage()}`
                      : '#'
                  }
                  target={selectedItemsData.length > 0 ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (selectedItemsData.length === 0) e.preventDefault();
                  }}
                  className={`w-full py-3.5 px-5 font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors ${
                    selectedItemsData.length > 0
                      ? 'bg-emerald-700 hover:bg-emerald-600 text-white cursor-pointer'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                  style={{ fontFamily: "'Oswald', sans-serif", fontSize: '15px' }}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Envoyer le Devis sur WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="w-full py-3 px-5 border border-[#141414] hover:bg-[#141414] hover:text-white text-[#141414] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Préférer le formulaire email
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
