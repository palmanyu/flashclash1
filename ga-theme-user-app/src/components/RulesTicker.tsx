import React from 'react';
import { Megaphone, ChevronRight, AlertTriangle } from 'lucide-react';

interface RulesTickerProps {
  onOpenRules: () => void;
}

export const RulesTicker: React.FC<RulesTickerProps> = ({ onOpenRules }) => {
  return (
    <div className="px-3 pt-2.5 pb-2 select-none">
      <div
        onClick={onOpenRules}
        className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl p-2.5 shadow-sm cursor-pointer transition-all active:scale-[0.99] group"
      >
        {/* Left: Red Gradient Box with Loudspeaker / Megaphone */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 via-red-600 to-rose-700 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
          <Megaphone className="w-5 h-5 text-white -rotate-12 fill-white/20 stroke-[2.2]" />
        </div>

        {/* Center: Two-line Notice (Title & Subtitle Ticker) */}
        <div className="flex-1 min-w-0 overflow-hidden pr-1">
          {/* Top Title: HACKERS & POV RULES UPDATE with Siren Emojis */}
          <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-[11px] sm:text-xs tracking-tight truncate">
            <span>🚨</span>
            <span className="text-slate-900 uppercase font-['Outfit',_sans-serif] font-bold">
              HACKERS & POV RULES UPDATE
            </span>
            <span>🚨</span>
          </div>

          {/* Bottom Subtitle / Ticker: har player ko apna POV / Screen Recording... */}
          <div className="relative overflow-hidden whitespace-nowrap text-[11px] text-slate-600 font-medium mt-0.5">
            <div className="flex animate-marquee hover:[animation-play-state:paused]">
              <span className="mr-8">
                har player ko apna POV / Screen Recording rakhna compulsory hai... Fair play strictly enforced!
              </span>
              <span className="mr-8">
                har player ko apna POV / Screen Recording rakhna compulsory hai... Fair play strictly enforced!
              </span>
            </div>
          </div>
        </div>

        {/* Right: Yellow Warning Triangle & Chevron */}
        <div className="flex items-center gap-1 shrink-0 pl-1">
          <div className="w-6 h-6 rounded-md bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-amber-500 fill-amber-400/30" />
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 transition-colors" />
        </div>
      </div>
    </div>
  );
};

