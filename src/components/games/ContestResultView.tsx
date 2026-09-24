import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import { ColumnsDropdown, ColumnItem } from '../ColumnsDropdown';
import { RowsPerPageDropdown } from '../RowsPerPageDropdown';
import { ContestRecord, ContestResultRecord } from './types';
import { useNotification } from '../../context/NotificationContext';

interface ContestResultViewProps {
  contest: ContestRecord | null;
  onBack: () => void;
}

// Initial mock data matching image 1
const INITIAL_RESULTS: ContestResultRecord[] = [
  {
    contestJoiningId: 207,
    userId: 97,
    teamNumber: 1,
    memberPosition: 1,
    inGameName: 'Babu gaming',
    inGameId: '',
    kills: 0,
    rank: 14,
    rankPrize: 0,
    totalWinning: 0,
  },
  {
    contestJoiningId: 208,
    userId: 97,
    teamNumber: 1,
    memberPosition: 3,
    inGameName: 'Mohitxff',
    inGameId: '',
    kills: 1,
    rank: 13,
    rankPrize: 0,
    totalWinning: 10,
  },
  {
    contestJoiningId: 209,
    userId: 97,
    teamNumber: 1,
    memberPosition: 2,
    inGameName: 'Ffxprasidh',
    inGameId: '',
    kills: 1,
    rank: 12,
    rankPrize: 0,
    totalWinning: 10,
  },
  {
    contestJoiningId: 210,
    userId: 97,
    teamNumber: 1,
    memberPosition: 6,
    inGameName: 'Xt rohit',
    inGameId: '',
    kills: 3,
    rank: 11,
    rankPrize: 0,
    totalWinning: 30,
  },
  {
    contestJoiningId: 211,
    userId: 97,
    teamNumber: 1,
    memberPosition: 7,
    inGameName: 'Mash 18',
    inGameId: '',
    kills: 2,
    rank: 10,
    rankPrize: 0,
    totalWinning: 20,
  },
  {
    contestJoiningId: 212,
    userId: 97,
    teamNumber: 1,
    memberPosition: 10,
    inGameName: 'Nvrrrrrdieee',
    inGameId: '',
    kills: 4,
    rank: 9,
    rankPrize: 0,
    totalWinning: 40,
  },
  {
    contestJoiningId: 213,
    userId: 97,
    teamNumber: 1,
    memberPosition: 17,
    inGameName: 'Xt_prime',
    inGameId: '',
    kills: 1,
    rank: 8,
    rankPrize: 0,
    totalWinning: 10,
  },
  {
    contestJoiningId: 214,
    userId: 97,
    teamNumber: 1,
    memberPosition: 21,
    inGameName: 'Max 144 hz',
    inGameId: '',
    kills: 3,
    rank: 7,
    rankPrize: 0,
    totalWinning: 30,
  },
  {
    contestJoiningId: 215,
    userId: 97,
    teamNumber: 1,
    memberPosition: 9,
    inGameName: 'Nitin ff',
    inGameId: '',
    kills: 0,
    rank: 0,
    rankPrize: 0,
    totalWinning: 0,
  },
  {
    contestJoiningId: 216,
    userId: 97,
    teamNumber: 1,
    memberPosition: 4,
    inGameName: 'Fe hemilton',
    inGameId: '',
    kills: 1,
    rank: 5,
    rankPrize: 0,
    totalWinning: 10,
  },
  // Additional items to reach total 48 items
  ...Array.from({ length: 38 }, (_, idx) => {
    const id = 217 + idx;
    const kills = (id % 5);
    const rank = Math.max(1, 20 - Math.floor(idx / 2));
    const rankPrize = rank === 1 ? 500 : rank === 2 ? 300 : rank === 3 ? 150 : 0;
    const totalWinning = kills * 10 + rankPrize;
    return {
      contestJoiningId: id,
      userId: 97,
      teamNumber: (idx % 12) + 1,
      memberPosition: (idx % 4) + 1,
      inGameName: ['AlphaSniper', 'ProPlayer99', 'DarkKnight', 'StormBreaker', 'ViperX'][idx % 5] + `_${id}`,
      inGameId: `GID_${id * 123}`,
      kills,
      rank,
      rankPrize,
      totalWinning,
    };
  }),
];

