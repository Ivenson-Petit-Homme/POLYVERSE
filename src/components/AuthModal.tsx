import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  X,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    register,
    adminEmail,
  } = useAuth();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await login(loginEmail, loginPassword);
      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        setSuccessMsg(res.message);
      }
    } catch {
      setErrorMsg('Erreur lors de la connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await register({
        name: regName,
        email: regEmail,
        phone: regPhone,
        address: regAddress,
        password: regPassword,
      });

      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        setSuccessMsg(res.message);
      }
    } catch {
      setErrorMsg('Erreur lors de la création du compte. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdminLogin = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);
    setLoginEmail(adminEmail || 'admin@polyverse.com');
    setLoginPassword('PolyverseAdmin2026!');
    try {
      const res = await login('admin@polyverse.com', 'PolyverseAdmin2026!');
      if (!res.success) {
        setErrorMsg(res.message);
      }
    } catch {
      setErrorMsg('Erreur lors de la connexion rapide.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute inset-0 bg-black/65 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          className="relative bg-white max-w-md w-full shadow-2xl overflow-hidden border border-stone-300 z-10"
        >
          {/* Editorial Navy Header */}
          <div className="bg-[#0A2A4D] p-6 text-white relative">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-[#E87048]" />
              <span className="text-[11px] uppercase tracking-[0.16em] font-bold text-[#E87048]">
                Espace Membre &amp; Administration
              </span>
            </div>

            <h3
              className="text-2xl font-bold uppercase tracking-wide"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {authModalMode === 'login' ? 'Connexion à Polyverse' : 'Créer un Compte Client'}
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              {authModalMode === 'login'
                ? 'Accédez à votre espace client, suivez vos commandes ou accédez au tableau de bord administrateur.'
                : 'Créez un compte pour valider vos commandes, achats sans carte et suivis de colis.'}
            </p>
          </div>

          {/* Sharp Switcher Tabs */}
          <div className="grid grid-cols-2 border-b border-stone-200 bg-[#F4F3EF]">
            <button
              type="button"
              onClick={() => {
                setAuthModalMode('login');
                setErrorMsg('');
              }}
              className={`py-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                authModalMode === 'login' ? 'bg-white text-[#0A2A4D]' : 'text-stone-600 hover:text-[#141414]'
              }`}
            >
              Se Connecter
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthModalMode('register');
                setErrorMsg('');
              }}
              className={`py-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                authModalMode === 'register' ? 'bg-white text-[#D85A30]' : 'text-stone-600 hover:text-[#141414]'
              }`}
            >
              Créer un Compte
            </button>
          </div>

          <div className="p-6">
            {authModalMode === 'login' && (
              <div className="mb-5 p-3.5 bg-[#F4F3EF] border border-stone-300 flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-[#D85A30] shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase text-[#141414]">Accès Administrateur</p>
                    <p className="text-[11px] text-stone-600">Ouverture directe de la gestion</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleQuickAdminLogin}
                  disabled={loading}
                  className="px-3.5 py-2 bg-[#0A2A4D] hover:bg-[#185FA5] text-white font-bold uppercase tracking-wider text-[11px] transition-colors cursor-pointer shrink-0"
                >
                  Entrer Admin
                </button>
              </div>
            )}

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-700" />
                <span>{successMsg}</span>
              </div>
            )}

            {authModalMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Adresse E-mail *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="client@exemple.com ou admin@polyverse.com"
                      className="w-full pl-9 pr-3 py-2.5 text-xs border border-stone-300 focus:border-[#0A2A4D] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Mot de Passe *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 text-xs border border-stone-300 focus:border-[#0A2A4D] outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#0A2A4D] hover:bg-[#185FA5] text-white text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {loading ? (
                    <span>Connexion en cours...</span>
                  ) : (
                    <>
                      <span>Se Connecter</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-stone-500 text-center pt-1">
                  Compte Administrateur : <span className="font-semibold text-stone-800">admin@polyverse.com</span>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Nom et Prénom *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Ex : Jean-Baptiste Moïse"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 focus:border-[#0A2A4D] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Adresse E-mail *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="votre-email@exemple.com"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 focus:border-[#0A2A4D] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Téléphone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+509 37XX-XXXX"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 focus:border-[#0A2A4D] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Adresse de Livraison
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={regAddress}
                      onChange={(e) => setRegAddress(e.target.value)}
                      placeholder="Ex : Caracol, Cap-Haïtien..."
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 focus:border-[#0A2A4D] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Mot de Passe (6 caractères min.) *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 focus:border-[#0A2A4D] outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#D85A30] hover:bg-[#b84722] text-white text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 mt-2"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {loading ? (
                    <span>Création du compte...</span>
                  ) : (
                    <>
                      <span>Créer Mon Compte</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
