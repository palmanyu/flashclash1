import { AdminView } from '../types';

export type GamesSubView =
  | 'list'
  | 'contests'
  | 'add-contest'
  | 'update-contest'
  | 'duplicate-contest'
  | 'joinings'
  | 'mass-duplicate'
  | 'rules-collections'
  | 'view-result'
  | 'send-refund';

export interface AppRoute {
  view: AdminView;
  userId?: number;
  usersSubView?: 'list' | 'transactions';
  gameId?: number;
  gameName?: string;
  gamesSubView?: GamesSubView;
  contestId?: number;
  rulesCollectionId?: number;
  rulesMode?: 'collections' | 'rules';
}

export const VIEW_ROUTES: Record<AdminView, string> = {
  'dashboard': '/dashboard',
  'users': '/users',
  'games': '/games',
  'requests-deposits': '/requests/deposits',
  'requests-withdrawals': '/requests/withdrawals',
  'notify-announcements': '/notify/announcements',
  'notify-carousels': '/notify/carousels',
  'notify-push-notification': '/notify/push-notification',
  'leaderboards-referral': '/leaderboards/referral',
  // Legacy routes
  'games-stats': '/games',
  'withdraw-request': '/requests/withdrawals',
  'staffs': '/staffs',
  'staff-roles': '/staff-roles',
  'staff-permissions': '/staff-permissions',
  'staff-action-log': '/staff-action-log',
  'admins': '/admins',
  'admins-roles': '/admin-roles',
  'admin-action-log': '/admin-action-log',
  'settings-support': '/settings/support',
  'settings-refer-earn': '/settings/refer-earn',
  'settings-user-wallet': '/settings/user-wallet',
  'settings-payment-gateway': '/settings/payment-gateway',
  'settings-withdrawal-methods': '/settings/withdrawal-methods',
  'goto-webapp': '/webapp',
  'goto-staffpanel': '/staffpanel',
  'login': '/login',
};

// Reverse map for fast lookup
export const PATH_TO_VIEW: Record<string, AdminView> = {
  '/': 'dashboard',
  '/dashboard': 'dashboard',
  '/users': 'users',
  '/games': 'games',
  '/gamesstats': 'games',
  '/games-stats': 'games',
  '/requests': 'requests-deposits',
  '/requests/deposits': 'requests-deposits',
  '/deposits': 'requests-deposits',
  '/requests/withdrawals': 'requests-withdrawals',
  '/withdrawals': 'requests-withdrawals',
  '/withdraw-requests': 'requests-withdrawals',
  '/withdraw-request': 'requests-withdrawals',
  '/notify': 'notify-announcements',
  '/notify/announcements': 'notify-announcements',
  '/announcements': 'notify-announcements',
  '/notify/carousels': 'notify-carousels',
  '/carousels': 'notify-carousels',
  '/notify/push-notification': 'notify-push-notification',
  '/notify/push-notifications': 'notify-push-notification',
  '/push-notification': 'notify-push-notification',
  '/push-notifications': 'notify-push-notification',
  '/leaderboards': 'leaderboards-referral',
  '/leaderboards/referral': 'leaderboards-referral',
  '/leaderboards/referral-leaderboard': 'leaderboards-referral',
  '/referral-leaderboard': 'leaderboards-referral',
  '/staffs': 'staffs',
  '/staff-roles': 'staff-roles',
  '/staff-permissions': 'staff-permissions',
  '/staff-action-log': 'staff-action-log',
  '/admins': 'admins',
  '/admin-roles': 'admins-roles',
  '/admins-roles': 'admins-roles',
  '/admin-action-log': 'admin-action-log',
  '/settings/support': 'settings-support',
  '/settings/refer-earn': 'settings-refer-earn',
  '/settings/user-wallet': 'settings-user-wallet',
  '/settings/payment-gateway': 'settings-payment-gateway',
  '/settings/withdrawal-methods': 'settings-withdrawal-methods',
  '/webapp': 'goto-webapp',
  '/goto-webapp': 'goto-webapp',
  '/staffpanel': 'goto-staffpanel',
  '/goto-staffpanel': 'goto-staffpanel',
  '/login': 'login',
};

