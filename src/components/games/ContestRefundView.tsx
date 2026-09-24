import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Search,
  Wallet,
  X,
} from 'lucide-react';
import { ColumnsDropdown, ColumnItem } from '../ColumnsDropdown';
import { RowsPerPageDropdown } from '../RowsPerPageDropdown';
import { ContestRecord, ContestRefundRecord } from './types';
import { useNotification } from '../../context/NotificationContext';

interface ContestRefundViewProps {
  contest: ContestRecord | null;
  onBack: () => void;
}

// Initial mock data matching image
const INITIAL_REFUNDS: ContestRefundRecord[] = [
  {
    contestJoiningId: 96,
    joinedBy: 1,
    teamNumber: 1,
    memberPosition: 1,
    inGameName: 'awdad',
    inGameId: 'awdawdawd',
    kills: 0,
    rank: 0,
    rankPrize: 0,
    totalWinning: 0,
    isWalletUpdated: 'No',
  },
  {
    contestJoiningId: 97,
    joinedBy: 1,
    teamNumber: 1,
    memberPosition: 2,
    inGameName: '1111111111111111111111111',
    inGameId: 'id',
    kills: 0,
    rank: 0,
    rankPrize: 0,
    totalWinning: 0,
    isWalletUpdated: 'No',
  },
  {
    contestJoiningId: 98,
    joinedBy: 1,
    teamNumber: 1,
    memberPosition: 3,
    inGameName: 'dwwad',
    inGameId: 'awdawd',
    kills: 0,
    rank: 0,
    rankPrize: 0,
    totalWinning: 0,
    isWalletUpdated: 'No',
  },
  {
    contestJoiningId: 99,
    joinedBy: 1,
    teamNumber: 1,
    memberPosition: 4,
    inGameName: '',
    inGameId: '',
    kills: 0,
    rank: 0,
    rankPrize: 0,
    totalWinning: 0,
    isWalletUpdated: 'No',
  },
];

