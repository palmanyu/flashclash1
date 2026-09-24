import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface ColumnItem {
  key: string;
  label: string;
}

interface ColumnsDropdownProps {
  columns: ColumnItem[];
  visibleColumns: Record<string, boolean>;
  onToggleColumn: (key: string) => void;
  className?: string;
}

export const ColumnsDropdown: React.FC<ColumnsDropdownProps> = ({
  columns,
  visibleColumns,
  onToggleColumn,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer transition-colors select-none"
      >
        <span>Columns</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 min-w-[200px] bg-white rounded-2xl shadow-xl border border-slate-200/90 p-1.5 z-40 animate-in fade-in zoom-in-95 duration-100 select-none">
          {columns.map((col, idx) => {
            const isVisible = visibleColumns[col.key] !== false;
            return (
              <button
                key={col.key}
                type="button"
                onClick={() => onToggleColumn(col.key)}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-[13px] text-left rounded-xl cursor-pointer transition-all leading-tight border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-200/80 ${
                  isVisible
                    ? 'text-slate-800 hover:bg-slate-100 font-medium'
                    : 'text-slate-400 hover:bg-slate-50 font-normal'
                } ${idx === 0 ? 'hover:bg-slate-200/80 active:bg-slate-200' : ''}`}
              >
                <span className="truncate pr-2">{col.label}</span>
                {isVisible && (
                  <Check className="w-4 h-4 text-slate-800 stroke-[2] ml-3 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
