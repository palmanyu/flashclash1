import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  User,
  Wallet,
  BarChart2,
  Trophy,
  Bell,
  Headphones,
  HelpCircle,
  Info,
  Lock,
  Shield,
  Power,
  X,
  CheckCircle2,
  Flame,
  Award,
  Globe,
  Sparkles,
} from 'lucide-react';
import { RupeeGoldCoin } from './Artwork';

interface MenuViewProps {
  username?: string;
  matchesPlayed?: number;
  totalKills?: number;
  totalEarning?: number;
  onBack: () => void;
  onOpenProfile: () => void;
  onOpenWallet: () => void;
  onOpenLeaderboard: () => void;
  onOpenNotifications: () => void;
  onOpenContact: () => void;
  onLogout: () => void;
  isLoggedIn?: boolean;
  onOpenLogin?: () => void;
  onOpenSignUp?: () => void;
  onOpenLanguage?: () => void;
}

type ActiveModal =
  | null
  | 'stats'
  | 'faq'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'logoutConfirm';

export const MenuView: React.FC<MenuViewProps> = ({
  username = 'digicroz',
  matchesPlayed = 0,
  totalKills = 0,
  totalEarning = 0,
  onBack,
  onOpenProfile,
  onOpenWallet,
  onOpenLeaderboard,
  onOpenNotifications,
  onOpenContact,
  onLogout,
  isLoggedIn = true,
  onOpenLogin,
  onOpenSignUp,
  onOpenLanguage,
}) => {
  const [importanceNotice, setImportanceNotice] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleToggleNotice = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextVal = !importanceNotice;
    setImportanceNotice(nextVal);
    showToast(
      nextVal
        ? 'Important notifications enabled!'
        : 'Important notifications muted'
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f6f9] select-none text-slate-900 overflow-hidden font-['Outfit',_sans-serif]">
      {/* 1. TOP HEADER BAR (Dark Navy Bar Matching Screenshot) */}
      <header className="shrink-0 h-14 bg-[#061d36] shadow-md flex items-center justify-between px-3 relative z-20 text-white">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full active:scale-95 transition-all cursor-pointer z-10"
          aria-label="Back to Home"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
        <h1 className="absolute inset-x-0 text-center font-bold text-white text-lg tracking-wide pointer-events-none">
          Menu
        </h1>
        <div className="w-10" />
      </header>

      {/* Floating Toast */}
      {toastMsg && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg border border-white/10 animate-bounce">
          {toastMsg}
        </div>
      )}

      {/* 2. SCROLLABLE MENU BODY */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-24 overscroll-contain">
        {/* AVATAR & USERNAME SECTION */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* Circular avatar with thick golden yellow ring & bright blue background */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-[5px] border-[#fbb024] bg-[#2575fc] flex items-center justify-center shadow-lg">
              <User className="w-11 h-11 text-white fill-white" />
            </div>
          </div>

          {isLoggedIn ? (
            <h2 className="text-[#2575fc] font-black text-xl tracking-tight mt-2.5">
              {username}
            </h2>
          ) : (
            <div className="mt-3 w-full max-w-xs">
              <span className="text-slate-700 font-extrabold text-base">Guest Gamer</span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Sign in to save your match records & withdraw prize cash
              </p>
              <div className="mt-2.5 flex items-center justify-center gap-2">
                <button
                  onClick={onOpenLogin}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={onOpenSignUp}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3-COLUMN STATS CARD */}
        <div className="mt-5 bg-white rounded-2xl shadow-xs border border-slate-200/80 p-3.5">
          <div className="grid grid-cols-3 divide-x divide-slate-100 text-center">
            {/* 1. Matches Played */}
            <div className="px-2">
              <div className="text-[#2575fc] font-black text-xl leading-tight">
                {matchesPlayed}
              </div>
              <div className="text-slate-400 text-[11px] font-medium mt-1">
                Matches Played
              </div>
            </div>

            {/* 2. Total Kills */}
            <div className="px-2">
              <div className="text-[#2575fc] font-black text-xl leading-tight">
                {totalKills}
              </div>
              <div className="text-slate-400 text-[11px] font-medium mt-1">
                Total Kills
              </div>
            </div>

            {/* 3. Total Earning */}
            <div className="px-2">
              <div className="flex items-center justify-center gap-1.5 leading-tight">
                <RupeeGoldCoin size={18} />
                <span className="text-[#2575fc] font-black text-xl">
                  {totalEarning}
                </span>
              </div>
              <div className="text-slate-400 text-[11px] font-medium mt-1">
                Total Earning
              </div>
            </div>
          </div>
        </div>

        {/* 12 MENU ITEMS LIST */}
        <div className="mt-4 space-y-2.5">
          {/* 1. My Profile -> Opens Current Profile View */}
          <button
            onClick={onOpenProfile}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200/70 rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] text-left group shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <User className="w-5 h-5 text-[#2575fc] fill-[#2575fc] shrink-0" />
              <span className="font-bold text-slate-800 text-sm tracking-tight">
                My Profile
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
          </button>

          {/* 2. My Wallet */}
          <button
            onClick={onOpenWallet}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200/70 rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] text-left group shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <Wallet className="w-5 h-5 text-[#2575fc] fill-[#2575fc] shrink-0" />
              <span className="font-bold text-slate-800 text-sm tracking-tight">
                My Wallet
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
          </button>

          {/* 3. My Statistics */}
          <button
            onClick={() => setActiveModal('stats')}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200/70 rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] text-left group shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <BarChart2 className="w-5 h-5 text-[#2575fc] stroke-[2.2] shrink-0" />
              <span className="font-bold text-slate-800 text-sm tracking-tight">
                My Statistics
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
          </button>

          {/* 4. Top Players */}
          <button
            onClick={onOpenLeaderboard}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200/70 rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] text-left group shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <Trophy className="w-5 h-5 text-[#2575fc] fill-[#2575fc] shrink-0" />
              <span className="font-bold text-slate-800 text-sm tracking-tight">
                Top Players
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
          </button>

          {/* 5. Notifications */}
          <button
            onClick={onOpenNotifications}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200/70 rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] text-left group shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <Bell className="w-5 h-5 text-[#2575fc] fill-[#2575fc] shrink-0" />
              <span className="font-bold text-slate-800 text-sm tracking-tight">
                Notifications
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
          </button>

          {/* 6. Contact Us */}
          <button
            onClick={onOpenContact}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200/70 rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] text-left group shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <Headphones className="w-5 h-5 text-[#2575fc] stroke-[2.2] shrink-0" />
              <span className="font-bold text-slate-800 text-sm tracking-tight">
                Contact Us
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
          </button>

          {/* 7. Importance Notice (With interactive toggle switch) */}
          <div
            onClick={handleToggleNotice}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200/70 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer transition-all text-left shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <Bell className="w-5 h-5 text-[#2575fc] fill-[#2575fc] shrink-0" />
              <span className="font-bold text-slate-800 text-sm tracking-tight">
                Importance Notice
              </span>
            </div>
            {/* Pill Toggle Switch */}
            <div
              className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out p-0.5 flex items-center ${
                importanceNotice ? 'bg-[#2575fc]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                  importanceNotice ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </div>

          {/* 8. FAQ */}
          <button
            onClick={() => setActiveModal('faq')}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200/70 rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] text-left group shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <HelpCircle className="w-5 h-5 text-[#2575fc] stroke-[2.2] shrink-0" />
              <span className="font-bold text-slate-800 text-sm tracking-tight">
                FAQ
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
          </button>

          {/* 9. About Us */}
          <button
            onClick={() => setActiveModal('about')}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200/70 rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] text-left group shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <Info className="w-5 h-5 text-[#2575fc] stroke-[2.2] shrink-0" />
              <span className="font-bold text-slate-800 text-sm tracking-tight">
                About Us
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
          </button>

          {/* 10. Privacy Policy */}
          <button
            onClick={() => setActiveModal('privacy')}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200/70 rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] text-left group shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <Lock className="w-5 h-5 text-[#2575fc] fill-[#2575fc] shrink-0" />
              <span className="font-bold text-slate-800 text-sm tracking-tight">
                Privacy Policy
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
          </button>

          {/* 11. Terms & Conditions */}
          <button
            onClick={() => setActiveModal('terms')}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200/70 rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] text-left group shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <Shield className="w-5 h-5 text-[#2575fc] fill-[#2575fc] shrink-0" />
              <span className="font-bold text-slate-800 text-sm tracking-tight">
                Terms & Conditions
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
          </button>

          {/* 12. Choose Language */}
          {onOpenLanguage && (
            <button
              onClick={onOpenLanguage}
              className="w-full bg-white hover:bg-slate-50 border border-slate-200/70 rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] text-left group shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <Globe className="w-5 h-5 text-[#2575fc] stroke-[2.2] shrink-0" />
                <span className="font-bold text-slate-800 text-sm tracking-tight">
                  Choose Language
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
            </button>
          )}

          {/* 12. Logout or Log In */}
          {isLoggedIn ? (
            <button
              onClick={() => setActiveModal('logoutConfirm')}
              className="w-full bg-white hover:bg-red-50/50 border border-slate-200/70 rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] text-left group shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <Power className="w-5 h-5 text-[#2575fc] stroke-[2.4] shrink-0" />
                <span className="font-bold text-slate-800 text-sm tracking-tight">
                  Logout
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] text-left group shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <Power className="w-5 h-5 text-white stroke-[2.4] shrink-0" />
                <span className="font-bold text-white text-sm tracking-tight">
                  Log In / Create Account
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE MODALS & BOTTOM SHEETS                        */}
      {/* ========================================================= */}

      {/* 1. Statistics Modal */}
      {activeModal === 'stats' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border-t sm:border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-[#2575fc]" />
                <h3 className="font-black text-slate-900 text-lg">
                  Career Statistics
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <span className="text-slate-400 text-xs font-medium block">
                  Matches Joined
                </span>
                <span className="text-slate-900 font-black text-xl mt-0.5 block">
                  {matchesPlayed}
                </span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <span className="text-slate-400 text-xs font-medium block">
                  Total Eliminations
                </span>
                <span className="text-slate-900 font-black text-xl mt-0.5 block">
                  {totalKills}
                </span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <span className="text-slate-400 text-xs font-medium block">
                  K/D Ratio
                </span>
                <span className="text-emerald-600 font-black text-xl mt-0.5 block">
                  {matchesPlayed > 0
                    ? (totalKills / matchesPlayed).toFixed(2)
                    : '0.00'}
                </span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <span className="text-slate-400 text-xs font-medium block">
                  Win Rate
                </span>
                <span className="text-amber-500 font-black text-xl mt-0.5 block">
                  {matchesPlayed > 0 ? '45%' : '0%'}
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50/60 border border-blue-200 rounded-xl flex items-center gap-3">
              <Award className="w-6 h-6 text-[#2575fc] shrink-0" />
              <div className="text-xs text-slate-700">
                <strong className="text-[#2575fc] block">Tier: Gold Contender</strong>
                Play in upcoming daily tournaments to increase your global rank.
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="mt-5 w-full bg-[#061d36] text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 2. FAQ Modal */}
      {activeModal === 'faq' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border-t sm:border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#2575fc]" />
                <h3 className="font-black text-slate-900 text-lg">
                  Frequently Asked Questions
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="block text-slate-900 font-bold mb-1">
                  How do I get the custom Room ID & Password?
                </strong>
                The Room ID and Password are sent 10–15 minutes before the match start time on the contest details page.
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="block text-slate-900 font-bold mb-1">
                  When will my winnings be credited?
                </strong>
                Prizes and kill earnings are automatically credited to your Gamex Wallet within 30 minutes of match completion.
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="block text-slate-900 font-bold mb-1">
                  What is the minimum withdrawal limit?
                </strong>
                The minimum withdrawal threshold is ₹50 via UPI, Paytm, or direct bank transfer.
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="mt-5 w-full bg-[#061d36] text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* 3. About Us Modal */}
      {activeModal === 'about' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border-t sm:border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-[#2575fc]" />
                <h3 className="font-black text-slate-900 text-lg">About Gamex</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong>Gamex Esports</strong> is India's leading competitive tournament hosting platform for Free Fire and battle royale esports enthusiasts.
              </p>
              <p>
                We offer automated prize distribution, anti-cheat monitored custom rooms, fast withdrawals, and high-speed match tracking for gamers nationwide.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[11px] text-slate-400 block font-medium">
                  App Version
                </span>
                <span className="text-slate-900 font-bold text-sm block">
                  v3.4.2 (Production Stable)
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="mt-5 w-full bg-[#061d36] text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 4. Privacy Policy Modal */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border-t sm:border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#2575fc]" />
                <h3 className="font-black text-slate-900 text-lg">
                  Privacy Policy
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                Your privacy and financial data security are our top priorities. Gamex utilizes 256-bit SSL encryption to protect all communications and transaction credentials.
              </p>
              <p>
                We do not sell, rent, or trade personal gamer credentials, UPI handles, or phone numbers to third-party advertising companies.
              </p>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="mt-5 w-full bg-[#061d36] text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      )}

      {/* 5. Terms & Conditions Modal */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border-t sm:border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#2575fc]" />
                <h3 className="font-black text-slate-900 text-lg">
                  Terms & Conditions
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-600 leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Hacking, teaming in solo matches, or using modified game clients results in immediate forfeiture and account ban.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Players must be present in the custom room slot before the timer reaches 00:00. Late entries cannot be refunded.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Users must be 18+ years of age or possess parental authorization to participate in skill-based tournaments.</span>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="mt-5 w-full bg-[#061d36] text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Accept Terms
            </button>
          </div>
        </div>
      )}

      {/* 6. Logout Confirmation Modal */}
      {activeModal === 'logoutConfirm' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Power className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="font-black text-slate-900 text-lg">Sign Out?</h3>
            <p className="text-xs text-slate-500 mt-1">
              Are you sure you want to log out of your <strong>{username}</strong> account?
            </p>

            <div className="mt-5 flex gap-2.5">
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActiveModal(null);
                  onLogout();
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
