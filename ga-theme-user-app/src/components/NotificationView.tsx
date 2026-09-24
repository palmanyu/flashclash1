import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface NotificationViewProps {
  onBack: () => void;
  title?: string;
}

const NOTIFICATION_ITEMS = [
  { id: 'notif-1', title: 'dcccccc' },
  { id: 'notif-2', title: 'dccccc' },
  { id: 'notif-3', title: 'dcccc' },
  { id: 'notif-4', title: 'dccc' },
  { id: 'notif-5', title: 'dcc' },
  { id: 'notif-6', title: 'Demo App' },
];

/**
 * Pixel-accurate Notification component matching Image 5
 */
export const NotificationView: React.FC<NotificationViewProps> = ({
  onBack,
  title = 'Notification',
}) => {
  const [items, setItems] = useState(NOTIFICATION_ITEMS);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full bg-white select-none text-slate-900 overflow-hidden">
      {/* Top Header Bar */}
      <div className="shrink-0 h-14 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-3 relative z-20">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-full active:scale-95 transition-all cursor-pointer z-10"
          aria-label="Back"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
        <h1 className="absolute inset-x-0 text-center font-bold text-slate-900 text-base tracking-wide pointer-events-none font-['Outfit',_sans-serif]">
          {title}
        </h1>
        <div className="w-9" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-3.5 pt-4 pb-24 space-y-3 overscroll-contain bg-white">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item.title)}
            className="bg-slate-50 hover:bg-slate-100 active:scale-[0.99] rounded-xl px-4 py-3 shadow-xs border border-slate-200 cursor-pointer transition-all flex items-center justify-between"
          >
            <span className="text-slate-900 font-medium text-xs sm:text-sm block select-text">
              {item.title}
            </span>
            <span className="text-[10px] text-red-600 font-bold tracking-wider">VIEW</span>
          </div>
        ))}
      </div>

      {/* Item Detail Toast / Dialog */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-2xl p-5 max-w-xs w-full text-center space-y-3 shadow-xl"
          >
            <h4 className="font-bold text-slate-900 text-base">{selectedItem}</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Official announcement notification: {selectedItem}. Stay tuned for upcoming tournaments and updates!
            </p>
            <button
              onClick={() => setSelectedItem(null)}
              className="w-full py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
