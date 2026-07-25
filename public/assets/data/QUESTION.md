# Question authoring (Ausubel)

Knowledge checks live in `public/assets/data/questions/{section}.csv`, with strings in `public/assets/data/localization/questions/{section}.csv` and hints wired in `public/assets/data/hints.csv`. English (`en`) is the source of truth; translate only after the English bank is settled.

## Ausubel’s advanced organizers (what we mean)

David Ausubel argued that people learn new ideas best when those ideas are **anchored to what they already know**, under a clear **organizing framework**, rather than by rote memorization of isolated facts. An *advanced organizer* is a brief, more general idea presented (or re-activated) so that later specifics have a place to attach.

For our quizzes, the notes are the first organizer; the questions continue that work. Each item should help the learner **subsume** a new idea under a prior one, **compare** related ideas, or **integrate** after a distinction has been made — not merely recognize a sentence from the page.

## How we apply it

1. **Start from what is known or easy to know.** Open a section bank with counting, everyday language, or a concept already secured earlier. Do not open with the hardest formalism.

2. **General questions, specific answers, specific hints.** The prompt may frame a broad relationship (“how do these fit?”); choices and hints pin down one precise claim. Hints should cue the relevant organizer, not spoil the answer word-for-word.

3. **Relationships over facts.** Prefer “how does A relate to B?” over “what is the symbol for A?” When a fact is needed, embed it inside a relation.

4. **Make comparisons in the questions.** Explicitly contrast sets, symbols, or representations (e.g. √2 in ℝ but not ℚ; ∈ vs ⊂; ℂ vs ℝ×ℝ).

5. **Restate definitions when the question is not probing for definitions.** If the goal is application or comparison, briefly restate the needed definition in the prompt so success depends on using the idea, not recalling the wording from memory.

6. **Prefer explanation over recall.** Choices should be short explanations or relational claims. Avoid identical “familiarization” clones: keep a **pool larger than one quiz draw** so rechecks sample different items; vary phrasing and angle when two items touch the same idea.

7. **Bridge old domains into new ones.** Later items should reuse earlier organizers (membership → inclusion → products). Successive checks should feel like extensions of previous thinking, not a new vocabulary list.

8. **Once a framework exists, refine / split it.** After the big picture (e.g. the number-set chain), ask questions that separate nearby ideas (membership vs inclusion; pairs-as-plane vs pairs-as-ℂ).

9. **Integrate after a refinement.** Follow a splitting question with one that puts the pieces back together (“why does the whole chain hold?”).

10. **Always ask how this fits with something learnt before.** Even late items should name or imply the prior hook (ℕ ⊂ ℝ ⇒ ℕ×ℕ ⊂ ℝ×ℝ).

## Practical constraints in this app

- Question types: `mc` (multiple choice) and `match`. Prefer `mc` with explanatory choices for Ausubel-style items.
- A check draws a small sample (`QUIZ_SIZE`) from unanswered items in the section prefix; **section banks should be larger than one draw** so learners are not drilled on the same three prompts.
- Keep symbol lines and formal math aligned across locales; translate prose. For `pirate`, lean into cringe humor without changing the math claim.
- Hints: one clear, specific hint per item is enough unless scaffolding steps are intentional (`hint_order`).
- Optional `review_section_id`: if set, a wrong answer suggests revisiting that earlier section (notes/video). Use when the miss is clearly about a prior organizer; leave blank otherwise.

## Section checklist

Before shipping a bank:

- [ ] First items are easy anchors; later items refine and integrate.
- [ ] Most prompts compare, relate, or explain — not bare recall.
- [ ] Definitions appear in prompts when the skill is use, not recall of wording.
- [ ] Pool size > quiz draw size; angles vary enough that redraws are not pure memorization.
- [ ] Localization keys exist for prompt, choices, and hints in `en` (then other locales).
- [ ] `review_section_id` is used sparingly and only points at an earlier section that actually teaches the missing idea.
