import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, RotateCcw } from 'lucide-react';
import { CalendarDateIcon } from './Icons';
import {
  formatDailyDate,
  toISODateString,
  getTodayDate,
  getPreviousDayISO,
  getNextDayISO,
  isFutureDate,
} from '../utils/dateUtils';
import { useNotification } from '../context/NotificationContext';

interface DateBarProps {
  selectedDate?: string; // YYYY-MM-DD
  onDateChange?: (date: string) => void;
  maxDate?: string; // YYYY-MM-DD, defaults to today
}

export const DateBar: React.FC<DateBarProps> = ({
  selectedDate,
  onDateChange,
  maxDate: propMaxDate,
}) => {
  const { notify } = useNotification();
  const todayISO = toISODateString(getTodayDate());
  const maxDate = propMaxDate || todayISO;

  // Uncontrolled fallback if not provided
  const [internalDate, setInternalDate] = React.useState<string>(todayISO);
  const activeDate = selectedDate || internalDate;

  const isToday = activeDate === maxDate;
  const isAtMaxDate = activeDate >= maxDate;

  const updateDate = (newDate: string) => {
    // Prevent selecting upcoming/future dates
    if (isFutureDate(newDate, maxDate)) {
      notify({
        type: 'warning',
        title: 'Upcoming Date Restricted',
        message: 'Statistics are only available for current and past dates.',
      });
      newDate = maxDate;
    }

    if (onDateChange) {
      onDateChange(newDate);
    } else {
      setInternalDate(newDate);
    }
  };

  const handlePrev = () => {
    const prevDay = getPreviousDayISO(activeDate);
    updateDate(prevDay);
  };

  const handleNext = () => {
    if (isAtMaxDate) {
      notify({
        type: 'info',
        title: 'Current Date Reached',
        message: 'Upcoming dates cannot be viewed.',
      });
      return;
    }
    const nextDay = getNextDayISO(activeDate, maxDate);
    updateDate(nextDay);
  };

  const handleJumpDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) return;
    if (val > maxDate) {
      notify({
        type: 'warning',
        title: 'Upcoming Date Not Allowed',
        message: 'You can only view current and previous dates.',
      });
      updateDate(maxDate);
      return;
    }
    updateDate(val);
  };

  const handleResetToToday = () => {
    updateDate(maxDate);
    notify({
      type: 'info',
      title: 'Current Date Selected',
      message: `Switched to today's date (${formatDailyDate(maxDate)}).`,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100 border-l-[5px] border-l-blue-600 p-4 sm:p-5 relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Date Navigation & Label (Image 4 & 5 Replica) */}
      <div className="flex items-center gap-3 sm:gap-4 pl-1">
        {/* Previous Day Button */}
        <button
          onClick={handlePrev}
          id="btn-date-prev"
          aria-label="Previous day"
          title="View previous day statistics"
          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-xs"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Date Display */}
        <div className="flex items-center gap-3">
          <CalendarDateIcon className="w-6 h-6 text-blue-600 shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="block font-bold text-sm sm:text-base text-slate-900 leading-tight">
                {formatDailyDate(activeDate)}
              </span>
              {isToday && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200/80 px-1.5 py-0.5 rounded-md">
                  Today
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="block text-xs font-medium text-slate-400">
                Daily View
              </span>
              {!isToday && (
                <span className="text-xs text-amber-600 font-medium">
                  (Past Date)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Next Day Button - Strictly Disabled for Upcoming Dates */}
        <button
          onClick={handleNext}
          id="btn-date-next"
          disabled={isAtMaxDate}
          aria-label="Next day"
          title={isAtMaxDate ? 'Cannot navigate to upcoming dates' : 'View next day statistics'}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all shadow-xs ${
            isAtMaxDate
              ? 'bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed opacity-45'
              : 'bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 cursor-pointer'
          }`}
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Right side: Jump to Date Input (restricted to maxDate) & Today button */}
      <div className="flex items-center gap-2.5 self-end sm:self-auto pr-1 flex-wrap">
        {!isToday && (
          <button
            type="button"
            onClick={handleResetToToday}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200/60 transition-colors cursor-pointer"
            title="Jump back to current date"
          >
            <RotateCcw className="w-3 h-3 stroke-[2.5]" />
            <span>Today</span>
          </button>
        )}

        <div className="flex items-center gap-1.5">
          <label htmlFor="jump-to-date" className="text-xs sm:text-sm font-medium text-slate-600 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            <span>Jump to:</span>
          </label>
          <div className="relative">
            <input
              id="jump-to-date"
              type="date"
              max={maxDate}
              value={activeDate}
              onChange={handleJumpDateChange}
              title="Select past or current date only"
              className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm text-slate-700 bg-white focus:outline-none focus:border-blue-500 cursor-pointer shadow-xs font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
