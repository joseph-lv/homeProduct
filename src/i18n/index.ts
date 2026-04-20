import { readonly, ref } from 'vue'
import en from '@/locales/en'
import zh from '@/locales/zh'

export type Locale = 'en' | 'zh'

const STORAGE_KEY = 'facailo-locale'
const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null

const locale = ref<Locale>(saved === 'zh' ? 'zh' : 'en')

const messages = {
  en,
  zh,
} as const

function getByPath(target: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, target)
}

export function setLocale(next: Locale) {
  locale.value = next
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, next)
  }
}

export function t(path: string, params?: Record<string, string | number>) {
  const message = getByPath(messages[locale.value] as unknown as Record<string, unknown>, path)
  if (typeof message !== 'string') return path
  if (!params) return message
  return Object.entries(params).reduce((text, [key, value]) => {
    return text.replaceAll(`{${key}}`, String(value))
  }, message)
}

export function useI18n() {
  return {
    locale: readonly(locale),
    setLocale,
    t,
  }
}
