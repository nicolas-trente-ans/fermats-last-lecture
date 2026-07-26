# Question authoring (Ausubel)

Knowledge checks live in `public/assets/data/questions/{section}.csv`, with strings in `public/assets/data/localization/questions/{section}.csv` and hints wired in `public/assets/data/hints.csv`. English (`en`) is the source of truth; translate only after the English bank is settled.

## Ausubel’s advanced organizers (what we mean)

David Ausubel argued that people learn new ideas best when those ideas are **anchored to what they already know**, under a clear **organizing framework**, rather than by rote memorization of isolated facts. An _advanced organizer_ is a brief, more general idea presented (or re-activated) so that later specifics have a place to attach.

For our quizzes, the notes are the first organizer; the questions continue that work. Each item should help the learner **subsume** a new idea under a prior one, **compare** related ideas, or **integrate** after a distinction has been made — not merely recognize a sentence from the page.

Interaction format (`mc` / `match`) is separate from **organizer kind**. Organizer = pedagogical role; `type` = how the learner responds.

## Multiple choice vs short answer (`mc` / `match`)

Ausubel’s point is that learning sticks when the learner **actively relates** new material to an existing organizer. The response format changes _how_ that relating happens — recognition under scaffolding vs production from the organizer — not _whether_ the item is Ausubelian.

|                                 | Multiple choice (`mc`)                                                     | Short answer (`match`)                                                                                          |
| ------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| What the learner does           | **Select** among ready-made relational claims                              | **Produce** a symbol, name, or short label from the organizer                                                   |
| Cognitive load on the organizer | Lower: distractors _show_ rival subsumptions; the learner discriminates    | Higher: nothing lists the alternatives; the learner must retrieve under the right hook                          |
| Best Ausubel use                | Teach/test **which relation is correct** when near-miss organizers compete | Confirm that a **label or notation is attached** to an organizer already built (often in notes or a prior `mc`) |
| Risk if misused                 | Guessing among facts with no relational choices (rote recognition)         | Isolated symbol drill with no prompt that names the prior idea (rote recall)                                    |

### Multiple choice and meaningful learning

Use `mc` when the intellectual work is **discrimination among meanings**:

- Expository: several candidate definitions; only one matches the lecture’s organizer.
- Comparative: rival contrasts (√2 in ℝ not ℚ vs the reverse).
- Narrative: rival “why next?” stories.
- Graphic: rival chains or schemas written out as choices.

Distractors should be **plausible wrong organizers** (swapped containment, erased distinction, false bridge), not random noise. That forces _integrative reconciliation_ — deciding which claim fits the advanced organizer — which is the Ausubel move. Prefer short **explanatory** choices over single symbols when the goal is the relation, not the glyph.

### Short answer and meaningful learning

Use `match` when the intellectual work is **anchoring a compact response** to an organizer the prompt (or recent notes) has already made available:

- After an expository or comparative idea is clear, ask for the usual symbol or English name (`ℕ`, `naturals`, …).
- After a graphic schema is known, ask for a short structural label the notes use (only if one short string is a fair target).
- Rarely for full comparative/narrative _claims_ — those are hard to grade as free text and belong in `mc`.

In CSV, `answer` is a pipe-separated accept list (`N|ℕ|naturals`). Normalization ignores case and whitespace. Keep accept lists tight to the lecture’s language so success means “this label is bound to that organizer,” not “any paraphrase of a paragraph.”

**Ausubel constraint for `match`:** the prompt must still **cue the organizer** (restate or name the idea). A bare “Symbol for naturals?” with no lecture frame collapses into rote recall. Prefer: “In the lecture, the set of counting numbers 1, 2, 3, … is written with which symbol (or English name)?”

### How format and organizer kind combine

| Organizer   | Prefer `mc` when…                       | Prefer `match` when…                                                 |
| ----------- | --------------------------------------- | -------------------------------------------------------------------- |
| Expository  | Choosing among definitions / roles      | Producing the standard symbol or name once the definition is fixed   |
| Comparative | Choosing among rival contrasts          | Almost never (relations need statements, not one token)              |
| Narrative   | Choosing among bridges / “why next?”    | Almost never (stories need clauses)                                  |
| Graphic     | Choosing among written chains / schemas | Short label for a named schema only if the notes fix one word/symbol |

**Bank mix:** lean on `mc` for the meaningful-learning core (especially comparative, narrative, graphic). Sprinkle `match` as **consolidation** after an organizer exists — often later in the section or as follow-ups to ideas already probed by `mc`. Do not open a bank with symbol-only `match` items.

### Anti-patterns

- `mc` whose choices are four unrelated symbols with no relational claim in the prompt.
- `match` that accepts a long free essay (this app grades short tokens only).
- Using `match` to “make it harder” without a clearer organizer in the prompt — difficulty without subsumption is still rote.
- Translating `match` accept lists into joke synonyms in `pirate` that change the math claim; keep formal tokens stable across locales.
- Referring to **“the notes”**, **“the lecture”**, or **“in the lecture sense”** in the prompt. Checks are **mini-problems**: give the setup (definitions, hypotheses, goal) in the question itself. Hints may gesture at an organizer; prompts must stand alone.

### Mini-problem voice

Write each item so a learner who has the ideas can solve it from the prompt alone. **Prefer being explicit with background** — put hypotheses, substitutions, and the goal in the question rather than relying on “after the previous step” memory.

