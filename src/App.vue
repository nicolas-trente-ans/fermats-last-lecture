<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import LocaleSwitcher from './components/LocaleSwitcher.vue'
import type { AppData, Locale } from '@/models'
import { createProgressStore } from '@/stores'
import { loadAppData } from '@/utils/loadData'

const data = ref<AppData | null>(null)
const error = ref<string | null>(null)
const progress = createProgressStore()
const locale = ref<Locale>(progress.state.locale)

provide('appData', data)
provide('progress', progress)
provide('locale', locale)

function setLocale(next: Locale) {
  locale.value = next
  progress.setLocale(next)
}

provide('setLocale', setLocale)

onMounted(async () => {
  try {
    data.value = await loadAppData()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load data'
  }
})
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <RouterLink class="brand" to="/">Fermat's Last Lecture</RouterLink>
      <LocaleSwitcher v-if="data" />
    </header>

    <main class="main">
      <p v-if="error" class="error">{{ error }}</p>
      <p v-else-if="!data" class="loading">Loading companion…</p>
      <RouterView v-else />
    </main>
  </div>
</template>
