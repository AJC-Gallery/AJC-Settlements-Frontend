import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpForm } from '../features/auth/components';
// import { SignUpForm } from '../components/SignUpForm';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUpSuccess = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left side - Brand section */}
      <div className="flex-1 bg-gradient-to-br from-blue-900 via-black to-black flex items-center justify-center p-8 lg:p-12">
        <div className="max-w-md text-white text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-green-100 text-lg mb-6">
            Create your account and unlock amazing features.
          </p>
          <div className="hidden lg:block">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-green-100">Free to get started</span>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-green-100">Instant access to dashboard</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-green-100">24/7 support available</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Form section */}
      <div className="flex-1 bg-gray-50">
        <div className="min-h-full flex flex-col items-center justify-center p-6 lg:p-12">
          <SignUpForm onSuccess={handleSignUpSuccess} />
        </div>
      </div>
    </div>
  );
};