- Open with given facts (“Suppose …”, “Assume …”, “Given …”, “Let …”).
- Include every piece of setup the answer depends on (equations assumed, substitutions, parity, gcd hypotheses).
- Ask for a relation, consequence, or discrimination — not “what do the notes call X?”
- Restate any definition the item needs; do not assume the reader remembers a section title or an unnamed prior step.

Bad: “Why do the notes take −2·e, e+3·f, and e−3·f as the three cubes?”  
Good: “You have integers e, f. Why prefer (−2·e), (e+3·f), (e−3·f) as summands rather than (2·e), (e+3·f), (e−3·f) when you want three numbers whose cubes sum to zero?”

Bad: “After writing the two odds as x = u + v and y = u − v, which equation appears?”  
Good: “Assume x³ + y³ = z³ with x = u + v and y = u − v. What does the equation simplify to?”

## Four organizer kinds

Tag every question with `organizer` in the section CSV:

| Kind               | CSV value     | Job                                                                                |
| ------------------ | ------------- | ---------------------------------------------------------------------------------- |
| Expository         | `expository`  | Broad overview for learners with little prior hook — “what kind of thing is this?” |
| Comparative        | `comparative` | New idea vs familiar idea — “how is A like/unlike B?”                              |
| Narrative          | `narrative`   | Path through ideas — “we had X; then we needed Y; so we got Z”                     |
| Skimming / graphic | `graphic`     | Structure preview — chain, table, schema, or “which diagram fits?”                 |

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

| Slot                  | Guidance                                                                         |
| --------------------- | -------------------------------------------------------------------------------- |
| Prompt                | Frame a broad “what is this?” without asking for a bare symbol.                  |
| Choices (`mc`)        | Short definitional claims; one precise, others near-misses that sound plausible. |
| Accept list (`match`) | Symbol and/or English name only after the definition is cued in the prompt.      |
| Hint                  | Name the organizer (e.g. “counting numbers”), not the answer letter.             |

**Prompt templates (`mc`)**

- Given that _A_ means _**(short restatement)**_, which claim follows?
- Which statement captures what _A_ is for, before we use it later?
- Suppose _**(setup)**_. Which conclusion fits?

**Choice templates (`mc`)**

- _A_ is the set of ___ (correct organizer).
- _A_ is the same as _B_ (confuses two nearby sets).
- _A_ is only a notation, not a set of numbers (denies the organizer).

**Prompt templates (`match`)**

- The set of ___ (organizer restated in the prompt) is written with which symbol or English name?
- After defining _A_ as ___, what standard symbol (or name) do we use?

**Example angle (basic sets):** `mc` — “Which claim best describes ℕ when ℕ starts at 1?” → counting numbers 1, 2, 3, …. `match` — same organizer cued in the prompt; `answer` = `N|ℕ|naturals` (no `choices_keys`).

### Comparative

**Job:** attach the new idea by contrast with something already known. Prefer **`mc`**.

| Slot    | Guidance                                                             |
| ------- | -------------------------------------------------------------------- |
| Prompt  | Explicitly name both sides of the comparison.                        |
| Choices | Rival relations (“in ℝ not ℚ” vs the reverse), not unrelated trivia. |
| Hint    | Point at the comparison axis (ratio of integers, completeness, …).   |

**Prompt templates**

- How does _X_ sit relative to _A_ and _B_?
- What is the difference between _relation₁_ and _relation₂_ in this example?
- Which claim correctly contrasts _A_ with _B_?

**Choice templates**

- _X_ belongs to _B_ but not to _A_ (correct contrast).
- _X_ belongs to _A_ but not to _B_ (swapped).
- _A_ and _B_ are the same here (erases the distinction).

**Example angle (basic sets):** √2 relative to ℚ and ℝ; ∈ vs ⊂; ℂ vs ℝ×ℝ as structures.

### Narrative

**Job:** place the idea in the lecture’s path — prior hook → need → new object. Prefer **`mc`**.

| Slot                       | Guidance                                                              |
| -------------------------- | --------------------------------------------------------------------- |
| Prompt                     | Mention what was already secured and why the next step appears.       |
| Choices                    | Motivational or structural reasons tied to prior learning.            |
| Hint / `review_section_id` | Point back to the earlier section that supplied the hook when useful. |

**Prompt templates**

- We already had _A_. Why does the lecture introduce _B_ next?
- Once _A_ is in place, which story best explains the move to _B_?
- How does _B_ continue the line of thinking that started with _A_?

**Choice templates**

- _A_ was not enough for ___; _B_ supplies that (correct bridge).
- _B_ replaces _A_ entirely (overstates the break).
- _B_ is unrelated vocabulary (denies the bridge).

**Example angle (basic sets):** ℕ → ℤ (need additive inverses / negatives); ℝ → ℂ (need √−1 / richer arithmetic).

### Graphic / skimming

**Job:** preview or test the **structure** of the material (chain, table, schema). Prefer **`mc`**; `match` only for a fixed short label.

| Slot           | Guidance                                                                               |
| -------------- | -------------------------------------------------------------------------------------- |
| Prompt         | Ask which diagram, chain, or schema matches the notes.                                 |
| Choices (`mc`) | Competing structures stated in text (correct chain vs scrambled).                      |
| Hint           | How to read the figure (“left-to-right means sits inside”), not the full answer again. |

**Prompt templates**

- Which inclusion chain matches the lecture?
- Which schema describes _A_ here (e.g. ℝ² as a Cartesian product)?
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
- [ ] Prompts are mini-problems with explicit background (hypotheses, substitutions, goal) — no “the notes” / “the lecture” meta-references
- [ ] `review_section_id` is used sparingly and only points at an earlier section that actually teaches the missing idea
