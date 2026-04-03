import Link from 'next/link';
import { products } from '@/lib/mock-data';

export default function TrendingSection() {
  const trendingProducts = products.filter((p) => p.is_bestseller || p.is_limited).slice(0, 4);

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

      <div className="flex flex-col gap-4">
        {featured && (
          <Link
            href={`/product/${featured.slug}`}
            className="relative w-full h-[420px] rounded-2xl overflow-hidden group"
            style={{ backgroundColor: '#131313' }}
          >
            {featured.images?.[0] ? (
              <img src={featured.images[0]} alt={featured.name} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#131313]" />
            )}
            <div
              className="absolute bottom-0 left-0 right-0 h-1/2"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-white uppercase group-hover:text-[#e9ffb9] transition-colors">
                {featured.name}
              </h3>
              <p className="text-sm mt-1 line-clamp-2" style={{ color: '#adaaaa' }}>
                {featured.description}
              </p>
            </div>
            {featured.is_bestseller && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: 'rgba(187,253,0,0.15)', color: '#bbfd00' }}>
                Бестселлер
              </div>
            )}
          </Link>
        )}

        <div className="grid grid-cols-3 gap-4">
          {rest.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="relative h-[200px] rounded-xl overflow-hidden group"
              style={{ backgroundColor: '#131313' }}
            >
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#131313]" />
              )}
              <div
                className="absolute bottom-0 left-0 right-0 h-2/3"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-xs font-bold font-[family-name:var(--font-space-grotesk)] text-white uppercase leading-tight group-hover:text-[#e9ffb9] transition-colors">
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
