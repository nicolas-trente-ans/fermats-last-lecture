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
  ...sections.flatMap((section) =>
    readCsvIfExists(path.join('localization', 'sandboxes', `${section.id}.csv`)),
  ),
  ...readCsvIfExists(path.join('localization', 'sandboxes', 'inventory.csv')),
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

for (const row of localization) {
  if (!row.key) errors.push('localization: row without key')
  if (!row.en) errors.push(`localization: missing en for ${row.key}`)
}

function readJsonIfExists(relativePath) {
  const full = path.join(dataDir, relativePath)
  if (!fs.existsSync(full)) return null
  try {
    return JSON.parse(fs.readFileSync(full, 'utf8'))
  } catch (err) {
    errors.push(`${relativePath}: invalid JSON (${err.message})`)
    return null
  }
}

const organizers = new Set(['expository', 'comparative', 'narrative', 'graphic'])
const sandboxModes = new Set(['translate', 'repair'])
let sandboxCount = 0
let puzzleCount = 0
const allPuzzleIds = new Set()

for (const section of sections) {
  const relative = path.join('sandboxes', `${section.id}.json`)
  const raw = readJsonIfExists(relative)
  if (!raw) continue
  sandboxCount += 1
  if (raw.section_id && raw.section_id !== section.id) {
    errors.push(`${relative}: section_id ${raw.section_id} does not match file section`)
  }
  const startingInventory = Array.isArray(raw.starting_inventory) ? raw.starting_inventory : []
  for (const token of startingInventory) {
    neededKeys.add(`sb.token.${token}`)
    neededKeys.add(`sb.token.${token}.desc`)
  }
  if (!Array.isArray(raw.chains) || raw.chains.length === 0) {
    errors.push(`${relative}: needs a non-empty chains array`)
    continue
  }
  const puzzleIdsInFile = new Set()
  for (const chain of raw.chains) {
    if (!chain.id) errors.push(`${relative}: chain missing id`)
    if (!chain.title_key) errors.push(`${relative}: chain ${chain.id || '?'} missing title_key`)
    else neededKeys.add(chain.title_key)
    if (!Array.isArray(chain.puzzles) || chain.puzzles.length === 0) {
      errors.push(`${relative}: chain ${chain.id || '?'} needs puzzles`)
      continue
    }
    const earlierInChain = []
    for (const puzzle of chain.puzzles) {
      puzzleCount += 1
      const label = `${relative} puzzle ${puzzle.id || '?'}`
      for (const field of [
        'id',
        'mode',
        'organizer',
        'prompt_key',
        'hint_key',
        'board_label_key',
        'frame',
        'sockets',
        'palette',
        'target',
      ]) {
        if (puzzle[field] === undefined || puzzle[field] === null || puzzle[field] === '') {
          errors.push(`${label}: missing ${field}`)
        }
      }
      if (puzzle.id) {
        if (puzzleIdsInFile.has(puzzle.id)) errors.push(`${label}: duplicate puzzle id`)
        puzzleIdsInFile.add(puzzle.id)
        allPuzzleIds.add(puzzle.id)
      }
      if (puzzle.mode && !sandboxModes.has(puzzle.mode)) {
        errors.push(`${label}: bad mode ${puzzle.mode}`)
      }
      if (puzzle.organizer && !organizers.has(puzzle.organizer)) {
        errors.push(`${label}: bad organizer ${puzzle.organizer}`)
      }
      if (puzzle.prompt_key) neededKeys.add(puzzle.prompt_key)
      if (puzzle.hint_key) neededKeys.add(puzzle.hint_key)
      if (puzzle.board_label_key) neededKeys.add(puzzle.board_label_key)
      if (puzzle.evidence_key) neededKeys.add(puzzle.evidence_key)
      if (puzzle.review_section_id && !sectionIds.has(puzzle.review_section_id)) {
        errors.push(`${label}: unknown review_section_id ${puzzle.review_section_id}`)
      }
      const frame = Array.isArray(puzzle.frame) ? puzzle.frame : []
      const sockets = Array.isArray(puzzle.sockets) ? puzzle.sockets : []
      const palette = Array.isArray(puzzle.palette) ? puzzle.palette : []
      const unlocks = Array.isArray(puzzle.unlocks) ? puzzle.unlocks : []
      const target = puzzle.target && typeof puzzle.target === 'object' ? puzzle.target : {}
      const start = puzzle.start && typeof puzzle.start === 'object' ? puzzle.start : {}
      for (const socket of sockets) {
        if (!frame.includes(socket)) {
          errors.push(`${label}: socket ${socket} not in frame`)
        }
      }
      if (sockets.length === 0) errors.push(`${label}: needs at least one socket`)
      for (let i = 0; i < sockets.length; i += 1) {
        const key = String(i)
        if (!target[key]) errors.push(`${label}: target missing key ${key}`)
        else {
          const accepted = Array.isArray(target[key]) ? target[key] : [target[key]]
          if (accepted.length === 0) {
            errors.push(`${label}: target ${key} is an empty array`)
          }
          for (const block of accepted) {
            if (!palette.includes(block)) {
              errors.push(`${label}: target ${block} not in palette`)
            }
          }
        }
      }
      for (const [key, slot] of Object.entries(target)) {
        const index = Number(key)
        if (Number.isNaN(index) || index < 0 || index >= sockets.length) {
          errors.push(`${label}: target key ${key} out of socket range`)
        }
        const accepted = Array.isArray(slot) ? slot : [slot]
        for (const block of accepted) {
          if (block) neededKeys.add(`sb.token.${block}`)
        }
      }
      for (const [key, block] of Object.entries(start)) {
        const index = Number(key)
        if (Number.isNaN(index) || index < 0 || index >= sockets.length) {
          errors.push(`${label}: start key ${key} out of socket range`)
        }
        if (block && !palette.includes(block)) {
          errors.push(`${label}: start ${block} not in palette`)
        }
        if (block) neededKeys.add(`sb.token.${block}`)
      }
      for (const token of frame) {
        neededKeys.add(`sb.token.${token}`)
      }
      for (const block of palette) {
        neededKeys.add(`sb.token.${block}`)
      }
      for (const block of unlocks) {
        neededKeys.add(`sb.token.${block}`)
        neededKeys.add(`sb.token.${block}.desc`)
      }
      const requires = Array.isArray(puzzle.requires)
        ? puzzle.requires
        : earlierInChain.length
          ? [earlierInChain[earlierInChain.length - 1]]
          : []
      for (const req of requires) {
        if (!earlierInChain.includes(req)) {
          errors.push(`${label}: requires ${req} must refer to an earlier puzzle in the same chain`)
        }
      }
      if (Array.isArray(puzzle.requires_global)) {
        for (const req of puzzle.requires_global) {
          if (!req) errors.push(`${label}: empty requires_global entry`)
        }
      }
      earlierInChain.push(puzzle.id)
    }
  }
}

