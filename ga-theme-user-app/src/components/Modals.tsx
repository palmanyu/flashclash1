import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  Trophy,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Copy,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { TournamentCard, MatchCategory } from '../types';
import { RupeeGoldCoin, InstagramIcon, GameXLogo, BoyAvatar } from './Artwork';

/**
 * Rules Dialog Modal
 */
export const RulesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn select-none">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl text-slate-900">
        {/* Header */}
        <div className="bg-slate-50 px-4 py-3.5 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-bold text-base font-['Outfit',_sans-serif]">⚠️ RULES &amp; GUIDELINES</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3.5 text-xs max-h-[70vh] overflow-y-auto bg-white">
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 flex gap-2.5 items-start">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-amber-900 font-semibold leading-relaxed">
              Every Player Of FreeFire Game Name (Not User ID) Per Day Match Join Limit Is 10 in all tournament modes.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-red-600 block mb-0.5">1. Free Fire IGN Accuracy</span>
              <p className="text-slate-600">
                Your entered In-Game Name (IGN) must exactly match the account you use inside Free Fire Max. Unregistered accounts will be kicked from custom room.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-red-600 block mb-0.5">2. Room ID &amp; Password</span>
              <p className="text-slate-600">
                Room credentials are automatically released 15 minutes before the scheduled match time under &quot;My Matches &gt; Upcoming&quot;.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-red-600 block mb-0.5">3. Strict Anti-Cheat &amp; Fair Play</span>
              <p className="text-slate-600">
                Hacking, teaming in solo matches, GFX tools, or PC emulators will result in permanent device and wallet bans.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-red-600 block mb-0.5">4. Prize Distribution</span>
              <p className="text-slate-600">
                Winnings and kill rewards are automatically credited to your Gamex wallet within 30 minutes of match completion.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            I UNDERSTAND &amp; AGREE
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Instagram Giveaway Modal
 */
