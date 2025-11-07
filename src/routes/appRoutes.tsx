import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard } from '../features/auth';
import { HomePage } from '@/pages/HomePage';
import Dashboard from '@/pages/DashboardPage';
import { AppLayout } from '@/layouts/appLayout';
import { AuthLayout } from '@/layouts/authLayout';
import { SignInPage } from '@/pages/LoginPage';
import { SignUpPage } from '@/pages/RegisterPage';
import { ProtectedRoute } from './ProtectedRoute';
// import AppLayout from '@/layouts/appLayout';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Home Route */}
      <Route path="/" element={<HomePage />} />
      
      {/* Auth Routes */}
      <Route 
        path="/login" 
        element={
          <AuthGuard redirectTo="/dashboard">
            <AuthLayout>
              <SignInPage />
            </AuthLayout>
          </AuthGuard>
        } 
      />
      
      <Route 
        path="/register" 
        element={
          <AuthGuard redirectTo="/dashboard">
            <AuthLayout>
              <SignUpPage />
            </AuthLayout>
          </AuthGuard>
        } 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <div>Profile Page</div>
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <div>Settings Page</div>
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};