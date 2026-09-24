import { AdminView, RouteInfo } from '../types';

export const VIEW_ROUTES: Record<AdminView, string> = {
  'dashboard': '/dashboard',
  'games-stats': '/gamesstats',
  'withdraw-request': '/withdraw-requests',
  'staffs': '/staffs',
  'staff-roles': '/staffroles',
  'staff-role-permission': '/staffroles/28/permission',
  'staff-permissions': '/staffs/1/game-access',
  'staff-action-log': '/staff-action-log',
  'admins': '/admins',
  'admins-roles': '/adminroles',
  'admin-role-permission': '/adminroles/11/permission',
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

// Static reverse map for fast exact-match lookup
export const PATH_TO_VIEW: Record<string, AdminView> = {
  '/': 'dashboard',
  '/dashboard': 'dashboard',
  '/gamesstats': 'games-stats',
  '/games-stats': 'games-stats',
  '/withdraw-requests': 'withdraw-request',
  '/withdraw-request': 'withdraw-request',
  '/withdrawrequests': 'withdraw-request',
  '/staffs': 'staffs',
  '/staffroles': 'staff-roles',
  '/staff-roles': 'staff-roles',
  '/staff-permissions': 'staff-permissions',
  '/staffpermissions': 'staff-permissions',
  '/staffroles/permissions': 'staff-permissions',
  '/staff-action-log': 'staff-action-log',
  '/staffactionlog': 'staff-action-log',
  '/admins': 'admins',
  '/adminroles': 'admins-roles',
  '/admin-roles': 'admins-roles',
  '/admins-roles': 'admins-roles',
  '/admin-action-log': 'admin-action-log',
  '/adminactionlog': 'admin-action-log',
  '/settings/support': 'settings-support',
  '/settings-support': 'settings-support',
  '/settings/refer-earn': 'settings-refer-earn',
  '/settings-refer-earn': 'settings-refer-earn',
  '/settings/user-wallet': 'settings-user-wallet',
  '/settings-user-wallet': 'settings-user-wallet',
  '/settings/payment-gateway': 'settings-payment-gateway',
  '/settings-payment-gateway': 'settings-payment-gateway',
  '/settings/withdrawal-methods': 'settings-withdrawal-methods',
  '/settings-withdrawal-methods': 'settings-withdrawal-methods',
  '/webapp': 'goto-webapp',
  '/goto-webapp': 'goto-webapp',
  '/staffpanel': 'goto-staffpanel',
  '/goto-staffpanel': 'goto-staffpanel',
  '/login': 'login',
};

export const PAGE_TITLES: Record<AdminView, string> = {
  'dashboard': 'Dashboard - GA Admin Panel',
  'games-stats': 'Games Stats - GA Admin Panel',
  'withdraw-request': 'Withdraw Requests - GA Admin Panel',
  'staffs': 'Staffs Management - GA Admin Panel',
  'staff-roles': 'Staff Roles - GA Admin Panel',
  'staff-role-permission': 'Staff Role Permissions - GA Admin Panel',
  'staff-permissions': 'Staff Game Permissions - GA Admin Panel',
  'staff-action-log': 'Staff Action Log - GA Admin Panel',
  'admins': 'Admins Management - GA Admin Panel',
  'admins-roles': 'Admin Roles - GA Admin Panel',
  'admin-role-permission': 'Admin Role Permissions - GA Admin Panel',
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

/**
 * Parses any path string into RouteInfo with view and parameters
 */
export function matchRoute(rawPath: string): RouteInfo {
  const cleanPath = rawPath.replace(/\/+$/, '') || '/';

  // 1. Staff Game Access / Permissions for specific staff:
  // e.g. /staffs/1/game-access, /staffs/1/permission, /staffs/1/permissions, /staff-permissions/1
  const staffGameMatch = cleanPath.match(
    /^\/(?:staffs\/([^/]+)\/(?:game-access|game-permissions|permission|permissions|games)|(?:staff-permissions|staff-game-access|staffpermissions)\/([^/]+))$/i
  );
  if (staffGameMatch) {
    const rawId = staffGameMatch[1] || staffGameMatch[2];
    const staffId = /^\d+$/.test(rawId) ? parseInt(rawId, 10) : rawId;
    return {
      view: 'staff-permissions',
      params: { staffId },
      path: cleanPath,
    };
  }

  // 2. Staff Role Permission: e.g. /staffroles/28/permission or /staff-roles/28/permission
  const staffRoleMatch = cleanPath.match(/^\/(?:staffroles|staff-roles)\/([^/]+)\/(?:permission|permissions)$/i);
  if (staffRoleMatch) {
    const rawId = staffRoleMatch[1];
    const roleId = /^\d+$/.test(rawId) ? parseInt(rawId, 10) : rawId;
    return {
      view: 'staff-role-permission',
      params: { roleId },
      path: cleanPath,
    };
  }

  // 3. Admin Role Permission: e.g. /adminroles/11/permission or /admin-roles/11/permission
  const adminRoleMatch = cleanPath.match(/^\/(?:adminroles|admin-roles)\/([^/]+)\/(?:permission|permissions)$/i);
  if (adminRoleMatch) {
    const rawId = adminRoleMatch[1];
    const roleId = /^\d+$/.test(rawId) ? parseInt(rawId, 10) : rawId;
    return {
      view: 'admin-role-permission',
      params: { roleId },
      path: cleanPath,
    };
  }

  // 4. Staff Action Log for specific staff: e.g. /staffs/2/action-log or /staff-action-log/2
  const staffLogMatch = cleanPath.match(
    /^\/(?:staffs\/([^/]+)\/(?:action-log|logs)|(?:staff-action-log|staffactionlog)\/([^/]+))$/i
  );
  if (staffLogMatch) {
    const rawId = staffLogMatch[1] || staffLogMatch[2];
    const staffId = /^\d+$/.test(rawId) ? parseInt(rawId, 10) : rawId;
    return {
      view: 'staff-action-log',
      params: { staffId },
      path: cleanPath,
    };
  }

  // 5. Admin Action Log for specific admin: e.g. /admins/1/action-log or /admin-action-log/1
  const adminLogMatch = cleanPath.match(
    /^\/(?:admins\/([^/]+)\/(?:action-log|logs)|(?:admin-action-log|adminactionlog)\/([^/]+))$/i
  );
  if (adminLogMatch) {
    const rawId = adminLogMatch[1] || adminLogMatch[2];
    const adminId = /^\d+$/.test(rawId) ? parseInt(rawId, 10) : rawId;
    return {
      view: 'admin-action-log',
      params: { adminId },
      path: cleanPath,
    };
  }

  // 6. Exact path match
  const lowerPath = cleanPath.toLowerCase();
  if (PATH_TO_VIEW[lowerPath]) {
    return {
      view: PATH_TO_VIEW[lowerPath],
      path: cleanPath,
    };
  }

  // Default fallback
  return {
    view: 'dashboard',
    path: cleanPath,
  };
}

/**
 * Parses the current browser location (pathname, hash, or query) into a RouteInfo
 */
export function getCurrentRouteFromUrl(): RouteInfo {
  if (typeof window === 'undefined') {
    return { view: 'dashboard', path: '/dashboard' };
  }

  // 1. Check hash first (e.g. #/staffroles/28/permission)
  const hash = window.location.hash.replace(/^#/, '');
  if (hash) {
    const cleanHash = hash.startsWith('/') ? hash : `/${hash}`;
    const matched = matchRoute(cleanHash);
    if (matched.view !== 'dashboard' || cleanHash === '/' || cleanHash === '/dashboard') {
      return matched;
    }
  }

  // 2. Check query parameter ?page=/staffroles/28/permission
  const searchParams = new URLSearchParams(window.location.search);
  const pageQuery = searchParams.get('page');
  if (pageQuery) {
    const cleanQuery = pageQuery.startsWith('/') ? pageQuery : `/${pageQuery}`;
    const matched = matchRoute(cleanQuery);
    if (matched.view !== 'dashboard' || cleanQuery === '/' || cleanQuery === '/dashboard') {
      return matched;
    }
  }

  // 3. Check pathname
  return matchRoute(window.location.pathname);
}

/**
 * Returns just the AdminView (for backwards-compatibility)
 */
export function getCurrentViewFromUrl(): AdminView {
  return getCurrentRouteFromUrl().view;
}

/**
 * Builds the path string for a view and optional params
 */
export function buildPath(view: AdminView, params?: Record<string, string | number>): string {
  if (view === 'staff-permissions') {
    const staffId = params?.staffId ?? 1;
    return `/staffs/${staffId}/game-access`;
  }
  if (view === 'staff-role-permission') {
    const roleId = params?.roleId ?? 28;
    return `/staffroles/${roleId}/permission`;
  }
  if (view === 'admin-role-permission') {
    const roleId = params?.roleId ?? 11;
    return `/adminroles/${roleId}/permission`;
  }
  if (view === 'staff-action-log' && params?.staffId) {
    return `/staffs/${params.staffId}/action-log`;
  }
  if (view === 'admin-action-log' && params?.adminId) {
    return `/admins/${params.adminId}/action-log`;
  }
  return VIEW_ROUTES[view] || '/dashboard';
}

/**
 * Updates browser URL and history without page reload
 */
export function navigateToView(
  view: AdminView,
  params?: Record<string, string | number>,
  replace: boolean = false
): void {
  if (typeof window === 'undefined') return;

  const targetPath = buildPath(view, params);

  let pageTitle = PAGE_TITLES[view] || 'GA Admin Panel';
  if (view === 'staff-permissions') {
    pageTitle = `Staff #${params?.staffId ?? 1} Game Access - GA Admin Panel`;
  } else if (view === 'staff-role-permission') {
    pageTitle = `Staff Role #${params?.roleId ?? 28} Permissions - GA Admin Panel`;
  } else if (view === 'admin-role-permission') {
    pageTitle = `Admin Role #${params?.roleId ?? 11} Permissions - GA Admin Panel`;
  } else if (view === 'staff-action-log' && params?.staffId) {
    pageTitle = `Staff #${params.staffId} Action Log - GA Admin Panel`;
  } else if (view === 'admin-action-log' && params?.adminId) {
    pageTitle = `Admin #${params.adminId} Action Log - GA Admin Panel`;
  }

  document.title = pageTitle;

  const currentPath = window.location.pathname;
  if (currentPath !== targetPath) {
    if (replace) {
      window.history.replaceState({ view, params }, pageTitle, targetPath);
    } else {
      window.history.pushState({ view, params }, pageTitle, targetPath);
    }
  }
}

/**
 * Navigate directly by URL path
 */
export function navigateToUrl(path: string, replace: boolean = false): void {
  if (typeof window === 'undefined') return;

  const route = matchRoute(path);
  navigateToView(route.view, route.params, replace);
}
