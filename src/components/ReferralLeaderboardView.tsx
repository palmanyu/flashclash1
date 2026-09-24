import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { RowsPerPageDropdown } from './RowsPerPageDropdown';

export interface ReferralRecord {
  rank: number;
  userName: string;
  userId: number;
  referralCount: number;
  referralEarnings: number;
  referredBy: number;
}

const INITIAL_REFERRALS: ReferralRecord[] = [
  {
    rank: 1,
    userName: 'sanjana Khatoon',
    userId: 91,
    referralCount: 2,
    referralEarnings: 0,
    referredBy: 91,
  },
  {
    rank: 2,
    userName: 'Dhruv Gogiya',
    userId: 19,
    referralCount: 1,
    referralEarnings: 0,
    referredBy: 19,
  },
  {
    rank: 3,
    userName: 'Reshmi Khatoon',
    userId: 90,
    referralCount: 1,
    referralEarnings: 0,
    referredBy: 90,
  },
];

export const ReferralLeaderboardView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(false); // default descending referral count
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...INITIAL_REFERRALS];
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.userName.toLowerCase().includes(q) ||
          String(r.userId).includes(q) ||
          String(r.referredBy).includes(q)
      );
    }
    result.sort((a, b) =>
      sortAsc
        ? a.referralCount - b.referralCount
        : b.referralCount - a.referralCount
    );
    return result;
  }, [search, sortAsc]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, currentPage, rowsPerPage]);

  return (
    <div className="space-y-4">
      {/* Title (Image 9) */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Referral Leaderboard
        </h2>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        {/* Top Search & Rows per page Bar (Image 9) */}
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by username or user ID"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-gray-500 font-medium">
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

        {/* Table (Image 9) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 text-gray-600 font-semibold border-y border-gray-200">
              <tr>
                <th className="px-5 py-3 w-20">Rank</th>
                <th className="px-5 py-3">User</th>
                <th
                  className="px-5 py-3 cursor-pointer select-none"
                  onClick={() => setSortAsc((p) => !p)}
                >
                  <div className="flex items-center gap-1">
                    <span>Referral Count</span>
                    {sortAsc ? (
                      <ChevronUp className="w-3.5 h-3.5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                    )}
                  </div>
                </th>
                <th className="px-5 py-3">Referral Earnings</th>
                <th className="px-5 py-3">Referred By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {paginatedData.map((item) => (
                <tr
                  key={item.userId}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {item.rank}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-gray-900">
                      {item.userName}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      User ID: {item.userId}
                    </div>
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-800">
                    {item.referralCount}
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-800">
                    {item.referralEarnings}
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-800">
                    {item.referredBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer (Image 9): "{count} records" */}
        <div className="px-5 py-3.5 bg-gray-50/50 border-t border-gray-100 text-xs text-gray-500 font-medium">
          {filtered.length} records
        </div>
      </div>
    </div>
  );
};
