import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface ContactViewProps {
  onBack: () => void;
}

/**
 * Pixel-accurate Contact Us component matching Image 5
 */
export const ContactView: React.FC<ContactViewProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-white select-none text-slate-900 overflow-hidden">
      {/* Top Header Bar */}
      <div className="shrink-0 h-14 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-3 relative z-20">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-full active:scale-95 transition-all cursor-pointer z-10"
          aria-label="Back"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
        <h1 className="absolute inset-x-0 text-center font-bold text-slate-900 text-base tracking-wide pointer-events-none font-['Outfit',_sans-serif]">
          Contact Us
        </h1>
        <div className="w-9" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24 overscroll-contain space-y-4 bg-white">
        {/* Card 1: Our Mission */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 shadow-xs text-center">
          <h2 className="font-bold text-slate-900 text-base font-['Outfit',_sans-serif]">
            Our Mission
          </h2>
          {/* Red horizontal accent bar */}
          <div className="w-12 h-[2.5px] bg-red-600 rounded-full mx-auto mt-1.5 mb-3.5 shadow-xs" />

          <p className="text-slate-600 text-xs leading-relaxed font-normal text-left sm:text-justify">
            At GameX, our mission is to provide the ultimate Free Fire esports
            experience by hosting competitive tournaments that bring players
            together, reward skill and dedication, and build a thriving gaming
            community. We&apos;re committed to fair play, instant rewards, and creating
            opportunities for every Free Fire player to showcase their talent.
          </p>
        </div>

        {/* Card 2: Contact Us */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 shadow-xs text-center">
          <h2 className="font-bold text-slate-900 text-base font-['Outfit',_sans-serif]">
            Contact Channels
          </h2>
          {/* Red horizontal accent bar */}
          <div className="w-12 h-[2.5px] bg-red-600 rounded-full mx-auto mt-1.5 mb-3.5 shadow-xs" />

          {/* 4 Colorful Action Buttons (2x2 Grid) */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Telegram */}
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 active:scale-95 text-emerald-700 font-bold text-xs rounded-lg transition-all shadow-xs flex items-center justify-center cursor-pointer"
            >
              Telegram
            </a>

            {/* Whatsapp */}
            <a
              href="https://api.whatsapp.com/send?text=Hi%20GameX%20Support"
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 bg-sky-50 hover:bg-sky-100 border border-sky-300 active:scale-95 text-sky-700 font-bold text-xs rounded-lg transition-all shadow-xs flex items-center justify-center cursor-pointer"
            >
              Whatsapp
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 bg-pink-50 hover:bg-pink-100 border border-pink-300 active:scale-95 text-pink-700 font-bold text-xs rounded-lg transition-all shadow-xs flex items-center justify-center cursor-pointer"
            >
              Instagram
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 bg-red-50 hover:bg-red-100 border border-red-300 active:scale-95 text-red-700 font-bold text-xs rounded-lg transition-all shadow-xs flex items-center justify-center cursor-pointer"
            >
              YouTube
            </a>
          </div>
        </div>

        {/* Card 3: Our Address */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 shadow-xs text-center">
          <h2 className="font-bold text-slate-900 text-base font-['Outfit',_sans-serif]">
            Our Address
          </h2>
          {/* Red horizontal accent bar */}
          <div className="w-12 h-[2.5px] bg-red-600 rounded-full mx-auto mt-1.5 mb-3.5 shadow-xs" />

          <div className="text-left text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-slate-900">
              GameX - Free Fire Esports Platform
            </p>
            <p className="text-slate-500">India</p>
          </div>
        </div>
      </div>
    </div>
  );
};
