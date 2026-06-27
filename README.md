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
- **Reviews** — Product reviews with create/delete via API
- **Static Pages** — About, Careers, Contact, FAQ, Privacy Policy, Returns, Shipping, Terms of Service

### Admin Dashboard

- **Dashboard** — Revenue, orders, customers stats with real charts (Recharts)
- **Product Management** — Add, edit, delete products with multi-image upload (Uploadthing)
- **Order Management** — View orders, update status and payment status
- **Customer Management** — View registered customers
- **Settings** — Store-wide configuration

### Authentication

- Email/password registration and login (NextAuth.js)
- Google OAuth social login
- Protected routes via middleware (checkout, account, admin)
- Account dashboard with order history and detail view
- Profile editing (name, email)
- Password management (change password, check if set)
- Account deletion
- Address management (save, edit, delete shipping addresses)
- Printable invoice for completed orders

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| **Next.js 14** | Framework (App Router) |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **shadcn/ui (Radix Nova)** | UI Components |
| **Radix UI** | Headless UI primitives |
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

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
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

# Lint
npm run lint

# Seed database with products
npm run seed

# Push database schema changes
npx drizzle-kit push

# Generate auth secret
npx auth secret
```

## 📁 Project Structure

```
modern-store/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── (main)/                   # Storefront route group
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── about/                # About Us
│   │   │   ├── careers/              # Careers
│   │   │   ├── collections/          # Collections
│   │   │   ├── contact/              # Contact
│   │   │   ├── faq/                  # FAQ
│   │   │   ├── privacy/              # Privacy Policy
│   │   │   ├── returns/              # Returns Policy
│   │   │   ├── shipping/             # Shipping Info
│   │   │   ├── terms/                # Terms of Service
│   │   │   ├── account/              # Account pages
│   │   │   │   ├── page.tsx          # Dashboard
│   │   │   │   ├── profile/          # Edit profile
│   │   │   │   ├── settings/         # Account settings
│   │   │   │   ├── wishlist/         # Saved items
│   │   │   │   └── orders/           # Order history & invoices
│   │   │   ├── auth/                 # Login / Register
│   │   │   ├── checkout/             # Checkout + success
│   │   │   ├── new-arrivals/         # New arrivals
│   │   │   ├── products/[id]/        # Product detail
│   │   │   ├── sale/                 # Sale items
│   │   │   └── shop/                 # Shop listings
│   │   ├── admin/                    # Admin dashboard
│   │   │   ├── page.tsx              # Overview with charts
│   │   │   ├── products/             # Product CRUD
│   │   │   ├── orders/               # Order management
│   │   │   ├── customers/            # Customer list
│   │   │   └── settings/             # Store settings
│   │   └── api/                      # API routes
│   │       ├── auth/                 # NextAuth + register
│   │       ├── account/              # Profile, password, delete
│   │       ├── addresses/            # Address CRUD
│   │       ├── products/             # Product CRUD
│   │       ├── reviews/              # Review CRUD
│   │       ├── wishlist/             # Wishlist toggle
│   │       ├── checkout/             # Stripe session
│   │       ├── search/               # Live search
│   │       ├── uploadthing/          # File uploads
│   │       ├── webhooks/stripe/      # Stripe webhooks
│   │       └── admin/                # Admin data endpoints
│   ├── components/
│   │   ├── ui/                       # shadcn/ui primitives
│   │   ├── layout/                   # Navbar, Footer
│   │   ├── cart/                     # CartDrawer
│   │   ├── product/                  # ProductCard, ProductListItem
│   │   ├── admin/                    # DashboardCharts
│   │   └── wishlist/                 # WishlistHydrator
│   ├── data/                         # Static seed data
│   ├── db/                           # Schema, connection, seed
│   ├── lib/                          # Auth, stripe, utils
│   ├── store/                        # Zustand (cart, wishlist, search)
│   └── types/                        # TypeScript type definitions
├── drizzle/                          # Drizzle migrations
├── prisma/                           # Prisma schema (legacy)
├── public/                           # Static assets
├── components.json                   # shadcn/ui config
├── next.config.mjs                   # Next.js config
├── tailwind.config.ts                # Tailwind CSS config
└── package.json                      # Dependencies
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