import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

// Mirror csv parse used in src (keep test free of TS transpile)
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
      } else if (ch === '"') inQuotes = false
      else field += ch
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
  if (field.length || row.length) {
    row.push(field)
    rows.push(row)
  }
  const headers = rows[0].map((h) => h.trim())
  return rows.slice(1).filter((r) => r.some((c) => c.trim())).map((r) => {
    const record = {}
    headers.forEach((h, i) => {
      record[h] = (r[i] ?? '').trim()
    })
    return record
  })
}

function normalizeMatchAnswer(value) {
  return value.trim().toLowerCase().normalize('NFKC').replace(/\s+/g, '')
}

test('csv parser handles quoted commas', () => {
  const rows = parseCsv('a,b\n"hello, world",2\n')
  assert.equal(rows[0].a, 'hello, world')
  assert.equal(rows[0].b, '2')
})

test('basic-sets questions exist and answers are consistent', () => {
  const questions = parseCsv(
    readFileSync(join(root, 'public/assets/data/questions/basic-sets.csv'), 'utf8'),
  )
  const organizers = new Set(['expository', 'comparative', 'narrative', 'graphic'])
  assert.ok(questions.length > 3, 'pool should exceed one quiz draw')
  for (const q of questions) {
    assert.equal(q.section_id, 'basic-sets')
    assert.equal(q.type, 'mc')
    assert.ok(organizers.has(q.organizer), q.id)
    const choices = q.choices_keys.split('|')
    assert.ok(choices.includes(q.answer), q.id)
  }
  const kindsUsed = new Set(questions.map((q) => q.organizer))
  assert.ok(kindsUsed.has('expository'))
  assert.ok(kindsUsed.has('comparative'))
  assert.ok(kindsUsed.has('narrative'))
  assert.ok(kindsUsed.has('graphic'))
})
test('match normalization accepts unicode symbols', () => {
  assert.equal(normalizeMatchAnswer(' ℕ '), 'ℕ'.toLowerCase().normalize('NFKC'))
  assert.equal(normalizeMatchAnswer('Natural Numbers'), 'naturalnumbers')
})

test('validate-entities script exits cleanly', async () => {
  const require = createRequire(import.meta.url)
  const { spawnSync } = require('node:child_process')
  const result = spawnSync(process.execPath, [join(root, 'scripts/validate-entities.mjs')], {
    encoding: 'utf8',
  })
  assert.equal(result.status, 0, result.stderr || result.stdout)
})
