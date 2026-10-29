import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { POLYVERSE_INFO, INVESTMENT_CHARTER_PLANS, POLYVERSE_EXCHANGE_RATE } from '../data/polyverseData';
import { ScrollReveal } from './ScrollReveal';
import { SectionDarkDivider } from './SectionDarkDivider';
import partnershipDealBg from '../assets/images/partnership_deal_bg_1789429565629.jpg';
import {
  Users,
  Handshake,
  TrendingUp,
  Megaphone,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Send,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  DollarSign,
  Briefcase,
  UserCheck,
  Lock,
  MessageCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AffiliationSectionProps {
  onOpenQuoteModal?: () => void;
}

type AffiliationRole = 'ambassadeur' | 'partenaire' | 'investisseur' | 'promoteur';

export const AffiliationSection: React.FC<AffiliationSectionProps> = ({ onOpenQuoteModal }) => {
  const { currentUser } = useAuth();
  const [activeRole, setActiveRole] = useState<AffiliationRole>('promoteur');

  // Common Form Fields
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [cin, setCin] = useState('');
  const [nif, setNif] = useState('');
  const [address, setAddress] = useState(currentUser?.address || '');

  // Ambassadeur Specific (Reference Person)
  const [refFullName, setRefFullName] = useState('');
  const [refPhone, setRefPhone] = useState('');
  const [refCin, setRefCin] = useState('');
  const [refNif, setRefNif] = useState('');
  const [refAddress, setRefAddress] = useState('');

  // Partenaire Specific
  const [companyName, setCompanyName] = useState('');
  const [offeredValue, setOfferedValue] = useState('');

  // Investisseur Specific
  const [selectedInvestPlan, setSelectedInvestPlan] = useState(INVESTMENT_CHARTER_PLANS[1].id);
  const [investmentAmountUSD, setInvestmentAmountUSD] = useState('1000');
  const [payoutMethod, setPayoutMethod] = useState<'moncash' | 'natcash' | 'zelle' | 'virement'>('moncash');
  const [payoutAccount, setPayoutAccount] = useState('');

  // Promoteur Specific
  const [selectedPromoteProducts, setSelectedPromoteProducts] = useState<string[]>([
    'Achat Sans Carte',
    'Streaming (Netflix, Prime, HBO)',
    'T-Shirts & Sérigraphie',
  ]);

  // Contract Agreement & Signature
  const [signatureName, setSignatureName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Submission Status
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedReferralCode, setGeneratedReferralCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const togglePromoteProduct = (prod: string) => {
    setSelectedPromoteProducts((prev) =>
      prev.includes(prod) ? prev.filter((p) => p !== prod) : [...prev, prod]
    );
  };

  const handleRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Veuillez accepter les termes du contrat pour continuer.');
      return;
    }

    // Generate unique referral code for promoteur or reference ID
    const cleanFirstName = (fullName || 'POLY').split(' ')[0].replace(/[^a-zA-Z]/g, '').toUpperCase();
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const code = `POLY-${cleanFirstName || 'VIP'}${randomSuffix}`;
    setGeneratedReferralCode(code);
    setIsSubmitted(true);
  };

  const copyCodeToClipboard = () => {
    if (!generatedReferralCode) return;
    navigator.clipboard.writeText(generatedReferralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const currentPlan =
    INVESTMENT_CHARTER_PLANS.find((p) => p.id === selectedInvestPlan) || INVESTMENT_CHARTER_PLANS[0];

  const handleGenerateWhatsAppDossier = () => {
    let msg = `*NOUVEAU DOSSIER D'AFFILIATION POLYVERSE*\n`;
    msg += `----------------------------------------\n`;
    msg += `👑 *Rôle Sollicité :* ${activeRole.toUpperCase()}\n`;
    msg += `👤 *Candidat :* ${fullName}\n`;
    msg += `📱 *Téléphone :* ${phone}\n`;
    msg += `📧 *E-mail :* ${email}\n`;
    msg += `🆔 *CIN :* ${cin || 'Fourni sur contrat'}\n`;
    msg += `📄 *NIF :* ${nif || 'Fourni sur contrat'}\n`;
    msg += `📍 *Adresse :* ${address}\n`;

    if (activeRole === 'ambassadeur') {
      msg += `\n*PERSONNE DE RÉFÉRENCE :*\n`;
      msg += `• Nom : ${refFullName}\n`;
      msg += `• Téléphone : ${refPhone}\n`;
      msg += `• CIN : ${refCin}\n`;
      msg += `• NIF : ${refNif}\n`;
      msg += `• Adresse : ${refAddress}\n`;
    } else if (activeRole === 'partenaire') {
      msg += `\n*PROPOSITION PARTENARIAT :*\n`;
      msg += `• Entreprise : ${companyName || 'Indépendant'}\n`;
      msg += `• Valeur / Intérêt apporté : ${offeredValue}\n`;
    } else if (activeRole === 'investisseur') {
      msg += `\n*PLAN D'INVESTISSEMENT :*\n`;
      msg += `• Plan : ${currentPlan.name}\n`;
      msg += `• Montant : $${investmentAmountUSD} USD (≈ ${(Number(investmentAmountUSD) * POLYVERSE_EXCHANGE_RATE).toLocaleString()} HTG)\n`;
      msg += `• Mode de versement : ${payoutMethod.toUpperCase()} (${payoutAccount})\n`;
      msg += `• Rendement attendu : ${currentPlan.expectedROI}\n`;
    } else if (activeRole === 'promoteur') {
      msg += `\n*PRODUITS SÉLECTIONNÉS :*\n`;
      msg += `• Produits : ${selectedPromoteProducts.join(', ')}\n`;
      msg += `• Code de Référence Généré : ${generatedReferralCode}\n`;
    }

    msg += `----------------------------------------\n`;
    msg += `✍️ *Signature Contrat :* Signé électroniquement par ${signatureName || fullName}\n`;
    msg += `✅ *Statut :* Conditions et contrat acceptés\n`;

    return `https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner Header */}
      <ScrollReveal>
        <section className="relative overflow-hidden bg-[#0A2A4D] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-700/80">
          <div className="absolute inset-0 z-0">
            <img
              src={partnershipDealBg}
              alt="Affiliation Polyverse"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-105 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06152B]/95 via-[#0A2A4D]/85 to-[#06152B]/90" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-amber-300 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#D85A30]" />
              <span>Programme Officiel d'Affiliation & Partenariat</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Gagnez de l'Argent avec <span className="text-[#38BDF8]">Polyverse</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Polyverse offre à chaque citoyen, créateur, entrepreneur et investisseur l'opportunité de s'associer à son écosystème en pleine croissance. Choisissez votre statut, remplissez votre dossier officiel avec contrat et commencez à générer des revenus.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Contrat formel et sécurisé</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>Paiements MonCash / Natcash / Zelle</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>4 Statuts d'Évolution</span>
              </span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 4 Affiliation Options Selector */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#D85A30]">
            Opportunités d'Affiliation
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0A2A4D]">
            Choisissez comment vous souhaitez collaborer avec Polyverse
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            Sélectionnez l'un des 4 programmes ci-dessous pour découvrir les conditions requises et signer votre accord d'engagement.
          </p>
        </div>

        {/* 4 Role Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              id: 'promoteur' as AffiliationRole,
              title: 'Promoteur',
              subtitle: 'Code de référence & Commissions',
              icon: Megaphone,
              badge: 'Le Plus Populaire',
              color: 'from-[#D85A30] to-orange-600',
              activeBorder: 'border-[#D85A30]',
            },
            {
              id: 'ambassadeur' as AffiliationRole,
              title: 'Ambassadeur',
              subtitle: 'Représentant officiel & Rémunéré',
              icon: UserCheck,
              badge: 'Prestige',
              color: 'from-[#185FA5] to-blue-700',
              activeBorder: 'border-[#185FA5]',
            },
            {
              id: 'partenaire' as AffiliationRole,
              title: 'Partenaire',
              subtitle: 'Alliances B2B & Échange d’intérêts',
              icon: Handshake,
              badge: 'Entreprises',
              color: 'from-[#0A2A4D] to-slate-800',
              activeBorder: 'border-[#0A2A4D]',
            },
            {
              id: 'investisseur' as AffiliationRole,
              title: 'Investisseur',
              subtitle: 'Charte d’investissement & Dividendes',
              icon: TrendingUp,
              badge: 'Fort Rendement',
              color: 'from-emerald-600 to-teal-700',
              activeBorder: 'border-emerald-600',
            },
          ].map((role) => {
            const isSelected = activeRole === role.id;
            const IconComponent = role.icon;

            return (
              <button
                key={role.id}
                type="button"
                onClick={() => {
                  setActiveRole(role.id);
                  setIsSubmitted(false);
                }}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 border-2 flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? `${role.activeBorder} bg-white shadow-xl scale-[1.02]`
                    : 'border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300 shadow-2xs'
                }`}
              >
                {isSelected && (
                  <div
                    className={`absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r ${role.color}`}
                  />
                )}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition ${
                        isSelected
                          ? `bg-gradient-to-r ${role.color} text-white shadow-sm`
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {role.badge}
                    </span>
                  </div>
                  <h3 className="font-black text-base sm:text-lg text-[#0A2A4D]">{role.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{role.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Role Description & Dynamic Application Form */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Header bar of selected role */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#0A2A4D] to-[#185FA5] text-white">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-300">
              Candidature & Accord d'Engagement
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              {activeRole === 'promoteur' && 'Programme Promoteur Polyverse (Générez votre Code)'}
              {activeRole === 'ambassadeur' && 'Devenir Ambassadeur Officiel Polyverse (Dossier & Référence)'}
              {activeRole === 'partenaire' && 'Partenariat d’Affaires & Échange de Services'}
              {activeRole === 'investisseur' && 'Charte d’Investissement & Prise de Participation'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {activeRole === 'promoteur' &&
                'En tant que promoteur, vous choisissez les produits ou services Polyverse que vous souhaitez promouvoir. Dès la signature de votre contrat, un code de référence unique avec votre nom est généré automatiquement pour toucher vos commissions sur chaque commande.'}
              {activeRole === 'ambassadeur' &&
                'L’ambassadeur représente Polyverse dans son université, sa ville ou son secteur. Ce statut exige vos pièces d’identité (CIN, NIF), les mêmes informations pour une personne de référence fiable, ainsi que la signature de notre contrat d’ambassadeur.'}
              {activeRole === 'partenaire' &&
                'Vous dirigez une entreprise ou offrez des services complémentaires. Remplissez vos coordonnées, décrivez précisément ce que vous apportez comme intérêt stratégique pour Polyverse et signons notre accord de partenariat.'}
              {activeRole === 'investisseur' &&
                'Consultez notre charte d’investissement, choisissez votre plan (Amorçage, Croissance, Capital Élite), définissez le montant investi (au taux de 140 HTG) et signez votre contrat d’investissement avec versement régulier des dividendes.'}
            </p>
          </div>
        </div>

        {/* Content & Form */}
        <div className="p-6 sm:p-10">
          {isSubmitted ? (
            /* Success confirmation card */
            <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#0A2A4D]">
                  Candidature & Contrat Enregistrés avec Succès !
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Félicitations <span className="font-bold text-[#0A2A4D]">{fullName}</span>, votre dossier pour le statut{' '}
                  <span className="font-extrabold uppercase text-[#D85A30]">{activeRole}</span> a été validé et signé électroniquement par Polyverse.
                </p>
              </div>

              {/* Show Promo Code for Promoteur */}
              {activeRole === 'promoteur' && generatedReferralCode && (
                <div className="p-6 rounded-2xl bg-white border border-emerald-300 shadow-md space-y-3">
                  <span className="text-xs uppercase font-extrabold text-slate-500 tracking-wider block">
                    Votre Code de Référence Promoteur Personnel :
                  </span>
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-3xl font-black text-[#D85A30] tracking-wider font-mono bg-orange-50 px-5 py-2 rounded-xl border border-orange-200">
                      {generatedReferralCode}
                    </span>
                    <button
                      type="button"
                      onClick={copyCodeToClipboard}
                      className="px-4 py-2.5 rounded-xl bg-[#0A2A4D] hover:bg-[#185FA5] text-white text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedCode ? 'Copié !' : 'Copier'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Partagez ce code à vos contacts : ils bénéficient d'une réduction et vous touchez automatiquement une commission sur chaque achat !
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={handleGenerateWhatsAppDossier()}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Envoyer la Confirmation sur WhatsApp Polyverse</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition"
                >
                  Modifier ou remplir un autre statut
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleRoleSubmit} className="max-w-4xl mx-auto space-y-8">
              {/* Step 1: Candidate Personal Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-[#185FA5] text-white text-xs font-black flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-black text-sm uppercase tracking-wide text-[#0A2A4D]">
                    Informations Personnelles & Pièces d'Identité
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nom et Prénom *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ex: Jean-Baptiste Moïse"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#185FA5] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Téléphone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+509 37XX-XXXX ou WhatsApp"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#185FA5] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Adresse E-mail *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre-email@exemple.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#185FA5] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Numéro CIN (Carte d'Identification Nationale) *
                    </label>
                    <input
                      type="text"
                      required
                      value={cin}
                      onChange={(e) => setCin(e.target.value)}
                      placeholder="Ex: 01-01-99-1994-08-00042"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#185FA5] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Numéro NIF *</label>
                    <input
                      type="text"
                      required
                      value={nif}
                      onChange={(e) => setNif(e.target.value)}
                      placeholder="Ex: 004-892-120-4"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#185FA5] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Adresse Résidentielle Complète *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ex: Caracol, Cap-Haïtien, Village EKAM, Rue..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#185FA5] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Role Specific Requirements */}

              {/* CASE 1: AMBASSADEUR -> PERSONNE DE RÉFÉRENCE */}
              {activeRole === 'ambassadeur' && (
                <div className="space-y-4 p-5 rounded-2xl bg-blue-50/60 border border-blue-200">
                  <div className="flex items-center space-x-2 pb-2 border-b border-blue-200">
                    <span className="w-6 h-6 rounded-full bg-[#185FA5] text-white text-xs font-black flex items-center justify-center">
                      2
                    </span>
                    <h3 className="font-black text-sm uppercase tracking-wide text-[#0A2A4D]">
                      Personne de Référence Obligatoire (Doc Modification 2)
                    </h3>
                  </div>

                  <p className="text-xs text-blue-900 leading-relaxed font-medium">
                    Pour garantir la conformité du contrat d'Ambassadeur, veuillez fournir les mêmes informations vérifiées pour une personne de référence (parent, collègue ou mentor).
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Nom complet de la référence *
                      </label>
                      <input
                        type="text"
                        required
                        value={refFullName}
                        onChange={(e) => setRefFullName(e.target.value)}
                        placeholder="Ex: Prof. Pierre André"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#185FA5] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Téléphone de la référence *
                      </label>
                      <input
                        type="tel"
                        required
                        value={refPhone}
                        onChange={(e) => setRefPhone(e.target.value)}
                        placeholder="+509 36XX-XXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#185FA5] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">CIN de la référence *</label>
                      <input
                        type="text"
                        required
                        value={refCin}
                        onChange={(e) => setRefCin(e.target.value)}
                        placeholder="Ex: 01-02-98-1980-05-00019"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#185FA5] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">NIF de la référence *</label>
                      <input
                        type="text"
                        required
                        value={refNif}
                        onChange={(e) => setRefNif(e.target.value)}
                        placeholder="Ex: 002-391-440-1"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#185FA5] outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">
                        Adresse de la référence *
                      </label>
                      <input
                        type="text"
                        required
                        value={refAddress}
                        onChange={(e) => setRefAddress(e.target.value)}
                        placeholder="Ex: Cap-Haïtien, Rue 18 A, Haïti"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#185FA5] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* CASE 2: PARTENAIRE -> INTÉRÊT & ENTREPRISE */}
              {activeRole === 'partenaire' && (
                <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-[#0A2A4D] text-white text-xs font-black flex items-center justify-center">
                      2
                    </span>
                    <h3 className="font-black text-sm uppercase tracking-wide text-[#0A2A4D]">
                      Proposition Commerciale & Intérêt pour Polyverse
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Nom de votre Entreprise / Organisation (facultatif)
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Ex: Groupe MAS, Agence Créative, etc."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Que proposez-vous comme intérêt et valeur pour Polyverse ? *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={offeredValue}
                        onChange={(e) => setOfferedValue(e.target.value)}
                        placeholder="Décrivez vos opportunités : distribution,apport d'affaires, événements conjoints, matériel partagé, volume de commandes..."
                        className="w-full p-3.5 rounded-xl border border-slate-300 bg-white focus:border-[#185FA5] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* CASE 3: INVESTISSEUR -> CHARTE D'INVESTISSEMENT */}
              {activeRole === 'investisseur' && (
                <div className="space-y-5 p-5 sm:p-6 rounded-2xl bg-amber-50/50 border border-amber-200">
                  <div className="flex items-center space-x-2 pb-2 border-b border-amber-200">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center">
                      2
                    </span>
                    <h3 className="font-black text-sm uppercase tracking-wide text-[#0A2A4D]">
                      Charte d'Investissement Polyverse (Choix du Plan)
                    </h3>
                  </div>

                  {/* Investment Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {INVESTMENT_CHARTER_PLANS.map((plan) => {
                      const isSelected = selectedInvestPlan === plan.id;
                      return (
                        <div
                          key={plan.id}
                          onClick={() => {
                            setSelectedInvestPlan(plan.id);
                            setInvestmentAmountUSD(String(plan.minAmountUSD));
                          }}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer bg-white flex flex-col justify-between ${
                            isSelected
                              ? 'border-emerald-600 shadow-lg scale-102 ring-2 ring-emerald-200'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-black text-[#0A2A4D]">{plan.name}</span>
                              {plan.badge && (
                                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                  {plan.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-lg font-black text-emerald-600">
                              {plan.expectedROI}{' '}
                              <span className="text-[10px] text-slate-500 font-normal">ROI prévu</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1">{plan.description}</p>
                            <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] space-y-1 text-slate-600 font-semibold">
                              <p>• Montant : ${plan.minAmountUSD} à ${plan.maxAmountUSD} USD</p>
                              <p>• Durée : {plan.durationMonths} Mois</p>
                              <p>• Versement : {plan.payoutPeriod}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Amount & Payout setup */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Montant de l'investissement ($ USD) *
                      </label>
                      <input
                        type="number"
                        required
                        min={currentPlan.minAmountUSD}
                        max={currentPlan.maxAmountUSD}
                        value={investmentAmountUSD}
                        onChange={(e) => setInvestmentAmountUSD(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-black text-sm text-[#0A2A4D]"
                      />
                      <span className="text-[10px] font-bold text-[#D85A30] mt-1 block">
                        ≈ {(Number(investmentAmountUSD) * POLYVERSE_EXCHANGE_RATE).toLocaleString()} HTG (Taux 140)
                      </span>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Mode de versement des dividendes *
                      </label>
                      <select
                        value={payoutMethod}
                        onChange={(e) => setPayoutMethod(e.target.value as any)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-700"
                      >
                        <option value="moncash">MonCash Haïti</option>
                        <option value="natcash">Natcash Haïti</option>
                        <option value="zelle">Zelle USA ($ USD)</option>
                        <option value="virement">Virement Bancaire (BUH, Sogebank, Unibank)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Numéro ou Détail du compte *
                      </label>
                      <input
                        type="text"
                        required
                        value={payoutAccount}
                        onChange={(e) => setPayoutAccount(e.target.value)}
                        placeholder="Ex: +509 37XX-XXXX ou email Zelle"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* CASE 4: PROMOTEUR -> CHOIX DES PRODUITS À PROMOUVOIR */}
              {activeRole === 'promoteur' && (
                <div className="space-y-4 p-5 rounded-2xl bg-orange-50/60 border border-orange-200">
                  <div className="flex items-center space-x-2 pb-2 border-b border-orange-200">
                    <span className="w-6 h-6 rounded-full bg-[#D85A30] text-white text-xs font-black flex items-center justify-center">
                      2
                    </span>
                    <h3 className="font-black text-sm uppercase tracking-wide text-[#0A2A4D]">
                      Quels produits ou services souhaitez-vous promouvoir ?
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 font-medium">
                    Sélectionnez les offres sur lesquelles vous souhaitez communiquer. Votre code promo vous octroiera 10% à 15% de commission directe sur chaque commande effectuée par vos clients.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Achat Sans Carte & Shipping Miami',
                      'Streaming (Netflix, Prime, HBO)',
                      'T-Shirts & Sérigraphie Personnalisée',
                      'Cartes Virtuelles Visa/Mastercard',
                      'Création de Sites Web & Portfolios',
                      'Boost de Comptes & Réseaux Sociaux',
                      'Planification d’Événements & Sonorisation',
                    ].map((prod) => {
                      const isChecked = selectedPromoteProducts.includes(prod);
                      return (
                        <div
                          key={prod}
                          onClick={() => togglePromoteProduct(prod)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center space-x-2.5 ${
                            isChecked
                              ? 'bg-white border-[#D85A30] shadow-2xs font-bold text-[#D85A30]'
                              : 'bg-white/60 border-slate-200 text-slate-700 hover:bg-white'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="rounded text-[#D85A30] focus:ring-[#D85A30] cursor-pointer"
                          />
                          <span className="text-xs">{prod}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Legal Contract Display & Electronic Signature */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-black text-sm uppercase tracking-wide text-[#0A2A4D]">
                    Contrat d'Engagement & Signature Électronique
                  </h3>
                </div>

                {/* Contract Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-700 text-xs max-h-48 overflow-y-auto space-y-2 leading-relaxed font-sans">
                  <p className="font-bold text-[#0A2A4D] uppercase text-center border-b pb-1">
                    CONTRAT OFFICIEL D'AFFILIATION & D'ENGAGEMENT POLYVERSE 2026
                  </p>
                  <p>
                    <strong>Entre les soussignés :</strong> Polyverse, entreprise de droit haïtien, ayant son bureau principal à Caracol, Haïti (Village EKAM La Différence), d'une part; et le signataire identifié par son nom, CIN et NIF, d'autre part.
                  </p>
                  <p>
                    <strong>1. Objet :</strong> Le présent contrat régit les relations de collaboration dans le cadre du statut sollicité ({activeRole.toUpperCase()}).
                  </p>
                  <p>
                    <strong>2. Obligations :</strong> L'affilié s'engage à promouvoir les services Polyverse dans le respect des règles éthiques et sans fraude. Polyverse garantit le paiement rigoureux et ponctuel des commissions et dividendes convenus.
                  </p>
                  <p>
                    <strong>3. Confidentialité & Non-Dénigrement :</strong> Les deux parties s'engagent à préserver l'intégrité de la marque et les accords convenus.
                  </p>
                  <p>
                    <strong>4. Validité :</strong> Ce contrat prend effet immédiatement à la confirmation et reste en vigueur pour une durée renouvelable.
                  </p>
                </div>

                {/* Signature input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Nom complet pour signature électronique *
                    </label>
                    <input
                      type="text"
                      required
                      value={signatureName}
                      onChange={(e) => setSignatureName(e.target.value)}
                      placeholder="Tapez votre Nom et Prénom pour signer"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-mono font-bold text-slate-800"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer pt-4">
                      <input
                        type="checkbox"
                        required
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="w-4 h-4 rounded text-[#185FA5] cursor-pointer"
                      />
                      <span>
                        Je déclare sur l'honneur l'exactitude des informations fournies et j'accepte formellement le contrat Polyverse.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D85A30] via-[#185FA5] to-[#0A2A4D] hover:opacity-95 text-white font-extrabold text-sm sm:text-base shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <FileText className="w-5 h-5" />
                    <span>
                      {activeRole === 'promoteur'
                        ? 'Signer le Contrat & Générer Mon Code de Référence'
                        : `Valider Mon Dossier & Signer le Contrat ${activeRole.toUpperCase()}`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