export const ContestResultView: React.FC<ContestResultViewProps> = ({
  contest,
  onBack,
}) => {
  const { notify } = useNotification();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [results] = useState<ContestResultRecord[]>(INITIAL_RESULTS);

  // Column definitions matching image 1
  const columnDefs: ColumnItem[] = [
    { key: 'contestJoiningId', label: 'contestJoiningId' },
    { key: 'userId', label: 'userId' },
    { key: 'teamNumber', label: 'teamNumber' },
    { key: 'memberPosition', label: 'memberPosition' },
    { key: 'inGameName', label: 'inGameName' },
    { key: 'inGameId', label: 'inGameId' },
    { key: 'kills', label: 'kills' },
    { key: 'rank', label: 'rank' },
    { key: 'rankPrize', label: 'rankPrize' },
    { key: 'totalWinning', label: 'totalWinning' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    contestJoiningId: true,
    userId: true,
    teamNumber: true,
    memberPosition: true,
    inGameName: true,
    inGameId: true,
    kills: true,
    rank: true,
    rankPrize: true,
    totalWinning: true,
    actions: true,
  });

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredResults = useMemo(() => {
    let list = [...results];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (r) =>
          String(r.contestJoiningId).includes(q) ||
          String(r.userId).includes(q) ||
          r.inGameName.toLowerCase().includes(q) ||
          r.inGameId.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) =>
      sortDirection === 'asc'
        ? a.contestJoiningId - b.contestJoiningId
        : b.contestJoiningId - a.contestJoiningId
    );
    return list;
  }, [results, searchQuery, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredResults.length / rowsPerPage));
  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredResults.slice(start, start + rowsPerPage);
  }, [filteredResults, currentPage, rowsPerPage]);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Page Title & Breadcrumb matching Image 1: view Result */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0f2d59]">
          view <span className="text-[#0f2d59]">Result</span>
        </h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
          <button
            type="button"
            onClick={onBack}
            className="hover:text-slate-600 transition-colors cursor-pointer"
          >
            home
          </button>
          <span>&gt;</span>
          <span className="text-slate-500">view Result</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
        {/* Top Controls: Search, Columns, Go Back */}
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name , email , number"
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2.5">
            <ColumnsDropdown
              columns={columnDefs}
              visibleColumns={visibleColumns}
              onToggleColumn={handleToggleColumn}
            />

            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-2xs transition-colors cursor-pointer"
            >
              <span>Go Back</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Total items & Rows per page */}
        <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
          <div>Total {filteredResults.length} items</div>
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <RowsPerPageDropdown
              value={rowsPerPage}
              onChange={(v: number) => {
                setRowsPerPage(v);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                {visibleColumns.contestJoiningId && (
                  <th
                    className="px-4 py-3.5 cursor-pointer select-none hover:text-gray-900 transition-colors"
                    onClick={() =>
                      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                    }
                  >
                    <div className="flex items-center gap-1">
                      <span>contestJoiningId</span>
                      {sortDirection === 'asc' ? (
                        <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                      )}
                    </div>
                  </th>
                )}
                {visibleColumns.userId && <th className="px-4 py-3.5">userId</th>}
                {visibleColumns.teamNumber && <th className="px-4 py-3.5">teamNumber</th>}
                {visibleColumns.memberPosition && <th className="px-4 py-3.5">memberPosition</th>}
                {visibleColumns.inGameName && <th className="px-4 py-3.5">inGameName</th>}
                {visibleColumns.inGameId && <th className="px-4 py-3.5">inGameId</th>}
                {visibleColumns.kills && <th className="px-4 py-3.5">kills</th>}
                {visibleColumns.rank && <th className="px-4 py-3.5">rank</th>}
                {visibleColumns.rankPrize && <th className="px-4 py-3.5">rankPrize</th>}
                {visibleColumns.totalWinning && <th className="px-4 py-3.5">totalWinning</th>}
                {visibleColumns.actions && <th className="px-4 py-3.5 text-right">ACTIONS</th>}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-gray-700">
              {paginatedResults.length === 0 ? (
                <tr>
                  <td
                    colSpan={11}
                    className="px-4 py-16 text-center text-gray-400 font-medium"
                  >
                    No data found
                  </td>
                </tr>
              ) : (
                paginatedResults.map((item, index) => (
                  <tr
                    key={item.contestJoiningId}
                    className={`${
                      index === 0 ? 'bg-gray-100/60' : 'hover:bg-gray-50/70'
                    } transition-colors`}
                  >
                    {visibleColumns.contestJoiningId && (
                      <td className="px-4 py-3.5 font-medium text-gray-900">
                        {item.contestJoiningId}
                      </td>
                    )}
                    {visibleColumns.userId && (
                      <td className="px-4 py-3.5 text-gray-600 font-mono">
                        {item.userId}
                      </td>
                    )}
                    {visibleColumns.teamNumber && (
                      <td className="px-4 py-3.5 text-gray-700">
                        {item.teamNumber}
                      </td>
                    )}
                    {visibleColumns.memberPosition && (
                      <td className="px-4 py-3.5 text-gray-700">
                        {item.memberPosition}
                      </td>
                    )}
                    {visibleColumns.inGameName && (
                      <td className="px-4 py-3.5 font-medium text-gray-900">
                        {item.inGameName}
                      </td>
                    )}
                    {visibleColumns.inGameId && (
                      <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px]">
                        {item.inGameId || '—'}
                      </td>
                    )}
                    {visibleColumns.kills && (
                      <td className="px-4 py-3.5 text-gray-800 font-medium">
                        {item.kills}
                      </td>
                    )}
                    {visibleColumns.rank && (
                      <td className="px-4 py-3.5 text-gray-800 font-medium">
                        {item.rank}
                      </td>
                    )}
                    {visibleColumns.rankPrize && (
                      <td className="px-4 py-3.5 text-gray-800">
                        {item.rankPrize}
                      </td>
                    )}
                    {visibleColumns.totalWinning && (
                      <td className="px-4 py-3.5 font-semibold text-emerald-600">
                        {item.totalWinning}
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="px-4 py-3.5 text-right text-gray-400">
                        —
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination matching Image 1: < 1 2 3 4 5 > */}
        <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-start gap-1.5">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((pg) => {
            const isActive = currentPage === pg;
            return (
              <button
                key={pg}
                type="button"
                onClick={() => setCurrentPage(pg)}
                className={`w-7 h-7 text-xs font-semibold rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-black text-white shadow-2xs'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {pg}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
