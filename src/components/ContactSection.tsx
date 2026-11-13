import React, { useState } from 'react';
import { POLYVERSE_INFO, FAQS } from '../data/polyverseData';
import { ServiceCategory } from '../types';
import contactSupportHubImg from '../assets/images/contact_support_hub_1789429548006.jpg';
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
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
    <div className="bg-white text-[#141414]">
      {/* Page Editorial Hero */}
      <section className="relative bg-[#08101C] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={contactSupportHubImg}
            alt="Contact Polyverse"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08101C]/95 via-[#0A2A4D]/85 to-[#08101C]/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E87048] block">
              Entrons en Contact
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-[60px] font-bold uppercase leading-[1.0] text-white"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Discutez de Votre Projet avec Notre Équipe
            </h1>
            <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl">
              Demande de devis, question technique, sérigraphie, achat sans carte ou partenariat : nos associés vous répondent directement.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0A2A4D] text-white p-8 space-y-6 border border-stone-800">
              <h2
                className="text-2xl font-bold uppercase border-b border-white/15 pb-4"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Coordonnées Directes
              </h2>

              <ul className="space-y-5 text-sm">
                <li className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-[#E87048] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-300 font-bold block">
                      Localisation
                    </span>
                    <span className="font-medium text-white">{POLYVERSE_INFO.location}</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3.5">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-300 font-bold block">
                      Téléphones & WhatsApp
                    </span>
                    <div className="flex flex-col space-y-1 mt-0.5">
                      <a
                        href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-emerald-300 hover:text-white transition"
                      >
                        {POLYVERSE_INFO.whatsappDisplay} (WhatsApp)
                      </a>
                      <a
                        href={`tel:${POLYVERSE_INFO.secondaryPhone}`}
                        className="font-medium text-stone-200 hover:text-white transition"
                      >
                        {POLYVERSE_INFO.secondaryPhoneDisplay}
                      </a>
                    </div>
                  </div>
                </li>

                <li className="flex items-start space-x-3.5">
                  <Mail className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-300 font-bold block">
                      E-mail Officiel
                    </span>
                    <a
                      href={`mailto:${POLYVERSE_INFO.contactEmail}`}
                      className="font-medium text-sky-200 hover:text-white transition"
                    >
                      {POLYVERSE_INFO.contactEmail}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="pt-5 border-t border-white/15 space-y-3">
                <span className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                  Messagerie Instantanée
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20je%20souhaite%20un%20renseignement`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center space-x-2 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={POLYVERSE_INFO.messengerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 bg-[#185FA5] hover:bg-blue-600 text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center space-x-2 transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Messenger</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#F4F3EF] p-6 border border-stone-200 space-y-2">
              <h3
                className="text-lg font-bold uppercase text-[#141414]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Engagement Réponse Rapide
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Toutes les demandes reçues via le formulaire ou WhatsApp sont traitées directement par l’un des deux associés sous 24h ouvrées.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#F4F3EF] border border-stone-200 p-8 sm:p-10 space-y-6">
            <h2
              className="text-2xl sm:text-3xl font-bold uppercase text-[#141414] border-b border-stone-300 pb-4"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Formulaire de Prise de Contact & Devis
            </h2>

            {submitted ? (
              <div className="bg-white border border-emerald-300 p-8 text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h3
                  className="text-2xl font-bold uppercase text-[#141414]"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Message Envoyé avec Succès !
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
                  Merci {formData.name || 'cher client'}, nous avons bien reçu votre demande. Un associé de Polyverse vous recontactera très prochainement.
                </p>
                <button
                  type="button"
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
                  className="px-6 py-3 bg-[#0A2A4D] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#185FA5] transition cursor-pointer"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                      Nom complet <span className="text-[#D85A30]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Jean Dupont"
                      className="w-full text-sm p-3 bg-white border border-stone-300 focus:outline-hidden focus:border-[#0A2A4D]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                      Adresse E-mail <span className="text-[#D85A30]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Ex: jean@exemple.com"
                      className="w-full text-sm p-3 bg-white border border-stone-300 focus:outline-hidden focus:border-[#0A2A4D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                      Numéro Téléphone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ex: +509 3456 7890"
                      className="w-full text-sm p-3 bg-white border border-stone-300 focus:outline-hidden focus:border-[#0A2A4D]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
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
                      className="w-full text-sm p-3 bg-white border border-stone-300 focus:outline-hidden focus:border-[#0A2A4D]"
                    >
                      <option value="design">Design & Impression</option>
                      <option value="tech">Technologie & Médias</option>
                      <option value="finance">Finance, Achat Sans Carte & Shipping</option>
                      <option value="streaming">Streaming (Netflix, Prime, HBO)</option>
                      <option value="events">Event Planning & Matériel</option>
                      <option value="multiple">Combinaison / Plusieurs Piliers</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    Budget estimé (optionnel)
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="Ex: Moins de 500$, 500$-1500$, Sur devis..."
                    className="w-full text-sm p-3 bg-white border border-stone-300 focus:outline-hidden focus:border-[#0A2A4D]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    Détails de votre projet <span className="text-[#D85A30]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez votre besoin (quantité, délais, objectifs...)"
                    className="w-full text-sm p-3 bg-white border border-stone-300 focus:outline-hidden focus:border-[#0A2A4D] resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#D85A30] hover:bg-[#b84722] text-white font-bold uppercase tracking-wider transition flex items-center justify-center space-x-2 cursor-pointer"
                  style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px' }}
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer le Message à Polyverse</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Band */}
      <section className="bg-[#F4F3EF] py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#185FA5] block">
              Foire Aux Questions
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold uppercase text-[#141414]"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Questions Fréquemment Posées
            </h2>
          </div>

          <div className="bg-white border border-stone-200 divide-y divide-stone-200">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx}>
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 font-bold text-base text-[#141414] flex justify-between items-center hover:bg-stone-50 transition cursor-pointer"
                  >
                    <span className="pr-4">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#D85A30] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
