# Question authoring (Ausubel)

Knowledge checks live in `public/assets/data/questions/{section}.csv`, with strings in `public/assets/data/localization/questions/{section}.csv` and hints wired in `public/assets/data/hints.csv`. English (`en`) is the source of truth; translate only after the English bank is settled.

## Ausubel’s advanced organizers (what we mean)

David Ausubel argued that people learn new ideas best when those ideas are **anchored to what they already know**, under a clear **organizing framework**, rather than by rote memorization of isolated facts. An *advanced organizer* is a brief, more general idea presented (or re-activated) so that later specifics have a place to attach.

For our quizzes, the notes are the first organizer; the questions continue that work. Each item should help the learner **subsume** a new idea under a prior one, **compare** related ideas, or **integrate** after a distinction has been made — not merely recognize a sentence from the page.

Interaction format (`mc` / `match`) is separate from **organizer kind**. Organizer = pedagogical role; `type` = how the learner responds.

## Multiple choice vs short answer (`mc` / `match`)

Ausubel’s point is that learning sticks when the learner **actively relates** new material to an existing organizer. The response format changes *how* that relating happens — recognition under scaffolding vs production from the organizer — not *whether* the item is Ausubelian.

| | Multiple choice (`mc`) | Short answer (`match`) |
|--|------------------------|-------------------------|
| What the learner does | **Select** among ready-made relational claims | **Produce** a symbol, name, or short label from the organizer |
| Cognitive load on the organizer | Lower: distractors *show* rival subsumptions; the learner discriminates | Higher: nothing lists the alternatives; the learner must retrieve under the right hook |
| Best Ausubel use | Teach/test **which relation is correct** when near-miss organizers compete | Confirm that a **label or notation is attached** to an organizer already built (often in notes or a prior `mc`) |
| Risk if misused | Guessing among facts with no relational choices (rote recognition) | Isolated symbol drill with no prompt that names the prior idea (rote recall) |

### Multiple choice and meaningful learning

Use `mc` when the intellectual work is **discrimination among meanings**:

- Expository: several candidate definitions; only one matches the lecture’s organizer.
- Comparative: rival contrasts (√2 in ℝ not ℚ vs the reverse).
- Narrative: rival “why next?” stories.
- Graphic: rival chains or schemas written out as choices.

Distractors should be **plausible wrong organizers** (swapped containment, erased distinction, false bridge), not random noise. That forces *integrative reconciliation* — deciding which claim fits the advanced organizer — which is the Ausubel move. Prefer short **explanatory** choices over single symbols when the goal is the relation, not the glyph.

### Short answer and meaningful learning

Use `match` when the intellectual work is **anchoring a compact response** to an organizer the prompt (or recent notes) has already made available:

- After an expository or comparative idea is clear, ask for the usual symbol or English name (`ℕ`, `naturals`, …).
- After a graphic schema is known, ask for a short structural label the notes use (only if one short string is a fair target).
- Rarely for full comparative/narrative *claims* — those are hard to grade as free text and belong in `mc`.

In CSV, `answer` is a pipe-separated accept list (`N|ℕ|naturals`). Normalization ignores case and whitespace. Keep accept lists tight to the lecture’s language so success means “this label is bound to that organizer,” not “any paraphrase of a paragraph.”

**Ausubel constraint for `match`:** the prompt must still **cue the organizer** (restate or name the idea). A bare “Symbol for naturals?” with no lecture frame collapses into rote recall. Prefer: “In the lecture, the set of counting numbers 1, 2, 3, … is written with which symbol (or English name)?”

### How format and organizer kind combine

| Organizer | Prefer `mc` when… | Prefer `match` when… |
|-----------|-------------------|----------------------|
| Expository | Choosing among definitions / roles | Producing the standard symbol or name once the definition is fixed |
| Comparative | Choosing among rival contrasts | Almost never (relations need statements, not one token) |
| Narrative | Choosing among bridges / “why next?” | Almost never (stories need clauses) |
| Graphic | Choosing among written chains / schemas | Short label for a named schema only if the notes fix one word/symbol |

**Bank mix:** lean on `mc` for the meaningful-learning core (especially comparative, narrative, graphic). Sprinkle `match` as **consolidation** after an organizer exists — often later in the section or as follow-ups to ideas already probed by `mc`. Do not open a bank with symbol-only `match` items.

