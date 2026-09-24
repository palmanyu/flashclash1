import React from 'react';
import { Bell, Wallet, Plus } from 'lucide-react';
import { GamexShieldLogo } from './Artwork';

interface HeaderProps {
  balance: number;
  onOpenWallet: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  balance,
  onOpenWallet,
  onOpenNotifications,
  onOpenProfile,
}) => {
  return (
    <header className="flex items-center justify-between px-3.5 py-3 bg-white border-b border-slate-200 select-none z-30 font-['Outfit',_sans-serif]">
      {/* Left: Shield Crest Logo & Gamex Brand */}
      <div
        onClick={onOpenProfile}
        className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform"
      >
        <GamexShieldLogo size={36} className="group-hover:scale-105 transition-transform" />
        <span className="text-slate-900 font-['Outfit',_sans-serif] font-black text-[20px] tracking-tight">
          Gamex
        </span>
      </div>

      {/* Right: Notification Bell & Wallet Pill Box */}
      <div className="flex items-center gap-3">
        {/* Notification Bell with red indicator */}
        <button
          onClick={onOpenNotifications}
          className="relative w-8 h-8 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors cursor-pointer active:scale-90"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 fill-slate-200 stroke-slate-700" />
          {/* Red notification dot */}
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_6px_#dc2626]"></span>
        </button>

        {/* Wallet Pill Box: light card with red border, wallet icon, amount, and + */}
        <button
          onClick={onOpenWallet}
          className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-red-500/60 rounded-xl px-3 py-1.5 shadow-sm transition-all cursor-pointer active:scale-95 group"
        >
          {/* Wallet Icon */}
          <Wallet className="w-4 h-4 text-slate-700 group-hover:text-red-600 transition-colors" />

          {/* Amount (formatted like 0.00 in screenshot) */}
          <span className="text-slate-900 font-bold text-xs sm:text-sm tracking-tight">
            {balance > 0 ? balance.toFixed(2) : '0.00'}
          </span>

          {/* Plus Add Icon */}
          <div className="border-l border-slate-300 pl-1.5 ml-0.5 flex items-center justify-center">
            <Plus className="w-4 h-4 text-red-600 group-hover:text-red-700 stroke-[2.5]" />
          </div>
        </button>
      </div>
    </header>
  );
};

