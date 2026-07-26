import { DATA_BASE, ORGANIZER_KINDS, SUPPORTED_LOCALES } from '@/constants'
import type {
  AppData,
  ChapterApp,
  Locale,
  LocalizationTable,
  OrganizerKind,
  Question,
  QuestionType,
  SandboxChain,
  SandboxFile,
  SandboxMode,
  SandboxPuzzle,
  Section,
  SectionStatus,
  SummarizerWorld,
} from '@/models'
import { parseCsv } from '@/utils/csv'

export type { AppData } from '@/models'

export async function loadAppData(): Promise<AppData> {
  const sectionsRaw = await fetchCsv('sections.csv')
  const sections = applySectionEnds(sectionsRaw.map(parseSection).sort((a, b) => a.order - b.order))

  const [questions, hintsRaw, sandboxesBySection, localization, chapterApps] = await Promise.all([
    loadQuestions(sections),
    fetchCsv('hints.csv'),
    loadSandboxes(sections),
    loadLocalization(sections),
    loadChapterApps(),
  ])

  const hintsByQuestion = groupHintKeys(hintsRaw)
  const questionsWithHints = questions.map((question) => ({
    ...question,
    hintKeys: hintsByQuestion.get(question.id) ?? [],
  }))

  return {
    sections,
    questions: questionsWithHints,
    sandboxesBySection,
    worlds: buildWorlds(sections, sandboxesBySection),
    chapterApps,
    localization,
    locales: localization.locales,
  }
}

async function loadQuestions(sections: Section[]): Promise<Question[]> {
  const batches = await Promise.all(
    sections.map(async (section) => {
      const rows = await fetchCsvOptional(`questions/${section.id}.csv`)
      return rows.filter(isQuestionRow).map(parseQuestion)
    }),
  )
  return batches.flat()
}

function isQuestionRow(row: Record<string, string>): boolean {
  return Boolean(row.id && row.type)
}

async function loadChapterApps(): Promise<ChapterApp[]> {
  const rows = await fetchCsvOptional('chapter-apps.csv')
  return rows
    .filter((row) => Boolean(row.id && row.chapter))
    .map((row) => ({
      chapter: required(row, 'chapter'),
      id: required(row, 'id'),
      titleKey: required(row, 'title_key'),
      ledeKey: row.lede_key?.trim() || 'ui.summarizer_lede',
      route: required(row, 'route'),
      order: Number(row.order || '1'),
    }))
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))
}

async function loadLocalization(sections: Section[]): Promise<LocalizationTable> {
  const questionLocFiles = sections.map((s) => `localization/questions/${s.id}.csv`)
  const sandboxLocFiles = sections.map((s) => `localization/sandboxes/${s.id}.csv`)
  const files = [
    'localization/ui.csv',
    'localization/sections.csv',
    'localization/sandboxes/inventory.csv',
    ...questionLocFiles,
    ...sandboxLocFiles,
  ]
  const batches = await Promise.all(files.map((file) => fetchCsvOptional(file)))
  return parseLocalization(batches.flat().filter((row) => Boolean(row.key)))
}

async function loadSandboxes(sections: Section[]): Promise<Record<string, SandboxFile>> {
  const pairs = await Promise.all(
    sections.map(async (section) => {
      const raw = await fetchJsonOptional(`sandboxes/${section.id}.json`)
      if (!raw) return null
      const sandbox = parseSandboxFile(raw, section.id)
      return [section.id, sandbox] as const
    }),
  )
  const result: Record<string, SandboxFile> = {}
  for (const pair of pairs) {
    if (pair) result[pair[0]] = pair[1]
  }
  return result
}

async function fetchJsonOptional(filename: string): Promise<unknown | null> {
  const response = await fetch(`${DATA_BASE}/${filename}`)
  if (response.status === 404) return null
  if (!response.ok) return null
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('text/html')) return null
  const text = await response.text()
  const trimmed = text.trimStart()
  if (!trimmed || trimmed.startsWith('<')) return null
  try {
    return JSON.parse(trimmed) as unknown
  } catch {
    return null
  }
}

