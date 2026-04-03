import Link from 'next/link';
import { products } from '@/lib/mock-data';

function formatPrice(price: number): string {
  if (price >= 1000) {
    return price.toLocaleString('ru-RU') + ' сум';
  }
  return '$' + price;
}

export default function NewDropsSection() {
  const newProducts = products.filter((p) => p.is_new);

  return (
    <section className="mx-auto max-w-2xl w-full px-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-5xl font-bold font-heading text-white">
          Новые дропы
        </h2>
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
          style={{ backgroundColor: 'rgba(191,129,255,0.2)', color: '#bf81ff' }}
        >
          ЛИМИТКА
        </span>
      </div>

      {/* Horizontal scroll */}
      <div className="flex gap-8 overflow-x-auto no-scrollbar -mx-6 px-6">
        {newProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="flex-shrink-0 w-[320px] group"
          >
            {/* Image placeholder */}
            <div
              className="relative w-full h-[427px] rounded-xl overflow-hidden"
              style={{ backgroundColor: '#131313' }}
            >
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-heading text-white/5 uppercase">
                    {product.name.charAt(0)}
                  </span>
                </div>
              )}

              {/* Price badge */}
              <div
                className="absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold"
                style={{
                  backgroundColor: '#e9ffb9',
                  color: '#0e0e0e',
                }}
              >
                {formatPrice(product.price)}
              </div>

              {/* Limited badge */}
              {product.is_limited && (
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: 'rgba(191,129,255,0.2)',
                    color: '#bf81ff',
                  }}
                >
                  Limited
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="mt-4">
              <h3 className="text-xl font-bold uppercase font-[family-name:var(--font-space-grotesk)] text-white group-hover:text-accent-lime transition-colors">
                {product.name}
              </h3>
              <p className="mt-1 text-sm" style={{ color: '#adaaaa' }}>
                {product.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
