import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { NavigationTab } from '../types';
import { POLYVERSE_INFO } from '../data/polyverseData';
import {
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  PackageCheck,
  CreditCard,
  ShoppingBag,
  MessageCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

interface AuthSectionProps {
  setActiveTab: (tab: NavigationTab) => void;
  initialMode?: 'login' | 'register';
}

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

export const AuthSection: React.FC<AuthSectionProps> = ({
  setActiveTab,
  initialMode = 'login',
}) => {
  const { currentUser, login, register, adminEmail, authModalMode, setAuthModalMode } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>(authModalMode || initialMode);

  // Login form state (supports remembered email)
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

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Feedback state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setMode(authModalMode);
  }, [authModalMode]);

  useEffect(() => {
    if (currentUser) {
      setActiveTab(currentUser.role === 'admin' ? 'admin' : 'account');
    }
  }, [currentUser, setActiveTab]);

  const handleSwitchMode = (nextMode: 'login' | 'register') => {
    setMode(nextMode);
    setAuthModalMode(nextMode);
    setErrorMsg('');
    setSuccessMsg('');
    setShowForgotHelp(false);
  };

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
      } else {
        setSuccessMsg(res.message);
      }
    } catch {
      setErrorMsg('Erreur lors de la connexion administrateur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-[#141414]">
      {/* 1. ARCHITECTURAL NAVY BRICK WALL + SPOTLIGHT FROSTED GLASS LOGIN STAGE */}
      <section
        className="relative min-h-[780px] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-12 pb-16 overflow-hidden bg-[#061529]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${BRICK_WALL_SVG_PATTERN}")`,
          backgroundSize: '120px 60px',
        }}
      >
        {/* Ambient Navy Vignette Framing the Brick Wall */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 24%, rgba(24, 95, 165, 0.14) 0%, rgba(6, 20, 40, 0.68) 62%, rgba(4, 11, 23, 0.94) 100%)',
          }}
        />

        {/* Overhead Spotlight Sconce + Warm Polyverse Glow Cone */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[720px] max-w-full flex flex-col items-center">
          {/* Wall-mounted Architectural Lamp Housing */}
          <div className="relative z-20 mt-4 sm:mt-6 w-36 sm:w-44 flex flex-col items-center">
            <div className="w-28 sm:w-32 h-3 bg-[#08101C] border-x border-t border-[#185FA5]/50 shadow-lg" />
            <div
              className="w-36 sm:w-44 h-8 bg-gradient-to-b from-[#0D2B50] to-[#061428] border border-[#185FA5]/40 shadow-[0_8px_24px_rgba(0,0,0,0.85)]"
              style={{
                clipPath: 'polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)',
              }}
            />
            {/* Warm Sconce Diffuser Strip */}
            <div className="w-32 sm:w-40 h-2 bg-gradient-to-r from-[#E87048] via-[#FFF6E5] to-[#E87048] shadow-[0_6px_30px_10px_rgba(232,112,72,0.75)] rounded-b-sm" />
          </div>

          {/* Volumetric Conical Light Beam */}
          <div
            className="w-[460px] sm:w-[560px] h-[380px] -mt-1 opacity-90"
            style={{
              background:
                'radial-gradient(ellipse 68% 58% at 50% 6%, rgba(255, 241, 218, 0.85) 0%, rgba(232, 112, 72, 0.42) 32%, rgba(24, 95, 165, 0.2) 64%, rgba(10, 42, 77, 0) 100%)',
              clipPath: 'polygon(36% 0%, 64% 0%, 100% 100%, 0% 100%)',
            }}
          />
        </div>

        {/* Center Content Container */}
        <div className="relative z-10 w-full max-w-[460px] mt-16 sm:mt-20 flex flex-col items-center">
          {/* PolyVerse Context Kicker */}
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange-200/95 mb-3 text-center drop-shadow">
            Espace Client &amp; Administration Polyverse
          </p>

          {/* Frosted Glassmorphism Auth Card */}
          <div
            className="w-full rounded-2xl border border-white/25 backdrop-blur-xl px-6 sm:px-9 py-8 sm:py-9 text-white shadow-[0_28px_70px_rgba(3,10,22,0.78)]"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 244, 232, 0.22) 0%, rgba(18, 58, 107, 0.50) 45%, rgba(8, 22, 44, 0.72) 100%)',
            }}
          >
            {/* Card Title */}
            <div className="text-center mb-7">
              <h1
                className="text-3xl sm:text-4xl font-bold uppercase tracking-wide text-white drop-shadow-sm"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {mode === 'login' ? 'Connexion' : 'Créer un Compte'}
              </h1>
              <div className="w-12 h-0.5 bg-[#D85A30] mx-auto mt-2.5" />
            </div>

            {errorMsg && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-red-950/75 border border-red-400/50 text-red-100 text-xs flex items-center space-x-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-300" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-emerald-950/75 border border-emerald-400/50 text-emerald-100 text-xs flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-300" />
                <span>{successMsg}</span>
              </div>
            )}

            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Capsule Email / Username Input */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Adresse e-mail ou identifiant"
                    aria-label="Adresse e-mail ou identifiant"
                    className="w-full rounded-full bg-white/10 border border-white/35 pl-5 pr-12 py-3.5 text-sm text-white placeholder:text-stone-200/80 focus:border-[#E87048] focus:bg-[#0A2A4D]/65 outline-none transition-all"
                  />
                  <User className="w-4 h-4 text-white/85 absolute right-4.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Capsule Password Input */}
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Mot de passe"
                    aria-label="Mot de passe"
                    className="w-full rounded-full bg-white/10 border border-white/35 pl-5 pr-16 py-3.5 text-sm text-white placeholder:text-stone-200/80 focus:border-[#E87048] focus:bg-[#0A2A4D]/65 outline-none transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                      className="text-white/75 hover:text-white transition-colors cursor-pointer"
                      aria-label={showLoginPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <Lock className="w-4 h-4 text-white/85 pointer-events-none" />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-xs pt-1 px-1">
                  <label className="inline-flex items-center space-x-2 cursor-pointer text-stone-100 select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 accent-[#D85A30] rounded cursor-pointer"
                    />
                    <span>Se souvenir de moi</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowForgotHelp((prev) => !prev)}
                    className="text-stone-200 hover:text-[#E87048] transition-colors cursor-pointer font-medium"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>

                {showForgotHelp && (
                  <div className="p-3.5 rounded-xl bg-[#08101C]/80 border border-[#E87048]/45 text-xs text-stone-200 space-y-2">
                    <p className="leading-relaxed">
                      Pour réinitialiser votre accès client ou vérifier votre identifiant, contactez l’assistance Polyverse sur WhatsApp :
                    </p>
                    <a
                      href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20j%E2%80%99ai%20oubli%C3%A9%20mon%20mot%20de%20passe%20client.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-[#E87048] hover:underline font-semibold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Assistance WhatsApp ({POLYVERSE_INFO.whatsappDisplay})</span>
                    </a>
                  </div>
                )}

                {/* Crisp White Primary Submit Button with PolyVerse Coral Hover */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-full bg-white text-[#0A2A4D] hover:bg-[#D85A30] hover:text-white font-bold text-sm uppercase tracking-wider shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
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
                </div>

                {/* Bottom Switch Link */}
                <p className="text-center text-xs text-stone-200 pt-2">
                  Vous n’avez pas encore de compte ?{' '}
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('register')}
                    className="font-bold text-white hover:text-[#E87048] underline cursor-pointer transition-colors"
                  >
                    Créer un compte
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Nom et prénom complet *"
                    aria-label="Nom et prénom complet"
                    className="w-full rounded-full bg-white/10 border border-white/35 pl-5 pr-12 py-3 text-sm text-white placeholder:text-stone-200/80 focus:border-[#E87048] focus:bg-[#0A2A4D]/65 outline-none transition-all"
                  />
                  <User className="w-4 h-4 text-white/85 absolute right-4.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="Adresse e-mail *"
                    aria-label="Adresse e-mail"
                    className="w-full rounded-full bg-white/10 border border-white/35 pl-5 pr-12 py-3 text-sm text-white placeholder:text-stone-200/80 focus:border-[#E87048] focus:bg-[#0A2A4D]/65 outline-none transition-all"
                  />
                  <Mail className="w-4 h-4 text-white/85 absolute right-4.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="Téléphone / WhatsApp (+509 ...) *"
                    aria-label="Téléphone ou WhatsApp"
                    className="w-full rounded-full bg-white/10 border border-white/35 pl-5 pr-12 py-3 text-sm text-white placeholder:text-stone-200/80 focus:border-[#E87048] focus:bg-[#0A2A4D]/65 outline-none transition-all"
                  />
                  <Phone className="w-4 h-4 text-white/85 absolute right-4.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    placeholder="Adresse de livraison (Ville, Quartier)"
                    aria-label="Adresse de livraison"
                    className="w-full rounded-full bg-white/10 border border-white/35 pl-5 pr-12 py-3 text-sm text-white placeholder:text-stone-200/80 focus:border-[#E87048] focus:bg-[#0A2A4D]/65 outline-none transition-all"
                  />
                  <MapPin className="w-4 h-4 text-white/85 absolute right-4.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative">
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Mot de passe (6 caractères min.) *"
                    aria-label="Mot de passe"
                    className="w-full rounded-full bg-white/10 border border-white/35 pl-5 pr-16 py-3 text-sm text-white placeholder:text-stone-200/80 focus:border-[#E87048] focus:bg-[#0A2A4D]/65 outline-none transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowRegPassword((prev) => !prev)}
                      className="text-white/75 hover:text-white transition-colors cursor-pointer"
                      aria-label={showRegPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                      {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <Lock className="w-4 h-4 text-white/85 pointer-events-none" />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-full bg-white text-[#0A2A4D] hover:bg-[#D85A30] hover:text-white font-bold text-sm uppercase tracking-wider shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Création en cours...</span>
                    ) : (
                      <>
                        <span>Créer Mon Compte</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center text-xs text-stone-200 pt-2">
                  Déjà inscrit sur Polyverse ?{' '}
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('login')}
                    className="font-bold text-white hover:text-[#E87048] underline cursor-pointer transition-colors"
                  >
                    Se connecter
                  </button>
                </p>
              </form>
            )}
          </div>

          {/* Discreet PolyVerse Express Admin Bar Below Card */}
          <div className="w-full mt-5 rounded-xl bg-[#08101C]/80 backdrop-blur-md border border-[#185FA5]/40 px-5 py-3.5 flex items-center justify-between gap-3 text-white">
            <div className="flex items-center space-x-2.5 min-w-0">
              <ShieldCheck className="w-4 h-4 text-[#E87048] shrink-0" />
              <div className="truncate">
                <p className="text-xs font-bold uppercase tracking-wider text-white truncate">
                  Direction Polyverse
                </p>
                <p className="text-[11px] text-stone-300 truncate">
                  {adminEmail || 'admin@polyverse.com'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleQuickAdminLogin}
              disabled={loading}
              className="px-4 py-2 rounded-full bg-[#D85A30] hover:bg-[#b84722] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-1.5 cursor-pointer shrink-0 disabled:opacity-50"
            >
              <span>Accès Admin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL POLYVERSE MEMBER PRIVILEGES BAR (WWF.FR CONSISTENT) */}
      <section className="bg-[#F4F3EF] border-t border-b border-stone-200 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-300 pb-5 mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#D85A30] block">
                Vos Avantages Membres
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold uppercase text-[#0A2A4D] mt-1"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Un Compte Unique Pour Tous Vos Services Polyverse
              </h2>
            </div>
            <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setActiveTab('order')}
                className="text-[#185FA5] hover:text-[#D85A30] underline cursor-pointer"
              >
                Commander un Service
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('boutique')}
                className="text-[#0A2A4D] hover:text-[#D85A30] underline cursor-pointer"
              >
                Visiter la Boutique
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-stone-200 p-7 space-y-3">
              <CreditCard className="w-6 h-6 text-[#D85A30]" />
              <h3
                className="text-xl font-bold uppercase text-[#0A2A4D]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Achat Sans Carte à 140 HTG
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Soumettez vos paniers Amazon, Shein et eBay avec conversion automatique en Gourdes haïtiennes et suivi complet de la validation.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-7 space-y-3">
              <PackageCheck className="w-6 h-6 text-[#185FA5]" />
              <h3
                className="text-xl font-bold uppercase text-[#0A2A4D]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Shipping Miami · BP-147973
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Suivez vos colis expédiés via notre adresse de Miami vers Caracol, Cap-Haïtien, Ouanaminthe ou Port-au-Prince en toute transparence.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-7 space-y-3">
              <ShoppingBag className="w-6 h-6 text-emerald-700" />
              <h3
                className="text-xl font-bold uppercase text-[#0A2A4D]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Boutique &amp; Reçus Enregistrés
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Conservez vos coordonnées de livraison, votre historique de commandes et vos confirmations MonCash, Natcash ou Zelle au même endroit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
