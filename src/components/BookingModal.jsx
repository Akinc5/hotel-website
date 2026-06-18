import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, Check, Sparkles, Receipt, ArrowRight, CheckCircle2 } from 'lucide-react';

const roomTiers = [
  { id: 'suite', name: 'Luxury Garden Suite', extraPrice: 0, desc: 'Spacious cottage suite featuring a private lawn terrace and vintage daybeds.' },
  { id: 'villa', name: 'Private Orchard Villa', extraPrice: 8500, desc: 'Independently enclosed villa featuring an outdoor sky-shower and private plunge pool.' },
  { id: 'palace', name: 'Royal Plunge Pool Villa', extraPrice: 16000, desc: 'Premium palace villa showcasing high vaulted ceilings, stepwell courtyard access, and a private heated infinity pool.' }
];

export default function BookingModal({ isOpen, onClose, initialSearchState, initialStep = 1, initialBookingDetails = null }) {
  // All hooks must be called unconditionally (before any early return)
  const [bookingStep, setBookingStep] = useState(1); // 1: form, 2: success
  const [selectedRoom, setSelectedRoom] = useState(roomTiers[0]);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [paymentGateway, setPaymentGateway] = useState('razorpay'); // 'razorpay' or 'stripe'
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [confirmationDetails, setConfirmationDetails] = useState(null);

  useEffect(() => {
    if (initialStep) {
      setBookingStep(initialStep);
    }
    if (initialBookingDetails) {
      setConfirmationDetails(initialBookingDetails);
    }
  }, [initialStep, initialBookingDetails]);

  // Guard: render nothing if modal is closed (MUST be after all hooks)
  if (!isOpen) return null;

  // Default parameters if search state is empty
  const defaultDest = 'Jaipur - The Amer Retreat';
  const defaultCheckIn = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];
  const defaultCheckOut = new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0];
  const defaultGuests = 2;

  const dest = initialSearchState?.destination || defaultDest;
  const checkIn = initialSearchState?.checkIn || defaultCheckIn;
  const checkOut = initialSearchState?.checkOut || defaultCheckOut;
  const guests = initialSearchState?.guests || defaultGuests;

  const formatDateFriendly = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Calculate nights
  const getDaysDiff = (d1, d2) => {
    const diffTime = Math.abs(new Date(d2) - new Date(d1));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };
  const nights = getDaysDiff(checkIn, checkOut);

  // Estimate price per night based on selected destination
  const getBaseRate = (destinationName) => {
    if (destinationName.includes('Udaipur')) return 36000;
    if (destinationName.includes('Jaipur')) return 32000;
    if (destinationName.includes('Srinagar')) return 30000;
    if (destinationName.includes('Corbett')) return 28000;
    if (destinationName.includes('Varanasi')) return 26000;
    if (destinationName.includes('Mussoorie')) return 25000;
    if (destinationName.includes('Manali')) return 24000;
    return 22000; // Dharamshala
  };

  const baseRate = getBaseRate(dest);
  const nightlyPrice = baseRate + selectedRoom.extraPrice;
  const subtotal = nightlyPrice * nights;
  const directBookingDiscount = Math.round(subtotal * 0.15); // 15% discount
  const taxes = Math.round((subtotal - directBookingDiscount) * 0.18); // 18% GST
  const finalTotal = subtotal - directBookingDiscount + taxes;

  // Helper to load Razorpay SDK dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) return;

    setIsLoading(true);
    setLoadingMessage('Securing your sanctuary reservation...');

    const API_URL = import.meta.env.VITE_API_URL || '';

    try {
      // 1. Create booking in backend
      const bookingData = {
        guest_name: guestName,
        guest_email: guestEmail,
        guest_phone: guestPhone,
        destination: dest,
        check_in: checkIn,
        check_out: checkOut,
        guests: parseInt(guests, 10),
        room_tier_id: selectedRoom.id,
        room_tier_name: selectedRoom.name,
        special_requests: specialRequest,
        nights,
        nightly_price: nightlyPrice,
        subtotal,
        discount: directBookingDiscount,
        taxes,
        total_amount: finalTotal
      };

      const bookingRes = await fetch(`${API_URL}/api/bookings/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      const bookingResult = await bookingRes.json();
      if (!bookingRes.ok || !bookingResult.success) {
        throw new Error(bookingResult.error || 'Failed to create booking');
      }

      const bookingId = bookingResult.booking.id;

      // 2. Route based on selected gateway
      if (paymentGateway === 'razorpay') {
        setLoadingMessage('Configuring Razorpay secure gateway...');

        // Load SDK
        const isScriptLoaded = await loadRazorpayScript();
        if (!isScriptLoaded) {
          throw new Error('Razorpay SDK failed to load. Check your connection.');
        }

        // Create Order
        const orderRes = await fetch(`${API_URL}/api/payments/razorpay/create-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId })
        });
        const orderData = await orderRes.json();

        if (!orderRes.ok || !orderData.success) {
          throw new Error(orderData.error || 'Failed to create Razorpay order');
        }

        setIsLoading(false);

        // Open Razorpay Checkout overlay
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Sanctuary Resorts',
          description: `Sanctuary Stay - ${selectedRoom.name}`,
          order_id: orderData.orderId,
          handler: async function (response) {
            setIsLoading(true);
            setLoadingMessage('Verifying payment details with bank...');
            try {
              const verifyRes = await fetch(`${API_URL}/api/payments/razorpay/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  bookingId
                })
              });
              const verifyData = await verifyRes.json();
              if (verifyRes.ok && verifyData.success) {
                setConfirmationDetails(verifyData.booking);
                setBookingStep(2);
              } else {
                throw new Error(verifyData.error || 'Payment verification failed');
              }
            } catch (err) {
              alert(`Payment Verification Error: ${err.message}`);
            } finally {
              setIsLoading(false);
            }
          },
          prefill: {
            name: guestName,
            email: guestEmail,
            contact: guestPhone
          },
          theme: {
            color: '#1C3A27' // Matching the brand green
          },
          modal: {
            ondismiss: function () {
              console.log('Razorpay modal dismissed by user');
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      } else {
        // Stripe gateway
        setLoadingMessage('Preparing international Stripe checkout...');

        const sessionRes = await fetch(`${API_URL}/api/payments/stripe/create-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId })
        });
        const sessionData = await sessionRes.json();

        if (!sessionRes.ok || !sessionData.success) {
          throw new Error(sessionData.error || 'Failed to create Stripe session');
        }

        // Redirect to Stripe checkout
        window.location.href = sessionData.url;
      }

    } catch (err) {
      console.error(err);
      alert(`Reservation Error: ${err.message}`);
      setIsLoading(false);
    }
  };

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

        {/* Checkout Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-5xl bg-brand-beige rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden z-10 border border-brand-sand/50 flex flex-col max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-brand-charcoal/85 hover:bg-brand-gold text-white hover:text-brand-charcoal flex items-center justify-center transition-colors duration-300 cursor-pointer shadow-md"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* ╔══════════════════════════════════════════════════════════════╗ */}
          {/* ║  🚀 COMING SOON OVERLAY — DELETE LINES 270-374 TO GO LIVE  ║ */}
          {/* ╚══════════════════════════════════════════════════════════════╝ */}
          <motion.div
            key="booking-coming-soon"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden px-8 py-16 rounded-2xl md:rounded-3xl"
            style={{ background: 'linear-gradient(135deg, #0d1a12 0%, #1a2e1f 50%, #0d1a12 100%)' }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />
            {[...Array(14)].map((_, i) => {
              const positions = [
                { left: '8%', top: '15%' }, { left: '22%', top: '75%' }, { left: '38%', top: '10%' },
                { left: '55%', top: '85%' }, { left: '70%', top: '20%' }, { left: '85%', top: '60%' },
                { left: '12%', top: '50%' }, { left: '45%', top: '40%' }, { left: '78%', top: '80%' },
                { left: '92%', top: '30%' }, { left: '30%', top: '90%' }, { left: '60%', top: '5%' },
                { left: '5%', top: '85%' }, { left: '95%', top: '10%' }
              ];
              const sizes = [3, 2, 4, 2, 3, 2, 4, 3, 2, 3, 4, 2, 3, 2];
              const durations = [4, 5, 3.5, 6, 4.5, 5.5, 3, 4, 6, 5, 3.5, 4.5, 5, 4];
              const delays = [0, 1, 2, 0.5, 1.5, 2.5, 0.8, 1.8, 0.3, 2.2, 1.2, 0.6, 1.9, 2.8];
              return (
                <motion.div key={i} className="absolute rounded-full pointer-events-none"
                  style={{ width: sizes[i], height: sizes[i], left: positions[i].left, top: positions[i].top, background: i % 3 === 0 ? '#d4af37' : 'rgba(255,255,255,0.25)' }}
                  animate={{ y: [0, -25, 0], opacity: [0.15, 0.7, 0.15] }}
                  transition={{ duration: durations[i], repeat: Infinity, delay: delays[i], ease: 'easeInOut' }}
                />
              );
            })}
            <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: 0.3 }} className="w-14 h-px mb-7" style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] mb-5" style={{ color: '#d4af37' }}>S NIMAI RESORTS & SPA</span>
              <h2 className="font-serif font-bold leading-[1.05] mb-5" style={{ fontSize: 'clamp(2.8rem, 8vw, 5rem)', color: '#f5f0e8' }}>
                Online Booking<br /><span style={{ color: '#d4af37' }}>Coming Soon</span>
              </h2>
              <p className="font-light leading-relaxed mb-8 max-w-sm text-sm" style={{ color: 'rgba(245,240,232,0.58)' }}>
                Our reservation system is being finely tuned to match the exclusivity of our retreats. In the meantime, reach us directly to book your sanctuary.
              </p>

              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: 0.5 }} className="w-14 h-px" style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
            </div>
          </motion.div>
          {/* ══════════════════ END COMING SOON — LINE 374 ══════════════════ */}

          {bookingStep === 1 ? (
            /* STEP 1: Booking Form */
            <div className="flex flex-col lg:flex-row overflow-y-auto max-h-full divide-y lg:divide-y-0 lg:divide-x divide-stone-200">

              {/* Left Column: Form & Room Selectors */}
              <div className="w-full lg:w-3/5 p-6 md:p-8 text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold mb-2 block">
                  Reservation Desk
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-charcoal mb-6">
                  Complete Your Booking
                </h2>

                <form onSubmit={handleFormSubmit} className="space-y-6">

                  {/* Selected Sanctuary Details Summary */}
                  <div className="bg-brand-sand/50 border border-brand-sand rounded-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-2">
                      <span className="text-[9px] uppercase tracking-wider text-stone-400 block">Sanctuary</span>
                      <span className="text-xs font-semibold text-brand-green flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span>{dest}</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-stone-400 block">Stay Duration</span>
                      <span className="text-xs font-semibold text-stone-700 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span>{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-stone-400 block">Guests</span>
                      <span className="text-xs font-semibold text-stone-700 flex items-center gap-1 mt-0.5">
                        <Users className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Room Selection Tier */}
                  <div>
                    <label className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block mb-3">
                      Select Room / Villa Category
                    </label>
                    <div className="space-y-3">
                      {roomTiers.map((tier) => (
                        <div
                          key={tier.id}
                          onClick={() => setSelectedRoom(tier)}
                          className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 flex items-start gap-4 ${selectedRoom.id === tier.id
                            ? 'bg-white border-brand-green shadow-md ring-1 ring-brand-green/30'
                            : 'bg-white/40 border-stone-200 hover:border-brand-gold'
                            }`}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 shrink-0 ${selectedRoom.id === tier.id ? 'border-brand-green bg-brand-green' : 'border-stone-300'
                            }`}>
                            {selectedRoom.id === tier.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs md:text-sm font-semibold text-brand-charcoal">{tier.name}</span>
                              {tier.extraPrice > 0 ? (
                                <span className="text-xs font-bold text-brand-gold">+₹{tier.extraPrice.toLocaleString('en-IN')} / night</span>
                              ) : (
                                <span className="text-[10px] uppercase font-bold text-stone-400">Included</span>
                              )}
                            </div>
                            <p className="text-[10px] md:text-xs text-stone-400 font-light leading-relaxed mt-1">{tier.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Guest Personal Information Inputs */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block mb-1">
                      Guest Information
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] uppercase tracking-wider text-stone-400 mb-1">Full Name</span>
                        <input
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Lord/Lady's Name"
                          className="bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-green transition-colors"
                        />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] uppercase tracking-wider text-stone-400 mb-1">Email Address</span>
                        <input
                          type="email"
                          required
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="concierge@luxury.com"
                          className="bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-green transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] uppercase tracking-wider text-stone-400 mb-1">Phone Number</span>
                        <input
                          type="tel"
                          required
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="+91 99999 99999"
                          className="bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-green transition-colors"
                        />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] uppercase tracking-wider text-stone-400 mb-1">Special Requests (Optional)</span>
                        <input
                          type="text"
                          value={specialRequest}
                          onChange={(e) => setSpecialRequest(e.target.value)}
                          placeholder="Ayurveda preferences, pillows selection..."
                          className="bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-green transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Gateway Selector */}
                  <div className="space-y-3 pt-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block mb-1">
                      Choose Payment Method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Razorpay Option */}
                      <div
                        onClick={() => setPaymentGateway('razorpay')}
                        className={`border rounded-xl p-3 cursor-pointer transition-all duration-300 flex items-center gap-3 ${paymentGateway === 'razorpay'
                          ? 'bg-white border-brand-green shadow-md ring-1 ring-brand-green/30'
                          : 'bg-white/40 border-stone-200 hover:border-brand-gold'
                          }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${paymentGateway === 'razorpay' ? 'border-brand-green bg-brand-green' : 'border-stone-300'
                          }`}>
                          {paymentGateway === 'razorpay' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div className="text-left">
                          <span className="text-[11px] font-semibold text-brand-charcoal block">Razorpay (Domestic)</span>
                          <span className="text-[9px] text-stone-400 block">UPI, Cards, Netbanking (INR)</span>
                        </div>
                      </div>

                      {/* Stripe Option */}
                      <div
                        onClick={() => setPaymentGateway('stripe')}
                        className={`border rounded-xl p-3 cursor-pointer transition-all duration-300 flex items-center gap-3 ${paymentGateway === 'stripe'
                          ? 'bg-white border-brand-green shadow-md ring-1 ring-brand-green/30'
                          : 'bg-white/40 border-stone-200 hover:border-brand-gold'
                          }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${paymentGateway === 'stripe' ? 'border-brand-green bg-brand-green' : 'border-stone-300'
                          }`}>
                          {paymentGateway === 'stripe' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div className="text-left">
                          <span className="text-[11px] font-semibold text-brand-charcoal block">Stripe (International)</span>
                          <span className="text-[9px] text-stone-400 block">International Cards & wallets</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submission Row */}
                  <button
                    type="submit"
                    className="w-full bg-brand-green hover:bg-brand-gold text-white hover:text-brand-charcoal py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md select-none active:scale-95 mt-4"
                  >
                    <span>Proceed to Confirm Reservation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </form>
              </div>

              {/* Right Column: Invoice / Price Summary */}
              <div className="w-full lg:w-2/5 p-6 md:p-8 bg-brand-sand/40 flex flex-col justify-between text-left">
                <div>
                  <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-stone-500 mb-6 flex items-center gap-2 border-b border-stone-200 pb-3">
                    <Receipt className="w-4 h-4 text-brand-gold" />
                    <span>Price Summary</span>
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-light text-stone-500">
                      <span>Stay Period</span>
                      <span className="font-semibold text-stone-700">{nights} {nights === 1 ? 'night' : 'nights'}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-light text-stone-500">
                      <span>Room Category</span>
                      <span className="font-semibold text-stone-700">{selectedRoom.name}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-light text-stone-500 border-b border-stone-200/50 pb-3.5">
                      <span>Rate per Night</span>
                      <span className="font-semibold text-stone-700">₹{nightlyPrice.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-light text-stone-600 pt-2">
                      <span>Base Fare Subtotal</span>
                      <span className="font-semibold text-stone-700">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>

                    {/* Direct Booking Discount Badge */}
                    <div className="flex items-center justify-between text-xs font-semibold text-brand-green bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100/50">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Direct Booking 15% Off</span>
                      </span>
                      <span>-₹{directBookingDiscount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-light text-stone-500 border-b border-stone-200/50 pb-3.5">
                      <span>GST (Taxes 18%)</span>
                      <span className="font-semibold text-stone-700">₹{taxes.toLocaleString('en-IN')}</span>
                    </div>

                    {/* Grand Total */}
                    <div className="flex items-end justify-between pt-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block">Total Amount</span>
                        <span className="text-[9px] text-stone-400 font-light block leading-none">Inclusive of all services &amp; taxes</span>
                      </div>
                      <span className="font-serif text-2xl font-bold text-brand-green">
                        ₹{finalTotal.toLocaleString('en-IN')}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Reservation Info Notice */}
                <div className="mt-8 bg-white/70 border border-stone-200/80 rounded-xl p-4">
                  <h5 className="text-[10px] font-bold tracking-wider uppercase text-stone-600 mb-1">Standard Policy</h5>
                  <ul className="text-[9px] text-stone-400 space-y-1 font-light list-disc pl-3">
                    <li>Free cancellation up to 48 hours before check-in date.</li>
                    <li>Check-in 14:00 | Check-out 11:00.</li>
                    <li>We request photo identity cards at registration desk.</li>
                  </ul>
                </div>

              </div>

            </div>
          ) : (
            /* STEP 2: Beautiful Booking Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-16 text-center max-w-2xl mx-auto flex flex-col items-center justify-center gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-brand-sand flex items-center justify-center text-brand-gold shadow-md">
                <CheckCircle2 className="w-10 h-10 text-brand-green animate-pulse" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold mb-3 block">Stay Confirmed</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-charcoal leading-tight">
                  Your Sanctuary Awaits, {(confirmationDetails?.guest_name || guestName).split(' ')[0]}
                </h2>
                <p className="text-stone-500 font-light text-xs md:text-sm mt-4 leading-relaxed">
                  We are absolutely delighted to host you at <strong className="font-semibold text-brand-green">{confirmationDetails?.destination || dest}</strong> for a serene stay of <strong className="font-semibold text-brand-charcoal">{confirmationDetails?.nights || nights} {(confirmationDetails?.nights || nights) === 1 ? 'night' : 'nights'}</strong>.
                </p>
              </div>

              <div className="w-full bg-white border border-brand-sand/80 rounded-2xl p-6 text-left space-y-3.5 shadow-sm max-w-md">
                <div className="flex items-center justify-between text-xs border-b border-stone-100 pb-2">
                  <span className="text-stone-400">Confirmation Number</span>
                  <span className="font-mono font-bold text-stone-700 tracking-wider">{confirmationDetails?.confirmation_number || `AAR-2026-${(Math.floor(Math.random() * 89999) + 10000)}`}</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b border-stone-100 pb-2">
                  <span className="text-stone-400">Resort Villa Class</span>
                  <span className="font-semibold text-stone-700">{confirmationDetails?.room_tier_name || selectedRoom.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b border-stone-100 pb-2">
                  <span className="text-stone-400">Stay Timeline</span>
                  <span className="font-semibold text-stone-750">{formatDateFriendly(confirmationDetails?.check_in || checkIn)} to {formatDateFriendly(confirmationDetails?.check_out || checkOut)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">Direct Booking Benefit</span>
                  <span className="font-bold text-brand-gold flex items-center gap-0.5">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>Free Spa Credits</span>
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-stone-400 font-light leading-relaxed max-w-sm">
                A custom booking invoice and packing checklist have been emailed to <strong className="text-stone-650">{confirmationDetails?.guest_email || guestEmail}</strong>. Feel free to contact our round-the-clock concierge at +91 141 459 9000.
              </p>

              <button
                onClick={onClose}
                className="bg-brand-green hover:bg-brand-gold text-white hover:text-brand-charcoal px-10 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer select-none active:scale-95"
              >
                Return to Sanctuary Home
              </button>
            </motion.div>
          )}

          {/* Premium Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-brand-beige/95 z-30 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-full border-2 border-brand-gold border-t-brand-green animate-spin mb-4" />
              <p className="font-serif text-sm font-semibold text-brand-charcoal animate-pulse">
                {loadingMessage}
              </p>
              <p className="text-[10px] text-stone-400 mt-2">
                Please do not close this window or click back.
              </p>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
