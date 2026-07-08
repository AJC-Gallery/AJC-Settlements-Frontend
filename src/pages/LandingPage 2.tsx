// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Brain, BarChart3, Shield, Zap, Users, CheckCircle, Star } from 'lucide-react';
import { useCurrentUser } from '@/hooks/useAuth';
import logo1 from '../assets/logo1.png';

export const LandingPage: React.FC = () => {
  const { data: user, isSuccess } = useCurrentUser();
  const isAuthenticated = isSuccess && !!user;

  const features = [
    {
      icon: <Brain className="w-12 h-12 text-blue-600" />,
      title: "Intelligent Inventory Optimization",
      description: "Sophisticated algorithms analyze component lifecycle patterns, predictive maintenance requirements, and optimize inventory allocation for maximum operational efficiency."
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-blue-600" />,
      title: "Real-Time Enterprise Analytics",
      description: "Access comprehensive real-time data intelligence across all facilities with advanced forecasting and automated supply chain notifications."
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Premium Quality Assurance",
      description: "Industry-leading quality control protocols with comprehensive certification tracking and warranty management for all automotive solutions."
    },
    {
      icon: <Zap className="w-12 h-12 text-blue-600" />,
      title: "Advanced Business Intelligence",
      description: "Enterprise-grade reporting suite featuring comprehensive analytics, customer lifecycle insights, and performance optimization metrics."
    }
  ];

  const benefits = [
    "Optimize operational costs through intelligent inventory management systems",
    "Streamline processes with automated enterprise-grade notifications",
    "Access comprehensive automotive solutions database and certification tracking",
    "Maintain continuous 24/7 inventory monitoring with predictive analytics"
  ];

  const stats = [
    { label: "Brands", value: "15+" },
    { label: "Available goods", value: "2000+" },
    { label: "Durability", value: "95%" },
    { label: "Stations", value: "10+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={logo1} alt="AJC Gallery" className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-900">AJC Gallery</span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-700">Welcome back, {user?.firstName}!</span>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/sign-in"
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/sign-up"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Star className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-600">
                Advanced Automotive Solutions Platform
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Premium Automotive Solutions
              <br />
              <span className="text-blue-600">Enterprise Grade Excellence</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Experience comprehensive enterprise solutions for premium automotive components including performance tyres, 
              advanced battery systems, precision-engineered tubes, and professional-grade accessories with sophisticated 
              inventory management and analytical reporting capabilities.
            </p>
            <div className="flex justify-center space-x-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  Access Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/sign-up"
                    className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    Start Building Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link
                    to="/sign-in"
                    className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Do We Offer?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover an extensive portfolio of premium automotive solutions including performance tyres, 
              advanced battery technologies, precision-engineered components, and professional-grade accessories - 
              all centralized within the AJC Gallery ecosystem.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Transform Your Automotive Enterprise</h2>
              <p className="text-blue-100 mb-8">
                Join leading automotive enterprises worldwide who have revolutionized their operations through 
                our advanced inventory management solutions. Our platform seamlessly integrates cutting-edge 
                technology with intuitive enterprise architecture to optimize your entire supply chain ecosystem.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-300 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-blue-100">{benefit}</span>
                  </div>
                ))}
              </div>
              {!isAuthenticated && (
                <Link
                  to="/sign-up"
                  className="inline-block mt-8 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                  Get Started Today
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <TrendingUp className="w-8 h-8 text-green-300 mb-3" />
                <h4 className="text-xl font-bold mb-2">Revenue Optimization</h4>
                <p className="text-blue-100">+24.5% quarterly growth</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <Users className="w-8 h-8 text-green-300 mb-3" />
                <h4 className="text-xl font-bold mb-2">Enterprise Network</h4>
                <p className="text-blue-100">Global supplier integration</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <Shield className="w-8 h-8 text-green-300 mb-3" />
                <h4 className="text-xl font-bold mb-2">Excellence Standards</h4>
                <p className="text-blue-100">ISO-certified solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="py-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Elevate Your Automotive Enterprise?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Partner with industry leaders and experience the future of intelligent automotive solutions 
              management through our comprehensive enterprise platform.
            </p>
            <Link
              to="/sign-up"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Create Free Account
            </Link>
            <p className="text-gray-400 mt-4 text-sm">
              No credit card required • Free forever
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={logo1} alt="AJC Gallery" className="h-8 w-auto" />
              <span className="ml-2 text-lg font-bold">AJC Gallery</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 AJC Gallery. All rights reserved. Your strategic automotive solutions partner.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};