import React, { useState, useEffect } from 'react';
import { ChevronLeft, Copy, CheckCircle, X, Users, ShieldAlert, Share2, Link2, Check, Lock, Edit3 } from 'lucide-react';
import { ContestBannerGraphic } from './ContestBannerGraphic';
import { RupeeGoldCoin } from './Artwork';
import { Contest, getContestTeam } from '../data/contestsData';
import { ToastNotification } from './ToastNotification';

interface ContestDetailViewProps {
  contest: Contest;
  balance: number;
  appUsername?: string;
  onBack: () => void;
  onJoinMatch?: (contestId: string, ign: string) => void;
  onJoinContest?: (ign: string) => void;
  onOpenRecharge?: () => void;
}

export const ContestDetailView: React.FC<ContestDetailViewProps> = ({
  contest,
  balance,
  appUsername = 'digicroz',
  onBack,
  onJoinMatch,
  onJoinContest,
  onOpenRecharge,
}) => {
  // Share link state
  const [copiedShare, setCopiedShare] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const contestUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/contest/${contest.id}`
      : `/contest/${contest.id}`;

  const handleCopyShareLink = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(String(contest.id));
    }
    setCopiedShare(true);
    showToast('Match ID copied to clipboard!');
    setTimeout(() => setCopiedShare(false), 2000);
  };

  // Countdown Timer
  const [timeLeft, setTimeLeft] = useState('0d 0h 12m 17s');
  useEffect(() => {
    let seconds = 12 * 60 + 17;
    const interval = setInterval(() => {
      seconds = Math.max(0, seconds - 1);
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      setTimeLeft(`0d 0h ${m}m ${s < 10 ? '0' : ''}${s}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Modals inside detail view
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinStep, setJoinStep] = useState<'selectPosition' | 'confirm'>('selectPosition');
  const [selectedTeam, setSelectedTeam] = useState<number>(40);
  const [selectedPos, setSelectedPos] = useState<string>('1');
  const [ign, setIgn] = useState(contest.userIgn || '');
  const [inGameId, setInGameId] = useState('4320281048');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [tempIgn, setTempIgn] = useState('');
  const [tempInGameId, setTempInGameId] = useState('');

  const [isViewMatchModalOpen, setIsViewMatchModalOpen] = useState(false);
  const [isJoiningsModalOpen, setIsJoiningsModalOpen] = useState(false);
  const [joiningsTab, setJoiningsTab] = useState<'all' | 'my'>('all');
  const [joinError, setJoinError] = useState('');
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const teamType = getContestTeam(contest);
  const isFull = contest.spotsFilled >= contest.spotsTotal;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedText(label);
    showToast(label === 'room' ? 'Room ID copied to clipboard!' : 'Room Password copied to clipboard!');
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleCopyContestId = () => {
    navigator.clipboard?.writeText(String(contest.id));
    setCopiedId(true);
    showToast('Match ID copied to clipboard!');
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleOpenJoinFlow = () => {
    if (isFull && !contest.isJoined) return;
    setJoinStep('selectPosition');
    setJoinError('');
    setJoinSuccess(false);
    setIsJoinModalOpen(true);
  };

  const handleOpenDetailsModal = () => {
    setTempIgn(ign);
    setTempInGameId(inGameId);
    setIsDetailsModalOpen(true);
  };

  const handleSaveDetails = () => {
    if (!tempIgn.trim()) {
      return;
    }
    setIgn(tempIgn.trim());
    if (tempInGameId.trim()) {
      setInGameId(tempInGameId.trim());
    }
    setJoinError('');
    setIsDetailsModalOpen(false);
  };

  const handleConfirmJoin = () => {
    if (!ign.trim()) {
      handleOpenDetailsModal();
      return;
    }
    if (balance < contest.entryFee) {
      setJoinError('Insufficient balance! Please recharge your wallet.');
      return;
    }

    setJoinSuccess(true);
    setTimeout(() => {
      if (onJoinContest) {
        onJoinContest(ign);
      } else if (onJoinMatch) {
        onJoinMatch(contest.id, ign);
      }
      setJoinSuccess(false);
      setIsJoinModalOpen(false);
    }, 1200);
  };

  // Joinings List matching Image 2
  interface JoinEntry {
    teamNo: number;
    pos: string;
    ign: string;
    gameId: string;
    appUsername?: string;
    isUser?: boolean;
  }

  const defaultJoinings: JoinEntry[] = [
    { teamNo: 9, pos: 'A', ign: 'SUPREME', gameId: '4928103941', appUsername: 'supreme_gamer' },
    { teamNo: 8, pos: 'A', ign: 'Gigachad', gameId: '8204719204', appUsername: 'chad_ff' },
    { teamNo: 1, pos: 'A', ign: 'MH DADDY', gameId: '1092847192', appUsername: 'mh_daddy' },
    { teamNo: 6, pos: 'A', ign: 'Try nxt tme', gameId: '6910284719', appUsername: 'trynext_time' },
    { teamNo: 2, pos: 'A', ign: '∩GU   J A I N I T  ᵞ', gameId: '4320281048', appUsername: 'jainit_07' },
    { teamNo: 3, pos: 'A', ign: 'A!waysbroken', gameId: '3660569439', appUsername: 'always_broken' },
    { teamNo: 7, pos: 'A', ign: 'JACK SPARROW', gameId: '7102948192', appUsername: 'sparrow_king' },
    { teamNo: 48, pos: 'A', ign: '1729315801', gameId: '5920194820', appUsername: 'mr_aryan' },
    { teamNo: 15, pos: 'A', ign: 'GOKU', gameId: '2019481029', appUsername: 'goku_ssj' },
    { teamNo: 11, pos: 'A', ign: 'OP   UMP  ᴀ︻╦', gameId: '7982457052', appUsername: 'op_ump' },
    { teamNo: 44, pos: 'A', ign: 'DARK YT', gameId: '9182047192', appUsername: 'dark_yt' },
    { teamNo: 4, pos: 'A', ign: 'Blitz exe', gameId: '3819204719', appUsername: 'blitz_exe' },
    { teamNo: 12, pos: 'A', ign: 'RAISTAR_FAN', gameId: '5420194821', appUsername: 'raistar_lover' },
    { teamNo: 14, pos: 'A', ign: 'TITAN_EXE', gameId: '6102948192', appUsername: 'titan_boss' },
    { teamNo: 18, pos: 'A', ign: 'MAD_GOJO', gameId: '8129034812', appUsername: 'gojo_sensei' },
  ];

  const occupiedTeamNos = new Set(defaultJoinings.map((j) => j.teamNo));

  const userEntry: JoinEntry | null = contest.isJoined
    ? {
        teamNo: selectedTeam || 40,
        pos: selectedPos || 'A',
        ign: contest.userIgn || ign || 'GAMEX_NINJA',
        gameId: inGameId || '4320281048',
        appUsername: appUsername || 'digicroz',
        isUser: true,
      }
    : null;

  const allPlayers: JoinEntry[] = userEntry ? [userEntry, ...defaultJoinings] : defaultJoinings;
  const displayPlayers: JoinEntry[] = joiningsTab === 'my'
    ? (userEntry ? [userEntry] : [])
    : allPlayers;

  return (
    <div className="flex flex-col h-full bg-white text-slate-900 select-none overflow-hidden animate-fadeIn">
      {/* Toast Notification Alert Matching White Theme */}
      <ToastNotification message={toastMsg} onClose={() => setToastMsg('')} />

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
          Contest Details #{contest.id}
        </h1>

        <button
          onClick={handleCopyShareLink}
          title="Share Contest Link"
          aria-label="Share Contest Link"
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer z-10"
        >
          {copiedShare ? (
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          ) : (
            <Share2 className="w-5 h-5 text-slate-700" />
          )}
        </button>
      </header>

      {/* 2. SCROLLABLE BODY */}
      <main className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 pb-24 overscroll-contain bg-white">
        {/* Tournament Poster Banner Graphic */}
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

        {/* Time Left Box */}
        {contest.status === 'upcoming' && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 text-center shadow-xs">
            <span className="text-slate-600 font-medium text-xs sm:text-sm tracking-wide">
              Time Left: <span className="font-bold text-red-600 font-mono">{timeLeft}</span>
            </span>
          </div>
        )}

        {/* Contest ID with Copy ID Button (Replaces Contest URL Box) */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium text-xs">Contest ID:</span>
            <span className="font-mono font-extrabold text-red-600 text-xs sm:text-sm">#{contest.id}</span>
          </div>
          <button
            onClick={handleCopyContestId}
            className="bg-white hover:bg-slate-100 border border-slate-300 active:scale-95 px-3 py-1 rounded-lg text-slate-800 font-bold text-[11px] flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
          >
            {copiedId ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>Copy ID</span>
              </>
            )}
          </button>
        </div>

        {/* Title with Red Accent */}
        <div>
          <h2 className="font-extrabold text-[13px] sm:text-sm text-red-600 leading-snug tracking-tight font-['Outfit',_sans-serif]">
            {contest.title} - ID#{contest.id}
          </h2>
        </div>

        {/* Badges Row 1: Team, Map, Type */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-center shadow-xs">
            <span className="text-slate-500 font-medium text-xs">Team: <span className="text-slate-900 font-bold">{teamType}</span></span>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-center shadow-xs">
            <span className="text-slate-500 font-medium text-xs">Map: <span className="text-slate-900 font-bold">{contest.map}</span></span>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-center shadow-xs">
            <span className="text-slate-500 font-medium text-xs">Type: <span className="text-slate-900 font-bold">{contest.type}</span></span>
          </div>
        </div>

        {/* Badges Row 2: Match Type, Entry Fee */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-center shadow-xs">
            <span className="text-slate-500 font-medium text-xs">
              Match Type: <span className="font-bold text-slate-900">{contest.entryFee > 0 ? 'Paid' : 'Free'}</span>
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-center shadow-xs flex items-center justify-center gap-1.5">
            <span className="text-slate-500 font-medium text-xs">Entry Fee:</span>
            <div className="flex items-center gap-1 font-bold text-slate-900 text-xs">
              <RupeeGoldCoin size={14} />
              <span>{contest.entryFee}</span>
            </div>
          </div>
        </div>

        {/* Badges Row 3: Match Schedule */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 shadow-xs text-center">
          <span className="text-slate-500 font-medium text-xs">
            Match Schedule:{' '}
            <span className="text-slate-900 font-bold">
              {contest.time.replace(/^Time\s*:\s*/i, '')}
            </span>
          </span>
        </div>

        {/* Prize Details Section */}
        <div className="space-y-1.5 pt-1">
          <h3 className="font-bold text-xs sm:text-sm text-red-600 tracking-tight font-['Outfit',_sans-serif]">
            Prize Details
          </h3>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-xs space-y-1">
            <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
              <span>BOOYAH</span>
              <span className="text-emerald-600 font-extrabold">{contest.prizePool > 0 ? Math.round(contest.prizePool * 0.4) : 30} COINS</span>
            </div>
            <div className="text-[11px] font-bold text-slate-500 tracking-wide">
              ONLY ON FULL SLOT
            </div>
          </div>
        </div>

        {/* About this Match / Rules and Regulations Section */}
        <div className="space-y-1.5 pt-1">
          <h3 className="font-bold text-xs sm:text-sm text-red-600 tracking-tight font-['Outfit',_sans-serif]">
            About this Match
          </h3>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 shadow-sm space-y-3">
            <div className="text-center pb-2 border-b border-slate-200">
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight font-['Outfit',_sans-serif]">
                Rules and Regulations
              </h4>
            </div>

            <ul className="space-y-2 text-[11px] sm:text-xs text-slate-600 leading-relaxed list-disc list-outside pl-4">
              <li>
                <span className="font-bold text-slate-900">Level Requirement:</span> Only players
                with Level 40+ IDs are eligible to participate.
              </li>
              <li>
                <span className="font-bold text-slate-900">Headshot Rate:</span> CS career
                headshot rate must not exceed 70%.
              </li>
              <li>
                <span className="font-bold text-slate-900">Device Requirements:</span> The match
                must be played exclusively on a smartphone or tablet. Emulators are strictly
                prohibited.
              </li>
              <li>
                <span className="font-bold text-slate-900">
                  Use simple text when registering ( example - RONITH ✅ RoN!th★X ❎ don&apos;t use
                  any kind of symbol)
                </span>
              </li>
              <li className="font-bold text-red-600 list-none -ml-4 pt-1">
                Prohibited Behavior:-
              </li>
              <li>
                To ensure fair gameplay, the following actions are strictly prohibited:
              </li>
              <li>
                <span className="font-bold text-slate-900">Using Unauthorized Tools:</span>{' '}
                Employing tools such as aimbots, no-recoil applications, or any game-modifying
                software.
              </li>
              <li>
                <span className="font-bold text-slate-900">Teaming Up with Opponents:</span>{' '}
                Collaborating with opponents to gain an unfair advantage during the gameplay.
              </li>
              <li>
                <span className="font-bold text-slate-900">
                  Adding Unregistered Players to the Custom Room:
                </span>{' '}
                Inviting unregistered players and eliminating them during the gameplay.
              </li>
              <li>
                <span className="font-bold text-slate-900">Using Prohibited Guns:</span> Employing
                Double Vector guns during the gameplay.
              </li>
              <li>
                <span className="font-bold text-slate-900">Using Prohibited Character:</span>{' '}
                Employing Ryden Character during the gameplay.
              </li>
              <li>
                <span className="font-bold text-slate-900">Mandatory Gameplay Recording:</span>{' '}
                The gameplay must be recorded using the in-game recording tools available in Free Fire
                MAX or a screen recorder. Failure to comply will lead to penalties.
              </li>
              <li>
                <span className="font-bold text-slate-900">
                  Mandatory Screen Recording for the Custom Room:
                </span>{' '}
                Players must record their screens while joining the custom room.
              </li>
              <li>
                The use of multiple accounts by a single user is strictly prohibited. Any player
                found to be using multiple IDs will be permanently banned from our platform.
              </li>
              <li>
                Blacklisted Game-ID&apos;s are not allowed to play and immediate ban will be issued if we
                got any report from Garena.
              </li>
              <li>
                <span className="font-bold text-slate-900">Match Result:</span> The result will be
                generated within 1 to 1.5 hours after the scheduled match time.
              </li>
              <li>
                <span className="font-bold text-slate-900">Refund Policy:</span> Refunds will not be
                provided for missed matches. However, if GameX-related issues (e.g., server errors)
                occur, refunds may be considered on a case-by-case basis.
              </li>
              <li>
                <span className="font-bold text-slate-900">Match Registration Restriction:</span>{' '}
                Once you join a match, your registration cannot be canceled.
              </li>
              <li>
                <span className="font-bold text-slate-900">Rights:</span> GameX reserves the right to
                modify match prizes, rules &amp; regulations at its discretion.
              </li>
              <li>
                <span className="font-bold text-slate-900">Horse:</span> horse is completely
                banned if anyone uses horse prize will not be given to him
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* 3. FLOATING ACTION BAR TOUCHED AT BOTTOM */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 px-3.5 py-2.5 z-30 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        {contest.status === 'upcoming' ? (
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setJoiningsTab('all');
                setIsJoiningsModalOpen(true);
              }}
              className="flex-1 py-3 px-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 font-extrabold text-[12px] sm:text-xs uppercase tracking-wider transition-all active:scale-[0.98] shadow-2xs text-center cursor-pointer truncate"
            >
              VIEW ALL JOININGS
            </button>

            <button
              onClick={handleOpenJoinFlow}
              disabled={isFull && !contest.isJoined}
              className={`flex-1 py-3 px-2 rounded-xl font-extrabold text-[12px] sm:text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer active:scale-[0.98] text-center truncate ${
                contest.isJoined
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : isFull
                  ? 'bg-red-600/85 text-white cursor-not-allowed opacity-90'
                  : 'bg-[#ef4444] hover:bg-[#dc2626] text-white'
              }`}
            >
              {contest.isJoined ? 'Already Joined' : isFull ? 'Match Full' : 'Join Match'}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsViewMatchModalOpen(true)}
            className="w-full py-3 rounded-xl bg-[#ef4444] hover:bg-[#dc2626] active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-md transition-all cursor-pointer uppercase"
          >
            View Match
          </button>
        )}
      </footer>

      {/* ========================================================= */}
      {/* 1. JOIN MATCH MODAL FLOW (OUR WHITE BACKGROUND THEME)     */}
      {/* ========================================================= */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-md h-full sm:h-[94vh] sm:max-h-[720px] bg-white sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col text-slate-900 border border-slate-200">
            {/* TOP HEADER */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-200 shrink-0">
              <button
                onClick={() => {
                  if (joinStep === 'confirm') {
                    setJoinStep('selectPosition');
                  } else {
                    setIsJoinModalOpen(false);
                  }
                }}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center cursor-pointer text-slate-700 active:scale-95 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <h2 className="font-extrabold text-base sm:text-lg text-slate-900 font-['Outfit',_sans-serif] tracking-wide">
                Joining Match
              </h2>

              <button
                onClick={() => setIsJoinModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center cursor-pointer text-slate-500 active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* STEP 1: SELECT MATCH POSITION (OUR WHITE THEME) */}
            {joinStep === 'selectPosition' && (
              <div className="flex-1 flex flex-col min-h-0 bg-white">
                {/* Cyan Banner */}
                <div className="bg-[#17b8df] text-white font-extrabold text-center py-2 text-xs sm:text-sm tracking-wide shrink-0 font-['Outfit',_sans-serif]">
                  Select Match Position
                </div>

                {/* Table Header */}
                <div className="bg-slate-100 px-5 py-2.5 flex items-center justify-between border-b border-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm shrink-0 select-none">
                  <span>Team</span>
                  <span className="pr-1">A</span>
                </div>

                {/* Scrollable Team List */}
                <div className="flex-1 overflow-y-auto px-4 py-1 divide-y divide-slate-100 scrollbar-thin scrollbar-thumb-slate-300">
                  {Array.from({ length: 48 }, (_, idx) => idx + 1).map((teamNum) => {
                    const isOccupied = occupiedTeamNos.has(teamNum);
                    const isSelected = selectedTeam === teamNum && !isOccupied;

                    return (
                      <div
                        key={teamNum}
                        onClick={() => {
                          if (!isOccupied) {
                            setSelectedTeam(teamNum);
                            setSelectedPos('1');
                            setJoinError('');
                          }
                        }}
                        className={`flex items-center justify-between py-2.5 px-2 rounded-lg transition-colors select-none ${
                          isOccupied
                            ? 'opacity-40 cursor-not-allowed text-slate-400'
                            : isSelected
                            ? 'bg-sky-50 cursor-pointer'
                            : 'hover:bg-slate-50 cursor-pointer'
                        }`}
                      >
                        <span
                          className={`text-xs sm:text-sm font-bold ${
                            isSelected ? 'text-sky-700' : 'text-slate-900'
                          }`}
                        >
                          Team {teamNum}
                        </span>

                        <div className="flex items-center gap-3">
                          <span className="text-xs sm:text-sm font-semibold text-slate-700">1</span>

                          {isOccupied ? (
                            <div className="w-5 h-5 rounded-xs bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-500">
                              <Lock className="w-3 h-3" />
                            </div>
                          ) : isSelected ? (
                            <div className="w-5 h-5 rounded-xs bg-[#17b8df] border-2 border-sky-600 flex items-center justify-center text-white shadow-2xs">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-xs border-2 border-slate-300 bg-white hover:border-[#17b8df] transition-colors" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Error Banner if any */}
                {joinError && (
                  <div className="mx-4 mb-2 p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs text-center">
                    {joinError}
                  </div>
                )}

                {/* Bottom Red Join Now Button */}
                <div className="p-4 bg-white border-t border-slate-200 shrink-0">
                  <button
                    onClick={() => {
                      if (occupiedTeamNos.has(selectedTeam)) {
                        setJoinError('Selected team slot is already taken. Please choose another.');
                        return;
                      }
                      setJoinError('');
                      setJoinStep('confirm');
                    }}
                    className="w-full py-3 rounded-xl bg-[#ef4444] hover:bg-[#dc2626] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-md transition-all cursor-pointer"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CONFIRMATION & WALLET & SELECTED POSITION (OUR WHITE THEME) */}
            {joinStep === 'confirm' && (
              <div className="flex-1 flex flex-col min-h-0 justify-between p-5 bg-white">
                <div className="space-y-6">
                  {/* Top Wallet & Balance Info */}
                  <div className="flex items-center justify-between gap-4 pt-2">
                    {/* Left: Golden Rounded Wallet Graphic */}
                    <div className="w-20 h-16 shrink-0 relative">
                      <svg className="w-full h-full drop-shadow-md" viewBox="0 0 96 74" fill="none">
                        <rect x="2" y="6" width="92" height="62" rx="14" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
                        <path d="M 2 20 Q 48 16 94 20" stroke="#B45309" strokeWidth="2" strokeDasharray="4 3" opacity="0.4" />
                        <path d="M 50 22 H 94 V 52 H 50 C 42 52 42 22 50 22 Z" fill="#D97706" />
                        <circle cx="82" cy="37" r="5" fill="#071426" stroke="#FDE68A" strokeWidth="2.5" />
                      </svg>
                    </div>

                    {/* Right: Balance, Fee, and Total Amount */}
                    <div className="flex-1 space-y-1.5 text-right font-medium text-xs sm:text-sm text-slate-700">
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-slate-600">Your Current Balance :</span>
                        <span className="font-bold text-amber-600 flex items-center gap-1">
                          <RupeeGoldCoin size={14} />
                          {balance}
                        </span>
                      </div>

                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-slate-600">Entry Fee Per Person :</span>
                        <span className="font-bold text-amber-600 flex items-center gap-1">
                          <RupeeGoldCoin size={14} />
                          {contest.entryFee}
                        </span>
                      </div>

                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-slate-900 font-semibold">Total Payable Amount :</span>
                        <span className="font-bold text-amber-700 flex items-center gap-1">
                          <RupeeGoldCoin size={14} />
                          {contest.entryFee}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Selected Position Card */}
                  <div className="bg-slate-50 rounded-xl p-4 text-slate-800 shadow-sm border border-slate-200">
                    <h3 className="text-center font-extrabold text-sm sm:text-base text-slate-900 mb-3 font-['Outfit',_sans-serif]">
                      Selected Position
                    </h3>

                    <div className="grid grid-cols-4 text-center border-b border-slate-200 pb-2 text-[11px] sm:text-xs font-bold text-slate-500">
                      <div>Team</div>
                      <div>Position</div>
                      <div>InGameName</div>
                      <div>GameID</div>
                    </div>

                    <div className="grid grid-cols-4 text-center items-center pt-3 text-xs sm:text-sm font-bold text-slate-900">
                      <div>Team {selectedTeam}</div>
                      <div>{selectedPos}</div>
                      <div className="flex items-center justify-center">
                        {ign.trim() ? (
                          <div className="flex items-center justify-center gap-1">
                            <span className="truncate max-w-[70px] text-slate-900 font-extrabold">
                              {ign}
                            </span>
                            <button
                              onClick={handleOpenDetailsModal}
                              className="text-sky-600 hover:text-sky-800 p-0.5 cursor-pointer"
                              title="Edit Info"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={handleOpenDetailsModal}
                            className="bg-[#179be7] hover:bg-[#0284c7] text-white text-[11px] px-2 py-0.5 rounded font-bold shadow-xs active:scale-95 cursor-pointer transition-all"
                          >
                            Add info
                          </button>
                        )}
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <span className="font-mono text-slate-800 text-xs font-bold truncate max-w-[85px]">
                          {inGameId || '4320281048'}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium truncate max-w-[85px] leading-tight mt-0.5">
                          {appUsername || 'digicroz'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Error or Success feedback */}
                  {joinError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center space-y-2">
                      <p>{joinError}</p>
                      {balance < contest.entryFee && onOpenRecharge && (
                        <button
                          onClick={() => {
                            setIsJoinModalOpen(false);
                            onOpenRecharge();
                          }}
                          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1 rounded-lg text-xs cursor-pointer shadow-sm"
                        >
                          Recharge Wallet
                        </button>
                      )}
                    </div>
                  )}

                  {joinSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs text-center flex items-center justify-center gap-2 font-bold">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Registration Confirmed! Slot booked successfully.</span>
                    </div>
                  )}
                </div>

                {/* Bottom Controls */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setJoinStep('selectPosition')}
                      className="flex-1 py-2.5 rounded-lg bg-[#f87171] hover:bg-[#ef4444] active:scale-95 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      CANCEL
                    </button>

                    <button
                      onClick={handleConfirmJoin}
                      disabled={joinSuccess}
                      className="flex-1 py-2.5 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] active:scale-95 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      JOIN
                    </button>
                  </div>

                  <p className="text-center text-slate-600 text-xs sm:text-sm font-medium">
                    Note - Please Enter Your In Game Username/Name
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1B. PLAYER GAME DETAILS MODAL (OUR WHITE THEME)           */}
      {/* ========================================================= */}
      {isDetailsModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-sm overflow-hidden shadow-2xl text-slate-900 animate-scaleUp">
            {/* Top Cyan Bar */}
            <div className="bg-[#17b8df] text-white font-extrabold text-center py-2.5 text-xs sm:text-sm tracking-wide font-['Outfit',_sans-serif]">
              Player Game Details
            </div>

            <div className="p-5 space-y-4">
              {/* inGameName */}
              <div className="space-y-1">
                <label className="block text-slate-700 text-xs font-semibold">
                  inGameName
                </label>
                <input
                  type="text"
                  value={tempIgn}
                  onChange={(e) => setTempIgn(e.target.value)}
                  placeholder="Enter Free Fire IGN..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:border-[#17b8df] focus:outline-none transition-colors"
                  autoFocus
                />
              </div>

              {/* inGameId */}
              <div className="space-y-1">
                <label className="block text-slate-700 text-xs font-semibold">
                  inGameId
                </label>
                <input
                  type="text"
                  value={tempInGameId}
                  onChange={(e) => setTempInGameId(e.target.value)}
                  placeholder="Enter Free Fire In-Game UID..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:border-[#17b8df] focus:outline-none transition-colors"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5 px-0.5">
                  <span>Username:</span>
                  <span className="font-semibold text-slate-700">{appUsername}</span>
                </div>
              </div>

              {/* Helper Note */}
              <p className="text-[11px] text-slate-500 pt-1 font-medium">
                Make sure you have entered correct inGameName &amp; inGameId
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="flex-1 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-extrabold text-xs sm:text-sm uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
                >
                  CANCEL
                </button>

                <button
                  onClick={handleSaveDetails}
                  className="flex-1 py-2 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider active:scale-95 transition-all cursor-pointer shadow-sm"
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. VIEW MATCH (ROOM ID & PASSWORD) MODAL */}
      {isViewMatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-sm overflow-hidden shadow-2xl text-slate-900 animate-scaleUp">
            {/* Top Cyan Bar */}
            <div className="bg-[#17b8df] text-white font-extrabold text-center py-2.5 text-xs sm:text-sm tracking-wide font-['Outfit',_sans-serif] flex items-center justify-between px-4">
              <span>ROOM CREDENTIALS #{contest.id}</span>
              <button
                onClick={() => setIsViewMatchModalOpen(false)}
                className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center cursor-pointer text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Room ID:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-red-600 text-sm">
                      {contest.roomId || '9482088'}
                    </span>
                    <button
                      onClick={() => handleCopy(contest.roomId || '9482088', 'room')}
                      className="p-1 rounded bg-slate-200 text-slate-700 hover:text-slate-900 cursor-pointer border border-slate-300 transition-all"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Password:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-red-600 text-sm">
                      {contest.roomPassword || '555'}
                    </span>
                    <button
                      onClick={() => handleCopy(contest.roomPassword || '555', 'pass')}
                      className="p-1 rounded bg-slate-200 text-slate-700 hover:text-slate-900 cursor-pointer border border-slate-300 transition-all"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {copiedText && (
                  <p className="text-emerald-600 text-[10px] text-right font-medium">
                    Copied to clipboard!
                  </p>
                )}
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] leading-relaxed">
                <p className="text-amber-600 font-bold mb-0.5">⚠️ Quick Reminder:</p>
                <p>Enter room 5 minutes before scheduled match. Do not share password or invite unregistered guests.</p>
              </div>

              <button
                onClick={() => setIsViewMatchModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#ef4444] hover:bg-[#dc2626] text-white font-extrabold cursor-pointer transition-all shadow-md active:scale-95 uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. VIEW ALL JOININGS FULL VIEW (OUR WHITE BACKGROUND THEME) */}
      {isJoiningsModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white text-slate-900 animate-fadeIn max-w-md mx-auto">
          {/* Top Bar Header */}
          <header className="h-14 px-3 flex items-center justify-between shrink-0 bg-white border-b border-slate-200">
            <button
              onClick={() => setIsJoiningsModalOpen(false)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
              aria-label="Back"
            >
              <ChevronLeft className="w-7 h-7 stroke-[2.5]" />
            </button>

            <h2 className="font-['Outfit',_sans-serif] font-extrabold text-slate-900 text-[17px] tracking-wide text-center">
              All Joinings
            </h2>

            <div className="w-10 flex justify-end">
              <span className="text-[11px] font-mono text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md font-bold">
                {contest.spotsFilled}/{contest.spotsTotal}
              </span>
            </div>
          </header>

          {/* Cyan Sub-Banner matching the app theme */}
          <div className="bg-[#17b8df] text-white font-extrabold text-center py-2 text-xs sm:text-sm tracking-wide shrink-0 font-['Outfit',_sans-serif]">
            Registered Participants &amp; Slots
          </div>

          {/* Table Header Row (Clean white/slate background) */}
          <div className="bg-slate-100 px-3.5 py-2.5 flex items-center border-b border-slate-200 text-slate-600 font-extrabold text-[11px] sm:text-xs tracking-wider shrink-0 select-none">
            <span className="w-16 sm:w-20 shrink-0 text-left">Team</span>
            <span className="w-10 sm:w-12 shrink-0 text-center">Pos.</span>
            <span className="flex-1 text-left px-2">In Game Name</span>
            <span className="w-28 sm:w-32 shrink-0 text-right">In Game Id</span>
          </div>

          {/* Table Content */}
          <div className="flex-1 overflow-y-auto px-2 py-1 text-xs divide-y divide-slate-100 scrollbar-thin scrollbar-thumb-slate-300">
            {displayPlayers.length > 0 ? (
              displayPlayers.map((player, idx) => (
                <div
                  key={idx}
                  className={`flex items-center py-2.5 px-3 transition-colors rounded-lg my-0.5 ${
                    player.isUser
                      ? 'bg-sky-50 border border-sky-200 text-slate-950 font-bold'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span className="w-16 sm:w-20 shrink-0 font-bold text-slate-900 text-xs sm:text-sm">
                    Team {player.teamNo}
                  </span>
                  <span className="w-10 sm:w-12 shrink-0 font-bold text-[#0284c7] text-center text-xs sm:text-sm">
                    {player.pos}
                  </span>
                  <span className="flex-1 px-2 font-bold text-slate-900 text-xs sm:text-sm truncate">
                    {player.ign}
                    {player.isUser && (
                      <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] bg-[#17b8df] text-white font-extrabold uppercase">
                        YOU
                      </span>
                    )}
                  </span>
                  <div className="w-28 sm:w-32 shrink-0 text-right flex flex-col items-end justify-center">
                    <span className="font-mono text-slate-800 text-xs font-semibold truncate leading-tight">
                      {player.gameId || '—'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium truncate leading-tight mt-0.5">
                      {player.appUsername || (player.isUser ? appUsername : `user_${player.teamNo}`)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 px-4 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-slate-600 font-semibold text-sm">
                  You haven&apos;t joined this match yet.
                </p>
                <button
                  onClick={() => {
                    setIsJoiningsModalOpen(false);
                    handleOpenJoinFlow();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-all shadow-md active:scale-95"
                >
                  Join Match Now
                </button>
              </div>
            )}
          </div>

          {/* Bottom Dual Split Buttons Touching Bottom */}
          <div className="h-13 shrink-0 flex items-stretch bg-white z-10 border-t border-slate-200">
            <button
              onClick={() => setJoiningsTab(joiningsTab === 'my' ? 'all' : 'my')}
              className={`flex-1 font-extrabold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center transition-all cursor-pointer ${
                joiningsTab === 'my'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#22c55e] hover:bg-[#16a34a] text-white'
              }`}
            >
              {joiningsTab === 'my' ? 'ALL ENTRIES' : 'MY ENTRIES'}
            </button>

            <button
              onClick={() => {
                setIsJoiningsModalOpen(false);
                if (!contest.isJoined) {
                  handleOpenJoinFlow();
                }
              }}
              className="flex-1 bg-[#179be7] hover:bg-[#0284c7] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center transition-all cursor-pointer active:scale-98"
            >
              {contest.isJoined ? 'CLOSE' : 'JOIN MATCH'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
