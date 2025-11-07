import { QueryClient } from '@tanstack/react-query';
import { env } from './environment';
import type { ApiError } from '../types/api';
// import { ApiError } from '@/types';

export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: (failureCount, error) => {
          const apiError = error as unknown as ApiError;
          
          // Don't retry on 4xx errors except 401
          if (apiError.status >= 400 && apiError.status < 500 && apiError.status !== 401) {
            return false;
          }
          
          return failureCount < (env.isDevelopment ? 1 : 3);
        },
        refetchOnWindowFocus: !env.isDevelopment,
        refetchOnMount: true,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: env.isDevelopment ? 0 : 1,
      },
    },
    // logger: {
    //   log: env.debugEnabled ? console.log : () => {},
    //   warn: env.debugEnabled ? console.warn : () => {},
    //   error: console.error, // Always log errors
    // },
  });
};

export const QUERY_KEYS = {
  AUTH: {
    all: ['auth'] as const,
    user: () => [...QUERY_KEYS.AUTH.all, 'user'] as const,
    profile: () => [...QUERY_KEYS.AUTH.all, 'profile'] as const,
  },
  DASHBOARD: {
    all: ['dashboard'] as const,
    stats: () => [...QUERY_KEYS.DASHBOARD.all, 'stats'] as const,
    activity: () => [...QUERY_KEYS.DASHBOARD.all, 'activity'] as const,
  },
} as const;