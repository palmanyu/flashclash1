import React, { useState, useEffect } from 'react';
import { ChevronLeft, ShieldCheck, CheckCircle, Clock, XCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { ToastNotification } from './ToastNotification';
import { PaymentResultModal, PaymentOutcomeStatus } from './PaymentResultModal';
import {
  getZapKey,
  isZapUpiIntegrated,
  registerZapUpiCallbacks,
  ensureZapUpiLoaded,
} from '../services/zapupi';

interface RechargeViewProps {
  balance: number;
  onBack: () => void;
  onRechargeSuccess: (amount: number) => void;
  appUsername?: string;
}

interface DepositRecord {
  id: string;
  requestId: string;
  orderId?: string;
  amount: number;
  status: 'pending' | 'success' | 'rejected' | 'timeout';
  utr?: string;
  txnId?: string;
  createdAt: string;
}

const INITIAL_DEPOSITS: DepositRecord[] = [
  { id: '1', requestId: '334645', orderId: 'ORD1726748921', amount: 50, status: 'pending', createdAt: 'Today, 10:30 AM' },
  { id: '2', requestId: '334644', orderId: 'ORD1726748805', amount: 100, status: 'success', utr: '4434910284', createdAt: 'Yesterday, 04:15 PM' },
  { id: '3', requestId: '334643', orderId: 'ORD1726748710', amount: 100, status: 'rejected', createdAt: 'Yesterday, 02:00 PM' },
];

/**
 * Pixel-accurate Recharge component with ZapUPI Gateway integration
 */
export const RechargeView: React.FC<RechargeViewProps> = ({
  balance,
  onBack,
  onRechargeSuccess,
  appUsername = 'digicroz',
}) => {
  const [amount, setAmount] = useState<string>('');
  const [deposits, setDeposits] = useState<DepositRecord[]>(INITIAL_DEPOSITS);
  const [toast, setToast] = useState<string>('');
  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(false);
  const [showNotIntegratedModal, setShowNotIntegratedModal] = useState<boolean>(false);

  // Outcome Result Modal State
  const [resultModal, setResultModal] = useState<{
    isOpen: boolean;
    status: PaymentOutcomeStatus;
    orderId: string;
    amount: number;
    utr?: string;
    txnId?: string;
    errorMessage?: string;
  }>({
    isOpen: false,
    status: 'success',
    orderId: '',
    amount: 0,
  });

  const quickAmounts = [20, 50, 100, 200, 500, 1000];

  const handleSelectQuick = (val: number) => {
    setAmount(val.toString());
  };

  /**
   * Check for redirect query params from ZapUPI (e.g., ?order_id=...&utr=...&s=s)
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const orderIdParam = params.get('order_id');
      const utrParam = params.get('utr');
      const sParam = params.get('s');
      const statusParam = params.get('status');

      if (orderIdParam) {
        const isSuccess = sParam === 's' || statusParam?.toLowerCase() === 'success';
        const isFailed = sParam === 'f' || statusParam?.toLowerCase() === 'failed';
        const isTimeout = sParam === 't' || statusParam?.toLowerCase() === 'timeout';

        if (isSuccess) {
          handlePaymentSuccess(orderIdParam, { utr: utrParam || undefined });
        } else if (isFailed) {
          handlePaymentFailed(orderIdParam, 'Payment was declined or cancelled.');
        } else if (isTimeout) {
          handlePaymentTimeout(orderIdParam);
        }
      }
    }
  }, []);

  /**
   * 1. SUCCESS: Only here do we complete the payment and add funds to wallet
   */
  const handlePaymentSuccess = (
    orderId: string,
    details?: { txn_id?: string; utr?: string; amount?: string }
  ) => {
    setIsLoadingOrder(false);

    // Find the matching deposit to get the amount if not provided
    let chargedAmount = details?.amount ? Number(details.amount) : 0;
    setDeposits((prev) =>
      prev.map((d) => {
        if (d.orderId === orderId || d.id === orderId) {
          if (!chargedAmount) chargedAmount = d.amount;
          return { ...d, status: 'success', utr: details?.utr, txnId: details?.txn_id };
        }
        return d;
      })
    );

    if (!chargedAmount) {
      chargedAmount = Number(amount) || 50;
    }

    // Add money to wallet balance ONLY on successful payment
    onRechargeSuccess(chargedAmount);

    // Show Success Result Modal
    setResultModal({
      isOpen: true,
      status: 'success',
      orderId: orderId,
      amount: chargedAmount,
      utr: details?.utr || '4434' + Math.floor(1000000 + Math.random() * 9000000),
      txnId: details?.txn_id || 'ZAP' + Date.now().toString(36).toUpperCase(),
    });

    setAmount('');
  };

  /**
   * 2. FAILED: Mark status failed, DO NOT add balance, show failed result
   */
  const handlePaymentFailed = (orderId: string, reason?: string) => {
    setIsLoadingOrder(false);

    let failedAmount = 0;
    setDeposits((prev) =>
      prev.map((d) => {
        if (d.orderId === orderId || d.id === orderId) {
          failedAmount = d.amount;
          return { ...d, status: 'rejected' };
        }
        return d;
      })
    );

    if (!failedAmount) {
      failedAmount = Number(amount) || 50;
    }

    // Show Failed Result Modal (with Retry button that calls createOrder again)
    setResultModal({
      isOpen: true,
      status: 'failed',
      orderId: orderId,
      amount: failedAmount,
      errorMessage: reason || 'Payment was declined by your bank or cancelled in UPI application.',
    });
  };

  /**
   * 3. TIMEOUT: Mark status timeout, DO NOT add balance, show timeout result
   */
  const handlePaymentTimeout = (orderId: string) => {
    setIsLoadingOrder(false);

    let timedOutAmount = 0;
    setDeposits((prev) =>
      prev.map((d) => {
        if (d.orderId === orderId || d.id === orderId) {
          timedOutAmount = d.amount;
          return { ...d, status: 'timeout' };
        }
        return d;
      })
    );

    if (!timedOutAmount) {
      timedOutAmount = Number(amount) || 50;
    }

    // Show Timeout Result Modal (with Retry button that calls createOrder again)
    setResultModal({
      isOpen: true,
      status: 'timeout',
      orderId: orderId,
      amount: timedOutAmount,
    });
  };

  /**
   * Core ZapUPI Order Creator:
   * Generates a new unique order ID, sets callbacks, and calls ZapUPI.createOrder -> ZapUPI.loadPayment
   */
  const initiateZapUpiOrder = async (rechargeAmount: number) => {
    if (isNaN(rechargeAmount) || rechargeAmount < 1) {
      setToast('Minimum recharge amount is ₹1');
      setTimeout(() => setToast(''), 2500);
      return;
    }
    if (rechargeAmount > 1000) {
      setToast('Maximum recharge amount is ₹1000');
      setTimeout(() => setToast(''), 2500);
      return;
    }

    // Check if ZapUPI API is integrated and valid
    if (!isZapUpiIntegrated()) {
      setIsLoadingOrder(false);
      setToast('ZapUPI API not integrated');
      setShowNotIntegratedModal(true);
      return;
    }

    // Rule: order_id MUST be unique every time. Use "ORD" + Date.now()
    const uniqueOrderId = 'ORD' + Date.now();
    const newReqId = Math.floor(334645 + Math.random() * 1000).toString();

    // 1. Create Pending record (DO NOT add balance yet!)
    const newRecord: DepositRecord = {
      id: Date.now().toString(),
      requestId: newReqId,
      orderId: uniqueOrderId,
      amount: rechargeAmount,
      status: 'pending',
      createdAt: 'Just now',
    };

    setDeposits((prev) => [newRecord, ...prev]);
    setIsLoadingOrder(true);

    // 2. Ensure ZapUPI script is loaded
    const scriptLoaded = await ensureZapUpiLoaded();
    if (!scriptLoaded && !window.ZapUPI?.createOrder) {
      setIsLoadingOrder(false);
      setDeposits((prev) => prev.filter((d) => d.orderId !== uniqueOrderId));
      setToast('ZapUPI API not integrated');
      setShowNotIntegratedModal(true);
      return;
    }

    // 3. Register callbacks: onSuccess, onFailed, onTimeout
    registerZapUpiCallbacks({
      onSuccess: (ordId, details) => handlePaymentSuccess(ordId, details),
      onFailed: (ordId, reason) => handlePaymentFailed(ordId, reason),
      onTimeout: (ordId) => handlePaymentTimeout(ordId),
    });

    // 4. Call ZapUPI.createOrder directly per Section A guidelines
    if (typeof window !== 'undefined' && window.ZapUPI?.createOrder) {
      try {
        window.ZapUPI.createOrder(
          {
            zap_key: getZapKey(),
            order_id: uniqueOrderId,
            amount: rechargeAmount.toString(),
            customer_mobile: '9876543210',
            remark: `Recharge | ${appUsername}`,
          },
          {
            onResponse: function (paymentUrl: string) {
              setIsLoadingOrder(false);
              // Open fullscreen payment page via official loadPayment
              if (window.ZapUPI?.loadPayment && typeof window.ZapUPI.loadPayment === 'function') {
                window.ZapUPI.loadPayment(paymentUrl);
              } else if (paymentUrl) {
                window.location.href = paymentUrl;
              }
            },
            onError: function (err: string) {
              setIsLoadingOrder(false);
              // Remove the pending deposit if order creation failed due to invalid API key or configuration
              setDeposits((prev) => prev.filter((d) => d.orderId !== uniqueOrderId));
              setToast('ZapUPI API not integrated');
              setShowNotIntegratedModal(true);
            },
          }
        );
      } catch (err) {
        setIsLoadingOrder(false);
        setDeposits((prev) => prev.filter((d) => d.orderId !== uniqueOrderId));
        setToast('ZapUPI API not integrated');
        setShowNotIntegratedModal(true);
      }
    } else {
      setIsLoadingOrder(false);
      setDeposits((prev) => prev.filter((d) => d.orderId !== uniqueOrderId));
      setToast('ZapUPI API not integrated');
      setShowNotIntegratedModal(true);
    }
  };

  /**
   * Handle primary recharge button submission
   */
  const handleRecharge = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    initiateZapUpiOrder(num);
  };

  /**
   * RETRY PAYMENT:
   * Explicitly closes the result modal and initiates ZapUPI.createOrder again with a new unique order ID
   */
  const handleRetryPayment = () => {
    const retryAmount = resultModal.amount || Number(amount) || 50;
    setResultModal((prev) => ({ ...prev, isOpen: false }));
    // Create order again with new unique order ID
    initiateZapUpiOrder(retryAmount);
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
          Recharge
        </h1>
        <div className="flex items-center gap-1.5 z-10">
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            ZapUPI
          </span>
        </div>
      </div>

      {/* Toast Notification Alert Matching White Theme */}
      <ToastNotification message={toast} onClose={() => setToast('')} />

      {/* ZapUPI API Not Integrated Modal */}
      {showNotIntegratedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 w-full max-w-xs text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto text-red-600">
              <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 font-['Outfit',_sans-serif]">
                ZapUPI API not integrated
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                The ZapUPI payment gateway API is not configured or the merchant key is invalid. Please contact the administrator.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowNotIntegratedModal(false)}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs rounded-xl cursor-pointer transition-all shadow-sm"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Payment Outcome Result Modal (Success, Failed, Timeout) with Retry support */}
      <PaymentResultModal
        isOpen={resultModal.isOpen}
        status={resultModal.status}
        orderId={resultModal.orderId}
        amount={resultModal.amount}
        walletBalance={balance}
        utr={resultModal.utr}
        txnId={resultModal.txnId}
        errorMessage={resultModal.errorMessage}
        onClose={() => setResultModal((prev) => ({ ...prev, isOpen: false }))}
        onRetry={handleRetryPayment}
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-24 overscroll-contain space-y-5 bg-white">
        {/* Total Balance Headline */}
        <div className="text-center">
          <span className="text-slate-500 font-medium text-xs sm:text-sm block">
            Total Balance
          </span>
          <span className="text-slate-900 font-bold text-2xl sm:text-3xl block mt-0.5 tracking-tight font-['Outfit',_sans-serif]">
            ₹ {balance.toFixed(2)}
          </span>
        </div>

        {/* Recharge Form Card */}
        <div className="bg-slate-50 border border-slate-200 border-b-2 border-b-red-500 rounded-xl p-4 text-slate-900 shadow-sm">
          <form onSubmit={handleRecharge} className="space-y-3.5">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-slate-900 font-bold text-base">
                  Recharge Amount
                </label>
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                  Instant UPI
                </span>
              </div>

              {/* Input field with rupee sign and placeholder '1 ~ 1000' */}
              <div className="flex items-center border-b border-slate-300 pb-1.5 focus-within:border-red-500 transition-colors">
                <span className="text-red-600 font-bold text-xl mr-2">₹</span>
                <input
                  type="number"
                  placeholder="1 ~ 1000"
                  min="1"
                  max="1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-transparent text-slate-900 font-bold text-xl outline-hidden placeholder:text-slate-400"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1 font-medium">
                <span>Minimum: ₹ 1</span>
                <span>Maximum: ₹ 1000</span>
              </div>
            </div>

            {/* Quick Amount Chips (3x2 grid) */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              {quickAmounts.map((amt) => {
                const isSelected = amount === amt.toString();
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleSelectQuick(amt)}
                    className={`py-2 px-1 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer text-center ${
                      isSelected
                        ? 'bg-red-600 text-white shadow-sm border border-red-600'
                        : 'bg-white hover:bg-slate-100 text-red-600 border border-slate-200'
                    }`}
                  >
                    ₹{amt}
                  </button>
                );
              })}
            </div>

            {/* Notice if ZapUPI API is not integrated */}
            {!isZapUpiIntegrated() && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-center gap-2 text-amber-800 text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-semibold">ZapUPI API not integrated</span>
              </div>
            )}

            {/* Recharge Button triggering official ZapUPI */}
            <button
              type="submit"
              disabled={isLoadingOrder}
              className="w-full mt-2 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-[0.98] text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all cursor-pointer text-center tracking-wide flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isLoadingOrder ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Creating Order...</span>
                </>
              ) : (
                <span>Pay with ZapUPI</span>
              )}
            </button>

            <div className="text-center text-[10.5px] text-slate-400 flex items-center justify-center gap-1.5 pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Safe &amp; Official ZapUPI Gateway</span>
            </div>
          </form>
        </div>

        {/* Deposits History Section */}
        <div className="space-y-3 pt-2">
          {/* Section Header with Line */}
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h2 className="text-slate-900 font-bold text-base tracking-wide font-['Outfit',_sans-serif]">
              Deposits History
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              {deposits.length} entries
            </span>
          </div>

          {/* History Cards */}
          <div className="space-y-2.5">
            {deposits.map((item) => {
              const isSuccess = item.status === 'success';
              const isPending = item.status === 'pending';
              const isTimeout = item.status === 'timeout';
              const isRejected = item.status === 'rejected';

              return (
                <div
                  key={item.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 shadow-sm space-y-1 text-xs transition-colors hover:border-slate-300"
                >
                  <div className="flex justify-between items-center py-0.5">
                    <span className="font-semibold text-slate-500">DepositRequestId</span>
                    <span className="text-slate-400 font-bold">:</span>
                    <span className="font-bold text-slate-900 text-right min-w-[70px] font-mono">
                      #{item.requestId}
                    </span>
                  </div>

                  {item.orderId && (
                    <div className="flex justify-between items-center py-0.5">
                      <span className="font-semibold text-slate-500">Order ID</span>
                      <span className="text-slate-400 font-bold">:</span>
                      <span className="font-mono text-slate-700 text-[11px] text-right min-w-[70px]">
                        {item.orderId}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-0.5 bg-slate-100/70 px-1.5 rounded">
                    <span className="font-semibold text-slate-500">Amount</span>
                    <span className="text-slate-400 font-bold">:</span>
                    <span className="font-bold text-emerald-600 text-right min-w-[70px]">
                      ₹ {item.amount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="font-semibold text-slate-500">Status</span>
                    <span className="text-slate-400 font-bold">:</span>
                    <span className="text-right min-w-[70px] flex items-center justify-end gap-1">
                      {isSuccess && (
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                          <CheckCircle className="w-3 h-3" />
                          Success
                        </span>
                      )}
                      {isPending && (
                        <span className="inline-flex items-center gap-1 font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                          Pending
                        </span>
                      )}
                      {isTimeout && (
                        <span className="inline-flex items-center gap-1 font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-[11px]">
                          <Clock className="w-3 h-3" />
                          Timed Out
                        </span>
                      )}
                      {isRejected && (
                        <span className="inline-flex items-center gap-1 font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded text-[11px]">
                          <XCircle className="w-3 h-3" />
                          Failed
                        </span>
                      )}
                    </span>
                  </div>

                  {item.utr && (
                    <div className="flex justify-between items-center py-0.5 text-[10.5px] text-slate-500 border-t border-slate-200/60 pt-1">
                      <span>Bank UTR:</span>
                      <span className="font-mono text-slate-700">{item.utr}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

