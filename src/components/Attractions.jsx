import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Gem, Compass } from 'lucide-react';

export const brandData = [
  {
    id: 'collections',
    name: 'Collections by S NIMAI',
    tagline: 'Palaces & Grand Estates',
    description: 'A prestigious collection of fully restored historic palaces, medieval forts, and sprawling grand estates. Experience architectural heritage meticulously preserved, royal culinary lineages, and grand banquet courts representing imperial Indian luxury.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    icon: Gem,
    theme: 'Imperial, Heritage, Grandeur'
  },
  {
    id: 'expressions',
    name: 'Expressions by S NIMAI',
    tagline: 'Modern Architectural Statements',
    description: 'Artistic retreats celebrating modern design, high glass ceilings, and striking geometric angles. Located in stunning vistas, these properties emphasize open spaces, integration with outdoor pools, contemporary local art collections, and luxury minimalism.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    icon: Compass,
    theme: 'Design, Innovation, Contemporary'
  },
  {
    id: 'hideaways',
    name: 'Hideaways by S NIMAI',
    tagline: 'Secluded Nature Sanctuaries',
    description: 'Quiet, off-the-grid retreats ranging from high-altitude log cabins to deep-forest canopy lodges. Created with ecological harmony, utilizing stone-wood craftsmanship and providing private hiking trails, organic wellness programs, and silent luxury.',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80',
    icon: ShieldCheck,
    theme: 'Privacy, Ecotherapy, Solitude'
  }
];

export default function Brands({ onExploreBrand }) {
  return (
    <section id="offers" className="bg-brand-beige py-24 px-6 md:px-12 scroll-mt-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold mb-3 block">
            Our Portfolios
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold leading-tight text-brand-charcoal">
            The Portfolios of S NIMAI
          </h2>
          <p className="text-stone-500 font-light text-sm md:text-base mt-4">
            From majestic heritage courts to architectural design villas and secluded forest log-cabins, choose the rhythm of escape that speaks to you.
          </p>
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {brandData.map((brand, idx) => {
            const Icon = brand.icon;
            return (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-stone-100/50 flex flex-col group transition-all duration-500"
              >
                {/* Image backdrop */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brand-green/20 mix-blend-multiply opacity-60 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 to-transparent pointer-events-none" />

                  {/* Brand Tag/Badge */}
                  <div className="absolute bottom-4 left-6 text-left">
                    <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-gold block">
                      {brand.tagline}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white mt-1">
                      {brand.name.split(' by ')[0]}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col items-start text-left">
                  {/* Brand Tier Icon */}
                  <div className="w-10 h-10 rounded-full bg-brand-sand flex items-center justify-center text-brand-gold mb-6">
                    <Icon className="w-5 h-5" />
                  </div>

                  <p className="text-stone-500 font-light text-xs md:text-sm leading-relaxed mb-6 flex-1">
                    {brand.description}
                  </p>

                  <div className="w-full pt-6 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-stone-400 block">Focus</span>
                      <span className="text-xs font-semibold text-brand-green">{brand.theme}</span>
                    </div>

                    <button
                      onClick={() => onExploreBrand(brand)}
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold hover:text-brand-green transition-colors duration-300 focus:outline-none cursor-pointer group/btn"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
