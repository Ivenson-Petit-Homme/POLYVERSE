import React, { useState } from 'react';
import { POLYVERSE_INFO } from '../data/polyverseData';
import { SectionDarkDivider } from './SectionDarkDivider';
import donationImpactBg from '../assets/images/donation_impact_bg_1789429587193.jpg';
import {
  Heart,
  DollarSign,
  CreditCard,
  Smartphone,
  Bitcoin,
  Building2,
  CheckCircle2,
  Sparkles,
  Users,
  GraduationCap,
  Award,
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
  HelpCircle,
  Receipt,
  Download,
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
    message: 'Félicitations à l’équipe Polyverse pour votre soutien à la jeunesse et aux jeunes créatifs !',
    date: 'Aujourd’hui',
    badge: 'Mécène d’Or',
  },
  {
    id: 'd-2',
    name: 'Marie-Claire D.',
    amount: 50,
    currency: 'USD',
    message: 'Pour financer le matériel de sérigraphie pour les ateliers d’étudiants à Caracol.',
    date: 'Hier',
    badge: 'Soutien Actif',
  },
  {
    id: 'd-3',
    name: 'Fondation Innova',
    amount: 250,
    currency: 'USD',
    message: 'Un plaisir de soutenir les formations tech et le marketing digital dans le Nord.',
    date: 'Il y a 3 jours',
    badge: 'Partenaire Impact',
  },
  {
    id: 'd-4',
    name: 'Anonyme',
    amount: 25,
    currency: 'USD',
    message: 'Ensemble, faisons grandir l’impact de Polyverse !',
    date: 'Il y a 5 jours',
    anonymous: true,
  },
];

