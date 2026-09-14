import React, { useState } from 'react';
import { ServiceCategory } from '../types';
import { PILLARS, QUOTE_ITEMS, POLYVERSE_INFO } from '../data/polyverseData';
import { ScrollReveal } from './ScrollReveal';
import {
  Palette,
  Code,
  CreditCard,
  CheckCircle2,
  Sparkles,
  Calculator,
  MessageCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
  HelpCircle,
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
  // Calculator state
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Services Header */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D85A30] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Nos Solutions Complètes
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A2A4D]">
            Les 3 Piliers d’Expertise Polyverse
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Explorer nos services détaillés pour le design graphique, le développement web & marketing, et les solutions financières internationales.
          </p>
        </div>
      </ScrollReveal>


      {/* Category Tabs Switcher */}
      <div className="flex justify-center">
        <div className="bg-[#F1EFE8] p-1.5 rounded-2xl border border-slate-200 flex flex-wrap gap-1 max-w-3xl w-full justify-center shadow-xs">
          {PILLARS.map((pillar) => {
            const isActive = selectedCategory === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedCategory(pillar.id as ServiceCategory)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-[#185FA5] text-white shadow-md'
                    : 'text-slate-700 hover:text-[#0A2A4D] hover:bg-white/60'
                }`}
              >
                {pillar.id === 'design' && <Palette className="w-4 h-4" />}
                {pillar.id === 'tech' && <Code className="w-4 h-4" />}
                {pillar.id === 'finance' && <CreditCard className="w-4 h-4" />}
                <span>{pillar.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Pillar Detailed Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-[#F1EFE8] text-[#185FA5] rounded-xl font-bold">
                {activePillar.id === 'design' && <Palette className="w-8 h-8 text-[#185FA5]" />}
                {activePillar.id === 'tech' && <Code className="w-8 h-8 text-[#0A2A4D]" />}
                {activePillar.id === 'finance' && <CreditCard className="w-8 h-8 text-[#D85A30]" />}
              </div>
              <div>
                <span className="text-xs font-bold text-[#D85A30] uppercase tracking-wider">
                  Pilier Polyverse
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2A4D]">
                  {activePillar.title}
                </h2>
              </div>
            </div>

            <p className="text-[#D85A30] font-semibold text-base italic border-l-4 border-[#D85A30] pl-4">
              "{activePillar.tagline}"
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {activePillar.fullDesc}
            </p>

            {/* Feature List */}
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-sm uppercase text-[#0A2A4D] tracking-wider">
                Services Inclus dans la sous-section :
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activePillar.features.map((feature, i) => (
                  <div key={i} className="flex items-start space-x-2 bg-slate-50 p-3 rounded-lg border border-slate-200/70 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#185FA5] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Concrete Examples */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-xs uppercase text-[#D85A30] tracking-wider">
                Exemples de Réalisations & Cas d'Usage :
              </h3>
              <ul className="space-y-2">
                {activePillar.examples.map((ex, i) => (
                  <li key={i} className="flex items-center space-x-2 text-xs text-slate-600">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Action Box */}
          <div className="lg:col-span-4 bg-[#F1EFE8] rounded-xl p-6 border border-slate-200 space-y-6">
            <h3 className="font-bold text-base text-[#0A2A4D] border-b border-slate-300 pb-3">
              Besoin de ce service ?
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Demandez un tarif précis ou discutez avec l'associé spécialiste pour la prise en charge de votre commande.
            </p>

            <div className="space-y-3">
              <button
                onClick={onOpenQuoteModal}
                className="w-full py-3 px-4 rounded-lg bg-[#D85A30] hover:bg-[#c24e27] text-white font-bold text-xs shadow-xs transition flex items-center justify-center space-x-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Demander un devis rapide</span>
              </button>

              <a
                href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20je%20suis%20interesse%20par%20le%20service%20${encodeURIComponent(activePillar.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuter sur WhatsApp</span>
              </a>
            </div>

            <div className="pt-4 border-t border-slate-300 text-[11px] text-slate-500 space-y-1">
              <p>• Réponse garantie en moins de 24h</p>
              <p>• Tarifs sur demande adaptés au budget</p>
              <p>• Suivi personnalisé de la commande</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Quote Estimator Tool */}
      <section className="bg-gradient-to-br from-[#0A2A4D] to-[#185FA5] rounded-2xl p-8 sm:p-12 text-white shadow-xl space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-blue-200">
            <Calculator className="w-3.5 h-3.5 text-[#D85A30]" />
            <span>Outil d'estimation rapide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Estimateur & Modèle de Devis
          </h2>
          <p className="text-slate-200 text-sm">
            Cochez les services dont vous avez besoin pour générer une demande de devis instantanée transmise directement à notre équipe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Services Selector */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUOTE_ITEMS.map((item) => {
              const isSelected = selectedQuoteItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleQuoteItem(item.id)}
                  className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white text-[#0A2A4D] border-[#D85A30] shadow-md ring-2 ring-[#D85A30]/30'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          isSelected
                            ? 'bg-[#185FA5] text-white'
                            : 'bg-white/20 text-slate-200'
                        }`}
                      >
                        {item.category}
                      </span>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="rounded text-[#D85A30] focus:ring-[#D85A30] h-4 w-4"
                      />
                    </div>
                    <h3 className="font-bold text-sm">{item.name}</h3>
                    <p className={`text-xs line-clamp-2 ${isSelected ? 'text-slate-600' : 'text-slate-200'}`}>
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-200/20 flex items-center justify-between text-[11px] font-semibold">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-[#D85A30]" />
                      <span>{item.estimatedDays}</span>
                    </span>
                    <span className={isSelected ? 'text-[#185FA5]' : 'text-blue-200'}>
                      {item.basePriceText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quote Summary Box */}
          <div className="lg:col-span-5 bg-white text-[#0A2A4D] rounded-xl p-6 shadow-lg space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-extrabold text-base border-b border-slate-200 pb-2 text-[#0A2A4D]">
                Résumé de votre demande ({selectedItemsData.length} service{selectedItemsData.length > 1 ? 's' : ''})
              </h3>

              {selectedItemsData.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-4 text-center">
                  Veuillez sélectionner au moins un service pour afficher le résumé.
                </p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedItemsData.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded-lg">
                      <span className="font-semibold text-slate-800">{item.name}</span>
                      <span className="text-[11px] text-[#D85A30] font-bold">{item.estimatedDays}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Précisions ou détails supplémentaires (optionnel) :
                </label>
                <textarea
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Ex: Quantité de t-shirts, domaine de votre site, budget approximatif..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#185FA5] h-20 resize-none"
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
                  if (selectedItemsData.length === 0) {
                    e.preventDefault();
                    alert('Veuillez sélectionner au moins un service.');
                  }
                }}
                className={`w-full py-3 px-4 rounded-lg font-bold text-xs flex items-center justify-center space-x-2 transition ${
                  selectedItemsData.length > 0
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Envoyer le devis sur WhatsApp</span>
              </a>

              <button
                onClick={onOpenQuoteModal}
                className="w-full py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
              >
                Préférer le formulaire email
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
