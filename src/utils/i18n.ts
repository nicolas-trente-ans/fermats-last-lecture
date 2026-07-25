import type { Locale, LocalizationTable } from '@/models'

export function t(
  localization: LocalizationTable,
  key: string,
  locale: Locale,
  fallbackLocale: Locale = 'en',
): string {
  const entry = localization.strings[key]
  if (!entry) return key
  return entry[locale] || entry[fallbackLocale] || key
}
