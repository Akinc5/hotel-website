import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import Stripe from 'stripe';
import Razorpay from 'razorpay';
import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase Client (Service Role for backend authentication bypass RLS)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
let supabase = null;

if (!supabaseUrl || !supabaseServiceKey || supabaseUrl.includes('your-project-id') || supabaseUrl === '') {
  console.warn('CRITICAL WARNING: Supabase URL or Service Role Key is missing or default in env! Database operations will fail.');
} else {
  try {
    supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
      realtime: { transport: WebSocket }
    });
  } catch (error) {
    console.error('CRITICAL ERROR: Failed to initialize Supabase client:', error.message);
  }
}

// Middleware to verify database configuration before accessing database routes
const dbRequired = (req, res, next) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Database connection not initialized. Please configure Supabase keys in server/.env' });
  }
  next();
};

// Initialize Stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

if (!stripe) {
  console.warn('WARNING: STRIPE_SECRET_KEY is missing. Stripe payments will be disabled.');
}

// Initialize Razorpay
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
const razorpay = (razorpayKeyId && razorpayKeySecret) 
  ? new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret }) 
  : null;

if (!razorpay) {
  console.warn('WARNING: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing. Razorpay payments will be disabled.');
}

// CORS Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Stripe Webhook needs the RAW request body to verify signature
app.post('/api/payments/stripe/webhook', express.raw({ type: 'application/json' }), dbRequired, async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe) {
    return res.status(500).json({ error: 'Stripe is not configured' });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      console.log(`Stripe Webhook: Payment successful for booking ${bookingId}`);
      
      const { data, error } = await supabase
        .from('bookings')
        .update({
          payment_status: 'paid',
          payment_id: session.payment_intent,
          order_id: session.id
        })
        .eq('id', bookingId)
        .select();

      if (error) {
        console.error(`Failed to update booking status in Supabase:`, error);
      } else {
        console.log(`Booking ${bookingId} successfully marked as PAID`);
      }
    } else {
      console.warn('Stripe Webhook: No bookingId found in session metadata');
    }
  }

  res.json({ received: true });
});

// JSON and URL-encoded body parsers for all other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Sanctuary Backend is running' });
});

// ══════════════════════════════════════════════════════════════
// 📧 WAITLIST REGISTRATION ROUTE
// ══════════════════════════════════════════════════════════════

// POST /api/waitlist
// Stores "Coming Soon" emails in the waitlist table
app.post('/api/waitlist', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    if (!supabase) {
      // For testing when Supabase is not configured yet
      console.log('✅ (MOCK) Waitlist email recorded:', email);
      return res.status(200).json({ success: true, message: 'Email recorded successfully (mock)' });
    }

    // Insert into Supabase table named 'waitlist'
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }])
      .select();

    if (error) {
      // If error is unique constraint violation, it means they are already on the list, which is fine
      if (error.code === '23505') {
         return res.status(200).json({ success: true, message: 'Email is already on the waitlist' });
      }
      throw error;
    }

    res.status(200).json({ success: true, message: 'Email recorded successfully', data });

  } catch (err) {
    console.error('Waitlist Error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to record email' });
  }
});

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    supabase: !!supabase,
    stripe: !!stripe,
    razorpay: !!razorpay
  });
});

// Create Pending Booking Endpoint
app.post('/api/bookings/create', dbRequired, async (req, res) => {
  try {
    const {
      guest_name,
      guest_email,
      guest_phone,
      destination,
      check_in,
      check_out,
      guests,
      room_tier_id,
      room_tier_name,
      special_requests,
      nights,
      nightly_price,
      subtotal,
      discount,
      taxes,
      total_amount
    } = req.body;

    if (!guest_name || !guest_email || !guest_phone || !destination) {
      return res.status(400).json({ error: 'Missing required guest or stay information' });
    }

    // Generate custom confirmation number: AAR-[YEAR]-[5 DIGITS]
    const currentYear = new Date().getFullYear();
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const confirmation_number = `AAR-${currentYear}-${randomDigits}`;

    // Insert pending booking into Supabase
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        guest_name,
        guest_email,
        guest_phone,
        destination,
        check_in,
        check_out,
        guests,
        room_tier_id,
        room_tier_name,
        special_requests,
        nights,
        nightly_price,
        subtotal,
        discount,
        taxes,
        total_amount,
        payment_status: 'pending',
        confirmation_number
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({ success: true, booking: data });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to initialize reservation', details: error.message });
  }
});

