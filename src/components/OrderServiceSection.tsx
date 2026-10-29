import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  POLYVERSE_INFO,
  POLYVERSE_EXCHANGE_RATE,
  POLYVERSE_SHIPPING_ADDRESS,
  STREAMING_PLANS,
} from '../data/polyverseData';
import { ScrollReveal } from './ScrollReveal';
import { SectionDarkDivider } from './SectionDarkDivider';
import shippingLogisticsImg from '../assets/images/shipping_logistics_bg_1789429529421.jpg';
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
  Lock,
  PlayCircle,
  CreditCard,
  DollarSign,
  MapPin,
  Upload,
  Tv,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface OrderServiceSectionProps {
  onOpenQuoteModal: () => void;
}

type ServiceType =
  | 'achat-sans-carte'
  | 'shipping'
  | 'streaming'
  | 'planification-evenement'
  | 'zelle-carte';

export const OrderServiceSection: React.FC<OrderServiceSectionProps> = ({ onOpenQuoteModal }) => {
  const [selectedService, setSelectedService] = useState<ServiceType>('achat-sans-carte');
  const { currentUser, requireAuth, placeOrder, setIsAccountModalOpen } = useAuth();

  // Common Client Contact Fields
  const [clientName, setClientName] = useState(currentUser?.name || '');
  const [clientPhone, setClientPhone] = useState(currentUser?.phone || '');
  const [clientEmail, setClientEmail] = useState(currentUser?.email || '');
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser?.address || '');

  // 1. ACHAT SANS CARTE
  const [cartUrl, setCartUrl] = useState('');
  const [productName, setProductName] = useState('');
  const [estimatedPriceUSD, setEstimatedPriceUSD] = useState('');
  const [cartDescription, setCartDescription] = useState('');

  // 2. SHIPPING EN HAÏTI
  const [packageContent, setPackageContent] = useState('');
  const [weightLbs, setWeightLbs] = useState<number>(3);
  const [destinationCity, setDestinationCity] = useState<'Caracol' | 'Cap-Haitien' | 'Ouanaminthe' | 'Fort-Liberte' | 'Port-au-Prince' | 'Autre'>('Caracol');
  const [copiedShippingAddress, setCopiedShippingAddress] = useState(false);

  // 3. STREAMING
  const [selectedStreamingPlatform, setSelectedStreamingPlatform] = useState<'netflix' | 'prime' | 'hbo'>('netflix');
  const [streamingDuration, setStreamingDuration] = useState<'1' | '3' | '6'>('1');
  const [paymentScreenshotName, setPaymentScreenshotName] = useState('');

  // 4. EVENT PLANNING & LOCATION
  const [eventType, setEventType] = useState('Mariage');
  const [eventDate, setEventDate] = useState('');
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>(['Sonorisation complète', 'Microphones sans fil']);
  const [eventNotes, setEventNotes] = useState('');

  // 5. ZELLE & CARTE VIRTUELLE
  const [financeOption, setFinanceOption] = useState<'zelle-moncash' | 'carte-virtuelle'>('zelle-moncash');
  const [zelleAmountUSD, setZelleAmountUSD] = useState('100');
  const [cardHolderName, setCardHolderName] = useState('');

  // Submission UI state
  const [submitted, setSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (!clientName && currentUser.name) setClientName(currentUser.name);
      if (!clientPhone && currentUser.phone) setClientPhone(currentUser.phone);
      if (!clientEmail && currentUser.email) setClientEmail(currentUser.email);
      if (!deliveryAddress && currentUser.address) setDeliveryAddress(currentUser.address);
    }
  }, [currentUser]);

  // Local delivery fees by city
  const cityDeliveryFees: Record<string, number> = {
    'Caracol': 250,
    'Cap-Haitien': 350,
    'Ouanaminthe': 400,
    'Fort-Liberte': 350,
    'Port-au-Prince': 500,
    'Autre': 450,
  };

  // Automatic Shipping Calculation (Document Modification 2 specs)
  // 1-5 lbs: 750 HTG/lb | 6+ lbs: 850 HTG/lb + local delivery fee
  const calculateShippingCost = () => {
    const w = Math.max(1, Number(weightLbs) || 1);
    const ratePerLb = w <= 5 ? POLYVERSE_SHIPPING_ADDRESS.rate1to5lbs : POLYVERSE_SHIPPING_ADDRESS.rate6plusLbs;
    const baseShippingHTG = w * ratePerLb;
    const localFeeHTG = cityDeliveryFees[destinationCity] || 350;
    const totalHTG = baseShippingHTG + localFeeHTG;
    const totalUSD = Math.round((totalHTG / POLYVERSE_EXCHANGE_RATE) * 10) / 10;
    return {
      weight: w,
      ratePerLb,
      baseShippingHTG,
      localFeeHTG,
      totalHTG,
      totalUSD,
    };
  };

  // Achat sans carte calculations
  const calculateAchatSansCarteCost = () => {
    const price = parseFloat(estimatedPriceUSD);
    if (isNaN(price) || price <= 0) return null;
    const totalUSD = price;
    const totalHTG = Math.round(totalUSD * POLYVERSE_EXCHANGE_RATE);
    return { totalUSD, totalHTG };
  };

  // Streaming calculations
  const calculateStreamingCost = () => {
    const plan = STREAMING_PLANS.find((p) => p.id === selectedStreamingPlatform) || STREAMING_PLANS[0];
    const months = parseInt(streamingDuration, 10) || 1;
    const totalUSD = plan.priceUSD * months;
    const totalHTG = totalUSD * POLYVERSE_EXCHANGE_RATE;
    return { plan, months, totalUSD, totalHTG };
  };

  const shippingCalc = calculateShippingCost();
  const achatCalc = calculateAchatSansCarteCost();
  const streamingCalc = calculateStreamingCost();

  const copyShippingAddress = () => {
    navigator.clipboard.writeText(POLYVERSE_SHIPPING_ADDRESS.fullString);
    setCopiedShippingAddress(true);
    setTimeout(() => setCopiedShippingAddress(false), 2500);
  };

  const toggleEquipment = (eq: string) => {
    setSelectedEquipments((prev) =>
      prev.includes(eq) ? prev.filter((item) => item !== eq) : [...prev, eq]
    );
  };

  const handleGenerateWhatsAppLink = (customRef?: string) => {
    const refToUse = customRef || orderRef;
    let msg = `*NOUVELLE COMMANDE POLYVERSE*\n`;
    msg += `----------------------------------------\n`;

    if (selectedService === 'achat-sans-carte') {
      msg += `📌 *Service:* Achat Sans Carte (Taux 140 HTG)\n`;
      if (cartUrl) msg += `🔗 *Lien du Panier / Produit:* ${cartUrl}\n`;
      if (productName) msg += `📦 *Article / Boutique:* ${productName}\n`;
      if (achatCalc) {
        msg += `💵 *Montant Total Estimé:* $${achatCalc.totalUSD} USD (≈ ${achatCalc.totalHTG.toLocaleString()} HTG)\n`;
      }
      if (cartDescription) msg += `📝 *Détails des articles:* ${cartDescription}\n`;
    } else if (selectedService === 'shipping') {
      msg += `📌 *Service:* Shipping Miami vers Haïti\n`;
      msg += `🏢 *Adresse Miami:* ${POLYVERSE_SHIPPING_ADDRESS.fullString}\n`;
      msg += `📦 *Contenu du Colis:* ${packageContent || 'Non précisé'}\n`;
      msg += `⚖️ *Poids:* ${shippingCalc.weight} lbs (Taux: ${shippingCalc.ratePerLb} HTG/lb)\n`;
      msg += `📍 *Destination:* ${destinationCity} (Livraison locale: ${shippingCalc.localFeeHTG} HTG)\n`;
      msg += `💰 *Total Estimé:* ${shippingCalc.totalHTG.toLocaleString()} HTG (≈ $${shippingCalc.totalUSD} USD)\n`;
    } else if (selectedService === 'streaming') {
      msg += `📌 *Service:* Abonnement Streaming ${streamingCalc.plan.name}\n`;
      msg += `📺 *Plateforme:* ${streamingCalc.plan.name} (${streamingCalc.months} Mois)\n`;
      msg += `💰 *Montant à Payer:* ${streamingCalc.totalHTG.toLocaleString()} HTG (ou $${streamingCalc.totalUSD} USD)\n`;
      msg += `📸 *Preuve de Paiement:* ${paymentScreenshotName ? `Reçu prêt: ${paymentScreenshotName}` : 'Envoyé en pièce jointe ci-après'}\n`;
    } else if (selectedService === 'planification-evenement') {
      msg += `📌 *Service:* Event Planning & Location Matériel\n`;
      msg += `🎉 *Type d'événement:* ${eventType}\n`;
      if (eventDate) msg += `📅 *Date prévue:* ${eventDate}\n`;
      msg += `🔊 *Matériel souhaité:* ${selectedEquipments.join(', ')}\n`;
      if (eventNotes) msg += `📝 *Précisions:* ${eventNotes}\n`;
    } else if (selectedService === 'zelle-carte') {
      msg += `📌 *Service:* ${financeOption === 'zelle-moncash' ? 'Zelle vers MonCash / Natcash' : 'Carte Virtuelle Visa/Mastercard'}\n`;
      msg += `💵 *Montant:* $${zelleAmountUSD} USD (≈ ${(Number(zelleAmountUSD) * POLYVERSE_EXCHANGE_RATE).toLocaleString()} HTG)\n`;
      if (cardHolderName) msg += `👤 *Nom Titulaire Carte:* ${cardHolderName}\n`;
    }

    msg += `----------------------------------------\n`;
    msg += `👤 *Client:* ${clientName || currentUser?.name || 'Client Polyverse'}\n`;
    msg += `📱 *Téléphone:* ${clientPhone || currentUser?.phone || 'À préciser'}\n`;
    if (clientEmail || currentUser?.email) msg += `📧 *E-mail:* ${clientEmail || currentUser?.email}\n`;
    msg += `📍 *Adresse Haïti:* ${deliveryAddress || currentUser?.address || 'À préciser'}\n`;
    if (refToUse) msg += `🔖 *Référence Dossier:* ${refToUse}\n`;

    return `https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(msg)}`;
  };

  const handleSubmitForm = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!requireAuth(() => handleSubmitForm())) {
      return;
    }

    if (!clientName.trim() || !clientPhone.trim() || !deliveryAddress.trim()) {
      alert('Veuillez remplir vos informations (Nom, Téléphone et Adresse de livraison).');
      return;
    }

    let finalUSD = 0;
    let finalHTG = 0;
    let orderNotes = '';

    if (selectedService === 'achat-sans-carte') {
      finalUSD = achatCalc ? achatCalc.totalUSD : (parseFloat(estimatedPriceUSD) || 0);
      finalHTG = finalUSD * POLYVERSE_EXCHANGE_RATE;
      orderNotes = `Panier/Produit: ${cartUrl} - Détails: ${cartDescription}`;
    } else if (selectedService === 'shipping') {
      finalHTG = shippingCalc.totalHTG;
      finalUSD = shippingCalc.totalUSD;
      orderNotes = `Colis: ${packageContent} (${shippingCalc.weight} lbs) vers ${destinationCity}`;
    } else if (selectedService === 'streaming') {
      finalHTG = streamingCalc.totalHTG;
      finalUSD = streamingCalc.totalUSD;
      orderNotes = `Abonnement ${streamingCalc.plan.name} (${streamingCalc.months} Mois) - Capture: ${paymentScreenshotName || 'Prête'}`;
    } else if (selectedService === 'planification-evenement') {
      finalUSD = 100;
      finalHTG = 14000;
      orderNotes = `Événement ${eventType} le ${eventDate || 'À fixer'} - Matériel: ${selectedEquipments.join(', ')}`;
    } else if (selectedService === 'zelle-carte') {
      finalUSD = parseFloat(zelleAmountUSD) || 50;
      finalHTG = finalUSD * POLYVERSE_EXCHANGE_RATE;
      orderNotes = `Service: ${financeOption} - Titulaire: ${cardHolderName}`;
    }

    const savedOrder = placeOrder({
      userId: currentUser?.id || 'client',
      userEmail: clientEmail.trim() || currentUser?.email || '',
      userName: clientName.trim(),
      userPhone: clientPhone.trim(),
      userAddress: deliveryAddress.trim(),
      orderType: selectedService,
      totalUSD: finalUSD,
      totalHTG: finalHTG,
      paymentMethod: 'MonCash / Natcash / Zelle',
      productUrl: cartUrl.trim() || undefined,
      notes: orderNotes,
    });

    setOrderRef(savedOrder.id);
    setSubmitted(true);
  };

  const copyRefToClipboard = () => {
    if (!orderRef) return;
    navigator.clipboard.writeText(orderRef);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Header */}
      <ScrollReveal>
        <div className="relative overflow-hidden bg-[#0A2A4D] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-700/80">
          <div className="absolute inset-0 z-0">
            <img
              src={shippingLogisticsImg}
              alt="Services Polyverse"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-110 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06152B]/95 via-[#0A2A4D]/85 to-[#06152B]/90" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-amber-300">
              <Sparkles className="w-4 h-4 text-[#D85A30]" />
              <span>Commande Directe & Tarifs Officiels Polyverse</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Achat Sans Carte, Shipping & Services
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Profitez de notre taux officiel de <span className="text-amber-300 font-extrabold text-lg">1 USD = 140 HTG</span>, de notre adresse de shipping à Miami, de nos abonnements streaming (Netflix, Prime, HBO) et de nos prestations d’événementiel avec location de matériel.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <DollarSign className="w-4 h-4 text-amber-300" />
                <span>Taux Garanti : 140 HTG</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>750 à 850 HTG / livre</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <PlayCircle className="w-4 h-4 text-red-400" />
                <span>Streaming Netflix / Prime / HBO</span>
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Services Switcher Tabs */}
      <div className="flex justify-center">
        <div className="bg-[#F1EFE8] p-1.5 rounded-2xl border border-slate-200 flex flex-wrap gap-1 max-w-4xl w-full justify-center shadow-xs">
          {[
            { id: 'achat-sans-carte' as ServiceType, label: 'Achat Sans Carte', badge: 'Taux 140', icon: ShoppingBag },
            { id: 'shipping' as ServiceType, label: 'Shipping Miami-Haïti', badge: 'Adresse US', icon: Plane },
            { id: 'streaming' as ServiceType, label: 'Abonnements Streaming', badge: 'Netflix / HBO', icon: PlayCircle },
            { id: 'planification-evenement' as ServiceType, label: 'Event & Matériel', badge: 'Sono & Déco', icon: CalendarDays },
            { id: 'zelle-carte' as ServiceType, label: 'Zelle & Carte Virtuelle', badge: 'Fintech', icon: CreditCard },
          ].map((tab) => {
            const isActive = selectedService === tab.id;
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSelectedService(tab.id);
                  setSubmitted(false);
                }}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#185FA5] text-white shadow-md'
                    : 'text-slate-700 hover:text-[#0A2A4D] hover:bg-white/60'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold uppercase ${
                    isActive ? 'bg-white/20 text-white' : 'bg-orange-100 text-[#D85A30]'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <SectionDarkDivider label="Configuration de la Commande" />

      {/* Main Order Form Container */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto">
        {submitted ? (
          /* Order Confirmation Card */
          <div className="p-8 sm:p-12 text-center space-y-6 bg-emerald-50/50">
            <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#0A2A4D]">
                Commande Enregistrée avec Succès !
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Votre demande a été intégrée dans notre système. Notre équipe administrative est prête à finaliser votre transaction.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-emerald-300 max-w-md mx-auto shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-bold uppercase">Numéro de Commande :</span>
              <div className="flex items-center justify-center space-x-2 font-mono font-black text-xl text-[#0A2A4D]">
                <span>{orderRef}</span>
                <button
                  type="button"
                  onClick={copyRefToClipboard}
                  className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                  title="Copier"
                >
                  {copiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href={handleGenerateWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Envoyer ma Commande sur WhatsApp Direct</span>
              </a>
              <button
                type="button"
                onClick={() => setIsAccountModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-[#0A2A4D] hover:bg-[#185FA5] text-white font-bold text-xs transition"
              >
                Voir dans Mon Compte
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitForm} className="p-6 sm:p-10 space-y-8">
            {/* SERVICE SPECIFIC CONFIGURATION */}

            {/* TAB 1: ACHAT SANS CARTE */}
            {selectedService === 'achat-sans-carte' && (
              <div className="space-y-5 p-5 sm:p-6 rounded-2xl bg-blue-50/60 border border-blue-200">
                <div className="flex items-center justify-between border-b border-blue-200 pb-3">
                  <div>
                    <h3 className="font-black text-base text-[#0A2A4D]">Achat Sans Carte de Crédit</h3>
                    <p className="text-xs text-slate-600">
                      Amazon, Shein, eBay, AliExpress, Walmart... Vous collez votre lien, nous payons pour vous.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-black text-[#D85A30] tracking-wider block">
                      Taux de Change
                    </span>
                    <span className="text-lg font-black text-[#0A2A4D]">1 $ = 140 HTG</span>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Lien du Panier Entier ou du Produit *
                    </label>
                    <input
                      type="url"
                      required
                      value={cartUrl}
                      onChange={(e) => setCartUrl(e.target.value)}
                      placeholder="https://www.shein.com/... ou lien de votre panier Amazon / eBay"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#185FA5] outline-none"
                    />
                    <p className="text-[11px] text-slate-500 mt-1 italic">
                      💡 Vous pouvez coller le lien de votre panier complet ou le lien d'un article spécifique.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Nom de la boutique ou des articles
                      </label>
                      <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Ex: Panier Vêtements Shein (5 articles)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Montant Total Estimé du Panier ($ USD) *
                      </label>
                      <input
                        type="number"
                        required
                        step="any"
                        min="1"
                        value={estimatedPriceUSD}
                        onChange={(e) => setEstimatedPriceUSD(e.target.value)}
                        placeholder="Ex: 85.50"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-black text-sm text-[#0A2A4D]"
                      />
                    </div>
                  </div>

                  {/* Automatic Cost Calculator in USD and HTG at Rate 140 */}
                  {achatCalc && (
                    <div className="p-4 rounded-xl bg-white border-2 border-emerald-400/60 shadow-xs flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">
                          Total Calculé au Taux Polyverse (140 HTG)
                        </span>
                        <div className="flex items-baseline space-x-2 mt-0.5">
                          <span className="text-xl font-black text-[#0A2A4D]">
                            {achatCalc.totalHTG.toLocaleString()} HTG
                          </span>
                          <span className="text-xs font-bold text-slate-500">
                            (${achatCalc.totalUSD} USD)
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                        Paiement MonCash / Natcash
                      </span>
                    </div>
                  )}

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Détails & Précisions sur votre commande (Tailles, Couleurs, Quantités) *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={cartDescription}
                      onChange={(e) => setCartDescription(e.target.value)}
                      placeholder="Détaillez ici les articles : ex: Robe rouge taille M, 2 t-shirts noirs taille L..."
                      className="w-full p-3 rounded-xl border border-slate-300 bg-white outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SHIPPING MIAMI VERS HAÏTI */}
            {selectedService === 'shipping' && (
              <div className="space-y-5 p-5 sm:p-6 rounded-2xl bg-amber-50/60 border border-amber-300">
                {/* Official Shipping Address Box */}
                <div className="p-4 rounded-2xl bg-[#0A2A4D] text-white shadow-md space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase font-extrabold text-amber-300 tracking-wider flex items-center space-x-1.5">
                      <Truck className="w-4 h-4" />
                      <span>Adresse Officielle à Inscrire sur vos Colis Miami</span>
                    </span>
                    <button
                      type="button"
                      onClick={copyShippingAddress}
                      className="px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold transition flex items-center space-x-1 cursor-pointer"
                    >
                      {copiedShippingAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedShippingAddress ? 'Adresse Copiée !' : 'Copier l’adresse'}</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-white/10 font-mono text-xs sm:text-sm text-blue-100 border border-white/15 leading-relaxed">
                    <p className="font-black text-amber-300">{POLYVERSE_SHIPPING_ADDRESS.recipient}</p>
                    <p>{POLYVERSE_SHIPPING_ADDRESS.street}</p>
                    <p>{POLYVERSE_SHIPPING_ADDRESS.city}, {POLYVERSE_SHIPPING_ADDRESS.state} {POLYVERSE_SHIPPING_ADDRESS.zip}</p>
                    <p className="text-[11px] text-slate-300 mt-1 italic">
                      ⚠️ Assurez-vous de bien inscrire le matricule « PolyVerse BP-147973 » pour identifier votre colis.
                    </p>
                  </div>
                </div>

                {/* Shipping Evaluation Calculator */}
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">
                        Contenu / Nature du colis *
                      </label>
                      <input
                        type="text"
                        required
                        value={packageContent}
                        onChange={(e) => setPackageContent(e.target.value)}
                        placeholder="Ex: Vêtements, Tablette, Pièces mécaniques..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Poids estimé (Livres / lbs) *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        max="200"
                        value={weightLbs}
                        onChange={(e) => setWeightLbs(Math.max(1, parseInt(e.target.value, 10) || 1))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-black text-base text-[#0A2A4D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Ville de réception en Haïti (Livraison locale) *
                    </label>
                    <select
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800"
                    >
                      <option value="Caracol">Caracol (Campus & EKAM - 250 HTG)</option>
                      <option value="Cap-Haitien">Cap-Haïtien (350 HTG)</option>
                      <option value="Ouanaminthe">Ouanaminthe (400 HTG)</option>
                      <option value="Fort-Liberte">Fort-Liberté (350 HTG)</option>
                      <option value="Port-au-Prince">Port-au-Prince (500 HTG)</option>
                      <option value="Autre">Autre Ville en province (450 HTG)</option>
                    </select>
                  </div>

                  {/* Dynamic Shipping Price Box */}
                  <div className="p-4 rounded-xl bg-white border-2 border-amber-400 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">
                        Évaluation Automatique du Coût Shipping
                      </span>
                      <div className="flex items-baseline space-x-2 mt-0.5">
                        <span className="text-2xl font-black text-[#0A2A4D]">
                          {shippingCalc.totalHTG.toLocaleString()} HTG
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          (≈ ${shippingCalc.totalUSD} USD)
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        Base: {shippingCalc.weight} lbs × {shippingCalc.ratePerLb} HTG + Frais locaux ({shippingCalc.localFeeHTG} HTG)
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900">
                        {shippingCalc.weight <= 5 ? 'Tarif 1 à 5 lbs (750 HTG/lb)' : 'Tarif 6+ lbs (850 HTG/lb)'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ABONNEMENTS STREAMING (NETFLIX, PRIME, HBO) */}
            {selectedService === 'streaming' && (
              <div className="space-y-5 p-5 sm:p-6 rounded-2xl bg-rose-50/60 border border-rose-200">
                <div className="flex items-center justify-between border-b border-rose-200 pb-3">
                  <div>
                    <h3 className="font-black text-base text-[#0A2A4D]">Abonnements Streaming Officiels</h3>
                    <p className="text-xs text-slate-600">
                      Netflix, Amazon Prime Video et HBO Max payables en Gourdes par MonCash / Natcash.
                    </p>
                  </div>
                  <span className="text-xs font-black uppercase text-red-600 bg-red-100 px-3 py-1 rounded-full">
                    Activation Immédiate
                  </span>
                </div>

                {/* Platforms selection */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {STREAMING_PLANS.map((plan) => {
                    const isSelected = selectedStreamingPlatform === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedStreamingPlatform(plan.id as any)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer bg-white flex flex-col justify-between ${
                          isSelected
                            ? 'border-red-600 shadow-md ring-2 ring-red-200 scale-102'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-black text-sm text-slate-900">{plan.name}</span>
                            <span className="text-[9px] uppercase font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                              {plan.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">{plan.tagline}</p>
                          <div className="mt-3 text-lg font-black text-slate-900">
                            {plan.priceHTG} HTG <span className="text-[11px] text-slate-500 font-normal">/ mois (${plan.priceUSD})</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Duration & Payment instructions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Durée de l'abonnement</label>
                    <select
                      value={streamingDuration}
                      onChange={(e) => setStreamingDuration(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-bold"
                    >
                      <option value="1">1 Mois</option>
                      <option value="3">3 Mois (Recommandé)</option>
                      <option value="6">6 Mois</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Total à payer (Taux 140 HTG)
                    </label>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-300 font-black text-base text-[#0A2A4D]">
                      {streamingCalc.totalHTG.toLocaleString()} HTG (${streamingCalc.totalUSD} USD)
                    </div>
                  </div>
                </div>

                {/* MonCash / Natcash payment details */}
                <div className="p-4 rounded-xl bg-white border border-rose-300 space-y-2 text-xs">
                  <p className="font-bold text-[#0A2A4D] flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Instructions de Paiement MonCash & Natcash :</span>
                  </p>
                  <p className="text-slate-600">
                    Transférez le montant de <strong>{streamingCalc.totalHTG.toLocaleString()} HTG</strong> vers l'un de nos numéros officiels :
                  </p>
                  <div className="flex flex-wrap gap-3 font-mono font-bold text-xs">
                    <span className="bg-red-50 text-red-700 px-3 py-1 rounded-lg border border-red-200">
                      MonCash : +509 4161-3156
                    </span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-200">
                      Natcash : +509 4821-8284
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic mt-1">
                    Après le paiement, vous enverrez la capture d'écran sur WhatsApp pour recevoir vos identifiants de connexion immédiatement.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: EVENT PLANNING & LOCATION DE MATÉRIEL */}
            {selectedService === 'planification-evenement' && (
              <div className="space-y-5 p-5 sm:p-6 rounded-2xl bg-purple-50/60 border border-purple-200">
                <div className="flex items-center justify-between border-b border-purple-200 pb-3">
                  <div>
                    <h3 className="font-black text-base text-[#0A2A4D]">Planification d'Événements & Location</h3>
                    <p className="text-xs text-slate-600">
                      Mariages, anniversaires, fiançailles, baptêmes, conférences & location de sono, éclairage, mobilier.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Type d'Événement *</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold"
                    >
                      <option value="Mariage">Mariage</option>
                      <option value="Anniversaire">Anniversaire</option>
                      <option value="Fiançailles">Fiançailles</option>
                      <option value="Conférence / Séminaire">Conférence / Séminaire</option>
                      <option value="Graduation / Gala">Graduation / Gala</option>
                      <option value="Autre Célébration">Autre Célébration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Date Prévue *</label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                {/* Equipment Checkboxes */}
                <div className="space-y-2 text-xs">
                  <label className="block font-bold text-slate-700">
                    Matériel & Équipements à louer (Sélectionnez ceux dont vous avez besoin) :
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      'Sonorisation complète (Enceintes & Table de mixage)',
                      'Microphones sans fil professionnels',
                      'Éclairage LED & Jeux de lumière festifs',
                      'Vidéoprojecteur & Écran géant HD',
                      'Podium & Estrade',
                      'Chaises élégantes & Tables avec nappes',
                      'Arche décorative & Décoration florale',
                    ].map((eq) => {
                      const isChecked = selectedEquipments.includes(eq);
                      return (
                        <div
                          key={eq}
                          onClick={() => toggleEquipment(eq)}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center space-x-2 ${
                            isChecked
                              ? 'bg-white border-purple-600 font-bold text-purple-900 shadow-2xs'
                              : 'bg-white/60 border-slate-200 text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
                          />
                          <span>{eq}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Précisions sur le lieu et vos attentes
                  </label>
                  <textarea
                    rows={2}
                    value={eventNotes}
                    onChange={(e) => setEventNotes(e.target.value)}
                    placeholder="Ex: Événement prévu pour environ 120 personnes à Cap-Haïtien..."
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs outline-none"
                  />
                </div>
              </div>
            )}

            {/* TAB 5: ZELLE & CARTE VIRTUELLE */}
            {selectedService === 'zelle-carte' && (
              <div className="space-y-5 p-5 sm:p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFinanceOption('zelle-moncash')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                      financeOption === 'zelle-moncash'
                        ? 'bg-[#0A2A4D] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    Zelle vers MonCash / Natcash
                  </button>
                  <button
                    type="button"
                    onClick={() => setFinanceOption('carte-virtuelle')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                      financeOption === 'carte-virtuelle'
                        ? 'bg-[#0A2A4D] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    Création Carte Virtuelle
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Montant ($ USD) *</label>
                    <input
                      type="number"
                      required
                      min="10"
                      value={zelleAmountUSD}
                      onChange={(e) => setZelleAmountUSD(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-black text-sm"
                    />
                    <span className="text-[11px] font-bold text-[#D85A30] mt-1 block">
                      ≈ {(Number(zelleAmountUSD) * POLYVERSE_EXCHANGE_RATE).toLocaleString()} HTG (Taux 140)
                    </span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {financeOption === 'zelle-moncash' ? 'Numéro de réception MonCash/Natcash *' : 'Nom du titulaire sur la carte *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={cardHolderName}
                      onChange={(e) => setCardHolderName(e.target.value)}
                      placeholder={financeOption === 'zelle-moncash' ? '+509 37XX-XXXX' : 'Ex: Jean-Baptiste Moïse'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* COMMON STEP: COORDONNÉES DU CLIENT */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-black text-sm uppercase tracking-wide text-[#0A2A4D] flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#D85A30]" />
                <span>Vos Coordonnées pour la Livraison & Suivi de Commande</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Votre Nom Complet *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: Marie-Claire Joseph"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Numéro Téléphone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+509 37XX-XXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Adresse E-mail</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="email@exemple.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Adresse de Livraison en Haïti *</label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Ex: Village EKAM Caracol, Cap-Haïtien..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#0A2A4D] hover:bg-[#185FA5] text-white font-extrabold text-sm sm:text-base shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Confirmer la Commande & Générer Mon Reçu</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
