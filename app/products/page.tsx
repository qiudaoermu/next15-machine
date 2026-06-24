'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';
import { t } from '@/lib/i18n';
import products from '@/data/products.json';
import categories from '@/data/categories.json';
import { ChevronRight, Filter, Flame } from 'lucide-react';

export default function ProductsPage() {
  const { locale } = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-dark via-primary to-primary-light pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center">
            <div className="inline-block bg-accent/20 text-accent-light px-4 py-1 rounded-full font-semibold text-sm uppercase tracking-wider mb-6">
              {locale === 'zh' ? '产品中心' : 'Products'}
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              {t(locale, 'products.title')}
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto">
              {locale === 'zh' ? '探索我们专业的割草机和园林设备系列' : 'Explore our professional lawn mower and garden equipment series'}
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom py-16">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="md:hidden flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 transition-colors rounded-xl mb-8 w-full justify-center font-semibold"
        >
          <Filter size={20} />
          <span>{t(locale, 'products.filter')}</span>
        </button>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Filters Sidebar */}
          <aside className={`${mobileFilterOpen ? 'block' : 'hidden'} md:block md:w-64 flex-shrink-0`}>
            <div className="sticky top-28">
              <div className="bg-gradient-to-br from-gray-light to-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-dark mb-6 flex items-center">
                  <Filter size={20} className="mr-2 text-accent" />
                  {t(locale, 'home.categories')}
                </h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                        selectedCategory === 'all'
                          ? 'bg-gradient-to-r from-accent to-accent-light text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {t(locale, 'products.all')}
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setMobileFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                          selectedCategory === category.id
                            ? 'bg-gradient-to-r from-accent to-accent-light text-white shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category.name[locale]}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
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
                    <p className="text-gray-600 text-sm mb-5 line-clamp-2">
                      {product.description[locale]}
                    </p>
                    <div className="flex items-center text-primary font-bold group-hover:text-accent transition-colors">
                      <span>{t(locale, 'products.viewDetails')}</span>
                      <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-gray-light rounded-2xl">
                <p className="text-gray-500 text-xl">{locale === 'zh' ? '暂无产品' : 'No products found'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
