export type Locale = 'en' | 'fr' | 'hu' | 'pirate'

export type SectionStatus = 'active' | 'coming_soon'

export type QuestionType = 'mc' | 'match'

export type OrganizerKind = 'expository' | 'comparative' | 'narrative' | 'graphic'

export interface Section {
  id: string
  chapter: string
  order: number
  startSeconds: number
  /** Exclusive end of the section clip; null if unknown (e.g. last section without end_seconds). */
  endSeconds: number | null
  titleKey: string
  status: SectionStatus
  /** Knowledge-check draw size; falls back to QUIZ_SIZE when unset. */
  quizSize: number | null
}

export interface Question {
  id: string
  sectionId: string
  type: QuestionType
  organizer: OrganizerKind
  promptKey: string
  hintKeys: string[]
  answer: string
  choicesKeys: string[]
  weight: number
  /** Optional earlier section to suggest revisiting after a wrong answer. */
  reviewSectionId: string | null
}

export interface LocalizationTable {
  locales: Locale[]
  strings: Record<string, Partial<Record<Locale, string>>>
}

export interface AppData {
  sections: Section[]
  questions: Question[]
  localization: LocalizationTable
  locales: Locale[]
}

export interface ProgressState {
  completedSections: string[]
  answeredQuestionIds: string[]
  locale: Locale
}

export interface ProgressStore {
  state: ProgressState
  isSectionComplete: (sectionId: string) => boolean
  markSectionComplete: (sectionId: string) => void
  isQuestionAnswered: (questionId: string) => boolean
  markQuestionAnswered: (questionId: string) => void
  setLocale: (locale: Locale) => void
  drawCheckQuestions: (current: Section, sections: Section[], questions: Question[]) => Question[]
  refamiliarize: (current: Section, sections: Section[], questions: Question[]) => Question[]
  clearAnsweredUpTo: (current: Section, sections: Section[], questions: Question[]) => void
}
