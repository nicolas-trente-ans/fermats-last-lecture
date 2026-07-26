/** Exact slot match against the authored target map. */
export function matchesTarget(
  fills: Record<string, string>,
  target: Record<string, string>,
): boolean {
  const keys = Object.keys(target)
  if (keys.length === 0) return false
  return keys.every((key) => fills[key] === target[key])
}

/** Build fills from start map (repair / reset). */
export function initialFills(start: Record<string, string>): Record<string, string> {
  return { ...start }
}
