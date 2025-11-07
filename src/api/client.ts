import axios from 'axios'; // runtime import

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

import { apiConfig } from '@/config/api.config';
import { env } from '@/config/environment';
import { setupInterceptors } from './interceptors';
import type { ApiRequestConfig, ApiResponse } from '@/types/api';
// import { ApiResponse, ApiRequestConfig } from '@/types';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create(apiConfig);
    setupInterceptors(this.client);
    
    if (env.debugEnabled) {
      this.enableDebugMode();
    }
  }

  private enableDebugMode(): void {
    this.client.interceptors.request.use(
      (config: import("axios").InternalAxiosRequestConfig) => {
        console.log('🚀 API Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
          params: config.params,
        });
        return config;
      }
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log('✅ API Response:', {
          status: response.status,
          url: response.config.url,
          data: response.data,
        });
        return response;
      },
      (error: AxiosError) => {
        console.log('❌ API Error:', {
          status: error.response?.status,
          url: error.config?.url,
          message: error.message,
          data: error.response?.data,
        });
        return Promise.reject(error);
      }
    );
  }

  private buildConfig(customConfig?: ApiRequestConfig): AxiosRequestConfig {
    const config: AxiosRequestConfig = {};
    
    if (customConfig?.timeout) {
      config.timeout = customConfig.timeout;
    }
    
    return config;
  }

  async get<T>(
    url: string, 
    params?: Record<string, unknown>,
    config?: ApiRequestConfig
  ): Promise<T> {
    const response = await this.client.get<ApiResponse<T>>(
      url, 
      { 
        params, 
        ...this.buildConfig(config) 
      }
    );
    return response.data.data;
  }

  async post<T>(
    url: string, 
    data?: unknown, 
    config?: ApiRequestConfig
  ): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(
      url, 
      data, 
      this.buildConfig(config)
    );
    return response.data.data;
  }

  async put<T>(
    url: string, 
    data?: unknown, 
    config?: ApiRequestConfig
  ): Promise<T> {
    const response = await this.client.put<ApiResponse<T>>(
      url, 
      data, 
      this.buildConfig(config)
    );
    return response.data.data;
  }

  async patch<T>(
    url: string, 
    data?: unknown, 
    config?: ApiRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<ApiResponse<T>>(
      url, 
      data, 
      this.buildConfig(config)
    );
    return response.data.data;
  }

  async delete<T>(
    url: string, 
    config?: ApiRequestConfig
  ): Promise<T> {
    const response = await this.client.delete<ApiResponse<T>>(
      url, 
      this.buildConfig(config)
    );
    return response.data.data;
  }

  // Get the raw axios instance for advanced usage
  getInstance(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = new ApiClient();