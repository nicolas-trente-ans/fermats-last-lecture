<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAppData, useLocale, useProgress } from '@/composables'
import type { Question, Section } from '@/models'
import { isCorrectAnswer } from '@/utils/answers'
import { shuffle } from '@/utils/shuffle'

const props = defineProps<{
  section: Section
}>()

const data = useAppData()
const { t } = useLocale()
const progress = useProgress()

const activeQuestions = ref<Question[]>([])
const currentIndex = ref(0)
const draft = ref('')
const feedback = ref<'idle' | 'correct' | 'wrong'>('idle')
const hintLevel = ref(0)
const finished = ref(false)
const shuffledChoices = ref<string[]>([])

const current = computed(() => activeQuestions.value[currentIndex.value] || null)
const revealedHintKeys = computed(() => current.value?.hintKeys.slice(0, hintLevel.value) ?? [])
const hasQuestions = computed(() =>
  data.value.questions.some((q) => q.sectionId === props.section.id),
)

const reviewSection = computed(() => {
  const id = current.value?.reviewSectionId
  if (!id) return null
  return data.value.sections.find((s) => s.id === id) || null
})

function prepareCurrentQuestion() {
  draft.value = ''
  feedback.value = 'idle'
  hintLevel.value = 0
  const question = activeQuestions.value[currentIndex.value]
  shuffledChoices.value = question?.type === 'mc' ? shuffle(question.choicesKeys) : []
}

function startCheck() {
  finished.value = false
  currentIndex.value = 0
  activeQuestions.value = progress.drawCheckQuestions(
    props.section,
    data.value.sections,
    data.value.questions,
  )
  prepareCurrentQuestion()
}

function startRefamiliarize() {
  finished.value = false
  currentIndex.value = 0
  activeQuestions.value = progress.refamiliarize(
    props.section,
    data.value.sections,
    data.value.questions,
  )
  prepareCurrentQuestion()
}

function submit() {
  if (!current.value || feedback.value === 'correct') return
  const ok = isCorrectAnswer(current.value, draft.value)
  feedback.value = ok ? 'correct' : 'wrong'
  if (ok) {
    progress.markQuestionAnswered(current.value.id)
  }
}

function previous() {
  if (currentIndex.value <= 0) return
  currentIndex.value -= 1
  prepareCurrentQuestion()
}

function next() {
  if (currentIndex.value >= activeQuestions.value.length - 1) {
    finished.value = true
    activeQuestions.value = []
    shuffledChoices.value = []
    return
  }
  currentIndex.value += 1
  prepareCurrentQuestion()
}

function selectChoice(key: string) {
  draft.value = key
}

function revealNextHint() {
  if (!current.value) return
  if (hintLevel.value >= current.value.hintKeys.length) return
  hintLevel.value += 1
}
</script>