export const PAGE_TITLES: Record<AdminView, string> = {
  'dashboard': 'Dashboard - GA Admin Panel',
  'users': 'Users - GA Admin Panel',
  'games': 'Games - GA Admin Panel',
  'requests-deposits': 'Deposits Requests - GA Admin Panel',
  'requests-withdrawals': 'Withdrawal Requests - GA Admin Panel',
  'notify-announcements': 'Announcements - GA Admin Panel',
  'notify-carousels': 'Carousels - GA Admin Panel',
  'notify-push-notification': 'Push Notifications - GA Admin Panel',
  'leaderboards-referral': 'Referral Leaderboard - GA Admin Panel',
  'games-stats': 'Games - GA Admin Panel',
  'withdraw-request': 'Withdraw Requests - GA Admin Panel',
  'staffs': 'Staffs Management - GA Admin Panel',
  'staff-roles': 'Staff Roles - GA Admin Panel',
  'staff-permissions': 'Staff Game Permissions - GA Admin Panel',
  'staff-action-log': 'Staff Action Log - GA Admin Panel',
  'admins': 'Admins Management - GA Admin Panel',
  'admins-roles': 'Admin Roles - GA Admin Panel',
  'admin-action-log': 'Admin Action Log - GA Admin Panel',
  'settings-support': 'Support Settings - GA Admin Panel',
  'settings-refer-earn': 'Refer & Earn Settings - GA Admin Panel',
  'settings-user-wallet': 'User Wallet Settings - GA Admin Panel',
  'settings-payment-gateway': 'Payment Gateway Settings - GA Admin Panel',
  'settings-withdrawal-methods': 'Withdrawal Methods Settings - GA Admin Panel',
  'goto-webapp': 'Web App Redirect - GA Admin Panel',
  'goto-staffpanel': 'Staff Panel Redirect - GA Admin Panel',
  'login': 'Sign In - GA Admin Panel',
};

// URL Builders
export function buildUserTransactionsUrl(userId: number | string): string {
  return `/users/${userId}/transaction`;
}

export function buildContestsUrl(gameId: number | string, gameName: string): string {
  return `/games/${gameId}/${encodeURIComponent(gameName)}/contests`;
}

export function buildRulesCollectionsUrl(gameId: number | string, gameName: string): string {
  return `/games/${gameId}/${encodeURIComponent(gameName)}/rulesCollections`;
}

export function buildRulesUrl(
  gameId: number | string,
  gameName: string,
  collectionId: number | string
): string {
  return `/games/${gameId}/${encodeURIComponent(gameName)}/rulesCollections/${collectionId}/rules`;
}

export function buildContestJoiningsUrl(
  gameId: number | string,
  gameName: string,
  contestId: number | string
): string {
  return `/games/${gameId}/${encodeURIComponent(gameName)}/contests/${contestId}/joinings`;
}

export function buildContestDuplicateUrl(
  gameId: number | string,
  gameName: string,
  contestId: number | string
): string {
  return `/games/${gameId}/${encodeURIComponent(gameName)}/contests/${contestId}/duplicateContest`;
}

export function buildContestUpdateUrl(
  gameId: number | string,
  gameName: string,
  contestId: number | string
): string {
  return `/games/${gameId}/${encodeURIComponent(gameName)}/contests/${contestId}/update`;
}

export function buildMassDuplicateUrl(gameId: number | string, gameName: string): string {
  return `/games/${gameId}/${encodeURIComponent(gameName)}/contests/massDuplicate`;
}

export function buildCreateContestUrl(gameId: number | string, gameName: string): string {
  return `/games/${gameId}/${encodeURIComponent(gameName)}/contests/create`;
}

export function buildContestResultUrl(
  gameId: number | string,
  gameName: string,
  contestId: number | string
): string {
  return `/games/${gameId}/${encodeURIComponent(gameName)}/contests/${contestId}/viewResult`;
}

export function buildContestRefundUrl(
  gameId: number | string,
  gameName: string,
  contestId: number | string
): string {
  return `/games/${gameId}/${encodeURIComponent(gameName)}/contests/${contestId}/sendRefund`;
}

/**
 * Normalizes input string or window location into a clean pathname
 */
