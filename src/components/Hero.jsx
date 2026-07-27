import React from 'react';
import { motion } from 'framer-motion';
import BookingBar from './BookingBar';
import { MousePointerClick } from 'lucide-react';

export default function Hero({ onSearch, initialSearchState }) {
  return (
    <div className="relative w-full h-[95vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Slow Zoom effect */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1686828236522-9de3c3eda892?q=80&w=2662&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
        }}
      />

      {/* Premium Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/60 via-brand-charcoal/40 to-brand-beige z-10" />

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white flex flex-col items-center justify-center h-full pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold mb-4">
            Welcome to S NIMAI
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-wide mb-6">
            Crafted For Quiet Luxury
          </h1>
          <p className="text-sm md:text-lg lg:text-xl font-light tracking-wide max-w-2xl text-stone-200/90 mb-12 leading-relaxed">
            A collection of immersive sanctuaries where contemporary elegance meets the soul of untouched India.
          </p>
        </motion.div>
        {/* Booking Bar absolute positioned at bottom */}
        <div className="absolute bottom-[220px] left-0 w-full  -translate-y-[30%] z-30">
          <BookingBar onSearch={onSearch} initialSearchState={initialSearchState} />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="hidden md:flex flex-col items-center gap-1.5 absolute bottom-32 text-stone-300 text-[10px] uppercase tracking-[0.2em] font-light cursor-pointer select-none"
          onClick={() => window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
        >
          <span>Scroll to Discover</span>
          <div className="w-1 h-8 bg-brand-gold/50 rounded-full overflow-hidden">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-full h-2 bg-brand-gold rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
