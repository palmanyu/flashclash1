import React from 'react';
import {
  Trophy,
  Share2,
  Gift,
  HelpCircle,
  MessageCircle,
  Shield,
  FileText,
  Smartphone,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { RupeeGoldCoin, BoyAvatar } from './Artwork';

/**
 * Earn Tab View
 */
export const EarnTab: React.FC<{ onBackHome: () => void }> = ({ onBackHome }) => {
  return (
    <div className="px-4 py-3 space-y-4 pb-24 text-xs select-none">
      <div className="flex items-center justify-between border-b border-[#260808] pb-2.5">
        <button
          onClick={onBackHome}
          className="flex items-center gap-1 text-zinc-300 hover:text-white text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <h2 className="font-bold text-white text-base font-['Outfit',_sans-serif]">Earn Coins</h2>
        <div className="w-12"></div>
      </div>

      {/* Refer Card */}
      <div className="bg-gradient-to-br from-[#200404] via-[#120202] to-[#080101] p-4 rounded-2xl border border-red-900/60 shadow-[0_0_20px_rgba(220,38,38,0.2)] text-center space-y-2.5">
        <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-500/50 flex items-center justify-center mx-auto text-amber-300 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
          <Gift className="w-6 h-6 text-red-400" />
        </div>
        <h3 className="text-base font-black text-white uppercase tracking-wide font-['Outfit',_sans-serif]">
          Refer Friends &amp; Earn ₹15
        </h3>
        <p className="text-zinc-300 text-[11px]">
          Get ₹15 in your Gamex wallet whenever a friend registers and plays their first tournament!
        </p>

        <div className="bg-black/50 p-2.5 rounded-xl border border-red-800/40 flex items-center justify-between mt-2">
          <div>
            <span className="text-[10px] text-zinc-400 block">YOUR REFERRAL CODE</span>
            <span className="font-mono font-bold text-white text-sm">GAMEX_772</span>
          </div>
          <button className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer shadow-md">
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Daily Tasks */}
      <div className="space-y-2">
        <h4 className="font-bold text-white text-sm font-['Outfit',_sans-serif]">Daily Reward Missions</h4>
        <div className="bg-[#140404] border border-[#260808] p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">Join 2 Tournaments Today</span>
              <span className="text-[10px] text-zinc-400">Progress: 0 / 2</span>
            </div>
          </div>
          <div className="flex items-center gap-1 font-bold text-amber-300">
            <RupeeGoldCoin size={14} />
            <span>+₹5</span>
          </div>
        </div>

        <div className="bg-[#140404] border border-[#260808] p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-zinc-600 shrink-0" />
            <div>
              <span className="font-bold text-white block">Get 5 Kills in BR Full Map</span>
              <span className="text-[10px] text-zinc-400">Progress: 0 / 5</span>
            </div>
          </div>
          <div className="flex items-center gap-1 font-bold text-amber-300">
            <RupeeGoldCoin size={14} />
            <span>+₹10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Leaderboard Tab View
 */
export const LeaderboardTab: React.FC<{ onBackHome: () => void }> = ({ onBackHome }) => {
  const leaders = [
    { rank: 1, name: 'SK_SABIR_BOSS', kills: 142, won: 1250, badge: '🥇' },
    { rank: 2, name: 'RAISTAR_PRO', kills: 128, won: 980, badge: '🥈' },
    { rank: 3, name: 'BADESH_FF', kills: 114, won: 750, badge: '🥉' },
    { rank: 4, name: 'TOTAL_GAMER', kills: 96, won: 520, badge: '4' },
    { rank: 5, name: 'VINCENZO_007', kills: 84, won: 410, badge: '5' },
    { rank: 6, name: 'NINJA_WARRIOR', kills: 77, won: 360, badge: '6' },
  ];

  return (
    <div className="px-4 py-3 space-y-4 pb-24 text-xs select-none">
      <div className="flex items-center justify-between border-b border-[#260808] pb-2.5">
        <button
          onClick={onBackHome}
          className="flex items-center gap-1 text-zinc-300 hover:text-white text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <h2 className="font-bold text-white text-base font-['Outfit',_sans-serif]">Leaderboard</h2>
        <div className="w-12"></div>
      </div>

      {/* Podium Card */}
      <div className="bg-gradient-to-b from-[#1c0404] to-[#0c0202] p-4 rounded-2xl border border-red-900/60 text-center shadow-[0_0_20px_rgba(220,38,38,0.2)]">
        <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-1" />
        <span className="font-black text-white text-sm uppercase font-['Outfit',_sans-serif]">Weekly Champions</span>
        <p className="text-[11px] text-zinc-300 mt-0.5">Rankings reset every Sunday midnight</p>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-2">
        {leaders.map((p) => (
          <div
            key={p.rank}
            className={`p-3 rounded-xl border flex items-center justify-between ${
              p.rank <= 3
                ? 'bg-[#180404] border-red-800/60'
                : 'bg-[#100303] border-[#260808]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-black text-sm w-6 text-center">{p.badge}</span>
              <div>
                <span className="font-bold text-white block text-xs">{p.name}</span>
                <span className="text-[10px] text-zinc-400">{p.kills} Total Kills</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-emerald-400 font-bold text-xs flex items-center justify-end gap-0.5">
                <RupeeGoldCoin size={12} />
                ₹{p.won}
              </span>
              <span className="text-[10px] text-zinc-400">Earned</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Menu Tab View
 */
export const MenuTab: React.FC<{ onBackHome: () => void; onOpenRules: () => void }> = ({
  onBackHome,
  onOpenRules,
}) => {
  return (
    <div className="px-4 py-3 space-y-4 pb-24 text-xs select-none">
      <div className="flex items-center justify-between border-b border-[#260808] pb-2.5">
        <button
          onClick={onBackHome}
          className="flex items-center gap-1 text-zinc-300 hover:text-white text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <h2 className="font-bold text-white text-base font-['Outfit',_sans-serif]">Gamex Menu</h2>
        <div className="w-12"></div>
      </div>

      {/* User Quick Info */}
      <div className="bg-[#140404] border border-[#260808] p-3.5 rounded-2xl flex items-center gap-3">
        <BoyAvatar size={48} className="ring-2 ring-red-600/50" />
        <div>
          <h3 className="font-bold text-white text-sm font-['Outfit',_sans-serif]">Gamex Player</h3>
          <span className="text-[11px] text-zinc-400 font-mono">UID: 89402192</span>
          <span className="inline-block ml-2 text-[10px] bg-red-950 text-red-400 border border-red-800/80 px-1.5 py-0.5 rounded font-bold">
            VERIFIED
          </span>
        </div>
      </div>

      {/* Menu Options */}
      <div className="bg-[#100303] border border-[#260808] rounded-2xl overflow-hidden divide-y divide-[#260808]">
        <button
          onClick={onOpenRules}
          className="w-full p-3.5 flex items-center justify-between hover:bg-[#180404] transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-zinc-200">Official Tournament Rules</span>
          </div>
          <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded font-bold">
            10/day Limit
          </span>
        </button>

        <a
          href="https://whatsapp.com"
          target="_blank"
          rel="noreferrer"
          className="w-full p-3.5 flex items-center justify-between hover:bg-[#180404] transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-zinc-200">WhatsApp Player Support</span>
          </div>
          <span className="text-[10px] text-zinc-400">24/7 Live</span>
        </a>

        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="w-4 h-4 text-red-400" />
            <span className="font-semibold text-zinc-200">App Version</span>
          </div>
          <span className="text-[11px] font-mono text-zinc-400">v2.4.1 (Stable)</span>
        </div>

        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-red-400" />
            <span className="font-semibold text-zinc-200">Terms of Fair Play</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold">Strict Anti-Cheat</span>
        </div>
      </div>
    </div>
  );
};
