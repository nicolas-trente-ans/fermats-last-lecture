# Logic game authoring (NNG-style)

Sandboxes live in `public/assets/data/sandboxes/{section_id}.json` with strings in `public/assets/data/localization/sandboxes/{section_id}.csv`.

The game is a **standalone page** at `/summarizer`, attached on the home page as a **Chapter 1 mini-app** (`chapter-apps.csv`). Later chapters can add their own mini-apps the same way. The play pattern follows the [Natural Number Game](https://adam.math.hhu.de/#/g/leanprover-community/nng4): **worlds → numbered levels**, plus an **inventory** of symbols that grows when you certify lemmas.

## Player flow

1. Complete a lecture section (same gate as the knowledge check).
2. From **Chapter 1 → Logic game** (or the header shortcut), open the hub.
3. Enter that section’s **world**; levels unlock in order along the notes’ argument.
4. Tap inventory / palette chips into sockets; **Check** certifies the lemma.
5. Certified lines go on the **proof board**; `unlocks` add new symbols for later levels/worlds.

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

Exact slot match vs `target`. Session board under `sessionStorage` key `fermat-summarizer-board-v1`.
