import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Compass, Sparkles } from 'lucide-react';

export default function Welcome() {

  const images = [
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=90",
  ];

  return (
    <section className="relative bg-[#F7F3EE] pt-20 pb-28 md:pt-28 md:pb-40 px-6 md:px-12 overflow-hidden">

      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-gold/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-6 text-left flex flex-col items-start"
        >

          {/* Label */}
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-brand-gold mb-5">
            Our Philosophy
          </span>

          {/* Heading */}
          <h2 className="font-serif text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-brand-charcoal mb-10">
            The Symphony of <br />
            Space, Solitude <br />
            & Slow Travel
          </h2>

          {/* Body */}
          <div className="space-y-7 text-stone-600 font-light text-[15px] md:text-lg leading-relaxed max-w-xl">

            <p>
              At <strong className="font-semibold text-brand-green">SNIMAI</strong>,
              we believe travel should feel timeless — an escape where hours dissolve into stillness.
            </p>

            <p>
              Hidden amidst India’s most breathtaking landscapes, our sanctuaries blend vernacular architecture, handcrafted interiors, and deeply intuitive hospitality.
            </p>

            <p>
              Wake to birdsong, wander through quiet forests, dine beneath the stars, and rediscover the gentle rhythm of slow living.
            </p>

          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-brand-gold/30 my-10" />

          {/* VALUES */}
          <div className="grid grid-cols-3 gap-8 w-full">

            <div className="group">
              <Compass className="w-6 h-6 text-brand-gold mb-3 transition-transform duration-500 group-hover:rotate-12" />
              <h4 className="font-serif text-sm md:text-base font-semibold text-brand-charcoal mb-1">
                Curated Locales
              </h4>
              <span className="text-[11px] tracking-wide text-stone-400 uppercase">
                Untouched Destinations
              </span>
            </div>

            <div className="group">
              <Heart className="w-6 h-6 text-brand-gold mb-3 transition-transform duration-500 group-hover:scale-110" />
              <h4 className="font-serif text-sm md:text-base font-semibold text-brand-charcoal mb-1">
                Intuitive Service
              </h4>
              <span className="text-[11px] tracking-wide text-stone-400 uppercase">
                Warm & Personal
              </span>
            </div>

            <div className="group">
              <Sparkles className="w-6 h-6 text-brand-gold mb-3 transition-transform duration-500 group-hover:rotate-12" />
              <h4 className="font-serif text-sm md:text-base font-semibold text-brand-charcoal mb-1">
                Slow Living
              </h4>
              <span className="text-[11px] tracking-wide text-stone-400 uppercase">
                Mindful Experiences
              </span>
            </div>

          </div>
        </motion.div>

        {/* RIGHT SLIDESHOW */}
        <div className="lg:col-span-6 relative h-[500px] md:h-[720px] flex items-center justify-center">

          {/* Background Panel */}
          <div className="absolute inset-10 bg-[#ECE4D8] rounded-[40px] z-0 shadow-inner" />

          {/* Floating Gold Circle */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 border border-brand-gold/20 rounded-full animate-pulse" />

          {/* Slideshow Container */}
          <motion.div
            className="relative z-20 w-[78%] h-[82%] overflow-hidden rounded-[32px] shadow-[0_25px_70px_rgba(0,0,0,0.22)]"
          >

            {images.map((src, index) => (
              <motion.img
                key={index}
                src={src}
                alt={`Snimai retreat ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [1.08, 1, 1, 1.06],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: index * 6,
                  times: [0, 0.12, 0.82, 1],
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-30" />

            {/* Bottom Text */}
            <div className="absolute bottom-6 left-6 z-40 text-white">
              <p className="text-xs uppercase tracking-[0.35em] text-brand-gold mb-2">
                Snimai Escapes
              </p>

              <h3 className="font-serif text-2xl md:text-4xl">
                Boutique Sanctuaries
              </h3>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}