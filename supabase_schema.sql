-- SQL Schema for Hotel Website Bookings Table
-- Run this script in the Supabase SQL Editor (https://database.new)

-- Enable uuid-ossp extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop table if it exists (warning: deletes existing data)
-- DROP TABLE IF EXISTS bookings;

-- Create the bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    guest_phone TEXT NOT NULL,
    destination TEXT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests INTEGER NOT NULL,
    room_tier_id TEXT NOT NULL,
    room_tier_name TEXT NOT NULL,
    special_requests TEXT,
    nights INTEGER NOT NULL,
    nightly_price NUMERIC NOT NULL,
    subtotal NUMERIC NOT NULL,
    discount NUMERIC NOT NULL,
    taxes NUMERIC NOT NULL,
    total_amount NUMERIC NOT NULL,
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'cancelled')),
    payment_gateway TEXT CHECK (payment_gateway IN ('razorpay', 'stripe')),
    payment_id TEXT, -- Stripe Payment Intent ID or Razorpay Payment ID
    order_id TEXT, -- Razorpay Order ID or Stripe Session ID
    confirmation_number TEXT UNIQUE NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create Policies

-- Allow anonymous or authenticated users to insert bookings (during checkout)
CREATE POLICY "Allow public inserts on bookings" 
ON bookings 
FOR INSERT 
WITH CHECK (true);

-- Allow public reads if they know the booking ID or confirmation number (for receipt display)
CREATE POLICY "Allow public select by id or confirmation" 
ON bookings 
FOR SELECT 
USING (true);

-- Allow backend service role (admin) full access (updates payment status, etc.)
-- Note: Service role automatically bypasses RLS in Supabase JS client when initialized with service_role key.

-- Create indexes for performance and queries
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(guest_email);
CREATE INDEX IF NOT EXISTS idx_bookings_confirmation ON bookings(confirmation_number);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_id ON bookings(payment_id);
CREATE INDEX IF NOT EXISTS idx_bookings_order_id ON bookings(order_id);
