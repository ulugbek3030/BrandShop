-- ==========================================================================
-- CLICK.UZ BrandShop – Supabase schema
-- ==========================================================================

-- ---------- Custom types ---------------------------------------------------

CREATE TYPE order_status AS ENUM (
  'new',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
);

-- ---------- Categories -----------------------------------------------------

CREATE TABLE categories (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  slug       text NOT NULL UNIQUE,
  image_url  text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ---------- Products -------------------------------------------------------

CREATE TABLE products (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  slug          text NOT NULL UNIQUE,
  description   text NOT NULL DEFAULT '',
  price         numeric(10,2) NOT NULL DEFAULT 0,
  category_id   uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  images        text[] NOT NULL DEFAULT '{}',
  sizes         text[] NOT NULL DEFAULT '{}',
  colors        jsonb[] NOT NULL DEFAULT '{}',
  material      text NOT NULL DEFAULT '',
  fit           text NOT NULL DEFAULT '',
  is_new        boolean NOT NULL DEFAULT false,
  is_limited    boolean NOT NULL DEFAULT false,
  is_bestseller boolean NOT NULL DEFAULT false,
  stock         integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);

-- ---------- Orders ---------------------------------------------------------

CREATE TABLE orders (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email     text NOT NULL,
  user_phone     text NOT NULL,
  items          jsonb NOT NULL DEFAULT '[]',
  subtotal       numeric(10,2) NOT NULL DEFAULT 0,
  shipping       numeric(10,2) NOT NULL DEFAULT 0,
  tax            numeric(10,2) NOT NULL DEFAULT 0,
  total          numeric(10,2) NOT NULL DEFAULT 0,
  promo_code     text,
  status         order_status NOT NULL DEFAULT 'new',
  payment_id     text,
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- ---------- Promo codes ----------------------------------------------------

CREATE TABLE promo_codes (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code             text NOT NULL UNIQUE,
  discount_percent integer NOT NULL DEFAULT 0 CHECK (discount_percent BETWEEN 0 AND 100),
  is_active        boolean NOT NULL DEFAULT true,
  expires_at       timestamptz NOT NULL,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- ---------- Newsletter subscribers -----------------------------------------

CREATE TABLE newsletter_subscribers (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ==========================================================================
-- Row-Level Security (RLS)
-- ==========================================================================

ALTER TABLE categories           ENABLE ROW LEVEL SECURITY;
ALTER TABLE products             ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders               ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes          ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public read for products & categories (anyone can browse the store)
CREATE POLICY "Public read categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Public read products"
  ON products FOR SELECT
  USING (true);

-- Authenticated admin write for products & categories
CREATE POLICY "Admin insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete categories"
  ON categories FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Admin insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Orders: service role only (created via API routes)
CREATE POLICY "Service insert orders"
  ON orders FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service select orders"
  ON orders FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service update orders"
  ON orders FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Promo codes: public read for validation, admin write
CREATE POLICY "Public read promo codes"
  ON promo_codes FOR SELECT
  USING (true);

CREATE POLICY "Admin manage promo codes"
  ON promo_codes FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Newsletter: anyone can subscribe, admin can read
CREATE POLICY "Public insert newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin read newsletter"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);

-- ==========================================================================
-- Storage bucket for product images
-- ==========================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Admin upload product images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Admin update product images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-images');

CREATE POLICY "Admin delete product images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images');

-- ==========================================================================
-- Seed data – sample categories
-- ==========================================================================

INSERT INTO categories (name, slug, image_url, sort_order) VALUES
  ('T-Shirts',    't-shirts',    '/images/categories/t-shirts.jpg',    1),
  ('Hoodies',     'hoodies',     '/images/categories/hoodies.jpg',     2),
  ('Jackets',     'jackets',     '/images/categories/jackets.jpg',     3),
  ('Pants',       'pants',       '/images/categories/pants.jpg',       4),
  ('Accessories', 'accessories', '/images/categories/accessories.jpg', 5);
