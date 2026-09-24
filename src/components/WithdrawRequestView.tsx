import React from 'react';
import { Hash, TrendingUp, CheckCircle2 } from 'lucide-react';
import { DateBar } from './DateBar';

export const WithdrawRequestView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Withdraw Request Statistics
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Comprehensive overview of withdrawal requests and metrics
        </p>
      </div>

      {/* Date Bar */}
      <DateBar />

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
              0
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
              ₹0.00
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
              0
            </span>
          </div>
        </div>

        {/* Card 4 - Teal: Completed Amount */}
        <div className="bg-[#0d9488] text-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(13,148,136,0.2)] flex items-center gap-4 transition-transform hover:-translate-y-0.5">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <span className="font-bold text-xl leading-none">$</span>
          </div>
          <div>
            <span className="block text-xs font-medium text-teal-100">
              Completed Amount
            </span>
            <span className="block text-2xl font-bold tracking-tight text-white mt-0.5">
              ₹0.00
            </span>
          </div>
        </div>

        {/* Row 2 */}
        {/* Card 5 - Orange: Pending Count */}
        <div className="bg-[#ea580c] text-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(234,88,12,0.2)] flex items-center gap-4 transition-transform hover:-translate-y-0.5">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="block text-xs font-medium text-orange-100">
              Pending Count
            </span>
            <span className="block text-2xl font-bold tracking-tight text-white mt-0.5">
              0
            </span>
          </div>
        </div>

        {/* Card 6 - Teal: Pending Amount */}
        <div className="bg-[#0d9488] text-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(13,148,136,0.2)] flex items-center gap-4 transition-transform hover:-translate-y-0.5">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <span className="font-bold text-xl leading-none">$</span>
          </div>
          <div>
            <span className="block text-xs font-medium text-teal-100">
              Pending Amount
            </span>
            <span className="block text-2xl font-bold tracking-tight text-white mt-0.5">
              ₹0.00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
