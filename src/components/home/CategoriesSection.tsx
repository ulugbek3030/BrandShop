import Link from 'next/link';
import { categories } from '@/lib/mock-data';

const categoryGradients: Record<string, string> = {
  clothing: 'linear-gradient(135deg, #1a1a2e 0%, #2a1a3e 50%, #1a1a2e 100%)',
  accessories: 'linear-gradient(135deg, #1a2a1e 0%, #1a3a2e 50%, #1a2a1e 100%)',
  bags: 'linear-gradient(135deg, #2a1a1e 0%, #3a1a2e 50%, #2a1a1e 100%)',
  headwear: 'linear-gradient(135deg, #1a1a3e 0%, #2a2a4e 50%, #1a1a3e 100%)',
};

export default function CategoriesSection() {
  return (
    <section className="mx-auto max-w-2xl w-full px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold font-heading text-white">
          Категории
        </h2>
        <Link
          href="/catalog"
          className="text-sm font-medium transition-opacity hover:opacity-80"
          style={{ color: '#e9ffb9' }}
        >
          Смотреть все
        </Link>
      </div>

      {/* Horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/catalog?category=${cat.slug}`}
            className="flex-shrink-0 w-[192px] group"
          >
            {/* Image placeholder */}
            <div
              className="w-full h-[192px] rounded-xl overflow-hidden relative"
              style={{ backgroundColor: '#131313' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: categoryGradients[cat.slug] || categoryGradients.clothing,
                }}
              />
              {/* Purple tint overlay */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'linear-gradient(180deg, rgba(191,129,255,0.3) 0%, rgba(191,129,255,0.05) 100%)',
                }}
              />
              {/* Subtle icon/pattern indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-heading text-white/10 uppercase tracking-widest">
                  {cat.name.charAt(0)}
                </span>
              </div>
            </div>
            {/* Name */}
            <p className="mt-3 text-sm font-heading text-white uppercase tracking-wide group-hover:text-accent-lime transition-colors">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
