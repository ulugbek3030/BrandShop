import Link from 'next/link';
import { Globe, Play, MessageCircle } from 'lucide-react';

const shopLinks = [
  { label: '\u0412\u0441\u0435 \u0442\u043e\u0432\u0430\u0440\u044b', href: '/catalog' },
  { label: '\u041a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u0438', href: '/collections' },
  { label: '\u0422\u0430\u0431\u043b\u0438\u0446\u0430 \u0440\u0430\u0437\u043c\u0435\u0440\u043e\u0432', href: '/size-guide' },
];

const supportLinks = [
  { label: '\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430', href: '/shipping' },
  { label: '\u0412\u043e\u0437\u0432\u0440\u0430\u0442\u044b', href: '/returns' },
  { label: '\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b', href: '/contacts' },
];

const socials = [
  { icon: Globe, href: '#', label: 'Instagram' },
  { icon: Play, href: '#', label: 'Youtube' },
  { icon: MessageCircle, href: '#', label: 'Telegram' },
];

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'rgba(72,72,71,0.1)', backgroundColor: '#0e0e0e' }}>
      <div className="mx-auto max-w-2xl px-6 pt-10 pb-24">
        {/* Logo & Description */}
        <div className="mb-8">
          <span className="text-2xl tracking-tighter uppercase font-bold" style={{ color: '#e9ffb9', fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
            CLICK.UZ
          </span>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: '#adaaaa' }}>
            Кураторская подборка одежды и аксессуаров для смелых. Дизайн в Ташкенте, доставка по всему миру.
          </p>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white mb-3">
              {'\u041c\u0430\u0433\u0430\u0437\u0438\u043d'}
            </h4>
            <ul className="space-y-2">
              {shopLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-white" style={{ color: '#adaaaa' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white mb-3">
              {'\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430'}
            </h4>
            <ul className="space-y-2">
              {supportLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-white" style={{ color: '#adaaaa' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Socials */}
        <div className="flex gap-4 mb-8">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: '#1a1919', color: '#adaaaa' }}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs" style={{ color: '#737373' }}>
          &copy; 2024 CLICK MERCH PROJECT
        </p>
      </div>
    </footer>
  );
}
