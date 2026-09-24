import React, { useState, useMemo } from 'react';
import {
  Gamepad2,
  Plus,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  Copy,
  Layers,
  ArrowLeft,
  Shield,
  Key,
  Users,
  Trophy,
  Check,
  X,
  Eye,
  Calendar,
  Wallet,
} from 'lucide-react';
import { ColumnsDropdown, ColumnItem } from './ColumnsDropdown';
import { RowsPerPageDropdown } from './RowsPerPageDropdown';
import { useNotification } from '../context/NotificationContext';
import {
  GameRecord,
  ContestRecord,
  ContestStatus,
  RankPrizeItem,
} from './games/types';
import { INITIAL_GAMES, INITIAL_CONTESTS } from './games/mockData';
import { GameModal } from './games/GameModal';
import { ContestFormView } from './games/ContestFormView';
import { ContestJoiningsView } from './games/ContestJoiningsView';
import { ContestResultView } from './games/ContestResultView';
import { ContestRefundView } from './games/ContestRefundView';
import { IdPassModal, StatusModal } from './games/ContestModals';
import { RulesCollectionsView } from './games/RulesCollectionsView';
import {
  AppRoute,
  GamesSubView,
  navigateToPath,
  buildContestsUrl,
  buildRulesCollectionsUrl,
  buildContestJoiningsUrl,
  buildContestDuplicateUrl,
  buildContestUpdateUrl,
  buildMassDuplicateUrl,
  buildCreateContestUrl,
  buildContestResultUrl,
  buildContestRefundUrl,
} from '../utils/navigation';

export interface GamesViewProps {
  route?: AppRoute;
}

