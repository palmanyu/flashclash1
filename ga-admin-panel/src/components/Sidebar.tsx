import React from 'react';
import {
  LayoutDashboard,
  Settings,
  Globe,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';
import { SidebarUserIcon, SidebarUsersIcon } from './Icons';
import { AdminView } from '../types';

interface SidebarProps {
  currentView: AdminView;
  onSelectView: (view: AdminView) => void;
  isOpen: boolean;
  onClose: () => void;
  settingsOpen: boolean;
  onToggleSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  isOpen,
  onClose,
  settingsOpen,
  onToggleSettings,
}) => {
  // Prevent background scrolling on mobile when sidebar drawer is open
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isOpen && window.innerWidth < 768) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;

      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [isOpen]);

  const handleNavClick = (view: AdminView) => {
    onSelectView(view);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      view: 'dashboard' as AdminView,
      icon: <LayoutDashboard className="w-4 h-4 text-blue-600 shrink-0" />,
    },
    {
      id: 'games-stats',
      label: 'Games Stats',
      view: 'games-stats' as AdminView,
      icon: <SidebarUserIcon className="w-4 h-4 text-blue-600 shrink-0" />,
    },
    {
      id: 'withdraw-request',
      label: 'Withdraw Request',
      view: 'withdraw-request' as AdminView,
      icon: <SidebarUserIcon className="w-4 h-4 text-blue-600 shrink-0" />,
    },
    {
      id: 'staffs',
      label: 'Staffs',
      view: 'staffs' as AdminView,
      icon: <SidebarUserIcon className="w-4 h-4 text-blue-600 shrink-0" />,
    },
    {
      id: 'staff-roles',
      label: 'Staff Roles',
      view: 'staff-roles' as AdminView,
      icon: <SidebarUserIcon className="w-4 h-4 text-blue-600 shrink-0" />,
    },
    {
      id: 'staff-action-log',
      label: 'Staff Action Log',
      view: 'staff-action-log' as AdminView,
      icon: <SidebarUsersIcon className="w-4 h-4 text-blue-600 shrink-0" />,
    },
    {
      id: 'admins',
      label: 'Admins',
      view: 'admins' as AdminView,
      icon: <SidebarUserIcon className="w-4 h-4 text-blue-600 shrink-0" />,
    },
    {
      id: 'admins-roles',
      label: 'Admins Roles',
      view: 'admins-roles' as AdminView,
      icon: <SidebarUserIcon className="w-4 h-4 text-blue-600 shrink-0" />,
    },
    {
      id: 'admin-action-log',
      label: 'Admin Action Log',
      view: 'admin-action-log' as AdminView,
      icon: <SidebarUserIcon className="w-4 h-4 text-blue-600 shrink-0" />,
    },
  ];

  const settingsSubItems = [
    { id: 'sub-support', label: 'Support', view: 'settings-support' as AdminView },
    { id: 'sub-refer', label: 'Refer And Earn', view: 'settings-refer-earn' as AdminView },
    { id: 'sub-wallet', label: 'User Wallet', view: 'settings-user-wallet' as AdminView },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 md:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="admin-sidebar"
        className={`fixed inset-y-0 left-0 top-0 bottom-0 z-50 h-screen h-[100dvh] w-68 max-w-[85vw] bg-[#f4f7fb] overflow-y-auto overscroll-contain transition-all duration-300 ease-in-out shrink-0 border-r border-slate-200/80 shadow-2xl md:shadow-none md:static md:sticky md:top-16 md:inset-auto md:z-20 md:h-[calc(100vh-4rem)] ${
          isOpen
            ? 'translate-x-0 p-3.5 opacity-100 pointer-events-auto md:w-60 md:p-3'
            : '-translate-x-full md:translate-x-0 md:w-0 md:p-0 md:opacity-0 md:border-transparent md:pointer-events-none'
        }`}
      >
        <div
          className={`w-full min-w-[13.5rem] transition-opacity duration-200 ${
            isOpen ? 'opacity-100' : 'opacity-0 md:pointer-events-none'
          }`}
        >
          {/* Mobile Header in Drawer */}
          <div className="flex items-center justify-between pb-3 md:hidden border-b border-slate-200/80 mb-3 px-1 pt-1">
            <span className="font-bold text-slate-800 text-lg">Menu</span>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg cursor-pointer transition-colors active:scale-95"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 stroke-[2.3]" />
            </button>
          </div>

          {/* Navigation Items Stack */}
          <nav className="flex flex-col gap-2 pb-16 md:pb-4">
          {navItems.map((item) => {
            const isActive =
              currentView === item.view ||
              (item.view === 'staff-roles' && (currentView === 'staff-permissions' || currentView === 'staff-role-permission')) ||
              (item.view === 'admins-roles' && currentView === 'admin-role-permission');
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.view)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-white text-blue-600 border-2 border-blue-500 shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-100 hover:border-blue-200 hover:text-blue-600 shadow-xs'
                }`}
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}

          {/* Settings Item with Accordion */}
          <div className="rounded-lg bg-white border border-slate-100 shadow-xs overflow-hidden">
            <button
              id="nav-settings"
              onClick={onToggleSettings}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                currentView.startsWith('settings-')
                  ? 'text-blue-600'
                  : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Settings</span>
              </div>
              {settingsOpen ? (
                <ChevronUp className="w-4 h-4 text-blue-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-blue-600" />
              )}
            </button>

            {/* Sub-items (Image 3) */}
            {settingsOpen && (
              <div className="pb-2 pt-1 px-2 flex flex-col gap-1 border-t border-slate-50">
                {settingsSubItems.map((sub) => {
                  const isSubActive =
                    currentView === sub.view ||
                    (sub.view === 'settings-user-wallet' &&
                      (currentView === 'settings-payment-gateway' ||
                        currentView === 'settings-withdrawal-methods'));
                  return (
                    <button
                      key={sub.id}
                      id={`nav-${sub.id}`}
                      onClick={() => handleNavClick(sub.view)}
                      className={`w-full text-left pl-7 pr-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        isSubActive
                          ? 'text-blue-600 font-semibold bg-blue-50/60'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                      }`}
                    >
                      {sub.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* External / Redirect Links */}
          <button
            id="nav-goto-webapp"
            onClick={() => handleNavClick('goto-webapp')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
              currentView === 'goto-webapp'
                ? 'bg-white text-blue-600 border-2 border-blue-500 shadow-xs'
                : 'bg-white text-slate-700 border border-slate-100 hover:border-blue-200 hover:text-blue-600 shadow-xs'
            }`}
          >
            <Globe className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="truncate">goto Web App</span>
          </button>

          <button
            id="nav-goto-staffpanel"
            onClick={() => handleNavClick('goto-staffpanel')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
              currentView === 'goto-staffpanel'
                ? 'bg-white text-blue-600 border-2 border-blue-500 shadow-xs'
                : 'bg-white text-slate-700 border border-slate-100 hover:border-blue-200 hover:text-blue-600 shadow-xs'
            }`}
          >
            <Globe className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="truncate">goto Staff Panel</span>
          </button>
        </nav>
        </div>
      </aside>
    </>
  );
};
