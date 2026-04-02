'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, Heart, ShoppingBag } from 'lucide-react';
import ShopLayout from '@/components/layout/ShopLayout';
import { useCartStore } from '@/store/cart';
import { products } from '@/lib/mock-data';

function formatPrice(price: number) {
  if (price >= 1000) {
    return price.toLocaleString('ru-RU') + ' сум';
  }
  return '$' + price;
}

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const subtotal = useCartStore((s) => s.subtotal());
  const totalItems = useCartStore((s) => s.totalItems());
  const [promoCode, setPromoCode] = useState('');

  const shipping = 12;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  // Upsell products: pick 2 products not already in cart
  const cartProductIds = items.map((i) => i.product.id);
  const upsellProducts = products
    .filter((p) => !cartProductIds.includes(p.id))
    .slice(0, 2);

  if (items.length === 0) {
    return (
      <ShopLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
          <ShoppingBag
            className="w-16 h-16 mb-4"
            style={{ color: '#737373' }}
          />
          <h1
            className="text-3xl text-white mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Корзина пуста
          </h1>
          <p className="text-sm mb-6" style={{ color: '#adaaaa' }}>
            Добавьте товары, чтобы продолжить
          </p>
          <Link
            href="/catalog"
            className="rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-widest transition-transform active:scale-95"
            style={{ backgroundColor: '#bbfd00', color: '#0e0e0e' }}
          >
            В каталог
          </Link>
        </div>
      </ShopLayout>
    );
  }

  return (
    <ShopLayout>
      <div className="px-4 pt-8 pb-28">
        {/* Heading */}
        <div className="mb-6">
          <h1
            className="text-3xl text-white"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            МОЯ КОРЗИНА
          </h1>
          <p
            className="text-xs uppercase tracking-widest mt-1"
            style={{ color: '#737373' }}
          >
            Выбрано товаров: {totalItems}
          </p>
        </div>

        {/* Cart Items */}
        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
              className="rounded-xl p-4 flex gap-4"
              style={{ backgroundColor: '#131313' }}
            >
              {/* Thumbnail */}
              <Link
                href={`/product/${item.product.slug}`}
                className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 relative"
                style={{ backgroundColor: '#1a1919' }}
              >
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold uppercase text-white truncate">
                  {item.product.name}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: '#737373' }}>
                  {item.selectedColor} / {item.selectedSize}
                </p>
                <p
                  className="text-sm font-bold mt-1"
                  style={{ color: '#e9ffb9' }}
                >
                  {formatPrice(item.product.price)}
                </p>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity controls */}
                  <div
                    className="flex items-center rounded-full"
                    style={{ backgroundColor: '#1a1919' }}
                  >
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedSize,
                          item.selectedColor,
                          item.quantity - 1
                        )
                      }
                      className="w-9 h-9 flex items-center justify-center"
                    >
                      <Minus className="w-3.5 h-3.5 text-white" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedSize,
                          item.selectedColor,
                          item.quantity + 1
                        )
                      }
                      className="w-9 h-9 flex items-center justify-center"
                    >
                      <Plus className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>

                  {/* Action icons */}
                  <div className="flex gap-2">
                    <button
                      className="w-9 h-9 flex items-center justify-center rounded-full"
                      style={{ backgroundColor: '#1a1919' }}
                    >
                      <Heart className="w-4 h-4" style={{ color: '#737373' }} />
                    </button>
                    <button
                      onClick={() =>
                        removeItem(
                          item.product.id,
                          item.selectedSize,
                          item.selectedColor
                        )
                      }
                      className="w-9 h-9 flex items-center justify-center rounded-full"
                      style={{ backgroundColor: '#1a1919' }}
                    >
                      <Trash2 className="w-4 h-4" style={{ color: '#737373' }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo code */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Промокод"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 rounded-xl px-4 py-3 text-sm text-white placeholder-[#737373] outline-none border"
            style={{
              backgroundColor: '#1a1919',
              borderColor: 'rgba(72,72,71,0.2)',
            }}
          />
          <button
            className="rounded-xl px-5 py-3 text-xs font-semibold uppercase tracking-widest transition-transform active:scale-95"
            style={{ backgroundColor: '#bf81ff', color: '#fff' }}
          >
            Применить
          </button>
        </div>

        {/* Order summary */}
        <div
          className="relative overflow-hidden rounded-2xl p-6"
          style={{ backgroundColor: '#131313' }}
        >
          {/* Decorative blur */}
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: '#bf81ff' }}
          />

          <h2 className="text-xs uppercase tracking-widest text-white mb-4">
            Сумма заказа
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: '#adaaaa' }}>
                Подытог
              </span>
              <span className="text-sm text-white">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: '#adaaaa' }}>
                Доставка
              </span>
              <span className="text-sm text-white">
                {formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: '#adaaaa' }}>
                Налог (8%)
              </span>
              <span className="text-sm text-white">
                {formatPrice(Math.round(tax * 100) / 100)}
              </span>
            </div>
            <div
              className="border-t pt-4 mt-4"
              style={{ borderColor: 'rgba(72,72,71,0.15)' }}
            >
              <div className="flex items-end justify-between">
                <span className="text-xs uppercase tracking-widest" style={{ color: '#adaaaa' }}>
                  Итого
                </span>
                <span
                  className="text-5xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                >
                  {formatPrice(Math.round(total * 100) / 100)}
                </span>
              </div>
            </div>
          </div>

          {/* Pay button */}
          <button
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-full py-4 text-sm font-bold uppercase tracking-wider transition-transform active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #e9ffb9, #bbfd00)',
              color: '#0e0e0e',
              boxShadow: '0 4px 25px rgba(187,253,0,0.3)',
            }}
          >
            Оплатить через Click
          </button>
        </div>

        {/* Upsell section */}
        {upsellProducts.length > 0 && (
          <div className="mt-10">
            <h2
              className="text-2xl text-white mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Дополните образ
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {upsellProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="block"
                >
                  <div
                    className="overflow-hidden rounded-xl"
                    style={{ backgroundColor: '#131313' }}
                  >
                    <div className="aspect-[3/4] relative">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 672px) 50vw, 336px"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-medium uppercase text-white truncate">
                        {p.name}
                      </h3>
                      <p className="text-xs mt-1" style={{ color: '#9c42f4' }}>
                        {formatPrice(p.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </ShopLayout>
  );
}
