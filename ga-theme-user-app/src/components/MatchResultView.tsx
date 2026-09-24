import React, { useState } from 'react';
import {
  ChevronLeft,
  Trophy,
  Medal,
  Video,
  ExternalLink,
  Share2,
  Link2,
  CheckCircle,
  Copy,
} from 'lucide-react';
import { ContestBannerGraphic } from './ContestBannerGraphic';
import { RupeeGoldCoin } from './Artwork';
import { Contest } from '../data/contestsData';

interface MatchResultViewProps {
  contest: Contest;
  onBack: () => void;
  appUsername?: string;
}

export interface ResultPlayer {
  rank: number;
  name: string; // In-game name (Game Name)
  appUsername: string; // App username
  kills: number;
  prize: number;
}

export const MatchResultView: React.FC<MatchResultViewProps> = ({
  contest,
  onBack,
  appUsername = 'digicroz',
}) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const resultUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/contest/${contest.id}/result`
      : `/contest/${contest.id}/result`;

  const handleCopyShareLink = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(resultUrl);
    }
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  // 48 Player Results with Game Name (IGN) and App Username
  const rank1Player: ResultPlayer = {
    rank: 1,
    name: 'Puraini5947T',
    appUsername: 'puraini_5947',
    kills: 2,
    prize: 40,
  };

  const restResults: ResultPlayer[] = [
    { rank: 1, name: 'Pb light', appUsername: 'pb_light99', kills: 8, prize: 40 },
    { rank: 2, name: 'TSG RAHUL', appUsername: 'tsg_rahul', kills: 6, prize: 30 },
    { rank: 3, name: 'OP VINCENZO', appUsername: 'vincenzo_op', kills: 5, prize: 25 },
    { rank: 4, name: 'GAMEX_NINJA', appUsername: appUsername || 'digicroz', kills: 4, prize: 20 },
    { rank: 5, name: 'BOSS GAMER 99', appUsername: 'boss_gamer', kills: 3, prize: 15 },
    { rank: 6, name: 'RAISTAR FAN YT', appUsername: 'raistar_fan', kills: 3, prize: 15 },
    { rank: 7, name: 'DRACO AK47', appUsername: 'draco_ak47', kills: 2, prize: 10 },
    { rank: 8, name: 'SHADOW NINJA', appUsername: 'shadow_ninja', kills: 2, prize: 10 },
    { rank: 9, name: 'PURAINI OP', appUsername: 'puraini_op', kills: 2, prize: 10 },
    { rank: 10, name: 'WHITE 444', appUsername: 'white_444', kills: 2, prize: 10 },
    { rank: 11, name: 'B2K BORN2KILL', appUsername: 'b2k_official', kills: 1, prize: 5 },
    { rank: 12, name: 'BADGE 99 PRO', appUsername: 'badge99_pro', kills: 1, prize: 5 },
    { rank: 13, name: 'NOOB TO PRO', appUsername: 'noob_to_pro', kills: 1, prize: 5 },
    { rank: 14, name: 'KGF ROCKY', appUsername: 'rocky_kgf', kills: 1, prize: 5 },
    { rank: 15, name: 'MR TRIPLE R', appUsername: 'mr_triple_r', kills: 1, prize: 5 },
    { rank: 16, name: 'GOKU BLACK', appUsername: 'goku_black', kills: 1, prize: 5 },
    { rank: 17, name: 'LOKESH GAMER', appUsername: 'lokesh_gamer', kills: 1, prize: 5 },
    { rank: 18, name: 'ACTION BOLTE', appUsername: 'action_bolte', kills: 1, prize: 5 },
    { rank: 19, name: 'TOTAL GAMING', appUsername: 'total_gaming', kills: 0, prize: 0 },
    { rank: 20, name: 'Inder', appUsername: 'inder_singh', kills: 0, prize: 0 },
    { rank: 21, name: 'Rnx bean', appUsername: 'rnx_bean', kills: 0, prize: 0 },
    { rank: 22, name: 'MAD GOJO', appUsername: 'mad_gojo', kills: 0, prize: 0 },
    { rank: 23, name: 'RAJA', appUsername: 'raja_bhai', kills: 0, prize: 0 },
    { rank: 24, name: 'SlvrShade', appUsername: 'silver_shade', kills: 0, prize: 0 },
    { rank: 25, name: 'RFX.CANSOLO', appUsername: 'rfx_cansolo', kills: 0, prize: 0 },
    { rank: 26, name: 'Hyd_fluxo.7x', appUsername: 'hyd_fluxo', kills: 0, prize: 0 },
    { rank: 27, name: 'aerorush', appUsername: 'aero_rush', kills: 0, prize: 0 },
    { rank: 28, name: 'LOGAN LIVE', appUsername: 'logan_live', kills: 0, prize: 0 },
    { rank: 29, name: 'NM ANURAG', appUsername: 'anurag_nm', kills: 0, prize: 0 },
    { rank: 30, name: 'AAKASH_1M××', appUsername: 'aakash_1m', kills: 0, prize: 0 },
    { rank: 31, name: 'D-MAX69', appUsername: 'dmax_69', kills: 0, prize: 0 },
    { rank: 32, name: 'Godjalim', appUsername: 'god_jalim', kills: 0, prize: 0 },
    { rank: 33, name: 'ETERNITY ‡', appUsername: 'eternity_ff', kills: 0, prize: 0 },
    { rank: 34, name: 'jjcgjui', appUsername: 'jjcg_jui', kills: 0, prize: 0 },
    { rank: 35, name: 'RAHUL X', appUsername: 'rahul_x', kills: 0, prize: 0 },
    { rank: 36, name: 'Raistar', appUsername: 'raistar_yt', kills: 0, prize: 0 },
    { rank: 37, name: 'Nxt Aditya', appUsername: 'aditya_nxt', kills: 0, prize: 0 },
    { rank: 38, name: 'Ram', appUsername: 'ram_sharma', kills: 0, prize: 0 },
    { rank: 39, name: 'Dark Lord', appUsername: 'dark_lord_ff', kills: 0, prize: 0 },
    { rank: 40, name: 'EGO SAE', appUsername: 'ego_sae', kills: 0, prize: 0 },
    { rank: 41, name: 'MARCO', appUsername: 'marco_polo', kills: 0, prize: 0 },
    { rank: 42, name: "EAGLE'AKASH", appUsername: 'eagle_akash', kills: 0, prize: 0 },
    { rank: 43, name: 'BRU SAHIL', appUsername: 'sahil_bru', kills: 0, prize: 0 },
    { rank: 44, name: 'Titan exe', appUsername: 'titan_exe', kills: 0, prize: 0 },
    { rank: 45, name: 'BHIMKISAKTI', appUsername: 'bhim_ki_sakti', kills: 0, prize: 0 },
    { rank: 46, name: 'RLX SLASHERx', appUsername: 'rlx_slasher', kills: 0, prize: 0 },
    { rank: 47, name: '꧁टाइगर☬भाई꧂', appUsername: 'tiger_bhai', kills: 0, prize: 0 },
  ];

  return (
    <div className="flex flex-col h-full bg-white text-slate-900 select-none overflow-hidden animate-fadeIn">
      {/* 1. TOP HEADER */}
      <header className="shrink-0 h-14 bg-white border-b border-slate-200 shadow-sm px-3 flex items-center justify-between z-20">
        <button
          onClick={onBack}
          aria-label="Back"
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer z-10"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        <h1 className="font-['Outfit',_sans-serif] font-bold text-slate-900 text-[16px] sm:text-[17px] tracking-wide text-center flex-1 px-1 truncate">
          Match #{contest.id} Result
        </h1>

        <button
          onClick={handleCopyShareLink}
          title="Share Match Result Link"
          aria-label="Share Match Result Link"
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer z-10"
        >
          {copiedShare ? (
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          ) : (
            <Share2 className="w-5 h-5 text-slate-700" />
          )}
        </button>
      </header>

      {/* 2. SCROLLABLE RESULTS BODY */}
      <main className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 pb-24 overscroll-contain bg-white">
        {/* Tournament Poster Banner */}
        <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200">
          <ContestBannerGraphic
            bannerType={contest.bannerType}
            customTitle={
              contest.bannerType === 'duo-br'
                ? 'DUO BR FULL MAP'
                : contest.bannerType === 'cs-1v1'
                ? 'CLASH SQUAD 1V1'
                : 'SOLO BR FULL MAP'
            }
          />
        </div>

        {/* Title in Golden/Red Accent */}
        <div>
          <h2 className="font-extrabold text-[13px] sm:text-sm text-red-600 leading-snug tracking-tight font-['Outfit',_sans-serif]">
            {contest.title} - ID#{contest.id}
          </h2>
        </div>

        {/* Shareable Match Result URL Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Link2 className="w-4 h-4 text-red-600 shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Result URL
              </span>
              <span className="font-mono text-[11px] font-bold text-slate-700 truncate block">
                {resultUrl}
              </span>
            </div>
          </div>
          <button
            onClick={handleCopyShareLink}
            className="shrink-0 bg-white hover:bg-slate-100 border border-slate-300 active:scale-95 px-2.5 py-1.5 rounded-lg text-slate-800 font-bold text-[11px] flex items-center gap-1 shadow-2xs cursor-pointer transition-all"
          >
            {copiedShare ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>

        {/* Organized on Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 text-center shadow-xs">
          <span className="text-slate-600 font-medium text-xs sm:text-sm">
            Organized on{' '}
            <span className="font-bold text-slate-900">
              {contest.time.replace(/^Time\s*:\s*/i, '')}
            </span>
          </span>
        </div>

        {/* Badges: Prize Pool, Per Kill, Entry Fee */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-1 text-center shadow-xs">
            <span className="text-slate-900 font-bold text-xs">
              Prize Pool : {contest.prizePool}
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-1 text-center shadow-xs">
            <span className="text-slate-900 font-bold text-xs">
              Per Kill : {contest.perKill}
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-1 text-center shadow-xs">
            <span className="text-slate-900 font-bold text-xs">
              Entry Fee : {contest.entryFee}
            </span>
          </div>
        </div>

        {/* Result Note Section */}
        <div className="space-y-1.5 pt-1">
          <h3 className="font-bold text-xs sm:text-sm text-red-600 text-center tracking-tight font-['Outfit',_sans-serif]">
            Result Note
          </h3>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 min-h-[48px] text-[11px] text-slate-600">
            <p>
              Match concluded successfully. All prizes and kill bonuses have been credited to
              respective player wallets.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RANK 1 SECTION                                            */}
        {/* ========================================================= */}
        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
          {/* Header Banner */}
          <div className="bg-red-600 py-2 px-4 text-center font-extrabold text-xs sm:text-sm text-white tracking-wider font-['Outfit',_sans-serif]">
            Rank 1 Winner
          </div>

          {/* Table */}
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <th className="py-2.5 px-3 w-10">#</th>
                <th className="py-2.5 px-3">Game Name (App Username)</th>
                <th className="py-2.5 px-3 text-center w-16">Kills</th>
                <th className="py-2.5 px-3 text-right w-16">Prize</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-slate-50 text-slate-900 font-bold">
                <td className="py-2.5 px-3 text-red-600 font-extrabold">{rank1Player.rank}</td>
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Trophy className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                    <span className="text-slate-900 font-bold text-xs sm:text-sm">{rank1Player.name}</span>
                    <span className="text-slate-500 font-semibold text-[11px] bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
                      ({rank1Player.appUsername})
                    </span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-center font-bold text-slate-800">{rank1Player.kills}</td>
                <td className="py-2.5 px-3 text-right text-emerald-600 font-extrabold text-xs sm:text-sm">
                  ₹{rank1Player.prize}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ========================================================= */}
        {/* REST RESULT SECTION (Scrollable list of all 47 players)   */}
        {/* ========================================================= */}
        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
          {/* Header Banner */}
          <div className="bg-red-600 py-2 px-4 text-center font-extrabold text-xs sm:text-sm text-white tracking-wider font-['Outfit',_sans-serif]">
            Rest Result
          </div>

          {/* Table */}
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <th className="py-2.5 px-3 w-10">#</th>
                <th className="py-2.5 px-3">Game Name (App Username)</th>
                <th className="py-2.5 px-3 text-center w-16">Kills</th>
                <th className="py-2.5 px-3 text-right w-16">Prize</th>
              </tr>
            </thead>
            <tbody>
              {restResults.map((player, idx) => {
                const isCurrentUser =
                  player.name === 'GAMEX_NINJA' || player.appUsername === appUsername;
                return (
                  <tr
                    key={idx}
                    className={`font-semibold border-b border-slate-100 transition-colors ${
                      isCurrentUser
                        ? 'bg-red-50/80 text-red-900 border-l-3 border-l-red-600'
                        : idx % 2 === 0
                        ? 'bg-white text-slate-800'
                        : 'bg-slate-50/60 text-slate-800'
                    }`}
                  >
                    <td className="py-2.5 px-3 text-slate-500 font-bold">{player.rank}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                        <span className="font-bold text-slate-900">{player.name}</span>
                        <span className="text-slate-500 font-semibold text-[11px]">
                          ({player.appUsername})
                        </span>
                        {isCurrentUser && (
                          <span className="text-[9px] bg-red-600 text-white font-extrabold px-1.5 py-0.5 rounded tracking-wider shadow-2xs">
                            YOU
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-700 font-bold">{player.kills}</td>
                    <td className="py-2.5 px-3 text-right font-extrabold">
                      {player.prize > 0 ? (
                        <span className="text-emerald-600 font-extrabold">₹{player.prize}</span>
                      ) : (
                        <span className="text-slate-400 font-normal">₹0</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Watch Match live recording if available */}
        {contest.youtubeLiveUrl && (
          <div className="pt-2">
            <a
              href={contest.youtubeLiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>WATCH RECORDING ON YOUTUBE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </main>
    </div>
  );
};
