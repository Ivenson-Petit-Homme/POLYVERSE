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

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Real Official Emblem uploaded by user */}
      <div
        className={`${currentSize.badge} rounded-xl overflow-hidden shadow-sm border border-slate-200/90 bg-[#06152B] shrink-0 transition-transform group-hover:scale-105`}
      >
        <img
          src={officialLogoImg}
          alt="Polyverse Logo Officiel"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Brand Text & Official Taglines */}
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

          {/* Official Tagline */}
          {showTagline && (
            <>
              <span
                className={`font-bold tracking-wider uppercase mt-1 leading-none ${currentSize.textSub}`}
                style={{ color: subtextColor, fontFamily: "'Montserrat', sans-serif" }}
              >
                FINANCE ET INVESTISSEMENT
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
