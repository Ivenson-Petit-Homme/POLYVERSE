import React, { useState } from 'react';
import { POLYVERSE_INFO, INVESTMENT_CHARTER_PLANS, POLYVERSE_EXCHANGE_RATE } from '../data/polyverseData';
import partnershipDealBg from '../assets/images/partnership_deal_bg_1789429565629.jpg';
import {
  Handshake,
  TrendingUp,
  Megaphone,
  CheckCircle2,
  FileText,
  Copy,
  Check,
  ArrowRight,
  UserCheck,
  MessageCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AffiliationSectionProps {
  onOpenQuoteModal?: () => void;
}

type AffiliationRole = 'ambassadeur' | 'partenaire' | 'investisseur' | 'promoteur';

export const AffiliationSection: React.FC<AffiliationSectionProps> = () => {
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
    'Achat Sans Carte & Shipping Miami',
    'Streaming (Netflix, Prime, HBO)',
    'T-Shirts & Sérigraphie Personnalisée',
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
    msg += `*Rôle Sollicité :* ${activeRole.toUpperCase()}\n`;
    msg += `*Candidat :* ${fullName}\n`;
    msg += `*Téléphone :* ${phone}\n`;
    msg += `*E-mail :* ${email}\n`;
    msg += `*CIN :* ${cin || 'Fourni sur contrat'}\n`;
    msg += `*NIF :* ${nif || 'Fourni sur contrat'}\n`;
    msg += `*Adresse :* ${address}\n`;

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
      msg += `• Montant : $${investmentAmountUSD} USD (≈ ${(
        Number(investmentAmountUSD) * POLYVERSE_EXCHANGE_RATE
      ).toLocaleString()} HTG)\n`;
      msg += `• Mode de versement : ${payoutMethod.toUpperCase()} (${payoutAccount})\n`;
      msg += `• Rendement attendu : ${currentPlan.expectedROI}\n`;
    } else if (activeRole === 'promoteur') {
      msg += `\n*PRODUITS SÉLECTIONNÉS :*\n`;
      msg += `• Produits : ${selectedPromoteProducts.join(', ')}\n`;
      msg += `• Code de Référence Généré : ${generatedReferralCode}\n`;
    }

    msg += `----------------------------------------\n`;
    msg += `*Signature Contrat :* Signé électroniquement par ${signatureName || fullName}\n`;
    msg += `*Statut :* Conditions et contrat acceptés\n`;

    return `https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-white text-[#141414]">
      {/* 1. FULL-BLEED EDITORIAL HERO (WWF.FR STYLE) */}
      <section className="relative bg-[#08101C] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={partnershipDealBg}
            alt="Programme Officiel d'Affiliation Polyverse"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08101C]/95 via-[#0A2A4D]/85 to-[#08101C]/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E87048] block">
              Écosystème Polyverse · Mobilisation &amp; Revenus
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-[60px] font-bold uppercase leading-[1.0] text-white"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Affiliation, Partenariat &amp; Investissement
            </h1>
            <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl">
              Polyverse ouvre ses opportunités aux étudiants, entrepreneurs, partenaires commerciaux et investisseurs. Choisissez votre statut, complétez votre dossier réglementaire et signez votre accord d’engagement.
            </p>

            <div className="pt-4 border-t border-white/15 flex flex-wrap gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-wider text-stone-300">
              <span>Contrat Électronique Formel</span>
              <span className="text-stone-500">·</span>
              <span>Versements MonCash / Natcash / Zelle</span>
              <span className="text-stone-500">·</span>
              <span>4 Statuts d’Affiliation</span>
            </div>
          </div>
        </div>

        {/* Bottom 4-Role Architectural Switcher Bar */}
        <div className="relative z-10 bg-[#F4F3EF] border-t border-b border-stone-200 text-[#141414]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
            {[
              {
                id: 'promoteur' as AffiliationRole,
                title: 'Promoteur',
                subtitle: 'Code personnel & 10–15% de commission',
                icon: Megaphone,
              },
              {
                id: 'ambassadeur' as AffiliationRole,
                title: 'Ambassadeur',
                subtitle: 'Représentant officiel & personne de référence',
                icon: UserCheck,
              },
              {
                id: 'partenaire' as AffiliationRole,
                title: 'Partenaire',
                subtitle: 'Alliances B2B & apport mutuel d’intérêts',
                icon: Handshake,
              },
              {
                id: 'investisseur' as AffiliationRole,
                title: 'Investisseur',
                subtitle: 'Charte d’investissement & dividendes',
                icon: TrendingUp,
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
                  className={`p-5 text-left transition-colors cursor-pointer flex items-start space-x-3 ${
                    isSelected ? 'bg-[#0A2A4D] text-white' : 'bg-white hover:bg-[#F4F3EF] text-[#141414]'
                  }`}
                >
                  <IconComponent
                    className={`w-5 h-5 shrink-0 mt-0.5 ${isSelected ? 'text-[#E87048]' : 'text-[#D85A30]'}`}
                  />
                  <div>
                    <span
                      className="text-base sm:text-lg font-bold uppercase tracking-wide block"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {role.title}
                    </span>
                    <span className={`text-xs block mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-600'}`}>
                      {role.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC ROLE FORM & CONTRACT BAND */}
      <section className="bg-[#F4F3EF] py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-5xl mx-auto bg-white border border-stone-200">
          {/* Role Description Banner */}
          <div className="p-6 sm:p-10 bg-[#0A2A4D] text-white border-b border-stone-200">
            <span className="text-xs uppercase font-bold tracking-[0.16em] text-[#E87048] block">
              Dossier Réglementaire &amp; Contrat Électronique
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold uppercase mt-1"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {activeRole === 'promoteur' && 'Programme Promoteur Polyverse — Code de Référence'}
              {activeRole === 'ambassadeur' && 'Statut Ambassadeur Officiel — Dossier & Référence'}
              {activeRole === 'partenaire' && 'Partenariat d’Affaires & Alliance Stratégique'}
              {activeRole === 'investisseur' && 'Charte d’Investissement & Prise de Participation'}
            </h2>
            <p className="text-sm text-stone-200 leading-relaxed mt-2 max-w-3xl">
              {activeRole === 'promoteur' &&
                'Sélectionnez les produits et services Polyverse que vous souhaitez promouvoir. Dès la signature de votre contrat, un code de référence personnalisé à votre nom est généré automatiquement.'}
              {activeRole === 'ambassadeur' &&
                'L’ambassadeur représente Polyverse dans son institution ou sa ville. Ce statut requiert vos pièces d’identité (CIN, NIF), les coordonnées complètes d’une personne de référence ainsi que la signature du contrat.'}
              {activeRole === 'partenaire' &&
                'Vous représentez une entreprise ou proposez des prestations complémentaires. Renseignez vos informations, décrivez précisément l’intérêt commercial offert à Polyverse et signez notre accord de partenariat.'}
              {activeRole === 'investisseur' &&
                'Consultez notre charte d’investissement, sélectionnez l’un de nos plans, indiquez le montant en USD (taux 140 HTG) et signez votre contrat d’engagement financier.'}
            </p>
          </div>

          <div className="p-6 sm:p-10">
            {isSubmitted ? (
              <div className="max-w-2xl mx-auto p-8 sm:p-10 bg-[#F4F3EF] border border-stone-300 text-center space-y-6">
                <div className="w-14 h-14 bg-emerald-700 text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                  <h3
                    className="text-2xl sm:text-3xl font-bold uppercase text-[#141414]"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Candidature &amp; Contrat Enregistrés
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Félicitations <strong className="text-[#141414]">{fullName}</strong>, votre dossier pour le statut{' '}
                    <strong className="uppercase text-[#D85A30]">{activeRole}</strong> a bien été validé et signé électroniquement.
                  </p>
                </div>

                {activeRole === 'promoteur' && generatedReferralCode && (
                  <div className="p-6 bg-white border border-stone-300 space-y-3">
                    <span className="text-xs uppercase font-bold text-stone-500 tracking-wider block">
                      Votre Code de Référence Personnel
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <span className="text-3xl font-bold text-[#D85A30] tracking-wider font-mono bg-[#F4F3EF] px-5 py-2.5 border border-stone-300">
                        {generatedReferralCode}
                      </span>
                      <button
                        type="button"
                        onClick={copyCodeToClipboard}
                        className="px-4 py-3 bg-[#0A2A4D] hover:bg-[#185FA5] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-1.5 cursor-pointer"
                      >
                        {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedCode ? 'Copié' : 'Copier'}</span>
                      </button>
                    </div>
                    <p className="text-xs text-stone-600">
                      Partagez ce code à votre réseau : vos contacts profitent d’une remise et vous percevez une commission sur chaque commande validée.
                    </p>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={handleGenerateWhatsAppDossier()}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase tracking-wider text-sm flex items-center justify-center space-x-2 transition-colors"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Transmettre sur WhatsApp Polyverse</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-4 border border-stone-300 bg-white hover:bg-stone-100 text-[#141414] font-bold uppercase tracking-wider text-sm transition-colors cursor-pointer"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Modifier ou Changer de Statut
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRoleSubmit} className="space-y-10">
                {/* STEP 1: IDENTITY & CONTACT */}
                <div className="space-y-5">
                  <div className="border-b border-stone-200 pb-3 flex items-center space-x-3">
                    <span className="text-sm font-bold font-mono text-[#D85A30]">01</span>
                    <h3
                      className="text-xl font-bold uppercase text-[#141414]"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      Identité du Candidat &amp; Pièces Officielles
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Nom et Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ex : Jean-Baptiste Moïse"
                        className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Téléphone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+509 37XX-XXXX"
                        className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Adresse E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre-email@exemple.com"
                        className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Numéro CIN (Carte d’Identification Nationale) *
                      </label>
                      <input
                        type="text"
                        required
                        value={cin}
                        onChange={(e) => setCin(e.target.value)}
                        placeholder="Ex : 01-01-99-1994-08-00042"
                        className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Numéro NIF *
                      </label>
                      <input
                        type="text"
                        required
                        value={nif}
                        onChange={(e) => setNif(e.target.value)}
                        placeholder="Ex : 004-892-120-4"
                        className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Adresse Résidentielle Complète *
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Ex : Caracol, Cap-Haïtien, Village EKAM..."
                        className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* STEP 2: ROLE SPECIFIC SECTION */}
                {activeRole === 'ambassadeur' && (
                  <div className="space-y-5 p-6 bg-[#F4F3EF] border border-stone-200">
                    <div className="border-b border-stone-300 pb-3 flex items-center space-x-3">
                      <span className="text-sm font-bold font-mono text-[#D85A30]">02</span>
                      <h3
                        className="text-xl font-bold uppercase text-[#141414]"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        Coordonnées de Votre Personne de Référence *
                      </h3>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      La validation d’un dossier d’Ambassadeur requiert l’identification d’un répondant vérifiable (CIN, NIF et adresse complète).
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Nom Complet de la Référence *
                        </label>
                        <input
                          type="text"
                          required
                          value={refFullName}
                          onChange={(e) => setRefFullName(e.target.value)}
                          placeholder="Ex : Prof. Pierre André"
                          className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Téléphone de la Référence *
                        </label>
                        <input
                          type="tel"
                          required
                          value={refPhone}
                          onChange={(e) => setRefPhone(e.target.value)}
                          placeholder="+509 36XX-XXXX"
                          className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          CIN de la Référence *
                        </label>
                        <input
                          type="text"
                          required
                          value={refCin}
                          onChange={(e) => setRefCin(e.target.value)}
                          placeholder="Ex : 01-02-98-1980-05-00019"
                          className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          NIF de la Référence *
                        </label>
                        <input
                          type="text"
                          required
                          value={refNif}
                          onChange={(e) => setRefNif(e.target.value)}
                          placeholder="Ex : 002-391-440-1"
                          className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Adresse de la Référence *
                        </label>
                        <input
                          type="text"
                          required
                          value={refAddress}
                          onChange={(e) => setRefAddress(e.target.value)}
                          placeholder="Ex : Cap-Haïtien, Rue 18 A, Haïti"
                          className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeRole === 'partenaire' && (
                  <div className="space-y-5 p-6 bg-[#F4F3EF] border border-stone-200">
                    <div className="border-b border-stone-300 pb-3 flex items-center space-x-3">
                      <span className="text-sm font-bold font-mono text-[#D85A30]">02</span>
                      <h3
                        className="text-xl font-bold uppercase text-[#141414]"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        Proposition Commerciale &amp; Intérêt Offert à Polyverse
                      </h3>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Nom de Votre Entreprise ou Organisation (Facultatif)
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Ex : Groupe MAS, Studio Créatif..."
                          className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Intérêt Stratégique &amp; Apport Proposé à Polyverse *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={offeredValue}
                          onChange={(e) => setOfferedValue(e.target.value)}
                          placeholder="Décrivez précisément votre proposition : réseau de distribution, apport d'affaires, événements conjoints, volume de commandes..."
                          className="w-full p-4 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeRole === 'investisseur' && (
                  <div className="space-y-6 p-6 bg-[#F4F3EF] border border-stone-200">
                    <div className="border-b border-stone-300 pb-3 flex items-center space-x-3">
                      <span className="text-sm font-bold font-mono text-[#D85A30]">02</span>
                      <h3
                        className="text-xl font-bold uppercase text-[#141414]"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        Charte d’Investissement Polyverse — Choix du Plan
                      </h3>
                    </div>

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
                            className={`p-5 border transition-colors cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'bg-[#0A2A4D] text-white border-[#0A2A4D]'
                                : 'bg-white text-[#141414] border-stone-200 hover:border-stone-400'
                            }`}
                          >
                            <div>
                              <span
                                className={`text-[10px] font-bold uppercase tracking-wider block ${
                                  isSelected ? 'text-[#E87048]' : 'text-[#D85A30]'
                                }`}
                              >
                                {plan.badge || 'Plan Officiel'}
                              </span>
                              <h4
                                className="text-lg font-bold uppercase mt-1"
                                style={{ fontFamily: "'Oswald', sans-serif" }}
                              >
                                {plan.name}
                              </h4>
                              <div className="text-xl font-bold font-tabular mt-2">
                                {plan.expectedROI}{' '}
                                <span className={`text-xs font-normal ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                                  rendement prévu
                                </span>
                              </div>
                              <p className={`text-xs mt-2 ${isSelected ? 'text-stone-300' : 'text-stone-600'}`}>
                                {plan.description}
                              </p>
                            </div>
                            <div
                              className={`mt-4 pt-3 border-t text-xs space-y-1 font-medium ${
                                isSelected ? 'border-white/15 text-stone-200' : 'border-stone-200 text-stone-600'
                              }`}
                            >
                              <p>
                                · Montant : ${plan.minAmountUSD} à ${plan.maxAmountUSD} USD
                              </p>
                              <p>· Durée : {plan.durationMonths} Mois</p>
                              <p>· Versement : {plan.payoutPeriod}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Montant Investi ($ USD) *
                        </label>
                        <input
                          type="number"
                          required
                          min={currentPlan.minAmountUSD}
                          max={currentPlan.maxAmountUSD}
                          value={investmentAmountUSD}
                          onChange={(e) => setInvestmentAmountUSD(e.target.value)}
                          className="w-full px-4 py-3 border border-stone-300 bg-white font-bold font-tabular text-base text-[#0A2A4D] outline-none"
                        />
                        <span className="text-xs font-bold font-tabular text-[#D85A30] mt-1 block">
                          ≈ {(Number(investmentAmountUSD) * POLYVERSE_EXCHANGE_RATE).toLocaleString()} HTG (Taux 140)
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Mode de Versement des Dividendes *
                        </label>
                        <select
                          value={payoutMethod}
                          onChange={(e) => setPayoutMethod(e.target.value as any)}
                          className="w-full px-4 py-3 border border-stone-300 bg-white font-semibold text-stone-800 outline-none"
                        >
                          <option value="moncash">MonCash Haïti</option>
                          <option value="natcash">Natcash Haïti</option>
                          <option value="zelle">Zelle USA ($ USD)</option>
                          <option value="virement">Virement Bancaire (BUH, Sogebank, Unibank)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Numéro ou Compte de Réception *
                        </label>
                        <input
                          type="text"
                          required
                          value={payoutAccount}
                          onChange={(e) => setPayoutAccount(e.target.value)}
                          placeholder="Ex : +509 37XX-XXXX ou e-mail Zelle"
                          className="w-full px-4 py-3 border border-stone-300 bg-white outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeRole === 'promoteur' && (
                  <div className="space-y-5 p-6 bg-[#F4F3EF] border border-stone-200">
                    <div className="border-b border-stone-300 pb-3 flex items-center space-x-3">
                      <span className="text-sm font-bold font-mono text-[#D85A30]">02</span>
                      <h3
                        className="text-xl font-bold uppercase text-[#141414]"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        Sélection des Produits &amp; Services à Promouvoir
                      </h3>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      Cochez les offres que vous souhaitez promouvoir. Après signature du contrat ci-dessous, votre code de référence personnel sera généré automatiquement avec votre nom.
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
                            className={`p-3.5 border transition-colors cursor-pointer flex items-center space-x-2.5 text-xs ${
                              isChecked
                                ? 'bg-[#0A2A4D] text-white border-[#0A2A4D] font-bold'
                                : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="h-4 w-4 accent-[#D85A30] cursor-pointer"
                            />
                            <span>{prod}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3: CONTRACT & ELECTRONIC SIGNATURE */}
                <div className="space-y-5 pt-4 border-t border-stone-200">
                  <div className="border-b border-stone-200 pb-3 flex items-center space-x-3">
                    <span className="text-sm font-bold font-mono text-[#D85A30]">03</span>
                    <h3
                      className="text-xl font-bold uppercase text-[#141414]"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      Contrat d’Engagement &amp; Signature Électronique
                    </h3>
                  </div>

                  <div className="p-5 bg-[#FAF9F6] border border-stone-300 text-stone-700 text-xs max-h-48 overflow-y-auto space-y-2 leading-relaxed">
                    <p className="font-bold text-[#0A2A4D] uppercase text-center border-b border-stone-200 pb-2">
                      CONTRAT OFFICIEL D’AFFILIATION &amp; D’ENGAGEMENT POLYVERSE 2026
                    </p>
                    <p>
                      <strong>Entre les soussignés :</strong> Polyverse, entreprise établie à Caracol, Haïti (Village EKAM La Différence), d’une part ; et le signataire identifié par son nom complet, sa CIN et son NIF, d’autre part.
                    </p>
                    <p>
                      <strong>1. Objet :</strong> Le présent contrat encadre la collaboration officielle dans le cadre du statut sollicité ({activeRole.toUpperCase()}).
                    </p>
                    <p>
                      <strong>2. Engagements Réciproques :</strong> L’affilié s’engage à représenter fidèlement les services Polyverse sans pratique frauduleuse. Polyverse s’engage au règlement transparent et ponctuel des commissions et dividendes dus.
                    </p>
                    <p>
                      <strong>3. Confidentialité :</strong> Les deux parties s’engagent à respecter la confidentialité des données échangées et l’image de la marque.
                    </p>
                    <p>
                      <strong>4. Entrée en Vigueur :</strong> Le présent engagement prend effet dès validation du dossier et signature électronique.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm items-center">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Nom Complet Pour Signature Électronique *
                      </label>
                      <input
                        type="text"
                        required
                        value={signatureName}
                        onChange={(e) => setSignatureName(e.target.value)}
                        placeholder="Saisissez votre Nom et Prénom pour signer"
                        className="w-full px-4 py-3 border border-stone-300 bg-white font-mono font-bold text-stone-900 focus:border-[#0A2A4D] outline-none"
                      />
                    </div>

                    <label className="flex items-start space-x-3 text-xs font-semibold text-stone-700 cursor-pointer pt-4">
                      <input
                        type="checkbox"
                        required
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="w-4 h-4 mt-0.5 accent-[#D85A30] cursor-pointer shrink-0"
                      />
                      <span>
                        Je certifie sur l’honneur l’exactitude des renseignements fournis et j’accepte les clauses du contrat Polyverse.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-[#D85A30] hover:bg-[#b84722] text-white font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center space-x-2"
                    style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px' }}
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
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
