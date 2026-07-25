import type { Locale } from '@/models'

export const DATA_BASE = `${import.meta.env.BASE_URL}assets/data`
export const CONTENT_BASE = `${import.meta.env.BASE_URL}assets/content`

export const SUPPORTED_LOCALES: Locale[] = ['en', 'fr', 'hu', 'pirate']

export const DEFAULT_LOCALE: Locale = 'en'
