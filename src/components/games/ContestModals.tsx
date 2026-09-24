import React, { useState, useEffect } from 'react';
import { X, Check, ChevronDown } from 'lucide-react';
import { ContestRecord, ContestStatus } from './types';

interface IdPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  contest: ContestRecord | null;
  onSave: (roomId: string, roomPass: string) => void;
}

export const IdPassModal: React.FC<IdPassModalProps> = ({
  isOpen,
  onClose,
  contest,
  onSave,
}) => {
  const [roomId, setRoomId] = useState('');
  const [roomPass, setRoomPass] = useState('');

  useEffect(() => {
    if (isOpen && contest) {
      setRoomId(contest.roomId || '');
      setRoomPass(contest.roomPass || '');
    }
  }, [isOpen, contest]);

  if (!isOpen || !contest) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(roomId, roomPass);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">
            Update Room Id and Password
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <label className="block text-[11px] font-semibold text-gray-500 mb-1">
              Room Id
            </label>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter Room Id here"
              className="w-full text-xs text-gray-900 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <label className="block text-[11px] font-semibold text-gray-500 mb-1">
              Room Password
            </label>
            <input
              type="text"
              value={roomPass}
              onChange={(e) => setRoomPass(e.target.value)}
              placeholder="Enter Room Password here"
              className="w-full text-xs text-gray-900 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>

          <p className="text-[11px] text-gray-400">
            Last Updated: {contest.updatedAt || '9/17/2026, 11:47:08 AM'}
          </p>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold text-[#e91e63] bg-[#fce4ec] hover:bg-pink-100 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#00c853] hover:bg-[#00b048] rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  contest: ContestRecord | null;
  onSave: (status: ContestStatus) => void;
}

const STATUS_OPTIONS: { label: string; value: ContestStatus }[] = [
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Ongoing', value: 'ongoing' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Cancelling', value: 'cancelling' },
  { label: 'Resulted', value: 'resulted' },
  { label: 'Resulting', value: 'resulting' },
];

export const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  contest,
  onSave,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<ContestStatus>('upcoming');
  const [dropdownOpen, setDropdownOpen] = useState(true);

  useEffect(() => {
    if (isOpen && contest) {
      setSelectedStatus(contest.status || 'upcoming');
      setDropdownOpen(true);
    }
  }, [isOpen, contest]);

  if (!isOpen || !contest) return null;

  const currentLabel =
    STATUS_OPTIONS.find((s) => s.value === contest.status)?.label ||
    contest.status;

  const handleSelect = (val: ContestStatus) => {
    setSelectedStatus(val);
  };

  const handleSave = () => {
    onSave(selectedStatus);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">Update Status</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs font-semibold text-gray-700">
            Current Status: {currentLabel}
          </p>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-full text-left bg-white rounded-xl border border-gray-300 p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all flex items-center justify-between"
            >
              <div>
                <span className="block text-[10px] text-gray-400 font-medium">
                  Select New Status
                </span>
                <span className="text-xs font-medium text-gray-800">
                  {STATUS_OPTIONS.find((s) => s.value === selectedStatus)?.label}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="mt-1.5 w-full bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden py-1 z-10">
                {STATUS_OPTIONS.map((item) => {
                  const isSelected = selectedStatus === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        handleSelect(item.value);
                      }}
                      className="w-full px-4 py-2.5 text-xs text-left flex items-center justify-between hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                    >
                      <span className={isSelected ? 'text-blue-600 font-semibold' : ''}>
                        {item.label}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-3 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold text-[#e91e63] bg-[#fce4ec] hover:bg-pink-100 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#00c853] hover:bg-[#00b048] rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