function parseSandboxFile(raw: unknown, sectionId: string): SandboxFile {
  if (!raw || typeof raw !== 'object') {
    throw new Error(`Invalid sandbox for ${sectionId}`)
  }
  const data = raw as Record<string, unknown>
  const fileSectionId = String(data.section_id || sectionId)
  if (fileSectionId !== sectionId) {
    throw new Error(`Sandbox section_id ${fileSectionId} does not match ${sectionId}`)
  }
  const chainsRaw = Array.isArray(data.chains) ? data.chains : []
  return {
    sectionId,
    startingInventory: asStringArray(data.starting_inventory),
    chains: chainsRaw.map((chain, index) => parseSandboxChain(chain, sectionId, index)),
  }
}

function parseSandboxChain(raw: unknown, sectionId: string, index: number): SandboxChain {
  if (!raw || typeof raw !== 'object') {
    throw new Error(`Invalid chain in sandbox ${sectionId} at ${index}`)
  }
  const data = raw as Record<string, unknown>
  const id = String(data.id || '')
  const titleKey = String(data.title_key || '')
  if (!id || !titleKey) {
    throw new Error(`Sandbox chain missing id/title_key in ${sectionId}`)
  }
  const puzzlesRaw = Array.isArray(data.puzzles) ? data.puzzles : []
  const puzzles = puzzlesRaw.map((puzzle, puzzleIndex) =>
    parseSandboxPuzzle(puzzle, sectionId, id, puzzleIndex),
  )
  for (let i = 1; i < puzzles.length; i += 1) {
    if (puzzles[i].requires.length === 0) {
      puzzles[i].requires = [puzzles[i - 1].id]
    }
  }
  return {
    id,
    titleKey,
    puzzles,
  }
}

function parseSandboxPuzzle(
  raw: unknown,
  sectionId: string,
  chainId: string,
  index: number,
): SandboxPuzzle {
  if (!raw || typeof raw !== 'object') {
    throw new Error(`Invalid puzzle in ${sectionId}/${chainId} at ${index}`)
  }
  const data = raw as Record<string, unknown>
  const id = String(data.id || '')
  const mode = data.mode as SandboxMode
  const organizer = data.organizer as OrganizerKind
  if (!id) throw new Error(`Sandbox puzzle missing id in ${sectionId}/${chainId}`)
  if (mode !== 'translate' && mode !== 'repair') {
    throw new Error(`Invalid sandbox mode for ${id}: ${String(data.mode)}`)
  }
  if (!ORGANIZER_KINDS.includes(organizer)) {
    throw new Error(`Invalid organizer for sandbox ${id}: ${String(data.organizer)}`)
  }
  const showBoard = data.show_board === undefined ? true : Boolean(data.show_board)
  return {
    id,
    mode,
    organizer,
    promptKey: String(data.prompt_key || ''),
    hintKey: String(data.hint_key || ''),
    boardLabelKey: String(data.board_label_key || ''),
    requires: asStringArray(data.requires),
    requiresGlobal: asStringArray(data.requires_global),
    frame: asStringArray(data.frame),
    sockets: asStringArray(data.sockets),
    palette: asStringArray(data.palette),
    target: asStringRecord(data.target),
    start: asStringRecord(data.start),
    unlocks: asStringArray(data.unlocks),
    showBoard,
    reviewSectionId: data.review_section_id ? String(data.review_section_id) : null,
  }
}

function buildWorlds(
  sections: Section[],
  sandboxesBySection: Record<string, SandboxFile>,
): SummarizerWorld[] {
  const worlds: SummarizerWorld[] = []
  for (const section of sections) {
    const sandbox = sandboxesBySection[section.id]
    if (!sandbox) continue
    for (const chain of sandbox.chains) {
      worlds.push({
        id: chain.id,
        sectionId: section.id,
        titleKey: chain.titleKey,
        order: section.order,
        startingInventory: sandbox.startingInventory,
        levels: chain.puzzles,
      })
    }
  }
  return worlds.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.map((item) => String(item))
}

function asStringRecord(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const result: Record<string, string> = {}
  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    result[key] = String(item)
  }
  return result
}

