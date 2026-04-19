import { Link } from 'react-router-dom';
import { Eye, Activity, ArrowRight } from 'lucide-react';
import CBILogo from '../components/CBILogo';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CBILogo className="w-12 h-12" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Central Bank of India</h1>
              <p className="text-xs text-gray-500">Customer 360 Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live System</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Customer 360° Intelligence
          </h2>
          <p className="text-2xl text-gray-600 mb-3 font-light">
            Real-time Customer Insights & Behavioral Analytics
          </p>
          <p className="text-sm text-gray-400 uppercase tracking-wider">
            "CENTRAL" TO YOU SINCE 1911
          </p>
        </div>

        {/* Main Dashboard Card */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="block bg-gradient-to-br from-cbi-blue via-blue-700 to-blue-900 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-300 group animate-slideInLeft"
          >
            <div className="p-12 text-white relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
              <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold">LIVE DASHBOARD</span>
                  </div>
                  <h3 className="text-4xl font-bold mb-3">Customer 360° Dashboard</h3>
                  <p className="text-blue-100 text-lg mb-6 max-w-2xl">
                    Comprehensive real-time view of customer profiles, behavioral insights, 
                    credit portfolios, and AI-powered intelligence triggers
                  </p>
                  
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                      <p className="text-blue-200 text-sm mb-1">Live Metrics</p>
                      <p className="text-2xl font-bold">Real-time</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                      <p className="text-blue-200 text-sm mb-1">AI Engine</p>
                      <p className="text-2xl font-bold">Active</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                      <p className="text-blue-200 text-sm mb-1">Triggers</p>
                      <p className="text-2xl font-bold">Dynamic</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                      <p className="text-blue-200 text-sm mb-1">Updates</p>
                      <p className="text-2xl font-bold">3s</p>
                    </div>
                  </div>
                </div>
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Eye className="w-10 h-10" />
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-white">
                <span className="text-lg font-semibold">Open Dashboard</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Secondary Options */}
        <div className="grid md:grid-cols-2 gap-8 animate-slideInRight">
          <Link
            to="/mobile"
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-cbi-red group p-8 transform hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="w-12 h-12 bg-cbi-red/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cbi-red group-hover:scale-110 transition-all">
                  <svg className="w-6 h-6 text-cbi-red group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Loan Journey Simulation
                </h3>
                <p className="text-gray-600 mb-4">
                  Auto-simulated end-to-end loan application flow with OTP verification, 
                  document review, and instant approval process
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Auto-fills OTP</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Progress Tracking</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Instant Approval</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-cbi-red font-semibold">
              <span>Start Simulation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          <Link
            to="/processing"
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-green-500 group p-8 transform hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500 group-hover:scale-110 transition-all">
                  <Activity className="w-6 h-6 text-green-600 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Backend Processing Console
                </h3>
                <p className="text-gray-600 mb-4">
                  Live backend event monitoring with real-time processing logs, 
                  rule engine triggers, and multi-channel orchestration
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Live Logs</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Rule Engine</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Auto-updates</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-600 font-semibold">
              <span>View Console</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            Powered by CBI Gen/2025 AI Engine • Real-time Analytics • RBI Compliant
          </p>
        </div>
      </div>
    </div>
  );
}
