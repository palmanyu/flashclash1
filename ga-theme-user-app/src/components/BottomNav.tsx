import React from 'react';
import { Gift, BarChart2, Home, Wallet, Menu } from 'lucide-react';
import { NavTab } from '../types';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] select-none max-w-md mx-auto font-['Outfit',_sans-serif]">
      <div className="grid grid-cols-5 h-12 items-center">
        {/* 1. Earn */}
        <button
          onClick={() => onTabChange('earn')}
          className={`flex flex-col items-center justify-center h-full transition-all cursor-pointer group active:scale-95 ${
            activeTab === 'earn' ? 'text-red-600' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Gift className={`w-5 h-5 ${activeTab === 'earn' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10.5px] font-semibold mt-1 tracking-tight">Earn</span>
        </button>

        {/* 2. Leaderboard */}
        <button
          onClick={() => onTabChange('leaderboard')}
          className={`flex flex-col items-center justify-center h-full transition-all cursor-pointer group active:scale-95 ${
            activeTab === 'leaderboard' ? 'text-red-600' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <BarChart2 className={`w-5 h-5 ${activeTab === 'leaderboard' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10.5px] font-semibold mt-1 tracking-tight">Leaderboard</span>
        </button>

        {/* 3. Home (Active Red with indicator) */}
        <button
          onClick={() => onTabChange('home')}
          className={`relative flex flex-col items-center justify-center h-full transition-all cursor-pointer group active:scale-95 ${
            activeTab === 'home' ? 'text-red-600' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <div className="relative">
            <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5] text-red-600' : 'stroke-2'}`} />
            {activeTab === 'home' && (
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-600 rounded-full shadow-[0_0_6px_#ef4444]" />
            )}
          </div>
          <span className="text-[10.5px] font-bold mt-1 tracking-tight">Home</span>
          {activeTab === 'home' && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-red-600 rounded-full shadow-[0_0_6px_#ef4444]" />
          )}
        </button>

        {/* 4. Wallet */}
        <button
          onClick={() => onTabChange('wallet')}
          className={`flex flex-col items-center justify-center h-full transition-all cursor-pointer group active:scale-95 ${
            activeTab === 'wallet' ? 'text-red-600' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Wallet className={`w-5 h-5 ${activeTab === 'wallet' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10.5px] font-semibold mt-1 tracking-tight">Wallet</span>
        </button>

        {/* 5. Menu (Replaced Profile tab with Menu) */}
        <button
          onClick={() => onTabChange('menu')}
          className={`flex flex-col items-center justify-center h-full transition-all cursor-pointer group active:scale-95 ${
            activeTab === 'menu' || activeTab === 'profile'
              ? 'text-red-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Menu
            className={`w-5 h-5 ${
              activeTab === 'menu' || activeTab === 'profile' ? 'stroke-[2.5]' : 'stroke-2'
            }`}
          />
          <span className="text-[10.5px] font-semibold mt-1 tracking-tight">Menu</span>
        </button>
      </div>
    </nav>
  );
};


