'use client';

import Header from './Header';
import Footer from './Footer';
import BottomNavBar from './BottomNavBar';

interface ShopLayoutProps {
  children: React.ReactNode;
  hideBottomNav?: boolean;
}

export default function ShopLayout({ children, hideBottomNav = false }: ShopLayoutProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0e0e0e' }}>
      <Header />
      <main className="pt-16 pb-20">{children}</main>
      <Footer />
      {!hideBottomNav && <BottomNavBar />}
    </div>
  );
}
