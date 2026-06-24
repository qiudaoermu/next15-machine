'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'
import { t } from '@/lib/i18n'
import company from '@/data/company.json'
import { Mail, Phone, MapPin, MessageCircle, Send, ChevronRight } from 'lucide-react'

export default function ContactPage() {
  const { locale } = useLocale()
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (submitted) {
    return (
      <div className="py-20 bg-white">
        <div className="container-custom text-center">
          <div className="max-w-lg mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send size={32} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Thank You!' : '谢谢！'}
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              {locale === 'en'
                ? 'Your message has been sent successfully. We will get back to you soon.'
                : '您的消息已成功发送。我们将尽快回复您。'}
            </p>
            <Link href="/" className="btn-primary">
              {locale === 'en' ? 'Back to Home' : '返回首页'}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-white">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-12">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900">{t(locale, 'contact.title')}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t(locale, 'contact.title')}
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              {t(locale, 'contact.subtitle')}
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-gray-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t(locale, 'contact.address')}
                  </h3>
                  <p className="text-gray-600">{company.address[locale]}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-gray-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t(locale, 'contact.email')}
                  </h3>
                  <a href={`mailto:${company.email}`} className="text-gray-600 hover:text-gray-900">
                    {company.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-gray-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t(locale, 'contact.phone')}
                  </h3>
                  <a href={`tel:${company.phone}`} className="text-gray-600 hover:text-gray-900">
                    {company.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={24} className="text-gray-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t(locale, 'contact.whatsapp')}
                  </h3>
                  <a
                    href={`https://wa.me/${company.whatsapp.replace(/\s/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {company.whatsapp}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t(locale, 'contact.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    {t(locale, 'contact.company')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t(locale, 'contact.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t(locale, 'contact.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  {t(locale, 'contact.subject')} *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t(locale, 'contact.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                {t(locale, 'contact.sendMessage')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