export function extractPathFromLocation(input?: string): string {
  let str = input;
  if (!str && typeof window !== 'undefined') {
    // 1. Check hash first (e.g. #/users/1/transaction)
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && hash !== '/') {
      str = hash;
    } else {
      // 2. Check query parameter ?page=...
      const searchParams = new URLSearchParams(window.location.search);
      const pageQuery = searchParams.get('page');
      if (pageQuery) {
        str = pageQuery;
      } else {
        str = window.location.pathname;
      }
    }
  }

  if (!str) return '/dashboard';

  // Handle full URL strings like https://staff-panel-dev.gamexofficial.org/games/...
  if (str.includes('://')) {
    try {
      const parsed = new URL(str);
      str = parsed.pathname;
    } catch {
      str = str.replace(/^[a-zA-Z]+:\/\/[^/]+/, '');
    }
  }

  // Ensure starts with '/'
  if (!str.startsWith('/')) {
    str = '/' + str;
  }

  // Strip trailing slash unless just '/'
  if (str.length > 1 && str.endsWith('/')) {
    str = str.slice(0, -1);
  }

  return str;
}

/**
 * Fully parses URL path into structured AppRoute
 */
export function parseCurrentRoute(inputPath?: string): AppRoute {
  const path = extractPathFromLocation(inputPath);

  // 1. User transactions: /users/1/transaction or /users/1/transactions
  const userTxMatch = path.match(/^\/users\/(\d+)\/transactions?$/i);
  if (userTxMatch) {
    return {
      view: 'users',
      userId: parseInt(userTxMatch[1], 10),
      usersSubView: 'transactions',
    };
  }

  // 2. Rules list inside rules collection: /games/48/FF%20FULL%20MAP/rulesCollections/48/rules
  const rulesMatch = path.match(
    /^\/games\/(\d+)\/([^/]+)\/rulesCollections\/(\d+)\/rules$/i
  );
  if (rulesMatch) {
    return {
      view: 'games',
      gameId: parseInt(rulesMatch[1], 10),
      gameName: decodeURIComponent(rulesMatch[2]),
      gamesSubView: 'rules-collections',
      rulesCollectionId: parseInt(rulesMatch[3], 10),
      rulesMode: 'rules',
    };
  }

  // 3. Rules collections list: /games/48/FF%20FULL%20MAP/rulesCollections
  const rulesCollectionsMatch = path.match(
    /^\/games\/(\d+)\/([^/]+)\/rulesCollections$/i
  );
  if (rulesCollectionsMatch) {
    return {
      view: 'games',
      gameId: parseInt(rulesCollectionsMatch[1], 10),
      gameName: decodeURIComponent(rulesCollectionsMatch[2]),
      gamesSubView: 'rules-collections',
      rulesMode: 'collections',
    };
  }

  // 4. Contest joinings: /games/48/FF%20FULL%20MAP/contests/105/joinings
  const joiningsMatch = path.match(
    /^\/games\/(\d+)\/([^/]+)\/contests\/(\d+)\/joinings$/i
  );
  if (joiningsMatch) {
    return {
      view: 'games',
      gameId: parseInt(joiningsMatch[1], 10),
      gameName: decodeURIComponent(joiningsMatch[2]),
      gamesSubView: 'joinings',
      contestId: parseInt(joiningsMatch[3], 10),
    };
  }

  // 4b. Contest View Result: /games/48/FF%20FULL%20MAP/contests/97/viewResult
  const viewResultMatch = path.match(
    /^\/games\/(\d+)\/([^/]+)\/contests\/(\d+)\/viewResult$/i
  );
  if (viewResultMatch) {
    return {
      view: 'games',
      gameId: parseInt(viewResultMatch[1], 10),
      gameName: decodeURIComponent(viewResultMatch[2]),
      gamesSubView: 'view-result',
      contestId: parseInt(viewResultMatch[3], 10),
    };
  }

  // 4c. Contest Send Refund: /games/48/FF%20FULL%20MAP/contests/80/sendRefund
  const sendRefundMatch = path.match(
    /^\/games\/(\d+)\/([^/]+)\/contests\/(\d+)\/sendRefund$/i
  );
  if (sendRefundMatch) {
    return {
      view: 'games',
      gameId: parseInt(sendRefundMatch[1], 10),
      gameName: decodeURIComponent(sendRefundMatch[2]),
      gamesSubView: 'send-refund',
      contestId: parseInt(sendRefundMatch[3], 10),
    };
  }

  // 5. Duplicate contest: /games/48/FF%20FULL%20MAP/contests/105/duplicateContest
  const duplicateMatch = path.match(
    /^\/games\/(\d+)\/([^/]+)\/contests\/(\d+)\/duplicateContest$/i
  );
  if (duplicateMatch) {
    return {
      view: 'games',
      gameId: parseInt(duplicateMatch[1], 10),
      gameName: decodeURIComponent(duplicateMatch[2]),
      gamesSubView: 'duplicate-contest',
      contestId: parseInt(duplicateMatch[3], 10),
    };
  }

  // 6. Update contest: /games/48/FF%20FULL%20MAP/contests/105/update
  const updateMatch = path.match(
    /^\/games\/(\d+)\/([^/]+)\/contests\/(\d+)\/update$/i
  );
  if (updateMatch) {
    return {
      view: 'games',
      gameId: parseInt(updateMatch[1], 10),
      gameName: decodeURIComponent(updateMatch[2]),
      gamesSubView: 'update-contest',
      contestId: parseInt(updateMatch[3], 10),
    };
  }

  // 7. Mass duplicate: /games/48/FF%20FULL%20MAP/contests/massDuplicate
  const massDupMatch = path.match(
    /^\/games\/(\d+)\/([^/]+)\/contests\/massDuplicate$/i
  );
  if (massDupMatch) {
    return {
      view: 'games',
      gameId: parseInt(massDupMatch[1], 10),
      gameName: decodeURIComponent(massDupMatch[2]),
      gamesSubView: 'mass-duplicate',
    };
  }

  // 8. Create contest: /games/48/FF%20FULL%20MAP/contests/create
  const createContestMatch = path.match(
    /^\/games\/(\d+)\/([^/]+)\/contests\/create$/i
  );
  if (createContestMatch) {
    return {
      view: 'games',
      gameId: parseInt(createContestMatch[1], 10),
      gameName: decodeURIComponent(createContestMatch[2]),
      gamesSubView: 'add-contest',
    };
  }

  // 9. Contests list: /games/48/FF%20FULL%20MAP/contests
  const contestsMatch = path.match(
    /^\/games\/(\d+)\/([^/]+)\/contests$/i
  );
  if (contestsMatch) {
    return {
      view: 'games',
      gameId: parseInt(contestsMatch[1], 10),
      gameName: decodeURIComponent(contestsMatch[2]),
      gamesSubView: 'contests',
    };
  }

  // 10. Check known static paths
  if (PATH_TO_VIEW[path]) {
    const v = PATH_TO_VIEW[path];
    return {
      view: v,
      usersSubView: v === 'users' ? 'list' : undefined,
      gamesSubView: v === 'games' ? 'list' : undefined,
    };
  }

  // Fallback
  return {
    view: 'dashboard',
  };
}

