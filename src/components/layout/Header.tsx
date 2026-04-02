'use client';

import Link from 'next/link';
import { Search, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';

export default function Header() {
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-xl" style={{ backgroundColor: 'rgba(10,10,10,0.8)' }}>
      <div className="mx-auto max-w-2xl h-full px-6 flex items-center justify-between">
        <button className="p-2 -ml-2" aria-label="Search">
          <Search className="w-5 h-5 text-white" />
        </button>

        <Link href="/" className="text-2xl tracking-tighter uppercase font-bold" style={{ color: '#e9ffb9', fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
          CLICK.UZ
        </Link>

        <Link href="/cart" className="relative p-2 -mr-2" aria-label="Cart">
          <ShoppingBag className="w-5 h-5 text-white" />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold leading-none px-1" style={{ backgroundColor: '#bbfd00', color: '#0e0e0e' }}>
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
