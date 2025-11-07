import { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { AxiosResponse, AxiosInstance } from 'axios';
import { storageService } from '@/services/storage';
import { env } from '@/config/environment';
import type { ApiError } from '@/types/api';

// Define the error response type
interface ErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
  code?: string;
}

export const setupInterceptors = (client: AxiosInstance): void => {
  // Request Interceptor
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add auth token if available
      const token = storageService.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // Add environment headers
      config.headers['X-App-Version'] = '1.0.0';
      // config.headers['X-App-Environment'] = env.getConfig().APP_ENV;
      return config;
    },
    (error: unknown) => {
      if (env.debugEnabled) {
        console.error('❌ Request Error:', error);
      }
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError<ErrorResponse>) => {
      const apiError: ApiError = {
        message: 'An unexpected error occurred',
        status: error.response?.status || 500,
        timestamp: new Date().toISOString(),
      };

      if (error.response?.data) {
        const errorData = error.response.data;
        apiError.message = errorData.message || apiError.message;
        apiError.errors = errorData.errors;
        apiError.code = errorData.code;
      }

      // Handle specific error cases
      switch (error.response?.status) {
        case 401:
          // Unauthorized - clear tokens and redirect
          storageService.clearTokens();
          window.dispatchEvent(new CustomEvent('auth:logout'));
          break;
        case 403:
          // Forbidden
          window.dispatchEvent(new CustomEvent('auth:forbidden'));
          break;
        case 500:
          // Server error
          if (env.isProduction) {
            apiError.message = 'Server is temporarily unavailable';
          }
          break;
      }

      return Promise.reject(apiError);
    }
  );
};