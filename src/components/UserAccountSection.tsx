import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { NavigationTab, UserOrder } from '../types';
import { POLYVERSE_INFO } from '../data/polyverseData';
import aboutTeamImg from '../assets/images/about_visionary_team_1789429536653.jpg';
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  LogOut,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  Edit3,
} from 'lucide-react';

interface UserAccountSectionProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const UserAccountSection: React.FC<UserAccountSectionProps> = ({ setActiveTab }) => {
  const { currentUser, getUserOrders, updateProfile, logout } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editAddress, setEditAddress] = useState(currentUser?.address || '');
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setActiveTab('auth');
    } else {
      setEditName(currentUser.name || '');
      setEditPhone(currentUser.phone || '');
      setEditAddress(currentUser.address || '');
    }
  }, [currentUser, setActiveTab]);

  if (!currentUser) return null;

  const myOrders = getUserOrders();
  const totalSpentUSD = myOrders.reduce((sum, o) => sum + (o.totalUSD || 0), 0);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      address: editAddress,
    });
    setIsEditing(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const getStatusLabel = (status: UserOrder['status']) => {
    switch (status) {
      case 'pending':
        return { label: 'En attente de validation', cls: 'bg-amber-50 text-amber-800 border-amber-300', icon: Clock };
      case 'confirmed':
        return { label: 'Commande confirmée', cls: 'bg-blue-50 text-[#185FA5] border-blue-300', icon: CheckCircle };
      case 'processing':
        return { label: 'En préparation / Expédition', cls: 'bg-purple-50 text-purple-800 border-purple-300', icon: Truck };
      case 'delivered':
        return { label: 'Livrée avec succès', cls: 'bg-emerald-50 text-emerald-800 border-emerald-300', icon: CheckCircle };
      case 'cancelled':
        return { label: 'Annulée', cls: 'bg-red-50 text-red-800 border-red-300', icon: XCircle };
    }
  };

  return (
    <div className="bg-white text-[#141414]">
      {/* 1. FULL-BLEED EDITORIAL HERO (WWF.FR STYLE) */}
      <section className="relative bg-[#08101C] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={aboutTeamImg}
            alt="Espace Client Polyverse"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08101C]/95 via-[#0A2A4D]/85 to-[#08101C]/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E87048] block">
              Espace Client Personnel · Polyverse
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-[56px] font-bold uppercase leading-[1.0] text-white"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Bienvenue, {currentUser.name}
            </h1>
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
              Consultez l’historique de vos commandes, mettez à jour vos coordonnées de livraison et accédez rapidement à vos services favoris.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('order-service')}
              className="px-5 py-3.5 bg-[#D85A30] hover:bg-[#b84722] text-white text-sm font-bold uppercase tracking-wider transition-colors flex items-center space-x-2 cursor-pointer"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <span>Nouvelle Commande</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                logout();
                setActiveTab('home');
              }}
              className="px-5 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white text-sm font-bold uppercase tracking-wider transition-colors flex items-center space-x-2 cursor-pointer"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <LogOut className="w-4 h-4" />
              <span>Se Déconnecter</span>
            </button>
          </div>
        </div>

        {/* Bottom Unboxed Summary Strip */}
        <div className="relative z-10 bg-[#F4F3EF] border-t border-b border-stone-200 text-[#141414]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
            <div className="p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                Commandes Enregistrées
              </span>
              <span className="text-2xl font-bold font-tabular text-[#0A2A4D]">{myOrders.length}</span>
            </div>
            <div className="p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                Volume Total Cumulé
              </span>
              <span className="text-2xl font-bold font-tabular text-[#D85A30]">${totalSpentUSD.toFixed(2)} USD</span>
            </div>
            <div className="p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                Compte Enregistré
              </span>
              <span className="text-sm font-bold text-[#141414] truncate block mt-1">{currentUser.email}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROFILE + ORDERS HISTORY WORKSPACE */}
      <section className="bg-[#F4F3EF] py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Profile Info */}
          <div className="lg:col-span-4 bg-white border border-stone-200 p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h2
                className="text-xl font-bold uppercase text-[#141414]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Mes Coordonnées
              </h2>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs font-bold uppercase tracking-wider text-[#D85A30] hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Annuler' : 'Modifier'}</span>
              </button>
            </div>

            {savedToast && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 font-semibold">
                Profil mis à jour avec succès.
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-bold uppercase tracking-wider mb-1">
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-stone-300 bg-white outline-none focus:border-[#0A2A4D]"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold uppercase tracking-wider mb-1">
                    Téléphone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-stone-300 bg-white outline-none focus:border-[#0A2A4D]"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold uppercase tracking-wider mb-1">
                    Adresse de Livraison
                  </label>
                  <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-stone-300 bg-white outline-none focus:border-[#0A2A4D]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#0A2A4D] hover:bg-[#185FA5] text-white font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Enregistrer les Modifications
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-sm text-stone-700">
                <div className="flex items-start space-x-3 border-b border-stone-100 pb-3">
                  <Phone className="w-4 h-4 text-[#D85A30] shrink-0 mt-1" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      Téléphone / WhatsApp
                    </span>
                    <span className="font-semibold">{currentUser.phone || 'Non précisé'}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3 border-b border-stone-100 pb-3">
                  <Mail className="w-4 h-4 text-[#D85A30] shrink-0 mt-1" />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      Adresse E-mail
                    </span>
                    <span className="font-semibold break-all">{currentUser.email}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#D85A30] shrink-0 mt-1" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      Adresse de Livraison en Haïti
                    </span>
                    <span className="font-semibold">{currentUser.address || 'À compléter pour vos livraisons'}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-stone-200 space-y-2">
              <button
                type="button"
                onClick={() => setActiveTab('shop')}
                className="w-full py-3 bg-[#F4F3EF] hover:bg-stone-200 border border-stone-300 text-[#141414] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Accéder à la Boutique
              </button>
              <a
                href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Support WhatsApp Client</span>
              </a>
            </div>
          </div>

          {/* Right Column: Orders Ledger */}
          <div className="lg:col-span-8 bg-white border border-stone-200 p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-4 gap-3">
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="w-5 h-5 text-[#D85A30]" />
                <h2
                  className="text-2xl font-bold uppercase text-[#141414]"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Historique de Mes Commandes ({myOrders.length})
                </h2>
              </div>
            </div>

            {myOrders.length === 0 ? (
              <div className="p-12 text-center bg-[#F4F3EF] border border-stone-200 space-y-4">
                <Package className="w-10 h-10 mx-auto text-stone-400" />
                <div className="space-y-1">
                  <p
                    className="text-lg font-bold uppercase text-[#141414]"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Aucune commande enregistrée
                  </p>
                  <p className="text-xs text-stone-600 max-w-md mx-auto">
                    Explorez la Boutique Polyverse ou lancez une demande d’Achat Sans Carte ou Shipping Miami dès maintenant.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('order-service')}
                  className="px-6 py-3 bg-[#D85A30] hover:bg-[#b84722] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Passer Ma Première Commande
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myOrders.map((ord) => {
                  const st = getStatusLabel(ord.status);
                  const StIcon = st.icon;
                  return (
                    <div key={ord.id} className="p-5 border border-stone-200 bg-[#FAF9F6] space-y-3">
                      <div className="flex flex-wrap justify-between items-center border-b border-stone-200 pb-3 gap-2">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono font-bold text-xs text-[#0A2A4D] bg-white border border-stone-300 px-2.5 py-1">
                            {ord.id}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                            {ord.orderType}
                          </span>
                        </div>
                        <span
                          className={`inline-flex items-center space-x-1.5 px-3 py-1 border text-[11px] font-bold uppercase ${st.cls}`}
                        >
                          <StIcon className="w-3.5 h-3.5" />
                          <span>{st.label}</span>
                        </span>
                      </div>

                      <div className="text-xs text-stone-700 space-y-1">
                        {ord.items && ord.items.length > 0 ? (
                          ord.items.map((it, idx) => (
                            <p key={idx} className="font-medium">
                              · {it.quantity}x {it.productName} {it.size && `(${it.size})`}{' '}
                              {it.color && `[${it.color}]`}
                            </p>
                          ))
                        ) : (
                          <p className="font-medium">Prestation commandée : {ord.orderType}</p>
                        )}
                        {ord.notes && <p className="text-stone-500 italic">{ord.notes}</p>}
                      </div>

                      <div className="flex flex-wrap justify-between items-center pt-3 border-t border-stone-200 gap-2 text-xs">
                        <div className="font-bold font-tabular text-[#141414]">
                          Total : ${ord.totalUSD} USD (≈ {ord.totalHTG.toLocaleString()} HTG)
                        </div>
                        <div className="text-stone-500">
                          Paiement : <strong className="text-stone-800">{ord.paymentMethod}</strong> ·{' '}
                          {new Date(ord.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
