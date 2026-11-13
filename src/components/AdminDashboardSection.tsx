import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { POLYVERSE_EXCHANGE_RATE } from '../data/polyverseData';
import { NavigationTab, UserOrder } from '../types';
import webTechStudioImg from '../assets/images/web_tech_studio_1791841815443.jpg';
import {
  ShieldCheck,
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

interface AdminDashboardSectionProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const AdminDashboardSection: React.FC<AdminDashboardSectionProps> = ({ setActiveTab }) => {
  const { currentUser, isAdmin, orders, updateOrderStatus, allUsers, logout } = useAuth();

  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'users'>('orders');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!currentUser || !isAdmin) {
      setActiveTab('auth');
    }
  }, [currentUser, isAdmin, setActiveTab]);

  if (!currentUser || !isAdmin) return null;

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
    <div className="bg-white text-[#141414]">
      {/* 1. FULL-BLEED EDITORIAL ADMIN HERO */}
      <section className="relative bg-[#08101C] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={webTechStudioImg}
            alt="Administration et Direction Polyverse"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08101C]/95 via-[#0A2A4D]/85 to-[#08101C]/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2 text-[#E87048]">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-[0.18em]">
                Direction &amp; Exploitation Polyverse
              </span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold uppercase leading-[1.0] text-white"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Tableau de Bord Administrateur
            </h1>
            <p className="text-sm text-stone-200">
              Session active : <strong className="text-white">{currentUser.email}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              logout();
              setActiveTab('home');
            }}
            className="px-5 py-3.5 bg-[#D85A30] hover:bg-[#b84722] text-white text-sm font-bold uppercase tracking-wider transition-colors flex items-center space-x-2 cursor-pointer self-start lg:self-auto"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion Direction</span>
          </button>
        </div>

        {/* 4-Column Architectural KPI Strip */}
        <div className="relative z-10 bg-[#F4F3EF] border-t border-b border-stone-200 text-[#141414]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
            <div className="p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                Total Commandes
              </span>
              <span className="text-3xl font-bold font-tabular text-[#0A2A4D]">{totalOrdersCount}</span>
            </div>
            <div className="p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                En Attente
              </span>
              <span className="text-3xl font-bold font-tabular text-[#D85A30]">{pendingOrdersCount}</span>
            </div>
            <div className="p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                Chiffre d’Affaires (USD / HTG)
              </span>
              <span className="text-2xl font-bold font-tabular text-[#141414] block">
                ${totalRevenueUSD.toFixed(2)} USD
              </span>
              <span className="text-xs font-tabular text-stone-600">
                ≈ {totalRevenueHTG.toLocaleString()} HTG (Taux 140)
              </span>
            </div>
            <div className="p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                Clients Inscrits
              </span>
              <span className="text-3xl font-bold font-tabular text-emerald-700">{allUsers.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MANAGEMENT WORKSPACE */}
      <section className="bg-[#F4F3EF] py-12 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto bg-white border border-stone-200">
          {/* Sub-Tabs */}
          <div className="flex border-b border-stone-200 bg-[#FAF9F6]">
            <button
              type="button"
              onClick={() => setActiveSubTab('orders')}
              className={`px-6 py-4 text-sm font-bold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-colors cursor-pointer ${
                activeSubTab === 'orders'
                  ? 'border-[#D85A30] bg-white text-[#0A2A4D]'
                  : 'border-transparent text-stone-500 hover:text-[#141414]'
              }`}
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <Package className="w-4 h-4" />
              <span>Gestion des Commandes ({orders.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('users')}
              className={`px-6 py-4 text-sm font-bold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-colors cursor-pointer ${
                activeSubTab === 'users'
                  ? 'border-[#D85A30] bg-white text-[#0A2A4D]'
                  : 'border-transparent text-stone-500 hover:text-[#141414]'
              }`}
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <Users className="w-4 h-4" />
              <span>Clients Inscrits ({allUsers.length})</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {activeSubTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher par ID, nom, téléphone..."
                      className="w-full pl-10 pr-4 py-2.5 text-xs border border-stone-300 focus:border-[#0A2A4D] outline-none"
                    />
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <Filter className="w-4 h-4 text-stone-500" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2.5 text-xs border border-stone-300 bg-white font-semibold text-stone-700 outline-none"
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
                  <div className="space-y-4">
                    {filteredOrders.map((ord) => {
                      const st = getStatusLabel(ord.status);
                      const StIcon = st.icon;
                      return (
                        <div key={ord.id} className="p-5 border border-stone-200 bg-white space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className="font-mono font-bold text-xs text-[#0A2A4D] bg-[#F4F3EF] border border-stone-300 px-2.5 py-1">
                                {ord.id}
                              </span>
                              <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                                {ord.orderType}
                              </span>
                              {ord.promoCode && (
                                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase bg-orange-50 border border-orange-300 text-[#D85A30]">
                                  Code : {ord.promoCode}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center space-x-3">
                              <span
                                className={`inline-flex items-center space-x-1 px-2.5 py-0.5 border text-[11px] font-bold uppercase ${st.cls}`}
                              >
                                <StIcon className="w-3 h-3" />
                                <span>{st.label}</span>
                              </span>
                              <span className="text-[11px] text-stone-500 font-tabular">
                                {new Date(ord.createdAt).toLocaleDateString('fr-FR', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                            <div className="bg-[#F4F3EF] p-3.5 border border-stone-200 space-y-1">
                              <p className="font-bold text-[#141414]">{ord.userName}</p>
                              <p className="text-stone-700 font-tabular">{ord.userPhone}</p>
                              <p className="text-stone-500 truncate">{ord.userEmail}</p>
                              <p className="text-stone-600 pt-1">{ord.userAddress || 'Adresse non spécifiée'}</p>
                            </div>

                            <div className="bg-[#F4F3EF] p-3.5 border border-stone-200 space-y-1">
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
                                      className="block text-[#185FA5] underline truncate mt-1"
                                    >
                                      Lien du panier / produit
                                    </a>
                                  )}
                                </p>
                              )}
                              {ord.notes && <p className="text-stone-500 italic pt-1">Note : {ord.notes}</p>}
                            </div>

                            <div className="bg-[#F4F3EF] p-3.5 border border-stone-200 flex flex-col justify-between">
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
                                className="mt-3 py-2 px-3 bg-emerald-700 hover:bg-emerald-600 text-white text-center font-bold uppercase tracking-wider text-[11px] flex items-center justify-center space-x-1.5 transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Contacter sur WhatsApp</span>
                              </a>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between pt-2 border-t border-stone-200 text-xs gap-2">
                            <span className="text-stone-500 font-semibold text-[11px] uppercase tracking-wider">
                              Mettre à jour le statut :
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {(['pending', 'confirmed', 'processing', 'delivered', 'cancelled'] as const).map(
                                (statusKey) => (
                                  <button
                                    key={statusKey}
                                    type="button"
                                    onClick={() => updateOrderStatus(ord.id, statusKey)}
                                    className={`px-3 py-1 border text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
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

            {activeSubTab === 'users' && (
              <div className="space-y-4">
                <h3
                  className="font-bold text-xl uppercase text-[#0A2A4D]"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Liste des Clients Inscrits ({allUsers.length})
                </h3>

                {allUsers.length === 0 ? (
                  <div className="p-10 text-center text-stone-500 bg-[#F4F3EF] border border-stone-200">
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
        </div>
      </section>
    </div>
  );
};
