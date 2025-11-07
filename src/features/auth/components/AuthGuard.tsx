import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, redirectTo }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Don't redirect while checking auth status
  if (isLoading) {
    return <>{children}</>;
  }
  
  // If already authenticated, redirect away from auth pages
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return <>{children}</>;
};