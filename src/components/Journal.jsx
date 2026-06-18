import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock } from 'lucide-react';

export const articleData = [
  {
    id: 'art-1',
    category: 'Wellness & Healing',
    title: "The Slow Path: Why We Are Returning to Nature's Rhythm",
    excerpt: 'An in-depth essay exploring the modern psychological benefits of silent forest bathing, digital-disconnect cabins, and natural circadian routines.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
    date: 'May 12, 2026',
    readTime: '6 min read'
  },
  {
    id: 'art-2',
    category: 'Gastronomy',
    title: 'Gastronomy of the Hills: Locally Sourced Himalayan Flavors',
    excerpt: "Highlighting S NIMAI's organic seed-to-table culinary project. Discover local nettle stews, forest honey, and copper pot cooking methods.",
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    date: 'Apr 28, 2026',
    readTime: '4 min read'
  },
  {
    id: 'art-3',
    category: 'Design & Architecture',
    title: 'Modern Palaces: Reimagining Royal Architecture in Rajasthan',
    excerpt: 'A deep-dive conversation with our chief architects on how we blended traditional hand-carved red sandstone with eco-conscious solar air cooling systems.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    date: 'Mar 15, 2026',
    readTime: '8 min read'
  },
  {
    id: 'art-4',
    category: 'Nature Journeys',
    title: 'Healing Waters: Sunrise Ragas and Solitude by the Ganges',
    excerpt: 'Reflections on the spiritual resonance of Varanasi, early morning wood-flute recitals on our stone ghats, and finding center in the chaos.',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=600&q=80',
    date: 'Feb 10, 2026',
    readTime: '5 min read'
  }
];

export default function Journal({ onReadArticle }) {
  return (
    <section id="journal" className="bg-brand-beige py-24 px-6 md:px-12 scroll-mt-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold mb-3 block">
            Letterbox by S NIMAI
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold leading-tight text-brand-charcoal">
            The Journal of Slow Travel
          </h2>
          <p className="text-stone-500 font-light text-sm md:text-base mt-4">
            Curated narratives on wellness, local culinary heritage, indigenous architectural craft, and stories from our surrounding communities.
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articleData.map((art, idx) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-stone-100/50 flex flex-col group transition-all duration-300"
            >
              {/* Image backdrop */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col items-start text-left">
                {/* Meta details */}
                <div className="flex items-center gap-3 text-[10px] text-stone-400 font-medium mb-3 uppercase tracking-wider">
                  <span className="text-brand-gold font-bold">{art.category}</span>
                  <span>•</span>
                  <div className="flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="font-serif text-base md:text-lg font-bold text-brand-charcoal group-hover:text-brand-green transition-colors duration-300 mb-3 leading-snug">
                  {art.title}
                </h3>

                <p className="text-stone-500 font-light text-xs md:text-sm leading-relaxed mb-6 line-clamp-3">
                  {art.excerpt}
                </p>

                {/* Read Button at bottom */}
                <button
                  onClick={() => onReadArticle && onReadArticle(art)}
                  className="mt-auto text-xs font-semibold uppercase tracking-wider text-brand-gold hover:text-brand-green transition-colors duration-300 flex items-center gap-1 cursor-pointer focus:outline-none"
                >
                  <span>Read Article</span>
                  <span className="transform group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
