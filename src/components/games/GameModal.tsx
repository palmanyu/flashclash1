import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { GameRecord } from './types';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: GameRecord | null;
  onSave: (name: string, gameType: string, thumbnailUrl: string) => void;
}

export const GameModal: React.FC<GameModalProps> = ({
  isOpen,
  onClose,
  game,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [gameType, setGameType] = useState('contest');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [fileName, setFileName] = useState('No file chosen');

  useEffect(() => {
    if (isOpen) {
      if (game) {
        setName(game.name || '');
        setGameType(game.gameType || 'contest');
        setThumbnailUrl(game.thumbnailUrl || '');
        setFileName(game.thumbnailUrl ? 'Current thumbnail' : 'No file chosen');
      } else {
        setName('');
        setGameType('contest');
        setThumbnailUrl('');
        setFileName('No file chosen');
      }
    }
  }, [isOpen, game]);

  if (!isOpen) return null;

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
    if (!name.trim()) return;
    onSave(name.trim(), gameType, thumbnailUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">
            {game ? `Update Game #${game.gameId}` : 'Add New Game'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Game Name */}
          <div className="border border-gray-900 rounded-xl p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
            <label className="block text-[11px] text-gray-500 mb-0.5">
              Game Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Game Name here"
              required
              className="w-full text-xs font-medium text-gray-900 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>

          {!game && (
            <div className="border border-gray-300 rounded-xl p-3 focus-within:border-blue-500">
              <label className="block text-[11px] text-gray-500 mb-0.5">
                Select Game Type
              </label>
              <select
                value={gameType}
                onChange={(e) => setGameType(e.target.value)}
                className="w-full text-xs text-gray-800 outline-none bg-transparent cursor-pointer"
              >
                <option value="Contest">Contest</option>
                <option value="Tournament">Tournament</option>
                <option value="Casual">Casual</option>
              </select>
            </div>
          )}

          {/* Game Thumbnail */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700">
              Game Thumbnail
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

            {game && (
              <p className="text-[11px] text-gray-500">
                Leave empty to keep current thumbnail
              </p>
            )}

            {/* Thumbnail Preview Box with Current thumbnail label */}
            <div className="space-y-1">
              <div className="w-full h-40 rounded-xl border border-gray-200 bg-gray-50/60 flex items-center justify-center overflow-hidden">
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt="Current thumbnail"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400 font-medium">
                    No thumbnail
                  </span>
                )}
              </div>
              {thumbnailUrl && (
                <div className="text-[11px] text-gray-500 text-center">
                  Current thumbnail
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-xs font-semibold text-[#e91e63] bg-[#fce4ec] hover:bg-pink-100 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-semibold text-white bg-[#00c853] hover:bg-[#00b048] rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
