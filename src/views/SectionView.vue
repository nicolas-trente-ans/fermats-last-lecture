<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import QuizPanel from '@/components/QuizPanel.vue'
import SectionNotes from '@/components/SectionNotes.vue'
import YoutubePlayer from '@/components/YoutubePlayer.vue'
import { useAppData, useLocale, useProgress } from '@/composables'
import { DEFAULT_YOUTUBE_VIDEO_ID } from '@/constants'
import { formatTime } from '@/utils/formatTime'

const props = defineProps<{
  id: string
}>()

const data = useAppData()
const { t } = useLocale()
const progress = useProgress()

const VIDEO_ID = import.meta.env.VITE_YOUTUBE_VIDEO_ID || DEFAULT_YOUTUBE_VIDEO_ID

type MediaMode = 'video' | 'notes'
const mediaMode = ref<MediaMode>('video')

const section = computed(() => data.value.sections.find((s) => s.id === props.id) || null)

const sectionIndex = computed(() => {
  if (!section.value) return -1
  return data.value.sections.findIndex((s) => s.id === section.value!.id)
})

const previousSection = computed(() => {
  if (sectionIndex.value <= 0) return null
  return data.value.sections[sectionIndex.value - 1]
})

const nextSection = computed(() => {
  if (sectionIndex.value < 0 || sectionIndex.value >= data.value.sections.length - 1) return null
  return data.value.sections[sectionIndex.value + 1]
})

function markComplete() {
  if (section.value) progress.markSectionComplete(section.value.id)
}

const watchLabel = computed(() => {
  if (!section.value) return ''
  const start = formatTime(section.value.startSeconds)
  if (section.value.endSeconds == null) {
    return `${t('ui.watch_range')} ${start}`
  }
  const end = formatTime(section.value.endSeconds)
  return `${t('ui.watch_range')} ${start} – ${end}`
})
</script>

<template>
  <div v-if="!section" class="error">
    {{ t('ui.section_missing') }}
  </div>
  <div v-else class="section-page">
    <p class="crumb">
      <RouterLink to="/">{{ t('ui.back_home') }}</RouterLink>
    </p>
    <h1 class="page-title">{{ t(section.titleKey) }}</h1>
    <p class="lede">
      {{ watchLabel }}
      ·
      <span v-if="progress.isSectionComplete(section.id)" class="chip ok">
        {{ t('ui.completed') }}
      </span>
      <span v-else-if="section.status === 'coming_soon'" class="chip warn">
        {{ t('ui.coming_soon') }}
      </span>
    </p>

    <div class="mode-toggle" role="tablist" aria-label="Section media">
      <button
        type="button"
        role="tab"
        class="mode-btn"
        :class="{ active: mediaMode === 'video' }"
        :aria-selected="mediaMode === 'video'"
        @click="mediaMode = 'video'"
      >
        {{ t('ui.mode_video') }}
      </button>
      <button
        type="button"
        role="tab"
        class="mode-btn"
        :class="{ active: mediaMode === 'notes' }"
        :aria-selected="mediaMode === 'notes'"
        @click="mediaMode = 'notes'"
      >
        {{ t('ui.mode_notes') }}
      </button>
    </div>

    <YoutubePlayer
      v-if="mediaMode === 'video'"
      :video-id="VIDEO_ID"
      :start-seconds="section.startSeconds"
      :end-seconds="section.endSeconds"
    />
    <SectionNotes v-else :section-id="section.id" />

    <div class="toolbar">
      <button
        class="btn btn-accent"
        type="button"
        :disabled="progress.isSectionComplete(section.id)"
        @click="markComplete"
      >
        {{
          progress.isSectionComplete(section.id) ? t('ui.completed') : t('ui.mark_complete')
        }}
      </button>
    </div>

    <QuizPanel :section="section" />

    <nav v-if="previousSection || nextSection" class="section-nav">
      <RouterLink
        v-if="previousSection"
        class="btn btn-ghost prev-section"
        :to="`/section/${previousSection.id}`"
      >
        {{ t('ui.previous_section') }}:
        {{ t(previousSection.titleKey) }}
      </RouterLink>
      <RouterLink
        v-if="nextSection"
        class="btn btn-accent next-section"
        :to="`/section/${nextSection.id}`"
      >
        {{ t('ui.next_section') }}:
        {{ t(nextSection.titleKey) }}
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.crumb {
  margin: 0 0 0.75rem;
}

.crumb a {
  color: var(--muted);
}

.crumb a:hover {
  color: var(--accent);
}

.mode-toggle {
  display: inline-flex;
  margin: 0 0 0.85rem;
  border: 1px solid var(--line);
  border-radius: 0.45rem;
  overflow: hidden;
}

.mode-btn {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--muted);
  padding: 0.45rem 0.9rem;
  cursor: pointer;
}

.mode-btn + .mode-btn {
  border-left: 1px solid var(--line);
}

.mode-btn.active {
  background: var(--bg2);
  color: var(--ink);
  font-weight: 600;
}

.mode-btn:hover:not(.active) {
  color: var(--ink);
}

.toolbar {
  margin-top: 1rem;
  display: flex;
  gap: 0.75rem;
}

.section-nav {
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
}

.prev-section,
.next-section {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.next-section {
  margin-left: auto;
}
</style>
