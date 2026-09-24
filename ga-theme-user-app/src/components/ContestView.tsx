import React, { useState, useMemo, useRef } from 'react';
import {
  ChevronLeft,
  X,
  Trophy,
  CheckCircle,
  Video,
  ShieldAlert,
  Copy,
  ExternalLink,
  Search,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';
import { ContestBannerGraphic } from './ContestBannerGraphic';
import { RupeeGoldCoin } from './Artwork';
import { Contest, getContestTeam } from '../data/contestsData';
import { ContestDetailView } from './ContestDetailView';
import { MatchResultView } from './MatchResultView';
import {
  ContestFiltersModal,
  ContestFilterState,
  INITIAL_FILTER_STATE,
} from './ContestFiltersModal';
import { ContestListLoadingSkeleton } from './SkeletonLoaders';

export const parseContestDate = (timeStr: string): string | null => {
  const match = timeStr.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
  return match ? match[1] : null;
};

export const parseContestTimeSlot = (timeStr: string): 'morning' | 'afternoon' | 'evening' | null => {
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  if (hours >= 6 && hours < 12) return 'morning';
  if (hours >= 12 && hours < 17) return 'afternoon';
  return 'evening';
};

interface ContestViewProps {
  categoryTitle: string; // e.g. 'BR FULL MAP', 'FREE MATCH', etc. or 'MY MATCHES'
  contests: Contest[];
  balance: number;
  appUsername?: string;
  activeTab?: TabType;
  isMyMatches?: boolean;
  onTabChange?: (tab: TabType) => void;
  onSelectContest?: (contest: Contest, isResult?: boolean) => void;
  onBack: () => void;
  onJoinContest: (contestId: string, ign: string) => void;
  onOpenRecharge?: () => void;
}

type TabType = 'ongoing' | 'upcoming' | 'resulted';

export const ContestView: React.FC<ContestViewProps> = ({
  categoryTitle,
  contests,
  balance,
  appUsername = 'digicroz',
  activeTab: activeTabProp,
  isMyMatches = false,
  onTabChange,
  onSelectContest,
  onBack,
  onJoinContest,
  onOpenRecharge,
}) => {
  // Active sub-tab matching URL state or default
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    if (activeTabProp) return activeTabProp;
    if (categoryTitle === 'FREE MATCH') return 'ongoing';
    return 'upcoming';
  });

  // Dedicated full-screen sub-views requested by user
  const [viewingContestDetail, setViewingContestDetail] = useState<Contest | null>(null);
  const [viewingMatchResult, setViewingMatchResult] = useState<Contest | null>(null);

  const handleOpenContest = (contest: Contest, isResult: boolean = false) => {
    if (onSelectContest) {
      onSelectContest(contest, isResult);
    } else {
      if (isResult) {
        setViewingMatchResult(contest);
      } else {
        setViewingContestDetail(contest);
      }
    }
  };

  const handleCopyContestUrl = (e: React.MouseEvent, contestId: string, isResult: boolean = false) => {
    e.stopPropagation();
    const url =
      typeof window !== 'undefined'
        ? `${window.location.origin}/contest/${contestId}${isResult ? '/result' : ''}`
        : `/contest/${contestId}${isResult ? '/result' : ''}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    setCopiedText(`link-${contestId}`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const [isTabLoading, setIsTabLoading] = useState<boolean>(false);

  // Keep synced if URL changes
  React.useEffect(() => {
    if (activeTabProp && activeTabProp !== activeTab) {
      setActiveTab(activeTabProp);
    }
  }, [activeTabProp]);

  const handleTabSwitch = (tab: TabType) => {
    if (tab === activeTab) return;
    setIsTabLoading(true);
    setActiveTab(tab);
    onTabChange?.(tab);
    setTimeout(() => {
      setIsTabLoading(false);
    }, 450);
  };

  // Modals
  const [selectedContestForJoin, setSelectedContestForJoin] = useState<Contest | null>(null);
  const [selectedContestForDetails, setSelectedContestForDetails] = useState<Contest | null>(null);
  const [selectedContestForWatch, setSelectedContestForWatch] = useState<Contest | null>(null);
  const [selectedContestForStatus, setSelectedContestForStatus] = useState<Contest | null>(null);

  // Join Form State
  const [ign, setIgn] = useState('');
  const [joinError, setJoinError] = useState('');
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Search & Filters State (shared across upcoming, ongoing, and resulted)
  const [filters, setFilters] = useState<ContestFilterState>(INITIAL_FILTER_STATE);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter contests for this category & status
  const categoryContests = useMemo(() => {
    return isMyMatches
      ? contests.filter((c) => c.isJoined)
      : contests.filter((c) => {
          const cat = categoryTitle.trim().toUpperCase();
          if (cat === 'BR FULL MAP') {
            return c.gameCategory === 'BR FULL MAP';
          }
          if (cat === 'FREE MATCH') {
            return c.gameCategory === 'FREE MATCH';
          }
          if (cat === 'CLASH SQUAD 1V1') {
            return c.gameCategory === 'CLASH SQUAD 1V1';
          }
          if (cat === 'SOLO SURVIVAL') {
            return c.gameCategory === 'SOLO SURVIVAL';
          }
          if (cat === 'LONE WOLF 1V1') {
            return c.gameCategory === 'LONE WOLF 1V1';
          }
          if (cat === 'CS 4V4') {
            return c.gameCategory === 'CS 4V4';
          }
          return c.gameCategory.toUpperCase().includes(cat);
        });
  }, [isMyMatches, contests, categoryTitle]);

  // Available options for current contests
  const availableDates = useMemo(() => {
    const set = new Set<string>();
    categoryContests.forEach((c) => {
      const d = parseContestDate(c.time);
      if (d) set.add(d);
    });
    return Array.from(set);
  }, [categoryContests]);

  const availableMaps = useMemo(() => {
    const set = new Set<string>();
    categoryContests.forEach((c) => {
      if (c.map) set.add(c.map.toUpperCase());
    });
    return Array.from(set);
  }, [categoryContests]);

  const availableTypes = useMemo(() => {
    const set = new Set<string>();
    categoryContests.forEach((c) => {
      if (c.type) set.add(c.type.toUpperCase());
    });
    return Array.from(set);
  }, [categoryContests]);

  const availableTeams = ['SOLO', 'DUO', 'SQUAD', '1V1'];

  // Current tab contests
  const tabContests = useMemo(() => {
    return categoryContests.filter((c) => c.status === activeTab);
  }, [categoryContests, activeTab]);

  // Contests matching active search and filters
  const matchedContests = useMemo(() => {
    return tabContests.filter((contest) => {
      // 1. Search Query (Match ID or Title/Name)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.trim().toLowerCase().replace(/^#/, '');
        const idMatch = contest.id.toLowerCase().includes(query);
        const titleMatch = contest.title.toLowerCase().includes(query);
        if (!idMatch && !titleMatch) return false;
      }

      // 2. Date
      if (filters.date !== 'all') {
        const cDate = parseContestDate(contest.time);
        if (cDate !== filters.date) return false;
      }

      // 3. Time Slot
      if (filters.timeSlot !== 'all') {
        const slot = parseContestTimeSlot(contest.time);
        if (slot !== filters.timeSlot) return false;
      }

      // 4. Entry Fee
      if (filters.entryFeeType === 'free' && contest.entryFee !== 0) return false;
      if (filters.entryFeeType === 'under-10' && (contest.entryFee <= 0 || contest.entryFee > 10)) return false;
      if (filters.entryFeeType === '10-25' && (contest.entryFee <= 10 || contest.entryFee > 25)) return false;
      if (filters.entryFeeType === '25+' && contest.entryFee <= 25) return false;

      // 5. Prize Pool
      if (filters.prizeRange === '0-100' && contest.prizePool > 100) return false;
      if (filters.prizeRange === '100-300' && (contest.prizePool <= 100 || contest.prizePool > 300)) return false;
      if (filters.prizeRange === '300-500' && (contest.prizePool <= 300 || contest.prizePool > 500)) return false;
      if (filters.prizeRange === '500+' && contest.prizePool <= 500) return false;

      // 6. Match Type
      if (filters.matchType !== 'all' && contest.type.toUpperCase() !== filters.matchType.toUpperCase()) {
        return false;
      }

      // 7. Map
      if (filters.map !== 'all' && contest.map.toUpperCase() !== filters.map.toUpperCase()) {
        return false;
      }

      // 8. Team Mode
      if (filters.team !== 'all') {
        const cTeam = getContestTeam(contest);
        if (cTeam.toUpperCase() !== filters.team.toUpperCase()) return false;
      }

      return true;
    });
  }, [tabContests, filters]);

  // Count active non-default filters (excluding search query)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.date !== 'all') count++;
    if (filters.timeSlot !== 'all') count++;
    if (filters.entryFeeType !== 'all') count++;
    if (filters.prizeRange !== 'all') count++;
    if (filters.team !== 'all') count++;
    if (filters.matchType !== 'all') count++;
    if (filters.map !== 'all') count++;
    return count;
  }, [filters]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTER_STATE);
  };

  const handleClearSingleFilter = (key: keyof ContestFilterState) => {
    setFilters((prev) => ({
      ...prev,
      [key]: key === 'searchQuery' ? '' : 'all',
    }));
  };

  const handleOpenJoin = (contest: Contest) => {
    setSelectedContestForJoin(contest);
    setIgn('');
    setJoinError('');
    setJoinSuccess(false);
  };

  const handleConfirmJoin = () => {
    if (!selectedContestForJoin) return;
    if (!ign.trim()) {
      setJoinError('Please enter your Free Fire In-Game Name (IGN)');
      return;
    }
    if (balance < selectedContestForJoin.entryFee) {
      setJoinError('Insufficient balance! Please add coins to your wallet.');
      return;
    }

    setJoinSuccess(true);
    setTimeout(() => {
      onJoinContest(selectedContestForJoin.id, ign);
      setJoinSuccess(false);
      setSelectedContestForJoin(null);
    }, 1200);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Full-screen views requested by user
  if (viewingContestDetail) {
    return (
      <ContestDetailView
        contest={viewingContestDetail}
        balance={balance}
        appUsername={appUsername}
        onBack={() => setViewingContestDetail(null)}
        onJoinMatch={(id, ignName) => {
          onJoinContest(id, ignName);
          setViewingContestDetail((prev) =>
            prev
              ? {
                  ...prev,
                  isJoined: true,
                  userIgn: ignName,
                  spotsFilled: Math.min(prev.spotsTotal, prev.spotsFilled + 1),
                }
              : null
          );
        }}
        onOpenRecharge={onOpenRecharge}
      />
    );
  }

  if (viewingMatchResult) {
    return (
      <MatchResultView
        contest={viewingMatchResult}
        onBack={() => setViewingMatchResult(null)}
        appUsername={appUsername}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-white text-slate-900 select-none overflow-hidden animate-fadeIn">
      {/* ========================================================= */}
      {/* 1. TOP HEADER (White Bar with Back Arrow and Title)       */}
      {/* ========================================================= */}
      <header className="shrink-0 bg-white border-b border-slate-200 px-3 py-3 flex items-center justify-between shadow-sm z-20">
        <button
          onClick={onBack}
          aria-label="Back"
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        <h1 className="font-['Outfit',_sans-serif] font-bold text-slate-900 text-[16px] sm:text-[17px] tracking-wide text-center flex-1 pr-2">
          {isMyMatches ? 'MY MATCHES Contests' : `${categoryTitle} Contests`}
        </h1>

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              searchInputRef.current?.focus();
            }}
            aria-label="Search Matches"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              filters.searchQuery
                ? 'bg-red-50 text-red-600'
                : 'text-slate-700 hover:bg-slate-100 active:scale-95'
            }`}
            title="Search match ID or name"
          >
            <Search className="w-5 h-5 stroke-[2.2]" />
          </button>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            aria-label="Filter Matches"
            className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              activeFilterCount > 0
                ? 'bg-red-50 text-red-600'
                : 'text-slate-700 hover:bg-slate-100 active:scale-95'
            }`}
            title="Filter matches"
          >
            <SlidersHorizontal className="w-4 h-4 stroke-[2.2]" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. SUB-HEADER TABS (Upcoming, Ongoing, Resulted)          */}
      {/* ========================================================= */}
      <div className="shrink-0 bg-white border-b border-slate-200 flex items-center justify-around px-2 z-10">
        {(['upcoming', 'ongoing', 'resulted'] as TabType[]).map((tab) => {
          const isActive = activeTab === tab;
          const label = tab === 'upcoming' ? 'Upcoming' : tab === 'ongoing' ? 'Ongoing' : 'Resulted';

          return (
            <button
              key={tab}
              onClick={() => handleTabSwitch(tab)}
              className={`flex-1 py-3 text-sm font-semibold transition-all relative cursor-pointer text-center ${
                isActive ? 'text-red-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{label}</span>

              {/* Active Indicator Underline matching Home Theme */}
              {isActive && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-[2.5px] bg-red-600 rounded-full shadow-xs" />
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 2.5 SEARCH & FILTER BAR (Active in all 3 tabs)            */}
      {/* ========================================================= */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 py-2.5 space-y-2 z-10 shrink-0 select-none">
        <div className="flex items-center gap-2">
          {/* Search Input Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              placeholder={`Search in ${activeTab.toUpperCase()} (ID # or Name)...`}
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-medium"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dedicated Filter Button */}
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer active:scale-95 shrink-0 ${
              activeFilterCount > 0
                ? 'bg-red-600 text-white border-red-600 shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-red-600 text-[10px] font-black flex items-center justify-center shadow-xs">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Quick Filter Shortcuts Pill Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none text-[11px] font-semibold select-none">
          <button
            onClick={handleResetFilters}
            className={`px-2.5 py-1 rounded-lg shrink-0 transition-all cursor-pointer border ${
              activeFilterCount === 0 && !filters.searchQuery
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            All
          </button>

          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                entryFeeType: prev.entryFeeType === 'free' ? 'all' : 'free',
              }))
            }
            className={`px-2.5 py-1 rounded-lg shrink-0 transition-all cursor-pointer border flex items-center gap-1 ${
              filters.entryFeeType === 'free'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
            }`}
          >
            <span>🎁 Free Entry</span>
          </button>

          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                team: prev.team === 'SOLO' ? 'all' : 'SOLO',
              }))
            }
            className={`px-2.5 py-1 rounded-lg shrink-0 transition-all cursor-pointer border ${
              filters.team === 'SOLO'
                ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300'
            }`}
          >
            Solo
          </button>

          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                team: prev.team === 'DUO' ? 'all' : 'DUO',
              }))
            }
            className={`px-2.5 py-1 rounded-lg shrink-0 transition-all cursor-pointer border ${
              filters.team === 'DUO'
                ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300'
            }`}
          >
            Duo
          </button>

          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                team: prev.team === 'SQUAD' ? 'all' : 'SQUAD',
              }))
            }
            className={`px-2.5 py-1 rounded-lg shrink-0 transition-all cursor-pointer border ${
              filters.team === 'SQUAD'
                ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300'
            }`}
          >
            Squad
          </button>

          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                team: prev.team === '1V1' ? 'all' : '1V1',
              }))
            }
            className={`px-2.5 py-1 rounded-lg shrink-0 transition-all cursor-pointer border ${
              filters.team === '1V1'
                ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300'
            }`}
          >
            1v1
          </button>

          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                map: prev.map === 'BERMUDA' ? 'all' : 'BERMUDA',
              }))
            }
            className={`px-2.5 py-1 rounded-lg shrink-0 transition-all cursor-pointer border ${
              filters.map === 'BERMUDA'
                ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300'
            }`}
          >
            Bermuda
          </button>

          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                prizeRange: prev.prizeRange === '300-500' ? 'all' : '300-500',
              }))
            }
            className={`px-2.5 py-1 rounded-lg shrink-0 transition-all cursor-pointer border ${
              filters.prizeRange === '300-500'
                ? 'bg-yellow-600 text-white border-yellow-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-yellow-300'
            }`}
          >
            ₹300+ Prize
          </button>
        </div>

        {/* Active Applied Filters Summary & Remove Chips */}
        {(activeFilterCount > 0 || filters.searchQuery) && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px]">
            <span className="text-slate-500 font-bold uppercase tracking-wider">Active:</span>

            {filters.searchQuery && (
              <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 font-semibold px-2 py-0.5 rounded-md">
                Search: "{filters.searchQuery}"
                <button
                  onClick={() => handleClearSingleFilter('searchQuery')}
                  className="hover:text-red-950 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.date !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-slate-200 text-slate-800 font-semibold px-2 py-0.5 rounded-md">
                Date: {filters.date}
                <button
                  onClick={() => handleClearSingleFilter('date')}
                  className="hover:text-black cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.timeSlot !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-md">
                Time: {filters.timeSlot}
                <button
                  onClick={() => handleClearSingleFilter('timeSlot')}
                  className="hover:text-black cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.entryFeeType !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 font-semibold px-2 py-0.5 rounded-md">
                Fee: {filters.entryFeeType === 'free' ? 'Free' : filters.entryFeeType}
                <button
                  onClick={() => handleClearSingleFilter('entryFeeType')}
                  className="hover:text-black cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.prizeRange !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-900 font-semibold px-2 py-0.5 rounded-md">
                Prize: {filters.prizeRange}
                <button
                  onClick={() => handleClearSingleFilter('prizeRange')}
                  className="hover:text-black cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.team !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-900 font-semibold px-2 py-0.5 rounded-md">
                Team: {filters.team}
                <button
                  onClick={() => handleClearSingleFilter('team')}
                  className="hover:text-black cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.matchType !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-900 font-semibold px-2 py-0.5 rounded-md">
                Type: {filters.matchType}
                <button
                  onClick={() => handleClearSingleFilter('matchType')}
                  className="hover:text-black cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.map !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-900 font-semibold px-2 py-0.5 rounded-md">
                Map: {filters.map}
                <button
                  onClick={() => handleClearSingleFilter('map')}
                  className="hover:text-black cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-red-600 hover:text-red-800 font-bold underline ml-1 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 3. CONTESTS SCROLLABLE FEED                               */}
      {/* ========================================================= */}
      <main className="flex-1 overflow-y-auto px-3.5 py-4 pb-20 space-y-4 overscroll-contain bg-white">
        {isTabLoading ? (
          <ContestListLoadingSkeleton
            message={
              activeTab === 'ongoing'
                ? 'Scanning live ongoing matches...'
                : activeTab === 'resulted'
                ? 'Fetching match results & leaderboards...'
                : 'Loading upcoming tournaments...'
            }
          />
        ) : matchedContests.length === 0 ? (
          /* Empty state matching Image 4 or filtered query */
          <div className="flex flex-col items-center justify-center min-h-[45vh] text-center px-4 space-y-3">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Search className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <p className="text-slate-800 text-sm font-bold">
                No {activeTab} contests found
              </p>
              <p className="text-slate-500 text-xs mt-1 max-w-xs leading-relaxed">
                {activeFilterCount > 0 || filters.searchQuery
                  ? 'No matches correspond to your search query or applied filters. Try adjusting your search or resetting filters.'
                  : `There are currently no ${activeTab} contests available in this category.`}
              </p>
            </div>
            {(activeFilterCount > 0 || filters.searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="mt-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Search &amp; Filters</span>
              </button>
            )}
          </div>
        ) : (
          matchedContests.map((contest) => {
            const spotsLeft = Math.max(0, contest.spotsTotal - contest.spotsFilled);
            const progressPercent = Math.min(100, Math.round((contest.spotsFilled / contest.spotsTotal) * 100));
            const isFull = contest.spotsFilled >= contest.spotsTotal || spotsLeft === 0;

            return (
              <div
                key={contest.id}
                className="w-full rounded-2xl overflow-hidden shadow-sm bg-slate-50 border border-slate-200 border-b-2 border-b-red-500 transition-transform duration-200 hover:border-slate-300"
              >
                {/* Top Half: Tournament Poster Banner */}
                <div
                  className="cursor-pointer"
                  onClick={() => handleOpenContest(contest, activeTab === 'resulted')}
                >
                  <ContestBannerGraphic
                    bannerType={contest.bannerType}
                    customTitle={
                      contest.bannerType === 'duo-br'
                        ? 'DUO BR FULL MAP'
                        : contest.bannerType === 'cs-1v1'
                        ? 'CLASH SQUAD 1V1'
                        : 'SOLO BR FULL MAP'
                    }
                  />
                </div>

                {/* Bottom Half: Card Details Body */}
                <div className="bg-slate-50 p-3.5 sm:p-4 text-slate-900 select-text">
                  {/* Match Title & Quick Copy Link Button */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3
                        onClick={() => handleOpenContest(contest, activeTab === 'resulted')}
                        className="font-extrabold text-[13px] sm:text-sm text-slate-900 tracking-tight leading-snug cursor-pointer hover:text-red-600 transition-colors"
                      >
                        {contest.title}
                      </h3>
                      {/* Match Time */}
                      <p className="text-slate-500 text-[11px] sm:text-xs font-semibold mt-0.5 mb-3">
                        {contest.time}
                      </p>
                    </div>

                    <button
                      onClick={(e) => handleCopyContestUrl(e, contest.id, activeTab === 'resulted')}
                      title={`Copy Direct Link for Contest #${contest.id}`}
                      aria-label="Copy Contest Link"
                      className="shrink-0 text-slate-400 hover:text-red-600 bg-white border border-slate-200 hover:border-slate-300 p-1.5 rounded-lg shadow-2xs transition-all active:scale-95 cursor-pointer mt-0.5 flex items-center gap-1"
                    >
                      {copiedText === `link-${contest.id}` ? (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold px-0.5">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium px-0.5">
                          <Copy className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline text-[9px] font-mono">#{contest.id}</span>
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Primary Stats Grid (3 Equal Columns): Prize Pool | Entry | Per Kill */}
                  <div className="grid grid-cols-3 gap-2 text-center py-1">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        PRIZE POOL
                      </span>
                      <div className="flex items-center justify-center gap-1 font-extrabold text-slate-900 text-sm mt-0.5">
                        <RupeeGoldCoin size={15} />
                        <span>{contest.prizePool}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        ENTRY
                      </span>
                      <div className="flex items-center justify-center gap-1 font-extrabold text-slate-900 text-sm mt-0.5">
                        <RupeeGoldCoin size={15} />
                        <span>{contest.entryFee}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        PER KILL
                      </span>
                      <div className="flex items-center justify-center gap-1 font-extrabold text-slate-900 text-sm mt-0.5">
                        <RupeeGoldCoin size={15} />
                        <span>{contest.perKill}</span>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Details Grid (3 Equal Columns): Team | Map | Type */}
                  <div className="grid grid-cols-3 gap-2 text-center py-2 border-t border-slate-200 mt-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        TEAM
                      </span>
                      <span className="font-extrabold text-slate-700 text-xs mt-0.5 block">
                        {getContestTeam(contest)}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        MAP
                      </span>
                      <span className="font-extrabold text-slate-700 text-xs mt-0.5 block">
                        {contest.map}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        TYPE
                      </span>
                      <span className="font-extrabold text-slate-700 text-xs mt-0.5 block">
                        {contest.type}
                      </span>
                    </div>
                  </div>

                  {/* ========================================================= */}
                  {/* Action Section based on Active Tab                         */}
                  {/* ========================================================= */}

                  {/* CASE 1: UPCOMING TAB (Spots Bar + Join Button) */}
                  {activeTab === 'upcoming' && (
                    <div className="mt-2.5 pt-1">
                      {/* Registration Line (Orange when spots available, Red when Match is Full) */}
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mb-1.5">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isFull ? 'bg-red-600' : 'bg-amber-500'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Spot status text (Red when Full, Amber/Orange when open) */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-bold text-xs transition-colors ${
                              isFull ? 'text-red-600' : 'text-amber-600'
                            }`}
                          >
                            {isFull ? 'Match Full' : `Only ${spotsLeft} Spot Left`}
                          </span>
                          <span
                            className={`font-bold text-xs transition-colors ${
                              isFull ? 'text-red-600' : 'text-amber-600'
                            }`}
                          >
                            {contest.spotsFilled}/{contest.spotsTotal}
                          </span>
                        </div>

                        {/* Join Button */}
                        <button
                          onClick={() => handleOpenContest(contest, false)}
                          className={`font-bold text-sm px-6 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer ${
                            contest.isJoined
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                              : isFull
                              ? 'bg-red-600 hover:bg-red-700 active:scale-95 text-white shadow-sm'
                              : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-95 text-white shadow-sm'
                          }`}
                        >
                          {contest.isJoined ? 'Joined' : isFull ? 'Full' : 'Join'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* CASE 2: ONGOING TAB (View Details Button) */}
                  {activeTab === 'ongoing' && (
                    <div className="mt-3 flex items-center justify-start">
                      <button
                        onClick={() => handleOpenContest(contest, false)}
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-2 rounded-lg shadow-sm cursor-pointer transition-all"
                      >
                        View Details
                      </button>
                    </div>
                  )}

                  {/* CASE 3: RESULTED TAB (WATCH MATCH & NOT JOINED Buttons) */}
                  {activeTab === 'resulted' && (
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => handleOpenContest(contest, true)}
                        className="bg-white border border-slate-300 hover:bg-slate-100 active:scale-95 text-slate-800 font-bold text-xs uppercase px-4 py-2 rounded-lg shadow-sm cursor-pointer transition-all flex items-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5 text-red-600" />
                        <span>WATCH MATCH</span>
                      </button>

                      <button
                        onClick={() => handleOpenContest(contest, true)}
                        className="bg-white border border-slate-300 hover:bg-slate-100 active:scale-95 text-slate-800 font-bold text-xs uppercase px-4 py-2 rounded-lg shadow-sm cursor-pointer transition-all"
                      >
                        {contest.isJoined ? 'JOINED (RANK #4)' : 'NOT JOINED'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </main>

      {/* ========================================================= */}
      {/* 4. MODALS & DIALOGS                                       */}
      {/* ========================================================= */}

      {/* JOIN CONTEST MODAL */}
      {selectedContestForJoin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn select-none">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
              <span className="font-bold text-slate-900 text-sm">
                JOIN CONTEST #{selectedContestForJoin.id}
              </span>
              <button
                onClick={() => setSelectedContestForJoin(null)}
                className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3.5 text-xs text-slate-900">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Entry Fee</span>
                  <span className="font-bold text-amber-600 flex items-center gap-1">
                    <RupeeGoldCoin size={14} />
                    {selectedContestForJoin.entryFee}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Prize Pool</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <RupeeGoldCoin size={14} />
                    {selectedContestForJoin.prizePool}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Per Kill</span>
                  <span className="font-bold text-sky-600 flex items-center gap-1">
                    <RupeeGoldCoin size={14} />
                    {selectedContestForJoin.perKill}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between items-center">
                  <span className="text-slate-500">Your Wallet Balance</span>
                  <span className="font-bold text-amber-600 flex items-center gap-1">
                    <RupeeGoldCoin size={14} />
                    {balance}
                  </span>
                </div>
              </div>

              {/* Free Fire IGN Input */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Free Fire In-Game Name (IGN) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Exact Free Fire name..."
                  value={ign}
                  onChange={(e) => setIgn(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 text-xs"
                />
                <p className="text-[10px] text-amber-600 mt-1">
                  ⚠️ Must match your Free Fire character name exactly.
                </p>
              </div>

              {joinError && (
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                  {joinError}
                </div>
              )}

              {joinSuccess && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Match registered successfully! See you on Bermuda.</span>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setSelectedContestForJoin(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmJoin}
                  disabled={joinSuccess}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-95 text-white font-bold cursor-pointer transition-all shadow-md flex items-center justify-center gap-1"
                >
                  <span>Confirm & Join</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {selectedContestForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn select-none">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
              <span className="font-bold text-slate-900 text-sm">
                MATCH DETAILS #{selectedContestForDetails.id}
              </span>
              <button
                onClick={() => setSelectedContestForDetails(null)}
                className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3 text-xs text-slate-900">
              {/* Credentials Box */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Room ID:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-600 text-sm">
                      {selectedContestForDetails.roomId || 'Waiting Host...'}
                    </span>
                    {selectedContestForDetails.roomId && (
                      <button
                        onClick={() => handleCopy(selectedContestForDetails.roomId!, 'room')}
                        className="p-1 rounded bg-slate-200 text-slate-700 hover:text-slate-900 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Password:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-600 text-sm">
                      {selectedContestForDetails.roomPassword || 'Waiting Host...'}
                    </span>
                    {selectedContestForDetails.roomPassword && (
                      <button
                        onClick={() => handleCopy(selectedContestForDetails.roomPassword!, 'pass')}
                        className="p-1 rounded bg-slate-200 text-slate-700 hover:text-slate-900 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {copiedText && (
                  <p className="text-emerald-600 text-[10px] text-right font-medium">
                    Copied to clipboard!
                  </p>
                )}
              </div>

              {/* Rules Notice matching Banner */}
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed font-semibold">
                <p className="text-amber-800 font-bold mb-1">⚠️ Official Rules:</p>
                <ul className="list-disc list-inside space-y-0.5 text-[10.5px]">
                  <li>BAN GUN - DOUBLE VECTOR , M79!</li>
                  <li>BAN CHARACTER - RYDEN!</li>
                  <li>MINIMUM LEVEL - 40 LVL!</li>
                  <li>IDP TIME - 5 MIN BEFORE MATCH TIME!</li>
                  <li>RECORD - ROOM ENTRY AND GAMEPLAY!</li>
                  <li>PENALTY OR BAN - UNREGISTER INVITE!</li>
                </ul>
              </div>

              <button
                onClick={() => setSelectedContestForDetails(null)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold cursor-pointer shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WATCH MATCH MODAL */}
      {selectedContestForWatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn select-none">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="font-bold text-slate-900 text-sm">
                  MATCH STREAM #{selectedContestForWatch.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedContestForWatch(null)}
                className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video preview representation */}
            <div className="relative aspect-video bg-slate-900 flex items-center justify-center">
              <div className="text-center p-4">
                <Video className="w-10 h-10 text-red-500 mx-auto mb-2 opacity-80" />
                <p className="text-white font-bold text-xs mb-1">
                  Official Match Replay & Highlights
                </p>
                <p className="text-slate-400 text-[10px]">
                  GameX Esports Official Free Fire Broadcast
                </p>
              </div>
              <div className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                REPLAY HD
              </div>
            </div>

            {/* Standings */}
            <div className="p-3.5 space-y-2 text-xs text-slate-900">
              <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wide">
                Final Match Standings
              </div>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between items-center p-1.5 rounded bg-red-50 border border-red-200 text-red-900">
                  <span>#1 👑 TSG_RAHUL (tsg_rahul) (12 Kills)</span>
                  <span className="font-bold text-amber-600">🪙 150</span>
                </div>
                <div className="flex justify-between items-center p-1.5 rounded bg-slate-50 border border-slate-200 text-slate-700">
                  <span>#2 🥈 OP_VINCENZO (vincenzo_op) (8 Kills)</span>
                  <span className="font-bold text-slate-700">🪙 90</span>
                </div>
                <div className="flex justify-between items-center p-1.5 rounded bg-slate-50 border border-slate-200 text-slate-700">
                  <span>#3 🥉 GAMEX_BOSS (gamex_boss) (5 Kills)</span>
                  <span className="font-bold text-slate-700">🪙 60</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedContestForWatch(null)}
                className="w-full mt-2 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
              >
                Close Stream
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PARTICIPATION STATUS MODAL */}
      {selectedContestForStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn select-none">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl p-4 text-center">
            <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-2" />
            <h4 className="font-bold text-slate-900 text-sm mb-1">
              Match Status #{selectedContestForStatus.id}
            </h4>
            <p className="text-slate-600 text-xs mb-4">
              {selectedContestForStatus.isJoined
                ? 'You participated in this match and achieved Rank #4 with 3 Kills!'
                : 'You were not registered for this concluded match.'}
            </p>
            <button
              onClick={() => setSelectedContestForStatus(null)}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* FILTER MODAL SHEET */}
      <ContestFiltersModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={(newFilters) => setFilters(newFilters)}
        onResetFilters={handleResetFilters}
        availableDates={availableDates}
        availableMaps={availableMaps}
        availableTypes={availableTypes}
        availableTeams={availableTeams}
        matchingCount={matchedContests.length}
      />
    </div>
  );
};
