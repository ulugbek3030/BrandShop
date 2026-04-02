import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-[751px] flex flex-col justify-end overflow-hidden">
      {/* Background with dark gradient and subtle purple texture */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 20%, rgba(191,129,255,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 70% 80%, rgba(191,129,255,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 40% 30% at 20% 60%, rgba(50,0,92,0.3) 0%, transparent 50%),
            linear-gradient(180deg, #121212 0%, #0e0e0e 100%)
          `,
        }}
      />

      {/* Noise/texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[300px]"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #0e0e0e 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl w-full px-6 pb-12 flex flex-col gap-6">
        {/* Drop label */}
        <p
          className="text-xs tracking-widest uppercase font-medium"
          style={{ color: '#e9ffb9' }}
        >
          ДРОП 01 // 2024
        </p>

        {/* Heading */}
        <h1 className="flex flex-col gap-1">
          <span
            className="text-6xl font-bold font-[family-name:var(--font-space-grotesk)]"
            style={{ color: '#ffffff' }}
          >
            Click Merch:
          </span>
          <span
            className="text-6xl font-bold font-heading"
            style={{
              background: 'linear-gradient(135deg, #e9ffb9 0%, #bbfd00 40%, #bf81ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Будь
          </span>
          <span
            className="text-6xl font-bold font-heading"
            style={{
              background: 'linear-gradient(135deg, #bbfd00 0%, #bf81ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            смелым.
          </span>
          <span
            className="text-6xl font-bold font-[family-name:var(--font-space-grotesk)]"
            style={{ color: '#ffffff' }}
          >
            Будь собой.
          </span>
        </h1>

        {/* CTA */}
        <div>
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #e9ffb9, #bbfd00)',
              color: '#0e0e0e',
            }}
          >
            Смотреть коллекцию
          </Link>
        </div>
      </div>
    </section>
  );
}
