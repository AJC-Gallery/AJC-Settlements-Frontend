// src/lib/queryClient.ts

import { QueryClient } from '@tanstack/react-query';

/**
 * TanStack Query Client Configuration
 * 
 * Global settings for all queries and mutations
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Refetch on window focus (useful for keeping data fresh)
      refetchOnWindowFocus: false,
      
      // Refetch on reconnect
      refetchOnReconnect: true,
      
      // Retry failed requests (false for auth to avoid multiple 401s)
      retry: 1,
      
      // Stale time - data considered fresh for 5 minutes
      staleTime: 5 * 60 * 1000, // 5 minutes
      
      // Cache time - data kept in cache for 10 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    },
    mutations: {
      // Retry failed mutations
      retry: 1,
      
      // Mutation error handling can be added here
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
});