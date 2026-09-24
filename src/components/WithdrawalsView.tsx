import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Pencil,
  Copy,
  Check,
  X,
} from 'lucide-react';
import { ColumnsDropdown, ColumnItem } from './ColumnsDropdown';
import { RowsPerPageDropdown } from './RowsPerPageDropdown';
import { useNotification } from '../context/NotificationContext';

export interface WithdrawalRequestItem {
  withdrawalRequestId: number;
  userId: number;
  methodName: string;
  methodId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  updatedAt: string;
  createdAt: string;
}

const INITIAL_WITHDRAWALS_DATA: WithdrawalRequestItem[] = [
  {
    withdrawalRequestId: 81,
    userId: 97,
    methodName: 'Upi',
    methodId: 'bbb',
    amount: 70,
    status: 'pending',
    updatedAt: '30/08/2026\n12:01 AM',
    createdAt: '30/08/2026\n12:01 AM',
  },
  {
    withdrawalRequestId: 80,
    userId: 97,
    methodName: 'Upi',
    methodId: 'cccc',
    amount: 60,
    status: 'pending',
    updatedAt: '29/08/2026\n4:14 PM',
    createdAt: '29/08/2026\n4:14 PM',
  },
  {
    withdrawalRequestId: 79,
    userId: 97,
    methodName: 'Upi',
    methodId: 'test@okicici',
    amount: 50,
    status: 'pending',
    updatedAt: '22/08/2026\n1:02 PM',
    createdAt: '22/08/2026\n1:02 PM',
  },
  {
    withdrawalRequestId: 78,
    userId: 97,
    methodName: 'Upi',
    methodId: 'test@okicici',
    amount: 50,
    status: 'pending',
    updatedAt: '21/08/2026\n11:59 PM',
    createdAt: '21/08/2026\n11:59 PM',
  },
  {
    withdrawalRequestId: 77,
    userId: 97,
    methodName: 'Upi',
    methodId: 'test@okicici',
    amount: 50,
    status: 'pending',
    updatedAt: '19/08/2026\n8:22 PM',
    createdAt: '19/08/2026\n8:22 PM',
  },
  {
    withdrawalRequestId: 76,
    userId: 97,
    methodName: 'Upi',
    methodId: 'bbbbbbbbbbbb',
    amount: 50,
    status: 'approved',
    updatedAt: '05/08/2026\n8:53 PM',
    createdAt: '05/08/2026\n8:42 PM',
  },
  {
    withdrawalRequestId: 75,
    userId: 97,
    methodName: 'Upi',
    methodId: 'bbbbbbbbbbbb',
    amount: 100,
    status: 'approved',
    updatedAt: '05/08/2026\n8:51 PM',
    createdAt: '05/08/2026\n8:41 PM',
  },
  {
    withdrawalRequestId: 74,
    userId: 97,
    methodName: 'Upi',
    methodId: 'bbbbbbbbbbbb',
    amount: 50,
    status: 'approved',
    updatedAt: '05/08/2026\n8:53 PM',
    createdAt: '05/08/2026\n8:40 PM',
  },
  {
    withdrawalRequestId: 73,
    userId: 97,
    methodName: 'Upi',
    methodId: '123',
    amount: 50,
    status: 'approved',
    updatedAt: '05/08/2026\n8:22 PM',
    createdAt: '05/08/2026\n8:16 PM',
  },
  {
    withdrawalRequestId: 72,
    userId: 1,
    methodName: 'Upi',
    methodId: 'aa',
    amount: 80,
    status: 'approved',
    updatedAt: '19/04/2026\n11:46 AM',
    createdAt: '19/04/2026\n11:44 AM',
  },
  // Additional items to make total 72 Items
  ...Array.from({ length: 62 }, (_, i) => {
    const id = 71 - i;
    const isApproved = i % 4 !== 3;
    const stat: 'pending' | 'approved' | 'rejected' = isApproved ? 'approved' : 'rejected';
    return {
      withdrawalRequestId: id,
      userId: 90 - (i % 30),
      methodName: 'Upi',
      methodId: `upi_${id}@bank`,
      amount: [50, 100, 150, 200, 500][i % 5],
      status: stat,
      updatedAt: '15/04/2026\n02:30 PM',
      createdAt: '15/04/2026\n02:15 PM',
    };
  }),
];

