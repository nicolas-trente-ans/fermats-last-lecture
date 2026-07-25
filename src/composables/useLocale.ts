import { inject, type Ref } from 'vue'
import { useAppData } from '@/composables/useAppData'
import type { Locale } from '@/models'
import { t as translate } from '@/utils/i18n'

export function useLocale() {
  const data = useAppData()
  const locale = inject<Ref<Locale>>('locale')
  const setLocale = inject<(next: Locale) => void>('setLocale')

  if (!locale) throw new Error('locale was not provided')
  if (!setLocale) throw new Error('setLocale was not provided')

  const localeRef = locale
  const setLocaleFn = setLocale

  function t(key: string): string {
    return translate(data.value.localization, key, localeRef.value)
  }

  return { locale: localeRef, setLocale: setLocaleFn, t }
}
