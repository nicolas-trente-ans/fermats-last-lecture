<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAppData, useLocale, useProgress } from '@/composables'
import type { CertifiedBoardEntry, SandboxPuzzle, SummarizerWorld } from '@/models'
import { initialFills, matchesTarget } from '@/utils/sandboxCheck'
import {
  computeInventory,
  isLevelUnlocked,
  isWorldPlayable,
  placeablePalette,
} from '@/utils/summarizerInventory'
import { certifyPuzzle, certifiedIds, loadCertifiedBoard } from '@/utils/summarizerBoard'

const data = useAppData()
const { t } = useLocale()
const progress = useProgress()
const route = useRoute()
const router = useRouter()

const boardEntries = ref<CertifiedBoardEntry[]>(loadCertifiedBoard())
const done = ref<Set<string>>(certifiedIds())
const fills = ref<Record<string, string>>({})
const focusedSocket = ref(0)
const feedback = ref<'idle' | 'correct' | 'wrong'>('idle')
const hintOpen = ref(false)
const newlyUnlocked = ref<string[]>([])
const inspectedToken = ref<string | null>(null)

const worlds = computed(() => data.value.worlds)

const worldId = computed(() => String(route.params.worldId || ''))
const levelId = computed(() => String(route.params.levelId || ''))

const activeWorld = computed(() => worlds.value.find((world) => world.id === worldId.value) || null)

const activeLevel = computed(() => {
  if (!activeWorld.value || !levelId.value) return null
  return activeWorld.value.levels.find((level) => level.id === levelId.value) || null
})

const activeLevelIndex = computed(() => {
  if (!activeWorld.value || !activeLevel.value) return -1
  return activeWorld.value.levels.findIndex((level) => level.id === activeLevel.value!.id)
})

const inventory = computed(() => computeInventory(worlds.value, done.value))

const inventoryList = computed(() =>
  [...inventory.value].sort((a, b) => tokenLabel(a).localeCompare(tokenLabel(b))),
)

const placeable = computed(() =>
  activeLevel.value ? placeablePalette(activeLevel.value, inventory.value) : [],
)

const worldBoard = computed(() => {
  if (!activeWorld.value) return []
  return boardEntries.value.filter(
    (entry) =>
      entry.chainId === activeWorld.value!.id || entry.sectionId === activeWorld.value!.sectionId,
  )
})

const reviewSection = computed(() => {
  const id = activeLevel.value?.reviewSectionId
  if (!id) return null
  return data.value.sections.find((s) => s.id === id) || null
})

function findLevel(puzzleId: string): SandboxPuzzle | null {
  for (const world of worlds.value) {
    const level = world.levels.find((item) => item.id === puzzleId)
    if (level) return level
  }
  return null
}

/** Proof-board cite badge: explicit cite, else first L-number or CFL unlock. */
const LEMMA_CITE = /^(L\d+|CFL)$/

function boardCite(entry: CertifiedBoardEntry): string | null {
  const level = findLevel(entry.puzzleId)
  if (!level) return null
  if (level.cite) return level.cite
  return level.unlocks.find((token) => LEMMA_CITE.test(token)) || null
}

function tokenLabel(tokenId: string): string {
  return t(`sb.token.${tokenId}`)
}

function tokenDesc(tokenId: string): string {
  return t(`sb.token.${tokenId}.desc`)
}

function inspectToken(tokenId: string) {
  inspectedToken.value = tokenId
}

function onInventoryClick(tokenId: string) {
  inspectToken(tokenId)
  if (activeLevel.value && placeable.value.includes(tokenId) && feedback.value !== 'correct') {
    placeBlock(tokenId)
  }
}

function worldPlayable(world: SummarizerWorld): boolean {
  return isWorldPlayable(world, progress.isSectionComplete)
}

function levelUnlocked(level: SandboxPuzzle): boolean {
  return isLevelUnlocked(level, done.value)
}

function worldProgress(world: SummarizerWorld): string {
  const cleared = world.levels.filter((level) => done.value.has(level.id)).length
  return `${cleared} / ${world.levels.length}`
}

function prepareLevel(level: SandboxPuzzle | null) {
  feedback.value = 'idle'
  hintOpen.value = false
  focusedSocket.value = 0
  newlyUnlocked.value = []
  fills.value = level ? initialFills(level.start) : {}
}

