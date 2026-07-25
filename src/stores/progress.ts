import { reactive } from 'vue'
import { DEFAULT_LOCALE, PROGRESS_STORAGE_KEY, QUIZ_SIZE } from '@/constants'
import type { Locale, ProgressState, ProgressStore, Question, Section } from '@/models'
import { shuffle } from '@/utils/shuffle'

export type { ProgressStore } from '@/models'

function defaultState(): ProgressState {
  return {
    completedSections: [],
    answeredQuestionIds: [],
    locale: DEFAULT_LOCALE,
  }
}

function loadState(): ProgressState {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    return {
      completedSections: Array.isArray(parsed.completedSections) ? parsed.completedSections : [],
      answeredQuestionIds: Array.isArray(parsed.answeredQuestionIds)
        ? parsed.answeredQuestionIds
        : [],
      locale: (parsed.locale as Locale) || DEFAULT_LOCALE,
    }
  } catch {
    return defaultState()
  }
}

function saveState(state: ProgressState) {
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state))
}

function prefixSectionIds(current: Section, sections: Section[]): Set<string> {
  return new Set(sections.filter((s) => s.order <= current.order).map((s) => s.id))
}

function poolForPrefix(current: Section, sections: Section[], questions: Question[]): Question[] {
  const ids = prefixSectionIds(current, sections)
  return questions.filter((q) => ids.has(q.sectionId))
}

function drawFromPool(
  current: Section,
  pool: Question[],
  answered: Set<string>,
  size: number,
): Question[] {
  const unanswered = pool.filter((q) => !answered.has(q.id))
  const currentFirst = unanswered.filter((q) => q.sectionId === current.id)
  const earlier = unanswered.filter((q) => q.sectionId !== current.id)
  const ordered = [...shuffle(currentFirst), ...shuffle(earlier)]
  return ordered.slice(0, size)
}

export function createProgressStore(): ProgressStore {
  const state = reactive(loadState())

  function persist() {
    saveState({
      completedSections: [...state.completedSections],
      answeredQuestionIds: [...state.answeredQuestionIds],
      locale: state.locale,
    })
  }

  return {
    state,
    isSectionComplete(sectionId: string) {
      return state.completedSections.includes(sectionId)
    },
    markSectionComplete(sectionId: string) {
      if (!state.completedSections.includes(sectionId)) {
        state.completedSections.push(sectionId)
        persist()
      }
    },
    isQuestionAnswered(questionId: string) {
      return state.answeredQuestionIds.includes(questionId)
    },
    markQuestionAnswered(questionId: string) {
      if (!state.answeredQuestionIds.includes(questionId)) {
        state.answeredQuestionIds.push(questionId)
        persist()
      }
    },
    setLocale(locale: Locale) {
      state.locale = locale
      persist()
    },
    drawCheckQuestions(current, sections, questions) {
      const pool = poolForPrefix(current, sections, questions)
      const answered = new Set(state.answeredQuestionIds)
      const size = current.quizSize ?? QUIZ_SIZE
      return drawFromPool(current, pool, answered, size)
    },
    clearAnsweredUpTo(current, sections, questions) {
      const poolIds = new Set(poolForPrefix(current, sections, questions).map((q) => q.id))
      state.answeredQuestionIds = state.answeredQuestionIds.filter((id) => !poolIds.has(id))
      persist()
    },
    refamiliarize(current, sections, questions) {
      this.clearAnsweredUpTo(current, sections, questions)
      return this.drawCheckQuestions(current, sections, questions)
    },
  }
}
