<script setup lang="ts">
import 'katex/dist/katex.min.css'
import { ref, watch } from 'vue'
import { useLocale, useMarkdown } from '@/composables'
import { CONTENT_BASE } from '@/constants'

const props = defineProps<{
  sectionId: string
}>()

const { locale, t } = useLocale()
const { renderMarkdown } = useMarkdown()

const html = ref('')
const missing = ref(false)
const loading = ref(false)

async function loadNotes() {
  loading.value = true
  missing.value = false
  html.value = ''

  const candidates = [locale.value, 'en'].filter(
    (value, index, arr) => arr.indexOf(value) === index,
  )

  for (const loc of candidates) {
    const response = await fetch(`${CONTENT_BASE}/${loc}/${props.sectionId}.md`)
    if (!response.ok) continue
    const markdown = await response.text()
    html.value = await renderMarkdown(markdown)
    loading.value = false
    return
  }

  missing.value = true
  loading.value = false
}

watch(
  () => [props.sectionId, locale.value] as const,
  () => {
    void loadNotes()
  },
  { immediate: true },
)
</script>

<template>
  <div class="notes">
    <p v-if="loading" class="notes-status">…</p>
    <p v-else-if="missing" class="notes-status">
      {{ t('ui.notes_missing') }}
    </p>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-else class="notes-body" v-html="html" />
  </div>
</template>

<style scoped>
.notes {
  border: 1px solid var(--line);
  border-radius: 0.55rem;
  background: rgba(11, 16, 24, 0.45);
  padding: 1.1rem 1.25rem 1.25rem;
  min-height: 12rem;
}

.notes-status {
  margin: 0;
  color: var(--muted);
}

.notes-body {
  color: var(--ink);
  line-height: 1.55;
  max-width: 46rem;
}

.notes-body :deep(h1),
.notes-body :deep(h2),
.notes-body :deep(h3) {
  font-family: var(--font-display);
  margin: 1.1rem 0 0.45rem;
  line-height: 1.25;
}

.notes-body :deep(h1) {
  font-size: 1.45rem;
  margin-top: 0;
}

.notes-body :deep(h2) {
  font-size: 1.15rem;
}

.notes-body :deep(p),
.notes-body :deep(ul) {
  margin: 0 0 0.85rem;
}

.notes-body :deep(ul) {
  padding-left: 1.2rem;
}

.notes-body :deep(li) {
  margin: 0.25rem 0;
}

.notes-body :deep(strong) {
  color: #fff8e8;
}

.notes-body :deep(.katex) {
  font-size: 1.05em;
  color: var(--ink);
}

.notes-body :deep(.katex-display) {
  margin: 0.85rem 0 1.1rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.15rem 0;
}
</style>
