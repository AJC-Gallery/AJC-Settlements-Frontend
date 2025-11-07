
export type Environment = 'development' | 'staging' | 'production';

export interface EnvironmentConfig {
  APP_ENV: Environment;
  API_URL: string;
  API_TIMEOUT: number;
  APP_NAME: string;
  DEBUG: boolean;
  QUERY_DEVTOOLS: boolean;
}

class EnvironmentManager {
  private config: EnvironmentConfig;

  constructor() {
    this.config = {
      APP_ENV: (import.meta.env.VITE_APP_ENV as Environment) || 'development',
      API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
      API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
      APP_NAME: import.meta.env.VITE_APP_NAME || 'AJC Gallery',
      DEBUG: import.meta.env.VITE_DEBUG === 'true',
      QUERY_DEVTOOLS: import.meta.env.VITE_QUERY_DEVTOOLS === 'true',
    };
  }

  get isDevelopment(): boolean {
    return this.config.APP_ENV === 'development';
  }

  get isStaging(): boolean {
    return this.config.APP_ENV === 'staging';
  }

  get isProduction(): boolean {
    return this.config.APP_ENV === 'production';
  }

  get apiUrl(): string {
    return this.config.API_URL;
  }

  get apiTimeout(): number {
    return this.config.API_TIMEOUT;
  }

  get appName(): string {
    return this.config.APP_NAME;
  }

  get debugEnabled(): boolean {
    return this.config.DEBUG;
  }

  get queryDevtoolsEnabled(): boolean {
    return this.config.QUERY_DEVTOOLS;
  }

  getConfig(): EnvironmentConfig {
    return { ...this.config };
  }
}

export const env = new EnvironmentManager();