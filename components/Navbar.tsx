'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-lg py-2 shadow-xl border-b border-amber-400/20' 
        : 'bg-slate-900/80 backdrop-blur-sm py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group relative">
            <span className="text-2xl font-bold text-[#E5D0B3] transition-all duration-300 hover:text-amber-400">
              YourLogo
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-[#E5D0B3] transition-all duration-300 group-hover:w-full"></div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="#home" text="Home" />
            <NavLink href="#about" text="About Us" />
            <NavLink href="#contact" text="Contact Us" />
            <Link href="#pledge" className="relative ml-4 group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-[#E5D0B3] rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              <button className="relative bg-gradient-to-r from-amber-400 to-[#E5D0B3] text-slate-900 font-bold px-6 py-2.5 rounded-full transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-amber-400/30">
                Take Pledge!
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#E5D0B3] hover:bg-slate-800 transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-3 border-t border-slate-700/50 mt-4">
            <MobileNavLink href="#home" text="Home" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink href="#about" text="About Us" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink href="#contact" text="Contact Us" onClick={() => setIsMobileMenuOpen(false)} />
            <Link href="#pledge" onClick={() => setIsMobileMenuOpen(false)} className="block">
              <button className="w-full bg-gradient-to-r from-amber-400 to-[#E5D0B3] text-slate-900 font-bold py-3 px-4 rounded-lg transition-transform duration-300 hover:scale-[0.98]">
                Take Pledge!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Desktop Navigation Link Component
function NavLink({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} className="group relative px-4 py-2">
      <span className="relative text-white font-medium transition-colors duration-300 group-hover:text-[#E5D0B3]">
        {text}
      </span>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E5D0B3]/20 to-amber-400/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
      <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#E5D0B3] to-amber-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
    </Link>
  )
}

// Mobile Navigation Link Component
function MobileNavLink({ href, text, onClick }: { href: string; text: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="block">
      <div className="text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-slate-800/50 hover:text-[#E5D0B3] hover:translate-x-2">
        {text}
      </div>
    </Link>
  )
}