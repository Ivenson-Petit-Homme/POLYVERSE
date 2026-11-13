import React, { useState } from 'react';
import { POLYVERSE_INFO } from '../data/polyverseData';
import donationImpactBg from '../assets/images/donation_impact_bg_1789429587193.jpg';
import {
  Heart,
  CreditCard,
  Smartphone,
  Bitcoin,
  Building2,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Receipt,
} from 'lucide-react';

interface DonateSectionProps {
  onOpenQuoteModal?: () => void;
}

interface RecentDonor {
  id: string;
  name: string;
  amount: number;
  currency: 'USD' | 'HTG';
  message: string;
  date: string;
  badge?: string;
  anonymous?: boolean;
}

const INITIAL_DONORS: RecentDonor[] = [
  {
    id: 'd-1',
    name: 'Jean-Luc M.',
    amount: 100,
    currency: 'USD',
    message: 'Félicitations à l’équipe Polyverse pour votre soutien à la jeunesse et aux jeunes créatifs.',
    date: 'Aujourd’hui',
    badge: 'Mécène d’Or',
  },
  {
    id: 'd-2',
    name: 'Marie-Claire D.',
    amount: 50,
    currency: 'USD',
    message: 'Pour financer le matériel de sérigraphie destiné aux ateliers étudiants à Caracol.',
    date: 'Hier',
    badge: 'Soutien Actif',
  },
  {
    id: 'd-3',
    name: 'Fondation Innova',
    amount: 250,
    currency: 'USD',
    message: 'Un plaisir de soutenir les formations technologiques et le marketing digital dans le Nord.',
    date: 'Il y a 3 jours',
    badge: 'Partenaire Impact',
  },
  {
    id: 'd-4',
    name: 'Anonyme',
    amount: 25,
    currency: 'USD',
    message: 'Ensemble, faisons grandir l’impact de Polyverse.',
    date: 'Il y a 5 jours',
    anonymous: true,
  },
];

