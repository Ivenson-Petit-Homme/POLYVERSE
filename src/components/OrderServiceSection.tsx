import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { POLYVERSE_INFO } from '../data/polyverseData';
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
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
  const { currentUser, requireAuth, placeOrder, setIsAccountModalOpen } = useAuth();

  const [clientName, setClientName] = useState(currentUser?.name || '');
  const [clientPhone, setClientPhone] = useState(currentUser?.phone || '');
  const [clientEmail, setClientEmail] = useState(currentUser?.email || '');
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser?.address || '');

  React.useEffect(() => {
    if (currentUser) {
      if (!clientName && currentUser.name) setClientName(currentUser.name);
      if (!clientPhone && currentUser.phone) setClientPhone(currentUser.phone);
      if (!clientEmail && currentUser.email) setClientEmail(currentUser.email);
      if (!deliveryAddress && currentUser.address) setDeliveryAddress(currentUser.address);
    }
  }, [currentUser]);

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

  const handleGenerateWhatsAppLink = (customRef?: string) => {
    const serviceName = getServiceTitle(selectedService);
    const refToUse = customRef || orderRef;
    let msg = `*NOUVELLE DEMANDE DE SERVICE POLYVERSE*\n`;
    msg += `----------------------------------------\n`;
    msg += `📌 *Service:* ${serviceName}\n`;
    msg += `📦 *Nom Produit / Projet:* ${productName || 'Non précisé'}\n`;
    if (productUrl) msg += `🔗 *Lien du Site:* ${productUrl}\n`;
    msg += `🔢 *Quantité:* ${quantity}\n`;
    if (color) msg += `🎨 *Couleur:* ${color}\n`;
    if (size) msg += `📏 *Taille / Pointure:* ${size}\n`;
    if (estimatedPriceUSD) msg += `💵 *Prix estimatif:* $${estimatedPriceUSD} USD\n`;
    if (description) msg += `📝 *Description / Détails:* ${description}\n`;
    msg += `----------------------------------------\n`;
    msg += `👤 *Client:* ${clientName || currentUser?.name || 'Client Polyverse'}\n`;
    msg += `📱 *Téléphone / WhatsApp:* ${clientPhone || currentUser?.phone || 'À préciser'}\n`;
    if (clientEmail || currentUser?.email) msg += `📧 *E-mail:* ${clientEmail || currentUser?.email}\n`;
    if (deliveryAddress || currentUser?.address) msg += `📍 *Adresse de livraison:* ${deliveryAddress || currentUser?.address}\n`;
    if (refToUse) msg += `🔖 *Code Référence:* ${refToUse}\n`;

    return `https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(msg)}`;
  };

  const handleSubmitForm = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // 1. Mandatory account check for ordering services
    if (!requireAuth(() => handleSubmitForm())) {
      return;
    }

    if (!clientName.trim() || !clientPhone.trim() || !deliveryAddress.trim()) {
      alert('Tanpri ranpli tout chan obligatwa yo (Non, Nimewo Telefòn, ak Adrès).');
      return;
    }

    const calculatedTotals = handleCalculateTotal();
    const finalUSD = calculatedTotals ? calculatedTotals.totalUSD : (parseFloat(estimatedPriceUSD) || 0);
    const finalHTG = calculatedTotals ? calculatedTotals.totalHTG : Math.round(finalUSD * 150);

    // 2. Place order in database
    const savedOrder = placeOrder({
      userId: currentUser?.id || 'client',
      userEmail: clientEmail.trim() || currentUser?.email || '',
      userName: clientName.trim(),
      userPhone: clientPhone.trim(),
      userAddress: deliveryAddress.trim(),
      orderType: selectedService,
      totalUSD: finalUSD,
      totalHTG: finalHTG,
      paymentMethod: 'À convenir (MonCash / Natcash / Espèces)',
      productUrl: productUrl.trim() || undefined,
      notes: `${productName ? `Produit: ${productName} - ` : ''}${description || ''} ${size ? `[Taille: ${size}]` : ''} ${color ? `[Couleur: ${color}]` : ''}`,
    });

    setOrderRef(savedOrder.id);
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
            Pôle Finance, Logistique & Événements
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2A4D] tracking-tight">
            Achat Sans Carte, Shipping & Événements
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Pas besoin de carte de crédit internationale pour commander sur Amazon, Shein ou eBay. Nous achetons pour vous, réceptionnons vos colis et assurons une livraison rapide et sécurisée en Haïti !
          </p>
        </div>
      </ScrollReveal>

      {/* Visual Shipping & Air Logistics Hero Showcase */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0A2A4D] shadow-2xl border border-slate-700/80 min-h-[220px] flex items-center p-6 sm:p-10">
        <div className="absolute inset-0 z-0">
          <img
            src={shippingLogisticsImg}
            alt="Shipping Logistics Hub"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06152B]/95 via-[#0A2A4D]/85 to-[#06152B]/90" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3 text-white">
          <div className="inline-flex items-center space-x-2 bg-orange-500/20 text-[#D85A30] border border-[#D85A30]/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Plane className="w-3.5 h-3.5" />
            <span>Fret Aérien & Hub Miami ➔ Haïti</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Achetez partout dans le monde, nous livrons chez vous
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            Gestion intégrale des formalités : paiement immédiat en devises, réception en entrepôt sécurisé, dédouanement et remise en main propre à Port-au-Prince et en province.
          </p>
        </div>
      </div>

      <SectionDarkDivider label="Choix du Service & Formulaire Dédié" />

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
                  Votre demande a été enregistrée avec succès !
                </h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm">
                  L'équipe Polyverse a bien reçu les détails de votre commande. Pour finaliser le devis et accélérer le traitement, cliquez sur le bouton WhatsApp ci-dessous.
                </p>
              </div>

              {/* Reference Code Card */}
              <div className="inline-flex items-center space-x-3 bg-slate-50 border border-slate-200 px-5 py-3 rounded-xl">
                <span className="text-xs text-slate-500 uppercase font-semibold">Numéro de référence :</span>
                <span className="font-mono font-bold text-[#185FA5] text-lg">{orderRef}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(orderRef)}
                  className="p-1 hover:bg-slate-200 rounded text-slate-600 transition"
                  title="Copier la référence"
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
                  <span>Confirmer sur WhatsApp maintenant</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsAccountModalOpen(true)}
                  className="px-5 py-3.5 bg-[#185FA5] hover:bg-[#0A2A4D] text-white font-bold rounded-xl transition cursor-pointer"
                >
                  Gade nan Istorik Kòmand
                </button>

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
                  Passer une autre commande
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
                      <strong>Service Achat Sans Carte :</strong> Indiquez le nom du produit, le lien du site (Amazon, Shein, eBay, etc.), la couleur, la taille et la quantité. Nous calculons le prix total en Gourdes ou en Dollars pour un paiement rapide par MonCash, Natcash ou virement !
                    </span>
                  )}
                  {selectedService === 'shipping' && (
                    <span>
                      <strong>Service Shipping & Livraison :</strong> Précisez les colis à acheminer ou à commander auprès de vos fournisseurs internationaux. Nous mettons à disposition notre adresse de transit en Floride et livrons directement en Haïti.
                    </span>
                  )}
                  {selectedService === 'planification-evenement' && (
                    <span>
                      <strong>Planification d'Événements :</strong> Décrivez votre événement (Gala, Lancement, Conférence, Promotion). Nous gérons la logistique intégrale : sonorisation, merchandising, t-shirts sérigraphiés et coordination complète.
                    </span>
                  )}
                </div>
              </div>

              {/* Step 1: Product / Service Details */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#0A2A4D] flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <span className="w-6 h-6 rounded-full bg-[#185FA5] text-white text-xs flex items-center justify-center font-bold">1</span>
                  <span>Détails du Produit ou du Service Requis</span>
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Nom du Produit / Intitulé de la Demande *
                  </label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Ex: Robe de soirée Shein, Baskets Nike, Pack 100 t-shirts promotionnels..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Lien du Produit en ligne (URL - optionnel)
                    </label>
                    <input
                      type="url"
                      value={productUrl}
                      onChange={(e) => setProductUrl(e.target.value)}
                      placeholder="https://shein.com/item/... ou amazon.com/..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Prix Estimatif sur le Site ($ USD)
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
                      Quantité *
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
                      Couleur souhaitée
                    </label>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="Ex: Noir, Bleu marine, Blanc, Rouge..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Taille / Pointure
                    </label>
                    <input
                      type="text"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      placeholder="Ex: S, M, L, XL, Pointure 42..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Description & Instructions Particulières
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Indiquez toute précision utile sur le modèle, les matières ou vos impératifs de livraison..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition resize-none"
                  />
                </div>
              </div>

              {/* Step 2: Client & Delivery Info */}
              <div className="space-y-4 pt-4">
                <h3 className="text-base font-bold text-[#0A2A4D] flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <span className="w-6 h-6 rounded-full bg-[#185FA5] text-white text-xs flex items-center justify-center font-bold">2</span>
                  <span>Informations de Livraison & Contact</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ex: Jean-Luc Petit-Homme"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Numéro WhatsApp / Téléphone *
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
                      E-mail (optionnel)
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="votre.email@domaine.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Ville & Adresse de Livraison en Haïti *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Ex: Caracol, Cap-Haïtien, Delmas, Pétion-Ville..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition"
                    />
                  </div>
                </div>
              </div>

              {/* Account Requirement Notice */}
              {!currentUser ? (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-900">
                  <div className="flex items-center space-x-2.5">
                    <Lock className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <span className="font-bold text-sm text-amber-950">Yon kont nesesè pou kòmande</span>
                      <p className="text-[11px] text-amber-800">
                        Pou sekirite tranzaksyon an ak swivi livrezon w, ou dwe gen yon kont Polyverse.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => requireAuth()}
                    className="px-3.5 py-2 bg-[#0A2A4D] hover:bg-[#185FA5] text-white font-bold text-xs rounded-xl transition cursor-pointer shrink-0 ml-3 shadow-xs"
                  >
                    Konekte / Enskri
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-[#0A2A4D]">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Konekte kòm: <strong>{currentUser.name}</strong> ({currentUser.email})</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Kont Valide
                  </span>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-[#185FA5] hover:bg-[#0A2A4D] text-white font-bold rounded-xl shadow-md transition duration-200 cursor-pointer"
                >
                  <FileText className="w-5 h-5" />
                  <span>{currentUser ? 'Valider la commande en ligne' : 'Konekte & Valide kòmand lan'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSubmitForm()}
                  className="flex items-center justify-center space-x-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition duration-200 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Envoyer directement sur WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Live Summary Card & Process Explainer */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live Recap Card with Shipping Background */}
          <div className="relative overflow-hidden bg-[#0A2A4D] text-white rounded-2xl p-6 shadow-xl space-y-4 border border-slate-700/70">
            <div className="absolute inset-0 z-0 opacity-40">
              <img
                src={shippingLogisticsImg}
                alt="Logistics Background"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-[#0A2A4D]/85" />
            </div>

            <div className="relative z-10 space-y-4">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#D85A30] bg-orange-950/60 px-2.5 py-1 rounded-full border border-orange-500/30">
              Aperçu de votre commande
            </span>

            <h4 className="text-lg font-bold text-white">
              {productName || 'Le nom du produit apparaîtra ici...'}
            </h4>

            <div className="space-y-2 text-xs border-t border-slate-700/80 pt-3">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Service :</span>
                <span className="font-semibold text-slate-200">{getServiceTitle(selectedService).split('(')[0]}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Quantité :</span>
                <span className="font-semibold text-slate-200">{quantity} pièce{quantity > 1 ? 's' : ''}</span>
              </div>
              {color && (
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Couleur :</span>
                  <span className="font-semibold text-slate-200">{color}</span>
                </div>
              )}
              {size && (
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Taille / Pointure :</span>
                  <span className="font-semibold text-slate-200">{size}</span>
                </div>
              )}
              {deliveryAddress && (
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Livraison :</span>
                  <span className="font-semibold text-slate-200">{deliveryAddress}</span>
                </div>
              )}
            </div>

            {totals && (
              <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Prix estimatif articles :</span>
                  <span>${totals.totalUSD.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#D85A30]">
                  <span>Total estimatif en Gourdes :</span>
                  <span>≈ {totals.totalHTG.toLocaleString()} HTG</span>
                </div>
                <p className="text-[10px] text-slate-400 pt-1">
                  * Taux de référence 1$ = 150 HTG. Frais d'expédition et de dédouanement confirmés avant tout paiement.
                </p>
              </div>
            )}

            <div className="pt-2 text-[11px] text-slate-300 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Garantie de sécurité 100% sur chaque achat avec Polyverse.</span>
            </div>
            </div>
          </div>

          {/* 4-Step How It Works Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h4 className="text-base font-bold text-[#0A2A4D] flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#185FA5]" />
              <span>Comment fonctionne le service ?</span>
            </h4>

            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-[#185FA5] font-bold flex items-center justify-center shrink-0 text-[11px]">
                  1
                </span>
                <div>
                  <strong className="text-slate-800">Transmettez vos articles</strong>
                  <p>Indiquez le nom, la couleur, la taille et le lien de l'article souhaité.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-[#185FA5] font-bold flex items-center justify-center shrink-0 text-[11px]">
                  2
                </span>
                <div>
                  <strong className="text-slate-800">Nous calculons le montant net</strong>
                  <p>L'équipe Polyverse confirme le coût en Gourdes ou en Dollars en direct.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-[#185FA5] font-bold flex items-center justify-center shrink-0 text-[11px]">
                  3
                </span>
                <div>
                  <strong className="text-slate-800">Paiement local simplifié</strong>
                  <p>Réglez par MonCash, Natcash, virement bancaire ou en espèces.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  4
                </span>
                <div>
                  <strong className="text-slate-800">Achat & Expédition sécurisés</strong>
                  <p>Commande passée sans délai, suivi colis en temps réel et livraison en Haïti !</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="w-full py-2.5 text-center text-xs font-bold text-[#185FA5] hover:text-[#0A2A4D] hover:bg-slate-50 rounded-xl transition cursor-pointer"
              >
                Demander un devis personnalisé complet →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
