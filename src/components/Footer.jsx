import React from 'react';
import {
  Instagram, Facebook, Youtube,
  MapPin, Phone, Mail, ArrowUp
} from 'lucide-react';

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-charcoal text-stone-300 pt-20 pb-10 px-6 md:px-12 relative border-t border-brand-green/10">

      {/* Scroll to Top Arrow */}
      <button
        onClick={handleScrollToTop}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-gold text-brand-charcoal hover:bg-white hover:text-brand-green flex items-center justify-center shadow-lg transition-colors duration-300 cursor-pointer focus:outline-none"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-stone-850">

        {/* Brand Information column */}
        <div className="lg:col-span-4 text-left flex flex-col items-start">
          <span className="font-serif text-2xl font-bold tracking-wider text-brand-beige">S NIMAI</span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-brand-gold mb-6">Boutique Sanctuaries</span>

          <p className="text-stone-400 font-light text-xs md:text-sm leading-relaxed mb-6 max-w-sm">
            S NIMAI is an award-winning collection of luxury boutique resorts nestled in India&apos;s most beautiful natural sanctuaries. Celebrating vernacular heritage, ecotherapy, and slow travel.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-gold/20 hover:text-brand-gold flex items-center justify-center transition-colors duration-300" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-gold/20 hover:text-brand-gold flex items-center justify-center transition-colors duration-300" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-gold/20 hover:text-brand-gold flex items-center justify-center transition-colors duration-300" aria-label="Youtube">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="lg:col-span-2 text-left">
          <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-brand-beige mb-6">
            Quick Links
          </h4>
          <ul className="space-y-3.5 text-xs font-light text-stone-400">
            <li>
              <button onClick={() => onNavigate('Rooms')} className="hover:text-brand-gold transition-colors duration-200 cursor-pointer">
                Rooms
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('offers')} className="hover:text-brand-gold transition-colors duration-200 cursor-pointer">
                Exclusive Offers
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('occasions')} className="hover:text-brand-gold transition-colors duration-200 cursor-pointer">
                Joys & Occasions
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('journal')} className="hover:text-brand-gold transition-colors duration-200 cursor-pointer">
                Letterbox Journal
              </button>
            </li>
          </ul>
        </div>

        {/* Rooms Column */}
        <div className="lg:col-span-3 text-left">
          <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-brand-beige mb-6">
            Our Sanctuaries
          </h4>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-xs font-light text-stone-400">
            <li><a href="#Rooms" className="hover:text-brand-gold transition-colors duration-200">Jaipur</a></li>
            <li><a href="#Rooms" className="hover:text-brand-gold transition-colors duration-200">Udaipur</a></li>
            <li><a href="#Rooms" className="hover:text-brand-gold transition-colors duration-200">Manali</a></li>
            <li><a href="#Rooms" className="hover:text-brand-gold transition-colors duration-200">Corbett</a></li>
            <li><a href="#Rooms" className="hover:text-brand-gold transition-colors duration-200">Dharamshala</a></li>
            <li><a href="#Rooms" className="hover:text-brand-gold transition-colors duration-200">Varanasi</a></li>
            <li><a href="#Rooms" className="hover:text-brand-gold transition-colors duration-200">Mussoorie</a></li>
            <li><a href="#Rooms" className="hover:text-brand-gold transition-colors duration-200">Srinagar</a></li>
          </ul>
        </div>

        {/* Corporate contact Details */}
        <div className="lg:col-span-3 text-left flex flex-col gap-4">
          <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-brand-beige mb-2">
            Sanctuary Office
          </h4>
          <div className="flex items-start gap-3 text-xs font-light text-stone-400">
            <MapPin className="w-4.5 h-4.5 text-brand-gold shrink-0 mt-0.5" />
            <span>405-407, Heritage Wing, Palace Road, Jaipur, Rajasthan, India - 302001</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-light text-stone-400">
            <Phone className="w-4.5 h-4.5 text-brand-gold shrink-0" />
            <span>+91 141 459 9000</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-light text-stone-400">
            <Mail className="w-4.5 h-4.5 text-brand-gold shrink-0" />
            <span>concierge@S NIMAIescapes.com</span>
          </div>
        </div>

      </div>

      {/* Policies & Copyright details */}
      <div className="max-w-7xl mx-auto pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-light text-stone-500">
        <p className="text-center md:text-left">
          © {currentYear} S NIMAI Private Limited. Inspired by premium Indian boutique hospitality. All rights reserved.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <a href="#" className="hover:text-brand-gold transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="hover:text-brand-gold transition-colors duration-200">Terms of Service</a>
          <a href="#" className="hover:text-brand-gold transition-colors duration-200">Cancellation Policy</a>
          <a href="#" className="hover:text-brand-gold transition-colors duration-200">Sitemap</a>
        </div>
      </div>

    </footer>
  );
}
