'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'
import { t } from '@/lib/i18n'
import type { Product, Category } from '@/lib/types'
import { ChevronRight, Download, Check } from 'lucide-react'

interface ProductDetailProps {
  product: Product
  categories: Category[]
  products: Product[]
}

export function ProductDetail({ product, categories, products: allProducts }: ProductDetailProps) {
  const { locale } = useLocale()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const category = categories.find(c => c.id === product.category)
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const images = product.images.length > 0 ? product.images : [product.image]

  return (
    <div className="py-12 bg-white">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link href="/products" className="hover:text-gray-900">{t(locale, 'products.title')}</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-900">{product.name[locale]}</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="aspect-square bg-gray-100 mb-4">
              <img
                src={images[activeImageIndex]}
                alt={product.name[locale]}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`aspect-square bg-gray-100 overflow-hidden border-2 ${
                      activeImageIndex === index ? 'border-gray-900' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name[locale]} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="text-gray-500 mb-2">{product.model}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {product.name[locale]}
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              {product.description[locale]}
            </p>

            <div className="space-y-4 mb-8">
              <Link href="/contact" className="btn-primary w-full md:w-auto">
                {t(locale, 'products.getQuote')}
              </Link>
              {product.pdfUrl && (
                <a
                  href={product.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full md:w-auto inline-flex items-center justify-center"
                >
                  <Download size={18} className="mr-2" />
                  {t(locale, 'products.download')}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Specifications */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {t(locale, 'products.specifications')}
          </h2>
          <div className="bg-gray-50">
            <div className="divide-y divide-gray-200">
              {product.specifications.map((spec, index) => (
                <div key={index} className="grid grid-cols-2 py-4 px-6">
                  <div className="font-medium text-gray-900">
                    {spec.name[locale]}
                  </div>
                  <div className="text-gray-600">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {t(locale, 'products.features')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features[locale].map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Check size={20} className="text-gray-900 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Applications */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {t(locale, 'products.applications')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {product.applications[locale].map((app, index) => (
              <div key={index} className="bg-gray-50 p-6 text-center">
                {app}
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t(locale, 'products.relatedProducts')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group bg-white border border-gray-200 hover:border-gray-900 transition-colors"
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name[locale]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-2">{relatedProduct.model}</p>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                      {relatedProduct.name[locale]}
                    </h3>
                    <div className="flex items-center text-gray-900 font-medium">
                      <span>{t(locale, 'products.viewDetails')}</span>
                      <ChevronRight size={16} className="ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