<template>
  <section class="quiz">
    <header class="quiz-head">
      <h2>{{ t('ui.knowledge_check') }}</h2>
      <p>{{ t('ui.knowledge_check_lede') }}</p>
    </header>

    <div v-if="!progress.isSectionComplete(section.id)" class="locked">
      <p>{{ t('ui.complete_to_unlock') }}</p>
    </div>

    <div v-else-if="!hasQuestions" class="locked">
      <p>{{ t('ui.no_questions_yet') }}</p>
    </div>

    <div v-else class="actions">
      <button class="btn btn-accent" type="button" @click="startCheck">
        {{ t('ui.start_check') }}
      </button>
      <button class="btn btn-ghost" type="button" @click="startRefamiliarize">
        {{ t('ui.refamiliarize') }}
      </button>
    </div>

    <p v-if="finished" class="done">{{ t('ui.check_complete') }}</p>

    <article v-if="current" class="card">
      <p class="progress">{{ currentIndex + 1 }} / {{ activeQuestions.length }}</p>
      <h3>{{ t(current.promptKey) }}</h3>

      <div v-if="current.type === 'mc'" class="choices">
        <button
          v-for="choiceKey in shuffledChoices"
          :key="choiceKey"
          class="choice"
          type="button"
          :class="{ selected: draft === choiceKey }"
          @click="selectChoice(choiceKey)"
        >
          {{ t(choiceKey) }}
        </button>
      </div>

      <div v-else class="match">
        <input
          v-model="draft"
          type="text"
          :placeholder="t('ui.match_placeholder')"
          @keydown.enter.prevent="submit"
        />
      </div>

      <div class="row-actions">
        <button
          class="btn btn-ghost"
          type="button"
          :disabled="currentIndex === 0"
          @click="previous"
        >
          {{ t('ui.previous') }}
        </button>
        <button class="btn" type="button" :disabled="!draft" @click="submit">
          {{ t('ui.submit') }}
        </button>
        <button
          class="btn btn-ghost"
          type="button"
          :disabled="!current.hintKeys.length || hintLevel >= current.hintKeys.length"
          @click="revealNextHint"
        >
          {{ t('ui.hint') }}
        </button>
        <button v-if="feedback === 'correct'" class="btn btn-accent" type="button" @click="next">
          {{ t('ui.next') }}
        </button>
      </div>

      <p v-for="hintKey in revealedHintKeys" :key="hintKey" class="hint">
        {{ t(hintKey) }}
      </p>
      <p v-if="feedback === 'correct'" class="ok">
        {{ t('ui.correct') }}
      </p>
      <p v-if="feedback === 'wrong'" class="bad">
        {{ t('ui.try_again') }}
      </p>
      <p v-if="feedback === 'wrong' && reviewSection" class="review">
        <RouterLink :to="`/section/${reviewSection.id}`">
          {{ t('ui.review_section') }}:
          {{ t(reviewSection.titleKey) }}
        </RouterLink>
      </p>
    </article>

    <p
      v-else-if="
        progress.isSectionComplete(section.id) &&
        hasQuestions &&
        activeQuestions.length === 0 &&
        !finished
      "
      class="hint-idle"
    >
      {{ t('ui.start_when_ready') }}
    </p>
  </section>
</template>

<style scoped>
.quiz {
  margin-top: 1.5rem;
  padding: 1.1rem;
  border: 1px solid var(--line);
  border-radius: 0.55rem;
  background: rgba(26, 35, 50, 0.72);
}

.quiz-head h2 {
  font-family: var(--font-display);
  margin: 0 0 0.35rem;
  font-size: 1.35rem;
}

.quiz-head p,
.locked p,
.hint-idle,
.done {
  color: var(--muted);
  margin: 0;
  line-height: 1.45;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1rem;
}

.card {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
}

.card h3 {
  margin: 0.35rem 0 0.9rem;
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.4;
}

.progress {
  color: var(--muted);
  font-size: 0.85rem;
  margin: 0;
}

.choices {
  display: grid;
  gap: 0.45rem;
}

.choice {
  text-align: left;
  background: var(--bg1);
  color: var(--ink);
  border: 1px solid var(--line);
  border-radius: 0.4rem;
  padding: 0.65rem 0.75rem;
  cursor: pointer;
}

.choice.selected {
  border-color: var(--accent);
  background: #3a3320;
}

.match input {
  width: 100%;
  background: var(--bg1);
  color: var(--ink);
  border: 1px solid var(--line);
  border-radius: 0.4rem;
  padding: 0.65rem 0.75rem;
}

.row-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.85rem;
}

.hint,
.ok,
.bad {
  margin: 0.75rem 0 0;
  line-height: 1.4;
}

.hint {
  color: #e6d3a4;
}

.ok {
  color: #b6f0d0;
}

.bad {
  color: #ffb4b4;
}

.review {
  margin: 0.5rem 0 0;
  line-height: 1.4;
}

.review a {
  color: var(--accent);
}

.review a:hover {
  text-decoration: underline;
}

.done {
  margin-top: 1rem;
  color: #b6f0d0;
}
</style>
