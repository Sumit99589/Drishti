"use client"
import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Phone, 
  Mail, 
  Building, 
  Clock,
  Brain,
  Radar,
  Send,
  Eye,
  Sparkles,
  Activity
} from 'lucide-react';

const AIEyeRequestModal = ({ isOpen, onClose, patientData }: { isOpen: boolean; onClose: () => void; patientData: any }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  interface Location {
    lat: number;
    lng: number;
    city: string;
  }

  interface EyeBank {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    distance: string;
    rating: number;
    availability: string;
    specialization: string;
  }

  interface EmailStatus extends EyeBank {
    sentAt: string;
    status: 'sent' | 'failed';
  }

  const [location, setLocation] = useState<Location | null>(null);
  const [nearbyEyeBanks, setNearbyEyeBanks] = useState<EyeBank[]>([]);
  const [aiStatus, setAiStatus] = useState('');
  const [emailsSent, setEmailsSent] = useState<EmailStatus[]>([]);
  const [progress, setProgress] = useState(0);

  const steps = [
    { id: 'location', title: 'Getting Location', icon: MapPin },
    { id: 'analysis', title: 'AI Analysis', icon: Brain },
    { id: 'search', title: 'Finding Eye Banks', icon: Radar },
    { id: 'email', title: 'Sending Requests', icon: Send },
    { id: 'complete', title: 'Complete', icon: CheckCircle }
  ];

  // Mock eye banks data
  const mockEyeBanks = [
    {
      id: 1,
      name: "AIIMS Eye Bank",
      address: "All India Institute of Medical Sciences, Ansari Nagar, New Delhi",
      phone: "+91-11-26588700",
      email: "eyebank@aiims.edu",
      distance: "2.3 km",
      rating: 4.8,
      availability: "24/7",
      specialization: "Corneal Transplant"
    },
    {
      id: 2,
      name: "Dr. Shroff's Charity Eye Hospital",
      address: "5027, Kedar Nath Road, Daryaganj, New Delhi",
      phone: "+91-11-43524500",
      email: "eyebank@sceh.net",
      distance: "3.7 km",
      rating: 4.9,
      availability: "24/7",
      specialization: "Comprehensive Eye Care"
    },
    {
      id: 3,
      name: "Centre for Sight Eye Bank",
      address: "B-5/24, Safdarjung Enclave, New Delhi",
      phone: "+91-11-29254225",
      email: "eyebank@centreforsight.net",
      distance: "4.2 km",
      rating: 4.7,
      availability: "Emergency Only",
      specialization: "Retinal Surgery"
    },
    {
      id: 4,
      name: "National Eye Bank",
      address: "Maulana Azad Medical College, New Delhi",
      phone: "+91-11-23239271",
      email: "info@nationaleyebank.org",
      distance: "5.1 km",
      rating: 4.6,
      availability: "24/7",
      specialization: "Corneal Banking"
    }
  ];

  const simulateAIProcess = async () => {
    setIsProcessing(true);
    setProgress(0);

    // Step 1: Get Location
    setCurrentStep(0);
    setAiStatus('Accessing GPS location...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLocation({ lat: 28.6139, lng: 77.2090, city: 'New Delhi' });
    setAiStatus('Location acquired: New Delhi, India');
    setProgress(20);

    // Step 2: AI Analysis
    setCurrentStep(1);
    setAiStatus('AI analyzing patient requirements...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAiStatus('Processing medical urgency and compatibility factors...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setProgress(40);

    // Step 3: Search Eye Banks
    setCurrentStep(2);
    setAiStatus('Scanning NPCB and EBAI directories...');
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    setAiStatus('Found 4 nearby eye banks. Analyzing availability...');
    setNearbyEyeBanks(mockEyeBanks);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProgress(60);

    // Step 4: Send Emails
    setCurrentStep(3);
    const sentEmails = [];
    
    for (let i = 0; i < mockEyeBanks.length; i++) {
      const bank = mockEyeBanks[i];
      setAiStatus(`Composing personalized request for ${bank.name}...`);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setAiStatus(`Sending email to ${bank.email}...`);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      sentEmails.push({
        ...bank,
        sentAt: new Date().toLocaleTimeString(),
        status: (Math.random() > 0.1 ? 'sent' : 'failed') as 'sent' | 'failed'
      });
      setEmailsSent([...sentEmails]);
      setProgress(60 + (i + 1) * 8);
    }

    // Step 5: Complete
    setCurrentStep(4);
    setAiStatus('All requests sent successfully! Monitoring responses...');
    setProgress(100);
    setIsProcessing(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isOpen && !isProcessing && currentStep === 0) {
      simulateAIProcess();
    }
  }, [isOpen]);

  const resetModal = () => {
    setCurrentStep(0);
    setIsProcessing(false);
    setLocation(null);
    setNearbyEyeBanks([]);
    setAiStatus('');
    setEmailsSent([]);
    setProgress(0);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 m-4 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200/50 shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-rose-500 rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="absolute inset-0 bg-orange-400 blur-xl opacity-30 animate-pulse" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                AI Eye Request Agent
              </h2>
              <p className="text-gray-600">Intelligent matching and automated outreach</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-orange-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-rose-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mb-8 overflow-x-auto">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep || (currentStep === 4 && !isProcessing);
            
            return (
              <div key={step.id} className="flex flex-col items-center min-w-0 flex-1">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                  ${isCompleted 
                    ? 'bg-gradient-to-br from-emerald-500 to-green-500 text-white' 
                    : isActive 
                      ? 'bg-gradient-to-br from-orange-500 to-rose-500 text-white animate-pulse' 
                      : 'bg-gray-200 text-gray-400'
                  }
                `}>
                  {isCompleted && index !== 4 ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <StepIcon className={`h-5 w-5 ${isActive ? 'animate-bounce' : ''}`} />
                  )}
                </div>
                <span className={`text-xs text-center ${isActive ? 'text-orange-600 font-semibold' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* AI Status */}
        <div className="bg-gradient-to-r from-orange-50 to-rose-50 rounded-2xl p-6 mb-6 border border-orange-100">
          <div className="flex items-center space-x-3">
            {isProcessing ? (
              <Loader2 className="h-5 w-5 text-orange-500 animate-spin" />
            ) : (
              <Sparkles className="h-5 w-5 text-orange-500" />
            )}
            <div>
              <div className="text-sm text-gray-500 mb-1">AI Agent Status</div>
              <div className="text-gray-800 font-medium">{aiStatus || 'Initializing AI Agent...'}</div>
            </div>
          </div>
        </div>

        {/* Location Info */}
        {location && (
          <div className="bg-white/60 rounded-2xl p-6 mb-6 border border-gray-200/50">
            <div className="flex items-center space-x-3 mb-2">
              <MapPin className="h-5 w-5 text-emerald-500" />
              <span className="font-semibold text-gray-800">Location Detected</span>
            </div>
            <p className="text-gray-600">{location.city}, India</p>
            <p className="text-sm text-gray-500">Coordinates: {location.lat}, {location.lng}</p>
          </div>
        )}

        {/* Eye Banks Found */}
        {nearbyEyeBanks.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <Building className="h-5 w-5 mr-2 text-orange-500" />
              Nearby Eye Banks Found ({nearbyEyeBanks.length})
            </h3>
            <div className="grid gap-4 max-h-80 overflow-y-auto">
              {nearbyEyeBanks.map((bank) => (
                <div 
                  key={bank.id}
                  className="bg-white/60 rounded-xl p-4 border border-gray-200/50 hover:border-orange-200 transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{bank.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{bank.address}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center text-emerald-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {bank.distance}
                        </span>
                        <span className="flex items-center text-amber-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {bank.availability}
                        </span>
                        <span className="text-orange-600">★ {bank.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {bank.phone}
                      </span>
                      <span className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {bank.email}
                      </span>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      {bank.specialization}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Email Status */}
        {emailsSent.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <Send className="h-5 w-5 mr-2 text-rose-500" />
              Email Requests Status
            </h3>
            <div className="space-y-3">
              {emailsSent.map((email) => (
                <div 
                  key={email.id}
                  className="flex items-center justify-between bg-white/60 rounded-xl p-4 border border-gray-200/50"
                >
                  <div className="flex items-center space-x-3">
                    {email.status === 'sent' ? (
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <div className="font-medium text-gray-800">{email.name}</div>
                      <div className="text-sm text-gray-600">{email.email}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      email.status === 'sent' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {email.status === 'sent' ? 'Sent Successfully' : 'Failed'}
                    </div>
                    <div className="text-xs text-gray-500">{email.sentAt}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success Summary */}
        {currentStep === 4 && !isProcessing && (
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Request Processing Complete!
                </h3>
                <p className="text-gray-700 mb-4">
                  Your eye request has been sent to {emailsSent.filter(e => e.status === 'sent').length} nearby eye banks. 
                  Our AI will monitor responses and notify you of any matches.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 bg-white/60 rounded-full text-sm font-medium text-gray-700">
                    <Activity className="h-4 w-4 mr-1 text-emerald-500" />
                    Real-time monitoring active
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-white/60 rounded-full text-sm font-medium text-gray-700">
                    <Eye className="h-4 w-4 mr-1 text-orange-500" />
                    Compatibility analysis ongoing
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          {currentStep === 4 && !isProcessing ? (
            <>
              <button 
                onClick={resetModal}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                Send Another Request
              </button>
              <button 
                onClick={handleClose}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
              >
                Done
              </button>
            </>
          ) : (
            <button 
              onClick={handleClose}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Demo component to test the modal
const AIEyeRequestDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock patient data - you would pass real data from your form
  const mockPatientData = {
    name: "John Doe",
    age: 45,
    condition: "Corneal opacity",
    urgency: "High",
    bloodType: "O+",
    location: "New Delhi"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
          AI Eye Request System Demo
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Click the button below to see the AI-powered eye request system in action. 
          It will simulate finding nearby eye banks and sending automated requests.
        </p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300 transform hover:scale-105"
        >
          Launch AI Eye Request
        </button>
      </div>

      <AIEyeRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        patientData={mockPatientData}
      />
    </div>
  );
};

export default AIEyeRequestDemo;