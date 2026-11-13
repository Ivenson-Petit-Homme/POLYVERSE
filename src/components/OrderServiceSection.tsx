import React, { useState, useEffect } from 'react';
import {
  POLYVERSE_INFO,
  POLYVERSE_EXCHANGE_RATE,
  POLYVERSE_SHIPPING_ADDRESS,
  STREAMING_PLANS,
} from '../data/polyverseData';
import shippingLogisticsImg from '../assets/images/shipping_logistics_bg_1789429529421.jpg';
import {
  ShoppingBag,
  Plane,
  CalendarDays,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Truck,
  Copy,
  Check,
  PlayCircle,
  CreditCard,
  MapPin,
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
  const [destinationCity, setDestinationCity] = useState<
    'Caracol' | 'Cap-Haitien' | 'Ouanaminthe' | 'Fort-Liberte' | 'Port-au-Prince' | 'Autre'
  >('Caracol');
  const [copiedShippingAddress, setCopiedShippingAddress] = useState(false);

  // 3. STREAMING
  const [selectedStreamingPlatform, setSelectedStreamingPlatform] = useState<'netflix' | 'prime' | 'hbo'>('netflix');
  const [streamingDuration, setStreamingDuration] = useState<'1' | '3' | '6'>('1');
  const [paymentScreenshotName, setPaymentScreenshotName] = useState('');

  // 4. EVENT PLANNING & LOCATION
  const [eventType, setEventType] = useState('Mariage');
  const [eventDate, setEventDate] = useState('');
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([
    'Sonorisation complète (Enceintes & Table de mixage)',
    'Microphones sans fil professionnels',
  ]);
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

  const cityDeliveryFees: Record<string, number> = {
    Caracol: 250,
    'Cap-Haitien': 350,
    Ouanaminthe: 400,
    'Fort-Liberte': 350,
    'Port-au-Prince': 500,
    Autre: 450,
  };

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

  const calculateAchatSansCarteCost = () => {
    const price = parseFloat(estimatedPriceUSD);
    if (isNaN(price) || price <= 0) return null;
    const totalUSD = price;
    const totalHTG = Math.round(totalUSD * POLYVERSE_EXCHANGE_RATE);
    return { totalUSD, totalHTG };
  };

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
      msg += `*Service :* Achat Sans Carte (Taux 140 HTG)\n`;
      if (cartUrl) msg += `*Lien du Panier / Produit :* ${cartUrl}\n`;
      if (productName) msg += `*Article / Boutique :* ${productName}\n`;
      if (achatCalc) {
        msg += `*Montant Total Estimé :* $${achatCalc.totalUSD} USD (≈ ${achatCalc.totalHTG.toLocaleString()} HTG)\n`;
      }
      if (cartDescription) msg += `*Détails des articles :* ${cartDescription}\n`;
    } else if (selectedService === 'shipping') {
      msg += `*Service :* Shipping Miami vers Haïti\n`;
      msg += `*Adresse Miami :* ${POLYVERSE_SHIPPING_ADDRESS.fullString}\n`;
      msg += `*Contenu du Colis :* ${packageContent || 'Non précisé'}\n`;
      msg += `*Poids :* ${shippingCalc.weight} lbs (Tarif : ${shippingCalc.ratePerLb} HTG/lb)\n`;
      msg += `*Destination :* ${destinationCity} (Livraison locale : ${shippingCalc.localFeeHTG} HTG)\n`;
      msg += `*Total Estimé :* ${shippingCalc.totalHTG.toLocaleString()} HTG (≈ $${shippingCalc.totalUSD} USD)\n`;
    } else if (selectedService === 'streaming') {
      msg += `*Service :* Abonnement Streaming ${streamingCalc.plan.name}\n`;
      msg += `*Plateforme :* ${streamingCalc.plan.name} (${streamingCalc.months} Mois)\n`;
      msg += `*Montant à Payer :* ${streamingCalc.totalHTG.toLocaleString()} HTG (ou $${streamingCalc.totalUSD} USD)\n`;
      msg += `*Preuve de Paiement :* ${
        paymentScreenshotName ? `Reçu prêt : ${paymentScreenshotName}` : 'Capture envoyée en pièce jointe ci-après'
      }\n`;
    } else if (selectedService === 'planification-evenement') {
      msg += `*Service :* Planification d'Événement & Location de Matériel\n`;
      msg += `*Type d'événement :* ${eventType}\n`;
      if (eventDate) msg += `*Date prévue :* ${eventDate}\n`;
      msg += `*Matériel souhaité :* ${selectedEquipments.join(', ')}\n`;
      if (eventNotes) msg += `*Précisions :* ${eventNotes}\n`;
    } else if (selectedService === 'zelle-carte') {
      msg += `*Service :* ${
        financeOption === 'zelle-moncash' ? 'Zelle vers MonCash / Natcash' : 'Création Carte Virtuelle Visa/Mastercard'
      }\n`;
      msg += `*Montant :* $${zelleAmountUSD} USD (≈ ${(Number(zelleAmountUSD) * POLYVERSE_EXCHANGE_RATE).toLocaleString()} HTG)\n`;
      if (cardHolderName) {
        msg += `*${financeOption === 'zelle-moncash' ? 'Numéro de réception' : 'Nom Titulaire Carte'} :* ${cardHolderName}\n`;
      }
    }

    msg += `----------------------------------------\n`;
    msg += `*Client :* ${clientName || currentUser?.name || 'Client Polyverse'}\n`;
    msg += `*Téléphone :* ${clientPhone || currentUser?.phone || 'À préciser'}\n`;
    if (clientEmail || currentUser?.email) msg += `*E-mail :* ${clientEmail || currentUser?.email}\n`;
    msg += `*Adresse Haïti :* ${deliveryAddress || currentUser?.address || 'À préciser'}\n`;
    if (refToUse) msg += `*Référence Dossier :* ${refToUse}\n`;

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
      finalUSD = achatCalc ? achatCalc.totalUSD : parseFloat(estimatedPriceUSD) || 0;
      finalHTG = finalUSD * POLYVERSE_EXCHANGE_RATE;
      orderNotes = `Panier/Produit : ${cartUrl} - Détails : ${cartDescription}`;
    } else if (selectedService === 'shipping') {
      finalHTG = shippingCalc.totalHTG;
      finalUSD = shippingCalc.totalUSD;
      orderNotes = `Colis : ${packageContent} (${shippingCalc.weight} lbs) vers ${destinationCity}`;
    } else if (selectedService === 'streaming') {
      finalHTG = streamingCalc.totalHTG;
      finalUSD = streamingCalc.totalUSD;
      orderNotes = `Abonnement ${streamingCalc.plan.name} (${streamingCalc.months} Mois) - Capture : ${
        paymentScreenshotName || 'Prête'
      }`;
    } else if (selectedService === 'planification-evenement') {
      finalUSD = 100;
      finalHTG = 14000;
      orderNotes = `Événement ${eventType} le ${eventDate || 'À fixer'} - Matériel : ${selectedEquipments.join(', ')}`;
    } else if (selectedService === 'zelle-carte') {
      finalUSD = parseFloat(zelleAmountUSD) || 50;
      finalHTG = finalUSD * POLYVERSE_EXCHANGE_RATE;
      orderNotes = `Service : ${financeOption} - Titulaire/Réception : ${cardHolderName}`;
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
    <div className="bg-white text-[#141414]">
      {/* 1. FULL-BLEED EDITORIAL HERO (WWF.FR STYLE) */}
      <section className="relative bg-[#08101C] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={shippingLogisticsImg}
            alt="Services Achat Sans Carte, Shipping Miami-Haïti, Streaming et Événementiel Polyverse"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08101C]/95 via-[#0A2A4D]/85 to-[#08101C]/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E87048] block">
              Guichet Direct · Tarifs Officiels Polyverse
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-[60px] font-bold uppercase leading-[1.0] text-white"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Achat Sans Carte, Shipping &amp; Services
            </h1>
            <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl">
              Profitez de notre taux officiel garanti à{' '}
              <strong className="text-white font-tabular">1 USD = 140 HTG</strong>, de notre adresse de réception à Miami (
              <span className="font-mono text-amber-300">PolyVerse BP-147973</span>), de nos abonnements streaming et de la gestion complète de vos événements.
            </p>

            {/* Unboxed Key Specifications */}
            <div className="pt-4 border-t border-white/15 flex flex-wrap gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-wider text-stone-300">
              <span>Taux Officiel : 1 $ = 140 HTG</span>
              <span className="text-stone-500">·</span>
              <span>Shipping : 750 à 850 HTG / lb</span>
              <span className="text-stone-500">·</span>
              <span>Netflix / Prime / HBO</span>
              <span className="text-stone-500">·</span>
              <span>Zelle &amp; Événementiel</span>
            </div>
          </div>
        </div>

        {/* Bottom 5-Service Architectural Switcher Bar */}
        <div className="relative z-10 bg-[#F4F3EF] border-t border-b border-stone-200 text-[#141414]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
            {[
              { id: 'achat-sans-carte' as ServiceType, label: 'Achat Sans Carte', sub: 'Taux 140 HTG', icon: ShoppingBag },
              { id: 'shipping' as ServiceType, label: 'Shipping Miami-Haïti', sub: 'Adresse US Directe', icon: Plane },
              { id: 'streaming' as ServiceType, label: 'Streaming Officiel', sub: 'Netflix · Prime · HBO', icon: PlayCircle },
              { id: 'planification-evenement' as ServiceType, label: 'Événements & Matériel', sub: 'Organisation & Sono', icon: CalendarDays },
              { id: 'zelle-carte' as ServiceType, label: 'Zelle & Carte Virtuelle', sub: 'Transfert Fintech', icon: CreditCard },
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
                  className={`p-4 sm:p-5 text-left transition-colors cursor-pointer flex items-center space-x-3 ${
                    isActive ? 'bg-[#0A2A4D] text-white' : 'bg-white hover:bg-[#F4F3EF] text-[#141414]'
                  }`}
                >
                  <IconComp className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#E87048]' : 'text-[#185FA5]'}`} />
                  <div className="min-w-0">
                    <span
                      className="text-sm sm:text-base font-bold uppercase tracking-wide block truncate"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {tab.label}
                    </span>
                    <span className={`text-[11px] block truncate ${isActive ? 'text-stone-300' : 'text-stone-500'}`}>
                      {tab.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. MAIN ORDER WORKSPACE (WARM STONE BAND) */}
      <section className="bg-[#F4F3EF] py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-stone-200">
            {submitted ? (
              /* Confirmation Card */
              <div className="p-8 sm:p-14 text-center space-y-6 bg-white">
                <div className="w-14 h-14 bg-emerald-700 text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-2 max-w-lg mx-auto">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 block">
                    Dossier Validé
                  </span>
                  <h2
                    className="text-3xl font-bold uppercase text-[#141414]"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Commande Enregistrée avec Succès
                  </h2>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Votre demande a été enregistrée dans votre espace client. Transmettez votre référence sur WhatsApp pour une prise en charge immédiate.
                  </p>
                </div>

                <div className="p-5 bg-[#F4F3EF] border border-stone-200 max-w-md mx-auto space-y-2">
                  <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider block">
                    Référence de Commande
                  </span>
                  <div className="flex items-center justify-center space-x-3 font-mono font-bold text-2xl text-[#0A2A4D]">
                    <span>{orderRef}</span>
                    <button
                      type="button"
                      onClick={copyRefToClipboard}
                      className="p-1.5 border border-stone-300 bg-white text-stone-600 hover:text-[#141414] cursor-pointer"
                      title="Copier la référence"
                    >
                      {copiedRef ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href={handleGenerateWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase tracking-wider text-sm flex items-center justify-center space-x-2 transition-colors"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Envoyer sur WhatsApp Direct</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsAccountModalOpen(true)}
                    className="px-6 py-4 bg-[#0A2A4D] hover:bg-[#185FA5] text-white font-bold uppercase tracking-wider text-sm transition-colors cursor-pointer"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Consulter Mon Compte
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitForm}>
                {/* FORM SECTION 1: SERVICE CONFIGURATION */}
                <div className="p-6 sm:p-10 space-y-8">
                  {/* TAB 1: ACHAT SANS CARTE */}
                  {selectedService === 'achat-sans-carte' && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200 pb-5 gap-4">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#D85A30] block">
                            Étape 1 · Détails du Panier
                          </span>
                          <h2
                            className="text-2xl sm:text-3xl font-bold uppercase text-[#141414] mt-1"
                            style={{ fontFamily: "'Oswald', sans-serif" }}
                          >
                            Achat Sans Carte Bancaire
                          </h2>
                          <p className="text-sm text-stone-600 mt-1">
                            Amazon, Shein, eBay, AliExpress, Walmart — collez le lien complet de votre panier ou de votre article et détaillez vos choix ci-dessous.
                          </p>
                        </div>
                        <div className="bg-[#F4F3EF] border border-stone-200 px-4 py-2.5 shrink-0">
                          <span className="text-[10px] uppercase font-bold text-[#D85A30] tracking-wider block">
                            Taux Officiel Polyverse
                          </span>
                          <span className="text-lg font-bold font-tabular text-[#0A2A4D]">1 USD = 140 HTG</span>
                        </div>
                      </div>

                      <div className="space-y-5 text-sm">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                            Lien du Panier Complet ou de l’Article *
                          </label>
                          <input
                            type="url"
                            required
                            value={cartUrl}
                            onChange={(e) => setCartUrl(e.target.value)}
                            placeholder="https://www.shein.com/... ou lien de votre panier Amazon / eBay"
                            className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none text-sm"
                          />
                          <p className="text-xs text-stone-500 mt-1.5">
                            Vous pouvez coller directement le lien partagé de votre panier entier et préciser chaque article dans la description.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                              Boutique ou Intitulé de la Commande
                            </label>
                            <input
                              type="text"
                              value={productName}
                              onChange={(e) => setProductName(e.target.value)}
                              placeholder="Ex: Panier Shein (5 articles)"
                              className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                              Montant Total du Panier ($ USD) *
                            </label>
                            <input
                              type="number"
                              required
                              step="any"
                              min="1"
                              value={estimatedPriceUSD}
                              onChange={(e) => setEstimatedPriceUSD(e.target.value)}
                              placeholder="Ex: 85.50"
                              className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none font-bold font-tabular text-base text-[#0A2A4D]"
                            />
                          </div>
                        </div>

                        {/* Automatic Dual Currency Total Display (USD & HTG at 140) */}
                        {achatCalc && (
                          <div className="p-5 bg-[#0A2A4D] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <span className="text-[11px] uppercase font-bold tracking-wider text-[#E87048] block">
                                Estimation Automatique (Taux 1 USD = 140 HTG)
                              </span>
                              <div className="flex items-baseline space-x-3 mt-1">
                                <span className="text-2xl sm:text-3xl font-bold font-tabular">
                                  {achatCalc.totalHTG.toLocaleString()} HTG
                                </span>
                                <span className="text-sm font-tabular text-stone-300">
                                  (${achatCalc.totalUSD.toFixed(2)} USD)
                                </span>
                              </div>
                            </div>
                            <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 border border-white/20 px-3 py-2">
                              Règlement MonCash / Natcash
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                            Détails &amp; Précisions (Tailles, Couleurs, Quantités) *
                          </label>
                          <textarea
                            required
                            rows={3}
                            value={cartDescription}
                            onChange={(e) => setCartDescription(e.target.value)}
                            placeholder="Détaillez chaque article de votre panier : ex. 1 robe rouge taille M, 2 t-shirts noirs taille L..."
                            className="w-full p-4 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: SHIPPING MIAMI VERS HAÏTI */}
                  {selectedService === 'shipping' && (
                    <div className="space-y-6">
                      <div className="border-b border-stone-200 pb-5">
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#D85A30] block">
                          Étape 1 · Expédition Miami — Haïti
                        </span>
                        <h2
                          className="text-2xl sm:text-3xl font-bold uppercase text-[#141414] mt-1"
                          style={{ fontFamily: "'Oswald', sans-serif" }}
                        >
                          Shipping &amp; Fret Aérien vers Haïti
                        </h2>
                        <p className="text-sm text-stone-600 mt-1">
                          Utilisez notre adresse officielle de Miami pour recevoir vos colis et estimez automatiquement vos frais d’expédition.
                        </p>
                      </div>

                      {/* Official Miami Address Card */}
                      <div className="p-6 bg-[#0A2A4D] text-white space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-3">
                          <span className="text-xs uppercase font-bold tracking-wider text-[#E87048] flex items-center space-x-2">
                            <Truck className="w-4 h-4" />
                            <span>Adresse Officielle de Réception à Miami</span>
                          </span>
                          <button
                            type="button"
                            onClick={copyShippingAddress}
                            className="px-4 py-2 bg-[#D85A30] hover:bg-[#b84722] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
                          >
                            {copiedShippingAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedShippingAddress ? 'Adresse Copiée' : 'Copier l’adresse'}</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-sm">
                          <div className="bg-white/10 p-3 border border-white/10">
                            <span className="text-[10px] uppercase text-stone-400 block">Nom / Matricule</span>
                            <span className="font-bold text-amber-300">{POLYVERSE_SHIPPING_ADDRESS.recipient}</span>
                          </div>
                          <div className="bg-white/10 p-3 border border-white/10">
                            <span className="text-[10px] uppercase text-stone-400 block">Rue</span>
                            <span className="font-bold text-white">{POLYVERSE_SHIPPING_ADDRESS.street}</span>
                          </div>
                          <div className="bg-white/10 p-3 border border-white/10">
                            <span className="text-[10px] uppercase text-stone-400 block">Ville / État / Code Postal</span>
                            <span className="font-bold text-white">
                              {POLYVERSE_SHIPPING_ADDRESS.city}, {POLYVERSE_SHIPPING_ADDRESS.state}{' '}
                              {POLYVERSE_SHIPPING_ADDRESS.zip}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-stone-300">
                          Veillez à inscrire impérativement la mention « {POLYVERSE_SHIPPING_ADDRESS.recipient} » sur l’étiquette d’expédition pour identifier votre colis dès son arrivée.
                        </p>
                      </div>

                      {/* Shipping Evaluator */}
                      <div className="space-y-5 text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                              Nature / Contenu du Colis *
                            </label>
                            <input
                              type="text"
                              required
                              value={packageContent}
                              onChange={(e) => setPackageContent(e.target.value)}
                              placeholder="Ex: Vêtements, Électronique, Accessoires..."
                              className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                              Poids Estimé (lbs) *
                            </label>
                            <input
                              type="number"
                              required
                              min="1"
                              max="200"
                              value={weightLbs}
                              onChange={(e) => setWeightLbs(Math.max(1, parseInt(e.target.value, 10) || 1))}
                              className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none font-bold font-tabular text-base text-[#0A2A4D]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                            Ville de Réception en Haïti (Livraison Locale) *
                          </label>
                          <select
                            value={destinationCity}
                            onChange={(e) => setDestinationCity(e.target.value as any)}
                            className="w-full px-4 py-3 border border-stone-300 bg-white font-semibold text-stone-800 focus:border-[#0A2A4D] outline-none text-sm"
                          >
                            <option value="Caracol">Caracol (Campus &amp; EKAM — 250 HTG)</option>
                            <option value="Cap-Haitien">Cap-Haïtien (350 HTG)</option>
                            <option value="Ouanaminthe">Ouanaminthe (400 HTG)</option>
                            <option value="Fort-Liberte">Fort-Liberté (350 HTG)</option>
                            <option value="Port-au-Prince">Port-au-Prince (500 HTG)</option>
                            <option value="Autre">Autre ville en province (450 HTG)</option>
                          </select>
                        </div>

                        {/* Result Summary */}
                        <div className="p-5 bg-[#F4F3EF] border border-stone-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <span className="text-[11px] uppercase font-bold tracking-wider text-stone-500 block">
                              Évaluation Automatique du Shipping
                            </span>
                            <div className="flex items-baseline space-x-3 mt-1">
                              <span className="text-2xl sm:text-3xl font-bold font-tabular text-[#0A2A4D]">
                                {shippingCalc.totalHTG.toLocaleString()} HTG
                              </span>
                              <span className="text-sm font-tabular text-stone-600">
                                (≈ ${shippingCalc.totalUSD} USD)
                              </span>
                            </div>
                            <span className="text-xs text-stone-600 block mt-1 font-tabular">
                              Base : {shippingCalc.weight} lbs × {shippingCalc.ratePerLb} HTG/lb + Livraison locale (
                              {shippingCalc.localFeeHTG} HTG)
                            </span>
                          </div>

                          <div className="border border-stone-300 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#141414]">
                            {shippingCalc.weight <= 5
                              ? 'Palier 1 à 5 lbs (750 HTG/lb)'
                              : 'Palier 6 lbs et plus (850 HTG/lb)'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: ABONNEMENTS STREAMING */}
                  {selectedService === 'streaming' && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200 pb-5 gap-4">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#D85A30] block">
                            Étape 1 · Divertissement Numérique
                          </span>
                          <h2
                            className="text-2xl sm:text-3xl font-bold uppercase text-[#141414] mt-1"
                            style={{ fontFamily: "'Oswald', sans-serif" }}
                          >
                            Abonnements Streaming Officiels
                          </h2>
                          <p className="text-sm text-stone-600 mt-1">
                            Réglez votre plan Netflix, Amazon Prime Video ou HBO Max en Gourdes puis transmettez votre capture d’écran pour activation immédiate.
                          </p>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 border border-emerald-300 bg-emerald-50 px-3 py-1.5 self-start sm:self-auto">
                          Activation Rapide
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {STREAMING_PLANS.map((plan) => {
                          const isSelected = selectedStreamingPlatform === plan.id;
                          return (
                            <button
                              key={plan.id}
                              type="button"
                              onClick={() => setSelectedStreamingPlatform(plan.id as any)}
                              className={`p-5 border text-left transition-colors cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-[#0A2A4D] text-white border-[#0A2A4D]'
                                  : 'bg-[#F4F3EF] text-[#141414] border-stone-200 hover:border-stone-400'
                              }`}
                            >
                              <div>
                                <span
                                  className={`text-[10px] uppercase font-bold tracking-wider block ${
                                    isSelected ? 'text-[#E87048]' : 'text-[#D85A30]'
                                  }`}
                                >
                                  {plan.badge}
                                </span>
                                <h3
                                  className="text-xl font-bold uppercase mt-1"
                                  style={{ fontFamily: "'Oswald', sans-serif" }}
                                >
                                  {plan.name}
                                </h3>
                                <p className={`text-xs mt-1 ${isSelected ? 'text-stone-300' : 'text-stone-600'}`}>
                                  {plan.tagline}
                                </p>
                              </div>
                              <div className="mt-4 pt-3 border-t border-stone-300/20 font-tabular">
                                <span className="text-xl font-bold">{plan.priceHTG.toLocaleString()} HTG</span>
                                <span className={`text-xs ml-1.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                                  / mois (${plan.priceUSD})
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                            Durée d’Abonnement
                          </label>
                          <select
                            value={streamingDuration}
                            onChange={(e) => setStreamingDuration(e.target.value as any)}
                            className="w-full px-4 py-3 border border-stone-300 bg-white font-semibold focus:border-[#0A2A4D] outline-none"
                          >
                            <option value="1">1 Mois</option>
                            <option value="3">3 Mois (Recommandé)</option>
                            <option value="6">6 Mois</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                            Total à Régler (Taux 140 HTG)
                          </label>
                          <div className="px-4 py-3 bg-[#F4F3EF] border border-stone-300 font-bold font-tabular text-base text-[#0A2A4D]">
                            {streamingCalc.totalHTG.toLocaleString()} HTG (${streamingCalc.totalUSD} USD)
                          </div>
                        </div>
                      </div>

                      {/* Capture / Proof Upload Field + Payment Numbers */}
                      <div className="p-6 bg-[#F4F3EF] border border-stone-300 space-y-4">
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A2A4D]">
                            Instructions de Paiement &amp; Capture d’Écran
                          </h4>
                          <p className="text-xs text-stone-600">
                            Effectuez votre transfert de{' '}
                            <strong className="font-tabular text-[#141414]">
                              {streamingCalc.totalHTG.toLocaleString()} HTG
                            </strong>{' '}
                            sur l’un de nos comptes officiels puis sélectionnez ou mentionnez votre capture d’écran :
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs font-bold">
                          <div className="bg-white border border-stone-300 px-4 py-2.5 text-[#141414]">
                            MonCash : {POLYVERSE_INFO.whatsappDisplay}
                          </div>
                          <div className="bg-white border border-stone-300 px-4 py-2.5 text-[#141414]">
                            Natcash : {POLYVERSE_INFO.secondaryPhoneDisplay}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                            Joindre / Référencer votre Capture de Paiement (Facultatif)
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              setPaymentScreenshotName(file ? file.name : '');
                            }}
                            className="w-full px-4 py-2.5 border border-stone-300 bg-white text-xs text-stone-700 file:mr-4 file:py-1.5 file:px-3 file:border-0 file:bg-[#0A2A4D] file:text-white file:text-xs file:font-bold file:uppercase"
                          />
                          {paymentScreenshotName && (
                            <p className="text-xs text-emerald-700 font-semibold mt-1">
                              Fichier sélectionné : {paymentScreenshotName} (pensez aussi à joindre l’image dans la conversation WhatsApp).
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: EVENT PLANNING & LOCATION DE MATÉRIEL */}
                  {selectedService === 'planification-evenement' && (
                    <div className="space-y-6">
                      <div className="border-b border-stone-200 pb-5">
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#D85A30] block">
                          Étape 1 · Événementiel &amp; Logistique
                        </span>
                        <h2
                          className="text-2xl sm:text-3xl font-bold uppercase text-[#141414] mt-1"
                          style={{ fontFamily: "'Oswald', sans-serif" }}
                        >
                          Planification d’Événements &amp; Location de Matériel
                        </h2>
                        <p className="text-sm text-stone-600 mt-1">
                          Mariages, anniversaires, fiançailles, conférences et galas — réservez notre équipe et nos équipements audiovisuels et de réception.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                            Type d’Événement *
                          </label>
                          <select
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                            className="w-full px-4 py-3 border border-stone-300 bg-white font-semibold focus:border-[#0A2A4D] outline-none"
                          >
                            <option value="Mariage">Mariage</option>
                            <option value="Anniversaire">Anniversaire</option>
                            <option value="Fiançailles">Fiançailles</option>
                            <option value="Conférence / Séminaire">Conférence / Séminaire</option>
                            <option value="Graduation / Gala">Remise de Diplôme / Gala</option>
                            <option value="Autre Célébration">Autre Célébration</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                            Date Prévue *
                          </label>
                          <input
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                          Matériel &amp; Équipements à Louer :
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
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
                                className={`p-3.5 border transition-colors cursor-pointer flex items-center space-x-3 ${
                                  isChecked
                                    ? 'bg-[#0A2A4D] text-white border-[#0A2A4D] font-bold'
                                    : 'bg-[#F4F3EF] border-stone-200 text-stone-700 hover:border-stone-400'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {}}
                                  className="h-4 w-4 accent-[#D85A30] cursor-pointer"
                                />
                                <span>{eq}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Précisions sur le Lieu et Vos Attentes
                        </label>
                        <textarea
                          rows={2}
                          value={eventNotes}
                          onChange={(e) => setEventNotes(e.target.value)}
                          placeholder="Ex : Événement prévu pour environ 120 personnes au Cap-Haïtien..."
                          className="w-full p-4 border border-stone-300 bg-white text-sm focus:border-[#0A2A4D] outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* TAB 5: ZELLE & CARTE VIRTUELLE */}
                  {selectedService === 'zelle-carte' && (
                    <div className="space-y-6">
                      <div className="border-b border-stone-200 pb-5">
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#D85A30] block">
                          Étape 1 · Services Financiers
                        </span>
                        <h2
                          className="text-2xl sm:text-3xl font-bold uppercase text-[#141414] mt-1"
                          style={{ fontFamily: "'Oswald', sans-serif" }}
                        >
                          Zelle vers MonCash/Natcash &amp; Cartes Virtuelles
                        </h2>
                        <p className="text-sm text-stone-600 mt-1">
                          Convertissez vos fonds Zelle en Gourdes ou demandez la création de votre carte virtuelle internationale Visa / Mastercard.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 border border-stone-300">
                        <button
                          type="button"
                          onClick={() => setFinanceOption('zelle-moncash')}
                          className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                            financeOption === 'zelle-moncash'
                              ? 'bg-[#0A2A4D] text-white'
                              : 'bg-[#F4F3EF] text-stone-700 hover:bg-white'
                          }`}
                        >
                          Zelle vers MonCash / Natcash
                        </button>
                        <button
                          type="button"
                          onClick={() => setFinanceOption('carte-virtuelle')}
                          className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                            financeOption === 'carte-virtuelle'
                              ? 'bg-[#0A2A4D] text-white'
                              : 'bg-[#F4F3EF] text-stone-700 hover:bg-white'
                          }`}
                        >
                          Création Carte Virtuelle
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                            Montant ($ USD) *
                          </label>
                          <input
                            type="number"
                            required
                            min="10"
                            value={zelleAmountUSD}
                            onChange={(e) => setZelleAmountUSD(e.target.value)}
                            className="w-full px-4 py-3 border border-stone-300 bg-white font-bold font-tabular text-base text-[#0A2A4D] focus:border-[#0A2A4D] outline-none"
                          />
                          <span className="text-xs font-bold font-tabular text-[#D85A30] mt-1.5 block">
                            ≈ {(Number(zelleAmountUSD) * POLYVERSE_EXCHANGE_RATE).toLocaleString()} HTG (Taux 140)
                          </span>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                            {financeOption === 'zelle-moncash'
                              ? 'Numéro de Réception MonCash / Natcash *'
                              : 'Nom du Titulaire sur la Carte *'}
                          </label>
                          <input
                            type="text"
                            required
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value)}
                            placeholder={financeOption === 'zelle-moncash' ? '+509 37XX-XXXX' : 'Ex : Jean-Baptiste Moïse'}
                            className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* FORM SECTION 2: CLIENT DETAILS (SUBTLE CONTRAST BAND) */}
                <div className="p-6 sm:p-10 bg-[#FAF9F6] border-t border-stone-200 space-y-6">
                  <div className="flex items-center space-x-2.5 border-b border-stone-200 pb-3">
                    <MapPin className="w-5 h-5 text-[#D85A30]" />
                    <h3
                      className="text-xl font-bold uppercase text-[#141414]"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      Étape 2 · Vos Coordonnées de Livraison &amp; Suivi
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Votre Nom Complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Ex : Marie-Claire Joseph"
                        className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Numéro Téléphone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+509 37XX-XXXX"
                        className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Adresse E-mail
                      </label>
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="email@exemple.com"
                        className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Adresse de Livraison en Haïti *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Ex : Village EKAM Caracol, Cap-Haïtien..."
                        className="w-full px-4 py-3 border border-stone-300 bg-white focus:border-[#0A2A4D] outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      className="flex-1 py-4 px-6 bg-[#D85A30] hover:bg-[#b84722] text-white font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center space-x-2"
                      style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px' }}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Confirmer la Commande &amp; Générer Mon Reçu</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={onOpenQuoteModal}
                      className="px-6 py-4 border border-[#0A2A4D] text-[#0A2A4D] hover:bg-[#0A2A4D] hover:text-white font-bold uppercase tracking-wider transition-colors cursor-pointer text-sm"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      Devis Sur Mesure
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
