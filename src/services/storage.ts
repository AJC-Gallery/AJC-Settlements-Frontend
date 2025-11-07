import { env } from '@/config/environment';

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'ajc_access_token',
  REFRESH_TOKEN: 'ajc_refresh_token',
  USER_PREFERENCES: 'ajc_user_preferences',
  THEME: 'ajc_theme',
} as const;

class StorageService {
  private getStorageKey(key: string): string {
    const envPrefix = env.isDevelopment ? 'dev_' : env.isStaging ? 'staging_' : '';
    return `${envPrefix}${key}`;
  }

  // Token management
  getAccessToken(): string | null {
    // First try cookies (for SSR compatibility)
    const cookieToken = this.getTokenFromCookie(STORAGE_KEYS.ACCESS_TOKEN);
    if (cookieToken) return cookieToken;

    // Fallback to localStorage
    return localStorage.getItem(this.getStorageKey(STORAGE_KEYS.ACCESS_TOKEN));
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.getStorageKey(STORAGE_KEYS.ACCESS_TOKEN), token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.getStorageKey(STORAGE_KEYS.REFRESH_TOKEN));
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(this.getStorageKey(STORAGE_KEYS.REFRESH_TOKEN), token);
  }

  clearTokens(): void {
    localStorage.removeItem(this.getStorageKey(STORAGE_KEYS.ACCESS_TOKEN));
    localStorage.removeItem(this.getStorageKey(STORAGE_KEYS.REFRESH_TOKEN));
    
    // Clear cookies as well
    document.cookie = `${STORAGE_KEYS.ACCESS_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${STORAGE_KEYS.REFRESH_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  private getTokenFromCookie(key: string): string | null {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => 
      cookie.trim().startsWith(`${key}=`)
    );
    return tokenCookie ? decodeURIComponent(tokenCookie.split('=')[1]) : null;
  }

  // Generic storage methods
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(this.getStorageKey(key), serializedValue);
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getStorageKey(key));
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Failed to get from localStorage:', error);
      return null;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(this.getStorageKey(key));
  }

  clear(): void {
    localStorage.clear();
  }

  // Check if storage is available
  isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}

export const storageService = new StorageService();