export const ContestRefundView: React.FC<ContestRefundViewProps> = ({
  contest,
  onBack,
}) => {
  const { notify } = useNotification();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [refunds, setRefunds] = useState<ContestRefundRecord[]>(INITIAL_REFUNDS);

  // Modal and batch update states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [progressCount, setProgressCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleOpenModal = () => {
    // Calculate how many are already updated
    const count = refunds.filter((r) => r.isWalletUpdated === 'Yes' || r.isWalletUpdated === true).length;
    setProgressCount(count);
    setIsRunning(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setIsModalOpen(false);
  };

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setRefunds((prev) => {
        // Find first item with 'No'
        const nextIdx = prev.findIndex(
          (r) => r.isWalletUpdated === 'No' || r.isWalletUpdated === false
        );

        if (nextIdx === -1) {
          // All done
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsRunning(false);
          notify({
            message: `Completed updating wallets for all ${prev.length} entries`,
            type: 'success',
          });
          return prev;
        }

        const updated = [...prev];
        updated[nextIdx] = {
          ...updated[nextIdx],
          isWalletUpdated: 'Yes',
        };

        const updatedTotal = updated.filter(
          (r) => r.isWalletUpdated === 'Yes' || r.isWalletUpdated === true
        ).length;
        setProgressCount(updatedTotal);

        if (updatedTotal >= updated.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsRunning(false);
          notify({
            message: `Progress complete: all ${updated.length} wallets updated`,
            type: 'success',
          });
        }

        return updated;
      });
    }, 700);
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    notify({
      message: 'Wallet update paused',
      type: 'info',
    });
  };

  // Columns matching Image
  const columnDefs: ColumnItem[] = [
    { key: 'contestJoiningId', label: 'contestJoiningId' },
    { key: 'joinedBy', label: 'joinedBy' },
    { key: 'teamNumber', label: 'teamNumber' },
    { key: 'memberPosition', label: 'memberPosition' },
    { key: 'inGameName', label: 'inGameName' },
    { key: 'inGameId', label: 'inGameId' },
    { key: 'kills', label: 'kills' },
    { key: 'rank', label: 'rank' },
    { key: 'rankPrize', label: 'rankPrize' },
    { key: 'totalWinning', label: 'totalWinning' },
    { key: 'isWalletUpdated', label: 'isWalletUpdated' },
  ];

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    contestJoiningId: true,
    joinedBy: true,
    teamNumber: true,
    memberPosition: true,
    inGameName: true,
    inGameId: true,
    kills: true,
    rank: true,
    rankPrize: true,
    totalWinning: true,
    isWalletUpdated: true,
  });

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleUpdateWallets = () => {
    notify({
      message: 'Wallets updated successfully for refund entries',
      type: 'success',
    });
  };

  const filteredRefunds = useMemo(() => {
    let list = [...refunds];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (r) =>
          String(r.contestJoiningId).includes(q) ||
          String(r.joinedBy).includes(q) ||
          r.inGameName.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) =>
      sortDirection === 'asc'
        ? a.contestJoiningId - b.contestJoiningId
        : b.contestJoiningId - a.contestJoiningId
    );
    return list;
  }, [refunds, searchQuery, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredRefunds.length / rowsPerPage));
  const paginatedRefunds = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredRefunds.slice(start, start + rowsPerPage);
  }, [filteredRefunds, currentPage, rowsPerPage]);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Page Title & Breadcrumb matching Image 4: UpdateWallets sendRefund */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0f2d59]">
          UpdateWallets sendRefund
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
          <span className="text-slate-500">UpdateWallets sendRefund</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
        {/* Top Controls: Search, Columns, Update Wallets, Go Back */}
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

            {/* Update Wallets button matching Image 4 */}
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-xl shadow-2xs transition-colors cursor-pointer"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Update Wallets</span>
            </button>

            {/* Go Back button matching Image 4 */}
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-xl shadow-2xs transition-colors cursor-pointer"
            >
              <span>Go Back</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Total items & Rows per page */}
        <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
          <div>Total {filteredRefunds.length} items</div>
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
                {visibleColumns.joinedBy && <th className="px-4 py-3.5">joinedBy</th>}
                {visibleColumns.teamNumber && <th className="px-4 py-3.5">teamNumber</th>}
                {visibleColumns.memberPosition && <th className="px-4 py-3.5">memberPosition</th>}
                {visibleColumns.inGameName && <th className="px-4 py-3.5">inGameName</th>}
                {visibleColumns.inGameId && <th className="px-4 py-3.5">inGameId</th>}
                {visibleColumns.kills && <th className="px-4 py-3.5">kills</th>}
                {visibleColumns.rank && <th className="px-4 py-3.5">rank</th>}
                {visibleColumns.rankPrize && <th className="px-4 py-3.5">rankPrize</th>}
                {visibleColumns.totalWinning && <th className="px-4 py-3.5">totalWinning</th>}
                {visibleColumns.isWalletUpdated && <th className="px-4 py-3.5">isWalletUpdated</th>}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-gray-700">
              {paginatedRefunds.length === 0 ? (
                <tr>
                  <td
                    colSpan={11}
                    className="px-4 py-20 text-center text-gray-400 font-medium"
                  >
                    No data found
                  </td>
                </tr>
              ) : (
                paginatedRefunds.map((item) => (
                  <tr
                    key={item.contestJoiningId}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    {visibleColumns.contestJoiningId && (
                      <td className="px-4 py-3.5 font-medium text-gray-900">
                        {item.contestJoiningId}
                      </td>
                    )}
                    {visibleColumns.joinedBy && (
                      <td className="px-4 py-3.5 text-gray-600 font-mono">
                        {item.joinedBy}
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
                      <td className="px-4 py-3.5 text-gray-500 font-mono">
                        {item.inGameId}
                      </td>
                    )}
                    {visibleColumns.kills && (
                      <td className="px-4 py-3.5 text-gray-800">
                        {item.kills}
                      </td>
                    )}
                    {visibleColumns.rank && (
                      <td className="px-4 py-3.5 text-gray-800">
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
                    {visibleColumns.isWalletUpdated && (
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${
                            item.isWalletUpdated
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {String(item.isWalletUpdated)}
                        </span>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination matching Image 4 */}
        <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-start gap-1.5">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="w-7 h-7 text-xs font-semibold rounded-full flex items-center justify-center bg-black text-white shadow-2xs"
          >
            1
          </button>

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

      {/* Updating joining Wallets Modal matching uploaded image */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 pt-5 pb-2 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 tracking-tight">
                Updating joining Wallets
              </h3>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <p className="text-sm text-gray-700">
                Progress of updating wallets: {progressCount} out of {refunds.length} updated
              </p>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 pt-1 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleStop}
                className="px-6 py-2 rounded-lg text-xs font-semibold bg-[#ffd5dc] text-[#d81b60] hover:bg-[#ffc2cc] active:scale-95 transition-all cursor-pointer"
              >
                Stop
              </button>
              <button
                type="button"
                onClick={handleStart}
                className="px-6 py-2 rounded-lg text-xs font-semibold bg-[#00c853] hover:bg-[#00b248] active:scale-95 text-white shadow-2xs transition-all cursor-pointer"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
