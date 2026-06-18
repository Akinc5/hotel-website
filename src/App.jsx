import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import Rooms from './components/Rooms';
import Brands from './components/Attractions';
import Experiences from './components/Experiences';
import Journal from './components/Journal';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ExploreModal from './components/ExploreModal';
import BookingModal from './components/BookingModal';

// ─── Coming Soon Overlay ──────────────────────────────────────────────────────
function ComingSoonOverlay({ visible }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Stable random positions so particles don't re-randomise on re-render
  const particles = useMemo(() =>
    [...Array(12)].map(() => ({
      size: Math.random() * 4 + 2,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
    })),
  []);

  const handleNotify = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        console.error('Failed to submit email');
      }
    } catch (err) {
      console.error('Error submitting email:', err);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="coming-soon"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0d1a12 0%, #1a2e1f 40%, #0d1a12 100%)' }}
        >
          {/* Animated grain texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Golden radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)',
            }}
          />

          {/* Floating particle dots — positions are stable (memoised) */}
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                left: p.left,
                top: p.top,
                background: i % 3 === 0 ? '#d4af37' : 'rgba(255,255,255,0.3)',
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto"
          >
            {/* Decorative top line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-16 h-px mb-8"
              style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }}
            />

            <span
              className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-6"
              style={{ color: '#d4af37' }}
            >
              S NIMAI Sanctuaries
            </span>

            <h1
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-6"
              style={{ color: '#f5f0e8' }}
            >
              Coming
              <br />
              <span style={{ color: '#d4af37' }}>Soon</span>
            </h1>

            <p className="text-sm md:text-base font-light leading-relaxed mb-10 max-w-md" style={{ color: 'rgba(245,240,232,0.6)' }}>
              We are curating something extraordinary — an immersive digital sanctuary that matches the luxury of our retreats. Our full experience is being perfected.
            </p>

            {/* Email notify form */}
            {!submitted ? (
              <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-5 py-3 rounded-full text-xs bg-white/5 border text-white placeholder-white/30 outline-none focus:border-yellow-600/60 transition-colors"
                  style={{ borderColor: 'rgba(212,175,55,0.3)' }}
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg, #d4af37, #b8941f)', color: '#0d1a12' }}
                >
                  Notify Me
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 px-6 py-3 rounded-full border text-sm"
                style={{ borderColor: 'rgba(212,175,55,0.4)', color: '#d4af37' }}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                <span className="font-light tracking-wide">We'll notify you at launch. Thank you.</span>
              </motion.div>
            )}

            {/* Bottom decoration */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="w-16 h-px mt-10"
              style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }}
            />

            <p className="text-[9px] uppercase tracking-[0.3em] mt-4" style={{ color: 'rgba(245,240,232,0.3)' }}>
              Scroll up to return to the hero
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [searchState, setSearchState] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2
  });

  const [activeExploreData, setActiveExploreData] = useState(null);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [stripeBookingDetails, setStripeBookingDetails] = useState(null);
  const [stripeSuccessStep, setStripeSuccessStep] = useState(1);

  // Coming Soon overlay — appears when user scrolls past the Hero
  const [showComingSoon, setShowComingSoon] = useState(false);
  const heroSentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = heroSentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel LEAVES the viewport (scrolled past), show overlay
        setShowComingSoon(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Hook to handle Stripe success redirection callbacks
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const bookingId = params.get('booking_id');

    if (sessionId && bookingId) {
      setIsBookingOpen(true);
      const verifyStripeSession = async () => {
        try {
          const res = await fetch('/api/payments/stripe/verify-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, bookingId })
          });
          const data = await res.json();
          if (res.ok && data.success) {
            setStripeBookingDetails(data.booking);
            setStripeSuccessStep(2);

            // Clean URL query parameters
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
          } else {
            console.error('Stripe session verification failed:', data.error);
          }
        } catch (err) {
          console.error('Error verifying Stripe session:', err);
        }
      };

      verifyStripeSession();
    }
  }, []);

  // Smooth scroll to element by ID
  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExplore = (resort) => {
    setActiveExploreData(resort);
    setIsExploreOpen(true);
  };

  const handleExploreBrand = (brand) => {
    setActiveExploreData(brand);
    setIsExploreOpen(true);
  };

  const handleExploreExperience = (exp) => {
    setActiveExploreData({
      name: exp.title,
      tagline: 'Joys of S NIMAI Experience',
      description: exp.desc + ' Spend your days exploring these bespoke activities, customized to perfection by our on-site team. Available for all reservation tiers.',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
      amenities: ['Professional naturalists', 'Bespoke custom tools', 'Complimentary dining vouchers', 'Private transfers'],
      price: null
    });
    setIsExploreOpen(true);
  };

  const handleReadArticle = (art) => {
    setActiveExploreData({
      name: art.title,
      tagline: `Journal • ${art.category.replace('&amp;', '&')}`,
      description: art.excerpt + ' Read the full dispatch in our seasonal print edition, available in your villa library. We invite you to slow down, turn the pages, and immerse yourself in our deep-living narratives.',
      image: art.image,
      amenities: [
        `Published on ${art.date}`,
        `${art.readTime} reading time`,
        'Complimentary library access',
        'Written by slow travel curators'
      ],
      price: null
    });
    setIsExploreOpen(true);
  };

  const handleBookNow = (resortData) => {
    // If the user is on the explore modal, clicking Book Now passes the resort title as the default destination
    setSearchState((prev) => ({
      ...prev,
      destination: resortData.title || prev.destination
    }));
    setIsExploreOpen(false);
    setIsBookingOpen(true);
  };

  const handleSearchSubmit = (criteria) => {
    setSearchState(criteria);
    setIsBookingOpen(true);
  };

  const handleReserveDirect = () => {
    setIsBookingOpen(true);
  };

  const handleExploreOffers = () => {
    handleScrollToSection('offers');
  };

  return (
    <div className="relative min-h-screen bg-brand-beige selection:bg-brand-gold selection:text-brand-charcoal text-brand-charcoal overflow-x-hidden font-sans">
      {/* 2. Sticky Header Navbar */}
      <Navbar
        onReserve={handleReserveDirect}
        onNavigate={handleScrollToSection}
      />

      {/* 3. Immersive Hero and search bar */}
      <Hero
        onSearch={handleSearchSubmit}
        initialSearchState={searchState}
      />

      {/* Sentinel: sits at the bottom boundary of the Hero — when it
           leaves the viewport the Coming Soon overlay appears */}
      <div ref={heroSentinelRef} className="h-px w-full" aria-hidden="true" />

      {/* Spacer to balance Hero's BookingBar absolute offset */}
      <div className="h-16 md:h-12 bg-brand-beige" />

      {/* 4. Elegant Story Welcome Section */}
      <Welcome />

      {/* 5. Sanctuary Resorts Rooms grid */}
      <Rooms onExplore={handleExplore} />

      {/* 6. Luxury Tiers Brand Section */}
      <Brands onExploreBrand={handleExploreBrand} />

      {/* 7. Experience Genies Grid */}
      <Experiences onExploreExperience={handleExploreExperience} />

      {/* 8. Letterbox Blog Section */}
      <Journal onReadArticle={handleReadArticle} />

      {/* 9. Minimalist Luxury Newsletter Circular */}
      <Newsletter />

      {/* 10. Comprehensive Luxury Footer */}
      <Footer onNavigate={handleScrollToSection} />

      {/* 11. Overlays: Explore Resort Detail Dialog */}
      <ExploreModal
        isOpen={isExploreOpen}
        onClose={() => setIsExploreOpen(false)}
        data={activeExploreData}
        onBookNow={handleBookNow}
      />

      {/* 12. Overlays: Stay Checkout Wizard */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setStripeSuccessStep(1);
          setStripeBookingDetails(null);
        }}
        initialSearchState={searchState}
        initialStep={stripeSuccessStep}
        initialBookingDetails={stripeBookingDetails}
      />

      {/* Coming Soon Overlay — shown when user scrolls past Hero */}
      <ComingSoonOverlay visible={showComingSoon} />

    </div>
  );
}
