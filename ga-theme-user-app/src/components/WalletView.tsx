import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface WalletViewProps {
  balance: number;
  winBalance?: number;
  withdrawalBalance?: number;
  onBack: () => void;
  onAddMoney: (amount: number) => void;
  onOpenRecharge: () => void;
  onOpenWithdraw: () => void;
  onOpenRedeemWonCoins?: () => void;
}

interface TransactionRecord {
  id: string;
  type: 'debit' | 'credit';
  wallet: string;
  txId: string;
  date: string;
  time: string;
  amount: number;
  newBal: number;
  description: string;
}

const INITIAL_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'tx-1',
    type: 'debit',
    wallet: 'depositWallet',
    txId: 'Id-1980663',
    date: '02/09/2026',
    time: '11:43 PM',
    amount: 10,
    newBal: 9980,
    description: 'Created Challenge for Game DEMO #21678',
  },
  {
    id: 'tx-2',
    type: 'debit',
    wallet: 'depositWallet',
    txId: 'Id-1897710',
    date: '10/06/2026',
    time: '5:52 PM',
    amount: 10,
    newBal: 9990,
    description: 'Created Challenge for Game DEMO #21678',
  },
  {
    id: 'tx-3',
    type: 'credit',
    wallet: 'depositWallet',
    txId: 'Id-1897709',
    date: '10/06/2026',
    time: '5:45 PM',
    amount: 10000,
    newBal: 10000,
    description: 'Recharge via UPI Ref #91823910',
  },
];

/**
 * Pixel-accurate Wallet component matching Image 4
 */
export const WalletView: React.FC<WalletViewProps> = ({
  balance,
  winBalance = 0,
  withdrawalBalance = winBalance,
  onBack,
  onAddMoney,
  onOpenRecharge,
  onOpenWithdraw,
  onOpenRedeemWonCoins,
}) => {
  const depositBalance = balance;

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
          Wallet
        </h1>
        <div className="w-9" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-24 overscroll-contain bg-white">
        {/* Total Balance Headline */}
        <div className="text-center">
          <h2 className="text-slate-900 font-black text-2xl sm:text-[26px] tracking-tight font-['Outfit',_sans-serif]">
            Total Balance = {balance}
          </h2>

          {/* Glowing Red Underline */}
          <div className="w-28 h-1 bg-red-600 rounded-full mx-auto my-2" />

          {/* Sub-Balances: Deposit, Win & Total Withdrawal Balance */}
          <div className="space-y-1.5 mt-2">
            <div className="flex items-center justify-center gap-6 text-emerald-600 font-bold text-xs sm:text-sm">
              <span>Deposit Balance: {depositBalance}</span>
              <span>Win Balance: {winBalance}</span>
            </div>
            <div className="flex items-center justify-center text-emerald-600 font-bold text-xs sm:text-sm">
              <span>Total Withdrawal Balance: {withdrawalBalance}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Buy More & Withdraw */}
        <div className="mt-5 space-y-2.5">
          {/* Buy More -> Opens Recharge View (Image 1) */}
          <button
            onClick={onOpenRecharge}
            className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-sm sm:text-base py-3 rounded-xl shadow-md transition-all cursor-pointer text-center"
          >
            Buy More
          </button>

          {/* Withdraw -> Opens Withdraw View (Image 3) */}
          <button
            onClick={onOpenWithdraw}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-[0.98] text-white font-bold text-sm sm:text-base py-3 rounded-xl shadow-md transition-all cursor-pointer text-center"
          >
            Withdraw
          </button>
        </div>

        {/* Wallet history Subtitle */}
        <h3 className="text-slate-900 font-black text-base sm:text-lg text-center mt-6 mb-3 tracking-tight font-['Outfit',_sans-serif]">
          Wallet history
        </h3>

        {/* Transaction History Cards */}
        <div className="space-y-3">
          {INITIAL_TRANSACTIONS.map((tx) => (
            <div
              key={tx.id}
              className="bg-slate-50 border border-slate-200 border-b-2 border-b-red-500 rounded-xl p-3.5 text-xs text-slate-800 shadow-sm space-y-1.5"
            >
              {/* 3 Columns Row */}
              <div className="grid grid-cols-3 items-start">
                {/* Left Column: debit/credit, From/To, wallet */}
                <div className="text-left space-y-0.5">
                  <span className={`block font-bold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {tx.type}
                  </span>
                  <span className="block text-slate-600 font-medium">
                    {tx.type === 'debit' ? 'From' : 'To'}
                  </span>
                  <span className="block text-slate-500 font-medium">{tx.wallet}</span>
                </div>

                {/* Middle Column: Transaction, ID, Date, Time */}
                <div className="text-center space-y-0.5">
                  <span className="block text-slate-700 font-medium">Transaction</span>
                  <span className="block text-slate-500 font-mono text-[11px]">{tx.txId}</span>
                  <span className="block text-slate-500 text-[11px]">{tx.date}</span>
                  <span className="block text-slate-500 text-[11px]">{tx.time}</span>
                </div>

                {/* Right Column: Amt, New bal */}
                <div className="text-right space-y-0.5">
                  <span className={`block font-bold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    Amt: {tx.type === 'credit' ? '+' : '-'} {tx.amount}
                  </span>
                  <span className="block text-slate-500 font-medium">
                    New bal: {tx.newBal}
                  </span>
                </div>
              </div>

              {/* Bottom Description */}
              <div className="pt-1.5 border-t border-slate-200 text-center">
                <span className="text-slate-600 text-[11px] font-medium block">
                  {tx.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
