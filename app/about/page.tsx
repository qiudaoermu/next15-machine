'use client'

import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'
import { getTranslation, t } from '@/lib/i18n'
import { Shield, DollarSign, Truck, Clock } from 'lucide-react'
import { ChevronRight } from 'lucide-react'

export default function AboutPage() {
  const { locale } = useLocale()

  const advantageItems = (getTranslation(locale, 'advantages') as unknown as { title: string; desc: string }[]) ?? []
  const advantageIcons = [Shield, DollarSign, Truck, Clock]
  const advantages = advantageIcons.map((icon, index) => ({
    icon,
    title: advantageItems[index]?.title ?? '',
    desc: advantageItems[index]?.desc ?? '',
  }))

  const facts = [
    { number: '15+', label: 'Years Experience' },
    { number: '5000+', label: 'Products Sold' },
    { number: '50+', label: 'Countries' },
    { number: '200+', label: 'Employees' },
  ]

  return (
    <div className="py-12 bg-white">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-12">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900">{t(locale, 'about.title')}</span>
        </div>

        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t(locale, 'about.title')}
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                {locale === 'en'
                  ? 'Power Machinery is a leading manufacturer of professional lawn mowers and garden equipment. With over 15 years of experience, we have established ourselves as a trusted partner for businesses and professionals worldwide.'
                  : '动力机械是专业割草机和园林设备的领先制造商。凭借超过15年的经验，我们已成为全球企业和专业人士值得信赖的合作伙伴。'}
              </p>
              <p className="text-gray-600 text-lg">
                {locale === 'en'
                  ? 'Our commitment to quality, innovation, and customer satisfaction has made us a preferred choice in the industry.'
                  : '我们对质量、创新和客户满意度的承诺使我们成为行业的首选。'}
              </p>
            </div>
            <div className="aspect-[4/3] bg-gray-100">
              <img
                src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20manufacturing%20factory%20industrial%20building%20exterior&image_size=landscape_16_9"
                alt="Factory"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Facts Section */}
        <section className="mb-16 py-16 bg-gray-900 text-white">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {facts.map((fact, index) => (
                <div key={index}>
                  <div className="text-4xl md:text-5xl font-bold mb-2">{fact.number}</div>
                  <div className="text-gray-400">{fact.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t(locale, 'about.whyChooseUs')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-gray-50 p-8 text-center">
                <div className="w-16 h-16 bg-gray-900 flex items-center justify-center mx-auto mb-6">
                  <advantage.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gray-100 p-8 md:p-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Ready to Work With Us?' : '准备好与我们合作了吗？'}
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              {locale === 'en'
                ? 'Contact us today to discuss your needs and how we can help your business grow.'
                : '立即联系我们，讨论您的需求以及我们如何帮助您的业务发展。'}
            </p>
            <Link href="/contact" className="btn-primary">
              {t(locale, 'common.enquiry')}
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
