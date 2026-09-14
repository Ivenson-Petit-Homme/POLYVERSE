import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { POLYVERSE_INFO } from '../data/polyverseData';
import { ScrollReveal } from './ScrollReveal';
import {
  ShoppingBag,
  Plane,
  CalendarDays,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  Clock,
  ShieldCheck,
  Truck,
  Sparkles,
  Layers,
  FileText,
  Copy,
  Check,
} from 'lucide-react';

interface OrderServiceSectionProps {
  onOpenQuoteModal: () => void;
}

type ServiceType = 'achat-sans-carte' | 'shipping' | 'planification-evenement';

export const OrderServiceSection: React.FC<OrderServiceSectionProps> = ({ onOpenQuoteModal }) => {
  const [selectedService, setSelectedService] = useState<ServiceType>('achat-sans-carte');

  // Form State
  const [productName, setProductName] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [estimatedPriceUSD, setEstimatedPriceUSD] = useState('');
  const [description, setDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // UI state
  const [submitted, setSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);

  const getServiceTitle = (type: ServiceType) => {
    switch (type) {
      case 'achat-sans-carte':
        return 'Achat Sans Carte (Amazon, Shein, AliExpress...)';
      case 'shipping':
        return 'Shipping & Livrezon Entènasyonal / Lokal';
      case 'planification-evenement':
        return 'Planifikasyon Evènman & Galas';
    }
  };

  const handleCalculateTotal = () => {
    const p = parseFloat(estimatedPriceUSD);
    if (isNaN(p) || p <= 0) return null;
    const totalUSD = p * quantity;
    const totalHTG = Math.round(totalUSD * 150);
    return { totalUSD, totalHTG };
  };

  const totals = handleCalculateTotal();

  const handleGenerateWhatsAppLink = () => {
    const serviceName = getServiceTitle(selectedService);
    let msg = `*NOUVO DEMANN SÈVIS POLYVERSE*\n`;
    msg += `----------------------------------------\n`;
    msg += `📌 *Sèvis:* ${serviceName}\n`;
    msg += `📦 *Non Pwodui / Pwojè:* ${productName || 'Non presize'}\n`;
    if (productUrl) msg += `🔗 *Lyen Sit:* ${productUrl}\n`;
    msg += `🔢 *Kantite:* ${quantity}\n`;
    if (color) msg += `🎨 *Koulè:* ${color}\n`;
    if (size) msg += `📏 *Size / Gwosè:* ${size}\n`;
    if (estimatedPriceUSD) msg += `💵 *Pri estimatif:* $${estimatedPriceUSD} USD\n`;
    if (description) msg += `📝 *Deskripsyon / Detay:* ${description}\n`;
    msg += `----------------------------------------\n`;
    msg += `👤 *Kliyan:* ${clientName || 'Kliyan Polyverse'}\n`;
    msg += `📱 *Telefòn/WhatsApp:* ${clientPhone || 'Presize nan chat'}\n`;
    if (clientEmail) msg += `📧 *Imèl:* ${clientEmail}\n`;
    if (deliveryAddress) msg += `📍 *Adrès livrezon:* ${deliveryAddress}\n`;
    if (orderRef) msg += `🔖 *Kòd Referans:* ${orderRef}\n`;

    return `https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(msg)}`;
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef = `PLY-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(newRef);
    setSubmitted(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header Banner */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D85A30] bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
            Pilye Finance & Investissement
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2A4D] tracking-tight">
            Achat Sans Carte, Shipping & Événements
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Pa bezwen kat kredi entènasyonal pou achte sou Amazon, Shein oswa eBay. Nou achte pou ou, nou resevwa koli w epi nou livre l ba ou rapidman an Ayiti !
          </p>
        </div>
      </ScrollReveal>

      {/* 3 Main Services Selector Tabs */}
      <div className="flex justify-center">
        <div className="bg-[#F1EFE8] p-1.5 rounded-2xl border border-slate-200 flex flex-wrap gap-2 max-w-4xl w-full justify-center shadow-xs">
          <button
            type="button"
            onClick={() => setSelectedService('achat-sans-carte')}
            className={`flex items-center space-x-2.5 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
              selectedService === 'achat-sans-carte'
                ? 'bg-[#185FA5] text-white shadow-md'
                : 'text-slate-700 hover:text-[#0A2A4D] hover:bg-white/60'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>1. Achat Sans Carte</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedService('shipping')}
            className={`flex items-center space-x-2.5 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
              selectedService === 'shipping'
                ? 'bg-[#185FA5] text-white shadow-md'
                : 'text-slate-700 hover:text-[#0A2A4D] hover:bg-white/60'
            }`}
          >
            <Plane className="w-4 h-4" />
            <span>2. Shipping & Livrezon</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedService('planification-evenement')}
            className={`flex items-center space-x-2.5 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
              selectedService === 'planification-evenement'
                ? 'bg-[#D85A30] text-white shadow-md'
                : 'text-slate-700 hover:text-[#D85A30] hover:bg-white/60'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>3. Planifikasyon Evènman</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Form & Live Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: The Order / Request Form */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          {submitted ? (
            <div className="py-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#0A2A4D]">
                  Demann Ou An Anrejistre Avèk Siksè !
                </h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm">
                  Ekip Polyverse la resevwa detay kòmand ou a. Pou nou finalize kalkil la epi trete l pi rapid, klike sou bouton WhatsApp anba a.
                </p>
              </div>

              {/* Reference Code Card */}
              <div className="inline-flex items-center space-x-3 bg-slate-50 border border-slate-200 px-5 py-3 rounded-xl">
                <span className="text-xs text-slate-500 uppercase font-semibold">Nimewo Referans :</span>
                <span className="font-mono font-bold text-[#185FA5] text-lg">{orderRef}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(orderRef)}
                  className="p-1 hover:bg-slate-200 rounded text-slate-600 transition"
                  title="Kopye nimewo a"
                >
                  {copiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <a
                  href={handleGenerateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Konfime sou WhatsApp kounye a</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setProductName('');
                    setProductUrl('');
                    setColor('');
                    setSize('');
                    setDescription('');
                  }}
                  className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
                >
                  Pase yon lòt kòmand
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitForm} className="space-y-6">
              {/* Form Category Explainer Notice */}
              <div className="bg-[#FAF9F6] border border-[#EBE8DF] p-4 rounded-xl flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-[#D85A30] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedService === 'achat-sans-carte' && (
                    <span>
                      <strong>Sèvis Achat Sans Carte :</strong> Mete non pwodui a, lyen sit la (Amazon, Shein, etc.), koulè, gwosè ak kantite. Nou kalkile pri total an goud pou ou peye fasilman pa MonCash oswa Natcash !
                    </span>
                  )}
                  {selectedService === 'shipping' && (
                    <span>
                      <strong>Sèvis Shipping & Livrezon :</strong> Presize koli w bezwen transpòte oswa achte nan men founisè lòtbò dlo. Nou ba w adrès depo nan Florid epi nou delivre l an Ayiti.
                    </span>
                  )}
                  {selectedService === 'planification-evenement' && (
                    <span>
                      <strong>Planifikasyon Evènman :</strong> Dekri tip evènman an (Gala, Lansman, Konferans, Fèt promo). Nou jere lojistik, t-shirts, son, banyè ak kowòdinasyon konplè.
                    </span>
                  )}
                </div>
              </div>

              {/* Step 1: Product / Service Details */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#0A2A4D] flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <span className="w-6 h-6 rounded-full bg-[#185FA5] text-white text-xs flex items-center justify-center font-bold">1</span>
                  <span>Detay sou Pwodui oswa Sèvis Ou Bezwen An</span>
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Non Pwodui a / Tit Demann nan *
                  </label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Eg: Robe de soirée Shein, Baskets Nike, Pack 100 t-shirts promo..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Lyen Pwodui sou Sit la (URL - opsyonèl)
                    </label>
                    <input
                      type="url"
                      value={productUrl}
                      onChange={(e) => setProductUrl(e.target.value)}
                      placeholder="https://shein.com/item/... oswa amazon.com/..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Pri Estimatif sou Sit la ($ USD)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={estimatedPriceUSD}
                      onChange={(e) => setEstimatedPriceUSD(e.target.value)}
                      placeholder="Eg: 25.50"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition"
                    />
                  </div>
                </div>

                {/* Attributes: Quantity, Color, Size */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Kantite *
                    </label>
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full text-center py-2.5 text-sm font-bold text-[#0A2A4D] outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Koulè (Couleur)
                    </label>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="Eg: Nwa, Ble, Wouj, Blan..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Size / Gwosè / Pointure
                    </label>
                    <input
                      type="text"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      placeholder="Eg: S, M, L, XL, Pointure 42..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Lòt Deskripsyon & Enstriksyon Espesyal
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Mete tout lòt detay enpòtan sou modèl la, materyo a, oswa egzijans espesyal ou genyen..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition resize-none"
                  />
                </div>
              </div>

              {/* Step 2: Client & Delivery Info */}
              <div className="space-y-4 pt-4">
                <h3 className="text-base font-bold text-[#0A2A4D] flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <span className="w-6 h-6 rounded-full bg-[#185FA5] text-white text-xs flex items-center justify-center font-bold">2</span>
                  <span>Enfòmasyon Pou Livrezon & Kontak</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Non & Prenon Ou *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Eg: Jean-Luc Petit-Homme"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Nimewo WhatsApp / Telefòn *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+509 41 61 3156"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Imèl (Email - opsyonèl)
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="nom@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Vil & Adrès Livrezon an Ayiti *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Eg: Caracol, Cap-Haïtien, Delmas, Pétion-Ville..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-[#185FA5] hover:bg-[#0A2A4D] text-white font-bold rounded-xl shadow-md transition duration-200"
                >
                  <FileText className="w-5 h-5" />
                  <span>Valide Kòmand lan sou Sit la</span>
                </button>

                <a
                  href={handleGenerateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition duration-200"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Voye Dirèk sou WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Live Summary Card & Process Explainer */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live Recap Card */}
          <div className="bg-[#0A2A4D] text-white rounded-2xl p-6 shadow-md space-y-4">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#D85A30] bg-orange-950/60 px-2.5 py-1 rounded-full border border-orange-500/30">
              Aperçu de votre commande
            </span>

            <h4 className="text-lg font-bold text-white">
              {productName || 'Non pwodui a ap parèt la a...'}
            </h4>

            <div className="space-y-2 text-xs border-t border-slate-700/80 pt-3">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Sèvis :</span>
                <span className="font-semibold text-slate-200">{getServiceTitle(selectedService).split('(')[0]}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Kantite :</span>
                <span className="font-semibold text-slate-200">{quantity} pyès</span>
              </div>
              {color && (
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Koulè :</span>
                  <span className="font-semibold text-slate-200">{color}</span>
                </div>
              )}
              {size && (
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Gwosè / Size :</span>
                  <span className="font-semibold text-slate-200">{size}</span>
                </div>
              )}
              {deliveryAddress && (
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Livrezon :</span>
                  <span className="font-semibold text-slate-200">{deliveryAddress}</span>
                </div>
              )}
            </div>

            {totals && (
              <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Pri atik estimatif :</span>
                  <span>${totals.totalUSD.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#D85A30]">
                  <span>Total estimatif an Goud :</span>
                  <span>≈ {totals.totalHTG.toLocaleString()} HTG</span>
                </div>
                <p className="text-[10px] text-slate-400 pt-1">
                  * To referans 1$ = 150 HTG. Frè shipping ak sèvis yo konfime avèk ou anvan pèman.
                </p>
              </div>
            )}

            <div className="pt-2 text-[11px] text-slate-300 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Garanti sekirite 100% sou chak acha pa Polyverse.</span>
            </div>
          </div>

          {/* 4-Step How It Works Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h4 className="text-base font-bold text-[#0A2A4D] flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#185FA5]" />
              <span>Kijan Sèvis la Fonksyone ?</span>
            </h4>

            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-[#185FA5] font-bold flex items-center justify-center shrink-0 text-[11px]">
                  1
                </span>
                <div>
                  <strong className="text-slate-800">Ou voye detay pwodui a</strong>
                  <p>Mete non l, koulè l, gwosè l ak lyen sit kote l ye a.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-[#185FA5] font-bold flex items-center justify-center shrink-0 text-[11px]">
                  2
                </span>
                <div>
                  <strong className="text-slate-800">Nou ba w pri total la</strong>
                  <p>Ekip Polyverse la konfime pri a an goud oswa an dola.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-[#185FA5] font-bold flex items-center justify-center shrink-0 text-[11px]">
                  3
                </span>
                <div>
                  <strong className="text-slate-800">Pèman fasil an Ayiti</strong>
                  <p>Peye pa MonCash, Natcash, virement oswa lajan kach.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  4
                </span>
                <div>
                  <strong className="text-slate-800">Acha & Livrezon an sekirite</strong>
                  <p>Nou achte l imedyatman, swiv koli a epi livre l nan men w !</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="w-full py-2.5 text-center text-xs font-bold text-[#185FA5] hover:text-[#0A2A4D] hover:bg-slate-50 rounded-xl transition"
              >
                Mande yon kalkil rapid / Devis jeneral →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
