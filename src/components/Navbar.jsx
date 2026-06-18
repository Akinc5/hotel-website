import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Compass, Percent, Sparkles, BookOpen } from 'lucide-react';

export default function Navbar({ onReserve, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Rooms', id: 'Rooms', icon: Compass },
    { label: 'Offers', id: 'offers', icon: Percent },
    { label: 'Occasions', id: 'occasions', icon: Sparkles },
    { label: 'Journal', id: 'journal', icon: BookOpen },
  ];

  const handleLinkClick = (id) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-in-out ${isScrolled
          ? 'glass-nav-light shadow-md border-b border-brand-sand/50 py-1 text-brand-charcoal'
          : 'bg-transparent py-1 text-white'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1 cursor-pointer group focus:outline-none"
          >
            <img
              src="https://images.unsplash.com/vector-1779777370045-802f1eaed34f?q=80&w=1010&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="S NIMAI Logo"
              className="w-10 h-10 w-28 h-28 object-contain"
            />

            {/* Text */}
            <div className="flex flex-col items-start -ml-3">
              <span className="font-serif text-xl md:text-2xl font-semibold tracking-wider transition-colors duration-300">
                S NIMAI
              </span>
              <span className={`text-[9px] uppercase tracking-[0.25em] font-light transition-colors duration-300 ${isScrolled ? 'text-brand-gold' : 'text-brand-gold'
                }`}>
                Resorts And spa
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className="relative py-2 text-sm tracking-widest uppercase font-medium hover:text-brand-gold transition-colors duration-300 cursor-pointer focus:outline-none group"
              >
                <span>{item.label}</span>
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-brand-gold' : 'bg-white'
                  }`} />
              </button>
            ))}
          </div>

          {/* Desktop Call to Action */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onReserve}
              className={`px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer shadow-sm hover:shadow-md ${isScrolled
                ? 'bg-brand-green text-white hover:bg-brand-gold hover:text-brand-charcoal'
                : 'bg-white text-brand-green hover:bg-brand-gold hover:text-brand-charcoal'
                }`}
            >
              Reserve
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={onReserve}
              className={`px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 ${isScrolled
                ? 'bg-brand-green text-white'
                : 'bg-white text-brand-green'
                }`}
            >
              Reserve
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-brand-gold cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen
                ? <X className="w-6 h-6" />
                : <Menu className={`w-6 h-6 ${isScrolled ? 'text-brand-charcoal' : 'text-white'}`} />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sliding Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-brand-charcoal/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Sliding Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[80vw] max-w-sm z-50 bg-brand-green text-white shadow-2xl lg:hidden flex flex-col p-8 transition-transform duration-500 ease-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
          <div className="flex flex-col items-start">
            <span className="font-serif text-lg font-bold tracking-widest text-brand-beige">S NIMAI</span>
            <span className="text-[8px] uppercase tracking-[0.2em] text-brand-gold">Boutique Sanctuaries</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 rounded-full bg-white/5 hover:bg-white/10 text-brand-gold hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-6 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className="flex items-center gap-4 py-3 text-left border-b border-white/5 hover:border-brand-gold text-lg tracking-widest uppercase font-serif text-white hover:text-brand-gold transition-all duration-300 cursor-pointer"
              >
                <Icon className="w-5 h-5 text-brand-gold" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer actions inside Mobile Menu */}
        <div className="mt-auto border-t border-white/10 pt-8 flex flex-col gap-4">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onReserve();
            }}
            className="w-full bg-brand-gold hover:bg-white text-brand-charcoal hover:text-brand-green py-3 rounded-full text-xs font-bold uppercase tracking-widest text-center transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>Reserve Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-[10px] text-center text-stone-400 tracking-wide mt-2">
            © {new Date().getFullYear()} S NIMAI Resorts.
          </p>
        </div>
      </div>
    </>
  );
}
