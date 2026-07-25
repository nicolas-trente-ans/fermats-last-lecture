# Content authoring

Section notes live in `public/assets/content/{locale}/`. English (`en`) is the source of truth. Do not translate until the English draft is approved.

## Opening every section

Right after the section title (before the first concept), always tell the learner:

- It is **okay** if they do not understand some aspect of the notes yet — that is expected.
- Encourage them to **read what they can**, skip or skim what is cloudy, and come back later as symbols and ideas return in later sections.

Keep this short (one or two sentences). Do not apologize for the material; normalize partial understanding.

## Section note structure

For each concept, prefer this order:

1. **Shorthand** — symbol and short name (`**ℕ**: The set of natural numbers.`)
2. **Visual by example** — informal set listing or concrete instances (`**ℕ** = {1, 2, 3, …}`)
3. **English definition** — plain prose
4. **Notes** — conventions, caveats, common variants (optional)
5. **Formal math / English** — LaTeX definition that may mix symbols and words; use more symbols only after those symbols have been introduced elsewhere in the notes

Keep early material simple. Prefer soft wording for properties that are true but not unique characterizations (e.g. reals “share” arithmetic closure; do not claim that alone defines ℝ).

## Symbol introduction

- Do not use a symbol until it has been introduced in the notes (or in an earlier section the learner already saw).
- In particular, avoid `∀`, `∃`, and similar quantifier notation until a dedicated introduction exists. Spell the idea in words instead (`every`, `some`, `there is`).
- When a formal block must refer to membership or inclusion, reuse only symbols already taught (`∈`, `∉`, `⊂`, …) plus English.

## Number-system notes

- Give **ℕ**, **ℤ**, **ℚ**, **ℝ**, and **ℂ** each their own section when covering common number sets.
- State course conventions explicitly when authors disagree (e.g. ℕ starts at 1 here).
- Formal definitions for ℝ may state useful properties (closure under +, −, ×, ÷) without pretending they are a complete construction.

## Locales

- Edit `en` first; mirror structure in `fr`, `hu`, `pirate`, etc. only after English is settled.
- Keep symbol lines and formal math aligned across locales; translate prose and notes.
- **`pirate`** is a joke locale for people who cannot pay attention. Lean hard into pirate dialect, sea-shanty puns, and cringe humor — the more unbearable the better — while still teaching the same math facts as `en`.

## Related

- Knowledge-check authoring (Ausubel / advanced organizers): see `public/assets/data/QUESTION.md`.
