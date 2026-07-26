import type { SandboxPuzzle, SummarizerWorld } from '@/models'
import { certifiedIds } from '@/utils/summarizerBoard'

/** Inventory = all worlds' starting symbols plus unlocks from certified levels. */
export function computeInventory(worlds: SummarizerWorld[], doneIds?: Set<string>): Set<string> {
  const done = doneIds ?? certifiedIds()
  const inventory = new Set<string>()
  for (const world of worlds) {
    for (const token of world.startingInventory) inventory.add(token)
    for (const level of world.levels) {
      if (!done.has(level.id)) continue
      for (const token of level.unlocks) inventory.add(token)
    }
  }
  return inventory
}

/** Placeable chips for a level: authored palette ∩ current inventory. */
export function placeablePalette(level: SandboxPuzzle, inventory: Set<string>): string[] {
  return level.palette.filter((id) => inventory.has(id))
}

export function isLevelUnlocked(level: SandboxPuzzle, doneIds?: Set<string>): boolean {
  const done = doneIds ?? certifiedIds()
  return (
    level.requires.every((id) => done.has(id)) &&
    level.requiresGlobal.every((id) => done.has(id))
  )
}

export function isWorldPlayable(
  world: SummarizerWorld,
  isSectionComplete: (sectionId: string) => boolean,
): boolean {
  return isSectionComplete(world.sectionId)
}
