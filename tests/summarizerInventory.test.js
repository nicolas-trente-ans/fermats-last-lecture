import assert from 'node:assert/strict'
import test from 'node:test'

function computeInventory(worlds, doneIds) {
  const done = doneIds ?? new Set()
  const inventory = new Set()
  for (const world of worlds) {
    for (const token of world.startingInventory) inventory.add(token)
    for (const level of world.levels) {
      if (!done.has(level.id)) continue
      for (const token of level.unlocks) inventory.add(token)
    }
  }
  return inventory
}

function placeablePalette(level, inventory) {
  return level.palette.filter((id) => inventory.has(id))
}

test('inventory grows from starting symbols and certified unlocks', () => {
  const worlds = [
    {
      startingInventory: ['exists', 'nexists', 'forall'],
      levels: [
        { id: 'a', unlocks: [] },
        { id: 'b', unlocks: ['assume', 'minimal'] },
      ],
    },
    {
      startingInventory: [],
      levels: [{ id: 'c', unlocks: ['exactly_one'] }],
    },
  ]
  const before = computeInventory(worlds, new Set())
  assert.equal(before.has('exists'), true)
  assert.equal(before.has('assume'), false)

  const afterB = computeInventory(worlds, new Set(['a', 'b']))
  assert.equal(afterB.has('assume'), true)
  assert.equal(afterB.has('exactly_one'), false)

  const afterC = computeInventory(worlds, new Set(['a', 'b', 'c']))
  assert.equal(afterC.has('exactly_one'), true)
})

test('placeable palette is inventory intersect authored palette', () => {
  const level = { palette: ['assume', 'conclude', 'minimal'] }
  const inventory = new Set(['assume', 'minimal', 'exists'])
  assert.deepEqual(placeablePalette(level, inventory), ['assume', 'minimal'])
})
