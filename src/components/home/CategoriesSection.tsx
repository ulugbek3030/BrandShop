import Link from 'next/link';
import { categories } from '@/lib/mock-data';

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
            <div className="w-full h-[192px] rounded-xl overflow-hidden relative bg-[#131313]">
              <img
                src={cat.image_url}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: 'linear-gradient(180deg, rgba(191,129,255,0.3) 0%, rgba(191,129,255,0.05) 100%)',
                }}
              />
            </div>
            <p className="mt-3 text-sm font-heading text-white uppercase tracking-wide group-hover:text-[#e9ffb9] transition-colors">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
