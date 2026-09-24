import React, { useState, useEffect } from 'react';
import {
  LayoutGrid,
  Gamepad2,
  Bell,
  Trophy,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';
import { AdminView } from '../types';
import { RequestsNavIcon, UsersNavIcon } from './Icons';

interface SidebarProps {
  currentView: AdminView;
  onSelectView: (view: AdminView) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  isOpen,
  onClose,
}) => {
  // Only one accordion dropdown can be open at a time
  type AccordionSection = 'requests' | 'notify' | 'leaderboards' | null;

  const getSectionForView = (view: AdminView): AccordionSection => {
    if (view.startsWith('requests-')) return 'requests';
    if (view.startsWith('notify-')) return 'notify';
    if (view.startsWith('leaderboards-')) return 'leaderboards';
    return null;
  };

  const [openSection, setOpenSection] = useState<AccordionSection>(() =>
    getSectionForView(currentView)
  );

  // Sync open accordion when view changes
  useEffect(() => {
    const section = getSectionForView(currentView);
    if (section) {
      setOpenSection(section);
    }
  }, [currentView]);

  const toggleSection = (section: 'requests' | 'notify' | 'leaderboards') => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleNavClick = (view: AdminView) => {
    onSelectView(view);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="admin-sidebar"
        className={`fixed md:sticky top-0 md:top-16 z-40 md:z-20 h-full md:h-[calc(100vh-4rem)] shrink-0 bg-[#f4f7fb] overflow-y-auto transition-all duration-300 ease-in-out border-r border-slate-100 ${
          isOpen
            ? 'w-64 p-3.5 translate-x-0 opacity-100'
            : '-translate-x-full md:translate-x-0 md:w-0 md:p-0 md:border-r-0 md:overflow-hidden md:opacity-0'
        }`}
      >
        {/* Mobile Header in Drawer */}
        <div className="flex items-center justify-between pb-3 md:hidden border-b border-slate-200/60 mb-3">
          <span className="font-bold text-slate-800 text-base">Navigation</span>
          <button
            onClick={onClose}
            className="p-1 text-slate-500 hover:text-slate-800 rounded-md cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items Stack */}
        <nav className="flex flex-col gap-2.5">
          {/* 1. Dashboard */}
          <button
            id="nav-dashboard"
            onClick={() => handleNavClick('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer ${
              currentView === 'dashboard'
                ? 'bg-white text-blue-600 border-2 border-blue-500 shadow-xs'
                : 'bg-white text-[#0f2d59] border border-slate-100 hover:border-blue-200 hover:text-blue-600 shadow-xs'
            }`}
          >
            <LayoutGrid className="w-5 h-5 text-blue-600 shrink-0" />
            <span className="truncate">Dashboard</span>
          </button>

          {/* 2. Users */}
          <button
            id="nav-users"
            onClick={() => handleNavClick('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer ${
              currentView === 'users'
                ? 'bg-white text-blue-600 border-2 border-blue-500 shadow-xs'
                : 'bg-white text-[#0f2d59] border border-slate-100 hover:border-blue-200 hover:text-blue-600 shadow-xs'
            }`}
          >
            <UsersNavIcon className="w-5 h-5 text-blue-600 shrink-0" />
            <span className="truncate">Users</span>
          </button>

          {/* 3. Games */}
          <button
            id="nav-games"
            onClick={() => handleNavClick('games')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer ${
              currentView === 'games'
                ? 'bg-white text-blue-600 border-2 border-blue-500 shadow-xs'
                : 'bg-white text-[#0f2d59] border border-slate-100 hover:border-blue-200 hover:text-blue-600 shadow-xs'
            }`}
          >
            <Gamepad2 className="w-5 h-5 text-blue-600 shrink-0" />
            <span className="truncate">Games</span>
          </button>

          {/* 4. Requests (Accordion with Deposits & Withdrawals) */}
          <div
            className={`rounded-lg bg-white overflow-hidden transition-all shadow-xs ${
              openSection === 'requests'
                ? 'border-2 border-blue-500'
                : 'border border-slate-100 hover:border-blue-200'
            }`}
          >
            <button
              id="nav-requests-toggle"
              onClick={() => {
                const willOpen = openSection !== 'requests';
                toggleSection('requests');
                if (willOpen && !currentView.startsWith('requests-')) {
                  handleNavClick('requests-deposits');
                }
              }}
              className="w-full flex items-center justify-between px-4 py-3 text-xs sm:text-sm font-semibold text-[#0f2d59] hover:text-blue-600 transition-colors text-left cursor-pointer bg-white"
            >
              <div className="flex items-center gap-3">
                <RequestsNavIcon className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Requests</span>
              </div>
              {openSection === 'requests' ? (
                <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-blue-600 shrink-0" />
              )}
            </button>

            {openSection === 'requests' && (
              <div className="pb-3 pt-1 px-3 flex flex-col gap-1 border-t border-slate-100/70 bg-white">
                <button
                  id="nav-requests-deposits"
                  onClick={() => handleNavClick('requests-deposits')}
                  className={`w-full text-left pl-8 pr-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    currentView === 'requests-deposits'
                      ? 'text-blue-600 font-semibold bg-blue-50/70'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  Deposits
                </button>
                <button
                  id="nav-requests-withdrawals"
                  onClick={() => handleNavClick('requests-withdrawals')}
                  className={`w-full text-left pl-8 pr-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    currentView === 'requests-withdrawals'
                      ? 'text-blue-600 font-semibold bg-blue-50/70'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  Withdrawals
                </button>
              </div>
            )}
          </div>

          {/* 5. Notify (Accordion with Announcements, Carousels, Push Notification) */}
          <div
            className={`rounded-lg bg-white overflow-hidden transition-all shadow-xs ${
              openSection === 'notify'
                ? 'border-2 border-blue-500'
                : 'border border-slate-100 hover:border-blue-200'
            }`}
          >
            <button
              id="nav-notify-toggle"
              onClick={() => {
                const willOpen = openSection !== 'notify';
                toggleSection('notify');
                if (willOpen && !currentView.startsWith('notify-')) {
                  handleNavClick('notify-announcements');
                }
              }}
              className="w-full flex items-center justify-between px-4 py-3 text-xs sm:text-sm font-semibold text-[#0f2d59] hover:text-blue-600 transition-colors text-left cursor-pointer bg-white"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Notify</span>
              </div>
              {openSection === 'notify' ? (
                <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-blue-600 shrink-0" />
              )}
            </button>

            {openSection === 'notify' && (
              <div className="pb-3 pt-1 px-3 flex flex-col gap-1 border-t border-slate-100/70 bg-white">
                <button
                  id="nav-notify-announcements"
                  onClick={() => handleNavClick('notify-announcements')}
                  className={`w-full text-left pl-8 pr-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    currentView === 'notify-announcements'
                      ? 'text-blue-600 font-semibold bg-blue-50/70'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  Announcements
                </button>
                <button
                  id="nav-notify-carousels"
                  onClick={() => handleNavClick('notify-carousels')}
                  className={`w-full text-left pl-8 pr-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    currentView === 'notify-carousels'
                      ? 'text-blue-600 font-semibold bg-blue-50/70'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  Carousels
                </button>
                <button
                  id="nav-notify-push"
                  onClick={() => handleNavClick('notify-push-notification')}
                  className={`w-full text-left pl-8 pr-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    currentView === 'notify-push-notification'
                      ? 'text-blue-600 font-semibold bg-blue-50/70'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  Push Notification
                </button>
              </div>
            )}
          </div>

          {/* 6. Leaderboards (Accordion with Referral Leaderboard) */}
          <div
            className={`rounded-lg bg-white overflow-hidden transition-all shadow-xs ${
              openSection === 'leaderboards'
                ? 'border-2 border-blue-500'
                : 'border border-slate-100 hover:border-blue-200'
            }`}
          >
            <button
              id="nav-leaderboards-toggle"
              onClick={() => {
                const willOpen = openSection !== 'leaderboards';
                toggleSection('leaderboards');
                if (willOpen && !currentView.startsWith('leaderboards-')) {
                  handleNavClick('leaderboards-referral');
                }
              }}
              className="w-full flex items-center justify-between px-4 py-3 text-xs sm:text-sm font-semibold text-[#0f2d59] hover:text-blue-600 transition-colors text-left cursor-pointer bg-white"
            >
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Leaderboards</span>
              </div>
              {openSection === 'leaderboards' ? (
                <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-blue-600 shrink-0" />
              )}
            </button>

            {openSection === 'leaderboards' && (
              <div className="pb-3 pt-1 px-3 flex flex-col gap-1 border-t border-slate-100/70 bg-white">
                <button
                  id="nav-leaderboards-referral"
                  onClick={() => handleNavClick('leaderboards-referral')}
                  className={`w-full text-left pl-8 pr-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    currentView === 'leaderboards-referral'
                      ? 'text-blue-600 font-semibold bg-blue-50/70'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  Referral Leaderboard
                </button>
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
};
