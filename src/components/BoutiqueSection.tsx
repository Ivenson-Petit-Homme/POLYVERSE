import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShopProduct, CartItem, AffiliateCode } from '../types';
import { SHOP_PRODUCTS, AFFILIATE_CODES_SAMPLE, POLYVERSE_INFO, POLYVERSE_EXCHANGE_RATE } from '../data/polyverseData';
import boutiqueMerchBg from '../assets/images/boutique_merch_bg_1789429576842.jpg';
import { useAuth } from '../context/AuthContext';
import {
  ShoppingBag,
  ShoppingCart,
  Tag,
  CheckCircle2,
  X,
  Plus,
  Minus,
  MessageCircle,
  Users,
  Copy,
  Check,
  Percent,
  Gift,
  Lock,
} from 'lucide-react';

interface BoutiqueSectionProps {
  onOpenQuoteModal: () => void;
}

export const BoutiqueSection: React.FC<BoutiqueSectionProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState(false);

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<AffiliateCode | null>(null);
  const [promoError, setPromoError] = useState('');
  const [activeAffiliateCodes, setActiveAffiliateCodes] = useState<AffiliateCode[]>(AFFILIATE_CODES_SAMPLE);

  const [influencerName, setInfluencerName] = useState('');
  const [influencerSocial, setInfluencerSocial] = useState('');
  const [influencerWhatsapp, setInfluencerWhatsapp] = useState('');
  const [influencerDesiredCode, setInfluencerDesiredCode] = useState('');
  const [affiliateSuccess, setAffiliateSuccess] = useState(false);

  const { currentUser, requireAuth, placeOrder, setIsAccountModalOpen } = useAuth();

  const [buyerName, setBuyerName] = useState(currentUser?.name || '');
  const [buyerPhone, setBuyerPhone] = useState(currentUser?.phone || '');
  const [buyerAddress, setBuyerAddress] = useState(currentUser?.address || '');
  const [buyerPaymentMethod, setBuyerPaymentMethod] = useState('MonCash');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  React.useEffect(() => {
    if (currentUser) {
      if (!buyerName && currentUser.name) setBuyerName(currentUser.name);
      if (!buyerPhone && currentUser.phone) setBuyerPhone(currentUser.phone);
      if (!buyerAddress && currentUser.address) setBuyerAddress(currentUser.address);
    }
  }, [currentUser]);

  const [selectedProductSizes, setSelectedProductSizes] = useState<Record<string, string>>({
    'prod-tshirt-signature': 'L',
    'prod-hoodie-streetwear': 'L',
    'prod-pack-serigraphie-50': 'Mix S, M, L, XL, XXL',
  });

  const [selectedProductColors, setSelectedProductColors] = useState<Record<string, string>>({
    'prod-tshirt-signature': 'Noir Onyx',
    'prod-hoodie-streetwear': 'Noir',
    'prod-casquette-pro': 'Total Black',
    'prod-mug-ceramic': 'Noir Mat',
  });

  const filteredProducts = SHOP_PRODUCTS.filter((product) => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  });

  const addToCart = (product: ShopProduct) => {
    const size = selectedProductSizes[product.id] || (product.availableSizes ? product.availableSizes[0] : undefined);
    const color = selectedProductColors[product.id] || (product.availableColors ? product.availableColors[0] : undefined);

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingItemIndex > -1) {
        const updated = [...prevCart];
        updated[existingItemIndex].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { product, quantity: 1, selectedSize: size, selectedColor: color }];
      }
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((_, i) => i !== index));
    } else {
      setCart((prev) => {
        const updated = [...prev];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  };

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalUSD = cart.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
  const discountAmountUSD = appliedPromo ? (subtotalUSD * appliedPromo.discountPercentage) / 100 : 0;
  const finalTotalUSD = Math.max(0, subtotalUSD - discountAmountUSD);
  const finalTotalHTG = Math.round(finalTotalUSD * POLYVERSE_EXCHANGE_RATE);

  const handleApplyPromo = () => {
    setPromoError('');
    const clean = promoCodeInput.trim().toUpperCase();
    if (!clean) {
      setPromoError('Veuillez entrer un code promo.');
      return;
    }

    const matched = activeAffiliateCodes.find((c) => c.code.toUpperCase() === clean);
    if (matched) {
      setAppliedPromo(matched);
      setPromoError('');
    } else {
      setPromoError('Ce code promo est invalide ou a expiré.');
      setAppliedPromo(null);
    }
  };

  const handleCreateAffiliateCode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode =
      influencerDesiredCode.trim().toUpperCase() || `POLY-${Math.floor(100 + Math.random() * 900)}`;
    const newAffiliate: AffiliateCode = {
      code: cleanCode,
      influencerName: influencerName,
      discountPercentage: 10,
      commissionPercentage: 12,
      platform: influencerSocial || 'Réseaux Sociaux',
    };

    setActiveAffiliateCodes((prev) => [newAffiliate, ...prev]);
    setAffiliateSuccess(true);
    setAppliedPromo(newAffiliate);
    setPromoCodeInput(cleanCode);
  };

  const handleGenerateOrderWhatsApp = (orderRefCode?: string) => {
    let msg = `*NOUVELLE COMMANDE BOUTIQUE POLYVERSE*\n`;
    if (orderRefCode) {
      msg += `*Code Référence Commande :* ${orderRefCode}\n`;
    }
    msg += `----------------------------------------\n`;
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.product.name}*\n`;
      msg += `   • Quantité : ${item.quantity}\n`;
      if (item.selectedSize) msg += `   • Taille : ${item.selectedSize}\n`;
      if (item.selectedColor) msg += `   • Couleur : ${item.selectedColor}\n`;
      msg += `   • Prix unitaire : $${item.product.priceUSD} USD\n`;
    });
    msg += `----------------------------------------\n`;
    msg += `*Sous-total :* $${subtotalUSD.toFixed(2)} USD\n`;
    if (appliedPromo) {
      msg += `*Code Promo Appliqué :* ${appliedPromo.code} (-${appliedPromo.discountPercentage}%)\n`;
      msg += `*Ambassadeur Référent :* ${appliedPromo.influencerName}\n`;
      msg += `*Remise Immédiate :* -$${discountAmountUSD.toFixed(2)} USD\n`;
    }
    msg += `*TOTAL FINAL :* $${finalTotalUSD.toFixed(2)} USD (≈ ${finalTotalHTG.toLocaleString()} HTG)\n`;
    msg += `----------------------------------------\n`;
    msg += `*Client :* ${buyerName || currentUser?.name || 'Client Polyverse'}\n`;
    msg += `*Téléphone / WhatsApp :* ${buyerPhone || currentUser?.phone || 'Non précisé'}\n`;
    msg += `*Adresse de livraison :* ${buyerAddress || currentUser?.address || 'À confirmer'}\n`;
    msg += `*Mode de Paiement :* ${buyerPaymentMethod}\n`;

    return `https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(msg)}`;
  };

  const handleFinalizeOrder = () => {
    if (!requireAuth(() => handleFinalizeOrder())) {
      return;
    }

    if (!buyerName.trim()) {
      alert('Veuillez renseigner votre nom et prénom pour la livraison.');
      return;
    }
    if (!buyerPhone.trim()) {
      alert('Veuillez renseigner votre numéro de téléphone ou WhatsApp.');
      return;
    }
    if (!buyerAddress.trim()) {
      alert('Veuillez renseigner votre adresse de livraison complète (Ville, Quartier).');
      return;
    }

    const saved = placeOrder({
      userId: currentUser?.id || 'client',
      userEmail: currentUser?.email || '',
      userName: buyerName.trim(),
      userPhone: buyerPhone.trim(),
      userAddress: buyerAddress.trim(),
      orderType: 'boutique',
      items: cart.map((c) => ({
        productName: c.product.name,
        quantity: c.quantity,
        priceUSD: c.product.priceUSD,
        color: c.selectedColor,
        size: c.selectedSize,
      })),
      totalUSD: finalTotalUSD,
      totalHTG: finalTotalHTG,
      paymentMethod: buyerPaymentMethod,
      promoCode: appliedPromo?.code,
      notes: appliedPromo ? `Ambassadeur : ${appliedPromo.influencerName}` : undefined,
    });

    setConfirmedOrderId(saved.id);
    setOrderConfirmed(true);

    const waUrl = handleGenerateOrderWhatsApp(saved.id);
    window.open(waUrl, '_blank');
  };

  const copyPromoToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setPromoCodeInput(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="bg-white text-[#141414] relative">
      {/* 1. FULL-BLEED EDITORIAL HERO (WWF.FR STYLE) */}
      <section className="relative bg-[#08101C] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={boutiqueMerchBg}
            alt="Boutique Officielle et Merchandising Polyverse"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08101C]/95 via-[#0A2A4D]/85 to-[#08101C]/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E87048] block">
              Boutique &amp; Merchandising Officiel
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-[60px] font-bold uppercase leading-[1.0] text-white"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              La Boutique Polyverse
            </h1>
            <p className="text-base sm:text-lg text-stone-200 leading-relaxed">
              T-shirts sérigraphiés, hoodies premium, casquettes, objets personnalisés et packs entreprise. Utilisez un code ambassadeur pour bénéficier de 10% de remise immédiate.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsAffiliateModalOpen(true)}
              className="flex items-center space-x-2 px-5 py-3.5 bg-[#D85A30] hover:bg-[#b84722] text-white text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <Users className="w-4 h-4" />
              <span>Espace Ambassadeurs (10–15%)</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2 px-5 py-3.5 bg-white text-[#141414] hover:bg-stone-100 text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <ShoppingCart className="w-4 h-4 text-[#0A2A4D]" />
              <span>Panier ({totalItemCount})</span>
            </button>
          </div>
        </div>

        {/* Category Filter Architectural Bar */}
        <div className="relative z-10 bg-[#F4F3EF] border-t border-b border-stone-200 text-[#141414]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
            {[
              { id: 'all', label: 'Tous les Produits' },
              { id: 'textile', label: 'Textile & Sérigraphie' },
              { id: 'goodies', label: 'Goodies & Casquettes' },
              { id: 'tech-finance', label: 'Tech & Cartes' },
              { id: 'branding', label: 'Packs Branding' },
            ].map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-4 text-left text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#0A2A4D] text-white' : 'bg-white hover:bg-[#F4F3EF] text-[#141414]'
                  }`}
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. PRODUCTS EDITORIAL CATALOGUE GRID */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group bg-white border border-stone-200 hover:border-[#0A2A4D] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 right-0 bg-[#0A2A4D] text-white text-xs font-bold font-tabular px-3 py-1.5">
                    ${product.priceUSD} USD
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                    <span className="text-[#D85A30]">{product.categoryLabel}</span>
                    {product.badge && <span className="text-[#0A2A4D]">{product.badge}</span>}
                  </div>
                  <h3
                    className="text-lg font-bold uppercase text-[#141414] leading-snug"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">{product.description}</p>
                </div>
              </div>

              <div className="px-5 pb-5 space-y-4">
                {/* Size & Color options */}
                {(product.availableSizes || product.availableColors) && (
                  <div className="space-y-2.5 pt-3 border-t border-stone-200">
                    {product.availableSizes && (
                      <div>
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                          Taille
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {product.availableSizes.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() =>
                                setSelectedProductSizes((prev) => ({ ...prev, [product.id]: s }))
                              }
                              className={`px-2.5 py-1 text-[10px] font-bold border transition-colors cursor-pointer ${
                                selectedProductSizes[product.id] === s ||
                                (!selectedProductSizes[product.id] && product.availableSizes?.[0] === s)
                                  ? 'bg-[#0A2A4D] text-white border-[#0A2A4D]'
                                  : 'bg-[#F4F3EF] text-stone-700 border-stone-300 hover:bg-stone-200'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.availableColors && (
                      <div>
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                          Couleur
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {product.availableColors.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() =>
                                setSelectedProductColors((prev) => ({ ...prev, [product.id]: c }))
                              }
                              className={`px-2.5 py-1 text-[10px] font-semibold border transition-colors cursor-pointer ${
                                selectedProductColors[product.id] === c ||
                                (!selectedProductColors[product.id] && product.availableColors?.[0] === c)
                                  ? 'bg-[#0A2A4D] text-white border-[#0A2A4D]'
                                  : 'bg-[#F4F3EF] text-stone-700 border-stone-300 hover:bg-stone-200'
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer Action */}
                <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-sm font-bold font-tabular text-[#0A2A4D] block">
                      ${product.priceUSD} USD
                    </span>
                    <span className="text-[11px] font-tabular text-stone-500 block">
                      ≈ {(product.priceUSD * POLYVERSE_EXCHANGE_RATE).toLocaleString()} HTG
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="flex items-center space-x-1.5 px-4 py-2.5 bg-[#D85A30] hover:bg-[#b84722] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Commander</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="absolute inset-y-0 right-0 max-w-full flex pl-10"
            >
              <div className="w-screen max-w-md bg-white border-l border-stone-300 shadow-2xl flex flex-col justify-between">
                {/* Drawer Header */}
                <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#0A2A4D] text-white">
                  <div className="flex items-center space-x-2.5">
                    <ShoppingCart className="w-5 h-5 text-[#E87048]" />
                    <h3
                      className="text-lg font-bold uppercase tracking-wide"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      Votre Panier ({totalItemCount})
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Fermer le panier"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Body */}
                <div className="p-5 overflow-y-auto flex-1 space-y-6">
                  {orderConfirmed ? (
                    <div className="py-10 text-center space-y-4">
                      <div className="w-14 h-14 bg-emerald-700 text-white flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h4
                        className="text-xl font-bold uppercase text-[#141414]"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        Commande Enregistrée avec Succès
                      </h4>
                      <p className="text-xs text-stone-600">
                        Référence : <strong className="font-mono text-[#0A2A4D]">{confirmedOrderId}</strong>
                      </p>
                      <p className="text-xs text-stone-500 max-w-xs mx-auto">
                        Votre commande est archivée dans votre compte et le récapitulatif WhatsApp est prêt.
                      </p>
                      <div className="pt-2 flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCartOpen(false);
                            setOrderConfirmed(false);
                            setIsAccountModalOpen(true);
                          }}
                          className="w-full py-3 bg-[#0A2A4D] hover:bg-[#185FA5] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Historique de Mes Commandes
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setOrderConfirmed(false);
                            setIsCartOpen(false);
                          }}
                          className="w-full py-2 text-stone-600 hover:text-[#141414] text-xs font-semibold cursor-pointer"
                        >
                          Continuer mes achats
                        </button>
                      </div>
                    </div>
                  ) : cart.length === 0 ? (
                    <div className="py-16 text-center space-y-3">
                      <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
                      <p className="text-sm font-semibold text-stone-600">Votre panier est vide.</p>
                      <button
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs font-bold uppercase tracking-wider text-[#D85A30] hover:underline cursor-pointer"
                      >
                        Parcourir le catalogue →
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3">
                        {cart.map((item, idx) => (
                          <div
                            key={`${item.product.id}-${idx}`}
                            className="flex items-center space-x-3 p-3 border border-stone-200 bg-[#F4F3EF]"
                          >
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="w-14 h-14 object-cover shrink-0 border border-stone-300"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-[#141414] truncate">{item.product.name}</h4>
                              <p className="text-[11px] text-stone-500">
                                {item.selectedSize && `Taille : ${item.selectedSize}`}
                                {item.selectedColor && ` · ${item.selectedColor}`}
                              </p>
                              <p className="text-xs font-bold font-tabular text-[#0A2A4D]">
                                ${item.product.priceUSD * item.quantity} USD
                              </p>
                            </div>

                            <div className="flex items-center space-x-1 border border-stone-300 bg-white p-1">
                              <button
                                type="button"
                                onClick={() => updateQuantity(idx, item.quantity - 1)}
                                className="p-1 text-stone-600 hover:text-black cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold font-tabular px-1.5">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(idx, item.quantity + 1)}
                                className="p-1 text-stone-600 hover:text-black cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Promo Code */}
                      <div className="p-4 bg-[#FAF9F6] border border-stone-300 space-y-2.5">
                        <div className="flex items-center space-x-1.5">
                          <Tag className="w-4 h-4 text-[#D85A30]" />
                          <label className="text-xs font-bold text-[#141414] uppercase tracking-wider">
                            Code Promo ou Code Affilié
                          </label>
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={promoCodeInput}
                            onChange={(e) => setPromoCodeInput(e.target.value)}
                            placeholder="Ex : POLYVIP, ALEX509..."
                            className="flex-1 px-3 py-2 text-xs font-bold uppercase border border-stone-300 bg-white outline-none focus:border-[#0A2A4D]"
                          />
                          <button
                            type="button"
                            onClick={handleApplyPromo}
                            className="px-4 py-2 bg-[#D85A30] hover:bg-[#b84722] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            Appliquer
                          </button>
                        </div>

                        {promoError && <p className="text-[11px] text-red-600 font-semibold">{promoError}</p>}

                        {appliedPromo && (
                          <div className="bg-emerald-50 border border-emerald-300 p-2.5 text-emerald-900 text-xs flex items-center justify-between">
                            <div>
                              <span className="font-bold">Code {appliedPromo.code} validé</span>
                              <p className="text-[11px] text-emerald-800">
                                Référent : {appliedPromo.influencerName} (-{appliedPromo.discountPercentage}%)
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setAppliedPromo(null);
                                setPromoCodeInput('');
                              }}
                              className="text-stone-500 hover:text-stone-800 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Delivery Info */}
                      <div className="space-y-3 pt-2 border-t border-stone-200">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-[#141414] uppercase tracking-wider">
                            Informations de Livraison
                          </h4>
                          {currentUser && (
                            <span className="text-[11px] text-emerald-700 font-bold">Compte connecté</span>
                          )}
                        </div>

                        {!currentUser && (
                          <div className="p-3 bg-[#F4F3EF] border border-stone-300 flex items-center justify-between text-xs text-stone-800">
                            <div className="flex items-center space-x-2">
                              <Lock className="w-4 h-4 text-[#D85A30] shrink-0" />
                              <span>Connexion requise pour finaliser l’achat.</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => requireAuth()}
                              className="px-3 py-1.5 bg-[#0A2A4D] text-white font-bold text-[11px] uppercase tracking-wider cursor-pointer ml-2"
                            >
                              Connexion
                            </button>
                          </div>
                        )}

                        <input
                          type="text"
                          required
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          placeholder="Nom et Prénom *"
                          className="w-full px-3.5 py-2.5 text-xs border border-stone-300 focus:border-[#0A2A4D] outline-none"
                        />

                        <input
                          type="tel"
                          required
                          value={buyerPhone}
                          onChange={(e) => setBuyerPhone(e.target.value)}
                          placeholder="Numéro WhatsApp / Téléphone *"
                          className="w-full px-3.5 py-2.5 text-xs border border-stone-300 focus:border-[#0A2A4D] outline-none"
                        />

                        <input
                          type="text"
                          required
                          value={buyerAddress}
                          onChange={(e) => setBuyerAddress(e.target.value)}
                          placeholder="Adresse de livraison (Ville, Quartier, Rue) *"
                          className="w-full px-3.5 py-2.5 text-xs border border-stone-300 focus:border-[#0A2A4D] outline-none"
                        />

                        <div>
                          <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                            Mode de Paiement Préféré
                          </label>
                          <select
                            value={buyerPaymentMethod}
                            onChange={(e) => setBuyerPaymentMethod(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-xs border border-stone-300 font-semibold text-[#141414] bg-white outline-none"
                          >
                            <option value="MonCash">MonCash (Paiement en Gourdes)</option>
                            <option value="Natcash">Natcash (Paiement en Gourdes)</option>
                            <option value="Carte Bancaire">Carte Visa / Mastercard</option>
                            <option value="Cash à la livraison">Espèces à la livraison</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Drawer Footer Totals */}
                {cart.length > 0 && !orderConfirmed && (
                  <div className="p-5 border-t border-stone-200 bg-[#F4F3EF] space-y-3">
                    <div className="space-y-1.5 text-xs font-tabular">
                      <div className="flex justify-between text-stone-600">
                        <span>Sous-total :</span>
                        <span>${subtotalUSD.toFixed(2)} USD</span>
                      </div>
                      {appliedPromo && (
                        <div className="flex justify-between text-emerald-700 font-bold">
                          <span>Remise ({appliedPromo.discountPercentage}%) :</span>
                          <span>-${discountAmountUSD.toFixed(2)} USD</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base font-bold text-[#141414] pt-2 border-t border-stone-300">
                        <span>Total :</span>
                        <div className="text-right">
                          <div>${finalTotalUSD.toFixed(2)} USD</div>
                          <div className="text-xs text-[#D85A30]">≈ {finalTotalHTG.toLocaleString()} HTG</div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleFinalizeOrder}
                      className="w-full flex items-center justify-center space-x-2 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{currentUser ? 'Confirmer sur WhatsApp' : 'Se Connecter pour Valider'}</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. AFFILIATE MODAL */}
      <AnimatePresence>
        {isAffiliateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAffiliateModalOpen(false)}
              className="absolute inset-0 bg-black/65 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              className="relative bg-white border border-stone-300 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto z-10"
            >
              <div className="bg-[#0A2A4D] text-white p-6 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E87048] block">
                    Programme Ambassadeurs
                  </span>
                  <h3
                    className="text-xl font-bold uppercase mt-0.5"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Créer Votre Code Promo Personnel
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAffiliateModalOpen(false)}
                  className="p-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="p-4 bg-[#F4F3EF] border border-stone-200">
                    <div className="flex items-center space-x-1.5 text-[#0A2A4D] font-bold text-xs uppercase mb-1">
                      <Percent className="w-3.5 h-3.5 text-[#D85A30]" />
                      <span>Pour Vos Abonnés</span>
                    </div>
                    <p className="text-xs text-stone-700">
                      <strong>10% de réduction immédiate</strong> sur tout le catalogue.
                    </p>
                  </div>

                  <div className="p-4 bg-[#F4F3EF] border border-stone-200">
                    <div className="flex items-center space-x-1.5 text-[#0A2A4D] font-bold text-xs uppercase mb-1">
                      <Gift className="w-3.5 h-3.5 text-[#D85A30]" />
                      <span>Pour Vous</span>
                    </div>
                    <p className="text-xs text-stone-700">
                      <strong>10% à 15% de commission</strong> versée par MonCash ou espèces.
                    </p>
                  </div>
                </div>

                {affiliateSuccess && (
                  <div className="p-4 bg-emerald-50 border border-emerald-300 text-xs text-emerald-900">
                    Votre code <strong>{promoCodeInput}</strong> est actif et appliqué automatiquement à votre panier.
                  </div>
                )}

                <form onSubmit={handleCreateAffiliateCode} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Votre Nom ou Nom de Page *
                    </label>
                    <input
                      type="text"
                      required
                      value={influencerName}
                      onChange={(e) => setInfluencerName(e.target.value)}
                      placeholder="Ex : Vanessa Lifestyle, Alex Créateur..."
                      className="w-full px-3.5 py-2.5 border border-stone-300 focus:border-[#0A2A4D] text-xs outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Réseau Social Principal
                      </label>
                      <input
                        type="text"
                        value={influencerSocial}
                        onChange={(e) => setInfluencerSocial(e.target.value)}
                        placeholder="@votre_compte TikTok / IG"
                        className="w-full px-3.5 py-2.5 border border-stone-300 focus:border-[#0A2A4D] text-xs outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Code Promo Souhaité *
                      </label>
                      <input
                        type="text"
                        required
                        value={influencerDesiredCode}
                        onChange={(e) => setInfluencerDesiredCode(e.target.value.toUpperCase())}
                        placeholder="Ex : ALEX509, POLYVIP..."
                        className="w-full px-3.5 py-2.5 border border-stone-300 focus:border-[#0A2A4D] text-xs font-bold uppercase outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Numéro WhatsApp pour Vos Commissions *
                    </label>
                    <input
                      type="tel"
                      required
                      value={influencerWhatsapp}
                      onChange={(e) => setInfluencerWhatsapp(e.target.value)}
                      placeholder="+509 41 61 3156"
                      className="w-full px-3.5 py-2.5 border border-stone-300 focus:border-[#0A2A4D] text-xs outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#D85A30] hover:bg-[#b84722] text-white text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Générer &amp; Activer Mon Code Promo
                  </button>
                </form>

                <div className="pt-4 border-t border-stone-200 space-y-2 text-left">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                    Codes Promo Actifs Pour Test Rapide :
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {activeAffiliateCodes.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => copyPromoToClipboard(item.code)}
                        className="flex items-center justify-between p-2.5 border border-stone-200 hover:border-[#D85A30] bg-[#F4F3EF] text-left transition-colors cursor-pointer"
                      >
                        <div>
                          <span className="font-mono font-bold text-xs text-[#0A2A4D] block">{item.code}</span>
                          <span className="text-[10px] text-stone-500">{item.influencerName}</span>
                        </div>
                        <div className="text-[#D85A30]">
                          {copiedCode === item.code ? (
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
