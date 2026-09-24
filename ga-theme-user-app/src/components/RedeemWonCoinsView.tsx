import React, { useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { ToastNotification } from './ToastNotification';

interface RedeemWonCoinsViewProps {
  onBack: () => void;
  winBalance?: number;
  onRedeem?: (amount: number) => void;
}

interface RedeemOption {
  id: string;
  amount: number;
}

const REDEEM_OPTIONS: RedeemOption[] = [
  { id: '1', amount: 50 },
  { id: '2', amount: 60 },
  { id: '3', amount: 70 },
  { id: '4', amount: 80 },
  { id: '5', amount: 100 },
  { id: '6', amount: 150 },
  { id: '7', amount: 200 },
  { id: '8', amount: 250 },
];

/**
 * Pixel-accurate Redeem Won Coins component matching Image 2
 */
export const RedeemWonCoinsView: React.FC<RedeemWonCoinsViewProps> = ({
  onBack,
  winBalance = 0,
  onRedeem,
}) => {
  const [selectedOption, setSelectedOption] = useState<RedeemOption | null>(null);
  const [upiId, setUpiId] = useState('');
  const [toast, setToast] = useState('');

  const handleConfirmRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) return;
    if (!upiId.trim()) return;

    if (winBalance < selectedOption.amount) {
      setToast(`Insufficient Win Balance! (Current: ₹${winBalance})`);
      setTimeout(() => setToast(''), 3000);
      return;
    }

    if (onRedeem) {
      onRedeem(selectedOption.amount);
    }
    setToast(`Redemption of ₹${selectedOption.amount} to ${upiId} submitted!`);
    setSelectedOption(null);
    setUpiId('');
    setTimeout(() => setToast(''), 3500);
  };

  return (
    <div className="flex flex-col h-full bg-white select-none text-slate-900 overflow-hidden relative">
      {/* Top Header Bar */}
      <div className="shrink-0 h-14 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-3 relative z-20">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-full active:scale-95 transition-all cursor-pointer z-10"
          aria-label="Back"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
        <h1 className="absolute inset-x-0 text-center font-bold text-slate-900 text-base tracking-wide pointer-events-none font-['Outfit',_sans-serif]">
          Redeem Won Coins
        </h1>
        <div className="w-9" />
      </div>

      {/* Toast Notification Alert Matching White Theme */}
      <ToastNotification message={toast} onClose={() => setToast('')} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24 overscroll-contain space-y-2.5 bg-white">

        {/* Redeem Cards List */}
        {REDEEM_OPTIONS.map((opt) => (
          <div
            key={opt.id}
            onClick={() => setSelectedOption(opt)}
            className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] shadow-xs"
          >
            {/* Left Column: Paytm circle icon + UPI info */}
            <div className="flex items-center gap-3.5">
              {/* Paytm Styled Circle Avatar */}
              <div className="w-11 h-11 rounded-full bg-white border border-slate-200 flex flex-col items-center justify-center shrink-0 shadow-xs px-1">
                <span className="font-extrabold text-[10px] leading-tight text-[#002e6e] tracking-tight">
                  pay<span className="text-[#00baf2]">tm</span>
                </span>
              </div>

              {/* Texts */}
              <div className="text-left">
                <span className="text-slate-900 font-bold text-sm block tracking-wide font-['Outfit',_sans-serif]">
                  UPI
                </span>
                <span className="text-red-600 text-xs font-medium block">
                  Redeem Won Coins
                </span>
              </div>
            </div>

            {/* Right Column: Amount */}
            <div className="text-right">
              <span className="text-slate-900 font-extrabold text-base sm:text-lg tracking-wide">
                {opt.amount} INR
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Redemption Dialog */}
      {selectedOption && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <form
            onSubmit={handleConfirmRedeem}
            className="bg-white border border-slate-200 rounded-2xl p-5 w-full max-w-xs shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-base font-['Outfit',_sans-serif]">
                Redeem {selectedOption.amount} INR
              </h4>
              <button
                type="button"
                onClick={() => setSelectedOption(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Redeem Amount:</span>
                <span className="font-bold text-slate-900">₹{selectedOption.amount}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Available Win Balance:</span>
                <span className="font-bold text-emerald-600">₹{winBalance}</span>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 text-xs mb-1 font-medium">
                Enter your UPI ID / VPA
              </label>
              <input
                type="text"
                placeholder="mobile@paytm / name@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Request Payout
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