### Anti-patterns

- `mc` whose choices are four unrelated symbols with no relational claim in the prompt.
- `match` that accepts a long free essay (this app grades short tokens only).
- Using `match` to “make it harder” without a clearer organizer in the prompt — difficulty without subsumption is still rote.
- Translating `match` accept lists into joke synonyms in `pirate` that change the math claim; keep formal tokens stable across locales.

## Four organizer kinds

Tag every question with `organizer` in the section CSV:

| Kind | CSV value | Job |
|------|-----------|-----|
| Expository | `expository` | Broad overview for learners with little prior hook — “what kind of thing is this?” |
| Comparative | `comparative` | New idea vs familiar idea — “how is A like/unlike B?” |
| Narrative | `narrative` | Path through ideas — “we had X; then we needed Y; so we got Z” |
| Skimming / graphic | `graphic` | Structure preview — chain, table, schema, or “which diagram fits?” |

### Section bank recipe

Build each bank roughly in this order:

1. **1–2 expository** openers (easy anchors; usually `mc`, optionally a consolidating `match`)
2. **Several comparative** mid items (relations and contrasts; almost always `mc`)
3. **At least one graphic** item if the notes introduce a chain, table, or schema (`mc`)
4. **1–2 narrative** closers that stitch this section to earlier ones (`mc`)

Keep the **pool larger than one quiz draw** (`QUIZ_SIZE`) so rechecks sample different items.

---

## Question templates

Use these as drafting scaffolds. Default to `mc` with short explanatory choices for relational work; use `match` for symbol/name consolidation once an organizer is in play. Replace `A` / `B` with concrete objects from the lecture.

### Expository

**Job:** establish or restate a single organizing idea.

| Slot | Guidance |
|------|----------|
| Prompt | Frame a broad “what is this?” without asking for a bare symbol. |
| Choices (`mc`) | Short definitional claims; one precise, others near-misses that sound plausible. |
| Accept list (`match`) | Symbol and/or English name only after the definition is cued in the prompt. |
| Hint | Name the organizer (e.g. “counting numbers”), not the answer letter. |

**Prompt templates (`mc`)**

- In the lecture sense, which claim best describes *A*?
- Which statement captures what *A* is for, before we use it later?
- Given that *A* means ___(short restatement)___, which claim follows?

**Choice templates (`mc`)**

- *A* is the set of ___ (correct organizer).
- *A* is the same as *B* (confuses two nearby sets).
- *A* is only a notation, not a set of numbers (denies the organizer).

**Prompt templates (`match`)**

- In the lecture, the set of ___ (organizer restated) is written with which symbol or English name?
- After the notes’ definition of *A*, what standard symbol (or name) do we use?

**Example angle (basic sets):** `mc` — “Which claim best describes ℕ as used in the lecture?” → counting numbers 1, 2, 3, …. `match` — same organizer cued; `answer` = `N|ℕ|naturals` (no `choices_keys`).

### Comparative

**Job:** attach the new idea by contrast with something already known. Prefer **`mc`**.

| Slot | Guidance |
|------|----------|
| Prompt | Explicitly name both sides of the comparison. |
| Choices | Rival relations (“in ℝ not ℚ” vs the reverse), not unrelated trivia. |
| Hint | Point at the comparison axis (ratio of integers, completeness, …). |

**Prompt templates**

- How does *X* sit relative to *A* and *B*?
- What is the difference between *relation₁* and *relation₂* in this example?
- Which claim correctly contrasts *A* with *B*?

**Choice templates**

- *X* belongs to *B* but not to *A* (correct contrast).
- *X* belongs to *A* but not to *B* (swapped).
- *A* and *B* are the same here (erases the distinction).

**Example angle (basic sets):** √2 relative to ℚ and ℝ; ∈ vs ⊂; ℂ vs ℝ×ℝ as structures.

### Narrative

**Job:** place the idea in the lecture’s path — prior hook → need → new object. Prefer **`mc`**.

| Slot | Guidance |
|------|----------|
| Prompt | Mention what was already secured and why the next step appears. |
| Choices | Motivational or structural reasons tied to prior learning. |
| Hint / `review_section_id` | Point back to the earlier section that supplied the hook when useful. |

