// src/utils/dev.ts - Development utilities
import { env } from '@/config/environment';

export const devUtils = {
  // Enhanced logging for development
  log: (message: string, data?: unknown) => {
    if (env.debugEnabled) {
      console.log(`🔧 [${new Date().toLocaleTimeString()}] ${message}`, data || '');
    }
  },

  warn: (message: string, data?: unknown) => {
    if (env.debugEnabled) {
      console.warn(`⚠️ [${new Date().toLocaleTimeString()}] ${message}`, data || '');
    }
  },

  error: (message: string, data?: unknown) => {
    if (env.debugEnabled) {
      console.error(`❌ [${new Date().toLocaleTimeString()}] ${message}`, data || '');
    }
  },

  // Performance measurement
  time: (label: string) => {
    if (env.debugEnabled) {
      console.time(`⏱️ ${label}`);
    }
  },

  timeEnd: (label: string) => {
    if (env.debugEnabled) {
      console.timeEnd(`⏱️ ${label}`);
    }
  },

  // API call debugging
  logApiCall: (method: string, url: string, data?: unknown) => {
    if (env.debugEnabled) {
      console.group(`🌐 API ${method.toUpperCase()} ${url}`);
      if (data) console.log('Data:', data);
      console.groupEnd();
    }
  },

  // React Query debugging
  logQuery: (queryKey: readonly unknown[], data?: unknown, error?: unknown) => {
    if (env.debugEnabled) {
      console.group(`🔍 Query: ${JSON.stringify(queryKey)}`);
      if (data) console.log('Data:', data);
      if (error) console.error('Error:', error);
      console.groupEnd();
    }
  },

  // Environment info display
  showEnvironmentInfo: () => {
    if (env.debugEnabled) {
      console.group('🌍 Environment Info');
      console.log('Environment:', env.getConfig().APP_ENV);
      console.log('API URL:', env.apiUrl);
      console.log('Debug Mode:', env.debugEnabled);
      console.log('Query Devtools:', env.queryDevtoolsEnabled);
      console.groupEnd();
    }
  },
} as const;

// Auto-display environment info on load
if (env.isDevelopment) {
  devUtils.showEnvironmentInfo();
}