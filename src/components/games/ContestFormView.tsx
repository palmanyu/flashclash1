import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Zap,
  Check,
  ChevronDown,
} from 'lucide-react';
import { ContestRecord, GameRecord, RankPrizeItem } from './types';
import { RankPrizesModal } from './RankPrizesModal';
import { useNotification } from '../../context/NotificationContext';

interface ContestFormViewProps {
  mode: 'add' | 'update' | 'duplicate';
  game: GameRecord | null;
  contest: ContestRecord | null;
  onCancel: () => void;
  onSubmit: (contestData: Partial<ContestRecord>) => void;
}

export const ContestFormView: React.FC<ContestFormViewProps> = ({
  mode,
  game,
  contest,
  onCancel,
  onSubmit,
}) => {
  const { notify } = useNotification();
  const gameTitle = game?.name || 'FF FULL MAP';

  // Form states
  const [title, setTitle] = useState('');
  const [schedule, setSchedule] = useState('');
  const [prizePool, setPrizePool] = useState('0');
  const [perKill, setPerKill] = useState('0');
  const [entryFee, setEntryFee] = useState('0');
  const [playersInTeam, setPlayersInTeam] = useState('1');
  const [maxJoinings, setMaxJoinings] = useState('48');
  const [rulesCollection, setRulesCollection] = useState('Default Rules Collection');
  const [contestMode, setContestMode] = useState('Solo');
  const [map, setMap] = useState('Bermuda');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [fileName, setFileName] = useState('No file chosen');
  const [hasYoutubeLink, setHasYoutubeLink] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [prizeDesc, setPrizeDesc] = useState('');
  const [rankPrizes, setRankPrizes] = useState<RankPrizeItem[]>([]);
  const [rankModalOpen, setRankModalOpen] = useState(false);

  useEffect(() => {
    if (contest && (mode === 'update' || mode === 'duplicate')) {
      setTitle(mode === 'duplicate' ? `${contest.title}` : contest.title);
      setSchedule(contest.schedule || '09/17/2026 11:46 AM');
      setPrizePool(String(contest.prizePool ?? '0'));
      setPerKill(String(contest.perKill ?? '0'));
      setEntryFee(String(contest.entryFee ?? '0'));
      setPlayersInTeam(String(contest.playersInTeam ?? '1'));
      setMaxJoinings(String(contest.maxJoinings ?? '48'));
      setRulesCollection(contest.rulesCollection || 'Default Rules Collection');
      setContestMode(contest.mode || 'Solo');
      setMap(contest.map || 'Bermuda');
      setThumbnailUrl(contest.thumbnailUrl || '');
      setHasYoutubeLink(Boolean(contest.hasYoutubeLink || contest.youtubeLink));
      setYoutubeLink(contest.youtubeLink || '');
      setPrizeDesc(contest.prizeDescription || '');
      setRankPrizes(contest.rankPrizes || []);
    } else {
      // Add mode defaults
      setTitle('');
      setSchedule('09/17/2026 11:46 AM');
      setPrizePool('0');
      setPerKill('0');
      setEntryFee('0');
      setPlayersInTeam('1');
      setMaxJoinings('48');
      setRulesCollection('Default Rules Collection');
      setContestMode('Solo');
      setMap('Bermuda');
      setThumbnailUrl('');
      setHasYoutubeLink(false);
      setYoutubeLink('');
      setPrizeDesc('');
      setRankPrizes([]);
    }
  }, [contest, mode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setThumbnailUrl(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      notify({ message: 'Contest title is required', type: 'warning' });
      return;
    }

    onSubmit({
      title,
      schedule,
      prizePool: Number(prizePool) || 0,
      perKill: Number(perKill) || 0,
      entryFee: Number(entryFee) || 0,
      playersInTeam: Number(playersInTeam) || 1,
      maxJoinings: Number(maxJoinings) || 48,
      rulesCollection,
      mode: contestMode,
      map,
      thumbnailUrl:
        thumbnailUrl ||
        contest?.thumbnailUrl ||
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&auto=format&fit=crop&q=80',
      hasYoutubeLink,
      youtubeLink,
      prizeDescription: prizeDesc,
      rankPrizes,
    });
  };

  const getSubViewTitle = () => {
    if (mode === 'duplicate') return `Duplicate Contest of ${gameTitle}`;
    if (mode === 'update') return `Update Contest of ${gameTitle}`;
    return `Add Contest to ${gameTitle}`;
  };

  const getCardHeading = () => {
    if (mode === 'duplicate') return 'Duplicate Contest';
    if (mode === 'update') return `Update Contest #${contest?.contestId || ''}`;
    return 'Add Contest';
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Breadcrumbs matching Images 8 & 9 */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          {getSubViewTitle()}
        </h2>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
          <span className="hover:text-gray-700 cursor-pointer" onClick={onCancel}>
            Home
          </span>
          <span>&gt;</span>
          <span className="hover:text-gray-700 cursor-pointer" onClick={onCancel}>
            Games
          </span>
          <span>&gt;</span>
          <span className="hover:text-gray-700 cursor-pointer" onClick={onCancel}>
            Contests
          </span>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">
            {mode === 'duplicate'
              ? 'Duplicate Contest'
              : mode === 'update'
              ? 'Update Contest'
              : 'Add Contest'}
          </span>
        </div>
      </div>

      {/* Main Form Card matching Images 8 & 9 */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs p-6 md:p-8 space-y-6">
        <h3 className="text-center text-base font-bold text-gray-900 pb-2">
          {getCardHeading()}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Two-column layout matching Screenshots */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {/* CONTEST TITLE */}
            <div className="border-b border-gray-200 pb-1">
              <label className="block text-[11px] font-bold text-gray-700 tracking-wider mb-1 uppercase">
                CONTEST TITLE
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Contest Title"
                className="w-full text-xs text-gray-800 outline-none bg-transparent py-1"
                required
              />
            </div>

            {/* SCHEDULE */}
            <div className="border-b border-gray-200 pb-1 flex items-center justify-between">
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-gray-700 tracking-wider mb-1 uppercase">
                  SCHEDULE
                </label>
                <input
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="09/17/2026 11:46 AM"
                  className="w-full text-xs text-gray-800 outline-none bg-transparent py-1"
                />
              </div>
              <Calendar className="w-4 h-4 text-gray-400 ml-2" />
            </div>

            {/* PRIZE POOL */}
            <div className="border-b border-gray-200 pb-1">
              <label className="block text-[11px] font-bold text-gray-700 tracking-wider mb-1 uppercase">
                PRIZE POOL
              </label>
              <input
                type="number"
                value={prizePool}
                onChange={(e) => setPrizePool(e.target.value)}
                className="w-full text-xs text-gray-800 outline-none bg-transparent py-1"
              />
            </div>

            {/* PER KILL */}
            <div className="border-b border-gray-200 pb-1">
              <label className="block text-[11px] font-bold text-gray-700 tracking-wider mb-1 uppercase">
                PER KILL
              </label>
              <input
                type="number"
                value={perKill}
                onChange={(e) => setPerKill(e.target.value)}
                className="w-full text-xs text-gray-800 outline-none bg-transparent py-1"
              />
            </div>

            {/* ENTRY FEE (PER PLAYER) */}
            <div className="border-b border-gray-200 pb-1">
              <label className="block text-[11px] font-bold text-gray-700 tracking-wider mb-1 uppercase">
                ENTRY FEE (PER PLAYER)
              </label>
              <input
                type="number"
                value={entryFee}
                onChange={(e) => setEntryFee(e.target.value)}
                className="w-full text-xs text-gray-800 outline-none bg-transparent py-1"
              />
            </div>

            {/* PLAYERS IN A TEAM */}
            <div className="border-b border-gray-200 pb-1">
              <label className="block text-[11px] font-bold text-gray-700 tracking-wider mb-1 uppercase">
                PLAYERS IN A TEAM
              </label>
              <input
                type="number"
                value={playersInTeam}
                onChange={(e) => setPlayersInTeam(e.target.value)}
                className="w-full text-xs text-gray-800 outline-none bg-transparent py-1"
              />
            </div>

            {/* MAX JOININGS (AS PLAYERS) */}
            <div className="border-b border-gray-200 pb-1">
              <label className="block text-[11px] font-bold text-gray-700 tracking-wider mb-1 uppercase">
                MAX JOININGS (AS PLAYERS)
              </label>
              <input
                type="number"
                value={maxJoinings}
                onChange={(e) => setMaxJoinings(e.target.value)}
                className="w-full text-xs text-gray-800 outline-none bg-transparent py-1"
              />
            </div>

            {/* Rules Collection */}
            <div className="border-b border-gray-200 pb-1">
              <label className="block text-[10px] font-medium text-gray-400 mb-0.5">
                Rules Collection
              </label>
              <select
                value={rulesCollection}
                onChange={(e) => setRulesCollection(e.target.value)}
                className="w-full text-xs text-gray-800 outline-none bg-transparent py-1 cursor-pointer"
              >
                <option value="Default Rules Collection">Default Rules Collection</option>
                <option value="Ranked Solo Standard">Ranked Solo Standard</option>
                <option value="Squad Esports Championship">Squad Esports Championship</option>
              </select>
            </div>

            {/* MODE */}
            <div className="border-b border-gray-200 pb-1">
              <label className="block text-[11px] font-bold text-gray-700 tracking-wider mb-1 uppercase">
                MODE
              </label>
              <input
                type="text"
                value={contestMode}
                onChange={(e) => setContestMode(e.target.value)}
                placeholder="Solo / Duo / Squad / sdfg"
                className="w-full text-xs text-gray-800 outline-none bg-transparent py-1"
              />
            </div>

            {/* MAP */}
            <div className="border-b border-gray-200 pb-1">
              <label className="block text-[11px] font-bold text-gray-700 tracking-wider mb-1 uppercase">
                MAP
              </label>
              <input
                type="text"
                value={map}
                onChange={(e) => setMap(e.target.value)}
                placeholder="Bermuda / Purgatory / fdgs"
                className="w-full text-xs text-gray-800 outline-none bg-transparent py-1"
              />
            </div>
          </div>

          {/* CONTEST THUMBNAIL Card Box matching Images 8 & 9 */}
          <div className="rounded-2xl border border-gray-200 p-5 space-y-4 bg-white">
            <label className="block text-[11px] font-bold text-gray-800 tracking-wider uppercase">
              CONTEST THUMBNAIL
            </label>

            <div className="flex items-center gap-3">
              <label className="px-3.5 py-1.5 bg-[#7c4dff] hover:bg-[#651fff] text-white text-xs font-medium rounded-lg cursor-pointer transition-colors shadow-2xs">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-gray-500 truncate max-w-[200px]">
                {fileName}
              </span>
            </div>

            <p className="text-[11px] text-gray-400">
              {mode === 'duplicate'
                ? 'Leave empty to keep original contest thumbnail.'
                : mode === 'update'
                ? 'Leave empty to keep the current thumbnail.'
                : 'JPG, PNG, GIF or WebP — Max 5 MB'}
            </p>

            {/* Thumbnail preview container */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-64 h-36 rounded-xl border border-dashed border-gray-300 bg-neutral-900 flex items-center justify-center overflow-hidden shadow-inner">
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt="Contest Thumbnail"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400 font-medium">
                    No thumbnail
                  </span>
                )}
              </div>
            </div>

            {/* Youtube Link Toggle and input (Image 2) */}
            <div className="pt-2">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setHasYoutubeLink((prev) => !prev)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                    hasYoutubeLink ? 'bg-[#0070f3]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      hasYoutubeLink ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-xs font-medium text-gray-700">
                  Youtube Link
                </span>
              </div>

              {/* When Youtube Link is active - Image 2 */}
              {hasYoutubeLink && (
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
                  <label className="block text-[11px] font-bold text-gray-800 tracking-wider uppercase">
                    ADD VIDEO OR LIVE STREAM LINK
                  </label>
                  <input
                    type="url"
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full text-xs text-gray-800 border-b border-gray-300 py-1 outline-none focus:border-blue-500 bg-transparent"
                  />
                </div>
              )}
            </div>
          </div>

          {/* ADD RANK PRIZES Bar */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-gray-700 tracking-wider uppercase">
              ADD RANK PRIZES
            </label>
            <button
              type="button"
              onClick={() => setRankModalOpen(true)}
              className="w-full py-2.5 bg-[#dbe8f5] hover:bg-[#cde0f1] text-[#2c7be5] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <span>+ Rank Prizes</span>
              {rankPrizes.length > 0 && (
                <span className="ml-1.5 px-2 py-0.5 bg-blue-600 text-white rounded-full text-[10px]">
                  {rankPrizes.length} configured
                </span>
              )}
            </button>
          </div>

          {/* PRIZE DESCRIPTION */}
          <div className="border-b border-gray-200 pb-1">
            <label className="block text-[11px] font-bold text-gray-700 tracking-wider mb-1 uppercase">
              PRIZE DESCRIPTION
            </label>
            <textarea
              rows={2}
              value={prizeDesc}
              onChange={(e) => setPrizeDesc(e.target.value)}
              placeholder="Enter details about prize distribution..."
              className="w-full text-xs text-gray-800 outline-none bg-transparent py-1 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#00c853] hover:bg-[#00b048] rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              {mode === 'duplicate' ? 'Duplicate' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#e91e63] hover:bg-[#d81557] rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Rank Prizes Modal */}
      <RankPrizesModal
        isOpen={rankModalOpen}
        onClose={() => setRankModalOpen(false)}
        initialPrizes={rankPrizes}
        onSave={(prizes) => {
          setRankPrizes(prizes);
          notify({
            message: `Updated ${prizes.length} rank prize tier(s)`,
            type: 'success',
          });
        }}
      />
    </div>
  );
};
