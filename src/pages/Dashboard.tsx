import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Award, CreditCard, Home, Bike, User, Phone, Mail, MessageSquare, Shield, Clock, Globe, Users, FileText } from 'lucide-react';
import { mockCustomer, mockCreditProducts, mockTriggers, customerExtended } from '../services/mockData';
import CBILogo from '../components/CBILogo';

type TabType = 'profile' | 'offers' | 'insights';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [ltvScore, setLtvScore] = useState(84);
  const [appSessions, setAppSessions] = useState(92);
  const [waOpenRate, setWaOpenRate] = useState(85);
  const [crossSell, setCrossSell] = useState(67);
  const [isLive] = useState(true);
  const [showOffers, setShowOffers] = useState(false);

  const handleViewOffers = () => {
    setShowOffers(!showOffers);
  };

  const handleBuildOffer = () => {
    navigate('/mobile');
  };

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLtvScore(prev => Math.min(100, prev + Math.floor(Math.random() * 2)));
      setAppSessions(prev => Math.min(100, prev + Math.floor(Math.random() * 3) - 1));
      setWaOpenRate(prev => Math.min(100, prev + Math.floor(Math.random() * 2)));
      setCrossSell(prev => Math.min(100, prev + Math.floor(Math.random() * 2)));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex flex-col">
        {/* Top Bar with Tabs */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Link to="/" className="text-gray-400 hover:text-cbi-blue transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <CBILogo className="w-10 h-10" />
              <div>
                <h1 className="text-gray-900 font-bold text-base">Central Bank of India</h1>
                <p className="text-gray-500 text-xs">Customer 360 Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-xs font-semibold">LIVE</span>
              </div>
              <span className="text-gray-500 text-xs">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-3 px-2 text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'profile'
                  ? 'border-cbi-blue text-cbi-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Customer Profile
            </button>
            <button
              onClick={() => setActiveTab('offers')}
              className={`pb-3 px-2 text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'offers'
                  ? 'border-cbi-blue text-cbi-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Offers & Products
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`pb-3 px-2 text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'insights'
                  ? 'border-cbi-blue text-cbi-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              AI Insights
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-8 py-4 bg-gray-50">
          {/* Customer Profile Tab */}
          {activeTab === 'profile' && (
            <div className="animate-fadeIn max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-cbi-blue via-blue-700 to-blue-900 rounded-xl shadow-lg p-5 mb-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{mockCustomer.name}</h1>
                <p className="text-blue-100 text-xs">CIF: {customerExtended.kyc.cif} • {mockCustomer.segment}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm mb-2">Customer since {mockCustomer.since}</p>
              <div className="inline-flex items-center gap-2 bg-yellow-500 text-yellow-900 px-3 py-1.5 rounded-full font-bold text-sm">
                <Award className="w-4 h-4" />
                {mockCustomer.tier} Tier
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mt-4 relative z-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 card-hover border border-white/20 transform transition-all duration-300 hover:scale-105">
              <p className="text-blue-200 text-xs mb-1">LTV Score</p>
              <p className="text-2xl font-bold">{ltvScore}/100</p>
              <div className="w-full bg-white/20 rounded-full h-1.5 mt-2">
                <div className="bg-yellow-400 h-1.5 rounded-full transition-all duration-500" style={{ width: `${ltvScore}%` }}></div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 card-hover border border-white/20 transform transition-all duration-300 hover:scale-105">
              <p className="text-blue-200 text-xs mb-1">Monthly Income</p>
              <p className="text-2xl font-bold">₹{(mockCustomer.monthlyIncome / 1000).toFixed(0)}K</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 card-hover border border-white/20 transform transition-all duration-300 hover:scale-105">
              <p className="text-blue-200 text-xs mb-1">FOIR Headroom</p>
              <p className="text-2xl font-bold">{mockCustomer.foir}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 card-hover border border-white/20 transform transition-all duration-300 hover:scale-105">
              <p className="text-blue-200 text-xs mb-1">Credit Score</p>
              <p className="text-2xl font-bold">{mockCustomer.creditScore}</p>
              <div className="w-full bg-white/20 rounded-full h-1.5 mt-2">
                <div className="bg-green-400 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(mockCustomer.creditScore / 900) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 mb-5 animate-slideInLeft">
          <div className="bg-white rounded-xl shadow-sm p-5 card-hover border border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cbi-blue to-blue-700 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <User className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Customer Profile</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Segment</p>
                    <p className="font-semibold text-gray-900">{mockCustomer.segment}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tier</p>
                    <p className="font-semibold text-yellow-600">{mockCustomer.tier}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Customer Since</p>
                    <p className="font-semibold text-gray-900">{mockCustomer.since}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">LTV Score</p>
                    <p className="font-semibold text-green-600">{ltvScore}/100</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-3">
              <h3 className="font-semibold text-gray-700 mb-3 text-sm">Customer Behavior & Insight</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
                  <p className="text-xs text-purple-700 mb-1">High-value Dining (&gt;₹5K)</p>
                  <p className="text-2xl font-bold text-purple-900">28</p>
                  <p className="text-xs text-purple-600">Perfect Txns</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-700 mb-1">Recurring EMI Payments</p>
                  <p className="text-2xl font-bold text-blue-900">₹16K</p>
                  <p className="text-xs text-blue-600">LTV Score: {ltvScore}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-3 mt-3">
              <h3 className="font-semibold text-gray-700 mb-2 text-sm">Contact Information</h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-semibold text-gray-900">{mockCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold text-gray-900">{mockCustomer.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Engagement Momentum + Product Stack */}
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 card-hover">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Engagement Momentum</h2>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-green-50 border border-green-200 rounded-lg p-2.5">
                <span className="text-xs font-semibold text-green-900 block mb-1.5">App<br/>sessions</span>
                <div className="w-full bg-green-200 rounded-full h-1.5 mb-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${appSessions}%` }}></div>
                </div>
                <span className="text-base font-bold text-green-700">{appSessions}%</span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5">
                <span className="text-xs font-semibold text-blue-900 block mb-1.5">WA open<br/>rate</span>
                <div className="w-full bg-blue-200 rounded-full h-1.5 mb-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${waOpenRate}%` }}></div>
                </div>
                <span className="text-base font-bold text-blue-700">{waOpenRate}%</span>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-2.5">
                <span className="text-xs font-semibold text-purple-900 block mb-1.5">Cross-sell</span>
                <div className="w-full bg-purple-200 rounded-full h-1.5 mb-1.5">
                  <div className="bg-purple-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${crossSell}%` }}></div>
                </div>
                <span className="text-base font-bold text-purple-700">{crossSell}%</span>
              </div>
            </div>
            </div>

            {/* Product Stack Card */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 card-hover">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Product Stack for Mr. Rohan</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="w-8 h-8 bg-gradient-to-br from-cbi-blue to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SA</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-xs">Savings Account</p>
                  <p className="text-xs text-gray-600 truncate">₹16,251 • 3% interest</p>
                </div>
                <span className="px-2 py-0.5 bg-green-500 text-white rounded-full text-xs font-bold">ACTIVE</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-green-50 to-emerald-100 rounded-lg border border-green-200">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">CC</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-xs">Credit Card</p>
                  <p className="text-xs text-gray-600 truncate">Limit: ₹2L • Util: 18%</p>
                </div>
                <span className="px-2 py-0.5 bg-green-500 text-white rounded-full text-xs font-bold">ACTIVE</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-orange-50 to-amber-100 rounded-lg border border-orange-200">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-amber-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">PL</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-xs">Personal Loan</p>
                  <p className="text-xs text-gray-600 truncate">Pre-approved: ₹10L</p>
                </div>
                <span className="px-2 py-0.5 bg-blue-500 text-white rounded-full text-xs font-bold">ELIGIBLE</span>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-cbi-blue" />
              Credit Portfolio
            </h2>
            
            <div className="space-y-4">
              {mockCreditProducts.map((product, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {product.type.includes('Wheeler') && <Bike className="w-5 h-5 text-orange-500" />}
                      {product.type.includes('Home') && <Home className="w-5 h-5 text-blue-500" />}
                      {product.type.includes('Personal') && <User className="w-5 h-5 text-purple-500" />}
                      <h3 className="font-semibold text-gray-900">{product.type}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.status === 'active' ? 'bg-green-100 text-green-700' : 
                      product.status === 'closed' ? 'bg-gray-100 text-gray-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {product.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Outstanding</p>
                      <p className="font-semibold text-gray-900">
                        {product.outstanding > 0 ? `₹${(product.outstanding / 1000).toFixed(0)}K` : '₹0'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">EMI</p>
                      <p className="font-semibold text-gray-900">
                        {product.emi > 0 ? `₹${product.emi.toLocaleString()}` : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Tenure</p>
                      <p className="font-semibold text-gray-900">{product.tenure}</p>
                    </div>
                    {product.status === 'closed' && (
                      <div>
                        <p className="text-gray-500">Closed</p>
                        <p className="font-semibold text-gray-900">Feb 2026</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {showOffers && (
              <div className="mt-4 space-y-3 animate-fadeIn">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-green-900">Pre-Approved Personal Loan</h4>
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">ACTIVE</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-green-700">Amount</p>
                      <p className="font-bold text-green-900">₹10,00,000</p>
                    </div>
                    <div>
                      <p className="text-green-700">Interest Rate</p>
                      <p className="font-bold text-green-900">10.5% p.a.</p>
                    </div>
                    <div>
                      <p className="text-green-700">Tenure</p>
                      <p className="font-bold text-green-900">36 months</p>
                    </div>
                    <div>
                      <p className="text-green-700">Processing Fee</p>
                      <p className="font-bold text-green-900">₹0 (Waived)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-blue-900">Home Improvement Loan</h4>
                    <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-bold">ELIGIBLE</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-blue-700">Amount</p>
                      <p className="font-bold text-blue-900">₹5,00,000</p>
                    </div>
                    <div>
                      <p className="text-blue-700">Interest Rate</p>
                      <p className="font-bold text-blue-900">9.8% p.a.</p>
                    </div>
                    <div>
                      <p className="text-blue-700">Tenure</p>
                      <p className="font-bold text-blue-900">24 months</p>
                    </div>
                    <div>
                      <p className="text-blue-700">Processing Fee</p>
                      <p className="font-bold text-blue-900">1% + GST</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button 
              onClick={handleViewOffers}
              className="w-full mt-4 bg-gradient-to-r from-cbi-blue to-blue-700 text-white py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transform transition-all duration-300 cursor-pointer"
            >
              {showOffers ? '← Hide Offers' : 'View His Offers →'}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cbi-red" />
              AI-Powered Insights
            </h2>
            
            <p className="text-sm text-gray-600 mb-4">
              AI Engine • CBI Gen/2025 • Real-time
            </p>

            <div className="space-y-3">
              {mockTriggers.map((trigger) => (
                <div key={trigger.id} className={`border-l-4 rounded-r-lg p-4 ${
                  trigger.urgency === 'high' ? 'border-red-500 bg-red-50' :
                  trigger.urgency === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                  'border-blue-500 bg-blue-50'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{trigger.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      trigger.urgency === 'high' ? 'bg-red-200 text-red-800' :
                      trigger.urgency === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-blue-200 text-blue-800'
                    }`}>
                      {trigger.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700">{trigger.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {trigger.timestamp.toLocaleDateString()} • {trigger.urgency.toUpperCase()} urgency
                  </p>
                </div>
              ))}
            </div>

            <button 
              onClick={handleBuildOffer}
              className="w-full mt-4 bg-gradient-to-r from-cbi-red to-red-700 text-white py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transform transition-all duration-300 cursor-pointer animate-pulse-slow"
            >
              Start Loan Application →
            </button>
          </div>
        </div>

        {/* New Comprehensive Sections */}
        <div className="grid lg:grid-cols-3 gap-5 mb-5 mt-6">
          {/* KYC & Validation */}
          <div className="bg-white rounded-xl shadow-sm p-5 card-hover border border-gray-200">
            <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-cbi-blue" />
              KYC & Validation
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">KYC Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  {customerExtended.kyc.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">CIF Number</span>
                <span className="font-semibold text-gray-900">{customerExtended.kyc.cif}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-semibold text-gray-900">{customerExtended.kyc.lastUpdated}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Risk Category</span>
                <span className="font-semibold text-green-600">{customerExtended.riskProfile.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment History</span>
                <span className="font-semibold text-gray-900">{customerExtended.riskProfile.paymentHistory}</span>
              </div>
            </div>
          </div>

          {/* Interaction History */}
          <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-500" />
              Interaction History
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">CC Calls</p>
                  <p className="text-xs text-gray-600">{customerExtended.interactions.ccCalls} total • Last: {customerExtended.interactions.lastCall}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Mail className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Emails</p>
                  <p className="text-xs text-gray-600">{customerExtended.interactions.emails} communications</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Chats</p>
                  <p className="text-xs text-gray-600">{customerExtended.interactions.chats} sessions</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Last App Login</p>
                  <p className="text-xs text-gray-600">{customerExtended.interactions.lastAppLogin} • {customerExtended.interactions.appUsageFrequency}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences & Behavior */}
          <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-orange-500" />
              Preferences & Behavior
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Preferred Channel</span>
                <span className="font-semibold text-green-600">{customerExtended.preferences.contactChannel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contact Time</span>
                <span className="font-semibold text-gray-900">{customerExtended.preferences.contactTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Language</span>
                <span className="font-semibold text-gray-900">{customerExtended.preferences.language}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Digital Preference</span>
                <span className="font-semibold text-cbi-blue">{customerExtended.preferences.digitalPreference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Persona</span>
                <span className="font-semibold text-purple-600">{customerExtended.persona}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6 animate-fadeIn">
          {/* Linked Accounts */}
          <div className="bg-white rounded-2xl shadow-lg p-6 card-hover border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" />
              Linked Accounts
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Co-Borrowers</p>
                {customerExtended.linkedAccounts.coBorrowers.map((borrower, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-indigo-50 rounded-lg">
                    <User className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm text-gray-900">{borrower}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Deposits</p>
                <div className="space-y-2">
                  {customerExtended.linkedAccounts.deposits.map((deposit, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                      <CreditCard className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-900">{deposit}</span>
                    </div>
                  ))}
                </div>
              </div>
              {customerExtended.linkedAccounts.otherLoans.length === 0 && (
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">No other active loans</p>
                </div>
              )}
            </div>
          </div>

          {/* Alerts, Flags & Risk Indicators */}
          <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              Alerts, Flags & Risk Indicators
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">{customerExtended.alerts.bureauTriggers}</p>
                  <p className="text-xs text-gray-600 mt-1">Bureau Triggers</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">{customerExtended.alerts.dpd}</p>
                  <p className="text-xs text-gray-600 mt-1">DPD (Days Past Due)</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">{customerExtended.alerts.emiBounceLast12Mo}</p>
                  <p className="text-xs text-gray-600 mt-1">EMI Bounce (12mo)</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">{customerExtended.alerts.ewsFlags.length}</p>
                  <p className="text-xs text-gray-600 mt-1">EWS Flags</p>
                </div>
              </div>
              <div className="p-4 bg-green-100 border-2 border-green-500 rounded-lg flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-bold text-green-900">Excellent Standing</p>
                  <p className="text-xs text-green-700">No delinquency • Zero defaults • 100% on-time payments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
            </div>
          )}

          {/* Offers & Products Tab */}
          {activeTab === 'offers' && (
            <div className="animate-fadeIn space-y-6 max-w-6xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Pre-Approved Offers & Products</h2>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-300 rounded-2xl p-6 card-hover">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-green-900">Personal Loan</h3>
                    <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold">PRE-APPROVED</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-green-700 text-sm">Amount</p>
                      <p className="text-2xl font-bold text-green-900">₹10,00,000</p>
                    </div>
                    <div>
                      <p className="text-green-700 text-sm">Interest Rate</p>
                      <p className="text-2xl font-bold text-green-900">10.5% p.a.</p>
                    </div>
                    <div>
                      <p className="text-green-700 text-sm">Tenure</p>
                      <p className="text-xl font-bold text-green-900">36 months</p>
                    </div>
                    <div>
                      <p className="text-green-700 text-sm">Processing Fee</p>
                      <p className="text-xl font-bold text-green-900">₹0 (Waived)</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/mobile')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all"
                  >
                    Apply Now →
                  </button>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-300 rounded-2xl p-6 card-hover">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-blue-900">Home Improvement Loan</h3>
                    <span className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-bold">ELIGIBLE</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-blue-700 text-sm">Amount</p>
                      <p className="text-2xl font-bold text-blue-900">₹5,00,000</p>
                    </div>
                    <div>
                      <p className="text-blue-700 text-sm">Interest Rate</p>
                      <p className="text-2xl font-bold text-blue-900">9.8% p.a.</p>
                    </div>
                    <div>
                      <p className="text-blue-700 text-sm">Tenure</p>
                      <p className="text-xl font-bold text-blue-900">24 months</p>
                    </div>
                    <div>
                      <p className="text-blue-700 text-sm">Processing Fee</p>
                      <p className="text-xl font-bold text-blue-900">1% + GST</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      alert('Eligibility Check: Customer is eligible for ₹5L Home Improvement Loan at 9.8% p.a.');
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all cursor-pointer"
                  >
                    Check Eligibility →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* AI Insights Tab */}
          {activeTab === 'insights' && (
            <div className="animate-fadeIn space-y-6 max-w-6xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">AI-Powered Customer Insights</h2>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {mockTriggers.map((trigger) => (
                  <div key={trigger.id} className={`border-l-4 rounded-r-2xl p-6 card-hover ${
                    trigger.urgency === 'high' ? 'border-red-500 bg-red-50' :
                    trigger.urgency === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                    'border-blue-500 bg-blue-50'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-gray-900 text-lg">{trigger.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        trigger.urgency === 'high' ? 'bg-red-200 text-red-800' :
                        trigger.urgency === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-blue-200 text-blue-800'
                      }`}>
                        {trigger.type}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{trigger.description}</p>
                    <p className="text-gray-500 text-sm">
                      {trigger.timestamp.toLocaleDateString()} • {trigger.urgency.toUpperCase()} urgency
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
