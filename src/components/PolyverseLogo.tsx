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
  // Dimensions - enlarged for maximum visibility and brand prominence
  const sizeConfig = {
    sm: { symbol: 'h-10 w-10', textTitle: 'text-lg', textSub: 'text-[10px]', textSlogan: 'text-[9px]', badge: 'h-11 w-11' },
    md: { symbol: 'h-15 w-15', textTitle: 'text-2xl sm:text-[26px]', textSub: 'text-xs sm:text-[13px]', textSlogan: 'text-[11px]', badge: 'h-15 w-15 sm:h-16 sm:w-16' },
    lg: { symbol: 'h-22 w-22', textTitle: 'text-3xl sm:text-4xl', textSub: 'text-sm sm:text-base', textSlogan: 'text-xs sm:text-sm', badge: 'h-22 w-22 sm:h-26 sm:w-26' },
    xl: { symbol: 'h-32 w-32', textTitle: 'text-4xl sm:text-5xl', textSub: 'text-base sm:text-lg', textSlogan: 'text-sm sm:text-base', badge: 'h-32 w-32 sm:h-36 sm:w-36' },
  };

  const currentSize = sizeConfig[size];

  // Theme colors
  const polyBlue = theme === 'dark' ? '#38BDF8' : '#185FA5';
  const verseBlue = theme === 'dark' ? '#60A5FA' : '#0A2A4D';
  const goldBar = '#D4AF37';
  const subtextColor = theme === 'dark' ? '#E2E8F0' : '#4B5874';
  const sloganColor = theme === 'dark' ? '#CBD5E1' : '#64748B';

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Real Official Emblem uploaded by user */}
      <div
        className={`${currentSize.badge} rounded-2xl overflow-hidden shadow-md border-2 border-amber-400/40 bg-[#06152B] shrink-0 transition-transform group-hover:scale-105`}
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
