import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { UserOrder } from '../types';
import {
  ShieldCheck,
  X,
  Package,
  Users,
  Tag,
  DollarSign,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  MessageCircle,
  LogOut,
  ExternalLink,
  Plus,
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

  const [activeTab, setActiveTab] = useState<'orders' | 'users' | 'codes'>('orders');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAdminModalOpen || !isAdmin) return null;

  // Stats calculation
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const deliveredOrdersCount = orders.filter((o) => o.status === 'delivered').length;
  const totalRevenueUSD = orders.reduce((sum, o) => sum + (o.totalUSD || 0), 0);
  const totalRevenueHTG = Math.round(totalRevenueUSD * 150);

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: UserOrder['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
            <Clock className="w-3 h-3" />
            <span>En attente</span>
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
            <CheckCircle className="w-3 h-3" />
            <span>Confirmée</span>
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800">
            <Truck className="w-3 h-3" />
            <span>En traitement / Expédition</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle className="w-3 h-3" />
            <span>Livrée</span>
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

  const generateAdminClientWhatsApp = (order: UserOrder) => {
    const cleanPhone = order.userPhone.replace(/[^0-9]/g, '');
    let msg = `Bonjour ${order.userName}, ici l'administration de Polyverse au sujet de votre commande *${order.id}*.\n`;
    msg += `Montant: $${order.totalUSD} USD (≈ ${order.totalHTG.toLocaleString()} HTG)\n`;
    msg += `Statut actuel: ${order.status.toUpperCase()}\n`;
    msg += `Nous sommes à votre disposition pour la finalisation de votre livraison.`;
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
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative bg-white rounded-2xl max-w-5xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200 z-10"
        >
          {/* Top Admin Bar */}
          <div className="bg-[#0A2A4D] text-white px-6 py-4 flex items-center justify-between border-b border-blue-950">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-[#D85A30] text-white shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-black tracking-tight">Panneau d'Administration Polyverse</h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Accès Privilégié
                  </span>
                </div>
                <p className="text-xs text-blue-200">
                  Connecté en tant que : <span className="font-semibold text-white">{currentUser?.email}</span>
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
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Se Déconnecter</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white rounded-lg transition cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-slate-50 border-b border-slate-200 text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-slate-500 text-[11px] block font-medium">Total Commandes</span>
              <span className="text-lg font-black text-[#0A2A4D]">{totalOrdersCount}</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-slate-500 text-[11px] block font-medium">Commandes En Attente</span>
              <span className="text-lg font-black text-amber-600">{pendingOrdersCount}</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-slate-500 text-[11px] block font-medium">Chiffre d'Affaires</span>
              <span className="text-lg font-black text-[#185FA5]">${totalRevenueUSD.toFixed(2)} USD</span>
              <span className="text-[10px] text-slate-400 block font-semibold">≈ {totalRevenueHTG.toLocaleString()} HTG</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-slate-500 text-[11px] block font-medium">Clients Inscrits</span>
              <span className="text-lg font-black text-emerald-600">{allUsers.length}</span>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex border-b border-slate-200 px-6 pt-3 bg-white space-x-4">
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3 text-xs font-bold flex items-center space-x-1.5 border-b-2 transition cursor-pointer ${
                activeTab === 'orders'
                  ? 'border-[#185FA5] text-[#185FA5]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Gestion des Commandes ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`pb-3 text-xs font-bold flex items-center space-x-1.5 border-b-2 transition cursor-pointer ${
                activeTab === 'users'
                  ? 'border-[#185FA5] text-[#185FA5]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Clients Inscrits ({allUsers.length})</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {/* Search & Status Filter */}
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher par ID, nom, téléphone..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#185FA5]"
                    />
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <Filter className="w-3.5 h-3.5 text-slate-500" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700"
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="pending">En attente seulement</option>
                      <option value="confirmed">Confirmée</option>
                      <option value="processing">En traitement / Expédition</option>
                      <option value="delivered">Livrée</option>
                      <option value="cancelled">Annulée</option>
                    </select>
                  </div>
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <Package className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                    <p className="text-sm font-semibold">Aucune commande correspondante.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredOrders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white shadow-2xs space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold text-xs text-[#0A2A4D] bg-slate-100 px-2 py-0.5 rounded">
                              {ord.id}
                            </span>
                            <span className="text-[11px] font-bold text-slate-500 uppercase">
                              {ord.orderType}
                            </span>
                            {ord.promoCode && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-orange-100 text-[#D85A30]">
                                Code : {ord.promoCode}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            {getStatusBadge(ord.status)}
                            <span className="text-[11px] text-slate-400">
                              {new Date(ord.createdAt).toLocaleDateString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Order Details Body */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          {/* Client Info */}
                          <div className="bg-slate-50/70 p-2.5 rounded-lg">
                            <p className="font-bold text-[#0A2A4D]">{ord.userName}</p>
                            <p className="text-slate-600">{ord.userPhone}</p>
                            <p className="text-slate-500 text-[11px] truncate">{ord.userEmail}</p>
                            <p className="text-slate-500 text-[11px] mt-1 italic">
                              📍 {ord.userAddress || 'Adresse non spécifiée'}
                            </p>
                          </div>

                          {/* Items / Content */}
                          <div className="bg-slate-50/70 p-2.5 rounded-lg space-y-1">
                            <span className="font-bold text-slate-600 text-[11px] uppercase block">
                              Détails de la Commande :
                            </span>
                            {ord.items && ord.items.length > 0 ? (
                              ord.items.map((it, i) => (
                                <p key={i} className="text-slate-700">
                                 • {it.quantity}x {it.productName}{' '}
                                  {it.size && `(${it.size})`} {it.color && `[${it.color}]`}
                                </p>
                              ))
                            ) : (
                              <p className="text-slate-700">
                                Demande de service : {ord.orderType}
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
                              <p className="text-slate-500 text-[11px] italic mt-1">
                                Note : {ord.notes}
                              </p>
                            )}
                          </div>

                          {/* Price & Action */}
                          <div className="bg-slate-50/70 p-2.5 rounded-lg flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-center">
                                <span className="text-slate-500">Paiement :</span>
                                <span className="font-bold text-slate-700">{ord.paymentMethod}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm font-black text-[#0A2A4D] mt-1">
                                <span>Total :</span>
                                <span>${ord.totalUSD} USD</span>
                              </div>
                              <div className="text-right text-[11px] text-[#D85A30] font-bold">
                                ≈ {ord.totalHTG.toLocaleString()} HTG
                              </div>
                            </div>

                            <div className="pt-2 flex items-center gap-2">
                              {/* WhatsApp Contact button */}
                              <a
                                href={generateAdminClientWhatsApp(ord)}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-center font-bold text-[11px] flex items-center justify-center space-x-1 transition cursor-pointer"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Contacter sur WhatsApp</span>
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Status Change Control */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                          <span className="text-slate-500 font-semibold text-[11px]">
                            Mettre à jour le statut de la commande :
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {(['pending', 'confirmed', 'processing', 'delivered', 'cancelled'] as const).map(
                              (st) => (
                                <button
                                  key={st}
                                  type="button"
                                  onClick={() => updateOrderStatus(ord.id, st)}
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                                    ord.status === st
                                      ? 'bg-[#0A2A4D] text-white'
                                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                  }`}
                                >
                                  {st === 'pending'
                                    ? 'En attente'
                                    : st === 'confirmed'
                                    ? 'Confirmée'
                                    : st === 'processing'
                                    ? 'En cours'
                                    : st === 'delivered'
                                    ? 'Livrée'
                                    : 'Annulée'}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* USERS TAB */}
            {activeTab === 'users' && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-[#0A2A4D]">
                  Liste des clients inscrits sur la plateforme ({allUsers.length})
                </h3>

                {allUsers.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-xl">
                    Aucun client enregistré pour le moment.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                    {allUsers.map((u) => (
                      <div key={u.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-sm text-[#0A2A4D]">{u.name}</span>
                            <span className="text-[10px] bg-blue-50 text-[#185FA5] px-2 py-0.5 rounded-full font-bold">
                              {u.role === 'admin' ? 'Administrateur' : 'Client'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{u.email} • {u.phone}</p>
                          {u.address && (
                            <p className="text-xs text-slate-400 mt-0.5">📍 {u.address}</p>
                          )}
                        </div>

                        {u.phone && (
                          <a
                            href={`https://wa.me/${u.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition"
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
