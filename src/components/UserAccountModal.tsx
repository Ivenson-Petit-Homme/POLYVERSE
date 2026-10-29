import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { UserOrder } from '../types';
import {
  User,
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
  MessageCircle,
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

  const getStatusBadge = (status: UserOrder['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
            <Clock className="w-3 h-3" />
            <span>En attente de validation</span>
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
            <CheckCircle className="w-3 h-3" />
            <span>Commande Confirmée</span>
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800">
            <Truck className="w-3 h-3" />
            <span>En préparation / Shipping</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle className="w-3 h-3" />
            <span>Livrée avec succès</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-800">
            <XCircle className="w-3 h-3" />
            <span>Annulée</span>
          </span>
        );
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
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100 z-10"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0A2A4D] to-[#185FA5] text-white p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-black text-xl text-white">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-black">{currentUser.name}</h3>
                <p className="text-xs text-blue-200">{currentUser.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsAccountModalOpen(false);
                }}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Se Déconnecter</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAccountModalOpen(false)}
                className="p-1.5 text-white/80 hover:text-white rounded-lg transition cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* User Profile Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-black text-[#0A2A4D] uppercase tracking-wide">
                  Informations de Mon Compte
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs font-bold text-[#185FA5] hover:underline cursor-pointer"
                >
                  {isEditing ? 'Annuler' : 'Modifier mes informations'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Nom complet</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Téléphone / WhatsApp</label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Adresse de livraison</label>
                    <input
                      type="text"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#185FA5] text-white rounded-lg font-bold hover:bg-[#0A2A4D] transition cursor-pointer"
                  >
                    Enregistrer
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{currentUser.phone || 'Non précisé'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{currentUser.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{currentUser.address || 'Adresse à préciser'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Orders History */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <ShoppingBag className="w-4 h-4 text-[#D85A30]" />
                <h4 className="font-extrabold text-[#0A2A4D] text-sm">
                  Historique de Mes Commandes ({myOrders.length})
                </h4>
              </div>

              {myOrders.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-500 text-xs">
                  <Package className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                  <p className="font-semibold">Vous n'avez pas encore passé de commande.</p>
                  <p className="mt-1">Explorez notre boutique officielle ou nos services Achat Sans Carte pour commencer !</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {myOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2 text-xs"
                    >
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-[#0A2A4D] bg-slate-100 px-2 py-0.5 rounded">
                            {ord.id}
                          </span>
                          <span className="text-[11px] text-slate-500 capitalize">
                            {ord.orderType}
                          </span>
                        </div>
                        {getStatusBadge(ord.status)}
                      </div>

                      {/* Items */}
                      <div className="text-slate-700 space-y-1">
                        {ord.items && ord.items.length > 0 ? (
                          ord.items.map((it, idx) => (
                            <p key={idx}>
                              • {it.quantity}x {it.productName}{' '}
                              {it.size && `(${it.size})`} {it.color && `[${it.color}]`}
                            </p>
                          ))
                        ) : (
                          <p>Demande de service : {ord.orderType}</p>
                        )}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-100 font-bold text-slate-900">
                        <span>
                          Total : ${ord.totalUSD} USD (≈ {ord.totalHTG.toLocaleString()} HTG)
                        </span>
                        <span className="text-[11px] text-slate-500 font-normal">
                          Paiement : {ord.paymentMethod}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
