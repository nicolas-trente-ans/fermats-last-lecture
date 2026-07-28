<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAppData, useLocale, useProgress } from '@/composables'
import type { ChapterApp, Section } from '@/models'
import { formatTime } from '@/utils/formatTime'

const props = defineProps<{
  sections: Section[]
}>()

const data = useAppData()
const { t } = useLocale()
const progress = useProgress()

const chapters = computed(() => {
  const map = new Map<string, Section[]>()
  for (const section of props.sections) {
    const list = map.get(section.chapter) || []
    list.push(section)
    map.set(section.chapter, list)
  }
  return [...map.entries()]
})

function appsForChapter(chapter: string): ChapterApp[] {
  return data.value.chapterApps.filter((app) => app.chapter === chapter)
}

function markChapterComplete(chapter: string, items: Section[]) {
  progress.markChapterComplete(chapter, items)
}
</script>

<template>
  <div class="chapters">
    <section v-for="[chapter, items] in chapters" :key="chapter" class="chapter">
      <div class="chapter-head">
        <h2>{{ t(`chapter.${chapter}`) }}</h2>
        <button
          class="btn btn-accent"
          type="button"
          :disabled="progress.isChapterComplete(chapter)"
          @click="markChapterComplete(chapter, items)"
        >
          {{
            progress.isChapterComplete(chapter)
              ? t('ui.completed')
              : t('ui.mark_chapter_complete')
          }}
        </button>
      </div>

      <div v-if="appsForChapter(chapter).length" class="apps">
        <p class="apps-label">{{ t('ui.chapter_apps') }}</p>
        <RouterLink
          v-for="app in appsForChapter(chapter)"
          :key="app.id"
          class="app-card"
          :to="app.route"
        >
          <span class="app-title">{{ t(app.titleKey) }}</span>
          <span class="app-lede">{{ t(app.ledeKey) }}</span>
        </RouterLink>
      </div>

      <ul>
        <li v-for="section in items" :key="section.id">
          <RouterLink
            class="row"
            :class="{ muted: section.status === 'coming_soon' }"
            :to="`/section/${section.id}`"
          >
            <div class="meta">
              <span class="time">{{ formatTime(section.startSeconds) }}</span>
              <span class="title">{{ t(section.titleKey) }}</span>
            </div>
            <div class="flags">
              <span v-if="progress.isSectionComplete(section.id)" class="chip ok">
                {{ t('ui.completed') }}
              </span>
              <span v-else-if="section.status === 'coming_soon'" class="chip warn">
                {{ t('ui.coming_soon') }}
              </span>
              <span v-else class="chip">{{ t('ui.open') }}</span>
            </div>
          </RouterLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.chapters {
  display: grid;
  gap: 1.5rem;
}

.chapter-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem 1rem;
  flex-wrap: wrap;
  margin: 0 0 0.65rem;
}

.chapter h2 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  margin: 0;
  color: var(--accent);
}

.apps {
  display: grid;
  gap: 0.45rem;
  margin: 0 0 0.85rem;
}

.apps-label {
  margin: 0;
  color: var(--muted);
  font-size: 0.85rem;
  font-weight: 600;
}

.app-card {
  display: grid;
  gap: 0.25rem;
  padding: 0.85rem 0.95rem;
  border: 1px solid rgba(212, 160, 23, 0.45);
  border-radius: 0.45rem;
  background: rgba(58, 51, 32, 0.55);
  text-decoration: none;
  color: inherit;
}

.app-card:hover {
  border-color: var(--accent);
}

.app-title {
  font-weight: 700;
  color: var(--accent);
}

.app-lede {
  color: var(--muted);
  line-height: 1.4;
  font-size: 0.92rem;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.45rem;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem 0.9rem;
  border: 1px solid var(--line);
  border-radius: 0.45rem;
  background: rgba(36, 48, 68, 0.55);
}

.row:hover {
  border-color: rgba(212, 160, 23, 0.45);
}

.row.muted {
  opacity: 0.78;
}

.meta {
  display: flex;
  gap: 0.85rem;
  align-items: baseline;
  min-width: 0;
}

.time {
  font-variant-numeric: tabular-nums;
  color: var(--muted);
  min-width: 4.5rem;
}

.title {
  line-height: 1.3;
}

.flags {
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
