# 🛍️ Modern Store

A production-ready, full-stack ecommerce platform built with Next.js 14, Tailwind CSS, Turso, and Stripe.

## 🚀 Live Demo

[View Live Site](https://modern-store-rust.vercel.app)

## ✨ Features

### Storefront

- **Homepage** — Hero section, moving info strips, category banners, services, testimonials, CTA
- **Shop Page** — Search, category filters, price range, sorting, grid/list view
- **Product Detail** — Image gallery, color/size variants, quantity selector, reviews
- **Cart** — Slide-out drawer with quantity controls and real-time subtotal
- **Checkout** — Multi-step (Shipping → Payment → Confirmation) with Stripe integration
- **Collections, New Arrivals, Sale Pages** — Curated browsing experiences
- **Live Search** — Instant product search dropdown in navbar
- **Wishlist** — Save favorite products with heart toggle

### Admin Dashboard

- **Dashboard** — Revenue, orders, customers stats with real charts (Recharts)
- **Product Management** — Add, edit, delete products with multi-image upload (Uploadthing)
- **Order Management** — View orders, update status and payment status
- **Customer Management** — View registered customers

### Authentication

- User registration and login (NextAuth.js)
- Protected routes (middleware)
- Account dashboard with order history
- Address saving for faster checkout

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| **Next.js 14** | Framework (App Router) |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **shadcn/ui (Nova preset)** | UI Components |
| **Turso** | Cloud SQLite database |
| **Drizzle ORM** | Database ORM |
| **Stripe** | Payment processing |
| **NextAuth.js** | Authentication |
| **Uploadthing** | Image uploads |
| **Framer Motion** | Animations |
| **Zustand** | State management |
| **Recharts** | Admin charts |
| **Vercel** | Hosting & deployment |

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/modern-store.git
cd modern-store
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database (Turso)
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-turso-token

# Authentication
AUTH_SECRET=your-auth-secret
AUTH_URL=http://localhost:3000
AUTH_TRUST_HOST=true

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Uploadthing
UPLOADTHING_TOKEN=your-uploadthing-token
```

### 4. Set up the database

```bash
# Push schema to Turso
npx drizzle-kit push

# Seed products
npx tsx src/db/seed.ts
```

### 5. Run the development server

```bash
npm run dev
```

Visit http://localhost:3000

## 🔧 Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Push database schema changes
npx drizzle-kit push

# Seed database with products
npx tsx src/db/seed.ts

# Generate auth secret
npx auth secret
```

## 📁 Project Structure

```
modern-store/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── account/            # User account pages
│   │   ├── admin/              # Admin dashboard
│   │   ├── api/                # API routes
│   │   ├── auth/               # Authentication pages
│   │   ├── checkout/           # Checkout flow
│   │   ├── collections/        # Collections page
│   │   ├── new-arrivals/       # New arrivals page
│   │   ├── products/           # Product detail pages
│   │   ├── sale/               # Sale page
│   │   └── shop/               # Shop page
│   ├── components/             # React components
│   │   ├── admin/              # Admin components
│   │   ├── cart/               # Cart drawer
│   │   ├── layout/             # Layout (Navbar, etc.)
│   │   └── product/            # Product cards
│   ├── data/                   # Static data (seed)
│   ├── db/                     # Database schema & connection
│   ├── lib/                    # Utilities (auth, stripe, etc.)
│   ├── store/                  # Zustand stores (cart, wishlist, search)
│   └── types/                  # TypeScript types
├── drizzle/                    # Drizzle migrations
├── public/                     # Static assets
├── next.config.mjs             # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── package.json                # Dependencies
```

## 🗄️ Database

This project uses Turso, a cloud-hosted SQLite database with edge replication. The schema is managed with Drizzle ORM.

### Schema

- **users** — User accounts
- **products** — Product catalog with colors, sizes, images
- **orders** — Customer orders
- **order_items** — Line items for orders
- **addresses** — Saved shipping addresses
- **accounts, sessions, verification_tokens** — Auth.js tables

## 💳 Payments

Payments are processed via Stripe Checkout. The flow:

1. User fills shipping info → clicks "Pay"
2. Redirected to Stripe-hosted checkout page
3. On successful payment, Stripe sends a webhook to `/api/webhooks/stripe`
4. Webhook updates order status to "Processing" and payment to "Paid"
5. User redirected to success page

### Test Cards

| Type | Number |
| --- | --- |
| Success | 4242 4242 4242 4242 |
| Decline | 4000 0000 0000 9995 |

## 🚀 Deployment

Deployed on Vercel with one-click:

1. Push to GitHub
2. Import project on Vercel
3. Add environment variables
4. Deploy

The Stripe-Vercel integration automatically creates webhook endpoints.

## 📝 License

MIT License

## 🙏 Acknowledgments

- shadcn/ui for the component library
- Next.js for the framework
- Turso for the database
- Stripe for payment processing
- Vercel for hosting

Built with ❤️ by Kartikey Gautam