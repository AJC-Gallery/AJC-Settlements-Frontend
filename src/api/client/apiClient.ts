// src/api/client/apiClient.ts
import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import type { ApiResponse, ApiError } from "../types";

/**
 * API Client Configuration
 */
const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_TIMEOUT = 30000; // 30 seconds

/**
 * Create Axios Instance with default configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  withCredentials: true, // CRITICAL: Send cookies with every request
  headers: {
    Accept: "application/json",
    // REMOVED 'Content-Type': 'application/json' - let axios set it based on data type
  },
});

/**
 * Request Interceptor
 * - Logs outgoing requests (development only)
 * - Can add additional headers if needed
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // IMPORTANT: For FormData, don't set Content-Type header
    // Let axios/browser handle it automatically with correct boundary
    if (config.data instanceof FormData) {
      // Remove Content-Type header to let browser set it with boundary
      delete config.headers["Content-Type"];
    } else if (!config.headers["Content-Type"]) {
      // Only set JSON content-type for non-FormData requests
      config.headers["Content-Type"] = "application/json";
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log("🚀 API Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data instanceof FormData ? "[FormData]" : config.data,
        headers: config.headers,
      });
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * - Handles successful responses
 * - Handles errors (401, 403, 500, etc.)
 * - Extracts data from ApiResponse wrapper
 */
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log("✅ API Response:", {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }

    // Return the response as-is (services will extract .data)
    return response;
  },
  (error: AxiosError<ApiError>) => {
    // Log error in development
    if (import.meta.env.DEV) {
      console.error("❌ API Error:", {
        url: error.config?.url,
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });
    }

    // Handle specific error codes
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          console.warn("🔒 Unauthorized - Redirecting to login");
          // Clear any auth state and redirect
          window.location.href = "/login";
          break;

        case 403:
          // Forbidden - user doesn't have permission
          console.warn("🚫 Forbidden - Insufficient permissions");
          break;

        case 404:
          // Not found
          console.warn("🔍 Resource not found");
          break;

        case 500:
        case 502:
        case 503:
          // Server errors
          console.error("🔥 Server error");
          break;

        default:
          console.error("⚠️ API Error:", data?.message || "Unknown error");
      }

      // Return formatted error
      return Promise.reject({
        message: data?.message || "An error occurred",
        statusCode: status,
        error: data?.error || "Error",
      });
    }

    // Network error (no response from server)
    if (error.request) {
      console.error("🌐 Network Error: No response from server");
      return Promise.reject({
        message: "Network error. Please check your connection.",
        statusCode: 0,
        error: "NetworkError",
      });
    }

    // Something else went wrong
    return Promise.reject({
      message: error.message || "An unexpected error occurred",
      statusCode: 0,
      error: "UnknownError",
    });
  }
);

/**
 * Helper function to extract data from ApiResponse wrapper
 */
export const extractData = <T>(response: { data: ApiResponse<T> }): T => {
  return response.data.data;
};

export default apiClient;
