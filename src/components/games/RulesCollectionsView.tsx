import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Trash2,
  X,
} from 'lucide-react';
import { ColumnsDropdown, ColumnItem } from '../ColumnsDropdown';
import { RowsPerPageDropdown } from '../RowsPerPageDropdown';
import { useNotification } from '../../context/NotificationContext';
import { GameRecord } from './types';
import {
  navigateToPath,
  buildRulesUrl,
  buildRulesCollectionsUrl,
} from '../../utils/navigation';

export interface RulesCollectionItem {
  rulesCollectionId: number;
  name: string;
  createdAt: string;
}

export interface RuleItem {
  ruleId: number;
  rulesCollectionId: number;
  ruleText: string;
  createdAt: string;
}

interface RulesCollectionsViewProps {
  game: GameRecord | null;
  onBack: () => void;
  initialMode?: 'collections' | 'rules';
  initialCollectionId?: number;
}

const INITIAL_RULES: RuleItem[] = [
  {
    ruleId: 101,
    rulesCollectionId: 48,
    ruleText: 'Only mobile players are allowed. Emulators/PC are strictly prohibited.',
    createdAt: '02/12/2024\n8:48 PM',
  },
  {
    ruleId: 102,
    rulesCollectionId: 48,
    ruleText: 'Team up / Teaming with enemies will result in permanent ban without refund.',
    createdAt: '02/12/2024\n8:50 PM',
  },
  {
    ruleId: 103,
    rulesCollectionId: 48,
    ruleText: 'Room ID & Password will be shared 15 minutes before match start time.',
    createdAt: '02/12/2024\n8:52 PM',
  },
  {
    ruleId: 104,
    rulesCollectionId: 48,
    ruleText: 'Hacking, Scripting, or Glitch abuse results in immediate disqualification.',
    createdAt: '02/12/2024\n8:55 PM',
  },
  {
    ruleId: 105,
    rulesCollectionId: 48,
    ruleText: 'Screenshot of end game result must be uploaded within 10 minutes.',
    createdAt: '02/12/2024\n8:58 PM',
  },
];

