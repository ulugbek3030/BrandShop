'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid2x2, ShoppingCart, User } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/catalog', label: '\u041a\u0430\u0442\u0430\u043b\u043e\u0433', icon: Grid2x2 },
  { href: '/cart', label: '\u041a\u043e\u0440\u0437\u0438\u043d\u0430', icon: ShoppingCart },
  { href: '/profile', label: '\u041f\u0440\u043e\u0444\u0438\u043b\u044c', icon: User },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl backdrop-blur-xl shadow-[0_-4px_30px_rgba(0,0,0,0.5)]" style={{ backgroundColor: 'rgba(10,10,10,0.8)' }}>
      <div className="mx-auto max-w-2xl flex items-center justify-around px-4 pt-3 pb-6">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 min-w-[60px]"
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${isActive ? '' : ''}`}
                style={
                  isActive
                    ? { background: 'linear-gradient(135deg, #e9ffb9, #bbfd00)' }
                    : undefined
                }
              >
                <Icon
                  className="w-5 h-5"
                  style={{ color: isActive ? '#0e0e0e' : '#737373' }}
                />
              </div>
              <span
                className="text-[10px] uppercase tracking-widest font-medium"
                style={{ color: isActive ? '#e9ffb9' : '#737373' }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
