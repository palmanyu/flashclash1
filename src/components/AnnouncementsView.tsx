import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  X,
} from 'lucide-react';
import { ColumnsDropdown, ColumnItem } from './ColumnsDropdown';
import { RowsPerPageDropdown } from './RowsPerPageDropdown';
import { useNotification } from '../context/NotificationContext';
import { AdminView } from '../types';

export interface AnnouncementRecord {
  announcementId: number;
  message: string;
  onClickLink: string | null;
  updatedAt: string;
  createdAt: string;
}

const INITIAL_ANNOUNCEMENTS: AnnouncementRecord[] = [
  {
    announcementId: 20,
    message: `FOR PRIVATE CONTEST :-

. JO TOURNAMENT ME RULES HAI WAHI PRIVATE CONTEST ME RULES RHENGE (NO CHANGES)
. GRENADE NOT ALLOWED | ANY SPECIFIC GUN ALSO NOT ALLOWED | LONE WOLF LIMITED AMMO YES/NO BOTH ARE ACCEPTED

AFTER WINNING ANY MATCH IN PRIVATE CONTEST PLEASE UPLOAD WINNING SCREENSHOT AND GIVE PRIVATE CONTEST SCREENSHOT TO TELEGRAM CUSTOMER SUPPORT FOR FAST SERVICE OF YOUR WINNINGS !!

TELEGRAM ID - @gamerivalfeedback`,
    onClickLink: 'https://tourneyfarm.com',
    updatedAt: 'N/A\nN/A',
    createdAt: '28/06/2026\n4:11 PM',
  },
  {
    announcementId: 21,
    message: 'Msg Twos',
    onClickLink: null,
    updatedAt: 'N/A\nN/A',
    createdAt: '28/06/2026\n4:55 PM',
  },
  {
    announcementId: 22,
    message: 'add',
    onClickLink: 'Null',
    updatedAt: 'N/A\nN/A',
    createdAt: '28/06/2026\n4:44 PM',
  },
  {
    announcementId: 23,
    message: 'message',
    onClickLink: null,
    updatedAt: 'N/A\nN/A',
    createdAt: '05/07/2026\n1:38 PM',
  },
  {
    announcementId: 24,
    message: 'adding',
    onClickLink: 'https://tourneyfarm.com',
    updatedAt: 'N/A\nN/A',
    createdAt: '28/06/2026\n4:57 PM',
  },
  {
    announcementId: 25,
    message: 'i will give acces of my link',
    onClickLink: 'Null',
    updatedAt: 'N/A\nN/A',
    createdAt: '05/07/2026\n1:37 PM',
  },
];

