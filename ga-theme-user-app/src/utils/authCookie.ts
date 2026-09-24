export type AuthMode = 'guest' | 'logged_in';

const COOKIE_NAME = 'gamex_user_mode';
const STORAGE_KEY = 'gamex_user_mode';

/**
 * Stores whether user selected 'guest' or 'logged_in' in both cookie and localStorage.
 */
export function setAuthModeCookie(mode: AuthMode): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, mode);
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${COOKIE_NAME}=${mode}; expires=${expires}; path=/; SameSite=Lax`;
  } catch (err) {
    console.error('Failed to set auth cookie:', err);
  }
}

/**
 * Retrieves the stored auth mode from cookie or localStorage.
 */
export function getAuthModeCookie(): AuthMode | null {
  if (typeof window === 'undefined') return null;
  try {
    // Check cookie first
    const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
    if (match && (match[1] === 'guest' || match[1] === 'logged_in')) {
      return match[1] as AuthMode;
    }
    // Fallback to localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'guest' || stored === 'logged_in') {
      return stored as AuthMode;
    }
  } catch (err) {
    console.error('Failed to get auth cookie:', err);
  }
  return null;
}

/**
 * Clears the stored auth mode cookie and localStorage (e.g. on explicit logout).
 */
export function clearAuthModeCookie(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
  } catch (err) {
    console.error('Failed to clear auth cookie:', err);
  }
}
