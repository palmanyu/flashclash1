import React, { useState } from 'react';
import {
  Search,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
  Copy,
  Check,
  ExternalLink,
  Save,
  CheckCircle,
  HelpCircle,
  Share2,
  Wallet,
  ArrowLeft,
} from 'lucide-react';
import { AdminView } from '../types';
import { ColumnsDropdown, ColumnItem } from './ColumnsDropdown';
import { useNotification } from '../context/NotificationContext';
import { RowsPerPageDropdown } from './RowsPerPageDropdown';
import { PaginationBar } from './PaginationBar';

interface SettingsViewsProps {
  onNavigate?: (view: AdminView) => void;
}

// =========================================================================
// 1. Support Methods View (Images 1, 2, 4, 9)
// =========================================================================
export interface SupportMethodRecord {
  id: number;
  methodName: string;
  methodId: string;
  icon: string;
  onClickLink: string;
  createdAt: string;
}

export const SupportSettingsView: React.FC<SettingsViewsProps> = () => {
  const { notify } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [activePage, setActivePage] = useState<number>(1);

  // Initial methods matching Image 9
  const [methods, setMethods] = useState<SupportMethodRecord[]>([
    {
      id: 2,
      methodName: "What's app",
      methodId: '011',
      icon: 'whatsapp',
      onClickLink: 'https://wa.me/918811024662',
      createdAt: '03/12/2024 3:55 PM',
    },
  ]);

  // Column visibility state (Image 9)
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    supportMethodId: true,
    methodName: true,
    methodId: true,
    icon: true,
    onClickLink: true,
    createdAt: true,
    actions: true,
  });

  const supportColumns: ColumnItem[] = [
    { key: 'supportMethodId', label: 'supportMethodId' },
    { key: 'methodName', label: 'Method Name' },
    { key: 'methodId', label: 'Method Id' },
    { key: 'icon', label: 'Icon' },
    { key: 'onClickLink', label: 'On Click Link' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  const toggleColumn = (key: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<SupportMethodRecord | null>(null);

  // Add form fields (Image 4)
  const [newMethodName, setNewMethodName] = useState('');
  const [newMethodId, setNewMethodId] = useState('');
  const [newIcon, setNewIcon] = useState('whatsapp');
  const [setOnClickLink, setSetOnClickLink] = useState(true);
  const [newLink, setNewLink] = useState('https://wa.me/918811024662');

  const handleCreateMethod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMethodName.trim() || !newMethodId.trim()) return;

    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()} ${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    const newRecord: SupportMethodRecord = {
      id: methods.length > 0 ? Math.max(...methods.map((m) => m.id)) + 1 : 1,
      methodName: newMethodName.trim(),
      methodId: newMethodId.trim(),
      icon: newIcon,
      onClickLink: setOnClickLink ? newLink.trim() : '',
      createdAt: formatted,
    };

    setMethods([...methods, newRecord]);
    setShowAddModal(false);
    const createdName = newMethodName.trim();
    setNewMethodName('');
    setNewMethodId('');
    setNewLink('');
    notify({
      type: 'success',
      title: 'Action Done',
      message: `Support method "${createdName}" added successfully.`,
    });
  };

  const handleDeleteMethod = () => {
    if (!deleteTarget) return;
    const deletedName = deleteTarget.methodName;
    setMethods(methods.filter((m) => m.id !== deleteTarget.id));
    setDeleteTarget(null);
    notify({
      type: 'success',
      title: 'Action Done',
      message: `Support method "${deletedName}" deleted successfully.`,
    });
  };

  const filteredMethods = methods.filter(
    (m) =>
      m.methodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.methodId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.onClickLink.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(m.id).includes(searchTerm)
  );

  const totalMethods = filteredMethods.length;
  const totalMethodPages = Math.max(1, Math.ceil(totalMethods / rowsPerPage));
  const paginatedMethods = filteredMethods.slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );

  return (
    <div className="space-y-4">
      {/* Header & Breadcrumb (Image 9: Support Methods / Home > Settings > Support Methods) */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0e3a6a] tracking-tight">
          Support Methods
        </h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
          <span>Home</span>
          <span>&gt;</span>
          <span>Settings</span>
          <span>&gt;</span>
          <span className="text-slate-500 font-medium">Support Methods</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 p-5 sm:p-6">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by supportMethodId, Method Name or Method Id"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setActivePage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2.5 justify-end">
            <ColumnsDropdown
              columns={supportColumns}
              visibleColumns={visibleColumns}
              onToggleColumn={toggleColumn}
            />

            {/* Add New + Button matching Image 9 */}
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-black hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <span>Add New</span>
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Sub-bar: Total items and Rows per page */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3 border-b border-slate-100 pb-2">
          <span>Total {totalMethods} items</span>
          <RowsPerPageDropdown
            value={rowsPerPage}
            onChange={(val) => {
              setRowsPerPage(val);
              setActivePage(1);
            }}
          />
        </div>

        {/* Table matching Image 9 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-600">
                {visibleColumns.supportMethodId && (
                  <th className="py-3 px-3">
                    <div className="flex items-center gap-1">
                      <span>supportMethodId</span>
                      <ChevronUp className="w-3.5 h-3.5 text-slate-500 stroke-[2.5]" />
                    </div>
                  </th>
                )}
                {visibleColumns.methodName && <th className="py-3 px-3">Method Name</th>}
                {visibleColumns.methodId && <th className="py-3 px-3">Method Id</th>}
                {visibleColumns.icon && <th className="py-3 px-3">Icon</th>}
                {visibleColumns.onClickLink && <th className="py-3 px-3">On Click Link</th>}
                {visibleColumns.createdAt && <th className="py-3 px-3">Created At</th>}
                {visibleColumns.actions && <th className="py-3 px-3 text-right">ACTIONS</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {paginatedMethods.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    No support methods found
                  </td>
                </tr>
              ) : (
                paginatedMethods.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/60 transition-colors">
                    {visibleColumns.supportMethodId && (
                      <td className="py-3.5 px-3 font-medium text-slate-800">{m.id}</td>
                    )}
                    {visibleColumns.methodName && (
                      <td className="py-3.5 px-3 font-normal text-slate-800">{m.methodName}</td>
                    )}
                    {visibleColumns.methodId && (
                      <td className="py-3.5 px-3 font-normal text-slate-800">{m.methodId}</td>
                    )}
                    {visibleColumns.icon && (
                      <td className="py-3.5 px-3 font-normal text-slate-800">{m.icon}</td>
                    )}
                    {visibleColumns.onClickLink && (
                      <td className="py-3.5 px-3 font-normal text-slate-800 break-all">
                        {m.onClickLink || '--'}
                      </td>
                    )}
                    {visibleColumns.createdAt && (
                      <td className="py-3.5 px-3 font-normal text-slate-800">{m.createdAt}</td>
                    )}
                    {visibleColumns.actions && (
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => setDeleteTarget(m)}
                          className="text-[#f43f5e] hover:text-red-700 text-xs font-medium flex items-center gap-1 px-1.5 py-1 rounded transition-colors ml-auto cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[2]" />
                          <span>Delete</span>
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
        <PaginationBar
          currentPage={activePage}
          totalPages={totalMethodPages}
          totalItems={totalMethods}
          rowsPerPage={rowsPerPage}
          onPageChange={setActivePage}
        />
      </div>

      {/* MODAL: Add New Support Method (Image 4 Replica) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Add New Support Method
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateMethod} className="space-y-3.5 text-xs sm:text-sm">
              {/* Method Name */}
              <div className="rounded-xl border border-slate-200 px-3.5 py-2 focus-within:border-blue-500 transition-colors">
                <label className="block text-[11px] font-medium text-slate-500 mb-0.5">
                  Method Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Method Name here"
                  value={newMethodName}
                  onChange={(e) => setNewMethodName(e.target.value)}
                  className="w-full text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                  required
                  autoFocus
                />
              </div>

              {/* methodId */}
              <div className="rounded-xl border border-slate-200 px-3.5 py-2 focus-within:border-blue-500 transition-colors">
                <label className="block text-[11px] font-medium text-slate-500 mb-0.5">
                  methodId
                </label>
                <input
                  type="text"
                  placeholder="Enter methodId here"
                  value={newMethodId}
                  onChange={(e) => setNewMethodId(e.target.value)}
                  className="w-full text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                  required
                />
              </div>

              {/* Select Icon Name */}
              <div className="rounded-xl border border-slate-200 px-3.5 py-2 focus-within:border-blue-500 transition-colors">
                <label className="block text-[11px] font-medium text-slate-500 mb-0.5">
                  Select Icon Name
                </label>
                <select
                  value={newIcon}
                  onChange={(e) => setNewIcon(e.target.value)}
                  className="w-full text-slate-800 focus:outline-none bg-transparent cursor-pointer"
                >
                  <option value="whatsapp">whatsapp</option>
                  <option value="telegram">telegram</option>
                  <option value="email">email</option>
                  <option value="phone">phone</option>
                  <option value="instagram">instagram</option>
                  <option value="discord">discord</option>
                  <option value="youtube">youtube</option>
                </select>
              </div>

              {/* Set On Click Link Toggle */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setSetOnClickLink(!setOnClickLink)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    setOnClickLink ? 'bg-slate-300' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      setOnClickLink ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-xs text-slate-700 font-medium">
                  Set On Click Link
                </span>
              </div>

              {/* Conditional link input if toggle enabled */}
              {setOnClickLink && (
                <div className="rounded-xl border border-slate-200 px-3.5 py-2 focus-within:border-blue-500 transition-colors">
                  <label className="block text-[11px] font-medium text-slate-500 mb-0.5">
                    On Click Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://wa.me/..."
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    className="w-full text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                    required
                  />
                </div>
              )}

              {/* Action buttons: Close (pink) and Submit (green) matching Image 4 */}
              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 rounded-xl bg-[#fed7e2] hover:bg-[#fbcfe8] text-[#db2777] font-semibold text-xs sm:text-sm cursor-pointer transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#00c950] hover:bg-[#00b045] text-white font-semibold text-xs sm:text-sm cursor-pointer transition-colors shadow-xs"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Delete Support Method (Image 2 Replica) */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Delete Support Method
              </h3>
              <button
                onClick={() => setDeleteTarget(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-2 text-xs sm:text-sm space-y-1">
              <p className="text-slate-800 font-normal">
                Are you Sure for Delete Following ?
              </p>
              <p className="text-slate-800 font-normal">
                Support Method Id : {deleteTarget.methodId || deleteTarget.id}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2 rounded-lg bg-[#e2e8f0] hover:bg-slate-300 text-slate-700 font-medium text-xs sm:text-sm cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteMethod}
                className="px-5 py-2 rounded-lg bg-[#e11d48] hover:bg-red-700 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 2. Refer and Earn Settings View (Image 3)
// =========================================================================
export const ReferAndEarnSettingsView: React.FC<SettingsViewsProps> = () => {
  const { notify } = useNotification();
  const [referRewardWallet, setReferRewardWallet] = useState('depositWallet');
  const [registerBonusWallet, setRegisterBonusWallet] = useState('depositWallet');
  const [referRewardAmount, setReferRewardAmount] = useState('0');
  const [registerBonusAmount, setRegisterBonusAmount] = useState('0');
  const [minimumMatchFees, setMinimumMatchFees] = useState('0');
  const [shareDescription, setShareDescription] = useState('5445');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    notify({
      type: 'success',
      title: 'Action Done',
      message: 'Refer and Earn settings saved successfully.',
    });
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleCancel = () => {
    setReferRewardWallet('depositWallet');
    setRegisterBonusWallet('depositWallet');
    setReferRewardAmount('0');
    setRegisterBonusAmount('0');
    setMinimumMatchFees('0');
    setShareDescription('5445');
  };

  return (
    <div className="space-y-4">
      {/* Header & Breadcrumb (Image 3: Settings / Home > Settings > Refer and Earn) */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0e3a6a] tracking-tight">
          Settings
        </h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
          <span>Home</span>
          <span>&gt;</span>
          <span>Settings</span>
          <span>&gt;</span>
          <span className="text-slate-500 font-medium">Refer and Earn</span>
        </div>
      </div>

      {/* Main Settings Card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Refer Reward Wallet & Register Bonus Wallet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Refer Reward Wallet
              </label>
              <div className="rounded-xl border border-slate-200 px-3.5 py-2 focus-within:border-blue-500 transition-colors">
                <span className="block text-[11px] text-slate-400">Select Wallet Type</span>
                <select
                  value={referRewardWallet}
                  onChange={(e) => setReferRewardWallet(e.target.value)}
                  className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none bg-transparent cursor-pointer"
                >
                  <option value="depositWallet">depositWallet</option>
                  <option value="winningWallet">winningWallet</option>
                  <option value="bonusWallet">bonusWallet</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Register Bonus Wallet
              </label>
              <div className="rounded-xl border border-slate-200 px-3.5 py-2 focus-within:border-blue-500 transition-colors">
                <span className="block text-[11px] text-slate-400">Select Wallet Type</span>
                <select
                  value={registerBonusWallet}
                  onChange={(e) => setRegisterBonusWallet(e.target.value)}
                  className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none bg-transparent cursor-pointer"
                >
                  <option value="depositWallet">depositWallet</option>
                  <option value="winningWallet">winningWallet</option>
                  <option value="bonusWallet">bonusWallet</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 2: Refer Reward Amount, Register Bonus Amount, Minimum Match Fees */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Refer Reward Amount
              </label>
              <input
                type="number"
                value={referRewardAmount}
                onChange={(e) => setReferRewardAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Register Bonus Amount
              </label>
              <input
                type="number"
                value={registerBonusAmount}
                onChange={(e) => setRegisterBonusAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Minimum Match Fees
              </label>
              <input
                type="number"
                value={minimumMatchFees}
                onChange={(e) => setMinimumMatchFees(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Row 3: Share Description (Android Only) */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Share Description (Android Only)
            </label>
            <input
              type="text"
              value={shareDescription}
              onChange={(e) => setShareDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Divider & Available Variables note */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              available variables:&#123;&#123; referral_code &#125;&#125; , &#123;&#123;app_name&#125;&#125; ,&#123;&#123;web_app_link&#125;&#125; ,&#123;&#123;website_link&#125;&#125;
            </p>
          </div>

          {/* Buttons matching Image 3: Submit (green) & Cancel (pink/magenta) */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[#00c950] hover:bg-[#00b045] text-white font-semibold text-xs sm:text-sm cursor-pointer transition-colors shadow-xs"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 rounded-xl bg-[#e11d48] hover:bg-[#be123c] text-white font-semibold text-xs sm:text-sm cursor-pointer transition-colors shadow-xs"
            >
              Cancel
            </button>

            {savedSuccess && (
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>Settings updated successfully</span>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// =========================================================================
// 3. User Wallet Settings View (Image 5)
// =========================================================================
export const UserWalletSettingsView: React.FC<SettingsViewsProps> = ({ onNavigate }) => {
  const { notify } = useNotification();
  const [minDeposit, setMinDeposit] = useState('1');
  const [maxDeposit, setMaxDeposit] = useState('10000');
  const [minWithdrawal, setMinWithdrawal] = useState('50');
  const [maxWithdrawal, setMaxWithdrawal] = useState('10000');
  const [updatedSuccess, setUpdatedSuccess] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatedSuccess(true);
    notify({
      type: 'success',
      title: 'Action Done',
      message: 'User wallet settings updated successfully.',
    });
    setTimeout(() => setUpdatedSuccess(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header & Breadcrumb (Image 5: Add New Contest of / Home > Settings > User Wallet) */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0e3a6a] tracking-tight">
          Add New Contest of
        </h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
          <span>Home</span>
          <span>&gt;</span>
          <span>Settings</span>
          <span>&gt;</span>
          <span className="text-slate-500 font-medium">User Wallet</span>
        </div>
      </div>

      {/* Card with Update Wallet Settings */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 p-6 sm:p-10">
        <form onSubmit={handleUpdate} className="space-y-8">
          {/* Centered Heading */}
          <h2 className="text-base sm:text-lg font-bold text-slate-900 text-center">
            Update Wallet Settings
          </h2>

          {/* Row 1: Minimum Deposit & Maximum Deposit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1.5 border-b border-slate-100 pb-2">
              <label className="block text-xs font-semibold text-slate-800">
                Minimum Deposit
              </label>
              <input
                type="number"
                value={minDeposit}
                onChange={(e) => setMinDeposit(e.target.value)}
                className="w-full py-1 text-xs sm:text-sm text-slate-800 focus:outline-none bg-transparent"
              />
            </div>

            <div className="space-y-1.5 border-b border-slate-100 pb-2">
              <label className="block text-xs font-semibold text-slate-800">
                Maximum Deposit
              </label>
              <input
                type="number"
                value={maxDeposit}
                onChange={(e) => setMaxDeposit(e.target.value)}
                className="w-full py-1 text-xs sm:text-sm text-slate-800 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Row 2: Minimum Withdrawal & Maximum Withdrawal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1.5 border-b border-slate-100 pb-2">
              <label className="block text-xs font-semibold text-slate-800">
                Minimum Withdrawal
              </label>
              <input
                type="number"
                value={minWithdrawal}
                onChange={(e) => setMinWithdrawal(e.target.value)}
                className="w-full py-1 text-xs sm:text-sm text-slate-800 focus:outline-none bg-transparent"
              />
            </div>

            <div className="space-y-1.5 border-b border-slate-100 pb-2">
              <label className="block text-xs font-semibold text-slate-800">
                Maximum Withdrawal
              </label>
              <input
                type="number"
                value={maxWithdrawal}
                onChange={(e) => setMaxWithdrawal(e.target.value)}
                className="w-full py-1 text-xs sm:text-sm text-slate-800 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* update button (centered, green) */}
          <div className="flex flex-col items-center justify-center pt-2">
            <button
              type="submit"
              className="px-8 py-2 rounded-xl bg-[#00c950] hover:bg-[#00b045] text-white font-medium text-xs sm:text-sm cursor-pointer transition-colors shadow-xs"
            >
              update
            </button>
            {updatedSuccess && (
              <span className="text-xs text-emerald-600 font-medium mt-2">
                Settings updated successfully!
              </span>
            )}
          </div>

          {/* Bottom Nav Action Buttons: Payment Gateways & Withdrawal Methods */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onNavigate?.('settings-payment-gateway')}
              className="px-5 py-2.5 rounded-xl bg-[#1d6bf3] hover:bg-blue-600 text-white text-xs font-medium cursor-pointer transition-colors shadow-xs"
            >
              Payment Gateways
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('settings-withdrawal-methods')}
              className="px-5 py-2.5 rounded-xl bg-[#1d6bf3] hover:bg-blue-600 text-white text-xs font-medium cursor-pointer transition-colors shadow-xs"
            >
              Withdrawal Methods
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =========================================================================
// 4. Payment Gateway View (Images 6 & 7)
// =========================================================================
export const PaymentGatewayView: React.FC<SettingsViewsProps> = ({ onNavigate }) => {
  const { notify } = useNotification();
  const [upiId, setUpiId] = useState('7351854089@pthdfc');
  const [upiActive, setUpiActive] = useState(true);
  const [upiSaved, setUpiSaved] = useState(false);

  const [apiKey, setApiKey] = useState('af6fee52cbc41a44120b5f830a615406');
  const [webhookUrl] = useState(
    'https://s2-api.digicroz.com/rest/gamex/webApp/webhook/tranzupi'
  );
  const [copiedWebhook, setCopiedWebhook] = useState(false);
  const [tranzupiSaved, setTranzupiSaved] = useState(false);

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopiedWebhook(true);
    setTimeout(() => setCopiedWebhook(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Breadcrumb (Image 6: Payment Gateway / Home > Settings > User Wallets > Payment Gateway) */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0e3a6a] tracking-tight">
            Payment Gateway
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
            <span>Home</span>
            <span>&gt;</span>
            <span>Settings</span>
            <span>&gt;</span>
            <button
              onClick={() => onNavigate?.('settings-user-wallet')}
              className="hover:text-slate-600 cursor-pointer"
            >
              User Wallets
            </button>
            <span>&gt;</span>
            <span className="text-slate-500 font-medium">Payment Gateway</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate?.('settings-user-wallet')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Wallet</span>
        </button>
      </div>

      {/* CARD 1: Manual UPI PG (Image 6) */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 p-6 sm:p-8">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 text-center mb-6">
          Manual UPI PG
        </h2>

        <div className="max-w-2xl mx-auto space-y-5">
          <div className="rounded-xl border border-slate-200 px-4 py-2.5 focus-within:border-blue-500 transition-colors">
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
              UPI ID
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setUpiActive(!upiActive)}
              className={`px-5 py-2 rounded-xl text-white font-medium text-xs sm:text-sm cursor-pointer transition-colors shadow-xs ${
                upiActive ? 'bg-[#1d6bf3] hover:bg-blue-600' : 'bg-slate-400 hover:bg-slate-500'
              }`}
            >
              {upiActive ? 'Make Active' : 'Activate UPI'}
            </button>

            <button
              type="button"
              onClick={() => {
                setUpiSaved(true);
                notify({
                  type: 'success',
                  title: 'Action Done',
                  message: 'Manual UPI gateway settings updated successfully.',
                });
                setTimeout(() => setUpiSaved(false), 2000);
              }}
              className="px-6 py-2 rounded-xl bg-[#00c950] hover:bg-[#00b045] text-white font-medium text-xs sm:text-sm cursor-pointer transition-colors shadow-xs"
            >
              Update
            </button>
          </div>

          {upiSaved && (
            <p className="text-xs text-center text-emerald-600 font-medium">
              Manual UPI updated successfully
            </p>
          )}
        </div>
      </div>

      {/* CARD 2: Tranzupi Payment Gateway (Images 6 & 7) */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 p-6 sm:p-8 space-y-6">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 text-center">
          Tranzupi Payment Gateway
        </h2>

        {/* Third-Party Gateway Provider Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Third-Party Gateway Provider
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              This payment gateway is provided by{' '}
              <a
                href="https://tranzupi.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold underline"
              >
                Tranzupi
              </a>
              . You need to create an account on Tranzupi to get started.
            </p>
          </div>

          <a
            href="https://tranzupi.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-[#bfdbfe] hover:bg-blue-200 text-blue-900 font-medium text-xs cursor-pointer transition-colors shrink-0"
          >
            Visit Tranzupi Website
          </a>
        </div>

        {/* Blue Important Notes Callout Box */}
        <div className="bg-[#eff6ff] border border-[#dbeafe] rounded-2xl p-5 space-y-3">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
            Important Notes:
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
            <li>Create an account on Tranzupi website first</li>
            <li>Get your API key from Tranzupi dashboard</li>
            <li>Configure the webhook URL in your Tranzupi dashboard</li>
            <li>For any issues, contact Tranzupi support directly</li>
          </ul>
          <p className="text-xs text-slate-500 pt-2 border-t border-blue-100">
            Note: TourneyFarm support team cannot assist with issues related to this payment gateway. All queries must be directed to Tranzupi support.
          </p>
        </div>

        {/* API Key Input (Image 7) */}
        <div>
          <label className="block text-xs font-semibold text-slate-800 mb-1">
            API Key
          </label>
          <div className="rounded-xl border border-slate-200 px-3.5 py-2.5 focus-within:border-blue-500 transition-colors">
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none bg-transparent"
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Need an API key?{' '}
            <a
              href="https://tranzupi.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 font-medium hover:underline"
            >
              Get it from Tranzupi
            </a>
          </p>
        </div>

        {/* Webhook Configuration (Image 7) */}
        <div className="space-y-2">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
            Webhook Configuration
          </h4>
          <p className="text-xs text-slate-500">
            Copy this webhook URL and paste it in your Tranzupi dashboard:
          </p>

          <div className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200 p-1.5 pl-3">
            <input
              type="text"
              readOnly
              value={webhookUrl}
              className="w-full bg-transparent text-xs text-slate-700 font-mono focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopyWebhook}
              className="px-3.5 py-1.5 rounded-lg bg-[#e2e8f0] hover:bg-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shrink-0"
            >
              {copiedWebhook ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-400">
            This URL will receive payment notifications from Tranzupi
          </p>
        </div>

        {/* Bottom Buttons: Already Activated (gray) & Update (green) */}
        <div className="flex items-center justify-center gap-3 pt-3">
          <button
            type="button"
            className="px-5 py-2 rounded-xl bg-[#d1d5db] text-slate-700 font-medium text-xs sm:text-sm cursor-default"
          >
            Already Activated
          </button>
          <button
            type="button"
            onClick={() => {
              setTranzupiSaved(true);
              notify({
                type: 'success',
                title: 'Action Done',
                message: 'Tranzupi payment gateway settings updated successfully.',
              });
              setTimeout(() => setTranzupiSaved(false), 2000);
            }}
            className="px-6 py-2 rounded-xl bg-[#00c950] hover:bg-[#00b045] text-white font-medium text-xs sm:text-sm cursor-pointer transition-colors shadow-xs"
          >
            Update
          </button>
        </div>

        {tranzupiSaved && (
          <p className="text-xs text-center text-emerald-600 font-medium">
            Tranzupi payment gateway settings updated
          </p>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 5. Withdrawal Methods View (Images 1, 2, 3, 10)
// =========================================================================
export interface WithdrawalMethodRecord {
  id: number;
  methodName: string;
  methodType: string;
  createdAt: string;
}

export const WithdrawalMethodsView: React.FC<SettingsViewsProps> = ({ onNavigate }) => {
  const { notify } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [activePage, setActivePage] = useState<number>(1);

  // Exact data from Image 1 & Image 10
  const [methods, setMethods] = useState<WithdrawalMethodRecord[]>([
    {
      id: 8,
      methodName: 'Upi',
      methodType: 'upild',
      createdAt: '02/12/2024 11:11 PM',
    },
    {
      id: 9,
      methodName: 'Redeem code',
      methodType: 'mobileNumber',
      createdAt: '07/12/2024 11:02 PM',
    },
  ]);

  // Column visibility state (Image 10)
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    withdrawalMethodId: true,
    methodName: true,
    methodType: true,
    createdAt: true,
    actions: true,
  });

  const columns: ColumnItem[] = [
    { key: 'withdrawalMethodId', label: 'withdrawalMethodId' },
    { key: 'methodName', label: 'Method Name' },
    { key: 'methodType', label: 'Method Type' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  const toggleColumn = (key: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<WithdrawalMethodRecord | null>(null);

  // Add form fields (Image 3)
  const [newMethodName, setNewMethodName] = useState('');
  const [newMethodType, setNewMethodType] = useState('upild');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMethodName.trim()) return;

    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()} ${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    const newRec: WithdrawalMethodRecord = {
      id: methods.length > 0 ? Math.max(...methods.map((m) => m.id)) + 1 : 1,
      methodName: newMethodName.trim(),
      methodType: newMethodType,
      createdAt: formatted,
    };

    setMethods([...methods, newRec]);
    setShowAddModal(false);
    const createdMethodName = newMethodName.trim();
    setNewMethodName('');
    setNewMethodType('upild');
    notify({
      type: 'success',
      title: 'Action Done',
      message: `Withdrawal method "${createdMethodName}" added successfully.`,
    });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    const deletedMethodName = deleteTarget.methodName;
    setMethods(methods.filter((m) => m.id !== deleteTarget.id));
    setDeleteTarget(null);
    notify({
      type: 'success',
      title: 'Action Done',
      message: `Withdrawal method "${deletedMethodName}" deleted successfully.`,
    });
  };

  const filtered = methods
    .filter(
      (m) =>
        m.methodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.methodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(m.id).includes(searchTerm)
    )
    .sort((a, b) => (sortOrderAsc ? a.id - b.id : b.id - a.id));

  const totalMethods = filtered.length;
  const totalMethodPages = Math.max(1, Math.ceil(totalMethods / rowsPerPage));
  const paginatedMethods = filtered.slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );

  return (
    <div className="space-y-4">
      {/* Header & Breadcrumb matching Image 1: Withdrawal Method / Home > Settings > User Wallet > Withdrawal Method */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0e3a6a] tracking-tight">
            Withdrawal Method
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
            <span>Home</span>
            <span>&gt;</span>
            <span>Settings</span>
            <span>&gt;</span>
            <button
              onClick={() => onNavigate?.('settings-user-wallet')}
              className="hover:text-slate-600 cursor-pointer"
            >
              User Wallet
            </button>
            <span>&gt;</span>
            <span className="text-slate-500 font-medium">Withdrawal Method</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate?.('settings-user-wallet')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Wallet</span>
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 p-5 sm:p-6">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by withdrawalMethodId, Method Name or Method Type"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setActivePage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2.5 justify-end">
            <ColumnsDropdown
              columns={columns}
              visibleColumns={visibleColumns}
              onToggleColumn={toggleColumn}
            />

            {/* Add New + Button matching Image 1 */}
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-black hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <span>Add New</span>
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Sub-bar: Total items and Rows per page */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3 border-b border-slate-100 pb-2">
          <span>Total {totalMethods} items</span>
          <RowsPerPageDropdown
            value={rowsPerPage}
            onChange={(val) => {
              setRowsPerPage(val);
              setActivePage(1);
            }}
          />
        </div>

        {/* Table matching Image 10 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-600">
                {visibleColumns.withdrawalMethodId && (
                  <th
                    className="py-3 px-3 cursor-pointer select-none"
                    onClick={() => setSortOrderAsc(!sortOrderAsc)}
                  >
                    <div className="flex items-center gap-1">
                      <span>withdrawalMethodId</span>
                      <ChevronUp
                        className={`w-3.5 h-3.5 text-slate-500 stroke-[2.5] transition-transform ${
                          !sortOrderAsc ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </th>
                )}
                {visibleColumns.methodName && <th className="py-3 px-3">Method Name</th>}
                {visibleColumns.methodType && <th className="py-3 px-3">Method Type</th>}
                {visibleColumns.createdAt && <th className="py-3 px-3">Created At</th>}
                {visibleColumns.actions && <th className="py-3 px-3 text-right">ACTIONS</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {paginatedMethods.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                    No withdrawal methods found
                  </td>
                </tr>
              ) : (
                paginatedMethods.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/60 transition-colors">
                    {visibleColumns.withdrawalMethodId && (
                      <td className="py-3.5 px-3 font-medium text-slate-800">{m.id}</td>
                    )}
                    {visibleColumns.methodName && (
                      <td className="py-3.5 px-3 font-normal text-slate-800">{m.methodName}</td>
                    )}
                    {visibleColumns.methodType && (
                      <td className="py-3.5 px-3 font-normal text-slate-800">{m.methodType}</td>
                    )}
                    {visibleColumns.createdAt && (
                      <td className="py-3.5 px-3 font-normal text-slate-800">{m.createdAt}</td>
                    )}
                    {visibleColumns.actions && (
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => setDeleteTarget(m)}
                          className="text-[#f43f5e] hover:text-red-700 text-xs font-medium flex items-center gap-1 px-1.5 py-1 rounded transition-colors ml-auto cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[2]" />
                          <span>Delete</span>
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
        <PaginationBar
          currentPage={activePage}
          totalPages={totalMethodPages}
          totalItems={totalMethods}
          rowsPerPage={rowsPerPage}
          onPageChange={setActivePage}
        />
      </div>

      {/* MODAL 1: Add New Withdrawal Method (Image 3 Replica) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Add New Withdrawal Method
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Withdrawal Method Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Withdrawal Method Name here"
                  value={newMethodName}
                  onChange={(e) => setNewMethodName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Select Withdrawal Method Type
                </label>
                <div className="relative">
                  <select
                    value={newMethodType}
                    onChange={(e) => setNewMethodType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white appearance-none focus:outline-none focus:border-blue-500 pr-8 text-xs sm:text-sm cursor-pointer"
                  >
                    <option value="upild">upild</option>
                    <option value="mobileNumber">mobileNumber</option>
                    <option value="bankAccount">bankAccount</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 rounded-xl bg-[#fed7e2] hover:bg-[#fbcfe8] text-[#db2777] font-semibold text-xs sm:text-sm cursor-pointer transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#00c950] hover:bg-[#00b045] text-white font-semibold text-xs sm:text-sm cursor-pointer transition-colors shadow-xs"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Delete Withdrawal Method (Image 2 Replica) */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Delete Withdrawal Method
              </h3>
              <button
                onClick={() => setDeleteTarget(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 py-2 text-xs sm:text-sm">
              <p className="text-slate-700 font-medium">Are you Sure for Delete Following ?</p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-800">
                <p>
                  <span className="font-semibold text-slate-900">Withdrawal Method Id :</span>{' '}
                  {deleteTarget.id}
                </p>
                <p className="mt-1">
                  <span className="font-semibold text-slate-900">Method Name :</span>{' '}
                  {deleteTarget.methodName}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2 rounded-lg bg-[#e2e8f0] hover:bg-slate-300 text-slate-700 font-medium text-xs sm:text-sm cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-5 py-2 rounded-lg bg-[#f43f5e] hover:bg-[#e11d48] text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 6. External Web Redirect View
// =========================================================================
export const WebRedirectView: React.FC<{ type: 'webapp' | 'staffpanel' }> = ({ type }) => {
  const isWebApp = type === 'webapp';

  return (
    <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100 max-w-xl mx-auto text-center space-y-4 my-8">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
        <ExternalLink className="w-8 h-8" />
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
        {isWebApp ? 'Client Web App Portal' : 'Staff Operations Panel'}
      </h2>

      <p className="text-sm text-slate-500 max-w-sm mx-auto">
        {isWebApp
          ? 'Navigate directly to the end-user gaming web application.'
          : 'Navigate directly to the dedicated field staff & operations workspace.'}
      </p>

      <div className="pt-4">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center gap-2 bg-[#0969da] hover:bg-[#085ec4] text-white font-medium text-sm py-2.5 px-6 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <span>{isWebApp ? 'Open Web App' : 'Open Staff Panel'}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