export const GamesView: React.FC<GamesViewProps> = ({ route }) => {
  const { notify } = useNotification();

  // Navigation & Sub-views
  const [activeSubView, setActiveSubView] = useState<GamesSubView>(() => route?.gamesSubView || 'list');
  const [selectedGame, setSelectedGame] = useState<GameRecord | null>(() => {
    if (route?.gameId) {
      const g = INITIAL_GAMES.find((item) => item.gameId === route.gameId);
      if (g) return g;
      if (route.gameName) {
        return {
          gameId: route.gameId,
          name: route.gameName,
          gameType: 'battle-royale',
          thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
          updatedAt: 'Recently',
          createdAt: 'Recently',
        };
      }
    }
    return INITIAL_GAMES[0];
  });
  const [selectedContest, setSelectedContest] = useState<ContestRecord | null>(() => {
    if (route?.contestId) {
      const c = INITIAL_CONTESTS.find((item) => item.contestId === route.contestId);
      if (c) return c;
    }
    return null;
  });

  // Games State
  const [games, setGames] = useState<GameRecord[]>(INITIAL_GAMES);
  const [gameSearchQuery, setGameSearchQuery] = useState('');
  const [gameSortDirection, setGameSortDirection] = useState<'asc' | 'desc'>('asc');
  const [gameCurrentPage, setGameCurrentPage] = useState(1);
  const [gameRowsPerPage, setGameRowsPerPage] = useState(10);

  // Contests State
  const [contests, setContests] = useState<ContestRecord[]>(INITIAL_CONTESTS);
  const [contestSearchQuery, setContestSearchQuery] = useState('');
  const [contestSortDirection, setContestSortDirection] = useState<'asc' | 'desc'>('asc');
  const [contestCurrentPage, setContestCurrentPage] = useState(1);
  const [contestRowsPerPage, setContestRowsPerPage] = useState(10);

  // Synchronize component state with route URL changes
  React.useEffect(() => {
    if (!route) return;

    if (route.gameId !== undefined) {
      const found = games.find((g) => g.gameId === route.gameId);
      if (found) {
        setSelectedGame(found);
      } else if (route.gameName) {
        setSelectedGame({
          gameId: route.gameId,
          name: route.gameName,
          gameType: 'battle-royale',
          thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
          updatedAt: 'Recently',
          createdAt: 'Recently',
        });
      }
    }

    if (route.contestId !== undefined) {
      const foundC = contests.find((c) => c.contestId === route.contestId);
      if (foundC) {
        setSelectedContest(foundC);
      } else {
        setSelectedContest({
          contestId: route.contestId,
          title: `Contest #${route.contestId}`,
          prizePool: 1000,
          thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
          status: 'upcoming',
          schedule: '18/09/2026\n10:00 AM',
          updatedAt: 'Recently',
          createdAt: 'Recently',
          entryFee: 50,
          mode: 'SOLO',
          map: 'BERMUDA',
          rulesCollection: 'FF Standard Rules',
        });
      }
    }

    if (route.gamesSubView) {
      setActiveSubView(route.gamesSubView);
    } else if (route.view === 'games') {
      setActiveSubView('list');
    }
  }, [route, games, contests]);

  // Mass Duplicate State
  const [massDupSourceDate, setMassDupSourceDate] = useState('2026-09-17');
  const [massDupTargetDate, setMassDupTargetDate] = useState('2026-09-18');
  const [massDupSelectedIds, setMassDupSelectedIds] = useState<number[]>([]);

  // Modals state
  const [gameModal, setGameModal] = useState<{ isOpen: boolean; game: GameRecord | null }>({
    isOpen: false,
    game: null,
  });

  const [idPassModal, setIdPassModal] = useState<{ isOpen: boolean; contest: ContestRecord | null }>({
    isOpen: false,
    contest: null,
  });

  const [statusModal, setStatusModal] = useState<{ isOpen: boolean; contest: ContestRecord | null }>({
    isOpen: false,
    contest: null,
  });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: 'game' | 'contest';
    id: number;
    title: string;
  }>({
    isOpen: false,
    type: 'game',
    id: 0,
    title: '',
  });

  // Games Columns
  const gameColumnDefs: ColumnItem[] = [
    { key: 'gameId', label: 'gameId' },
    { key: 'name', label: 'Name' },
    { key: 'gameType', label: 'Game Type' },
    { key: 'thumbnail', label: 'Thumbnail' },
    { key: 'updatedAt', label: 'Updated At' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'actions', label: 'Actions' },
  ];

  const [visibleGameColumns, setVisibleGameColumns] = useState<Record<string, boolean>>({
    gameId: true,
    name: true,
    gameType: true,
    thumbnail: true,
    updatedAt: true,
    createdAt: true,
    actions: true,
  });

  // Contests Columns
  const contestColumnDefs: ColumnItem[] = [
    { key: 'contestId', label: 'contestId' },
    { key: 'title', label: 'Title' },
    { key: 'prizePool', label: 'Prize Pool' },
    { key: 'thumbnail', label: 'Thumbnail' },
    { key: 'status', label: 'Status' },
    { key: 'schedule', label: 'Schedule' },
    { key: 'updatedAt', label: 'Updated At' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  const [visibleContestColumns, setVisibleContestColumns] = useState<Record<string, boolean>>({
    contestId: true,
    title: true,
    prizePool: true,
    thumbnail: true,
    status: true,
    schedule: true,
    updatedAt: true,
    createdAt: true,
    actions: true,
  });

  // Games Filtering & Sorting
  const filteredGames = useMemo(() => {
    let result = [...games];
    if (gameSearchQuery.trim()) {
      const q = gameSearchQuery.toLowerCase().trim();
      result = result.filter(
        (g) => String(g.gameId).includes(q) || g.name.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) =>
      gameSortDirection === 'asc' ? a.gameId - b.gameId : b.gameId - a.gameId
    );
    return result;
  }, [games, gameSearchQuery, gameSortDirection]);

  const totalGamePages = Math.ceil(filteredGames.length / gameRowsPerPage) || 1;
  const paginatedGames = useMemo(() => {
    const start = (gameCurrentPage - 1) * gameRowsPerPage;
    return filteredGames.slice(start, start + gameRowsPerPage);
  }, [filteredGames, gameCurrentPage, gameRowsPerPage]);

  // Contests Filtering & Sorting
  const filteredContests = useMemo(() => {
    let result = [...contests];
    if (contestSearchQuery.trim()) {
      const q = contestSearchQuery.toLowerCase().trim();
      result = result.filter(
        (c) => String(c.contestId).includes(q) || c.title.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) =>
      contestSortDirection === 'asc'
        ? a.contestId - b.contestId
        : b.contestId - a.contestId
    );
    return result;
  }, [contests, contestSearchQuery, contestSortDirection]);

  const totalContestPages = Math.ceil(filteredContests.length / contestRowsPerPage) || 1;
  const paginatedContests = useMemo(() => {
    const start = (contestCurrentPage - 1) * contestRowsPerPage;
    return filteredContests.slice(start, start + contestRowsPerPage);
  }, [filteredContests, contestCurrentPage, contestRowsPerPage]);

  // Handlers
  const handleSaveGame = (name: string, gameType: string, thumbnailUrl: string) => {
    if (gameModal.game) {
      setGames((prev) =>
        prev.map((g) =>
          g.gameId === gameModal.game!.gameId
            ? { ...g, name, gameType, thumbnailUrl, updatedAt: 'Just now' }
            : g
        )
      );
      notify({ message: `Game "${name}" updated successfully`, type: 'success' });
    } else {
      const newId = Math.max(...games.map((g) => g.gameId), 0) + 1;
      const newGame: GameRecord = {
        gameId: newId,
        name,
        gameType,
        thumbnailUrl,
        updatedAt: 'Just now',
        createdAt: 'Just now',
      };
      setGames((prev) => [newGame, ...prev]);
      notify({ message: `Game "${name}" created successfully`, type: 'success' });
    }
    setGameModal({ isOpen: false, game: null });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.type === 'game') {
      setGames((prev) => prev.filter((g) => g.gameId !== deleteModal.id));
      notify({ message: 'Game removed successfully', type: 'success' });
    } else {
      setContests((prev) => prev.filter((c) => c.contestId !== deleteModal.id));
      notify({ message: 'Contest removed successfully', type: 'success' });
    }
    setDeleteModal({ isOpen: false, type: 'game', id: 0, title: '' });
  };

  const handleSaveIdPass = (roomId: string, roomPass: string) => {
    if (!idPassModal.contest) return;
    setContests((prev) =>
      prev.map((c) =>
        c.contestId === idPassModal.contest!.contestId
          ? { ...c, roomId, roomPass, updatedAt: 'Just now' }
          : c
      )
    );
    notify({ message: 'Room ID and Password updated successfully', type: 'success' });
    setIdPassModal({ isOpen: false, contest: null });
  };

  const handleSaveStatus = (status: ContestStatus) => {
    if (!statusModal.contest) return;
    setContests((prev) =>
      prev.map((c) =>
        c.contestId === statusModal.contest!.contestId
          ? { ...c, status, updatedAt: 'Just now' }
          : c
      )
    );
    notify({ message: `Contest status updated to ${status}`, type: 'success' });
    setStatusModal({ isOpen: false, contest: null });
  };

  const handleSaveContestForm = (contestData: Partial<ContestRecord>) => {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()}\n${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    if (activeSubView === 'update-contest' && selectedContest) {
      setContests((prev) =>
        prev.map((c) =>
          c.contestId === selectedContest.contestId
            ? { ...c, ...contestData, updatedAt: formattedDate }
            : c
        )
      );
      notify({ message: `Contest #${selectedContest.contestId} updated successfully`, type: 'success' });
    } else {
      // Add or duplicate mode
      const newId = Math.max(...contests.map((x) => x.contestId), 0) + 1;
      const newContest: ContestRecord = {
        contestId: newId,
        title: contestData.title || 'New Contest',
        prizePool: contestData.prizePool || 0,
        perKill: contestData.perKill || 0,
        entryFee: contestData.entryFee || 0,
        playersInTeam: contestData.playersInTeam || 1,
        maxJoinings: contestData.maxJoinings || 48,
        rulesCollection: contestData.rulesCollection || 'Default Rules Collection',
        mode: contestData.mode || 'Solo',
        map: contestData.map || 'Bermuda',
        thumbnailUrl: contestData.thumbnailUrl || '',
        status: 'upcoming',
        schedule: contestData.schedule || '17/09/2026\n11.46 AM',
        hasYoutubeLink: contestData.hasYoutubeLink,
        youtubeLink: contestData.youtubeLink,
        prizeDescription: contestData.prizeDescription,
        rankPrizes: contestData.rankPrizes,
        updatedAt: formattedDate,
        createdAt: formattedDate,
      };
      setContests((prev) => [newContest, ...prev]);
      notify({
        message: activeSubView === 'duplicate-contest'
          ? `Contest duplicated successfully (ID: ${newId})`
          : `New contest "${newContest.title}" created successfully`,
        type: 'success',
      });
    }
    if (selectedGame) {
      navigateToPath(buildContestsUrl(selectedGame.gameId, selectedGame.name));
    } else {
      setActiveSubView('contests');
    }
  };

  const handleExecuteMassDuplicate = () => {
    if (!massDupTargetDate) {
      notify({ message: 'Please choose target date for duplication', type: 'warning' });
      return;
    }

    const toDuplicate =
      massDupSelectedIds.length > 0
        ? contests.filter((c) => massDupSelectedIds.includes(c.contestId))
        : contests.slice(0, 5);

    const newItems: ContestRecord[] = toDuplicate.map((c, idx) => {
      const newId = Math.max(...contests.map((x) => x.contestId), 0) + idx + 1;
      const originalTime = c.schedule.includes(' ') ? c.schedule.split(' ')[1] : '12:00 PM';
      return {
        ...c,
        contestId: newId,
        title: `${c.title} (Dup)`,
        schedule: `${massDupTargetDate} ${originalTime}`,
        status: 'upcoming',
        updatedAt: 'Just now',
        createdAt: 'Just now',
      };
    });

    setContests((prev) => [...newItems, ...prev]);
    notify({
      message: `Successfully mass duplicated ${newItems.length} contests to ${massDupTargetDate}`,
      type: 'success',
    });
    setMassDupSelectedIds([]);
    if (selectedGame) {
      navigateToPath(buildContestsUrl(selectedGame.gameId, selectedGame.name));
    } else {
      setActiveSubView('contests');
    }
  };

  return (
    <div className="space-y-4">
      {/* ============================================================ */}
      {/* SUBVIEW: RULES COLLECTIONS (Images 1, 4)                     */}
      {/* ============================================================ */}
      {activeSubView === 'rules-collections' && (
        <RulesCollectionsView
          game={selectedGame}
          onBack={() => navigateToPath('/games')}
          initialMode={route?.rulesMode}
          initialCollectionId={route?.rulesCollectionId}
        />
      )}

      {/* ============================================================ */}
      {/* SUBVIEW: JOININGS (Image 5)                                  */}
      {/* ============================================================ */}
      {activeSubView === 'joinings' && (
        <ContestJoiningsView
          contest={selectedContest}
          onBack={() => {
            if (selectedGame) {
              navigateToPath(buildContestsUrl(selectedGame.gameId, selectedGame.name));
            } else {
              navigateToPath('/games');
            }
          }}
        />
      )}

      {/* ============================================================ */}
      {/* SUBVIEW: VIEW RESULT (Image 1)                               */}
      {/* ============================================================ */}
      {activeSubView === 'view-result' && (
        <ContestResultView
          contest={selectedContest}
          onBack={() => {
            if (selectedGame) {
              navigateToPath(buildContestsUrl(selectedGame.gameId, selectedGame.name));
            } else {
              navigateToPath('/games');
            }
          }}
        />
      )}

      {/* ============================================================ */}
      {/* SUBVIEW: SEND REFUND (Image 4)                               */}
      {/* ============================================================ */}
      {activeSubView === 'send-refund' && (
        <ContestRefundView
          contest={selectedContest}
          onBack={() => {
            if (selectedGame) {
              navigateToPath(buildContestsUrl(selectedGame.gameId, selectedGame.name));
            } else {
              navigateToPath('/games');
            }
          }}
        />
      )}

      {/* ============================================================ */}
      {/* SUBVIEW: CONTEST FORM (Add / Update / Duplicate) (Images 2, 8, 9) */}
      {/* ============================================================ */}
      {(activeSubView === 'add-contest' ||
        activeSubView === 'update-contest' ||
        activeSubView === 'duplicate-contest') && (
        <ContestFormView
          mode={
            activeSubView === 'update-contest'
              ? 'update'
              : activeSubView === 'duplicate-contest'
              ? 'duplicate'
              : 'add'
          }
          game={selectedGame}
          contest={selectedContest}
          onCancel={() => {
            if (selectedGame) {
              navigateToPath(buildContestsUrl(selectedGame.gameId, selectedGame.name));
            } else {
              navigateToPath('/games');
            }
          }}
          onSubmit={handleSaveContestForm}
        />
      )}

      {/* ============================================================ */}
      {/* SUBVIEW: MASS DUPLICATE CONTESTS                             */}
      {/* ============================================================ */}
      {activeSubView === 'mass-duplicate' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Mass Duplicate Contests
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
              <span
                className="hover:text-gray-700 cursor-pointer"
                onClick={() => navigateToPath('/games')}
              >
                Home
              </span>
              <span>&gt;</span>
              <span
                className="hover:text-gray-700 cursor-pointer"
                onClick={() => navigateToPath('/games')}
              >
                Games
              </span>
              <span>&gt;</span>
              <span
                className="hover:text-gray-700 cursor-pointer"
                onClick={() => {
                  if (selectedGame) {
                    navigateToPath(buildContestsUrl(selectedGame.gameId, selectedGame.name));
                  } else {
                    navigateToPath('/games');
                  }
                }}
              >
                Contests
              </span>
              <span>&gt;</span>
              <span className="text-gray-800 font-medium">Mass Duplicate</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Choose Contests of Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={massDupSourceDate}
                    onChange={(e) => setMassDupSourceDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Choose Date to Duplicate Contests
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={massDupTargetDate}
                    onChange={(e) => setMassDupTargetDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-700 flex items-center justify-between">
                <span>Select Contests to Duplicate ({contests.length} available)</span>
                <button
                  type="button"
                  onClick={() => {
                    if (massDupSelectedIds.length === contests.length) {
                      setMassDupSelectedIds([]);
                    } else {
                      setMassDupSelectedIds(contests.map((c) => c.contestId));
                    }
                  }}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
                >
                  {massDupSelectedIds.length === contests.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                {contests.map((c) => {
                  const isChecked = massDupSelectedIds.includes(c.contestId);
                  return (
                    <div
                      key={c.contestId}
                      onClick={() => {
                        setMassDupSelectedIds((prev) =>
                          isChecked
                            ? prev.filter((id) => id !== c.contestId)
                            : [...prev, c.contestId]
                        );
                      }}
                      className="px-4 py-3 flex items-center justify-between hover:bg-gray-50/80 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                        />
                        <div>
                          <div className="text-xs font-semibold text-gray-900">{c.title}</div>
                          <div className="text-[11px] text-gray-500">
                            Prize: {c.prizePool} coins • Schedule: {c.schedule}
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-gray-400">#{c.contestId}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (selectedGame) {
                    navigateToPath(buildContestsUrl(selectedGame.gameId, selectedGame.name));
                  } else {
                    setActiveSubView('contests');
                  }
                }}
                className="px-5 py-2.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={handleExecuteMassDuplicate}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-2xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Execute Mass Duplicate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SUBVIEW: MAIN GAMES TABLE                                    */}
      {/* ============================================================ */}
      {activeSubView === 'list' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Games</h2>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
              <span className="hover:text-gray-700 cursor-pointer">Home</span>
              <span>&gt;</span>
              <span className="text-gray-800 font-medium">Games</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
            {/* Top Toolbar */}
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={gameSearchQuery}
                  onChange={(e) => {
                    setGameSearchQuery(e.target.value);
                    setGameCurrentPage(1);
                  }}
                  placeholder="Search by gameId or Name"
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                />
              </div>

              <div className="flex items-center gap-2.5 self-end sm:self-auto">
                <ColumnsDropdown
                  columns={gameColumnDefs}
                  visibleColumns={visibleGameColumns}
                  onToggleColumn={(key) =>
                    setVisibleGameColumns((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }))
                  }
                />

                <button
                  type="button"
                  onClick={() => setGameModal({ isOpen: true, game: null })}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-2xs transition-colors cursor-pointer"
                >
                  <span>Add New</span>
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Total items and rows per page */}
            <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
              <div>Total {filteredGames.length} items</div>
              <div className="flex items-center gap-2">
                <span>Rows per page:</span>
                <RowsPerPageDropdown
                  value={gameRowsPerPage}
                  onChange={(v: number) => {
                    setGameRowsPerPage(v);
                    setGameCurrentPage(1);
                  }}
                />
              </div>
            </div>

            {/* Games Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50/80 text-gray-600 font-semibold border-b border-gray-200">
                  <tr>
                    {visibleGameColumns.gameId && (
                      <th
                        className="px-4 py-3.5 cursor-pointer select-none hover:text-gray-900 transition-colors"
                        onClick={() =>
                          setGameSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                        }
                      >
                        <div className="flex items-center gap-1">
                          <span>gameId</span>
                          {gameSortDirection === 'asc' ? (
                            <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                          )}
                        </div>
                      </th>
                    )}
                    {visibleGameColumns.name && <th className="px-4 py-3.5">Name</th>}
                    {visibleGameColumns.gameType && <th className="px-4 py-3.5">Game Type</th>}
                    {visibleGameColumns.thumbnail && <th className="px-4 py-3.5">Thumbnail</th>}
                    {visibleGameColumns.updatedAt && <th className="px-4 py-3.5">Updated At</th>}
                    {visibleGameColumns.createdAt && <th className="px-4 py-3.5">Created At</th>}
                    {visibleGameColumns.actions && (
                      <th className="px-4 py-3.5 text-right">Actions</th>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {paginatedGames.map((g) => (
                    <tr key={g.gameId} className="hover:bg-gray-50/70 transition-colors">
                      {visibleGameColumns.gameId && (
                        <td className="px-4 py-3.5 font-medium text-gray-900">{g.gameId}</td>
                      )}
                      {visibleGameColumns.name && (
                        <td className="px-4 py-3.5 font-semibold text-gray-900">{g.name}</td>
                      )}
                      {visibleGameColumns.gameType && (
                        <td className="px-4 py-3.5 text-gray-600">{g.gameType}</td>
                      )}
                      {visibleGameColumns.thumbnail && (
                        <td className="px-4 py-3.5">
                          {g.thumbnailUrl ? (
                            <img
                              src={g.thumbnailUrl}
                              alt={g.name}
                              referrerPolicy="no-referrer"
                              className="w-16 h-10 object-cover rounded-md border border-gray-200"
                            />
                          ) : (
                            <div className="w-16 h-10 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] text-gray-400">
                              No image
                            </div>
                          )}
                        </td>
                      )}
                      {visibleGameColumns.updatedAt && (
                        <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px]">
                          {g.updatedAt}
                        </td>
                      )}
                      {visibleGameColumns.createdAt && (
                        <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px]">
                          {g.createdAt}
                        </td>
                      )}
                      {visibleGameColumns.actions && (
                        <td className="px-4 py-3.5 text-right">
                          <div className="inline-flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedGame(g);
                                navigateToPath(buildContestsUrl(g.gameId, g.name));
                              }}
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
                            >
                              <Gamepad2 className="w-3.5 h-3.5" />
                              <span>Contests</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedGame(g);
                                navigateToPath(buildRulesCollectionsUrl(g.gameId, g.name));
                              }}
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
                            >
                              <Shield className="w-3.5 h-3.5" />
                              <span>Rules Collections</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setGameModal({ isOpen: true, game: g })}
                              className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium cursor-pointer transition-colors"
                            >
                              <Pencil className="w-3.5 h-3.5 text-gray-500" />
                              <span>Update</span>
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setDeleteModal({
                                  isOpen: true,
                                  type: 'game',
                                  id: g.gameId,
                                  title: g.name,
                                })
                              }
                              className="flex items-center gap-1 text-red-500 hover:text-red-700 font-medium cursor-pointer transition-colors"
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
                disabled={gameCurrentPage <= 1}
                onClick={() => setGameCurrentPage((p) => Math.max(p - 1, 1))}
                className="p-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={gameCurrentPage >= totalGamePages}
                onClick={() => setGameCurrentPage((p) => Math.min(p + 1, totalGamePages))}
                className="p-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SUBVIEW: CONTESTS TABLE FOR SELECTED GAME                    */}
      {/* ============================================================ */}
      {activeSubView === 'contests' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              {selectedGame?.name || 'FF FULL MAP'} Contests
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
              <span
                className="hover:text-gray-700 cursor-pointer"
                onClick={() => navigateToPath('/games')}
              >
                Home
              </span>
              <span>&gt;</span>
              <span
                className="hover:text-gray-700 cursor-pointer"
                onClick={() => navigateToPath('/games')}
              >
                Games
              </span>
              <span>&gt;</span>
              <span className="text-gray-800 font-medium">Contests</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
            {/* Top Bar with Search and Action Buttons */}
            <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={contestSearchQuery}
                  onChange={(e) => {
                    setContestSearchQuery(e.target.value);
                    setContestCurrentPage(1);
                  }}
                  placeholder="Search by contestId or Title"
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                />
              </div>

              <div className="flex items-center flex-wrap gap-2.5 self-end lg:self-auto">
                <ColumnsDropdown
                  columns={contestColumnDefs}
                  visibleColumns={visibleContestColumns}
                  onToggleColumn={(key) =>
                    setVisibleContestColumns((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }))
                  }
                />

                <button
                  type="button"
                  onClick={() => {
                    if (selectedGame) {
                      navigateToPath(buildMassDuplicateUrl(selectedGame.gameId, selectedGame.name));
                    } else {
                      setActiveSubView('mass-duplicate');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-2xs transition-colors cursor-pointer"
                >
                  <span>Mass Duplicate</span>
                  <Layers className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedContest(null);
                    if (selectedGame) {
                      navigateToPath(buildCreateContestUrl(selectedGame.gameId, selectedGame.name));
                    } else {
                      setActiveSubView('add-contest');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-2xs transition-colors cursor-pointer"
                >
                  <span>Add New</span>
                  <Plus className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => navigateToPath('/games')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-2xs transition-colors cursor-pointer"
                >
                  <span>Go Back</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Total items and rows per page */}
            <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
              <div>Total {filteredContests.length} items</div>
              <div className="flex items-center gap-2">
                <span>Rows per page:</span>
                <RowsPerPageDropdown
                  value={contestRowsPerPage}
                  onChange={(v: number) => {
                    setContestRowsPerPage(v);
                    setContestCurrentPage(1);
                  }}
                />
              </div>
            </div>

            {/* Contests Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50/80 text-gray-600 font-semibold border-b border-gray-200">
                  <tr>
                    {visibleContestColumns.contestId && (
                      <th
                        className="px-4 py-3.5 cursor-pointer select-none hover:text-gray-900 transition-colors"
                        onClick={() =>
                          setContestSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                        }
                      >
                        <div className="flex items-center gap-1">
                          <span>contestId</span>
                          {contestSortDirection === 'asc' ? (
                            <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                          )}
                        </div>
                      </th>
                    )}
                    {visibleContestColumns.title && <th className="px-4 py-3.5">Title</th>}
                    {visibleContestColumns.prizePool && <th className="px-4 py-3.5">Prize Pool</th>}
                    {visibleContestColumns.thumbnail && <th className="px-4 py-3.5">Thumbnail</th>}
                    {visibleContestColumns.status && <th className="px-4 py-3.5">Status</th>}
                    {visibleContestColumns.schedule && <th className="px-4 py-3.5">Schedule</th>}
                    {visibleContestColumns.updatedAt && <th className="px-4 py-3.5">Updated At</th>}
                    {visibleContestColumns.createdAt && <th className="px-4 py-3.5">Created At</th>}
                    {visibleContestColumns.actions && (
                      <th className="px-4 py-3.5 text-right">ACTIONS</th>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {paginatedContests.map((c) => (
                    <tr key={c.contestId} className="hover:bg-gray-50/70 transition-colors">
                      {visibleContestColumns.contestId && (
                        <td className="px-4 py-3.5 font-medium text-gray-900">{c.contestId}</td>
                      )}
                      {visibleContestColumns.title && (
                        <td className="px-4 py-3.5 font-semibold text-gray-900">{c.title}</td>
                      )}
                      {visibleContestColumns.prizePool && (
                        <td className="px-4 py-3.5 font-medium text-gray-900">{c.prizePool}</td>
                      )}
                      {visibleContestColumns.thumbnail && (
                        <td className="px-4 py-3.5">
                          {c.thumbnailUrl ? (
                            <img
                              src={c.thumbnailUrl}
                              alt={c.title}
                              referrerPolicy="no-referrer"
                              className="w-16 h-10 object-cover rounded-md border border-gray-200"
                            />
                          ) : (
                            <div className="w-20 h-10 rounded-lg bg-gray-100/70 border border-gray-200/60 flex items-center justify-center text-[10px] text-gray-400 font-medium px-1 text-center">
                              Banner Not Found
                            </div>
                          )}
                        </td>
                      )}
                      {visibleContestColumns.status && (
                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize ${
                              c.status === 'resulted'
                                ? 'bg-emerald-50 text-emerald-700'
                                : c.status === 'ongoing'
                                ? 'bg-amber-50 text-amber-700'
                                : c.status === 'cancelling'
                                ? 'bg-orange-50 text-orange-700'
                                : c.status === 'cancelled'
                                ? 'bg-red-50 text-red-700'
                                : 'bg-blue-50 text-blue-700'
                            }`}
                          >
                            {c.status}
                          </span>
                        </td>
                      )}
                      {visibleContestColumns.schedule && (
                        <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px] whitespace-pre-line">
                          {c.schedule}
                        </td>
                      )}
                      {visibleContestColumns.updatedAt && (
                        <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px] whitespace-pre-line">
                          {c.updatedAt || '—'}
                        </td>
                      )}
                      {visibleContestColumns.createdAt && (
                        <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px] whitespace-pre-line">
                          {c.createdAt || '—'}
                        </td>
                      )}
                      {visibleContestColumns.actions && (
                        <td className="px-4 py-3.5 text-right">
                          <div className="inline-flex items-center gap-3">
                            {c.status === 'cancelling' ? (
                              <>
                                {/* View Joinings */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedContest(c);
                                    if (selectedGame) {
                                      navigateToPath(
                                        buildContestJoiningsUrl(
                                          selectedGame.gameId,
                                          selectedGame.name,
                                          c.contestId
                                        )
                                      );
                                    } else {
                                      setActiveSubView('joinings');
                                    }
                                  }}
                                  className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
                                >
                                  <Users className="w-3.5 h-3.5 text-blue-600" />
                                  <span>View Joinings</span>
                                </button>

                                {/* Send Refund */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedContest(c);
                                    if (selectedGame) {
                                      navigateToPath(
                                        buildContestRefundUrl(
                                          selectedGame.gameId,
                                          selectedGame.name,
                                          c.contestId
                                        )
                                      );
                                    } else {
                                      setActiveSubView('send-refund');
                                    }
                                  }}
                                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
                                >
                                  <Wallet className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Send Refund</span>
                                </button>

                                {/* Duplicate */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedContest(c);
                                    if (selectedGame) {
                                      navigateToPath(
                                        buildContestDuplicateUrl(
                                          selectedGame.gameId,
                                          selectedGame.name,
                                          c.contestId
                                        )
                                      );
                                    } else {
                                      setActiveSubView('duplicate-contest');
                                    }
                                  }}
                                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
                                >
                                  <Copy className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Duplicate</span>
                                </button>

                                {/* Update */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedContest(c);
                                    if (selectedGame) {
                                      navigateToPath(
                                        buildContestUpdateUrl(
                                          selectedGame.gameId,
                                          selectedGame.name,
                                          c.contestId
                                        )
                                      );
                                    } else {
                                      setActiveSubView('update-contest');
                                    }
                                  }}
                                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
                                >
                                  <Pencil className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Update</span>
                                </button>
                              </>
                            ) : c.status === 'cancelled' || c.status === 'resulted' ? (
                              <>
                                {/* View Result */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedContest(c);
                                    if (selectedGame) {
                                      navigateToPath(
                                        buildContestResultUrl(
                                          selectedGame.gameId,
                                          selectedGame.name,
                                          c.contestId
                                        )
                                      );
                                    } else {
                                      setActiveSubView('view-result');
                                    }
                                  }}
                                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
                                >
                                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                                  <span>View Result</span>
                                </button>

                                {/* Duplicate */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedContest(c);
                                    if (selectedGame) {
                                      navigateToPath(
                                        buildContestDuplicateUrl(
                                          selectedGame.gameId,
                                          selectedGame.name,
                                          c.contestId
                                        )
                                      );
                                    } else {
                                      setActiveSubView('duplicate-contest');
                                    }
                                  }}
                                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
                                >
                                  <Copy className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Duplicate</span>
                                </button>

                                {/* Update */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedContest(c);
                                    if (selectedGame) {
                                      navigateToPath(
                                        buildContestUpdateUrl(
                                          selectedGame.gameId,
                                          selectedGame.name,
                                          c.contestId
                                        )
                                      );
                                    } else {
                                      setActiveSubView('update-contest');
                                    }
                                  }}
                                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
                                >
                                  <Pencil className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Update</span>
                                </button>

                                {/* Delete */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    setDeleteModal({
                                      isOpen: true,
                                      type: 'contest',
                                      id: c.contestId,
                                      title: c.title,
                                    })
                                  }
                                  className="flex items-center gap-1 text-[#e91e63] hover:text-[#c2185b] font-medium cursor-pointer transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete</span>
                                </button>
                              </>
                            ) : c.status === 'ongoing' ? (
                              <>
                                {/* View Joinings */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedContest(c);
                                    if (selectedGame) {
                                      navigateToPath(
                                        buildContestJoiningsUrl(
                                          selectedGame.gameId,
                                          selectedGame.name,
                                          c.contestId
                                        )
                                      );
                                    } else {
                                      setActiveSubView('joinings');
                                    }
                                  }}
                                  className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
                                >
                                  <Users className="w-3.5 h-3.5 text-blue-600" />
                                  <span>View Joinings</span>
                                </button>

                                {/* Status */}
                                <button
                                  type="button"
                                  onClick={() => setStatusModal({ isOpen: true, contest: c })}
                                  className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium cursor-pointer transition-colors"
                                >
                                  <Pencil className="w-3.5 h-3.5 text-gray-500" />
                                  <span>Status</span>
                                </button>

                                {/* Duplicate */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedContest(c);
                                    if (selectedGame) {
                                      navigateToPath(
                                        buildContestDuplicateUrl(
                                          selectedGame.gameId,
                                          selectedGame.name,
                                          c.contestId
                                        )
                                      );
                                    } else {
                                      setActiveSubView('duplicate-contest');
                                    }
                                  }}
                                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
                                >
                                  <Copy className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Duplicate</span>
                                </button>

                                {/* Update */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedContest(c);
                                    if (selectedGame) {
                                      navigateToPath(
                                        buildContestUpdateUrl(
                                          selectedGame.gameId,
                                          selectedGame.name,
                                          c.contestId
                                        )
                                      );
                                    } else {
                                      setActiveSubView('update-contest');
                                    }
                                  }}
                                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
                                >
                                  <Pencil className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Update</span>
                                </button>
                              </>
                            ) : (
                              <>
                                {/* View Joinings */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedContest(c);
                                    if (selectedGame) {
                                      navigateToPath(
                                        buildContestJoiningsUrl(
                                          selectedGame.gameId,
                                          selectedGame.name,
                                          c.contestId
                                        )
                                      );
                                    } else {
                                      setActiveSubView('joinings');
                                    }
                                  }}
                                  className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
                                >
                                  <Users className="w-3.5 h-3.5 text-blue-600" />
                                  <span>View Joinings</span>
                                </button>

                                {/* Id And Pass */}
                                <button
                                  type="button"
                                  onClick={() => setIdPassModal({ isOpen: true, contest: c })}
                                  className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium cursor-pointer transition-colors"
                                >
                                  <Pencil className="w-3.5 h-3.5 text-gray-500" />
                                  <span>Id And Pass</span>
                                </button>

                                {/* Status */}
                                <button
                                  type="button"
                                  onClick={() => setStatusModal({ isOpen: true, contest: c })}
                                  className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium cursor-pointer transition-colors"
                                >
                                  <Pencil className="w-3.5 h-3.5 text-gray-500" />
                                  <span>Status</span>
                                </button>

                                {/* Duplicate */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedContest(c);
                                    if (selectedGame) {
                                      navigateToPath(
                                        buildContestDuplicateUrl(
                                          selectedGame.gameId,
                                          selectedGame.name,
                                          c.contestId
                                        )
                                      );
                                    } else {
                                      setActiveSubView('duplicate-contest');
                                    }
                                  }}
                                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
                                >
                                  <Copy className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Duplicate</span>
                                </button>

                                {/* Update */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedContest(c);
                                    if (selectedGame) {
                                      navigateToPath(
                                        buildContestUpdateUrl(
                                          selectedGame.gameId,
                                          selectedGame.name,
                                          c.contestId
                                        )
                                      );
                                    } else {
                                      setActiveSubView('update-contest');
                                    }
                                  }}
                                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
                                >
                                  <Pencil className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Update</span>
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={contestCurrentPage <= 1}
                  onClick={() => setContestCurrentPage((p) => Math.max(p - 1, 1))}
                  className="p-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalContestPages }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    type="button"
                    onClick={() => setContestCurrentPage(pg)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                      contestCurrentPage === pg
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {pg}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={contestCurrentPage >= totalContestPages}
                  onClick={() => setContestCurrentPage((p) => Math.min(p + 1, totalContestPages))}
                  className="p-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <span className="text-xs text-gray-500 font-medium">
                Total {filteredContests.length} Items
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODALS                                                       */}
      {/* ============================================================ */}

      {/* Add New Game / Update Game Modal (Image 1) */}
      <GameModal
        isOpen={gameModal.isOpen}
        onClose={() => setGameModal({ isOpen: false, game: null })}
        game={gameModal.game}
        onSave={handleSaveGame}
      />

      {/* Update Room ID and Password Modal (Image 6) */}
      <IdPassModal
        isOpen={idPassModal.isOpen}
        onClose={() => setIdPassModal({ isOpen: false, contest: null })}
        contest={idPassModal.contest}
        onSave={handleSaveIdPass}
      />

      {/* Update Status Modal (Image 7) */}
      <StatusModal
        isOpen={statusModal.isOpen}
        onClose={() => setStatusModal({ isOpen: false, contest: null })}
        contest={statusModal.contest}
        onSave={handleSaveStatus}
      />

      {/* Delete Confirmation Modal (Image 7) */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">
                {deleteModal.type === 'game'
                  ? `Delete Game #${deleteModal.id}`
                  : `Delete Contest #${deleteModal.id}`}
              </h3>
              <button
                type="button"
                onClick={() =>
                  setDeleteModal({ isOpen: false, type: 'game', id: 0, title: '' })
                }
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs text-gray-700">
              <p className="font-medium text-gray-600">Are you Sure for Delete Following ?</p>
              <p className="font-semibold text-gray-900">
                {deleteModal.type === 'game' ? 'Game Name : ' : 'Contest Title : '}
                <span className="font-bold text-gray-900">{deleteModal.title}</span>
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() =>
                  setDeleteModal({ isOpen: false, type: 'game', id: 0, title: '' })
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
