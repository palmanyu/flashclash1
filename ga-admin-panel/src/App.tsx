import React, { useState, useEffect, useCallback } from 'react';
import { AdminView, RouteInfo } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';
import { GamesStatsView } from './components/GamesStatsView';
import { WithdrawRequestView } from './components/WithdrawRequestView';
import {
  StaffsView,
  StaffRolesView,
  StaffPermissionsView,
  StaffActionLogView,
} from './components/StaffViews';
import {
  AdminsView,
  AdminRolesView,
  AdminActionLogView,
} from './components/AdminViews';
import {
  SupportSettingsView,
  ReferAndEarnSettingsView,
  UserWalletSettingsView,
  PaymentGatewayView,
  WithdrawalMethodsView,
  WebRedirectView,
} from './components/SettingsViews';
import { NotificationProvider, useNotification } from './context/NotificationContext';
import { getCurrentRouteFromUrl, navigateToView } from './utils/navigation';

function AdminApp() {
  const [currentRoute, setCurrentRoute] = useState<RouteInfo>(() => getCurrentRouteFromUrl());
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin_sidebar_open');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.innerWidth >= 768;
    }
    return true;
  });
  const [settingsOpen, setSettingsOpen] = useState(() => currentRoute.view.startsWith('settings-'));
  const { notify } = useNotification();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_sidebar_open', String(sidebarOpen));
    }
  }, [sidebarOpen]);

  // Listen for browser forward/back buttons (popstate & hashchange)
  useEffect(() => {
    // Sync URL on initial mount
    const initialRoute = getCurrentRouteFromUrl();
    setCurrentRoute(initialRoute);
    navigateToView(initialRoute.view, initialRoute.params, true);
    if (initialRoute.view.startsWith('settings-')) {
      setSettingsOpen(true);
    }

    const handleLocationChange = () => {
      const detectedRoute = getCurrentRouteFromUrl();
      setCurrentRoute(detectedRoute);
      if (detectedRoute.view.startsWith('settings-')) {
        setSettingsOpen(true);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Central navigation handler that updates both React state and the browser URL
  const handleNavigate = useCallback(
    (view: AdminView, params?: Record<string, string | number>) => {
      setCurrentRoute({ view, params });
      navigateToView(view, params);
      if (view.startsWith('settings-')) {
        setSettingsOpen(true);
      }
    },
    []
  );

  // If current view is login screen (URL: /login)
  if (currentRoute.view === 'login') {
    return (
      <div className="relative">
        {/* Floating helper badge to switch between Login and Admin Panel */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => handleNavigate('dashboard')}
            className="text-xs bg-slate-900/80 hover:bg-slate-900 text-white font-medium px-3 py-1.5 rounded-full shadow-md backdrop-blur-xs transition-colors cursor-pointer"
          >
            Switch to Admin Panel →
          </button>
        </div>
        <LoginView
          onLoginSuccess={() => {
            handleNavigate('dashboard');
            notify({
              type: 'success',
              title: 'Action Done',
              message: 'Signed in successfully. Welcome back to Admin Panel!',
            });
          }}
        />
      </div>
    );
  }

  // Render content corresponding to the selected view
  const renderViewContent = () => {
    switch (currentRoute.view) {
      case 'dashboard':
        return <DashboardView />;
      case 'games-stats':
        return <GamesStatsView />;
      case 'withdraw-request':
        return <WithdrawRequestView />;
      case 'staffs':
        return <StaffsView onNavigate={handleNavigate} />;
      case 'staff-roles':
        return <StaffRolesView onNavigate={handleNavigate} />;
      case 'staff-role-permission':
        return <StaffRolesView onNavigate={handleNavigate} roleId={currentRoute.params?.roleId} />;
      case 'staff-permissions':
        return <StaffPermissionsView onNavigate={handleNavigate} staffId={currentRoute.params?.staffId} />;
      case 'staff-action-log':
        return <StaffActionLogView onNavigate={handleNavigate} staffId={currentRoute.params?.staffId} />;
      case 'admins':
        return <AdminsView onNavigate={handleNavigate} />;
      case 'admins-roles':
        return <AdminRolesView onNavigate={handleNavigate} />;
      case 'admin-role-permission':
        return <AdminRolesView onNavigate={handleNavigate} roleId={currentRoute.params?.roleId} />;
      case 'admin-action-log':
        return <AdminActionLogView onNavigate={handleNavigate} adminId={currentRoute.params?.adminId} />;
      case 'settings-support':
        return <SupportSettingsView onNavigate={handleNavigate} />;
      case 'settings-refer-earn':
        return <ReferAndEarnSettingsView onNavigate={handleNavigate} />;
      case 'settings-user-wallet':
        return <UserWalletSettingsView onNavigate={handleNavigate} />;
      case 'settings-payment-gateway':
        return <PaymentGatewayView onNavigate={handleNavigate} />;
      case 'settings-withdrawal-methods':
        return <WithdrawalMethodsView onNavigate={handleNavigate} />;
      case 'goto-webapp':
        return <WebRedirectView type="webapp" />;
      case 'goto-staffpanel':
        return <WebRedirectView type="staffpanel" />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex flex-col antialiased text-slate-800 selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navbar */}
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        onSignOut={() => handleNavigate('login')}
      />

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex w-full">
        {/* Left Sidebar (Pill Navigation, Settings Accordion) */}
        <Sidebar
          currentView={currentRoute.view}
          onSelectView={handleNavigate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          settingsOpen={settingsOpen}
          onToggleSettings={() => setSettingsOpen(!settingsOpen)}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out">
          <div
            className={`flex-1 w-full transition-all duration-300 ease-in-out ${
              sidebarOpen ? 'max-w-7xl mx-auto' : 'w-full max-w-none'
            }`}
          >
            {renderViewContent()}
          </div>

          {/* Bottom Footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <AdminApp />
    </NotificationProvider>
  );
}
