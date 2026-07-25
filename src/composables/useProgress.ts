import { inject } from 'vue'
import type { ProgressStore } from '@/models'

export function useProgress(): ProgressStore {
  const progress = inject<ProgressStore>('progress')
  if (!progress) throw new Error('progress was not provided')
  return progress
}
