import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ColumnsDropdown, ColumnItem } from './ColumnsDropdown';
import { RowsPerPageDropdown } from './RowsPerPageDropdown';
import { useNotification } from '../context/NotificationContext';
import { AdminView } from '../types';

export interface DepositRequestItem {
  depositRequestId: number;
  pgName: string;
  userId: number;
  amount: number;
  proofImage: string;
  fileStoreId: string;
  status: 'pending' | 'approved' | 'rejected';
  updatedAt: string;
  createdAt: string;
}

const INITIAL_DEPOSITS_DATA: DepositRequestItem[] = [
  {
    depositRequestId: 221,
    pgName: 'tranzupi',
    userId: 99,
    amount: 50,
    proofImage: 'Proof File Not Available',
    fileStoreId: 'Null',
    status: 'pending',
    updatedAt: 'Null',
    createdAt: '07/09/2026\n10:51 PM',
  },
  {
    depositRequestId: 220,
    pgName: 'tranzupi',
    userId: 99,
    amount: 50,
    proofImage: 'Proof File Not Available',
    fileStoreId: 'Null',
    status: 'pending',
    updatedAt: 'Null',
    createdAt: '07/09/2026\n10:51 PM',
  },
  {
    depositRequestId: 219,
    pgName: 'tranzupi',
    userId: 98,
    amount: 50,
    proofImage: 'Proof File Not Available',
    fileStoreId: 'Null',
    status: 'pending',
    updatedAt: 'Null',
    createdAt: '31/08/2026\n11:12 PM',
  },
  {
    depositRequestId: 218,
    pgName: 'tranzupi',
    userId: 97,
    amount: 1,
    proofImage: 'Proof File Not Available',
    fileStoreId: 'Null',
    status: 'pending',
    updatedAt: 'Null',
    createdAt: '30/08/2026\n12:01 AM',
  },
  {
    depositRequestId: 217,
    pgName: 'zapupi',
    userId: 97,
    amount: 1,
    proofImage: 'Proof File Not Available',
    fileStoreId: 'Null',
    status: 'pending',
    updatedAt: 'Null',
    createdAt: '30/08/2026\n12:00 AM',
  },
  {
    depositRequestId: 216,
    pgName: 'zapupi',
    userId: 97,
    amount: 1,
    proofImage: 'Proof File Not Available',
    fileStoreId: 'Null',
    status: 'pending',
    updatedAt: 'Null',
    createdAt: '30/08/2026\n12:00 AM',
  },
  {
    depositRequestId: 215,
    pgName: 'manual_upi',
    userId: 97,
    amount: 20,
    proofImage: 'Proof File Not Available',
    fileStoreId: 'Null',
    status: 'rejected',
    updatedAt: 'Null',
    createdAt: '29/08/2026\n5:17 PM',
  },
  {
    depositRequestId: 214,
    pgName: 'manual_upi',
    userId: 97,
    amount: 20,
    proofImage: 'Proof File Not Available',
    fileStoreId: 'Null',
    status: 'rejected',
    updatedAt: 'Null',
    createdAt: '29/08/2026\n5:07 PM',
  },
  {
    depositRequestId: 213,
    pgName: 'manual_upi',
    userId: 97,
    amount: 1,
    proofImage: 'Proof File Not Available',
    fileStoreId: 'Null',
    status: 'rejected',
    updatedAt: 'Null',
    createdAt: '29/08/2026\n5:02 PM',
  },
  {
    depositRequestId: 212,
    pgName: 'manual_upi',
    userId: 97,
    amount: 1,
    proofImage: 'Proof File Not Available',
    fileStoreId: 'Null',
    status: 'rejected',
    updatedAt: 'Null',
    createdAt: '29/08/2026\n5:02 PM',
  },
  // Additional items to make total 101 Items
  ...Array.from({ length: 91 }, (_, i) => {
    const id = 211 - i;
    const isApproved = i % 3 === 0;
    const isRejected = i % 3 === 1;
    const stat: 'pending' | 'approved' | 'rejected' = isApproved
      ? 'approved'
      : isRejected
      ? 'rejected'
      : 'pending';
    return {
      depositRequestId: id,
      pgName: i % 2 === 0 ? 'tranzupi' : 'manual_upi',
      userId: 95 - (i % 20),
      amount: [10, 50, 100, 200, 500][i % 5],
      proofImage: 'Proof File Not Available',
      fileStoreId: 'Null',
      status: stat,
      updatedAt: stat !== 'pending' ? '25/08/2026\n11:30 AM' : 'Null',
      createdAt: '25/08/2026\n10:00 AM',
    };
  }),
];

interface DepositsViewProps {
  onNavigate?: (view: AdminView) => void;
}

