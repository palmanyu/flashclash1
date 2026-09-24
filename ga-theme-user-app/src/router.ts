import { useState, useEffect, useCallback, useRef } from 'react';

export type AppRoute =
  | 'home'
  | 'contest'
  | 'contest-detail'
  | 'mymatches'
  | 'withdraw'
  | 'recharge'
  | 'wallet'
  | 'earn'
  | 'leaderboard'
  | 'menu'
  | 'profile'
  | 'contact'
  | 'announcement'
  | 'redeem'
  | 'login'
  | 'signup'
  | 'otp-verify'
  | 'splash'
  | 'language'
  | 'welcome';

export type ContestTab = 'ongoing' | 'upcoming' | 'resulted';

export interface RouteDetails {
  route: AppRoute;
  gameCategory: string; // e.g. 'BR FULL MAP', 'FREE MATCH', etc.
  contestTab: ContestTab; // 'ongoing' | 'upcoming' | 'resulted'
  isMyMatches: boolean;
  contestId?: string;
  isResultView?: boolean;
  path: string;
}

export const KNOWN_GAME_CATEGORIES: string[] = [
  'BR FULL MAP',
  'FREE MATCH',
  'CLASH SQUAD 1V1',
  'SOLO SURVIVAL',
  'LONE WOLF 1V1',
  'CS 4V4',
];

/**
 * Normalizes game category name across casing and formatting differences
 */
export function normalizeGameCategory(raw: string): string {
  const clean = decodeURIComponent(raw || '').trim();
  const lower = clean.toLowerCase().replace(/[-_]+/g, ' ');

  for (const cat of KNOWN_GAME_CATEGORIES) {
    if (cat.toLowerCase() === lower || cat.toLowerCase() === clean.toLowerCase()) {
      return cat;
    }
  }

  if (lower.includes('free')) return 'FREE MATCH';
  if (lower.includes('clash') || lower.includes('cs 1v1')) return 'CLASH SQUAD 1V1';
  if (lower.includes('survival')) return 'SOLO SURVIVAL';
  if (lower.includes('lone') || lower.includes('wolf')) return 'LONE WOLF 1V1';
  if (lower.includes('cs 4v4') || lower.includes('4v4')) return 'CS 4V4';
  if (lower.includes('br') || lower.includes('bermuda') || lower.includes('battle')) return 'BR FULL MAP';

  return clean || 'BR FULL MAP';
}

/**
 * Builds canonical URL for a specific game's contest view
 * Example: /BR%20FULL%20MAP/contests/ongoing
 */
export function buildContestUrl(gameCategory: string, tab: ContestTab): string {
  const norm = normalizeGameCategory(gameCategory);
  return `/${encodeURIComponent(norm)}/contests/${tab}`;
}

/**
 * Builds canonical URL for an individual contest
 * Example: /contest/322795 or /contest/322795/result
 */
