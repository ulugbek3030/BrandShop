import { NextRequest, NextResponse } from 'next/server';
import { createPayment } from '@/lib/click-uz';
import type { CartItem } from '@/types';

interface CreatePaymentBody {
  items: CartItem[];
  email: string;
  phone: string;
  promoCode?: string;
}

const SHIPPING_COST = 12; // flat rate in USD
const TAX_RATE = 0.08; // 8 %

export async function POST(request: NextRequest) {
  try {
    const body: CreatePaymentBody = await request.json();
    const { items, email, phone, promoCode } = body;

    // ---- basic validation ---------------------------------------------------
    if (!items?.length) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 },
      );
    }
    if (!email || !phone) {
      return NextResponse.json(
        { error: 'Email and phone are required' },
        { status: 400 },
      );
    }

    // ---- calculate totals ---------------------------------------------------
    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    let discount = 0;
    // TODO: look up promo code in DB and apply discount
    if (promoCode) {
      // placeholder – replace with real lookup
      discount = 0;
    }

    const discountedSubtotal = subtotal - discount;
    const tax = parseFloat((discountedSubtotal * TAX_RATE).toFixed(2));
    const total = parseFloat(
      (discountedSubtotal + SHIPPING_COST + tax).toFixed(2),
    );

    // ---- create order record ------------------------------------------------
    // TODO: persist to Supabase `orders` table
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    // ---- generate Click.uz payment URL --------------------------------------
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
    const returnUrl = `${baseUrl}/order/confirmation?orderId=${orderId}`;

    const payment = createPayment(orderId, total, returnUrl);

    return NextResponse.json({
      paymentUrl: payment.paymentUrl,
      orderId,
    });
  } catch (error) {
    console.error('[payment/create] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
