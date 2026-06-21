import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "./index";
import { users, products, addresses, orders, orderItems, reviews, storeSettings } from "./schema";
import { v4 as uuidv4 } from "uuid";

const seedProducts = [
  // ─── ELECTRONICS (9 products) ───
  {
    name: "Wireless Earbuds Pro",
    description: "Active noise cancellation with spatial audio and 30-hour battery life. IPX5 water resistant.",
    price: 249,
    compareAtPrice: 349,
    category: "Electronics",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1590658268037-6bf12f03241a?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1598331668829-0e993a637479?w=600&h=800&fit=crop",
    ]),
    rating: 4.7,
    reviewCount: 456,
    isNew: false,
    isSale: true,
    stock: 78,
    colors: JSON.stringify([{ name: "White", hex: "#ffffff" }, { name: "Black", hex: "#1a1a1a" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Battery Life", value: "30 hours (with case)" },
      { label: "Connectivity", value: "Bluetooth 5.3" },
      { label: "Driver Size", value: "11mm dynamic" },
      { label: "Water Resistance", value: "IPX5" },
      { label: "Charging", value: "USB-C / Wireless Qi" },
      { label: "Weight", value: "5.4g per earbud" },
    ]),
  },
  {
    name: "Smart Speaker",
    description: "360° room-filling sound with voice assistant built-in. Multi-room audio support.",
    price: 179,
    compareAtPrice: 229,
    category: "Electronics",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=800&fit=crop",
    ]),
    rating: 4.5,
    reviewCount: 178,
    isNew: false,
    isSale: true,
    stock: 56,
    colors: JSON.stringify([{ name: "Charcoal", hex: "#2d3436" }, { name: "White", hex: "#f5f5f5" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Power Output", value: "50W RMS" },
      { label: "Connectivity", value: "Wi-Fi 6, Bluetooth 5.2" },
      { label: "Voice Assistant", value: "Built-in" },
      { label: "Dimensions", value: "6.8 x 6.8 x 9.4 in" },
      { label: "Weight", value: "3.2 lbs" },
      { label: "Multi-Room", value: "Yes" },
    ]),
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with Cherry MX Blue switches. Aircraft-grade aluminum frame.",
    price: 189,
    category: "Electronics",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=800&fit=crop",
    ]),
    rating: 4.9,
    reviewCount: 523,
    isNew: true,
    isSale: false,
    stock: 34,
    colors: JSON.stringify([{ name: "Black", hex: "#1a1a1a" }, { name: "White", hex: "#f0f0f0" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Switch Type", value: "Cherry MX Blue" },
      { label: "Layout", value: "Full-size (104 keys)" },
      { label: "Connection", value: "USB-C (detachable)" },
      { label: "Frame Material", value: "Aircraft-grade aluminum" },
      { label: "Backlight", value: "Per-key RGB" },
      { label: "Weight", value: "2.8 lbs" },
    ]),
  },
  {
    name: "4K Action Camera",
    description: "Waterproof to 33ft without housing. HyperSmooth 6.0 stabilization for buttery footage.",
    price: 399,
    compareAtPrice: 499,
    category: "Electronics",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=800&fit=crop",
    ]),
    rating: 4.8,
    reviewCount: 312,
    isNew: false,
    isSale: true,
    stock: 0,
    colors: JSON.stringify([{ name: "Black", hex: "#1a1a1a" }, { name: "Silver", hex: "#c0c0c0" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Video Resolution", value: "4K at 120fps" },
      { label: "Waterproof", value: "33ft (no housing)" },
      { label: "Stabilization", value: "HyperSmooth 6.0" },
      { label: "Battery Life", value: "90 minutes" },
      { label: "Storage", value: "microSD up to 512GB" },
      { label: "Weight", value: "4.6 oz" },
    ]),
  },
  {
    name: "Wireless Charging Pad",
    description: "Fast 15W wireless charging for all Qi-compatible devices. Ultra-slim aluminum design.",
    price: 49,
    category: "Electronics",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=600&h=800&fit=crop",
    ]),
    rating: 4.4,
    reviewCount: 198,
    isNew: false,
    isSale: false,
    stock: 120,
    colors: JSON.stringify([{ name: "Space Gray", hex: "#3a3a3a" }, { name: "Silver", hex: "#d4d4d4" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Output Speed", value: "15W max" },
      { label: "Compatibility", value: "All Qi devices" },
      { label: "Material", value: "Aluminum with silicone ring" },
      { label: "Dimensions", value: "4.1 x 4.1 x 0.3 in" },
      { label: "Weight", value: "2.4 oz" },
      { label: "LED Indicator", value: "Yes" },
    ]),
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Rugged outdoor speaker with 20-hour battery. IP67 waterproof and dustproof.",
    price: 129,
    category: "Electronics",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1589256466156-3e191af47bac?w=600&h=800&fit=crop",
    ]),
    rating: 4.6,
    reviewCount: 267,
    isNew: true,
    isSale: false,
    stock: 89,
    colors: JSON.stringify([{ name: "Red", hex: "#dc2626" }, { name: "Blue", hex: "#2563eb" }, { name: "Black", hex: "#1a1a1a" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Battery Life", value: "20 hours" },
      { label: "Waterproof Rating", value: "IP67" },
      { label: "Output Power", value: "30W" },
      { label: "Connectivity", value: "Bluetooth 5.3" },
      { label: "Weight", value: "1.4 lbs" },
      { label: "Dimensions", value: "7.0 x 3.2 x 3.0 in" },
    ]),
  },
  {
    name: "USB-C Hub Adapter",
    description: "7-in-1 multiport adapter with 4K HDMI, 100W PD charging, SD card reader, and 3 USB ports.",
    price: 69,
    category: "Electronics",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1632923057155-dd936fd0d2d2?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=600&h=800&fit=crop",
    ]),
    rating: 4.3,
    reviewCount: 145,
    isNew: false,
    isSale: false,
    stock: 200,
    colors: JSON.stringify([{ name: "Gray", hex: "#6b7280" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Ports", value: "7-in-1" },
      { label: "HDMI Output", value: "4K at 60Hz" },
      { label: "USB Ports", value: "3x USB-A 3.0" },
      { label: "Charging", value: "100W PD pass-through" },
      { label: "Card Reader", value: "SD / microSD" },
      { label: "Material", value: "Aluminum alloy" },
    ]),
  },
  {
    name: "Noise Cancelling Headphones",
    description: "Over-ear headphones with adaptive noise cancellation. 40-hour battery with quick charge.",
    price: 349,
    compareAtPrice: 449,
    category: "Electronics",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=800&fit=crop",
    ]),
    rating: 4.9,
    reviewCount: 892,
    isNew: true,
    isSale: true,
    stock: 2,
    colors: JSON.stringify([{ name: "Matte Black", hex: "#1f1f1f" }, { name: "Silver", hex: "#c0c0c0" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Battery Life", value: "40 hours" },
      { label: "Driver Size", value: "40mm custom" },
      { label: "Connectivity", value: "Bluetooth 5.2" },
      { label: "Noise Cancellation", value: "Adaptive ANC" },
      { label: "Weight", value: "8.8 oz" },
      { label: "Quick Charge", value: "10 min = 5 hours" },
    ]),
  },
  {
    name: "Tablet Stand",
    description: "Adjustable aluminum tablet stand with non-slip silicone. Compatible with all tablets 4-13 inches.",
    price: 39,
    category: "Electronics",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1589739900243-4b5cd3c6e9f1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=800&fit=crop",
    ]),
    rating: 4.5,
    reviewCount: 189,
    isNew: true,
    isSale: false,
    stock: 65,
    colors: JSON.stringify([{ name: "Silver", hex: "#c0c0c0" }, { name: "Space Gray", hex: "#3a3a3a" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Material", value: "Aluminum + silicone" },
      { label: "Compatibility", value: "Tablets 4-13 inches" },
      { label: "Adjustable Angles", value: "10 levels" },
      { label: "Foldable", value: "Yes" },
      { label: "Weight", value: "8.5 oz" },
    ]),
  },

  // ─── ACCESSORIES (10 products) ───
  {
    name: "Minimalist Watch",
    description: "Elegant timepiece with genuine leather strap and sapphire crystal glass. Japanese quartz movement.",
    price: 199,
    compareAtPrice: 299,
    category: "Accessories",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&h=800&fit=crop",
    ]),
    rating: 4.8,
    reviewCount: 234,
    isNew: false,
    isSale: true,
    stock: 45,
    colors: JSON.stringify([{ name: "Black Leather", hex: "#1a1a1a" }, { name: "Brown Leather", hex: "#8B4513" }, { name: "Silver Mesh", hex: "#d4d4d4" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Movement", value: "Japanese quartz" },
      { label: "Case Material", value: "Stainless steel" },
      { label: "Strap Material", value: "Genuine leather" },
      { label: "Water Resistance", value: "50m (5 ATM)" },
      { label: "Crystal", value: "Sapphire glass" },
      { label: "Case Diameter", value: "40mm" },
    ]),
  },
  {
    name: "Premium Laptop Bag",
    description: "Sleek, water-resistant laptop bag with padded compartments. Fits up to 16-inch laptops.",
    price: 149,
    category: "Accessories",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=800&fit=crop",
    ]),
    rating: 4.9,
    reviewCount: 189,
    isNew: true,
    isSale: false,
    stock: 32,
    colors: JSON.stringify([{ name: "Charcoal", hex: "#2d3436" }, { name: "Navy", hex: "#1e3a5f" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Material", value: "Water-resistant nylon" },
      { label: "Laptop Size", value: "Fits up to 16-inch" },
      { label: "Weight", value: "1.8 lbs" },
      { label: "Compartments", value: "Laptop sleeve + 3 pockets" },
      { label: "Features", value: "Padded straps, luggage pass-through" },
    ]),
  },
  {
    name: "Leather Wallet",
    description: "Handcrafted full-grain leather wallet with RFID protection. Slim design with 8 card slots.",
    price: 79,
    category: "Accessories",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=600&h=800&fit=crop",
    ]),
    rating: 4.6,
    reviewCount: 312,
    isNew: false,
    isSale: false,
    stock: 120,
    colors: JSON.stringify([{ name: "Brown", hex: "#8B4513" }, { name: "Black", hex: "#1a1a1a" }, { name: "Burgundy", hex: "#8B0000" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Material", value: "Full-grain leather" },
      { label: "Card Slots", value: "8" },
      { label: "Features", value: "RFID blocking" },
      { label: "Dimensions", value: "4.3 x 3.0 x 0.4 in" },
      { label: "Weight", value: "2.1 oz" },
    ]),
  },
  {
    name: "Classic Sunglasses",
    description: "UV400 protection polarized lenses with lightweight titanium frame. Includes hard case.",
    price: 159,
    category: "Accessories",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop",
    ]),
    rating: 4.8,
    reviewCount: 267,
    isNew: true,
    isSale: false,
    stock: 90,
    colors: JSON.stringify([{ name: "Gold Frame", hex: "#c4a265" }, { name: "Black Frame", hex: "#1a1a1a" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Lens Material", value: "Polarized polycarbonate" },
      { label: "Frame Material", value: "Titanium" },
      { label: "Protection", value: "UV400" },
      { label: "Includes", value: "Hard case + microfiber cloth" },
      { label: "Weight", value: "1.0 oz" },
    ]),
  },
  {
    name: "Travel Backpack",
    description: "Anti-theft design with USB charging port and expandable 40L capacity. TSA-friendly.",
    price: 99,
    compareAtPrice: 139,
    category: "Accessories",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&h=800&fit=crop",
    ]),
    rating: 4.7,
    reviewCount: 345,
    isNew: false,
    isSale: true,
    stock: 67,
    colors: JSON.stringify([{ name: "Gray", hex: "#6b7280" }, { name: "Black", hex: "#1a1a1a" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Capacity", value: "40L (expandable)" },
      { label: "Material", value: "Water-resistant polyester" },
      { label: "Laptop Sleeve", value: "Fits up to 17-inch" },
      { label: "Features", value: "Anti-theft lock, USB charging port" },
      { label: "Weight", value: "2.6 lbs" },
      { label: "TSA-Friendly", value: "Yes" },
    ]),
  },
  {
    name: "Silk Scarf",
    description: "100% pure mulberry silk scarf with hand-rolled edges. Elegant geometric pattern.",
    price: 89,
    category: "Accessories",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa33?w=600&h=800&fit=crop",
    ]),
    rating: 4.7,
    reviewCount: 156,
    isNew: true,
    isSale: false,
    stock: 55,
    colors: JSON.stringify([{ name: "Navy", hex: "#1e3a5f" }, { name: "Burgundy", hex: "#8B0000" }, { name: "Cream", hex: "#f5f5dc" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Material", value: "100% mulberry silk" },
      { label: "Dimensions", value: "35 x 35 inches" },
      { label: "Care", value: "Dry clean only" },
      { label: "Origin", value: "Handmade in Italy" },
      { label: "Edges", value: "Hand-rolled" },
    ]),
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Double-wall vacuum insulated. Keeps drinks cold 24hrs or hot 12hrs. BPA-free.",
    price: 39,
    category: "Accessories",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=600&h=800&fit=crop",
    ]),
    rating: 4.5,
    reviewCount: 478,
    isNew: false,
    isSale: false,
    stock: 200,
    colors: JSON.stringify([{ name: "Stainless", hex: "#c0c0c0" }, { name: "Matte Black", hex: "#1f1f1f" }, { name: "White", hex: "#ffffff" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Capacity", value: "24 oz" },
      { label: "Material", value: "18/8 stainless steel" },
      { label: "Insulation", value: "Double-wall vacuum" },
      { label: "Cold Retention", value: "24 hours" },
      { label: "Hot Retention", value: "12 hours" },
      { label: "BPA-Free", value: "Yes" },
    ]),
  },
  {
    name: "Canvas Tote Bag",
    description: "Heavy-duty organic canvas tote with leather handles. Perfect for everyday use.",
    price: 59,
    category: "Accessories",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1590874103328e-ac38a683ce7?w=600&h=800&fit=crop",
    ]),
    rating: 4.4,
    reviewCount: 134,
    isNew: false,
    isSale: false,
    stock: 85,
    colors: JSON.stringify([{ name: "Natural", hex: "#f5deb3" }, { name: "Black", hex: "#1a1a1a" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Material", value: "Organic canvas + leather handles" },
      { label: "Dimensions", value: "16 x 14 x 6 inches" },
      { label: "Handle Drop", value: "10 inches" },
      { label: "Care", value: "Spot clean" },
      { label: "Weight", value: "1.0 lb" },
    ]),
  },
  {
    name: "Leather Belt",
    description: "Full-grain Italian leather belt with brushed nickel buckle. Width: 35mm.",
    price: 69,
    category: "Accessories",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=800&fit=crop",
    ]),
    rating: 4.6,
    reviewCount: 98,
    isNew: false,
    isSale: false,
    stock: 110,
    colors: JSON.stringify([{ name: "Brown", hex: "#8B4513" }, { name: "Black", hex: "#1a1a1a" }]),
    sizes: JSON.stringify(["30", "32", "34", "36", "38"]),
    details: JSON.stringify([
      { label: "Material", value: "Full-grain Italian leather" },
      { label: "Width", value: "35mm" },
      { label: "Buckle", value: "Brushed nickel" },
      { label: "Belt Strap Thickness", value: "3.5mm" },
      { label: "Care", value: "Condition with leather balm" },
    ]),
  },
  {
    name: "Aviator Sunglasses",
    description: "Classic aviator style with polarized lenses and gold-tone metal frame.",
    price: 129,
    compareAtPrice: 169,
    category: "Accessories",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&h=800&fit=crop",
    ]),
    rating: 4.5,
    reviewCount: 223,
    isNew: false,
    isSale: true,
    stock: 72,
    colors: JSON.stringify([{ name: "Gold", hex: "#c4a265" }, { name: "Silver", hex: "#c0c0c0" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Lens Material", value: "Polarized glass" },
      { label: "Frame Material", value: "Metal alloy" },
      { label: "Protection", value: "UV400" },
      { label: "Includes", value: "Hard case + cleaning cloth" },
      { label: "Weight", value: "1.2 oz" },
    ]),
  },

  // ─── HOME & LIVING (8 products) ───
  {
    name: "Desk Lamp",
    description: "Adjustable LED desk lamp with 5 color modes and 10 brightness levels. USB charging port.",
    price: 89,
    category: "Home & Living",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=800&fit=crop",
    ]),
    rating: 4.6,
    reviewCount: 167,
    isNew: false,
    isSale: false,
    stock: 45,
    colors: JSON.stringify([{ name: "Black", hex: "#1a1a1a" }, { name: "White", hex: "#ffffff" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Brightness Levels", value: "10" },
      { label: "Color Modes", value: "5 (warm to cool)" },
      { label: "Material", value: "Aluminum + ABS" },
      { label: "USB Port", value: "5W charging" },
      { label: "Power", value: "12W LED" },
      { label: "Lifespan", value: "50,000 hours" },
    ]),
  },
  {
    name: "Plant Pot Set",
    description: "Set of 3 minimalist ceramic planters with drainage holes. Matte finish.",
    price: 49,
    category: "Home & Living",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=600&h=800&fit=crop",
    ]),
    rating: 4.4,
    reviewCount: 89,
    isNew: true,
    isSale: false,
    stock: 120,
    colors: JSON.stringify([{ name: "White", hex: "#ffffff" }, { name: "Terracotta", hex: "#cc6633" }]),
    sizes: JSON.stringify(["Small", "Medium", "Large"]),
    details: JSON.stringify([
      { label: "Material", value: "Ceramic with matte glaze" },
      { label: "Drainage", value: "Pre-drilled drainage holes" },
      { label: "Set Includes", value: "3 planters" },
      { label: "Dimensions", value: "4in, 5in, 6in diameter" },
      { label: "Care", value: "Wipe clean" },
    ]),
  },
  {
    name: "Coffee Mug Set",
    description: "Set of 4 handcrafted stoneware mugs. Microwave and dishwasher safe. 12oz capacity.",
    price: 39,
    category: "Home & Living",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1577937927133-66efb1eac5c4?w=600&h=800&fit=crop",
    ]),
    rating: 4.7,
    reviewCount: 234,
    isNew: false,
    isSale: false,
    stock: 150,
    colors: JSON.stringify([{ name: "Speckled White", hex: "#f5f5f0" }, { name: "Matte Black", hex: "#2d2d2d" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Material", value: "Handcrafted stoneware" },
      { label: "Capacity", value: "12 oz each" },
      { label: "Quantity", value: "4 mugs" },
      { label: "Microwave Safe", value: "Yes" },
      { label: "Dishwasher Safe", value: "Yes" },
    ]),
  },
  {
    name: "Scented Candle Collection",
    description: "Hand-poured soy wax candles with essential oils. Set of 3: Vanilla, Lavender, and Sandalwood.",
    price: 59,
    compareAtPrice: 79,
    category: "Home & Living",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1602874798900-dc3be2c1e52a?w=600&h=800&fit=crop",
    ]),
    rating: 4.8,
    reviewCount: 312,
    isNew: false,
    isSale: true,
    stock: 88,
    colors: null,
    sizes: null,
    details: JSON.stringify([
      { label: "Wax Type", value: "100% natural soy wax" },
      { label: "Burn Time", value: "45 hours per candle" },
      { label: "Scents", value: "Vanilla, Lavender, Sandalwood" },
      { label: "Quantity", value: "Set of 3" },
      { label: "Wick", value: "Cotton (lead-free)" },
      { label: "Weight", value: "8 oz each" },
    ]),
  },
  {
    name: "Throw Blanket",
    description: "Ultra-soft microfiber throw blanket. Perfect for couch or bed. 50x70 inches.",
    price: 49,
    category: "Home & Living",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1549180030-48bf079fb38a?w=600&h=800&fit=crop",
    ]),
    rating: 4.5,
    reviewCount: 189,
    isNew: false,
    isSale: false,
    stock: 95,
    colors: JSON.stringify([{ name: "Cream", hex: "#f5f5dc" }, { name: "Charcoal", hex: "#36454f" }, { name: "Blush", hex: "#de5d83" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Material", value: "Microfiber (100% polyester)" },
      { label: "Dimensions", value: "50 x 70 inches" },
      { label: "Care", value: "Machine washable" },
      { label: "Weight", value: "1.5 lbs" },
      { label: "Features", value: "Hypoallergenic, anti-pilling" },
    ]),
  },
  {
    name: "Wall Art Print Set",
    description: "Set of 3 modern abstract art prints. Unframed, 12x16 inches each on premium matte paper.",
    price: 69,
    category: "Home & Living",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop",
    ]),
    rating: 4.3,
    reviewCount: 76,
    isNew: true,
    isSale: false,
    stock: 60,
    colors: JSON.stringify([{ name: "Warm Tones", hex: "#d4a574" }, { name: "Cool Tones", hex: "#87ceeb" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Size", value: "12 x 16 inches each" },
      { label: "Paper", value: "Premium matte (200gsm)" },
      { label: "Quantity", value: "Set of 3" },
      { label: "Style", value: "Modern abstract" },
      { label: "Frame", value: "Not included" },
    ]),
  },
  {
    name: "Bamboo Desk Organizer",
    description: "Natural bamboo desktop organizer with 5 compartments and phone stand. Eco-friendly.",
    price: 45,
    category: "Home & Living",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=800&fit=crop",
    ]),
    rating: 4.6,
    reviewCount: 145,
    isNew: false,
    isSale: false,
    stock: 78,
    colors: JSON.stringify([{ name: "Natural Bamboo", hex: "#d4a574" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Material", value: "Natural bamboo" },
      { label: "Compartments", value: "5" },
      { label: "Phone Stand", value: "Yes" },
      { label: "Dimensions", value: "10 x 6 x 5 inches" },
      { label: "Eco-Friendly", value: "Sustainably sourced" },
    ]),
  },
  {
    name: "Essential Oil Diffuser",
    description: "Ultrasonic aromatherapy diffuser with 7 LED colors and auto shut-off. 300ml capacity.",
    price: 39,
    category: "Home & Living",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1602928298849-325cec8771c0?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?w=600&h=800&fit=crop",
    ]),
    rating: 4.4,
    reviewCount: 267,
    isNew: false,
    isSale: false,
    stock: 130,
    colors: JSON.stringify([{ name: "Wood Grain", hex: "#8B4513" }, { name: "White Ceramic", hex: "#ffffff" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Capacity", value: "300ml" },
      { label: "Runtime", value: "Up to 10 hours" },
      { label: "LED Colors", value: "7" },
      { label: "Material", value: "BPA-free plastic" },
      { label: "Auto Shut-Off", value: "Yes" },
      { label: "Coverage", value: "Up to 400 sq ft" },
    ]),
  },

  // ─── FASHION (7 products) ───
  {
    name: "Classic Denim Jacket",
    description: "Timeless denim jacket with a modern slim fit. 100% cotton with slight stretch for comfort.",
    price: 129,
    compareAtPrice: 179,
    category: "Fashion",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?w=600&h=800&fit=crop",
    ]),
    rating: 4.5,
    reviewCount: 198,
    isNew: false,
    isSale: true,
    stock: 55,
    colors: JSON.stringify([{ name: "Light Wash", hex: "#87CEEB" }, { name: "Dark Wash", hex: "#1a3a5c" }]),
    sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]),
    details: JSON.stringify([
      { label: "Material", value: "100% cotton denim" },
      { label: "Fit", value: "Slim fit" },
      { label: "Closure", value: "Button front" },
      { label: "Care", value: "Machine wash cold" },
      { label: "Features", value: "Chest pockets, adjustable waist tabs" },
      { label: "Origin", value: "Imported" },
    ]),
  },
  {
    name: "Cashmere Sweater",
    description: "Luxuriously soft 100% cashmere crew neck sweater. Perfect for layering or wearing alone.",
    price: 199,
    category: "Fashion",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop",
    ]),
    rating: 4.9,
    reviewCount: 87,
    isNew: true,
    isSale: false,
    stock: 40,
    colors: JSON.stringify([{ name: "Camel", hex: "#c19a6b" }, { name: "Charcoal", hex: "#36454f" }, { name: "Navy", hex: "#000080" }]),
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    details: JSON.stringify([
      { label: "Material", value: "100% cashmere" },
      { label: "Fit", value: "Regular fit" },
      { label: "Care", value: "Dry clean or hand wash" },
      { label: "Origin", value: "Made in Scotland" },
      { label: "Weight", value: "Medium weight" },
    ]),
  },
  {
    name: "Running Shoes",
    description: "Lightweight performance running shoes with responsive cushioning and breathable mesh upper.",
    price: 149,
    category: "Fashion",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop",
    ]),
    rating: 4.7,
    reviewCount: 456,
    isNew: false,
    isSale: false,
    stock: 65,
    colors: JSON.stringify([{ name: "Black/White", hex: "#1a1a1a" }, { name: "Navy/Orange", hex: "#1e3a5f" }]),
    sizes: JSON.stringify(["7", "8", "9", "10", "11", "12"]),
    details: JSON.stringify([
      { label: "Upper", value: "Breathable engineered mesh" },
      { label: "Sole", value: "Rubber outsole" },
      { label: "Cushioning", value: "Responsive foam midsole" },
      { label: "Weight", value: "9.5 oz" },
      { label: "Heel Drop", value: "8mm" },
    ]),
  },
  {
    name: "Stainless Steel Watch",
    description: "Chronograph watch with stainless steel case and bracelet. Water resistant to 100m.",
    price: 299,
    compareAtPrice: 399,
    category: "Fashion",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=800&fit=crop",
    ]),
    rating: 4.8,
    reviewCount: 234,
    isNew: false,
    isSale: true,
    stock: 28,
    colors: JSON.stringify([{ name: "Silver", hex: "#c0c0c0" }, { name: "Gold", hex: "#c4a265" }]),
    sizes: null,
    details: JSON.stringify([
      { label: "Movement", value: "Japanese quartz chronograph" },
      { label: "Case Material", value: "316L stainless steel" },
      { label: "Bracelet Material", value: "Stainless steel" },
      { label: "Water Resistance", value: "100m (10 ATM)" },
      { label: "Crystal", value: "Mineral glass" },
      { label: "Case Diameter", value: "42mm" },
    ]),
  },
  {
    name: "Linen Button-Down Shirt",
    description: "Breathable 100% linen button-down shirt with a relaxed fit. Perfect for warm weather.",
    price: 89,
    category: "Fashion",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=600&h=800&fit=crop",
    ]),
    rating: 4.6,
    reviewCount: 134,
    isNew: true,
    isSale: false,
    stock: 75,
    colors: JSON.stringify([{ name: "White", hex: "#ffffff" }, { name: "Light Blue", hex: "#add8e6" }, { name: "Beige", hex: "#f5f5dc" }]),
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    details: JSON.stringify([
      { label: "Material", value: "100% linen" },
      { label: "Fit", value: "Relaxed fit" },
      { label: "Closure", value: "Button front" },
      { label: "Collar", value: "Spread collar" },
      { label: "Care", value: "Machine wash gentle" },
    ]),
  },
  {
    name: "Wool Overcoat",
    description: "Tailored wool-blend overcoat with notch lapels and a full satin lining. Double-breasted.",
    price: 349,
    compareAtPrice: 499,
    category: "Fashion",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=800&fit=crop",
    ]),
    rating: 4.8,
    reviewCount: 67,
    isNew: false,
    isSale: true,
    stock: 15,
    colors: JSON.stringify([{ name: "Charcoal", hex: "#36454f" }, { name: "Camel", hex: "#c19a6b" }]),
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    details: JSON.stringify([
      { label: "Material", value: "80% wool, 20% polyester" },
      { label: "Fit", value: "Tailored fit" },
      { label: "Closure", value: "Double-breasted" },
      { label: "Lining", value: "Full satin lining" },
      { label: "Care", value: "Dry clean only" },
    ]),
  },
  {
    name: "Leather Sneakers",
    description: "Minimalist white leather sneakers with cushioned insole and gum rubber sole.",
    price: 119,
    category: "Fashion",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1560769629-975ec294dfc6?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=800&fit=crop",
    ]),
    rating: 4.7,
    reviewCount: 312,
    isNew: true,
    isSale: false,
    stock: 48,
    colors: JSON.stringify([{ name: "White", hex: "#ffffff" }, { name: "Black", hex: "#1a1a1a" }]),
    sizes: JSON.stringify(["7", "8", "9", "10", "11", "12", "13"]),
    details: JSON.stringify([
      { label: "Upper", value: "Full-grain leather" },
      { label: "Sole", value: "Gum rubber" },
      { label: "Insole", value: "Cushioned memory foam" },
      { label: "Closure", value: "Lace-up" },
      { label: "Weight", value: "12 oz" },
    ]),
  },
];

