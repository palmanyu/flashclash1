import React from 'react';
import { TrendingUp, Users } from 'lucide-react';
import { DateBar } from './DateBar';
import { GamesLeaderboardEmptyIcon, SidebarUsersIcon } from './Icons';

export const GamesStatsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Game Statistics
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Comprehensive overview of game performance and metrics
        </p>
      </div>

      {/* Date Bar */}
      <DateBar />

      {/* 4 Colored Metric Cards (Pixel-to-Pixel Replica of Image 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Entry Fees - Blue */}
        <div className="bg-[#2563eb] text-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(37,99,235,0.2)] flex items-center gap-4 transition-transform hover:-translate-y-0.5">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <span className="font-bold text-xl leading-none">$</span>
          </div>
          <div>
            <span className="block text-xs font-medium text-blue-100">
              Total Entry Fees
            </span>
            <span className="block text-2xl font-bold tracking-tight text-white mt-0.5">
              ₹0.00
            </span>
          </div>
        </div>

        {/* Total Net Earnings - Green */}
        <div className="bg-[#16a34a] text-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(22,163,74,0.2)] flex items-center gap-4 transition-transform hover:-translate-y-0.5">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="block text-xs font-medium text-green-100">
              Total Net Earnings
            </span>
            <span className="block text-2xl font-bold tracking-tight text-white mt-0.5">
              ₹0.00
            </span>
          </div>
        </div>

        {/* Total Contests - Purple */}
        <div className="bg-[#9333ea] text-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(147,51,234,0.2)] flex items-center gap-4 transition-transform hover:-translate-y-0.5">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <SidebarUsersIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="block text-xs font-medium text-purple-100">
              Total Contests
            </span>
            <span className="block text-2xl font-bold tracking-tight text-white mt-0.5">
              0
            </span>
          </div>
        </div>

        {/* Total Joinings - Orange */}
        <div className="bg-[#ea580c] text-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(234,88,12,0.2)] flex items-center gap-4 transition-transform hover:-translate-y-0.5">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <SidebarUsersIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="block text-xs font-medium text-orange-100">
              Total Joinings
            </span>
            <span className="block text-2xl font-bold tracking-tight text-white mt-0.5">
              0
            </span>
          </div>
        </div>
      </div>

      {/* Games Leaderboard Card with Empty State */}
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100 p-6 sm:p-8 min-h-[300px] flex flex-col">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <Users className="w-5 h-5 text-blue-600 shrink-0 stroke-[2.2]" />
          <h3 className="font-semibold text-slate-800 text-base sm:text-lg">
            Games Leaderboard
          </h3>
        </div>

        {/* Empty state illustration & message matching Image 4 */}
        <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-3">
            <GamesLeaderboardEmptyIcon className="w-10 h-10 text-slate-400" />
          </div>
          <p className="font-semibold text-slate-800 text-base">
            No game data available
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm">
            No games were active for the selected day
          </p>
        </div>
      </div>
    </div>
  );
};
