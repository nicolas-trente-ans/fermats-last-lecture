import type { CertifiedBoardEntry } from '@/models'

export const SUMMARIZER_BOARD_KEY = 'fermat-summarizer-board-v1'

interface BoardStore {
  entries: CertifiedBoardEntry[]
}

function readStore(): BoardStore {
  try {
    const raw = sessionStorage.getItem(SUMMARIZER_BOARD_KEY)
    if (!raw) return { entries: [] }
    const parsed = JSON.parse(raw) as BoardStore
    if (!parsed || !Array.isArray(parsed.entries)) return { entries: [] }
    return parsed
  } catch {
    return { entries: [] }
  }
}

function writeStore(store: BoardStore): void {
  sessionStorage.setItem(SUMMARIZER_BOARD_KEY, JSON.stringify(store))
}

export function loadCertifiedBoard(): CertifiedBoardEntry[] {
  return readStore().entries
}

export function isPuzzleCertified(puzzleId: string): boolean {
  return readStore().entries.some((entry) => entry.puzzleId === puzzleId)
}

export function certifyPuzzle(entry: CertifiedBoardEntry): CertifiedBoardEntry[] {
  const store = readStore()
  const without = store.entries.filter((e) => e.puzzleId !== entry.puzzleId)
  const next = [...without, entry]
  writeStore({ entries: next })
  return next
}

export function certifiedIds(): Set<string> {
  return new Set(readStore().entries.map((e) => e.puzzleId))
}

export function clearCertifiedBoard(): void {
  writeStore({ entries: [] })
}
