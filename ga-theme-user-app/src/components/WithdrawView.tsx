import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, Coins } from 'lucide-react';
import { ToastNotification } from './ToastNotification';

interface WithdrawViewProps {
  winBalance: number;
  withdrawalBalance?: number;
  onBack: () => void;
  onOpenRedeemWonCoins?: () => void;
}

/**
 * Pixel-accurate Withdraw component matching Image 3
 */
export const WithdrawView: React.FC<WithdrawViewProps> = ({
  winBalance,
  withdrawalBalance = winBalance,
  onBack,
  onOpenRedeemWonCoins,
}) => {
  const [method, setMethod] = useState<'FAM PAY' | 'UPI' | 'PAYTM'>('FAM PAY');
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('50');
  const [toast, setToast] = useState('');

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (isNaN(num) || num <= 0) {
      setToast('Please enter a valid withdrawal amount');
      setTimeout(() => setToast(''), 2500);
      return;
    }

    if (winBalance < num) {
      setToast('Insufficient Win Balance! Please win matches first.');
      setTimeout(() => setToast(''), 2500);
      return;
    }

    setToast(`Withdrawal request of ₹${num} submitted successfully!`);
    setTimeout(() => setToast(''), 3000);
  };

  const handleCancel = () => {
    setUpiId('');
    setAmount('50');
    onBack();
  };

  return (
    <div className="flex flex-col h-full bg-white select-none text-slate-900 overflow-hidden">
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
          Withdraw
        </h1>
        {onOpenRedeemWonCoins ? (
          <button
            onClick={onOpenRedeemWonCoins}
            title="Redeem Won Coins"
            className="w-9 h-9 flex items-center justify-center text-amber-500 hover:bg-slate-100 rounded-full cursor-pointer z-10"
          >
            <Coins className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-9" />
        )}
      </div>

      {/* Toast Notification Alert Matching White Theme */}
      <ToastNotification message={toast} onClose={() => setToast('')} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-24 overscroll-contain space-y-5 bg-white">

        {/* Win Balance and Total Withdrawal Balance */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-6">
            <div>
              <span className="text-slate-500 font-medium text-xs block">
                Win Balance
              </span>
              <span className="text-slate-900 font-bold text-2xl block mt-0.5 tracking-tight font-['Outfit',_sans-serif]">
                ₹ {winBalance}
              </span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200" />
            <div>
              <span className="text-slate-500 font-medium text-xs block">
                Total Withdrawal Balance
              </span>
              <span className="text-emerald-600 font-bold text-2xl block mt-0.5 tracking-tight font-['Outfit',_sans-serif]">
                ₹ {withdrawalBalance}
              </span>
            </div>
          </div>
          {/* Green horizontal underline accent */}
          <div className="w-20 h-1 bg-emerald-500 rounded-full mx-auto mt-2.5 shadow-xs" />
        </div>

        {/* Form Card */}
        <div className="bg-slate-50 border border-slate-200 border-b-2 border-b-red-500 rounded-xl p-4 text-slate-900 shadow-sm">
          <form onSubmit={handleWithdraw} className="space-y-4">
            {/* Withdrawal Method dropdown */}
            <div>
              <label className="block text-slate-900 font-bold text-sm mb-1.5">
                Withdrawal Method
              </label>
              <div className="relative">
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as any)}
                  className="w-full appearance-none bg-white border border-slate-300 rounded-lg py-2 px-3 pr-8 text-slate-900 font-semibold text-sm outline-hidden focus:border-red-500 cursor-pointer"
                >
                  <option value="FAM PAY">FAM PAY</option>
                  <option value="UPI">UPI</option>
                  <option value="PAYTM">PAYTM</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* FAM PAY UPI ID input */}
            <div>
              <label className="block text-slate-900 font-bold text-sm mb-1.5">
                {method} UPI ID
              </label>
              <input
                type="text"
                placeholder={`Enter ${method} UPI ID`}
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                required
                className="w-full bg-white border border-slate-300 rounded-lg py-2 px-3 text-slate-900 font-medium text-sm outline-hidden placeholder:text-slate-400 focus:border-red-500"
              />
            </div>

            {/* Amount input */}
            <div>
              <label className="block text-slate-900 font-bold text-sm mb-1.5">
                Amount
              </label>
              <div className="flex items-center border-b border-slate-300 py-1 focus-within:border-red-500">
                <span className="text-red-600 font-bold text-xl mr-2">₹</span>
                <input
                  type="number"
                  min="50"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full bg-transparent text-slate-900 font-bold text-xl outline-hidden"
                />
              </div>
            </div>

            {/* Action Buttons: Cancel and Withdraw */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-2.5 bg-slate-200 hover:bg-slate-300 border border-slate-300 active:scale-[0.98] text-slate-800 font-bold text-sm rounded-lg shadow-sm transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-1 py-2.5 active:scale-[0.98] text-white font-bold text-sm rounded-lg shadow-sm transition-all cursor-pointer text-center ${
                  winBalance >= Number(amount) && Number(amount) > 0
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-md'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                Withdraw
              </button>
            </div>
          </form>
        </div>

        {/* Redeem Won Coins Quick Link Banner */}
        {onOpenRedeemWonCoins && (
          <button
            onClick={onOpenRedeemWonCoins}
            className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-700 font-semibold cursor-pointer transition-all active:scale-[0.99] shadow-sm"
          >
            <span>Or Redeem Won Coins (50 ~ 250 INR)</span>
            <span className="text-amber-600 font-bold">View Options →</span>
          </button>
        )}

        {/* Withdrawals History Section */}
        <div className="space-y-4 pt-2">
          {/* Section Header with Line */}
          <div className="border-b border-slate-200 pb-2 text-center">
            <h2 className="text-slate-900 font-bold text-base tracking-wide font-['Outfit',_sans-serif]">
              Withdrawals History
            </h2>
          </div>

          {/* Empty State */}
          <div className="py-6 text-center">
            <p className="text-slate-400 font-semibold text-xs tracking-wide">
              Sorry, no data found
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
