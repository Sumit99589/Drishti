'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselSlide {
  id: number
  title: string
  description: string
  image: string
  gradient: string
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "Welcome to Our Mission",
    description: "Join us in making a difference for our community and future generations",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop",
    gradient: "from-slate-900/70 via-slate-900/50 to-transparent"
  },
  {
    id: 2,
    title: "Building Tomorrow Together",
    description: "Innovation and collaboration driving sustainable change",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1920&h=1080&fit=crop",
    gradient: "from-emerald-900/70 via-emerald-900/40 to-transparent"
  },
  {
    id: 3,
    title: "Your Impact Matters",
    description: "Every pledge creates ripples of positive transformation",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&h=1080&fit=crop",
    gradient: "from-amber-900/70 via-amber-900/40 to-transparent"
  },
  {
    id: 4,
    title: "Join the Movement",
    description: "Be part of something bigger than yourself",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=1080&fit=crop",
    gradient: "from-blue-900/70 via-blue-900/40 to-transparent"
  },
  {
    id: 5,
    title: "Start Your Journey",
    description: "Take the first step towards meaningful change today",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
    gradient: "from-purple-900/70 via-purple-900/40 to-transparent"
  }
]

export default function AutoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div 
      className="relative h-[70vh] overflow-hidden rounded-2xl mx-4 mt-20 shadow-2xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides Container */}
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="relative flex-shrink-0 w-full h-full"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full text-center px-8">
              <div className="max-w-4xl">
                <h2 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#E5D0B3] to-amber-400 bg-clip-text text-transparent transition-all duration-1000 ${
                  index === currentSlide ? 'animate-fade-in-up' : 'opacity-0'
                }`}>
                  {slide.title}
                </h2>
                <p className={`text-lg md:text-xl text-slate-100 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
                  index === currentSlide ? 'animate-fade-in-up opacity-100' : 'opacity-0'
                }`}>
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/50 hover:bg-slate-900/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/50 hover:bg-slate-900/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-amber-400 scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700/30">
        <div 
          className="h-full bg-gradient-to-r from-[#E5D0B3] to-amber-400 transition-all duration-100 ease-linear"
          style={{ 
            width: isAutoPlaying ? `${((Date.now() % 4000) / 4000) * 100}%` : '0%',
            animation: isAutoPlaying ? 'progress 4s linear infinite' : 'none'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-amber-400/60 rounded-full animate-float-${(i % 3) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }

        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-30px) rotate(270deg); opacity: 0.9; }
        }

        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-25px) rotate(90deg); opacity: 0.7; }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-float-1 {
          animation: float-1 8s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 10s ease-in-out infinite;
        }

        .animate-float-3 {
          animation: float-3 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}