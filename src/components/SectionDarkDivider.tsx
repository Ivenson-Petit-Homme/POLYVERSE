import React from 'react';
import officialLogoImg from '../assets/images/polyverse_official_logo_1789375972137.jpg';

interface SectionDarkDividerProps {
  label?: string;
  sublabel?: string;
  theme?: 'dark' | 'black-accent';
}

export const SectionDarkDivider: React.FC<SectionDarkDividerProps> = ({
  label,
  sublabel = 'IDÉE • STRATÉGIE • FINANCE',
}) => {
  return (
    <div className="relative w-full bg-[#050D1A] py-4 px-4 border-y border-slate-800/80 overflow-hidden select-none">
      {/* Subtle geometric micro-grid pattern in dark background */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#38BDF8 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />

      {/* Top & Bottom luminous micro-lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#185FA5]/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D85A30]/60 to-transparent" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 relative z-10">
        {/* Left glowing line */}
        <div className="hidden sm:flex items-center flex-1 space-x-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-slate-700 to-slate-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        </div>

        {/* Center emblem & label */}
        <div className="flex items-center space-x-3 mx-auto sm:mx-0 px-4 py-1 rounded-full bg-[#0A1B33]/90 border border-slate-700/80 shadow-inner">
          <div className="w-5 h-5 rounded-full overflow-hidden border border-amber-400/80 shadow-xs bg-[#06152B] shrink-0">
            <img
              src={officialLogoImg}
              alt="Polyverse Emblem"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center space-x-2 text-[11px] font-bold tracking-wider uppercase text-slate-200">
            <span className="text-amber-400">Polyverse</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-semibold">{label || sublabel}</span>
          </div>
        </div>

        {/* Right glowing line */}
        <div className="hidden sm:flex items-center flex-1 space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D85A30] shadow-[0_0_8px_rgba(216,90,48,0.8)]" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-slate-700 to-slate-800" />
        </div>
      </div>
    </div>
  );
};
