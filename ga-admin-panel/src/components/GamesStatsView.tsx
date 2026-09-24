import React, { useState } from 'react';
import { TrendingUp, Users, Trophy, Gamepad2 } from 'lucide-react';
import { DateBar } from './DateBar';
import { GamesLeaderboardEmptyIcon, SidebarUsersIcon } from './Icons';
import {
  toISODateString,
  getTodayDate,
  getDailyGameStats,
  formatDailyDate,
} from '../utils/dateUtils';

export const GamesStatsView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    toISODateString(getTodayDate())
  );

  const stats = React.useMemo(() => getDailyGameStats(selectedDate), [selectedDate]);
  const hasGameData = stats.totalJoinings > 0;

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Game Statistics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Comprehensive daily overview of game performance and player metrics
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-xs flex items-center gap-1.5 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Viewing: <strong className="text-slate-800">{formatDailyDate(selectedDate)}</strong></span>
        </div>
      </div>

      {/* Date Bar with strict past-date control */}
      <DateBar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      {/* 4 Colored Metric Cards (Pixel-to-Pixel Replica of Image 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Entry Fees - Blue */}
        <div className="bg-[#2563eb] text-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(37,99,235,0.2)] flex items-center gap-4 transition-transform hover:-translate-y-0.5">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <span className="font-bold text-xl leading-none">₹</span>
          </div>
          <div>
            <span className="block text-xs font-medium text-blue-100">
              Total Entry Fees
            </span>
            <span className="block text-2xl font-bold tracking-tight text-white mt-0.5">
              ₹{stats.totalEntryFees.toLocaleString('en-IN')}.00
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
              ₹{stats.totalNetEarnings.toLocaleString('en-IN')}.00
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
              {stats.totalContests}
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
              {stats.totalJoinings}
            </span>
          </div>
        </div>
      </div>

      {/* Games Leaderboard Card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100 p-6 sm:p-8 min-h-[300px] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600 shrink-0 stroke-[2.2]" />
            <h3 className="font-semibold text-slate-800 text-base sm:text-lg">
              Games Leaderboard
            </h3>
          </div>
          {hasGameData && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
              {stats.games.length} Games Active
            </span>
          )}
        </div>

        {hasGameData ? (
          <div className="space-y-4">
            {/* Top 3 Spotlight Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {stats.games.slice(0, 3).map((game, idx) => {
                const podiumColors = [
                  'border-amber-400 bg-amber-50/40 text-amber-900',
                  'border-slate-300 bg-slate-50/60 text-slate-800',
                  'border-amber-700/40 bg-amber-100/20 text-amber-950',
                ];
                const badgeLabels = ['1st Place', '2nd Place', '3rd Place'];
                return (
                  <div
                    key={game.id}
                    className={`p-4 rounded-xl border ${podiumColors[idx]} flex items-center justify-between shadow-xs`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center font-bold text-sm text-slate-700 border border-slate-100">
                        <Trophy className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          {badgeLabels[idx]}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {game.name}
                        </h4>
                        <span className="text-xs text-slate-500">
                          ID: #{game.id} • {game.contests} Contests
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-sm text-blue-600">
                        {game.joinings}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        joinings
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Daily Games Breakdown Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[550px]">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-3">Rank</th>
                    <th className="py-2.5 px-3">Game</th>
                    <th className="py-2.5 px-3 text-center">Type</th>
                    <th className="py-2.5 px-3 text-center">Contests Run</th>
                    <th className="py-2.5 px-3 text-center">Joinings</th>
                    <th className="py-2.5 px-3 text-right">Entry Fees</th>
                    <th className="py-2.5 px-3 text-right">Net Earnings</th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-sm divide-y divide-slate-50">
                  {stats.games.map((game, i) => (
                    <tr key={game.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-500">#{i + 1}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <Gamepad2 className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="font-semibold text-slate-800">{game.name}</span>
                          <span className="text-xs text-slate-400 font-mono">({game.id})</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                          {game.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-medium text-slate-700">
                        {game.contests}
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-slate-900">
                        {game.joinings}
                      </td>
                      <td className="py-3 px-3 text-right font-medium text-slate-700">
                        ₹{game.entryFee.toLocaleString('en-IN')}.00
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-emerald-600">
                        ₹{game.netEarnings.toLocaleString('en-IN')}.00
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Empty state illustration & message matching Image 4 */
          <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-3">
              <GamesLeaderboardEmptyIcon className="w-10 h-10 text-slate-400" />
            </div>
            <p className="font-semibold text-slate-800 text-base">
              No game data available
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm">
              No games were active for {formatDailyDate(selectedDate)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
