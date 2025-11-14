// src/routes/appRoutes.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
// import { AppLayout, AuthLayout } from '@/layouts';

 
   
import {  LandingPage } from '@/pages/LandingPage';
import { SignInPage } from '@/pages/LoginPage';
import { SignUpPage } from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import SettingsPage from '@/pages/SettingsPage';
import SettlementsPage from '@/pages/SettlementsPage';
import OrganizationsPage from '@/pages/OrganizationsPage';
import OccupantsPage from '@/pages/OccupantsPage';
import RevenuePage from '@/pages/RevenuePage';
import ContactInfoPage from '@/pages/ContactInfoPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { AuthLayout } from '@/layouts/AuthLayout';
import { AppLayout } from '@/layouts/AppLayout';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes (Auth Layout) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Route>

      {/* Protected Routes (App Layout) */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settlements" element={<SettlementsPage />} />
        <Route path="/organizations" element={<OrganizationsPage />} />
        <Route path="/occupants" element={<OccupantsPage />} />
        <Route path="/revenue" element={<RevenuePage />} />
        <Route path="/contact-info" element={<ContactInfoPage />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};