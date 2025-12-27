// src/App.tsx

import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/queryClient';
// import { AppRoutes } from '@/routes';
// import { ErrorBoundary } from '@/components/common';
import './App.css';
import { AppRoutes } from './routes/appRoutes';
import { ErrorBoundary } from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        
        {/* React Query Devtools (only in development) */}
        {import.meta.env.DEV && (
          <ReactQueryDevtools 
            initialIsOpen={false} 
            position="right"
          />
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;