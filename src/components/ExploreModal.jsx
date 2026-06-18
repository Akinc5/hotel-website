import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';

export default function ExploreModal({ isOpen, onClose, data, onBookNow }) {
  if (!isOpen || !data) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-charcoal/80 backdrop-blur-md"
        />

        {/* Modal Content Panel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-5xl bg-brand-beige rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col lg:flex-row max-h-[90vh] lg:max-h-[85vh] border border-brand-sand/50"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-brand-charcoal/80 hover:bg-brand-gold text-white hover:text-brand-charcoal flex items-center justify-center transition-colors duration-300 cursor-pointer shadow-md"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Side: Large Immersive Image */}
          <div className="w-full lg:w-1/2 relative min-h-[250px] lg:min-h-full">
            <img 
              src={data.image} 
              alt={data.title || data.name} 
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent pointer-events-none" />
            
            {/* Immersive Tag overlay */}
            <div className="absolute bottom-6 left-6 text-left">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-gold block mb-1">
                {data.location || data.tagline || 'Boutique Resort'}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight">
                {data.title ? data.title.split(' - ')[1] : data.name}
              </h2>
            </div>
          </div>

          {/* Right Side: Detailed Scrollable Information */}
          <div className="w-full lg:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col justify-between text-left">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold mb-3 block">
                Sanctuary Overview
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-brand-charcoal mb-4">
                {data.title || data.name}
              </h3>
              
              <p className="text-stone-600 font-light text-xs md:text-sm leading-relaxed mb-6">
                {data.description}
              </p>

              {/* Inclusions / Amenities Section */}
              {data.amenities && (
                <div className="mb-8">
                  <h4 className="font-serif text-sm font-semibold text-brand-charcoal mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-brand-gold" />
                    <span>Curated Inclusions & Activities</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {data.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-stone-500 font-light">
                        <CheckCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security/Trust highlights */}
              <div className="bg-brand-sand/60 rounded-xl p-4 flex items-start gap-3 border border-brand-sand mb-6">
                <ShieldCheck className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-[10px] font-bold tracking-widest uppercase text-stone-700">Direct Booking Guarantee</h5>
                  <p className="text-[10px] text-stone-400 font-light leading-relaxed mt-0.5">Complimentary Wi-Fi, fully flexible cancellation policy, and a 15% discount on dining/spa purchases.</p>
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-6 border-t border-stone-200/80 flex items-center justify-between mt-auto">
              {data.price ? (
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 block">Est. Nightly Rate</span>
                  <span className="font-serif text-xl font-bold text-brand-green">
                    ₹{data.price.toLocaleString('en-IN')}{' '}
                    <span className="text-xs text-stone-400 font-sans font-light">/ night</span>
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 block">Portfolio Class</span>
                  <span className="font-serif text-sm font-bold text-brand-green uppercase tracking-wide">
                    Luxury Retreats
                  </span>
                </div>
              )}

              <button
                onClick={() => {
                  onBookNow(data);
                }}
                className="bg-brand-green hover:bg-brand-gold text-white hover:text-brand-charcoal px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer select-none active:scale-95"
              >
                Reserve Stay
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
