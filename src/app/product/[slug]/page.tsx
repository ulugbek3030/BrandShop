'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronUp, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { products } from '@/lib/mock-data';
import { useCartStore } from '@/store/cart';
import ShopLayout from '@/components/layout/ShopLayout';

function formatPrice(price: number) {
  if (price >= 1000) {
    return price.toLocaleString('ru-RU') + ' сум';
  }
  return '$' + price;
}

const accordionSections = [
  {
    title: 'Материалы и уход',
    content:
      'Деликатная стирка при 30 C. Не отбеливать. Сушить в расправленном виде. Гладить при низкой температуре. Не подвергать химической чистке.',
  },
  {
    title: 'Информация о доставке',
    content:
      'Бесплатная доставка по Ташкенту при заказе от 500 000 сум. Доставка по Узбекистану 3-5 рабочих дней. Международная доставка 7-14 рабочих дней.',
  },
  {
    title: 'Устойчивое развитие',
    content:
      'Мы используем экологически чистые материалы и упаковку. Наше производство сертифицировано по стандартам OEKO-TEX.',
  },
];

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const product = products.find((p) => p.slug === slug);
  const addItem = useCartStore((s) => s.addItem);

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <ShopLayout hideBottomNav>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-white text-lg">Товар не найден</p>
        </div>
      </ShopLayout>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category_id === product.category_id)
    .slice(0, 4);

  const handleAddToCart = () => {
    const size = selectedSize || product.sizes[0];
    const color = product.colors[selectedColor].name;
    addItem(product, size, color);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };

  return (
    <ShopLayout hideBottomNav>
      <div className="pb-32">
        {/* Image Gallery */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: 520, backgroundColor: '#131313' }}
        >
          <Image
            src={product.images[activeImage] || product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 672px) 100vw, 672px"
            priority
          />
        </div>

        {/* Dot indicators */}
        {product.images.length > 1 && (
          <div className="flex justify-center gap-2 py-4">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: i === activeImage ? '#e9ffb9' : '#737373',
                  transform: i === activeImage ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        )}

        <div className="px-5 pt-4">
          {/* Product Name & Price */}
          <h1
            className="text-4xl font-bold uppercase text-white leading-tight"
            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
          >
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <span
              className="inline-block rounded-xl px-4 py-2 text-lg font-bold"
              style={{ backgroundColor: '#e9ffb9', color: '#0e0e0e' }}
            >
              {formatPrice(product.price)}
            </span>
            {product.is_limited && (
              <span
                className="rounded-full px-3 py-1 text-[10px] uppercase tracking-widest font-semibold"
                style={{ backgroundColor: '#bf81ff', color: '#fff' }}
              >
                Limited
              </span>
            )}
            {product.is_new && (
              <span
                className="rounded-full px-3 py-1 text-[10px] uppercase tracking-widest font-semibold"
                style={{ backgroundColor: '#bbfd00', color: '#0e0e0e' }}
              >
                New
              </span>
            )}
          </div>

          {/* Material & Fit row */}
          <div className="flex gap-4 mt-4">
            <div
              className="flex-1 rounded-xl px-4 py-3"
              style={{ backgroundColor: '#1a1919' }}
            >
              <p
                className="text-[10px] uppercase tracking-widest mb-0.5"
                style={{ color: '#737373' }}
              >
                Материал
              </p>
              <p className="text-xs text-white font-medium">{product.material}</p>
            </div>
            <div
              className="flex-1 rounded-xl px-4 py-3"
              style={{ backgroundColor: '#1a1919' }}
            >
              <p
                className="text-[10px] uppercase tracking-widest mb-0.5"
                style={{ color: '#737373' }}
              >
                Посадка
              </p>
              <p className="text-xs text-white font-medium">{product.fit}</p>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm leading-relaxed" style={{ color: '#adaaaa' }}>
            {product.description}
          </p>

          {/* Color selector */}
          {product.colors.length > 0 && (
          <div className="mt-6">
            <p className="text-xs uppercase tracking-widest text-white mb-3">
              Цвет:{' '}
              <span style={{ color: '#adaaaa' }}>
                {product.colors[selectedColor]?.name}
              </span>
            </p>
            <div className="flex gap-3">
              {product.colors.map((color, i) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(i)}
                  className="relative rounded-full transition-all"
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: color.hex,
                    boxShadow:
                      i === selectedColor
                        ? '0 0 0 3px #0e0e0e, 0 0 0 5px #e9ffb9'
                        : 'inset 0 0 0 1px rgba(255,255,255,0.1)',
                  }}
                  aria-label={color.name}
                >
                  {i === selectedColor && (
                    <Check
                      className="absolute inset-0 m-auto w-5 h-5"
                      style={{
                        color:
                          color.hex === '#f5f5f5' || color.hex === '#e9ffb9'
                            ? '#0e0e0e'
                            : '#fff',
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          )}

          {/* Size selector */}
          {product.sizes.length > 0 && (
          <div className="mt-6">
            <p className="text-xs uppercase tracking-widest text-white mb-3">
              Размер
            </p>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="rounded-xl py-3 text-sm font-semibold uppercase transition-all"
                    style={{
                      backgroundColor: isSelected ? '#e9ffb9' : '#1a1919',
                      color: isSelected ? '#0e0e0e' : '#fff',
                      boxShadow: isSelected
                        ? '0 4px 15px rgba(233,255,185,0.3)'
                        : 'none',
                    }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
          )}

          {/* Accordion sections */}
          <div className="mt-8 space-y-0">
            {accordionSections.map((section, i) => (
              <div
                key={section.title}
                className="border-t"
                style={{ borderColor: 'rgba(72,72,71,0.15)' }}
              >
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === i ? null : i)
                  }
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="text-sm font-medium text-white">
                    {section.title}
                  </span>
                  {openAccordion === i ? (
                    <ChevronUp className="h-4 w-4" style={{ color: '#737373' }} />
                  ) : (
                    <ChevronDown className="h-4 w-4" style={{ color: '#737373' }} />
                  )}
                </button>
                {openAccordion === i && (
                  <p
                    className="pb-4 text-sm leading-relaxed"
                    style={{ color: '#adaaaa' }}
                  >
                    {section.content}
                  </p>
                )}
              </div>
            ))}
            <div
              className="border-t"
              style={{ borderColor: 'rgba(72,72,71,0.15)' }}
            />
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div className="mt-10">
              <h2
                className="text-2xl text-white mb-4"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Подобрано для вас
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {relatedProducts.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/product/${rp.slug}`}
                    className="block"
                  >
                    <div
                      className="overflow-hidden rounded-xl"
                      style={{ backgroundColor: '#131313' }}
                    >
                      <div className="aspect-[3/4] relative">
                        <Image
                          src={rp.images[0]}
                          alt={rp.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 672px) 50vw, 336px"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-xs font-medium uppercase text-white truncate">
                          {rp.name}
                        </h3>
                        <p
                          className="text-xs mt-1"
                          style={{ color: '#9c42f4' }}
                        >
                          {formatPrice(rp.price)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{
          backgroundColor: 'rgba(14,14,14,0.95)',
          boxShadow: '0 -4px 30px rgba(0,0,0,0.5)',
        }}
      >
        <div className="mx-auto max-w-2xl flex gap-3 px-5 py-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold uppercase tracking-wider transition-transform active:scale-[0.98]"
            style={{ backgroundColor: '#1a1919', color: '#fff' }}
          >
            {addedToCart ? (
              <>
                <Check className="h-4 w-4" style={{ color: '#bbfd00' }} />
                Добавлено
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                В корзину
              </>
            )}
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold uppercase tracking-wider transition-transform active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #e9ffb9, #bbfd00)',
              color: '#0e0e0e',
              boxShadow: '0 4px 20px rgba(187,253,0,0.3)',
            }}
          >
            Купить сейчас
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </ShopLayout>
  );
}
