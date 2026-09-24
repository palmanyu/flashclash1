import React from 'react';
import { CheckCircle2, XCircle, Clock, ArrowRight, RotateCcw, Wallet, ShieldAlert } from 'lucide-react';

export type PaymentOutcomeStatus = 'success' | 'failed' | 'timeout';

interface PaymentResultModalProps {
  isOpen: boolean;
  status: PaymentOutcomeStatus;
  orderId: string;
  amount: number;
  walletBalance?: number;
  utr?: string;
  txnId?: string;
  errorMessage?: string;
  onClose: () => void;
  onRetry?: () => void;
}

export const PaymentResultModal: React.FC<PaymentResultModalProps> = ({
  isOpen,
  status,
  orderId,
  amount,
  walletBalance,
  utr,
  txnId,
  errorMessage,
  onClose,
  onRetry,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 select-none">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 flex flex-col">
        {/* SUCCESS OUTCOME */}
        {status === 'success' && (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600 shadow-md">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Payment Completed
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-2 font-['Outfit',_sans-serif]">
                Payment Successful!
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your wallet has been recharged successfully.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs space-y-2 text-left shadow-2xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Recharge Amount</span>
                <span className="font-extrabold text-emerald-600 text-sm">
                  + ₹ {amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Order ID</span>
                <span className="font-mono font-bold text-slate-800">{orderId}</span>
              </div>
              {utr && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Bank Ref (UTR)</span>
                  <span className="font-mono text-slate-700">{utr}</span>
                </div>
              )}
              {txnId && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Transaction ID</span>
                  <span className="font-mono text-slate-700 truncate max-w-[140px]">{txnId}</span>
                </div>
              )}
              {walletBalance !== undefined && (
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600 font-bold flex items-center gap-1">
                    <Wallet className="w-3.5 h-3.5 text-red-600" />
                    Updated Wallet Balance
                  </span>
                  <span className="font-extrabold text-slate-900 text-sm">
                    ₹ {walletBalance.toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Done / View Wallet</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* FAILED OUTCOME */}
        {status === 'failed' && (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto text-red-600 shadow-md">
              <XCircle className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                Payment Incomplete
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-2 font-['Outfit',_sans-serif]">
                Payment Failed
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {errorMessage || 'Your transaction was declined or cancelled. No amount was debited from your wallet.'}
              </p>
            </div>

            {/* Failure Details */}
            <div className="bg-red-50/70 border border-red-200 rounded-xl p-3 text-xs space-y-1.5 text-left text-red-900">
              <div className="flex justify-between items-center">
                <span className="text-red-700 font-medium">Attempted Amount</span>
                <span className="font-bold text-red-700">₹ {amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-700 font-medium">Order ID</span>
                <span className="font-mono font-bold">{orderId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-700 font-medium">Status</span>
                <span className="font-bold uppercase text-red-600">Failed / Rejected</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* TIMEOUT OUTCOME */}
        {status === 'timeout' && (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto text-amber-600 shadow-md">
              <Clock className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Session Expired
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-2 font-['Outfit',_sans-serif]">
                Payment Timed Out
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                The 5-minute payment session expired before confirmation was received.
              </p>
            </div>

            {/* Timeout Details */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs space-y-1.5 text-left text-amber-900">
              <div className="flex justify-between items-center">
                <span className="text-amber-700 font-medium">Order ID</span>
                <span className="font-mono font-bold">{orderId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-amber-700 font-medium">Amount</span>
                <span className="font-bold">₹ {amount.toFixed(2)}</span>
              </div>
              <div className="text-[11px] text-amber-800 pt-1 border-t border-amber-200 flex items-start gap-1">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                <span>If money was deducted from your bank account, it will be automatically refunded in 24-48 hours.</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Payment</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
