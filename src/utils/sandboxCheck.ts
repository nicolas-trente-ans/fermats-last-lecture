/** Normalize a target slot to the list of accepted block ids (preferred first). */
export function acceptedTargetIds(slot: string | string[]): string[] {
  if (Array.isArray(slot)) return slot.filter(Boolean)
  return slot ? [slot] : []
}

/** Preferred (first) accepted id for a target slot, or null if empty. */
export function preferredTargetId(slot: string | string[]): string | null {
  const ids = acceptedTargetIds(slot)
  return ids[0] ?? null
}

/** Exact slot match against the authored target map (arrays = any accepted id). */
export function matchesTarget(
  fills: Record<string, string>,
  target: Record<string, string | string[]>,
): boolean {
  const keys = Object.keys(target)
  if (keys.length === 0) return false
  return keys.every((key) => acceptedTargetIds(target[key]).includes(fills[key]))
}

/** Build fills from start map (repair / reset). */
export function initialFills(start: Record<string, string>): Record<string, string> {
  return { ...start }
}
