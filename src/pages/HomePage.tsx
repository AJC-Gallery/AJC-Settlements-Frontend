 
// src/pages/HomePage.tsx 
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  TrendingUp, 
  Brain, 
  BarChart3, 
  Shield, 
  Zap, 
  Users,
  CheckCircle,
  Star
} from 'lucide-react';
import { useAuth } from '@/features/auth';
import { env } from '@/config/environment';
import logo1 from '../assets/logo2.png';

export const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Intelligent Inventory Optimization",
      description: "Sophisticated algorithms analyze component lifecycle patterns, predictive maintenance requirements, and optimize inventory allocation for maximum operational efficiency."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real-Time Enterprise Analytics",
      description: "Access comprehensive real-time data intelligence across all facilities with advanced forecasting and automated supply chain notifications."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Premium Quality Assurance",
      description: "Industry-leading quality control protocols with comprehensive certification tracking and warranty management for all automotive solutions."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
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
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-black to-black">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500/20 to-black rounded-lg flex items-center justify-center">
              <img src={logo1} alt="AJC Gallery" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-white">{env.appName}</span>
            {env.isDevelopment && (
              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">DEV</span>
            )}
            {env.isStaging && (
              <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded">STAGING</span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">
                  Welcome back, {user?.firstName}!
                </span>
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-teal-600 to-black text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition duration-200"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  <span className="text-white">Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-green-900 to-black text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition duration-200"
                >
                  <span className="text-white">Get Started</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Advanced Automotive Solutions Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Premium Automotive Solutions
              <span className="bg-gradient-to-r from-teal-400 to-black bg-clip-text text-transparent block">
                Enterprise Grade Excellence              
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience comprehensive enterprise solutions for premium automotive components including performance tyres, advanced battery systems, precision-engineered tubes, and professional-grade accessories with sophisticated inventory management and analytical reporting capabilities.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="group bg-gradient-to-r from-green-900 to-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 flex items-center space-x-2"
                >
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="group bg-gradient-to-r from-green-900 to-black px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 flex items-center space-x-2"
                  >
                    <span className="text-white">Start Building Now</span>
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <Link
                    to="/login"
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition duration-300"
                  >
                    <span className="text-white">Sign In</span>
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-black/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              What Do We Offer?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover an extensive portfolio of premium automotive solutions including performance tyres, advanced battery technologies, precision-engineered components, and professional-grade accessories - all centralized within the AJC Gallery ecosystem.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition duration-300 group"
              >
                <div className="text-white mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Transform Your Automotive Enterprise
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join leading automotive enterprises worldwide who have revolutionized their operations through our advanced inventory management solutions. 
                Our platform seamlessly integrates cutting-edge technology with intuitive enterprise architecture to optimize your entire supply chain ecosystem.
              </p>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-900 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
              
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-900 to-black text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition duration-300"
                >
                  <span className="text-white">Get Started Today</span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </Link>
              )}
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-teal-600/20 to-black/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-900" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Revenue Optimization</div>
                      <div className="text-green-900 text-sm">+24.5% quarterly growth</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Enterprise Network</div>
                      <div className="text-white text-sm">Global supplier integration</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Excellence Standards</div>
                      <div className="text-purple-400 text-sm">ISO-certified solutions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="px-6 py-20 bg-gradient-to-r from-teal-600/10 to-black/10 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Elevate Your Automotive Enterprise?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Partner with industry leaders and experience the future of intelligent automotive solutions management through our comprehensive enterprise platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="group bg-gradient-to-r from-green-900 to-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 flex items-center space-x-2"
              >
                <span className="text-white">Create Free Account</span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="text-gray-400 text-sm">
                No credit card required • Free forever
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-black rounded flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">{env.appName}</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 AJC Gallery. All rights reserved. Your strategic automotive solutions partner.
          </p>
          {env.isDevelopment && (
            <p className="text-xs text-gray-500 mt-2">
              Running in {env.getConfig().APP_ENV} mode
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};