export const DonateSection: React.FC<DonateSectionProps> = ({ onOpenQuoteModal }) => {
  // Amount State
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [currency, setCurrency] = useState<'USD' | 'HTG'>('USD');

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<'moncash' | 'natcash' | 'card' | 'crypto' | 'bank'>('moncash');

  // Donor Details
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Status
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  // Raised Funds Progress
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
      message: donorMessage || 'Soutien aux initiatives Polyverse',
      date: 'À l’instant',
      badge: finalAmount >= 100 ? 'Grand Mécène' : 'Donateur',
      anonymous: isAnonymous,
    };

    setDonorsList([newDonor, ...donorsList]);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner Header with Donation & Education Impact Background */}
      <section className="relative overflow-hidden bg-[#0A2A4D] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-700/80">
        {/* High-visibility background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={donationImpactBg}
            alt="Donation and Impact Polyverse"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06152B]/95 via-[#0A2A4D]/85 to-[#06152B]/90" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-blue-100 shadow-xs">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
            <span>Soutenir l’Impact & l’Éducation avec Polyverse</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Faites un don pour soutenir l’innovation & les jeunes talents
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
            Vos contributions aident Polyverse à équiper des ateliers de sérigraphie pour étudiants, offrir des bourses de formation en développement web et financer des micro-projets locaux en Haïti.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-blue-100">
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Formations Tech Gratuites</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
              <Users className="w-4 h-4 text-amber-300" />
              <span>Mentorat de Startups</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
              <Award className="w-4 h-4 text-orange-400" />
              <span>Sponsoring Équipements</span>
            </div>
          </div>
        </div>

        {/* Goal Tracker Card inside Hero */}
        <div className="mt-8 pt-8 border-t border-white/15 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-200">
              <span>Campagne 2026 : Matériel & Bourses Tech</span>
              <span className="text-emerald-400 font-extrabold">
                ${currentRaisedUSD.toLocaleString()} USD récoltés / ${currentGoalUSD.toLocaleString()} USD
              </span>
            </div>
            <div className="w-full h-3.5 bg-white/20 rounded-full overflow-hidden p-0.5 border border-white/20 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-400 rounded-full transition-all duration-1000 shadow-xs"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-300">
              Objectif atteint à <strong className="text-white">{progressPercent}%</strong> — Merci à nos 40+ donateurs et partenaires !
            </p>
          </div>

          <div className="md:col-span-4 flex justify-start md:justify-end">
            <a
              href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20je%20souhaite%20faire%20un%20don%20particulier%20ou%20un%20m%C3%A9c%C3%A9nat`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center space-x-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Parler à l’équipe Mécénat</span>
            </a>
          </div>
        </div>
      </section>

      <SectionDarkDivider label="Contribution & Projets Soutenus" />

      {/* Main Form & Payment Options Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Interactive Donation Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-8">
          {isSubmitted ? (
            /* Thank You / Receipt Summary */
            <div className="space-y-6 text-center py-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Don Confirmé
                </span>
                <h2 className="text-2xl font-extrabold text-[#0A2A4D]">
                  Merci infiniment pour votre précieux soutien !
                </h2>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Votre contribution de{' '}
                  <strong className="text-[#D85A30]">
                    {getEffectiveAmount()} {currency}
                  </strong>{' '}
                  permet d'impacter directement les jeunes talents et les projets de Polyverse.
                </p>
              </div>

              {/* Receipt Box */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left space-y-3 text-xs max-w-md mx-auto">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-500 flex items-center space-x-1">
                    <Receipt className="w-4 h-4 text-[#185FA5]" />
                    <span>Reçu de Don Polyverse</span>
                  </span>
                  <span className="text-slate-400 font-mono">#DON-{Date.now().toString().slice(-6)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <p className="text-slate-400 font-medium">Donateur</p>
                    <p className="font-bold">{isAnonymous ? 'Anonyme' : donorName || 'Anonyme'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Montant</p>
                    <p className="font-extrabold text-[#D85A30]">{getEffectiveAmount()} {currency}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Mode de paiement</p>
                    <p className="font-semibold uppercase">{paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Date</p>
                    <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#0A2A4D] hover:bg-[#103E6D] text-white font-bold text-xs transition"
                >
                  Faire un autre don
                </button>
                <a
                  href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20je%20viens%20de%20faire%20un%20don%20de%20${getEffectiveAmount()}%20${currency}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center space-x-2"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Confirmer via WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDonateSubmit} className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-extrabold text-[#0A2A4D] flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-[#D85A30]" />
                  <span>Choisissez le montant de votre don</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Sélectionnez une devise et un montant prédéfini ou indiquez votre montant personnalisé.
                </p>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setCurrency('USD');
                    setAmount(50);
                  }}
                  className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition ${
                    currency === 'USD'
                      ? 'bg-[#0A2A4D] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
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
                  className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition ${
                    currency === 'HTG'
                      ? 'bg-[#0A2A4D] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  HTG (Goud)
                </button>
              </div>

              {/* Predefined Amounts Buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {activeAmounts.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      setAmount(val);
                      setIsCustom(false);
                    }}
                    className={`py-3 rounded-2xl font-extrabold text-xs border transition-all ${
                      !isCustom && amount === val
                        ? 'bg-[#185FA5] text-white border-[#185FA5] shadow-md scale-105'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    {val.toLocaleString()} {currency === 'USD' ? '$' : 'G'}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Ou entrez un montant personnalisé :
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    placeholder={`Montant en ${currency}...`}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setIsCustom(true);
                    }}
                    className="w-full text-xs p-3.5 pl-10 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#185FA5] bg-slate-50"
                  />
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                    {currency === 'USD' ? '$' : 'G'}
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method Selector */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-[#0A2A4D] flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-[#185FA5]" />
                  <span>Mode de paiement</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('moncash')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      paymentMethod === 'moncash'
                        ? 'bg-rose-50 border-rose-500 text-rose-900 font-bold shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <p className="text-xs font-extrabold flex items-center space-x-1">
                      <Smartphone className="w-3.5 h-3.5 text-rose-600" />
                      <span>MonCash</span>
                    </p>
                    <p className="text-[10px] text-slate-500">Haïti Mobile</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('natcash')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      paymentMethod === 'natcash'
                        ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <p className="text-xs font-extrabold flex items-center space-x-1">
                      <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                      <span>Natcash</span>
                    </p>
                    <p className="text-[10px] text-slate-500">Natcom Wallet</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <p className="text-xs font-extrabold flex items-center space-x-1">
                      <CreditCard className="w-3.5 h-3.5 text-amber-600" />
                      <span>Carte Visa/MC</span>
                    </p>
                    <p className="text-[10px] text-slate-500">International</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('crypto')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      paymentMethod === 'crypto'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <p className="text-xs font-extrabold flex items-center space-x-1">
                      <Bitcoin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Crypto / USDT</span>
                    </p>
                    <p className="text-[10px] text-slate-500">TRC20 / BEP20</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3 rounded-2xl border text-left transition-all col-span-2 sm:col-span-1 ${
                      paymentMethod === 'bank'
                        ? 'bg-slate-100 border-slate-600 text-slate-900 font-bold shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <p className="text-xs font-extrabold flex items-center space-x-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-700" />
                      <span>Virement</span>
                    </p>
                    <p className="text-[10px] text-slate-500">Compte BNC/SOGE</p>
                  </button>
                </div>

                {/* Specific Payment Instructions Box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                  {paymentMethod === 'moncash' && (
                    <div className="space-y-1.5">
                      <p className="font-bold text-[#0A2A4D] flex items-center justify-between">
                        <span>Instructions MonCash :</span>
                        <span className="text-rose-600 font-mono font-bold">+509 41 61 3156</span>
                      </p>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        Composez <strong>*202#</strong> &gt; Transférer de l'argent &gt; Entrez le numéro <strong>+509 41 61 3156</strong> (Polyverse) &gt; Confirmez le montant de <strong>{getEffectiveAmount()} {currency}</strong>.
                      </p>
                      <button
                        type="button"
                        onClick={() => handleCopy('+50941613156', 'MonCash')}
                        className="mt-1 px-3 py-1 bg-white border border-slate-300 rounded-lg text-[10px] font-bold text-slate-700 flex items-center space-x-1 hover:bg-slate-100"
                      >
                        {copiedAddress === 'MonCash' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>Copier le numéro MonCash</span>
                      </button>
                    </div>
                  )}

                  {paymentMethod === 'natcash' && (
                    <div className="space-y-1.5">
                      <p className="font-bold text-[#0A2A4D] flex items-center justify-between">
                        <span>Instructions Natcash :</span>
                        <span className="text-blue-600 font-mono font-bold">+509 48 21 8284</span>
                      </p>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        Ouvrez l'application Natcash ou composez <strong>*133#</strong> &gt; Transfert d'argent vers <strong>+509 48 21 8284</strong>.
                      </p>
                      <button
                        type="button"
                        onClick={() => handleCopy('+50948218284', 'Natcash')}
                        className="mt-1 px-3 py-1 bg-white border border-slate-300 rounded-lg text-[10px] font-bold text-slate-700 flex items-center space-x-1 hover:bg-slate-100"
                      >
                        {copiedAddress === 'Natcash' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>Copier le numéro Natcash</span>
                      </button>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-2">
                      <p className="font-bold text-[#0A2A4D]">Informations Carte Bancaire (Simulation sécurisée Stripe) :</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Numéro de carte (4242 ...)"
                          className="p-2.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                        <div className="grid grid-cols-2 gap-1">
                          <input
                            type="text"
                            placeholder="MM/AA"
                            className="p-2.5 bg-white border border-slate-200 rounded-lg text-xs"
                          />
                          <input
                            type="text"
                            placeholder="CVC"
                            className="p-2.5 bg-white border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'crypto' && (
                    <div className="space-y-1.5">
                      <p className="font-bold text-[#0A2A4D]">Adresse USDT (TRC-20) Polyverse :</p>
                      <p className="font-mono text-[11px] bg-white p-2 rounded-lg border border-slate-300 break-all select-all text-slate-800">
                        TY8xP2mQ9vL4K1nW3zR7jS0aB5cC8dE9fG
                      </p>
                      <button
                        type="button"
                        onClick={() => handleCopy('TY8xP2mQ9vL4K1nW3zR7jS0aB5cC8dE9fG', 'Crypto')}
                        className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-[10px] font-bold text-slate-700 flex items-center space-x-1 hover:bg-slate-100"
                      >
                        {copiedAddress === 'Crypto' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>Copier l’adresse USDT</span>
                      </button>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="space-y-1">
                      <p className="font-bold text-[#0A2A4D]">Coordonnées bancaires BNC / Sogebank :</p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Bénéficiaire :</strong> Polyverse S.A. | <strong>RIB :</strong> 1029 3847 5610 2938
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 3: Donor Contact Details */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-[#0A2A4D]">Vos coordonnées (Facultatif)</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Nom & Prénom</label>
                    <input
                      type="text"
                      disabled={isAnonymous}
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Ex: Jean Paul"
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 disabled:bg-slate-100"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Email (pour le reçu)</label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="votre.email@example.com"
                      className="w-full text-xs p-3 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Message d’encouragement (Public)</label>
                  <textarea
                    rows={2}
                    value={donorMessage}
                    onChange={(e) => setDonorMessage(e.target.value)}
                    placeholder="Laissez un petit mot pour l'équipe ou les étudiants..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 resize-none"
                  ></textarea>
                </div>

                <label className="flex items-center space-x-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 rounded-sm text-[#185FA5] focus:ring-0"
                  />
                  <span className="text-xs text-slate-700 font-medium">
                    Garder ce don <strong>anonyme</strong> sur le mur des donateurs.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-[#D85A30] hover:bg-[#c24e27] text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 active:scale-98"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>
                  Confirmer mon don de {getEffectiveAmount()} {currency}
                </span>
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Impact Projects & Wall of Donors */}
        <div className="lg:col-span-5 space-y-8">
          {/* Where the money goes */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center space-x-2 text-[#0A2A4D]">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-extrabold text-base">Transparence & Impact Direct</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              100% des dons collectés sont directement réinvestis dans les projets éducatifs et communautaires de Polyverse :
            </p>

            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-[#185FA5] mt-1 shrink-0"></span>
                <div>
                  <strong className="text-[#0A2A4D] font-bold block">1. Bourses de formation Tech</strong>
                  <span className="text-slate-500">
                    Soutien financier aux étudiants talentueux pour apprendre le développement web et le marketing.
                  </span>
                </div>
              </li>

              <li className="flex items-start space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-[#D85A30] mt-1 shrink-0"></span>
                <div>
                  <strong className="text-[#0A2A4D] font-bold block">2. Équipement Atelier Sérigraphie</strong>
                  <span className="text-slate-500">
                    Achat d'encres écologiques, cadres de sérigraphie et t-shirts pour les ateliers pratiques.
                  </span>
                </div>
              </li>

              <li className="flex items-start space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1 shrink-0"></span>
                <div>
                  <strong className="text-[#0A2A4D] font-bold block">3. Micro-Prêts Startups</strong>
                  <span className="text-slate-500">
                    Financement de démarrage à taux zéro pour de jeunes créateurs locaux.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Wall of Supporters / Recent Donors */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-[#0A2A4D] flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Mur des Donateurs</span>
              </h3>
              <span className="text-[11px] font-bold text-slate-400">{donorsList.length} soutiens</span>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {donorsList.map((donor) => (
                <div
                  key={donor.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 transition hover:bg-slate-100"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0A2A4D]">
                      {donor.anonymous ? 'Donateur Anonyme' : donor.name}
                    </span>
                    <span className="font-extrabold text-xs text-[#D85A30]">
                      +{donor.amount} {donor.currency}
                    </span>
                  </div>

                  {donor.badge && (
                    <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-[#185FA5]">
                      {donor.badge}
                    </span>
                  )}

                  {donor.message && (
                    <p className="text-[11px] text-slate-600 italic leading-snug">
                      "{donor.message}"
                    </p>
                  )}

                  <p className="text-[9px] text-slate-400 font-medium text-right">{donor.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SectionDarkDivider label="Questions & Réponses Fréquentes" />

      {/* FAQ Donations */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200 space-y-6">
        <h2 className="text-xl font-extrabold text-[#0A2A4D] flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-[#185FA5]" />
          <span>Questions fréquentes sur les dons Polyverse</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
          <div className="space-y-2">
            <h4 className="font-bold text-[#0A2A4D] text-sm">Comment mon don est-il utilisé ?</h4>
            <p className="leading-relaxed">
              Chaque don reçu sert directement à financer les bourses d'études en technologie, l'achat de consommables de sérigraphie et le fonds de soutien aux jeunes entrepreneurs.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#0A2A4D] text-sm">Puis-je faire un don en nature (Matériel, PC, Imprimantes) ?</h4>
            <p className="leading-relaxed">
              Oui absolument ! Nous acceptons volontiers le matériel informatique, les équipements de sérigraphie et les fournitures. Contactez-nous directement sur WhatsApp pour convenir de la remise.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
