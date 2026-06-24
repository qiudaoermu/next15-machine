import en from '@/data/locales/en.json'
import zh from '@/data/locales/zh.json'

export type Locale = 'en' | 'zh'
export const defaultLocale: Locale = 'en'
export const locales: Locale[] = ['en', 'zh']

export const translations = {
  en,
  zh
}

export function t(locale: Locale, key: string): string {
  const keys = key.split('.')
  let value: any = translations[locale]
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      return key
    }
  }
  
  return typeof value === 'string' ? value : key
}
