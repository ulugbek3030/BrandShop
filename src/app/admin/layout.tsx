'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Package,
  ClipboardList,
  Settings,
  Menu,
  X,
  ArrowLeft,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: BarChart3 },
  { href: '/admin/products', label: 'Товары', icon: Package },
  { href: '/admin/orders', label: 'Заказы', icon: ClipboardList },
  { href: '/admin/settings', label: 'Настройки', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-[rgba(72,72,71,0.2)]">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-white">
            CLICK.UZ
          </span>
          <span className="text-[10px] font-semibold tracking-widest uppercase bg-[#bf81ff] text-white px-2 py-0.5 rounded-md">
            Admin
          </span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? 'bg-[#1a1919] text-[#e9ffb9]'
                  : 'text-[#adaaaa] hover:text-white hover:bg-[#1a1919]/50'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[rgba(72,72,71,0.2)]">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-3 text-sm text-[#adaaaa] hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Вернуться в магазин
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#0e0e0e] text-white overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 flex-shrink-0 bg-[#131313] border-r border-[rgba(72,72,71,0.2)] flex-col">
        {sidebar}
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#131313] border-r border-[rgba(72,72,71,0.2)] transform transition-transform md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-5 right-4 text-[#adaaaa] hover:text-white"
        >
          <X size={20} />
        </button>
        {sidebar}
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden flex items-center gap-3 p-4 bg-[#131313] border-b border-[rgba(72,72,71,0.2)]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#adaaaa] hover:text-white"
          >
            <Menu size={22} />
          </button>
          <span className="text-lg font-bold tracking-tight">CLICK.UZ</span>
          <span className="text-[9px] font-semibold tracking-widest uppercase bg-[#bf81ff] text-white px-1.5 py-0.5 rounded">
            Admin
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
