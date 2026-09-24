import React from 'react';
import { ShieldAlert, X, UserPlus, LogIn, Trophy, Wallet, ArrowRight } from 'lucide-react';

export type GuestRestrictedAction = 'deposit' | 'withdraw' | 'join';

interface GuestAuthPromptModalProps {
  isOpen: boolean;
  action: GuestRestrictedAction | null;
  onClose: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignUp: () => void;
}

export const GuestAuthPromptModal: React.FC<GuestAuthPromptModalProps> = ({
  isOpen,
  action,
  onClose,
  onNavigateToLogin,
  onNavigateToSignUp,
}) => {
  if (!isOpen) return null;

  const getActionDetails = () => {
    switch (action) {
      case 'deposit':
        return {
          icon: <Wallet className="w-7 h-7 text-[#2575fc]" />,
          title: 'Log In to Add Money',
          subtitle: 'Guest accounts cannot recharge wallet balance. Please sign in or create an account to add funds safely via ZapUPI.',
        };
      case 'withdraw':
        return {
          icon: <ShieldAlert className="w-7 h-7 text-amber-500" />,
          title: 'Log In to Withdraw Winnings',
          subtitle: 'To safeguard player payouts and ensure fast UPI transfers, withdrawals require an active Gamex account.',
        };
      case 'join':
      default:
        return {
          icon: <Trophy className="w-7 h-7 text-[#2575fc]" />,
          title: 'Log In to Join Tournament',
          subtitle: 'You are currently browsing as a guest. Create an account or sign in to register your in-game name and win real prizes!',
        };
    }
  };

  const details = getActionDetails();

  return (
    <div
      id="guest-auth-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Graphic with White/Blue Theme */}
        <div className="pt-6 pb-2 px-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-inner mb-3">
            {details.icon}
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2575fc] bg-blue-50 px-2.5 py-1 rounded-full mb-1">
            Account Required
          </span>
          <h3 className="text-xl font-bold text-slate-900 font-['Outfit',_sans-serif] tracking-tight">
            {details.title}
          </h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed px-1 font-['Outfit',_sans-serif]">
            {details.subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="p-6 pt-3 space-y-2.5 flex flex-col">
          {/* Create Account / Sign Up */}
          <button
            onClick={() => {
              onClose();
              onNavigateToSignUp();
            }}
            className="w-full bg-gradient-to-r from-[#2575fc] to-[#1a56db] hover:from-[#1e66e6] hover:to-[#1648bc] text-white py-3 px-4 rounded-xl font-bold font-['Outfit',_sans-serif] tracking-wider text-base shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>CREATE FREE ACCOUNT</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>

          {/* Log In */}
          <button
            onClick={() => {
              onClose();
              onNavigateToLogin();
            }}
            className="w-full bg-white hover:bg-slate-50 border-2 border-[#2575fc] text-[#2575fc] py-2.5 px-4 rounded-xl font-bold font-['Outfit',_sans-serif] tracking-wider text-base active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>LOG IN TO ACCOUNT</span>
          </button>

          {/* Dismiss / Explore as Guest */}
          <button
            onClick={onClose}
            className="w-full pt-1.5 text-center text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            Cancel & Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};
