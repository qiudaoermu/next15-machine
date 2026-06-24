import en from '@/data/locales/en.json'
import zh from '@/data/locales/zh.json'

export type Locale = 'en' | 'zh'
export const defaultLocale: Locale = 'en'
export const locales: Locale[] = ['en', 'zh']

export const translations = {
  en,
  zh
}

export function getTranslation(locale: Locale, key: string): unknown {
  const keys = key.split('.')
  let value: unknown = translations[locale] as unknown

  for (const k of keys) {
    if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
      value = (value as Record<string, unknown>)[k]
    } else {
      return undefined
    }
  }

  return value
}

export function t(locale: Locale, key: string): string {
  const value = getTranslation(locale, key)
  return typeof value === 'string' ? value : key
}
