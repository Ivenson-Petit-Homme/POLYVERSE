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
  Sparkles,
  ShoppingBag,
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

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // UI state
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
      setErrorMsg('Erè pandan koneksyon an. Tanpri reye ankò.');
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
      setErrorMsg('Erè pandan kreyasyon kont lan. Tanpri reye ankò.');
    } finally {
      setLoading(false);
    }
  };

  const fillAdminCredentials = () => {
    setLoginEmail(adminEmail);
    // Suggest the env password placeholder
    setLoginPassword('PolyverseAdmin2026!');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 z-10"
        >
          {/* Header banner */}
          <div className="bg-gradient-to-r from-[#0A2A4D] via-[#185FA5] to-[#D85A30] p-6 text-white relative">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              aria-label="Fèmen"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2.5 mb-2">
              <div className="p-2 rounded-xl bg-white/15 backdrop-blur-xs">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-orange-200">
                Espace Client & Sécurité
              </span>
            </div>

            <h3 className="text-xl font-black tracking-tight">
              {authModalMode === 'login' ? 'Koneksyon sou Polyverse' : 'Kreye Kont Kliyan ou'}
            </h3>
            <p className="text-xs text-blue-100 mt-1">
              {authModalMode === 'login'
                ? 'Konekte pou valide acha w, swiv kòmand ou, oswa jere administrasyon an.'
                : 'Yon kont nesesè pou pase kòmand, valide acha san kat, ak benefisye pwomosyon.'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50/70 p-1">
            <button
              type="button"
              onClick={() => {
                setAuthModalMode('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                authModalMode === 'login'
                  ? 'bg-white text-[#0A2A4D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mwen gen yon kont (Konekte)
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthModalMode('register');
                setErrorMsg('');
              }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                authModalMode === 'register'
                  ? 'bg-white text-[#D85A30] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Nouvo Kliyan (Kreye kont)
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {/* Alerts */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* LOGIN FORM */}
            {authModalMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Imel (oswa Imel Administratè) *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Eg: client@gmail.com oswa admin..."
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Modpas *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Modpas ou"
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#185FA5] hover:bg-[#0A2A4D] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Verifikasyon...</span>
                  ) : (
                    <>
                      <span>Konekte sou Polyverse</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Helpful Admin Access Shortcut Info */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D85A30]" />
                      <span>Koneksyon Administratè (.env) :</span>
                    </span>
                    <button
                      type="button"
                      onClick={fillAdminCredentials}
                      className="text-[#185FA5] hover:underline font-bold text-[10px]"
                    >
                      Pre-ranpli kòm Admin
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Non ak Prenon *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Eg: Jean-Baptiste Moïse"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#D85A30] focus:ring-2 focus:ring-orange-100 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Imel *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="imel@egzanp.com"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#D85A30] focus:ring-2 focus:ring-orange-100 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Telefòn / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+509 37XX-XXXX oswa WhatsApp"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#D85A30] focus:ring-2 focus:ring-orange-100 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Adrès pou livrezon (Vil, Ri)
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={regAddress}
                      onChange={(e) => setRegAddress(e.target.value)}
                      placeholder="Eg: Caracol, Cap-Haïtien, Port-au-Prince..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#D85A30] focus:ring-2 focus:ring-orange-100 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kreye yon Modpas (omwen 6 karaktè) *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#D85A30] focus:ring-2 focus:ring-orange-100 outline-none transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#D85A30] hover:bg-[#bf4821] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {loading ? (
                    <span>Kreyasyon kont...</span>
                  ) : (
                    <>
                      <span>Kreye Kont Mwen & Valide Acha</span>
                      <Sparkles className="w-4 h-4" />
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
