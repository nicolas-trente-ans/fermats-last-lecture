import { inject, type Ref } from 'vue'
import type { AppData } from '@/models'

export function useAppData(): Ref<AppData> {
  const data = inject<Ref<AppData | null>>('appData')
  if (!data) throw new Error('appData was not provided')
  if (!data.value) throw new Error('appData is not loaded yet')
  return data as Ref<AppData>
}
