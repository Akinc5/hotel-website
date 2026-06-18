import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase, Heart, Flame, Map,
  BookOpen, Leaf, Footprints, Mountain
} from 'lucide-react';

export const experienceData = [
  {
    id: 'workations',
    title: 'Workations',
    desc: 'High-speed fiber, quiet forest-facing study tables, and organic tea refills to fuel your creativity.',
    icon: Briefcase,
    color: 'from-blue-500/10 to-indigo-500/10'
  },
  {
    id: 'wellness',
    title: 'Wellness',
    desc: 'Bespoke Ayurvedic treatments, outdoor yoga shalas, and evening sound healing rituals.',
    icon: Heart,
    color: 'from-emerald-500/10 to-teal-500/10'
  },
  {
    id: 'wildlife',
    title: 'Wildlife',
    desc: 'Generational forest naturalist-led safaris, jeep tracks, and river wildlife photography excursions.',
    icon: Flame,
    color: 'from-amber-500/10 to-orange-500/10'
  },
  {
    id: 'road-trips',
    title: 'Road Trips',
    desc: 'Carefully curated routes connecting our hill sanctuaries with luxury artisanal picnic baskets.',
    icon: Map,
    color: 'from-rose-500/10 to-red-500/10'
  },
  {
    id: 'heritage',
    title: 'Heritage',
    desc: 'Fascinating walks exploring local Rajput, colonial, and spiritual history, and local craft workshops.',
    icon: BookOpen,
    color: 'from-yellow-500/10 to-amber-600/10'
  },
  {
    id: 'nature',
    title: 'Nature & Slow Living',
    desc: 'Silent forest bathing trails, organic garden harvests, and evening sky-gazing setups.',
    icon: Leaf,
    color: 'from-green-500/10 to-emerald-600/10'
  },
  {
    id: 'pet-friendly',
    title: 'Pet Friendly Holidays',
    desc: 'Expansive private lawns, custom organic pet menus, and dedicated veterinary assistance.',
    icon: Footprints,
    color: 'from-cyan-500/10 to-sky-600/10'
  },
  {
    id: 'mountain-escapes',
    title: 'Mountain Escapes',
    desc: 'Guided high-altitude deodar treks, alpine meadow picnic setups, and warm fireside stews.',
    icon: Mountain,
    color: 'from-slate-500/10 to-stone-600/10'
  }
];

export default function Experiences({ onExploreExperience }) {
  return (
    <section id="occasions" className="bg-brand-sand py-24 px-6 md:px-12 scroll-mt-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold mb-3 block">
            Joys of S NIMAI
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold leading-tight text-brand-charcoal">
            Crafted Journeys & Stays
          </h2>
          <p className="text-stone-500 font-light text-sm md:text-base mt-4">
            Curated travel genres designed to match your tempo of rest. Whether searching for spiritual wellness, rich wild treks, or quiet digital writing tables.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experienceData.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => onExploreExperience && onExploreExperience(exp)}
                className="bg-white rounded-2xl p-6 md:p-8 border border-stone-100 hover:border-brand-gold/40 shadow-sm hover:shadow-md transition-all duration-300 text-left flex flex-col group cursor-pointer relative overflow-hidden"
              >
                {/* Decorative background hover accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${exp.color} rounded-bl-full translate-x-4 -translate-y-4 group-hover:scale-150 transition-transform duration-500`} />

                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-xl bg-brand-sand flex items-center justify-center text-brand-gold group-hover:text-white group-hover:bg-brand-green transition-all duration-300 mb-6 shrink-0 z-10">
                  <Icon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="font-serif text-lg font-semibold text-brand-charcoal mb-3 group-hover:text-brand-green transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <p className="text-stone-500 font-light text-xs md:text-sm leading-relaxed mb-4 flex-1">
                    {exp.desc}
                  </p>

                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-gold group-hover:text-brand-green transition-colors duration-300 inline-flex items-center gap-1 mt-auto">
                    <span>Learn More</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
