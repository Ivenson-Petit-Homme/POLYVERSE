import React, { useState } from 'react';
import { POLYVERSE_INFO, FAQS } from '../data/polyverseData';
import { ServiceCategory } from '../types';
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'design' as ServiceCategory | 'multiple' | 'other',
    budget: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Contact Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D85A30] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          Entrons en Contact
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A2A4D]">
          Discutez de Votre Projet avec l’Équipe
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Demande de devis, question technique, besoin de sérigraphie ou conseil en investissement : notre équipe d'associés vous répond directement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Contact Info & Instant Channels */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#0A2A4D] text-white rounded-2xl p-8 shadow-xl space-y-6">
            <h2 className="text-xl font-bold border-b border-slate-700 pb-4">
              Coordonnées Directes
            </h2>

            <ul className="space-y-5 text-sm">
              <li className="flex items-start space-x-4">
                <div className="p-2.5 bg-white/10 rounded-xl text-[#D85A30] shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Localisation :</span>
                  <span className="font-semibold text-white">{POLYVERSE_INFO.location}</span>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="p-2.5 bg-white/10 rounded-xl text-emerald-400 shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Téléphones & WhatsApp :</span>
                  <div className="flex flex-col space-y-1">
                    <a
                      href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-300 hover:underline flex items-center space-x-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{POLYVERSE_INFO.whatsappDisplay}</span>
                    </a>
                    <a
                      href={`tel:${POLYVERSE_INFO.secondaryPhone}`}
                      className="font-semibold text-slate-200 hover:underline flex items-center space-x-1"
                    >
                      <Phone className="w-3.5 h-3.5 text-blue-300" />
                      <span>{POLYVERSE_INFO.secondaryPhoneDisplay}</span>
                    </a>
                  </div>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="p-2.5 bg-white/10 rounded-xl text-blue-300 shrink-0 mt-1">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Email Officiel :</span>
                  <a
                    href={`mailto:${POLYVERSE_INFO.contactEmail}`}
                    className="font-semibold text-blue-200 hover:underline"
                  >
                    {POLYVERSE_INFO.contactEmail}
                  </a>
                </div>
              </li>
            </ul>

            <div className="pt-4 border-t border-slate-700 space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Messagerie Instantanée :
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20je%20souhaite%20un%20renseignement`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={POLYVERSE_INFO.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Messenger</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-[#F1EFE8] rounded-xl p-6 border border-slate-200 space-y-2">
            <h3 className="font-bold text-sm text-[#0A2A4D] flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#D85A30]" />
              <span>Engagement Réponse Rapide</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Toutes les demandes reçues via le formulaire ou WhatsApp sont traitées par l'un des deux associés sous 24h ouvrées.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-extrabold text-[#0A2A4D] border-b border-slate-100 pb-3">
            Formulaire de Prise de Contact & Devis
          </h2>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center space-y-4 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-900">Message Envoyé avec Succès !</h3>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                Merci {formData.name || 'cher client'}, nous avons bien reçu votre demande pour le service "{formData.service}". Un associé de Polyverse vous recontactera sous peu.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    service: 'design',
                    budget: '',
                    message: '',
                  });
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Nom complet <span className="text-[#D85A30]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Jean Dupont"
                    className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#185FA5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Adresse Email <span className="text-[#D85A30]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Ex: jean@exemple.com"
                    className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#185FA5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Numéro Téléphone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ex: +509 3456 7890"
                    className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#185FA5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Service Souhaité <span className="text-[#D85A30]">*</span>
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service: e.target.value as ServiceCategory | 'multiple' | 'other',
                      })
                    }
                    className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#185FA5] bg-white"
                  >
                    <option value="design">Design & Sérigraphie</option>
                    <option value="tech">Tech & Marketing digital</option>
                    <option value="finance">Finance & Investissement</option>
                    <option value="multiple">Combinaison / Plusieurs Piliers</option>
                    <option value="other">Autre demande spécifique</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Budget estimé (optionnel)
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="Ex:Moins de 500$, 500$-1500$, Sur devis..."
                  className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#185FA5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Votre Message / Détails de votre projet <span className="text-[#D85A30]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Décrivez votre besoin (quantité, délais, objectifs...)"
                  className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#185FA5] resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-lg bg-[#185FA5] hover:bg-[#0A2A4D] text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-2 active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer le Message à Polyverse</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#F1EFE8] rounded-2xl p-8 border border-slate-200 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#185FA5]">
            Foire Aux Questions
          </span>
          <h2 className="text-2xl font-extrabold text-[#0A2A4D]">
            Questions Fréquemment Posées
          </h2>
          <p className="text-xs text-slate-600">
            Retrouvez les réponses aux questions les plus courantes sur nos services et délais.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 font-bold text-xs sm:text-sm text-[#0A2A4D] flex justify-between items-center hover:bg-slate-50 transition"
                >
                  <span className="pr-4">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#D85A30] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
