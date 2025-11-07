
// Updated AuthLayout to remove body CSS conflicts
// src/layouts/AuthLayout.tsx
import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface AuthLayoutProps {
  children?: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full">
      {children || <Outlet />}
    </div>
  );
};