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
  onNavigate?: (view: AdminView) => void;
}

// 1. Staffs View (Image 1, Image 4, Image 5, Image 6)
export const StaffsView: React.FC<StaffViewsProps> = ({ onNavigate }) => {
  const { notify } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [activePage, setActivePage] = useState<number>(1);

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    fullName: true,
    email: true,
    role: true,
    status: true,
    updatedAt: true,
    createdAt: true,
    actions: true,
  });

  const staffColumns: ColumnItem[] = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
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

  const [staffList, setStaffList] = useState<StaffItem[]>([
    {
      id: 1,
      fullName: 'DigiCroz dev',
      email: 'support@digicroz.com',
      role: 'Full Access',
      status: 'Active',
      updatedAt: '07/12/2025 11:48 PM',
      createdAt: '07/12/2025 11:48 PM',
      statusDescription: '',
    },
    {
      id: 2,
      fullName: 'Test 3',
      email: 'test@yoopmail.com',
      role: 'Full Access',
      status: 'Banned',
      updatedAt: '01/01/1970 5:30 AM',
      createdAt: '01/01/1970 5:30 AM',
      statusDescription: '',
    },
    {
      id: 3,
      fullName: 'mmmes',
      email: 'uuu9975@gmail.com',
      role: 'Full Access',
      status: 'Banned',
      updatedAt: '01/01/1970 5:30 AM',
      createdAt: '01/01/1970 5:30 AM',
      statusDescription: '',
    },
    {
      id: 4,
      fullName: 'create',
      email: 'khdjcjje@gmail.com',
      role: 'Full Access',
      status: 'Banned',
      updatedAt: '01/01/1970 5:30 AM',
      createdAt: '01/01/1970 5:30 AM',
      statusDescription: '',
    },
    {
      id: 5,
      fullName: 'Demo Staff',
      email: 'demo@digicroz.com',
      role: 'Demo',
      status: 'Active',
      updatedAt: '01/01/1970 5:30 AM',
      createdAt: '01/01/1970 5:30 AM',
      statusDescription: '',
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
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-600">
                {visibleColumns.fullName && <th className="py-3 px-3">Full Name</th>}
                {visibleColumns.email && <th className="py-3 px-3">Email</th>}
                {visibleColumns.role && <th className="py-3 px-3">Role</th>}
                {visibleColumns.status && <th className="py-3 px-3">Status</th>}
                {visibleColumns.updatedAt && <th className="py-3 px-3">Updated At</th>}
                {visibleColumns.createdAt && <th className="py-3 px-3">Created At</th>}
                {visibleColumns.actions && <th className="py-3 px-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {paginatedStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-50/60 transition-colors">
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
                    <td className="py-3.5 px-3 text-slate-700 font-medium">{staff.status}</td>
                  )}
                  {visibleColumns.updatedAt && (
                    <td className="py-3.5 px-3 text-slate-600">{staff.updatedAt}</td>
                  )}
                  {visibleColumns.createdAt && (
                    <td className="py-3.5 px-3 text-slate-600">{staff.createdAt}</td>
                  )}
                  {visibleColumns.actions && (
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View logs button (navigates to staff-action-log) */}
                        <button
                          onClick={() => onNavigate?.('staff-action-log')}
                          className="bg-[#1d6bf3] hover:bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-md transition-colors cursor-pointer"
                        >
                          View logs
                        </button>

                        {/* Games Access button (opens Image 3 Permissions view) */}
                        <button
                          onClick={() => onNavigate?.('staff-permissions')}
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
export const StaffActionLogView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [activePage, setActivePage] = useState<number>(1);

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    staffName: true,
    actionType: true,
    message: true,
    createdAt: true,
  });

  const logColumns: ColumnItem[] = [
    { key: 'staffName', label: 'Staff Name' },
    { key: 'actionType', label: 'Action Type' },
    { key: 'message', label: 'Message' },
    { key: 'createdAt', label: 'Created At' },
  ];

  const toggleColumn = (key: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const logs = [
    {
      id: 1,
      staffName: 'DigiCroz dev',
      actionType: 'contestCrud',
      message: 'Contest ID: 106 status updated to ongoing.',
      createdAt: '19/09/2026 10:08 PM',
    },
    {
      id: 2,
      staffName: 'DigiCroz dev',
      actionType: 'contestCrud',
      message: 'Contest ID: 106 created.',
      createdAt: '19/09/2026 10:03 PM',
    },
    {
      id: 3,
      staffName: 'DigiCroz dev',
      actionType: 'authentication',
      message: 'logged in',
      createdAt: '19/09/2026 9:58 PM',
    },
    {
      id: 4,
      staffName: 'DigiCroz dev',
      actionType: 'contestCrud',
      message: 'Contest ID: 105 created.',
      createdAt: '17/09/2026 11:47 AM',
    },
    {
      id: 5,
      staffName: 'DigiCroz dev',
      actionType: 'contestCrud',
      message: 'Contest ID: 104 created.',
      createdAt: '17/09/2026 11:45 AM',
    },
    {
      id: 6,
      staffName: 'DigiCroz dev',
      actionType: 'contestCrud',
      message: 'Contest ID: 103 created.',
      createdAt: '17/09/2026 11:06 AM',
    },
    {
      id: 7,
      staffName: 'DigiCroz dev',
      actionType: 'authentication',
      message: 'logged in',
      createdAt: '16/09/2026 11:10 PM',
    },
    {
      id: 8,
      staffName: 'DigiCroz dev',
      actionType: 'authentication',
      message: 'logged in',
      createdAt: '15/09/2026 3:10 PM',
    },
    {
      id: 9,
      staffName: 'DigiCroz dev',
      actionType: 'contestCrud',
      message: 'Contest ID: 102 created.',
      createdAt: '15/09/2026 11:20 AM',
    },
    {
      id: 10,
      staffName: 'DigiCroz dev',
      actionType: 'contestCrud',
      message: 'Contest ID: 101 deleted.',
      createdAt: '15/09/2026 11:19 AM',
    },
  ];

  const filteredLogs = logs.filter(
    (l) =>
      l.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.actionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalLogs = filteredLogs.length;
  const totalLogPages = Math.max(1, Math.ceil(totalLogs / rowsPerPage));
  const paginatedLogs = filteredLogs.slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );

  return (
    <div className="space-y-4">
      {/* Header & Breadcrumb matching Image 2 */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0e3a6a] tracking-tight">
          Staff Action Logs
        </h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
          <span>home</span>
          <span>&gt;</span>
          <span className="text-slate-500">Staff Logs</span>
        </div>
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
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-600">
                {visibleColumns.staffName && <th className="py-3 px-3">Staff Name</th>}
                {visibleColumns.actionType && <th className="py-3 px-3">Action Type</th>}
                {visibleColumns.message && <th className="py-3 px-3">Message</th>}
                {visibleColumns.createdAt && <th className="py-3 px-3">Created At</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {paginatedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                  {visibleColumns.staffName && (
                    <td className="py-3.5 px-3 font-medium text-slate-800">{log.staffName}</td>
                  )}
                  {visibleColumns.actionType && (
                    <td className="py-3.5 px-3 text-slate-700">{log.actionType}</td>
                  )}
                  {visibleColumns.message && (
                    <td className="py-3.5 px-3 text-slate-600">{log.message}</td>
                  )}
                  {visibleColumns.createdAt && (
                    <td className="py-3.5 px-3 text-slate-600">{log.createdAt}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

// 3. Permissions View (Image 3 Replica: "1 Permissions")
interface PermissionItem {
  gameId: number;
  checked: boolean;
  name: string;
  gameType: 'contest' | 'challenge';
}

export const StaffPermissionsView: React.FC<StaffViewsProps> = ({ onNavigate }) => {
  const [permissions, setPermissions] = useState<PermissionItem[]>([
    { gameId: 48, checked: true, name: 'FF FULL MAP', gameType: 'contest' },
    { gameId: 50, checked: true, name: 'BR SURVIVAL', gameType: 'contest' },
    { gameId: 51, checked: true, name: 'CLASH SQUAD', gameType: 'contest' },
    { gameId: 52, checked: true, name: 'LONE WOLF', gameType: 'contest' },
    { gameId: 53, checked: true, name: 'CS ( gun skin on)', gameType: 'contest' },
    { gameId: 54, checked: true, name: 'LONE WOLF(gun skin on)', gameType: 'contest' },
    { gameId: 56, checked: true, name: 'Testing', gameType: 'contest' },
    { gameId: 57, checked: true, name: 'new', gameType: 'contest' },
    { gameId: 58, checked: true, name: '', gameType: 'challenge' },
    { gameId: 59, checked: true, name: 'add thr thumbnail', gameType: 'contest' },
    { gameId: 60, checked: true, name: 'add', gameType: 'contest' },
    { gameId: 61, checked: true, name: 'nnnn', gameType: 'contest' },
    { gameId: 62, checked: true, name: 'new ones', gameType: 'contest' },
    { gameId: 63, checked: true, name: 'create another', gameType: 'challenge' },
  ]);

  const toggleCheck = (gameId: number) => {
    setPermissions((prev) =>
      prev.map((p) => (p.gameId === gameId ? { ...p, checked: !p.checked } : p))
    );
  };

  return (
    <div className="space-y-4 relative pb-16">
      {/* Title & Breadcrumb matching Image 3 */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0e3a6a] tracking-tight">
          1 Permissions
        </h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
          <span>Home</span>
          <span>&gt;</span>
          <span>Staff Roles</span>
          <span>&gt;</span>
          <span className="text-slate-500">Permissions</span>
        </div>
      </div>

      {/* Main Table Card matching Image 3 */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 p-5 sm:p-6">
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
              {permissions.map((item, idx) => (
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
                  <td className="py-3 px-4 text-slate-800 font-medium">{item.name}</td>
                  <td className="py-3 px-4 text-right text-slate-600">{item.gameType}</td>
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
          className="bg-black hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-xl transition-transform hover:scale-105 cursor-pointer"
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

export const StaffRolesView: React.FC<StaffViewsProps> = () => {
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
  if (viewingRolePermissions) {
    return (
      <div className="space-y-4 relative pb-16">
        {/* Header & Breadcrumb (Image 2 Replica) */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0e3a6a] tracking-tight">
            {viewingRolePermissions.name} Permissions
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
            <span>Home</span>
            <span>&gt;</span>
            <span>Staff Roles</span>
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
            onClick={() => setViewingRolePermissions(null)}
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
                          onClick={() => setViewingRolePermissions(role)}
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
