import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface LeaderboardViewProps {
  onBack: () => void;
}

interface LeaderboardEntry {
  position: number;
  playerName: string;
  prize: number;
}

const WEEKLY_PLAYERS: LeaderboardEntry[] = [
  { position: 1, playerName: 'me_tera', prize: 2415 },
  { position: 2, playerName: 'dpx_gunga', prize: 2255 },
  { position: 3, playerName: 'xm8god', prize: 2213 },
  { position: 4, playerName: 'dhoni7718', prize: 2085 },
  { position: 5, playerName: 'sarfaraz789', prize: 1925 },
  { position: 6, playerName: 'robomaxyt', prize: 1880 },
  { position: 7, playerName: 'stormx', prize: 1877 },
  { position: 8, playerName: 'babluyyy', prize: 1815 },
  { position: 9, playerName: 'rexxx3', prize: 1705 },
  { position: 10, playerName: 'rachitpanwar313gmai', prize: 1625 },
];

const MONTHLY_PLAYERS: LeaderboardEntry[] = [
  { position: 1, playerName: 'stormx', prize: 9840 },
  { position: 2, playerName: 'me_tera', prize: 9150 },
  { position: 3, playerName: 'xm8god', prize: 8760 },
  { position: 4, playerName: 'dpx_gunga', prize: 8200 },
  { position: 5, playerName: 'sarfaraz789', prize: 7950 },
  { position: 6, playerName: 'dhoni7718', prize: 7420 },
  { position: 7, playerName: 'robomaxyt', prize: 6980 },
  { position: 8, playerName: 'rexxx3', prize: 6540 },
  { position: 9, playerName: 'babluyyy', prize: 6120 },
  { position: 10, playerName: 'rachitpanwar313gmai', prize: 5800 },
];

const FULLTIME_PLAYERS: LeaderboardEntry[] = [
  { position: 1, playerName: 'xm8god', prize: 34500 },
  { position: 2, playerName: 'me_tera', prize: 31200 },
  { position: 3, playerName: 'dpx_gunga', prize: 29800 },
  { position: 4, playerName: 'stormx', prize: 28400 },
  { position: 5, playerName: 'dhoni7718', prize: 25100 },
  { position: 6, playerName: 'sarfaraz789', prize: 23600 },
  { position: 7, playerName: 'robomaxyt', prize: 21900 },
  { position: 8, playerName: 'babluyyy', prize: 19800 },
  { position: 9, playerName: 'rexxx3', prize: 18500 },
  { position: 10, playerName: 'rachitpanwar313gmai', prize: 16900 },
];

/**
 * Pixel-accurate Leaderboard component matching Image 1
 */
export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ onBack }) => {
  const [activeFilter, setActiveFilter] = useState<'weekly' | 'monthly' | 'fulltime'>('weekly');

  const getPlayers = () => {
    switch (activeFilter) {
      case 'monthly':
        return MONTHLY_PLAYERS;
      case 'fulltime':
        return FULLTIME_PLAYERS;
      case 'weekly':
      default:
        return WEEKLY_PLAYERS;
    }
  };

  const players = getPlayers();

  return (
    <div className="flex flex-col h-full bg-white select-none text-slate-900 overflow-hidden">
      {/* Top Header Bar */}
      <div className="shrink-0 h-14 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-3 relative">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-full active:scale-95 transition-all cursor-pointer z-10"
          aria-label="Back"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
        <h1 className="absolute inset-x-0 text-center font-bold text-slate-900 text-base tracking-wide pointer-events-none font-['Outfit',_sans-serif]">
          Leaderboard
        </h1>
        <div className="w-9" />
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-20 overscroll-contain bg-white">
        {/* Filter Pills: Weekly, Monthly, Fulltime */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setActiveFilter('weekly')}
            className={`py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all cursor-pointer text-center ${
              activeFilter === 'weekly'
                ? 'bg-red-600 text-white shadow-sm border border-red-600'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveFilter('monthly')}
            className={`py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all cursor-pointer text-center ${
              activeFilter === 'monthly'
                ? 'bg-red-600 text-white shadow-sm border border-red-600'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setActiveFilter('fulltime')}
            className={`py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all cursor-pointer text-center ${
              activeFilter === 'fulltime'
                ? 'bg-red-600 text-white shadow-sm border border-red-600'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Fulltime
          </button>
        </div>

        {/* Table Header Bar */}
        <div className="mt-4 bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs sm:text-sm rounded-lg px-4 py-2.5 flex items-center justify-between shadow-xs">
          <span className="w-14 text-left">Position</span>
          <span className="flex-1 text-center font-medium">Player Name</span>
          <span className="w-16 text-right">Prize</span>
        </div>

        {/* Players List */}
        <div className="mt-3 space-y-2">
          {players.map((item) => (
            <div
              key={item.position}
              className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 flex items-center justify-between text-xs sm:text-sm shadow-xs transition-colors hover:border-slate-300"
            >
              {/* Position */}
              <span className="w-14 text-left font-bold text-slate-900">
                {item.position}
              </span>

              {/* Player Name */}
              <span className="flex-1 text-left pl-2 font-medium text-slate-700 truncate">
                {item.playerName}
              </span>

              {/* Prize with Golden Coin */}
              <div className="w-20 flex items-center justify-end gap-1.5 shrink-0">
                {/* Yellow Coin Circle */}
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border border-amber-600 shadow-xs flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                </div>
                <span className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight">
                  {item.prize}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
