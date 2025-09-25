'use client';

import { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, Shield, Clock, Activity, 
  CheckCircle, AlertCircle, Hospital, Heart, Eye,
  ChevronDown, ChevronUp, Target, Sparkles
} from 'lucide-react';
import AIEyeRequestDemo from '@/components/aimodal';

const RequestEyesPage = () => {
  const [currentStep, setCurrentStep] = useState('form');
  const [isVisible, setIsVisible] = useState({}); // used for animation
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedStep, setExpandedStep] = useState(null);
  const [formData, setFormData] = useState({
    // Patient Information
    patientName: '',
    patientAge: '',
    patientGender: '',
    aadhaarNumber: '',
    medicalRecordNumber: '',
    
    // Contact Information
    contactName: '',
    relationToPatient: '',
    contactNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Medical Details
    reasonForRequest: '',
    doctorReference: '',
    hospitalReference: '',
    urgencyLevel: '',
    medicalReports: '',
    
    // Logistics
    preferredHospital: '',
    consentToShare: false,
    additionalNotes: ''
  });

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentStep]);

  const processSteps = [
    {
      id: 1,
      icon: Shield,
      title: "Verification Process",
      shortDesc: "Your request is securely processed",
      fullDesc: "Your details will be securely shared with the nearest registered Eye Bank/Hospital. Our medical coordinators will contact you within 24-48 hours to verify the information and guide you through the next steps.",
      timeline: "24-48 hours",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      icon: Activity,
      title: "Medical Review",
      shortDesc: "Expert medical assessment",
      fullDesc: "A qualified ophthalmologist will review the patient's condition to confirm eligibility for corneal transplant. You may be asked to provide additional medical reports or attend a consultation for detailed assessment.",
      timeline: "3-5 days",
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: 3,
      icon: Target,
      title: "Matching & Allocation",
      shortDesc: "Finding the perfect match",
      fullDesc: "Our advanced matching system will search for compatible corneal donors based on medical criteria, blood type, and availability. Priority is given based on medical urgency and waiting list position.",
      timeline: "Varies by availability",
      color: "from-purple-500 to-violet-600"
    },
    {
      id: 4,
      icon: Phone,
      title: "Coordination & Preparation",
      shortDesc: "Getting ready for surgery",
      fullDesc: "Once a match is found, our team will coordinate with you for surgery scheduling. Keep medical records ready and stay available for communication regarding admission and pre-surgery preparations.",
      timeline: "24-72 hours",
      color: "from-orange-500 to-amber-600"
    },
    {
      id: 5,
      icon: Sparkles,
      title: "Important Guidelines",
      shortDesc: "Understanding the process",
      fullDesc: "This submission doesn't guarantee immediate availability. All allocations follow strict government and eye bank guidelines. We ensure fair and transparent distribution based on medical need and waiting order.",
      timeline: "Ongoing",
      color: "from-rose-500 to-pink-600"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setCurrentStep('success');
    }
  };

  const isFormValid = () => {
    const required = [
      'patientName', 'patientAge', 'patientGender', 'contactName', 
      'relationToPatient', 'contactNumber', 'email', 'city', 'state', 
      'pincode', 'reasonForRequest', 'urgencyLevel'
    ];
    return required.every(field => formData[field]) && formData.consentToShare;
  };

  const [showAIModal, setShowAIModal] = useState(false);
  const [patientData, setPatientData] = useState({});

  if (currentStep === 'success') {
    setPatientData(formData);
    setShowAIModal(true);
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 text-gray-800 overflow-x-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 via-transparent to-rose-100/30" />
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
            }}
          />
        </div>

        {/* Success Header */}
        <div className="relative z-10 pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mb-6 shadow-2xl shadow-emerald-500/30">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Request Submitted!
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Thank you for submitting your request for <strong>{formData.patientName}</strong>. Your request has been received and will be processed with the highest priority.
              </p>
            </div>

            {/* Request Summary */}
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-lg mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Request Summary</h2>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Patient Details</h3>
                  <p className="text-gray-600">{formData.patientName}, {formData.patientAge} years</p>
                  <p className="text-gray-600">{formData.reasonForRequest}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Urgency Level</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    formData.urgencyLevel === 'immediate' ? 'bg-red-100 text-red-700' :
                    formData.urgencyLevel === 'within1week' ? 'bg-orange-100 text-orange-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {formData.urgencyLevel === 'immediate' ? 'Immediate' :
                     formData.urgencyLevel === 'within1week' ? 'Within 1 Week' : 'Not Urgent'}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Contact Person</h3>
                  <p className="text-gray-600">{formData.contactName}</p>
                  <p className="text-gray-600">{formData.contactNumber}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Location</h3>
                  <p className="text-gray-600">{formData.city}, {formData.state}</p>
                  <p className="text-gray-600">{formData.pincode}</p>
                </div>
              </div>
            </div>

            {/* Emergency Contact Info */}
            <div className="bg-gradient-to-r from-orange-100/50 to-rose-100/50 backdrop-blur-xl rounded-2xl p-6 mb-12 border border-orange-200/50">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Emergency Contact Information</h3>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-orange-600" />
                  <span className="font-semibold">24/7 Helpline: +91 1800 DRISHTI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-rose-600" />
                  <span className="font-semibold">requests@drishti.org</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Flow Section */}
        <div className="relative z-10 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                  What Happens Next
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding the process helps you prepare better. Here&apos;s your journey from request to sight restoration.
              </p>
            </div>

            {/* Process Steps */}
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="group relative"
                  data-animate
                  id={`process-step-${step.id}`}
                >
                  <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                            <step.icon className="h-8 w-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                              <div className={`px-3 py-1 bg-gradient-to-r ${step.color} text-white text-xs font-medium rounded-full`}>
                                Step {step.id}
                              </div>
                            </div>
                            <p className="text-gray-600">{step.shortDesc}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Timeline</div>
                            <div className="font-semibold text-gray-800">{step.timeline}</div>
                          </div>
                          {expandedStep === step.id ? 
                            <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          }
                        </div>
                      </div>
                    </div>
                    
                    {expandedStep === step.id && (
                      <div className="px-6 pb-6 border-t border-gray-200/50">
                        <div className="pt-4">
                          <p className="text-gray-700 leading-relaxed">{step.fullDesc}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Connecting Line */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute left-8 -bottom-3 w-0.5 h-6 bg-gradient-to-b from-gray-300 to-gray-200 z-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <AIEyeRequestDemo 
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        patientData={patientData}
      />

        {/* Important Notes */}
        <div className="relative z-10 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-br from-orange-100/50 to-rose-100/50 backdrop-blur-xl rounded-3xl p-12 border border-gray-200/50 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Important Information</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Keep Ready</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Patient&apos;s medical records and reports</li>
                    <li>• Government ID proof (Aadhaar, etc.)</li>
                    <li>• Contact availability for coordination</li>
                    <li>• Hospital admission preparations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Remember</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Wait times vary based on donor availability</li>
                    <li>• All allocations follow medical guidelines</li>
                    <li>• Stay hopeful and patient</li>
                    <li>• We&apos;re here to support you throughout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          [data-animate] {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          [data-animate].animate-in {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 text-gray-800 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 via-transparent to-rose-100/30" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
      </div>

      {/* Header Section */}
      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8 inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-orange-200">
            <Eye className="h-4 w-4 mr-2 text-rose-500" />
            <span className="text-sm text-gray-700 font-medium">Request Corneal Transplant</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
              Request Eyes for Transplant
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto font-medium">
            Help restore sight to your loved one. Submit a request for corneal transplant with our trusted network of eye banks.
          </p>

          <p className="text-lg mb-12 text-gray-500 max-w-2xl mx-auto">
            Our medical coordinators will connect you with the nearest eye bank and guide you through the entire process with care and compassion.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">24-48 Hrs</div>
              <div className="text-sm text-gray-500">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-600">98%</div>
              <div className="text-sm text-gray-500">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">500+</div>
              <div className="text-sm text-gray-500">Eye Banks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Form */}
      <div className="relative z-10 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-200/50 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Submit Transplant Request</h2>
              <p className="text-gray-600">Please provide accurate information to help us serve you better</p>
            </div>

            {/* Patient Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <User className="h-5 w-5 mr-2 text-orange-500" />
                Patient Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient&apos;s Full Name *</label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                  <input
                    type="number"
                    name="patientAge"
                    value={formData.patientAge}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    required
                    min="1"
                    max="120"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                  <select
                    name="patientGender"
                    value={formData.patientGender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar/ID Number (Optional)</label>
                  <input
                    type="text"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    placeholder="For authenticity verification"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medical Record Number (Optional)</label>
                  <input
                    type="text"
                    name="medicalRecordNumber"
                    value={formData.medicalRecordNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    placeholder="If patient is from a hospital"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-rose-500" />
                Contact Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Contact Name *</label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relation to Patient *</label>
                  <select
                    name="relationToPatient"
                    value={formData.relationToPatient}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    required
                  >
                    <option value="">Select Relation</option>
                    <option value="parent">Parent</option>
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                    <option value="sibling">Sibling</option>
                    <option value="relative">Other Relative</option>
                    <option value="caregiver">Caregiver</option>
                    <option value="self">Self</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors resize-none text-gray-800"
                    placeholder="Street address, apartment, suite, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Medical Details */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-emerald-500" />
                Medical Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Request *</label>
                  <select
                    name="reasonForRequest"
                    value={formData.reasonForRequest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    required
                  >
                    <option value="">Select Reason</option>
                    <option value="corneal_blindness">Corneal Blindness</option>
                    <option value="accident_injury">Accident/Injury</option>
                    <option value="degenerative_disease">Degenerative Disease</option>
                    <option value="congenital_condition">Congenital Condition</option>
                    <option value="infection">Infection</option>
                    <option value="chemical_burn">Chemical Burn</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Doctor&apos;s Reference (Optional)</label>
                  <input
                    type="text"
                    name="doctorReference"
                    value={formData.doctorReference}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    placeholder="Dr. Name, Specialization"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Reference (Optional)</label>
                  <input
                    type="text"
                    name="hospitalReference"
                    value={formData.hospitalReference}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    placeholder="Hospital Name, Location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level *</label>
                  <select
                    name="urgencyLevel"
                    value={formData.urgencyLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    required
                  >
                    <option value="">Select Urgency</option>
                    <option value="immediate">Immediate (Critical)</option>
                    <option value="within1week">Within 1 Week</option>
                    <option value="not_urgent">Not Urgent</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medical Reports/Additional Details</label>
                  <textarea
                    name="medicalReports"
                    value={formData.medicalReports}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors resize-none text-gray-800"
                    placeholder="Please provide any relevant medical history, current condition details, medications, etc."
                  />
                </div>
              </div>
            </div>

            {/* Logistics */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <Hospital className="h-5 w-5 mr-2 text-purple-500" />
                Logistics & Preferences
              </h3>
              <div className="grid md:grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Hospital/Eye Bank (Optional)</label>
                  <input
                    type="text"
                    name="preferredHospital"
                    value={formData.preferredHospital}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    placeholder="If you have a preference for a specific hospital or eye bank"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors resize-none text-gray-800"
                    placeholder="Any other information that might be helpful for processing your request"
                  />
                </div>
              </div>
            </div>

            {/* Important Information Box */}
            <div className="mb-8 bg-blue-50/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Important Information</h4>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>• This request will be shared with the nearest registered eye bank</li>
                    <li>• Our coordinators will contact you within 24-48 hours for verification</li>
                    <li>• Medical eligibility will be assessed by qualified ophthalmologists</li>
                    <li>• Allocation is based on medical urgency and availability</li>
                    <li>• All processes follow government and eye bank guidelines</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Consent */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-indigo-500" />
                Consent & Agreement
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="consentToShare"
                    checked={formData.consentToShare}
                    onChange={handleInputChange}
                    className="mt-1 h-5 w-5 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                    required
                  />
                  <label className="text-sm text-gray-700">
                    I consent to share the provided details with the nearest registered Eye Bank/Hospital for processing this request. I understand that this information will be used solely for coordinating corneal transplant procedures. *
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={!isFormValid()}
                className={`px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform ${
                  isFormValid()
                    ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:shadow-2xl hover:shadow-rose-500/30 hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Request for Corneal Transplant
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Your request will be processed with the highest priority and confidentiality
              </p>
            </div>
          </form>

          {/* Quick Information Cards */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Quick Response</h3>
              <p className="text-sm text-gray-600">Our medical coordinators respond within 24-48 hours to all requests</p>
            </div>

            <div className="text-center bg-white/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Secure Process</h3>
              <p className="text-sm text-gray-600">All information is encrypted and shared only with authorized medical professionals</p>
            </div>

            <div className="text-center bg-white/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Compassionate Care</h3>
              <p className="text-sm text-gray-600">Our team provides emotional support and guidance throughout the process</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestEyesPage;
