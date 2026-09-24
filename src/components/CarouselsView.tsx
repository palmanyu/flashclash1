import React, { useState, useMemo, useRef } from 'react';
import {
  Search,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  X,
  Upload,
} from 'lucide-react';
import { ColumnsDropdown, ColumnItem } from './ColumnsDropdown';
import { RowsPerPageDropdown } from './RowsPerPageDropdown';
import { useNotification } from '../context/NotificationContext';
import { AdminView } from '../types';

export interface CarouselRecord {
  carouselId: number;
  bannerUrl: string | null;
  onClickLink: string | null;
  createdAt: string;
}

const INITIAL_CAROUSELS: CarouselRecord[] = [
  {
    carouselId: 12,
    bannerUrl: null,
    onClickLink: null,
    createdAt: '03/12/2024\n6:29 PM',
  },
  {
    carouselId: 14,
    bannerUrl: null,
    onClickLink: null,
    createdAt: '03/12/2024\n7:59 PM',
  },
  {
    carouselId: 15,
    bannerUrl: null,
    onClickLink: null,
    createdAt: '03/12/2024\n8:22 PM',
  },
  {
    carouselId: 16,
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80',
    onClickLink: null,
    createdAt: '03/03/2026\n10:54 PM',
  },
  {
    carouselId: 17,
    bannerUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80',
    onClickLink: null,
    createdAt: '04/03/2026\n1:01 AM',
  },
  {
    carouselId: 18,
    bannerUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=400&q=80',
    onClickLink: null,
    createdAt: '30/04/2026\n10:39 PM',
  },
];

interface CarouselsViewProps {
  onNavigate?: (view: AdminView) => void;
}

