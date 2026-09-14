import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShopProduct, CartItem, AffiliateCode } from '../types';
import { SHOP_PRODUCTS, AFFILIATE_CODES_SAMPLE, POLYVERSE_INFO } from '../data/polyverseData';
import { ScrollReveal } from './ScrollReveal';
import {
  ShoppingBag,
  ShoppingCart,
  Tag,
  Sparkles,
  CheckCircle2,
  X,
  Plus,
  Minus,
  MessageCircle,
  Users,
  ShieldCheck,
  ArrowRight,
  Gift,
  Copy,
  Check,
  Percent,
  Search,
  Filter,
} from 'lucide-react';

interface BoutiqueSectionProps {
  onOpenQuoteModal: () => void;
}

export const BoutiqueSection: React.FC<BoutiqueSectionProps> = ({ onOpenQuoteModal }) => {
  // Products & Category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState(false);

  // Promo code & Influencer state
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<AffiliateCode | null>(null);
  const [promoError, setPromoError] = useState('');
  const [activeAffiliateCodes, setActiveAffiliateCodes] = useState<AffiliateCode[]>(AFFILIATE_CODES_SAMPLE);

  // New Affiliate Request Form
  const [influencerName, setInfluencerName] = useState('');
  const [influencerSocial, setInfluencerSocial] = useState('');
  const [influencerWhatsapp, setInfluencerWhatsapp] = useState('');
  const [influencerDesiredCode, setInfluencerDesiredCode] = useState('');
  const [affiliateSuccess, setAffiliateSuccess] = useState(false);

  // Checkout Client Info
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [buyerPaymentMethod, setBuyerPaymentMethod] = useState('MonCash');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Per-product selection state (Color & Size)
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

  // Filter products
  const filteredProducts = SHOP_PRODUCTS.filter((product) => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  });

  // Cart Management
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

  const discountAmountUSD = appliedPromo
    ? (subtotalUSD * appliedPromo.discountPercentage) / 100
    : 0;

  const finalTotalUSD = Math.max(0, subtotalUSD - discountAmountUSD);
  const finalTotalHTG = Math.round(finalTotalUSD * 150);

  // Apply promo / affiliate code
  const handleApplyPromo = () => {
    setPromoError('');
    const clean = promoCodeInput.trim().toUpperCase();
    if (!clean) {
      setPromoError('Tanpri antre yon kòd');
      return;
    }

    const matched = activeAffiliateCodes.find((c) => c.code.toUpperCase() === clean);
    if (matched) {
      setAppliedPromo(matched);
      setPromoError('');
    } else {
      setPromoError('Kòd sa pa valid oswa li ekspire.');
      setAppliedPromo(null);
    }
  };

  // Submit influencer application
  const handleCreateAffiliateCode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = influencerDesiredCode.trim().toUpperCase() || `POLY-${Math.floor(100 + Math.random() * 900)}`;
    const newAffiliate: AffiliateCode = {
      code: cleanCode,
      influencerName: influencerName,
      discountPercentage: 10,
      commissionPercentage: 12,
      platform: influencerSocial || 'Social Media',
    };

    setActiveAffiliateCodes((prev) => [newAffiliate, ...prev]);
    setAffiliateSuccess(true);
    setAppliedPromo(newAffiliate);
    setPromoCodeInput(cleanCode);
  };

  // Generate WhatsApp message for checkout
  const handleGenerateOrderWhatsApp = () => {
    let msg = `*NOUVO KÒMAND BOUTIK POLYVERSE*\n`;
    msg += `----------------------------------------\n`;
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.product.name}*\n`;
      msg += `   • Kantite: ${item.quantity}\n`;
      if (item.selectedSize) msg += `   • Size: ${item.selectedSize}\n`;
      if (item.selectedColor) msg += `   • Koulè: ${item.selectedColor}\n`;
      msg += `   • Pri inite: $${item.product.priceUSD} USD\n`;
    });
    msg += `----------------------------------------\n`;
    msg += `💵 *Sous-total:* $${subtotalUSD.toFixed(2)} USD\n`;
    if (appliedPromo) {
      msg += `🎁 *Kòd Pwomo Aplike:* ${appliedPromo.code} (-${appliedPromo.discountPercentage}%)\n`;
      msg += `👤 *Enfliyansè Referan:* ${appliedPromo.influencerName}\n`;
      msg += `✂️ *Rabè:* -$${discountAmountUSD.toFixed(2)} USD\n`;
    }
    msg += `💰 *TOTAL FINAL:* $${finalTotalUSD.toFixed(2)} USD (≈ ${finalTotalHTG.toLocaleString()} HTG)\n`;
    msg += `----------------------------------------\n`;
    msg += `👤 *Achtè:* ${buyerName || 'Kliyan Polyverse'}\n`;
    msg += `📱 *Telefòn:* ${buyerPhone || 'Non presize'}\n`;
    msg += `📍 *Adrès livrezon:* ${buyerAddress || 'A konfime'}\n`;
    msg += `💳 *Mòd Pèman:* ${buyerPaymentMethod}\n`;

    return `https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(msg)}`;
  };

  const copyPromoToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setPromoCodeInput(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 relative">
      {/* Header Banner */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D85A30] bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
            Boutik & Espace Merchandising
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2A4D] tracking-tight">
            La Boutique Polyverse
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Achte t-shirts sérigraphiés, hoodies, casquettes, cartes virtuelles et packs entreprise. Pwofite kòd pwomo enfliyansè yo pou jwenn 10% rabè !
          </p>
        </div>
      </ScrollReveal>

      {/* Top Banner: Influenceurs / Affiliation CTA & Cart Floating Trigger */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#0A2A4D] via-[#185FA5] to-[#0A2A4D] text-white p-4 sm:p-5 rounded-2xl shadow-md">
        <div className="flex items-center space-x-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#D85A30]" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
              <span>Ou se yon kreyatè kontni oswa enfliyansè ?</span>
              <span className="text-[10px] bg-[#D85A30] text-white font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                10-15% Komisyon
              </span>
            </h3>
            <p className="text-xs text-slate-200">
              Jwenn kòd pwomo pèsonalize w la pou kominote w jwenn rabè epi ou menm touche komisyon sou chak vant !
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => setIsAffiliateModalOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#D85A30] hover:bg-[#c04b24] text-white text-xs font-bold rounded-xl shadow-xs transition duration-150"
          >
            <Users className="w-4 h-4" />
            <span>Fenet Afilyasyon</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center space-x-2 px-4 py-2.5 bg-white text-[#0A2A4D] hover:bg-slate-100 text-xs font-bold rounded-xl shadow-xs transition duration-150 relative"
          >
            <ShoppingCart className="w-4 h-4 text-[#185FA5]" />
            <span>Panye</span>
            {totalItemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#D85A30] text-white text-[10px] font-bold flex items-center justify-center">
                {totalItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center">
        <div className="bg-[#F1EFE8] p-1.5 rounded-2xl border border-slate-200 flex flex-wrap gap-1.5 max-w-2xl w-full justify-center shadow-xs">
          {[
            { id: 'all', label: 'Tout Pwodui yo' },
            { id: 'textile', label: 'Textile & Sérigraphie' },
            { id: 'goodies', label: 'Goodies & Casquettes' },
            { id: 'tech-finance', label: 'Tech & Cartes' },
            { id: 'branding', label: 'Packs Branding' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-[#185FA5] text-white shadow-xs'
                  : 'text-slate-700 hover:text-[#0A2A4D] hover:bg-white/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-slate-100">
              <img
                src={product.imageUrl}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#0A2A4D]/90 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs">
                  {product.badge}
                </span>
              )}
              <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#0A2A4D] text-xs font-bold px-2.5 py-1 rounded-lg shadow-xs">
                ${product.priceUSD} USD
              </span>
            </div>

            {/* Product Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#185FA5]">
                  {product.categoryLabel}
                </span>
                <h3 className="font-bold text-[#0A2A4D] text-sm leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {product.description}
                </p>
              </div>

              {/* Options: Sizes & Colors if available */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                {product.availableSizes && (
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Gwosè / Size
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {product.availableSizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() =>
                            setSelectedProductSizes((prev) => ({ ...prev, [product.id]: s }))
                          }
                          className={`px-2 py-1 text-[10px] font-bold rounded-md border transition ${
                            selectedProductSizes[product.id] === s ||
                            (!selectedProductSizes[product.id] && product.availableSizes?.[0] === s)
                              ? 'bg-[#185FA5] text-white border-[#185FA5]'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
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
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Koulè
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {product.availableColors.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() =>
                            setSelectedProductColors((prev) => ({ ...prev, [product.id]: c }))
                          }
                          className={`px-2 py-0.5 text-[10px] font-medium rounded-md border transition ${
                            selectedProductColors[product.id] === c ||
                            (!selectedProductColors[product.id] && product.availableColors?.[0] === c)
                              ? 'bg-[#0A2A4D] text-white border-[#0A2A4D]'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Price & Add to Cart Button */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-extrabold text-[#0A2A4D]">
                    ${product.priceUSD} USD
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    ≈ {product.priceHTG.toLocaleString()} HTG
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#185FA5] hover:bg-[#0A2A4D] text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Kòmande</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Drawer / Panel */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
            />

            {/* Slide-over Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 right-0 max-w-full flex pl-10"
            >
              <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
                {/* Cart Header */}
                <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#FAF9F6]">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="w-5 h-5 text-[#185FA5]" />
                    <h3 className="font-bold text-lg text-[#0A2A4D]">Panye Kòmand Ou</h3>
                    <span className="text-xs bg-blue-100 text-[#185FA5] px-2 py-0.5 rounded-full font-bold">
                      {totalItemCount}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart Body */}
                <div className="p-5 overflow-y-auto flex-1 space-y-6">
                  {cart.length === 0 ? (
                    <div className="py-16 text-center space-y-3">
                      <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                      <p className="text-sm font-semibold text-slate-600">Panye w lan vid pou kounye a.</p>
                      <button
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs font-bold text-[#185FA5] hover:underline"
                      >
                        Chwazi pwodui nan boutik la →
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Cart Items List */}
                      <div className="space-y-3">
                        {cart.map((item, idx) => (
                          <div
                            key={`${item.product.id}-${idx}`}
                            className="flex items-center space-x-3 p-3 rounded-xl border border-slate-100 bg-[#FAF9F6]"
                          >
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="w-14 h-14 object-cover rounded-lg shrink-0 border border-slate-200"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-[#0A2A4D] truncate">
                                {item.product.name}
                              </h4>
                              <p className="text-[10px] text-slate-500">
                                {item.selectedSize && `Size: ${item.selectedSize}`}
                                {item.selectedColor && ` • ${item.selectedColor}`}
                              </p>
                              <p className="text-xs font-extrabold text-[#185FA5]">
                                ${item.product.priceUSD * item.quantity} USD
                              </p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-1 border border-slate-200 rounded-lg bg-white p-1">
                              <button
                                type="button"
                                onClick={() => updateQuantity(idx, item.quantity - 1)}
                                className="p-1 text-slate-600 hover:text-black"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(idx, item.quantity + 1)}
                                className="p-1 text-slate-600 hover:text-black"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* --- KOTE POU ACHTÈ A METE KÒD LA (Promo / Affiliation Code Field) --- */}
                      <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 space-y-2.5">
                        <div className="flex items-center space-x-1.5">
                          <Tag className="w-4 h-4 text-[#D85A30]" />
                          <label className="text-xs font-bold text-[#0A2A4D] uppercase tracking-wide">
                            Kòd Pwomo oswa Enfliyansè
                          </label>
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={promoCodeInput}
                            onChange={(e) => setPromoCodeInput(e.target.value)}
                            placeholder="Eg: POLYVIP, ALEX509..."
                            className="flex-1 px-3 py-2 text-xs font-bold uppercase rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                          />
                          <button
                            type="button"
                            onClick={handleApplyPromo}
                            className="px-4 py-2 bg-[#D85A30] hover:bg-[#bf4821] text-white text-xs font-bold rounded-lg transition"
                          >
                            Aplike
                          </button>
                        </div>

                        {promoError && (
                          <p className="text-[11px] text-red-600 font-semibold">{promoError}</p>
                        )}

                        {appliedPromo && (
                          <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-lg text-emerald-800 text-xs flex items-center justify-between">
                            <div>
                              <span className="font-bold">🎉 Kòd {appliedPromo.code} valide !</span>
                              <p className="text-[10px] text-emerald-700">
                                Referans pa : {appliedPromo.influencerName} (-{appliedPromo.discountPercentage}% rabè)
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setAppliedPromo(null);
                                setPromoCodeInput('');
                              }}
                              className="text-slate-400 hover:text-slate-600 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Client info in checkout */}
                      <div className="space-y-3 pt-2 border-t border-slate-200">
                        <h4 className="text-xs font-bold text-[#0A2A4D] uppercase tracking-wide">
                          Enfòmasyon Pou Livrezon
                        </h4>

                        <input
                          type="text"
                          required
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          placeholder="Non ak Prenon Ou *"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-[#185FA5] outline-none"
                        />

                        <input
                          type="tel"
                          required
                          value={buyerPhone}
                          onChange={(e) => setBuyerPhone(e.target.value)}
                          placeholder="Nimewo WhatsApp Ou *"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-[#185FA5] outline-none"
                        />

                        <input
                          type="text"
                          required
                          value={buyerAddress}
                          onChange={(e) => setBuyerAddress(e.target.value)}
                          placeholder="Adrès livrezon (Vil, Lari) *"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-[#185FA5] outline-none"
                        />

                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                            Mòd Pèman Prefere
                          </label>
                          <select
                            value={buyerPaymentMethod}
                            onChange={(e) => setBuyerPaymentMethod(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 font-semibold text-[#0A2A4D] bg-white outline-none"
                          >
                            <option value="MonCash">MonCash (Pèman an Goud)</option>
                            <option value="Natcash">Natcash (Pèman an Goud)</option>
                            <option value="Carte Bancaire">Carte Visa / Mastercard</option>
                            <option value="Cash à la livraison">Lajan Kach lè koli a rive</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Cart Footer / Totals & Final Checkout */}
                {cart.length > 0 && (
                  <div className="p-5 border-t border-slate-200 bg-[#FAF9F6] space-y-3">
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>Sous-total :</span>
                        <span>${subtotalUSD.toFixed(2)} USD</span>
                      </div>
                      {appliedPromo && (
                        <div className="flex justify-between text-emerald-600 font-bold">
                          <span>Rabè Enfliyansè ({appliedPromo.discountPercentage}%) :</span>
                          <span>-${discountAmountUSD.toFixed(2)} USD</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base font-extrabold text-[#0A2A4D] pt-1 border-t border-slate-200">
                        <span>Total :</span>
                        <div className="text-right">
                          <div>${finalTotalUSD.toFixed(2)} USD</div>
                          <div className="text-xs text-[#D85A30] font-bold">
                            ≈ {finalTotalHTG.toLocaleString()} HTG
                          </div>
                        </div>
                      </div>
                    </div>

                    <a
                      href={handleGenerateOrderWhatsApp()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center space-x-2 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md transition"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Konfime Kòmand sou WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- TI FENÈT AFILYASYON POU ENFLIYANSÈ YO (Affiliate Window / Modal) --- */}
      <AnimatePresence>
        {isAffiliateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAffiliateModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-orange-100 text-[#D85A30]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#0A2A4D] text-lg">
                      Fenet Afilyasyon & Enfliyansè
                    </h3>
                    <p className="text-xs text-slate-500">
                      Kreye kòd pwomo pèsonalize w la pou touche komisyon
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAffiliateModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* How it works breakdown */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
                  <div className="flex items-center space-x-1.5 text-[#185FA5] font-bold text-xs mb-1">
                    <Percent className="w-3.5 h-3.5" />
                    <span>Pou Kliyan W Yo</span>
                  </div>
                  <p className="text-xs text-slate-700">
                    Yo jwenn <strong>10% rabè imedya</strong> sou nenpòt kòmand nan boutik la.
                  </p>
                </div>

                <div className="p-3 bg-orange-50/70 border border-orange-100 rounded-xl">
                  <div className="flex items-center space-x-1.5 text-[#D85A30] font-bold text-xs mb-1">
                    <Gift className="w-3.5 h-3.5" />
                    <span>Pou Ou Menm</span>
                  </div>
                  <p className="text-xs text-slate-700">
                    Ou touche <strong>10% a 15% komisyon</strong> an kach oswa MonCash sou chak vant !
                  </p>
                </div>
              </div>

              {/* Form to generate influencer promo code */}
              <form onSubmit={handleCreateAffiliateCode} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Non Ou oswa Non Paj Ou *
                  </label>
                  <input
                    type="text"
                    required
                    value={influencerName}
                    onChange={(e) => setInfluencerName(e.target.value)}
                    placeholder="Eg: Vanessa Lifestyle, Alex Kreyatè..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#185FA5] text-xs font-medium outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Platfòm Ou (Instagram, TikTok...)
                    </label>
                    <input
                      type="text"
                      value={influencerSocial}
                      onChange={(e) => setInfluencerSocial(e.target.value)}
                      placeholder="@non_ou sou TikTok / IG"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#185FA5] text-xs font-medium outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Kòd Pwomo Ou Swete Genyen *
                    </label>
                    <input
                      type="text"
                      required
                      value={influencerDesiredCode}
                      onChange={(e) => setInfluencerDesiredCode(e.target.value.toUpperCase())}
                      placeholder="Eg: ALEX509, POLYVIP..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#185FA5] text-xs font-bold uppercase outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Nimewo WhatsApp Ou Pou Resevwa Komisyon *
                  </label>
                  <input
                    type="tel"
                    required
                    value={influencerWhatsapp}
                    onChange={(e) => setInfluencerWhatsapp(e.target.value)}
                    placeholder="+509 41 61 3156"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#185FA5] text-xs font-medium outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0A2A4D] hover:bg-[#185FA5] text-white text-xs font-bold rounded-xl shadow-md transition"
                >
                  Jenere & Aktive Kòd Pwomo M Kounye a
                </button>
              </form>

              {/* Sample Active Codes List for immediate testing */}
              <div className="pt-2 border-t border-slate-100 space-y-2 text-left">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Kòd Pwomo Disponib Pou Eseye Kounye a :
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {activeAffiliateCodes.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => copyPromoToClipboard(item.code)}
                      className="flex items-center justify-between p-2 rounded-lg border border-slate-200 hover:border-[#D85A30] bg-[#FAF9F6] text-left transition group"
                    >
                      <div>
                        <span className="font-mono font-bold text-xs text-[#0A2A4D] block group-hover:text-[#D85A30]">
                          {item.code}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {item.influencerName}
                        </span>
                      </div>
                      <div className="text-[#D85A30]">
                        {copiedCode === item.code ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