export const DepositsView: React.FC<DepositsViewProps> = ({ onNavigate }) => {
  const { notify } = useNotification();
  const [deposits, setDeposits] = useState<DepositRequestItem[]>(INITIAL_DEPOSITS_DATA);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(false); // default descending matching 221 -> 212
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const columnDefs: ColumnItem[] = [
    { key: 'depositRequestId', label: 'depositRequestId' },
    { key: 'pgName', label: 'pgName' },
    { key: 'userId', label: 'userId' },
    { key: 'amount', label: 'Amount' },
    { key: 'proofImage', label: 'Proof Image' },
    { key: 'fileStoreId', label: 'FileStoreId' },
    { key: 'status', label: 'Status' },
    { key: 'updatedAt', label: 'Updated At' },
    { key: 'createdAt', label: 'Created At' },
  ];

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    depositRequestId: true,
    pgName: true,
    userId: true,
    amount: true,
    proofImage: true,
    fileStoreId: true,
    status: true,
    updatedAt: true,
    createdAt: true,
  });

  const filteredDeposits = useMemo(() => {
    let result = [...deposits];
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (d) =>
          String(d.depositRequestId).includes(q) ||
          String(d.userId).includes(q) ||
          d.pgName.toLowerCase().includes(q) ||
          d.status.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) =>
      sortAsc
        ? a.depositRequestId - b.depositRequestId
        : b.depositRequestId - a.depositRequestId
    );
    return result;
  }, [deposits, search, sortAsc]);

  const totalPages = Math.ceil(filteredDeposits.length / rowsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredDeposits.slice(start, start + rowsPerPage);
  }, [filteredDeposits, currentPage, rowsPerPage]);

  return (
    <div className="space-y-4">
      {/* Title & Breadcrumbs (Image 8) */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Deposit Request</h2>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
          <span
            className="hover:text-gray-700 cursor-pointer"
            onClick={() => onNavigate?.('dashboard')}
          >
            Home
          </span>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">Deposit Request</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        {/* Top Filter Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by Staff Id , Staff Name"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <ColumnsDropdown
              columns={columnDefs}
              visibleColumns={visibleColumns}
              onToggleColumn={(key) =>
                setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }))
              }
            />
          </div>
        </div>

        {/* Sub-bar: Total Items & Rows per page */}
        <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
          <div>Total {filteredDeposits.length} Items</div>
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
                {visibleColumns.depositRequestId && (
                  <th
                    className="px-4 py-3.5 cursor-pointer select-none"
                    onClick={() => setSortAsc((p) => !p)}
                  >
                    <div className="flex items-center gap-1">
                      <span>depositRequestId</span>
                      {sortAsc ? (
                        <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                      )}
                    </div>
                  </th>
                )}
                {visibleColumns.pgName && <th className="px-4 py-3.5">pgName</th>}
                {visibleColumns.userId && <th className="px-4 py-3.5">userId</th>}
                {visibleColumns.amount && <th className="px-4 py-3.5">Amount</th>}
                {visibleColumns.proofImage && <th className="px-4 py-3.5">Proof Image</th>}
                {visibleColumns.fileStoreId && <th className="px-4 py-3.5">FileStoreId</th>}
                {visibleColumns.status && <th className="px-4 py-3.5">Status</th>}
                {visibleColumns.updatedAt && <th className="px-4 py-3.5">Updated At</th>}
                {visibleColumns.createdAt && <th className="px-4 py-3.5">Created At</th>}
                {visibleColumns.actions && <th className="px-4 py-3.5 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {paginatedData.map((d) => (
                <tr key={d.depositRequestId} className="hover:bg-gray-50/70 transition-colors">
                  {visibleColumns.depositRequestId && (
                    <td className="px-4 py-3.5 font-medium text-gray-900">
                      {d.depositRequestId}
                    </td>
                  )}
                  {visibleColumns.pgName && (
                    <td className="px-4 py-3.5 font-medium text-gray-700">{d.pgName}</td>
                  )}
                  {visibleColumns.userId && (
                    <td className="px-4 py-3.5 font-medium text-gray-900">{d.userId}</td>
                  )}
                  {visibleColumns.amount && (
                    <td className="px-4 py-3.5 font-semibold text-gray-900">{d.amount}</td>
                  )}
                  {visibleColumns.proofImage && (
                    <td className="px-4 py-3.5 text-gray-500 text-[11px]">
                      {d.proofImage}
                    </td>
                  )}
                  {visibleColumns.fileStoreId && (
                    <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px]">
                      {d.fileStoreId}
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-xs font-medium capitalize ${
                          d.status === 'pending'
                            ? 'text-amber-600'
                            : d.status === 'approved'
                            ? 'text-emerald-600 font-semibold'
                            : 'text-gray-500'
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                  )}
                  {visibleColumns.updatedAt && (
                    <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px] whitespace-pre-line">
                      {d.updatedAt}
                    </td>
                  )}
                  {visibleColumns.createdAt && (
                    <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px] whitespace-pre-line">
                      {d.createdAt}
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="px-4 py-3.5 text-right">
                      <span className="text-gray-400 text-xs font-normal select-none">
                        View Only
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination: < 1 2 3 4 5 ... 11 > */}
        <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-start gap-1.5">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="p-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setCurrentPage(pageNumber)}
              className={`w-7 h-7 rounded-md text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                currentPage === pageNumber
                  ? 'bg-black text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {pageNumber}
            </button>
          ))}

          {totalPages > 5 && (
            <>
              <span className="text-gray-400 text-xs px-1 select-none">...</span>
              <button
                type="button"
                onClick={() => setCurrentPage(totalPages)}
                className={`w-7 h-7 rounded-md text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                  currentPage === totalPages
                    ? 'bg-black text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

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
