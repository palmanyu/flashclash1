import React, { useState, useRef, useEffect } from 'react';
import { Menu, LogOut, ChevronDown } from 'lucide-react';
import { GamexAvatar } from './Icons';
import { useNotification } from '../context/NotificationContext';

interface HeaderProps {
  onToggleSidebar: () => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onSignOut,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notify } = useNotification();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-slate-100/80 sticky top-0 z-30 px-4 sm:px-6 h-16 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      {/* Left side: Hamburger + Title */}
      <div className="flex items-center gap-3">
        <button
          id="btn-sidebar-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation"
          className="p-1.5 -ml-1 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md transition-colors focus:outline-none"
        >
          <Menu className="w-6 h-6 stroke-[2.2]" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0e274b] select-none">
          Staff Panel
        </h1>
      </div>

      {/* Right side: User Profile with Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative" ref={dropdownRef}>
          <button
            id="btn-profile-dropdown"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer"
          >
            <GamexAvatar className="w-8 h-8 sm:w-9 sm:h-9 shadow-sm" />
            <span className="text-sm font-semibold text-slate-800 hidden sm:inline-block">
              Gamex
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-700 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Popover (Image 6 Replica) */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 py-3 px-3 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-2 pb-2">
                <p className="text-sm font-semibold text-slate-900">Owner Name</p>
                <p className="text-xs text-slate-400 mt-0.5">Owner</p>
              </div>
              
              <hr className="border-t border-slate-100 my-1.5" />

              <button
                id="btn-sign-out"
                onClick={() => {
                  setProfileOpen(false);
                  notify({
                    type: 'info',
                    title: 'Action Done',
                    message: 'You have been signed out of the Admin Panel.',
                  });
                  onSignOut();
                }}
                className="w-full flex items-center gap-2.5 px-2 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer text-left"
              >
                <LogOut className="w-4 h-4 text-blue-600 stroke-[2.2]" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
