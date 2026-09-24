import React from 'react';
import { History, Calendar, Check, Headphones } from 'lucide-react';
import { MatchCategory } from '../types';

interface MyMatchesSectionProps {
  onSelectCategory: (category: MatchCategory) => void;
  onOpenSupport?: () => void;
  selectedCategory?: MatchCategory | null;
}

export const MyMatchesSection: React.FC<MyMatchesSectionProps> = ({
  onSelectCategory,
  onOpenSupport,
}) => {
  return (
    <div className="px-3 pt-1 pb-2 select-none">
      {/* Centered Heading with red divider lines: —— My Matches —— */}
      <div className="flex items-center justify-center gap-3 my-2">
        <div className="h-[1.5px] w-12 bg-gradient-to-r from-transparent to-red-500"></div>
        <h2 className="font-['Outfit',_sans-serif] font-bold text-slate-900 text-sm sm:text-base tracking-wide">
          My Matches
        </h2>
        <div className="h-[1.5px] w-12 bg-gradient-to-l from-transparent to-red-500"></div>
      </div>

      {/* 4 Action Cards matching the screenshot */}
      <div className="grid grid-cols-4 gap-2">
        {/* Ongoing Card */}
        <button
          onClick={() => onSelectCategory('ongoing')}
          className="bg-white hover:bg-slate-50 active:scale-95 transition-all rounded-xl py-2.5 px-1 flex flex-col items-center justify-center shadow-sm cursor-pointer group border border-slate-200 hover:border-red-400 hover:shadow-md"
        >
          {/* Circled part - Solid Red with white History icon */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#e61e24] shadow-[0_0_10px_rgba(230,30,36,0.4)] flex items-center justify-center group-hover:scale-105 transition-transform">
            <History className="w-5 h-5 text-white stroke-[2.4]" />
          </div>
          <span className="text-slate-900 font-bold text-[11px] sm:text-xs mt-1.5 tracking-tight truncate w-full text-center font-['Outfit',_sans-serif]">
            Ongoing
          </span>
          <div className="w-5 h-[2px] bg-[#e61e24] rounded-full mt-1"></div>
        </button>

        {/* Upcoming Card */}
        <button
          onClick={() => onSelectCategory('upcoming')}
          className="bg-white hover:bg-slate-50 active:scale-95 transition-all rounded-xl py-2.5 px-1 flex flex-col items-center justify-center shadow-sm cursor-pointer group border border-slate-200 hover:border-orange-400 hover:shadow-md"
        >
          {/* Circled part - Solid Orange with white Calendar icon */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f97316] shadow-[0_0_10px_rgba(249,115,22,0.4)] flex items-center justify-center group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5 text-white stroke-[2.4]" />
          </div>
          <span className="text-slate-900 font-bold text-[11px] sm:text-xs mt-1.5 tracking-tight truncate w-full text-center font-['Outfit',_sans-serif]">
            Upcoming
          </span>
          <div className="w-5 h-[2px] bg-[#f97316] rounded-full mt-1"></div>
        </button>

        {/* Completed Card */}
        <button
          onClick={() => onSelectCategory('completed')}
          className="bg-white hover:bg-slate-50 active:scale-95 transition-all rounded-xl py-2.5 px-1 flex flex-col items-center justify-center shadow-sm cursor-pointer group border border-slate-200 hover:border-green-400 hover:shadow-md"
        >
          {/* Circled part - Solid Green with white Check icon */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#16a34a] shadow-[0_0_10px_rgba(22,163,74,0.4)] flex items-center justify-center group-hover:scale-105 transition-transform">
            <Check className="w-5 h-5 text-white stroke-[3]" />
          </div>
          <span className="text-slate-900 font-bold text-[11px] sm:text-xs mt-1.5 tracking-tight truncate w-full text-center font-['Outfit',_sans-serif]">
            Completed
          </span>
          <div className="w-5 h-[2px] bg-[#16a34a] rounded-full mt-1"></div>
        </button>

        {/* Support Card */}
        <button
          onClick={onOpenSupport}
          className="bg-white hover:bg-slate-50 active:scale-95 transition-all rounded-xl py-2.5 px-1 flex flex-col items-center justify-center shadow-sm cursor-pointer group border border-slate-200 hover:border-sky-400 hover:shadow-md"
        >
          {/* Circled part - Solid Sky Blue with white Headphones icon */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0284c7] shadow-[0_0_10px_rgba(2,132,199,0.4)] flex items-center justify-center group-hover:scale-105 transition-transform">
            <Headphones className="w-5 h-5 text-white stroke-[2.4]" />
          </div>
          <span className="text-slate-900 font-bold text-[11px] sm:text-xs mt-1.5 tracking-tight truncate w-full text-center font-['Outfit',_sans-serif]">
            Support
          </span>
          <div className="w-5 h-[2px] bg-[#0284c7] rounded-full mt-1"></div>
        </button>
      </div>
    </div>
  );
};

