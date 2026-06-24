'use client';

import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';
import { getTranslation, t } from '@/lib/i18n';
import products from '@/data/products.json';
import categories from '@/data/categories.json';
import cases from '@/data/cases.json';
import { ChevronRight, Shield, DollarSign, Truck, Clock, ArrowRight, Flame } from 'lucide-react';

export default function Home() {
  const { locale } = useLocale();
  const hotProducts = products.filter((p) => p.hot);

  const slides = [
    {
      title: t(locale, 'home.hero.title1'),
      subtitle: t(locale, 'home.hero.subtitle1'),
      image: '/images/lawnmower-1.jpg',
    },
  ];

  const advantageItems = (getTranslation(locale, 'advantages') as unknown as { title: string; desc: string }[]) ?? [];
  const advantageIcons = [Shield, DollarSign, Truck, Clock];
  const advantages = advantageIcons.map((icon, index) => ({
    icon,
    title: advantageItems[index]?.title ?? '',
    desc: advantageItems[index]?.desc ?? '',
  }));

  return (
    <div className="overflow-hidden">
      {/* Hero Section - 激情运动风格 */}
      <section className="relative h-[80vh] min-h-[600px] bg-gradient-to-br from-dark via-primary to-accent overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={slides[0].image}
            alt={slides[0].title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-primary/60 to-accent/50" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl animate-float">
              <div className="inline-flex items-center space-x-2 bg-accent/90 text-white px-4 py-2 mb-6">
                <Flame size={20} className="animate-pulse" />
                <span className="font-bold text-sm uppercase tracking-wider">{locale === 'zh' ? '全新升级' : 'New & Improved'}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                {slides[0].title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-10 drop-shadow-lg">
                {slides[0].subtitle}
              </p>
              <div className="flex flex-wrap gap-5">
                <Link href="/products" className="btn-primary text-lg px-10 py-4">
                  {t(locale, 'nav.products')} →
                </Link>
                <Link href="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-dark">
                  {t(locale, 'common.enquiry')}
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* 底部波浪装饰 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">{t(locale, 'home.categories')}</h2>
            <p className="section-subtitle mx-auto">{locale === 'zh' ? '选择适合您的专业设备系列' : 'Choose from our professional equipment series'}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[3/4] bg-gray-100">
                  <img
                    src={category.image}
                    alt={category.name[locale]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{category.name[locale]}</h3>
                  <div className="flex items-center text-accent-light font-medium group-hover:translate-x-2 transition-transform">
                    {locale === 'zh' ? '浏览产品' : 'Browse Products'} <ChevronRight size={16} className="ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section - 更有活力 */}
      <section className="py-24 bg-gradient-to-br from-gray-light to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full font-semibold text-sm uppercase tracking-wider mb-4">
              {locale === 'zh' ? '我们的优势' : 'Why Choose Us'}
            </div>
            <h2 className="section-title">{t(locale, 'home.advantages')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-white p-10 rounded-2xl shadow-lg card-hover border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <advantage.icon size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-3 text-dark">{advantage.title}</h3>
                <p className="text-gray-600 text-center">{advantage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Products Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-full blur opacity-75"></div>
                <div className="relative w-14 h-14 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center">
                  <Flame className="text-white" size={28} />
                </div>
              </div>
              <h2 className="section-title mb-0">{t(locale, 'home.hotProducts')}</h2>
            </div>
            <Link href="/products" className="hidden md:flex items-center space-x-2 text-primary font-bold text-lg hover:text-accent transition-colors">
              <span>{locale === 'zh' ? '查看全部' : 'View All'}</span>
              <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {hotProducts.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-white rounded-2xl overflow-hidden border-2 border-transparent hover:border-primary/30 card-hover shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  {product.hot && (
                    <div className="absolute top-4 left-4 z-10 bg-accent text-white px-4 py-1 rounded-full font-bold text-sm flex items-center space-x-1">
                      <Flame size={16} />
                      <span>{locale === 'zh' ? '热销' : 'Hot'}</span>
                    </div>
                  )}
                  <img
                    src={product.image}
                    alt={product.name[locale]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{product.model}</p>
                  <h3 className="text-xl font-bold text-dark mb-3">{product.name[locale]}</h3>
                  <p className="text-gray-600 text-sm mb-5 line-clamp-2">{product.description[locale]}</p>
                  <div className="flex items-center text-primary font-bold group-hover:text-accent transition-colors">
                    <span>{t(locale, 'products.viewDetails')}</span>
                    <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12 md:hidden">
            <Link href="/products" className="btn-light">
              {locale === 'zh' ? '查看全部产品' : 'View All Products'}
            </Link>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="py-24 bg-gradient-to-br from-dark to-primary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-block bg-white/10 text-white px-4 py-1 rounded-full font-semibold text-sm uppercase tracking-wider mb-4">
              {locale === 'zh' ? '成功案例' : 'Success Stories'}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t(locale, 'home.cases')}</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">Successful projects and satisfied clients worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cases.map((caseItem, index) => (
              <div key={caseItem.id} className="group relative overflow-hidden rounded-2xl card-hover">
                <div className="aspect-video bg-gray-800">
                  <img
                    src={caseItem.image}
                    alt={caseItem.title[locale]}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-accent-light text-sm font-bold mb-3">{caseItem.location} • {caseItem.year}</p>
                  <h3 className="text-2xl font-bold text-white mb-3">{caseItem.title[locale]}</h3>
                  <p className="text-white/80">{caseItem.description[locale]}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/cases" className="btn-secondary border-white text-white hover:bg-white hover:text-dark">
              {locale === 'zh' ? '查看全部案例' : 'View All Cases'}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - 超有吸引力 */}
      <section className="py-24 bg-gradient-to-r from-accent via-accent-light to-orange-500">
        <div className="container-custom">
          <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-10 md:p-16 text-center border border-white/20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-lg">
              {locale === 'zh' ? '准备好开始了吗？' : "Ready to Get Started?"}
            </h2>
            <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
              {locale === 'zh' ? '立即联系我们，获取免费咨询和定制报价' : 'Contact us today for a free consultation and custom quote for your machinery needs'}
            </p>
            <Link href="/contact" className="btn-primary bg-white text-accent hover:bg-gray-light text-xl px-12 py-5">
              {t(locale, 'common.enquiry')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
