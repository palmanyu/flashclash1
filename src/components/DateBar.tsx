import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarDateIcon } from './Icons';

interface DateBarProps {
  initialDate?: string;
  onDateChange?: (date: string) => void;
}

export const DateBar: React.FC<DateBarProps> = () => {
  const [currentDateStr, setCurrentDateStr] = useState('Sunday, September 20th 2026');
  const [jumpDate, setJumpDate] = useState('2026-09-20');

  const handlePrev = () => {
    setCurrentDateStr('Saturday, September 19th 2026');
    setJumpDate('2026-09-19');
  };

  const handleNext = () => {
    setCurrentDateStr('Monday, September 21st 2026');
    setJumpDate('2026-09-21');
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100 border-l-[5px] border-l-blue-600 p-4 sm:p-5 relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Date Navigation & Label */}
      <div className="flex items-center gap-3 sm:gap-4 pl-1">
        <button
          onClick={handlePrev}
          id="btn-date-prev"
          aria-label="Previous day"
          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>

        <div className="flex items-center gap-3">
          <CalendarDateIcon className="w-6 h-6 text-blue-600 shrink-0" />
          <div>
            <span className="block font-bold text-sm sm:text-base text-slate-900 leading-tight">
              {currentDateStr}
            </span>
            <span className="block text-xs font-medium text-slate-400 mt-0.5">
              Daily View
            </span>
          </div>
        </div>

        <button
          onClick={handleNext}
          id="btn-date-next"
          aria-label="Next day"
          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Right side: Jump to Date Input */}
      <div className="flex items-center gap-2 self-end sm:self-auto pr-1">
        <label htmlFor="jump-to-date" className="text-xs sm:text-sm font-medium text-slate-600">
          Jump to:
        </label>
        <div className="relative">
          <input
            id="jump-to-date"
            type="date"
            value={jumpDate}
            onChange={(e) => setJumpDate(e.target.value)}
            className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm text-slate-700 bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
