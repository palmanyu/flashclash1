/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { NavTab, MatchCategory, TournamentCard, UserProfile, SignUpFormData, LoginFormData } from './types';
import { useAppRouter, ContestTab, buildContestUrl } from './router';
import { Header } from './components/Header';
import { RulesTicker } from './components/RulesTicker';
import { InstagramBanner } from './components/InstagramBanner';
import { MyMatchesSection } from './components/MyMatchesSection';
import { EsportsGamesSection } from './components/EsportsGamesSection';
import { BottomNav } from './components/BottomNav';
import { JoystickLoader } from './components/JoystickLoader';
import {
  CarouselBannerSkeleton,
  EsportsGamesSectionSkeleton,
} from './components/SkeletonLoaders';
import {
  InstagramModal,
  TournamentModal,
  MyMatchesModal,
} from './components/Modals';
import { LeaderboardView } from './components/LeaderboardView';
import { ReferEarnView } from './components/ReferEarnView';
import { MenuView } from './components/MenuView';
import { WalletView } from './components/WalletView';
import { NotificationView } from './components/NotificationView';
import { RechargeView } from './components/RechargeView';
import { WithdrawView } from './components/WithdrawView';
import { RedeemWonCoinsView } from './components/RedeemWonCoinsView';
import { ProfileView } from './components/ProfileView';
import { ContactView } from './components/ContactView';
import { ContestView } from './components/ContestView';
import { ContestDetailView } from './components/ContestDetailView';
import { MatchResultView } from './components/MatchResultView';
import { LoginView } from './components/LoginView';
import { SignUpView } from './components/SignUpView';
import { OtpVerificationView } from './components/OtpVerificationView';
import { SplashScreen } from './components/SplashScreen';
import { LanguageSelectView } from './components/LanguageSelectView';
import { WelcomeGatewayView } from './components/WelcomeGatewayView';
import { ToastNotification } from './components/ToastNotification';
import { GuestAuthPromptModal, GuestRestrictedAction } from './components/GuestAuthPromptModal';
import { getAuthModeCookie, setAuthModeCookie, clearAuthModeCookie } from './utils/authCookie';
import { ShieldAlert } from 'lucide-react';
import { INITIAL_CONTESTS, Contest } from './data/contestsData';
import {
  TOURNAMENT_THUMB_BR_FULL_MAP,
  TOURNAMENT_THUMB_CS_1V1,
  TOURNAMENT_THUMB_SOLO_SURVIVAL,
  TOURNAMENT_THUMB_LONE_WOLF,
  TOURNAMENT_THUMB_SOLO_SURVIVAL_2,
  TOURNAMENT_THUMB_CS_4V4,
} from './data/graphics';

const TOURNAMENTS_DATA: TournamentCard[] = [
  {
    id: 't-1',
    title: 'BR FULL MAP',
    subtitle: 'TOURNAMENT',
    badge: 'FREE FIRE MAX',
    gameMode: 'FULL MAP',
    activePlayers: 24,
    entryFee: 10,
    prizePool: 180,
    perKill: 5,
    type: 'Solo / Squad',
    map: 'Bermuda',
    time: '08:00 PM',
    spotsTotal: 48,
    spotsFilled: 37,
    themeColor: 'red',
    characterType: 'bandana',
    thumbnailUrl: 'https://fs.digicroz.com/gamex-bucket/gaming-app/media/game-thumbnail.d6334f58.jpg',
    imageUrl: 'https://fs.digicroz.com/gamex-bucket/gaming-app/media/game-thumbnail.d6334f58.jpg',
  },
  {
    id: 't-2',
    title: 'CLASH SQUAD ...',
    subtitle: 'TOURNAMENT',
    badge: 'FREE FIRE MAX',
    gameMode: 'CS 1V1 / 2V2',
    activePlayers: 54,
    entryFee: 20,
    prizePool: 35,
    perKill: 0,
    type: '1v1 Knockout',
    map: 'Factory Roof',
    time: '08:30 PM',
    spotsTotal: 32,
    spotsFilled: 28,
    themeColor: 'cyan',
    characterType: 'cowboy',
    thumbnailUrl: 'https://fs.digicroz.com/gamex-bucket/gaming-app/media/game-thumbnail.8818d5d0.jpg',
    imageUrl: 'https://fs.digicroz.com/gamex-bucket/gaming-app/media/game-thumbnail.8818d5d0.jpg',
  },
];

