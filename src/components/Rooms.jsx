import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

export const resortData = [
  {
    id: 'jaipur',
    title: 'Jaipur - The Amer Retreat',
    shortDesc: 'A majestic fort-view sandstone estate inspired by Rajput royal design.',
    description: 'Set against the backdrop of the Aravali range, this sandstone sanctuary reimagines Rajput heritage. Features handmade copper details, authentic clay plastering, private stepwell dining experiences, and direct views of ancient Amer heritage sites. Wake up to folk music and dine on slow-cooked Lal Maas prepared by generational royal chefs.',
    location: 'Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    amenities: ['Private Courtyards', 'Stepwell Dinners', 'Heritage Trails', 'Rajput Spa Rituals'],
    price: 32000
  },
  {
    id: 'udaipur',
    title: 'Udaipur - The Lake House',
    shortDesc: 'Perched elegantly on a private lake-shore with stunning marble terraces.',
    description: 'An intimate escape located on the peaceful edge of a secluded lake, far from tourist corridors. The architecture features delicate white marble arches, custom jharokhas, and sunlit private terraces. Unwind with twilight boat safaris, customized local arts workshops, and organic wellness menus by the lakeside pool.',
    location: 'Udaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    amenities: ['Infinity Lakeside Pool', 'Private Boat Safaris', 'Traditional Mewari Culinary Class', 'Ayurvedic Pavilion'],
    price: 36000
  },
  {
    id: 'manali',
    title: 'Manali - The Cedar Chalets',
    shortDesc: 'Rustic stone and pine wood log-cabins overlooking snowy Himalayan peaks.',
    description: 'Nestled amidst old-growth deodar forests and ancient organic apple orchards, this alpine hideaway blends the warmth of local stone masonry with Swiss chalet elegance. Relax by dry-stone chimneys, sleep under soft down duvets, and enjoy hikes into glaciers, followed by high tea on panoramic valley decks.',
    location: 'Manali, Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80',
    amenities: ['Fireplace Suites', 'Apple Orchard Picnics', 'High Altitude Meditation', 'Guided Glacier Hikes'],
    price: 24000
  },
  {
    id: 'corbett',
    title: 'Corbett - The River Hideaway',
    shortDesc: 'Luxury wild cottages on the pebble shores of the pristine Ramganga River.',
    description: 'Built along the wilderness migration routes on elevated wooden decks, this lodge captures the untethered raw energy of the jungle. Sleep under handcrafted canvas roofs with absolute modern luxury, take open-gypsy birding safaris, and dine on stone-baked forest recipes under the star-filled river sky.',
    location: 'Corbett, Uttarakhand',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80',
    amenities: ['Riverside Canvas Decks', 'Open-Gypsy Jeep Safaris', 'Naturalist Guided Trails', 'Solar Heated Plunge Pools'],
    price: 28000
  },
  {
    id: 'dharamshala',
    title: 'Dharamshala - The Deodar Sanctuary',
    shortDesc: 'Spiritual pine-forest forest cabins offering Himalayan wellness.',
    description: 'Located in the mist-crowned slopes of the Dhauladhars, this retreat is a shrine to stillness. Guest suites are designed with minimalistic earthen luxury, emphasizing ventilation and light. Partake in customized Tibetan healing sciences, sunrise forest walks, and organic farm-to-table culinary boards.',
    location: 'Dharamshala, Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80',
    amenities: ['Yoga & Sound Healing', 'Earthen Thermal Baths', 'Tibetan Healing Consultation', 'Pine Forest Hikes'],
    price: 22000
  },
  {
    id: 'varanasi',
    title: 'Varanasi - The Ganges Ghat',
    shortDesc: 'A restored colonial brick estate offering panoramic Ganges terraces.',
    description: 'Standing proudly on the silent, sacred banks of the Ganges, this colonial-era estate blends heritage archways with modern luxury. Watch the sunrise from a private high-view terrace, listen to classical morning ragas, and experience direct river boating from our private stone ghat steps.',
    location: 'Varanasi, Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=800&q=80',
    amenities: ['Sunrise River Ragas', 'Private Ghat Access', 'Spiritual Guided Walks', 'Wellness Spa Baths'],
    price: 26000
  },
  {
    id: 'mussoorie',
    title: 'Mussoorie - The Misty Ridge',
    shortDesc: 'A colonial mountain estate with vintage library chimneys and mist views.',
    description: 'Recreating the high-colonial elegance of bygone mountain estates, this manor offers panoramic views of the Dun Valley. Spend afternoons in our hand-curated library, drink bespoke local tea blends by the fireplace, and take walks to discover wild wildflower slopes and pine-wood ravines.',
    location: 'Mussoorie, Uttarakhand',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    amenities: ['Vintage Fireplace Library', 'Classic Afternoon Tea Room', 'Valley Sunset View Deck', 'Mountain Wildflower Trails'],
    price: 25000
  },
  {
    id: 'srinagar',
    title: 'Srinagar - The Shikara Sanctuary',
    shortDesc: 'Elegant hand-carved houseboats and terraced villas bordering Dal Lake.',
    description: 'A gorgeous complex combining cedar-wood houseboats with floating terraces and terraced orchards. Taste regional delicacies, rest on hand-loomed silk carpets, boat through silent lotus blossoms on our hand-painted Shikaras, and indulge in warm local hospitality.',
    location: 'Srinagar, Jammu &amp; Kashmir',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    amenities: ['Hand-Painted Shikaras', 'Kashmiri Wazwan Dinners', 'Lotus Flower Lagoons', 'Cedar Wood Craft Workshops'],
    price: 30000
  }
];

export default function Rooms({ onExplore }) {
  return (
    <section id="Rooms" className="bg-brand-sand py-24 px-6 md:px-12 scroll-mt-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold mb-3 block">
            Our Sanctuaries
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold leading-tight text-brand-charcoal">
            I want to escape to...
          </h2>
          <p className="text-stone-500 font-light text-sm md:text-base mt-4">
            Explore our collection of meticulously curated luxury hideaways, each capturing the distinctive pulse, vernacular craft, and spirit of its region.
          </p>
        </div>

        {/* Resort Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resortData.map((resort, idx) => (
            <motion.div
              key={resort.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col group border border-stone-100"
            >
              {/* Card Image Wrapper */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={resort.image}
                  alt={resort.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Location Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-brand-charcoal py-1 px-3 rounded-full text-[10px] uppercase font-bold tracking-widest flex items-center gap-1 shadow-sm">
                  <MapPin className="w-3 h-3 text-brand-gold" />
                  <span>{resort.location.split(',')[0]}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col items-start text-left">
                <h3 className="font-serif text-lg font-semibold text-brand-charcoal group-hover:text-brand-green transition-colors duration-300 mb-2 leading-snug">
                  {resort.title.split(' - ')[1]}
                </h3>
                <p className="text-stone-500 font-light text-xs md:text-sm line-clamp-2 leading-relaxed mb-6">
                  {resort.shortDesc}
                </p>

                {/* Explore button aligned at bottom */}
                <div className="mt-auto w-full pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[9px] uppercase tracking-wider text-stone-400 block">From</span>
                    <span className="font-serif text-sm font-semibold text-brand-green">₹{resort.price.toLocaleString('en-IN')} <span className="text-[10px] text-stone-400 font-sans font-light">/ night</span></span>
                  </div>

                  <button
                    onClick={() => onExplore(resort)}
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold hover:text-brand-green transition-colors duration-300 focus:outline-none cursor-pointer group/btn"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
