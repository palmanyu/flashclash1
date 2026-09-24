import React, { useState, useMemo } from 'react';
import {
  Hash,
  TrendingUp,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Check,
  CreditCard,
  Building2,
  Smartphone,
} from 'lucide-react';
import { DateBar } from './DateBar';
import {
  toISODateString,
  getTodayDate,
  getDailyWithdrawalStats,
  formatDailyDate,
  WithdrawalRequestItem,
} from '../utils/dateUtils';
import { useNotification } from '../context/NotificationContext';

export const WithdrawRequestView: React.FC = () => {
  const { notify } = useNotification();
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    toISODateString(getTodayDate())
  );

  // Status filter and search filter
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Initial daily stats from generator
  const initialStats = useMemo(() => getDailyWithdrawalStats(selectedDate), [selectedDate]);

  // Local state for interactive approvals for the selected day
  const [requests, setRequests] = useState<WithdrawalRequestItem[]>([]);

  // Sync requests whenever selectedDate changes
  React.useEffect(() => {
    setRequests(initialStats.requests);
  }, [initialStats]);

  // Dynamically compute card counts from requests in case user approves pending items
  const dynamicCounts = useMemo(() => {
    let completedCount = 0;
    let completedAmount = 0;
    let pendingCount = 0;
    let pendingAmount = 0;

    requests.forEach((r) => {
      if (r.status === 'Completed') {
        completedCount++;
        completedAmount += r.amount;
      } else {
        pendingCount++;
        pendingAmount += r.amount;
      }
    });

    return {
      totalCount: requests.length,
      totalAmount: completedAmount + pendingAmount,
      completedCount,
      completedAmount,
      pendingCount,
      pendingAmount,
    };
  }, [requests]);

  const handleApprove = (reqId: string, userName: string, amount: number) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'Completed' } : r))
    );
    notify({
      type: 'success',
      title: 'Withdrawal Approved',
      message: `Approved ₹${amount.toLocaleString('en-IN')}.00 for ${userName}.`,
    });
  };

  const filteredRequests = requests.filter((r) => {
    if (statusFilter !== 'All' && r.status !== statusFilter) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.userName.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.txnId.toLowerCase().includes(q) ||
        r.accountDetail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'Bank Transfer':
        return <Building2 className="w-3.5 h-3.5 text-blue-600" />;
      case 'UPI':
      case 'PhonePe':
        return <Smartphone className="w-3.5 h-3.5 text-purple-600" />;
      case 'Paytm':
        return <CreditCard className="w-3.5 h-3.5 text-sky-600" />;
      default:
        return <CreditCard className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Withdraw Request Statistics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Comprehensive daily overview of withdrawal requests and payout metrics
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-xs flex items-center gap-1.5 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Viewing: <strong className="text-slate-800">{formatDailyDate(selectedDate)}</strong></span>
        </div>
      </div>

      {/* Date Bar with strict past-date restriction */}
      <DateBar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      {/* 6 Colored Stat Cards Grid (Pixel-to-Pixel Replica of Image 5) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1 - Purple: Total Count */}
        <div className="bg-[#9333ea] text-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(147,51,234,0.2)] flex items-center gap-4 transition-transform hover:-translate-y-0.5">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Hash className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="block text-xs font-medium text-purple-100">
              Total Count
            </span>
            <span className="block text-2xl font-bold tracking-tight text-white mt-0.5">
              {dynamicCounts.totalCount}
            </span>
          </div>
        </div>

        {/* Card 2 - Green: Total Amount */}
        <div className="bg-[#16a34a] text-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(22,163,74,0.2)] flex items-center gap-4 transition-transform hover:-translate-y-0.5">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="block text-xs font-medium text-green-100">
              Total Amount
            </span>
            <span className="block text-2xl font-bold tracking-tight text-white mt-0.5">
              ₹{dynamicCounts.totalAmount.toLocaleString('en-IN')}.00
            </span>
          </div>
        </div>

        {/* Card 3 - Orange: Completed Count */}
        <div className="bg-[#ea580c] text-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(234,88,12,0.2)] flex items-center gap-4 transition-transform hover:-translate-y-0.5">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="block text-xs font-medium text-orange-100">
              Completed Count
            </span>
            <span className="block text-2xl font-bold tracking-tight text-white mt-0.5">
              {dynamicCounts.completedCount}
            </span>
          </div>
        </div>

        {/* Card 4 - Teal: Completed Amount */}
        <div className="bg-[#0d9488] text-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(13,148,136,0.2)] flex items-center gap-4 transition-transform hover:-translate-y-0.5">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <span className="font-bold text-xl leading-none">₹</span>
          </div>
          <div>
            <span className="block text-xs font-medium text-teal-100">
              Completed Amount
            </span>
            <span className="block text-2xl font-bold tracking-tight text-white mt-0.5">
              ₹{dynamicCounts.completedAmount.toLocaleString('en-IN')}.00
            </span>
          </div>
        </div>

        {/* Row 2 */}
        {/* Card 5 - Orange: Pending Count */}
        <div className="bg-[#ea580c] text-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(234,88,12,0.2)] flex items-center gap-4 transition-transform hover:-translate-y-0.5">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="block text-xs font-medium text-orange-100">
              Pending Count
            </span>
            <span className="block text-2xl font-bold tracking-tight text-white mt-0.5">
              {dynamicCounts.pendingCount}
            </span>
          </div>
        </div>

        {/* Card 6 - Teal: Pending Amount */}
        <div className="bg-[#0d9488] text-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(13,148,136,0.2)] flex items-center gap-4 transition-transform hover:-translate-y-0.5">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <span className="font-bold text-xl leading-none">₹</span>
          </div>
          <div>
            <span className="block text-xs font-medium text-teal-100">
              Pending Amount
            </span>
            <span className="block text-2xl font-bold tracking-tight text-white mt-0.5">
              ₹{dynamicCounts.pendingAmount.toLocaleString('en-IN')}.00
            </span>
          </div>
        </div>
      </div>

      {/* Daily Requests Breakdown Table Card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100 p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800 text-base sm:text-lg">
              Daily Withdrawal Requests
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Transactions processed for {formatDailyDate(selectedDate)}
            </p>
          </div>

          {/* Filter Pills and Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-100 text-xs font-medium">
              <button
                onClick={() => setStatusFilter('All')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === 'All'
                    ? 'bg-white text-slate-800 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                All ({dynamicCounts.totalCount})
              </button>
              <button
                onClick={() => setStatusFilter('Pending')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === 'Pending'
                    ? 'bg-amber-50 text-amber-700 shadow-xs font-semibold border border-amber-200/50'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Pending ({dynamicCounts.pendingCount})
              </button>
              <button
                onClick={() => setStatusFilter('Completed')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === 'Completed'
                    ? 'bg-emerald-50 text-emerald-700 shadow-xs font-semibold border border-emerald-200/50'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Completed ({dynamicCounts.completedCount})
              </button>
            </div>

            {/* Search input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search user / txn ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 w-full sm:w-48 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Req ID</th>
                <th className="py-2.5 px-3">User & Contact</th>
                <th className="py-2.5 px-3">Method</th>
                <th className="py-2.5 px-3">Account / VPA</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm divide-y divide-slate-50">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-mono font-medium text-slate-700">
                      {req.id}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800">{req.userName}</div>
                      <div className="text-[11px] text-slate-400">{req.userPhone}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        {getMethodIcon(req.method)}
                        <span>{req.method}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600 text-xs">
                      {req.accountDetail}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      ₹{req.amount.toLocaleString('en-IN')}.00
                    </td>
                    <td className="py-3 px-3 text-slate-500 text-xs">
                      {req.time}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-semibold inline-flex items-center gap-1 ${
                          req.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {req.status === 'Completed' ? (
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        ) : (
                          <Clock className="w-3 h-3 stroke-[2.5]" />
                        )}
                        <span>{req.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {req.status === 'Pending' ? (
                        <button
                          onClick={() => handleApprove(req.id, req.userName, req.amount)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1 rounded-lg transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 stroke-[2.5]" />
                          <span>Approve</span>
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 font-mono">
                          {req.txnId}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No withdrawal requests found for this filter on {formatDailyDate(selectedDate)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
