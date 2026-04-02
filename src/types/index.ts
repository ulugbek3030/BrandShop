export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  sort_order: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category_id: string;
  category?: Category;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  material: string;
  fit: string;
  is_new: boolean;
  is_limited: boolean;
  is_bestseller: boolean;
  stock: number;
  created_at: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  user_email: string;
  user_phone: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  promo_code: string | null;
  status: OrderStatus;
  payment_id: string | null;
  created_at: string;
}

export type OrderStatus = 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface PromoCode {
  id: string;
  code: string;
  discount_percent: number;
  is_active: boolean;
  expires_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
}
