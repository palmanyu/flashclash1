import React from 'react';
import { Gamepad2, Trophy, ArrowRight, ShieldCheck, Zap, Flame, UserCheck } from 'lucide-react';

interface WelcomeGatewayViewProps {
  onRegister: () => void;
  onLogin: () => void;
  onExploreAsGuest: () => void;
}

export const WelcomeGatewayView: React.FC<WelcomeGatewayViewProps> = ({
  onRegister,
  onLogin,
  onExploreAsGuest,
}) => {
  return (
    <div
      id="welcome-gateway-screen"
      className="relative w-full h-full min-h-screen bg-slate-50 flex flex-col justify-between select-none font-['Outfit',_sans-serif] overflow-y-auto"
    >
      {/* Top Hero Section: Clean White & Blue Theme */}
      <div className="relative flex-1 min-h-[340px] flex flex-col items-center justify-center p-6 overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-slate-50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Device Showcase Frame */}
        <div className="relative z-10 w-full max-w-[300px] mb-4">
          <div className="relative rounded-3xl p-3 bg-white shadow-xl border border-slate-200/80">
            {/* Inner Esports Card Preview */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 flex flex-col items-center text-center shadow-inner relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl" />

              {/* Game Icon Emblem */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2575fc] to-[#6a11cb] p-0.5 shadow-lg mb-2 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Gamepad2 className="w-7 h-7 text-blue-400" />
                </div>
              </div>

              {/* Title inside card */}
              <div className="font-['Outfit',_sans-serif] font-black text-xl tracking-wider uppercase text-white leading-tight mb-2">
                FREE FIRE ESPORTS
                <span className="block text-xs font-semibold text-blue-300 tracking-normal mt-0.5 font-['Outfit',_sans-serif]">
                  Real Gaming • Real Winnings
                </span>
              </div>

              {/* Feature Chips */}
              <div className="w-full space-y-1.5 font-['Outfit',_sans-serif] font-bold text-xs tracking-wider">
                <div className="bg-white/10 backdrop-blur-xs rounded-lg py-1.5 px-3 flex items-center justify-center gap-2 border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% SECURE TOURNAMENTS</span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-lg py-1.5 px-3 flex items-center justify-center gap-2 border border-white/10">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>INSTANT UPI WITHDRAWALS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Motto */}
        <div className="text-center font-['Outfit',_sans-serif]">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full mb-1 text-xs font-bold text-[#2575fc] uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>DAILY CASH MATCHES</span>
          </div>
        </div>
      </div>

      {/* Bottom Card Section matching ss2.png: SELECT A GAME with REGISTER & LOGIN */}
      <div className="relative z-20 bg-white rounded-t-3xl px-6 pt-6 pb-8 shadow-lg border-t border-slate-200 max-w-md mx-auto w-full">
        {/* Title */}
        <div className="mb-5">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase font-['Outfit',_sans-serif]">
            SELECT A GAME
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5 leading-snug font-medium">
            Join the contest of your favorite game and win real cash prizes.
          </p>
        </div>

        {/* Two Options: Register or Login matching ss2.png */}
        <div className="flex items-start justify-between gap-4 pt-3 border-t border-slate-100 mb-5">
          {/* Sign Up / Register */}
          <div className="flex-1 flex flex-col items-start">
            <span className="text-xs text-slate-500 font-medium">
              Don't have an account?
            </span>
            <button
              onClick={onRegister}
              className="mt-1 text-red-600 hover:text-red-700 active:text-red-800 font-black tracking-wider text-base cursor-pointer transition-transform active:scale-95 flex items-center gap-1 font-['Outfit',_sans-serif]"
            >
              REGISTER
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          {/* Login */}
          <div className="flex-1 flex flex-col items-end text-right">
            <span className="text-xs text-slate-500 font-medium">
              Already a user?
            </span>
            <button
              onClick={onLogin}
              className="mt-1 text-[#2575fc] hover:text-blue-700 active:text-blue-800 font-black tracking-wider text-base cursor-pointer transition-transform active:scale-95 flex items-center gap-1 font-['Outfit',_sans-serif]"
            >
              LOGIN
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Prominent Quick Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={onRegister}
            className="w-full bg-gradient-to-r from-[#2575fc] to-[#1a56db] hover:from-[#1e66e6] hover:to-[#1648bc] text-white py-3.5 px-4 rounded-xl font-bold font-['Outfit',_sans-serif] tracking-wider text-lg shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>CREATE FREE ACCOUNT</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onLogin}
            className="w-full bg-white hover:bg-slate-50 border-2 border-[#2575fc] text-[#2575fc] py-3 px-4 rounded-xl font-bold font-['Outfit',_sans-serif] tracking-wider text-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>SIGN IN TO ACCOUNT</span>
          </button>
        </div>

        {/* Guest Gamer Explorer Option */}
        <div className="mt-4 pt-3 text-center border-t border-slate-100">
          <button
            onClick={onExploreAsGuest}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Explore Tournaments as Guest</span>
          </button>
        </div>
      </div>
    </div>
  );
};
