'use client';

import Link from 'next/link';
import { useLocale, LocaleProvider } from '@/context/LocaleContext';
import { t } from '@/lib/i18n';
import company from '@/data/company.json';
import { Mail, Phone, MapPin, MessageCircle, Flame } from 'lucide-react';

function FooterContent() {
  const { locale } = useLocale();

  const quickLinks = [
    { href: '/', label: 'nav.home' },
    { href: '/products', label: 'nav.products' },
    { href: '/cases', label: 'nav.cases' },
    { href: '/about', label: 'nav.about' },
    { href: '/contact', label: 'nav.contact' },
  ];

  return (
    <footer className="bg-gradient-to-br from-dark to-primary text-white pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent-light flex items-center justify-center rounded-lg shadow-lg">
                <Flame size={24} className="text-white" />
              </div>
              <span className="font-black text-2xl">{company.name[locale]}</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Professional lawn mowers and garden machinery manufacturer with global export capability.
            </p>
            <div className="flex space-x-4">
              {['Facebook', 'Twitter', 'LinkedIn', 'YouTube'].map((social, i) => (
                <a
                  key={social}
                  href="#"
                  className="w-12 h-12 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center transition-all hover:scale-110"
                >
                  <span className="font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-8 flex items-center">
              <span className="w-1 h-6 bg-accent rounded mr-3"></span>
              {t(locale, 'common.quickLinks')}
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent-light font-medium transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t(locale, link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-8 flex items-center">
              <span className="w-1 h-6 bg-accent rounded mr-3"></span>
              {t(locale, 'common.contactUs')}
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent/20 flex items-center justify-center rounded-lg flex-shrink-0">
                  <MapPin size={20} className="text-accent-light" />
                </div>
                <span className="text-gray-300">{company.address[locale]}</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-accent/20 flex items-center justify-center rounded-lg flex-shrink-0">
                  <Mail size={20} className="text-accent-light" />
                </div>
                <a href={`mailto:${company.email}`} className="text-gray-300 hover:text-accent-light transition-colors">
                  {company.email}
                </a>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-accent/20 flex items-center justify-center rounded-lg flex-shrink-0">
                  <Phone size={20} className="text-accent-light" />
                </div>
                <a href={`tel:${company.phone}`} className="text-gray-300 hover:text-accent-light transition-colors">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-accent/20 flex items-center justify-center rounded-lg flex-shrink-0">
                  <MessageCircle size={20} className="text-accent-light" />
                </div>
                <a
                  href={`https://wa.me/${company.whatsapp.replace(/\s/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-accent-light transition-colors"
                >
                  {company.whatsapp}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-8 flex items-center">
              <span className="w-1 h-6 bg-accent rounded mr-3"></span>
              {t(locale, 'common.followUs')}
            </h3>
            <p className="text-gray-300 mb-6">
              {locale === 'zh' ? '关注我们获取最新产品和优惠信息' : 'Follow us for latest products and offers'}
            </p>
            <div className="space-y-3">
              <a href="#" className="block py-3 px-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all hover:translate-x-2">
                <span className="font-semibold">{locale === 'zh' ? '订阅新闻通讯' : 'Subscribe to Newsletter'}</span>
              </a>
              <a href="#" className="block py-3 px-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all hover:translate-x-2">
                <span className="font-semibold">{locale === 'zh' ? '获取产品目录' : 'Get Product Catalog'}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-400">
            {t(locale, 'common.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Footer() {
  return (
    <LocaleProvider>
      <FooterContent />
    </LocaleProvider>
  );
}