async function seed() {
  console.log("Seeding database...\n");

  // ── Clear existing data (FK order) ──
  console.log("Clearing existing data...");
  await db.delete(reviews);
  await db.delete(orderItems);
  await db.delete(orders);
  await db.delete(addresses);
  await db.delete(products);
  await db.delete(storeSettings);
  await db.delete(users);
  console.log("Done.\n");

  // ── Demo User ──
  console.log("Creating demo user...");
  const userId = uuidv4();
  const hashedPassword = await bcrypt.hash("password123", 12);
  await db.insert(users).values({
    id: userId,
    name: "Demo User",
    email: "demo@example.com",
    password: hashedPassword,
    emailVerified: new Date(),
  });
  console.log("  Email: demo@example.com");
  console.log("  Password: password123\n");

  // ── Products ──
  console.log(`Creating ${seedProducts.length} products...`);
  const productIds: string[] = [];
  for (const product of seedProducts) {
    const id = uuidv4();
    productIds.push(id);
    await db.insert(products).values({
      id,
      ...product,
      status: "Active",
    });
  }
  const counts = {
    Electronics: seedProducts.filter((p) => p.category === "Electronics").length,
    Accessories: seedProducts.filter((p) => p.category === "Accessories").length,
    "Home & Living": seedProducts.filter((p) => p.category === "Home & Living").length,
    Fashion: seedProducts.filter((p) => p.category === "Fashion").length,
  };
  console.log(`  Electronics: ${counts.Electronics}`);
  console.log(`  Accessories: ${counts.Accessories}`);
  console.log(`  Home & Living: ${counts["Home & Living"]}`);
  console.log(`  Fashion: ${counts.Fashion}\n`);

  // ── Addresses ──
  console.log("Creating addresses...");
  const address1Id = uuidv4();
  const address2Id = uuidv4();
  await db.insert(addresses).values({
    id: address1Id,
    userId,
    label: "Home",
    firstName: "Demo",
    lastName: "User",
    email: "demo@example.com",
    phone: "(555) 123-4567",
    address: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    isDefault: true,
  });
  await db.insert(addresses).values({
    id: address2Id,
    userId,
    label: "Work",
    firstName: "Demo",
    lastName: "User",
    email: "demo@company.com",
    phone: "(555) 987-6543",
    address: "456 Office Boulevard, Suite 200",
    city: "New York",
    state: "NY",
    zip: "10002",
    country: "United States",
    isDefault: false,
  });
  console.log("  2 addresses created.\n");

  // ── Orders + Order Items ──
  console.log("Creating orders...");

  const now = new Date();

  // Helper to pick product IDs by category
  const pickByCategory = (category: string, count: number) => {
    const ids = seedProducts
      .map((p, i) => ({ p, id: productIds[i] }))
      .filter(({ p }) => p.category === category && p.stock > 0)
      .slice(0, count);
    return ids;
  };

  const shippingInfo = JSON.stringify({
    firstName: "Demo",
    lastName: "User",
    address: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
  });

  // Order 1: Pending, COD
  const orderId1 = uuidv4();
  const pendingItems = pickByCategory("Electronics", 2);
  const pendingTotal = pendingItems.reduce(
    (sum, { p }) => sum + p.price * 1,
    0
  );
  await db.insert(orders).values({
    id: orderId1,
    userId,
    status: "Pending",
    total: pendingTotal + (pendingTotal > 100 ? 0 : 9.99) + pendingTotal * 0.08,
    shippingAddress: shippingInfo,
    paymentStatus: "Pending",
    paymentMethod: "cod",
    createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
  });
  for (const { p, id: prodId } of pendingItems) {
    await db.insert(orderItems).values({
      id: uuidv4(),
      orderId: orderId1,
      productId: prodId,
      quantity: 1,
      unitPrice: p.price,
      selectedColor: null,
      selectedSize: null,
    });
  }
  console.log(`  Order 1: Pending (COD) — ${pendingItems.length} items`);

  // Order 2: Processing, Stripe
  const orderId2 = uuidv4();
  const processingItems = pickByCategory("Accessories", 3);
  const processTotal = processingItems.reduce(
    (sum, { p }) => sum + p.price * 1,
    0
  );
  await db.insert(orders).values({
    id: orderId2,
    userId,
    status: "Processing",
    total: processTotal + (processTotal > 100 ? 0 : 9.99) + processTotal * 0.08,
    shippingAddress: shippingInfo,
    paymentStatus: "Paid",
    paymentMethod: "stripe",
    createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
  });
  for (const { p, id: prodId } of processingItems) {
    await db.insert(orderItems).values({
      id: uuidv4(),
      orderId: orderId2,
      productId: prodId,
      quantity: 1,
      unitPrice: p.price,
      selectedColor: null,
      selectedSize: null,
    });
  }
  console.log(`  Order 2: Processing (Stripe) — ${processingItems.length} items`);

  // Order 3: Shipped, COD, with tracking
  const orderId3 = uuidv4();
  const shippedItems = pickByCategory("Fashion", 1);
  const shipTotal = shippedItems.reduce((sum, { p }) => sum + p.price * 2, 0);
  await db.insert(orders).values({
    id: orderId3,
    userId,
    status: "Shipped",
    total: shipTotal + (shipTotal > 100 ? 0 : 9.99) + shipTotal * 0.08,
    shippingAddress: shippingInfo,
    paymentStatus: "Paid",
    paymentMethod: "cod",
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
  });
  for (const { p, id: prodId } of shippedItems) {
    await db.insert(orderItems).values({
      id: uuidv4(),
      orderId: orderId3,
      productId: prodId,
      quantity: 2,
      unitPrice: p.price,
      selectedColor: null,
      selectedSize: "M",
    });
  }
  console.log(`  Order 3: Shipped (COD, UPS) — ${shippedItems.length} item, qty 2`);

  // Order 4: Delivered, Stripe, with tracking
  const orderId4 = uuidv4();
  const deliveredItems = [
    ...pickByCategory("Home & Living", 1),
    ...pickByCategory("Accessories", 1),
  ];
  const delTotal = deliveredItems.reduce(
    (sum, { p }) => sum + p.price * 1,
    0
  );
  await db.insert(orders).values({
    id: orderId4,
    userId,
    status: "Delivered",
    total: delTotal + (delTotal > 100 ? 0 : 9.99) + delTotal * 0.08,
    shippingAddress: shippingInfo,
    paymentStatus: "Paid",
    paymentMethod: "stripe",
    trackingNumber: "1Z999AA10123456785",
    carrier: "UPS",
    createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
  });
  for (const { p, id: prodId } of deliveredItems) {
    await db.insert(orderItems).values({
      id: uuidv4(),
      orderId: orderId4,
      productId: prodId,
      quantity: 1,
      unitPrice: p.price,
      selectedColor: null,
      selectedSize: null,
    });
  }
  console.log(`  Order 4: Delivered (Stripe, UPS) — ${deliveredItems.length} items\n`);

  // ── Reviews ──
  console.log("Creating reviews...");
  const reviewData = [
    { productIdx: 0, rating: 5, title: "Best earbuds ever!", body: "The sound quality is outstanding and the noise cancellation works perfectly. Battery life is incredible." },
    { productIdx: 0, rating: 4, title: "Great but pricey", body: "Amazing sound but a bit expensive. The spatial audio is a game changer though." },
    { productIdx: 2, rating: 5, title: "Perfect typing experience", body: "Cherry MX Blue switches feel amazing. The aluminum frame gives it a premium feel." },
    { productIdx: 2, rating: 4, title: "Great keyboard", body: "RGB is beautiful and the build quality is solid. Only wish it came with USB-C cable included." },
    { productIdx: 7, rating: 5, title: "Worth every penny", body: "The noise cancellation is incredible. I use these for my daily commute and they block out everything." },
    { productIdx: 7, rating: 4, title: "Almost perfect", body: "Sound quality is top notch. Just wish the ear cups were a bit larger for my ears." },
    { productIdx: 10, rating: 5, title: "Beautiful watch", body: "The minimalist design goes with everything. Sapphire glass is scratch-free after months of wear." },
    { productIdx: 14, rating: 5, title: "Best backpack I've owned", body: "Took this on a 2-week trip to Europe and it held up perfectly. The anti-theft features give peace of mind." },
    { productIdx: 19, rating: 4, title: "Nice mugs", body: "Good quality stoneware. They keep coffee warm for a reasonable time. Love the matte finish." },
    { productIdx: 23, rating: 5, title: "Classic jacket", body: "Fits perfectly and the denim quality is excellent. Already getting compliments on it." },
    { productIdx: 24, rating: 5, title: "Incredibly soft", body: "This cashmere sweater is worth every cent. So soft and warm. True to size." },
    { productIdx: 26, rating: 4, title: "Sharp looking coat", body: "The wool quality is excellent and the tailoring is perfect. It's quite heavy though." },
  ];

  for (const r of reviewData) {
    await db.insert(reviews).values({
      id: uuidv4(),
      productId: productIds[r.productIdx],
      userId,
      rating: r.rating,
      title: r.title,
      body: r.body,
      createdAt: new Date(now.getTime() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    });
  }
  console.log(`  ${reviewData.length} reviews created.\n`);

  // ── Store Settings ──
  console.log("Creating store settings...");
  await db.insert(storeSettings).values({
    id: "main",
    storeName: "Borrow",
    supportEmail: "support@borrow.com",
    shippingThreshold: 100,
    shippingRate: 9.99,
    taxRate: 0.08,
    currency: "USD",
  });
  console.log("  Default settings created.\n");

  // ── Summary ──
  console.log("═══════════════════════════");
  console.log("  Seed complete!");
  console.log("═══════════════════════════");
  console.log(`  Products:    ${seedProducts.length}`);
  console.log(`  Users:       1 (demo@example.com / password123)`);
  console.log(`  Addresses:   2`);
  console.log(`  Orders:      4 (Pending / Processing / Shipped / Delivered)`);
  console.log(`  Reviews:     ${reviewData.length}`);
  console.log(`  Settings:    1 (default store config)`);
  console.log("═══════════════════════════");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
