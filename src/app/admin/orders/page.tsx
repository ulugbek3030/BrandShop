'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Order, OrderStatus } from '@/types';

const mockOrders: Order[] = [
  {
    id: 'ORD-10421',
    user_email: 'alisher@mail.uz',
    user_phone: '+998 90 123 45 67',
    items: [
      {
        product: {
          id: '1', name: 'Худи Cyberpunk V2', slug: 'hoodie-cyberpunk-v2',
          description: '', price: 120, category_id: '1', images: ['/images/hoodie-1.jpg'],
          sizes: ['M'], colors: [{ name: 'Black', hex: '#171717' }],
          material: '', fit: 'Oversize', is_new: true, is_limited: false,
          is_bestseller: false, stock: 50, created_at: '2024-01-01',
        },
        quantity: 2, selectedSize: 'L', selectedColor: 'Space Black',
      },
    ],
    subtotal: 240000, shipping: 25000, tax: 0, total: 265000,
    promo_code: null, status: 'new', payment_id: null, created_at: '2026-04-02T14:32:00',
  },
  {
    id: 'ORD-10420',
    user_email: 'nodira@gmail.com',
    user_phone: '+998 91 234 56 78',
    items: [
      {
        product: {
          id: '7', name: 'Click Signature Tee', slug: 'click-signature-tee',
          description: '', price: 550000, category_id: '1', images: ['/images/sig-tee-1.jpg'],
          sizes: ['M'], colors: [{ name: 'Black', hex: '#171717' }],
          material: '', fit: 'Oversize', is_new: true, is_limited: true,
          is_bestseller: false, stock: 10, created_at: '2024-02-01',
        },
        quantity: 1, selectedSize: 'M', selectedColor: 'Black',
      },
    ],
    subtotal: 550000, shipping: 25000, tax: 0, total: 575000,
    promo_code: 'SPRING10', status: 'processing', payment_id: 'pay_abc123', created_at: '2026-04-02T13:10:00',
  },
  {
    id: 'ORD-10419',
    user_email: 'kamol@inbox.uz',
    user_phone: '+998 93 345 67 89',
    items: [
      {
        product: {
          id: '8', name: 'Utility Tech Tote', slug: 'utility-tech-tote',
          description: '', price: 790000, category_id: '3', images: ['/images/tote-1.jpg'],
          sizes: ['One Size'], colors: [{ name: 'Black', hex: '#171717' }],
          material: '', fit: 'One Size', is_new: true, is_limited: false,
          is_bestseller: false, stock: 20, created_at: '2024-02-05',
        },
        quantity: 1, selectedSize: 'One Size', selectedColor: 'Black',
      },
    ],
    subtotal: 790000, shipping: 0, tax: 0, total: 790000,
    promo_code: null, status: 'shipped', payment_id: 'pay_def456', created_at: '2026-04-02T11:45:00',
  },
  {
    id: 'ORD-10418',
    user_email: 'dilnoza@mail.ru',
    user_phone: '+998 94 456 78 90',
    items: [
      {
        product: {
          id: '4', name: 'Футболка Velocity Graphic', slug: 'tshirt-velocity-graphic',
          description: '', price: 45, category_id: '1', images: ['/images/tshirt-1.jpg'],
          sizes: ['S', 'M'], colors: [{ name: 'Black', hex: '#171717' }],
          material: '', fit: 'Regular', is_new: false, is_limited: true,
          is_bestseller: false, stock: 15, created_at: '2024-01-15',
        },
        quantity: 3, selectedSize: 'S', selectedColor: 'Black',
      },
      {
        product: {
          id: '6', name: 'Кепка Logo Distressed', slug: 'cap-logo-distressed',
          description: '', price: 35, category_id: '4', images: ['/images/cap-1.jpg'],
          sizes: ['One Size'], colors: [{ name: 'Navy', hex: '#1a1a4e' }],
          material: '', fit: 'Adjustable', is_new: false, is_limited: false,
          is_bestseller: false, stock: 40, created_at: '2024-01-25',
        },
        quantity: 1, selectedSize: 'One Size', selectedColor: 'Navy',
      },
    ],
    subtotal: 170000, shipping: 25000, tax: 0, total: 195000,
    promo_code: null, status: 'delivered', payment_id: 'pay_ghi789', created_at: '2026-04-01T22:18:00',
  },
  {
    id: 'ORD-10417',
    user_email: 'javlon@gmail.com',
    user_phone: '+998 95 567 89 01',
    items: [
      {
        product: {
          id: '9', name: 'Vortex Tech Худи 01', slug: 'vortex-tech-hoodie',
          description: '', price: 129, category_id: '1', images: ['/images/vortex-1.jpg'],
          sizes: ['L'], colors: [{ name: 'Volt', hex: '#e9ffb9' }],
          material: '', fit: 'Oversize', is_new: true, is_limited: true,
          is_bestseller: true, stock: 8, created_at: '2024-02-10',
        },
        quantity: 1, selectedSize: 'XL', selectedColor: 'Volt',
      },
    ],
    subtotal: 129000, shipping: 25000, tax: 0, total: 154000,
    promo_code: null, status: 'processing', payment_id: 'pay_jkl012', created_at: '2026-04-01T19:02:00',
  },
  {
    id: 'ORD-10416',
    user_email: 'malika@yahoo.com',
    user_phone: '+998 97 678 90 12',
    items: [
      {
        product: {
          id: '5', name: 'Бомбер Neon', slug: 'bomber-neon',
          description: '', price: 150, category_id: '1', images: ['/images/bomber-1.jpg'],
          sizes: ['M'], colors: [{ name: 'Military', hex: '#4a5d23' }],
          material: '', fit: 'Regular', is_new: false, is_limited: false,
          is_bestseller: false, stock: 20, created_at: '2024-01-20',
        },
        quantity: 1, selectedSize: 'M', selectedColor: 'Military',
      },
    ],
    subtotal: 150000, shipping: 25000, tax: 0, total: 175000,
    promo_code: null, status: 'new', payment_id: null, created_at: '2026-04-01T16:40:00',
  },
  {
    id: 'ORD-10415',
    user_email: 'sardor@mail.uz',
    user_phone: '+998 90 789 01 23',
    items: [
      {
        product: {
          id: '3', name: 'Брюки Карго Orbit', slug: 'cargo-orbit',
          description: '', price: 95, category_id: '1', images: ['/images/cargo-1.jpg'],
          sizes: ['L'], colors: [{ name: 'Olive', hex: '#556B2F' }],
          material: '', fit: 'Relaxed', is_new: false, is_limited: false,
          is_bestseller: false, stock: 25, created_at: '2024-01-10',
        },
        quantity: 2, selectedSize: 'L', selectedColor: 'Olive',
      },
      {
        product: {
          id: '2', name: 'Лонгслив Ghost Knit', slug: 'longsleeve-ghost-knit',
          description: '', price: 65, category_id: '1', images: ['/images/longsleeve-1.jpg'],
          sizes: ['M'], colors: [{ name: 'Phantom', hex: '#2a2a2a' }],
          material: '', fit: 'Regular', is_new: false, is_limited: false,
          is_bestseller: false, stock: 30, created_at: '2024-01-05',
        },
        quantity: 1, selectedSize: 'M', selectedColor: 'Phantom',
      },
    ],
    subtotal: 255000, shipping: 0, tax: 0, total: 255000,
    promo_code: 'FREESHIP', status: 'shipped', payment_id: 'pay_mno345', created_at: '2026-04-01T12:05:00',
  },
];

