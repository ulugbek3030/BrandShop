'use client';

import { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Receipt,
  DollarSign,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const stats = [
  {
    title: 'Выручка сегодня',
    value: '2 450 000',
    unit: 'сум',
    change: '+12.5%',
    icon: TrendingUp,
    positive: true,
  },
  {
    title: 'Выручка за месяц',
    value: '47 800 000',
    unit: 'сум',
    change: '+8.2%',
    icon: DollarSign,
    positive: true,
  },
  {
    title: 'Заказы',
    value: '156',
    unit: '',
    change: '+23',
    icon: ShoppingBag,
    positive: true,
  },
  {
    title: 'Средний чек',
    value: '306 410',
    unit: 'сум',
    change: '-2.1%',
    icon: Receipt,
    positive: false,
  },
];

const weekData = [
  { day: 'Пн', sales: 3200000 },
  { day: 'Вт', sales: 4100000 },
  { day: 'Ср', sales: 3800000 },
  { day: 'Чт', sales: 5200000 },
  { day: 'Пт', sales: 6800000 },
  { day: 'Сб', sales: 7400000 },
  { day: 'Вс', sales: 4500000 },
];

const dayData = [
  { day: '09:00', sales: 180000 },
  { day: '10:00', sales: 320000 },
  { day: '11:00', sales: 450000 },
  { day: '12:00', sales: 280000 },
  { day: '13:00', sales: 520000 },
  { day: '14:00', sales: 390000 },
  { day: '15:00', sales: 610000 },
  { day: '16:00', sales: 440000 },
  { day: '17:00', sales: 700000 },
  { day: '18:00', sales: 560000 },
];

const monthData = [
  { day: '1 нед', sales: 12400000 },
  { day: '2 нед', sales: 15600000 },
  { day: '3 нед', sales: 11800000 },
  { day: '4 нед', sales: 18200000 },
];

const chartDataMap: Record<string, typeof weekData> = {
  day: dayData,
  week: weekData,
  month: monthData,
};

const topProducts = [
  { name: 'Худи Cyberpunk V2', sold: 42, revenue: '5 040 000 сум' },
  { name: 'Vortex Tech Худи 01', sold: 38, revenue: '4 902 000 сум' },
  { name: 'Футболка Velocity Graphic', sold: 35, revenue: '1 575 000 сум' },
  { name: 'Cyber Windbreaker', sold: 28, revenue: '5 040 000 сум' },
  { name: 'Брюки Карго Orbit', sold: 24, revenue: '2 280 000 сум' },
];

const recentOrders = [
  { id: '#10421', date: '2 апр, 14:32', amount: '550 000 сум', status: 'new' as const },
  { id: '#10420', date: '2 апр, 13:10', amount: '245 000 сум', status: 'processing' as const },
  { id: '#10419', date: '2 апр, 11:45', amount: '790 000 сум', status: 'shipped' as const },
  { id: '#10418', date: '1 апр, 22:18', amount: '120 000 сум', status: 'delivered' as const },
  { id: '#10417', date: '1 апр, 19:02', amount: '375 000 сум', status: 'processing' as const },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'Новый', color: 'text-[#bf81ff]', bg: 'bg-[#bf81ff]/15' },
  processing: { label: 'В обработке', color: 'text-yellow-400', bg: 'bg-yellow-400/15' },
  shipped: { label: 'Отправлен', color: 'text-blue-400', bg: 'bg-blue-400/15' },
  delivered: { label: 'Доставлен', color: 'text-green-400', bg: 'bg-green-400/15' },
};

const formatYAxis = (value: number) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return String(value);
};

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1919] border border-[rgba(72,72,71,0.3)] rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs text-[#adaaaa]">{label}</p>
      <p className="text-sm font-semibold text-white">
        {payload[0].value.toLocaleString('ru-RU')} сум
      </p>
    </div>
  );
}

export default function AdminDashboard() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-[#131313] rounded-2xl p-5 md:p-6 border border-[rgba(72,72,71,0.15)]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs md:text-sm text-[#adaaaa]">{stat.title}</span>
                <Icon size={16} className="text-[#adaaaa]" />
              </div>
              <div className="text-xl md:text-2xl font-bold">
                {stat.value}
                {stat.unit && (
                  <span className="text-xs md:text-sm font-normal text-[#adaaaa] ml-1">
                    {stat.unit}
                  </span>
                )}
              </div>
              <span
                className={`text-xs mt-1 inline-block ${
                  stat.positive ? 'text-[#e9ffb9]' : 'text-red-400'
                }`}
              >
                {stat.change}
              </span>
            </div>
          );
        })}
      </div>

      {/* Sales chart */}
      <div className="bg-[#131313] rounded-2xl p-5 md:p-6 border border-[rgba(72,72,71,0.15)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <h2 className="text-lg font-semibold">Продажи</h2>
          <div className="flex gap-1 bg-[#1a1919] rounded-lg p-1">
            {[
              { key: 'day' as const, label: 'День' },
              { key: 'week' as const, label: 'Неделя' },
              { key: 'month' as const, label: 'Месяц' },
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => setPeriod(p.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  period === p.key
                    ? 'bg-[#131313] text-[#e9ffb9]'
                    : 'text-[#adaaaa] hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartDataMap[period]}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e9ffb9" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#e9ffb9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(72,72,71,0.2)" />
              <XAxis
                dataKey="day"
                tick={{ fill: '#adaaaa', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatYAxis}
                tick={{ fill: '#adaaaa', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#e9ffb9"
                strokeWidth={2}
                fill="url(#salesGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top products */}
        <div className="bg-[#131313] rounded-2xl p-5 md:p-6 border border-[rgba(72,72,71,0.15)]">
          <h2 className="text-lg font-semibold mb-4">Топ товаров</h2>
          <div className="space-y-3">
            {topProducts.map((product, i) => (
              <div
                key={product.name}
                className="flex items-center justify-between py-2 border-b border-[rgba(72,72,71,0.15)] last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#adaaaa] w-5">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-[#adaaaa]">{product.sold} продаж</p>
                  </div>
                </div>
                <span className="text-sm text-[#e9ffb9] whitespace-nowrap">
                  {product.revenue}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div className="bg-[#131313] rounded-2xl p-5 md:p-6 border border-[rgba(72,72,71,0.15)]">
          <h2 className="text-lg font-semibold mb-4">Последние заказы</h2>
          <div className="space-y-3">
            {recentOrders.map((order) => {
              const st = statusConfig[order.status];
              return (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-2 border-b border-[rgba(72,72,71,0.15)] last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-[#adaaaa]">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{order.amount}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${st.color} ${st.bg}`}
                    >
                      {st.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
