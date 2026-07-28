import assert from 'node:assert/strict'
import test from 'node:test'

// Mirror src/utils/sandboxCheck.ts (keep test free of TS transpile)
function acceptedTargetIds(slot) {
  if (Array.isArray(slot)) return slot.filter(Boolean)
  return slot ? [slot] : []
}

function matchesTarget(fills, target) {
  const keys = Object.keys(target)
  if (keys.length === 0) return false
  return keys.every((key) => acceptedTargetIds(target[key]).includes(fills[key]))
}

function initialFills(start) {
  return { ...start }
}

test('matchesTarget requires every target slot', () => {
  assert.equal(matchesTarget({ 0: 'nexists' }, { 0: 'nexists' }), true)
  assert.equal(matchesTarget({ 0: 'exists' }, { 0: 'nexists' }), false)
  assert.equal(matchesTarget({ 0: 'assume', 1: 'minimal' }, { 0: 'assume', 1: 'minimal' }), true)
  assert.equal(matchesTarget({ 0: 'assume' }, { 0: 'assume', 1: 'minimal' }), false)
  assert.equal(matchesTarget({}, { 0: 'nexists' }), false)
  assert.equal(matchesTarget({ 0: 'nexists' }, {}), false)
})

test('matchesTarget accepts any id in an array slot (first is preferred)', () => {
  const target = { 0: 'n2', 1: ['z', 'x', 'y'] }
  assert.equal(matchesTarget({ 0: 'n2', 1: 'z' }, target), true)
  assert.equal(matchesTarget({ 0: 'n2', 1: 'x' }, target), true)
  assert.equal(matchesTarget({ 0: 'n2', 1: 'y' }, target), true)
  assert.equal(matchesTarget({ 0: 'n2', 1: 'p' }, target), false)
  assert.equal(matchesTarget({ 0: 'n3', 1: 'z' }, target), false)
})

test('initialFills copies start map', () => {
  const start = { 0: 'exists' }
  const fills = initialFills(start)
  assert.deepEqual(fills, { 0: 'exists' })
  fills[0] = 'nexists'
  assert.equal(start[0], 'exists')
})