function socketIndexForToken(level: SandboxPuzzle, token: string): number {
  return level.sockets.indexOf(token)
}

function isSocket(level: SandboxPuzzle, token: string): boolean {
  return level.sockets.includes(token)
}

function displayedToken(level: SandboxPuzzle, token: string): string {
  const index = socketIndexForToken(level, token)
  if (index < 0) return tokenLabel(token)
  const fill = fills.value[String(index)]
  if (!fill) return t('ui.summarizer_socket_empty')
  return tokenLabel(fill)
}

function focusSocket(index: number) {
  if (!activeLevel.value || feedback.value === 'correct') return
  focusedSocket.value = index
  const key = String(index)
  if (fills.value[key]) {
    const next = { ...fills.value }
    delete next[key]
    fills.value = next
    feedback.value = 'idle'
  }
}

function placeBlock(blockId: string) {
  if (!activeLevel.value || feedback.value === 'correct') return
  if (!inventory.value.has(blockId)) return
  const key = String(focusedSocket.value)
  fills.value = { ...fills.value, [key]: blockId }
  feedback.value = 'idle'
  const nextEmpty = activeLevel.value.sockets.findIndex((_, i) => !fills.value[String(i)])
  if (nextEmpty >= 0) focusedSocket.value = nextEmpty
}

function check() {
  const level = activeLevel.value
  const world = activeWorld.value
  if (!level || !world) return
  const ok = matchesTarget(fills.value, level.target)
  feedback.value = ok ? 'correct' : 'wrong'
  if (!ok) return
  const entry: CertifiedBoardEntry = {
    puzzleId: level.id,
    sectionId: world.sectionId,
    chainId: world.id,
    frame: level.frame,
    fills: { ...fills.value },
    boardLabelKey: level.boardLabelKey,
  }
  const before = new Set(inventory.value)
  boardEntries.value = certifyPuzzle(entry)
  done.value = certifiedIds()
  newlyUnlocked.value = level.unlocks.filter((token) => !before.has(token))
}

function reset() {
  prepareLevel(activeLevel.value)
}

function revealHint() {
  hintOpen.value = true
}

function goNextLevel() {
  const world = activeWorld.value
  if (!world) return
  const next = world.levels.find(
    (level, index) =>
      index > activeLevelIndex.value && levelUnlocked(level) && !done.value.has(level.id),
  )
  if (next) {
    router.push(`/summarizer/${world.id}/${next.id}`)
    return
  }
  router.push('/summarizer')
}

watch(
  () => [worldId.value, levelId.value] as const,
  () => {
    boardEntries.value = loadCertifiedBoard()
    done.value = certifiedIds()
    prepareLevel(activeLevel.value)
  },
  { immediate: true },
)
</script>