**Prompt templates**

- We already had *A*. Why does the lecture introduce *B* next?
- Once *A* is in place, which story best explains the move to *B*?
- How does *B* continue the line of thinking that started with *A*?

**Choice templates**

- *A* was not enough for ___; *B* supplies that (correct bridge).
- *B* replaces *A* entirely (overstates the break).
- *B* is unrelated vocabulary (denies the bridge).

**Example angle (basic sets):** ℕ → ℤ (need additive inverses / negatives); ℝ → ℂ (need √−1 / richer arithmetic).

### Graphic / skimming

**Job:** preview or test the **structure** of the material (chain, table, schema). Prefer **`mc`**; `match` only for a fixed short label.

| Slot | Guidance |
|------|----------|
| Prompt | Ask which diagram, chain, or schema matches the notes. |
| Choices (`mc`) | Competing structures stated in text (correct chain vs scrambled). |
| Hint | How to read the figure (“left-to-right means sits inside”), not the full answer again. |

**Prompt templates**

- Which inclusion chain matches the lecture?
- Which schema describes *A* here (e.g. ℝ² as a Cartesian product)?
- If you skim the headings / big picture, which outline fits this section?

**Choice templates**

- ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ (correct structure).
- Scrambled or reversed chain (structure error).
- Chain that inserts a false containment (near-miss structure).

**Example angle (basic sets):** the number-set chain; ℕ×ℕ ⊂ ℝ×ℝ from ℕ ⊂ ℝ.

---

## How the kinds cover the old rules

- **Expository** — start from what is known; general prompt / specific answer / specific hint; restate definitions when the skill is use, not wording recall; `match` only to bind a label after that.
- **Comparative** — relationships over isolated facts; explicit contrasts; refine / split nearby ideas after a framework exists (`mc`).
- **Narrative** — bridge old domains into new ones; integrate after a refinement; always ask how this fits with something learnt before (`mc`).
- **Graphic** — structure items (chains, products, schemas); prefer explanation over bare symbol recall (`mc`).

Across all kinds:

- Prefer explanation over recall; vary phrasing so redraws are not pure memorization.
- Hints cue the organizer; they do not spoil the answer word-for-word.
- When the miss is clearly about a prior organizer, set `review_section_id`; otherwise leave it blank.

## Practical constraints in this app

- CSV columns: `id,section_id,type,organizer,prompt_key,answer,choices_keys,weight,review_section_id`
- `type`: `mc` | `match`
  - `mc`: require `choices_keys` (pipe-separated localization keys); `answer` is the correct choice key.
  - `match`: leave `choices_keys` empty; `answer` is a pipe-separated accept list of short strings (symbols/names), graded after normalization.
- Prefer `mc` for relational / comparative / narrative / graphic discrimination; use `match` for symbol/name consolidation under a cued organizer.
- `organizer`: `expository` | `comparative` | `narrative` | `graphic` (required).
- A check draws a small sample (`QUIZ_SIZE`, default 3) from unanswered items in the section prefix. Override per section with optional `quiz_size` in `sections.csv`.
- Keep symbol lines and formal math aligned across locales; translate prose. For `pirate`, lean into cringe humor without changing the math claim.
- Hints: one clear hint per item is enough unless scaffolding steps are intentional (`hint_order`).

## Section checklist

Before shipping a bank:

- [ ] At least one **expository** and one **comparative** item
- [ ] At least one **graphic** item if the notes introduce a chain, table, or schema
- [ ] At least one **narrative** item that cites a prior organizer (or uses `review_section_id`)
- [ ] First items are easy anchors; later items refine and integrate
- [ ] Most prompts compare, relate, narrate, or structure — not bare recall
- [ ] `mc` distractors are rival organizers / relations, not random noise
- [ ] Any `match` items cue the organizer in the prompt and use a tight accept list
- [ ] Definitions appear in prompts when the skill is use, not recall of wording
- [ ] Pool size > quiz draw size; angles vary enough that redraws are not pure memorization
- [ ] Every row has a valid `organizer` tag
- [ ] Localization keys exist for prompt, choices, and hints in `en` (then other locales)
- [ ] `review_section_id` is used sparingly and only points at an earlier section that actually teaches the missing idea
