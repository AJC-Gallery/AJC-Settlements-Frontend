// src/routes/ProtectedRoute.tsx

import { Navigate, useLocation } from 'react-router-dom';
import { useCurrentUser } from '@/hooks';
import { Spinner } from '@/components/ui/spinner';
// import { Loading } from '@/components/common';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Protected Route Component
 * 
 * Wraps routes that require authentication
 * - Shows loading state while checking auth
 * - Redirects to login if not authenticated
 * - Renders children if authenticated
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { data: user, isLoading, isError } = useCurrentUser();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  // If error or no user, redirect to login
  if (isError || !user) {
    // Save the attempted location for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};