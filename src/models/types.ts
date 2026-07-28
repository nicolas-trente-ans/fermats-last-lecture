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

export type SandboxMode = 'translate' | 'repair'

export interface SandboxPuzzle {
  id: string
  mode: SandboxMode
  organizer: OrganizerKind
  promptKey: string
  hintKey: string
  boardLabelKey: string
  /** Optional proof-board cite badge (e.g. L4a); else derived from L* / CFL unlocks. */
  cite: string | null
  /** Earlier puzzle ids in the same chain that must be certified first. */
  requires: string[]
  /** Optional certified puzzle ids from any world (sessionStorage). */
  requiresGlobal: string[]
  frame: string[]
  sockets: string[]
  /** Candidate blocks for this level (only those in inventory are placeable). */
  palette: string[]
  /**
   * Maps socket index ("0", "1", …) → accepted block id, or an array of accepted
   * ids with the first entry preferred (e.g. for hints / board labels).
   */
  target: Record<string, string | string[]>
  /** Pre-filled socket fills (repair mode). */
  start: Record<string, string>
  /** Symbols / lemma chips added to inventory when this level is certified. */
  unlocks: string[]
  showBoard: boolean
  reviewSectionId: string | null
}

export interface SandboxChain {
  id: string
  titleKey: string
  puzzles: SandboxPuzzle[]
}

export interface SandboxFile {
  sectionId: string
  /** Symbols available before any level in this world (usually only the first world). */
  startingInventory: string[]
  chains: SandboxChain[]
}

/** One playable world on the summarizer game hub (NNG-style). */
export interface SummarizerWorld {
  id: string
  sectionId: string
  titleKey: string
  order: number
  startingInventory: string[]
  levels: SandboxPuzzle[]
}

export interface CertifiedBoardEntry {
  puzzleId: string
  sectionId: string
  chainId: string
  frame: string[]
  fills: Record<string, string>
  boardLabelKey: string
}

export interface ChapterApp {
  chapter: string
  id: string
  titleKey: string
  ledeKey: string
  route: string
  order: number
}

export interface AppData {
  sections: Section[]
  questions: Question[]
  sandboxesBySection: Record<string, SandboxFile>
  worlds: SummarizerWorld[]
  chapterApps: ChapterApp[]
  localization: LocalizationTable
  locales: Locale[]
}

export interface ProgressState {
  completedSections: string[]
  completedChapters: string[]
  answeredQuestionIds: string[]
  locale: Locale
}

export interface ProgressStore {
  state: ProgressState
  isSectionComplete: (sectionId: string) => boolean
  markSectionComplete: (sectionId: string) => void
  isChapterComplete: (chapterId: string) => boolean
  /** Mark the chapter complete and every section in it complete. */
  markChapterComplete: (chapterId: string, sectionsInChapter: Section[]) => void
  isQuestionAnswered: (questionId: string) => boolean
  markQuestionAnswered: (questionId: string) => void
  setLocale: (locale: Locale) => void
  drawCheckQuestions: (current: Section, sections: Section[], questions: Question[]) => Question[]
  refamiliarize: (current: Section, sections: Section[], questions: Question[]) => Question[]
  clearAnsweredUpTo: (current: Section, sections: Section[], questions: Question[]) => void
  /** Clear section/chapter completion and quiz answers; keeps locale. */
  forgetProgress: () => void
}
