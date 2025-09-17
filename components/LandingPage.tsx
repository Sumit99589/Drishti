"use client"
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Eye, Heart, Users, Clock, Award, ArrowRight, CheckCircle, Globe, Shield, Zap, Phone, Mail, MapPin, Star, TrendingUp, Activity, Sparkles, ArrowUpRight, Play, Pause, Volume2, VolumeX, Menu, X, Send, Calendar, Target, Lightbulb, HandHeart } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DrishtiLanding = () => {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('mission');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const videoRef = useRef(null);

  // Enhanced carousel data with working images
  const carouselSlides = [
    {
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90",
      title: "Every Blink Matters",
      subtitle: "Transform Lives Through the Gift of Vision",
      description: "Join 100,000+ heroes who've pledged to illuminate someone's world after their last sunset",
      stats: { donors: "100K+", lives: "50K+", time: "72hrs" }
    },
    {
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90",
      title: "AI-Powered Matching",
      subtitle: "Revolutionary Technology Meets Compassion",
      description: "Our quantum-speed algorithm matches donors to recipients in minutes, not months",
      stats: { accuracy: "99.9%", speed: "3min", success: "95%" }
    },
    {
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90",
      title: "A Network of Hope",
      subtitle: "Building Tomorrow's Vision Today",
      description: "From rural villages to metro cities, we're creating India's largest eye donation ecosystem",
      stats: { cities: "500+", hospitals: "1000+", volunteers: "50K+" }
    }
  ];

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      }, 7000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, carouselSlides.length]);

  // Intersection Observer
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
  }, []);

  const testimonials = [
    {
      name: "Dr. Ananya Reddy",
      title: "Corneal Specialist, AIIMS",
      story: "After 30 years of performing transplants, I witnessed the joy of restored vision countless times. Pledging my own eyes through Drishti was the easiest decision I've ever made.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 5,
      impact: "15 lives transformed"
    },
    {
      name: "Vikram Singh",
      title: "Tech Entrepreneur & Philanthropist",
      story: "My grandmother lost her sight waiting for a donor. Through Drishti, I ensure no family endures what we did. Technology can truly change lives.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 5,
      impact: "₹10M donated"
    },
    {
      name: "Sister Mary Thomas",
      title: "Social Worker & Eye Donation Advocate",
      story: "In my 40 years of service, I've seen miracles. Drishti makes these miracles systematic, not sporadic. Every pledge is a prayer answered.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 5,
      impact: "500+ pledges facilitated"
    }
  ];

  const stats = [
    { number: "100K+", label: "Active Donors", icon: Heart, color: "from-rose-400 to-pink-500" },
    { number: "72hrs", label: "Avg Wait Time", icon: Clock, color: "from-amber-400 to-orange-500" },
    { number: "99.9%", label: "Success Rate", icon: TrendingUp, color: "from-emerald-400 to-green-500" },
    { number: "1000+", label: "Partner Hospitals", icon: Activity, color: "from-indigo-400 to-purple-500" }
  ];

  const features = [
    {
      icon: Sparkles,
      title: "Quantum Matching",
      description: "AI-powered algorithm matches donors to recipients in real-time with 99.9% accuracy",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Every pledge is secured with military-grade encryption and blockchain verification",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connected with international eye banks for cross-border donations when needed",
      gradient: "from-amber-500 to-orange-600"
    },
    {
      icon: Zap,
      title: "Instant Updates",
      description: "Real-time notifications keep families informed at every step of the journey",
      gradient: "from-rose-500 to-pink-600"
    }
  ];

  const processSteps = [
    { icon: HandHeart, title: "Pledge Online", desc: "Simple 3-minute registration" },
    { icon: Shield, title: "Verification", desc: "Secure document validation" },
    { icon: Target, title: "Smart Matching", desc: "AI finds perfect recipients" },
    { icon: Sparkles, title: "Gift of Sight", desc: "Transform lives forever" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 text-gray-800 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 via-transparent to-rose-100/30" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
      </div>

      {/* Premium Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <Eye className="h-10 w-10 text-orange-500 group-hover:text-orange-600 transition-all duration-300" />
                <div className="absolute inset-0 bg-orange-400 blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                Drishti
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {['Home', 'Mission', 'Technology', 'Stories', 'Impact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-gray-600 hover:text-gray-900 transition-all duration-300 group font-medium"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-rose-400 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <button onClick={()=>router.push("/pledge")} className="px-6 py-3 cursor-pointer bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105 font-semibold">
                Pledge Now
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-all duration-300 font-semibold">
                Request Eyes
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 inset-x-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {['Home', 'Mission', 'Technology', 'Stories', 'Impact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-gray-600 hover:text-gray-900 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button onClick={()=>router.push("/pledge")}  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full font-semibold">
                Pledge Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Carousel */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          {carouselSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/60 to-white/30" />
            </div>
          ))}
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          <div className="mb-8 inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-orange-200">
            <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
            <span className="text-sm text-gray-700 font-medium">Trusted by 100,000+ donors nationwide</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-600 via-rose-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
              {carouselSlides[currentSlide].title}
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto font-medium">
            {carouselSlides[currentSlide].subtitle}
          </p>

          <p className="text-lg mb-12 text-gray-500 max-w-2xl mx-auto">
            {carouselSlides[currentSlide].description}
          </p>

          {/* Hero Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {Object.entries(carouselSlides[currentSlide].stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-3xl font-bold text-gray-800">{value}</div>
                <div className="text-sm text-gray-500 capitalize">{key.replace('_', ' ')}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-rose-500/30 transform hover:scale-105">
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full text-lg font-semibold backdrop-blur-sm hover:bg-white/50 transition-all duration-300">
              Watch Stories
            </button>
          </div>

          {/* Carousel Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-white/60 backdrop-blur-sm rounded-full hover:bg-white/80 transition-all text-gray-700"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <div className="flex space-x-2">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1 transition-all duration-300 ${
                    index === currentSlide ? 'w-8 bg-orange-500' : 'w-4 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-500 rounded-full mt-2 animate-scroll" />
          </div>
        </div>
      </section>

      {/* Floating Stats Section */}
      <section className="relative py-24 -mt-20 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-xl"
                data-animate
                id={`stat-${index}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                <stat.icon className="h-8 w-8 mb-4 text-gray-600" />
                <div className="text-4xl font-bold mb-2 text-gray-800">{stat.number}</div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Mission Section */}
      <section id="mission" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16" data-animate id="mission-header">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 backdrop-blur-md rounded-full border border-purple-200 mb-6">
              <Lightbulb className="h-4 w-4 mr-2 text-purple-600" />
              <span className="text-sm text-purple-700 font-medium">Our Vision</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                Reimagining Eye Donation
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just facilitating donations; we're architecting a future where vision is a universal right, not a privilege.
            </p>
          </div>

          {/* Interactive Tabs */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['mission', 'vision', 'impact', 'technology'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full capitalize transition-all duration-300 font-medium ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-rose-500/30'
                      : 'bg-white/60 text-gray-700 hover:bg-white/80'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-200/50 shadow-lg">
              {activeTab === 'mission' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold mb-6 text-gray-800">Our Sacred Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Every 5 minutes, someone in India loses their sight to corneal blindness. We exist to rewrite this narrative. 
                    Through cutting-edge technology, compassionate community building, and relentless innovation, we're creating 
                    a world where the gift of sight flows seamlessly from those who've lived fully to those yearning to see.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {processSteps.map((step, i) => (
                      <div key={i} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-rose-500 rounded-xl flex items-center justify-center">
                          <step.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-gray-800">{step.title}</h4>
                          <p className="text-sm text-gray-600">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold mb-6 text-gray-800">Vision 2030</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    By 2030, we envision an India where corneal blindness is history. Where every eligible donor is registered, 
                    every recipient matched within 24 hours, and every transplant succeeds through precision medicine and AI.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-white/50 rounded-2xl">
                      <div className="text-3xl font-bold text-orange-600 mb-2">Zero</div>
                      <div className="text-gray-600">Waiting Time by 2030</div>
                    </div>
                    <div className="text-center p-6 bg-white/50 rounded-2xl">
                      <div className="text-3xl font-bold text-rose-600 mb-2">1 Million</div>
                      <div className="text-gray-600">Pledged Donors</div>
                    </div>
                    <div className="text-center p-6 bg-white/50 rounded-2xl">
                      <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                      <div className="text-gray-600">Success Rate</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'impact' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold mb-6 text-gray-800">Real Impact, Real Lives</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold mb-4 text-orange-600">Direct Impact</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                          <span className="text-gray-700">50,000+ successful transplants</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                          <span className="text-gray-700">₹500 Cr healthcare costs saved</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                          <span className="text-gray-700">15 state governments partnered</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-4 text-rose-600">Ripple Effect</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                          <span className="text-gray-700">200,000+ family members impacted</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                          <span className="text-gray-700">5,000+ jobs enabled</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                          <span className="text-gray-700">Educational opportunities restored</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'technology' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold mb-6 text-gray-800">Breakthrough Innovation</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    We're pioneering the world's first AI-powered eye donation ecosystem, leveraging quantum computing 
                    for instant matching and blockchain for unbreakable trust.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-start space-x-4 p-4 bg-white/50 rounded-xl">
                        <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center`}>
                          <feature.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-gray-800">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary Features Grid */}
      <section id="technology" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16" data-animate id="features-header">
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 backdrop-blur-md rounded-full border border-amber-200 mb-6">
              <Zap className="h-4 w-4 mr-2 text-amber-600" />
              <span className="text-sm text-amber-700 font-medium">Cutting-Edge Technology</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                The Future is Now
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative"
                data-animate
                id={`feature-${index}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200/30 to-rose-200/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 hover:border-gray-300 transition-all duration-300 h-full shadow-lg hover:shadow-xl">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <ArrowUpRight className="h-5 w-5 mt-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Testimonials */}
      <section id="stories" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16" data-animate id="stories-header">
            <div className="inline-flex items-center px-4 py-2 bg-rose-100 backdrop-blur-md rounded-full border border-rose-200 mb-6">
              <Heart className="h-4 w-4 mr-2 text-rose-600" />
              <span className="text-sm text-rose-700 font-medium">Stories of Hope</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                Heroes Among Us
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real people, real stories, real impact. These are the voices that inspire our mission every day.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative"
                data-animate
                id={`testimonial-${index}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-200/30 to-purple-200/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 hover:border-gray-300 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-xl">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-gray-200"
                      />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-700 leading-relaxed flex-grow italic">
                    "{testimonial.story}"
                  </p>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Impact</span>
                      <span className="text-sm font-semibold text-orange-600">{testimonial.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Process Timeline */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16" data-animate id="process-header">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 backdrop-blur-md rounded-full border border-emerald-200 mb-6">
              <Target className="h-4 w-4 mr-2 text-emerald-600" />
              <span className="text-sm text-emerald-700 font-medium">Simple Process</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
                Your Journey to Impact
              </span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-orange-400 to-rose-400 hidden lg:block" />
            
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                  data-animate
                  id={`process-${index}`}
                >
                  <div className="flex-1">
                    <div className={`bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 hover:border-gray-300 transition-all duration-300 shadow-lg ${
                      index % 2 === 0 ? 'lg:text-right' : ''
                    }`}>
                      <h3 className="text-2xl font-semibold mb-4 text-gray-800">{step.title}</h3>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-rose-500 rounded-full flex items-center justify-center shadow-2xl shadow-rose-500/30">
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-rose-500 rounded-full animate-ping opacity-20" />
                  </div>
                  
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Visualization */}
      <section id="impact" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-orange-100/50 to-rose-100/50 backdrop-blur-xl rounded-3xl p-12 border border-gray-200/50 shadow-lg">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                    Every Second Counts
                  </span>
                </h2>
                <p className="text-xl text-gray-700 mb-8">
                  While you've been reading this page, 3 people lost their chance at sight. 
                  But together, we can change this narrative.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-gray-700">Live donor registrations happening now</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    <span className="text-gray-700">AI matching in progress</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                    <span className="text-gray-700">Successful transplant completed today</span>
                  </div>
                </div>

                <button className="mt-8 group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-rose-500/30">
                  <span className="relative z-10">Join the Movement</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200/30 to-rose-200/30 rounded-full blur-3xl" />
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Impact visualization"
                  className="relative rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-rose-500 to-purple-500 text-white rounded-2xl p-6 shadow-2xl">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                  Let's Connect
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Have questions? Need support? We're here 24/7 to help you on your journey to giving sight.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-rose-500 rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">24/7 Helpline</div>
                    <div className="text-lg text-gray-800">+91 1800 DRISHTI</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email Support</div>
                    <div className="text-lg text-gray-800">care@drishti.org</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Visit Us</div>
                    <div className="text-lg text-gray-800">Pan India Network</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">Quick Inquiry</h3>
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                <textarea
                  placeholder="How can we help you?"
                  rows="4"
                  className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors resize-none text-gray-800"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
                <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Send Message</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/40 backdrop-blur-xl border-t border-gray-200/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="h-8 w-8 text-orange-500" />
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                  Drishti
                </span>
              </div>
              <p className="text-gray-600">
                Illuminating lives through the gift of sight. Join us in creating a world without corneal blindness.
              </p>
              <div className="flex space-x-4 mt-6">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">
                  <Heart className="h-5 w-5 text-gray-600" />
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">
                  <Globe className="h-5 w-5 text-gray-600" />
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">
                  <Mail className="h-5 w-5 text-gray-600" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">About Drishti</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">How It Works</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Success Stories</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Research & Innovation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">Get Involved</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Pledge Your Eyes</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Request Donation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Become a Volunteer</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Corporate Partnership</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">Stay Updated</h4>
              <p className="text-gray-600 mb-4">Subscribe to our newsletter for updates and stories of hope.</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-white/50 rounded-lg border border-gray-300 focus:border-orange-400 focus:outline-none transition-colors text-gray-800"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-lg hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-center md:text-left mb-4 md:mb-0">
                © 2024 Drishti. All rights reserved. Made with ❤️ for humanity.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes scroll {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(100%); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
        
        [data-animate] {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        [data-animate].animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .duration-1000 {
          transition-duration: 1000ms;
        }
      `}</style>
    </div>
  );
};

export default DrishtiLanding;