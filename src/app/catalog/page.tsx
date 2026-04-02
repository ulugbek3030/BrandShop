'use client';

import ShopLayout from '@/components/layout/ShopLayout';
import FilterBar from '@/components/catalog/FilterBar';
import ProductGrid from '@/components/catalog/ProductGrid';

export default function CatalogPage() {
  return (
    <ShopLayout>
      <div className="pt-8">
        <FilterBar />
        <ProductGrid />
      </div>
    </ShopLayout>
  );
}
