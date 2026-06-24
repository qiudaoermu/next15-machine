'use client'

import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'
import { t } from '@/lib/i18n'
import cases from '@/data/cases.json'
import { ChevronRight } from 'lucide-react'

export default function CasesPage() {
  const { locale } = useLocale()

  return (
    <div className="py-12 bg-white">
      <div className="container-custom">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t(locale, 'cases.title')}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t(locale, 'cases.subtitle')}
          </p>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-12">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900">{t(locale, 'cases.title')}</span>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="group relative overflow-hidden">
              <div className="aspect-video bg-gray-100">
                <img
                  src={caseItem.image}
                  alt={caseItem.title[locale]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="pt-6">
                <p className="text-gray-500 text-sm mb-2">
                  {caseItem.location} • {caseItem.year}
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {caseItem.title[locale]}
                </h3>
                <p className="text-gray-600">
                  {caseItem.description[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
