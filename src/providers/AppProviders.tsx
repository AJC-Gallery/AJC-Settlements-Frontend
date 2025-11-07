import React from 'react';
import { QueryProvider } from './QueryProvider';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';
// import { AuthProvider } from '@/features/auth';
// import { ThemeProvider } from './ThemeProvider';
// import { ErrorBoundary } from '@/components/common/ErrorBoundary';

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
};