export default function App() {
  const {
    currentRoute,
    routeDetails,
    navigate,
    navigateToContest,
    navigateToContestDetail,
    navigateToMyMatches,
    goBack,
  } = useAppRouter();
  const [balance, setBalance] = useState<number>(9980);
  const [winBalance, setWinBalance] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const authMode = getAuthModeCookie();
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gamex_user_profile');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return {
            ...parsed,
            isLoggedIn: authMode === 'logged_in',
          };
        } catch {
          // ignore corrupted local storage
        }
      }
    }
    if (authMode === 'guest') {
      return {
        firstName: 'Guest',
        lastName: 'Gamer',
        username: 'Guest_Gamer',
        email: '',
        phoneNumber: '',
        isLoggedIn: false,
      };
    }
    if (authMode === 'logged_in') {
      return {
        firstName: 'Digi',
        lastName: 'Croz',
        username: 'digicroz',
        email: 'digicroz@digi.com',
        phoneNumber: '7896748333',
        isLoggedIn: true,
      };
    }
    // Brand new visitor (neither guest nor logged in yet)
    return {
      firstName: '',
      lastName: '',
      username: 'Gamer',
      email: '',
      phoneNumber: '',
      isLoggedIn: false,
    };
  });
  const [appUsername, setAppUsername] = useState<string>(currentUser.username);
  const [tournaments, setTournaments] = useState<TournamentCard[]>(TOURNAMENTS_DATA);
  const [contestsList, setContestsList] = useState<Contest[]>(INITIAL_CONTESTS);

  // Sync profile to localStorage whenever changed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gamex_user_profile', JSON.stringify(currentUser));
    }
    setAppUsername(currentUser.username);
  }, [currentUser]);

  // Modals state
  const [isInstagramOpen, setIsInstagramOpen] = useState<boolean>(false);
  const [selectedMatchCategory, setSelectedMatchCategory] = useState<MatchCategory | null>(null);
  const [selectedTournament, setSelectedTournament] = useState<TournamentCard | null>(null);
  const [toastMsg, setToastMsg] = useState<string>('');
  const [isHomeLoading, setIsHomeLoading] = useState<boolean>(true);

  // Splash & Onboarding state - always active on app open / reload
  const [preferredLanguage, setPreferredLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gamex_preferred_lang') || 'English';
    }
    return 'English';
  });
  const [isInitialSplashActive, setIsInitialSplashActive] = useState<boolean>(true);

  const handleInitialSplashFinish = () => {
    setIsInitialSplashActive(false);
    const authMode = getAuthModeCookie();
    if (authMode === 'guest' || authMode === 'logged_in') {
      // User already made a selection (Guest or Logged In):
      // Do NOT display language or welcome pages!
      if (currentRoute === 'splash' || currentRoute === 'language' || currentRoute === 'welcome') {
        navigate('home');
      }
    } else {
      // User has NOT selected Guest or Login yet (first-time visitor):
      // Display Language first, then Welcome gateway
      navigate('language');
    }
  };

  // Initial loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHomeLoading(false);
    }, 550);
    return () => clearTimeout(timer);
  }, []);

  const [guestAction, setGuestAction] = useState<GuestRestrictedAction | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
  };

  const handleAddMoney = (amount: number) => {
    if (!currentUser.isLoggedIn) {
      setGuestAction('deposit');
      return;
    }
    setBalance((prev) => prev + amount);
  };

  const handleOpenContestCategory = (categoryName: string) => {
    const isFree = categoryName.toUpperCase().includes('FREE');
    const defaultTab = isFree ? 'ongoing' : 'upcoming';
    navigateToContest(categoryName, defaultTab);
  };

  const handleJoinContest = (contestId: string, ign: string) => {
    if (!currentUser.isLoggedIn) {
      setGuestAction('join');
      return;
    }
    const target = contestsList.find((c) => c.id === contestId);
    if (!target) return;
    if (balance < target.entryFee) {
      showToast('Insufficient wallet balance! Please recharge.');
      return;
    }
    setBalance((prev) => Math.max(0, prev - target.entryFee));
    setContestsList((prev) =>
      prev.map((c) =>
        c.id === contestId
          ? {
              ...c,
              spotsFilled: Math.min(c.spotsTotal, c.spotsFilled + 1),
              isJoined: true,
              userIgn: ign,
            }
          : c
      )
    );
    showToast(`Joined Contest #${contestId} as "${ign}"!`);
  };

  const handleJoinTournament = (tournament: TournamentCard, _ign: string) => {
    if (!currentUser.isLoggedIn) {
      setGuestAction('join');
      return;
    }
    setBalance((prev) => Math.max(0, prev - tournament.entryFee));
    setTournaments((prev) =>
      prev.map((t) =>
        t.id === tournament.id
          ? { ...t, spotsFilled: Math.min(t.spotsTotal, t.spotsFilled + 1) }
          : t
      )
    );
  };

  const handleLoginSuccess = (formData: LoginFormData) => {
    const rawId = formData.identifier.trim();
    const uname = rawId.includes('@') ? rawId.split('@')[0] : rawId;
    setAuthModeCookie('logged_in');
    const updated: UserProfile = {
      ...currentUser,
      username: uname,
      isLoggedIn: true,
    };
    setCurrentUser(updated);
    setAppUsername(uname);
    showToast(`Welcome back, ${uname}!`);
    navigate('home');
  };

  const [pendingSignUpData, setPendingSignUpData] = useState<SignUpFormData | null>(null);

  const handleProceedToOtp = (data: SignUpFormData) => {
    setPendingSignUpData(data);
    showToast(`Verification code sent to ${data.email}`);
    navigate('otp-verify');
  };

  const handleOtpVerified = () => {
    if (pendingSignUpData) {
      handleSignUpSuccess(pendingSignUpData);
      setPendingSignUpData(null);
    } else {
      navigate('home');
    }
  };

  const handleSignUpSuccess = (data: SignUpFormData) => {
    setAuthModeCookie('logged_in');
    const newUser: UserProfile = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      phoneNumber: data.phoneNumber,
      referCode: data.referCode,
      isLoggedIn: true,
    };
    setCurrentUser(newUser);
    setAppUsername(data.username);

    if (data.referCode) {
      handleAddMoney(10);
      showToast(`Welcome ${data.username}! ₹10 referral bonus added!`);
    } else {
      showToast(`Welcome to Gamex, ${data.username}! Account verified.`);
    }
    navigate('home');
  };

  const handleLogout = () => {
    clearAuthModeCookie();
    setCurrentUser({
      firstName: '',
      lastName: '',
      username: 'Gamer',
      email: '',
      phoneNumber: '',
      isLoggedIn: false,
    });
    showToast('You have been signed out.');
    navigate('welcome');
  };

  const bottomNavTab: NavTab =
    currentRoute === 'earn'
      ? 'earn'
      : currentRoute === 'leaderboard'
      ? 'leaderboard'
      : currentRoute === 'wallet' || currentRoute === 'recharge' || currentRoute === 'withdraw' || currentRoute === 'redeem'
      ? 'wallet'
      : currentRoute === 'profile' || currentRoute === 'menu' || currentRoute === 'contact'
      ? 'menu'
      : 'home';

  return (
    <div className="h-[100dvh] bg-slate-100 text-slate-900 flex justify-center selection:bg-red-600 selection:text-white overflow-hidden font-['Outfit',_sans-serif]">
      {/* Mobile-contained layout frame for exact viewport fidelity */}
      <div className="w-full max-w-md h-full bg-white text-slate-900 flex flex-col relative shadow-2xl border-x border-slate-200 overflow-hidden font-['Outfit',_sans-serif]">
        {/* Toast Notification Alert Matching White Theme */}
        <ToastNotification message={toastMsg} onClose={() => setToastMsg('')} />

        {/* Initial 2-3s Splash Screen on App Launch */}
        {isInitialSplashActive ? (
          <main className="flex-1 overflow-hidden">
            <SplashScreen onComplete={handleInitialSplashFinish} />
          </main>
        ) : (
          <>
            {/* Header only shown on Home route */}
            {currentRoute === 'home' && (
              <div className="shrink-0 z-30">
                <Header
                  balance={balance}
                  onOpenWallet={() => navigate('wallet')}
                  onOpenNotifications={() => navigate('announcement')}
                  onOpenProfile={() => navigate('menu')}
                />
              </div>
            )}

        {/* Dedicated Route Views */}
        {currentRoute === 'wallet' && (
          <main className="flex-1 overflow-hidden">
            <WalletView
              balance={balance}
              winBalance={winBalance}
              withdrawalBalance={winBalance}
              onBack={() => goBack('home')}
              onAddMoney={handleAddMoney}
              onOpenRecharge={() => {
                if (!currentUser.isLoggedIn) {
                  setGuestAction('deposit');
                } else {
                  navigate('recharge');
                }
              }}
              onOpenWithdraw={() => {
                if (!currentUser.isLoggedIn) {
                  setGuestAction('withdraw');
                } else {
                  navigate('withdraw');
                }
              }}
              onOpenRedeemWonCoins={() => {
                if (!currentUser.isLoggedIn) {
                  setGuestAction('withdraw');
                } else {
                  navigate('redeem');
                }
              }}
            />
          </main>
        )}

        {currentRoute === 'recharge' && (
          <main className="flex-1 overflow-hidden">
            <RechargeView
              balance={balance}
              appUsername={appUsername}
              onBack={() => goBack('wallet')}
              onRechargeSuccess={(amount) => {
                handleAddMoney(amount);
                showToast(`Successfully added ₹${amount} to wallet!`);
              }}
            />
          </main>
        )}

        {currentRoute === 'withdraw' && (
          <main className="flex-1 overflow-hidden">
            <WithdrawView
              winBalance={winBalance}
              withdrawalBalance={winBalance}
              onBack={() => goBack('wallet')}
              onOpenRedeemWonCoins={() => navigate('redeem')}
            />
          </main>
        )}

        {currentRoute === 'redeem' && (
          <main className="flex-1 overflow-hidden">
            <RedeemWonCoinsView
              winBalance={winBalance}
              onBack={() => goBack('withdraw')}
              onRedeem={(amt) => showToast(`Redeemed ₹${amt} successfully!`)}
            />
          </main>
        )}

        {currentRoute === 'profile' && (
          <main className="flex-1 overflow-hidden">
            <ProfileView
              username={currentUser.username}
              onUpdateUsername={(newUname) => {
                setAppUsername(newUname);
                setCurrentUser((prev) => ({ ...prev, username: newUname }));
              }}
              currentUser={currentUser}
              onUpdateProfile={setCurrentUser}
              onBack={() => goBack('menu')}
            />
          </main>
        )}

        {currentRoute === 'contact' && (
          <main className="flex-1 overflow-hidden">
            <ContactView onBack={() => goBack('menu')} />
          </main>
        )}

        {currentRoute === 'announcement' && (
          <main className="flex-1 overflow-hidden">
            <NotificationView
              title="Announcement"
              onBack={() => goBack('home')}
            />
          </main>
        )}

        {currentRoute === 'earn' && (
          <main className="flex-1 overflow-hidden">
            <ReferEarnView onBack={() => goBack('home')} />
          </main>
        )}

        {currentRoute === 'leaderboard' && (
          <main className="flex-1 overflow-hidden">
            <LeaderboardView onBack={() => goBack('home')} />
          </main>
        )}

        {currentRoute === 'menu' && (
          <main className="flex-1 overflow-hidden">
            <MenuView
              username={currentUser.username}
              matchesPlayed={0}
              totalKills={0}
              totalEarning={0}
              onBack={() => goBack('home')}
              onOpenProfile={() => navigate('profile')}
              onOpenWallet={() => navigate('wallet')}
              onOpenLeaderboard={() => navigate('leaderboard')}
              onOpenNotifications={() => navigate('announcement')}
              onOpenContact={() => navigate('contact')}
              onLogout={handleLogout}
              isLoggedIn={currentUser.isLoggedIn}
              onOpenLogin={() => navigate('login')}
              onOpenSignUp={() => navigate('signup')}
              onOpenLanguage={() => navigate('language')}
            />
          </main>
        )}

        {/* Splash Screen View */}
        {currentRoute === 'splash' && (
          <main className="flex-1 overflow-hidden">
            <SplashScreen onComplete={() => goBack('home')} />
          </main>
        )}

        {/* Language Selection Screen */}
        {currentRoute === 'language' && (
          <main className="flex-1 overflow-hidden">
            <LanguageSelectView
              initialLanguage={preferredLanguage}
              onShowToast={showToast}
              onContinue={(lang) => {
                setPreferredLanguage(lang);
                const authMode = getAuthModeCookie();
                if (authMode === 'guest' || authMode === 'logged_in') {
                  goBack('menu');
                } else {
                  navigate('welcome');
                }
              }}
              onBack={getAuthModeCookie() ? () => goBack('menu') : undefined}
            />
          </main>
        )}

        {/* Welcome Gateway Screen: SELECT A GAME with REGISTER & LOGIN */}
        {currentRoute === 'welcome' && (
          <main className="flex-1 overflow-hidden">
            <WelcomeGatewayView
              onRegister={() => navigate('signup')}
              onLogin={() => navigate('login')}
              onExploreAsGuest={() => {
                setAuthModeCookie('guest');
                setCurrentUser({
                  firstName: 'Guest',
                  lastName: 'Gamer',
                  username: 'Guest_Gamer',
                  email: '',
                  phoneNumber: '',
                  isLoggedIn: false,
                });
                navigate('home');
              }}
            />
          </main>
        )}

        {currentRoute === 'login' && (
          <main className="flex-1 overflow-hidden">
            <LoginView
              onBack={() => goBack('welcome')}
              onNavigateToSignUp={() => navigate('signup')}
              onLoginSuccess={handleLoginSuccess}
              defaultIdentifier={currentUser.username}
              onShowToast={showToast}
            />
          </main>
        )}

        {currentRoute === 'signup' && (
          <main className="flex-1 overflow-hidden">
            <SignUpView
              onBack={() => goBack('welcome')}
              onNavigateToLogin={() => navigate('login')}
              onProceedToOtp={handleProceedToOtp}
              initialData={pendingSignUpData}
              onShowToast={showToast}
            />
          </main>
        )}

        {currentRoute === 'otp-verify' && (
          <main className="flex-1 overflow-hidden">
            <OtpVerificationView
              email={pendingSignUpData?.email || currentUser.email || 'player@gamexesports.in'}
              onBack={() => goBack('signup')}
              onChangeEmail={() => goBack('signup')}
              onVerifySuccess={handleOtpVerified}
              onShowToast={showToast}
            />
          </main>
        )}

        {(currentRoute === 'contest' || currentRoute === 'mymatches') && (
          <main className="flex-1 overflow-hidden">
            <ContestView
              categoryTitle={routeDetails.isMyMatches ? 'MY MATCHES' : routeDetails.gameCategory}
              contests={contestsList}
              balance={balance}
              appUsername={appUsername}
              activeTab={routeDetails.contestTab}
              isMyMatches={routeDetails.isMyMatches}
              onTabChange={(newTab: ContestTab) => {
                if (routeDetails.isMyMatches) {
                  navigateToMyMatches(newTab, { replace: true });
                } else {
                  navigateToContest(routeDetails.gameCategory, newTab, { replace: true });
                }
              }}
              onSelectContest={(contest, isResult) => {
                navigateToContestDetail(contest.id, isResult);
              }}
              onBack={() => goBack('home')}
              onJoinContest={handleJoinContest}
              onOpenRecharge={() => {
                if (!currentUser.isLoggedIn) {
                  setGuestAction('deposit');
                } else {
                  navigate('recharge');
                }
              }}
            />
          </main>
        )}

        {currentRoute === 'contest-detail' && (() => {
          const contest =
            contestsList.find((c) => c.id === routeDetails.contestId) ||
            INITIAL_CONTESTS.find((c) => c.id === routeDetails.contestId);

          if (!contest) {
            return (
              <main className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4 shadow-sm">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h2 className="text-lg font-extrabold text-slate-900 mb-2 font-['Outfit',_sans-serif]">
                  Contest #{routeDetails.contestId} Not Found
                </h2>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  The tournament ID you requested does not exist or has expired.
                </p>
                <button
                  onClick={() => goBack('home')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  Browse Tournaments
                </button>
              </main>
            );
          }

          const handleBack = () => {
            const fallback = buildContestUrl(contest.gameCategory, (contest.status as ContestTab) || 'upcoming');
            goBack(fallback);
          };

          if (routeDetails.isResultView || contest.status === 'resulted') {
            return (
              <main className="flex-1 overflow-hidden">
                <MatchResultView
                  contest={contest}
                  onBack={handleBack}
                  appUsername={appUsername}
                />
              </main>
            );
          }

          return (
            <main className="flex-1 overflow-hidden">
              <ContestDetailView
                contest={contest}
                balance={balance}
                appUsername={appUsername}
                onBack={handleBack}
                onJoinContest={(ign) => handleJoinContest(contest.id, ign)}
                onJoinMatch={(id, ign) => handleJoinContest(id, ign)}
                onOpenRecharge={() => {
                  if (!currentUser.isLoggedIn) {
                    setGuestAction('deposit');
                  } else {
                    navigate('recharge');
                  }
                }}
              />
            </main>
          );
        })()}

        {/* Tab Views (Home) */}
        {currentRoute === 'home' && (
          <main className="flex-1 overflow-y-auto overflow-x-hidden pb-16 overscroll-contain">
            {/* Rules Ticker Notice Bar - Announcement opens Notification as requested */}
            <RulesTicker onOpenRules={() => navigate('announcement')} />

            {isHomeLoading ? (
              <div className="py-2 space-y-3">
                {/* Joystick Animated Loader Card */}
                <div className="mx-3 bg-slate-950 rounded-2xl p-4 border border-red-500/30 shadow-md">
                  <JoystickLoader size="sm" text="Loading GameX Esports Arena..." />
                </div>
                {/* Shimmer Skeletons matching Carousel and 16:9 Esports Cards */}
                <CarouselBannerSkeleton />
                <EsportsGamesSectionSkeleton />
              </div>
            ) : (
              <>
                {/* Featured Carousel Banner with Direct External Redirection */}
                <InstagramBanner />

                {/* My Matches: Ongoing, Upcoming, Completed, Support */}
                <MyMatchesSection
                  onSelectCategory={(category) => {
                    const tab: ContestTab =
                      category === 'ongoing' ? 'ongoing' : category === 'completed' ? 'resulted' : 'upcoming';
                    navigateToMyMatches(tab);
                  }}
                  onOpenSupport={() => navigate('contact')}
                />

                {/* Esports Games: 2-column Tournament Grid */}
                <EsportsGamesSection
                  tournaments={tournaments}
                  onSelectTournament={(t) => handleOpenContestCategory(t.title || t.gameMode)}
                  onViewAll={() => handleOpenContestCategory('BR FULL MAP')}
                />
              </>
            )}
          </main>
        )}

        {/* Bottom Navigation Bar: hidden on Match Details, Login, Sign Up, OTP Verify, Splash, Language, and Welcome */}
        {currentRoute !== 'contest-detail' &&
          currentRoute !== 'login' &&
          currentRoute !== 'signup' &&
          currentRoute !== 'otp-verify' &&
          currentRoute !== 'splash' &&
          currentRoute !== 'language' &&
          currentRoute !== 'welcome' && (
            <BottomNav
              activeTab={bottomNavTab}
              onTabChange={(tab) => {
                navigate(tab === 'home' ? 'home' : tab);
              }}
            />
          )}
          </>
        )}

        {/* Modals & Dialogs */}
        <InstagramModal
          isOpen={isInstagramOpen}
          onClose={() => setIsInstagramOpen(false)}
        />

        <TournamentModal
          tournament={selectedTournament}
          balance={balance}
          onClose={() => setSelectedTournament(null)}
          onJoin={handleJoinTournament}
          isLoggedIn={currentUser.isLoggedIn}
          onRequireAuth={() => setGuestAction('join')}
        />

        <MyMatchesModal
          isOpen={selectedMatchCategory !== null}
          category={selectedMatchCategory}
          onClose={() => setSelectedMatchCategory(null)}
        />

        {/* Guest Gamer Action Intercept Modal */}
        <GuestAuthPromptModal
          isOpen={guestAction !== null}
          action={guestAction}
          onClose={() => setGuestAction(null)}
          onNavigateToLogin={() => navigate('login')}
          onNavigateToSignUp={() => navigate('signup')}
        />
      </div>
    </div>
  );
}

