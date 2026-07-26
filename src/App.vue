<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import LocaleSwitcher from './components/LocaleSwitcher.vue'
import type { AppData, Locale } from '@/models'
import { createProgressStore } from '@/stores'
import { loadAppData } from '@/utils/loadData'
import { t as translate } from '@/utils/i18n'
import { clearCertifiedBoard } from '@/utils/summarizerBoard'

const data = ref<AppData | null>(null)
const error = ref<string | null>(null)
const progress = createProgressStore()
const locale = ref<Locale>(progress.state.locale)
const router = useRouter()

provide('appData', data)
provide('progress', progress)
provide('locale', locale)

function setLocale(next: Locale) {
  locale.value = next
  progress.setLocale(next)
}

provide('setLocale', setLocale)

function t(key: string): string {
  if (!data.value) return key
  return translate(data.value.localization, key, locale.value)
}

const navSummarizer = computed(() => {
  if (!data.value) return 'Logic game'
  return t('ui.summarizer')
})

function forgetData() {
  const message = data.value
    ? t('ui.forget_data_confirm')
    : 'Clear all progress and Logic game unlocks? Language stays.'
  if (!window.confirm(message)) return
  progress.forgetProgress()
  clearCertifiedBoard()
  void router.push('/')
  window.location.reload()
}

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
      <nav v-if="data" class="topnav">
        <RouterLink to="/summarizer">{{ navSummarizer }}</RouterLink>
        <LocaleSwitcher />
        <button class="btn btn-ghost forget-btn" type="button" @click="forgetData">
          {{ t('ui.forget_data') }}
        </button>
      </nav>
    </header>

    <main class="main">
      <p v-if="error" class="error">{{ error }}</p>
      <p v-else-if="!data" class="loading">Loading companion…</p>
      <RouterView v-else />
    </main>
  </div>
</template>
