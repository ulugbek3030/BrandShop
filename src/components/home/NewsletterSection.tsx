'use client';

import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="mx-auto max-w-2xl w-full px-6 py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-heading text-white mb-4">
          Не пропусти дроп
        </h2>
        <p className="text-base mb-8" style={{ color: '#adaaaa' }}>
          Подпишись на рассылку и узнавай о новых коллекциях первым. Никакого спама — только стиль.
        </p>

        {submitted ? (
          <div
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-sm font-bold"
            style={{ backgroundColor: 'rgba(187,253,0,0.1)', color: '#bbfd00' }}
          >
            Ты в деле! Жди обновлений.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ТВОЙ@EMAIL.COM"
              required
              className="flex-1 px-6 py-4 rounded-full text-sm text-white placeholder:text-text-inactive outline-none focus:ring-2 focus:ring-accent-lime/30 transition-all"
              style={{ backgroundColor: '#262626' }}
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all hover:opacity-90 whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #e9ffb9, #bbfd00)',
                color: '#0e0e0e',
              }}
            >
              Вступай в культ
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
