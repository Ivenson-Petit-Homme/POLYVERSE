import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { POLYVERSE_INFO } from '../data/polyverseData';
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
  Eye,
  EyeOff,
  MessageCircle,
} from 'lucide-react';

const REMEMBERED_EMAIL_KEY = 'polyverse_remembered_email';

const BRICK_WALL_SVG_PATTERN = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60">
    <rect width="120" height="60" fill="#051326"/>
    <rect x="2" y="2" width="56" height="26" fill="#0A2A4D"/>
    <rect x="2" y="2" width="56" height="2" fill="#185FA5" fill-opacity="0.22"/>
    <rect x="62" y="2" width="56" height="26" fill="#092341"/>
    <rect x="62" y="2" width="56" height="2" fill="#185FA5" fill-opacity="0.18"/>
    <rect x="-28" y="32" width="56" height="26" fill="#092341"/>
    <rect x="-28" y="32" width="56" height="2" fill="#185FA5" fill-opacity="0.18"/>
    <rect x="32" y="32" width="56" height="26" fill="#0B2E54"/>
    <rect x="32" y="32" width="56" height="2" fill="#185FA5" fill-opacity="0.24"/>
    <rect x="92" y="32" width="56" height="26" fill="#08203B"/>
    <rect x="92" y="32" width="56" height="2" fill="#185FA5" fill-opacity="0.16"/>
  </svg>`
);

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

  const [loginEmail, setLoginEmail] = useState(() => {
    try {
      return localStorage.getItem(REMEMBERED_EMAIL_KEY) || '';
    } catch {
      return '';
    }
  });
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(() => {
    try {
      return Boolean(localStorage.getItem(REMEMBERED_EMAIL_KEY));
    } catch {
      return true;
    }
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showForgotHelp, setShowForgotHelp] = useState(false);

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
      if (rememberMe && loginEmail.trim()) {
        localStorage.setItem(REMEMBERED_EMAIL_KEY, loginEmail.trim());
      } else {
        localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      }

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
        localStorage.setItem(REMEMBERED_EMAIL_KEY, regEmail.trim());
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthModalOpen(false)}
          className="fixed inset-0 bg-[#040B16]/85 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="relative max-w-md w-full rounded-2xl overflow-hidden border border-[#185FA5]/50 shadow-[0_28px_70px_rgba(0,0,0,0.85)] z-10 text-white"
          style={{
            backgroundImage: `url("data:image/svg+xml,${BRICK_WALL_SVG_PATTERN}")`,
            backgroundSize: '120px 60px',
          }}
        >
          {/* Overhead Warm Spotlight Halo inside Modal */}
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full h-56"
            style={{
              background:
                'radial-gradient(ellipse 68% 60% at 50% 0%, rgba(255, 241, 218, 0.72) 0%, rgba(232, 112, 72, 0.35) 40%, rgba(10, 42, 77, 0) 100%)',
            }}
          />

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-3.5 right-3.5 z-20 p-1.5 rounded-full bg-[#08101C]/70 text-stone-200 hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Compact Overhead Sconce Fixture */}
          <div className="relative z-10 flex flex-col items-center pt-3">
            <div className="w-24 h-4 bg-[#08101C] border border-[#185FA5]/50 shadow-md" />
            <div className="w-20 h-1 bg-gradient-to-r from-[#E87048] via-[#FFF6E5] to-[#E87048] shadow-[0_4px_20px_6px_rgba(232,112,72,0.75)]" />
          </div>

          <div className="relative z-10 p-5 sm:p-6">
            {/* Frosted Glass Form Panel */}
            <div
              className="rounded-2xl border border-white/25 backdrop-blur-xl px-6 py-6"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255, 244, 232, 0.2) 0%, rgba(18, 58, 107, 0.52) 48%, rgba(8, 22, 44, 0.78) 100%)',
              }}
            >
              <div className="text-center mb-5">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-orange-200 block mb-1">
                  Polyverse · Finaliser Votre Action
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {authModalMode === 'login' ? 'Connexion' : 'Créer un Compte'}
                </h3>
                <div className="w-10 h-0.5 bg-[#D85A30] mx-auto mt-2" />
              </div>

              {errorMsg && (
                <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-red-950/75 border border-red-400/50 text-red-100 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-300" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-emerald-950/75 border border-emerald-400/50 text-emerald-100 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-300" />
                  <span>{successMsg}</span>
                </div>
              )}

              {authModalMode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Adresse e-mail ou identifiant"
                      aria-label="Adresse e-mail"
                      className="w-full rounded-full bg-white/10 border border-white/35 pl-4 pr-11 py-3 text-xs sm:text-sm text-white placeholder:text-stone-200/80 focus:border-[#E87048] focus:bg-[#0A2A4D]/65 outline-none"
                    />
                    <User className="w-4 h-4 text-white/85 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Mot de passe"
                      aria-label="Mot de passe"
                      className="w-full rounded-full bg-white/10 border border-white/35 pl-4 pr-16 py-3 text-xs sm:text-sm text-white placeholder:text-stone-200/80 focus:border-[#E87048] focus:bg-[#0A2A4D]/65 outline-none"
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword((prev) => !prev)}
                        className="text-white/75 hover:text-white cursor-pointer"
                        aria-label="Afficher ou masquer le mot de passe"
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <Lock className="w-4 h-4 text-white/85 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] px-1">
                    <label className="inline-flex items-center space-x-1.5 cursor-pointer text-stone-100">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 accent-[#D85A30] cursor-pointer"
                      />
                      <span>Se souvenir de moi</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowForgotHelp((prev) => !prev)}
                      className="text-stone-200 hover:text-[#E87048] cursor-pointer"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>

                  {showForgotHelp && (
                    <div className="p-3 rounded-xl bg-[#08101C]/85 border border-[#E87048]/45 text-[11px] text-stone-200">
                      <a
                        href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20j%E2%80%99ai%20oubli%C3%A9%20mon%20mot%20de%20passe.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-[#E87048] hover:underline font-semibold"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Récupérer via WhatsApp ({POLYVERSE_INFO.whatsappDisplay})</span>
                      </a>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-full bg-white text-[#0A2A4D] hover:bg-[#D85A30] hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
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

                  <p className="text-center text-xs text-stone-200 pt-1">
                    Pas encore de compte ?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthModalMode('register');
                        setErrorMsg('');
                      }}
                      className="font-bold text-white hover:text-[#E87048] underline cursor-pointer"
                    >
                      Créer un compte
                    </button>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Nom et prénom *"
                      className="w-full rounded-full bg-white/10 border border-white/35 pl-4 pr-10 py-2.5 text-xs text-white placeholder:text-stone-200/80 focus:border-[#E87048] focus:bg-[#0A2A4D]/65 outline-none"
                    />
                    <User className="w-3.5 h-3.5 text-white/85 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="Adresse e-mail *"
                      className="w-full rounded-full bg-white/10 border border-white/35 pl-4 pr-10 py-2.5 text-xs text-white placeholder:text-stone-200/80 focus:border-[#E87048] focus:bg-[#0A2A4D]/65 outline-none"
                    />
                    <Mail className="w-3.5 h-3.5 text-white/85 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="Téléphone / WhatsApp *"
                      className="w-full rounded-full bg-white/10 border border-white/35 pl-4 pr-10 py-2.5 text-xs text-white placeholder:text-stone-200/80 focus:border-[#E87048] focus:bg-[#0A2A4D]/65 outline-none"
                    />
                    <Phone className="w-3.5 h-3.5 text-white/85 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={regAddress}
                      onChange={(e) => setRegAddress(e.target.value)}
                      placeholder="Adresse de livraison"
                      className="w-full rounded-full bg-white/10 border border-white/35 pl-4 pr-10 py-2.5 text-xs text-white placeholder:text-stone-200/80 focus:border-[#E87048] focus:bg-[#0A2A4D]/65 outline-none"
                    />
                    <MapPin className="w-3.5 h-3.5 text-white/85 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Mot de passe (6 caractères min.) *"
                      className="w-full rounded-full bg-white/10 border border-white/35 pl-4 pr-10 py-2.5 text-xs text-white placeholder:text-stone-200/80 focus:border-[#E87048] focus:bg-[#0A2A4D]/65 outline-none"
                    />
                    <Lock className="w-3.5 h-3.5 text-white/85 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-full bg-white text-[#0A2A4D] hover:bg-[#D85A30] hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 mt-1"
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

                  <p className="text-center text-xs text-stone-200 pt-1">
                    Déjà inscrit ?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthModalMode('login');
                        setErrorMsg('');
                      }}
                      className="font-bold text-white hover:text-[#E87048] underline cursor-pointer"
                    >
                      Se connecter
                    </button>
                  </p>
                </form>
              )}
            </div>

            {authModalMode === 'login' && (
              <div className="mt-3.5 rounded-xl bg-[#08101C]/80 border border-[#185FA5]/40 px-4 py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2 min-w-0">
                  <ShieldCheck className="w-4 h-4 text-[#E87048] shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider truncate">
                    Accès Administrateur
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleQuickAdminLogin}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-full bg-[#D85A30] hover:bg-[#b84722] text-white font-bold uppercase tracking-wider text-[10px] transition-colors cursor-pointer shrink-0"
                >
                  Entrer Admin
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
