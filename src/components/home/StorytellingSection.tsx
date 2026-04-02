export default function StorytellingSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(191,129,255,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 30% 70%, rgba(50,0,92,0.1) 0%, transparent 50%),
            linear-gradient(180deg, #0e0e0e 0%, #111111 50%, #0e0e0e 100%)
          `,
        }}
      />

      {/* Decorative lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ backgroundColor: 'rgba(72,72,71,0.2)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundColor: 'rgba(72,72,71,0.2)' }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <p className="text-3xl font-heading text-white text-center leading-relaxed">
          Мы создаем инструменты для цифрового поколения. Носи видение.
        </p>
      </div>
    </section>
  );
}
