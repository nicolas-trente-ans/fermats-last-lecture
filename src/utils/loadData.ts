import { DATA_BASE, SUPPORTED_LOCALES } from '@/constants'
import type {
  AppData,
  Locale,
  LocalizationTable,
  Question,
  QuestionType,
  Section,
  SectionStatus,
} from '@/models'
import { parseCsv } from '@/utils/csv'

export type { AppData } from '@/models'

export async function loadAppData(): Promise<AppData> {
  const sectionsRaw = await fetchCsv('sections.csv')
  const sections = applySectionEnds(sectionsRaw.map(parseSection).sort((a, b) => a.order - b.order))

  const [questions, hintsRaw, localization] = await Promise.all([
    loadQuestions(sections),
    fetchCsv('hints.csv'),
    loadLocalization(sections),
  ])

  const hintsByQuestion = groupHintKeys(hintsRaw)
  const questionsWithHints = questions.map((question) => ({
    ...question,
    hintKeys: hintsByQuestion.get(question.id) ?? [],
  }))

  return {
    sections,
    questions: questionsWithHints,
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

async function loadLocalization(sections: Section[]): Promise<LocalizationTable> {
  const questionLocFiles = sections.map((s) => `localization/questions/${s.id}.csv`)
  const files = ['localization/ui.csv', 'localization/sections.csv', ...questionLocFiles]
  const batches = await Promise.all(files.map((file) => fetchCsvOptional(file)))
  return parseLocalization(batches.flat().filter((row) => Boolean(row.key)))
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
  return {
    id: required(row, 'id'),
    chapter: required(row, 'chapter'),
    order: Number(required(row, 'order')),
    startSeconds: Number(required(row, 'start_seconds')),
    endSeconds: endRaw ? Number(endRaw) : null,
    titleKey: required(row, 'title_key'),
    status,
  }
}

function parseQuestion(row: Record<string, string>): Question {
  const type = row.type as QuestionType
  if (type !== 'mc' && type !== 'match') {
    throw new Error(`Invalid question type for ${row.id}: ${row.type}`)
  }
  const choicesKeys = (row.choices_keys || '')
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)
  return {
    id: required(row, 'id'),
    sectionId: required(row, 'section_id'),
    type,
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
