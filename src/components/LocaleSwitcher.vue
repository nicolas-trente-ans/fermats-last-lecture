<script setup lang="ts">
import { useAppData, useLocale } from '@/composables'
import type { Locale } from '@/models'

const data = useAppData()
const { locale, setLocale } = useLocale()

const labels: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
  hu: 'HU',
  pirate: 'ARR',
}

function onChange(event: Event) {
  setLocale((event.target as HTMLSelectElement).value as Locale)
}
</script>

<template>
  <label class="locale">
    <span class="sr-only">Language</span>
    <select :value="locale" @change="onChange">
      <option v-for="loc in data.locales" :key="loc" :value="loc">{{ labels[loc] }}</option>
    </select>
  </label>
</template>

<style scoped>
.locale select {
  background: var(--bg2);
  color: var(--ink);
  border: 1px solid var(--line);
  border-radius: 0.35rem;
  padding: 0.35rem 0.55rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
