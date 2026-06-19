import Link from 'next/link';

const links = [
  { href: '/exchange', label: 'Exchange' },
  { href: '/aboutus', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/login', label: 'Log In' },
  { href: '/signup', label: 'Sign Up' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-md bg-amber-500 flex items-center justify-center text-[#0a0a0a] font-bold text-xs">
            X
          </span>
          <span className="font-[family-name:var(--font-space-grotesk)] text-amber-400 font-semibold text-sm">
            XchangeN
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} XchangeN. Free forever.
        </p>
      </div>
    </footer>
  );
}
