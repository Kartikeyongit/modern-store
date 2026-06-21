import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "timestamp" }),
  image: text("image"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const addresses = sqliteTable("addresses", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  label: text("label").default("Home"),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  country: text("country").default("United States"),
  isDefault: integer("is_default", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  compareAtPrice: real("compare_at_price"),
  category: text("category").notNull(),
  images: text("images").notNull(), // JSON string of URLs
  rating: real("rating").default(4.5),
  reviewCount: integer("review_count").default(0),
  isNew: integer("is_new", { mode: "boolean" }).default(false),
  isSale: integer("is_sale", { mode: "boolean" }).default(false),
  stock: integer("stock").default(0),
  status: text("status").default("Active"),
  colors: text("colors"), // JSON string of [{name, hex}]
  sizes: text("sizes"), // JSON string of ["S","M","L","XL"]
  details: text("details"), // JSON string of [{label, value}]
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  status: text("status").default("Pending"),
  total: real("total").notNull(),
  shippingAddress: text("shipping_address"),
  paymentStatus: text("payment_status").default("Pending"),
  paymentMethod: text("payment_method").default("stripe"),
  trackingNumber: text("tracking_number"),
  carrier: text("carrier"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const orderItems = sqliteTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id").references(() => orders.id),
  productId: text("product_id").references(() => products.id),
  quantity: integer("quantity").notNull(),
  unitPrice: real("unit_price").notNull(),
  selectedColor: text("selected_color"),
  selectedSize: text("selected_size"),
});

export const reviews = sqliteTable("reviews", {
  id: text("id").primaryKey(),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  title: text("title"),
  body: text("body").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refreshToken: text("refresh_token"),
  accessToken: text("access_token"),
  expiresAt: integer("expires_at"),
  tokenType: text("token_type"),
  scope: text("scope"),
  idToken: text("id_token"),
  sessionState: text("session_state"),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  sessionToken: text("session_token").notNull().unique(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp" }).notNull(),
});

export const verificationTokens = sqliteTable("verification_tokens", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull().unique(),
  expires: integer("expires", { mode: "timestamp" }).notNull(),
});

export const storeSettings = sqliteTable("store_settings", {
  id: text("id").primaryKey(),
  storeName: text("store_name").notNull().default("Borrow"),
  supportEmail: text("support_email").notNull().default("support@borrow.com"),
  shippingThreshold: real("shipping_threshold").notNull().default(100),
  shippingRate: real("shipping_rate").notNull().default(9.99),
  taxRate: real("tax_rate").notNull().default(0.08),
  currency: text("currency").notNull().default("USD"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

import { relations } from "drizzle-orm";

export const ordersRelations = relations(orders, ({ many, one }) => ({
  items: many(orderItems),
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  reviews: many(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));