-- ============================================================
-- E-Commerce Order Management — Database Schema
-- Compatible with PostgreSQL / Neon DB
-- Run this once after creating your Neon database
-- ============================================================

-- ─── PRODUCTS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id          SERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  description TEXT,
  price       NUMERIC     NOT NULL CHECK (price >= 0),
  image       TEXT,
  stock       INT         NOT NULL DEFAULT 1 CHECK (stock >= 0),
  created_at  TIMESTAMP   NOT NULL DEFAULT NOW()
);

-- ─── ORDERS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id            SERIAL PRIMARY KEY,
  product_id    INT         NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  customer_name TEXT        NOT NULL,
  phone         TEXT        NOT NULL,
  address       TEXT        NOT NULL,
  quantity      INT         NOT NULL DEFAULT 1 CHECK (quantity >= 1),
  status        TEXT        NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending', 'confirmed', 'delivered')),
  created_at    TIMESTAMP   NOT NULL DEFAULT NOW()
);

-- ─── INDEXES ───────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_orders_product_id ON orders(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_status     ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- ─── SEED DATA (optional, remove in production) ────────────
INSERT INTO products (name, description, price, image, stock) VALUES
  (
    'Wireless Noise-Cancelling Headphones',
    'Premium over-ear headphones with 40-hour battery life and active noise cancellation.',
    4999.00,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    50
  ),
  (
    'Mechanical Keyboard — TKL',
    'Tenkeyless layout with Cherry MX Brown switches. RGB backlit. Compact and fast.',
    3200.00,
    'https://images.unsplash.com/photo-1563884072595-24d063f15bce?w=600',
    30
  ),
  (
    'Minimalist Leather Wallet',
    'Slim bifold wallet in genuine leather. Holds up to 8 cards and cash.',
    890.00,
    'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600',
    100
  );