export const RulesCollectionsView: React.FC<RulesCollectionsViewProps> = ({
  game,
  onBack,
  initialMode,
  initialCollectionId,
}) => {
  const { notify } = useNotification();

  // Mode: 'collections' or 'rules' (Image 1 vs Image 4)
  const [activeMode, setActiveMode] = useState<'collections' | 'rules'>(() => initialMode || 'collections');
  const [selectedCollection, setSelectedCollection] = useState<RulesCollectionItem | null>(null);

  // Collections Data (Image 1)
  const [collections, setCollections] = useState<RulesCollectionItem[]>([
    {
      rulesCollectionId: 48,
      name: 'Default Rules Collection',
      createdAt: '02/12/2024\n8:48 PM',
    },
  ]);

  // Synchronize when route updates mode or collection ID
  React.useEffect(() => {
    if (initialMode === 'rules') {
      setActiveMode('rules');
      const targetId = initialCollectionId || 48;
      const found = collections.find((c) => c.rulesCollectionId === targetId) || collections[0];
      setSelectedCollection(found || null);
    } else if (initialMode === 'collections') {
      setActiveMode('collections');
    }
  }, [initialMode, initialCollectionId, collections]);
  const [collectionSearch, setCollectionSearch] = useState('');
  const [collectionSortAsc, setCollectionSortAsc] = useState(true);
  const [collectionRowsPerPage, setCollectionRowsPerPage] = useState(10);
  const [collectionPage, setCollectionPage] = useState(1);

  // Rules Data (Image 4)
  const [rules, setRules] = useState<RuleItem[]>(INITIAL_RULES);
  const [ruleSearch, setRuleSearch] = useState('');
  const [ruleSortAsc, setRuleSortAsc] = useState(true);
  const [ruleRowsPerPage, setRuleRowsPerPage] = useState(10);
  const [rulePage, setRulePage] = useState(1);

  // Modals state
  const [addCollectionModalOpen, setAddCollectionModalOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const [deleteCollectionModal, setDeleteCollectionModal] = useState<{
    isOpen: boolean;
    collection: RulesCollectionItem | null;
  }>({
    isOpen: false,
    collection: null,
  });

  const [addRuleModalOpen, setAddRuleModalOpen] = useState(false);
  const [newRuleText, setNewRuleText] = useState('');

  const [deleteRuleModal, setDeleteRuleModal] = useState<{
    isOpen: boolean;
    rule: RuleItem | null;
  }>({
    isOpen: false,
    rule: null,
  });

  // Collections Columns
  const collectionColumnDefs: ColumnItem[] = [
    { key: 'rulesCollectionId', label: 'rulesCollectionId' },
    { key: 'name', label: 'Name' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'actions', label: 'ACTIONS' },
  ];
  const [visibleCollectionColumns, setVisibleCollectionColumns] = useState<Record<string, boolean>>({
    rulesCollectionId: true,
    name: true,
    createdAt: true,
    actions: true,
  });

  // Rules Columns
  const ruleColumnDefs: ColumnItem[] = [
    { key: 'ruleId', label: 'ruleId' },
    { key: 'rulesCollectionId', label: 'rulesCollectionId' },
    { key: 'ruleText', label: 'Rule Text' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'actions', label: 'ACTIONS' },
  ];
  const [visibleRuleColumns, setVisibleRuleColumns] = useState<Record<string, boolean>>({
    ruleId: true,
    rulesCollectionId: true,
    ruleText: true,
    createdAt: true,
    actions: true,
  });

  // Filtered Collections
  const filteredCollections = useMemo(() => {
    let result = [...collections];
    if (collectionSearch.trim()) {
      const q = collectionSearch.toLowerCase().trim();
      result = result.filter(
        (c) => String(c.rulesCollectionId).includes(q) || c.name.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) =>
      collectionSortAsc
        ? a.rulesCollectionId - b.rulesCollectionId
        : b.rulesCollectionId - a.rulesCollectionId
    );
    return result;
  }, [collections, collectionSearch, collectionSortAsc]);

  // Filtered Rules
  const filteredRules = useMemo(() => {
    let result = rules.filter(
      (r) => !selectedCollection || r.rulesCollectionId === selectedCollection.rulesCollectionId
    );
    if (ruleSearch.trim()) {
      const q = ruleSearch.toLowerCase().trim();
      result = result.filter(
        (r) => String(r.ruleId).includes(q) || r.ruleText.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) =>
      ruleSortAsc ? a.ruleId - b.ruleId : b.ruleId - a.ruleId
    );
    return result;
  }, [rules, selectedCollection, ruleSearch, ruleSortAsc]);

  // Handlers
  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) {
      notify({ message: 'Please enter rules collection name', type: 'warning' });
      return;
    }
    const newId = Math.max(...collections.map((c) => c.rulesCollectionId), 0) + 1;
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()}\n${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    const newCol: RulesCollectionItem = {
      rulesCollectionId: newId,
      name: newCollectionName.trim(),
      createdAt: formattedDate,
    };
    setCollections((prev) => [newCol, ...prev]);
    notify({ message: 'Rules Collection added successfully', type: 'success' });
    setNewCollectionName('');
    setAddCollectionModalOpen(false);
  };

  const handleDeleteCollection = () => {
    if (!deleteCollectionModal.collection) return;
    const id = deleteCollectionModal.collection.rulesCollectionId;
    setCollections((prev) => prev.filter((c) => c.rulesCollectionId !== id));
    setRules((prev) => prev.filter((r) => r.rulesCollectionId !== id));
    notify({ message: `RulesCollection #${id} deleted`, type: 'success' });
    setDeleteCollectionModal({ isOpen: false, collection: null });
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleText.trim() || !selectedCollection) {
      notify({ message: 'Please enter rule text', type: 'warning' });
      return;
    }
    const newId = Math.max(...rules.map((r) => r.ruleId), 0) + 1;
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()}\n${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    const newRule: RuleItem = {
      ruleId: newId,
      rulesCollectionId: selectedCollection.rulesCollectionId,
      ruleText: newRuleText.trim(),
      createdAt: formattedDate,
    };
    setRules((prev) => [newRule, ...prev]);
    notify({ message: 'Rule added successfully', type: 'success' });
    setNewRuleText('');
    setAddRuleModalOpen(false);
  };

  const handleDeleteRule = () => {
    if (!deleteRuleModal.rule) return;
    const id = deleteRuleModal.rule.ruleId;
    setRules((prev) => prev.filter((r) => r.ruleId !== id));
    notify({ message: `Rule #${id} deleted`, type: 'success' });
    setDeleteRuleModal({ isOpen: false, rule: null });
  };

  // ============================================================
  // VIEW: RULES OF COLLECTION (Image 4)
  // ============================================================
  if (activeMode === 'rules' && selectedCollection) {
    return (
      <div className="space-y-4">
        {/* Title & Breadcrumb */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Rules of Collection ({selectedCollection.rulesCollectionId})
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
            <span
              className="hover:text-gray-700 cursor-pointer"
              onClick={() => {
                setActiveMode('collections');
                if (game) {
                  navigateToPath(buildRulesCollectionsUrl(game.gameId, game.name));
                }
              }}
            >
              Rules Collections
            </span>
            <span>&gt;</span>
            <span className="text-gray-800 font-medium">Rules</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
          {/* Top Bar */}
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={ruleSearch}
                onChange={(e) => {
                  setRuleSearch(e.target.value);
                  setRulePage(1);
                }}
                placeholder="Search by ruleId or Rule Text"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
              />
            </div>

            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              <ColumnsDropdown
                columns={ruleColumnDefs}
                visibleColumns={visibleRuleColumns}
                onToggleColumn={(key) =>
                  setVisibleRuleColumns((prev) => ({ ...prev, [key]: !prev[key] }))
                }
              />

              <button
                type="button"
                onClick={() => setAddRuleModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-2xs transition-colors cursor-pointer"
              >
                <span>Add New</span>
                <Plus className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('collections')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-2xs transition-colors cursor-pointer"
              >
                <span>Go Back</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Total & Rows per page */}
          <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
            <div>Total {filteredRules.length} items</div>
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <RowsPerPageDropdown
                value={ruleRowsPerPage}
                onChange={(v: number) => {
                  setRuleRowsPerPage(v);
                  setRulePage(1);
                }}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[160px]">
            {filteredRules.length === 0 ? (
              <div className="py-16 text-center text-xs text-gray-400">
                No data found
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50/80 text-gray-600 font-semibold border-b border-gray-200">
                  <tr>
                    {visibleRuleColumns.ruleId && (
                      <th
                        className="px-4 py-3.5 cursor-pointer select-none"
                        onClick={() => setRuleSortAsc((p) => !p)}
                      >
                        <div className="flex items-center gap-1">
                          <span>ruleId</span>
                          {ruleSortAsc ? (
                            <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                          )}
                        </div>
                      </th>
                    )}
                    {visibleRuleColumns.rulesCollectionId && (
                      <th className="px-4 py-3.5">rulesCollectionId</th>
                    )}
                    {visibleRuleColumns.ruleText && (
                      <th className="px-4 py-3.5">Rule Text</th>
                    )}
                    {visibleRuleColumns.createdAt && (
                      <th className="px-4 py-3.5">Created At</th>
                    )}
                    {visibleRuleColumns.actions && (
                      <th className="px-4 py-3.5 text-right">ACTIONS</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {filteredRules.map((r) => (
                    <tr key={r.ruleId} className="hover:bg-gray-50/70 transition-colors">
                      {visibleRuleColumns.ruleId && (
                        <td className="px-4 py-3.5 font-medium text-gray-900">{r.ruleId}</td>
                      )}
                      {visibleRuleColumns.rulesCollectionId && (
                        <td className="px-4 py-3.5 text-gray-600">{r.rulesCollectionId}</td>
                      )}
                      {visibleRuleColumns.ruleText && (
                        <td className="px-4 py-3.5 text-gray-900 font-medium">{r.ruleText}</td>
                      )}
                      {visibleRuleColumns.createdAt && (
                        <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px] whitespace-pre-line">
                          {r.createdAt}
                        </td>
                      )}
                      {visibleRuleColumns.actions && (
                        <td className="px-4 py-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => setDeleteRuleModal({ isOpen: true, rule: r })}
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
            )}
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-start gap-2">
            <button
              type="button"
              disabled={rulePage <= 1}
              onClick={() => setRulePage((p) => Math.max(p - 1, 1))}
              className="p-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
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

        {/* MODAL: Add New Rule (Image 5) */}
        {addRuleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-900">Add New Rule</h3>
                <button
                  type="button"
                  onClick={() => setAddRuleModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateRule} className="p-6 space-y-5">
                <div className="border border-gray-900 rounded-xl p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                  <label className="block text-[11px] text-gray-500 mb-1">Rule Text</label>
                  <textarea
                    rows={3}
                    value={newRuleText}
                    onChange={(e) => setNewRuleText(e.target.value)}
                    placeholder="Enter Rule here"
                    className="w-full text-xs text-gray-800 outline-none bg-transparent resize-none"
                    autoFocus
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setAddRuleModalOpen(false)}
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

        {/* MODAL: Delete Rule */}
        {deleteRuleModal.isOpen && deleteRuleModal.rule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-5 border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">Delete Rule</h3>
                <button
                  type="button"
                  onClick={() =>
                    setDeleteRuleModal({ isOpen: false, rule: null })
                  }
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5 text-xs text-gray-700">
                <p className="font-medium text-gray-600">Are you Sure for Delete Following ?</p>
                <p className="font-semibold text-gray-900">
                  Rule Id :{' '}
                  <span className="font-mono">
                    {deleteRuleModal.rule.ruleId}
                  </span>
                </p>
                <p className="text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100 line-clamp-3">
                  {deleteRuleModal.rule.ruleText}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setDeleteRuleModal({ isOpen: false, rule: null })
                  }
                  className="px-5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteRule}
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
  }

  // ============================================================
  // VIEW: RULES COLLECTIONS TABLE (Image 1)
  // ============================================================
  return (
    <div className="space-y-4">
      {/* Title & Breadcrumb */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Rules Collections</h2>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
          <span className="hover:text-gray-700 cursor-pointer" onClick={onBack}>
            Home
          </span>
          <span>&gt;</span>
          <span className="hover:text-gray-700 cursor-pointer" onClick={onBack}>
            Games
          </span>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">Rules Collections</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        {/* Top Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={collectionSearch}
              onChange={(e) => {
                setCollectionSearch(e.target.value);
                setCollectionPage(1);
              }}
              placeholder="Search by rulesCollectionId or Name"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <ColumnsDropdown
              columns={collectionColumnDefs}
              visibleColumns={visibleCollectionColumns}
              onToggleColumn={(key) =>
                setVisibleCollectionColumns((prev) => ({ ...prev, [key]: !prev[key] }))
              }
            />

            <button
              type="button"
              onClick={() => setAddCollectionModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-2xs transition-colors cursor-pointer"
            >
              <span>Add New</span>
              <Plus className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-2xs transition-colors cursor-pointer"
            >
              <span>Go Back</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Total & Rows per page */}
        <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
          <div>Total {filteredCollections.length} items</div>
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <RowsPerPageDropdown
              value={collectionRowsPerPage}
              onChange={(v: number) => {
                setCollectionRowsPerPage(v);
                setCollectionPage(1);
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                {visibleCollectionColumns.rulesCollectionId && (
                  <th
                    className="px-4 py-3.5 cursor-pointer select-none"
                    onClick={() => setCollectionSortAsc((p) => !p)}
                  >
                    <div className="flex items-center gap-1">
                      <span>rulesCollectionId</span>
                      {collectionSortAsc ? (
                        <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                      )}
                    </div>
                  </th>
                )}
                {visibleCollectionColumns.name && <th className="px-4 py-3.5">Name</th>}
                {visibleCollectionColumns.createdAt && <th className="px-4 py-3.5">Created At</th>}
                {visibleCollectionColumns.actions && (
                  <th className="px-4 py-3.5 text-right">ACTIONS</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredCollections.map((col) => (
                <tr key={col.rulesCollectionId} className="hover:bg-gray-50/70 transition-colors">
                  {visibleCollectionColumns.rulesCollectionId && (
                    <td className="px-4 py-3.5 font-medium text-gray-900">
                      {col.rulesCollectionId}
                    </td>
                  )}
                  {visibleCollectionColumns.name && (
                    <td className="px-4 py-3.5 font-semibold text-gray-900">{col.name}</td>
                  )}
                  {visibleCollectionColumns.createdAt && (
                    <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px] whitespace-pre-line">
                      {col.createdAt}
                    </td>
                  )}
                  {visibleCollectionColumns.actions && (
                    <td className="px-4 py-3.5 text-right">
                      <div className="inline-flex items-center gap-4">
                        {/* View Rules with blue diamond icon (Image 1) */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCollection(col);
                            setActiveMode('rules');
                            if (game) {
                              navigateToPath(
                                buildRulesUrl(game.gameId, game.name, col.rulesCollectionId)
                              );
                            }
                          }}
                          className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
                        >
                          <svg
                            className="w-3.5 h-3.5 text-blue-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="2"
                              transform="rotate(45 12 12)"
                            />
                          </svg>
                          <span>View Rules</span>
                        </button>

                        {/* Delete with pink trash icon (Image 1) */}
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteCollectionModal({ isOpen: true, collection: col })
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

        {/* Pagination */}
        <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-start gap-2">
          <button
            type="button"
            disabled={collectionPage <= 1}
            onClick={() => setCollectionPage((p) => Math.max(p - 1, 1))}
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
      {/* MODAL: Add New Rules Collection (Image 3)                    */}
      {/* ============================================================ */}
      {addCollectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Add New Rules Collection</h3>
              <button
                type="button"
                onClick={() => setAddCollectionModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCollection} className="p-6 space-y-5">
              <div className="border border-gray-900 rounded-xl p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <label className="block text-[11px] text-gray-500 mb-1">
                  Rules Collection Name
                </label>
                <input
                  type="text"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="Enter Rules Collection Name here"
                  className="w-full text-xs text-gray-800 outline-none bg-transparent"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAddCollectionModalOpen(false)}
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
      {/* MODAL: Delete RulesCollection (Image 2)                      */}
      {/* ============================================================ */}
      {deleteCollectionModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">Delete RulesCollection</h3>
              <button
                type="button"
                onClick={() =>
                  setDeleteCollectionModal({ isOpen: false, collection: null })
                }
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs text-gray-700">
              <p className="font-medium text-gray-600">Are you Sure for Delete Following ?</p>
              <p className="font-semibold text-gray-900">
                RulesCollection Id :{' '}
                <span className="font-mono">
                  {deleteCollectionModal.collection?.rulesCollectionId}
                </span>
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() =>
                  setDeleteCollectionModal({ isOpen: false, collection: null })
                }
                className="px-5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteCollection}
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
