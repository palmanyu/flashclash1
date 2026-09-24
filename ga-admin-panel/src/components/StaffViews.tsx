import React, { useState } from 'react';
import {
  Search,
  Plus,
  ChevronDown,
  Trash2,
  Edit3,
  X,
  Check,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { AdminView } from '../types';
import { ColumnsDropdown, ColumnItem } from './ColumnsDropdown';
import { useNotification } from '../context/NotificationContext';
import { RowsPerPageDropdown } from './RowsPerPageDropdown';
import { PaginationBar } from './PaginationBar';

interface StaffItem {
  id: number;
  fullName: string;
  email: string;
  role: string;
  status: 'Active' | 'Banned' | 'Inactive';
  updatedAt: string;
  createdAt: string;
  statusDescription?: string;
}

interface StaffViewsProps {
  onNavigate?: (view: AdminView, params?: Record<string, string | number>) => void;
  roleId?: number | string;
  staffId?: number | string;
}

// 1. Staffs View (Image 1, Image 4, Image 5, Image 6)
export const StaffsView: React.FC<StaffViewsProps> = ({ onNavigate }) => {
  const { notify } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [activePage, setActivePage] = useState<number>(1);

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('staff_columns_visibility');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // ignore
        }
      }
    }
    return {
      staffId: true,
      fullName: true,
      email: true,
      role: true,
      status: true,
      statusDescription: true,
      updatedAt: true,
      createdAt: true,
      actions: true,
    };
  });

  const staffColumns: ColumnItem[] = [
    { key: 'staffId', label: 'StaffId' },
    { key: 'fullName', label: 'FullName' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'statusDescription', label: 'StatusDescription' },
    { key: 'updatedAt', label: 'UpdatedAt' },
    { key: 'createdAt', label: 'CreatedAt' },
    { key: 'actions', label: 'Actions' },
  ];

  const toggleColumn = (key: string) => {
    setVisibleColumns((prev) => {
      const next = {
        ...prev,
        [key]: !prev[key],
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('staff_columns_visibility', JSON.stringify(next));
      }
      return next;
    });
  };

  const [staffList, setStaffList] = useState<StaffItem[]>([
    {
      id: 1,
      fullName: 'DigiCroz dev',
      email: 'support@digicroz.com',
      role: 'Full Access',
      status: 'Active',
      updatedAt: '07/12/2025 11:48 PM',
      createdAt: '07/12/2025 11:48 PM',
      statusDescription: 'System default master staff account',
    },
    {
      id: 2,
      fullName: 'Test 3',
      email: 'test@yoopmail.com',
      role: 'Full Access',
      status: 'Banned',
      updatedAt: '01/01/1970 5:30 AM',
      createdAt: '01/01/1970 5:30 AM',
      statusDescription: 'Violated platform fair play guidelines',
    },
    {
      id: 3,
      fullName: 'mmmes',
      email: 'uuu9975@gmail.com',
      role: 'Full Access',
      status: 'Banned',
      updatedAt: '01/01/1970 5:30 AM',
      createdAt: '01/01/1970 5:30 AM',
      statusDescription: 'Unverified email and suspicious activity',
    },
    {
      id: 4,
      fullName: 'create',
      email: 'khdjcjje@gmail.com',
      role: 'Full Access',
      status: 'Banned',
      updatedAt: '01/01/1970 5:30 AM',
      createdAt: '01/01/1970 5:30 AM',
      statusDescription: 'Restricted account by admin',
    },
    {
      id: 5,
      fullName: 'Demo Staff',
      email: 'demo@digicroz.com',
      role: 'Demo',
      status: 'Active',
      updatedAt: '01/01/1970 5:30 AM',
      createdAt: '01/01/1970 5:30 AM',
      statusDescription: 'Demo staff tester profile',
    },
  ]);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [updateStaffTarget, setUpdateStaffTarget] = useState<StaffItem | null>(null);
  const [deleteStaffTarget, setDeleteStaffTarget] = useState<StaffItem | null>(null);

  // New staff form state
  const [newRole, setNewRole] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newStatus, setNewStatus] = useState<'Active' | 'Banned' | 'Inactive'>('Active');
  const [newDescription, setNewDescription] = useState('');

  // Update staff form state
  const [editRole, setEditRole] = useState('Full Access');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editStatus, setEditStatus] = useState<'Active' | 'Banned' | 'Inactive'>('Active');
  const [editDescription, setEditDescription] = useState('');
  const [editUpdatePassword, setEditUpdatePassword] = useState(false);

  const openUpdateModal = (staff: StaffItem) => {
    setUpdateStaffTarget(staff);
    setEditRole(staff.role);
    setEditName(staff.fullName);
    setEditEmail(staff.email);
    setEditStatus(staff.status);
    setEditDescription(staff.statusDescription || '');
    setEditUpdatePassword(false);
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;
    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()} ${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    const newStaff: StaffItem = {
      id: staffList.length + 1,
      fullName: newName,
      email: newEmail,
      role: newRole || 'Full Access',
      status: newStatus,
      updatedAt: formatted,
      createdAt: formatted,
      statusDescription: newDescription,
    };

    setStaffList([...staffList, newStaff]);
    setShowAddModal(false);
    notify({
      type: 'success',
      title: 'Action Done',
      message: `Staff member ${newName} added successfully.`,
    });
    // Reset form
    setNewName('');
    setNewEmail('');
    setNewPassword('');
    setNewRole('');
    setNewDescription('');
  };

  const handleUpdateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateStaffTarget) return;
    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()} ${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    setStaffList((prev) =>
      prev.map((s) =>
        s.id === updateStaffTarget.id
          ? {
              ...s,
              fullName: editName,
              email: editEmail,
              role: editRole,
              status: editStatus,
              statusDescription: editDescription,
              updatedAt: formatted,
            }
          : s
      )
    );
    setUpdateStaffTarget(null);
    notify({
      type: 'success',
      title: 'Action Done',
      message: `Staff member ${editName} updated successfully.`,
    });
  };

  const handleDeleteStaff = () => {
    if (!deleteStaffTarget) return;
    const deletedName = deleteStaffTarget.fullName;
    setStaffList((prev) => prev.filter((s) => s.id !== deleteStaffTarget.id));
    setDeleteStaffTarget(null);
    notify({
      type: 'success',
      title: 'Action Done',
      message: `Staff member ${deletedName} deleted successfully.`,
    });
  };

  const filteredStaff = staffList.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(s.id).includes(searchTerm)
  );

  const totalStaff = filteredStaff.length;
  const totalStaffPages = Math.max(1, Math.ceil(totalStaff / rowsPerPage));
  const paginatedStaff = filteredStaff.slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );

  return (
    <div className="space-y-4">
      {/* Title & Breadcrumb */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0e3a6a] tracking-tight">Staffs</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
          <span>home</span>
          <span>&gt;</span>
          <span className="text-slate-500">Staffs</span>
        </div>
      </div>

      {/* Main Table Container Card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 p-5 sm:p-6">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by staffId, Name or Email"
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
              columns={staffColumns}
              visibleColumns={visibleColumns}
              onToggleColumn={toggleColumn}
            />

            <button
              onClick={() => setShowAddModal(true)}
              id="btn-add-new-staff"
              className="px-4 py-2 bg-black hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
            >
              <span>Add New</span>
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Sub-bar: Total Items and Rows per page */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3 border-b border-slate-100 pb-2">
          <span>Total {totalStaff} Items</span>
          <RowsPerPageDropdown
            value={rowsPerPage}
            onChange={(val) => {
              setRowsPerPage(val);
              setActivePage(1);
            }}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[880px]">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-600">
                {visibleColumns.staffId && <th className="py-3 px-3">StaffId</th>}
                {visibleColumns.fullName && <th className="py-3 px-3">FullName</th>}
                {visibleColumns.email && <th className="py-3 px-3">Email</th>}
                {visibleColumns.role && <th className="py-3 px-3">Role</th>}
                {visibleColumns.status && <th className="py-3 px-3">Status</th>}
                {visibleColumns.statusDescription && <th className="py-3 px-3">StatusDescription</th>}
                {visibleColumns.updatedAt && <th className="py-3 px-3">UpdatedAt</th>}
                {visibleColumns.createdAt && <th className="py-3 px-3">CreatedAt</th>}
                {visibleColumns.actions && <th className="py-3 px-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {paginatedStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-50/60 transition-colors">
                  {visibleColumns.staffId && (
                    <td className="py-3.5 px-3 font-semibold text-slate-800 font-mono text-xs">
                      {staff.id}
                    </td>
                  )}
                  {visibleColumns.fullName && (
                    <td className="py-3.5 px-3 font-medium text-slate-800">{staff.fullName}</td>
                  )}
                  {visibleColumns.email && (
                    <td className="py-3.5 px-3 text-slate-600">{staff.email}</td>
                  )}
                  {visibleColumns.role && (
                    <td className="py-3.5 px-3 text-slate-600">{staff.role}</td>
                  )}
                  {visibleColumns.status && (
                    <td className="py-3.5 px-3 text-slate-700 font-medium">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          staff.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : staff.status === 'Banned'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {staff.status}
                      </span>
                    </td>
                  )}
                  {visibleColumns.statusDescription && (
                    <td className="py-3.5 px-3 text-slate-500 text-xs max-w-[200px] truncate" title={staff.statusDescription || 'No description'}>
                      {staff.statusDescription || <span className="text-slate-300">-</span>}
                    </td>
                  )}
                  {visibleColumns.updatedAt && (
                    <td className="py-3.5 px-3 text-slate-600 font-mono text-xs">{staff.updatedAt}</td>
                  )}
                  {visibleColumns.createdAt && (
                    <td className="py-3.5 px-3 text-slate-600 font-mono text-xs">{staff.createdAt}</td>
                  )}
                  {visibleColumns.actions && (
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View logs button (navigates to staff-action-log) */}
                        <button
                          onClick={() => onNavigate?.('staff-action-log', { staffId: staff.id })}
                          className="bg-[#1d6bf3] hover:bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-md transition-colors cursor-pointer"
                        >
                          View logs
                        </button>

                        {/* Games Access button (opens Image 3 Permissions view for this staff) */}
                        <button
                          onClick={() => onNavigate?.('staff-permissions', { staffId: staff.id })}
                          className="bg-[#1d6bf3] hover:bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-md transition-colors cursor-pointer"
                        >
                          Games Access
                        </button>

                        {/* Update button */}
                        <button
                          onClick={() => openUpdateModal(staff)}
                          className="text-slate-400 hover:text-slate-700 text-xs font-medium flex items-center gap-1 px-1.5 py-1 rounded transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 stroke-[2]" />
                          <span>Update</span>
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={() => setDeleteStaffTarget(staff)}
                          className="text-[#f43f5e] hover:text-red-700 text-xs font-medium flex items-center gap-1 px-1.5 py-1 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[2]" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <PaginationBar
          currentPage={activePage}
          totalPages={totalStaffPages}
          totalItems={totalStaff}
          rowsPerPage={rowsPerPage}
          onPageChange={setActivePage}
        />
      </div>

      {/* MODAL 1: Add New Staff (Image 6 Replica) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Add New Staff</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Select a Role
                </label>
                <div className="relative">
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white appearance-none focus:outline-none focus:border-blue-500 pr-8"
                  >
                    <option value="">Select role here</option>
                    <option value="Full Access">Full Access</option>
                    <option value="Demo">Demo</option>
                    <option value="Moderator">Moderator</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Staff Full Name here"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter Staff email here"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Staff password here"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Select Status
                </label>
                <div className="relative">
                  <select
                    value={newStatus}
                    onChange={(e) =>
                      setNewStatus(e.target.value as 'Active' | 'Banned' | 'Inactive')
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white appearance-none focus:outline-none focus:border-blue-500 pr-8"
                  >
                    <option value="Active">active</option>
                    <option value="Banned">banned</option>
                    <option value="Inactive">inactive</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Status Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Enter Status Description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
                />
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

      {/* MODAL 2: Update Staff (Image 4 Replica) */}
      {updateStaffTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Update Staff #{updateStaffTarget.id}
              </h3>
              <button
                onClick={() => setUpdateStaffTarget(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateStaff} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Select a Role
                </label>
                <div className="relative">
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white appearance-none focus:outline-none focus:border-blue-500 pr-8"
                  >
                    <option value="Full Access">Full Access</option>
                    <option value="Demo">Demo</option>
                    <option value="Moderator">Moderator</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Select Status
                </label>
                <div className="relative">
                  <select
                    value={editStatus}
                    onChange={(e) =>
                      setEditStatus(e.target.value as 'Active' | 'Banned' | 'Inactive')
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white appearance-none focus:outline-none focus:border-blue-500 pr-8"
                  >
                    <option value="Active">active</option>
                    <option value="Banned">banned</option>
                    <option value="Inactive">inactive</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Status Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Enter Status Description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Toggle: Update Password */}
              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setEditUpdatePassword(!editUpdatePassword)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                    editUpdatePassword ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-xs block" />
                </button>
                <span className="text-xs text-slate-700 font-medium">Update Password</span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setUpdateStaffTarget(null)}
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

      {/* MODAL 3: Delete Staff (Image 5 Replica) */}
      {deleteStaffTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Delete Staff #{deleteStaffTarget.id}
              </h3>
              <button
                onClick={() => setDeleteStaffTarget(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 py-2 text-xs sm:text-sm">
              <p className="text-slate-700 font-medium">Are you Sure for Delete Following ?</p>
              <div className="space-y-1 text-slate-800">
                <p>
                  <span className="font-semibold text-slate-900">Full Name :</span>{' '}
                  {deleteStaffTarget.fullName}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Email :</span>{' '}
                  {deleteStaffTarget.email}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4">
              <button
                type="button"
                onClick={() => setDeleteStaffTarget(null)}
                className="px-5 py-2 rounded-lg bg-[#e2e8f0] hover:bg-slate-300 text-slate-700 font-medium text-xs sm:text-sm cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteStaff}
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

// 2. Staff Action Logs View (Image 2 Replica)
export const StaffActionLogView: React.FC<StaffViewsProps> = ({ onNavigate, staffId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [activePage, setActivePage] = useState<number>(1);
  const [selectedLogForDetails, setSelectedLogForDetails] = useState<any | null>(null);

  // Column visibility matching Image 1
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('staff_action_log_columns');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // ignore
        }
      }
    }
    return {
      staffLogId: true,
      staffId: true,
      staffName: true,
      actionType: true,
      message: true,
      createdAt: true,
      actions: true,
    };
  });

  const logColumns: ColumnItem[] = [
    { key: 'staffLogId', label: 'staffLogId' },
    { key: 'staffId', label: 'staffId' },
    { key: 'staffName', label: 'Staff Name' },
    { key: 'actionType', label: 'Action Type' },
    { key: 'message', label: 'Message' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'actions', label: 'Actions' },
  ];

  const toggleColumn = (key: string) => {
    setVisibleColumns((prev) => {
      const next = {
        ...prev,
        [key]: !prev[key],
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('staff_action_log_columns', JSON.stringify(next));
      }
      return next;
    });
  };

  const logs = [
    {
      id: 1,
      staffId: 1,
      staffName: 'DigiCroz dev',
      actionType: 'contestCrud',
      message: 'Contest ID: 106 status updated to ongoing.',
      createdAt: '19/09/2026 10:08 PM',
    },
    {
      id: 2,
      staffId: 1,
      staffName: 'DigiCroz dev',
      actionType: 'contestCrud',
      message: 'Contest ID: 106 created.',
      createdAt: '19/09/2026 10:03 PM',
    },
    {
      id: 3,
      staffId: 1,
      staffName: 'DigiCroz dev',
      actionType: 'authentication',
      message: 'logged in',
      createdAt: '19/09/2026 9:58 PM',
    },
    {
      id: 4,
      staffId: 1,
      staffName: 'DigiCroz dev',
      actionType: 'contestCrud',
      message: 'Contest ID: 105 created.',
      createdAt: '17/09/2026 11:47 AM',
    },
    {
      id: 5,
      staffId: 1,
      staffName: 'DigiCroz dev',
      actionType: 'contestCrud',
      message: 'Contest ID: 104 created.',
      createdAt: '17/09/2026 11:45 AM',
    },
    {
      id: 6,
      staffId: 1,
      staffName: 'DigiCroz dev',
      actionType: 'contestCrud',
      message: 'Contest ID: 103 created.',
      createdAt: '17/09/2026 11:06 AM',
    },
    {
      id: 7,
      staffId: 1,
      staffName: 'DigiCroz dev',
      actionType: 'authentication',
      message: 'logged in',
      createdAt: '16/09/2026 11:10 PM',
    },
    {
      id: 8,
      staffId: 2,
      staffName: 'Test 3',
      actionType: 'authentication',
      message: 'User account suspended by admin',
      createdAt: '15/09/2026 3:10 PM',
    },
    {
      id: 9,
      staffId: 3,
      staffName: 'mmmes',
      actionType: 'challengeCrud',
      message: 'Challenge ID: 44 created.',
      createdAt: '15/09/2026 11:20 AM',
    },
    {
      id: 10,
      staffId: 5,
      staffName: 'Demo Staff',
      actionType: 'contestCrud',
      message: 'Contest ID: 101 viewed.',
      createdAt: '15/09/2026 11:19 AM',
    },
  ];

  // If filtered by staffId, prioritize that staff's logs unless searchTerm is used
  const filteredLogs = logs.filter((l) => {
    if (staffId && String(l.staffId) !== String(staffId)) {
      return false;
    }
    return (
      l.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.actionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalLogs = filteredLogs.length;
  const totalLogPages = Math.max(1, Math.ceil(totalLogs / rowsPerPage));
  const paginatedLogs = filteredLogs.slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );

  return (
    <div className="space-y-4">
      {/* Header & Breadcrumb matching Image 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0e3a6a] tracking-tight">
            {staffId ? `Staff #${staffId} Action Logs` : 'Staff Action Logs'}
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
            <button onClick={() => onNavigate?.('dashboard')} className="hover:text-slate-600 cursor-pointer">
              Home
            </button>
            <span>&gt;</span>
            <button onClick={() => onNavigate?.('staffs')} className="hover:text-slate-600 cursor-pointer">
              Staffs
            </button>
            <span>&gt;</span>
            <span className="text-slate-500">{staffId ? `Staff #${staffId} Logs` : 'Staff Logs'}</span>
          </div>
        </div>

        {staffId && (
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-200/60">
              Filtered for Staff #{staffId}
            </span>
            <button
              onClick={() => onNavigate?.('staff-action-log')}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer"
            >
              View All Logs
            </button>
          </div>
        )}
      </div>

      {/* Card Table Container */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 p-5 sm:p-6">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Staff Id , Staff Name"
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
              columns={logColumns}
              visibleColumns={visibleColumns}
              onToggleColumn={toggleColumn}
            />
          </div>
        </div>

        {/* Sub-bar: Total Items and Rows per page */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3 border-b border-slate-100 pb-2">
          <span>Total {totalLogs} Items</span>
          <RowsPerPageDropdown
            value={rowsPerPage}
            onChange={(val) => {
              setRowsPerPage(val);
              setActivePage(1);
            }}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-600">
                {visibleColumns.staffLogId && <th className="py-3 px-3">staffLogId</th>}
                {visibleColumns.staffId && <th className="py-3 px-3">staffId</th>}
                {visibleColumns.staffName && <th className="py-3 px-3">Staff Name</th>}
                {visibleColumns.actionType && <th className="py-3 px-3">Action Type</th>}
                {visibleColumns.message && <th className="py-3 px-3">Message</th>}
                {visibleColumns.createdAt && <th className="py-3 px-3">Created At</th>}
                {visibleColumns.actions && <th className="py-3 px-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {paginatedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                  {visibleColumns.staffLogId && (
                    <td className="py-3.5 px-3 font-semibold text-slate-800 font-mono text-xs">
                      {log.id}
                    </td>
                  )}
                  {visibleColumns.staffId && (
                    <td className="py-3.5 px-3 font-semibold text-slate-600 font-mono text-xs">
                      #{log.staffId}
                    </td>
                  )}
                  {visibleColumns.staffName && (
                    <td className="py-3.5 px-3 font-medium text-slate-800">{log.staffName}</td>
                  )}
                  {visibleColumns.actionType && (
                    <td className="py-3.5 px-3 text-slate-700">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        {log.actionType}
                      </span>
                    </td>
                  )}
                  {visibleColumns.message && (
                    <td className="py-3.5 px-3 text-slate-600 max-w-[280px] truncate" title={log.message}>
                      {log.message}
                    </td>
                  )}
                  {visibleColumns.createdAt && (
                    <td className="py-3.5 px-3 text-slate-600 font-mono text-xs">{log.createdAt}</td>
                  )}
                  {visibleColumns.actions && (
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => setSelectedLogForDetails(log)}
                        className="bg-[#1d6bf3] hover:bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-md transition-colors cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Log Details Modal */}
        {selectedLogForDetails && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-100">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="text-base font-bold text-slate-800">
                  Staff Log Details #{selectedLogForDetails.id}
                </h3>
                <button
                  onClick={() => setSelectedLogForDetails(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">staffLogId</span>
                  <span className="font-mono font-semibold text-slate-800">{selectedLogForDetails.id}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">staffId</span>
                  <span className="font-mono font-semibold text-slate-700">#{selectedLogForDetails.staffId}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Staff Name</span>
                  <span className="font-medium text-slate-800">{selectedLogForDetails.staffName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Action Type</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">{selectedLogForDetails.actionType}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Created At</span>
                  <span className="font-mono text-slate-700">{selectedLogForDetails.createdAt}</span>
                </div>
                <div className="pt-2">
                  <span className="text-slate-400 font-medium block mb-1">Message</span>
                  <div className="bg-slate-50 rounded-xl p-3 text-slate-700 font-normal leading-relaxed border border-slate-100">
                    {selectedLogForDetails.message}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedLogForDetails(null)}
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <PaginationBar
          currentPage={activePage}
          totalPages={totalLogPages}
          totalItems={totalLogs}
          rowsPerPage={rowsPerPage}
          onPageChange={setActivePage}
        />
      </div>
    </div>
  );
};

// 3. Permissions View (Image 3 Replica: "1 Permissions" with per-staff custom game access)
interface PermissionItem {
  gameId: number;
  checked: boolean;
  name: string;
  gameType: 'contest' | 'challenge';
}

const MASTER_GAMES: Omit<PermissionItem, 'checked'>[] = [
  { gameId: 48, name: 'FF FULL MAP', gameType: 'contest' },
  { gameId: 50, name: 'BR SURVIVAL', gameType: 'contest' },
  { gameId: 51, name: 'CLASH SQUAD', gameType: 'contest' },
  { gameId: 52, name: 'LONE WOLF', gameType: 'contest' },
  { gameId: 53, name: 'CS ( gun skin on)', gameType: 'contest' },
  { gameId: 54, name: 'LONE WOLF(gun skin on)', gameType: 'contest' },
  { gameId: 56, name: 'Testing', gameType: 'contest' },
  { gameId: 57, name: 'new', gameType: 'contest' },
  { gameId: 58, name: '', gameType: 'challenge' },
  { gameId: 59, name: 'add thr thumbnail', gameType: 'contest' },
  { gameId: 60, name: 'add', gameType: 'contest' },
  { gameId: 61, name: 'nnnn', gameType: 'contest' },
  { gameId: 62, name: 'new ones', gameType: 'contest' },
  { gameId: 63, name: 'create another', gameType: 'challenge' },
];

const KNOWN_STAFFS = [
  { id: 1, fullName: 'DigiCroz dev', email: 'support@digicroz.com', role: 'Full Access', status: 'Active' },
  { id: 2, fullName: 'Test 3', email: 'test@yoopmail.com', role: 'Full Access', status: 'Banned' },
  { id: 3, fullName: 'mmmes', email: 'uuu9975@gmail.com', role: 'Full Access', status: 'Banned' },
  { id: 4, fullName: 'create', email: 'khdjcjje@gmail.com', role: 'Full Access', status: 'Banned' },
  { id: 5, fullName: 'Demo Staff', email: 'demo@digicroz.com', role: 'Demo', status: 'Active' },
];

// Helper to get initial distinct permissions for each staff
const getStaffInitialPermissions = (staffId: string | number): PermissionItem[] => {
  const sId = String(staffId);
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(`staff_game_perms_${sId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fall through to defaults
      }
    }
  }

  // Differentiated default game access profiles per staff
  let allowedGameIds: number[] = [];
  if (sId === '1') {
    // Staff 1 (DigiCroz dev - Full Access): All 14 games allowed
    allowedGameIds = [48, 50, 51, 52, 53, 54, 56, 57, 58, 59, 60, 61, 62, 63];
  } else if (sId === '2') {
    // Staff 2 (Test 3): Limited basic contest access
    allowedGameIds = [48, 50, 51];
  } else if (sId === '3') {
    // Staff 3 (mmmes): Lone Wolf & Challenge access
    allowedGameIds = [52, 53, 54, 58, 63];
  } else if (sId === '4') {
    // Staff 4 (create): Testing & custom map access
    allowedGameIds = [56, 57, 59, 60, 61, 62];
  } else if (sId === '5') {
    // Staff 5 (Demo Staff): Demo preset (2 games)
    allowedGameIds = [48, 50];
  } else {
    // Any custom staff ID: reasonable default (e.g. 5 games)
    allowedGameIds = [48, 50, 51, 52, 53];
  }

  return MASTER_GAMES.map((game) => ({
    ...game,
    checked: allowedGameIds.includes(game.gameId),
  }));
};

export const StaffPermissionsView: React.FC<StaffViewsProps> = ({ onNavigate, staffId = 1 }) => {
  const { notify } = useNotification();
  const currentStaffId = staffId || 1;

  // Resolve staff metadata
  const currentStaff = React.useMemo(() => {
    const found = KNOWN_STAFFS.find((s) => String(s.id) === String(currentStaffId));
    if (found) return found;
    return {
      id: Number(currentStaffId) || currentStaffId,
      fullName: `Staff #${currentStaffId}`,
      email: `staff${currentStaffId}@platform.local`,
      role: 'Staff Member',
      status: 'Active',
    };
  }, [currentStaffId]);

  // Per-staff permissions state
  const [permissions, setPermissions] = useState<PermissionItem[]>(() =>
    getStaffInitialPermissions(currentStaffId)
  );

  const [filterQuery, setFilterQuery] = useState('');

  // Sync state whenever active staffId prop changes
  React.useEffect(() => {
    setPermissions(getStaffInitialPermissions(currentStaffId));
  }, [currentStaffId]);

  const savePermissions = (updated: PermissionItem[]) => {
    setPermissions(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`staff_game_perms_${currentStaffId}`, JSON.stringify(updated));
    }
  };

  const toggleCheck = (gameId: number) => {
    const targetGame = permissions.find((p) => p.gameId === gameId);
    const willBeChecked = !targetGame?.checked;

    const updated = permissions.map((p) =>
      p.gameId === gameId ? { ...p, checked: !p.checked } : p
    );
    savePermissions(updated);

    notify({
      type: 'success',
      title: 'Game Access Updated',
      message: `${targetGame?.name || `Game #${gameId}`} ${
        willBeChecked ? 'enabled' : 'disabled'
      } for ${currentStaff.fullName}.`,
    });
  };

  const handleSelectAll = () => {
    const updated = permissions.map((p) => ({ ...p, checked: true }));
    savePermissions(updated);
    notify({
      type: 'success',
      title: 'Full Game Access Granted',
      message: `All 14 games enabled for ${currentStaff.fullName}.`,
    });
  };

  const handleDeselectAll = () => {
    const updated = permissions.map((p) => ({ ...p, checked: false }));
    savePermissions(updated);
    notify({
      type: 'info',
      title: 'Game Access Revoked',
      message: `All game permissions removed for ${currentStaff.fullName}.`,
    });
  };

  const filteredPermissions = permissions.filter(
    (p) =>
      String(p.gameId).includes(filterQuery) ||
      p.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.gameType.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const activeCount = permissions.filter((p) => p.checked).length;

  return (
    <div className="space-y-4 relative pb-20">
      {/* Title & Breadcrumb matching Image 3 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0e3a6a] tracking-tight flex items-center gap-2">
            <span>{currentStaff.id} Permissions</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1d6bf3] border border-blue-200">
              {currentStaff.fullName}
            </span>
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
            <button onClick={() => onNavigate?.('dashboard')} className="hover:text-slate-600 cursor-pointer">
              Home
            </button>
            <span>&gt;</span>
            <button onClick={() => onNavigate?.('staffs')} className="hover:text-slate-600 cursor-pointer">
              Staffs
            </button>
            <span>&gt;</span>
            <span className="text-slate-600 font-medium">{currentStaff.fullName} (#{currentStaff.id})</span>
            <span>&gt;</span>
            <span className="text-slate-500">Game Access</span>
          </div>
        </div>

        {/* Staff details badge & quick actions */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg font-medium">
            Role: <strong className="text-slate-900">{currentStaff.role}</strong>
          </span>
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-lg font-semibold">
            {activeCount} of {permissions.length} Games Allowed
          </span>
        </div>
      </div>

      {/* Staff Switcher Bar (Quickly test different URLs and permissions per staff) */}
      <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-xs flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-slate-600 mr-1">Switch Staff:</span>
          {KNOWN_STAFFS.map((s) => {
            const isCurrent = String(s.id) === String(currentStaffId);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onNavigate?.('staff-permissions', { staffId: s.id })}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#1d6bf3] text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60'
                }`}
              >
                #{s.id} {s.fullName}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSelectAll}
            className="px-2.5 py-1 text-xs font-semibold text-[#1d6bf3] hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
          >
            Allow All
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={handleDeselectAll}
            className="px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
          >
            Revoke All
          </button>
        </div>
      </div>

      {/* Main Table Card matching Image 3 */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 p-5 sm:p-6">
        {/* Search bar inside Card */}
        <div className="mb-4">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Game ID or Name..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1d6bf3]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[580px]">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-500">
                <th className="py-3 px-4 w-28">Game Id</th>
                <th className="py-3 px-4 w-24">Checks</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4 text-right">Game Type</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm">
              {filteredPermissions.map((item, idx) => (
                <tr
                  key={item.gameId}
                  className={`transition-colors hover:bg-slate-50/70 ${
                    idx % 2 === 0 ? 'bg-slate-50/30' : 'bg-white'
                  }`}
                >
                  <td className="py-3 px-4 font-medium text-slate-700">{item.gameId}</td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => toggleCheck(item.gameId)}
                      className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                        item.checked ? 'bg-[#1d6bf3] text-white' : 'border border-slate-300'
                      }`}
                    >
                      {item.checked && <Check className="w-2.8 h-2.8 stroke-[3]" />}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-medium">
                    {item.name || <span className="text-slate-400 italic">Unnamed game</span>}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        item.gameType === 'challenge'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {item.gameType}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Center Go Back Button (Image 3 Replica) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => onNavigate?.('staffs')}
          className="bg-black hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-1.5 shadow-xl transition-transform hover:scale-105 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
};

// 4. Staff Roles View (Image 1, Image 2, Image 3, Image 4, Image 5, Image 6)
interface StaffRoleItem {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
}

interface RolePermissionItem {
  id: number;
  checked: boolean;
  name: string;
  description: string;
}

export const StaffRolesView: React.FC<StaffViewsProps> = ({ onNavigate, roleId }) => {
  const { notify } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [activePage, setActivePage] = useState<number>(1);

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    id: true,
    name: true,
    updatedAt: true,
    createdAt: true,
    actions: true,
  });

  const roleColumns: ColumnItem[] = [
    { key: 'id', label: 'Staff Role Id' },
    { key: 'name', label: 'Name' },
    { key: 'updatedAt', label: 'Updated At' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'actions', label: 'Actions' },
  ];

  const toggleColumn = (key: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const [roles, setRoles] = useState<StaffRoleItem[]>([
    {
      id: 28,
      name: 'Demo',
      updatedAt: 'None',
      createdAt: '04/08/2026 8:59 PM',
    },
    {
      id: 1,
      name: 'Full Access',
      updatedAt: 'None',
      createdAt: '06/10/2024 12:09 AM',
    },
  ]);

  // Subview state: if viewing permissions for a specific role
  const [viewingRolePermissions, setViewingRolePermissions] = useState<StaffRoleItem | null>(null);

  const activeRole = React.useMemo(() => {
    if (roleId !== undefined && roleId !== null) {
      const found = roles.find((r) => String(r.id) === String(roleId));
      if (found) return found;
      return {
        id: Number(roleId) || 28,
        name: String(roleId) === '28' ? 'Demo' : `Role #${roleId}`,
        updatedAt: 'None',
        createdAt: 'Recent',
      };
    }
    return viewingRolePermissions;
  }, [roleId, roles, viewingRolePermissions]);

  // Modals state
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [updateRoleTarget, setUpdateRoleTarget] = useState<StaffRoleItem | null>(null);
  const [deleteRoleTarget, setDeleteRoleTarget] = useState<StaffRoleItem | null>(null);

  // Add / Edit form state
  const [newRoleName, setNewRoleName] = useState('');
  const [editRoleName, setEditRoleName] = useState('');

  // Permissions state for the role permissions sub-view (Image 2)
  const [rolePermissions, setRolePermissions] = useState<RolePermissionItem[]>([
    { id: 1, checked: true, name: 'View Users', description: '--' },
    { id: 2, checked: false, name: 'Create Users', description: '--' },
    { id: 3, checked: false, name: 'Update Users', description: '--' },
    { id: 4, checked: false, name: 'Delete Users', description: '--' },
    { id: 5, checked: false, name: 'Update Users Wallet', description: '--' },
    { id: 6, checked: true, name: 'View Games', description: '--' },
    { id: 7, checked: false, name: 'Create Games', description: '--' },
    { id: 8, checked: false, name: 'Update Games', description: '--' },
    { id: 9, checked: false, name: 'Delete Games', description: '--' },
    { id: 10, checked: true, name: 'View Contests', description: '--' },
    { id: 11, checked: false, name: 'Create Contest', description: '--' },
    { id: 12, checked: false, name: 'Update Contest', description: '--' },
    { id: 13, checked: false, name: 'Delete Contest', description: '--' },
    { id: 14, checked: false, name: 'Publish Results Contest', description: '--' },
    { id: 15, checked: false, name: 'Update Id And Pass Contest', description: '--' },
    { id: 16, checked: true, name: 'View Deposit Requests', description: '--' },
    { id: 17, checked: false, name: 'Manage Deposit Requests', description: '--' },
    { id: 18, checked: true, name: 'View Withdrawal Requests', description: '--' },
  ]);

  const toggleRolePermission = (id: number) => {
    setRolePermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p))
    );
  };

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;
    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()} ${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    const newRole: StaffRoleItem = {
      id: roles.length > 0 ? Math.max(...roles.map((r) => r.id)) + 1 : 1,
      name: newRoleName,
      updatedAt: 'None',
      createdAt: formatted,
    };

    setRoles([...roles, newRole]);
    setShowAddRoleModal(false);
    const createdRoleName = newRoleName;
    setNewRoleName('');
    notify({
      type: 'success',
      title: 'Action Done',
      message: `Staff role "${createdRoleName}" created successfully.`,
    });
  };

  const handleUpdateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateRoleTarget || !editRoleName.trim()) return;
    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()} ${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    setRoles((prev) =>
      prev.map((r) =>
        r.id === updateRoleTarget.id ? { ...r, name: editRoleName, updatedAt: formatted } : r
      )
    );
    setUpdateRoleTarget(null);
    notify({
      type: 'success',
      title: 'Action Done',
      message: `Staff role "${editRoleName}" updated successfully.`,
    });
  };

  const handleDeleteRole = () => {
    if (!deleteRoleTarget) return;
    const deletedName = deleteRoleTarget.name;
    setRoles((prev) => prev.filter((r) => r.id !== deleteRoleTarget.id));
    setDeleteRoleTarget(null);
    notify({
      type: 'success',
      title: 'Action Done',
      message: `Staff role "${deletedName}" deleted successfully.`,
    });
  };

  const filteredRoles = roles.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(r.id).includes(searchTerm)
  );

  const totalRoles = filteredRoles.length;
  const totalRolePages = Math.max(1, Math.ceil(totalRoles / rowsPerPage));
  const paginatedRoles = filteredRoles.slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );

  // If currently inspecting a role's permissions (Image 2)
  if (activeRole) {
    return (
      <div className="space-y-4 relative pb-16">
        {/* Header & Breadcrumb (Image 2 Replica) */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0e3a6a] tracking-tight">
            {activeRole.name} Permissions
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
            <span>Home</span>
            <span>&gt;</span>
            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('staff-roles');
                } else {
                  setViewingRolePermissions(null);
                }
              }}
              className="hover:underline text-slate-400 cursor-pointer"
            >
              Staff Roles
            </button>
            <span>&gt;</span>
            <span className="text-slate-500">Permissions</span>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 p-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold text-slate-500">
                  <th className="py-3 px-4 w-20">Id</th>
                  <th className="py-3 px-4 w-24">Checks</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4 text-right">Description</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm">
                {rolePermissions.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`transition-colors hover:bg-slate-50/70 ${
                      idx % 2 === 0 ? 'bg-slate-50/30' : 'bg-white'
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-slate-700">{item.id}</td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => toggleRolePermission(item.id)}
                        className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                          item.checked
                            ? 'bg-[#1d6bf3] text-white'
                            : 'border border-slate-300 bg-white'
                        }`}
                      >
                        {item.checked && <Check className="w-2.8 h-2.8 stroke-[3]" />}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-slate-800 font-medium">{item.name}</td>
                    <td className="py-3 px-4 text-right text-slate-400">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Floating Go Back Button */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <button
            type="button"
            onClick={() => {
              if (onNavigate) {
                onNavigate('staff-roles');
              } else {
                setViewingRolePermissions(null);
              }
            }}
            className="bg-black hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-xl transition-transform hover:scale-105 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }

  // Primary Staff Roles Table View (Image 1)
  return (
    <div className="space-y-4">
      {/* Title & Breadcrumb */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0e3a6a] tracking-tight">Staff Roles</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
          <span>Home</span>
          <span>&gt;</span>
          <span className="text-slate-500">Staff Roles</span>
        </div>
      </div>

      {/* Main Table Container Card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 p-5 sm:p-6">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Staff Id , Staff Name"
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
              columns={roleColumns}
              visibleColumns={visibleColumns}
              onToggleColumn={toggleColumn}
            />

            <button
              onClick={() => {
                setNewRoleName('');
                setShowAddRoleModal(true);
              }}
              id="btn-add-new-role"
              className="px-4 py-2 bg-black hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
            >
              <span>Add New</span>
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Sub-bar: Total Items and Rows per page */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3 border-b border-slate-100 pb-2">
          <span>Total {totalRoles} items</span>
          <RowsPerPageDropdown
            value={rowsPerPage}
            onChange={(val) => {
              setRowsPerPage(val);
              setActivePage(1);
            }}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-600">
                {visibleColumns.id && (
                  <th className="py-3 px-3">
                    <div className="flex items-center gap-1">
                      <span>Staff Role Id</span>
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                )}
                {visibleColumns.name && <th className="py-3 px-3">Name</th>}
                {visibleColumns.updatedAt && <th className="py-3 px-3">Updated At</th>}
                {visibleColumns.createdAt && <th className="py-3 px-3">Created At</th>}
                {visibleColumns.actions && <th className="py-3 px-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {paginatedRoles.map((role) => (
                <tr key={role.id} className="hover:bg-slate-50/60 transition-colors">
                  {visibleColumns.id && (
                    <td className="py-3.5 px-3 font-medium text-slate-800">{role.id}</td>
                  )}
                  {visibleColumns.name && (
                    <td className="py-3.5 px-3 font-medium text-slate-800">{role.name}</td>
                  )}
                  {visibleColumns.updatedAt && (
                    <td className="py-3.5 px-3 text-slate-600">{role.updatedAt}</td>
                  )}
                  {visibleColumns.createdAt && (
                    <td className="py-3.5 px-3 text-slate-600">{role.createdAt}</td>
                  )}
                  {visibleColumns.actions && (
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View Permissions Button */}
                        <button
                          type="button"
                          onClick={() => {
                            if (onNavigate) {
                              onNavigate('staff-role-permission', { roleId: role.id });
                            } else {
                              setViewingRolePermissions(role);
                            }
                          }}
                          className="bg-[#1d6bf3] hover:bg-blue-600 text-white text-xs font-medium px-3.5 py-1.5 rounded-md transition-colors cursor-pointer"
                        >
                          View Permissions
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() => {
                            setUpdateRoleTarget(role);
                            setEditRoleName(role.name);
                          }}
                          className="text-slate-400 hover:text-slate-700 text-xs font-medium flex items-center gap-1 px-1.5 py-1 rounded transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 stroke-[2]" />
                          <span>Edit</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => setDeleteRoleTarget(role)}
                          className="text-[#f43f5e] hover:text-red-700 text-xs font-medium flex items-center gap-1 px-1.5 py-1 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[2]" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <PaginationBar
          currentPage={activePage}
          totalPages={totalRolePages}
          totalItems={totalRoles}
          rowsPerPage={rowsPerPage}
          onPageChange={setActivePage}
        />
      </div>

      {/* MODAL 1: Add New Staff Role (Image 5 & 6 Replica) */}
      {showAddRoleModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Add New Staff Role</h3>
              <button
                onClick={() => setShowAddRoleModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Role Name</label>
                <input
                  type="text"
                  placeholder="Enter Name here"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  required
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddRoleModal(false)}
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

      {/* MODAL 2: Update Staff Role (Image 3 Replica) */}
      {updateRoleTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Update Staff Role #{updateRoleTarget.id}
              </h3>
              <button
                onClick={() => setUpdateRoleTarget(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateRole} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Role Name</label>
                <input
                  type="text"
                  value={editRoleName}
                  onChange={(e) => setEditRoleName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-500"
                  required
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setUpdateRoleTarget(null)}
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

      {/* MODAL 3: Delete Staff Role (Image 4 Replica) */}
      {deleteRoleTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Delete Staff Role #{deleteRoleTarget.id}
              </h3>
              <button
                onClick={() => setDeleteRoleTarget(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 py-2 text-xs sm:text-sm">
              <p className="text-slate-800">
                <span className="font-semibold text-slate-900">Role Name:</span>{' '}
                {deleteRoleTarget.name}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4">
              <button
                type="button"
                onClick={() => setDeleteRoleTarget(null)}
                className="px-5 py-2 rounded-lg bg-[#e2e8f0] hover:bg-slate-300 text-slate-700 font-medium text-xs sm:text-sm cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteRole}
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
