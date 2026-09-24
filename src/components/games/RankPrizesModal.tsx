import React, { useState, useEffect } from 'react';
import { Zap, Trash2, X, Plus } from 'lucide-react';
import { RankPrizeItem } from './types';

interface RankPrizesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrizes: RankPrizeItem[];
  onSave: (prizes: RankPrizeItem[]) => void;
}

export const RankPrizesModal: React.FC<RankPrizesModalProps> = ({
  isOpen,
  onClose,
  initialPrizes,
  onSave,
}) => {
  const [prizes, setPrizes] = useState<RankPrizeItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (initialPrizes && initialPrizes.length > 0) {
        setPrizes(initialPrizes);
      } else {
        setPrizes([{ id: '1', rank: '', prize: '' }]);
      }
    }
  }, [isOpen, initialPrizes]);

  if (!isOpen) return null;

  const handleAddRow = () => {
    const nextId = `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setPrizes((prev) => [...prev, { id: nextId, rank: '', prize: '' }]);
  };

  const handleRemoveRow = (id: string) => {
    setPrizes((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdate = (id: string, field: 'rank' | 'prize', val: string) => {
    setPrizes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    );
  };

  const handleSave = () => {
    const valid = prizes.filter((p) => p.rank.trim() || p.prize.trim());
    onSave(valid);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Zap className="w-5 h-5 fill-blue-600 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 leading-snug">
                Configure Rank Prizes
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Add rank-wise prize distribution for this contest
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dashed Content Box */}
        <div className="px-6 py-2">
          <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/40 space-y-3 max-h-96 overflow-y-auto">
            {prizes.map((p, idx) => (
              <div key={p.id} className="flex items-center gap-2">
                <div className="flex-1 bg-white p-2.5 rounded-xl border border-gray-200 focus-within:border-blue-500 transition-colors">
                  <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                    Rank
                  </label>
                  <input
                    type="text"
                    value={p.rank}
                    onChange={(e) => handleUpdate(p.id, 'rank', e.target.value)}
                    placeholder="Enter Rank"
                    className="w-full text-xs text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>

                <div className="flex-1 bg-white p-2.5 rounded-xl border border-gray-200 focus-within:border-blue-500 transition-colors">
                  <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                    Prize
                  </label>
                  <input
                    type="text"
                    value={p.prize}
                    onChange={(e) => handleUpdate(p.id, 'prize', e.target.value)}
                    placeholder="Enter Prize Amount"
                    className="w-full text-xs text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>

                {prizes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(p.id)}
                    className="p-3 text-pink-500 bg-pink-50 hover:bg-pink-100 rounded-xl transition-colors cursor-pointer self-center"
                    title="Remove Rank"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddRow}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Rank Prize</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Save Prize Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};
