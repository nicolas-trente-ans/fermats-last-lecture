<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useYoutubeApi } from '@/composables'
import type { YTPlayer } from '@/models/youtube'
import '@/models/youtube'

const props = defineProps<{
  videoId: string
  startSeconds: number
  endSeconds?: number | null
}>()

const hostId = `yt-player-${Math.random().toString(36).slice(2)}`
const player = ref<YTPlayer | null>(null)
const { loadYoutubeApi } = useYoutubeApi()
let pollTimer: ReturnType<typeof setInterval> | null = null

function clearPoll() {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}

function pauseAtEndIfNeeded(target: YTPlayer) {
  const end = props.endSeconds
  if (end == null || !Number.isFinite(end)) return
  if (target.getCurrentTime() >= end) {
    target.pauseVideo()
    target.seekTo(end, true)
    clearPoll()
  }
}

function startPoll(target: YTPlayer) {
  clearPoll()
  if (props.endSeconds == null || !Number.isFinite(props.endSeconds)) return
  pollTimer = setInterval(() => pauseAtEndIfNeeded(target), 250)
}

async function mountPlayer() {
  await loadYoutubeApi()
  if (!window.YT?.Player) return
  clearPoll()
  player.value?.destroy()

  const start = Math.max(0, Math.floor(props.startSeconds))
  const end =
    props.endSeconds != null && Number.isFinite(props.endSeconds)
      ? Math.max(start + 1, Math.floor(props.endSeconds))
      : undefined

  player.value = new window.YT.Player(hostId, {
    videoId: props.videoId,
    width: '100%',
    height: '100%',
    playerVars: {
      start,
      ...(end != null ? { end } : {}),
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
    },
    events: {
      onReady: (event) => {
        // Cue (don't play) so the section start is ready until the user presses play.
        event.target.cueVideoById({
          videoId: props.videoId,
          startSeconds: props.startSeconds,
          ...(end != null ? { endSeconds: end } : {}),
        })
        event.target.pauseVideo()
      },
      onStateChange: (event) => {
        const playing = window.YT?.PlayerState?.PLAYING ?? 1
        if (event.data === playing) {
          startPoll(event.target)
        } else {
          clearPoll()
        }
        pauseAtEndIfNeeded(event.target)
      },
    },
  })
}

watch(
  () => [props.startSeconds, props.endSeconds, props.videoId] as const,
  () => {
    void mountPlayer()
  },
)

onMounted(() => {
  void mountPlayer()
})

onBeforeUnmount(() => {
  clearPoll()
  player.value?.destroy()
  player.value = null
})
</script>

<template>
  <div class="player-wrap">
    <div :id="hostId" class="player" />
  </div>
</template>

<style scoped>
.player-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #0b1018;
  border: 1px solid var(--line);
  border-radius: 0.55rem;
  overflow: hidden;
}

.player {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.player-wrap :deep(iframe) {
  position: absolute;
  inset: 0;
  width: 100% !important;
  height: 100% !important;
  border: 0;
}
</style>
