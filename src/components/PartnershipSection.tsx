import React, { useState } from 'react';
import { POLYVERSE_INFO } from '../data/polyverseData';
import {
  Handshake,
  Building,
  Briefcase,
  Layers,
  Sparkles,
  CheckCircle2,
  Send,
  Users,
  ShieldCheck,
  Zap,
  Globe,
  TrendingUp,
  MessageCircle,
  PhoneCall,
  Calendar,
  FileText,
} from 'lucide-react';

interface PartnershipSectionProps {
  onOpenQuoteModal?: () => void;
}

export const PartnershipSection: React.FC<PartnershipSectionProps> = ({ onOpenQuoteModal }) => {
  const [partnerType, setPartnerType] = useState<'commercial' | 'tech' | 'sponsor' | 'education'>('commercial');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [proposalDetails, setProposalDetails] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState('500-2000');

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const PARTNERSHIP_TYPES = [
    {
      id: 'commercial',
      title: 'Commercial & Distribution',
      icon: Briefcase,
      color: '#185FA5',
      desc: 'Revendez nos services de sérigraphie, vêtements personnalisés et cartes virtuelles avec des remises grossistes attrayantes.',
      benefits: ['Remises de 15% à 30% sur les commandes groupées', 'Gestion de production prioritaire', 'Garantie de qualité Polyverse'],
    },
    {
      id: 'tech',
      title: 'Technologique & Sous-traitance',
      icon: Layers,
      color: '#0A2A4D',
      desc: 'Agences web et designers : confiez-nous la production de code, l’intégration web ou l’impression textile en marque blanche.',
      benefits: ['Accord de confidentialité (NDA) garanti', 'Développement web & mobile sur mesure', 'Marque blanche (White label)'],
    },
    {
      id: 'sponsor',
      title: 'Sponsoring & Mécénat',
      icon: Sparkles,
      color: '#D85A30',
      desc: 'Associez votre marque à nos événements culturels, formations tech et ateliers de sérigraphie pour booster votre visibilité.',
      benefits: ['Placement de logo sur tous nos supports', 'Mentions sur nos réseaux & campagnes', 'Co-branding stratégique'],
    },
    {
      id: 'education',
      title: 'Éducatif & Académique',
      icon: Users,
      color: '#059669',
      desc: 'Écoles, universités et associations : organisez des stages, ateliers pratiques et programmes d’incubation pour étudiants.',
      benefits: ['Interventions d’experts Polyverse', 'Stages pratiques et mentorat', 'Tarifs préférentiels pour étudiants'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A2A4D] via-[#103E6D] to-[#185FA5] text-white rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-blue-100 shadow-xs">
            <Handshake className="w-4 h-4 text-[#D85A30]" />
            <span>Développer votre Entreprise avec Polyverse</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Devenez Partenaire Stratégique de Polyverse
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
            Nous bâtissons des alliances gagnant-gagnant avec des entreprises, agences, institutions et créateurs pour accélérer l’innovation en Design, Tech et Finance.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-blue-100">
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Croissance Partagée</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
              <Globe className="w-4 h-4 text-amber-300" />
              <span>Réseau International</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span>Engagement Qualité</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Partnership Types Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-[#0A2A4D]">Nos Formules de Partenariat</h2>
          <p className="text-xs text-slate-600">
            Sélectionnez le type d'alliance qui correspond le mieux aux objectifs de votre organisation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PARTNERSHIP_TYPES.map((type) => {
            const IconComponent = type.icon;
            const isSelected = partnerType === type.id;
            return (
              <div
                key={type.id}
                onClick={() => setPartnerType(type.id as any)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#185FA5] shadow-xl ring-2 ring-[#185FA5]/20 -translate-y-1'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xs"
                      style={{ backgroundColor: type.color }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#185FA5]">
                        Sélectionné
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-[#0A2A4D]">{type.title}</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{type.desc}</p>
                  </div>

                  <div className="pt-2 space-y-1.5 border-t border-slate-100">
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase">Avantages :</p>
                    {type.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center space-x-1.5 text-[11px] text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className={`mt-6 w-full py-2.5 rounded-xl font-bold text-xs transition ${
                    isSelected
                      ? 'bg-[#185FA5] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Proposer une alliance
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Form & Partnership Benefits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D85A30] flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Formulaire d'alliance B2B</span>
            </span>
            <h2 className="text-2xl font-extrabold text-[#0A2A4D]">
              Soumettre une Demande de Partenariat
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Remplissez ce formulaire et un responsable du développement commercial de Polyverse vous recontactera sous 24 à 48 heures.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-extrabold text-emerald-900">Demande envoyée avec succès !</h3>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                Merci <strong>{contactName || 'Cher Partenaire'}</strong> ({companyName || 'Votre Entreprise'}). Notre équipe étudie actuellement votre proposition et vous contactera très rapidement par email ou WhatsApp.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#0A2A4D] hover:bg-[#103E6D] text-white font-bold text-xs transition"
                >
                  Envoyer une autre demande
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Nom de votre Entreprise / Organisation <span className="text-[#D85A30]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ex: Caraïbes Studio / Agence X"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#185FA5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Nom du Représentant / Contact <span className="text-[#D85A30]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Ex: Alex Daniel"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#185FA5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Adresse Email professionnelle <span className="text-[#D85A30]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@votreentreprise.com"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#185FA5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Numéro Téléphone / WhatsApp <span className="text-[#D85A30]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+509 3800 0000"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#185FA5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Type de Partenariat désiré
                  </label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value as any)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-[#185FA5]"
                  >
                    <option value="commercial">Commercial & Distribution (Revente)</option>
                    <option value="tech">Technologique & Sous-traitance Web/Design</option>
                    <option value="sponsor">Sponsoring & Mécénat d'Événements</option>
                    <option value="education">Éducatif, Académique & Mentoring</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Site web ou Réseaux Sociaux (Facultatif)
                  </label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://votreentreprise.com"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#185FA5]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Description de votre projet de partenariat <span className="text-[#D85A30]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={proposalDetails}
                  onChange={(e) => setProposalDetails(e.target.value)}
                  placeholder="Expliquez comment vous souhaitez collaborer avec Polyverse (volume estimé, objectifs visés, ressources mises en commun...)"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 resize-none focus:outline-hidden focus:border-[#185FA5]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-[#0A2A4D] hover:bg-[#103E6D] text-white font-extrabold text-sm shadow-lg transition-all flex items-center justify-center space-x-2 active:scale-98"
              >
                <Send className="w-4 h-4 text-[#D85A30]" />
                <span>Transmettre la proposition de partenariat</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info & Direct Booking */}
        <div className="lg:col-span-5 space-y-6">
          {/* Why partner with Polyverse */}
          <div className="bg-[#0A2A4D] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D85A30] uppercase tracking-wider">
                Pourquoi Polyverse ?
              </span>
              <h3 className="text-xl font-extrabold">Les Avantages d’un Partenariat Polyverse</h3>
            </div>

            <div className="space-y-4 text-xs text-slate-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-white/10 rounded-xl text-emerald-400 shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Triple Expertise Unifiée</h4>
                  <p className="text-slate-300 mt-0.5">
                    Un seul partenaire pour couvrir le Design, le Développement web/mobile et les cartes virtuelles financières.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-white/10 rounded-xl text-amber-300 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Exécution Rapide & Fiable</h4>
                  <p className="text-slate-300 mt-0.5">
                    Délais garantis sur la sérigraphie et le développement, avec support technique dédié 7j/7.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-white/10 rounded-xl text-blue-300 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Présence Locale & Rayonnement</h4>
                  <p className="text-slate-300 mt-0.5">
                    Basés à Caracol avec une couverture étendue dans tout Haïti et des connexions internationales.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fast Contact Card */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-4">
            <h3 className="font-extrabold text-sm text-[#0A2A4D]">
              Besoin d'un entretien direct rapidement ?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Échangez directement avec les fondateurs de Polyverse pour discuter d'un contrat de partenariat urgent.
            </p>

            <div className="space-y-2.5 pt-1">
              <a
                href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20je%20souhaite%20discuter%20d%27un%20partenariat%20b2b`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Partenariats ({POLYVERSE_INFO.whatsappDisplay})</span>
              </a>

              <a
                href={`mailto:${POLYVERSE_INFO.contactEmail}?subject=Proposition%20de%20Partenariat`}
                className="w-full py-3 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center space-x-2 transition"
              >
                <FileText className="w-4 h-4 text-[#185FA5]" />
                <span>Envoyer un dossier par Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
