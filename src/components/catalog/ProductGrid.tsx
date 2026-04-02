'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp, ShoppingBag } from 'lucide-react';
import { products } from '@/lib/mock-data';
import { useCartStore } from '@/store/cart';

function formatPrice(price: number) {
  if (price >= 1000) {
    return price.toLocaleString('ru-RU') + ' сум';
  }
  return '$' + price;
}

export default function ProductGrid() {
  const addItem = useCartStore((s) => s.addItem);
  const featuredProduct = products[4]; // Бомбер Neon as featured
  const firstProduct = products[0];
  const gridProducts = products.filter(
    (p) => p.id !== firstProduct.id && p.id !== featuredProduct.id
  );
  const topHalf = gridProducts.slice(0, 3);
  const bottomHalf = gridProducts.slice(3);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="px-4 pb-24">
      {/* Header */}
      <div className="mb-6 pt-4">
        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: '#bf81ff' }}
        >
          Коллекция 24/25
        </p>
        <div className="flex items-baseline gap-3 mt-1">
          <h1 className="text-5xl text-white" style={{ fontFamily: 'Georgia, serif' }}>
            ОДЕЖДА
          </h1>
          <span
            className="text-sm uppercase tracking-widest"
            style={{ color: '#e9ffb9' }}
          >
            / {products.length} товара
          </span>
        </div>
      </div>

      {/* First product - full width hero card */}
      <Link href={`/product/${firstProduct.slug}`} className="block mb-4">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{ backgroundColor: '#131313' }}
        >
          <div className="aspect-[4/5] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={firstProduct.images[0]}
                alt={firstProduct.name}
                fill
                className="object-cover"
                sizes="(max-width: 672px) 100vw, 672px"
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
            {firstProduct.is_new && (
              <span
                className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-widest font-semibold mb-2"
                style={{ backgroundColor: '#bbfd00', color: '#0e0e0e' }}
              >
                New
              </span>
            )}
            <h3 className="text-lg font-semibold uppercase text-white">
              {firstProduct.name}
            </h3>
            <p className="text-sm mt-1" style={{ color: '#9c42f4' }}>
              {formatPrice(firstProduct.price)}
            </p>
          </div>
        </div>
      </Link>

      {/* 2-column grid - top half */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {topHalf.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="block"
          >
            <div
              className="overflow-hidden rounded-xl"
              style={{ backgroundColor: '#131313' }}
            >
              <div className="aspect-[3/4] relative">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 672px) 50vw, 336px"
                />
              </div>
              <div className="p-3">
                {product.is_new && (
                  <span
                    className="inline-block rounded-full px-2 py-0.5 text-[9px] uppercase tracking-widest font-semibold mb-1"
                    style={{ backgroundColor: '#bbfd00', color: '#0e0e0e' }}
                  >
                    New
                  </span>
                )}
                <h3 className="text-xs font-medium uppercase text-white truncate">
                  {product.name}
                </h3>
                <p className="text-xs mt-1" style={{ color: '#9c42f4' }}>
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured bento card */}
      <div
        className="relative overflow-hidden rounded-2xl mb-3 p-6"
        style={{
          background:
            'linear-gradient(135deg, rgba(191,129,255,0.15) 0%, rgba(156,66,244,0.25) 100%)',
          backgroundColor: '#131313',
        }}
      >
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <p
              className="text-[10px] uppercase tracking-widest mb-1"
              style={{ color: '#bf81ff' }}
            >
              Bestseller
            </p>
            <h3 className="text-xl font-bold uppercase text-white mb-1">
              {featuredProduct.name}
            </h3>
            <p className="text-xs mb-4" style={{ color: '#adaaaa' }}>
              {featuredProduct.description}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold" style={{ color: '#e9ffb9' }}>
                {formatPrice(featuredProduct.price)}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addItem(
                    featuredProduct,
                    featuredProduct.sizes[1],
                    featuredProduct.colors[0].name
                  );
                }}
                className="rounded-full px-5 py-2 text-xs uppercase tracking-widest font-semibold transition-transform active:scale-95"
                style={{ backgroundColor: '#bbfd00', color: '#0e0e0e' }}
              >
                В корзину
              </button>
            </div>
          </div>
          <Link
            href={`/product/${featuredProduct.slug}`}
            className="w-28 h-36 rounded-xl overflow-hidden flex-shrink-0 relative"
            style={{ backgroundColor: '#1a1919' }}
          >
            <Image
              src={featuredProduct.images[0]}
              alt={featuredProduct.name}
              fill
              className="object-cover"
              sizes="112px"
            />
          </Link>
        </div>
      </div>

      {/* 2-column grid - bottom half */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {bottomHalf.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="block"
          >
            <div
              className="overflow-hidden rounded-xl"
              style={{ backgroundColor: '#131313' }}
            >
              <div className="aspect-[3/4] relative">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 672px) 50vw, 336px"
                />
              </div>
              <div className="p-3">
                {(product.is_new || product.is_limited) && (
                  <span
                    className="inline-block rounded-full px-2 py-0.5 text-[9px] uppercase tracking-widest font-semibold mb-1"
                    style={{
                      backgroundColor: product.is_limited
                        ? '#bf81ff'
                        : '#bbfd00',
                      color: product.is_limited ? '#fff' : '#0e0e0e',
                    }}
                  >
                    {product.is_limited ? 'Limited' : 'New'}
                  </span>
                )}
                <h3 className="text-xs font-medium uppercase text-white truncate">
                  {product.name}
                </h3>
                <p className="text-xs mt-1" style={{ color: '#9c42f4' }}>
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* End footer */}
      <div className="flex flex-col items-center gap-4 py-8 border-t" style={{ borderColor: 'rgba(72,72,71,0.15)' }}>
        <p className="text-xs uppercase tracking-widest" style={{ color: '#737373' }}>
          Вы дошли до конца
        </p>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold transition-opacity hover:opacity-80"
          style={{ color: '#e9ffb9' }}
        >
          Наверх
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
