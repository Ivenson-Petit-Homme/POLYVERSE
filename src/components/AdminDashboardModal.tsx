import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { POLYVERSE_EXCHANGE_RATE } from '../data/polyverseData';
import { UserOrder } from '../types';
import {
  ShieldCheck,
  X,
  Package,
  Users,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  MessageCircle,
  LogOut,
  Search,
  Filter,
} from 'lucide-react';

export const AdminDashboardModal: React.FC = () => {
  const {
    currentUser,
    isAdmin,
    isAdminModalOpen,
    setIsAdminModalOpen,
    orders,
    updateOrderStatus,
    allUsers,
    logout,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'orders' | 'users'>('orders');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAdminModalOpen || !isAdmin) return null;

  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const totalRevenueUSD = orders.reduce((sum, o) => sum + (o.totalUSD || 0), 0);
  const totalRevenueHTG = Math.round(totalRevenueUSD * POLYVERSE_EXCHANGE_RATE);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusLabel = (status: UserOrder['status']) => {
    switch (status) {
      case 'pending':
        return { label: 'En attente', cls: 'bg-amber-50 text-amber-800 border-amber-300', icon: Clock };
      case 'confirmed':
        return { label: 'Confirmée', cls: 'bg-blue-50 text-[#185FA5] border-blue-300', icon: CheckCircle };
      case 'processing':
        return { label: 'En expédition', cls: 'bg-purple-50 text-purple-800 border-purple-300', icon: Truck };
      case 'delivered':
        return { label: 'Livrée', cls: 'bg-emerald-50 text-emerald-800 border-emerald-300', icon: CheckCircle };
      case 'cancelled':
        return { label: 'Annulée', cls: 'bg-red-50 text-red-800 border-red-300', icon: XCircle };
    }
  };

  const generateAdminClientWhatsApp = (order: UserOrder) => {
    const cleanPhone = order.userPhone.replace(/[^0-9]/g, '');
    let msg = `Bonjour ${order.userName}, ici l'administration Polyverse au sujet de votre commande *${order.id}*.\n`;
    msg += `Montant : $${order.totalUSD} USD (≈ ${order.totalHTG.toLocaleString()} HTG)\n`;
    msg += `Statut actuel : ${order.status.toUpperCase()}\n`;
    msg += `Nous restons disponibles pour finaliser votre livraison.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAdminModalOpen(false)}
          className="absolute inset-0 bg-black/70 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          className="relative bg-white max-w-5xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-stone-300 z-10"
        >
          {/* Top Admin Bar */}
          <div className="bg-[#0A2A4D] text-white px-6 py-5 flex items-center justify-between border-b border-white/15">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#D85A30] text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2
                  className="text-xl font-bold uppercase tracking-wide"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Tableau de Bord Administration Polyverse
                </h2>
                <p className="text-xs text-stone-300">
                  Connecté : <span className="font-semibold text-white">{currentUser?.email}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsAdminModalOpen(false);
                }}
                className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#D85A30] hover:bg-[#b84722] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Déconnexion</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(false)}
                className="p-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-200 bg-[#F4F3EF] border-b border-stone-200 text-xs">
            <div className="p-4">
              <span className="text-stone-500 uppercase tracking-wider text-[10px] font-bold block">
                Total Commandes
              </span>
              <span className="text-xl font-bold font-tabular text-[#0A2A4D]">{totalOrdersCount}</span>
            </div>

            <div className="p-4">
              <span className="text-stone-500 uppercase tracking-wider text-[10px] font-bold block">
                En Attente
              </span>
              <span className="text-xl font-bold font-tabular text-[#D85A30]">{pendingOrdersCount}</span>
            </div>

            <div className="p-4">
              <span className="text-stone-500 uppercase tracking-wider text-[10px] font-bold block">
                Chiffre d’Affaires
              </span>
              <span className="text-xl font-bold font-tabular text-[#141414]">
                ${totalRevenueUSD.toFixed(2)} USD
              </span>
              <span className="text-[11px] text-stone-500 block font-tabular">
                ≈ {totalRevenueHTG.toLocaleString()} HTG
              </span>
            </div>

            <div className="p-4">
              <span className="text-stone-500 uppercase tracking-wider text-[10px] font-bold block">
                Clients Inscrits
              </span>
              <span className="text-xl font-bold font-tabular text-emerald-700">{allUsers.length}</span>
            </div>
          </div>

          {/* Sub-Tabs */}
          <div className="flex border-b border-stone-200 px-6 bg-white space-x-6">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3.5 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'border-[#D85A30] text-[#0A2A4D]'
                  : 'border-transparent text-stone-500 hover:text-[#141414]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Commandes ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`py-3.5 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'users'
                  ? 'border-[#D85A30] text-[#0A2A4D]'
                  : 'border-transparent text-stone-500 hover:text-[#141414]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Clients ({allUsers.length})</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher par ID, nom, téléphone..."
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 focus:border-[#0A2A4D] outline-none"
                    />
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <Filter className="w-3.5 h-3.5 text-stone-500" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 text-xs border border-stone-300 bg-white font-semibold text-stone-700 outline-none"
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="pending">En attente</option>
                      <option value="confirmed">Confirmée</option>
                      <option value="processing">En expédition</option>
                      <option value="delivered">Livrée</option>
                      <option value="cancelled">Annulée</option>
                    </select>
                  </div>
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="p-12 text-center text-stone-500 bg-[#F4F3EF] border border-stone-200">
                    <Package className="w-8 h-8 mx-auto text-stone-400 mb-2" />
                    <p className="text-sm font-semibold">Aucune commande correspondante.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredOrders.map((ord) => {
                      const st = getStatusLabel(ord.status);
                      const StIcon = st.icon;
                      return (
                        <div key={ord.id} className="p-4 border border-stone-200 bg-white space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-2.5">
                            <div className="flex items-center space-x-2.5">
                              <span className="font-mono font-bold text-xs text-[#0A2A4D] bg-[#F4F3EF] border border-stone-300 px-2 py-0.5">
                                {ord.id}
                              </span>
                              <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                                {ord.orderType}
                              </span>
                              {ord.promoCode && (
                                <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-orange-50 border border-orange-300 text-[#D85A30]">
                                  Code : {ord.promoCode}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center space-x-2">
                              <span
                                className={`inline-flex items-center space-x-1 px-2.5 py-0.5 border text-[11px] font-bold uppercase ${st.cls}`}
                              >
                                <StIcon className="w-3 h-3" />
                                <span>{st.label}</span>
                              </span>
                              <span className="text-[11px] text-stone-400 font-tabular">
                                {new Date(ord.createdAt).toLocaleDateString('fr-FR', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                            <div className="bg-[#F4F3EF] p-3 border border-stone-200">
                              <p className="font-bold text-[#141414]">{ord.userName}</p>
                              <p className="text-stone-600 font-tabular">{ord.userPhone}</p>
                              <p className="text-stone-500 text-[11px] truncate">{ord.userEmail}</p>
                              <p className="text-stone-600 text-[11px] mt-1">
                                {ord.userAddress || 'Adresse non spécifiée'}
                              </p>
                            </div>

                            <div className="bg-[#F4F3EF] p-3 border border-stone-200 space-y-1">
                              <span className="font-bold text-stone-600 text-[10px] uppercase tracking-wider block">
                                Détails de la Commande
                              </span>
                              {ord.items && ord.items.length > 0 ? (
                                ord.items.map((it, i) => (
                                  <p key={i} className="text-stone-800">
                                    · {it.quantity}x {it.productName} {it.size && `(${it.size})`}{' '}
                                    {it.color && `[${it.color}]`}
                                  </p>
                                ))
                              ) : (
                                <p className="text-stone-800">
                                  Service : {ord.orderType}
                                  {ord.productUrl && (
                                    <a
                                      href={ord.productUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="block text-[#185FA5] underline text-[11px] truncate"
                                    >
                                      Lien du produit
                                    </a>
                                  )}
                                </p>
                              )}
                              {ord.notes && (
                                <p className="text-stone-500 text-[11px] italic mt-1">Note : {ord.notes}</p>
                              )}
                            </div>

                            <div className="bg-[#F4F3EF] p-3 border border-stone-200 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-center">
                                  <span className="text-stone-500">Paiement :</span>
                                  <span className="font-bold text-stone-800">{ord.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold font-tabular text-[#0A2A4D] mt-1">
                                  <span>Total :</span>
                                  <span>${ord.totalUSD} USD</span>
                                </div>
                                <div className="text-right text-[11px] font-tabular text-[#D85A30] font-bold">
                                  ≈ {ord.totalHTG.toLocaleString()} HTG
                                </div>
                              </div>

                              <a
                                href={generateAdminClientWhatsApp(ord)}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-2 py-2 px-3 bg-emerald-700 hover:bg-emerald-600 text-white text-center font-bold uppercase tracking-wider text-[11px] flex items-center justify-center space-x-1 transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Contacter sur WhatsApp</span>
                              </a>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between pt-2 border-t border-stone-200 text-xs gap-2">
                            <span className="text-stone-500 font-semibold text-[11px]">
                              Mettre à jour le statut :
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {(['pending', 'confirmed', 'processing', 'delivered', 'cancelled'] as const).map(
                                (statusKey) => (
                                  <button
                                    key={statusKey}
                                    type="button"
                                    onClick={() => updateOrderStatus(ord.id, statusKey)}
                                    className={`px-2.5 py-1 border text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                                      ord.status === statusKey
                                        ? 'bg-[#0A2A4D] text-white border-[#0A2A4D]'
                                        : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
                                    }`}
                                  >
                                    {statusKey === 'pending'
                                      ? 'En attente'
                                      : statusKey === 'confirmed'
                                      ? 'Confirmée'
                                      : statusKey === 'processing'
                                      ? 'En cours'
                                      : statusKey === 'delivered'
                                      ? 'Livrée'
                                      : 'Annulée'}
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-3">
                <h3
                  className="font-bold text-base uppercase text-[#0A2A4D]"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Liste des Clients Inscrits ({allUsers.length})
                </h3>

                {allUsers.length === 0 ? (
                  <div className="p-8 text-center text-stone-500 bg-[#F4F3EF] border border-stone-200">
                    Aucun client enregistré pour le moment.
                  </div>
                ) : (
                  <div className="divide-y divide-stone-200 border border-stone-200 bg-white">
                    {allUsers.map((u) => (
                      <div key={u.id} className="p-4 flex items-center justify-between hover:bg-[#F4F3EF]">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-sm text-[#141414]">{u.name}</span>
                            <span className="text-[10px] uppercase tracking-wider text-[#D85A30] font-bold">
                              {u.role === 'admin' ? 'Administrateur' : 'Client'}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 mt-0.5">
                            {u.email} · {u.phone}
                          </p>
                          {u.address && <p className="text-xs text-stone-500 mt-0.5">{u.address}</p>}
                        </div>

                        {u.phone && (
                          <a
                            href={`https://wa.me/${u.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 border border-stone-300 bg-white text-emerald-700 hover:bg-emerald-700 hover:text-white transition-colors"
                            title="Écrire sur WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