// Create Stripe Checkout Session Endpoint
app.post('/api/payments/stripe/create-session', dbRequired, async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!stripe) {
      return res.status(500).json({ error: 'Stripe gateway is not configured on the server.' });
    }

    // Retrieve booking from Supabase
    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    if (error || !booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr', // Stripe supports INR natively
            product_data: {
              name: `Sanctuary Stay - ${booking.room_tier_name}`,
              description: `Resort: ${booking.destination} | ${booking.nights} nights stay for ${booking.guests} guests`,
            },
            unit_amount: Math.round(booking.total_amount * 100), // Stripe expects amounts in cents/paise
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Send metadata to identify booking on webhook
      metadata: {
        bookingId: bookingId,
      },
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/stripe-success?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}?booking_cancel=true`,
    });

    // Update booking with Stripe checkout session ID
    await supabase
      .from('bookings')
      .update({
        order_id: session.id,
        payment_gateway: 'stripe'
      })
      .eq('id', bookingId);

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'Failed to create Stripe payment session', details: error.message });
  }
});

// Create Razorpay Order Endpoint
app.post('/api/payments/razorpay/create-order', dbRequired, async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!razorpay) {
      return res.status(500).json({ error: 'Razorpay gateway is not configured on the server.' });
    }

    // Retrieve booking from Supabase
    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    if (error || !booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const options = {
      amount: Math.round(booking.total_amount * 100), // Razorpay expects amount in paise (1 INR = 100 paise)
      currency: 'INR',
      receipt: `receipt_${booking.confirmation_number}`,
      notes: {
        bookingId: bookingId
      }
    };

    const order = await razorpay.orders.create(options);

    // Update booking with Razorpay Order ID
    await supabase
      .from('bookings')
      .update({
        order_id: order.id,
        payment_gateway: 'razorpay'
      })
      .eq('id', bookingId);

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Failed to create Razorpay order', details: error.message });
  }
});

// Verify Razorpay Payment Signature
app.post('/api/payments/razorpay/verify', dbRequired, async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      bookingId
    } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !bookingId) {
      return res.status(400).json({ error: 'Missing signature verification parameters' });
    }

    // Construct signature text
    const text = razorpay_order_id + '|' + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      // Payment tampering check
      await supabase
        .from('bookings')
        .update({ payment_status: 'failed' })
        .eq('id', bookingId);
        
      return res.status(400).json({ success: false, error: 'Payment signature verification failed' });
    }

    // Success - update booking in database
    const { data: updatedBooking, error } = await supabase
      .from('bookings')
      .update({
        payment_status: 'paid',
        payment_id: razorpay_payment_id
      })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    res.status(500).json({ error: 'Verification failed', details: error.message });
  }
});

// Get Booking Status (Success page verification)
app.get('/api/bookings/status/:id', dbRequired, async (req, res) => {
  try {
    const { id } = req.params;

    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ success: true, booking });
  } catch (error) {
    console.error('Error fetching booking status:', error);
    res.status(500).json({ error: 'Failed to retrieve booking status' });
  }
});

// Stripe Direct Checkout Redirect Verification Endpoint
app.post('/api/payments/stripe/verify-session', dbRequired, async (req, res) => {
  try {
    const { sessionId, bookingId } = req.body;

    if (!stripe) {
      return res.status(500).json({ error: 'Stripe is not configured' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      // Update database if not already updated by webhook
      const { data: booking, error } = await supabase
        .from('bookings')
        .update({
          payment_status: 'paid',
          payment_id: session.payment_intent,
          order_id: session.id
        })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) throw error;
      return res.json({ success: true, booking });
    }

    res.json({ success: false, status: session.payment_status });
  } catch (error) {
    console.error('Error verifying Stripe session:', error);
    res.status(500).json({ error: 'Failed to verify Stripe session', details: error.message });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Hotel Backend running on port ${PORT}`);
});
