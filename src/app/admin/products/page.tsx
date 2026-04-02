'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { products, categories } from '@/lib/mock-data';

const getCategoryName = (categoryId: string) => {
  return categories.find((c) => c.id === categoryId)?.name ?? '—';
};

export default function AdminProducts() {
  const [search, setSearch] = useState('');

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Товары</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-[#e9ffb9] text-black px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#d6f090] transition-colors"
        >
          <Plus size={16} />
          Добавить товар
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#adaaaa]"
        />
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1a1919] border border-[rgba(72,72,71,0.2)] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-[#adaaaa] outline-none focus:border-[#e9ffb9]/40 transition-colors"
        />
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-[#131313] rounded-2xl border border-[rgba(72,72,71,0.15)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(72,72,71,0.2)]">
              <th className="text-left text-xs font-medium text-[#adaaaa] uppercase tracking-wider px-5 py-3">
                Товар
              </th>
              <th className="text-left text-xs font-medium text-[#adaaaa] uppercase tracking-wider px-5 py-3">
                Категория
              </th>
              <th className="text-left text-xs font-medium text-[#adaaaa] uppercase tracking-wider px-5 py-3">
                Цена
              </th>
              <th className="text-left text-xs font-medium text-[#adaaaa] uppercase tracking-wider px-5 py-3">
                Остаток
              </th>
              <th className="text-left text-xs font-medium text-[#adaaaa] uppercase tracking-wider px-5 py-3">
                Статус
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr
                key={product.id}
                className="border-b border-[rgba(72,72,71,0.1)] hover:bg-[#1a1919]/50 transition-colors cursor-pointer"
              >
                <td className="px-5 py-3">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#1a1919] flex-shrink-0 overflow-hidden">
                      {product.images[0] && (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-[#adaaaa]">{product.slug}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-5 py-3 text-sm text-[#adaaaa]">
                  {getCategoryName(product.category_id)}
                </td>
                <td className="px-5 py-3 text-sm font-medium">
                  {product.price.toLocaleString('ru-RU')} сум
                </td>
                <td className="px-5 py-3 text-sm">
                  <span
                    className={
                      product.stock <= 10
                        ? 'text-red-400'
                        : 'text-[#adaaaa]'
                    }
                  >
                    {product.stock} шт
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-1.5">
                    {product.is_new && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e9ffb9]/15 text-[#e9ffb9]">
                        NEW
                      </span>
                    )}
                    {product.is_limited && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#bf81ff]/15 text-[#bf81ff]">
                        LTD
                      </span>
                    )}
                    {product.is_bestseller && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-400/15 text-yellow-400">
                        BEST
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout */}
      <div className="md:hidden space-y-3">
        {filtered.map((product) => (
          <Link
            key={product.id}
            href={`/admin/products/${product.id}/edit`}
            className="block bg-[#131313] rounded-xl p-4 border border-[rgba(72,72,71,0.15)] active:bg-[#1a1919] transition-colors"
          >
            <div className="flex gap-3">
              <div className="w-14 h-14 rounded-lg bg-[#1a1919] flex-shrink-0 overflow-hidden">
                {product.images[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-sm font-semibold text-[#e9ffb9] whitespace-nowrap">
                    {product.price.toLocaleString('ru-RU')} сум
                  </p>
                </div>
                <p className="text-xs text-[#adaaaa] mt-0.5">
                  {getCategoryName(product.category_id)} &middot; {product.stock} шт
                </p>
                <div className="flex gap-1.5 mt-2">
                  {product.is_new && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e9ffb9]/15 text-[#e9ffb9]">
                      NEW
                    </span>
                  )}
                  {product.is_limited && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#bf81ff]/15 text-[#bf81ff]">
                      LTD
                    </span>
                  )}
                  {product.is_bestseller && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-400/15 text-yellow-400">
                      BEST
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[#adaaaa]">
          <p>Товары не найдены</p>
        </div>
      )}
    </div>
  );
}
