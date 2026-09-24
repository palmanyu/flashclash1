import React, { useState, useEffect, useCallback } from 'react';
import { AdminView } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';
import { UsersView } from './components/UsersView';
import { GamesView } from './components/GamesView';
import { DepositsView } from './components/DepositsView';
import { WithdrawalsView } from './components/WithdrawalsView';
import { AnnouncementsView } from './components/AnnouncementsView';
import { CarouselsView } from './components/CarouselsView';
import { PushNotificationView } from './components/PushNotificationView';
import { ReferralLeaderboardView } from './components/ReferralLeaderboardView';
import { NotificationProvider, useNotification } from './context/NotificationContext';
import { AppRoute, parseCurrentRoute, navigateToView } from './utils/navigation';

function AdminApp() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => parseCurrentRoute());
  const currentView = currentRoute.view;
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  const { notify } = useNotification();

  // Listen for browser navigation (popstate, hashchange, custom app-route-change)
  useEffect(() => {
    // Sync route on initial mount without overriding URL if already deep-linked
    const initialRoute = parseCurrentRoute();
    setCurrentRoute(initialRoute);

    const handleLocationChange = () => {
      const detectedRoute = parseCurrentRoute();
      setCurrentRoute(detectedRoute);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('app-route-change', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('app-route-change', handleLocationChange);
    };
  }, []);

  // Central navigation handler that updates both React state and the browser URL
  const handleNavigate = useCallback(
    (view: AdminView) => {
      navigateToView(view);
      setCurrentRoute(parseCurrentRoute());
    },
    []
  );

  // If current view is login screen (URL: /login)
  if (currentView === 'login') {
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
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'users':
        return <UsersView route={currentRoute} />;
      case 'games':
      case 'games-stats':
        return <GamesView route={currentRoute} />;
      case 'requests-deposits':
        return <DepositsView />;
      case 'requests-withdrawals':
      case 'withdraw-request':
        return <WithdrawalsView />;
      case 'notify-announcements':
        return <AnnouncementsView onNavigate={handleNavigate} />;
      case 'notify-carousels':
        return <CarouselsView onNavigate={handleNavigate} />;
      case 'notify-push-notification':
        return <PushNotificationView onNavigate={handleNavigate} />;
      case 'leaderboards-referral':
        return <ReferralLeaderboardView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex flex-col antialiased text-slate-800 selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navbar */}
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onSignOut={() => handleNavigate('login')}
      />

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex w-full">
        {/* Left Sidebar */}
        <Sidebar
          currentView={currentView}
          onSelectView={handleNavigate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 p-4 sm:p-6 lg:p-8 transition-all duration-300">
          <div className={`flex-1 w-full mx-auto transition-all duration-300 ${sidebarOpen ? 'max-w-7xl' : 'max-w-none'}`}>
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