<template>
  <div class="game">
    <p class="crumb">
      <RouterLink to="/">{{ t('ui.back_home') }}</RouterLink>
      <template v-if="activeWorld">
        ·
        <RouterLink to="/summarizer">{{ t('ui.summarizer') }}</RouterLink>
      </template>
    </p>

    <!-- Hub: worlds -->
    <template v-if="!activeWorld">
      <h1 class="page-title">{{ t('ui.summarizer') }}</h1>
      <p class="lede">{{ t('ui.summarizer_lede') }}</p>
      <p class="nng-note">{{ t('ui.summarizer_nng_note') }}</p>

      <aside class="inventory-panel hub-inventory">
        <h2>{{ t('ui.summarizer_inventory') }}</h2>
        <p class="muted">{{ t('ui.summarizer_inventory_lede') }}</p>
        <div class="inventory-chips">
          <button
            v-for="token in inventoryList"
            :key="token"
            type="button"
            class="chip inv usable"
            :class="{ selected: inspectedToken === token }"
            @click="inspectToken(token)"
          >
            {{ tokenLabel(token) }}
          </button>
          <span v-if="!inventoryList.length" class="muted">{{
            t('ui.summarizer_inventory_empty')
          }}</span>
        </div>
        <div v-if="inspectedToken" class="token-desc">
          <p class="token-desc-label">{{ t('ui.summarizer_token_about') }}</p>
          <p class="token-desc-name">{{ tokenLabel(inspectedToken) }}</p>
          <p class="token-desc-body">{{ tokenDesc(inspectedToken) }}</p>
        </div>
      </aside>

      <div class="worlds">
        <article
          v-for="world in worlds"
          :key="world.id"
          class="world-card"
          :class="{ locked: !worldPlayable(world) }"
        >
          <header>
            <h2>{{ t(world.titleKey) }}</h2>
            <p class="muted">{{ worldProgress(world) }}</p>
          </header>
          <p v-if="!worldPlayable(world)" class="locked-msg">
            {{ t('ui.summarizer_world_locked') }}
            <RouterLink :to="`/section/${world.sectionId}`">
              {{ t(data.sections.find((s) => s.id === world.sectionId)?.titleKey || '') }}
            </RouterLink>
          </p>
          <div v-else class="levels">
            <RouterLink
              v-for="(level, index) in world.levels"
              :key="level.id"
              class="level-btn"
              :class="{
                done: done.has(level.id),
                locked: !levelUnlocked(level),
              }"
              :to="levelUnlocked(level) ? `/summarizer/${world.id}/${level.id}` : ''"
              :aria-disabled="!levelUnlocked(level)"
              @click="
                (event) => {
                  if (!levelUnlocked(level)) event.preventDefault()
                }
              "
            >
              {{ index + 1 }}
            </RouterLink>
          </div>
        </article>
      </div>
    </template>

    <!-- World level list if world selected but no level -->
    <template v-else-if="activeWorld && !activeLevel">
      <h1 class="page-title">{{ t(activeWorld.titleKey) }}</h1>
      <p v-if="!worldPlayable(activeWorld)" class="locked-msg">
        {{ t('ui.summarizer_world_locked') }}
        <RouterLink :to="`/section/${activeWorld.sectionId}`">
          {{ t(data.sections.find((s) => s.id === activeWorld?.sectionId)?.titleKey || '') }}
        </RouterLink>
      </p>
      <div v-else class="levels large">
        <RouterLink
          v-for="(level, index) in activeWorld.levels"
          :key="level.id"
          class="level-btn"
          :class="{
            done: done.has(level.id),
            locked: !levelUnlocked(level),
          }"
          :to="levelUnlocked(level) ? `/summarizer/${activeWorld.id}/${level.id}` : ''"
          @click="
            (event) => {
              if (!levelUnlocked(level)) event.preventDefault()
            }
          "
        >
          <span class="num">{{ index + 1 }}</span>
          <span>{{ t(level.boardLabelKey) }}</span>
        </RouterLink>
      </div>
    </template>

    <!-- Level play -->
    <template v-else-if="activeWorld && activeLevel">
      <div v-if="!worldPlayable(activeWorld)" class="locked-msg">
        {{ t('ui.summarizer_world_locked') }}
      </div>
      <div v-else-if="!levelUnlocked(activeLevel)" class="locked-msg">
        {{ t('ui.summarizer_level_locked') }}
      </div>
      <div v-else class="play-layout">
        <aside class="inventory-panel">
          <h2>{{ t('ui.summarizer_inventory') }}</h2>
          <p class="muted">{{ t('ui.summarizer_inventory_play') }}</p>
          <div class="inventory-chips">
            <button
              v-for="token in inventoryList"
              :key="token"
              type="button"
              class="chip inv"
              :class="{
                usable: placeable.includes(token),
                selected: inspectedToken === token,
              }"
              @click="onInventoryClick(token)"
            >
              {{ tokenLabel(token) }}
            </button>
          </div>
          <div v-if="inspectedToken" class="token-desc">
            <p class="token-desc-label">{{ t('ui.summarizer_token_about') }}</p>
            <p class="token-desc-name">{{ tokenLabel(inspectedToken) }}</p>
            <p class="token-desc-body">{{ tokenDesc(inspectedToken) }}</p>
          </div>
          <p v-if="newlyUnlocked.length" class="unlock-toast">
            {{ t('ui.summarizer_unlocked') }}:
            {{ newlyUnlocked.map(tokenLabel).join(', ') }}
          </p>
        </aside>

        <section class="play">
          <p class="progress">
            {{
              t('ui.summarizer_step')
                .replace('{current}', String(activeLevelIndex + 1))
                .replace('{total}', String(activeWorld.levels.length))
                .replace('{title}', t(activeLevel.boardLabelKey))
            }}
          </p>
          <h1 class="level-title">{{ t(activeLevel.promptKey) }}</h1>

          <div v-if="worldBoard.length" class="board">
            <h2>{{ t('ui.summarizer_board') }}</h2>
            <ol>
              <li v-for="entry in worldBoard" :key="entry.puzzleId" class="board-line">
                <span v-if="boardCite(entry)" class="board-cite">{{ boardCite(entry) }}</span>
                <p class="board-statement">{{ t(entry.boardLabelKey) }}</p>
              </li>
            </ol>
          </div>

          <div class="frame" role="group">
            <button
              v-for="(token, tokenIndex) in activeLevel.frame"
              :key="`${token}-${tokenIndex}`"
              type="button"
              class="chip"
              :class="{
                socket: isSocket(activeLevel, token),
                filled:
                  isSocket(activeLevel, token) &&
                  fills[String(socketIndexForToken(activeLevel, token))],
                focused:
                  isSocket(activeLevel, token) &&
                  focusedSocket === socketIndexForToken(activeLevel, token),
                chrome: !isSocket(activeLevel, token),
              }"
              :disabled="!isSocket(activeLevel, token) || feedback === 'correct'"
              @click="
                isSocket(activeLevel, token) && focusSocket(socketIndexForToken(activeLevel, token))
              "
            >
              {{ displayedToken(activeLevel, token) }}
            </button>
          </div>

          <div class="palette-wrap">
            <p class="muted">{{ t('ui.summarizer_palette') }}</p>
            <div class="palette">
              <button
                v-for="blockId in placeable"
                :key="blockId"
                type="button"
                class="chip palette-chip"
                :disabled="feedback === 'correct'"
                @click="placeBlock(blockId)"
              >
                {{ tokenLabel(blockId) }}
              </button>
            </div>
          </div>

          <div class="row-actions">
            <button class="btn" type="button" :disabled="feedback === 'correct'" @click="check">
              {{ t('ui.summarizer_check') }}
            </button>
            <button class="btn btn-ghost" type="button" @click="reset">
              {{ t('ui.summarizer_reset') }}
            </button>
            <button class="btn btn-ghost" type="button" :disabled="hintOpen" @click="revealHint">
              {{ t('ui.hint') }}
            </button>
            <button
              v-if="feedback === 'correct'"
              class="btn btn-accent"
              type="button"
              @click="goNextLevel"
            >
              {{ t('ui.summarizer_next') }}
            </button>
          </div>

          <p v-if="hintOpen" class="hint">{{ t(activeLevel.hintKey) }}</p>
          <p v-if="feedback === 'correct'" class="ok">{{ t('ui.summarizer_certified') }}</p>
          <p v-if="feedback === 'wrong'" class="bad">{{ t('ui.try_again') }}</p>
          <p v-if="feedback === 'wrong' && reviewSection" class="review">
            <RouterLink :to="`/section/${reviewSection.id}`">
              {{ t('ui.review_section') }}:
              {{ t(reviewSection.titleKey) }}
            </RouterLink>
          </p>
        </section>
      </div>
    </template>
  </div>