/**
 * Parses the current browser location into an AdminView
 */
export function getCurrentViewFromUrl(): AdminView {
  return parseCurrentRoute().view;
}

/**
 * Navigates to a specific path and updates history and title
 */
export function navigateToPath(targetPath: string, replace: boolean = false): void {
  if (typeof window === 'undefined') return;

  const currentPath = window.location.pathname;
  if (currentPath !== targetPath) {
    if (replace) {
      window.history.replaceState({ path: targetPath }, '', targetPath);
    } else {
      window.history.pushState({ path: targetPath }, '', targetPath);
    }
  }

  // Update document title if applicable
  const route = parseCurrentRoute(targetPath);
  if (route.gameName) {
    document.title = `${route.gameName} - GA Admin Panel`;
  } else if (route.userId) {
    document.title = `User #${route.userId} Transactions - GA Admin Panel`;
  } else if (PAGE_TITLES[route.view]) {
    document.title = PAGE_TITLES[route.view];
  }

  // Dispatch custom event to notify listeners
  window.dispatchEvent(new Event('app-route-change'));
}

/**
 * Updates browser URL and history without page reload (for main views)
 */
export function navigateToView(view: AdminView, replace: boolean = false): void {
  const targetPath = VIEW_ROUTES[view] || '/dashboard';
  navigateToPath(targetPath, replace);
}
