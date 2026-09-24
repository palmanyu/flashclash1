import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Eye,
} from 'lucide-react';
import { ColumnsDropdown, ColumnItem } from '../ColumnsDropdown';
import { RowsPerPageDropdown } from '../RowsPerPageDropdown';
import { ContestRecord, ContestJoiningRecord } from './types';
import { useNotification } from '../../context/NotificationContext';

interface ContestJoiningsViewProps {
  contest: ContestRecord | null;
  onBack: () => void;
}

export const ContestJoiningsView: React.FC<ContestJoiningsViewProps> = ({
  contest,
  onBack,
}) => {
  const { notify } = useNotification();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Sample initial joinings for demonstration if none exist
  const [joinings, setJoinings] = useState<ContestJoiningRecord[]>([
    {
      contestJoiningId: 1001,
      userId: 4529,
      teamNumber: 1,
      memberPosition: 1,
      inGameName: 'ShadowHunter',
      inGameId: 'FF_8839201',
    },
    {
      contestJoiningId: 1002,
      userId: 6712,
      teamNumber: 1,
      memberPosition: 2,
      inGameName: 'GhostRider',
      inGameId: 'FF_4920194',
    },
    {
      contestJoiningId: 1003,
      userId: 8810,
      teamNumber: 2,
      memberPosition: 1,
      inGameName: 'Phoenix99',
      inGameId: 'FF_9918234',
    },
  ]);

  // Column definitions matching Image 5
  const columnDefs: ColumnItem[] = [
    { key: 'contestJoiningId', label: 'contestJoiningId' },
    { key: 'userId', label: 'userId' },
    { key: 'teamNumber', label: 'Team Number' },
    { key: 'memberPosition', label: 'Member Position' },
    { key: 'inGameName', label: 'In Game Name' },
    { key: 'inGameId', label: 'In Game Id' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    contestJoiningId: true,
    userId: true,
    teamNumber: true,
    memberPosition: true,
    inGameName: true,
    inGameId: true,
    actions: true,
  });

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredJoinings = useMemo(() => {
    let result = [...joinings];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (j) =>
          String(j.contestJoiningId).includes(q) ||
          String(j.userId).includes(q) ||
          String(j.teamNumber).includes(q) ||
          j.inGameName.toLowerCase().includes(q) ||
          j.inGameId.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) =>
      sortDirection === 'asc'
        ? a.contestJoiningId - b.contestJoiningId
        : b.contestJoiningId - a.contestJoiningId
    );

    return result;
  }, [joinings, searchQuery, sortDirection]);

  const totalPages = Math.ceil(filteredJoinings.length / rowsPerPage) || 1;
  const paginatedJoinings = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredJoinings.slice(start, start + rowsPerPage);
  }, [filteredJoinings, currentPage, rowsPerPage]);

  const handleDeleteJoining = (id: number) => {
    setJoinings((prev) => prev.filter((j) => j.contestJoiningId !== id));
    notify({ message: `Joining #${id} removed successfully`, type: 'success' });
  };

  return (
    <div className="space-y-4">
      {/* Title & Breadcrumbs */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Joinings
        </h2>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
          <span className="hover:text-gray-700 cursor-pointer" onClick={onBack}>
            Home
          </span>
          <span>&gt;</span>
          <span className="hover:text-gray-700 cursor-pointer" onClick={onBack}>
            Games
          </span>
          <span>&gt;</span>
          <span className="hover:text-gray-700 cursor-pointer" onClick={onBack}>
            Contests
          </span>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">Joinings</span>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        {/* Top Filter and Actions Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by Joined By, Team Number, In Game Name or In Game Id"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
            />
          </div>

          {/* Action buttons on top right */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto">
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
          <div>Total {filteredJoinings.length} items</div>
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

                {visibleColumns.userId && (
                  <th className="px-4 py-3.5">userId</th>
                )}

                {visibleColumns.teamNumber && (
                  <th className="px-4 py-3.5">Team Number</th>
                )}

                {visibleColumns.memberPosition && (
                  <th className="px-4 py-3.5">Member Position</th>
                )}

                {visibleColumns.inGameName && (
                  <th className="px-4 py-3.5">In Game Name</th>
                )}

                {visibleColumns.inGameId && (
                  <th className="px-4 py-3.5">In Game Id</th>
                )}

                {visibleColumns.actions && (
                  <th className="px-4 py-3.5 text-right">ACTIONS</th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-gray-700">
              {paginatedJoinings.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-16 text-center text-gray-400 font-medium"
                  >
                    No data found
                  </td>
                </tr>
              ) : (
                paginatedJoinings.map((j) => (
                  <tr
                    key={j.contestJoiningId}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    {visibleColumns.contestJoiningId && (
                      <td className="px-4 py-3.5 font-medium text-gray-900">
                        {j.contestJoiningId}
                      </td>
                    )}

                    {visibleColumns.userId && (
                      <td className="px-4 py-3.5 text-gray-600 font-mono">
                        {j.userId}
                      </td>
                    )}

                    {visibleColumns.teamNumber && (
                      <td className="px-4 py-3.5 text-gray-700">
                        {j.teamNumber}
                      </td>
                    )}

                    {visibleColumns.memberPosition && (
                      <td className="px-4 py-3.5 text-gray-700">
                        {j.memberPosition}
                      </td>
                    )}

                    {visibleColumns.inGameName && (
                      <td className="px-4 py-3.5 font-medium text-gray-900">
                        {j.inGameName}
                      </td>
                    )}

                    {visibleColumns.inGameId && (
                      <td className="px-4 py-3.5 text-gray-600 font-mono">
                        {j.inGameId}
                      </td>
                    )}

                    {visibleColumns.actions && (
                      <td className="px-4 py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteJoining(j.contestJoiningId)}
                          className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 font-medium cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-start gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="p-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="p-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
