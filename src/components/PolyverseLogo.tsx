import React from 'react';
import officialLogoImg from '../assets/images/polyverse_official_logo_1789375972137.jpg';

interface PolyverseLogoProps {
  variant?: 'full' | 'symbol' | 'badge' | 'official';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'light' | 'dark' | 'color';
  className?: string;
  showTagline?: boolean;
}

export const PolyverseLogo: React.FC<PolyverseLogoProps> = ({
  variant = 'full',
  size = 'md',
  theme = 'color',
  className = '',
  showTagline = true,
}) => {
  // Dimensions
  const sizeConfig = {
    sm: { symbol: 'h-8 w-8', textTitle: 'text-base', textSub: 'text-[9px]', textSlogan: 'text-[8px]', badge: 'h-9 w-9' },
    md: { symbol: 'h-10 w-10', textTitle: 'text-lg', textSub: 'text-[10px]', textSlogan: 'text-[9px]', badge: 'h-11 w-11' },
    lg: { symbol: 'h-14 w-14', textTitle: 'text-2xl', textSub: 'text-xs', textSlogan: 'text-[11px]', badge: 'h-16 w-16' },
    xl: { symbol: 'h-20 w-20', textTitle: 'text-3xl', textSub: 'text-sm', textSlogan: 'text-xs', badge: 'h-24 w-24' },
  };

  const currentSize = sizeConfig[size];

  // Theme colors
  const polyBlue = theme === 'dark' ? '#38BDF8' : '#185FA5';
  const verseBlue = theme === 'dark' ? '#60A5FA' : '#0A2A4D';
  const goldBar = '#D4AF37';
  const subtextColor = theme === 'dark' ? '#E2E8F0' : '#4B5874';
  const sloganColor = theme === 'dark' ? '#CBD5E1' : '#64748B';

  // Badge variant rendering the official emblem uploaded by the user
  if (variant === 'official') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        <div className={`${currentSize.badge} rounded-xl overflow-hidden shadow-md border border-slate-200/80 bg-[#06152B] shrink-0`}>
          <img
            src={officialLogoImg}
            alt="Polyverse Logo Officiel"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        {showTagline && (
          <div className="flex flex-col text-left">
            <div className="flex items-center font-extrabold tracking-tight leading-none text-xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <span style={{ color: polyBlue }}>POLY</span>
              <span className="mx-1 font-light" style={{ color: goldBar }}>|</span>
              <span style={{ color: verseBlue }}>VERSE</span>
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase mt-1" style={{ color: subtextColor }}>
              IDÉE | STRATÉGIE | FINANCE
            </span>
            <span className="text-[9px] font-medium italic mt-0.5" style={{ color: sloganColor }}>
              Pont vers la Réalisation
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Exact Vector Emblem of the Official Polyverse Logo (Dome, Teamwork People, Arrow/P, Geometric Finance) */}
      <svg
        className={`${currentSize.symbol} shrink-0`}
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Polyverse Emblem"
      >
        <defs>
          <linearGradient id="pv-cyan-grad" x1="0" y1="100" x2="0" y2="30">
            <stop offset="0%" stopColor="#0088D6" />
            <stop offset="100%" stopColor="#00D2FF" />
          </linearGradient>

          <linearGradient id="pv-blue-arrow" x1="40" y1="90" x2="65" y2="20">
            <stop offset="0%" stopColor="#0A2A4D" />
            <stop offset="50%" stopColor="#185FA5" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>

          <linearGradient id="pv-emerald-gold" x1="60" y1="20" x2="110" y2="80">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>

        {/* 1. Outer Semicircular Dome Frame Guideline (Subtle) */}
        <path
          d="M 12,82 A 48,48 0 0,1 108,82"
          stroke={goldBar}
          strokeWidth="1.5"
          strokeOpacity="0.4"
          fill="none"
        />

        {/* 2. Left Wing: Ascending Teamwork Silhouette Figures (Idée) */}
        {/* Person 1 (Lowest Left) */}
        <circle cx="24" cy="56" r="4" fill="#00D2FF" />
        <path
          d="M 20,82 C 20,72 23,66 27,64 C 28,67 27,76 27,82 Z"
          fill="url(#pv-cyan-grad)"
        />

        {/* Person 2 (Middle Left) */}
        <circle cx="34" cy="45" r="4.5" fill="#00D2FF" />
        <path
          d="M 29,82 C 29,62 33,54 38,52 C 39,56 38,72 38,82 Z"
          fill="url(#pv-cyan-grad)"
        />

        {/* Person 3 (Tallest Inner Left) */}
        <circle cx="45" cy="35" r="5" fill="#38BDF8" />
        <path
          d="M 40,82 C 40,50 44,42 49,41 C 50,47 49,68 49,82 Z"
          fill="url(#pv-cyan-grad)"
        />

        {/* 3. Center: Dynamic Arrow looping through Green/Gold Ring to form "P" (Stratégie & Progrès) */}
        {/* Green/Gold Ring Loop of the P */}
        <path
          d="M 58,26 C 72,22 84,33 80,48 C 76,60 62,62 55,56"
          stroke="url(#pv-emerald-gold)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />

        {/* Upward Blue Arrow curving through the P */}
        <path
          d="M 48,82 C 48,60 52,42 66,33"
          stroke="url(#pv-blue-arrow)"
          strokeWidth="7.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Arrowhead pointing upward & forward */}
        <polygon
          points="62,24 74,31 66,40"
          fill="#185FA5"
        />

        {/* 4. Right Wing: Geodesic / Faceted Grid Dome (Finance & Réalisation) */}
        {/* Outer facet ring in green */}
        <path
          d="M 76,38 L 92,44 L 88,58 L 74,52 Z"
          fill="#059669"
        />
        {/* Facet 2 in gold */}
        <path
          d="M 92,44 L 105,58 L 96,68 L 88,58 Z"
          fill="#D4AF37"
        />
        {/* Facet 3 in deep emerald */}
        <path
          d="M 88,58 L 96,68 L 90,82 L 78,74 Z"
          fill="#047857"
        />
        {/* Facet 4 bottom gold corner */}
        <path
          d="M 96,68 L 106,82 L 90,82 Z"
          fill="#C69214"
        />
        {/* Facet 5 inner green connector */}
        <path
          d="M 74,52 L 88,58 L 78,74 L 68,66 Z"
          fill="#10B981"
        />
      </svg>

      {/* Full version Text: POLY|VERSE + IDÉE | STRATÉGIE | FINANCE */}
      {variant !== 'symbol' && (
        <div className="flex flex-col justify-center text-left">
          {/* Brand Name */}
          <div
            className={`flex items-center font-extrabold tracking-tight leading-none ${currentSize.textTitle}`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span style={{ color: polyBlue }}>POLY</span>
            <span className="mx-1 font-light" style={{ color: goldBar }}>|</span>
            <span style={{ color: verseBlue }}>VERSE</span>
          </div>

          {/* Official Tagline 1 */}
          {showTagline && (
            <>
              <span
                className={`font-bold tracking-wider uppercase mt-1 leading-none ${currentSize.textSub}`}
                style={{ color: subtextColor, fontFamily: "'Montserrat', sans-serif" }}
              >
                IDÉE | STRATÉGIE | FINANCE
              </span>
              <span
                className={`font-medium italic mt-0.5 leading-none ${currentSize.textSlogan}`}
                style={{ color: sloganColor }}
              >
                Pont vers la Réalisation
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
