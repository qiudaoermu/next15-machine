'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown, Flame } from 'lucide-react';
import { useLocale, LocaleProvider } from '@/context/LocaleContext';
import { t } from '@/lib/i18n';
import company from '@/data/company.json';

function HeaderContent() {
  const { locale, toggleLocale } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'nav.home' },
    { href: '/products', label: 'nav.products' },
    { href: '/cases', label: 'nav.cases' },
    { href: '/about', label: 'nav.about' },
    { href: '/contact', label: 'nav.contact' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-lg blur opacity-75"></div>
              <div className="relative w-12 h-12 bg-gradient-to-r from-accent to-primary flex items-center justify-center rounded-lg">
                <Flame size={24} className="text-white" />
              </div>
            </div>
            <span className="font-black text-2xl text-dark hidden sm:block">
              {company.name[locale]}
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary font-semibold transition-colors text-lg relative group"
              >
                {t(locale, link.label)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link href="/contact" className="btn-primary">
              {t(locale, 'common.enquiry')}
            </Link>
            <button
              onClick={toggleLocale}
              className="px-4 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all font-semibold rounded-lg"
            >
              {t(locale, 'common.language')}
            </button>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-dark hover:text-accent transition-colors"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container-custom py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-lg text-gray-700 hover:text-accent font-semibold transition-colors border-b border-gray-50 last:border-0"
              >
                {t(locale, link.label)}
              </Link>
            ))}
            <button
              onClick={toggleLocale}
              className="w-full py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all font-semibold rounded-lg mb-4"
            >
              {t(locale, 'common.language')}
            </button>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full btn-primary text-center"
            >
              {t(locale, 'common.enquiry')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function Header() {
  return (
    <LocaleProvider>
      <HeaderContent />
    </LocaleProvider>
  );
}
