"use client"
import { useState, useEffect } from 'react';
import { Eye, Heart, CheckCircle, User, Mail, Phone, MapPin, Shield, Clock, Activity, Sparkles, AlertCircle, Target, HandHeart, ChevronDown, ChevronUp, Download, Users, Share2 } from 'lucide-react';

const PledgeNowPage = () => {
  const [currentStep, setCurrentStep] = useState('form');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalHistory: '',
    agreeTerms: false,
    informFamily: false,
    newsletter: true
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
      icon: HandHeart,
      title: "Pledge Registration",
      shortDesc: "Your commitment is recorded",
      fullDesc: "When you complete this pledge, your details are securely stored in our digital Eye Bank registry. You'll receive a Donor Card/Certificate confirming your noble intent. Remember, this pledge represents your commitment, but final consent at the time of passing must come from your family.",
      timeline: "Immediate",
      color: "from-rose-500 to-pink-600"
    },
    {
      id: 2,
      icon: Users,
      title: "Family Awareness",
      shortDesc: "Share your decision with loved ones",
      fullDesc: "We strongly encourage you to inform your family members about your pledge. This conversation is crucial because your family will be contacted after your passing and must provide consent. Open communication ensures your wishes are honored.",
      timeline: "Ongoing",
      color: "from-amber-500 to-orange-600"
    },
    {
      id: 3,
      icon: Phone,
      title: "Time of Need",
      shortDesc: "24/7 support when it matters",
      fullDesc: "When the time comes, family or friends should immediately call our 24/7 eye bank helpline (within 4-6 hours). Our dedicated retrieval teams are always on standby, ready to honor your gift with the utmost care and dignity.",
      timeline: "Within 4-6 hours",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 4,
      icon: Shield,
      title: "Medical & Legal Verification",
      shortDesc: "Ensuring safety and consent",
      fullDesc: "Our medical team confirms eligibility through health screenings (checking for infections like HIV, Hepatitis, or certain eye conditions). Your family will sign a formal consent form, ensuring all legal requirements are met with complete transparency.",
      timeline: "30-60 minutes",
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: 5,
      icon: Activity,
      title: "Gentle Retrieval Process",
      shortDesc: "Respectful and dignified procedure",
      fullDesc: "A trained ophthalmologist or eye bank technician performs the corneal retrieval (usually just the transparent part, not the whole eye). This 20-minute procedure preserves the donor's appearance with artificial caps, maintaining dignity for the family.",
      timeline: "20 minutes",
      color: "from-purple-500 to-violet-600"
    },
    {
      id: 6,
      icon: Zap,
      title: "Preservation & Transport",
      shortDesc: "Advanced preservation technology",
      fullDesc: "The corneas are immediately placed in specialized preservation medium and transported under sterile conditions to our state-of-the-art eye bank facilities. Every moment is crucial to maintain the tissue's viability.",
      timeline: "1-2 hours",
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: 7,
      icon: Target,
      title: "Quality Assessment",
      shortDesc: "Microscopic examination for excellence",
      fullDesc: "Our expert technicians examine each cornea under high-powered microscopes, checking for quality, infections, and tissue health. Only the finest specimens proceed to help restore sight. Corneas can be preserved for 7-14 days.",
      timeline: "2-4 hours",
      color: "from-indigo-500 to-purple-600"
    },
    {
      id: 8,
      icon: Heart,
      title: "Recipient Matching",
      shortDesc: "AI-powered matching system",
      fullDesc: "Our advanced algorithm matches corneas with patients on the transplant waiting list based on medical urgency, compatibility, and waiting time. Priority is given purely on medical need, not wealth or status.",
      timeline: "Real-time",
      color: "from-pink-500 to-rose-600"
    },
    {
      id: 9,
      icon: Sparkles,
      title: "Gift of Sight",
      shortDesc: "Miracle of restored vision",
      fullDesc: "Skilled corneal surgeons perform the transplant surgery, potentially restoring sight to two recipients (one cornea per person). Your single act of generosity can illuminate two worlds, giving people their independence and dreams back.",
      timeline: "Within 48 hours",
      color: "from-amber-500 to-yellow-500"
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
    if (formData.agreeTerms && formData.informFamily) {
      setCurrentStep('success');
    }
  };

  const isFormValid = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'address', 'city', 'state', 'pincode', 'emergencyContact', 'emergencyPhone'];
    return required.every(field => formData[field]) && formData.agreeTerms && formData.informFamily;
  };

  if (currentStep === 'success') {
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
                  Pledge Confirmed!
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Thank you, <strong>{formData.firstName} {formData.lastName}</strong>, for making the noble decision to give the gift of sight. Your pledge has been registered and you&apos;re now part of our community of heroes.
              </p>
            </div>

            {/* Immediate Next Steps */}
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-lg mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Immediate Next Steps</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Download Your Donor Card</h3>
                  <p className="text-sm text-gray-600 mb-4">Keep this with your important documents</p>
                  <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    Download Card
                  </button>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Inform Your Family</h3>
                  <p className="text-sm text-gray-600 mb-4">Share this decision with your loved ones</p>
                  <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                    Share Decision
                  </button>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Share2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Spread Awareness</h3>
                  <p className="text-sm text-gray-600 mb-4">Inspire others to join the movement</p>
                  <button className="px-4 py-2 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-colors">
                    Share Story
                  </button>
                </div>
              </div>
            </div>

            {/* Important Contact Info */}
            <div className="bg-gradient-to-r from-orange-100/50 to-rose-100/50 backdrop-blur-xl rounded-2xl p-6 mb-12 border border-orange-200/50">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Emergency Contact Information</h3>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-orange-600" />
                  <span className="font-semibold">24/7 Helpline: +91 1800 DRISHTI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-rose-600" />
                  <span className="font-semibold">emergency@drishti.org</span>
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
                  Your Journey Forward
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding the complete process from pledge to sight restoration helps you and your family prepare for this meaningful journey.
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

        {/* Call to Action */}
        <div className="relative z-10 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-gradient-to-br from-orange-100/50 to-rose-100/50 backdrop-blur-xl rounded-3xl p-12 border border-gray-200/50 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Continue Your Impact Journey</h2>
              <p className="text-lg text-gray-600 mb-8">
                Your pledge is just the beginning. Join our community of donors and help us build awareness about the gift of sight.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-rose-500/30 transition-all duration-300 transform hover:scale-105">
                  Join Our Community
                </button>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full text-lg font-semibold hover:bg-white/50 transition-all duration-300">
                  Learn More About Eye Donation
                </button>
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
            <Heart className="h-4 w-4 mr-2 text-rose-500" />
            <span className="text-sm text-gray-700 font-medium">Make a Difference Today</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
              Pledge Your Eyes
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto font-medium">
            Join 100,000+ heroes in giving the ultimate gift - the gift of sight
          </p>

          <p className="text-lg mb-12 text-gray-500 max-w-2xl mx-auto">
            Your decision today can illuminate two worlds tomorrow. Complete your pledge in just 3 minutes and become part of something extraordinary.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">2 Lives</div>
              <div className="text-sm text-gray-500">Per Donor</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-600">20 Min</div>
              <div className="text-sm text-gray-500">Simple Procedure</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">72 Hrs</div>
              <div className="text-sm text-gray-500">Average Response</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pledge Form */}
      <div className="relative z-10 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-200/50 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Complete Your Pledge</h2>
              <p className="text-gray-600">All information is kept strictly confidential and secure</p>
            </div>

            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <User className="h-5 w-5 mr-2 text-orange-500" />
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-rose-500" />
                Address Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors resize-none text-gray-800"
                    required
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

            {/* Emergency Contact */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-purple-500" />
                Emergency Contact
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person Name *</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person Phone *</label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-emerald-500" />
                Medical Information
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Any Eye-related Medical Conditions or Concerns (Optional)
                </label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Please mention any eye diseases, surgeries, or medical conditions that might be relevant..."
                  className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors resize-none text-gray-800"
                />
              </div>
            </div>

            {/* Important Information Box */}
            <div className="mb-8 bg-blue-50/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Important Information</h4>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>• Eye donation is possible regardless of age, blood type, or vision quality</li>
                    <li>• Only corneas are typically donated, preserving facial appearance</li>
                    <li>• The donation process must occur within 4-6 hours after death</li>
                    <li>• Family consent is required at the time of donation, even with a pledge</li>
                    <li>• One donor can restore sight to two recipients</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Consent and Agreements */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-indigo-500" />
                Consent & Agreements
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="mt-1 h-5 w-5 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                    required
                  />
                  <label className="text-sm text-gray-700">
                    I understand and agree to the <span className="text-orange-600 font-medium cursor-pointer hover:underline">Terms and Conditions</span> and <span className="text-orange-600 font-medium cursor-pointer hover:underline">Privacy Policy</span>. I voluntarily pledge my eyes for donation after death. *
                  </label>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="informFamily"
                    checked={formData.informFamily}
                    onChange={handleInputChange}
                    className="mt-1 h-5 w-5 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                    required
                  />
                  <label className="text-sm text-gray-700">
                    I commit to informing my family members about this pledge and will discuss the importance of eye donation with them. I understand that family consent will be required at the time of donation. *
                  </label>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="mt-1 h-5 w-5 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                  />
                  <label className="text-sm text-gray-700">
                    I would like to receive updates about eye donation awareness, success stories, and community events.
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
                Complete My Pledge
              </button>
              <p className="text-sm text-gray-500 mt-4">
                By submitting this form, you're joining 100,000+ heroes committed to giving sight
              </p>
            </div>
          </form>

          {/* Quick Facts Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Universal Gift</h3>
              <p className="text-sm text-gray-600">Anyone can donate eyes regardless of age, blood type, or vision quality</p>
            </div>

            <div className="text-center bg-white/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Time Sensitive</h3>
              <p className="text-sm text-gray-600">Donation must occur within 4-6 hours after death for optimal results</p>
            </div>

            <div className="text-center bg-white/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Double Impact</h3>
              <p className="text-sm text-gray-600">One donor can restore sight to two recipients - doubling your impact</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PledgeNowPage;
