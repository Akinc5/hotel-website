import React, { useState } from 'react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    // Simulate luxury API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="bg-brand-green py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Delicate background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold mb-4 block">
          S NIMAI Circle
        </span>

        <h2 className="font-serif text-3xl md:text-5xl font-semibold leading-tight text-white mb-6">
          Subscribe to Our Dispatches
        </h2>

        <p className="text-stone-300 font-light text-sm md:text-base max-w-xl mx-auto mb-12 leading-relaxed">
          Join the S NIMAI Circle to receive curated seasonal dispatches, private invitation-only event invites, slow travel guides, and exclusive direct booking credits.
        </p>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-green-dark border border-brand-gold/30 rounded-2xl p-8 max-w-lg mx-auto flex flex-col items-center gap-3 shadow-2xl"
          >
            <CheckCircle2 className="w-10 h-10 text-brand-gold animate-bounce" />
            <h4 className="font-serif text-lg font-bold text-white">Welcome to the Circle</h4>
            <p className="text-xs text-stone-300 text-center font-light leading-relaxed">
              We are delighted to have you. An elegant confirmation dispatch and your exclusive direct booking code have been delivered to your inbox.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-stretch justify-center max-w-lg mx-auto gap-3 sm:gap-0 sm:border-b sm:border-stone-400/30 sm:focus-within:border-brand-gold transition-colors duration-300 pb-2"
          >
            <div className="flex items-center gap-3 px-3 flex-1 py-3 sm:py-0 border-b border-stone-400/30 sm:border-b-0 sm:pb-0">
              <Mail className="w-4.5 h-4.5 text-brand-gold shrink-0" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
                className="bg-transparent border-0 outline-none text-white text-sm w-full placeholder-stone-400 font-light"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-brand-gold hover:bg-white text-brand-charcoal hover:text-brand-green px-8 py-3.5 sm:py-2.5 rounded-lg sm:rounded-none text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md select-none shrink-0"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Subscribing</span>
                </>
              ) : (
                <span>Subscribe</span>
              )}
            </button>
          </form>
        )}

        <span className="text-[10px] text-stone-400 block mt-6 font-light">
          We honor your sanctuary. Zero spam, unsubscribe in one-click at any time.
        </span>
      </div>
    </section>
  );
}
