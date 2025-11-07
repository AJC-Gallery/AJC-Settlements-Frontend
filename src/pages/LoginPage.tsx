import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInForm } from '../features/auth/components';
// import { SignInForm } from '../components/SignInForm';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignInSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex w-full min-h-screen">
      {/* Left side - Brand/Info section */}
      <div className="flex-1 bg-gradient-to-br from-blue-900 via-black to-black flex items-center justify-center p-8 lg:p-12">
        <div className="text-white text-center lg:text-left max-w-md">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Welcome Back
          </h2>
          <p className="text-green-100 text-lg mb-6">
            Sign in to access your dashboard and manage your inventory.
          </p>
          <div className="hidden lg:block">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-green-100">Secure authentication</span>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-green-100">
                Instant access to dashboard
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-green-100">24/7 support available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Sign in form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gray-50">
        <SignInForm onSuccess={handleSignInSuccess} />
      </div>
    </div>
  );
};