export const WithdrawalsView: React.FC = () => {
  const { notify } = useNotification();
  const [withdrawals, setWithdrawals] =
    useState<WithdrawalRequestItem[]>(INITIAL_WITHDRAWALS_DATA);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(false); // default descending: 81 -> 72
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Update Withdrawal Modal
  const [updateModal, setUpdateModal] = useState<{
    isOpen: boolean;
    withdrawal: WithdrawalRequestItem | null;
    status: 'approved' | 'rejected';
    txRef: string;
  }>({
    isOpen: false,
    withdrawal: null,
    status: 'approved',
    txRef: '',
  });

  const columnDefs: ColumnItem[] = [
    { key: 'withdrawalRequestId', label: 'withdrawalRequestId' },
    { key: 'userId', label: 'userId' },
    { key: 'methodName', label: 'Method Name' },
    { key: 'methodId', label: 'Method Id' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'updatedAt', label: 'Updated At' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    withdrawalRequestId: true,
    userId: true,
    methodName: true,
    methodId: true,
    amount: true,
    status: true,
    updatedAt: true,
    createdAt: true,
    actions: true,
  });

  const filteredWithdrawals = useMemo(() => {
    let result = [...withdrawals];
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (w) =>
          String(w.withdrawalRequestId).includes(q) ||
          String(w.userId).includes(q) ||
          w.methodId.toLowerCase().includes(q) ||
          w.methodName.toLowerCase().includes(q) ||
          w.status.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) =>
      sortAsc
        ? a.withdrawalRequestId - b.withdrawalRequestId
        : b.withdrawalRequestId - a.withdrawalRequestId
    );
    return result;
  }, [withdrawals, search, sortAsc]);

  const totalPages = Math.ceil(filteredWithdrawals.length / rowsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredWithdrawals.slice(start, start + rowsPerPage);
  }, [filteredWithdrawals, currentPage, rowsPerPage]);

  const handleCopyMethodId = (id: number, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    notify({ message: `Copied "${text}" to clipboard`, type: 'info' });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateModal.withdrawal) return;

    const id = updateModal.withdrawal.withdrawalRequestId;
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()}\n${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    setWithdrawals((prev) =>
      prev.map((w) =>
        w.withdrawalRequestId === id
          ? {
              ...w,
              status: updateModal.status,
              updatedAt: formattedDate,
            }
          : w
      )
    );

    notify({
      message: `Withdrawal #${id} has been marked as ${updateModal.status}`,
      type: updateModal.status === 'approved' ? 'success' : 'info',
    });

    setUpdateModal({
      isOpen: false,
      withdrawal: null,
      status: 'approved',
      txRef: '',
    });
  };

  return (
    <div className="space-y-4">
      {/* Title & Breadcrumbs (Image 9) */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Withdrawal Request
        </h2>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
          <span className="hover:text-gray-700 cursor-pointer">Home</span>
          <span>&gt;</span>
          <span className="hover:text-gray-700 cursor-pointer">Requests</span>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">Withdrawal Request</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        {/* Top Filter Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by userId, Username, First Name, Last Name or Gender"
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
          <div>Total {filteredWithdrawals.length} Items</div>
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
                {visibleColumns.withdrawalRequestId && (
                  <th
                    className="px-4 py-3.5 cursor-pointer select-none"
                    onClick={() => setSortAsc((p) => !p)}
                  >
                    <div className="flex items-center gap-1">
                      <span>withdrawalRequestId</span>
                      {sortAsc ? (
                        <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                      )}
                    </div>
                  </th>
                )}
                {visibleColumns.userId && <th className="px-4 py-3.5">userId</th>}
                {visibleColumns.methodName && <th className="px-4 py-3.5">Method Name</th>}
                {visibleColumns.methodId && <th className="px-4 py-3.5">Method Id</th>}
                {visibleColumns.amount && <th className="px-4 py-3.5">Amount</th>}
                {visibleColumns.status && <th className="px-4 py-3.5">Status</th>}
                {visibleColumns.updatedAt && <th className="px-4 py-3.5">Updated At</th>}
                {visibleColumns.createdAt && <th className="px-4 py-3.5">Created At</th>}
                {visibleColumns.actions && <th className="px-4 py-3.5 text-right">ACTIONS</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {paginatedData.map((w) => (
                <tr key={w.withdrawalRequestId} className="hover:bg-gray-50/70 transition-colors">
                  {visibleColumns.withdrawalRequestId && (
                    <td className="px-4 py-3.5 font-medium text-gray-900">
                      {w.withdrawalRequestId}
                    </td>
                  )}
                  {visibleColumns.userId && (
                    <td className="px-4 py-3.5 font-medium text-gray-900">{w.userId}</td>
                  )}
                  {visibleColumns.methodName && (
                    <td className="px-4 py-3.5 font-medium text-gray-800">{w.methodName}</td>
                  )}
                  {visibleColumns.methodId && (
                    <td className="px-4 py-3.5 font-mono text-[11px] text-gray-700">
                      <div className="inline-flex items-center gap-1.5">
                        <span>{w.methodId}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyMethodId(w.withdrawalRequestId, w.methodId)}
                          title="Copy Method ID"
                          className="p-1 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          {copiedId === w.withdrawalRequestId ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  )}
                  {visibleColumns.amount && (
                    <td className="px-4 py-3.5 font-semibold text-gray-900">{w.amount}</td>
                  )}
                  {visibleColumns.status && (
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-xs font-medium capitalize ${
                          w.status === 'pending'
                            ? 'text-amber-600'
                            : w.status === 'approved'
                            ? 'text-emerald-600 font-semibold'
                            : 'text-gray-500'
                        }`}
                      >
                        {w.status}
                      </span>
                    </td>
                  )}
                  {visibleColumns.updatedAt && (
                    <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px] whitespace-pre-line">
                      {w.updatedAt}
                    </td>
                  )}
                  {visibleColumns.createdAt && (
                    <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px] whitespace-pre-line">
                      {w.createdAt}
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="px-4 py-3.5 text-right">
                      {w.status === 'pending' ? (
                        <button
                          type="button"
                          onClick={() =>
                            setUpdateModal({
                              isOpen: true,
                              withdrawal: w,
                              status: 'approved',
                              txRef: '',
                            })
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium rounded-lg text-xs cursor-pointer transition-colors"
                        >
                          <Pencil className="w-3 h-3" />
                          <span>Update</span>
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs font-normal select-none">
                          Already Updated
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination: < 1 2 3 4 5 ... 8 > */}
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

      {/* UPDATE WITHDRAWAL MODAL */}
      {updateModal.isOpen && updateModal.withdrawal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">
                Update Withdrawal Request #{updateModal.withdrawal.withdrawalRequestId}
              </h3>
              <button
                type="button"
                onClick={() =>
                  setUpdateModal({
                    isOpen: false,
                    withdrawal: null,
                    status: 'approved',
                    txRef: '',
                  })
                }
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveUpdate} className="p-6 space-y-4">
              <div className="bg-gray-50 p-3 rounded-xl space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>User ID:</span>
                  <span className="font-semibold text-gray-900">
                    {updateModal.withdrawal.userId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Method:</span>
                  <span className="font-semibold text-gray-900">
                    {updateModal.withdrawal.methodName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Method ID (UPI/Bank):</span>
                  <span className="font-mono text-gray-900">
                    {updateModal.withdrawal.methodId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-bold text-gray-900">
                    ₹{updateModal.withdrawal.amount}
                  </span>
                </div>
              </div>

              {/* Status Select */}
              <div className="border border-gray-900 rounded-xl p-3">
                <label className="block text-[11px] text-gray-500 mb-1">
                  Change Status
                </label>
                <select
                  value={updateModal.status}
                  onChange={(e) =>
                    setUpdateModal((prev) => ({
                      ...prev,
                      status: e.target.value as 'approved' | 'rejected',
                    }))
                  }
                  className="w-full text-xs font-semibold text-gray-900 outline-none bg-transparent cursor-pointer"
                >
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Transaction Reference / Note */}
              <div className="border border-gray-300 rounded-xl p-3 focus-within:border-blue-500">
                <label className="block text-[11px] text-gray-500 mb-0.5">
                  Transaction Reference / UTR
                </label>
                <input
                  type="text"
                  value={updateModal.txRef}
                  onChange={(e) =>
                    setUpdateModal((prev) => ({ ...prev, txRef: e.target.value }))
                  }
                  placeholder="e.g. UTR1234567890"
                  className="w-full text-xs text-gray-800 outline-none bg-transparent"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setUpdateModal({
                      isOpen: false,
                      withdrawal: null,
                      status: 'approved',
                      txRef: '',
                    })
                  }
                  className="px-6 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer bg-[#fce4ec] text-[#e91e63] hover:bg-[#f8bbd0]"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer bg-[#00c853] text-white hover:bg-[#00b248]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