export function buildContestDetailUrl(contestId: string, isResult?: boolean): string {
  const cleanId = encodeURIComponent(String(contestId).replace(/^#/, '').trim());
  if (isResult) {
    return `/contest/${cleanId}/result`;
  }
  return `/contest/${cleanId}`;
}

/**
 * Builds canonical URL for My Matches view
 * Example: /mymatches/ongoing, /mymatches/upcoming, /mymatches/resulted
 */
export function buildMyMatchesUrl(tab: ContestTab): string {
  return `/mymatches/${tab}`;
}

/**
 * Normalizes any pathname or hash into full structured RouteDetails.
 * Supports:
 *   - /contest/<id> (e.g. /contest/322795)
 *   - /contest/<id>/result (e.g. /contest/322795/result)
 *   - /<GAME>/contests/<status> (e.g. /BR%20FULL%20MAP/contests/ongoing)
 *   - /<GAME>/contest/<id> (e.g. /BR%20FULL%20MAP/contest/322795)
 *   - /mymatches/<status> (e.g. /mymatches/ongoing, /mymatches/upcoming, /mymatches/resulted)
 *   - Standard static routes (/withdraw, /recharge, /wallet, etc.)
 */
export function parseRouteDetails(pathname: string, hash: string = ''): RouteDetails {
  let raw = '';
  if (hash && hash.length > 1) {
    raw = hash.replace(/^#\/?/, '').trim();
  }
  if (!raw) {
    raw = pathname.replace(/^\/+|\/+$/g, '').trim();
  }

  // Separate path from query parameters
  const [pathOnly, queryString] = raw.split('?');
  const decodedPath = decodeURIComponent(pathOnly || '').trim();
  const segments = decodedPath ? decodedPath.split('/').map((s) => s.trim()).filter(Boolean) : [];

  let route: AppRoute = 'home';
  let gameCategory = 'BR FULL MAP';
  let contestTab: ContestTab = 'upcoming';
  let isMyMatches = false;

  // Case 0: Query string with direct contest ID fallback
  // e.g. /?contest=322795 or /contest?id=322795
  if (queryString) {
    const params = new URLSearchParams(queryString);
    const qContest = params.get('contest') || params.get('contestId') || params.get('match') || params.get('id');
    const qResult = params.get('result') === 'true' || params.get('isResult') === 'true';
    if (qContest && !['ongoing', 'upcoming', 'resulted'].includes(qContest.toLowerCase())) {
      return {
        route: 'contest-detail',
        gameCategory,
        contestTab,
        isMyMatches: false,
        contestId: qContest,
        isResultView: qResult,
        path: buildContestDetailUrl(qContest, qResult),
      };
    }
  }

  // Case 1: Direct Individual Contest route
  // Pattern: /contest/<id> or /contest/<id>/result or /match/<id> or /tournament/<id>
  if (segments.length >= 1) {
    const first = segments[0].toLowerCase();
    if (first === 'contest' || first === 'contests' || first === 'match' || first === 'tournament') {
      const second = (segments[1] || '').trim();
      // If second segment exists and is NOT a tab name ('ongoing', 'upcoming', 'resulted')
      if (second && !['ongoing', 'upcoming', 'resulted', 'completed'].includes(second.toLowerCase())) {
        const isResultView =
          (segments[2] || '').toLowerCase() === 'result' || (segments[2] || '').toLowerCase() === 'results';
        return {
          route: 'contest-detail',
          gameCategory,
          contestTab,
          isMyMatches: false,
          contestId: second,
          isResultView,
          path: buildContestDetailUrl(second, isResultView),
        };
      }
    }

    if (first === 'match-result' || first === 'result') {
      const second = (segments[1] || '').trim();
      if (second) {
        return {
          route: 'contest-detail',
          gameCategory,
          contestTab,
          isMyMatches: false,
          contestId: second,
          isResultView: true,
          path: buildContestDetailUrl(second, true),
        };
      }
    }
  }

  // Case 2: My Matches route
  // e.g. /mymatches/ongoing, /mymatches/upcoming, /mymatches/resulted
  if (
    segments.length > 0 &&
    (segments[0].toLowerCase() === 'mymatches' ||
      segments[0].toLowerCase() === 'my-matches' ||
      segments[0].toLowerCase() === 'mymatch')
  ) {
    route = 'mymatches';
    isMyMatches = true;
    gameCategory = 'MY MATCHES';
    const sub = (segments[1] || '').toLowerCase();
    if (sub === 'ongoing') contestTab = 'ongoing';
    else if (sub === 'resulted' || sub === 'completed') contestTab = 'resulted';
    else contestTab = 'upcoming';

    return {
      route,
      gameCategory,
      contestTab,
      isMyMatches: true,
      path: buildMyMatchesUrl(contestTab),
    };
  }

  // Case 3: Game-specific contests route or Game-specific contest detail
  // Pattern: /<GAME_NAME>/contests/<status> OR /<GAME_NAME>/contest/<id>
  // e.g. /BR%20FULL%20MAP/contests/ongoing OR /BR%20FULL%20MAP/contest/322795
  if (segments.length >= 2) {
    const second = segments[1].toLowerCase();
    if (second === 'contests' || second === 'contest') {
      const third = (segments[2] || '').toLowerCase();
      // If third segment is an individual contest ID
      if (third && !['ongoing', 'upcoming', 'resulted', 'completed'].includes(third)) {
        const isResultView =
          (segments[3] || '').toLowerCase() === 'result' || (segments[3] || '').toLowerCase() === 'results';
        return {
          route: 'contest-detail',
          gameCategory: normalizeGameCategory(segments[0]),
          contestTab,
          isMyMatches: false,
          contestId: segments[2],
          isResultView,
          path: buildContestDetailUrl(segments[2], isResultView),
        };
      }

      route = 'contest';
      gameCategory = normalizeGameCategory(segments[0]);
      const sub = third;
      if (sub === 'ongoing') contestTab = 'ongoing';
      else if (sub === 'resulted' || sub === 'completed') contestTab = 'resulted';
      else contestTab = 'upcoming';

      return {
        route,
        gameCategory,
        contestTab,
        isMyMatches: false,
        path: buildContestUrl(gameCategory, contestTab),
      };
    }
  }

  // Case 4: Fallback /contest or /contests list
  if (segments.length > 0 && (segments[0].toLowerCase() === 'contest' || segments[0].toLowerCase() === 'contests')) {
    route = 'contest';
    if (segments.length >= 3) {
      gameCategory = normalizeGameCategory(segments[1]);
      const sub = (segments[2] || '').toLowerCase();
      if (sub === 'ongoing') contestTab = 'ongoing';
      else if (sub === 'resulted' || sub === 'completed') contestTab = 'resulted';
      else contestTab = 'upcoming';
    } else if (segments.length === 2) {
      const sub = segments[1].toLowerCase();
      if (sub === 'ongoing' || sub === 'upcoming' || sub === 'resulted') {
        contestTab = sub as ContestTab;
      } else {
        gameCategory = normalizeGameCategory(segments[1]);
      }
    }

    if (queryString) {
      const params = new URLSearchParams(queryString);
      const qGame = params.get('game') || params.get('category');
      const qTab = params.get('tab') || params.get('status');
      if (qGame) gameCategory = normalizeGameCategory(qGame);
      if (qTab === 'ongoing' || qTab === 'upcoming' || qTab === 'resulted') {
        contestTab = qTab;
      }
    }

    return {
      route,
      gameCategory,
      contestTab,
      isMyMatches: false,
      path: buildContestUrl(gameCategory, contestTab),
    };
  }

  // Case 4: Standard static routes
  const first = (segments[0] || '').toLowerCase();
  switch (first) {
    case 'withdraw':
    case 'withdrawn':
    case 'payout':
      return { route: 'withdraw', gameCategory, contestTab, isMyMatches: false, path: '/withdraw' };

    case 'recharge':
    case 'rechagre':
    case 'deposit':
    case 'addmoney':
    case 'add-money':
      return { route: 'recharge', gameCategory, contestTab, isMyMatches: false, path: '/recharge' };

    case 'wallet':
    case 'walet':
    case 'my-wallet':
      return { route: 'wallet', gameCategory, contestTab, isMyMatches: false, path: '/wallet' };

    case 'earn':
    case 'refer':
    case 'referearn':
    case 'refer-earn':
      return { route: 'earn', gameCategory, contestTab, isMyMatches: false, path: '/earn' };

    case 'leaderboard':
    case 'leaderboad':
    case 'leaders':
    case 'top-players':
      return { route: 'leaderboard', gameCategory, contestTab, isMyMatches: false, path: '/leaderboard' };

    case 'menu':
    case 'meu':
    case 'settings':
    case 'more':
      return { route: 'menu', gameCategory, contestTab, isMyMatches: false, path: '/menu' };

    case 'profile':
    case 'proofile':
    case 'my-profile':
    case 'account':
      return { route: 'profile', gameCategory, contestTab, isMyMatches: false, path: '/profile' };

    case 'contact':
    case 'contact-us':
    case 'contactus':
    case 'support':
    case 'help':
      return { route: 'contact', gameCategory, contestTab, isMyMatches: false, path: '/contact' };

    case 'announcement':
    case 'announcemtnt':
    case 'announcements':
    case 'notification':
    case 'notifications':
    case 'notif':
      return { route: 'announcement', gameCategory, contestTab, isMyMatches: false, path: '/announcement' };

    case 'redeem':
    case 'redeem-coins':
    case 'redeemwoncoins':
      return { route: 'redeem', gameCategory, contestTab, isMyMatches: false, path: '/redeem' };

    case 'login':
    case 'signin':
    case 'sign-in':
    case 'log-in':
      return { route: 'login', gameCategory, contestTab, isMyMatches: false, path: '/login' };

    case 'signup':
    case 'sign-up':
    case 'register':
    case 'registration':
      return { route: 'signup', gameCategory, contestTab, isMyMatches: false, path: '/signup' };

    case 'otp-verify':
    case 'verify-otp':
    case 'email-otp':
    case 'otp':
      return { route: 'otp-verify', gameCategory, contestTab, isMyMatches: false, path: '/otp-verify' };

    case 'splash':
    case 'intro':
      return { route: 'splash', gameCategory, contestTab, isMyMatches: false, path: '/splash' };

    case 'language':
    case 'choose-language':
    case 'lang':
      return { route: 'language', gameCategory, contestTab, isMyMatches: false, path: '/language' };

    case 'welcome':
    case 'gateway':
    case 'get-started':
      return { route: 'welcome', gameCategory, contestTab, isMyMatches: false, path: '/welcome' };

    case '':
    case 'home':
    case 'index':
    case 'index.html':
    default:
      return { route: 'home', gameCategory, contestTab, isMyMatches: false, path: '/' };
  }
}

/**
 * Returns human-readable browser tab title for each route
 */
export function getRouteTitle(details: RouteDetails): string {
  if (details.route === 'contest-detail' && details.contestId) {
    if (details.isResultView) {
      return `Match #${details.contestId} Results - Gamex`;
    }
    return `Contest #${details.contestId} Details - Gamex`;
  }
  if (details.isMyMatches) {
    const tabCap = details.contestTab.charAt(0).toUpperCase() + details.contestTab.slice(1);
    return `My Matches (${tabCap}) - Gamex`;
  }
  if (details.route === 'contest') {
    const tabCap = details.contestTab.charAt(0).toUpperCase() + details.contestTab.slice(1);
    return `${details.gameCategory} ${tabCap} Contests - Gamex`;
  }

  switch (details.route) {
    case 'withdraw':
      return 'Withdraw - Gamex';
    case 'recharge':
      return 'Recharge - Gamex';
    case 'wallet':
      return 'Wallet - Gamex';
    case 'earn':
      return 'Refer & Earn - Gamex';
    case 'leaderboard':
      return 'Leaderboard - Gamex';
    case 'menu':
      return 'Menu - Gamex';
    case 'profile':
      return 'Profile - Gamex';
    case 'contact':
      return 'Contact Us - Gamex';
    case 'announcement':
      return 'Announcement - Gamex';
    case 'redeem':
      return 'Redeem Won Coins - Gamex';
    case 'login':
      return 'Login - Gamex Esports';
    case 'signup':
      return 'Sign Up - Gamex Esports';
    case 'otp-verify':
      return 'Verify Email OTP - Gamex Esports';
    case 'splash':
      return 'Game Victory Esports - Real Gaming Real Winnings';
    case 'language':
      return 'Choose Language - Game Victory Esports';
    case 'welcome':
      return 'Welcome - Game Victory Esports';
    case 'home':
    default:
      return 'Gamex - Free Fire Esports';
  }
}

/**
 * Custom React hook for synchronized URL routing.
 * Handles HTML5 pushState, popstate (browser back/forward),
 * in-app history stack tracking to prevent cyclic back loops,
 * and document.title synchronization.
 */
export function useAppRouter() {
  const [routeDetails, setRouteDetails] = useState<RouteDetails>(() => {
    if (typeof window === 'undefined') {
      return {
        route: 'home',
        gameCategory: 'BR FULL MAP',
        contestTab: 'upcoming',
        isMyMatches: false,
        path: '/',
      };
    }
    return parseRouteDetails(window.location.pathname, window.location.hash);
  });

  // Track the in-app navigation stack to intelligently handle back navigation
  const historyStackRef = useRef<string[]>([]);
  const goingBackFromRouteRef = useRef<AppRoute | null>(null);

  // Initialize history stack on first mount
  if (historyStackRef.current.length === 0) {
    const initialPath = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/';
    historyStackRef.current = [initialPath];
  }

  const updateTitle = useCallback((details: RouteDetails) => {
    if (typeof document !== 'undefined') {
      document.title = getRouteTitle(details);
    }
  }, []);

  const navigateToDetails = useCallback(
    (newDetails: RouteDetails, options?: { replace?: boolean }) => {
      setRouteDetails(newDetails);
      updateTitle(newDetails);

      if (typeof window !== 'undefined') {
        const currentFullPath = window.location.pathname + window.location.search;
        if (currentFullPath !== newDetails.path) {
          if (options?.replace) {
            window.history.replaceState({ route: newDetails.route }, '', newDetails.path);
            if (historyStackRef.current.length > 0) {
              historyStackRef.current[historyStackRef.current.length - 1] = newDetails.path;
            } else {
              historyStackRef.current = [newDetails.path];
            }
          } else {
            window.history.pushState({ route: newDetails.route }, '', newDetails.path);
            const stack = historyStackRef.current;
            if (stack[stack.length - 1] !== newDetails.path) {
              stack.push(newDetails.path);
            }
          }
        }
      }
    },
    [updateTitle]
  );

  const navigate = useCallback(
    (target: AppRoute | string, options?: { replace?: boolean }) => {
      let targetPath: string;
      if (
        target === 'home' ||
        target === 'withdraw' ||
        target === 'recharge' ||
        target === 'wallet' ||
        target === 'earn' ||
        target === 'leaderboard' ||
        target === 'menu' ||
        target === 'profile' ||
        target === 'contact' ||
        target === 'announcement' ||
        target === 'redeem'
      ) {
        targetPath = target === 'home' ? '/' : `/${target}`;
      } else if (target === 'contest') {
        targetPath = buildContestUrl(routeDetails.gameCategory || 'BR FULL MAP', routeDetails.contestTab || 'upcoming');
      } else if (target === 'mymatches') {
        targetPath = buildMyMatchesUrl(routeDetails.contestTab || 'ongoing');
      } else {
        targetPath = target.startsWith('/') ? target : `/${target}`;
      }

      const parsed = parseRouteDetails(targetPath, '');
      navigateToDetails(parsed, options);
    },
    [routeDetails.gameCategory, routeDetails.contestTab, navigateToDetails]
  );

  const navigateToContest = useCallback(
    (gameCategory: string, tab: ContestTab = 'upcoming', options?: { replace?: boolean }) => {
      const url = buildContestUrl(gameCategory, tab);
      const parsed = parseRouteDetails(url, '');
      navigateToDetails(parsed, options);
    },
    [navigateToDetails]
  );

  const navigateToMyMatches = useCallback(
    (tab: ContestTab = 'ongoing', options?: { replace?: boolean }) => {
      const url = buildMyMatchesUrl(tab);
      const parsed = parseRouteDetails(url, '');
      navigateToDetails(parsed, options);
    },
    [navigateToDetails]
  );

  const navigateToContestDetail = useCallback(
    (contestId: string, isResult: boolean = false, options?: { replace?: boolean }) => {
      const url = buildContestDetailUrl(contestId, isResult);
      const parsed = parseRouteDetails(url, '');
      navigateToDetails(parsed, options);
    },
    [navigateToDetails]
  );

  /**
   * Helper to check if a path is considered a sub-page or cyclic loop
   * for the given route when navigating "backwards".
   */
  const isLoopOrChildPath = useCallback((currentRoute: AppRoute, targetPath: string): boolean => {
    if (!targetPath) return true;
    const cleanPath = targetPath.split('?')[0].split('#')[0];

    // From Wallet: going back must never land back in recharge, withdraw, redeem, or wallet
    if (currentRoute === 'wallet') {
      return (
        cleanPath.startsWith('/recharge') ||
        cleanPath.startsWith('/withdraw') ||
        cleanPath.startsWith('/redeem') ||
        cleanPath === '/wallet'
      );
    }
    // From Recharge: going back must never land back in recharge
    if (currentRoute === 'recharge') {
      return cleanPath.startsWith('/recharge');
    }
    // From Withdraw: going back must never land back in withdraw or redeem
    if (currentRoute === 'withdraw') {
      return cleanPath.startsWith('/withdraw') || cleanPath.startsWith('/redeem');
    }
    // From Redeem: going back must never land back in redeem
    if (currentRoute === 'redeem') {
      return cleanPath.startsWith('/redeem');
    }
    // From Menu: going back must never land back in profile, contact, or menu
    if (currentRoute === 'menu') {
      return (
        cleanPath.startsWith('/profile') ||
        cleanPath.startsWith('/contact') ||
        cleanPath === '/menu'
      );
    }
    // From Profile / Contact
    if (currentRoute === 'profile') return cleanPath.startsWith('/profile');
    if (currentRoute === 'contact') return cleanPath.startsWith('/contact');
    if (currentRoute === 'login') return cleanPath.startsWith('/login') || cleanPath.startsWith('/signup');
    if (currentRoute === 'signup') return cleanPath.startsWith('/signup') || cleanPath.startsWith('/login');

    return false;
  }, []);

  /**
   * Intelligently navigate back:
   * 1. Checks in-app history stack to prevent loops
   * 2. Prunes cyclic sub-routes and safely triggers browser back or fallback
   */
  const goBack = useCallback(
    (fallbackRoute: AppRoute | string = 'home') => {
      const stack = historyStackRef.current;
      const currentRoute = routeDetails.route;
      goingBackFromRouteRef.current = currentRoute;

      // Pop current path from stack if it matches top
      if (stack.length > 0) {
        stack.pop();
      }

      // Pop any entries that would create a circular loop or go to child views
      while (stack.length > 0 && isLoopOrChildPath(currentRoute, stack[stack.length - 1])) {
        stack.pop();
      }

      // If we have a valid previous path in history and browser has history entries:
      if (stack.length > 0 && typeof window !== 'undefined' && window.history.length > 1) {
        window.history.back();
      } else {
        // Fallback navigation with replace to ensure no duplicate history entries are created
        navigate(fallbackRoute, { replace: true });
      }
    },
    [routeDetails.route, isLoopOrChildPath, navigate]
  );

  // Sync state on popstate (browser Back/Forward) and hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      const detected = parseRouteDetails(window.location.pathname, window.location.hash);

      // Loop-prevention guard when coming back from a view
      if (goingBackFromRouteRef.current) {
        const fromRoute = goingBackFromRouteRef.current;
        goingBackFromRouteRef.current = null;

        // If user was on wallet and browser back navigated to recharge/withdraw, break the loop and go home
        if (
          fromRoute === 'wallet' &&
          (detected.route === 'recharge' || detected.route === 'withdraw' || detected.route === 'redeem')
        ) {
          navigate('home', { replace: true });
          return;
        }

        // If user was on recharge and browser back landed on recharge
        if (fromRoute === 'recharge' && detected.route === 'recharge') {
          navigate('wallet', { replace: true });
          return;
        }

        // If user was on menu and browser back landed on profile/contact
        if (
          fromRoute === 'menu' &&
          (detected.route === 'profile' || detected.route === 'contact')
        ) {
          navigate('home', { replace: true });
          return;
        }
      }

      setRouteDetails(detected);
      updateTitle(detected);

      // Keep internal stack in sync with browser navigation
      const currentPath = window.location.pathname + window.location.search;
      const stack = historyStackRef.current;
      if (stack.length > 1 && stack[stack.length - 2] === currentPath) {
        stack.pop();
      } else if (stack.length === 0 || stack[stack.length - 1] !== currentPath) {
        stack.push(currentPath);
      }
    };

    updateTitle(routeDetails);

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [routeDetails, updateTitle, navigate]);

  return {
    currentRoute: routeDetails.route,
    routeDetails,
    navigate,
    navigateToContest,
    navigateToContestDetail,
    navigateToMyMatches,
    goBack,
    currentPath: routeDetails.path,
  };
}
