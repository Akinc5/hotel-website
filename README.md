# S NIMAI Sanctuaries - Luxury Hotel Booking Platform

A highly polished, Netflix-inspired luxury hotel booking and exploration platform. This application is built with modern web technologies, focusing on immersive animations, premium aesthetics, and a robust booking flow.

## 🌟 Key Features

- **Immersive Hero Experience**: Cinematic hero section with interactive scroll indicators.
- **Dynamic Exploration**: "Netflix-style" modal overlays to explore room categories, dining experiences, and sanctuary attractions.
- **Premium Aesthetics**: Custom CSS tokens with a refined brand palette (Forest Green, Gold, Beige) and glassmorphism elements.
- **Robust Booking Engine**: Multi-step reservation desk with real-time price calculation, direct-booking discounts, and tax estimation.
- **Dual Payment Gateways**:
  - **Razorpay**: For domestic (INR) transactions.
  - **Stripe**: For international payments.
- **Supabase Integration**: Securely stores all reservation details and handles waitlist email signups.
- **"Coming Soon" Overlay**: A beautiful placeholder overlay for the booking system before the official launch.

## 🛠️ Technology Stack

**Frontend:**
- React (Vite)
- Tailwind CSS (v4)
- Framer Motion (for complex page and modal transitions)
- Lucide React (for premium icons)

**Backend:**
- Express.js (Node.js)
- Supabase (PostgreSQL Database & API)
- Stripe SDK
- Razorpay SDK

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- Supabase Account
- Stripe & Razorpay Test Accounts

### 1. Database Setup (Supabase)
Run the following SQL in your Supabase SQL Editor to initialize the required tables:

```sql
CREATE TABLE waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name text NOT NULL,
  guest_email text NOT NULL,
  guest_phone text NOT NULL,
  destination text NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL,
  room_tier_id text NOT NULL,
  room_tier_name text NOT NULL,
  special_requests text,
  nights integer NOT NULL,
  nightly_price numeric NOT NULL,
  subtotal numeric NOT NULL,
  discount numeric NOT NULL,
  taxes numeric NOT NULL,
  total_amount numeric NOT NULL,
  payment_status text DEFAULT 'pending',
  payment_gateway text,
  payment_id text,
  confirmation_number text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### 2. Backend Configuration
Navigate to the `server` directory and configure your environment variables.

```bash
cd server
npm install
cp .env.example .env
```

Populate the `.env` file with your specific keys for Supabase, Stripe, and Razorpay.

Start the backend:
```bash
npm run dev
```

### 3. Frontend Configuration
Navigate to the root directory and start the Vite development server.

```bash
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` and automatically proxy `/api` requests to the Express backend running on `http://localhost:5000`.

## 📖 How to Go Live
When you are ready to officially launch the booking engine:
1. Open `src/components/BookingModal.jsx`.
2. Locate the "COMING SOON OVERLAY" comment blocks.
3. Delete the specified block of code to immediately reveal the fully functional booking form underneath.

## 📄 License
This project is proprietary and confidential.