export const InstagramModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn select-none">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl text-slate-900">
        {/* Header */}
        <div className="bg-slate-50 p-4 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2">
            <InstagramIcon size={32} />
            <div>
              <span className="text-slate-900 font-bold text-sm block font-['Outfit',_sans-serif]">@gamex_esports</span>
              <span className="text-red-600 text-[11px] font-semibold">Official Giveaway</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3.5 text-xs text-slate-700 bg-white">
          <div className="text-center py-2">
            <h3 className="font-black text-lg text-red-600 uppercase tracking-wide font-['Outfit',_sans-serif]">
              WIN 5,000 DIAMONDS!
            </h3>
            <p className="text-slate-600 text-xs mt-1">
              Follow our Instagram page &amp; comment your Gamex ID on our pinned reel.
            </p>
          </div>

          <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-slate-800">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-[10px]">1</span>
              <span>Follow <strong>@gamex_esports</strong> on Instagram</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-[10px]">2</span>
              <span>Like &amp; share our latest tournament reel</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-[10px]">3</span>
              <span>Tag 3 Free Fire squad teammates in comments</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-500 block">YOUR GAMEX ID</span>
              <span className="font-mono font-bold text-slate-900 text-xs">GX_782910</span>
            </div>
            <button
              onClick={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Open Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Tournament Detail / Join Modal
 */
export const TournamentModal: React.FC<{
  tournament: TournamentCard | null;
  balance: number;
  onClose: () => void;
  onJoin: (tournament: TournamentCard, ign: string) => void;
  isLoggedIn?: boolean;
  onRequireAuth?: () => void;
}> = ({ tournament, balance, onClose, onJoin, isLoggedIn = true, onRequireAuth }) => {
  const [ign, setIgn] = useState('');
  const [error, setError] = useState('');
  const [joinedSuccess, setJoinedSuccess] = useState(false);

  if (!tournament) return null;

  const handleJoin = () => {
    if (!isLoggedIn) {
      onClose();
      onRequireAuth?.();
      return;
    }
    if (!ign.trim()) {
      setError('Please enter your Free Fire In-Game Name');
      return;
    }
    if (balance < tournament.entryFee) {
      setError('Insufficient balance in wallet! Please add coins.');
      return;
    }
    setError('');
    setJoinedSuccess(true);
    setTimeout(() => {
      onJoin(tournament, ign);
      setJoinedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn select-none">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl text-slate-900">
        {/* Header */}
        <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-900 text-sm uppercase tracking-wide font-['Outfit',_sans-serif]">
              {tournament.gameMode} TOURNAMENT
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 text-xs bg-white">
          {/* Prize and Entry Bar */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Entry Fee</span>
              <span className="font-bold text-amber-600 text-sm flex items-center justify-center gap-1">
                <RupeeGoldCoin size={14} />
                {tournament.entryFee}
              </span>
            </div>
            <div className="border-x border-slate-200">
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Prize Pool</span>
              <span className="font-bold text-emerald-600 text-sm flex items-center justify-center gap-1">
                <RupeeGoldCoin size={14} />
                {tournament.prizePool}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Per Kill</span>
              <span className="font-bold text-red-600 text-sm flex items-center justify-center gap-1">
                <RupeeGoldCoin size={14} />
                {tournament.perKill}
              </span>
            </div>
          </div>

          {/* Details Table */}
          <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Map</span>
              <span className="text-slate-900 font-semibold">{tournament.map}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Version</span>
              <span className="text-slate-900 font-semibold">Free Fire MAX</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Slots</span>
              <span className="text-emerald-600 font-semibold">{tournament.spotsFilled} / {tournament.spotsTotal}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Daily Match Limit</span>
              <span className="text-amber-600 font-semibold">Max 10 / Day</span>
            </div>
          </div>

          {/* IGN Input */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-700 font-semibold block">
              Enter Your Free Fire In-Game Name (IGN):
            </label>
            <input
              type="text"
              value={ign}
              onChange={(e) => setIgn(e.target.value)}
              placeholder="e.g. RAISTAR_99"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono text-xs focus:outline-none focus:border-red-500"
            />
            {error && <p className="text-red-600 text-[10px] font-semibold">{error}</p>}
          </div>

          {joinedSuccess && (
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-center font-bold text-xs animate-bounce">
              🎉 Registration Successful! Room details will appear 15m before start.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2">
          <button
            onClick={handleJoin}
            disabled={joinedSuccess}
            className="w-full py-2.5 bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>JOIN MATCH (₹{tournament.entryFee})</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Wallet Modal
 */
export const WalletModal: React.FC<{
  isOpen: boolean;
  balance: number;
  onClose: () => void;
  onAddMoney: (amount: number) => void;
}> = ({ isOpen, balance, onClose, onAddMoney }) => {
  const [addedMsg, setAddedMsg] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn select-none">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl text-slate-900">
        {/* Header */}
        <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2">
            <RupeeGoldCoin size={22} />
            <span className="font-bold text-slate-900 text-sm font-['Outfit',_sans-serif]">Gamex Wallet</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 text-xs bg-white">
          {/* Balance card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 block font-medium">TOTAL BALANCE</span>
              <div className="text-2xl font-black text-slate-900 flex items-center gap-1 mt-0.5">
                <RupeeGoldCoin size={26} />
                <span>₹{balance}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-bold">
                100% SECURE
              </span>
            </div>
          </div>

          {/* Quick Add Coins */}
          <div>
            <span className="text-[11px] text-slate-700 font-semibold block mb-2">
              Add Coins to Play Tournaments:
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[20, 50, 100, 200].map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    onAddMoney(amt);
                    setAddedMsg(true);
                    setTimeout(() => setAddedMsg(false), 1500);
                  }}
                  className="bg-slate-50 hover:bg-slate-100 active:scale-95 py-2 rounded-xl border border-slate-200 text-slate-900 font-bold text-xs flex flex-col items-center justify-center cursor-pointer transition-all"
                >
                  <span className="text-amber-600">+₹{amt}</span>
                  <span className="text-[9px] text-slate-500">Add</span>
                </button>
              ))}
            </div>
          </div>

          {addedMsg && (
            <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-center font-bold text-xs">
              ✅ Coins Added Successfully!
            </div>
          )}

          {/* Information */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5 text-slate-800">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span>Instant Withdrawal via UPI (PhonePe, GPay, Paytm)</span>
            </div>
            <p>Minimum withdrawal amount is ₹50.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Notifications Modal
 */
export const NotificationsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn select-none">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl text-slate-900">
        {/* Header */}
        <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
          <span className="font-bold text-slate-900 text-sm font-['Outfit',_sans-serif]">Notifications &amp; Alerts</span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 space-y-2 text-xs max-h-[65vh] overflow-y-auto bg-white">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-700">Daily Match Limit Notice</span>
              <span className="text-[10px] text-slate-400">1h ago</span>
            </div>
            <p className="text-slate-600 text-[11px] mt-1">
              Remember: Every player FreeFire game name has a 10 match limit per day. Fair play is strictly monitored.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-red-600">Instagram Giveaway Live</span>
              <span className="text-[10px] text-slate-400">3h ago</span>
            </div>
            <p className="text-slate-600 text-[11px] mt-1">
              Check out our Instagram page @gamex_esports for a chance to win 5,000 Free Fire diamonds!
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-600">Welcome to Gamex</span>
              <span className="text-[10px] text-slate-400">1d ago</span>
            </div>
            <p className="text-slate-600 text-[11px] mt-1">
              Compete in Battle Royale &amp; Clash Squad custom rooms and earn cash rewards per kill!
            </p>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl cursor-pointer border border-slate-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Matches Drawer/Modal (Ongoing, Upcoming, Completed)
 */
export const MyMatchesModal: React.FC<{
  isOpen: boolean;
  category: MatchCategory | null;
  onClose: () => void;
}> = ({ isOpen, category, onClose }) => {
  const [activeTab, setActiveTab] = useState<MatchCategory>(category || 'ongoing');

  React.useEffect(() => {
    if (category) setActiveTab(category);
  }, [category]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn select-none">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl text-slate-900">
        {/* Header */}
        <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
          <span className="font-bold text-slate-900 text-sm font-['Outfit',_sans-serif]">My Matches</span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-3 bg-slate-100 p-1.5 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('ongoing')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'ongoing' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ongoing (0)
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'upcoming' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upcoming (1)
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'completed' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed (3)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-3.5 space-y-3 text-xs max-h-[60vh] overflow-y-auto bg-white">
          {activeTab === 'ongoing' && (
            <div className="text-center py-8 text-slate-400 space-y-2">
              <span className="text-3xl block">⚔️</span>
              <p className="font-semibold text-slate-700">No Ongoing Matches</p>
              <p className="text-[11px]">Join an upcoming tournament to get into the action!</p>
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="space-y-2.5">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">BR Full Map Tournament</span>
                  <span className="text-[10px] bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded font-semibold">
                    Today 8:00 PM
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 flex justify-between py-1 border-t border-slate-200 mt-2">
                  <span>Room ID &amp; Pass:</span>
                  <span className="text-amber-600 font-bold">Unlocks at 7:45 PM</span>
                </div>
                <div className="text-[11px] text-slate-600 flex justify-between">
                  <span>Registered IGN:</span>
                  <span className="text-slate-900 font-mono font-semibold">GAMEX_PLAYER1</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="space-y-2">
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">Clash Squad 1v1</span>
                  <span className="text-emerald-600 font-bold text-xs">+₹20 Won</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">Rank #1 • 7 Kills • Yesterday</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">Lone Wolf 1v1</span>
                  <span className="text-emerald-600 font-bold text-xs">+₹15 Won</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">Rank #1 • 5 Kills • 2 days ago</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">BR Survival Solo</span>
                  <span className="text-slate-600 font-bold text-xs">Rank #8 • 2 Kills</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">Kill Reward: ₹10 • 3 days ago</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl cursor-pointer border border-slate-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * User Profile Modal
 */
export const ProfileModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn select-none">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl text-slate-900">
        <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
          <span className="font-bold text-slate-900 text-sm font-['Outfit',_sans-serif]">Player Profile</span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3.5 text-xs text-center bg-white">
          <div className="flex flex-col items-center">
            <BoyAvatar size={64} className="ring-4 ring-red-600/30 shadow-md" />
            <h3 className="font-bold text-slate-900 text-base mt-2 font-['Outfit',_sans-serif]">Gamex Pro</h3>
            <span className="text-slate-500 text-xs font-mono">UID: 89402192</span>
          </div>

          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Matches</span>
              <span className="font-bold text-slate-900 text-sm">24</span>
            </div>
            <div className="border-x border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase block">Kills</span>
              <span className="font-bold text-amber-600 text-sm">89</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Win Rate</span>
              <span className="font-bold text-emerald-600 text-sm">48%</span>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-emerald-800 text-[11px] text-left flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Account Status: <strong>Verified Fair Play</strong></span>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Contact Support Modal
 */
export const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn select-none">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl text-slate-900">
        <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
          <span className="font-bold text-slate-900 text-sm font-['Outfit',_sans-serif]">Customer Support</span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3 text-xs bg-white">
          <p className="text-slate-600 text-xs leading-relaxed">
            Need assistance with a tournament, entry fee, or wallet withdrawal? Our 24/7 Gamex support team is here to help:
          </p>

          <a
            href="https://api.whatsapp.com/send?text=Hi%20Gamex%20Support,%20I%20need%20help%20with%20my%20account"
            target="_blank"
            rel="noreferrer"
            className="w-full p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between hover:bg-emerald-100 transition-all font-semibold"
          >
            <span>WhatsApp Official Helpdesk</span>
            <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">24/7 LIVE</span>
          </a>

          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            className="w-full p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 flex items-center justify-between hover:bg-sky-100 transition-all font-semibold"
          >
            <span>Telegram Community Channel</span>
            <span className="text-[10px] bg-sky-600 text-white px-2 py-0.5 rounded font-bold">JOIN</span>
          </a>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-[11px]">
            <span className="text-slate-500 block mb-0.5 font-medium">Support Email:</span>
            <span className="font-mono text-slate-900 font-semibold">support@gamexesports.in</span>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

