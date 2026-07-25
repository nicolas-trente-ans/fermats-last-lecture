import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '..', 'public', 'assets', 'data')

function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i]
    const next = text[i + 1]
    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"'
        i += 1
      } else if (ch === '"') {
        inQuotes = false
      } else {
        field += ch
      }
      continue
    }
    if (ch === '"') inQuotes = true
    else if (ch === ',') {
      row.push(field)
      field = ''
    } else if (ch === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else if (ch !== '\r') field += ch
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  if (rows.length === 0) return []
  const headers = rows[0].map((h) => h.trim())
  return rows
    .slice(1)
    .filter((r) => r.some((c) => c.trim() !== ''))
    .map((r) => {
      const record = {}
      for (let i = 0; i < headers.length; i += 1) record[headers[i]] = (r[i] ?? '').trim()
      return record
    })
}

function readCsv(relativePath) {
  const text = fs.readFileSync(path.join(dataDir, relativePath), 'utf8')
  return parseCsv(text)
}

function readCsvIfExists(relativePath) {
  const full = path.join(dataDir, relativePath)
  if (!fs.existsSync(full)) return []
  return readCsv(relativePath)
}

const errors = []
const sections = readCsv('sections.csv')

const sectionIds = new Set()
const orders = new Set()
for (const row of sections) {
  for (const field of ['id', 'chapter', 'order', 'start_seconds', 'title_key', 'status']) {
    if (!row[field]) errors.push(`sections.csv: missing ${field}`)
  }
  if (row.status && row.status !== 'active' && row.status !== 'coming_soon') {
    errors.push(`sections.csv: bad status ${row.status}`)
  }
  if (sectionIds.has(row.id)) errors.push(`sections.csv: duplicate id ${row.id}`)
  sectionIds.add(row.id)
  if (orders.has(row.order)) errors.push(`sections.csv: duplicate order ${row.order}`)
  orders.add(row.order)
  if (Number.isNaN(Number(row.order)) || Number.isNaN(Number(row.start_seconds))) {
    errors.push(`sections.csv: non-numeric order/start for ${row.id}`)
  }
  if (row.end_seconds && Number.isNaN(Number(row.end_seconds))) {
    errors.push(`sections.csv: non-numeric end_seconds for ${row.id}`)
  }
}

const questions = []
for (const section of sections) {
  const rows = readCsvIfExists(path.join('questions', `${section.id}.csv`))
  for (const row of rows) {
    if (row.section_id && row.section_id !== section.id) {
      errors.push(
        `questions/${section.id}.csv: section_id ${row.section_id} does not match file section`,
      )
    }
    questions.push(row)
  }
}

const localization = [
  ...readCsv('localization/ui.csv'),
  ...readCsv('localization/sections.csv'),
  ...sections.flatMap((section) =>
    readCsvIfExists(path.join('localization', 'questions', `${section.id}.csv`)),
  ),
]

const questionIds = new Set()
const neededKeys = new Set()
for (const row of questions) {
  for (const field of ['id', 'section_id', 'type', 'organizer', 'prompt_key', 'answer']) {
    if (!row[field]) errors.push(`questions: missing ${field} on ${row.id || '?'}`)
  }
  if (row.type && row.type !== 'mc' && row.type !== 'match') {
    errors.push(`questions: bad type ${row.type}`)
  }
  const organizers = new Set(['expository', 'comparative', 'narrative', 'graphic'])
  if (row.organizer && !organizers.has(row.organizer)) {
    errors.push(`questions: bad organizer ${row.organizer} on ${row.id}`)
  }
  if (!sectionIds.has(row.section_id)) {
    errors.push(`questions: unknown section_id ${row.section_id}`)
  }
  if (row.review_section_id) {
    if (!sectionIds.has(row.review_section_id)) {
      errors.push(`questions: unknown review_section_id ${row.review_section_id} on ${row.id}`)
    }
  }
  if (questionIds.has(row.id)) errors.push(`questions: duplicate id ${row.id}`)
  questionIds.add(row.id)
  neededKeys.add(row.prompt_key)
  if (row.type === 'mc') {
    const choices = (row.choices_keys || '').split('|').filter(Boolean)
    if (choices.length < 2) errors.push(`questions: mc ${row.id} needs choices_keys`)
    if (!choices.includes(row.answer)) {
      errors.push(`questions: mc ${row.id} answer not in choices_keys`)
    }
    for (const c of choices) neededKeys.add(c)
  }
}

const hints = readCsvIfExists('hints.csv')
const hintOrders = new Set()
for (const row of hints) {
  for (const field of ['question_id', 'hint_key', 'hint_order']) {
    if (!row[field]) errors.push(`hints.csv: missing ${field}`)
  }
  if (row.question_id && !questionIds.has(row.question_id)) {
    errors.push(`hints.csv: unknown question_id ${row.question_id}`)
  }
  const order = Number(row.hint_order)
  if (row.hint_order && Number.isNaN(order)) {
    errors.push(`hints.csv: non-numeric hint_order for ${row.question_id}`)
  }
  const orderKey = `${row.question_id}:${row.hint_order}`
  if (row.question_id && row.hint_order) {
    if (hintOrders.has(orderKey)) {
      errors.push(`hints.csv: duplicate hint_order ${row.hint_order} for ${row.question_id}`)
    }
    hintOrders.add(orderKey)
  }
  if (row.hint_key) neededKeys.add(row.hint_key)
}

const locKeys = new Set(localization.map((r) => r.key))
for (const row of sections) neededKeys.add(row.title_key)
for (const chapter of new Set(sections.map((s) => s.chapter))) {
  neededKeys.add(`chapter.${chapter}`)
}

for (const key of neededKeys) {
  if (!locKeys.has(key)) errors.push(`localization: missing key ${key}`)
}

for (const row of localization) {
  if (!row.key) errors.push('localization: row without key')
  if (!row.en) errors.push(`localization: missing en for ${row.key}`)
}

if (errors.length) {
  console.error('Validation failed:')
  for (const err of errors) console.error(` - ${err}`)
  process.exit(1)
}

console.log(
  `OK: ${sections.length} sections, ${questions.length} questions, ${hints.length} hints, ${localization.length} localization keys`,
)
