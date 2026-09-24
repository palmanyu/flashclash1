import React from 'react';
import { X, RotateCcw, Calendar, Clock, Trophy, Coins, MapPin, Users, Swords, Check } from 'lucide-react';
import { RupeeGoldCoin } from './Artwork';

export interface ContestFilterState {
  searchQuery: string;
  date: string;
  timeSlot: string;
  prizeRange: string;
  entryFeeType: string;
  matchType: string;
  map: string;
  team: string;
}

export const INITIAL_FILTER_STATE: ContestFilterState = {
  searchQuery: '',
  date: 'all',
  timeSlot: 'all',
  prizeRange: 'all',
  entryFeeType: 'all',
  matchType: 'all',
  map: 'all',
  team: 'all',
};

interface ContestFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ContestFilterState;
  onApplyFilters: (filters: ContestFilterState) => void;
  onResetFilters: () => void;
  availableDates: string[];
  availableMaps: string[];
  availableTypes: string[];
  availableTeams: string[];
  matchingCount: number;
}

export const ContestFiltersModal: React.FC<ContestFiltersModalProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  availableDates,
  availableMaps,
  availableTypes,
  availableTeams,
  matchingCount,
}) => {
  const [draft, setDraft] = React.useState<ContestFilterState>(filters);

  // Sync draft with incoming filters whenever modal opens
  React.useEffect(() => {
    if (isOpen) {
      setDraft(filters);
    }
  }, [isOpen, filters]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(draft);
    onClose();
  };

  const handleReset = () => {
    setDraft({
      ...INITIAL_FILTER_STATE,
      searchQuery: draft.searchQuery, // keep search query unless reset
    });
  };

  const countActiveDraftFilters = () => {
    let count = 0;
    if (draft.date !== 'all') count++;
    if (draft.timeSlot !== 'all') count++;
    if (draft.prizeRange !== 'all') count++;
    if (draft.entryFeeType !== 'all') count++;
    if (draft.matchType !== 'all') count++;
    if (draft.map !== 'all') count++;
    if (draft.team !== 'all') count++;
    return count;
  };

  const activeCount = countActiveDraftFilters();

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn select-none">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="shrink-0 px-4 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <Swords className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-['Outfit',_sans-serif] font-bold text-slate-900 text-sm sm:text-base">
                Match Filters
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Customize time, entry fee, prize pool &amp; game settings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {activeCount > 0 && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-2 py-1 text-xs text-slate-600 hover:text-red-600 font-semibold rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Filter Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 text-slate-800 text-xs divide-y divide-slate-100 scrollbar-thin scrollbar-thumb-slate-200">
          {/* 1. Date Filter */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-red-600" />
                Date
              </label>
              {draft.date !== 'all' && (
                <span className="text-[10px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded">
                  Selected
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setDraft((d) => ({ ...d, date: 'all' }))}
                className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer text-xs ${
                  draft.date === 'all'
                    ? 'bg-red-600 text-white border-red-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                All Dates
              </button>
              {availableDates.map((dateStr) => (
                <button
                  key={dateStr}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, date: dateStr }))}
                  className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer text-xs ${
                    draft.date === dateStr
                      ? 'bg-red-600 text-white border-red-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {dateStr}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Time Slot Filter */}
          <div className="space-y-2 pt-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Time of Day
              </label>
              {draft.timeSlot !== 'all' && (
                <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                  Selected
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'all', label: 'All Times' },
                { id: 'morning', label: 'Morning (6 AM - 12 PM)' },
                { id: 'afternoon', label: 'Afternoon (12 - 5 PM)' },
                { id: 'evening', label: 'Evening (5 PM onwards)' },
              ].map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, timeSlot: slot.id }))}
                  className={`p-2 rounded-xl text-center font-semibold border transition-all cursor-pointer text-[11px] leading-tight ${
                    draft.timeSlot === slot.id
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Entry Fee Filter */}
          <div className="space-y-2 pt-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-emerald-600" />
                Entry Fee
              </label>
              {draft.entryFeeType !== 'all' && (
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                  Selected
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Fees' },
                { id: 'free', label: '🎁 Free Entry (₹0)' },
                { id: 'under-10', label: '₹1 - ₹10' },
                { id: '10-25', label: '₹11 - ₹25' },
                { id: '25+', label: '₹26+' },
              ].map((fee) => (
                <button
                  key={fee.id}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, entryFeeType: fee.id }))}
                  className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer text-xs ${
                    draft.entryFeeType === fee.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {fee.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Prize Pool Filter */}
          <div className="space-y-2 pt-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-yellow-600" />
                Prize Pool
              </label>
              {draft.prizeRange !== 'all' && (
                <span className="text-[10px] text-yellow-600 font-bold bg-yellow-50 px-1.5 py-0.5 rounded">
                  Selected
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Prizes' },
                { id: '0-100', label: 'Up to ₹100' },
                { id: '100-300', label: '₹100 - ₹300' },
                { id: '300-500', label: '₹300 - ₹500' },
                { id: '500+', label: '₹500 & Above' },
              ].map((prize) => (
                <button
                  key={prize.id}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, prizeRange: prize.id }))}
                  className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer text-xs ${
                    draft.prizeRange === prize.id
                      ? 'bg-yellow-600 text-white border-yellow-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {prize.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Team Filter (Solo, Duo, Squad, 1v1) */}
          <div className="space-y-2 pt-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-sky-600" />
                Team Mode
              </label>
              {draft.team !== 'all' && (
                <span className="text-[10px] text-sky-600 font-bold bg-sky-50 px-1.5 py-0.5 rounded">
                  Selected
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setDraft((d) => ({ ...d, team: 'all' }))}
                className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer text-xs ${
                  draft.team === 'all'
                    ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                All Teams
              </button>
              {['SOLO', 'DUO', 'SQUAD', '1V1'].map((tm) => (
                <button
                  key={tm}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, team: tm }))}
                  className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer text-xs ${
                    draft.team === tm
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {tm === '1V1' ? '1v1 Knockout' : tm}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Match Type Filter */}
          <div className="space-y-2 pt-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5 text-indigo-600" />
                Match Type
              </label>
              {draft.matchType !== 'all' && (
                <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded">
                  Selected
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setDraft((d) => ({ ...d, matchType: 'all' }))}
                className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer text-xs ${
                  draft.matchType === 'all'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                All Types
              </button>
              {availableTypes.map((typ) => (
                <button
                  key={typ}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, matchType: typ }))}
                  className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer text-xs ${
                    draft.matchType === typ
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {typ}
                </button>
              ))}
            </div>
          </div>

          {/* 7. Map Filter */}
          <div className="space-y-2 pt-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                Map
              </label>
              {draft.map !== 'all' && (
                <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded">
                  Selected
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setDraft((d) => ({ ...d, map: 'all' }))}
                className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer text-xs ${
                  draft.map === 'all'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                All Maps
              </button>
              {availableMaps.map((mapName) => (
                <button
                  key={mapName}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, map: mapName }))}
                  className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer text-xs ${
                    draft.map === mapName
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {mapName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="shrink-0 p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold rounded-xl text-xs sm:text-sm active:scale-95 transition-all cursor-pointer text-center"
          >
            Clear Filters
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-[2] py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Apply Filters ({matchingCount} Matches)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