interface AnnouncementsViewProps {
  onNavigate?: (view: AdminView) => void;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({ onNavigate }) => {
  const { notify } = useNotification();
  const [announcements, setAnnouncements] =
    useState<AnnouncementRecord[]>(INITIAL_ANNOUNCEMENTS);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addMessage, setAddMessage] = useState('');
  const [addSetLink, setAddSetLink] = useState(false);
  const [addOnClickLink, setAddOnClickLink] = useState('');

  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    announcement: AnnouncementRecord | null;
    message: string;
    setLink: boolean;
    onClickLink: string;
  }>({
    isOpen: false,
    announcement: null,
    message: '',
    setLink: false,
    onClickLink: '',
  });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    announcement: AnnouncementRecord | null;
  }>({
    isOpen: false,
    announcement: null,
  });

  // Columns definition
  const columnDefs: ColumnItem[] = [
    { key: 'announcementId', label: 'Announcement Id' },
    { key: 'message', label: 'Message' },
    { key: 'onClickLink', label: 'On Click Link' },
    { key: 'updatedAt', label: 'Updated At' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'actions', label: 'Actions' },
  ];

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    announcementId: true,
    message: true,
    onClickLink: true,
    updatedAt: true,
    createdAt: true,
    actions: true,
  });

  // Filtered and sorted
  const filtered = useMemo(() => {
    let result = [...announcements];
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (a) =>
          String(a.announcementId).includes(q) ||
          a.message.toLowerCase().includes(q) ||
          (a.onClickLink && a.onClickLink.toLowerCase().includes(q))
      );
    }
    result.sort((a, b) =>
      sortAsc
        ? a.announcementId - b.announcementId
        : b.announcementId - a.announcementId
    );
    return result;
  }, [announcements, search, sortAsc]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, currentPage, rowsPerPage]);

  // Handle Add
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addMessage.trim()) {
      notify({ message: 'Please enter announcement message', type: 'warning' });
      return;
    }
    const newId =
      Math.max(...announcements.map((a) => a.announcementId), 0) + 1;
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()}\n${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    const newRecord: AnnouncementRecord = {
      announcementId: newId,
      message: addMessage.trim(),
      onClickLink: addSetLink && addOnClickLink.trim() ? addOnClickLink.trim() : null,
      updatedAt: 'N/A\nN/A',
      createdAt: formattedDate,
    };

    setAnnouncements((prev) => [...prev, newRecord]);
    notify({
      message: `Announcement #${newId} added successfully`,
      type: 'success',
    });
    setAddMessage('');
    setAddSetLink(false);
    setAddOnClickLink('');
    setAddModalOpen(false);
  };

  // Handle Edit Open
  const handleOpenEdit = (a: AnnouncementRecord) => {
    const hasLink = Boolean(a.onClickLink && a.onClickLink !== 'Null');
    setEditModal({
      isOpen: true,
      announcement: a,
      message: a.message,
      setLink: hasLink,
      onClickLink: hasLink ? (a.onClickLink as string) : '',
    });
  };

  // Handle Edit Submit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModal.announcement) return;
    const id = editModal.announcement.announcementId;
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()}\n${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    setAnnouncements((prev) =>
      prev.map((a) =>
        a.announcementId === id
          ? {
              ...a,
              message: editModal.message,
              onClickLink:
                editModal.setLink && editModal.onClickLink.trim()
                  ? editModal.onClickLink.trim()
                  : null,
              updatedAt: formattedDate,
            }
          : a
      )
    );

    notify({
      message: `Announcement #${id} updated successfully`,
      type: 'success',
    });
    setEditModal({
      isOpen: false,
      announcement: null,
      message: '',
      setLink: false,
      onClickLink: '',
    });
  };

  // Handle Delete
  const handleDeleteConfirm = () => {
    if (!deleteModal.announcement) return;
    const id = deleteModal.announcement.announcementId;
    setAnnouncements((prev) => prev.filter((a) => a.announcementId !== id));
    notify({
      message: `Announcement #${id} deleted`,
      type: 'success',
    });
    setDeleteModal({ isOpen: false, announcement: null });
  };

  return (
    <div className="space-y-4">
      {/* Title & Breadcrumbs (Image 1) */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Announcements
        </h2>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
          <span
            onClick={() => onNavigate?.('dashboard')}
            className="hover:text-gray-700 cursor-pointer"
          >
            Home
          </span>
          <span>&gt;</span>
          <span className="hover:text-gray-700 cursor-pointer">Notify</span>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">Announcements</span>
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
              placeholder="Search by AnnouncementId , Message"
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

            <button
              type="button"
              onClick={() => setAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-2xs transition-colors cursor-pointer"
            >
              <span>Add New</span>
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Sub-bar: Total Items & Rows per page */}
        <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
          <div>Total {filtered.length} Items</div>
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
                {visibleColumns.announcementId && (
                  <th
                    className="px-4 py-3.5 cursor-pointer select-none"
                    onClick={() => setSortAsc((p) => !p)}
                  >
                    <div className="flex items-center gap-1">
                      <span>Announcement Id</span>
                      {sortAsc ? (
                        <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                      )}
                    </div>
                  </th>
                )}
                {visibleColumns.message && (
                  <th className="px-4 py-3.5 min-w-[280px]">Message</th>
                )}
                {visibleColumns.onClickLink && (
                  <th className="px-4 py-3.5">On Click Link</th>
                )}
                {visibleColumns.updatedAt && (
                  <th className="px-4 py-3.5">Updated At</th>
                )}
                {visibleColumns.createdAt && (
                  <th className="px-4 py-3.5">Created At</th>
                )}
                {visibleColumns.actions && (
                  <th className="px-4 py-3.5 text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {paginatedData.map((a) => (
                <tr
                  key={a.announcementId}
                  className="hover:bg-gray-50/70 transition-colors align-top"
                >
                  {visibleColumns.announcementId && (
                    <td className="px-4 py-3.5 font-medium text-gray-900">
                      {a.announcementId}
                    </td>
                  )}
                  {visibleColumns.message && (
                    <td className="px-4 py-3.5 text-gray-800 text-[11px] leading-relaxed whitespace-pre-line max-w-xl">
                      {a.message}
                    </td>
                  )}
                  {visibleColumns.onClickLink && (
                    <td className="px-4 py-3.5 text-gray-600 text-[11px]">
                      {a.onClickLink ? (
                        <span className="text-blue-600 font-mono break-all">
                          {a.onClickLink}
                        </span>
                      ) : (
                        <span className="text-gray-400">Null</span>
                      )}
                    </td>
                  )}
                  {visibleColumns.updatedAt && (
                    <td className="px-4 py-3.5 text-gray-400 font-mono text-[11px] whitespace-pre-line">
                      {a.updatedAt}
                    </td>
                  )}
                  {visibleColumns.createdAt && (
                    <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px] whitespace-pre-line">
                      {a.createdAt}
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="px-4 py-3.5 text-right">
                      <div className="inline-flex items-center gap-3">
                        {/* Edit with pencil icon (Image 1) */}
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(a)}
                          className="flex items-center gap-1 text-gray-500 hover:text-gray-800 font-medium cursor-pointer transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        {/* Delete with pink trash icon (Image 1) */}
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteModal({ isOpen: true, announcement: a })
                          }
                          className="flex items-center gap-1 text-[#e91e63] hover:text-[#c2185b] font-medium cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

        {/* Pagination: < 1 > */}
        <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-start gap-1.5">
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
            className="w-7 h-7 rounded-md bg-black text-white text-xs font-semibold flex items-center justify-center cursor-default"
          >
            1
          </button>
          <button
            type="button"
            disabled={true}
            className="p-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODAL: Add New Announcement (Image 4)                        */}
      {/* ============================================================ */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">
                Add New Announcement
              </h3>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              {/* Message */}
              <div className="border border-gray-900 rounded-xl p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <label className="block text-[11px] text-gray-500 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={addMessage}
                  onChange={(e) => setAddMessage(e.target.value)}
                  placeholder="Enter Message here"
                  required
                  className="w-full text-xs text-gray-900 outline-none bg-transparent resize-none placeholder-gray-400"
                  autoFocus
                />
              </div>

              {/* Set On Click Link Toggle */}
              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setAddSetLink(!addSetLink)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200 ease-in-out ${
                    addSetLink ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
                <span className="text-xs font-medium text-gray-700 select-none">
                  Set On Click Link
                </span>
              </div>

              {/* Conditional On Click Link Field */}
              {addSetLink && (
                <div className="border border-gray-300 rounded-xl p-3 focus-within:border-blue-500">
                  <label className="block text-[11px] text-gray-500 mb-0.5">
                    On Click Link
                  </label>
                  <input
                    type="url"
                    value={addOnClickLink}
                    onChange={(e) => setAddOnClickLink(e.target.value)}
                    placeholder="https://tourneyfarm.com"
                    className="w-full text-xs text-gray-900 outline-none bg-transparent"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
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

      {/* ============================================================ */}
      {/* MODAL: Update Announcement (Image 2)                         */}
      {/* ============================================================ */}
      {editModal.isOpen && editModal.announcement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">
                Update Announcement #{editModal.announcement.announcementId}
              </h3>
              <button
                type="button"
                onClick={() =>
                  setEditModal({
                    isOpen: false,
                    announcement: null,
                    message: '',
                    setLink: false,
                    onClickLink: '',
                  })
                }
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              {/* Message */}
              <div className="border border-gray-900 rounded-xl p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <label className="block text-[11px] text-gray-500 mb-1">
                  Message
                </label>
                <textarea
                  rows={6}
                  value={editModal.message}
                  onChange={(e) =>
                    setEditModal((prev) => ({ ...prev, message: e.target.value }))
                  }
                  required
                  className="w-full text-xs text-gray-900 outline-none bg-transparent resize-none leading-relaxed"
                />
              </div>

              {/* Set On Click Link Toggle */}
              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    setEditModal((prev) => ({
                      ...prev,
                      setLink: !prev.setLink,
                    }))
                  }
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200 ease-in-out ${
                    editModal.setLink ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
                <span className="text-xs font-medium text-gray-700 select-none">
                  Set On Click Link
                </span>
              </div>

              {/* Conditional On Click Link Field */}
              {editModal.setLink && (
                <div className="border border-gray-300 rounded-xl p-3 focus-within:border-blue-500">
                  <label className="block text-[11px] text-gray-500 mb-0.5">
                    On Click Link
                  </label>
                  <input
                    type="text"
                    value={editModal.onClickLink}
                    onChange={(e) =>
                      setEditModal((prev) => ({
                        ...prev,
                        onClickLink: e.target.value,
                      }))
                    }
                    placeholder="https://tourneyfarm.com"
                    className="w-full text-xs text-gray-900 outline-none bg-transparent"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setEditModal({
                      isOpen: false,
                      announcement: null,
                      message: '',
                      setLink: false,
                      onClickLink: '',
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

      {/* ============================================================ */}
      {/* MODAL: Delete Announcement (Image 3)                         */}
      {/* ============================================================ */}
      {deleteModal.isOpen && deleteModal.announcement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">
                Delete Announcement #{deleteModal.announcement.announcementId}
              </h3>
              <button
                type="button"
                onClick={() =>
                  setDeleteModal({ isOpen: false, announcement: null })
                }
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-gray-700">
              <p className="font-medium text-gray-600">
                Are you Sure for Delete Following ?
              </p>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-800 text-[11px] leading-relaxed max-h-40 overflow-y-auto whitespace-pre-line">
                <span className="font-bold text-gray-900">Message : </span>
                {deleteModal.announcement.message}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() =>
                  setDeleteModal({ isOpen: false, announcement: null })
                }
                className="px-5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#e91e63] hover:bg-[#c2185b] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
