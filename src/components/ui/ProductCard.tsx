'use client';

import Link from 'next/link';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  variant?: 'large' | 'small';
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold"
      style={{ backgroundColor: color, color: color === '#bf81ff' || color === '#bbfd00' ? '#0e0e0e' : '#0e0e0e' }}
    >
      {label}
    </span>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' \u0441\u0443\u043c';
}

export default function ProductCard({ product, variant = 'small' }: ProductCardProps) {
  const isLarge = variant === 'large';

  const badge = product.is_new
    ? { label: '\u041d\u043e\u0432\u0438\u043d\u043a\u0430', color: '#bf81ff' }
    : product.is_limited
      ? { label: '\u041b\u0438\u043c\u0438\u0442\u043a\u0430', color: '#bf81ff' }
      : product.is_bestseller
        ? { label: '\u0411\u0435\u0441\u0442\u0441\u0435\u043b\u043b\u0435\u0440', color: '#bbfd00' }
        : null;

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`block ${isLarge ? 'w-full' : 'w-[calc(50%-6px)]'}`}
    >
      {/* Image */}
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          backgroundColor: '#131313',
          height: isLarge ? 430 : 200,
        }}
      >
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(135deg, #1a1919 0%, #131313 50%, #1a1919 100%)',
            }}
          />
        )}
        {badge && <Badge label={badge.label} color={badge.color} />}
      </div>

      {/* Info */}
      <div className="mt-3">
        <h3
          className="text-sm font-medium text-white leading-snug"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          {product.name}
        </h3>
        {isLarge && product.description && (
          <p className="text-xs mt-1 line-clamp-2" style={{ color: '#adaaaa' }}>
            {product.description}
          </p>
        )}
        <p
          className="text-sm font-bold mt-1"
          style={{ color: isLarge ? '#bf81ff' : '#e9ffb9' }}
        >
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