function applySectionEnds(sections: Section[]): Section[] {
  return sections.map((section, index) => {
    const next = sections[index + 1]
    if (next) {
      return { ...section, endSeconds: next.startSeconds }
    }
    return section
  })
}

async function fetchCsv(filename: string): Promise<Record<string, string>[]> {
  const response = await fetch(`${DATA_BASE}/${filename}`)
  if (!response.ok) {
    throw new Error(`Failed to load ${filename} (${response.status})`)
  }
  const text = await response.text()
  return parseCsv(text)
}

async function fetchCsvOptional(filename: string): Promise<Record<string, string>[]> {
  const response = await fetch(`${DATA_BASE}/${filename}`)
  // Missing files may 404, or (on SPA hosts) return index.html with 200.
  if (response.status === 404) return []
  if (!response.ok) return []
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('text/html')) return []
  const text = await response.text()
  const trimmed = text.trimStart()
  if (!trimmed || trimmed.startsWith('<')) return []
  return parseCsv(text)
}

function parseSection(row: Record<string, string>): Section {
  const status = row.status as SectionStatus
  if (status !== 'active' && status !== 'coming_soon') {
    throw new Error(`Invalid section status for ${row.id}: ${row.status}`)
  }
  const endRaw = row.end_seconds?.trim()
  const quizSizeRaw = row.quiz_size?.trim()
  return {
    id: required(row, 'id'),
    chapter: required(row, 'chapter'),
    order: Number(required(row, 'order')),
    startSeconds: Number(required(row, 'start_seconds')),
    endSeconds: endRaw ? Number(endRaw) : null,
    titleKey: required(row, 'title_key'),
    status,
    quizSize: quizSizeRaw ? Number(quizSizeRaw) : null,
  }
}

function parseQuestion(row: Record<string, string>): Question {
  const type = row.type as QuestionType
  if (type !== 'mc' && type !== 'match') {
    throw new Error(`Invalid question type for ${row.id}: ${row.type}`)
  }
  const organizer = row.organizer as OrganizerKind
  if (!ORGANIZER_KINDS.includes(organizer)) {
    throw new Error(`Invalid organizer for ${row.id}: ${row.organizer}`)
  }
  const choicesKeys = (row.choices_keys || '')
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)
  return {
    id: required(row, 'id'),
    sectionId: required(row, 'section_id'),
    type,
    organizer,
    promptKey: required(row, 'prompt_key'),
    hintKeys: [],
    answer: required(row, 'answer'),
    choicesKeys,
    weight: Number(row.weight || '1'),
    reviewSectionId: row.review_section_id?.trim() || null,
  }
}

function groupHintKeys(rows: Record<string, string>[]): Map<string, string[]> {
  const grouped = new Map<string, { order: number; key: string }[]>()
  for (const row of rows) {
    const questionId = required(row, 'question_id')
    const hintKey = required(row, 'hint_key')
    const order = Number(required(row, 'hint_order'))
    if (Number.isNaN(order)) {
      throw new Error(`Invalid hint_order for question ${questionId}`)
    }
    const list = grouped.get(questionId) ?? []
    list.push({ order, key: hintKey })
    grouped.set(questionId, list)
  }
  const result = new Map<string, string[]>()
  for (const [questionId, hints] of grouped) {
    result.set(
      questionId,
      hints.sort((a, b) => a.order - b.order).map((h) => h.key),
    )
  }
  return result
}

function parseLocalization(rows: Record<string, string>[]): LocalizationTable {
  if (rows.length === 0) {
    return { locales: ['en'], strings: {} }
  }
  const sample = rows[0]
  const locales = (Object.keys(sample).filter((k) => k !== 'key') as Locale[]).filter((k) =>
    SUPPORTED_LOCALES.includes(k),
  )
  const strings: LocalizationTable['strings'] = {}
  for (const row of rows) {
    const key = required(row, 'key')
    strings[key] = strings[key] ? { ...strings[key] } : {}
    for (const locale of locales) {
      if (row[locale]) strings[key][locale] = row[locale]
    }
  }
  return { locales, strings }
}

function required(row: Record<string, string>, field: string): string {
  const value = row[field]
  if (!value) throw new Error(`Missing required field "${field}"`)
  return value
}
