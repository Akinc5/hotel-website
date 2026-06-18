import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AnnouncementBar({ onExploreOffers }) {
  return (
    <div className="bg-brand-green-dark text-brand-beige py-2.5 px-4 text-center text-xs md:text-sm font-light tracking-widest flex items-center justify-center gap-2 border-b border-brand-green/30 select-none">
      <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
      <span>BOOK DIRECT & ENJOY EXCLUSIVE SAVINGS & CURATED RETREAT SPA CREDITS</span>
      <button
        onClick={onExploreOffers}
        className="ml-3 font-semibold text-brand-gold hover:text-white transition-colors duration-300 underline underline-offset-4 cursor-pointer focus:outline-none"
      >
        Explore Offers
      </button>
    </div>
  );
}