const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  new: { label: 'Новый', color: 'text-[#bf81ff]', bg: 'bg-[#bf81ff]/15' },
  processing: { label: 'В обработке', color: 'text-yellow-400', bg: 'bg-yellow-400/15' },
  shipped: { label: 'Отправлен', color: 'text-blue-400', bg: 'bg-blue-400/15' },
  delivered: { label: 'Доставлен', color: 'text-green-400', bg: 'bg-green-400/15' },
  cancelled: { label: 'Отменён', color: 'text-red-400', bg: 'bg-red-400/15' },
};

const tabs: { key: string; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'new', label: 'Новые' },
  { key: 'processing', label: 'В обработке' },
  { key: 'shipped', label: 'Отправлены' },
  { key: 'delivered', label: 'Доставлены' },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminOrders() {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [orders, setOrders] = useState(mockOrders);

  const filtered =
    activeTab === 'all'
      ? orders
      : orders.filter((o) => o.status === activeTab);

  const changeStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Заказы</h1>

      {/* Filter tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? 'bg-[#1a1919] text-[#e9ffb9]'
                : 'text-[#adaaaa] hover:text-white hover:bg-[#1a1919]/50'
            }`}
          >
            {tab.label}
            {tab.key !== 'all' && (
              <span className="ml-1.5 text-xs opacity-60">
                {orders.filter((o) => o.status === tab.key).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.map((order) => {
          const st = statusConfig[order.status];
          const isExpanded = expandedId === order.id;
          const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

          return (
            <div
              key={order.id}
              className="bg-[#131313] rounded-xl border border-[rgba(72,72,71,0.15)] overflow-hidden"
            >
              {/* Order header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#1a1919]/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-semibold">{order.id}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full ${st.color} ${st.bg}`}>
                      {st.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-[#adaaaa]">
                    <span>{formatDate(order.created_at)}</span>
                    <span>{order.user_email}</span>
                    <span>{totalItems} {totalItems === 1 ? 'товар' : totalItems < 5 ? 'товара' : 'товаров'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-3">
                  <span className="text-sm font-semibold text-[#e9ffb9] whitespace-nowrap">
                    {order.total.toLocaleString('ru-RU')} сум
                  </span>
                  {isExpanded ? (
                    <ChevronUp size={16} className="text-[#adaaaa]" />
                  ) : (
                    <ChevronDown size={16} className="text-[#adaaaa]" />
                  )}
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="border-t border-[rgba(72,72,71,0.15)] p-4 space-y-4">
                  {/* Customer info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-xs text-[#adaaaa]">Email</span>
                      <p>{order.user_email}</p>
                    </div>
                    <div>
                      <span className="text-xs text-[#adaaaa]">Телефон</span>
                      <p>{order.user_phone}</p>
                    </div>
                    {order.promo_code && (
                      <div>
                        <span className="text-xs text-[#adaaaa]">Промокод</span>
                        <p className="text-[#bf81ff]">{order.promo_code}</p>
                      </div>
                    )}
                  </div>

                  {/* Items */}
                  <div>
                    <span className="text-xs text-[#adaaaa] block mb-2">Товары</span>
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 bg-[#1a1919] rounded-lg p-3"
                        >
                          <div className="w-10 h-10 rounded-md bg-[#0e0e0e] flex-shrink-0 overflow-hidden">
                            {item.product.images[0] && (
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-[#adaaaa]">
                              {item.selectedSize} / {item.selectedColor} &times; {item.quantity}
                            </p>
                          </div>
                          <span className="text-sm whitespace-nowrap">
                            {(item.product.price * item.quantity).toLocaleString('ru-RU')} сум
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="text-sm space-y-1 border-t border-[rgba(72,72,71,0.15)] pt-3">
                    <div className="flex justify-between text-[#adaaaa]">
                      <span>Подытог</span>
                      <span>{order.subtotal.toLocaleString('ru-RU')} сум</span>
                    </div>
                    <div className="flex justify-between text-[#adaaaa]">
                      <span>Доставка</span>
                      <span>
                        {order.shipping === 0
                          ? 'Бесплатно'
                          : `${order.shipping.toLocaleString('ru-RU')} сум`}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-base pt-1">
                      <span>Итого</span>
                      <span className="text-[#e9ffb9]">
                        {order.total.toLocaleString('ru-RU')} сум
                      </span>
                    </div>
                  </div>

                  {/* Status change */}
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs text-[#adaaaa]">Изменить статус:</span>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        changeStatus(order.id, e.target.value as OrderStatus)
                      }
                      className="bg-[#1a1919] border border-[rgba(72,72,71,0.2)] rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:border-[#e9ffb9]/40 appearance-none cursor-pointer"
                    >
                      {Object.entries(statusConfig).map(([key, cfg]) => (
                        <option key={key} value={key}>
                          {cfg.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#adaaaa]">
            <p>Заказов не найдено</p>
          </div>
        )}
      </div>
    </div>
  );
}
