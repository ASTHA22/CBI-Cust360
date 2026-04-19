import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Activity, Zap, MessageSquare, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import CBILogo from '../components/CBILogo';

interface LogEntry {
  id: string;
  timestamp: Date;
  event: string;
  status: 'success' | 'error' | 'warning' | 'info';
  channel?: string;
  details: string;
}

export default function ProcessingConsole() {
  const { currentScreen, progress } = useSimulation();
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: new Date(),
      event: 'Backend Processing Console',
      status: 'success',
      details: 'LIVE'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 1000),
      event: 'OTP Triggered — Identity Verification',
      status: 'warning',
      details: 'SMS + WhatsApp OTP sent to +91 98004 XX789'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 5000),
      event: 'Mitra Routing to AI Specialist — Priya',
      status: 'info',
      channel: 'AI',
      details: 'Customer asked for tenure recommendation. RULE-CHAT-001: advisory_question_detected. Personalized advisory → beyond bot scope. Priya → AI Loan Specialist'
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 8000),
      event: 'Key Fact Statement Generated & Shown',
      status: 'success',
      channel: 'KFS',
      details: '₹5L loan. 36 months. 10.5% p.a. ₹16,251 EMI. Processing fee waived. NRTC v2.1 applied. RBI FLDG compliant ✓'
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 12000),
      event: 'Re-engagement WhatsApp Dispatched',
      status: 'success',
      channel: 'WA',
      details: 'CBI_Reengagement_Callback. 30.5% → 6 Sec → 2K cashback. 12 hours from dispatch. Delivered ✓'
    },
    {
      id: '6',
      timestamp: new Date(Date.now() - 15000),
      event: 'Re-engagement Engine Triggered by Mitra',
      status: 'info',
      channel: 'RE',
      details: 'Drop-off → High-intent customer. Cashback incentive unlocked. 2,000 cashback on first EMI. 12-hour time limit applied. WhatsApp → Personalized message'
    },
    {
      id: '7',
      timestamp: new Date(Date.now() - 20000),
      event: 'Drop-off Detected — No Response from Customer',
      status: 'warning',
      details: 'Last action: Idle time. Stage reached: Customer profile. Offer presented → Not claimed'
    },
    {
      id: '8',
      timestamp: new Date(Date.now() - 25000),
      event: 'WhatsApp Message Dispatched via CleverTap',
      status: 'success',
      channel: 'WA',
      details: 'CTA_Clicked → apply_now. http://cbi/apply?intent=HL-18-5Lact. Mitra profile fetch initiated'
    },
    {
      id: '9',
      timestamp: new Date(Date.now() - 30000),
      event: 'CTA Tapped — CBI Mobile App Deep Link Opened',
      status: 'info',
      details: 'Event: Deep link. Pre-fill trigger. Funnel step: CTA_Clicked'
    }
  ]);

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date(),
        event: 'Customer profile',
        status: 'info',
        details: 'Profile data refreshed'
      };
      setLogs(prev => [newLog, ...prev].slice(0, 20));
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="inline-flex items-center text-cbi-blue hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <CBILogo className="w-10 h-10" />
            <div>
              <p className="text-sm font-bold text-gray-900">Central Bank of India</p>
              <p className="text-xs text-gray-500">Processing Console</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8" />
                <div>
                  <h1 className="text-2xl font-bold">Backend Processing Console</h1>
                  <p className="text-green-100 text-sm">Real-time Event Monitoring</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span className="text-sm font-semibold">{isLive ? 'LIVE' : 'PAUSED'}</span>
                </div>
                <button
                  onClick={() => setIsLive(!isLive)}
                  className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm font-semibold"
                >
                  {isLive ? 'Pause' : 'Resume'}
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-600">Data</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">Live</p>
                <p className="text-xs text-gray-500">Real-time processing</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Analytics & Offer</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">Active</p>
                <p className="text-xs text-gray-500">Triggers enabled</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">Customer Engagement</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">Optimal</p>
                <p className="text-xs text-gray-500">Multi-channel</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-gray-600">Application Funnel</span>
                </div>
                <div className="space-y-2 mt-3">
                  {/* OTP Step */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        currentScreen === 'otp' ? 'bg-blue-500 animate-pulse' :
                        ['review', 'chat', 'processing', 'success'].includes(currentScreen) ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {['review', 'chat', 'processing', 'success'].includes(currentScreen) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className={`font-medium ${
                        currentScreen === 'otp' ? 'text-gray-900 font-bold' :
                        ['review', 'chat', 'processing', 'success'].includes(currentScreen) ? 'text-gray-700' : 'text-gray-400'
                      }`}>OTP Verified</span>
                    </div>
                    <span className="text-xs text-green-600">
                      {['review', 'chat', 'processing', 'success'].includes(currentScreen) ? '✓' : 
                       currentScreen === 'otp' ? '●' : '○'}
                    </span>
                  </div>

                  {/* Review Step */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        currentScreen === 'review' ? 'bg-blue-500 animate-pulse' :
                        ['chat', 'processing', 'success'].includes(currentScreen) ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {['chat', 'processing', 'success'].includes(currentScreen) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className={`font-medium ${
                        currentScreen === 'review' ? 'text-gray-900 font-bold' :
                        ['chat', 'processing', 'success'].includes(currentScreen) ? 'text-gray-700' : 'text-gray-400'
                      }`}>KFS Reviewed</span>
                    </div>
                    <span className="text-xs">
                      {['chat', 'processing', 'success'].includes(currentScreen) ? '✓' : 
                       currentScreen === 'review' ? '●' : '○'}
                    </span>
                  </div>

                  {/* Chat Step */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        currentScreen === 'chat' ? 'bg-blue-500 animate-pulse' :
                        ['processing', 'success'].includes(currentScreen) ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {['processing', 'success'].includes(currentScreen) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className={`font-medium ${
                        currentScreen === 'chat' ? 'text-gray-900 font-bold' :
                        ['processing', 'success'].includes(currentScreen) ? 'text-gray-700' : 'text-gray-400'
                      }`}>Mitra Chat</span>
                    </div>
                    <span className="text-xs">
                      {['processing', 'success'].includes(currentScreen) ? '✓' : 
                       currentScreen === 'chat' ? '●' : '○'}
                    </span>
                  </div>

                  {/* Processing Step */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        currentScreen === 'processing' ? 'bg-blue-500 animate-pulse' :
                        currentScreen === 'success' ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {currentScreen === 'success' && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className={`font-medium ${
                        currentScreen === 'processing' ? 'text-gray-900 font-bold' :
                        currentScreen === 'success' ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        Processing {currentScreen === 'processing' && `${progress}%`}
                      </span>
                    </div>
                    <span className="text-xs text-blue-600">
                      {currentScreen === 'success' ? '✓' : 
                       currentScreen === 'processing' ? '●' : '○'}
                    </span>
                  </div>

                  {/* Success Step */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        currentScreen === 'success' ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {currentScreen === 'success' && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className={`font-medium ${
                        currentScreen === 'success' ? 'text-green-700 font-bold' : 'text-gray-400'
                      }`}>Approved</span>
                    </div>
                    <span className="text-xs text-green-600">
                      {currentScreen === 'success' ? '✓' : '○'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Processing Log
              </h2>
              
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className={`border rounded-lg p-4 ${getStatusColor(log.status)}`}
                  >
                    <div className="flex items-start gap-3">
                      {getStatusIcon(log.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900">{log.event}</h3>
                          {log.channel && (
                            <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-semibold">
                              {log.channel}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{log.details}</p>
                        <p className="text-xs text-gray-500">
                          {log.timestamp.toLocaleTimeString()} • {log.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-3">Rule Engine Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">RULE-RET-001: High-value churn prevention</span>
                    <span className="text-green-400">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">RULE-CHAT-001: advisory_question_detected</span>
                    <span className="text-green-400">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">NRTC v2.1 applied</span>
                    <span className="text-green-400">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">RBI FLDG compliant</span>
                    <span className="text-green-400">✓</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-3">Channel Orchestration</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">WhatsApp</span>
                    <span className="text-green-400 font-semibold">Delivered ✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">SMS</span>
                    <span className="text-green-400 font-semibold">Sent</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Push Notification</span>
                    <span className="text-blue-400 font-semibold">Pending</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Email</span>
                    <span className="text-gray-500 font-semibold">Queued</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