</template>

<style scoped>
.crumb {
  margin: 0 0 0.75rem;
}

.crumb a {
  color: var(--muted);
}

.crumb a:hover {
  color: var(--accent);
}

.lede,
.nng-note,
.muted,
.locked-msg {
  color: var(--muted);
  line-height: 1.45;
}

.nng-note {
  margin: 0.35rem 0 1.25rem;
  font-size: 0.95rem;
}

.worlds {
  display: grid;
  gap: 1rem;
}

.world-card {
  padding: 1rem;
  border: 1px solid var(--line);
  border-radius: 0.55rem;
  background: rgba(26, 35, 50, 0.72);
}

.world-card.locked {
  opacity: 0.72;
}

.world-card header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: baseline;
}

.world-card h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.25rem;
}

.levels {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.85rem;
}

.levels.large {
  display: grid;
  gap: 0.5rem;
}

.level-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.4rem;
  min-height: 2.4rem;
  padding: 0.45rem 0.65rem;
  border: 1px solid var(--line);
  border-radius: 0.4rem;
  background: var(--bg1);
  color: var(--ink);
  text-decoration: none;
  font-weight: 700;
}

.levels.large .level-btn {
  justify-content: flex-start;
  gap: 0.75rem;
  font-weight: 600;
}

.level-btn.done {
  border-color: #5a8f74;
  color: #b6f0d0;
}

