
import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Terminal size={24} className="text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">Coders<span className="text-blue-400">Diary</span></span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#curriculum" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Curriculum</a>
          <a href="#why-us" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Why CodersDiary</a>
          <a href="#mentorship" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Mentorship</a>
          <a href="#outcomes" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Outcomes</a>
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
            Enroll Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass border-t border-white/10 p-6 flex flex-col space-y-4 animate-in slide-in-from-top duration-300">
          <a href="#curriculum" className="text-lg text-slate-300" onClick={() => setIsMobileMenuOpen(false)}>Curriculum</a>
          <a href="#why-us" className="text-lg text-slate-300" onClick={() => setIsMobileMenuOpen(false)}>Why CodersDiary</a>
          <a href="#mentorship" className="text-lg text-slate-300" onClick={() => setIsMobileMenuOpen(false)}>Mentorship</a>
          <a href="#outcomes" className="text-lg text-slate-300" onClick={() => setIsMobileMenuOpen(false)}>Outcomes</a>
          <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold">Start Your Journey</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
