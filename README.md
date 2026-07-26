# Fermat's Last Lecture

Companion site for [Proof of Fermat Last Theorem FROM SCRATCH](https://www.youtube.com/watch?v=9f-hGSh8lF0) (~9 hours).

The hope is that a **motivated student** can follow the lecture, grow skill and knowledge section by section, and finish with a real understanding of the proof’s scaffolding — not a passive watch-through.

## Teaching theory

This app is built around three layers that work together, grounded in [Ausubel’s advanced organizers](https://en.wikipedia.org/wiki/Advance_organizer): new ideas stick when they attach to a clear framework the learner already has (or has just been given).

### 1. High-quality interactive lecture (the spine)

The YouTube lecture is the **basic path**. Each app section lines up with a timestamped stretch of the video. Watch first; the lecture sets the organizing frame — what matters, what foreshadows later chapters, and how the pieces will reconnect in the endgame.

### 2. Detailed notes (the depth)

Section notes are **much more detailed** than the spoken pass. They fix notation, spell out definitions, and give the careful wording the video moves through quickly. Confused after a clip? Stay on Notes, re-read, then return to the check. Open notes during quizzes are intentional: the goal is thinking with the ideas, not closed-book recall of phrasing.

### 3. Short open-note mini-quizzes (the workout)

Knowledge checks are **small** on purpose: a few items drawn from the current section and earlier ones. They exist so learners can **play with ideas** — compare, relate, apply — before moving on.

- Wrong answers are fine: try again, open a hint, or dig back into the notes.
- If you feel shaky, **do another check** (or refamiliarize) before the next section.
- Checks **bring forward prior knowledge** from earlier sections so new material has somewhere to attach.
- Optionally, a wrong answer can **recommend revisiting a previous section** (notes + video) when the gap is clearly about an older organizer. Authors set this per question; it is never required.

Authoring guidance for Ausubel-style items lives in [`public/assets/data/QUESTION.md`](public/assets/data/QUESTION.md). Note structure lives in [`public/assets/content/CONTENT.md`](public/assets/content/CONTENT.md).

### 4. Chapter mini-apps (the reconstruction)

Each chapter can attach **mini-apps** that build intuition for that chapter’s organizers. Chapter 1 ships a **Logic game** (`/summarizer`), in the spirit of the [Natural Number Game](https://adam.math.hhu.de/#/g/leanprover-community/nng4): worlds of levels, a growing **inventory** of symbols, and a proof board of certified lemmas — levels track the FLT **n = 3** and **n = 4** schemas in the notes. Worlds open after you mark the matching lecture section complete.

Register apps in [`public/assets/data/chapter-apps.csv`](public/assets/data/chapter-apps.csv). Authoring: [`public/assets/data/SANDBOX.md`](public/assets/data/SANDBOX.md).

### Pirate mode

**Pirate** is a joke locale for people who get bored or distracted by ordinary expository prose. Same math claims and structure as English; heavier sea-shanty / cringe voice so the page stays sticky. It is still an advanced-organizer design — humor is the delivery, not a different curriculum.

## How to use the site

1. Open a section, watch the clip (or read Notes).
2. Mark the section complete when you are ready for a check.
3. Take a short open-note quiz; use hints and earlier notes freely.
4. Use that chapter’s **mini-apps** (Chapter 1: Logic game) to rebuild the argument with unlocking symbols.
5. If confused, retry or revisit a recommended earlier section before continuing.
6. Use **Next section** when you feel ready — progress is stored in the browser (`localStorage`).

## Develop

```bash
yarn install
yarn dev
```

Content lives in `public/assets/data/` (`sections.csv`, `hints.csv`, per-section `questions/` and optional `sandboxes/`, and split `localization/` CSVs) plus section notes in `public/assets/content/{locale}/`. Edit those files without rebuilding the app logic.

```bash
yarn validate-entities
yarn test
yarn build
```

## GitHub Pages

Set the repository Pages source to GitHub Actions. The workflow builds with `VITE_BASE_PATH=/fermats-last-lecture/` (must match the GitHub repo name in the Pages URL).
