'use client';

import { SlidersHorizontal } from 'lucide-react';

const filters = [
  { label: 'Фильтр', icon: true },
  { label: 'Размер' },
  { label: 'Стиль' },
  { label: 'Цена' },
];

export default function FilterBar() {
  return (
    <div
      className="sticky top-16 z-40 backdrop-blur-xl"
      style={{ backgroundColor: 'rgba(14,14,14,0.95)' }}
    >
      <div className="mx-auto max-w-2xl px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f.label}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border px-6 py-2.5 text-xs uppercase tracking-widest text-white transition-colors hover:border-[#737373]"
              style={{
                backgroundColor: '#1a1919',
                borderColor: 'rgba(72,72,71,0.2)',
              }}
            >
              {f.icon && <SlidersHorizontal className="h-3.5 w-3.5" />}
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