export const CarouselsView: React.FC<CarouselsViewProps> = ({ onNavigate }) => {
  const { notify } = useNotification();
  const [carousels, setCarousels] = useState<CarouselRecord[]>(INITIAL_CAROUSELS);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Add modal state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addThumbnail, setAddThumbnail] = useState<string | null>(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [addOnClickLink, setAddOnClickLink] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    carousel: CarouselRecord | null;
  }>({
    isOpen: false,
    carousel: null,
  });

  // Columns definition
  const columnDefs: ColumnItem[] = [
    { key: 'carouselId', label: 'carouselId' },
    { key: 'banner', label: 'Banner' },
    { key: 'onClickLink', label: 'On Click Link' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    carouselId: true,
    banner: true,
    onClickLink: true,
    createdAt: true,
    actions: true,
  });

  // Filtered & sorted
  const filtered = useMemo(() => {
    let result = [...carousels];
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (c) =>
          String(c.carouselId).includes(q) ||
          (c.onClickLink && c.onClickLink.toLowerCase().includes(q))
      );
    }
    result.sort((a, b) =>
      sortAsc ? a.carouselId - b.carouselId : b.carouselId - a.carouselId
    );
    return result;
  }, [carousels, search, sortAsc]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, currentPage, rowsPerPage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAddThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId =
      Math.max(...carousels.map((c) => c.carouselId), 0) + 1;
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()}\n${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    const newRecord: CarouselRecord = {
      carouselId: newId,
      bannerUrl: addThumbnail,
      onClickLink: addOnClickLink.trim() ? addOnClickLink.trim() : null,
      createdAt: formattedDate,
    };

    setCarousels((prev) => [...prev, newRecord]);
    notify({
      message: `Carousel #${newId} created successfully`,
      type: 'success',
    });

    setAddThumbnail(null);
    setFileName('No file chosen');
    setAddOnClickLink('');
    setAddModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!deleteModal.carousel) return;
    const id = deleteModal.carousel.carouselId;
    setCarousels((prev) => prev.filter((c) => c.carouselId !== id));
    notify({
      message: `Carousel #${id} deleted`,
      type: 'success',
    });
    setDeleteModal({ isOpen: false, carousel: null });
  };

  return (
    <div className="space-y-4">
      {/* Title & Breadcrumbs (Image 5) */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Carousels
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
          <span className="text-gray-800 font-medium">Carousels</span>
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
              placeholder="Search by carouselId"
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
                {visibleColumns.carouselId && (
                  <th
                    className="px-4 py-3.5 cursor-pointer select-none"
                    onClick={() => setSortAsc((p) => !p)}
                  >
                    <div className="flex items-center gap-1">
                      <span>carouselId</span>
                      {sortAsc ? (
                        <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                      )}
                    </div>
                  </th>
                )}
                {visibleColumns.banner && (
                  <th className="px-4 py-3.5 min-w-[140px]">Banner</th>
                )}
                {visibleColumns.onClickLink && (
                  <th className="px-4 py-3.5 min-w-[160px]">On Click Link</th>
                )}
                {visibleColumns.createdAt && (
                  <th className="px-4 py-3.5">Created At</th>
                )}
                {visibleColumns.actions && (
                  <th className="px-4 py-3.5 text-right">ACTIONS</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {paginatedData.map((c) => (
                <tr
                  key={c.carouselId}
                  className="hover:bg-gray-50/70 transition-colors align-middle"
                >
                  {visibleColumns.carouselId && (
                    <td className="px-4 py-3.5 font-medium text-gray-900">
                      {c.carouselId}
                    </td>
                  )}
                  {visibleColumns.banner && (
                    <td className="px-4 py-3.5">
                      {c.bannerUrl ? (
                        <div className="w-28 h-14 rounded-lg overflow-hidden border border-gray-200 shadow-2xs bg-black">
                          <img
                            src={c.bannerUrl}
                            alt={`Banner ${c.carouselId}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-28 h-14 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-[11px] font-medium select-none">
                          Banner Not Found
                        </div>
                      )}
                    </td>
                  )}
                  {visibleColumns.onClickLink && (
                    <td className="px-4 py-3.5 text-gray-600 text-[11px]">
                      {c.onClickLink ? (
                        <span className="text-blue-600 font-mono break-all">
                          {c.onClickLink}
                        </span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                  )}
                  {visibleColumns.createdAt && (
                    <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px] whitespace-pre-line">
                      {c.createdAt}
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="px-4 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteModal({ isOpen: true, carousel: c })
                        }
                        className="inline-flex items-center gap-1 text-[#e91e63] hover:text-[#c2185b] font-medium cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
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
      {/* MODAL: Add New Carousel (Image 7)                            */}
      {/* ============================================================ */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">
                Add New Carousel
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
              {/* Carousel Thumbnail */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-700">
                  Carousel Thumbnail
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 bg-[#f3e8ff] hover:bg-[#ebd5ff] text-[#9333ea] border border-[#e9d5ff] rounded-md text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Choose File
                  </button>
                  <span className="text-xs text-gray-500 truncate max-w-[200px]">
                    {fileName}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400">
                  JPG, PNG, GIF or WebP — Max 5 MB
                </p>

                {/* Preview Box */}
                <div className="w-full h-36 mt-2 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
                  {addThumbnail ? (
                    <img
                      src={addThumbnail}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400 font-medium">
                      No thumbnail
                    </span>
                  )}
                </div>
              </div>

              {/* onClickLink (optional) */}
              <div className="border border-gray-300 rounded-xl p-3 focus-within:border-blue-500">
                <label className="block text-[11px] text-gray-500 mb-0.5">
                  onClickLink (optional)
                </label>
                <input
                  type="text"
                  value={addOnClickLink}
                  onChange={(e) => setAddOnClickLink(e.target.value)}
                  placeholder="Enter onClickLink here"
                  className="w-full text-xs text-gray-900 outline-none bg-transparent"
                />
              </div>

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
      {/* MODAL: Delete Carousel (Image 6)                             */}
      {/* ============================================================ */}
      {deleteModal.isOpen && deleteModal.carousel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">
                Delete Carousel
              </h3>
              <button
                type="button"
                onClick={() =>
                  setDeleteModal({ isOpen: false, carousel: null })
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
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-900 font-semibold text-xs">
                <span>Carousel Id : </span>
                <span className="font-bold text-gray-900">
                  {deleteModal.carousel.carouselId}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() =>
                  setDeleteModal({ isOpen: false, carousel: null })
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
