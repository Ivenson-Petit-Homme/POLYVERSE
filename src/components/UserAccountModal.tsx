import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { UserOrder } from '../types';
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  LogOut,
  X,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
} from 'lucide-react';

export const UserAccountModal: React.FC = () => {
  const {
    currentUser,
    isAccountModalOpen,
    setIsAccountModalOpen,
    getUserOrders,
    updateProfile,
    logout,
  } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editAddress, setEditAddress] = useState(currentUser?.address || '');

  if (!isAccountModalOpen || !currentUser) return null;

  const myOrders = getUserOrders();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      address: editAddress,
    });
    setIsEditing(false);
  };

  const getStatusLabel = (status: UserOrder['status']) => {
    switch (status) {
      case 'pending':
        return { label: 'En attente de validation', cls: 'bg-amber-50 text-amber-800 border-amber-300', icon: Clock };
      case 'confirmed':
        return { label: 'Commande confirmée', cls: 'bg-blue-50 text-[#185FA5] border-blue-300', icon: CheckCircle };
      case 'processing':
        return { label: 'En préparation / Shipping', cls: 'bg-purple-50 text-purple-800 border-purple-300', icon: Truck };
      case 'delivered':
        return { label: 'Livrée avec succès', cls: 'bg-emerald-50 text-emerald-800 border-emerald-300', icon: CheckCircle };
      case 'cancelled':
        return { label: 'Annulée', cls: 'bg-red-50 text-red-800 border-red-300', icon: XCircle };
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAccountModalOpen(false)}
          className="absolute inset-0 bg-black/65 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          className="relative bg-white max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-stone-300 z-10"
        >
          {/* Editorial Navy Header */}
          <div className="bg-[#0A2A4D] text-white p-6 flex justify-between items-center border-b border-white/15">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 bg-[#D85A30] flex items-center justify-center font-bold text-lg text-white">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3
                  className="text-xl font-bold uppercase tracking-wide"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {currentUser.name}
                </h3>
                <p className="text-xs text-stone-300">{currentUser.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsAccountModalOpen(false);
                }}
                className="flex items-center space-x-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Déconnexion</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAccountModalOpen(false)}
                className="p-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto space-y-6">
            {/* Profile Box */}
            <div className="p-5 border border-stone-200 bg-[#F4F3EF]">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-stone-300">
                <span className="text-xs font-bold text-[#0A2A4D] uppercase tracking-wider">
                  Informations de Mon Compte
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs font-bold uppercase tracking-wider text-[#D85A30] hover:underline cursor-pointer"
                >
                  {isEditing ? 'Annuler' : 'Modifier'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1 font-bold uppercase">Nom Complet</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1 font-bold uppercase">Téléphone / WhatsApp</label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1 font-bold uppercase">Adresse de Livraison</label>
                    <input
                      type="text"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 bg-white outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0A2A4D] text-white font-bold uppercase tracking-wider hover:bg-[#185FA5] transition-colors cursor-pointer"
                  >
                    Enregistrer
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-700">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-[#D85A30]" />
                    <span>{currentUser.phone || 'Non précisé'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-[#D85A30]" />
                    <span className="truncate">{currentUser.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D85A30]" />
                    <span className="truncate">{currentUser.address || 'Adresse à préciser'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Order History */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <ShoppingBag className="w-4 h-4 text-[#D85A30]" />
                <h4
                  className="font-bold uppercase text-[#141414] text-base"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Historique de Mes Commandes ({myOrders.length})
                </h4>
              </div>

              {myOrders.length === 0 ? (
                <div className="p-8 text-center bg-[#F4F3EF] border border-stone-200 text-stone-500 text-xs">
                  <Package className="w-8 h-8 mx-auto text-stone-400 mb-2" />
                  <p className="font-semibold">Vous n’avez pas encore passé de commande.</p>
                  <p className="mt-1">Parcourez notre boutique ou nos services Achat Sans Carte pour démarrer.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {myOrders.map((ord) => {
                    const st = getStatusLabel(ord.status);
                    const StIcon = st.icon;
                    return (
                      <div key={ord.id} className="p-4 border border-stone-200 bg-white space-y-2 text-xs">
                        <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold text-[#0A2A4D] bg-[#F4F3EF] border border-stone-300 px-2 py-0.5">
                              {ord.id}
                            </span>
                            <span className="text-[11px] font-bold uppercase text-stone-500">
                              {ord.orderType}
                            </span>
                          </div>
                          <span
                            className={`inline-flex items-center space-x-1 px-2.5 py-0.5 border text-[11px] font-bold uppercase ${st.cls}`}
                          >
                            <StIcon className="w-3 h-3" />
                            <span>{st.label}</span>
                          </span>
                        </div>

                        <div className="text-stone-700 space-y-1">
                          {ord.items && ord.items.length > 0 ? (
                            ord.items.map((it, idx) => (
                              <p key={idx}>
                                · {it.quantity}x {it.productName} {it.size && `(${it.size})`}{' '}
                                {it.color && `[${it.color}]`}
                              </p>
                            ))
                          ) : (
                            <p>Service commandé : {ord.orderType}</p>
                          )}
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-stone-200 font-bold font-tabular text-[#141414]">
                          <span>
                            Total : ${ord.totalUSD} USD (≈ {ord.totalHTG.toLocaleString()} HTG)
                          </span>
                          <span className="text-[11px] text-stone-500 font-normal font-sans">
                            Paiement : {ord.paymentMethod}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
