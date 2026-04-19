import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Bot, Send, Activity } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import CBILogo from '../components/CBILogo';

type Screen = 'otp' | 'review' | 'chat' | 'processing' | 'success';

interface ChatMessage {
  sender: 'mitra' | 'user';
  text: string;
}

export default function MobileLoanFlow() {
  const { setCurrentScreen: setGlobalScreen, setProgress: setGlobalProgress } = useSimulation();
  const [currentScreen, setCurrentScreen] = useState<Screen>('otp');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [progress, setProgress] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: 'mitra', text: 'Hi Rohan! 👋 I see you\'re applying for a ₹5L personal loan. Let me help you with that!' }
  ]);

  // Sync with global context
  useEffect(() => {
    setGlobalScreen(currentScreen);
  }, [currentScreen, setGlobalScreen]);

  useEffect(() => {
    setGlobalProgress(progress);
  }, [progress, setGlobalProgress]);

  // Auto-simulation
  useEffect(() => {
    if (currentScreen === 'otp') {
      const timer = setTimeout(() => {
        setOtp(['1', '2', '3', '4', '5', '6']);
        setTimeout(() => setCurrentScreen('review'), 1500);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  useEffect(() => {
    if (currentScreen === 'review') {
      const timer = setTimeout(() => setCurrentScreen('chat'), 6000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  useEffect(() => {
    if (currentScreen === 'chat') {
      const timer1 = setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'user', text: 'Yes, please proceed with the loan' }]);
      }, 2000);
      const timer2 = setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'mitra', text: 'Perfect! Your application looks great. Processing your loan now...' }]);
      }, 3500);
      const timer3 = setTimeout(() => setCurrentScreen('processing'), 5000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [currentScreen]);

  useEffect(() => {
    if (currentScreen === 'processing') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setCurrentScreen('success'), 800);
            return 100;
          }
          return prev + 10;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Link to="/" className="text-cbi-blue hover:underline text-sm flex items-center gap-1 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="flex gap-6 max-w-7xl mx-auto">
        {/* LEFT: Mobile Phone */}
        <div className="w-96 flex-shrink-0">
          <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
            <div className="bg-white rounded-[2.5rem] overflow-hidden" style={{ height: '700px' }}>
              <div className="h-full flex flex-col">
                {/* OTP Screen */}
                {currentScreen === 'otp' && (
                  <div className="h-full flex flex-col bg-white p-8">
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <CBILogo className="w-10 h-10" />
                        <p className="text-sm font-semibold text-gray-600">CBI MOBILE</p>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your identity</h2>
                    <p className="text-gray-600 mb-8">
                      We sent a 6-digit OTP to your registered mobile<br />
                      <span className="font-semibold">+91 98004 XX789</span>
                    </p>

                    <div className="flex gap-3 justify-center mb-8">
                      {otp.map((digit, index) => (
                        <div
                          key={index}
                          className="w-12 h-14 flex items-center justify-center text-2xl font-bold border-2 border-cbi-blue rounded-lg bg-blue-50"
                        >
                          {digit}
                        </div>
                      ))}
                    </div>

                    <p className="text-sm text-gray-500 text-center mb-4">
                      Did not receive? <span className="text-cbi-blue font-semibold cursor-pointer">Resend OTP</span>
                    </p>

                    <button className="w-full bg-cbi-blue text-white py-3 rounded-lg font-semibold">
                      Confirm and Submit
                    </button>

                    <button className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold">
                      Back
                    </button>
                  </div>
                )}

                {/* Review Screen */}
                {currentScreen === 'review' && (
                  <div className="h-full flex flex-col bg-white overflow-y-auto p-6">
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <CBILogo className="w-8 h-8" />
                      <p className="text-sm font-semibold text-gray-600">CBI MOBILE</p>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-4">Loan Details</h2>

                    <div className="bg-gradient-to-r from-cbi-blue to-blue-700 text-white rounded-xl p-6 mb-4">
                      <p className="text-sm opacity-90 mb-1">Loan Amount</p>
                      <p className="text-3xl font-bold">₹5,00,000</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tenure</span>
                        <span className="font-semibold">36 months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest rate</span>
                        <span className="font-semibold">10.5% p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly EMI</span>
                        <span className="font-semibold text-lg">₹16,251</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Processing fee</span>
                        <span className="font-semibold text-green-600">₹0 (Waived)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Chat Screen */}
                {currentScreen === 'chat' && (
                  <div className="h-full flex flex-col bg-white">
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-center gap-2">
                        <CBILogo className="w-8 h-8" />
                        <p className="text-sm font-semibold text-gray-600">CBI MOBILE</p>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      <div className="flex items-center justify-center mb-4">
                        <div className="bg-cbi-blue/10 px-4 py-2 rounded-full flex items-center gap-2">
                          <Bot className="w-4 h-4 text-cbi-blue" />
                          <span className="text-sm font-semibold text-cbi-blue">Mitra AI</span>
                        </div>
                      </div>

                      {chatMessages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            msg.sender === 'user' ? 'bg-cbi-blue text-white' : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border-t">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-3">
                        <input 
                          type="text" 
                          placeholder="Type a message..."
                          className="flex-1 bg-transparent outline-none text-sm"
                          disabled
                        />
                        <Send className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Processing Screen */}
                {currentScreen === 'processing' && (
                  <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-8">
                    <div className="w-24 h-24 border-4 border-cbi-blue border-t-transparent rounded-full animate-spin mb-6"></div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">Processing your application</h2>
                    <p className="text-gray-600 text-center mb-6">
                      Verifying your details and preparing your loan
                    </p>
                    
                    <div className="w-full max-w-xs">
                      <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-cbi-blue to-cbi-red h-full transition-all duration-300 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-center text-sm text-gray-600 mt-2">{progress}%</p>
                    </div>
                  </div>
                )}

                {/* Success Screen */}
                {currentScreen === 'success' && (
                  <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-8">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-16 h-16 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-gray-900">Success!</h2>
                    <p className="text-gray-600 text-center mb-8">
                      Your loan application has been submitted
                    </p>
                    
                    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200 w-full">
                      <h3 className="font-semibold text-gray-900 mb-3">Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount</span>
                          <span className="font-semibold">₹5,00,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">EMI</span>
                          <span className="font-semibold">₹16,251/mo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Backend Processing Console */}
        <div className="flex-1 bg-white rounded-xl shadow-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              Backend Processing Console
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded ml-2">● LIVE</span>
            </h3>
          </div>

          <div className="space-y-3 max-h-[650px] overflow-y-auto">
            {/* OTP Event */}
            {['otp', 'review', 'chat', 'processing', 'success'].includes(currentScreen) && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-700 font-bold text-xs">OTP</span>
                  <span className="text-gray-900 font-semibold text-sm">OTP Triggered — Identity Verification</span>
                </div>
                <p className="text-gray-700 text-xs">
                  SMS + WhatsApp OTP sent to +91 98004 XX789
                </p>
                <p className="text-gray-500 text-xs mt-1">Method: Sent to • Entity: OTP provider</p>
              </div>
            )}

            {/* KFS Event */}
            {['review', 'chat', 'processing', 'success'].includes(currentScreen) && (
              <div className="bg-blue-50 border-l-4 border-cbi-blue rounded-r-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-cbi-blue font-bold text-xs">KFS</span>
                  <span className="text-gray-900 font-semibold text-sm">Key Fact Statement Generated & Shown</span>
                </div>
                <p className="text-gray-700 text-xs">
                  ₹5L loan. 36 months. 10.5% p.a. ₹16,251 EMI. Processing fee waived.
                </p>
                <p className="text-gray-500 text-xs mt-1">NRTC v2.1 applied • RBI FLDG compliant ✓</p>
              </div>
            )}

            {/* AI Routing Event */}
            {['chat', 'processing', 'success'].includes(currentScreen) && (
              <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-purple-700 font-bold text-xs">AI</span>
                  <span className="text-gray-900 font-semibold text-sm">Mitra Routing to AI Specialist</span>
                </div>
                <p className="text-gray-700 text-xs">
                  Customer asked for tenure recommendation. RULE-CHAT-001: advisory_question_detected.
                </p>
                <p className="text-green-600 text-xs mt-1">Personalized advisory → beyond bot scope ✓</p>
              </div>
            )}

            {/* Processing Event */}
            {['processing', 'success'].includes(currentScreen) && (
              <div className="bg-blue-50 border-l-4 border-cbi-blue rounded-r-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-cbi-blue font-bold text-xs">Processing</span>
                  <span className="text-gray-900 font-semibold text-sm">Processing Log</span>
                </div>
                <p className="text-gray-700 text-xs mb-2">
                  Verifying customer details and preparing loan application
                </p>
                {currentScreen === 'processing' && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-cbi-blue h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-cbi-blue text-xs mt-1">{progress}% complete</p>
                  </div>
                )}
              </div>
            )}

            {/* Success Event */}
            {currentScreen === 'success' && (
              <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-700 font-bold text-xs">SUCCESS</span>
                  <span className="text-gray-900 font-semibold text-sm">Application Approved</span>
                </div>
                <p className="text-gray-700 text-xs">
                  Loan application successfully submitted. Customer will be notified within 24 hours.
                </p>
                <p className="text-green-600 text-xs mt-1">Status: APPROVED ✓</p>
              </div>
            )}

            {/* Additional Events */}
            <div className="bg-gray-50 border-l-4 border-gray-400 rounded-r-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-600 font-bold text-xs">Data</span>
                <span className="text-gray-900 font-semibold text-sm">Customer data passed</span>
              </div>
              <p className="text-gray-700 text-xs">
                FOIR headroom: 35 p.p. Elev<br />
                RoC: 0 defaults
              </p>
            </div>

            <div className="bg-gray-50 border-l-4 border-gray-400 rounded-r-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-600 font-bold text-xs">Trigger</span>
                <span className="text-gray-900 font-semibold text-sm">Routing rule</span>
              </div>
              <p className="text-gray-700 text-xs">
                Rationale: Customer asked for tenure recommendation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
