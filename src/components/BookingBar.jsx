import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Users, ChevronDown } from 'lucide-react';

export default function BookingBar({ onSearch, initialSearchState }) {
  const Rooms = [
    'Dharamshala - Mountain Mist',
  ];
  const [destination, setDestination] = useState(initialSearchState?.destination || '');
  const [checkIn, setCheckIn] = useState(initialSearchState?.checkIn || '');
  const [checkOut, setCheckOut] = useState(initialSearchState?.checkOut || '');
  const [guests, setGuests] = useState(initialSearchState?.guests || 2);

  const [isDestDropdownOpen, setIsDestDropdownOpen] = useState(false);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);

  const destRef = useRef(null);
  const guestRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (destRef.current && !destRef.current.contains(event.target)) {
        setIsDestDropdownOpen(false);
      }
      if (guestRef.current && !guestRef.current.contains(event.target)) {
        setIsGuestDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCheckInChange = (dateVal) => {
    setCheckIn(dateVal);
    if (checkOut && new Date(checkOut) <= new Date(dateVal)) {
      const nextDay = new Date(dateVal);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay.toISOString().split('T')[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination) {
      setIsDestDropdownOpen(true);
      return;
    }
    onSearch({ destination, checkIn, checkOut, guests });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 backdrop-blur-md text-brand-charcoal rounded-2xl md:rounded-full shadow-2xl p-4 md:py-3 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-stone-200/80 items-center border border-brand-sand/30"
      >
        {/* Destination Dropdown */}
        <div ref={destRef} className="relative py-2 md:py-0 md:px-4 cursor-pointer">
          <div
            onClick={() => setIsDestDropdownOpen(!isDestDropdownOpen)}
            className="flex items-center gap-3 w-full"
          >
            <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
            <div className="flex flex-col text-left flex-1">
              <label className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">Destination</label>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-sm font-medium text-brand-charcoal truncate block pr-2">
                  {destination || 'Where to escape?'}
                </span>
                <ChevronDown className={`w-4 h-4 text-brand-gold transition-transform duration-300 ${isDestDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </div>

          {isDestDropdownOpen && (
            <div className="absolute top-[calc(100%+12px)] left-0 w-full md:w-80 bg-white border border-brand-sand rounded-xl shadow-2xl z-50 py-2 max-h-72 overflow-y-auto animate-dropdown">
              {Rooms.map((dest) => (
                <button
                  key={dest}
                  type="button"
                  onClick={() => {
                    setDestination(dest);
                    setIsDestDropdownOpen(false);
                  }}
                  className="w-full text-left px-5 py-3 text-xs md:text-sm font-medium text-stone-700 hover:bg-brand-sand hover:text-brand-green transition-colors duration-200 border-b border-stone-50 last:border-b-0 cursor-pointer"
                >
                  {dest}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Check-In Date */}
        <div className="py-2 md:py-0 md:px-6 flex items-center gap-3 text-left">
          <Calendar className="w-5 h-5 text-brand-gold shrink-0" />
          <div className="flex flex-col flex-1">
            <label className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">Check In</label>
            <input
              type="date"
              value={checkIn}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => handleCheckInChange(e.target.value)}
              required
              className="text-sm font-medium text-brand-charcoal bg-transparent border-0 outline-none w-full cursor-pointer mt-0.5"
            />
          </div>
        </div>

        {/* Check-Out Date */}
        <div className="py-2 md:py-0 md:px-6 flex items-center gap-3 text-left">
          <Calendar className="w-5 h-5 text-brand-gold shrink-0" />
          <div className="flex flex-col flex-1">
            <label className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">Check Out</label>
            <input
              type="date"
              value={checkOut}
              min={checkIn || new Date().toISOString().split('T')[0]}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className="text-sm font-medium text-brand-charcoal bg-transparent border-0 outline-none w-full cursor-pointer mt-0.5"
            />
          </div>
        </div>

        {/* Guests Selector */}
        <div ref={guestRef} className="py-2 md:py-0 md:pl-6 md:pr-4 flex items-center justify-between gap-3">
          <div
            onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
            className="flex items-center gap-3 text-left flex-1 cursor-pointer"
          >
            <Users className="w-5 h-5 text-brand-gold shrink-0" />
            <div className="flex flex-col">
              <label className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">Guests</label>
              <span className="text-sm font-medium text-brand-charcoal mt-0.5">
                {guests} {guests === 1 ? 'Guest' : 'Guests'}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="bg-brand-green hover:bg-brand-gold text-white hover:text-brand-charcoal py-3 px-8 md:py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-md shrink-0 active:scale-95"
          >
            Book Now
          </button>

          {isGuestDropdownOpen && (
            <div className="absolute top-[calc(100%+12px)] right-0 w-64 bg-white border border-brand-sand rounded-xl shadow-2xl z-50 p-4 animate-dropdown text-stone-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest uppercase">Guests</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-full border border-stone-300 hover:border-brand-gold flex items-center justify-center font-bold text-lg select-none cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-semibold w-4 text-center">{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests(Math.min(8, guests + 1))}
                    className="w-8 h-8 rounded-full border border-stone-300 hover:border-brand-gold flex items-center justify-center font-bold text-lg select-none cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-stone-400 mt-2 text-left">Max 8 guests per room. Contact resort for group bookings.</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