export const DonateSection: React.FC<DonateSectionProps> = () => {
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [currency, setCurrency] = useState<'USD' | 'HTG'>('USD');
  const [paymentMethod, setPaymentMethod] = useState<'moncash' | 'natcash' | 'card' | 'crypto' | 'bank'>('moncash');

  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const currentGoalUSD = 5000;
  const currentRaisedUSD = 3450;
  const progressPercent = Math.min(100, Math.round((currentRaisedUSD / currentGoalUSD) * 100));

  const [donorsList, setDonorsList] = useState<RecentDonor[]>(INITIAL_DONORS);

  const predefinedAmountsUSD = [10, 25, 50, 100, 250];
  const predefinedAmountsHTG = [1500, 3500, 7500, 15000, 35000];
  const activeAmounts = currency === 'USD' ? predefinedAmountsUSD : predefinedAmountsHTG;

  const getEffectiveAmount = () => {
    if (isCustom) {
      return parseFloat(customAmount) || 0;
    }
    return amount;
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(label);
    setTimeout(() => setCopiedAddress(null), 2500);
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = getEffectiveAmount();
    if (finalAmount <= 0) return;

    const newDonor: RecentDonor = {
      id: `d-${Date.now()}`,
      name: isAnonymous ? 'Anonyme' : donorName || 'Donateur Polyverse',
      amount: finalAmount,
      currency,
      message: donorMessage || 'Soutien aux initiatives éducatives Polyverse',
      date: 'À l’instant',
      badge: finalAmount >= 100 ? 'Grand Mécène' : 'Donateur',
      anonymous: isAnonymous,
    };

    setDonorsList([newDonor, ...donorsList]);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white text-[#141414]">
      {/* 1. FULL-BLEED EDITORIAL HERO (WWF.FR STYLE) */}
      <section className="relative bg-[#08101C] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={donationImpactBg}
            alt="Programme d'Impact Social et Bourses Tech Polyverse"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08101C]/95 via-[#0A2A4D]/85 to-[#08101C]/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E87048] block">
              Mécénat &amp; Solidarité Numérique
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-[60px] font-bold uppercase leading-[1.0] text-white"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Soutenir l’Innovation &amp; les Jeunes Talents
            </h1>
            <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl">
              Vos contributions équipent des ateliers de sérigraphie étudiants, financent des bourses de formation technologique et soutiennent les initiatives entrepreneuriales locales en Haïti.
            </p>
          </div>

          {/* Goal Progress Strip */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2.5">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-stone-200">
                <span>Campagne 2026 : Matériel &amp; Bourses Technologiques</span>
                <span className="text-emerald-400 font-tabular">
                  ${currentRaisedUSD.toLocaleString()} USD / ${currentGoalUSD.toLocaleString()} USD ({progressPercent}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-white/15 overflow-hidden">
                <div
                  className="h-full bg-[#D85A30] transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-stone-300">
                Merci aux plus de 40 donateurs et mécènes engagés auprès de Polyverse.
              </p>
            </div>

            <div className="md:col-span-4 flex justify-start md:justify-end">
              <a
                href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace(
                  '+',
                  ''
                )}?text=Bonjour%20Polyverse%2C%20je%20souhaite%20contribuer%20au%20programme%20de%20m%C3%A9c%C3%A9nat`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-[#D85A30] hover:bg-[#b84722] text-white font-bold uppercase tracking-wider text-sm transition-colors flex items-center space-x-2"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <Heart className="w-4 h-4" />
                <span>Contacter le Pôle Mécénat</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DONATION FORM & IMPACT TRANSPARENCY */}
      <section className="bg-[#F4F3EF] py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Side: Donation Form */}
          <div className="lg:col-span-7 bg-white border border-stone-200 p-6 sm:p-10 space-y-8">
            {isSubmitted ? (
              <div className="space-y-6 text-center py-8">
                <div className="w-14 h-14 bg-emerald-700 text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 block">
                    Contribution Confirmée
                  </span>
                  <h2
                    className="text-3xl font-bold uppercase text-[#141414]"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Merci pour Votre Soutien
                  </h2>
                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Votre don de{' '}
                    <strong className="font-tabular text-[#D85A30]">
                      {getEffectiveAmount()} {currency}
                    </strong>{' '}
                    soutient directement la formation et l’équipement des jeunes créateurs.
                  </p>
                </div>

                <div className="bg-[#F4F3EF] p-6 border border-stone-300 text-left space-y-3 text-xs max-w-md mx-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-300">
                    <span className="font-bold text-[#0A2A4D] uppercase flex items-center space-x-1.5">
                      <Receipt className="w-4 h-4 text-[#D85A30]" />
                      <span>Reçu de Contribution Polyverse</span>
                    </span>
                    <span className="text-stone-500 font-mono">#DON-{Date.now().toString().slice(-6)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-stone-700">
                    <div>
                      <p className="text-stone-500 font-medium">Donateur</p>
                      <p className="font-bold text-[#141414]">{isAnonymous ? 'Anonyme' : donorName || 'Anonyme'}</p>
                    </div>
                    <div>
                      <p className="text-stone-500 font-medium">Montant</p>
                      <p className="font-bold font-tabular text-[#D85A30]">
                        {getEffectiveAmount()} {currency}
                      </p>
                    </div>
                    <div>
                      <p className="text-stone-500 font-medium">Moyen de paiement</p>
                      <p className="font-bold uppercase">{paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-stone-500 font-medium">Date</p>
                      <p className="font-bold">{new Date().toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3.5 bg-[#0A2A4D] hover:bg-[#185FA5] text-white font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
                  >
                    Effectuer un Autre Don
                  </button>
                  <a
                    href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace(
                      '+',
                      ''
                    )}?text=Bonjour%20Polyverse%2C%20je%20viens%20de%20faire%20un%20don%20de%20${getEffectiveAmount()}%20${currency}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase tracking-wider text-xs transition-colors flex items-center space-x-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Confirmer via WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDonateSubmit} className="space-y-8">
                <div className="border-b border-stone-200 pb-4">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#D85A30] block">
                    Contribution Libre
                  </span>
                  <h2
                    className="text-2xl sm:text-3xl font-bold uppercase text-[#141414] mt-1"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Choisissez Votre Montant de Soutien
                  </h2>
                </div>

                {/* Currency Switcher */}
                <div className="inline-grid grid-cols-2 border border-stone-300">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrency('USD');
                      setAmount(50);
                    }}
                    className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      currency === 'USD' ? 'bg-[#0A2A4D] text-white' : 'bg-[#F4F3EF] text-stone-700'
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrency('HTG');
                      setAmount(7500);
                    }}
                    className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      currency === 'HTG' ? 'bg-[#0A2A4D] text-white' : 'bg-[#F4F3EF] text-stone-700'
                    }`}
                  >
                    HTG (Gourdes)
                  </button>
                </div>

                {/* Predefined Amounts */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {activeAmounts.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        setAmount(val);
                        setIsCustom(false);
                      }}
                      className={`py-3.5 font-bold font-tabular text-sm border transition-colors cursor-pointer ${
                        !isCustom && amount === val
                          ? 'bg-[#D85A30] text-white border-[#D85A30]'
                          : 'bg-[#F4F3EF] hover:bg-stone-200 text-[#141414] border-stone-300'
                      }`}
                    >
                      {val.toLocaleString()} {currency === 'USD' ? '$' : 'G'}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1.5">
                    Montant Personnalisé ({currency})
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      placeholder={`Saisir le montant en ${currency}...`}
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setIsCustom(true);
                      }}
                      className="w-full text-sm p-3.5 pl-10 border border-stone-300 focus:border-[#0A2A4D] outline-none bg-white font-tabular"
                    />
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 font-bold text-xs">
                      {currency === 'USD' ? '$' : 'G'}
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4 pt-4 border-t border-stone-200">
                  <h3
                    className="text-lg font-bold uppercase text-[#141414]"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Mode de Paiement
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                    {[
                      { id: 'moncash', label: 'MonCash', sub: 'Mobile Haïti', icon: Smartphone },
                      { id: 'natcash', label: 'Natcash', sub: 'Natcom Wallet', icon: Smartphone },
                      { id: 'card', label: 'Carte Visa/MC', sub: 'International', icon: CreditCard },
                      { id: 'crypto', label: 'Crypto / USDT', sub: 'TRC20 / BEP20', icon: Bitcoin },
                      { id: 'bank', label: 'Virement', sub: 'BNC / Sogebank', icon: Building2 },
                    ].map((m) => {
                      const IconComp = m.icon;
                      const isSel = paymentMethod === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id as any)}
                          className={`p-3 border text-left transition-colors cursor-pointer ${
                            isSel
                              ? 'bg-[#0A2A4D] text-white border-[#0A2A4D]'
                              : 'bg-[#F4F3EF] hover:bg-stone-200 text-[#141414] border-stone-200'
                          }`}
                        >
                          <p className="font-bold flex items-center space-x-1.5">
                            <IconComp className={`w-3.5 h-3.5 ${isSel ? 'text-[#E87048]' : 'text-[#0A2A4D]'}`} />
                            <span>{m.label}</span>
                          </p>
                          <p className={`text-[11px] mt-0.5 ${isSel ? 'text-stone-300' : 'text-stone-500'}`}>
                            {m.sub}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Instructions */}
                  <div className="bg-[#FAF9F6] p-4 border border-stone-300 text-xs space-y-2">
                    {paymentMethod === 'moncash' && (
                      <div className="space-y-2">
                        <p className="font-bold text-[#0A2A4D] flex items-center justify-between">
                          <span>Instructions MonCash :</span>
                          <span className="font-mono font-bold text-[#D85A30]">+509 41 61 3156</span>
                        </p>
                        <p className="text-stone-600 leading-relaxed">
                          Composez <strong>*202#</strong> &gt; Transférer de l’argent &gt; Entrez <strong>+509 41 61 3156</strong> &gt; Confirmez{' '}
                          <strong>
                            {getEffectiveAmount()} {currency}
                          </strong>
                          .
                        </p>
                        <button
                          type="button"
                          onClick={() => handleCopy('+50941613156', 'MonCash')}
                          className="px-3 py-1.5 bg-white border border-stone-300 text-xs font-bold text-stone-700 inline-flex items-center space-x-1.5 hover:bg-stone-100 cursor-pointer"
                        >
                          {copiedAddress === 'MonCash' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>Copier le numéro MonCash</span>
                        </button>
                      </div>
                    )}

                    {paymentMethod === 'natcash' && (
                      <div className="space-y-2">
                        <p className="font-bold text-[#0A2A4D] flex items-center justify-between">
                          <span>Instructions Natcash :</span>
                          <span className="font-mono font-bold text-[#185FA5]">+509 48 21 8284</span>
                        </p>
                        <p className="text-stone-600 leading-relaxed">
                          Ouvrez l’application Natcash ou composez <strong>*133#</strong> vers le numéro{' '}
                          <strong>+509 48 21 8284</strong>.
                        </p>
                        <button
                          type="button"
                          onClick={() => handleCopy('+50948218284', 'Natcash')}
                          className="px-3 py-1.5 bg-white border border-stone-300 text-xs font-bold text-stone-700 inline-flex items-center space-x-1.5 hover:bg-stone-100 cursor-pointer"
                        >
                          {copiedAddress === 'Natcash' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>Copier le numéro Natcash</span>
                        </button>
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="space-y-2">
                        <p className="font-bold text-[#0A2A4D]">Paiement par Carte Bancaire :</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Numéro de carte"
                            className="p-2.5 bg-white border border-stone-300 text-xs"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="MM/AA"
                              className="p-2.5 bg-white border border-stone-300 text-xs"
                            />
                            <input
                              type="text"
                              placeholder="CVC"
                              className="p-2.5 bg-white border border-stone-300 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'crypto' && (
                      <div className="space-y-2">
                        <p className="font-bold text-[#0A2A4D]">Adresse USDT (TRC-20) Polyverse :</p>
                        <p className="font-mono text-xs bg-white p-2.5 border border-stone-300 break-all select-all">
                          TY8xP2mQ9vL4K1nW3zR7jS0aB5cC8dE9fG
                        </p>
                        <button
                          type="button"
                          onClick={() => handleCopy('TY8xP2mQ9vL4K1nW3zR7jS0aB5cC8dE9fG', 'Crypto')}
                          className="px-3 py-1.5 bg-white border border-stone-300 text-xs font-bold text-stone-700 inline-flex items-center space-x-1.5 hover:bg-stone-100 cursor-pointer"
                        >
                          {copiedAddress === 'Crypto' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>Copier l’adresse USDT</span>
                        </button>
                      </div>
                    )}

                    {paymentMethod === 'bank' && (
                      <div className="space-y-1">
                        <p className="font-bold text-[#0A2A4D]">Coordonnées Bancaires BNC / Sogebank :</p>
                        <p className="text-stone-600">
                          <strong>Bénéficiaire :</strong> Polyverse S.A. | <strong>RIB :</strong> 1029 3847 5610 2938
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Donor info */}
                <div className="space-y-4 pt-4 border-t border-stone-200">
                  <h3
                    className="text-lg font-bold uppercase text-[#141414]"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Vos Coordonnées (Facultatif)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1">
                        Nom &amp; Prénom
                      </label>
                      <input
                        type="text"
                        disabled={isAnonymous}
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Ex : Jean Paul"
                        className="w-full p-3 border border-stone-300 disabled:bg-stone-100 outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1">
                        E-mail (Pour le reçu)
                      </label>
                      <input
                        type="email"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder="votre.email@exemple.com"
                        className="w-full p-3 border border-stone-300 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1 text-xs">
                      Message d’Encouragement
                    </label>
                    <textarea
                      rows={2}
                      value={donorMessage}
                      onChange={(e) => setDonorMessage(e.target.value)}
                      placeholder="Laissez un mot pour les étudiants ou l’équipe Polyverse..."
                      className="w-full text-xs p-3 border border-stone-300 resize-none outline-none"
                    />
                  </div>

                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 accent-[#0A2A4D]"
                    />
                    <span className="text-xs text-stone-700 font-medium">
                      Conserver ce don anonyme sur le mur des donateurs.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#D85A30] hover:bg-[#b84722] text-white font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px' }}
                >
                  <Heart className="w-5 h-5" />
                  <span>
                    Confirmer Mon Don de {getEffectiveAmount()} {currency}
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Right Side: Transparency & Wall of Donors */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-stone-200 p-7 space-y-4">
              <div className="flex items-center space-x-2 text-[#0A2A4D] border-b border-stone-200 pb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <h3
                  className="text-xl font-bold uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Transparence &amp; Affectation des Fonds
                </h3>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                L’intégralité des contributions reçues finance directement trois axes communautaires et éducatifs :
              </p>

              <ul className="space-y-4 text-xs">
                <li className="border-b border-stone-100 pb-3">
                  <strong className="text-[#0A2A4D] font-bold uppercase block">01 · Bourses de Formation Tech</strong>
                  <span className="text-stone-600 block mt-0.5">
                    Prise en charge des frais d’apprentissage en développement web et design graphique pour de jeunes étudiants.
                  </span>
                </li>
                <li className="border-b border-stone-100 pb-3">
                  <strong className="text-[#0A2A4D] font-bold uppercase block">02 · Équipements d’Ateliers</strong>
                  <span className="text-stone-600 block mt-0.5">
                    Fourniture d’encres, presses de sérigraphie et supports textiles pour la pratique professionnelle.
                  </span>
                </li>
                <li>
                  <strong className="text-[#0A2A4D] font-bold uppercase block">03 · Amorçage Jeunes Projets</strong>
                  <span className="text-stone-600 block mt-0.5">
                    Appui matériel à de micro-entreprises créatives dirigées par des jeunes du Nord d’Haïti.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-stone-200 p-7 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h3
                  className="text-xl font-bold uppercase text-[#141414]"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Mur des Donateurs
                </h3>
                <span className="text-xs font-bold font-tabular text-[#D85A30]">{donorsList.length} soutiens</span>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {donorsList.map((donor) => (
                  <div key={donor.id} className="p-4 bg-[#F4F3EF] border border-stone-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#141414]">
                        {donor.anonymous ? 'Donateur Anonyme' : donor.name}
                      </span>
                      <span className="font-bold font-tabular text-xs text-[#D85A30]">
                        +{donor.amount} {donor.currency}
                      </span>
                    </div>
                    {donor.badge && (
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#185FA5]">
                        {donor.badge}
                      </span>
                    )}
                    {donor.message && (
                      <p className="text-xs text-stone-600 italic leading-snug">« {donor.message} »</p>
                    )}
                    <p className="text-[10px] text-stone-400 text-right">{donor.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ DONATIONS */}
      <section className="bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <h2
            className="text-2xl sm:text-3xl font-bold uppercase text-[#141414]"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Questions Fréquentes sur le Mécénat Polyverse
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-600">
            <div className="p-6 bg-[#F4F3EF] border border-stone-200 space-y-2">
              <h3
                className="font-bold uppercase text-[#0A2A4D] text-base"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Comment mon don est-il utilisé ?
              </h3>
              <p className="leading-relaxed">
                Chaque contribution sert directement à financer les bourses d’études technologiques, les consommables de formation et le fonds de soutien entrepreneurial.
              </p>
            </div>
            <div className="p-6 bg-[#F4F3EF] border border-stone-200 space-y-2">
              <h3
                className="font-bold uppercase text-[#0A2A4D] text-base"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Puis-je faire un don matériel (PC, Imprimantes, Presses) ?
              </h3>
              <p className="leading-relaxed">
                Oui. Les équipements informatiques et de sérigraphie sont acceptés avec grand plaisir. Contactez notre équipe via WhatsApp pour organiser la remise.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
