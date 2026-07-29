# Logic game authoring (NNG-style)

Sandboxes live in `public/assets/data/sandboxes/{section_id}.json` with strings in `public/assets/data/localization/sandboxes/{section_id}.csv`.

The game is a **standalone page** at `/summarizer`, attached on the home page as a **Chapter 1 mini-app** (`chapter-apps.csv`). Later chapters can add their own mini-apps the same way. The play pattern follows the [Natural Number Game](https://adam.math.hhu.de/#/g/leanprover-community/nng4): **worlds → numbered levels**, plus an **inventory** of symbols that grows when you certify lemmas.

## Player flow

1. Complete a lecture section (same gate as the knowledge check).
2. From **Chapter 1 → Logic game** (or the header shortcut), open the hub.
3. Enter that section’s **world**; levels unlock in order along the notes’ argument.
4. Tap inventory / palette chips into sockets; **Check** certifies the lemma.
5. Certified lines go on the **proof board** as `board_label` text (frames are play-only). Optional `cite` or an `L*` / `CFL` unlock shows a block badge for later reference; hover the badge to read optional `evidence_key` (full proof sketch), falling back to the level prompt. `unlocks` also add symbols to inventory.

## Chapter mini-apps

`public/assets/data/chapter-apps.csv` lists apps under a chapter on the home page:

| Column | Role |
|--------|------|
| `chapter` | Matches `sections.csv` chapter id (e.g. `1`) |
| `id` | Stable app id |
| `title_key` / `lede_key` | Localization |
| `route` | In-app path (e.g. `/summarizer`) |
| `order` | Sort within the chapter |

## File shape

```json
{
  "section_id": "flt-n3",
  "starting_inventory": [],
  "chains": [
    {
      "id": "flt-n3",
      "title_key": "sb.flt_n3.chain_title",
      "puzzles": [
        {
          "id": "flt-n3-claim",
          "mode": "translate",
          "requires_global": ["symbols-flt-repair"],
          "palette": ["exists", "nexists", "forall"],
          "target": { "0": "nexists" },
          "unlocks": []
        }
      ]
    }
  ]
}
```

Each `chains[]` entry becomes one **world** (`/summarizer/:worldId/:levelId`).

### Inventory rules

| Field | Role |
|-------|------|
| `starting_inventory` | Symbols before any level in this world (usually only Notation World) |
| `unlocks` | Added to inventory when the level is certified |
| `cite` | Optional proof-board badge (e.g. `L4a`); if omitted, first `L*` / `CFL` unlock is used |
| `palette` | Candidates; only `palette ∩ inventory` are placeable |
| `requires` / `requires_global` | Level gates |

Every inventory token (`starting_inventory` and `unlocks`) needs:

- `sb.token.{id}` — short chip label (usually in the section sandbox CSV)
- `sb.token.{id}.desc` — description shown when the chip is tapped (`localization/sandboxes/inventory.csv`)

Frame-only chrome tokens only need the label key.

Author levels to track the notes’ graphic schema step-by-step. `yarn validate-entities` checks palette reachability assuming prior worlds are finished.

## Chapter 1 worlds

| World | Section | Spine (aligned to notes) |
|-------|---------|---------------------------|
| Notation | `symbols-notation` | ∃ → ∀ → divides packing → FLT ∄ repair |
| Euler descent n=3 | `flt-n3` | claim → minimal → parity → u±v → gcd∈{1,3} → ±cubes → cubic form → factor → sign pattern → smaller product |
| Fourth-power n=4 | `flt-n4` | claim → square-area lemma → mod 4 → not both odd → primitive → a even → reduction → lemma forbids |

## Checking / persistence

Exact slot match vs `target`. Each socket value may be a single block id or an **array of accepted ids** (first entry preferred for authoring/hints). Session board under `sessionStorage` key `fermat-summarizer-board-v1`. On a level, the proof board shows certified lines **up through the active level only** (replaying an older level hides later lemmas; session progress is unchanged).

## Related

- Section notes: [`CONTENT.md`](CONTENT.md)
- Knowledge checks: [`QUESTION.md`](QUESTION.md)
- Architecture decisions: [`adr/`](adr/)
