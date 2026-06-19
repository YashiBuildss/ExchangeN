'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/exchange', label: 'Exchange' },
  { href: '/messages', label: 'Messages' },
  { href: '/profile', label: 'Profile' },
  { href: '/aboutus', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function NavBar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <span className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-[#0a0a0a] font-bold text-sm shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow duration-300">
            X
          </span>
          <span className="text-lg font-bold text-amber-400 font-[family-name:var(--font-space-grotesk)]">
            XchangeN
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 group ${
                  active ? 'text-white' : 'text-gray-400 hover:text-amber-400'
                }`}
              >
                <span className={`absolute inset-0 rounded-lg transition-opacity duration-200 ${
                  active ? 'bg-amber-500/8 opacity-100' : 'bg-white/4 opacity-0 group-hover:opacity-100'
                }`} />
                {active && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-amber-500" />
                )}
                <span className="relative">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {user ? (
            <>
              <span className="hidden sm:block text-xs text-gray-500 mr-1">
                Hi, <span className="text-gray-300">{user.name?.split(' ')[0]}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm rounded-lg border border-red-500/20 text-red-400 hover:border-red-500/40 hover:text-red-300 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-1.5 text-sm rounded-lg border border-white/10 text-gray-400 hover:text-amber-400 hover:border-amber-500/30 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-3 py-1.5 text-sm rounded-lg bg-amber-500 hover:bg-amber-400 text-[#0a0a0a] font-semibold transition-colors duration-200 shadow-lg shadow-amber-500/15"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
