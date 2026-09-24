import React, { useState } from 'react';
import {
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Trash2,
  X,
  Check,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';
import { AdminView } from '../types';
import { ColumnsDropdown, ColumnItem } from './ColumnsDropdown';
import { RowsPerPageDropdown } from './RowsPerPageDropdown';
import { PaginationBar } from './PaginationBar';
import { useNotification } from '../context/NotificationContext';

interface AdminViewsProps {
  onNavigate?: (view: AdminView, params?: Record<string, string | number>) => void;
  roleId?: number | string;
  adminId?: number | string;
}

export interface AdminItem {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Banned';
  statusDescription?: string;
  updatedAt: string;
  createdAt: string;
}

export interface AdminActionLogItem {
  id: number;
  adminName: string;
  actionType: string;
  message: string;
  createdAt: string;
}

// 1. Admins Management View (Image 1, Image 3, Image 4, Image 5)
export const AdminsView: React.FC<AdminViewsProps> = ({ onNavigate }) => {
  const { notify } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [sortOrderAsc, setSortOrderAsc] = useState(true);

  // Column visibility matching Image 2
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin_columns_visibility');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // ignore
        }
      }
    }
    return {
      adminId: true,
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

  const adminColumns: ColumnItem[] = [
    { key: 'adminId', label: 'AdminId' },
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
        localStorage.setItem('admin_columns_visibility', JSON.stringify(next));
      }
      return next;
    });
  };

  // Seed data matching Image 1
  const [admins, setAdmins] = useState<AdminItem[]>([
    {
      id: 1,
      name: 'DigiCroz Devs',
      email: 'support@digicroz.com',
      role: 'Owner',
      status: 'Active',
      statusDescription: '',
      updatedAt: '14/07/2024 11:17 PM',
      createdAt: '14/07/2024 11:17 PM',
    },
    {
      id: 2,
      name: 'tester tester',
      email: 'tester@gmail.com',
      role: 'Owner',
      status: 'Banned',
      statusDescription: 'Account suspended for policy checks',
      updatedAt: '01/01/1970 5:30 AM',
      createdAt: '01/01/1970 5:30 AM',
    },
    {
      id: 3,
      name: 'sadfdfs',
      email: 'dev@gmail.com',
      role: 'Developer',
      status: 'Active',
      statusDescription: '',
      updatedAt: '01/01/1970 5:30 AM',
      createdAt: '01/01/1970 5:30 AM',
    },
    {
      id: 4,
      name: 'dwef',
      email: 'awdEDIT@gmail.com',
      role: 'Developer',
      status: 'Active',
      statusDescription: '',
      updatedAt: '01/01/1970 5:30 AM',
      createdAt: '01/01/1970 5:30 AM',
    },
    {
      id: 5,
      name: 'modi',
      email: 'moodi@gmail.com',
      role: 'Developer',
      status: 'Active',
      statusDescription: '',
      updatedAt: '01/01/1970 5:30 AM',
      createdAt: '01/01/1970 5:30 AM',
    },
    {
      id: 6,
      name: 'Demo Admin',
      email: 'demo@digicroz.com',
      role: 'Demo',
      status: 'Active',
      statusDescription: '',
      updatedAt: '01/01/1970 5:30 AM',
      createdAt: '01/01/1970 5:30 AM',
    },
    {
      id: 7,
      name: 'Pamela Kertzmann',
      email: 'Pamela.Kertzmann@hotmail.com',
      role: 'Owner',
      status: 'Active',
      statusDescription: '',
      updatedAt: '01/01/1970 5:30 AM',
      createdAt: '01/01/1970 5:30 AM',
    },
    {
      id: 8,
      name: 'Florian Hessel-Bayer',
      email: 'Florian.Hessel-Bayer23@yahoo.com',
      role: 'Owner',
      status: 'Active',
      statusDescription: '',
      updatedAt: '01/01/1970 5:30 AM',
      createdAt: '01/01/1970 5:30 AM',
    },
    {
      id: 9,
      name: 'Bernice Pouros',
      email: 'Bernice_Pouros@yahoo.com',
      role: 'Owner',
      status: 'Active',
      statusDescription: '',
      updatedAt: '01/01/1970 5:30 AM',
      createdAt: '01/01/1970 5:30 AM',
    },
    {
      id: 10,
      name: 'Melissa Leffler',
      email: 'Melissa.Leffler9@yahoo.com',
      role: 'Owner',
      status: 'Active',
      statusDescription: '',
      updatedAt: '01/01/1970 5:30 AM',
      createdAt: '01/01/1970 5:30 AM',
    },
  ]);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [updateTarget, setUpdateTarget] = useState<AdminItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminItem | null>(null);

  // Add form fields (Image 5)
  const [newRole, setNewRole] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newStatus, setNewStatus] = useState<'Active' | 'Banned'>('Active');
  const [newStatusDesc, setNewStatusDesc] = useState('');

  // Update form fields (Image 3)
  const [editRole, setEditRole] = useState('');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editStatus, setEditStatus] = useState<'Active' | 'Banned'>('Active');
  const [editStatusDesc, setEditStatusDesc] = useState('');
  const [editUpdatePassword, setEditUpdatePassword] = useState(false);
  const [editPassword, setEditPassword] = useState('');

  // Pagination state
  const [activePage, setActivePage] = useState(1);

  // Handle Add Admin (Image 5)
  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()} ${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    const newAdmin: AdminItem = {
      id: admins.length > 0 ? Math.max(...admins.map((a) => a.id)) + 1 : 1,
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole || 'Owner',
      status: newStatus,
      statusDescription: newStatusDesc,
      updatedAt: formattedDate,
      createdAt: formattedDate,
    };

    setAdmins([newAdmin, ...admins]);
    setShowAddModal(false);
    notify({
      type: 'success',
      title: 'Action Done',
      message: `Admin ${newName.trim()} created successfully.`,
    });
    // Reset form
    setNewRole('');
    setNewName('');
    setNewEmail('');
    setNewPassword('');
    setNewStatus('Active');
    setNewStatusDesc('');
  };

  // Open Update Modal (Image 3)
  const openUpdateModal = (admin: AdminItem) => {
    setUpdateTarget(admin);
    setEditRole(admin.role);
    setEditName(admin.name);
    setEditEmail(admin.email);
    setEditStatus(admin.status);
    setEditStatusDesc(admin.statusDescription || '');
    setEditUpdatePassword(false);
    setEditPassword('');
  };

  // Handle Submit Update
  const handleUpdateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateTarget || !editName.trim() || !editEmail.trim()) return;

    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()} ${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    setAdmins((prev) =>
      prev.map((item) =>
        item.id === updateTarget.id
          ? {
              ...item,
              name: editName.trim(),
              email: editEmail.trim(),
              role: editRole,
              status: editStatus,
              statusDescription: editStatusDesc,
              updatedAt: formattedDate,
            }
          : item
      )
    );
    setUpdateTarget(null);
    notify({
      type: 'success',
      title: 'Action Done',
      message: `Admin ${editName.trim()} updated successfully.`,
    });
  };

  // Handle Delete Admin (Image 4)
  const handleDeleteAdmin = () => {
    if (!deleteTarget) return;
    const deletedName = deleteTarget.name;
    setAdmins((prev) => prev.filter((item) => item.id !== deleteTarget.id));
    setDeleteTarget(null);
    notify({
      type: 'success',
      title: 'Action Done',
      message: `Admin ${deletedName} deleted successfully.`,
    });
  };

  // Filtered & Sorted Admins
  const filteredAdmins = admins
    .filter((a) => {
      const q = searchTerm.toLowerCase();
      return (
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        String(a.id).includes(q) ||
        a.role.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortOrderAsc) {
        return a.email.localeCompare(b.email);
      }
      return b.email.localeCompare(a.email);
    });

  const totalAdmins = filteredAdmins.length;
  const totalPages = Math.max(1, Math.ceil(totalAdmins / rowsPerPage));
  const paginatedAdmins = filteredAdmins.slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );

  return (
    <div className="space-y-4">
      {/* Title & Breadcrumb matching Image 1: Admins / home > Admins */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0e3a6a] tracking-tight">Admins</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
          <span>home</span>
          <span>&gt;</span>
          <span className="text-slate-500 font-medium">Admins</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 p-5 sm:p-6">
        {/* Top Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by adminId, Name or Email"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setActivePage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2.5 justify-end">
            {/* Columns Dropdown Toggle */}
            <ColumnsDropdown
              columns={adminColumns}
              visibleColumns={visibleColumns}
              onToggleColumn={toggleColumn}
            />

            {/* Add New Button */}
            <button
              onClick={() => {
                setNewRole('');
                setNewName('');
                setNewEmail('');
                setNewPassword('');
                setNewStatus('Active');
                setNewStatusDesc('');
                setShowAddModal(true);
              }}
              id="btn-add-new-admin"
              className="px-4 py-2 bg-black hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
            >
              <span>Add New</span>
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Sub-bar: Total Items and Rows per page */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3 border-b border-slate-100 pb-2">
          <span>Total {totalAdmins} items</span>
          <RowsPerPageDropdown
            value={rowsPerPage}
            onChange={(val) => {
              setRowsPerPage(val);
              setActivePage(1);
            }}
          />
        </div>

        {/* Data Table matching Image 1 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[880px]">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-600">
                {visibleColumns.adminId && <th className="py-3 px-3">AdminId</th>}
                {visibleColumns.fullName && <th className="py-3 px-3">FullName</th>}
                {visibleColumns.email && (
                  <th
                    className="py-3 px-3 cursor-pointer select-none"
                    onClick={() => setSortOrderAsc(!sortOrderAsc)}
                  >
                    <div className="flex items-center gap-1">
                      <span>Email</span>
                      <ChevronUp
                        className={`w-3 h-3 text-slate-400 transition-transform ${
                          sortOrderAsc ? '' : 'rotate-180'
                        }`}
                      />
                    </div>
                  </th>
                )}
                {visibleColumns.role && <th className="py-3 px-3">Role</th>}
                {visibleColumns.status && <th className="py-3 px-3">Status</th>}
                {visibleColumns.statusDescription && <th className="py-3 px-3">StatusDescription</th>}
                {visibleColumns.updatedAt && <th className="py-3 px-3">UpdatedAt</th>}
                {visibleColumns.createdAt && <th className="py-3 px-3">CreatedAt</th>}
                {visibleColumns.actions && <th className="py-3 px-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {paginatedAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-slate-50/60 transition-colors">
                  {visibleColumns.adminId && (
                    <td className="py-3.5 px-3 font-semibold text-slate-800 font-mono text-xs">
                      {admin.id}
                    </td>
                  )}
                  {visibleColumns.fullName && (
                    <td className="py-3.5 px-3 font-medium text-slate-800">{admin.name}</td>
                  )}
                  {visibleColumns.email && (
                    <td className="py-3.5 px-3 text-slate-600">{admin.email}</td>
                  )}
                  {visibleColumns.role && (
                    <td className="py-3.5 px-3 text-slate-700">{admin.role}</td>
                  )}
                  {visibleColumns.status && (
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          admin.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {admin.status}
                      </span>
                    </td>
                  )}
                  {visibleColumns.statusDescription && (
                    <td className="py-3.5 px-3 text-slate-500 text-xs max-w-[200px] truncate" title={admin.statusDescription || 'No description'}>
                      {admin.statusDescription || <span className="text-slate-300">-</span>}
                    </td>
                  )}
                  {visibleColumns.updatedAt && (
                    <td className="py-3.5 px-3 text-slate-600 font-mono text-xs">{admin.updatedAt}</td>
                  )}
                  {visibleColumns.createdAt && (
                    <td className="py-3.5 px-3 text-slate-600 font-mono text-xs">{admin.createdAt}</td>
                  )}
                  {visibleColumns.actions && (
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View logs button */}
                        <button
                          onClick={() => onNavigate?.('admin-action-log', { adminId: admin.id })}
                          className="bg-[#1d6bf3] hover:bg-blue-600 text-white text-xs font-medium px-3.5 py-1.5 rounded-md transition-colors cursor-pointer"
                        >
                          View logs
                        </button>

                        {/* Update button */}
                        <button
                          onClick={() => openUpdateModal(admin)}
                          className="text-slate-400 hover:text-slate-700 text-xs font-medium flex items-center gap-1 px-1.5 py-1 rounded transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 stroke-[2]" />
                          <span>Update</span>
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={() => setDeleteTarget(admin)}
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
          totalPages={totalPages}
          totalItems={totalAdmins}
          rowsPerPage={rowsPerPage}
          onPageChange={setActivePage}
        />
      </div>

      {/* MODAL 1: Add New Admin (Image 5 Replica) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Add New Admin</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-3.5 text-xs sm:text-sm">
              {/* Select a Role */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Select a Role</label>
                <div className="relative">
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white appearance-none focus:outline-none focus:border-blue-500 pr-9 cursor-pointer"
                    required
                  >
                    <option value="" disabled>
                      Select role here
                    </option>
                    <option value="Owner">Owner</option>
                    <option value="Developer">Developer</option>
                    <option value="Demo">Demo</option>
                    <option value="System Admin">System Admin</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter Admin Full Name here"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter Admin email here"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter Admin password here"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Select Status */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Select Status</label>
                <div className="relative">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as 'Active' | 'Banned')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white appearance-none focus:outline-none focus:border-blue-500 pr-9 cursor-pointer"
                  >
                    <option value="Active">active</option>
                    <option value="Banned">banned</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Status Description */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Status Description</label>
                <input
                  type="text"
                  placeholder="Enter Status Description"
                  value={newStatusDesc}
                  onChange={(e) => setNewStatusDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Buttons: Close (pink) & Submit (green) */}
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

      {/* MODAL 2: Update Admin (Image 3 Replica) */}
      {updateTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Update Admin #{updateTarget.id}
              </h3>
              <button
                onClick={() => setUpdateTarget(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateAdmin} className="space-y-3.5 text-xs sm:text-sm">
              {/* Select a Role */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Select a Role</label>
                <div className="relative">
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white appearance-none focus:outline-none focus:border-blue-500 pr-9 cursor-pointer"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Developer">Developer</option>
                    <option value="Demo">Demo</option>
                    <option value="System Admin">System Admin</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Select Status */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Select Status</label>
                <div className="relative">
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as 'Active' | 'Banned')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white appearance-none focus:outline-none focus:border-blue-500 pr-9 cursor-pointer"
                  >
                    <option value="Active">active</option>
                    <option value="Banned">banned</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Status Description */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Status Description</label>
                <input
                  type="text"
                  placeholder="Enter Status Description"
                  value={editStatusDesc}
                  onChange={(e) => setEditStatusDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Update Password Toggle Switch (Image 3) */}
              <div className="pt-1">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => setEditUpdatePassword(!editUpdatePassword)}
                    className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                      editUpdatePassword ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                        editUpdatePassword ? 'left-5.5' : 'left-0.5'
                      }`}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-700">Update Password</span>
                </label>

                {editUpdatePassword && (
                  <div className="mt-2.5">
                    <input
                      type="password"
                      placeholder="Enter new password here"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Buttons: Close (pink) & Submit (green) */}
              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setUpdateTarget(null)}
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

      {/* MODAL 3: Delete Admin (Image 4 Replica) */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Delete Admin #{deleteTarget.id}
              </h3>
              <button
                onClick={() => setDeleteTarget(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 py-2 text-xs sm:text-sm">
              <p className="text-slate-700 font-medium mb-3">
                Are you Sure for Delete Following ?
              </p>
              <p className="text-slate-800">
                <span className="font-semibold text-slate-900">Full Name :</span>{' '}
                {deleteTarget.name}
              </p>
              <p className="text-slate-800">
                <span className="font-semibold text-slate-900">Email :</span>{' '}
                {deleteTarget.email}
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
                onClick={handleDeleteAdmin}
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

// 2. Admins Roles View (Matching Images 1, 2, 3, 4, 5)
export interface PermissionItem {
  id: number;
  name: string;
  description: string;
  checked: boolean;
}

export interface AdminRoleRecord {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
  permissions: PermissionItem[];
}

export const AdminRolesView: React.FC<AdminViewsProps> = ({ onNavigate, roleId }) => {
  const { notify } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [activePage, setActivePage] = useState<number>(1);
  const [sortAsc, setSortAsc] = useState(false);

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    id: true,
    name: true,
    updatedAt: true,
    createdAt: true,
    actions: true,
  });

  const roleColumns: ColumnItem[] = [
    { key: 'id', label: 'Admin Role Id' },
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

  // Initial roles matching Image 1 exactly
  const [roles, setRoles] = useState<AdminRoleRecord[]>([
    {
      id: 11,
      name: 'Demo',
      updatedAt: 'None',
      createdAt: '04/08/2026 9:00 PM',
      permissions: [
        { id: 1, name: 'View Dashboard', description: '--', checked: true },
        { id: 2, name: 'Manage Dashboard', description: '--', checked: false },
        { id: 3, name: 'View Admins', description: '--', checked: true },
        { id: 4, name: 'Manage Admins', description: '--', checked: false },
        { id: 5, name: 'View Staffs', description: '--', checked: true },
        { id: 6, name: 'Manage Staffs', description: '--', checked: false },
        { id: 7, name: 'View Settings', description: '--', checked: true },
        { id: 8, name: 'Manage Settings', description: '--', checked: false },
      ],
    },
    {
      id: 10,
      name: 'Developer',
      updatedAt: '21/05/2026 2:11 PM',
      createdAt: '02/12/2024 1:41 PM',
      permissions: [
        { id: 1, name: 'View Dashboard', description: '--', checked: true },
        { id: 2, name: 'Manage Dashboard', description: '--', checked: true },
        { id: 3, name: 'View Admins', description: '--', checked: true },
        { id: 4, name: 'Manage Admins', description: '--', checked: true },
        { id: 5, name: 'View Staffs', description: '--', checked: true },
        { id: 6, name: 'Manage Staffs', description: '--', checked: true },
        { id: 7, name: 'View Settings', description: '--', checked: true },
        { id: 8, name: 'Manage Settings', description: '--', checked: true },
      ],
    },
    {
      id: 1,
      name: 'Owner',
      updatedAt: 'None',
      createdAt: '01/01/1970 5:30 AM',
      permissions: [
        { id: 1, name: 'View Dashboard', description: '--', checked: true },
        { id: 2, name: 'Manage Dashboard', description: '--', checked: true },
        { id: 3, name: 'View Admins', description: '--', checked: true },
        { id: 4, name: 'Manage Admins', description: '--', checked: true },
        { id: 5, name: 'View Staffs', description: '--', checked: true },
        { id: 6, name: 'Manage Staffs', description: '--', checked: true },
        { id: 7, name: 'View Settings', description: '--', checked: true },
        { id: 8, name: 'Manage Settings', description: '--', checked: true },
      ],
    },
  ]);

  // Sub-view: Role Permissions View (Image 2)
  const [selectedRoleForPermissions, setSelectedRoleForPermissions] = useState<AdminRoleRecord | null>(null);

  const activeRole = React.useMemo(() => {
    if (roleId !== undefined && roleId !== null) {
      const match = roles.find((r) => String(r.id) === String(roleId));
      if (match) return match;
      return {
        id: Number(roleId) || 11,
        name: String(roleId) === '11' ? 'Demo' : `Role #${roleId}`,
        updatedAt: 'None',
        createdAt: 'Recent',
        permissions: [
          { id: 1, name: 'View Dashboard', description: '--', checked: true },
          { id: 2, name: 'Manage Dashboard', description: '--', checked: false },
          { id: 3, name: 'View Admins', description: '--', checked: true },
          { id: 4, name: 'Manage Admins', description: '--', checked: false },
          { id: 5, name: 'View Staffs', description: '--', checked: true },
          { id: 6, name: 'Manage Staffs', description: '--', checked: false },
          { id: 7, name: 'View Settings', description: '--', checked: true },
          { id: 8, name: 'Manage Settings', description: '--', checked: false },
        ],
      };
    }
    return selectedRoleForPermissions;
  }, [roleId, roles, selectedRoleForPermissions]);

  // Modals state
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');

  const [updateRoleTarget, setUpdateRoleTarget] = useState<AdminRoleRecord | null>(null);
  const [editRoleName, setEditRoleName] = useState('');

  const [deleteRoleTarget, setDeleteRoleTarget] = useState<AdminRoleRecord | null>(null);

  // Handlers
  const handleOpenUpdateModal = (role: AdminRoleRecord) => {
    setUpdateRoleTarget(role);
    setEditRoleName(role.name);
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

    setRoles(
      roles.map((r) =>
        r.id === updateRoleTarget.id
          ? { ...r, name: editRoleName.trim(), updatedAt: formatted }
          : r
      )
    );
    setUpdateRoleTarget(null);
    notify({
      type: 'success',
      title: 'Action Done',
      message: `Admin role "${editRoleName.trim()}" updated successfully.`,
    });
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

    const newId = roles.length > 0 ? Math.max(...roles.map((r) => r.id)) + 1 : 1;
    const newRoleItem: AdminRoleRecord = {
      id: newId,
      name: newRoleName.trim(),
      updatedAt: 'None',
      createdAt: formatted,
      permissions: [
        { id: 1, name: 'View Dashboard', description: '--', checked: true },
        { id: 2, name: 'Manage Dashboard', description: '--', checked: false },
        { id: 3, name: 'View Admins', description: '--', checked: true },
        { id: 4, name: 'Manage Admins', description: '--', checked: false },
        { id: 5, name: 'View Staffs', description: '--', checked: true },
        { id: 6, name: 'Manage Staffs', description: '--', checked: false },
        { id: 7, name: 'View Settings', description: '--', checked: true },
        { id: 8, name: 'Manage Settings', description: '--', checked: false },
      ],
    };

    setRoles([newRoleItem, ...roles]);
    setShowAddRoleModal(false);
    const createdName = newRoleName.trim();
    setNewRoleName('');
    notify({
      type: 'success',
      title: 'Action Done',
      message: `Admin role "${createdName}" created successfully.`,
    });
  };

  const handleDeleteRole = () => {
    if (!deleteRoleTarget) return;
    const deletedName = deleteRoleTarget.name;
    setRoles(roles.filter((r) => r.id !== deleteRoleTarget.id));
    setDeleteRoleTarget(null);
    notify({
      type: 'success',
      title: 'Action Done',
      message: `Admin role "${deletedName}" deleted successfully.`,
    });
  };

  const togglePermissionCheck = (permId: number) => {
    if (!activeRole) return;
    const updatedPermissions = activeRole.permissions.map((p) =>
      p.id === permId ? { ...p, checked: !p.checked } : p
    );
    const updatedRole = { ...activeRole, permissions: updatedPermissions };
    setSelectedRoleForPermissions(updatedRole);
    setRoles(roles.map((r) => (r.id === updatedRole.id ? updatedRole : r)));
  };

  // Filtered and sorted roles
  const filteredRoles = roles
    .filter(
      (r) =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(r.id).includes(searchTerm)
    )
    .sort((a, b) => (sortAsc ? a.id - b.id : b.id - a.id));

  const totalRoles = filteredRoles.length;
  const totalRolePages = Math.max(1, Math.ceil(totalRoles / rowsPerPage));
  const paginatedRoles = filteredRoles.slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );

  // If a role's permissions are being viewed, render the exact screen from Image 2
  if (activeRole) {
    return (
      <div className="space-y-4">
        {/* Header & Breadcrumb (Image 2: Demo Permissions / Home > Admin Roles > Permissions) */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0e3a6a] tracking-tight">
            {activeRole.name} Permissions
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('admins-roles');
                } else {
                  setSelectedRoleForPermissions(null);
                }
              }}
              className="hover:text-slate-600 cursor-pointer"
            >
              Home
            </button>
            <span>&gt;</span>
            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('admins-roles');
                } else {
                  setSelectedRoleForPermissions(null);
                }
              }}
              className="hover:text-slate-600 cursor-pointer"
            >
              Admin Roles
            </button>
            <span>&gt;</span>
            <span className="text-slate-500 font-medium">Permissions</span>
          </div>
        </div>

        {/* Main Permissions Card */}
        <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 p-6 sm:p-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold text-slate-600">
                  <th className="py-3 px-4 w-24">Id</th>
                  <th className="py-3 px-4 w-32">Checks</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4 text-right">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {activeRole.permissions.map((perm) => (
                  <tr
                    key={perm.id}
                    onClick={() => togglePermissionCheck(perm.id)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-normal text-slate-700">{perm.id}</td>
                    <td className="py-3.5 px-4">
                      {perm.checked ? (
                        <div className="w-4.5 h-4.5 rounded-full bg-[#1d6bf3] flex items-center justify-center text-white shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-4.5 h-4.5 rounded-full border border-slate-300 bg-white group-hover:border-slate-400 transition-colors" />
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-normal text-slate-800">{perm.name}</td>
                    <td className="py-3.5 px-4 text-right font-normal text-slate-400">
                      {perm.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Button matching Image 2: < Go Back (Black pill button below table) */}
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => {
              if (onNavigate) {
                onNavigate('admins-roles');
              } else {
                setSelectedRoleForPermissions(null);
              }
            }}
            className="bg-black hover:bg-slate-800 text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }

  // Main Admin Roles View matching Image 1
  return (
    <div className="space-y-4">
      {/* Header & Breadcrumb (Image 1: Admin Roles / Home > Admin Roles) */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0e3a6a] tracking-tight">
          Admin Roles
        </h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
          <span>Home</span>
          <span>&gt;</span>
          <span className="text-slate-500 font-medium">Admin Roles</span>
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
              placeholder="Search by Admin Id , Admin Name"
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

            {/* Add New + Button matching Image 1 */}
            <button
              onClick={() => setShowAddRoleModal(true)}
              className="px-4 py-2 bg-black hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <span>Add New</span>
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Sub-bar: Total items and Rows per page */}
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

        {/* Table matching Image 1 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-600">
                {visibleColumns.id && (
                  <th
                    onClick={() => setSortAsc(!sortAsc)}
                    className="py-3 px-3 cursor-pointer hover:text-slate-900 select-none"
                  >
                    <div className="flex items-center gap-1">
                      <span>Admin Role Id</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
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
                    <td className="py-3.5 px-3 font-normal text-slate-800">{role.id}</td>
                  )}
                  {visibleColumns.name && (
                    <td className="py-3.5 px-3 font-normal text-slate-800">{role.name}</td>
                  )}
                  {visibleColumns.updatedAt && (
                    <td className="py-3.5 px-3 text-slate-600">{role.updatedAt}</td>
                  )}
                  {visibleColumns.createdAt && (
                    <td className="py-3.5 px-3 text-slate-600">{role.createdAt}</td>
                  )}
                  {visibleColumns.actions && (
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {/* View Permissions blue button */}
                        <button
                          type="button"
                          onClick={() => {
                            if (onNavigate) {
                              onNavigate('admin-role-permission', { roleId: role.id });
                            } else {
                              setSelectedRoleForPermissions(role);
                            }
                          }}
                          className="bg-[#1d6bf3] hover:bg-blue-600 text-white text-xs font-medium px-3.5 py-1.5 rounded-md transition-colors cursor-pointer shadow-xs"
                        >
                          View Permissions
                        </button>

                        {/* Edit button */}
                        <button
                          onClick={() => handleOpenUpdateModal(role)}
                          className="text-slate-400 hover:text-slate-700 text-xs font-medium flex items-center gap-1 px-1.5 py-1 rounded transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 stroke-[2]" />
                          <span>Edit</span>
                        </button>

                        {/* Delete button */}
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

      {/* MODAL 1: Add New Admin Role (Image 5 Replica) */}
      {showAddRoleModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Add New Admin Role</h3>
              <button
                onClick={() => setShowAddRoleModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="space-y-4 text-xs sm:text-sm">
              <div className="rounded-xl border border-slate-200 px-3.5 py-2.5 focus-within:border-blue-500 transition-colors">
                <label className="block text-[11px] font-medium text-slate-500 mb-0.5">
                  Role Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name here"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="w-full text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                  required
                  autoFocus
                />
              </div>

              {/* Action buttons: Close (pink) and Submit (green) */}
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

      {/* MODAL 2: Update Admin Role #11 (Image 3 Replica) */}
      {updateRoleTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Update Admin Role #{updateRoleTarget.id}
              </h3>
              <button
                onClick={() => setUpdateRoleTarget(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateRole} className="space-y-4 text-xs sm:text-sm">
              <div className="rounded-xl border border-slate-200 px-3.5 py-2.5 focus-within:border-blue-500 transition-colors">
                <label className="block text-[11px] font-medium text-slate-500 mb-0.5">
                  Role Name
                </label>
                <input
                  type="text"
                  value={editRoleName}
                  onChange={(e) => setEditRoleName(e.target.value)}
                  className="w-full text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                  required
                  autoFocus
                />
              </div>

              {/* Action buttons: Close (pink) and Submit (green) */}
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

      {/* MODAL 3: Delete Admin Role #11 (Image 4 Replica) */}
      {deleteRoleTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Delete Admin Role #{deleteRoleTarget.id}
              </h3>
              <button
                onClick={() => setDeleteRoleTarget(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-2 text-xs sm:text-sm">
              <p className="text-slate-800">
                Role Name: {deleteRoleTarget.name}
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

// 3. Admin Action Log View (Image 2 Replica)
export const AdminActionLogView: React.FC<AdminViewsProps> = ({ onNavigate, adminId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [activePage, setActivePage] = useState(1);
  const [selectedLogForDetails, setSelectedLogForDetails] = useState<any | null>(null);

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin_action_log_columns');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // ignore
        }
      }
    }
    return {
      adminLogId: true,
      adminId: true,
      adminName: true,
      actionType: true,
      message: true,
      createdAt: true,
      actions: true,
    };
  });

  const logColumns: ColumnItem[] = [
    { key: 'adminLogId', label: 'adminLogId' },
    { key: 'adminId', label: 'adminId' },
    { key: 'adminName', label: 'Admin Name' },
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
        localStorage.setItem('admin_action_log_columns', JSON.stringify(next));
      }
      return next;
    });
  };

  // Exact data from Image 2
  const logs: (AdminActionLogItem & { adminId?: number })[] = [
    {
      id: 1,
      adminId: 1,
      adminName: 'Demo Admin',
      actionType: 'authentication',
      message: 'Logged in',
      createdAt: '20/09/2026 1:46 PM',
    },
    {
      id: 2,
      adminId: 1,
      adminName: 'Demo Admin',
      actionType: 'authentication',
      message: 'Logged in',
      createdAt: '18/09/2026 3:01 PM',
    },
    {
      id: 3,
      adminId: 1,
      adminName: 'Demo Admin',
      actionType: 'authentication',
      message: 'Logged in',
      createdAt: '17/09/2026 9:58 PM',
    },
    {
      id: 4,
      adminId: 1,
      adminName: 'Demo Admin',
      actionType: 'authentication',
      message: 'Logged in',
      createdAt: '17/09/2026 6:06 PM',
    },
    {
      id: 5,
      adminId: 1,
      adminName: 'Demo Admin',
      actionType: 'authentication',
      message: 'Logged in',
      createdAt: '14/09/2026 11:07 AM',
    },
    {
      id: 6,
      adminId: 2,
      adminName: 'DigiCroz Devs',
      actionType: 'authentication',
      message: 'Logged in',
      createdAt: '12/09/2026 7:28 PM',
    },
    {
      id: 7,
      adminId: 2,
      adminName: 'DigiCroz Devs',
      actionType: 'staffCrud',
      message: 'Staff Games Access:1-50 created.',
      createdAt: '09/09/2026 12:01 PM',
    },
    {
      id: 8,
      adminId: 2,
      adminName: 'DigiCroz Devs',
      actionType: 'authentication',
      message: 'Logged in',
      createdAt: '09/09/2026 12:01 PM',
    },
    {
      id: 9,
      adminId: 2,
      adminName: 'DigiCroz Devs',
      actionType: 'settingCrud',
      message: 'AI API Config ID: 3 (gemini-3.6-flash) updated.',
      createdAt: '08/09/2026 10:56 AM',
    },
    {
      id: 10,
      adminId: 2,
      adminName: 'DigiCroz Devs',
      actionType: 'settingCrud',
      message: 'AI API Config ID: 3 (gemini-3.6-flash) updated.',
      createdAt: '08/09/2026 10:56 AM',
    },
  ];

  const filteredLogs = logs.filter((l) => {
    if (adminId && String(l.adminId) !== String(adminId)) {
      return false;
    }
    return (
      l.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      {/* Header & Breadcrumb (Image 2: Admin Action Log / Home > Admin Action Log) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0e3a6a] tracking-tight">
            {adminId ? `Admin #${adminId} Action Log` : 'Admin Action Log'}
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
            <button onClick={() => onNavigate?.('dashboard')} className="hover:text-slate-600 cursor-pointer">
              Home
            </button>
            <span>&gt;</span>
            <button onClick={() => onNavigate?.('admins')} className="hover:text-slate-600 cursor-pointer">
              Admins
            </button>
            <span>&gt;</span>
            <span className="text-slate-500 font-medium">
              {adminId ? `Admin #${adminId} Logs` : 'Admin Action Log'}
            </span>
          </div>
        </div>

        {adminId && (
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-200/60">
              Filtered for Admin #{adminId}
            </span>
            <button
              onClick={() => onNavigate?.('admin-action-log')}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer"
            >
              View All Logs
            </button>
          </div>
        )}
      </div>

      {/* Main Table Card */}
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
          <span>Total {totalLogs} items</span>
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
                {visibleColumns.adminLogId && <th className="py-3 px-3">adminLogId</th>}
                {visibleColumns.adminId && <th className="py-3 px-3">adminId</th>}
                {visibleColumns.adminName && <th className="py-3 px-3">Admin Name</th>}
                {visibleColumns.actionType && <th className="py-3 px-3">Action Type</th>}
                {visibleColumns.message && <th className="py-3 px-3">Message</th>}
                {visibleColumns.createdAt && <th className="py-3 px-3">Created At</th>}
                {visibleColumns.actions && <th className="py-3 px-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {paginatedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                  {visibleColumns.adminLogId && (
                    <td className="py-3.5 px-3 font-semibold text-slate-800 font-mono text-xs">
                      {log.id}
                    </td>
                  )}
                  {visibleColumns.adminId && (
                    <td className="py-3.5 px-3 font-semibold text-slate-600 font-mono text-xs">
                      #{log.adminId || 1}
                    </td>
                  )}
                  {visibleColumns.adminName && (
                    <td className="py-3.5 px-3 font-medium text-slate-800">{log.adminName}</td>
                  )}
                  {visibleColumns.actionType && (
                    <td className="py-3.5 px-3 text-slate-600">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        {log.actionType}
                      </span>
                    </td>
                  )}
                  {visibleColumns.message && (
                    <td className="py-3.5 px-3 text-slate-700 max-w-[280px] truncate" title={log.message}>
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
                  Admin Log Details #{selectedLogForDetails.id}
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
                  <span className="text-slate-400 font-medium">adminLogId</span>
                  <span className="font-mono font-semibold text-slate-800">{selectedLogForDetails.id}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">adminId</span>
                  <span className="font-mono font-semibold text-slate-700">#{selectedLogForDetails.adminId || 1}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Admin Name</span>
                  <span className="font-medium text-slate-800">{selectedLogForDetails.adminName}</span>
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