// Second pass: requires_global refer to known puzzles; palette reachable via inventory timeline
for (const section of sections) {
  const relative = path.join('sandboxes', `${section.id}.json`)
  const raw = readJsonIfExists(relative)
  if (!raw || !Array.isArray(raw.chains)) continue
  const sectionOrder = Number(section.order)
  for (const chain of raw.chains) {
    if (!Array.isArray(chain.puzzles)) continue
    const earlierInChain = []
    let inventory = new Set()
    for (const worldSection of sections) {
      if (Number(worldSection.order) > sectionOrder) continue
      const other = readJsonIfExists(path.join('sandboxes', `${worldSection.id}.json`))
      if (!other) continue
      for (const token of other.starting_inventory || []) inventory.add(token)
      if (Number(worldSection.order) < sectionOrder) {
        for (const otherChain of other.chains || []) {
          for (const p of otherChain.puzzles || []) {
            for (const token of p.unlocks || []) inventory.add(token)
          }
        }
      }
    }
    for (const puzzle of chain.puzzles) {
      const label = `${relative} puzzle ${puzzle.id || '?'}`
      for (const req of puzzle.requires_global || []) {
        if (!allPuzzleIds.has(req)) {
          errors.push(`${label}: unknown requires_global ${req}`)
        }
      }
      for (const block of puzzle.palette || []) {
        if (!inventory.has(block)) {
          errors.push(
            `${label}: palette block ${block} is not in inventory yet (starting_inventory / prior unlocks)`,
          )
        }
      }
      for (const token of puzzle.unlocks || []) inventory.add(token)
      earlierInChain.push(puzzle.id)
    }
  }
}

for (const key of neededKeys) {
  if (!locKeys.has(key)) errors.push(`localization: missing key ${key}`)
}

const chapterApps = readCsvIfExists('chapter-apps.csv')
const chapterIds = new Set(sections.map((s) => s.chapter))
for (const row of chapterApps) {
  for (const field of ['chapter', 'id', 'title_key', 'route']) {
    if (!row[field]) errors.push(`chapter-apps.csv: missing ${field}`)
  }
  if (row.chapter && !chapterIds.has(row.chapter)) {
    errors.push(`chapter-apps.csv: unknown chapter ${row.chapter}`)
  }
  if (row.title_key && !locKeys.has(row.title_key)) {
    errors.push(`localization: missing key ${row.title_key}`)
  }
  if (row.lede_key && !locKeys.has(row.lede_key)) {
    errors.push(`localization: missing key ${row.lede_key}`)
  }
}

if (errors.length) {
  console.error('Validation failed:')
  for (const err of errors) console.error(` - ${err}`)
  process.exit(1)
}

console.log(
  `OK: ${sections.length} sections, ${questions.length} questions, ${hints.length} hints, ${sandboxCount} sandboxes, ${puzzleCount} puzzles, ${chapterApps.length} chapter apps, ${localization.length} localization keys`,
)
