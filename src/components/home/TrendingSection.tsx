import Link from 'next/link';
import { products } from '@/lib/mock-data';

export default function TrendingSection() {
  const trendingProducts = products.filter((p) => p.is_bestseller || p.is_limited).slice(0, 4);

  // Pad with other products if not enough
  while (trendingProducts.length < 4) {
    const next = products.find((p) => !trendingProducts.includes(p));
    if (next) trendingProducts.push(next);
    else break;
  }

  const [featured, ...rest] = trendingProducts;

  return (
    <section className="mx-auto max-w-2xl w-full px-6">
      <h2 className="text-4xl font-bold font-heading text-white mb-8">
        В тренде
      </h2>

      {/* Bento grid */}
      <div className="flex flex-col gap-4">
        {/* Featured large card */}
        {featured && (
          <Link
            href={`/product/${featured.slug}`}
            className="relative w-full h-[420px] rounded-2xl overflow-hidden group"
            style={{ backgroundColor: '#131313' }}
          >
            {/* Gradient bg placeholder */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 80% 60% at 60% 40%, rgba(191,129,255,0.12) 0%, transparent 60%),
                  radial-gradient(ellipse 50% 40% at 30% 70%, rgba(233,255,185,0.05) 0%, transparent 50%),
                  linear-gradient(135deg, #1a1a2e 0%, #131313 100%)
                `,
              }}
            />
            {/* Placeholder initial */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-heading text-white/5 uppercase">
                {featured.name.charAt(0)}
              </span>
            </div>
            {/* Gradient overlay at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1/2"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
              }}
            />
            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-white uppercase group-hover:text-accent-lime transition-colors">
                {featured.name}
              </h3>
              <p className="text-sm mt-1" style={{ color: '#adaaaa' }}>
                {featured.description}
              </p>
            </div>
            {/* Bestseller badge */}
            {featured.is_bestseller && (
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: 'rgba(187,253,0,0.15)',
                  color: '#bbfd00',
                }}
              >
                Бестселлер
              </div>
            )}
          </Link>
        )}

        {/* Three smaller cards */}
        <div className="grid grid-cols-3 gap-4">
          {rest.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="relative h-[200px] rounded-xl overflow-hidden group"
              style={{ backgroundColor: '#131313' }}
            >
              {/* Gradient placeholder */}
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(ellipse 70% 50% at 50% 50%, rgba(191,129,255,0.06) 0%, transparent 70%),
                    linear-gradient(180deg, #1a1a1a 0%, #131313 100%)
                  `,
                }}
              />
              {/* Placeholder initial */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-heading text-white/5 uppercase">
                  {product.name.charAt(0)}
                </span>
              </div>
              {/* Gradient overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 h-2/3"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                }}
              />
              {/* Name */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-xs font-bold font-[family-name:var(--font-space-grotesk)] text-white uppercase leading-tight group-hover:text-accent-lime transition-colors">
                  {product.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