.level-btn.locked {
  opacity: 0.45;
  cursor: not-allowed;
}

.play-layout {
  display: grid;
  gap: 1rem;
}

@media (min-width: 900px) {
  .play-layout {
    grid-template-columns: 15rem 1fr;
    align-items: start;
  }
}

.inventory-panel {
  padding: 0.9rem;
  border: 1px solid var(--line);
  border-radius: 0.55rem;
  background: rgba(26, 35, 50, 0.72);
}

.hub-inventory {
  margin-bottom: 1.25rem;
}

.inventory-panel h2 {
  margin: 0 0 0.35rem;
  font-size: 1rem;
}

.inventory-chips,
.frame,
.palette {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.chip {
  appearance: none;
  border: 1px solid var(--line);
  border-radius: 0.35rem;
  background: var(--bg1);
  color: var(--ink);
  padding: 0.4rem 0.6rem;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.92rem;
  line-height: 1.3;
}

.chip.inv {
  opacity: 0.7;
  cursor: pointer;
}

.chip.inv.usable,
button.chip.inv:not(:disabled) {
  opacity: 1;
}

.chip.inv.usable {
  border-color: var(--accent);
}

.chip.inv.selected {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
  background: #3a3320;
}

.token-desc {
  margin-top: 0.85rem;
  padding: 0.65rem 0.75rem;
  border: 1px dashed var(--line);
  border-radius: 0.4rem;
  background: rgba(0, 0, 0, 0.2);
}

.token-desc-label {
  margin: 0 0 0.25rem;
  font-size: 0.8rem;
  color: var(--muted);
  font-weight: 600;
}

.token-desc-name {
  margin: 0 0 0.35rem;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-weight: 700;
  color: var(--accent);
}

.token-desc-body {
  margin: 0;
  line-height: 1.45;
  color: var(--ink);
  font-size: 0.92rem;
}

.chip.chrome {
  cursor: default;
  background: transparent;
  border-style: dashed;
  color: var(--muted);
}

.chip.socket {
  cursor: pointer;
  border-color: #7a6a3a;
  min-width: 2.5rem;
}

.chip.socket.filled {
  background: #2a3344;
  border-color: var(--accent);
}

.chip.socket.focused {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.chip.palette-chip {
  cursor: pointer;
  background: #243044;
}

.play {
  padding: 1rem;
  border: 1px solid var(--line);
  border-radius: 0.55rem;
  background: rgba(26, 35, 50, 0.72);
}

.level-title {
  margin: 0.35rem 0 0.9rem;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.4;
}

.progress {
  color: var(--muted);
  font-size: 0.85rem;
  margin: 0;
}

.board {
  margin: 0 0 1rem;
  padding: 0.75rem 0.85rem;
  border: 1px dashed var(--line);
  border-radius: 0.45rem;
  background: rgba(0, 0, 0, 0.18);
}

.board h2 {
  margin: 0 0 0.45rem;
  font-size: 0.95rem;
  color: var(--muted);
}

.board ol {
  margin: 0;
  padding-left: 1.2rem;
  display: grid;
  gap: 0.75rem;
}

.board-line {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
}

.board-cite {
  flex: 0 0 auto;
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--accent, #c4b5a0);
  padding: 0.1rem 0.35rem;
  border: 1px solid var(--line);
  border-radius: 0.25rem;
  background: rgba(255, 255, 255, 0.04);
  white-space: nowrap;
}

.board-statement {
  margin: 0;
  flex: 1;
  min-width: 0;
  line-height: 1.45;
}

.palette-wrap {
  margin-top: 0.9rem;
}

.row-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.85rem;
}

.hint,
.ok,
.bad,
.review,
.unlock-toast {
  margin: 0.75rem 0 0;
  line-height: 1.4;
}

.hint {
  color: #e6d3a4;
}

.ok,
.unlock-toast {
  color: #b6f0d0;
}

.bad {
  color: #ffb4b4;
}

.review a {
  color: var(--accent);
}
</style>
